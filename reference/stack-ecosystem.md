# Stack Ecosystem Map

A survey of the wider GitHub ecosystem the practice sits in, mapped to the 91 skills, 15 playbooks, 11 references, and 13 templates in this repo. Read this when you are wondering "should I add a skill for X?" — this file is the answer to that question, kept current so the question is not asked from scratch each quarter.

The map has three columns: **what's covered** (a skill in this repo owns the decision), **what's missing** (a real gap a future skill could close), and **what we deliberately did not copy** (a real tool we considered and rejected, with the reason). The list is the *ecosystem*; the columns are the *stance*.

Last reviewed: 2026-09-11. The "missing" column is a backlog, not a TODO. The "not copied" column is a written choice, not an oversight.

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

---

## Round 2 — anti-slop aesthetics, practical cybersec, reverse-engineering

A second pass through ecosystem repos, focused on three gaps the first round missed: **named aesthetics** (so the brief "make it not generic" has a real answer), **operator-side cybersecurity** (so the `appsec-stack` skill is paired with a toolkit map, not a sermon), and **reverse-engineering workflows** (so "rebuild this site" has a decision tree, not a vibe).

Each row follows the same three columns as round 1: **what's covered**, **what's missing**, **why we did not copy**. The two new gap-fill references — `named-aesthetics.md` and `reverse-engineering-decision-tree.md` — close two of the "missing" cells.

### Anti-slop aesthetics

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [Koomook/claude-frontend-skills](https://github.com/Koomook/claude-frontend-skills) | The four-dimensional approach (typography, colour & theme, motion, background) is the *recipe shape* the new `reference/named-aesthetics.md` uses. The anti-patterns checklist is the seed of `no-design-tells`. | The actual CSS custom-property system for each named theme (Cyberpunk, Brutalist, Vaporwave, Nordic). | The themes are reference recipes in the new file, not vendored CSS. The discipline travels; the palette is one of many. |
| [designskills.dev](https://designskills.dev/sources) (MengTo/Skills — 91 skills) | The meta-curation pattern (a directory of skill collections) is referenced by `skill-writing` and the load-bearing skill count claim in this repo. | A direct `reference/design-skill-collections.md` index. | The directory is one of several inputs; the 91 skills here are curated by incident, not by coverage of someone else's collection. |
| [designskills.dev](https://designskills.dev/sources) (bergside/awesome-design-skills — 67 named aesthetics) | The 12 starter aesthetics in `reference/named-aesthetics.md` are the *minimum-viable* subset of the 67. The rest are referenced by name only. | Per-aesthetic deep-dive recipes. | One-aesthetic-per-skill is the wrong shape for this repo; the *catalog* format is the right one. |
| [designskills.dev](https://designskills.dev/sources) (Leonxlnx/taste-skill — anti-slop layer) | The premise is owned by `no-design-tells` and `axiom-design-core` in this repo. The two skills are the agent-facing form of the anti-slop stance. | — | Already covered. |
| [designskills.dev](https://designskills.dev/sources) (nextlevelbuilder/ui-ux-pro-max-skill — searchable database) | The pattern of a *searchable* design database is referenced by `data-catalog` (which is the data-source equivalent). | A local palette / type / chart database for this repo's projects. | The discipline is in the data-catalog skill; the database is an operator decision. |
| [designskills.dev](https://designskills.dev/sources) (plugin87/ux-ui-agent-skills — DTCG tokens, WCAG audits) | The DTCG token pattern is referenced by `design-dna`. The WCAG audit pattern is referenced by `no-design-tells`. | An explicit `reference/wcag-audit-recipe.md`. | The discipline is in the skills; the audit recipe is a future reference. |
| [designskills.dev](https://designskills.dev/sources) (Rampstack/website-lifecycle) | The lifecycle stages (brand, logos, forms, onboarding, conversion) are referenced by `cognition-first` (design for the human who shows up) and `dashboard-discipline` (product UI is not a landing page). | A per-stage checklist. | The stages are surfaced in the design discipline; a per-stage checklist would duplicate. |

### Practical cybersecurity (operator side)

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [26zl/cybersec-toolkit](https://github.com/26zl/cybersec-toolkit) — 670+ tools, 18 modules, MCP server | The *stance* (a governed, profile-driven, MCP-exposed tool index) is the reference model for `cso` (Chief Security Officer skill) and `appsec-stack`. The profile concept (`ctf`, `redteam`, `web`, `osint`, `forensics`, `pwn`, `mobile`, `cloud`, `blockchain`, `wireless`, `lightweight`, `blueteam`) is the answer to "which tools for which job." | A `reference/cybersec-profiles.md` that maps each profile to a starting checklist. | The toolkit is operator-side installation; the discipline is in `cso` + `appsec-stack`. The reference would be a worthwhile future addition. |
| [OWASP Cheat Sheet Series](https://github.com/OWASP/CheatSheetSeries) | The cross-cutting discipline is owned by `appsec-stack` (the seven layers). The cheat sheets are the *topic-by-topic depth* the skill references. | Per-cheat-sheet pointers in `appsec-stack`. | A pointer list would be useful but is a documentation addition, not a new skill. |
| [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) | The web-vulnerability pattern library is the *one-stop* the `cso` skill points an operator to for any web pentest. | A first-50-checklist curated for the most common 5 payloads per class. | The repo is the canonical reference; a curated excerpt would go stale. |
| [SecLists](https://github.com/danielmiessler/SecLists) | The wordlist resource is named in `cso` as a starting asset for any recon or fuzzing task. | — | Already covered by name. |
| [HackTricks](https://github.com/HackTricks) | The pentesting technique book is the *why* companion to `cso`. The skill points the operator there for any technique the skill itself doesn't cover. | — | Already covered by name. |
| [Nuclei](https://github.com/projectdiscovery/nuclei) | The vulnerability-scanner-with-templates pattern is referenced by `appsec-stack` (layer 5: SAST) and the deploy pipeline (CI gate). | A `templates/nuclei-ci.yml` snippet. | The pattern is in the skill; the template is a one-time copy when a project adopts Nuclei. |
| [scadastrangelove/awesome-ai-security-tools](https://github.com/scadastrangelove/awesome-ai-security-tools) | The AI/ML security attack-surface map is referenced by `appsec-stack` (layer 7: exploit verify) and `cso`. | An `reference/ai-security-attack-surfaces.md` index. | The directory is a starting point; the discipline is in the skill. |
| [8kSec/awesome-ai-security](https://github.com/8kSec/awesome-ai-security) | Same as scadastrangelove; the two directories complement. | — | Same. |
| [GuardDog](https://github.com/DataDog/guarddog) | The malicious-package scanner pattern is the *supply-chain* layer of `appsec-stack` (layer 4: SCA). | A `reference/guarddog-vs-snyk-vs-osv.md` decision matrix. | The matrix is a worthwhile future reference. |
| [Promptfoo](https://github.com/promptfoo/promptfoo) | The LLM red-team harness is referenced by `appsec-stack` (layer 7) and `careful` (the careful operator mindset). | A `reference/promptfoo-eval-recipes.md`. | The discipline is in the skills; the recipes are a project decision. |
| [NVIDIA Garak](https://github.com/NVIDIA/garak) | The LLM vulnerability scanner is the *second* LLM-red-team option alongside Promptfoo; both are named in `appsec-stack`. | A Garak-vs-Promptfoo decision matrix. | The matrix is a worthwhile future reference. |
| [Adversarial Robustness Toolbox](https://github.com/Trusted-AI/adversarial-robustness-toolbox) | The adversarial-ML layer is named in `appsec-stack` as the *beyond-prompt-injection* scope. | — | Already covered by name. |
| [aw-junaid/cybersec-projects](https://github.com/aw-junaid/cybersec-projects) | The hands-on project pattern is the *learning* path an operator follows before they reach the `cso` skill. | — | The project list is a *learner* resource, not a production toolkit. The repo's `cso` skill assumes the operator has done some of these. |

### Reverse-engineering & website cloning

| Repo | What's covered | What's missing | Why we did not copy |
|---|---|---|---|
| [Mood-Global-Services/How-to-Clone-Website](https://github.com/Mood-Global-Services/How-to-Clone-Website---Claude-Skills) | The reverse-engineering *workflow* (Chrome MCP probe → tokens + assets → parallel builder agents in isolated worktrees) is the orchestration pattern the new `reference/reverse-engineering-decision-tree.md` references. | A `playbook/16-reverse-engineering-walkthrough.md` that runs the full pipeline on a real site. | The decision tree is the load-bearing addition; the walkthrough is a future playbook. |
| [skillsllm.com — claude-skill-web-clone](https://skillsllm.com/skill/claude-skill-web-clone) | The five-path decision tree (Static → wget; React/Vue/Next → rebuild; SPA → network-capture; Multi-page → route-crawl; WebGL → mirror) is the spine of the new `reference/reverse-engineering-decision-tree.md`. | Per-path executable recipes as `scripts/`. | The recipes are inline in the reference; scripts would be one-time copies. |
| [JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) | The Node 24+ rebuild template is named in `reference/reverse-engineering-decision-tree.md` Path 2 as a starting point. | A `templates/ai-clone-rebuild/` scaffold. | The template is one git clone away; a forked template would couple. |

---

## How this file is maintained

This is a **snapshot, not a permanent fixture.** When a repo in the "missing" column gets a skill, that row's "missing" cell becomes empty. When a repo in the "what we covered" column gets stale (the skill no longer matches the upstream), the row moves to "stale — audit." When a new tool surfaces with 1k+ stars and recent activity, it is added to the table.

The cadence is **quarterly**. The 1st of January, April, July, October. The audit is a single sitting — read the list, update the table, commit. A tool that has not been touched in six months is moved to the "deliberately not copied" column with a one-line reason.

The skill that owns this file is [`skill-writing`](../skills/skill-writing/SKILL.md) — the discipline for adding things to the repo, applied to the meta-level of "which ecosystem tools are we tracking."
