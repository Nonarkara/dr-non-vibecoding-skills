---
name: reflection-loop
description: >-
  Make the agent critique and revise its own output before declaring done.
  Use when output quality matters and a rubric the agent can apply exists.
license: MIT
---

# Reflection Loop

> A draft that is not critiqued is a draft that the user has to critique. Pay the critique cost once, in the loop, or pay it forever, in user time.

The Reflection pattern is the cheapest quality lever in agent work. It costs one extra LLM call; it buys a measurable drop in sloppy output. The agent produces a first draft, critiques it against a rubric, and revises. The loop runs until the rubric is satisfied or until a budget is hit.

The pattern shows up as "Reflection Agent" and "Reflexion Agent" in LangGraph's tutorials. It is the same shape as how a senior editor works: write, critique, revise, repeat.

---

## When to use this

Three diagnostic questions. If any answer is yes, load this skill.

1. **Is the cost of a bad first draft high enough to justify a second pass?** (e.g., user-facing copy, PR descriptions, design tokens, schema design)
2. **Is there a rubric the agent can apply to itself?** (a checklist, a style guide, a definition of done)
3. **Is the work repeatable enough that the loop's overhead is amortized?** (not a one-off task you will never do again)

If all three answers are no, skip the loop. A one-shot is faster and good enough.

---

## The four moves in order

### 1. Produce — write the first draft, do not critique yet

The first draft is intentionally unedited. Its only job is to exist. Resist the temptation to revise while writing; you will be tempted to keep polishing, and the rubric step will never run.

The first draft must include the **artifact** (the actual deliverable) and **a critique note** at the bottom: *what the writer is unsure about, what felt forced, what was a guess.*

### 2. Critique — apply the rubric, score each criterion

The rubric is the loop's discipline. It is not optional. Common rubric sources:

- A project contract (`CLAUDE.md` or `AGENTS.md`)
- A style guide (`templates/design-tokens.css.template`, `skills/no-ai-tells/SKILL.md`)
- A definition of done (`skills/result-honesty/SKILL.md` four buckets)
- The user's stated goal, restated as acceptance criteria

Score each rubric item: ✅ pass / ⚠️ marginal / ❌ fail. Be honest. A self-rating of "looks fine to me" is the loop's failure mode.

### 3. Revise — fix the failures, leave the passes alone

Two rules:

- **Fix only what the rubric flagged.** Do not gold-plate. A pass is a pass; touching it adds risk.
- **One revision per pass.** If the revision introduces new failures, the next loop iteration will catch them. Trying to fix everything in one pass makes the next critique noisy.

The revision step produces a new artifact + a new critique note. Both are evidence.

### 4. Loop — repeat until rubric passes OR budget is hit

Two stop conditions:

- **All rubric items pass.** Stop, ship.
- **Budget exhausted.** If the loop has run N times without passing, stop and surface to the human. The rubric is too strict for the model, or the goal was under-specified. Do not loop forever.

The default budget: **2 reflections** (3 total drafts). Past that, the marginal quality gain is small and the marginal cost is high.

---

## What the rubric looks like in practice

Three example rubrics, by surface:

**For PR descriptions** (`skills/pr-slop-patterns/SKILL.md` + project contract):
- Title names what changed, not the type (`fix:` is type; `fix race in webhook handler` is what changed)
- Description answers: what, why, how to verify, what's out of scope
- No single-line "feat: stuff" or empty commit messages
- Body has at least one paragraph of intent, not just a diff link

**For prose copy** (`skills/no-ai-tells/SKILL.md`):
- Reads as if a human said it out loud (no "delve into", "in today's fast-paced", "navigate the landscape")
- Names the specific thing, not the category
- Sentences are short; jargon is earned
- The claim is verifiable, not aspirational

**For data outputs** (`skills/honest-envelope/SKILL.md`):
- Number has source, fallback tier, age
- If real data was unavailable, the display says so explicitly (no fake "no data" with a fake value)
- Aggregation is named (mean, median, last-N) — no silent average of stale data

The rubric is what makes the loop work. Without a rubric, the agent is revising against itself, which is a tautology.

---

## Pairing with other patterns

- **Plan-and-execute → reflection-loop.** Run plan-and-execute; after the plan executes, run reflection-loop on the deliverable.
- **Adversarial-review → reflection-loop.** A second agent (or a second-pass prompt) that runs the rubric *independently* of the producing agent. Stronger than self-reflection; cheaper than a human review.
- **Framework choice.** LangGraph's Reflection Agent is the canonical implementation. AutoGen's nested chats can host it.

---

## Common failure modes

- **The sycophantic loop.** The agent "passes" its own rubric on the first draft because the rubric is what the agent thought it should do. Real rubrics come from outside (project contract, style guide, user).
- **The infinite loop.** No budget. The agent rephrases the same draft 10 times. Set the budget up front (default: 2 reflections) and stop.
- **The wrong revision.** The critique says "the prose is generic" but the revision changes the *facts*. Stick to the rubric item. If the rubric is wrong, change the rubric; do not silently rewrite the task.
- **The hidden revision.** The agent revises without saving the first draft. The loop's value is in the *trace* — the first draft, the critique, the second draft. If you cannot see all three, you cannot tell whether the loop actually helped.
- **The expensive rubric.** The rubric itself takes longer to apply than the work. A rubric is cheap if it can be applied in one prompt. If it cannot, the work was too big for a single loop — split the work, not the loop.

---

## Pair with

- [`plan-and-execute`](../plan-and-execute/SKILL.md) — when the work has ordered steps; reflect on the deliverable after
- [`adversarial-review`](../adversarial-review/SKILL.md) — a stronger second pass; use it when self-reflection is not enough
- [`no-ai-tells`](../no-ai-tells/SKILL.md) — rubric for prose copy
- [`pr-slop-patterns`](../pr-slop-patterns/SKILL.md) — rubric for PR descriptions
- [`result-honesty`](../result-honesty/SKILL.md) — rubric for "is this done" claims
- [`framework-choice`](../framework-choice/SKILL.md) — pick the framework that hosts the loop (LangGraph Reflection, AutoGen nested chat)
