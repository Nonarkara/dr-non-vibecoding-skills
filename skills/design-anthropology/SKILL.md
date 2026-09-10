---
name: design-anthropology
description: Use when a design assumes a universal human constant or the same solution keeps failing across users. The 6 moves: counter-example, cultural variation, bad-faith, biopower check.
license: MIT
---

# Design Anthropology

> "We're weirder than we think." The right move when a design assumes a universal human constant is to *find the counter-example*. The corpus is full of moments where the assumed universal was broken by a culture, a tradition, a person, or the author's own life. The discipline below is the path of using those counter-examples to *test the design* before the design is shipped.

This skill is the *decision logic* for designs that assume *humans are a constant* when humans are a *variable*. The trigger is the moment an agent or designer sees:

- A design that works for some users and fails for others.
- A "user research" finding that is contradicted by the agent's own observation.
- A "best practice" that does not transfer to a new context.
- A "universal" claim about humans (what they want, how they behave, what they value) that the agent suspects is not universal.

The skill is *not* an academic anthropology course. The skill is the *agent-facing form* of the discipline: 6 moves the agent makes when the assumed universal is in doubt.

**Provenance:** distilled from ten years of daily writing at [nonharvard.wordpress.com](https://nonharvard.wordpress.com) — Day 3 *Writing Stream of Consciousness*, Day 6 *Why I (Give Up) Love, Part 1*, Day 9 *Three Years In Shanghai*, Day 14 *We're Weirder Than We Think*, Day 22 *On Being a Rousseaurian Stoic Existentialist*, Day 23 *A 'Bad Faith' Bicycle Technician I met*, Day 26 *On Death*, Day 38 *My Butterfly Dream*, Day 39 *On Time*, Day 40 *On Sex: Part 1*, Day 44 *On Bad Faith*, Day 49 *On Sex: Part 2*, Day 51 *It's a Non-Issue*, Day 59 *What Brought Me to China*, Day 119 *A Return to This Blog and Simulation Theory*, Day 121 *Free Rides to Harvard, MIT, Oxford*. The generalizable moves are kept; the personal-autobiography cheatsheet cards (the breakup, the specific PhD, the specific travel) are stripped.

---

## The 6 moves in order

When the design assumes a universal, the agent's first move is *not* to defend the assumption. The first move is to **find the counter-example**.

### 1. The counter-example move — "we're weirder than we think"

From the corpus: every claim about a human universal ("users want X" / "people prefer Y" / "humans value Z") is a hypothesis. The hypothesis is testable by the *counter-example*: is there a society, a culture, a person, a historical period in which the claim does not hold?

The move:

1. State the assumed universal ("users want fast responses" / "people read left to right" / "humans value privacy").
2. Search for the counter-example. A counter-example can come from:
   - **Anthropology**: another culture, another tradition, another historical period.
   - **The personal-as-laboratory**: the agent's own life, the agent's own family, the agent's own observation.
   - **A fiction or thought experiment**: a hypothetical society that breaks the rule.
3. If the counter-example is found, the assumed universal is a *default*, not a *law*. Design for the default; plan for the exception.
4. If the counter-example is not found, the absence is *not* the presence of a universal — the search has not yet found the exception. Keep searching.

**The agent check:** for any "users are like X" claim, the agent can name at least one counter-example? If no, the agent has not tested the claim.

### 2. Cultural variation as a feature, not a bug

From the corpus: cultural variation is *the signal that the universal is not universal*. The author lived in Thailand, studied in the US, conducted research in China. The same question (love, duty, freedom, success) was answered differently in each place — and the difference was the *data*, not the *noise*.

The move: when the agent encounters a "this is how people are" claim, the move is to *test the claim against a different culture*. The test is not "are they right or wrong" — the test is "what does this person believe that I do not?"

**The agent check:** for any "users will" prediction, the agent can name *how a different culture* would answer? If no, the prediction is a single-culture artifact.

### 3. The personal-as-laboratory — using your own life as the field

From the corpus: the author treats their own life as the anthropological field. The moments of the author's own experience (a friendship, a romance, a job, a city, a bicycle ride) are the *data points* that test the universal.

The move: when the agent has a claim about humans, the move is to *search the agent's own life for the counter-example*. The agent's own family, the agent's own community, the agent's own observation in a public place — these are the *first* sources of counter-examples, before the agent reaches for an academic paper.

**The agent check:** the agent can name a moment in their own experience that contradicts the assumed universal? If no, the agent is reasoning from priors, not from observation. The fix is to *observe*.

### 4. Bad-faith detection — Sartre's test for the design

From the corpus (Day 23, Day 44): Sartre's *bad faith* is the move of *lying to oneself* about the *real* reason for an action. A design in bad faith is a design whose *stated* purpose is not its *real* purpose.

The move: when the agent encounters a design (a product, a feature, a copy, an onboarding flow), the move is to *test the design against the bad-faith test*:

1. State the design's stated purpose ("this onboarding flow is for the user's benefit" / "this notification is for engagement").
2. State the *real* purpose (the design might be for *retention metrics* disguised as user benefit, or for *engagement* disguised as information).
3. If the real purpose is in bad faith — i.e., if the real purpose would not be stated to the user if asked — the design is in bad faith. The fix is to *align the stated purpose with the real purpose* or to *change the design*.

**The agent check:** for any "this is for the user" claim, the agent can name the real reason? If the real reason is uncomfortable, the design is in bad faith. The fix is to *align the purposes* or to *change the design*.

### 5. The biopower check — is the norm state-driven or product-driven?

From the corpus: many norms (marriage, modesty, profession, "the way things are done") are *state-driven* — they are tools of *biopower* (Foucault's frame) that make populations governable. The norm is not a *universal human preference*; the norm is a *political fact*.

The move: when the agent encounters a "people naturally do X" claim, the move is to *test the claim against the biopower check*:

1. State the norm ("people get married in their late 20s" / "people value stability over change").
2. Ask: *who benefits from this norm being a norm?* If the answer is "the state" / "the institution" / "the market," the norm is *politically maintained*, not *naturally preferred*.
3. If the norm is politically maintained, the design that *assumes* the norm is *supporting the political fact*, not *serving the user*. The fix is to *name the political fact* and to *design for the user*, not the norm.

**The agent check:** for any "people naturally" claim, the agent can name *who benefits from this being the norm*? If the answer is "no one" or "everyone," the claim is suspect. If the answer is "the state" / "the institution" / "the market," the norm is politically maintained.

### 6. Writing degree zero — the immediate experience, not the received frame

From the corpus (Day 3): *writing degree zero* is the discipline of writing from the *immediate experience*, not from the *received frame*. The received frame is the set of categories the culture provides (the labels, the diagnoses, the roles). The immediate experience is what the agent *actually* saw, heard, felt.

The move: when the agent is about to label an observation ("this user is X" / "this behavior is Y" / "this market is Z"), the move is to *return to the immediate experience* before the label. What did the agent actually observe? What was the immediate experience, before the received frame?

**The agent check:** for any "this is X" label, the agent can describe the immediate experience *before* the label? If no, the agent is applying the received frame, not observing. The fix is to *return to the immediate* — what was actually seen, heard, felt.

---

## The corollary disciplines (the cases that trip the moves)

### 1. The tradition-audit case — Day 5 *Tradition: What's Good For?*

> "Treat tradition as a hypothesis, not a rule."

The discipline: when the design encounters a tradition (a "this is how the user does it" / "this is the industry standard"), the move is to *audit the tradition*. Which current need does the tradition serve? If the answer is weak, the tradition is operating as a *rule*, not a *hypothesis*. The fix is to *test the hypothesis* with a counter-example.

### 2. The biopower case — Day 6 *Why I (Give Up) Love, Part 1*

The author's claim that "marriage is a state-driven institution" is a *biopower* claim. The design application: when the design assumes a "natural" relationship between two adults, the move is to *test the assumption against the biopower check*. The "natural" relationship may be a politically maintained one.

### 3. The Rousseau / Stoic synthesis — Day 22 *On Being a Rousseaurian Stoic Existentialist*

The author synthesizes Rousseau (the noble savage) with Stoicism (the disciplined actor). The synthesis: humans are *noble in their immediate experience* but *disciplined in their action*. The design application: the design should *respect the immediate experience* (Rousseau) and *support the disciplined action* (Stoicism). A design that does only one is incomplete.

### 4. The simulation hypothesis — Day 119 *A Return to This Blog and Simulation Theory*

The author's engagement with the simulation hypothesis (Bostrom) is the *anthropological* move taken to its limit: even the *universe* might be a constructed environment, in which case the "universal human" is the universal of the *simulator*, not of the *simulated*. The design application: when the design assumes a universal, the move is to *test the assumption against the deepest counter-example you can imagine* — including the counter-example that the universal itself is constructed.

### 5. The 12 rules of life — Peterson's framework as a diagnostic

Peterson's *12 Rules for Life* is a *catalog of failure modes*. Each rule is a *diagnosis* of a system failure (the chaotic man, the resentful man, the self-deceived man) and a *corrective action*. The design application: when the design assumes a user, the move is to *check the user against the 12 failure modes* — is the user chaotic, resentful, self-deceived? If the design is built for the *resolved* user but the user is in *crisis*, the design will fail.

---

## What this skill is *not*

- It is not an academic anthropology course. The skill is the *agent-facing form*; the underlying anthropology (Foucault, Sartre, Rousseau, Kant, Bostrom) is the *reference*, not the *application*.
- It is not a refusal of universals. Some universals *are* universal (the need for food, water, sleep, dignity). The skill is the *test* of the assumed universal, not the *rejection* of every universal.
- It is not a license to be contrarian. The counter-example is a *test*, not a *tribal marker*. The move is to *find the counter-example*, evaluate the design, and ship the design that survives.
- It is not the same as [`cognition-first`](../cognition-first/SKILL.md) or [`qualitative-reasoning`](../qualitative-reasoning/SKILL.md). Those skills cover the *judgment* layer (the human who shows up) and the *fuzzy-territory reasoning* layer. This skill is the *source* layer — the moves that *find* the counter-example, the cultural variation, the personal-as-laboratory. The three stack: `design-anthropology` provides the source, `qualitative-reasoning` provides the judgment, `cognition-first` provides the design lens.

## Pairs with

- [`cognition-first`](../cognition-first/SKILL.md) — design for the human who shows up. The human who shows up is a *specific* human, not a universal. The counter-example move is what tests the "specific" claim.
- [`qualitative-reasoning`](../qualitative-reasoning/SKILL.md) — the 6 moves for reasoning in qualitative territory. Move 6 (the counter-example) lives in *both* skills. This skill is the *source*; `qualitative-reasoning` is the *judgment*.
- [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) §1a *Reflexivity* — the observer is in the observation. The reflexivity discipline is the *micro* form of the bad-faith check.
- [`moral-reasoning`](../moral-reasoning/SKILL.md) — when the question is moral (no right answer, plural stakeholders, irreversible cost), the 4-move path applies. The biopower check is the *political* form of the moral question.
- [`ninja-innovation`](../ninja-innovation/SKILL.md) — reframe before refactor. The counter-example is the *reframe* of the design.
- [`design-by-writing-100-day-reflection-engine`](../design-by-writing-100-day-reflection-engine/SKILL.md) — the 5-minute reflection at the end of every session is the *personal-as-laboratory* in miniature.
- [`adrian-martinez-curated-web-design-skills-2026`](../adrian-martinez-curated-web-design-skills-2026/SKILL.md) — the 5-axis "Why it works" description discipline. The 5 axes (perception, mechanism, intent, contrast, time) are the *description*; this skill is the *source* of the contrast.

## Check

A "design-anthropology" check is *ready* to ship when:

- The assumed universal is named ("users want X" / "people prefer Y" / "humans value Z").
- At least one counter-example is searched for (anthropology, personal-as-laboratory, fiction).
- The cultural variation is tested: how would a different culture answer the same question?
- The personal-as-laboratory is searched: what moment in the agent's own experience contradicts the assumed universal?
- The bad-faith test is run on the design's stated purpose.
- The biopower check is run on the assumed norms: who benefits from this being a norm?
- The immediate experience is recovered before the received frame is applied.
- The tradition audit is run on "this is how it's done" claims.
- The 12 failure modes (Peterson) are checked against the assumed user.
- The design is shipped only after the counter-example has been *evaluated*, not merely *found* — some counter-examples are noise; some are signal.
