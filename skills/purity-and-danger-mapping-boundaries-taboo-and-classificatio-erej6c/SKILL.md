<!-- consolidated by data/scrape/consolidate_skills.py -->

# Purity and Danger: Mapping Boundaries, Taboo, and Classification

> A practical guide for agents that need to decode rules about purity, pollution, and taboo. It shows how every rule is first a statement about a boundary – what belongs inside, what must stay out – and then explains how to spot the underlying social order the rule protects. The skill lets an AI ask “what system of order does this rule defend?” before asking “why does the rule exist?” and supplies concrete patterns for turning anthropological insight into product‑design decisions.

Source: Mary Douglas, 'Purity and Danger' (1966, Routledge)  
Purpose: The AI loads this when it has to reason about taboo, purity, classification, or the way a community draws boundaries. Mary Douglas's structuralist anthropology: dirt is matter out of place; the body is a system of boundaries; ritual classification reflects social classification. Distil for the AI: how to recognise when a rule is about the boundary, not the content; how to ask 'what is this system of order protecting?' before asking 'why this rule?'; the kinds of classifications that show up in user research and product design. Output 8-10 chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules. Plain English.  

Chapters: 10  
Glossary terms: 15  
Patterns: 6  
Cheatsheet rules: 12  

## When to load this skill

A practical guide for agents that need to decode rules about purity, pollution, and taboo. It shows how every rule is first a statement about a boundary – what belongs inside, what must stay out – and then explains how to spot the underlying social order the rule protects. The skill lets an AI ask “what system of order does this rule defend?” before asking “why does the rule exist?” and supplies concrete patterns for turning anthropological insight into product‑design decisions.

## Core principles

- Dirt is not a physical substance but a symbol of something being out of its proper place in a social system.
- All rules of purity and impurity work to draw and maintain boundaries that reflect a community’s hierarchy or symmetry.
- Pollution beliefs serve two functions: they control behaviour (instrumental) and they express the community’s worldview (expressive).
- The same classification logic that orders gods, genders, or castes also orders everyday objects like food, water, or waste.
- Taboos arise when a boundary is perceived as dangerous; the danger is a metaphor for the threat to the social order.
- Ritual purity is a positive, creative activity that orders experience, not a reaction to fear of disease.
- Misreading purity rules as primitive superstition obscures their role as sophisticated symbolic systems that can be leveraged in design.
- To analyse any rule, first identify the boundary it protects, then map that boundary onto the larger social structure.

## Chapter index

- **ch01 — Dirt as Boundary Violation** — Explains why ‘dirt’ is a metaphor for disorder and how the feeling of impurity signals a breach of a social boundary. (load: `chapters/ch01.md`)
- **ch02 — The Dual Function of Pollution Beliefs** — Distinguishes the instrumental (behavior‑controlling) and expressive (world‑view‑communicating) roles of taboo. (load: `chapters/ch02.md`)
- **ch03 — Symbolic Classification of Social Order** — Shows how categories like gender, caste, or sacredness are built from the same logic that orders objects. (load: `chapters/ch03.md`)
- **ch04 — Ritual Purity as Social Cohesion** — Explains how purity rituals create a shared sense of order and identity. (load: `chapters/ch04.md`)
- **ch05 — The Logic of Taboo and Contagion** — Analyzes how taboo functions as a symbolic contagion that protects the social system. (load: `chapters/ch05.md`)
- **ch06 — Comparative Cases: Sex, Food, and Caste** — Provides concrete examples from different cultures to illustrate the boundary model. (load: `chapters/ch06.md`)
- **ch07 — From Hygiene to Symbolic Order** — Shows how practical hygiene and symbolic purity intersect and diverge. (load: `chapters/ch07.md`)
- **ch08 — Misreadings: Evolutionary and Moral Bias** — Critiques the tendency to label purity rules as primitive superstition or moral progress. (load: `chapters/ch08.md`)
- **ch09 — Analytical Toolkit: Asking the Boundary Question** — Provides a step‑by‑step method for turning any rule into a boundary analysis. (load: `chapters/ch09.md`)
- **ch10 — Applying the Model to Design and Research** — Shows how to use the boundary framework in user research, product design, and conflict resolution. (load: `chapters/ch10.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **dirt** | Anything that is out of its proper place in a social system. | ch01 |
| **pollution** | A symbolic marker of boundary breach, not necessarily a physical contaminant. | ch02 |
| **taboo** | A rule that marks a dangerous boundary and invokes moral or supernatural sanctions. | ch05 |
| **purity ritual** | A repeated action that publicly re‑establishes a social boundary. | ch04 |
| **contagion** | Metaphorical spread of disorder when a boundary is crossed. | ch05 |
| **caste** | A hierarchical classification that uses purity rules to keep groups separate. | ch06 |
| **sacred vs. profane** | The primary division that many purity rules protect. | ch03 |
| **symbolic classification** | The process of assigning social meaning to objects or actions based on boundary logic. | ch03 |
| **instrumental function** | The practical effect of a rule, such as disease prevention. | ch02 |
| **expressive function** | The way a rule communicates a worldview or hierarchy. | ch02 |
| **boundary question** | The analytical prompt: what system of order does this rule protect? | ch09 |
| **hazard metaphor** | The imagined danger that gives a taboo its force. | ch05 |
| **social order** | The overall hierarchy or symmetry that a community maintains. | ch03 |
| **evolutionary bias** | The mistaken belief that purity rules are always primitive or always advanced. | ch08 |
| **design ritual** | A product onboarding or repeatable interaction that mirrors purity rituals. | ch10 |

## Patterns

# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Boundary Identification

**When to use:** When a rule or taboo appears in user feedback or policy documents.

**Recipe:**

1. Extract the object or action the rule mentions.
2. Ask: what must stay inside and what must stay outside?
3. Map the inside/outside distinction onto the larger social hierarchy.
4. Label the rule with the identified boundary (e.g., gender, caste, data).

**Chapter:** ch09

---

## Contagion Metaphor Extraction

**When to use:** When a rule invokes danger, disease, or impurity.

**Recipe:**

1. Identify the stated danger (e.g., disease, moral decay).
2. Translate the danger into a symbolic threat to the boundary.
3. Link the threat to the social order it protects.
4. Use the metaphor to design warning messages or onboarding cues.

**Chapter:** ch05

---

## Ritual Reinforcement Loop

**When to use:** When designing onboarding or repeatable user actions.

**Recipe:**

1. Create a small, repeatable step that signals the user’s role (e.g., a quick profile check).
2. Tie the step to a visual cue that marks the boundary (color, icon).
3. Explain the symbolic purpose of the step in plain language.
4. Collect data on compliance to see if the ritual strengthens identity.

**Chapter:** ch10

---

## Instrumental vs. Expressive Split

**When to use:** When evaluating whether to keep, modify, or discard a rule.

**Recipe:**

1. List the practical outcomes the rule achieves.
2. List the symbolic meanings the rule conveys.
3. Score each list on relevance to current goals.
4. Retain the rule if either score is high; otherwise, replace it with a lighter version.

**Chapter:** ch02

---

## Cross‑Cultural Analogy Mapping

**When to use:** When a design problem seems culturally specific.

**Recipe:**

1. Identify the boundary the local rule protects.
2. Find a different culture with a similar boundary (e.g., gender, caste).
3. Extract the symbolic mechanisms they use (e.g., hand washing, color coding).
4. Adapt the mechanism to the target context while preserving the boundary logic.

**Chapter:** ch06

---

## Bias Check for Evolutionary Assumptions

**When to use:** When interpreting purity rules in historical or ethnographic data.

**Recipe:**

1. Ask whether the analysis assumes the rule is ‘primitive’ or ‘advanced’.
2. Replace the assumption with a boundary‑first description.
3. Re‑evaluate the rule’s function under the new description.
4. Document the shift to avoid future bias.

**Chapter:** ch08

---

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## process

- If a rule mentions ‘clean’ or ‘impure’, first ask what boundary it protects.
- Separate the practical effect of a rule from its symbolic meaning before deciding to keep it.
- Translate any hygiene rule into its symbolic counterpart to see if it reinforces a boundary.

## general

- Treat every taboo as a metaphor for a dangerous boundary breach.
- If a rule feels like ‘fear of disease’, check whether it actually protects a social hierarchy.
- Never label a rule ‘primitive’ or ‘advanced’ without first stating its boundary function.

## design

- When designing onboarding, add a tiny repeatable action that signals the user’s role.
- If a rule involves multiple levels of purity, treat each level as a separate boundary tier.

## code

- Map any classification (gender, caste, data tier) onto the same boundary logic used for purity rules.

## writing

- Use the word ‘contagion’ only when a rule invokes a spreading danger, not when it describes literal infection.

## product

- When a user avoids a UI element, ask what implicit taboo they might be respecting.

## life

- When conflict arises, identify the boundary each side protects and negotiate around that.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

