# Ship to Production Daily

No staging. No QA team. Roughly nine commits a day for six months, straight to systems people use.

Here's the machinery that makes that survivable.

---

## The pipeline, end to end

```
intention → agent works → read the diff → CPDT → lesson doc
                                            │
                        ┌───────────────────┴───────────────────┐
                        │  C  git commit -m "<type>(<scope>): …" │
                        │  P  git push origin main               │
                        │  D  ./scripts/deploy.sh                │
                        │  T  curl the live URL and grep         │
                        └────────────────────────────────────────┘
```

**T is the load-bearing letter.** Tests prove the code is correct; T proves bytes reached a human. Different claims. A green suite with a failed deploy is a system that doesn't exist.

---

## Architecture that makes daily shipping safe

The frontend is decoupled from the backend on purpose:

```
Cloudflare Pages (static)     ← ships in seconds, independent of my laptop
     └── Pages Function /api/* → proxies to a named tunnel
              └── Cloudflare Tunnel
                     └── localhost:8340 on the Mac (launchd-supervised)
```

Consequences that matter:

- **The frontend can ship 20 times a day** without touching the data layer.
- **The backend restarts in one command** and the site never 404s while it does.
- **If the laptop sleeps, the site still loads** — only live data goes stale, and the UI says how stale.
- **The proxy has no hard-coded route list.** It catches all of `/api/*`, so adding an endpoint requires no frontend deploy at all.

That last one sounds minor. It removes an entire category of "I added the endpoint but forgot to add the route" from every future session.

---

## Versioning, because browsers and CDNs both lie

Every ship bumps three things together:

```html
<script src="/js/main.js?v=3.8.25"></script>
```
```js
const CACHE = 'flooddash-v3.8.25'   // service worker cache name
```
```
fd_go_bag_v1                        // localStorage keys, versioned independently
```

The asset version and the SW cache name move on every deploy. The `localStorage` suffix moves only when the *shape* of the stored data changes — that's the difference between "get fresh code" and "don't hand a returning user a corrupt object."

And even with all three, an edge node can still serve you last week. That's what [deploy-verification](../skills/deploy-verification/SKILL.md) exists for. One real ship needed `3.8.15 → 3.8.20 → 3.8.21 → 3.8.22 → 3.8.23 → 3.8.25` inside a single session to force the edge to let go.

---

## Commit messages as the shipping log

I don't write `fix: bug`. I write the sentence I'd say to a colleague:

```
fix(ux): dock the locate FAB under the zoom control — it overlapped the
legend at every viewport size and was unclickable behind the legend
button (found by hit-testing every interactive element at 1280/768/375)
```

```
feat(deploy): asset-content probes — HTML version check alone let a
poisoned edge pin old JS under a new ?v= key (2026-08-09 incident); now
md5-verify one JS + one CSS via throwaway cache keys before declaring
a deploy verified
```

Long? Yes. It is also the only record of *why*, it is grep-able six months later, and writing it forces me to confirm I actually understand the fix. Details in [commit conventions](../reference/commit-conventions.md).

---

## Degradation is a feature, and it must be visible

Every live-data surface follows the same contract:

1. Hit upstream with a short TTL.
2. On failure, serve **last-good** — never an error page, never a zero.
3. **Show the age.** A green dot and "data 12 minutes old" plus the source agencies.

A dashboard that admits staleness is trustworthy. One that silently shows old numbers is a liability — and if the numbers are flood levels, it's worse than that.

Same principle at the code level: `src/lib/api/mock.ts` means the app renders fully with zero API keys. An upstream outage degrades the app; it doesn't break it. That file is in the anti-regression list precisely because it looks removable.

---

## Monitoring is the price of admission

Testing in production is defensible **only** if you find out fast:

- `/api/health` on every service, returning status + timestamp + last successful ingest per source.
- A watchdog job that polls it, restarts on failure, and **escalates to a human** rather than restarting forever.
- Nightly backups as their own job.
- Log rotation, or `ENOSPC` will take down the service and everything else on the machine.

> The test: if this broke right now, would you know within five minutes? If not, add monitoring before you add features.

---

## What "done" means, said precisely

At the end of a session, exactly one of these is true, and I say which:

- **Shipped and verified** — with the command and its output.
- **Shipped, verification pending** — deployed, edge not converged, here's what I'll check.
- **Built, not shipped** — committed, deploy didn't run or failed, here's why.
- **Unverified** — couldn't test, here's what would test it.

Blurring these is the single most expensive habit in AI-assisted development, because it removes the human's reason to look.
