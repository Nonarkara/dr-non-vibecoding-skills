# The Gap Audit — what 100 repos say is missing

*2026-09-09 — the user said: "if I want this repo to go as viral as Gary Tan's skill repo, what else do I need? Audit, check and find gaps of skills we still need + re-read our history and, since many of our systems are working, distill how I prompt Ai agents to achieve the goal - no matter how unconventional and set that up as a way to connect with any AI agents to understand the way of working of Dr Non."*

Followed mid-turn by a list of ten capabilities the author considers core, and then:
*"Pretty much check my project codebases and identify what skills to have to build these."*

## What the codebases actually say

Ninety-nine repositories under `Nonarkara`, surveyed by name taxonomy, with
`nst-control-tower` cloned and read in full. Three findings, in order of size.

### 1. The product line is real, and it is not named anywhere

Five repositories are called a control tower — `nst`, `chula`, `praram9`,
`chonburi`, `kmitl` — plus `kuching-ioc`, `city-hub`, and roughly ten city
dashboards with the same job. Add the near-duplicate pairs: `globalmonitor` /
`globalmonitor-v3`, `FloodDash` / `FloodDash-Blueprint`,
`smart-city-thailand-index` / `-monitor`, four `ikigai-finance` repos,
`mtt-dashboard-v2`, three `tkc` repos.

`nst-control-tower` has a clean shape — pnpm workspace, `apps/{api,forecast,web}`,
`packages/shared`, `public/geo/<place>/` layer tree, a launchd plist, Google Sheets
as the fallback mirror. It also contains `research_yala/`,
`scripts/alphaearth-extract-yala.py`, and `seed-yala-atlas.mjs` — **Yala's work
living inside Nakhon Si Thammarat's repository.** That is the fork-drift this repo
already documented once, in `itic-cctv-integration`: *"dashboards/chonburi — a
near-verbatim fork, missing the chula hardening."*

The highest-value missing skill in the whole collection is therefore not a new
capability. It is **the city-instance contract**: what is shared spine, what is
per-place configuration, and how the sixth city takes a day instead of a week.

**Not built, deliberately.** Deciding where the seam runs between spine and
instance is an architecture decision with real cost either way, and per
[`director-not-typer`](../../skills/director-not-typer/SKILL.md) that is the
director's call, not the agent's. It is the first thing to decide next.

### 2. Two named capabilities had zero coverage

`non-scrape` is an entire private repository. Across 75 skills, `robots.txt`,
`pagination`, and `selenium` returned **zero hits**. Scraping was one of the ten
capabilities named, and the collection said nothing about it.

Geospatial was worse than it looked. `map-3d-city` covers 3D buildings and
`satellite-change-watch` covers raster time-stacks, but `EPSG` returned zero hits
across every skill and reference — while `nst-control-tower` ships eighteen
GeoJSON layers, a `slim_geojson.py`, and its own README about slimming them. The
knowledge existed in one repo's scripts folder and nowhere in the collection.

**Built:** [`deep-scraping`](../../skills/deep-scraping/SKILL.md),
[`geospatial-core`](../../skills/geospatial-core/SKILL.md).

### 3. Two gaps the author did not name, which are larger

**Accessibility.** Eight design skills, and `WCAG` and `contrast ratio` returned
zero. The only coverage was a four-line gate at the end of `no-design-tells`. For
a practice whose stated reader is *"someone on a five-year-old Android, in a
flood, who may not read English"*, and whose output is public civic dashboards,
this was the least defensible gap in the repository.

**Personal data.** `PDPA` and `GDPR` returned zero — in a collection that ships
CCTV grids, Line and Telegram bots, and now logins and billing.
[`risk-posture`](../../skills/risk-posture/SKILL.md) had the right *strategy*
(a system that never holds personal data cannot leak it) and nothing operational
for the cases where the architecture already lost that argument.

**Built:** [`accessible-by-default`](../../skills/accessible-by-default/SKILL.md),
[`data-protection-pdpa`](../../skills/data-protection-pdpa/SKILL.md).

## What was checked and found already covered

| Named capability | Where it already lives |
|---|---|
| RAG + Telegram/Line chatbot | `simple-rag`, `messaging-gateway`, `local-llm-ollama` |
| Dashboards of all kinds | `dashboard-discipline`, `data-display`, `radar-chart-pattern` |
| Lots of API connections | `data-catalog`, `mcp-cli-first`, `reference/free-apis.md` |
| IPTV | `iptv-streaming` |
| CCTV wiring | `home-cctv-grid`, `itic-cctv-integration` |
| Design thinking | `design-thinking-vibecoding`, `design-method` |
| Satellite data | `satellite-change-watch`, `DrNon-Global-Satellite-Toolkit` |
| **Good writing, Non-Writer style** | `no-ai-tells` §5 — already specified, and correctly delegated to `nonwriter.nonarkara.org` rather than duplicated |

YouTube wiring was named and is uncovered, but it belongs as a section inside
`iptv-streaming` (same HLS and embed problems) rather than as a new skill.

## Identified, ranked, not built

Each of these is real. None was built, because five skills in one leg is already
the politeness ratchet [`agent-relay`](../../skills/agent-relay/SKILL.md) warns
about, and an honest unbuilt list is worth more than three mediocre additions.

1. **City-instance contract** — the product line above. Highest value, needs a director's decision first.
2. **`rollback-first`** — `ship-discipline` is forward-only; `restore-drill` restores data, not service. Nothing says *restore service, then diagnose*. `rollback` returned one hit across 75 skills.
3. **`migration-discipline`** — expand-contract schema change. Zero hits, and `auth-entitlement` just introduced tables that will need it.
4. **`spend-guardrails`** — token and cloud budget caps. `budget alert` returned zero; `google-cloud-run` has `--max-instances` and nothing else.
5. **`skill-evals`** — a deterministic check that a skill actually fires. Also the missing proof for the virality problem: "80 skills" is a count, not evidence.
6. **`pricing-and-packaging`** — `stripe-checkout-billing` is mechanics; what to charge is unwritten.

## Honest limits

- **One repository was read in full.** The other ninety-eight were surveyed by name, visibility, and push date. The product-line finding is strong because the naming pattern is unambiguous and one instance confirmed it; the rest is inference and is labelled as such.
- **The private repos were not opened**, including `non-scrape` — the skill that names it was written from general practice plus the repo's own doctrine, not from that code. If `non-scrape` already encodes a better pattern, the skill should be corrected against it, and that is a proper next relay leg.
- **The virality question has no receipts here.** Nothing in this repository has gone viral, so every claim about what would make it spread is reasoning, not evidence. It is written down so it can be falsified.
