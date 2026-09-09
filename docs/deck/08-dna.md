# 08 — DESIGN DNA

> **The point is not "make it look like Dr Non."** Taste > executable contract. The five stages turn an adjective into a checkable brief.

The collection has a design system. The design system is not a CSS file. The design system is a **process** — five stages that turn "what should this look like" into a contract an agent can be held to.

![DESIGN DNA — how taste survives the human](../../infographics/pages/page-08.png)

---

## The five stages

Each stage is a question. The order is not arbitrary. Earlier stages constrain later ones.

### 1. LINEAGE — What family does this belong to?

Every design lives in a family. A transit map lives with the 1972 NYCTA. A digital product lives with Braun and Mondaine. A civic dashboard lives with the Linn drum and a Quiet Type.

The named lineage is load-bearing. "Clean and modern" is unenforceable; "Vignelli's 1972 NYCTA" is. The agent can be held to the constraints the lineage implies (closed colour system, 45° angles, topology over geography) because the constraints are **specific enough that two people could disagree about whether the work matches them**.

References to use: [`reference/named-references.md`](../../reference/named-references.md) — Braun ET66, Mondaine, 1972 NYCTA, original iPod, Tokyo 1964, MUJI. Each entry has a one-decision table; pick the family before you pick the colour.

### 2. PSYCHOLOGY — What should the eye notice first?

Every design asks the user to look at one thing first. The question is whether the designer chose the thing deliberately, or the model chose it by default.

A page on a phone opens with a logo the size of the screen, an auto-playing video, and three popups. The eye sees none of them and bounces. The designer's job is to **name the first thing** — the metric, the action, the answer — and make everything else quieter.

The skill [`legible-systems`](../../skills/legible-systems/SKILL.md) names the five primitives: paths, edges, districts, nodes, landmarks. The skill [`phone-first`](../../skills/phone-first/SKILL.md) is the corollary: the link is opened on a phone, in portrait, with one thumb, on a slow connection. The psychology is "what does the first second look like."

### 3. CONSTRAINT — What rule makes that inevitable?

If the psychology is "the metric is the first thing," the constraint is "the metric is the only thing in the first viewport on a phone."

A constraint is the rule that makes the designer's choice automatic. The agent does not have to "remember" the priority; the rule enforces it. The constraint ladder in [`axiom-design-core`](../../skills/axiom-design-core/SKILL.md) is the canonical example: three type sizes, one numeric mono, zero border-radius, one amber accent. The agent cannot drift because the tokens are binding.

The difference between a constraint and a guideline is **enforceability**. A guideline the agent can forget; a constraint the agent cannot violate without breaking the build. The design DNA only matters when the constraints are tokenised and CI-checked.

### 4. TOKENS — What can an agent reuse exactly?

A token is a named, typed, versioned value. The collection uses CSS custom properties at the implementation level (see [`templates/design-tokens.css.template`](../../templates/design-tokens.css.template)) but the principle is broader: every reusable decision in the design system is a token.

A token is **reusable exactly**. The agent that imports `--radius-zero` gets the same value the human designer approved. The agent that does not import it cannot ship a different value silently.

The token system is also where the design system becomes enforceable. A guard in the deploy step that greps for `border-radius: [^0]` in the compiled CSS will fail the build. The agent learns the constraint the first time it tries to drift, and the design system wins.

### 5. REGRESSION — What named failure must never return?

The last stage is the most important. A regression is a **named** failure — the metric-card-grid with monospace labels, the hero section behind the login, the glowing status dot, the rainbow status badges on every row. The skill [`no-design-tells`](../../skills/no-design-tells/SKILL.md) enumerates them. The skill [`dashboard-discipline`](../../skills/dashboard-discipline/SKILL.md) is the corollary for product UI.

The regression list is the design system's memory. A new contributor who has never seen the project can read the list and avoid the failures the team spent a year learning. The list is not theoretical; each entry is a real incident, named, with the date and the cost.

The test is the closing question in every design review: *what named failure is this closest to, and how is it different?* If the answer is "I don't know" or "it isn't," the work is not done. The list is the bar; the work either clears it or it does not.

## The tag register

The bottom of the page is a vocabulary constraint. Four tags, each with a stable meaning, used everywhere in the design system:

- **SIZE + PRIORITY** — type sizes are denominated in priority, not pixels. Three sizes: small (a label), medium (body), large (the answer). Adding a fourth requires changing the design system, not the page.
- **COLOUR + ROUTING** — colours are routing signals, not decoration. Amber for the accent, monochrome for everything else. A new colour has to answer "what semantic role does this play."
- **REDUNDANCY + RESILIENCE** — the design system survives the parts of prod that go wrong. The empty state is designed. The error state is designed. The slow network is designed.
- **NO DECORATIVE MARKS** — gradients, shadows, blurs, rounded corners: each is a *potential* tell, and the design system declines them by default. The point is not "Dr Non's house style" — the point is "an agent cannot drift into a generic look because the generic tells are not in the vocabulary."

The tag register is the **grammar** the agent uses when it has to design something new. The five stages are the **process**; the four tags are the **vocabulary**. A new design that uses the vocabulary correctly but skips the process is decoration. A new design that follows the process without the vocabulary is amateur.

## What to do with this

- **Every design review walks the five stages.** A reviewer who has to check whether the lineage was named, the psychology chosen, the constraint set, the tokens reused, the regression list checked, has a checkable brief. The review becomes evidence, not opinion.
- **When a new tell appears, add it to the regression list.** The list is a living artefact. A tell that is not in the list is one the design system has not yet learned to reject.
- **When you cannot answer one of the five stages, stop.** The design is not ready. "It looks good" is not a substitute for the lineage being named.

## Pairs with

- **Before → [07 — PROOF](07-proof.md).** The proof is the existence test. The DNA is the design test.
- **After → [11 — CLOSE THE LOOP](11-close.md).** The DNA is the brief. The walkthrough is the test of the brief against three real personas.
- **Skills:** [`axiom-design-core`](../../skills/axiom-design-core/SKILL.md) (the tokens and the constraint ladder), [`design-dna`](../../skills/design-dna/SKILL.md) (the enforcement layer), [`no-design-tells`](../../skills/no-design-tells/SKILL.md) (the regression list), [`design-registers`](../../skills/design-registers/SKILL.md) (the named surfaces), [`dashboard-discipline`](../../skills/dashboard-discipline/SKILL.md) (the product-UI floor), [`ux-archaeology`](../../skills/ux-archaeology/SKILL.md) (how to extract patterns from prior art), [`colour-and-type`](../../skills/colour-and-type/SKILL.md) (how to choose a palette and a type scale), [`data-display`](../../skills/data-display/SKILL.md) (charts, tables, and numbers), [`phone-first`](../../skills/phone-first/SKILL.md) (the link gets opened on a phone), [`multilingual-type`](../../skills/multilingual-type/SKILL.md) (Thai, CJK, Arabic, scripts you do not read), [`legible-systems`](../../skills/legible-systems/SKILL.md) (paths, edges, districts, nodes, landmarks), [`beyond-the-screen`](../../skills/beyond-the-screen/SKILL.md) (decks, PDFs, social cards under the same design law).
- **Reference:** [`reference/named-references.md`](../../reference/named-references.md) is the catalogue of families.
- **Sister repo:** `dr-non-luggage-tag-aesthetic` is the visual lineage repo that the deck's page 8 cites — the tag register and the regression list originate there.

**Source.** The five stages are distilled from [`skills/axiom-design-core/SKILL.md`](../../skills/axiom-design-core/SKILL.md) and [`skills/design-dna/SKILL.md`](../../skills/design-dna/SKILL.md). The tag register is from the `dr-non-luggage-tag-aesthetic` lineage.
