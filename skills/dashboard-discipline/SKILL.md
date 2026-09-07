---
name: dashboard-discipline
description: Product UI is not a landing page. Use for dashboards, tables, forms, admin, and settings.
license: MIT
---

# Dashboard Discipline

> The anti-slop skills the field actually reads — `taste-skill`, `frontend-design`, `hallmark` — are written for landing pages. `taste-skill` says so in its own scope line: *"Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI."*
>
> If most of what you build is operational dashboards, that leaves the majority of your surface area with no taste authority. This is that authority.

Sources worth crediting: `kuras3/product-ui-design`, `LeoStehlik/no-slop-ui`, `Vanszs/Anti-AI-UI`, `Krishna-Modi12/frontend-design-pro`, `nutlope/hallmark`. Their *bans* are good. Their positive numeric defaults (corner radii, shadow floors, entrance timings) are discarded here in favour of house law — see §5.

---

## 1. The dashboard tells

These are specific to product UI and appear in none of the marketing-oriented lists.

**The glowing status dot.** A `●` with a `box-shadow` glow to say "live." Named by `product-ui-design` as *the single most common product-UI tell*. A live indicator is a dot and, at most, an opacity pulse. The glow adds nothing and marks the surface instantly.

**Monospace on labels.** The most useful rule in this file and the one most often violated.

> Monospace is a **data voice** — numbers, codes, timestamps, anything where character-cell alignment is functionally required. It is not a **label voice**.

Tracked uppercase mono on every section header, every field label, and every eyebrow is scaffolding, not information. It reads as "technical" without being technical, and it is now a recognised tell. Use mono where columns must align. Use the sans face for labels.

**Hero sections inside an internal dashboard.** An operator who has logged in does not need to be sold to. No hero, no value proposition, no marketing rhythm behind the login wall.

**The metric-card-grid as the default layout.** Four equal cells across the top because that is what dashboards look like. If the four metrics are not genuine peers, the grid is lying about their relationship. Rank them or nest them.

**Unequal stat strips.** The same failure at smaller scale — a strip of equal cells whose contents are not equals.

**Rainbow status badges on every row.** Colour on every row means colour signals nothing. Colour marks the exception.

**Every screen a variation of the same card grid.** The portfolio-level tell: purpose-built flows replaced by one skeleton reskinned. If two screens differ only in their card contents, one of them has not been designed.

---

## 2. Structure before style

**Semantic HTML first.** `<table>` for tabular data, `<dl>` for key–value pairs, `<nav>`, `<dialog>`, `<button>`, `<a>`. A grid of `<div>`s pretending to be a table fails keyboard users, screen readers, and copy-paste — and it is a reliable marker of generated markup.

**Data density is correct when every element is load-bearing.** The test is never "is there less?" It is "does each element earn its place?" Legibility, not sparseness, is the goal.

---

## 3. States are the product

A dashboard spends most of its life in a state that is not the happy path. Generated UI ships the happy path only.

**Every interactive component covers eight states:** default · hover · `:focus-visible` · `:active` · disabled · loading · error · success.

**Every data surface covers four:** loading · empty · error · success. The empty state is where the curse of knowledge does the most damage — the author has never seen it.

**Loading states must be driven by real async.** A `setTimeout` faking a spinner is a lie about system state, and it survives into production because it always looks right in the demo.

**Every interactive element has real behaviour or is removed.** A button wired to nothing is worse than a missing button: it teaches the operator the surface is decorative.

---

## 4. The litmus tests

> **Swap the logo for a competitor's. Would anyone notice?** If not, it is slop.

> **Would a stranger place this among thirty agent-built sites?** Score the stack, not the item.

> **Do two of your screens differ only in card contents?** Then one was not designed.

---

## 5. What was deliberately not taken

Recorded so a later agent reading the same sources does not re-import them.

| Source advice | Why rejected |
|---|---|
| `no-slop-ui`: cards 8–12px radius, buttons 6–10px, shadow `0 2px 8px` | House law is `border-radius: 0` except a true circle, and zero `box-shadow` except `inset` and `:focus-visible`. These are floors, not ceilings, in the source — importing them would mandate the violation. |
| `product-ui-design`: two-layer ambient + occlusion shadows | Same. Structure comes from hairlines whose weight varies by role. |
| `Anti-AI-UI`: radius scale (`rounded-md` → `rounded-xl` → `rounded-full`) | Same. A scale of wrong values is still wrong. |
| `Anti-AI-UI` / `frontend-design-pro`: entrances 200–300ms, `ease-out` for entrances | Presumes entrance animation exists. House law: no entrance animations, no scroll reveals, no parallax. Motion is feedback only. |
| `miqdadbadjuber/anti-slop`: MOTION dial tiers 2–3 (scroll-reveal, parallax) | Same. Treated there as legitimate high-energy options; here they are never-allowed. |
| `miqdadbadjuber/anti-slop`: gradients permitted with a written justification | House law is zero gradients except a dark-to-transparent overlay on a photograph. A justification field does not buy an invariant. |
| `hallmark`: rotate the accent hue per generation to avoid repeating | Correct instinct (anti-sameness), wrong lever for a single-accent brand. Vary the *structure*, not the accent. |
| `superdesign-skill` | Shells out to an external authenticated SaaS. Fails the local-first and CLI-first defaults, and adds nothing the local toolkit lacks. |

**The pattern worth noticing:** every one of these repos gets the *bans* right and the *positive defaults* wrong for this practice, because their positive defaults encode the mainstream product-UI look. Take their lists of what to refuse. Never take their numbers.

---

## The check

```
□ Any glowing status dot?
□ Is monospace carrying data, or dressing up labels?
□ Any hero, or marketing rhythm, behind the login?
□ Is the top metric row four genuine peers — or a grid hiding a hierarchy?
□ Semantic elements for tabular and key–value data?
□ All eight component states, and all four data states?
□ Is every loading state driven by real async?
□ Does every interactive element actually do something?
□ Swap the logo — would anyone notice?
□ Do any two screens differ only in card contents?
```

Pairs with `no-design-tells` (the general layer), `legible-systems` (paths, edges, districts, nodes, landmarks), `honest-envelope`, `cognition-first`.
