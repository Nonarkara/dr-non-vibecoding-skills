# Hosting Matrix

Where to put it so it survives localhost. One solo builder, four hosts, no staging cluster. Pick by shape, not by fashion.

---

## The picks

| Need | Host | Deploy | Free tier | The gotcha |
|---|---|---|---|---|
| Static site / dashboard frontend | **Cloudflare Pages** (default) | `npx wrangler pages deploy <dir> --project-name <name>` | Generous free | Edge converges per-asset — use `templates/deploy-pages.sh` probe-first verification, never trust the success message |
| Serverless API + preview envs | **Vercel** | `npx vercel deploy` / `vercel --prod` | Hobby free | Edge runtime ≠ Node — smoke-test on the deployed URL, not localhost (see `result-honesty`'s Vercel edge warning) |
| Containerized API / bot / microservice | **Google Cloud Run** (Google ecosystem) | `gcloud run deploy <name> --source . --region <reg>` | Free 2M reqs/mo, 180k vCPU-s, 360k GiB-s | Stateless scale-to-zero ($0 idle bill); fast cold starts (<2s); no Render-style 30s sleeping death; supports websockets |
| Next.js / full-stack SSR on Google edge | **Firebase App Hosting** | `firebase deploy` / GitHub auto-deploy | Generous spark tier | Native Cloud Build + Cloud Run under the hood; CDN edge caching with zero-config SSR |
| Long-running bot / service / worker | **Railway** | `railway up` (or GitHub-connected deploys) | Trial credit, then paid | Costs real money past trial — set spend alerts day one; stateless restarts wipe local disk |
| Long-running service with blueprint-as-code | **Render** | Push → auto-deploy from `render.yaml` | Free web services **sleep** when idle | Cold starts of 30s+ — fine for cron, wrong for a chat webhook; paid tier if latency matters |

---

## The rules underneath

1. **Frontend on a CDN, always.** Static ships in seconds and stays up when the laptop sleeps. Only live data goes stale — and the UI says so (`honest-envelope`).
2. **Laptop-backed APIs stay behind a tunnel** (`always-on-services`) — Cloudflare Tunnel, own config per service. The host above is for what must survive the lid closing.
3. **One host per job.** Pages serves the site, Railway/Render runs the bot, the tunnel reaches the laptop. A static site with a server strapped on is how deploys become mysteries.
4. **Env vars per host, secrets in Keychain.** `.env.example` committed, `.env` never. Each host's dashboard holds the real values; `context.md` holds the names.

## Minimal configs (copy, then fill names)

```yaml
# render.yaml — one service, no surprises
services:
  - type: web
    name: myapp-api
    runtime: node
    buildCommand: npm ci && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

```jsonc
// vercel.json — keep functions Node unless edge earns it
{ "$schema": "https://openapi.vercel.sh/vercel.json", "functions": { "api/**/*.js": { "runtime": "nodejs22.x" } } }
```

```toml
# railway.toml — minimal; secrets come from the Railway dashboard, not this file
[build]
builder = "nixpacks"
[deploy]
startCommand = "npm start"
restartPolicyType = "on-failure"
```

```yaml
# cloudrun.yaml (or direct command: gcloud run deploy myapp --source . --region asia-southeast1 --allow-unauthenticated)
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: myapp-api
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: "10"
    spec:
      containers:
        - image: gcr.io/my-project/myapp:latest
          resources:
            limits:
              memory: 512Mi
              cpu: 1000m
```

If you can't build it on $25/month, you're overcomplicating it (`stack-decisions.md`). Start on free, pay when latency or uptime — not fashion — demands it.
