# SEO / GEO Connectors — Search Console, Keyword Data, Citability

Two separate questions get asked under one banner ("do our SEO"): *how are we
doing in Google Search*, and *can an AI answer engine find and cite us at
all*. This file catalogs the connectors and data sources for both. Neither
question is answered by installing a skill pack that scores a number — see
[`geo-citability`](../skills/geo-citability/SKILL.md) for the behaviour this
file's sources feed.

This repo has no runtime and nothing to compile. It does not vendor MCP
server code any more than [`reference/design-extractors.md`](design-extractors.md)
vendors a design-token extractor — it names the connector, its trade-offs,
and points at the source. Last reviewed 2026-09-19.

---

## Google Search Console — MCP servers

An MCP server here is a thin, mostly-interchangeable wrapper over the same
Google Search Console API. The differences that matter are auth model, data
custody, and whether it pre-computes diagnostics or hands back raw rows.

| Repository | Tools | Auth | License | Verdict |
|---|---|---|---|---|
| [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc) | 20 | OAuth or service account | MIT | **Default.** Most mature signal (1.6k★, 216 forks, unit tests, Docker), dual auth, data never leaves your own OAuth session. |
| [Suganthan-Mohanadasan/Suganthans-GSC-MCP](https://github.com/Suganthan-Mohanadasan/Suganthans-GSC-MCP) | 29 | OAuth or service account | Apache-2.0 | **Upgrade path.** Pre-built diagnostics on top of the same API — keyword cannibalization, content decay, quick-wins, image SEO. Reach for this when the question is "what's wrong," not just "show me the numbers." |
| [ahonn/mcp-server-gsc](https://github.com/ahonn/mcp-server-gsc) | 1 | Service account | MIT | **Refused as a default.** A single `search_analytics` tool — thin enough that curling the API directly is barely more work. |
| [AKzar1el/mcp-gsc](https://github.com/AKzar1el/mcp-gsc) | 17 | Hosted OAuth, no local key management | MIT | **Flag the trade-off, don't default to it.** "No API keys" means your GSC data round-trips through a third party's hosted server. Fine for a quick check, not for a client's production data without their sign-off. |
| [ncosentino/google-search-console-mcp](https://github.com/ncosentino/google-search-console-mcp) | 4 | Service account | MIT | Minimal Go/C# connector skeleton — no analysis layer. Only worth it if the stack is already Go/.NET-heavy. |

**Setup, either default or upgrade path:** both require a Google Cloud OAuth
client or service account with Search Console API access and verified
ownership of the property being queried. Neither ships an analysis layer
Google itself doesn't already expose via the API — the value is the MCP
wiring, not new data.

---

## Keyword research — the leverage point is the data vendor, not the wrapper

"OpenSEO" names three **unrelated** projects, confirmed independently, not
forks of one another:

| Repository | What it actually is | Verdict |
|---|---|---|
| [every-app/open-seo](https://github.com/every-app/open-seo) | A real, active SEO SaaS (19.5k★) — keyword research, rank tracking, competitor/backlink analysis. Hosted at openseo.so, or self-host. | **Refused as a vendor target.** It's a full application built entirely on a paid [DataForSEO](https://dataforseo.com) API key, not a connector this repo can cite as infrastructure. The reusable fact underneath it is the data vendor it sits on, not the app. |
| [theshajha/OpenSEO](https://github.com/theshajha/OpenSEO) | A "[WIP]" concept page — 2 commits, no working code behind the pitch. | **Refused.** Nothing to steal. |
| [igorlemes/OpenSEO](https://github.com/igorlemes/OpenSEO) | An OpenCode-based long-form content workspace (research → write → optimize → publish), not a keyword-research tool. | **Refused for this purpose.** Different scope than the name suggests; 0 stars/forks, one worked example — not a maturity signal either way. |

**What to actually cite:** [DataForSEO](https://dataforseo.com) is the paid
API backend every real keyword-research tool above sits on — SERP data,
keyword volume, backlinks, competitor data, billed per call. It has no free
tier. Before building or wiring anything that needs keyword volume or SERP
position data, decide whether the project's budget covers a metered API key
at all; if it doesn't, the honest answer is "keyword research isn't in scope
this round," not a thin wrapper that reinvents the same paid dependency.

---

## GEO / AEO audit tools — cited, never vendored

Several tools score how citable a site is to AI answer engines (ChatGPT,
Perplexity, Gemini, Google AI Overviews). Every one of them ships as a
skill-shaped, installable artifact — a CLI, an MCP server, or literal
`SKILL.md` files — which puts them in this repo's **never-vendor-a-competing-
skill-pack** lane regardless of how the source project describes itself.
They are cited here as research, mined for their rubric shape in
[`geo-citability`](../skills/geo-citability/SKILL.md), and not installed:

- [Auriti-Labs/geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) — the most research-grounded: an 8-category, 47-method audit engine citing external research for its category weights. Read the cited papers yourself before repeating an exact percentage as fact — this repo does not repeat an outside project's statistic without checking the primary source.
- [aretenia/geo-skills](https://github.com/aretenia/geo-skills) — a 6-category weighted rubric shipped as an explicit Agent Skills pack.
- [199-biotechnologies/claude-skill-seo-geo-optimizer](https://github.com/199-biotechnologies/claude-skill-seo-geo-optimizer) — notably honest in its own README about which of its cited 2026 citation-lift numbers it could and couldn't reproduce; a maturity signal worth noting, not a number worth repeating verbatim.
- [onvoyage-ai/gtm-engineer-skills](https://github.com/onvoyage-ai/gtm-engineer-skills) — a 16-check, 6-dimension audit-then-framework-specific-fix shape (Next.js, WordPress); the two-step structure (audit, then a fix scoped to the actual framework) is worth the read even though the pack itself is refused.

## How this catalog is maintained

Snapshot, same discipline as `design-extractors.md`: when a tool's stars
drop or its last commit passes six months stale, the entry is revisited.
Numbers claimed by an external project's own README are marked as such —
never repeated here as this repo's own verified fact without an independent
check.
