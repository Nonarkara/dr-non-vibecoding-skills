# 03 — ROUTE

> **The catalog is a router.** Start with the moment you are in. Load the smallest useful skill set. Do not scan all 71.

A router collapses 80 skills to 8. If you know the moment, you know the route. The page is a cheat sheet for the 8 moments a working day actually contains.

![ROUTE — the smallest useful path](../../infographics/pages/page-03.png)

---

## The 8 routes, by moment

| # | Moment | Route | Why this and not the others |
|---|---|---|---|
| 01 | Choosing what to build | [`golden-rules`](../../skills/dr-non-golden-rules/SKILL.md) + [`design-thinking-vibecoding`](../../skills/design-thinking-vibecoding/SKILL.md) | The smallest path that says "build the right thing." `golden-rules` is the practical defaults; `design-thinking` is the framing for lived problems. |
| 02 | Entering an old repo | [`agent-memory`](../../skills/agent-memory/SKILL.md) + [`anti-regression`](../../skills/anti-regression/SKILL.md) | The memory ladder (Tier 1, 2, 3) plus the earned-work protection. Without these two, a five-week-dormant repo becomes a five-hour archaeology. |
| 03 | Scoping a risky change | [`planning-discipline`](../../skills/planning-discipline/SKILL.md) + [`karpathy-guidelines`](../../skills/karpathy-guidelines/SKILL.md) | Scope + acceptance evidence (`planning-discipline`) + the surgical-edit baseline (`karpathy-guidelines`). Use when the change is multi-file, ambiguous, or reversible only with effort. |
| 04 | Diagnosing a failure | [`systematic-debugging`](../../skills/systematic-debugging/SKILL.md) | Reproduce → collect → isolate → verify. The first plausible patch is the most expensive. |
| 05 | User-visible flow changed | [`browser-as-t`](../../skills/browser-as-t/SKILL.md) | A screenshot is appearance; T is behaviour. Open a real browser, walk the flow, log the network, capture the console. |
| 06 | Closing the work | [`adversarial-review`](../../skills/adversarial-review/SKILL.md) + [`result-honesty`](../../skills/result-honesty/SKILL.md) + `ship` | Adversarial review challenges the author's story. `result-honesty` produces the four-bucket status. `ship` is the commit-push-deploy-test loop. |
| 07 | Before a major release | [`human-walkthrough`](../../skills/human-walkthrough/SKILL.md) | The multi-persona user test via a real browser. Three personas find complementary bugs. Output is a blueprint and a roadmap. |
| 08 | After a year of patches | [`power-of-hindsight`](../../skills/power-of-hindsight/SKILL.md) | The data-driven retrospective. Collect every signal, analyze statistically, reconstruct the parts that carry weight from first principles. The Frankenstein phase has an end date. |

The 8 moments are not exhaustive. They are the moments that **recur**. Anything one-shot — a typo, a one-line color change — does not need a route; it needs a `fix:` commit.

## Why "load one for the decision" instead of "load all 80"

Three reasons, in order of cost.

**Context cost.** Loading 80 skill descriptions into the agent's context window on every change is not free. Most of the skill body is not relevant to the current decision. The router pattern keeps the loaded context small (typically 1-2 skills) by loading the *one* skill that matches the *current* moment.

**Decision cost.** A skill loaded for the wrong reason is worse than no skill. If `agent-memory` is loaded during a deploy, the agent is going to spend the next paragraph re-deriving the project. The route makes the loaded skill match the decision.

**Discovery cost.** A new contributor cannot memorise 80 skills. They can memorise 8 moments. The route is the entry point; the skill is the deep dive.

The system rule at the bottom of the page is the discipline: **Route. Don't scan.** Scanning is the verb a new contributor does when the catalog is too big to navigate. Routing is the verb an experienced one does when they know which skill owns the moment.

## The catalog file

The catalog lives at [`CATALOG.md`](../../CATALOG.md) at the repo root. It is a routing table, not a checklist — a one-paragraph intro says so explicitly. The structure is:

1. **The smallest useful path** — the 8 moments, with the route for each.
2. **Think / build / review / ship** — the longer paths for each stage.
3. **Memory, harness, and agent surfaces** — the project-contract skills.
4. **Production and resilience** — the operational skills (AppSec, topology, hindsight, walkthrough, full-stack-bootstrap).
5. **Design and visual systems** — the design discipline.
6. **Judgment from the reading** — the books-this-practice-returns-to skills.
7. **Specialized field kits** — the narrow skills (CCTV, IPTV, voice clone, local AI fabric, satellite watch, home CCTV, RAG, Obsidian MCP, messaging, staff swarm).
8. **Local AI, retrieval, and self-improvement** — Ollama, FTS5-first RAG, Obsidian MCP, improvement radar.

Every skill is in exactly one section. New skills land in the section that owns the trigger. The 8 moments above are the *cross-section* index — the moments that cut through the catalog and answer "what do I load right now?"

## What to do with this

- **Bookmark the page.** When a session starts, ask: what is the moment? Open the route. Load the skill.
- **Update the catalog, not the deck, when a new moment recurs.** If you find yourself reaching for a new skill on the same kind of change three times, the moment is recurring, the route is missing, and the catalog is the place to add it.
- **If you load more than 3 skills, you are probably in the wrong moment.** Re-route.

## Pairs with

- **Before → [01 — STACK](01-stack.md).** The four shapes are what the catalog contains; the route is how to navigate them.
- **After → [05 — MAP](05-map.md).** The route is a moment-by-moment index; the map is the whole-system view.
- **Skill:** [`route-dont-scan`](../../skills/route-dont-scan/SKILL.md) is the discipline behind the rule. It is one of the four skills the Cursor Desk added (see [playbook 10](../../playbooks/10-the-cursor-desk.md)).
- **Catalog:** [`CATALOG.md`](../../CATALOG.md) is the full routing table; this page is the eight-row cheat sheet.

**Source.** The 8 routes are derived from [`CATALOG.md`](../../CATALOG.md) § "The smallest useful path" + the 2 newer skills (`human-walkthrough`, `power-of-hindsight`) that the catalog's smallest-path table predates.
