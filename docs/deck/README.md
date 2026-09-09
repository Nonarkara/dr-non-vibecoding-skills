# The Deck — Expanded

> A 19-page deck expanded into a read-it-once tour of the system. Each page in this folder is the **text** behind one PNG in [`infographics/pages/`](../../infographics/pages/). Read the PNG, then read the text — or read the text alone, the deck survives without the pixels.

**Who this is for.** A new contributor who has just cloned the repo and wants the operating philosophy in one sitting, not the 69 skill files. A reviewer who has five minutes to understand the load-bearing claims. A future Dr Non in two years who has forgotten why this is shaped the way it is.

**The 7 pages here are not the whole deck.** The PDF/PPTX in [`infographics/`](../../infographics/) has 19 pages. This folder has the seven that carry the **argument** — the stack, the route, the map, the proof, the design DNA, the close-the-loop, and the ship. The other 12 are worked examples and visual support; they exist in the deck, they do not need prose.

---

## The reading order

The pages are not independent. They build.

| # | Page | The argument it makes | If you skip it |
|---|---|---|---|
| [01](01-stack.md) | **STACK** — the package at a glance | 71 skills, 13 playbooks, 7 references, 12 templates is **one product**, not four. Plain markdown, no runtime, agent-agnostic. The routing loop is a habit, not a diagram. | You treat the repo as a skills library instead of a stack. You add skills without knowing the loop they belong to. |
| [03](03-route.md) | **ROUTE** — the smallest useful path | "The catalog is a router." Eight moments, eight routes. The 71 skills collapse to 8 if you are in a hurry. **Route, don't scan.** | You load all 71 skills into context on every change. You spend the first ten minutes of every session finding where to start. |
| [05](05-map.md) | **MAP** — a decision map, not a toolbox | Eight categories that each answer a different question. New skills land in exactly one of them. | You write a new skill and cannot decide where it belongs. The categories drift. The catalog becomes a junk drawer. |
| [07](07-proof.md) | **PROOF** — green ≠ true | Tests prove correctness; the browser/curl proves existence. The four-step proof chain (commit → push → deploy → test live) is non-negotiable. | You ship a green test and a stale user. You say "it works" because the CI is green. |
| [08](08-dna.md) | **DESIGN DNA** — taste > executable contract | Lineage → psychology → constraint → tokens → regression. The five stages turn "make it look like Dr Non" into a checkable brief. | You inherit a design system and flatten it. You ship a UI that nobody can tell from another agent-built site. |
| [11](11-close.md) | **CLOSE THE LOOP** — walk > learn > reconstruct | Three personas (first-time, second-time, extreme) find complementary bugs. Output is Now / Next / Later / Never. Power of hindsight is collect → analyze → reconstruct. | You stop at "shipped." You never reconstruct the patchwork. The Frankenstein year never ends. |
| [12](12-ship.md) | **SHIP** — the system in one sentence | The secret is not the model. Five categories (memory, design, catalog, ship, risk) each carry one thing that survives. **The best stack is the one that ships.** | You over-engineer. You under-verify. You write the 70th skill instead of rebuilding the 30 that already work. |

The pages 01 → 03 → 05 → 07 → 08 → 11 → 12 are the **load-bearing argument**. Read them in order once, then drop in on the one you need.

---

## How this was written

The PNGs are the deck. The text is the argument underneath. Each text page follows the same shape:

- The **headline** (the one sentence that should stick)
- The **subhead** (the longer line, set above the headline on the page)
- The **diagram explained** (what the boxes and arrows mean in plain prose)
- The **code references** (the actual skills, playbooks, references, and templates the page is about — every claim is linkable)
- A **what to do with this** section (how to apply the page in real work)
- A **pairs with** footer (the next page to read, the related skills)

A page is short on purpose. A 200-line explanation of a diagram is not a tour, it is a textbook. If a page is more than ~250 lines, the diagram probably carries the weight, and the text should be the back-pocket reminder.

---

## What this is *not*

- **It is not a substitute for the skills.** The deck makes the case; the skills are the work. If you load just the deck, you have read the philosophy. If you load just the skills, you have read the procedures. You need both.
- **It is not a marketing piece.** Every page names a real failure mode and the skill that answers it. There is no "ecosystem" or "platform" or "AI-native" language in here on purpose.
- **It is not the canonical spec.** The canonical spec is the skill's body. The deck is the wrapper. When they disagree, the skill wins.
- **It is not finished.** The deck is a living artefact. A page that does not earn its place in a future quarter is deleted. The same conservation rule that applies to the skills applies to the deck.

---

## Where the deck came from

The deck was drawn in the same visual language as `axiom-design-core` and `design-dna` — Vignelli, NYCTA, Rams, Mondaine. Because a repo about taste-as-a-contract should look like it means it. The visual system is documented in [`skills/axiom-design-core/SKILL.md`](../../skills/axiom-design-core/SKILL.md); the visual lineage is in [`reference/named-references.md`](../../reference/named-references.md).

Every page cites its source file at the bottom — the skill or the playbook or the reference that the page is distilled from. If a page says something that is not in the file it cites, the file is out of date, not the page.

---

## How to use this

- **A new contributor reads the deck first, then the README, then skills in any order.** The deck is the philosophy, the README is the inventory, the skills are the procedures.
- **A reviewer reads one page at the time the topic comes up.** A PR about deploy → read page 07. A PR about adding a new category → read page 05.
- **A skill author checks the deck before writing.** A new skill belongs to one of the 8 categories on page 05. If it does not, the skill is wrong, the categories are wrong, or both are. Pick one before writing the body.
- **A maintainer audits the deck every quarter.** The pages that no longer match the source files get marked "stale" in the frontmatter; the next sweep deletes them.

Fork the method, not the secrets.
