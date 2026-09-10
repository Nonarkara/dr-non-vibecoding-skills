---
name: qualitative-reasoning
description: Use when data is fuzzy, the metric is misleading, or the answer cannot be derived from numbers. The 6 moves: uncanny, falliblist, I-should, tradition audit, counter-example.
license: MIT
---

# Qualitative Reasoning

> When the data is fuzzy, the metric is misleading, or the answer cannot be derived from the numbers, the engineering answer is: *reason about the question itself.* The discipline below is the path of reasoning in qualitative territory — where the formal methods of [`argument-construction`](../argument-construction/SKILL.md) (the fallacies) and [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) (the explicit assumptions) are necessary but not sufficient. The qualitative layer is the *judgment* that the data cannot carry.

This skill is the *decision logic* for problems that cannot be reduced to a metric. The trigger is the moment an agent or operator faces a question where:

- The data is partial or contradictory.
- The metric does not measure the load-bearing thing.
- The decision affects people, not numbers.
- The answer must be defended on grounds other than the data.

The skill is *not* a substitute for the data. The skill is the *judgment* that the data is the *starting point*, not the *ending point*. The moves below are the *named* moves the corpus uses to reason in this territory.

**Provenance:** distilled from ten years of daily writing at [nonharvard.wordpress.com](https://nonharvard.wordpress.com) — Day 5 *Tradition: What's Good For?*, Day 8 *On the Nature of Question*, Day 11 *Emotion is the Slave of Reason*, Day 12 *Emotion Versus Reason (Continued)*, Day 14 *We're Weirder Than We Think*, Day 23 *A 'Bad Faith' Bicycle Technician I met*, Day 31 *Why Modesty is Bad for the Society*, Day 42 *On Bad Arguments*, Day 44 *On Bad Faith*, Day 51 *It's a Non-Issue*, Day 58 *On the Experience of Writing about Morality*. The generalizable moves are kept; the personal-philosophy cheatsheet cards (the Stoic exercises, the Kantian metaphysics as a personal development practice) are stripped.

---

## The 6 moves in order

When the data cannot carry the decision, the agent's first move is *not* to gather more data. The first move is to **reason about the question**.

### 1. The uncanny check — "don't mistake the uncanny feeling of familiarity for a genuine connection"

From the corpus: past impressions and physical appearances distort current judgments. The *uncanny* is the feeling that something is *known* before it is *known* — the moment of "I've seen this before" when the moment is *new*. The uncanny is a *bias*, not a *signal*.

The move: when the agent feels the uncanny — the "this is familiar" feeling — the move is to *test the claim*. Is the similarity real, or is the agent confusing past impressions for current evidence?

**The agent check:** for any "I recognize this pattern" claim, can the agent name the *actual* evidence the pattern is based on? If the answer is "I've seen this before," the agent is on the uncanny. The fix is to *re-derive* the claim from the current evidence, not the past.

### 2. The falliblist stance — "I don't always think of myself as being right even when I have evidence that I may be right"

From the corpus: the discipline of holding a position as a *position*, not as a *self*. The falliblist stance is the recognition that *evidence I have now* is not the same as *evidence I will have later*. The position held today may be overturned by tomorrow's evidence.

The move: when the agent has formed a position, the move is to *name the evidence* and to *name what would change the agent's mind*. If the answer is "nothing," the position is dogma. If the answer is "new evidence X," the position is held provisionally.

**The agent check:** the agent can name what would change its mind? If the answer is "nothing," the position is dogma. The fix is to *commit to the change-of-mind criteria* in advance.

### 3. The "I should" vs "I have to" test

From the corpus (Day 42): "Whenever you happen to say 'you have to' do something and you don't know exactly why, and after you carefully entertain your reason and find out that there's nothing there except the peer pressure, then you're under the malignant of a bandwagon fallacy. So, as opposed to saying 'I have to,' say 'I should.'"

The move: replace "I have to" with "I should" in any decision framing. If the reason survives the replacement, the reason is load-bearing. If the reason collapses, the decision was driven by external pressure, not internal values.

**The agent check:** for any "I have to" framing, can the agent name the reason that survives the "I should" replacement? If no, the framing is a *bandwagon artifact*, not a *decision*.

### 4. The tradition audit — "treat tradition as a hypothesis, not a rule"

From the corpus (Day 5): tradition is a *hypothesis* about what works. The hypothesis was tested by people who are not the agent, in conditions that are not the agent's, with consequences that are not the agent's. The discipline is to *audit the tradition*: which current need does this satisfy? Is the tradition still serving the need?

The move: when the agent encounters a tradition (a practice, a convention, a "this is how it's done"), the move is to *audit the tradition*:

1. List the practice.
2. Ask: which current need does this satisfy? Be specific.
3. If the answer is weak, prototype an alternative that addresses the need directly.
4. Test the alternative with real users before adopting it.

**The agent check:** for any "this is how it's done" claim, can the agent name the current need? If the answer is "we've always done it," the tradition is operating as a *rule*, not a *hypothesis*. The fix is to *test the hypothesis*.

### 5. The synthetic a priori — "reasoning before experience"

From the corpus (Day 5, Kantian frame): some reasoning is *synthetic a priori* — it produces new knowledge without depending on experience. The discipline is to *name the move* when the agent is reasoning from first principles rather than from data. The move is legitimate, but the agent should *know* it is making the move.

The move: when the agent has a conclusion that cannot be derived from the data, the move is to *name the move* explicitly. "I am reasoning from the principle that X, not from the data on Y." The named move can be evaluated; the unnamed move cannot.

**The agent check:** for any conclusion the agent holds, can the agent name *the source* of the conclusion? If the answer is "from first principles" or "from a prior commitment," the agent is making the synthetic a priori move. The fix is to *label the move* and to *expose it to critique*.

### 6. The counter-example — "we're weirder than we think"

From the corpus (Day 14): the assumption that a behavior, norm, or value is *universal* is a claim that should be tested. The test is the *counter-example*: "is there a society, a culture, a person, a historical period in which this norm does not hold?" If the answer is yes, the universal is a *default*, not a *law*.

The move: when the agent encounters a "this is how people are" claim, the move is to *search for the counter-example*:

1. State the claim ("people want X" / "users prefer Y" / "teams work this way").
2. Search for the counter-example (a society, a culture, a person, a historical period where the claim does not hold).
3. If the counter-example is found, the claim is a *default*, not a *universal*. The agent should design for the *default* but plan for the *exception*.
4. If the counter-example is not found, the agent is still uncertain — the absence of a counter-example is not the same as the presence of a universal.

**The agent check:** for any "this is universal" claim, the agent can name at least one counter-example? If no, the agent has not tested the claim. The fix is to *search* before committing.

---

## The corollary disciplines (the cases that trip the moves)

### 1. Emotion as the slave of reason — Day 11

> "Emotion is the Slave of Reason" — the discipline of letting emotion *inform* the decision without letting emotion *make* the decision. The move: name the emotion, name the reason, decide on the reason.

The agent's check: when the agent is emotional (frustrated, excited, anxious), the move is to *name the emotion* and *defer the decision* until the emotion has been acknowledged. The decision is the reason's; the emotion's role is to *signal that the question matters*.

### 2. Bad faith detection — Day 23, Day 44

> Sartre's *bad faith* — the move of *lying to oneself* about the *real* reason for an action. The agent's check: for any "I'm doing X because Y" claim, can the agent name the *real* reason? If the real reason is uncomfortable, the claim is in bad faith.

The move: when the agent's stated reason is "clean" (e.g., "I'm doing this for the team"), the move is to *test the claim against the uncomfortable reasons* (e.g., "I'm doing this for the team *and* to be seen as the one who solved it"). The named reason is the agent's; the unnamed reason is the agent's too.

### 3. The non-issue — Day 51

> "It's a Non-Issue" — the move of recognizing that some questions are not the *real* question. The agent's check: for any question being asked, is this the question the agent should be answering? Sometimes the question is engineering (when the agent treats it as moral); sometimes the question is moral (when the agent treats it as engineering).

The move: when the agent is stuck, the move is to *name the question being asked* and to *name the question that should be asked*. The two are often different; the difference is the leverage point.

### 4. The curse of egotism — Day 58

> "The curse of egotism" — the desire to be irreplaceable, to be heard, to be seen. The agent's check: when the agent is *attached* to a position, the move is to *test the attachment*. Is the position held because it is true, or because holding it makes the agent feel irreplaceable?

The move: when the agent's position is "the one I have always held," the move is to *name the position as a position* and to *test the position against the evidence*. The egotist defends the position; the falliblist updates the position.

---

## What this skill is *not*

- It is not a substitute for data. The skill is the *judgment* layer; the data is the *evidence* layer. The two are stacked: data first, judgment second, data again.
- It is not the rejection of metrics. Some questions are answerable by metrics; the skill is for the questions that are not.
- It is not a philosophy. The skill is the *agent-facing form*; the underlying philosophy (Kant, Sartre, Foucault, the corpus's own synthesis) is the *reference*, not the *application*.
- It is not a license to be vague. The qualitative moves are *specific* (the uncanny check, the falliblist stance, the I-should test, the tradition audit, the synthetic a priori move, the counter-example). The skill is the discipline of *being specific in qualitative territory*.

## Pairs with

- [`argument-construction`](../argument-construction/SKILL.md) — the formal fallacies and the 8 rules. Qualitative reasoning is the *fuzzy* layer; argument-construction is the *formal* layer. The two stack: argument-construction first (the formal moves), qualitative reasoning second (the judgment moves).
- [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) §1a *Reflexivity* — the observer is in the observation. The reflexivity discipline is the *applied* form of the falliblist stance.
- [`moral-reasoning`](../moral-reasoning/SKILL.md) — when the question is moral (no right answer, plural stakeholders, irreversible cost), the 4-move path applies. Qualitative reasoning is the *judgment layer below*; moral-reasoning is the *moral layer above*.
- [`ninja-innovation`](../ninja-innovation/SKILL.md) — reframe before refactor. The reframe is often a qualitative move: the problem is not the part; the problem is the framing.
- [`wrong-green`](../wrong-green/SKILL.md) — test the failure the user cares about, not the success a CI check confirms. The wrong-green pattern is a *qualitative* failure: the metric is right, the outcome is wrong.
- [`design-anthropology`](../design-anthropology/SKILL.md) — the counter-example move lives in *both* skills. Qualitative reasoning is the *judgment*; design-anthropology is the *source* of the counter-example (the corpus's own life as the laboratory).
- [`cognition-first`](../cognition-first/SKILL.md) — design for the human who shows up. The human who shows up is the *subject* of qualitative reasoning; the agent's qualitative moves are the moves that respect the human.

## Check

A "qualitative" decision is *ready* to ship when:

- The uncanny check is run: the "this is familiar" feeling is tested against current evidence.
- The falliblist stance is held: the agent can name what would change its mind.
- The "I should" vs "I have to" test is run on the framing.
- The tradition audit is run: the "this is how it's done" claims are tested against the current need.
- The synthetic a priori move is named when it is being made (and exposed to critique).
- The counter-example is searched for any "this is universal" claim.
- The emotion is named and the decision is deferred until the emotion has been acknowledged.
- The bad-faith check is run on the agent's own stated reasons.
- The question being asked is named, and the question that should be asked is named. (The two are often different.)
- The egotism check is run: the position is held because it is true, not because holding it makes the agent feel irreplaceable.
