---
name: plan-and-execute
description: >-
  Make the agent generate a multi-step plan, execute it, replan on failure.
  Use when 3+ ordered steps, dependencies between them, or any step can
  fail.
license: MIT
---

# Plan and Execute

> A worker with a plan finishes in a fifth the time of a worker who re-decides each step. But a worker who never re-plans when the world changes is a worker with a brittle plan.

The Plan-and-Execute pattern is the agent equivalent of how a senior engineer works: scope the work, write the steps, do them in order, evaluate, replan on failure. The pattern is older than LLMs (it appears in classical AI planning) and is the most common backbone of serious agent work — LangGraph's `plan-and-execute` tutorial, AutoGen's planning agents, and CrewAI flows all instantiate it.

---

## When to use this

Three diagnostic questions. If any answer is yes, load this skill.

1. **Does the task have three or more ordered steps?** (e.g., research → draft → critique → revise → publish)
2. **Do later steps depend on the output of earlier ones?** (e.g., schema must be designed before migrations)
3. **Can a step fail in a way that forces the remaining plan to change?** (e.g., a scraped source is down, an API returns 403)

If all three answers are no, you do not need plan-and-execute. You need one prompt and one tool call. Refuse the complexity.

---

## The five moves in order

### 1. Scope — write the goal and the constraints

Before any plan, write one paragraph: *what does "done" look like, and what cannot change?*

```text
GOAL: produce a 1-page brief on competitor X's last 12 months of pricing changes
CONSTRAINTS:
- must use only public sources
- must cite every price claim
- must be readable by a non-technical executive
- deadline: today 17:00 ICT
```

A good scope makes planning mechanical. A bad scope forces replanning every step.

### 2. Plan — break into 3–7 ordered steps, name the failure mode of each

The plan must be **specific enough to execute** and **honest enough to fail loudly**. Each step gets:

- **What it produces** (a deliverable, not "work on X")
- **What it depends on** (which earlier step's output)
- **How it can fail** (named, not implied — "source 429s", "API key missing", "rate-limited")
- **What happens if it fails** (replan / skip / abort)

```text
1. Fetch X's pricing pages archive (Wayback Machine) for the last 12 months
   depends: nothing
   can fail: rate-limited, archived page missing
   if fails: skip and use Wayback's CDX API; if still failing, abort with note

2. Extract every price + date pair from the fetched pages
   depends: step 1
   can fail: HTML changed, no price on page
   if fails: log, continue with whatever was extracted

3. Build a timeline of changes (date, old price, new price)
   depends: step 2
   can fail: two prices the same, ambiguous diff
   if fails: pause, ask human, do not guess

4. Cross-check with X's blog and press releases
   depends: step 3
   can fail: no mention, contradictory mention
   if fails: log disagreement, do not override the timeline

5. Write the 1-page brief
   depends: step 3 + step 4
   can fail: scope is unclear in the brief
   if fails: rewrite, do not ship vague copy
```

A 3-step plan is too coarse. A 12-step plan is brittle. Aim for 3–7.

### 3. Execute — do the steps in order, capture evidence per step

Each step's output is captured as **evidence** (a quote, a number, a screenshot, a URL), not "I worked on X." The agent's claim "step 3 done" is worthless without the timeline it produced.

If a step fails in a way the plan predicted, the plan says what to do. If a step fails in a way the plan *did not* predict, stop and replan.

### 4. Evaluate — compare the result to the scope

Before declaring done, compare what was built to what was scoped:

- Does it answer the goal as written?
- Did it stay within the constraints?
- Is the evidence present for every claim?

If yes, ship. If no, the scope was wrong (replan) or the execution was (rewrite). Either way, do not paper over.

### 5. Replan — only on evidence, never on vibes

Replanning is expensive (it resets the agent's context, loses momentum, risks the new plan being worse). Trigger replan only when:

- A step fails in a way the plan did not predict
- The evidence shows the goal cannot be met as scoped
- New information arrived (the user changed the goal, an upstream changed)

Do NOT replan because "this feels slow" or "I think a better way exists." Replan only when there is evidence the current plan cannot finish the goal.

---

## The plan format

The plan lives in a scratchpad file (or in the agent's context window), not in the user's head. The canonical format:

```markdown
# Plan: <goal>

## Scope
<one paragraph>

## Steps
1. <step> → produces: <deliverable>; depends: <step N or nothing>; can fail: <named>; if fails: <action>
2. ...

## Evidence required
- step N: <what counts as proof>
- ...

## Replan triggers
- <what would force a replan>

## Done definition
<one sentence the user can read>
```

The file is the artifact the user can review before the agent burns an hour executing.

---

## Common failure modes

- **The plan that never gets written.** The agent starts "executing" by talking to tools. Without a written plan, there is no place to record scope, no way to detect drift, and no way to replan coherently.
- **The brittle plan.** 12 micro-steps, each "produces a fact." Any one fact wrong → replan everything. Smaller atomic units make replan cheap; brittle plans make it expensive.
- **The plan that conflates steps and goals.** "Write the brief" is a step. "Help me understand the market" is a goal. The plan executes the goal; the brief is one step's deliverable.
- **The hidden replan.** The agent silently changes direction without surfacing the change. Always surface the replan trigger: "step 3 found X, replan because Y, new plan is Z." The user must see the deviation.
- **The eval that lies.** "Step 3 done" without the actual timeline. Evidence is non-negotiable.

---

## Pair with

- [`reflection-loop`](../reflection-loop/SKILL.md) — critique-then-revise; applies after the plan executes
- [`framework-choice`](../framework-choice/SKILL.md) — pick LangGraph or AutoGen for the loop
- [`planning-discipline`](../planning-discipline/SKILL.md) — broader discipline; this skill is the agent-loop instantiation
- [`dr-non-golden-rules`](../dr-non-golden-rules/SKILL.md) — smallest thing that ships; refuse plan-and-execute unless you need it
- [`result-honesty`](../result-honesty/SKILL.md) — the evidence and the four buckets
- [`adversarial-review`](../adversarial-review/SKILL.md) — when the user wants a second pass on the result
