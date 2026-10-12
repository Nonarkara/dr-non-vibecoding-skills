# <Project> — agent contract
> Global rules: `MASTER.md` (dr-non-vibecoding-skills/agent-instructions). This file adds repo facts only.
> Last verified: YYYY-MM-DD by <agent>. If a fact here is wrong, fix it in your PR.

## Purpose
- One sentence: who uses it and what it does for them.
- Live URL: https://…  · Status: Demo / Pilot / Production
- Machine: runs on M3 / M5 / Cloudflare. launchd labels: `…` (never restart without health check).

## Commands (exact, copy-paste)
```bash
pnpm install
pnpm test                    # expected: N pass
pnpm tsc --noEmit
npx axiom-audit . --strict   # if UI
scripts/bump-version.sh patch
scripts/deploy-frontend.sh   # deploys + verifies live bundle hash
curl -s https://…/health     # expected: 200, {"ok":true}
```
Do NOT run on the M3: `pnpm dev`, full builds, e2e.

## Layout
- `apps/…` · `packages/…` · key files a newcomer must know.

## Data sources
| Source | Adapter/file | Refresh | Tier when missing | Licence/credit |
|---|---|---|---|---|

## Invariants (anti-regression; don't remove)
- e.g. unknown gauge = `null`, never "normal".
- e.g. CCTV origin stays in `frame-src`.

## Gotchas (dated)
- YYYY-MM-DD: what broke, why, the rule now.

## Secrets / env
- Names only (values in `.env`, never committed): `FOO_API_KEY` (free tier, capped at …).
