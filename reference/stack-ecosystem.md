# Stack Ecosystem Map

A survey of the wider GitHub ecosystem the practice sits in, mapped to the 91 skills, 13 playbooks, 7 references, and 12 templates in this repo. Read this when you are wondering "should I add a skill for X?" — this file is the answer to that question, kept current so the question is not asked from scratch each quarter.

The map has three columns: **what's covered** (a skill in this repo owns the decision), **what's missing** (a real gap a future skill could close), and **what we deliberately did not copy** (a real tool we considered and rejected, with the reason). The list is the *ecosystem*; the columns are the *stance*.

Last reviewed: 2026-09-10. The "missing" column is a backlog, not a TODO. The "not copied" column is a written choice, not an oversight.

---

## Core full-stack templates

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [vercel/next.js](https://github.com/vercel/next.js) | The framework underlying most of the public demo surfaces in this repo's templates. | Specific Next.js App Router patterns, RSC, Server Actions. | We ship stack-agnostic; the Next.js adapter is one of many. |
| [T3-oss/create-t3-app](https://github.com/t3-oss/create-t3-app) | The `full-stack-bootstrap` skill picks a stack from a 4-question pre-flight. T3 patterns are referenced in the templates. | A concrete "T3 adapter" template for a contributor who wants Next.js + tRPC + Prisma + Auth.js out of the box. | The repo is a *playbook* for stack-agnostic decisions, not a Next.js+T3 starter. Wrong layer. |
| [fastapi/full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template) | The Python equivalent of a T3 starter; referenced in `full-stack-bootstrap` as the "Python + FastAPI" default. | An explicit `templates/python-fastapi/` scaffold. | The bootstrap skill already names the template. Adding a forked template would duplicate. |
| [wasp-lang/open-saas](https://github.com/wasp-lang/open-saas) | `stripe-checkout-billing` is the SaaS payment surface; `production-spine` is the maturity label. | A single-command "make this a SaaS" scaffolder. | The two are deliberately separate so the operator can ship a non-SaaS product without dragging Stripe. |
| [ixartz/Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) | The DX it ships is referenced by `karpathy-guidelines` (surgical edits) and `ponytail` (YAGNI ladder). | A direct vendoring path. | The DX it ships is a *style*; vendoring a starter is a *coupling*. Wrong layer. |

## Dashboards, admin panels, UI foundations

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | The whole design discipline in this repo (`axiom-design-core`, `design-dna`, `no-design-tells`, `dashboard-discipline`) is the agent-facing form of shadcn's principle. | A direct `templates/shadcn-next/` scaffold. | The repo is *style-agnostic*; the shadcn look is one of many. The discipline travels, the look does not. |
| [ant-design/ant-design-pro](https://github.com/ant-design/ant-design-pro) | A pattern reference for the `dashboard-discipline` skill. | An Ant Design adapter. | Ant Design is opinionated enterprise; the practice targets minimalist civic / indie look. |
| [tremorlabs/tremor](https://github.com/tremorlabs/tremor) | `data-display` skill covers the discipline (charts that do not lie); Tremor is one implementation. | A Tremor-specific recipe. | `data-display` is the discipline; Tremor is the implementation. The discipline travels. |
| Recharts | The same. | — | The same. |

## Chatbots & AI interfaces

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [vercel/ai](https://github.com/vercel/ai) (AI SDK) | `messaging-gateway` (Telegram/Line/WhatsApp with RAG); `obsidian-mcp-forge` (memory via MCP). | A `reference/ai-sdk-patterns.md` that documents the streaming / tool-use / multi-provider patterns this repo uses. | The skill collection references the AI SDK in passing; a dedicated reference would be the right addition. |
| [vercel/chatbot](https://github.com/vercel/chatbot) | `messaging-gateway` covers the bot pattern. | A multi-channel reference (one bot per channel, same memory). | The pattern is in the skill; the template would be redundant for any one channel. |
| [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) | The UX primitives are referenced by `ux-archaeology` (study before building). | An assistant-ui integration recipe. | The discipline is in the skills; the library is one of several. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) + [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | `messaging-gateway` uses similar primitives (memory, tools, RAG) but is framework-agnostic. | A LangChain-vs-Bare-SDK decision tree. | The skills in this repo work with the bare SDK; the framework is one of many. |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | The visual-builder pattern is referenced by `narrative-companion-surfaces`. | A Flowise integration recipe. | Visual builders are an alternative to agent-skills, not a complement. |
| [RasaHQ/rasa](https://github.com/RasaHQ/rasa) | — | A reference for non-LLM conversational flows (forms, deterministic). | A non-LLM bot is a different product; the current skills assume LLM-driven. |
| [chatwoot/chatwoot](https://github.com/chatwoot/chatwoot) | — | A reference for customer-support bot patterns. | Same as Rasa. |

## Databases, ORMs, analytics

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [supabase/supabase](https://github.com/supabase/supabase) | The Postgres + Auth + Realtime + Storage combo is the default for any new project (see `full-stack-bootstrap` Q1). | A `templates/supabase/` scaffold with the convention tables pre-wired. | The bootstrap skill already names it. Adding a forked template would duplicate. |
| [prisma/prisma](https://github.com/prisma/prisma) | The ORM convention for many of the templates; `data-catalog` is the place to record the schema. | A Prisma + Drizzle decision tree. | `data-catalog` is framework-agnostic; the decision tree is the next-level skill. |
| [drizzle-team/drizzle-orm](https://github.com/drizzle-team/drizzle-orm) | Same as Prisma — the lightweight alternative. | Same. | Same. |
| [neondatabase/neon](https://github.com/neondatabase/neon) | The serverless-Postgres + branching pattern is referenced by `always-on-services` and the deploy templates. | A `references/neon-branching.md` that documents the deploy + branch-preview flow. | A worthwhile reference to add in a future quarter. |
| [ClickHouse/ClickHouse](https://github.com/ClickHouse/ClickHouse) | `data-display` and `health` cover the analytics *discipline*; the storage layer is a separate choice. | A ClickHouse-specific pattern reference. | The discipline travels; the storage choice is a project call. |
| [fastapi/fastapi](https://github.com/fastapi/fastapi) | The Python API framework; referenced by `full-stack-bootstrap` Q1. | A `templates/fastapi/` scaffold. | Same as T3. |

## Authentication & account systems

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [nextauthjs/next-auth](https://github.com/nextauthjs/next-auth) (Auth.js) | The default auth choice in many templates; `reference/security-hygiene.md` covers the secrets discipline. | A concrete `templates/next-auth/` config. | A starter config is one git clone away; the discipline is the load-bearing part. |
| [better-auth/better-auth](https://github.com/better-auth/better-auth) | The modern alternative; the `enterprise-rbac-and-sso` skill (added by concurrent harvest) covers the RBAC + SSO discipline. | A direct integration recipe. | The discipline is in the skill; the recipe is a future reference. |
| [clerk/javascript](https://github.com/clerk/javascript) | The hosted-auth path. | A `reference/clerk-vs-better-auth-vs-authjs.md` decision matrix. | The matrix is a worthwhile addition; the patterns are not in this repo's scope. |
| [supabase/auth](https://github.com/supabase/supabase) | The Postgres-native path. | — | Covered by supabase row above. |
| Stack Auth | A self-hosted Clerk alternative. | — | A worthwhile candidate if "self-hosted" becomes a constraint. |

## Maps & geospatial

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [maplibre/maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js) | The `map-3d-city` and `legible-systems` skills. | A `templates/maplibre/` scaffold with the design tokens wired. | The skills ship the discipline; the scaffold is a one-time copy. |
| [Leaflet/Leaflet](https://github.com/Leaflet/Leaflet) | The lightweight 2D alternative. | A Leaflet adapter reference. | A worthwhile addition for non-3D map needs. |
| [openlayers/openlayers](https://github.com/openlayers/openlayers) | A power-user GIS alternative. | A reference. | The practice is not GIS-heavy; OpenLayers is overkill for most surfaces. |
| Martin (tile server), Turf.js, MapLibre Native | A future reference for server-side tile generation and geometry analysis. | — | The current 2D / 3D map skills cover the common case. |

## CCTV / NVR / camera unification

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [blakeblackshear/frigate](https://github.com/blakeblackshear/frigate) | The `home-cctv-grid` skill covers the *discipline* (one honest grid, local storage, snapshot/stream/pin modes). | A Frigate-specific `reference/frigate-setup.md` with the config that wires Frigate into the home-cctv-grid pattern. | The discipline is in the skill; the recipe is a worthwhile reference to add. |
| [ZoneMinder/zoneminder](https://github.com/ZoneMinder/zoneminder) | A long-standing alternative. | A `reference/zoneminder-vs-frigate.md` decision matrix. | The matrix is a worthwhile addition; the practice has not picked a default. |
| [roflcoopter/viseron](https://github.com/roflcoopter/viseron) | A local-only alternative. | — | A candidate if "no cloud" is a hard constraint. |
| camera.ui, Moonfire NVR, Scrypted | A future reference for video-integration platforms. | — | Niche until the practice ships a video-integration project. |

## AI / agent infrastructure

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | The `caveman` skill — output compression, byte-exact code. | A `references/caveman-when-to-use.md` (paired with `ponytail` and `context-economy`). | The skill is the discipline; the reference is a future addition. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | The `ponytail` skill — YAGNI decision ladder. | Same. | Same. |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | The design discipline in `axiom-design-core` / `design-dna` / `no-design-tells`. | An Impeccable-specific integration recipe. | The discipline is the load-bearing part; the recipe is a one-time copy. |
| [DietrichGebert/retriever](https://github.com/DietrichGebert/retriever) | `messaging-gateway` + `obsidian-mcp-forge` cover the retrieval pattern. | A retriever-vs-bare-RAG decision tree. | The skill collection covers the pattern. |
| [usestrix/strix](https://github.com/usestrix/strix) | The `cso` skill orchestrates a similar audit; `appsec-stack` is the pipeline. | A `reference/strix-when-to-run.md`. | The discipline is in the skills; the reference is a future addition. |
| [garrytan/gstack](https://github.com/garrytan/gstack) | The audit cadence in `cso`, `canary`, `devex-review`; the review-lens discipline in `adversarial-review`. | A gstack-style slash-command mapping (Tier 1 of the gstack comparison). | The 8 skills that close the Tier-1 gaps are already in the repo; the slash-command surface is a different layer. |

## Hosting & infra

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [fly.io/flyctl](https://github.com/superfly/flyctl) | `google-cloud-run` is the cloud-run pattern; `reference/hosting-matrix.md` is the comparator. | A `references/fly-deploy.md` recipe. | A worthwhile addition if the operator uses Fly. |
| [vercel/vercel](https://github.com/vercel/vercel) | `deploy-verification` covers the existence test; `templates/deploy-pages.sh` is the CDN-deploy script. | A Vercel-specific recipe. | The skill is platform-agnostic. |
| [netlify/build](https://github.com/netlify/build) | The same. | — | — |
| [cloudflare/cloudflared](https://github.com/cloudflare/cloudflared) | `always-on-services` is the launchd + Cloudflare Tunnel pattern. | A cloudflared config recipe. | The skill is the pattern; the recipe is platform-specific. |
| Coolify / Dokku / self-hosted PaaS | — | A comparison reference. | The practice assumes one machine; full PaaS is overkill. |

## Observability & dev tools

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| Sentry, OpenTelemetry, Grafana, Prometheus | `production-spine` is the maturity label; `health` is the quality dashboard. | A specific observability reference. | The discipline is in the skills; the tool is one of several. |
| Playwright, Vitest, Jest | The test discipline in `karpathy-guidelines` and the verify discipline in `careful`. | — | The discipline travels; the library is one of several. |
| GitHub Actions | The CI template pattern in `stack-repo-topology`. | A `templates/ci.yml` with the right gates. | The skill is the pattern; the template is a one-time copy. |

## The "what we deliberately did not copy" stance

The list above names specific repos. The list below names specific *patterns* we did not adopt:

- **A 100-skill "wonder pack"**. `skill-writing` is explicit: "do not vendor a 100-skill pack." The collection is curated by incident, not by coverage.
- **A complex build pipeline with a custom CLI**. `setup.sh --become-builder` is the one-liner. The setup is a single file the operator can read.
- **A framework-specific design system**. The design DNA is *system-agnostic*; the templates are the layer where the framework (shadcn, Ant Design, etc.) is chosen.
- **A hosted-only auth provider as a hard requirement**. Auth is one of: Auth.js, Better Auth, Clerk, Supabase auth. The collection supports all four; a future operator picks one.
- **An LLM-agent framework as a hard requirement**. The collection works with the bare SDK; LangChain / LangGraph / Vercel AI SDK are *one of several* options, not a foundation.
- **A "the model does the right thing" prompt**. The collection is rules + tests + review, not trust.

The stance is **the discipline travels, the implementation is one of many.** A new skill is added when the *discipline* is missing; a new reference is added when the *implementation* needs documentation. A new dependency is added when the operator chooses to adopt a tool; the repo does not adopt a tool on the operator's behalf.

## How this file is maintained

This is a **snapshot, not a permanent fixture.** When a repo in the "missing" column gets a skill, that row's "missing" cell becomes empty. When a repo in the "what we covered" column gets stale (the skill no longer matches the upstream), the row moves to "stale — audit." When a new tool surfaces with 1k+ stars and recent activity, it is added to the table.

The cadence is **quarterly**. The 1st of January, April, July, October. The audit is a single sitting — read the list, update the table, commit. A tool that has not been touched in six months is moved to the "deliberately not copied" column with a one-line reason.

The skill that owns this file is [`skill-writing`](../skills/skill-writing/SKILL.md) — the discipline for adding things to the repo, applied to the meta-level of "which ecosystem tools are we tracking."
