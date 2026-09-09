---
name: google-cloud-run
description: Deploy scale-to-zero containerized or source-built web apps to Google Cloud Run. Use when deploying production services with custom domains, Secret Manager, and WIF.
license: MIT
---

# Google Cloud Run — Serverless Production Spine

Google Cloud Run is the premier hosting target for the Thinker-to-Doer practice:
- **$0 Idle Bill:** Scales to true zero instances when there is no traffic.
- **No Cold Sleep Penalties:** Unlike free tiers that sleep for 30–60 seconds, Cloud Run containers wake in milliseconds.
- **Generous Free Tier:** 2 million requests, 360,000 vCPU-seconds, and 180,000 GiB-seconds per month free every month.
- **Zero Ingress Hassle:** Instant Google-managed SSL certificates for custom domains.

---

## The Two Deployment Paths

### Path A: Zero-Docker Source Build (Fastest for MVPs)

Google Cloud Buildpacks automatically detect Node.js, Python, Go, Java, or Ruby and containerize without a `Dockerfile`:

```bash
gcloud run deploy my-app \
  --source . \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --min-instances 0 \
  --max-instances 3 \
  --memory 512Mi \
  --concurrency 80
```

### Path B: Production Multi-Stage Container

When dependencies require system packages or optimized runtime images:

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
ENV PORT=8080
CMD ["node", "dist/index.js"]
```

Deploy the container:

```bash
gcloud run deploy my-app \
  --image gcr.io/PROJECT_ID/my-app:latest \
  --region asia-southeast1 \
  --allow-unauthenticated
```

---

## Sacred Invariants for Solo Builders

### 1. Hard Cost Guardrails
Never leave max instances unbounded. An unexpected crawl or DDoS must not drain your wallet:

```bash
# Enforce a hard ceiling on instances:
gcloud run services update my-app \
  --min-instances 0 \
  --max-instances 3
```

### 2. Secret Manager Injection (Never Plain Text)
Never pass database passwords, Stripe keys, or API tokens via `--set-env-vars`. Inject from Google Secret Manager:

```bash
# 1. Create secret
echo -n "sk_live_..." | gcloud secrets create STRIPE_SECRET_KEY --data-file=-

# 2. Bind directly into container environment at runtime
gcloud run services update my-app \
  --set-secrets="STRIPE_SECRET_KEY=STRIPE_SECRET_KEY:latest"
```

### 3. Keyless GitHub Actions via Workload Identity Federation (WIF)
Never store service account JSON keys in GitHub repository secrets. Use keyless OIDC:

```yaml
# .github/workflows/deploy.yml
name: deploy-cloud-run
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'projects/PROJECT_NUM/locations/global/workloadIdentityPools/github-pool/providers/github-provider'
          service_account: 'deployer@PROJECT_ID.iam.gserviceaccount.com'
      - uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: my-app
          source: ./
          region: asia-southeast1
```

---

## Live Verification (CPDT)

Deploy is not complete when `gcloud` exits. Prove the live bytes:

```bash
URL=$(gcloud run services describe my-app --region asia-southeast1 --format='value(status.url)')
curl -fsS "$URL/healthz" | grep -q '"status":"ok"' && echo "✓ Cloud Run live and verified"
```
