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
| [`adversarial-review`](skills/adversarial-review/SKILL.md) | A fresh, flaw-seeking review should challenge the author's story |
| [`browser-as-t`](skills/browser-as-t/SKILL.md) | UI, routing, forms, layout, or client state changed |
| [`result-honesty`](skills/result-honesty/SKILL.md) | A session, handoff, or release needs evidence and explicit unknowns |
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
| [`narrative-companion-surfaces`](skills/narrative-companion-surfaces/SKILL.md) | Writing needs an interactive companion without pretending shuffled data is live computation |

## Judgment from the reading

Twelve books this practice keeps returning to, grouped by the decision each one changes.
Sources are named inside every file; these are operational skills, not book summaries.

| Skill | Load it when… | From |
|---|---|---|
| [`cognition-first`](skills/cognition-first/SKILL.md) | A UX, copy, default, or incentive decision needs the human who actually shows up | Kahneman · Pink |
| [`moral-reasoning`](skills/moral-reasoning/SKILL.md) | A decision has no right answer, plural stakeholders, or irreversible cost — the 4 moves (name values, name stakeholders, name trade-off, name 10-year defense) + 7 corollary disciplines |
| [`legible-systems`](skills/legible-systems/SKILL.md) | An interface needs a mental model, or a component needs to become a real pattern | Lynch · Alexander |
| [`design-method`](skills/design-method/SKILL.md) | An approach is unclear, or the first idea is about to become the only idea | Rowe · Kelley · Kelley & Kelley · Maeda |
| [`written-principles`](skills/written-principles/SKILL.md) | The same judgment call keeps recurring, or work needs splitting across agents | Dalio · Smith |
| [`make-it-stick`](skills/make-it-stick/SKILL.md) | Any user-facing text, error message, README, or technical explanation | Heath & Heath · Pinker |

## Specialized field kits

These are narrow on purpose. They carry implementation scars that would be noise in a general skill.

| Skill | Load it when… |
|---|---|
| [`itic-cctv-integration`](skills/itic-cctv-integration/SKILL.md) | A Thai city surface needs Longdo/iTIC cameras or incidents with honest live modes |
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
