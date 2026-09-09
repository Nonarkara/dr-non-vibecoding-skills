# 05 — MAP

> **A decision map, not a toolbox.** 75 skills, grouped by the decision they change. Eight categories. One skill per category is the daily ceiling; everything else is a lookup.

The map is the whole-system view at a glance. The route (page 03) is the moment-by-moment index. The map is what the route draws from.

![MAP — how to see the whole system](../../infographics/pages/page-05.png)

---

## The 8 categories

Each category owns a different question. A new skill lands in the category whose question it answers.

| Category | The question it answers | Current skills (illustrative) |
|---|---|---|
| **Think / Build / Review / Ship** | How do I make a change, end to end, without the change sprawling? | `design-thinking-vibecoding`, `karpathy-guidelines`, `planning-discipline`, `ninja-innovation`, `systematic-debugging`, `anti-regression`, `adversarial-review`, `browser-as-t`, `result-honesty`, `ship-discipline`, `wrong-green`, `lesson-residue`, `context-economy`, `skill-writing` |
| **Memory / Harness** | How does a project remember itself, and how does the agent's environment stay honest? | `agent-memory`, `shared-memory-hub`, `harness-hardening`, `mcp-cli-first`, `subagent-routing`, `codex-workbench` |
| **Production / Resilience** | What does "safe enough to call production" mean, and how do I survive the parts of prod that go wrong? | `production-spine`, `risk-posture`, `deploy-verification`, `always-on-services`, `dual-write-resilience`, `honest-envelope`, `data-catalog`, `workspace-lean`, `know-when-to-wait`, `full-stack-bootstrap`, `appsec-stack`, `stack-repo-topology`, `power-of-hindsight`, `human-walkthrough` |
| **Design / Visual Systems** | How do I keep the surface from looking like every other agent-built site? | `axiom-design-core`, `design-dna`, `design-registers`, `no-design-tells`, `dashboard-discipline`, `no-ai-tells`, `legible-systems`, `ux-archaeology`, `map-3d-city`, `beyond-the-screen`, `colour-and-type`, `data-display`, `phone-first`, `multilingual-type` |
| **Judgment from the Reading** | The books this practice keeps returning to, distilled into operational rules. | `cognition-first`, `legible-systems` (also design), `design-method`, `written-principles`, `make-it-stick` |
| **Field Kits** | Narrow on purpose. They carry implementation scars that would be noise in a general skill. | `itic-cctv-integration`, `iptv-streaming`, `local-ai-fabric`, `voice-clone-podcast`, `home-cctv-grid`, `satellite-change-watch` |
| **Local AI / Retrieval** | Operable, no SaaS. FTS5 before vectors, one machine before a fabric. | `local-llm-ollama`, `simple-rag`, `obsidian-mcp-forge`, `improvement-radar`, `messaging-gateway`, `staff-swarm` |
| **Close the Loop** | Ship is not the end. The system needs to be walked, learned from, and reconstructed. | `human-walkthrough`, `power-of-hindsight` |

The categories are not arbitrary. They fall out of a question the practice asks on every commit: *is this change a thing the agent does, a thing the project remembers, a thing the production survives, a thing the user sees, a thing the operator has to judge, a thing the world pushes back on, or a thing the loop has to close?* Eight questions, eight categories, 69 answers.

## Why "decision map, not a toolbox"

A toolbox is a list of tools. You reach in, you grab the wrench, you put it back. The list grows until you cannot find the wrench.

A decision map is a list of **decisions** with the **answers** grouped. The grouping is load-bearing. A new contributor who knows the decision they are facing can find the skill in 10 seconds. A new contributor with a toolbox is searching by name.

The catalog is the routing table (page 03); the map is the layout of the table. A new skill belongs to exactly one category. If it does not fit any of the eight, the categories are wrong, the skill is wrong, or both. The choice is a **decision the author makes explicitly**, not a dump into "miscellaneous."

## The "judgment from the reading" category is the unique layer

Five skills — `cognition-first`, `legible-systems`, `design-method`, `written-principles`, `make-it-stick` — are not derived from incidents or from other skills. They are derived from **books this practice keeps returning to**: Kahneman, Pink, Lynch, Alexander, Rowe, Kelley, Maeda, Dalio, Smith, Heath & Heath, Pinker.

The fact that the books are *named* inside each skill body (in the `Influences:` section or a footnote) is load-bearing. A skill that says "use judgement" is unenforceable; a skill that says "use judgement the way Kahneman describes in *Thinking, Fast and Slow* — bias to the question, not the answer" is a checkable brief.

This category is the one a new contributor is most likely to skip. Do not skip it. The four procedural categories (think/build, memory, production, design) cover most of what working with an agent requires. The fifth covers most of what **deciding with** an agent requires.

## What to do with this

- **Before writing a new skill, name the category.** If you cannot, the skill is not ready — either you have not found the question it answers, or the question is one the practice does not yet own.
- **When a category grows past ~20 skills, split it.** The visual / design category is the most likely to bloat first; the `skill-writing` discipline is the test.
- **When two categories start to overlap, merge them.** If a skill could land in either, the categories are not orthogonal. The catalog comment at the bottom of `CATALOG.md` is the standing rule: "if two skills appear to own the same decision, that is a catalog bug."

## Pairs with

- **Before → [03 — ROUTE](03-route.md).** The route is moment-by-moment; the map is the whole system.
- **After → [07 — PROOF](07-proof.md).** The map is the categories. The proof is the gate that protects the categories from drift.
- **Skills:** [`skill-writing`](../../skills/skill-writing/SKILL.md) (the rule for adding to the map), [`agent-memory`](../../skills/agent-memory/SKILL.md) (the rule for *where* a skill belongs in a project's memory, vs. the global catalog).
- **Source:** the 8 categories are the section headers in [`CATALOG.md`](../../CATALOG.md). The category names are stable; the skill counts under each are not.

**Source.** [`CATALOG.md`](../../CATALOG.md) § groups. The 8 categories were last re-cut in Q3 2026; the next re-cut is overdue (likely after the 6th harvest).
