# Stack gaps

Recorded 2026-10-13. These are holes in the setup described in [`now-stack.md`](now-stack.md). Each hole in the first table is matched to a tool the owner's toolbox marks **ADOPT** (use it now; setup is planned or under way). ADOPTED tools are already in use and are not listed here as if they were new. TRIAL and LATER tools are left out on purpose.

The catalog copy used here has 135 full entries and 50 lighter SaaS entries. The header says the cards were checked through 12 Oct 2026 (ICT). Each entry below was marked checked 9 Oct 2026 (JST) inside that file. Prices, star counts, and "rollout in progress" claims are the catalog's, not a fresh measurement. This page did not install anything.

How the match was made, from the toolbox skill:

1. Name the need.
2. Take ADOPT ahead of TRIAL, LATER, REFERENCE, and SKIP-for-now.
3. Read the entry's "don't" line and the security note. Drop a tool the don't-line rules out.
4. Propose it. Ask before any install that is self-hosted, needs a key, or writes into every agent. Nothing new runs on the M3.

Licences are copied from the catalog's security notes. They are not legal advice. Re-read the live repo before shipping code from one of them.

## Gaps with an ADOPT tool

| Gap | What is missing now | ADOPT tool | Licence | Next step |
|---|---|---|---|---|
| No single list of what is running | Machines, bots, Workers, and launchd jobs are spread across this page, [`MASTER.md`](agent-instructions/MASTER.md), and individual skills. The next agent rediscovers them. | [Backstage](https://github.com/backstage/backstage), the idea only: one `estate.yaml`. Do not run the portal. | Apache-2.0 | On the M5, draft one YAML file: repo, url, health url, deploy, CI, owner rule, secret names only. Add a row in the same PR that creates a repo. Do not commit a secret value. Do not put the file on the M3. |
| The M3 gate is a sentence | Swap and disk are a rule. Nothing in this repo runs the two commands and fails the deploy when the numbers are over the line. | [btop](https://github.com/aristocratos/btop) | Apache-2.0 | Ask, then `brew install btop` on the M5. Use it while looking, not as a launchd service. On the M3, keep the gate as `sysctl vm.swapusage` and `df -h /System/Volumes/Data`. The catalog allows btop on the M3 only as a viewer while a person watches. Do not screenshot a process list into chat; command lines can contain secrets. |
| Day-one scans are not the standing check | This repo's own check is `python3 scripts/validate_repo.py`. The catalog says report-only Trivy, Semgrep, and Dependabot were being rolled out across live repos, and that FloodDash's scan PR waits for the owner. | [Trivy](https://github.com/aquasecurity/trivy), [Semgrep](https://github.com/semgrep/semgrep), [Dependabot](https://github.com/dependabot/dependabot-core) | Trivy Apache-2.0. Semgrep engine LGPL-2.1; registry rules have their own licence. Dependabot core MIT. | Do not open a second scan PR on this markdown repo while [#13](https://github.com/Nonarkara/dr-non-vibecoding-skills/pull/13) is open; that PR already adds a report-only template. On the next code repo that has no scan, add report-only Trivy and Semgrep from the M5 or a cloud agent. Pin the Action to a commit SHA. Set `permissions: contents: read`. Start report-only. Dependabot weekly, grouped, and never auto-merge on FloodDash. Scan output shows file and rule, never a secret value. |
| No dated Cloudflare security audit | Workers and Pages can bill with no cap. [`cf-runaway-cost`](skills/cf-runaway-cost/SKILL.md) is the code review. There is no monthly audit receipt next to it. | [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | MIT | Pin a commit SHA. Refuse the lookalike `netresearch/security-audit-skill`. Run it twice on one public Cloudflare app, from a cloud agent, not from the M3, and not as an auto-fix. Write findings to an ignored folder. FloodDash waits for the owner. |
| Python jobs have no lockfile | The catalog says the estate had no Python lint, and that repos were on bare `requirements.txt`, so a scheduled job can break when a library moves. | [uv](https://github.com/astral-sh/uv) and [Ruff](https://github.com/astral-sh/ruff) | uv Apache-2.0, also MIT. Ruff MIT. | On the M5, pick one Python ingest that is not FloodDash. Add `pyproject.toml` and `uv.lock`. Turn Ruff on for the narrow set only (`E9,F63,F7,F82`). Do not reformat the repo in that PR. Prefer a pinned `astral-sh/setup-uv` Action over `curl \| sh`. |
| Private admin URLs have no stated login | Non Writer, Non Meet, and bot consoles are not written down as public or private. A public tunnel with no login is the wrong default for an admin page. | [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) | Cloudflare account service. No source was copied. Free for up to 50 users, per the catalog. | List the admin and bot URLs. Leave FloodDash's public citizen pages public. Put Access in front of the rest. Ask before changing DNS or a tunnel. Do not build a new login system for a private dashboard. |
| Short schedules still want a Mac or Actions | Actions cron is a poor five-minute clock, and another launchd job makes the M3 worse. | [Workers Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) | Cloudflare service. No source was copied. | Move a small JavaScript fetch to a cron Worker. Put keys in `wrangler secret put`, not in `wrangler.toml`. Apply the [`cf-runaway-cost`](skills/cf-runaway-cost/SKILL.md) guards in the same change. Leave heavy Python off Workers. Leave FloodDash's existing backend on the M3 until the owner moves it. |
| Next.js on Cloudflare may still be on the old adapter | The catalog says a live app still uses deprecated `@cloudflare/next-on-pages`. The repo name is not repeated here. | [OpenNext for Cloudflare](https://github.com/opennextjs/opennextjs-cloudflare) | MIT | On the M5, search for `@cloudflare/next-on-pages`. If it is present, plan the OpenNext move in that app's own PR. A static site that does not need a Next server stays static. |
| Palette stops slop and does not show a real flow | [Palette](https://github.com/Nonarkara/palette) and [`no-design-tells`](skills/no-design-tells/SKILL.md) reject the default AI look. They do not show a recorded journey from a product that shipped. | [Dark Design](https://dark.design) now. [Pageflows](https://pageflows.com) when a paid reference is worth it. | Dark Design: a website, free to browse as of the catalog check, nothing to install. Pageflows: a paid site. The catalog recorded a trial of about $2.95 for 3 days, then about $99/year, checked 9 Oct 2026. No source was copied. | Before a multi-step screen, name one real flow. Use Dark Design while the budget is zero. Ask before paying for Pageflows. Do not copy a bento grid, a gradient hero, or a three-card row. Those fail the Palette rules even if a gallery shows them. |
| Non Writer's prose pass is not the same file as this repo's | [`no-ai-tells`](skills/no-ai-tells/SKILL.md) is the house list. The catalog still marks stop-slop ADOPT for products that draft text for people, and says to merge it with the writing practice. | [stop-slop](https://github.com/hardikpandya/stop-slop) | MIT | Do not vendor the phrase list into this repo. [#13](https://github.com/Nonarkara/dr-non-vibecoding-skills/pull/13) already records that choice. When a Non Writer prompt is next edited, point it at `no-ai-tells` and use stop-slop as a checklist. Keep this repo's em dashes. Skip stop-slop's bans on em dashes, all adverbs, and question-word openers. Ask before installing the skill into every agent. |

## Gaps with no ADOPT tool

These are real. Forcing a catalog row onto them would be a false match.

| Gap | Why no ADOPT row | Next step |
|---|---|---|
| Page only after 10 minutes | btop is the ADOPT monitor, and the catalog says it is not an alerter: it shows now, not history. Grafana and Prometheus are LATER. Playwright is ADOPTED and is a test runner, not a pager. | Write "page only after 10 minutes" into each service's wake list, in the form [`observability-budget`](skills/observability-budget/SKILL.md) already uses: who acts, what they do, and when. Keep one channel. Do not install a metrics stack to hold this rule. |
| GitHub Actions budget | Dependabot updates Actions. It does not cap the bill. The standing contract already states a hard $10 budget. | Treat a missing Action as blocked until the run exists. Run `python3 scripts/validate_repo.py` locally and paste the output. Do not widen a workflow to "make CI green" while billing is blocked. |
| Google, no card | No toolbox entry is "do not attach a card." The rule is in the standing contract and in [`now-stack.md`](now-stack.md). | Before any `gcloud` command, confirm the project has no billing account. If the console asks for a card, stop. Keep `min-instances` at 0 on Cloud Run. |

## What this page did not do

- It did not install Trivy, Semgrep, Ruff, uv, btop, or the Cloudflare audit skill.
- It did not re-open the live repos the catalog called "rollout in progress."
- It did not re-check Pageflows' price after 9 Oct 2026.
- It did not ssh to the M3 or the M5.
- It did not copy the toolbox into this repository.
