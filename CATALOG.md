# Skill Catalog

One hundred sixty focused skills, grouped by the decision they change. Start with one problem;
load one matching skill. The collection is a routing system, not a checklist.

## The smallest useful path

| Moment | Load |
|---|---|
| Choosing what to build | [`dr-non-golden-rules`](skills/dr-non-golden-rules/SKILL.md) + [`design-thinking-vibecoding`](skills/design-thinking-vibecoding/SKILL.md) |
| Entering an existing repository | [`agent-memory`](skills/agent-memory/SKILL.md) + [`anti-regression`](skills/anti-regression/SKILL.md) |
| Scoping a nontrivial change | [`planning-discipline`](skills/planning-discipline/SKILL.md) + [`karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md) |
| Diagnosing a failure | [`systematic-debugging`](skills/systematic-debugging/SKILL.md) |
| Changing a user-visible flow | [`browser-as-t`](skills/browser-as-t/SKILL.md) + [`accessible-by-default`](skills/accessible-by-default/SKILL.md) |
| Closing the work | [`adversarial-review`](skills/adversarial-review/SKILL.md) + [`result-honesty`](skills/result-honesty/SKILL.md) + [`ship-discipline`](skills/ship-discipline/SKILL.md) |
| Before a major release | [`human-walkthrough`](skills/human-walkthrough/SKILL.md) |
| After a year of patches | [`power-of-hindsight`](skills/power-of-hindsight/SKILL.md) |
| Picking up another agent's commits | [`agent-relay`](skills/agent-relay/SKILL.md) |
| Reading a terse or compound brief | [`prompt-like-dr-non`](skills/prompt-like-dr-non/SKILL.md) |

## Think, build, review, ship

| Skill | Load it when… |
|---|---|
| [`design-thinking-vibecoding`](skills/design-thinking-vibecoding/SKILL.md) | Turn lived problems into scoped, agent-built products. Use when framing a new project, finding the narrow MVP, or assigning work across models. |
| [`dr-non-golden-rules`](skills/dr-non-golden-rules/SKILL.md) | Choose the smallest path that ships and earns its keep. Use for architecture, tool selection, build order, and keep-or-kill decisions. |
| [`director-not-typer`](skills/director-not-typer/SKILL.md) | Keep human intent and taste separate from agent implementation mechanics. Use when technical choice menus, ambiguous names, or nontechnical direction would stall work. |
| [`planning-discipline`](skills/planning-discipline/SKILL.md) | Research and publish a scoped implementation plan before editing. Use for nontrivial, ambiguous, risky, or multi-file changes. |
| [`route-dont-scan`](skills/route-dont-scan/SKILL.md) | Identify the target project before scanning. Use at the start of work in a monorepo or multi-project workspace. |
| [`karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md) | Reduce LLM coding mistakes through explicit assumptions, simplicity, surgical edits, and verification. Use when writing, reviewing, or refactoring code. |
| [`argument-construction`](skills/argument-construction/SKILL.md) | Use when an agent must make a case, evaluate a claim, or recognize a fallacy. Eight rules for a good argument + six named fallacies. Pairs with karpathy-guidelines, no-ai-tells. |
| [`ninja-innovation`](skills/ninja-innovation/SKILL.md) | Use before writing code for improve/fix/rebuild requests. Find the simplest path to the real goal — reframe before refactor, subtract before add, reuse before build. |
| [`systematic-debugging`](skills/systematic-debugging/SKILL.md) | Debug by reproducing, collecting, isolating, and verifying. Use when something is broken and the first plausible patch is tempting; skip greenfield work. |
| [`anti-regression`](skills/anti-regression/SKILL.md) | Protect earned behavior and distinctive UI from destructive cleanup. Use before large rewrites or edits to maps, canvases, HUDs, and mature files. |
| [`systems-thinking`](skills/systems-thinking/SKILL.md) | Map feedback loops, flows, time horizons, and leverage points. Use when a problem keeps returning or a local fix creates long-term system cost. |
| [`adversarial-review`](skills/adversarial-review/SKILL.md) | Run a flaw-seeking second pass with executable evidence. Use before merge, after risky changes, or when the author would otherwise review their own work. |
| [`browser-as-t`](skills/browser-as-t/SKILL.md) | Verify user-visible changes by exercising real browser flows. Use for UI, routing, forms, or client state; skip docs-only and server-only work. |
| [`browser-use`](skills/browser-use/SKILL.md) | Use when an agent must drive a real browser to fill a form, navigate a flow, or complete a multi-step user journey. Pairs with browser-as-t. |
| [`result-honesty`](skills/result-honesty/SKILL.md) | Report succeeded, failed, skipped, and unverified with evidence. Use at session end, handoff, deploy closeout, or whenever asked whether it worked. |
| [`build-journal`](skills/build-journal/SKILL.md) | Use when a meaningful change to a project must be recorded. The 5-line flight-recorder discipline. The journal is the narrative, not the log. |
| [`ship-discipline`](skills/ship-discipline/SKILL.md) | Run Commit, Push, Deploy, Test; localhost is not a deliverable. Use when closing work, checking whether a change is live, or making a completion claim. |
| [`wrong-green`](skills/wrong-green/SKILL.md) | Test the failure users care about, not a nearby success metric. Use when CI, deploy logs, health checks, watchdogs, or curl say OK too easily. |
| [`lesson-residue`](skills/lesson-residue/SKILL.md) | Capture verified residue from a painful or surprising session. Use before closing expensive work; skip routine edits. |
| [`context-economy`](skills/context-economy/SKILL.md) | Match response length and shape to the task. Use when prose crowds out results, context repeats, or status needs a concise evidence-backed form. |
| [`skill-writing`](skills/skill-writing/SKILL.md) | Create behavior-changing, triggerable skills and reject prompt-pack sprawl. Use when adding or revising a SKILL.md in this practice. |

## Close the loop

Ship is not the end. A screenshot is not a walkthrough. A lesson from one session is not a year of data.

| Skill | Load it when… |
|---|---|
| [`human-walkthrough`](skills/human-walkthrough/SKILL.md) | Test a working system with a real older nontechnical first-time user, then run first-time, returning, and extreme browser walkthroughs. Use before a major release or rebuild. |
| [`power-of-hindsight`](skills/power-of-hindsight/SKILL.md) | Data-driven retrospective: collect every signal, analyze statistically, reconstruct from what works. Use to escape the Frankenstein phase and ship a coherent whole. |

## Memory, harness, and agent surfaces

| Skill | Load it when… |
|---|---|
| [`agent-memory`](skills/agent-memory/SKILL.md) | Write project context that survives sessions. Use when creating AGENTS.md or CLAUDE.md, recording gotchas, or repeatedly re-explaining a repository. |
| [`shared-memory-hub`](skills/shared-memory-hub/SKILL.md) | Persist verified lessons across agents in an Obsidian-backed memory hub. Use when capturing cross-session decisions, failures, and project context. |
| [`harness-hardening`](skills/harness-hardening/SKILL.md) | Audit whether agent rules, specialists, and hooks actually exist and fire. Use when setting up or debugging an AI coding harness. |
| [`mcp-cli-first`](skills/mcp-cli-first/SKILL.md) | Use the strongest operation surface: connector, CLI, API, then GUI. Use when a cloud or service action can be executed instead of described. |
| [`subagent-routing`](skills/subagent-routing/SKILL.md) | Decide whether to delegate and write a six-field brief. Use when a bounded subtask, independent review, or parallel work could justify a fresh agent. |
| [`agent-relay`](skills/agent-relay/SKILL.md) | Hand work between agents through commits with a baton, a ledger, and a verdict on the previous leg. Use when several agents work one repo in turn. |
| [`prompt-like-dr-non`](skills/prompt-like-dr-non/SKILL.md) | Decode a director's terse, compound prompt into the work it actually asks for. Use when a request is compressed, unconventional, or names a person as spec. |
| [`codex-workbench`](skills/codex-workbench/SKILL.md) | Place repeated Codex behavior in the right surface: prompt, AGENTS.md, skill, plugin, app, automation, hook, or subagent. Use for Codex setup or workflow ports. |

## Production and resilience

| Skill | Load it when… |
|---|---|
| [`production-spine`](skills/production-spine/SKILL.md) | Gate software affecting users, money, or data with evidence for tests, auth, sources, secrets, and boundaries. Use before production-ready claims. |
| [`google-cloud-run`](skills/google-cloud-run/SKILL.md) | Deploy scale-to-zero containerized or source-built web apps to Google Cloud Run. Use when deploying production services with custom domains, Secret Manager, and WIF. |
| [`stripe-checkout-billing`](skills/stripe-checkout-billing/SKILL.md) | Wire Stripe Checkout sessions, billing portal, and signature-verified webhooks for payments. Use when adding subscriptions or one-time purchases to an app. |
| [`auth-entitlement`](skills/auth-entitlement/SKILL.md) | Join identity to billing so access is derived server-side from webhooks, not from the client. Use when adding login, paid tiers, or gated routes. |
| [`observability-budget`](skills/observability-budget/SKILL.md) | Name what should wake you before adding tooling, then keep one channel and delete unactionable alerts. Use when a service needs monitoring or paging. |
| [`restore-drill`](skills/restore-drill/SKILL.md) | Prove backups by restoring one on a schedule and recording the date, time taken, and data lost. Use when a service holds data you cannot recreate. |
| [`data-protection-pdpa`](skills/data-protection-pdpa/SKILL.md) | Design so personal data is not collected, and handle what remains under Thai PDPA and GDPR. Use before shipping cameras, bots, logins, or sensor feeds. |
| [`risk-posture`](skills/risk-posture/SKILL.md) | Calibrate solo shipping speed against blast radius. Use when deciding on staging, production tests, automation, release risk, or project shutdown. |
| [`deploy-verification`](skills/deploy-verification/SKILL.md) | Prove new static bytes reached edge users without poisoning cache keys. Use for CDN deploys, stale assets, and changes that are not appearing live. |
| [`always-on-services`](skills/always-on-services/SKILL.md) | Run Mac-hosted services with launchd and Cloudflare Tunnels. Use for background jobs, public local services, watchdogs, and restart failures. |
| [`dual-write-resilience`](skills/dual-write-resilience/SKILL.md) | Pair a primary database with a silent fallback mirror. Use when civic dashboards, monitors, or bots must survive database outages and quotas. |
| [`cso`](skills/cso/SKILL.md) | Security audit mode: secrets archaeology, supply chain, STRIDE, OWASP Top 10. Use to audit a codebase in one command, complementing the free AppSec pipeline. |
| [`canary`](skills/canary/SKILL.md) | Post-deploy monitoring: watch the live app for console errors, perf regressions, and page failures vs a pre-deploy baseline. Use after any ship, before the deploy is called done. |
| [`health`](skills/health/SKILL.md) | Code quality dashboard: weighted 0-10 composite from type, lint, test, dead-code, shell-lint. Use to ask "how good is this code" and to track trends across commits. |
| [`devex-review`](skills/devex-review/SKILL.md) | Live DX audit: navigate docs, time the onboarding flow, screenshot error messages, score the CLI. Use to measure TTHW before declaring a developer-facing feature shipped. |
| [`careful`](skills/careful/SKILL.md) | Pre-tool guardrail: warn before rm -rf, DROP TABLE, force-push, and similar destructive commands. Use when touching prod, debugging live systems, or in a shared environment. |
| [`context-save`](skills/context-save/SKILL.md) | Capture git state, decisions, and remaining work as a checkpoint any future session can resume. Use at session end, before risky changes, or when context is about to overflow. |
| [`context-restore`](skills/context-restore/SKILL.md) | Resume work from a previous session's checkpoint, restoring git state, decisions, and remaining work. Use when picking up after a break, a handoff, or a context overflow. |
| [`learn`](skills/learn/SKILL.md) | Search, show, prune, and export the project's accumulated learnings across sessions. Use to answer "didn't we fix this before?" before solving a problem that's already been solved. |
| [`design-extract`](skills/design-extract/SKILL.md) | Extract design tokens from a public URL using dembrandt, design-extract, or firecrawl. Use to study a public design for inspiration, then apply its patterns through ux-archaeology. |
| [`ponytail`](skills/ponytail/SKILL.md) | YAGNI decision ladder: does it need to exist, is it in the codebase, does stdlib do it, can it be one line, then the minimum. Use before writing any code. |
| [`caveman`](skills/caveman/SKILL.md) | Caveman output: 65% fewer tokens, byte-exact code and errors. Use when agent output is bloated. Pairs with ponytail for code brevity. |
| [`honest-envelope`](skills/honest-envelope/SKILL.md) | Label every displayed number with source, tier, and age. Use for metrics, caches, fallback data, outages, and any live-looking dashboard value. |
| [`data-catalog`](skills/data-catalog/SKILL.md) | Record reusable data-source contracts and known-good adapters. Use before adding an API or feed, reusing an integration, or responding to upstream drift. |
| [`couple-dont-silo`](skills/couple-dont-silo/SKILL.md) | Layer unrelated public datasets against each other for insight, instead of inventing from scratch. Use before building anything from a blank page. |
| [`public-api-integration`](skills/public-api-integration/SKILL.md) | Select, probe, proxy, and integrate free public APIs and open datasets for zero-friction dashboards. Use when building client-side apps without backend or API costs. |
| [`research-methodology`](skills/research-methodology/SKILL.md) | Use when a research project must be done — gather, evaluate, synthesize, cite. The 7 moves for research that survives the test of time. Pairs with data-catalog. |
| [`deep-scraping`](skills/deep-scraping/SKILL.md) | Extract data from sites without an API, politely and repeatably, storing raw before parsed. Use when a needed feed exists only as a web page. |
| [`workspace-lean`](skills/workspace-lean/SKILL.md) | Safely reduce worktrees and dependency weight without deleting live services or unique commits. Use for cleanup, disk pressure, and migrations. |
| [`know-when-to-wait`](skills/know-when-to-wait/SKILL.md) | Distinguish immature tooling from fixable implementation problems. Use when a dependency needs repeated patches or adoption risk outweighs progress. |
| [`full-stack-bootstrap`](skills/full-stack-bootstrap/SKILL.md) | One command from clone to Builder. Use --become-builder to install every skill into every agent, then scaffold or audit a project. |
| [`appsec-stack`](skills/appsec-stack/SKILL.md) | Stack seven free AppSec layers — secrets, SAST, SCA, SBOM, auto-update, DAST, exploit verify. Use on every commit, before public deploy, or for an OWASP / CIS audit. |
| [`stack-repo-topology`](skills/stack-repo-topology/SKILL.md) | Trunk-based dev, path-scoped CODEOWNERS, branch naming, selective CI, shared resource patterns. Use when a repo holds many packages or a monorepo is starting to drift. |
| [`api-design`](skills/api-design/SKILL.md) | Design REST APIs that survive clients — nouns not verbs, cursor pagination, idempotency keys, error envelope. Use when sketching endpoints or choosing REST vs GraphQL. |
| [`caching-layers`](skills/caching-layers/SKILL.md) | Stack CDN, in-process, Redis, DB-result caches — cache-aside vs write-through vs SWR, avoid thundering herd. Use when latency tightens or same query runs thousands per minute. |
| [`rate-limiting`](skills/rate-limiting/SKILL.md) | Add rate limits that protect without punishing — token bucket or sliding window, by IP/user/key, with 429 + Retry-After. Use when exposing public endpoints or seeing abuse. |
| [`db-migrations`](skills/db-migrations/SKILL.md) | Migrate databases without breaking prod — forward-only, expand-and-contract, schema versioning, never-rename-in-prod. Use when shipping schema changes or planning a backfill. |
| [`webhooks-reliable`](skills/webhooks-reliable/SKILL.md) | Receive third-party webhooks without lies — always 200 fast, async process, idempotency keys, signature verification, retries. Use when wiring Stripe/LINE/GitHub callbacks. |
| [`secrets-management`](skills/secrets-management/SKILL.md) | Keep secrets out of code, notes, shell history — Keychain, .env.example, pre-commit gitleaks, rotation-not-rewrite. Use when adding API keys or auditing agent-touched setups. |
| [`code-slop-patterns`](skills/code-slop-patterns/SKILL.md) | Catch AI-generated code patterns — dead code, swallowed exceptions, unsafe `as any`, hallucinated imports, TODO stubs. Use as pre-commit/CI gate or when reviewing AI-assisted PRs. |
| [`pr-slop-patterns`](skills/pr-slop-patterns/SKILL.md) | Catch AI-generated PR slop before merge — vague titles, missing descriptions, empty commits, single-line diffs as features. Use as PR-quality gate in CI. |
| [`slop-detect-stack`](skills/slop-detect-stack/SKILL.md) | Orchestrator for the four-layer anti-slop stack — code, PR, prose, UI. Use before shipping AI output or when setting up pre-commit/CI/PR gates for AI-assisted work. |

## Design and visual systems

| Skill | Load it when… |
|---|---|
| [`axiom-design-core`](skills/axiom-design-core/SKILL.md) | Apply Dr Non's reasoned frontend design system. Use when starting or reviewing UI typography, color, motion, layout, and interaction. |
| [`design-dna`](skills/design-dna/SKILL.md) | Encode visual decisions as enforceable tokens and regression rules. Use when starting or reviewing a UI whose design keeps drifting. |
| [`design-registers`](skills/design-registers/SKILL.md) | Choose a Console, Index, Civic, Editorial, or Institutional register before styling. Use when a shared design system makes products feel identical. |
| [`no-design-tells`](skills/no-design-tells/SKILL.md) | Stop shipping UI a stranger can spot as agent-built. Use before any visual work. |
| [`slop-detect`](skills/slop-detect/SKILL.md) | Use when a landing page must be scored against AI-design-slop tells before ship. Bridges the qualitative discipline (no-design-tells) and the ravidsrk/slop-detect tool. |
| [`aesthetics-and-economy`](skills/aesthetics-and-economy/SKILL.md) | Use when a choice is aesthetic *and* economic at once. The economy of words, the aphorism craft, the minimalist manifesto, the Kodawari of constraint. |
| [`dashboard-discipline`](skills/dashboard-discipline/SKILL.md) | Product UI is not a landing page. Use for dashboards, tables, forms, admin, and settings. |
| [`colour-and-type`](skills/colour-and-type/SKILL.md) | How to choose a palette and a type scale, not just enforce one. Use when starting a design system. |
| [`data-display`](skills/data-display/SKILL.md) | Charts, tables, and numbers that do not lie or decorate. Use whenever data is rendered. |
| [`phone-first`](skills/phone-first/SKILL.md) | The link gets opened on a phone. Build there first. Use for any surface that will be shared. |
| [`accessible-by-default`](skills/accessible-by-default/SKILL.md) | Build surfaces usable by keyboard, screen reader, and low vision on a cheap phone. Use when shipping any public, civic, or user-facing interface. |
| [`beyond-the-screen`](skills/beyond-the-screen/SKILL.md) | Decks, PDFs, documents, and social cards under the same design law. Use for any non-app surface. |
| [`multilingual-type`](skills/multilingual-type/SKILL.md) | Type in a script you do not read. Use for any Thai, CJK, Arabic, or multi-script surface. |
| [`no-ai-tells`](skills/no-ai-tells/SKILL.md) | Use before shipping any generated text, or to humanize AI-sounding copy. Kills mechanical AI-writing tells (Wikipedia's taxonomy) and replaces them with plain, chosen prose. |
| [`adrian-martinez-curated-web-design-skills-2026`](skills/adrian-martinez-curated-web-design-skills-2026/SKILL.md) | Describe design through perception, mechanism, intent, contrast, and time. Use when writing portfolio copy, critiques, or case studies. |
| [`design-by-writing-100-day-reflection-engine`](skills/design-by-writing-100-day-reflection-engine/SKILL.md) | Use when a design effort has stalled, the user story is a fiction, or iterations have stopped teaching. Distilled from 100 days of writing-as-thinking practice. |
| [`legible-systems`](skills/legible-systems/SKILL.md) | Paths, edges, districts, nodes, landmarks. Use for navigation, dashboards, patterns. |
| [`ux-archaeology`](skills/ux-archaeology/SKILL.md) | Borrow public product patterns and DESIGN.md files without copying pixels or secrets. Use when rebuilding from prior art or evaluating external design systems. |
| [`map-3d-city`](skills/map-3d-city/SKILL.md) | Render fast 3D city buildings without blocky or overlapping geometry. Use when choosing MapLibre or deck.gl, or repairing city-map extrusion. |
| [`geospatial-core`](skills/geospatial-core/SKILL.md) | Source, simplify, project, and serve map layers without shipping a 40MB GeoJSON. Use when a surface renders boundaries, points, routes, or basemaps. |
| [`radar-chart-pattern`](skills/radar-chart-pattern/SKILL.md) | Build or audit dependency-free N-axis radar charts. Use when comparing weighted dimensions or before duplicating polar-coordinate implementations. |
| [`diagram-design`](skills/diagram-design/SKILL.md) | Use when a diagram must be made (architecture, flow, sequence, state, comparison). The 7 rules for diagrams that survive being looked at. Pairs with radar-chart-pattern. |
| [`narrative-companion-surfaces`](skills/narrative-companion-surfaces/SKILL.md) | Pair writing with honest computed companion surfaces. Use when essays need interactive views or a dashboard's computed or live claim needs verification. |

## Judgment from the reading

Twelve books this practice keeps returning to, grouped by the decision each one changes.
Sources are named inside every file; these are operational skills, not book summaries.

| Skill | Load it when… | From |
|---|---|---|
| [`cognition-first`](skills/cognition-first/SKILL.md) | Design for the human who shows up. Use before any UX, copy, or default decision. | Kahneman · Pink |
| [`moral-reasoning`](skills/moral-reasoning/SKILL.md) | Name values, stakeholders, tradeoffs, and a ten-year defense. Use when a decision has no single right answer or carries irreversible human cost. |
| [`qualitative-reasoning`](skills/qualitative-reasoning/SKILL.md) | Reason with counterexamples, fallibility, tradition, and lived evidence. Use when data is fuzzy, a metric misleads, or numbers cannot carry the judgment. |
| [`legible-systems`](skills/legible-systems/SKILL.md) | Paths, edges, districts, nodes, landmarks. Use for navigation, dashboards, patterns. | Lynch · Alexander |
| [`design-method`](skills/design-method/SKILL.md) | Diverge, prototype, subtract. Use when the approach is unclear. | Rowe · Kelley · Kelley & Kelley · Maeda |
| [`written-principles`](skills/written-principles/SKILL.md) | Make recurring judgment calls reusable. Use when a decision or mistake repeats. | Dalio · Smith |
| [`make-it-stick`](skills/make-it-stick/SKILL.md) | Write text people understand and remember. Use for any user-facing copy or docs. | Heath & Heath · Pinker |
| [`library-of-human-wisdom`](skills/library-of-human-wisdom/SKILL.md) | Router to book-derived skills from 35+ Non-Scrape pipeline books. Use when a decision affects people, prose needs sharpening, or a pre-AI author's wisdom would cut clearer. | Multi |

## Specialized field kits

These are narrow on purpose. They carry implementation scars that would be noise in a general skill.

| Skill | Load it when… |
|---|---|
| [`itic-cctv-integration`](skills/itic-cctv-integration/SKILL.md) | Integrate Thailand's Longdo/iTIC camera and incident feeds honestly. Use when adding Thai traffic cameras or separating snapshot, stream, and stale modes. |
| [`design-anthropology`](skills/design-anthropology/SKILL.md) | Test design assumptions with cultural counterexamples and power analysis. Use when a supposedly universal solution keeps failing across people or contexts. |
| [`iptv-streaming`](skills/iptv-streaming/SKILL.md) | Build a resilient HLS registry and server-side proxy without faking streams. Use for IPTV aggregators or token-gated and origin-gated HLS sources. |
| [`local-ai-fabric`](skills/local-ai-fabric/SKILL.md) | Run an Apple-Silicon local-LLM fabric with gateway, memory, failover, and rate limits. Use for multi-Mac inference or unexplained local-model truncation. |
| [`voice-clone-podcast`](skills/voice-clone-podcast/SKILL.md) | Build a local zero-shot voice-cloned podcast pipeline on Apple Silicon. Use when long-form TTS drops words, drifts, or babbles at chunk boundaries. |
| [`home-cctv-grid`](skills/home-cctv-grid/SKILL.md) | Unify home cameras into one honest grid with local storage. Use when wiring RTSP or ONVIF cameras around a house into a single view. |
| [`satellite-change-watch`](skills/satellite-change-watch/SKILL.md) | Collect trusted satellite imagery over time and show what changed. Use when monitoring land, flood, fire, or coast from NASA and open sources. |

## Local AI, retrieval, and self-improvement

Small, operable, no SaaS. FTS5 before vectors, one machine before a fabric, three MCP tools before twenty, one promotion a month before a pack.

| Skill | Load it when… |
|---|---|
| [`local-llm-ollama`](skills/local-llm-ollama/SKILL.md) | Run single-machine Ollama with sane models, context, and health checks. Use when starting local inference, working offline, or backing embeddings and drafts locally. |
| [`free-api-keys`](skills/free-api-keys/SKILL.md) | Use when an agent or operator needs LLM API keys without a credit card, or when provisioning a stack on $0/month. Pairs with local-llm-ollama, free-apis.md. |
| [`simple-rag`](skills/simple-rag/SKILL.md) | Build a tiny local RAG with SQLite FTS5 first, embeddings only if needed. Use when docs, notes, or a corpus must be searchable with citations and no vector-DB ops. |
| [`obsidian-mcp-forge`](skills/obsidian-mcp-forge/SKILL.md) | Use when agents need cheap shared memory across Cursor, Claude, Codex, and Antigravity without SaaS. The A+ Obsidian coding brain — filesystem bridge + disposable recall. |
| [`improvement-radar`](skills/improvement-radar/SKILL.md) | Run a weekly watchdog that finds cloneable repos and turns them into steal-map verdicts. Use when keeping a stack excellent without doomscrolling or vendoring packs. |
| [`messaging-gateway`](skills/messaging-gateway/SKILL.md) | Put a cited local or cloud assistant behind Telegram, LINE, Discord, or WhatsApp. Use when answers or approved automations must reach chat. |
| [`staff-swarm`](skills/staff-swarm/SKILL.md) | Run researcher, field, and orchestrator agents with token-tier routing. Use when a job needs parallel collection plus one mind assembling results. |

## Read once, then work from skills

- [`README.md`](README.md) — `./setup.sh --become-builder` is the one-liner. You are Dr Non the Builder.
- [`QUICKSTART.md`](QUICKSTART.md) is the fifteen minutes *after* that.
- [`BLUEPRINT.md`](BLUEPRINT.md) bootstraps a new *project* (agent paste or `--init-project`).
- [`playbooks/`](playbooks/) explains the incidents and reasoning behind the standing instructions.
- [`reference/`](reference/) carries stable implementation details that should not crowd every skill.
- [`templates/`](templates/) contains the files meant to be copied and adapted.

If two skills appear to own the same decision, that is a catalog bug. Open an issue or merge the
overlap; do not make the agent choose between synonyms.


## Books-to-skill pipeline (auto-extracted, under review)

These skills were added by a parallel agent via the Non-Scrape books-to-skill pipeline on 2026-09-11. Each is a distillation of a single source book. The discipline, the format, and the value of each is under review. Some are load-bearing references in their fields (Kahneman, Thaler, Turner, Geertz, Malinowski, Geertz); some are personal-philosophy cheatsheet cards that may be stripped. The validator is the gate; the journal is the audit trail.

| Skill | What it is |
|---|---|
| [`100-days-of-writing-reasoning-argument-logic-na6pzg`](skills/100-days-of-writing-reasoning-argument-logic-na6pzg/SKILL.md) | Strengthen arguments with explicit assumptions, counterexamples, and honest limits. Use when drafting or reviewing analytical nonfiction. |
| [`100-days-of-writing-storytelling-the-writing-craft-1fc5btj`](skills/100-days-of-writing-storytelling-the-writing-craft-1fc5btj/SKILL.md) | Turn lived experience into clear nonfiction with openings, narrative turns, and earned endings. Use when drafting personal or reflective essays. |
| [`behavioral-economics-predicting-real-human-choices-1cfeaeg`](skills/behavioral-economics-predicting-real-human-choices-1cfeaeg/SKILL.md) | Predict behavior with mental accounting, fairness, self-control, and real incentives. Use when rational-actor assumptions make a product decision brittle. |
| [`business-model-generation-mastering-the-canvas-k519i1`](skills/business-model-generation-mastering-the-canvas-k519i1/SKILL.md) | Build or critique a nine-block Business Model Canvas. Use when an idea needs customers, channels, costs, partners, and revenue joined into one model. |
| [`choice-architecture-nudging-decisions-without-coercion-1vgrrkp`](skills/choice-architecture-nudging-decisions-without-coercion-1vgrrkp/SKILL.md) | Design defaults, options, and friction without coercion. Use when a product presents consequential choices or a default may steer behavior. |
| [`culture-and-communication-the-logic-of-symbols-109gk9m`](skills/culture-and-communication-the-logic-of-symbols-109gk9m/SKILL.md) | Decode signals, signs, symbols, and shared cultural codes. Use when a logo, ritual, object, or interface affordance may mean different things to different groups. |
| [`design-by-writing-100-day-reflection-engine-ziojx2`](skills/design-by-writing-100-day-reflection-engine-ziojx2/SKILL.md) | Use daily writing as a design and reflection engine. Use when a project needs sharper user stories, iteration questions, or a durable record of thought. |
| [`disruptive-innovation-playbook`](skills/disruptive-innovation-playbook/SKILL.md) | Separate sustaining from disruptive innovation and expose resource-allocation traps. Use when a low-end entrant threatens a successful incumbent. |
| [`emotional-design-three-levels-for-meaningful-products-17bhy7j`](skills/emotional-design-three-levels-for-meaningful-products-17bhy7j/SKILL.md) | Design across visceral appeal, behavioral use, and reflective meaning. Use when a product must become loved or identity-bearing, not merely operable. |
| [`everyday-design-fundamentals-14by7eo`](skills/everyday-design-fundamentals-14by7eo/SKILL.md) | Apply affordances, signifiers, mapping, feedback, constraints, and error recovery. Use when designing or auditing anything a person must operate. |
| [`fieldwork-mastery-the-french-ethnographic-tradition-18gonb7`](skills/fieldwork-mastery-the-french-ethnographic-tradition-18gonb7/SKILL.md) | Ground claims through presence, observation, and field records. Use when desk research cannot answer how people actually behave in context. |
| [`freakonomics-incentives-and-causal-inference-1hisp`](skills/freakonomics-incentives-and-causal-inference-1hisp/SKILL.md) | Trace incentives, information asymmetry, cheating, and causal evidence. Use when conventional wisdom or correlation is being mistaken for an explanation. |
| [`human-centered-design-process-elf9h4`](skills/human-centered-design-process-elf9h4/SKILL.md) | Run discover, frame, ideate, prototype, test, and iterate with people. Use when a project needs a complete human-centered design cycle. |
| [`ideo-design-process-observe-brainstorm-prototype-iterate-1qvodax`](skills/ideo-design-process-observe-brainstorm-prototype-iterate-1qvodax/SKILL.md) | Move from observation through disciplined brainstorming and prototypes to iteration. Use when planning a design sprint or testing an uncertain concept. |
| [`ideo-method-cards-choosing-and-applying-design-methods-1e20oct`](skills/ideo-method-cards-choosing-and-applying-design-methods-1e20oct/SKILL.md) | Select and sequence an appropriate design-research method. Use when a team knows the question but not how to observe, ask, prototype, or evaluate it. |
| [`innovation-personas-the-ten-faces-of-ideo-bklfgc`](skills/innovation-personas-the-ten-faces-of-ideo-bklfgc/SKILL.md) | Assign learning, organizing, and building roles that move an idea forward. Use when a team is stuck in devil's-advocate critique or missing a needed stance. |
| [`interaction-design-craft`](skills/interaction-design-craft/SKILL.md) | Prototype interaction, reduce modes, and use clear spatial metaphors. Use when shaping how a person acts through a product rather than how the screen looks. |
| [`interpretive-anthropology-reading-culture-thickly-14r8fgq`](skills/interpretive-anthropology-reading-culture-thickly-14r8fgq/SKILL.md) | Read behavior through context and competing interpretations. Use when a thin observation is being treated as self-explanatory cultural evidence. |
| [`kinship-in-bali-a-system-of-meanings-17ki8bq`](skills/kinship-in-bali-a-system-of-meanings-17ki8bq/SKILL.md) | Analyze kinship as a cultural system of names, roles, time, and obligation. Use when family categories are being assumed to transfer across societies. |
| [`language-instinct-ai-communication-blueprint-1r5mwl8`](skills/language-instinct-ai-communication-blueprint-1r5mwl8/SKILL.md) | Write for human parsing with concrete syntax, shared context, and explicit ambiguity. Use when AI-generated communication is grammatical but hard to understand. |
| [`measurement-foundations-for-human-studies-lhoitu`](skills/measurement-foundations-for-human-studies-lhoitu/SKILL.md) | Define constructs, indicators, validity, and uncertainty before collecting numbers. Use when human qualities risk being reduced to misleading metrics. |
| [`medical-anthropology`](skills/medical-anthropology/SKILL.md) | Separate disease, illness, and lived care context. Use when health systems or products risk treating patients as passive recipients or symptoms as culture-free. |
| [`non-writing-the-editor-brain-skill-ri1czx`](skills/non-writing-the-editor-brain-skill-ri1czx/SKILL.md) | Edit prose toward Dr Non's blunt openings, reflective turns, and quiet endings. Use when revising his drafts or preserving that established authorial voice. |
| [`pattern-language-design-toolkit-1pms7oa`](skills/pattern-language-design-toolkit-1pms7oa/SKILL.md) | Compose small solutions as a linked pattern language. Use when designing a town, building, interface, or system with many interdependent local decisions. |
| [`purity-and-danger`](skills/purity-and-danger/SKILL.md) | Map taboo, pollution, and classification back to the boundary being defended. Use when a community rule seems irrational without its social order. |
| [`rich-dad-poor-dad-the-financial-literacy-mindset-1krapzz`](skills/rich-dad-poor-dad-the-financial-literacy-mindset-1krapzz/SKILL.md) | Examine assets, liabilities, cash flow, and earned-income dependence. Use when teaching basic financial literacy or challenging a wealth-building assumption. |
| [`self-managed-project-mastery-100-days-of-writing-1e5bhwu`](skills/self-managed-project-mastery-100-days-of-writing-1e5bhwu/SKILL.md) | Turn daily practice into a self-managed project rhythm. Use when a knowledge worker needs habits, environments, and reviews that survive for months. |
| [`simplicity-moves-ten-laws-for-clearer-design-rii9k6`](skills/simplicity-moves-ten-laws-for-clearer-design-rii9k6/SKILL.md) | Apply Maeda's ten moves for reducing, organizing, timing, learning, and trusting. Use when something must feel simpler without losing necessary meaning. |
| [`solo-scribble-the-discipline-of-unedited-drafting-egka8o`](skills/solo-scribble-the-discipline-of-unedited-drafting-egka8o/SKILL.md) | Separate continuous first-draft flow from next-day editing. Use when self-censorship or premature revision is stopping a writer from producing material. |
| [`ethnographic-fieldwork-malinowski`](skills/ethnographic-fieldwork-malinowski/SKILL.md) | Design participant observation around immersion, language, everyday action, and field records. Use when interviews alone cannot reveal how a community works. |
| [`thinking-fast-and-slow-the-ai-decision-engine-tntcy7`](skills/thinking-fast-and-slow-the-ai-decision-engine-tntcy7/SKILL.md) | Check intuition for base-rate neglect, framing, overconfidence, and planning fallacy. Use when a consequential judgment feels obvious or unusually fluent. |
| [`topological-anthropology-the-leach-method-mfffe5`](skills/topological-anthropology-the-leach-method-mfffe5/SKILL.md) | Model social categories as relationships and transformations rather than fixed things. Use when labels hide the structure of power, ritual, or kinship. |
| [`urban-anthropology-reading-the-city-of-flows-and-places-13q28oj`](skills/urban-anthropology-reading-the-city-of-flows-and-places-13q28oj/SKILL.md) | Read cities through infrastructure, mobility, inequality, and contested place. Use when a built-environment decision ignores flows or lived urban experience. |
| [`urban-inhabitation-precarity`](skills/urban-inhabitation-precarity/SKILL.md) | Compare the planner's view with lived space, precarity, and informal use. Use when urban systems affect who can occupy, move through, or reshape a place. |
| [`validated-learning-the-build-measure-learn-loop-1i6p1f5`](skills/validated-learning-the-build-measure-learn-loop-1i6p1f5/SKILL.md) | Design a build-measure-learn loop around the riskiest assumption. Use when a team is stuck between polishing, launching, pivoting, and persevering. |
| [`value-investing-graham-s-core-discipline-j4ppt3`](skills/value-investing-graham-s-core-discipline-j4ppt3/SKILL.md) | Separate price from intrinsic value and demand a margin of safety. Use when evaluating an investment thesis, speculation risk, or stewardship decision. |
| [`classic-style-writing-with-clarity-and-concrete-vision-83ryzm`](skills/classic-style-writing-with-clarity-and-concrete-vision-83ryzm/SKILL.md) | Master Steven Pinker classic style for clear, vivid, and unpretentious prose. Use when writing long-form essays, documentation, or explanatory articles. |
| [`success-making-ideas-stick-1to2c2n`](skills/success-making-ideas-stick-1to2c2n/SKILL.md) | Apply the SUCCESs framework from Chip and Dan Heath to make ideas stick. Use when crafting memorable pitches, mission statements, or persuasive narratives. |
| [`the-art-of-thinking-clearly-a-bias-detection-toolkit-1wtgikf`](skills/the-art-of-thinking-clearly-a-bias-detection-toolkit-1wtgikf/SKILL.md) | Identify and counter 99 cognitive biases from Rolf Dobelli toolkit. Use when making strategic decisions, auditing assumptions, or evaluating risk. |
| [`value-proposition-design-1mtu6jn`](skills/value-proposition-design-1mtu6jn/SKILL.md) | Design compelling value propositions using the Osterwalder canvas. Use when mapping customer pains, gains, and jobs-to-be-done to product features. |
| [`atomic-habits-blueprint-bh9jje`](skills/atomic-habits-blueprint-bh9jje/SKILL.md) | Design, track, and reinforce tiny behaviors that compound into personal change. Use when teaching habit formation, redesigning environments, or coaching identity-based growth. |
| [`boilerplate-reduction`](skills/boilerplate-reduction/SKILL.md) | Spot, analyze, and remove repetitive filler in drafts so the document becomes concise and production-ready. Use when a text contains many duplicated sentences or placeholder copy. |
| [`lean-startup-audit-applying-build-measure-learn-66t3e3`](skills/lean-startup-audit-applying-build-measure-learn-66t3e3/SKILL.md) | Turn the Lean Startup method into actionable steps. Use when designing an MVP, setting up metrics, deciding whether to pivot, or tracking progress with innovation accounting. |
| [`repetition-mantra-building-skill-through-simple-repeats-4as3as`](skills/repetition-mantra-building-skill-through-simple-repeats-4as3as/SKILL.md) | Use a short repeated phrase as a mental anchor — break larger goals into manageable repetition cycles. Use when building fluency through monotony. |

## Thailand civic dashboards (Godmode)

Composition skills for `thailand-godmode/` — turning a Thai city name into a
zero-baht, multi-layer operations dashboard. General discipline (CCTV
honesty, data cataloguing, geospatial precision, design reasoning) lives in
the skills above; these seven cover only the Thailand-specific delta.

| Skill | Load it when… |
|---|---|
| [`godmode-new-city`](skills/godmode-new-city/SKILL.md) | Standing up a new Thai city/province dashboard from `thailand-godmode/`. Use when adding a new city or bootstrapping a Thailand ops dashboard from scratch. |
| [`godmode-cook-and-couple`](skills/godmode-cook-and-couple/SKILL.md) | Building coupled, comparison-bearing verdicts (flood risk, fire weather, crop demand) instead of showing independent subsystem readings. Use whenever a dashboard is about to show a number without a comparison. |
| [`godmode-datagoth-harvest`](skills/godmode-datagoth-harvest/SKILL.md) | Harvesting data.go.th for every dataset naming a given city, and turning it into a data analytics page. Use when building a city's `/data` page. |
| [`godmode-ootbpap-maps`](skills/godmode-ootbpap-maps/SKILL.md) | Wiring maps, satellite imagery, and free basemap APIs for a Thai city out of the box. Use when adding map/satellite layers to a city dashboard. |
| [`godmode-cctv-wiring`](skills/godmode-cctv-wiring/SKILL.md) | Wiring ITIC/Longdo public traffic cameras honestly. Use when adding camera/incident layers to a Thai city map. |
| [`godmode-social-listening`](skills/godmode-social-listening/SKILL.md) | Scraping and tagging public mentions of a Thai city via RSS/GDELT. Use when building a social-listening box for a city dashboard. |
| [`godmode-floodair-dash`](skills/godmode-floodair-dash/SKILL.md) | Wiring FloodDash (RID water classification) and AirDash (AQI banding) for a new city, feeding the coupling layer. Use when adding flood/water or air-quality modules. |
