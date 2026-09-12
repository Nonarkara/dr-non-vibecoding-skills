# Skill Catalog

Eighty-eight focused skills, grouped by the decision they change. Start with one problem;
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
| [`design-thinking-vibecoding`](skills/design-thinking-vibecoding/SKILL.md) | A lived problem needs framing, a narrow MVP, and the right agent/model split |
| [`dr-non-golden-rules`](skills/dr-non-golden-rules/SKILL.md) | Architecture, tool choice, build order, or a keep/kill decision needs a practical default |
| [`director-not-typer`](skills/director-not-typer/SKILL.md) | Human intent is getting buried under implementation menus |
| [`planning-discipline`](skills/planning-discipline/SKILL.md) | A multi-file, ambiguous, or risky change needs scope and acceptance evidence |
| [`route-dont-scan`](skills/route-dont-scan/SKILL.md) | Work starts inside a monorepo or multi-project directory |
| [`karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md) | Code needs explicit assumptions, simplicity, surgical edits, and a verifiable goal |
| [`argument-construction`](skills/argument-construction/SKILL.md) | A claim, a review, a contested brief, or an evaluation of someone else's claim — the 8 rules of a good argument + 6 named fallacies to refuse |
| [`ninja-innovation`](skills/ninja-innovation/SKILL.md) | An "improve X / fix Y / build Z" request needs the simplest path — reframe, subtract, reuse, asymmetric leverage |
| [`systematic-debugging`](skills/systematic-debugging/SKILL.md) | Something is broken and the first plausible patch is tempting |
| [`anti-regression`](skills/anti-regression/SKILL.md) | Existing behavior or a distinctive interface could be erased by cleanup |
| [`systems-thinking`](skills/systems-thinking/SKILL.md) | A problem is a feedback loop, a short-term fix has a long-term cost, or one part of a system is being optimized at the expense of another — the 6 moves (feedback loop, time horizon, anti-fragility, flow, canon, failure modes) |
| [`adversarial-review`](skills/adversarial-review/SKILL.md) | A fresh, flaw-seeking review should challenge the author's story |
| [`browser-as-t`](skills/browser-as-t/SKILL.md) | UI, routing, forms, layout, or client state changed |
| [`browser-use`](skills/browser-use/SKILL.md) | An agent must drive a real browser to fill a form, navigate a flow, or complete a multi-step user journey — the *interaction* layer, pairs with `browser-as-t` (the *verification* layer) |
| [`result-honesty`](skills/result-honesty/SKILL.md) | A session, handoff, or release needs evidence and explicit unknowns |
| [`build-journal`](skills/build-journal/SKILL.md) | A meaningful change to a project must be recorded — the 5-line flight-recorder discipline. Pairs with `ABOUT.md` (who + why) and the project's history |
| [`ship-discipline`](skills/ship-discipline/SKILL.md) | A completion claim requires Commit, Push, Deploy, Test |
| [`wrong-green`](skills/wrong-green/SKILL.md) | CI, a health check, a watchdog, or a deploy log may answer the wrong question |
| [`lesson-residue`](skills/lesson-residue/SKILL.md) | A painful or surprising session produced a verified lesson worth preserving |
| [`context-economy`](skills/context-economy/SKILL.md) | Prose, repetition, or reporting overhead is crowding out useful work |
| [`skill-writing`](skills/skill-writing/SKILL.md) | A new or revised skill must earn its folder and trigger reliably |

## Close the loop

Ship is not the end. A screenshot is not a walkthrough. A lesson from one session is not a year of data.

| Skill | Load it when… |
|---|---|
| [`human-walkthrough`](skills/human-walkthrough/SKILL.md) | A system needs the multi-persona user test before a major release — first-time, second-time, and extreme user, walked through a real browser, producing a blueprint and a Now/Next/Later/**Never** roadmap. Closes the exploratory gap [`browser-as-t`](skills/browser-as-t/SKILL.md) and [`ux-archaeology`](skills/ux-archaeology/SKILL.md) leave |
| [`power-of-hindsight`](skills/power-of-hindsight/SKILL.md) | A system has been patching for months and the Frankenstein phase needs an end — collect every signal, analyze statistically, reconstruct the parts that carry weight from first principles. Closes the long-arc gap [`lesson-residue`](skills/lesson-residue/SKILL.md), [`result-honesty`](skills/result-honesty/SKILL.md), and [`systematic-debugging`](skills/systematic-debugging/SKILL.md) leave |

## Memory, harness, and agent surfaces

| Skill | Load it when… |
|---|---|
| [`agent-memory`](skills/agent-memory/SKILL.md) | A repository needs an AGENTS.md/CLAUDE.md contract or durable gotchas |
| [`shared-memory-hub`](skills/shared-memory-hub/SKILL.md) | Verified knowledge should survive across tools, agents, and projects |
| [`harness-hardening`](skills/harness-hardening/SKILL.md) | Named agents, hooks, and rules need proof that they exist and fire |
| [`mcp-cli-first`](skills/mcp-cli-first/SKILL.md) | A connector, CLI, or API can perform an action that would otherwise be described |
| [`subagent-routing`](skills/subagent-routing/SKILL.md) | A bounded task may justify a fresh agent, independent review, or parallel work |
| [`agent-relay`](skills/agent-relay/SKILL.md) | Another agent's commits are being picked up — a baton, a ledger, and a verdict on the previous leg before anything is added |
| [`prompt-like-dr-non`](skills/prompt-like-dr-non/SKILL.md) | A brief is terse, compound, unconventional, or names a person as the specification — decode the shape before building |
| [`codex-workbench`](skills/codex-workbench/SKILL.md) | Repeated Codex behavior needs the right home: rules, skill, plugin, app, hook, or automation |

## Production and resilience

| Skill | Load it when… |
|---|---|
| [`production-spine`](skills/production-spine/SKILL.md) | Software touching users, money, or data is about to be called production-ready |
| [`google-cloud-run`](skills/google-cloud-run/SKILL.md) | A containerized or source-built web service needs $0 idle scale-to-zero hosting, custom domain SSL, Secret Manager, and WIF |
| [`stripe-checkout-billing`](skills/stripe-checkout-billing/SKILL.md) | An app needs subscriptions or one-time payments with hosted Stripe Checkout, Customer Portal, and signature-verified webhooks |
| [`auth-entitlement`](skills/auth-entitlement/SKILL.md) | Login, paid tiers, or gated routes need identity joined to billing, with access derived server-side from webhooks rather than the client |
| [`observability-budget`](skills/observability-budget/SKILL.md) | A live service needs monitoring — the wake list written first, one channel, and unactionable alerts deleted rather than tuned |
| [`restore-drill`](skills/restore-drill/SKILL.md) | A service holds data you cannot recreate and no restore has ever been performed and dated |
| [`data-protection-pdpa`](skills/data-protection-pdpa/SKILL.md) | Cameras, bots, logins, or sensor feeds touch personal data — Thai PDPA and GDPR minimums, and the architecture that avoids them |
| [`risk-posture`](skills/risk-posture/SKILL.md) | A solo builder must balance release speed against real blast radius |
| [`deploy-verification`](skills/deploy-verification/SKILL.md) | A CDN deploy must prove the actual static bytes reached users |
| [`always-on-services`](skills/always-on-services/SKILL.md) | A Mac-hosted service needs supervision, a public tunnel, and restart discipline |
| [`dual-write-resilience`](skills/dual-write-resilience/SKILL.md) | A public service must survive database downtime or quota failure |
| [`cso`](skills/cso/SKILL.md) | A codebase needs a security audit in one command — secrets archaeology, supply chain, STRIDE, OWASP Top 10, with daily and comprehensive modes |
| [`canary`](skills/canary/SKILL.md) | A deploy is about to be called done — watch the live app for console errors, perf regressions, and page failures vs a pre-deploy baseline |
| [`health`](skills/health/SKILL.md) | "How good is this code" — a 0-10 weighted score from type, lint, test, dead-code, shell-lint, with trend tracking across commits |
| [`devex-review`](skills/devex-review/SKILL.md) | A developer-facing feature is shipping — measure TTHW, walk the docs as a first-time persona, score the CLI, file failure points with severity and fix |
| [`careful`](skills/careful/SKILL.md) | Touching prod, debugging live systems, or working in a shared environment — a PreToolUse hook that warns before rm -rf, DROP TABLE, force-push, and similar destructive commands |
| [`context-save`](skills/context-save/SKILL.md) | A session is ending, a risky change is about to start, or context is about to overflow — capture git state, decisions, and remaining work as a checkpoint |
| [`context-restore`](skills/context-restore/SKILL.md) | A new session is starting — read the most recent checkpoint, verify the git state, confirm with the operator before continuing |
| [`learn`](skills/learn/SKILL.md) | A problem is about to be solved — search the accumulated lessons for "didn't we fix this before?" before solving it again |
| [`design-extract`](skills/design-extract/SKILL.md) | A public design needs studying for inspiration — orchestrate dembrandt, design-extract, or firecrawl, then read the output through ux-archaeology |
| [`ponytail`](skills/ponytail/SKILL.md) | About to write code — climb the YAGNI ladder first: does it need to exist, is it in the codebase, does stdlib do it, can it be one line, then the minimum |
| [`caveman`](skills/caveman/SKILL.md) | Agent output is bloated — talk shorter; code, errors, and file paths stay byte-exact |
| [`honest-envelope`](skills/honest-envelope/SKILL.md) | A displayed number needs source, fallback tier, and age |
| [`data-catalog`](skills/data-catalog/SKILL.md) | An API/feed adapter should be recorded once and reused |
| [`public-api-integration`](skills/public-api-integration/SKILL.md) | A dashboard or app needs live external data without backend server or SaaS cost — select, probe, proxy, and integrate free public APIs and open datasets with SWR cache |
| [`research-methodology`](skills/research-methodology/SKILL.md) | A research project — gather, evaluate, synthesize, cite. The 7 moves for research that survives the test of time. Pairs with `data-catalog` (data side), `qualitative-reasoning` (judgment side), `power-of-hindsight` (retrospective side) |
| [`deep-scraping`](skills/deep-scraping/SKILL.md) | A needed feed exists only as a web page — store raw before parsed, crawl politely, fail loudly on zero rows |
| [`workspace-lean`](skills/workspace-lean/SKILL.md) | Worktrees or dependencies consume disk without risking live services or unique commits |
| [`know-when-to-wait`](skills/know-when-to-wait/SKILL.md) | Immature tooling may be the blocker, not insufficient effort |
| [`full-stack-bootstrap`](skills/full-stack-bootstrap/SKILL.md) | A new project needs memory, deploy, service, data, and design contracts in one pass |
| [`appsec-stack`](skills/appsec-stack/SKILL.md) | A public deploy needs the seven-layer AppSec pipeline — secrets, SAST, SCA, SBOM, auto-update, DAST, exploit verify — with OWASP Top 10 / CIS IG1 mapping |
| [`stack-repo-topology`](skills/stack-repo-topology/SKILL.md) | A repo holds many packages, or a monorepo is starting to drift — needs trunk-based dev, path-scoped CODEOWNERS, branch naming, selective CI, and shared resource patterns |

## Design and visual systems

| Skill | Load it when… |
|---|---|
| [`axiom-design-core`](skills/axiom-design-core/SKILL.md) | Typography, color, motion, layout, and interaction need a reasoned starting point |
| [`design-dna`](skills/design-dna/SKILL.md) | Visual decisions need enforceable tokens and regression language |
| [`design-registers`](skills/design-registers/SKILL.md) | Shared design DNA is making every product look like the same control room |
| [`no-design-tells`](skills/no-design-tells/SKILL.md) | A surface must not be identifiable as agent-built — fonts, palette, provenance, layout reflexes |
| [`slop-detect`](skills/slop-detect/SKILL.md) | An agent must score a landing page against AI-design-slop tells before shipping, or the operator is tired of AI design slop — the bridge between the qualitative discipline (`no-design-tells`) and the quantitative tool (`ravidsrk/slop-detect`) |
| [`aesthetics-and-economy`](skills/aesthetics-and-economy/SKILL.md) | A choice is aesthetic *and* economic at once — looks vs cost, beauty vs durability, polish vs speed. The economy of words, the aphorism craft, the minimalist manifesto, the Kodawari of constraint |
| [`dashboard-discipline`](skills/dashboard-discipline/SKILL.md) | Product UI, tables, forms, or admin — where the landing-page taste skills explicitly do not apply |
| [`colour-and-type`](skills/colour-and-type/SKILL.md) | A palette and type scale need choosing, not just enforcing |
| [`data-display`](skills/data-display/SKILL.md) | Any chart, table, or number is about to be rendered |
| [`phone-first`](skills/phone-first/SKILL.md) | A surface will be shared as a link and opened on a phone |
| [`accessible-by-default`](skills/accessible-by-default/SKILL.md) | A surface must be operable by keyboard, screen reader, and low vision — not just look right |
| [`beyond-the-screen`](skills/beyond-the-screen/SKILL.md) | A deck, PDF, document, social card, or infographic is the deliverable |
| [`multilingual-type`](skills/multilingual-type/SKILL.md) | Type is set in Thai, CJK, Arabic, or any script you do not read |
| [`no-ai-tells`](skills/no-ai-tells/SKILL.md) | Generated text must not read as machine-written — kill the tells, then write plainly |
| [`adrian-martinez-curated-web-design-skills-2026`](skills/adrian-martinez-curated-web-design-skills-2026/SKILL.md) | A design, portfolio entry, or case study needs a description that names what the design *does*, not what it *is* — the 5-axis "Why it works" form |
| [`design-by-writing-100-day-reflection-engine`](skills/design-by-writing-100-day-reflection-engine/SKILL.md) | A design effort has stalled, the user story is a fiction the team is telling itself, or the iterations have stopped teaching — the writing-as-thinking practice distilled to 5 moves and 7 patterns |
| [`legible-systems`](skills/legible-systems/SKILL.md) | Navigation or a dashboard needs paths, edges, districts, nodes, and a landmark |
| [`ux-archaeology`](skills/ux-archaeology/SKILL.md) | Public prior art or a DESIGN.md file needs pattern extraction inside your design contract |
| [`map-3d-city`](skills/map-3d-city/SKILL.md) | City buildings need fast, legible 3D extrusion without geometry glitches |
| [`geospatial-core`](skills/geospatial-core/SKILL.md) | Boundaries, routes, points, or basemaps are being sourced, simplified, projected, or served |
| [`radar-chart-pattern`](skills/radar-chart-pattern/SKILL.md) | Weighted dimensions need a dependency-free radar chart |
| [`diagram-design`](skills/diagram-design/SKILL.md) | A diagram must be made (architecture, flow, sequence, state, comparison) — the 7 rules for diagrams that survive being looked at. Pairs with `radar-chart-pattern` (one chart type), `beyond-the-screen` (deliverables), `narrative-companion-surfaces` (companion views) |
| [`narrative-companion-surfaces`](skills/narrative-companion-surfaces/SKILL.md) | Writing needs an interactive companion without pretending shuffled data is live computation |

## Judgment from the reading

Twelve books this practice keeps returning to, grouped by the decision each one changes.
Sources are named inside every file; these are operational skills, not book summaries.

| Skill | Load it when… | From |
|---|---|---|
| [`cognition-first`](skills/cognition-first/SKILL.md) | A UX, copy, default, or incentive decision needs the human who actually shows up | Kahneman · Pink |
| [`moral-reasoning`](skills/moral-reasoning/SKILL.md) | A decision has no right answer, plural stakeholders, or irreversible cost — the 4 moves (name values, name stakeholders, name trade-off, name 10-year defense) + 7 corollary disciplines |
| [`qualitative-reasoning`](skills/qualitative-reasoning/SKILL.md) | The data is fuzzy, the metric is misleading, or the answer cannot be derived from the numbers — the 6 moves (uncanny, falliblist, I-should test, tradition audit, synthetic a priori, counter-example) |
| [`legible-systems`](skills/legible-systems/SKILL.md) | An interface needs a mental model, or a component needs to become a real pattern | Lynch · Alexander |
| [`design-method`](skills/design-method/SKILL.md) | An approach is unclear, or the first idea is about to become the only idea | Rowe · Kelley · Kelley & Kelley · Maeda |
| [`written-principles`](skills/written-principles/SKILL.md) | The same judgment call keeps recurring, or work needs splitting across agents | Dalio · Smith |
| [`make-it-stick`](skills/make-it-stick/SKILL.md) | Any user-facing text, error message, README, or technical explanation | Heath & Heath · Pinker |

## Specialized field kits

These are narrow on purpose. They carry implementation scars that would be noise in a general skill.

| Skill | Load it when… |
|---|---|
| [`itic-cctv-integration`](skills/itic-cctv-integration/SKILL.md) | A Thai city surface needs Longdo/iTIC cameras or incidents with honest live modes |
| [`design-anthropology`](skills/design-anthropology/SKILL.md) | A design or product decision assumes a universal human constant, or the same solution keeps failing across different users — the 6 moves (counter-example, cultural variation, personal-as-laboratory, bad-faith detection, biopower check, writing degree zero) |
| [`iptv-streaming`](skills/iptv-streaming/SKILL.md) | HLS channels need a resilient registry and token/origin-aware proxy |
| [`local-ai-fabric`](skills/local-ai-fabric/SKILL.md) | Apple-Silicon machines should serve local models through one durable gateway |
| [`voice-clone-podcast`](skills/voice-clone-podcast/SKILL.md) | Long-form local voice cloning drops words, drifts, or babbles between chunks |
| [`home-cctv-grid`](skills/home-cctv-grid/SKILL.md) | RTSP/ONVIF home cameras need one honest grid with local storage — stream, snapshot, or pin, never a fake player |
| [`satellite-change-watch`](skills/satellite-change-watch/SKILL.md) | Land, flood, fire, or coast must be monitored from dated NASA/open satellite time-stacks with honest latency |

## Local AI, retrieval, and self-improvement

Small, operable, no SaaS. FTS5 before vectors, one machine before a fabric, three MCP tools before twenty, one promotion a month before a pack.

| Skill | Load it when… |
|---|---|
| [`local-llm-ollama`](skills/local-llm-ollama/SKILL.md) | Single-machine Ollama is needed for offline inference, drafts, or embeddings — graduate to `local-ai-fabric` only when one machine stops being enough |
| [`free-api-keys`](skills/free-api-keys/SKILL.md) | A new project needs LLM calls without a credit card — thirteen $0/month providers (Groq, Google AI Studio, Cerebras, OpenRouter, Cloudflare Workers AI, AI Horde, LLM7.io, Puter.js, Cohere, Mistral, NVIDIA NIM, Hugging Face, SambaNova) ranked by use case |
| [`simple-rag`](skills/simple-rag/SKILL.md) | Docs, notes, or a corpus must be searchable locally with citations — SQLite FTS5 first, embeddings only after the gate passes |
| [`obsidian-mcp-forge`](skills/obsidian-mcp-forge/SKILL.md) | Agents need the A+ Obsidian coding brain — filesystem forge, disposable recall index, cull/smoke/eval hygiene |
| [`improvement-radar`](skills/improvement-radar/SKILL.md) | The stack must stay excellent via a weekly watchdog — scrape cloneable systems, file Steal / Feedstock / Refuse verdicts, promote at most one a month |
| [`messaging-gateway`](skills/messaging-gateway/SKILL.md) | Answers must reach a phone via Telegram, Line, or WhatsApp — RAG behind chat with citations |
| [`staff-swarm`](skills/staff-swarm/SKILL.md) | A job needs researcher + field + orchestrator roles with token-tier routing (cheap models for paraphrase, frontier for assembly) |

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
| [`100-days-of-writing-reasoning-argument-logic-na6pzg`](skills/100-days-of-writing-reasoning-argument-logic-na6pzg/SKILL.md) | Use when me: 100-days-of-writing-reasoning-argument-logic-na6pzg |
| [`100-days-of-writing-storytelling-the-writing-craft-1fc5btj`](skills/100-days-of-writing-storytelling-the-writing-craft-1fc5btj/SKILL.md) | Use when me: 100-days-of-writing-storytelling-the-writing-craft-1fc5btj |
| [`behavioral-economics-predicting-real-human-choices-1cfeaeg`](skills/behavioral-economics-predicting-real-human-choices-1cfeaeg/SKILL.md) | Use when me: behavioral-economics-predicting-real-human-choices-1cfeaeg |
| [`business-model-generation-mastering-the-canvas-k519i1`](skills/business-model-generation-mastering-the-canvas-k519i1/SKILL.md) | Use when me: business-model-generation-mastering-the-canvas-k519i1 |
| [`choice-architecture-nudging-decisions-without-coercion-1vgrrkp`](skills/choice-architecture-nudging-decisions-without-coercion-1vgrrkp/SKILL.md) | Use when me: choice-architecture-nudging-decisions-without-coercion-1vgrrkp |
| [`culture-and-communication-the-logic-of-symbols-109gk9m`](skills/culture-and-communication-the-logic-of-symbols-109gk9m/SKILL.md) | Use when me: culture-and-communication-the-logic-of-symbols-109gk9m |
| [`design-by-writing-100-day-reflection-engine-ziojx2`](skills/design-by-writing-100-day-reflection-engine-ziojx2/SKILL.md) | Use when me: design-by-writing-100-day-reflection-engine-ziojx2 |
| [`disruptive-innovation-playbook-navigating-the-innovator-s-di-1iptvgs`](skills/disruptive-innovation-playbook-navigating-the-innovator-s-di-1iptvgs/SKILL.md) | Use when me: disruptive-innovation-playbook-navigating-the-innovator-s-di-1iptvgs |
| [`emotional-design-three-levels-for-meaningful-products-17bhy7j`](skills/emotional-design-three-levels-for-meaningful-products-17bhy7j/SKILL.md) | Use when me: emotional-design-three-levels-for-meaningful-products-17bhy7j |
| [`everyday-design-fundamentals-14by7eo`](skills/everyday-design-fundamentals-14by7eo/SKILL.md) | Use when me: everyday-design-fundamentals-14by7eo |
| [`fieldwork-mastery-the-french-ethnographic-tradition-18gonb7`](skills/fieldwork-mastery-the-french-ethnographic-tradition-18gonb7/SKILL.md) | Use when me: fieldwork-mastery-the-french-ethnographic-tradition-18gonb7 |
| [`freakonomics-incentives-and-causal-inference-1hisp`](skills/freakonomics-incentives-and-causal-inference-1hisp/SKILL.md) | Use when me: freakonomics-incentives-and-causal-inference-1hisp |
| [`human-centered-design-process-elf9h4`](skills/human-centered-design-process-elf9h4/SKILL.md) | Use when me: human-centered-design-process-elf9h4 |
| [`ideo-design-process-observe-brainstorm-prototype-iterate-1qvodax`](skills/ideo-design-process-observe-brainstorm-prototype-iterate-1qvodax/SKILL.md) | Use when me: ideo-design-process-observe-brainstorm-prototype-iterate-1qvodax |
| [`ideo-method-cards-choosing-and-applying-design-methods-1e20oct`](skills/ideo-method-cards-choosing-and-applying-design-methods-1e20oct/SKILL.md) | Use when me: ideo-method-cards-choosing-and-applying-design-methods-1e20oct |
| [`innovation-personas-the-ten-faces-of-ideo-bklfgc`](skills/innovation-personas-the-ten-faces-of-ideo-bklfgc/SKILL.md) | Use when me: innovation-personas-the-ten-faces-of-ideo-bklfgc |
| [`interaction-design-craft-from-participatory-prototyping-to-d-1xzl7q`](skills/interaction-design-craft-from-participatory-prototyping-to-d-1xzl7q/SKILL.md) | Use when me: interaction-design-craft-from-participatory-prototyping-to-d-1xzl7q |
| [`interpretive-anthropology-reading-culture-thickly-14r8fgq`](skills/interpretive-anthropology-reading-culture-thickly-14r8fgq/SKILL.md) | Use when me: interpretive-anthropology-reading-culture-thickly-14r8fgq |
| [`kinship-in-bali-a-system-of-meanings-17ki8bq`](skills/kinship-in-bali-a-system-of-meanings-17ki8bq/SKILL.md) | Use when me: kinship-in-bali-a-system-of-meanings-17ki8bq |
| [`language-instinct-ai-communication-blueprint-1r5mwl8`](skills/language-instinct-ai-communication-blueprint-1r5mwl8/SKILL.md) | Use when me: language-instinct-ai-communication-blueprint-1r5mwl8 |
| [`measurement-foundations-for-human-studies-lhoitu`](skills/measurement-foundations-for-human-studies-lhoitu/SKILL.md) | Use when me: measurement-foundations-for-human-studies-lhoitu |
| [`medical-anthropology-the-human-experience-of-health-and-heal-p24hlu`](skills/medical-anthropology-the-human-experience-of-health-and-heal-p24hlu/SKILL.md) | Use when me: medical-anthropology-the-human-experience-of-health-and-heal-p24hlu |
| [`non-writing-the-editor-brain-skill-ri1czx`](skills/non-writing-the-editor-brain-skill-ri1czx/SKILL.md) | Use when me: non-writing-the-editor-brain-skill-ri1czx |
| [`pattern-language-design-toolkit-1pms7oa`](skills/pattern-language-design-toolkit-1pms7oa/SKILL.md) | Use when me: pattern-language-design-toolkit-1pms7oa |
| [`purity-and-danger-mapping-boundaries-taboo-and-classificatio-erej6c`](skills/purity-and-danger-mapping-boundaries-taboo-and-classificatio-erej6c/SKILL.md) | Use when me: purity-and-danger-mapping-boundaries-taboo-and-classificatio-erej6c |
| [`rich-dad-poor-dad-the-financial-literacy-mindset-1krapzz`](skills/rich-dad-poor-dad-the-financial-literacy-mindset-1krapzz/SKILL.md) | Use when me: rich-dad-poor-dad-the-financial-literacy-mindset-1krapzz |
| [`self-managed-project-mastery-100-days-of-writing-1e5bhwu`](skills/self-managed-project-mastery-100-days-of-writing-1e5bhwu/SKILL.md) | Use when me: self-managed-project-mastery-100-days-of-writing-1e5bhwu |
| [`simplicity-moves-ten-laws-for-clearer-design-rii9k6`](skills/simplicity-moves-ten-laws-for-clearer-design-rii9k6/SKILL.md) | Use when me: simplicity-moves-ten-laws-for-clearer-design-rii9k6 |
| [`solo-scribble-the-discipline-of-unedited-drafting-egka8o`](skills/solo-scribble-the-discipline-of-unedited-drafting-egka8o/SKILL.md) | Use when me: solo-scribble-the-discipline-of-unedited-drafting-egka8o |
| [`the-ethnography-of-malinowski-participant-observation-and-fi-18q9ieu`](skills/the-ethnography-of-malinowski-participant-observation-and-fi-18q9ieu/SKILL.md) | Use when me: the-ethnography-of-malinowski-participant-observation-and-fi-18q9ieu |
| [`thinking-fast-and-slow-the-ai-decision-engine-tntcy7`](skills/thinking-fast-and-slow-the-ai-decision-engine-tntcy7/SKILL.md) | Use when me: thinking-fast-and-slow-the-ai-decision-engine-tntcy7 |
| [`topological-anthropology-the-leach-method-mfffe5`](skills/topological-anthropology-the-leach-method-mfffe5/SKILL.md) | Use when me: topological-anthropology-the-leach-method-mfffe5 |
| [`urban-anthropology-reading-the-city-of-flows-and-places-13q28oj`](skills/urban-anthropology-reading-the-city-of-flows-and-places-13q28oj/SKILL.md) | Use when me: urban-anthropology-reading-the-city-of-flows-and-places-13q28oj |
| [`urban-inhabitation-the-anthropology-of-precarity-and-space-lptff4`](skills/urban-inhabitation-the-anthropology-of-precarity-and-space-lptff4/SKILL.md) | Use when me: urban-inhabitation-the-anthropology-of-precarity-and-space-lptff4 |
| [`validated-learning-the-build-measure-learn-loop-1i6p1f5`](skills/validated-learning-the-build-measure-learn-loop-1i6p1f5/SKILL.md) | Use when me: validated-learning-the-build-measure-learn-loop-1i6p1f5 |
| [`value-investing-graham-s-core-discipline-j4ppt3`](skills/value-investing-graham-s-core-discipline-j4ppt3/SKILL.md) | Use when me: value-investing-graham-s-core-discipline-j4ppt3 |
| [`classic-style-writing-with-clarity-and-concrete-vision-83ryzm`](skills/classic-style-writing-with-clarity-and-concrete-vision-83ryzm/SKILL.md) | Steven Pinker's classic style for clear, vivid, unpretentious prose |
| [`success-making-ideas-stick-1to2c2n`](skills/success-making-ideas-stick-1to2c2n/SKILL.md) | Chip and Dan Heath's SUCCESs framework for memorable messages |
| [`the-art-of-thinking-clearly-a-bias-detection-toolkit-1wtgikf`](skills/the-art-of-thinking-clearly-a-bias-detection-toolkit-1wtgikf/SKILL.md) | Rolf Dobelli's cognitive bias detection toolkit |
| [`value-proposition-design-1mtu6jn`](skills/value-proposition-design-1mtu6jn/SKILL.md) | Osterwalder's Value Proposition Canvas for mapping pains, gains, and jobs-to-be-done |
