# Named References

Every surface must name a **real reference** before the first line of CSS — never an adjective. "Clean and modern" is unenforceable; an agent cannot reason about it. A named artifact is a constraint it can actually check work against.

This is the catalogue to name from.

---

## Why an adjective fails

Ask for "clean and modern" and you get the average of everything the model has seen called clean and modern — which is the generated default. Name *the 1972 Vignelli subway diagram* and the constraints follow: a closed colour system, 45° angles only, geography subordinated to topology. That is a brief an agent can be held to.

**The rule:** the reference must be specific enough that two people could disagree about whether the work matches it.

---

## The canon — objects

Each made one hard decision and committed. Useful when you need the *attitude*, not a screenshot.

| Reference | The one decision |
|---|---|
| **Braun ET66** (Rams/Lubs, 1987) | One orange key in a field of grey. Colour marks the exception, nothing else. |
| **Mondaine station clock** (Hilfiker, 1944) | One red element on an otherwise monochrome face; everything else is pure interval. |
| **1972 NYCTA subway diagram** (Vignelli) | Topology beats geography. A closed route palette; 45° only. |
| **Original iPod** (Ive, 2001) | One input method for every function. |
| **Tokyo 1964 Olympics** (Kamekura) | A single geometric mark carrying an entire identity. |
| **MUJI** (Hara) | "This is enough" rather than "this is the best." Quiet sufficiency as a position. |
| **Braun RT20 radio** | Casts no shadow. Structure is material and edge, never elevation. |

## The canon — surfaces to read

Live sites worth citing as layout law. Read the served CSS, not a screenshot of it.

| Reference | What to take |
|---|---|
| **moma.org** | Type *is* the grid — spacing denominated in line-heights and cap-heights, not pixels. Asymmetric image/text widths as an argument device. |
| **Stripe docs** | Dense technical reading that stays scannable. Code and prose at parity. |
| **Linear** | Product UI restraint: keyboard-first, near-zero chrome, motion only as feedback. |
| **Apple HIG** | Systematised platform convention. Cite for structure, not for aesthetic. |
| **Edward Tufte's own books** | Small multiples, data-ink, direct labelling — see `data-display`. |

## External catalogues

Two collections are genuinely citable by an agent. Both carry hazards.

- **[`bergside/awesome-design-skills`](https://github.com/bergside/awesome-design-skills)** — 67 style folders, each a `DESIGN.md` (rationale) plus `SKILL.md` (agent instructions). The most directly consumable. MIT.
- **[`yzfly/awesome-design-html`](https://github.com/yzfly/awesome-design-html)** — ~96 self-contained `design.<brand>.html` files with real inline CSS from named brands. Read them; do not vendor them — the licence is NOASSERTION, not MIT.

**The hazard in both:** they include Glassmorphism, Neumorphism, Claymorphism, and Skeuomorphism categories. Those are gradient- and shadow-dependent by definition and import banned patterns wholesale. Pull an individual compatible style; never pull the collection.

Not recommended: **`starvingarc/agent-ui-atlas`** indexes 723 styles but contains no design content — it is a YAML table of links to other repositories. Citing it without following the link yields nothing concrete.

---

## Naming your own

The strongest reference is usually one you already own: a previous surface that worked, a photograph from the project's own context, a physical artifact from the domain. A transit dashboard citing a real transit artifact will beat one citing a SaaS product, because the constraints transfer.

**Write the reference into the project's `context.md`, next to the Design Read.** Undocumented, it will be quietly replaced by the next agent's default — correctly, because it will be indistinguishable from one.
