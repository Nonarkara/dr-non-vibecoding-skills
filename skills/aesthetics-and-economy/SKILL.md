---
name: aesthetics-and-economy
description: Use when a choice is aesthetic *and* economic at once. The economy of words, the aphorism craft, the minimalist manifesto, the Kodawari of constraint.
license: MIT
---

# Aesthetics and Economy

> The discipline of "less is more" applied to design, code, writing, and life. The economy of words; the aphorism craft; the minimalist manifesto; the Kodawari of working at the edge of perfection within constraint. The right move is the one that survives both the aesthetic test and the economic test, and the cheapest path through both is the same path.

This skill is the *decision logic* when a choice has an *aesthetic* dimension and an *economic* dimension, and the two are in tension. The trigger is the moment an agent or designer must decide: looks vs cost, beauty vs durability, polish vs speed, decoration vs restraint, one more feature vs the discipline of fewer. The same path through the decision works in design, in code, in writing, and in life.

**Provenance:** distilled from ten years of daily writing on aesthetics and economy at [nonharvard.wordpress.com](https://nonharvard.wordpress.com) — Day 37 *Of the Standard of Beauty*, Day 46 *16 Things I Never Have*, Day 47 *On My Relationship with Objects*, Day 48 *Things I Can't Live Without*, Day 57 *On the Economy of Words*, Day 62 *Paradise; or, Reflecting on the Urban*, Day 64 *My Honest Résumé*, Day 68 *A Minimalist (or -ism) Manifesto*, Day 110 *2 Years of Traveling the World with Just 1 Backpack*, Day 111 *How 'Light and Cheap' Travel Helped me Escape Death*, Day 113 *A Minimalist's Using Typewriters in 2020*, Day 116 *'Kodawari' or an Attempt to Reach Perfection*. The generalizable moves are kept; the personal-life details (the specific objects, the actual travels) are stripped.

---

## The path — the four moves in order

When the choice is aesthetic and economic, the agent's first move is *not* to pick. The first move is to **name**.

### 1. Name the constraint

Every aesthetic-economic choice has constraints. The constraints are not always visible. Naming them is the first move because the constraints are the *bounds* of the decision.

Common constraints: time, money, attention, durability, reversibility, dependencies, the operator's own time-to-learn, the team's tolerance for friction.

**The agent check:** for each option, can the agent name *what is being spent* and *what is being saved*? If the answer is "I don't know," the agent is not yet ready to evaluate.

### 2. Name the durability

The aesthetic-economic choice has a *durability* — how long the choice will pay for itself. The discipline of less is not "use less"; it is "use what pays for itself longest." A choice that looks good for a week and then becomes a tax is not a good choice. A choice that looks good for a year and then is reusable is a good choice.

Durability categories:
- **Decorative**: looks good once, costs attention forever (the kind of polish that the team has to maintain and the user has to look past).
- **Functional**: looks good and serves the operator, durable across uses.
- **Generative**: looks good and produces more value with use (a piece of infrastructure that becomes a foundation).
- **Disposable**: looks good for a moment, costs nothing to discard.

**The agent check:** for each option, which durability category does it fall into? Decorative looks tempting; generative is the load-bearing target.

### 3. Name the trade-off

The aesthetic-economic choice, by definition, has no option that dominates. Naming the trade-off is the third move. The trade-off is *what the agent is willing to pay for what the agent is willing to lose*.

**The agent check:** the trade-off is named when:
- The option is stated in a single sentence.
- The cost is stated in the same single sentence.
- The relationship is explicit: "I am choosing X at the cost of Y."

### 4. Name what survives the test of time

The discipline of "less is more" is the discipline of *durability under the test of time*. A thing that survives 10 years is a thing whose aesthetics are not tied to a moment, and whose economics are not tied to a fad.

**The agent check:** for each option, *what would still be true about this choice in 10 years?* If the answer is "the same as today," the choice is durable. If the answer is "depends on the trend," the choice is decorative.

---

## The 6 corollary disciplines

The corpus is full of cases that trip the path. These are the named trips and the discipline for each.

### 1. The economy of words — speak less, write less, mean more

From Day 57:

> "I have been bombarded with words that don't convey any meanings. ... I want to speak less, write less, and mean more."

The aphorism craft is the discipline of the *cheatsheet rule*. The corpus's aphorisms are the kind of sentence the writer pastes above the monitor. The discipline is the same in design and code:

- *The cheatsheet* is more concentrated than the doc. The doc explains; the cheatsheet reminds.
- *The card* is more durable than the doc. The card is what the operator pastes; the doc is what the operator reads once.
- *The pattern* is more durable than the implementation. The pattern is the *shape*; the implementation is one of many.

The agent's check: for any output (a doc, a spec, a comment, a design rationale), can it be reduced to a card without losing the load-bearing content? If yes, the card is the right output. If no, the doc is necessary and the card is impossible — but the agent should know which case it is.

### 2. The aphorism craft — precise, concise, poetic

The aphorism is the smallest unit of durable writing. From Day 57:

> "For an aphorism to have a true effect on the reader's mind it has to be precise, concise, and, most importantly, poetic."

The three properties:
- *Precise* — the aphorism cannot be paraphrased without losing meaning.
- *Concise* — the aphorism is the smallest viable form.
- *Poetic* — the aphorism has a structure that survives reading aloud (parallel structure, rhyme where appropriate, rhythm).

**The agent check:** for any output meant to be remembered (a tagline, a tagline for a project, a one-line rule, a cheatsheet card), the three properties are all required. A precise-but-not-poetic aphorism is a memo. A poetic-but-not-precise aphorism is a slogan. A concise-but-not-precise aphorism is a cliché.

### 3. The minimalist manifesto — "less is more" is not the destination, it is the *method*

From Day 68: the minimalist manifesto is not "own nothing." It is "own what pays for itself." The discipline is the same as the *durability* category above: a thing is in the inventory if it is *functional* or *generative*. A thing is *decorative* is a tax. A thing is *disposable* is, by definition, not yet in the inventory.

The agent's application: in code, the same rule. A library is in the dependency tree if it is *functional* or *generative* — if it pays for itself. A library is a tax if it is *decorative* — if it looks good on the README but is unused. A library is *disposable* if it is replaced often.

**The agent check:** every dependency, every feature, every line of code, every doc, every line of copy — is it functional, generative, decorative, or disposable? Decorative is a candidate for removal. Disposable is a candidate for not-writing in the first place.

### 4. The Kodawari — perfection within constraint

From Day 116: *kodawari* (拘り) is the Japanese craftsperson's discipline of *pursuing perfection within constraint*. It is not "perfect" in the abstract; it is "as perfect as possible *given the constraint*." The craftsperson who has no constraint is not kodawari; they are idle. The craftsperson who has a tight constraint and pursues the limit of the constraint is kodawari.

The agent's application:
- A design with no budget constraint is not kodawari; it is decoration. A design with a tight budget and every line of the design earning its place is kodawari.
- Code with no performance constraint is not kodawari; it is decoration. Code with a tight performance budget and every microsecond earning its place is kodawari.
- Writing with no word-count constraint is not kodawari. Writing with a hard word limit and every word earning its place is kodawari.

**The agent check:** for any output, is the constraint *real*? If the constraint is not real (the agent has unlimited time, unlimited money, unlimited words), the agent is not in kodawari. The first move is to *add a constraint* (a deadline, a word count, a budget, a memory limit). The constraint is what makes the discipline possible.

### 5. The 16-things-I-never-have — naming the inventory

From Day 46: the discipline of *naming what is not in the inventory*. The list of 16 things the author does not have is a list of the categories of *tax* the author has refused. The list is not about deprivation; it is about *clarity*. Knowing what is not in the inventory is what makes the inventory durable.

The agent's application: for any project, what is *not* in the scope? The list of things the project does not do is as important as the list of things it does. The list is the *negative space* of the design — and the negative space is what the user perceives as *restraint*.

**The agent check:** can the agent name, in a single sentence, the *thing this project does not do*? If no, the project has no negative space and the design is loud.

### 6. The "light and cheap" discipline — portability as durability

From Day 111: the discipline of *light and cheap* — the fewer things the operator carries, the more places the operator can be. A 40-liter backpack is more durable than a 100-liter backpack *for the use case of travel*, because the 40-liter bag fits in more places, can be carried further, and forces the operator to keep only what pays for itself.

The agent's application: a tool is more durable than a stack. A function is more durable than a class. A config file is more durable than a UI. The lighter the artifact, the more places it can be used.

**The agent check:** for any artifact (a tool, a function, a config, a doc, a design), can the artifact be carried into the next project? If no, the artifact is too heavy. The first move is to *subtract* until the artifact is portable.

---

## What this skill is *not*

- It is not a minimalism aesthetic. The skill is the *path* of the discipline; the aesthetic is one possible output. A maximalist design that survives the test of time is also kodawari. The discipline is the constraint, not the result.
- It is not a cost-cutting discipline. The cheapest option is not always the most durable. The skill is *durability* — what pays for itself longest. A cheap option that costs more in maintenance is not the right answer.
- It is not a refusal of decoration. Decoration has its place (a celebration, a ceremony, a one-time performance). The skill is the *discipline of choosing when decoration is the right answer*, not the *refusal of decoration as such*.
- It is not the same as the engineering principles in [`ponytail`](../ponytail/SKILL.md) and [`caveman`](../caveman/SKILL.md). This skill is the *aesthetic-economic* discipline; `ponytail` is the *code YAGNI ladder*; `caveman` is the *output-compression* discipline. They share the *less-is-more* root but apply to different surfaces.

## Pairs with

- [`axiom-design-core`](../axiom-design-core/SKILL.md) — the design law. This skill is the *application* of the design law to the aesthetic-economic trade-off; `axiom-design-core` is the *principle*.
- [`caveman`](../caveman/SKILL.md) — output compression. The 65% token reduction is the *writing* version of the *economy of words*; the two skills share the *less-is-more* root.
- [`ponytail`](../ponytail/SKILL.md) — the YAGNI ladder. "Does it need to exist" is the *engineering* version of the *durability* category; "is it in the codebase" is the *inventory check*.
- [`make-it-stick`](../make-it-stick/SKILL.md) — text that survives being retold. The aphorism craft is the *applied* form; `make-it-stick` is the *general* form.
- [`no-design-tells`](../no-design-tells/SKILL.md) — the design that survives is the design that is not identifiable as agent-built. The discipline of "less is more" is the *aesthetic* of the survivor.
- [`adrian-martinez-curated-web-design-skills-2026`](../adrian-martinez-curated-web-design-skills-2026/SKILL.md) — the design-description discipline. The 5 axes (perception, mechanism, intent, contrast, time) are the *aesthetic* of the description; this skill is the *path* of the choice the description describes.
- [`cognition-first`](../cognition-first/SKILL.md) — design for the human who shows up. The human who shows up is the *stakeholder*; the negative space of the design is what the human perceives as *restraint*.

## Check

An aesthetic-economic choice is *ready* to ship when:

- The constraints are named (time, money, attention, durability, reversibility).
- The durability category is named (decorative, functional, generative, disposable).
- The trade-off is named in a single sentence.
- The 10-year test is run: what would still be true about this choice in 10 years?
- The dependency is named: every line of code, every doc, every feature — is it functional, generative, decorative, or disposable?
- The negative space is named: the project has a single sentence that says *what it does not do*.
- The artifact is portable: the function, the doc, the design, can be carried into the next project.
- The Kodawari check is run: is the constraint real? If not, the first move is to add one.
