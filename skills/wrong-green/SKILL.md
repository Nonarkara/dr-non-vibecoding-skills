---
name: wrong-green
description: >-
  Distrust a success metric that answers the wrong question. Use when a
  watchdog, health check, deploy log, CI, or curl says OK and you are about to
  believe it. The manufactured-confidence failure mode from the war stories.
license: MIT
---

# Wrong Green

> A check that answers a question nobody asked, confidently, is worse than no check.

Playbook 06's closing thesis. Three receipts:

| Incident | The green | The actual question |
|---|---|---|
| Poisoned edge | New `?v=` on HTML | Are the **JS bytes** the patched ones? |
| Two tunnels | `cloudflared` healthy | Is ingress the **this** product's config? |
| Watchdog on `/` | Disk not full | Is **Data** volume full? Is **last ingest** recent? |

CI went green on the Codex Incident too — after the map was gone.

This skill is the meta-law. [`deploy-verification`](../deploy-verification/SKILL.md) and [`always-on-services`](../always-on-services/SKILL.md) are the specific fixes. Read those for the procedures. Read this when you feel relief at a green badge.

---

## The rule

Before you trust a success:

1. **Name the failure you care about** in one sentence. ("Users still get the XSS." "Ingest has not written a row in 36 days." "The other tunnel stole our hostname.")
2. **Name what the check actually measures.** If those sentences are not the same, the check is decorative.
3. **Prefer content and last-success over process-up.** `pid` alive, `deploy succeeded`, `200 OK` on `/` are process. md5 of the asset, timestamp of last good ingest, probe of the *route that breaks* are content.
4. **Poison silent fallbacks.** If a tool has a shared default, make the default fail loudly (inert `config.yml`, throwaway `&probe=` keys). Silent success on the wrong object is the whole genre.

---

## Patterns that keep recurring

- Health endpoint that does not hit inference / ingest / the DB
- Curl of the custom domain before the canonical alias has the new bytes
- Service worker serving last week's shell
- `open -a App` as a restart (no-op if already running)
- Test suite green while the live URL is stale
- "Process is running" while the job is a no-op loop

---

## What to do instead

Replace the check, do not add a second badge next to the lying one. Two greens, one of them wrong, is worse.

For deploys: content probes through throwaway keys — [`deploy-verification`](../deploy-verification/SKILL.md).

For services: last successful ingest per source, disk on the volume that can fill, tunnel `--config` required.

For UI: [`browser-as-t`](../browser-as-t/SKILL.md), not a PNG of the loading state.

---

## The test

You can state the failure mode and the check in two sentences that use the same nouns. If the check's nouns are "process," "status," or "version string" and the failure's nouns are "bytes," "ingest," or "this hostname," you have a wrong green. Fix the check before you ship the relief.
