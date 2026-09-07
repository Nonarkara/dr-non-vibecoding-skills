# Skill Catalog

Forty-three focused skills, grouped by the decision they change. Start with one problem;
load one matching skill. The collection is a routing system, not a checklist.

## The smallest useful path

| Moment | Load |
|---|---|
| Choosing what to build | [`dr-non-golden-rules`](skills/dr-non-golden-rules/SKILL.md) + [`design-thinking-vibecoding`](skills/design-thinking-vibecoding/SKILL.md) |
| Entering an existing repository | [`agent-memory`](skills/agent-memory/SKILL.md) + [`anti-regression`](skills/anti-regression/SKILL.md) |
| Scoping a nontrivial change | [`planning-discipline`](skills/planning-discipline/SKILL.md) + [`karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md) |
| Diagnosing a failure | [`systematic-debugging`](skills/systematic-debugging/SKILL.md) |
| Changing a user-visible flow | [`browser-as-t`](skills/browser-as-t/SKILL.md) |
| Closing the work | [`adversarial-review`](skills/adversarial-review/SKILL.md) + [`result-honesty`](skills/result-honesty/SKILL.md) + [`ship-discipline`](skills/ship-discipline/SKILL.md) |

## Think, build, review, ship

| Skill | Load it when… |
|---|---|
| [`design-thinking-vibecoding`](skills/design-thinking-vibecoding/SKILL.md) | A lived problem needs framing, a narrow MVP, and the right agent/model split |
| [`dr-non-golden-rules`](skills/dr-non-golden-rules/SKILL.md) | Architecture, tool choice, build order, or a keep/kill decision needs a practical default |
| [`director-not-typer`](skills/director-not-typer/SKILL.md) | Human intent is getting buried under implementation menus |
| [`planning-discipline`](skills/planning-discipline/SKILL.md) | A multi-file, ambiguous, or risky change needs scope and acceptance evidence |
| [`route-dont-scan`](skills/route-dont-scan/SKILL.md) | Work starts inside a monorepo or multi-project directory |
| [`karpathy-guidelines`](skills/karpathy-guidelines/SKILL.md) | Code needs explicit assumptions, simplicity, surgical edits, and a verifiable goal |
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

## Memory, harness, and agent surfaces

| Skill | Load it when… |
|---|---|
| [`agent-memory`](skills/agent-memory/SKILL.md) | A repository needs an AGENTS.md/CLAUDE.md contract or durable gotchas |
| [`shared-memory-hub`](skills/shared-memory-hub/SKILL.md) | Verified knowledge should survive across tools, agents, and projects |
| [`harness-hardening`](skills/harness-hardening/SKILL.md) | Named agents, hooks, and rules need proof that they exist and fire |
| [`mcp-cli-first`](skills/mcp-cli-first/SKILL.md) | A connector, CLI, or API can perform an action that would otherwise be described |
| [`subagent-routing`](skills/subagent-routing/SKILL.md) | A bounded task may justify a fresh agent, independent review, or parallel work |
| [`codex-workbench`](skills/codex-workbench/SKILL.md) | Repeated Codex behavior needs the right home: rules, skill, plugin, app, hook, or automation |

## Production and resilience

| Skill | Load it when… |
|---|---|
| [`production-spine`](skills/production-spine/SKILL.md) | Software touching users, money, or data is about to be called production-ready |
| [`risk-posture`](skills/risk-posture/SKILL.md) | A solo builder must balance release speed against real blast radius |
| [`deploy-verification`](skills/deploy-verification/SKILL.md) | A CDN deploy must prove the actual static bytes reached users |
| [`always-on-services`](skills/always-on-services/SKILL.md) | A Mac-hosted service needs supervision, a public tunnel, and restart discipline |
| [`dual-write-resilience`](skills/dual-write-resilience/SKILL.md) | A public service must survive database downtime or quota failure |
| [`honest-envelope`](skills/honest-envelope/SKILL.md) | A displayed number needs source, fallback tier, and age |
| [`data-catalog`](skills/data-catalog/SKILL.md) | An API/feed adapter should be recorded once and reused |
| [`workspace-lean`](skills/workspace-lean/SKILL.md) | Worktrees or dependencies consume disk without risking live services or unique commits |
| [`know-when-to-wait`](skills/know-when-to-wait/SKILL.md) | Immature tooling may be the blocker, not insufficient effort |
| [`full-stack-bootstrap`](skills/full-stack-bootstrap/SKILL.md) | A new project needs memory, deploy, service, data, and design contracts in one pass |

## Design and visual systems

| Skill | Load it when… |
|---|---|
| [`axiom-design-core`](skills/axiom-design-core/SKILL.md) | Typography, color, motion, layout, and interaction need a reasoned starting point |
| [`design-dna`](skills/design-dna/SKILL.md) | Visual decisions need enforceable tokens and regression language |
| [`design-registers`](skills/design-registers/SKILL.md) | Shared design DNA is making every product look like the same control room |
| [`ux-archaeology`](skills/ux-archaeology/SKILL.md) | Public prior art or a DESIGN.md file needs pattern extraction inside your design contract |
| [`map-3d-city`](skills/map-3d-city/SKILL.md) | City buildings need fast, legible 3D extrusion without geometry glitches |
| [`radar-chart-pattern`](skills/radar-chart-pattern/SKILL.md) | Weighted dimensions need a dependency-free radar chart |
| [`narrative-companion-surfaces`](skills/narrative-companion-surfaces/SKILL.md) | Writing needs an interactive companion without pretending shuffled data is live computation |

## Specialized field kits

These are narrow on purpose. They carry implementation scars that would be noise in a general skill.

| Skill | Load it when… |
|---|---|
| [`itic-cctv-integration`](skills/itic-cctv-integration/SKILL.md) | A Thai city surface needs Longdo/iTIC cameras or incidents with honest live modes |
| [`iptv-streaming`](skills/iptv-streaming/SKILL.md) | HLS channels need a resilient registry and token/origin-aware proxy |
| [`local-ai-fabric`](skills/local-ai-fabric/SKILL.md) | Apple-Silicon machines should serve local models through one durable gateway |
| [`voice-clone-podcast`](skills/voice-clone-podcast/SKILL.md) | Long-form local voice cloning drops words, drifts, or babbles between chunks |

## Read once, then work from skills

- [`QUICKSTART.md`](QUICKSTART.md) changes five things in fifteen minutes.
- [`BLUEPRINT.md`](BLUEPRINT.md) bootstraps the whole practice into a new project.
- [`playbooks/`](playbooks/) explains the incidents and reasoning behind the standing instructions.
- [`reference/`](reference/) carries stable implementation details that should not crowd every skill.
- [`templates/`](templates/) contains the files meant to be copied and adapted.

If two skills appear to own the same decision, that is a catalog bug. Open an issue or merge the
overlap; do not make the agent choose between synonyms.
