---
name: design-by-writing-100-day-reflection-engine
description: Use when a design effort has stalled, the user story is a fiction, or iterations have stopped teaching. Distilled from 100 days of writing-as-thinking practice.
license: MIT
---

# Design by Writing — the 100-Day Reflection Engine

> Writing, reflection, and physical movement are not separate from design work. They *are* design work — the cheapest, highest-leverage moves in the loop. Use this skill when the design effort has stalled, when the user story is a fiction the team is telling itself, or when the iterations have stopped teaching.

The discipline: every design effort has a feedback loop. The cheapest, highest-leverage loop is *write → reflect → move → re-write*. This skill codifies the moves that make the loop run.

**Provenance:** extracted from ten years of daily writing at [nonharvard.wordpress.com](https://nonharvard.wordpress.com) (Product #001 of the Non-Skills pipeline at nonscrape.nonarkara.org). The generalizable moves are kept; the personal-philosophy cheatsheet cards (PhD decisions, focus sanctuaries, existential loneliness) are stripped. What remains is the *discipline that travels*.

---

## The five core moves

These are the load-bearing rules. They survive being lifted out of the writing practice and dropped into any design effort.

### 1. Start with the single most vivid user story you can recall — without notes

Before the spec, before the research deck, before the user-persona template: recall one specific moment with a real user. Not a composite, not a segment, not a persona. A moment. The face, the room, the sentence they said, the thing they tried to do that didn't work.

This is the anchor. Every subsequent decision checks back to it. The team that has the moment in their head makes different decisions than the team that has the persona doc.

**Why it works:** the moment has sensory and emotional fidelity the persona doc does not. A persona doc is a hypothesis; a moment is a fact. The designer who has the moment treats the rest of the work as *servicing the moment*. The designer who has only the persona treats the rest of the work as *servicing the doc*.

**Anti-pattern:** starting from the solution. *"We need a dashboard with three widgets"* is the moment *after* the moment. Skip it. Go back to the user.

### 2. Write the problem, not the solution

Before any prototype, write the problem in your own words, in one paragraph. The paragraph is the low-fidelity prototype.

**Why it works:** writing the problem forces the writer to name the *thing the design must do*, not the *thing the design will be*. Two teams writing "we need a way to track flood risk" is consistent. Two teams writing "we need a way to make the city manager feel safe in front of the press at 6 AM" diverge immediately — and the second pair will find a better design.

**The check:** if the paragraph could appear on the website's marketing page, it is the solution, not the problem. Rewrite until it is the *job to be done*, not the *thing being bought*.

### 3. Listen to what the user does, not what they say

The single highest-yield research rule, and the one most often skipped. The user says "I want a faster dashboard." The user does the workaround: opens three browser tabs, screenshots each, pastes into an email. The dashboard is fast. The workaround is the design opportunity.

**The discipline:** the interview has two passes.

1. The first pass is open-ended prompts. *"Walk me through the last time you…"* — and shut up. Note only observations, not judgments.
2. The second pass is the inferred-needs pass. Take the observations, write the implied need, then *validate the need with at least two additional users*. Not the observation — the *inferred need*. (Inferred needs fail differently than observations; validating them is the work.)

**Anti-pattern:** asking the user what they need. The user has a model of the solution space, and that model is shaped by what already exists. Asking the user what they need gives you the user as a designer. The user is the *material* of design, not the designer of it.

### 4. End every work session with a five-minute reflection

Set a timer. Review what you wrote or designed today. Answer three questions, in order:

1. What worked?
2. What surprised me?
3. What assumptions did I make?

Write the answers in a journal. The journal is not for the team; the journal is for the writer. The team gets the design; the writer gets the *learning*.

**Why it works:** the assumption question is the load-bearing one. Every wrong decision in design is downstream of an unstated assumption. The reflection surfaces the assumption while the work is still close enough to fix.

**Cost:** 5 minutes × 5 days × 50 weeks = ~20 hours a year. The return is a feedback loop that compounds. The cost is a small amount of writing discipline.

### 5. If you notice you are "closing-in," deliberately widen your focus for one minute

"Closing-in" is the cognitive state where the designer's attention has narrowed to a single aspect — a single metric, a single user, a single constraint — and the rest of the field has gone dark. The state is invisible to the designer in it.

**The countermeasure:** at the end of any focused session, list three things you *ignored*. Spend one minute exploring each. Most of the time, the items are unimportant. Sometimes one of them is the *actual* problem the design effort has been missing.

**The discipline:** the ignored-items list is not optional. It is the only way out of closing-in that does not require the designer to *notice they are in closing-in* (which is, definitionally, the thing they cannot do).

---

## The seven patterns (recipes)

Each pattern is a context + a recipe + the chapter that explains the full argument. They are the same moves, applied to specific moments in the design effort.

### Pattern 1 — Vivid user story as the kickoff

**When:** at the start of any design effort, before the spec.

1. Recall the most striking moment you observed with a real user. (No composite, no persona.)
2. Write it down in one paragraph without consulting notes.
3. Extract the core need, pain point, and emotion from that story.
4. Use the extracted elements as the anchor for all subsequent work.

**Anti-pattern:** designing from the persona doc instead of from the moment.

### Pattern 2 — Tradition audit before adopting any standard

**When:** a standard practice feels forced, outdated, or unchallengeable.

1. List the practice you are about to use.
2. Ask: which current user need does this satisfy? Be specific. ("We've always done it" is not an answer.)
3. If the answer is weak, prototype an alternative that addresses the need directly.
4. Test the alternative with real users before adopting it.

**Why it works:** most inherited design standards are the residue of a constraint that no longer exists. The audit forces the constraint to be re-justified. Sometimes it survives; often it doesn't.

### Pattern 3 — Non-possessive empathy interview

**When:** user research interviews.

1. Open with prompts that avoid any mention of a solution. (*"Walk me through the last time you…"*)
2. Listen without interrupting; note only observations, not judgments.
3. After the interview, separate the observations from the inferred needs.
4. Validate each inferred need with at least two additional users.

**Anti-pattern:** treating the user as a possession to be optimized, or as a source of design specifications.

### Pattern 4 — Tunnel-vision countermeasure (closing-in)

**When:** deep work makes you feel stuck or blind to risks.

1. After each focused session, list three things you *ignored*.
2. Spend one minute exploring each listed item.
3. Add any discovered risks or opportunities to the project board.
4. Schedule a quick check-in to address the new items.

**Why it works:** the items are usually unimportant. The discipline is the *list*. The list is the only way out of closing-in that does not require the designer to notice they are in it.

### Pattern 5 — Incremental A/B hypothesis (smallest possible change)

**When:** considering a design change.

1. Identify the smallest possible tweak that could affect a key metric.
2. Formulate a clear hypothesis: *"If we change X, metric Y will improve."*
3. Run an A/B test with a limited audience.
4. Analyze results; if positive, iterate; if negative, revert and learn.

**Anti-pattern:** the big-bang redesign. The redesign that *should* work but doesn't, and now three months of work need to be unwound.

### Pattern 6 — Daily design discipline loop (the 100-day engine)

**When:** for a long-term design practice (any project that lasts longer than a quarter).

1. Write a 10-minute user insight in the morning.
2. Take a 5-minute movement break mid-day (walking, biking, anything that decompresses).
3. Reflect for 5 minutes on what you learned.
4. Define one small experiment to run tomorrow.

**Why it works:** the loop compounds. The 10-minute morning write-up is the cheapest possible user-research log. The 5-minute reflection is the cheapest possible assumption-surfacer. The small experiment is the cheapest possible learning unit. After 100 days, the designer has 100 user insights, 100 assumption-surfacings, and 100 experiments.

### Pattern 7 — Stream-of-consciousness ideation (when stuck)

**When:** the design effort needs a burst of raw ideas.

1. Set a timer for 7 minutes.
2. Write continuously about the problem without editing, without stopping, without rereading.
3. After time is up, highlight the recurring themes or pain points.
4. Turn the highlighted items into actionable design hypotheses.

**Why it works:** the editing brain is the same brain that solves problems. If the editing brain is on, the ideation brain is suppressed. The 7-minute timer is the contract that the editing brain waits for.

---

## What this skill is *not*

- It is not a substitute for actual user research. The "vivid user story" is *one* moment, not the research program. The pattern is the *seed*; the research is the *follow-through*.
- It is not a substitute for shipping. The reflection loop is the *learning*; the shipping is the *evidence*. A team that only reflects and never ships is a team that has confused journaling with work.
- It is not therapy. The "your description of the world is always a description of yourself" rule is a reflexivity discipline for design claims, not a self-help framework.
- It is not a daily-writing prescription. The 10-minute morning insight is the *minimum viable loop*; a team that wants more rigor will do more. The skill is the floor, not the ceiling.

## Pairs with

- [`cognition-first`](../cognition-first/SKILL.md) — design for the human who shows up. This skill is the *practice*; `cognition-first` is the *principle*.
- [`ninja-innovation`](../ninja-innovation/SKILL.md) — reframe before refactor, subtract before add. The 5-minute reflection is the *smallest* reframe.
- [`dr-non-golden-rules`](../dr-non-golden-rules/SKILL.md) — smallest path that ships and earns its keep. The 5-minute reflection is the smallest path to learning.
- [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) §1a "Reflexivity" — the observer is in the observation. Same discipline from the other direction.
- [`power-of-hindsight`](../power-of-hindsight/SKILL.md) — data-driven retrospective. This skill is the *individual* loop; `power-of-hindsight` is the *team* loop.
- [`no-design-tells`](../no-design-tells/SKILL.md) — a surface must not be identifiable as agent-built. The "vivid user story" rule is the opposite: a surface must be identifiable as *user-built* — the moment the user is in the design.

## Check

A "design by writing" effort is *ready* to ship when:

- The opening artifact was a paragraph about the problem, not a wireframe of the solution.
- The opening user reference was a *moment* with a real user, not a persona.
- The interview notes contain only observations; the inferred-needs are validated by at least two additional users.
- The work session ended with a 5-minute reflection; the reflection surfaced at least one unstated assumption.
- The "three things I ignored" list is the closing artifact of every focused session.
- The smallest possible change is being A/B tested, not the largest possible redesign.
- The 100-day loop (10-minute morning write, 5-minute mid-day move, 5-minute evening reflection, 1 small experiment) is on the calendar, not aspirational.
