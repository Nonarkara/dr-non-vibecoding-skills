---
name: systems-thinking
description: Use when a problem is a feedback loop or a short-term fix has a long-term cost. The 6 moves: feedback loop, time horizon, anti-fragility, flow, canon, failure modes.
license: MIT
---

# Systems Thinking

> A system is a set of parts that interact. The right move is the one that improves the system, not the one that improves the part. The discipline below is the path of seeing the system, naming the loop, and acting at the leverage point.

This skill is the *decision logic* for problems that are not solved by optimizing one part. The trigger is the moment an agent or operator sees a problem that *keeps coming back*, a fix that *creates a new problem*, or a metric that *moves the wrong way*. The same path through the system works in code, in product, in team, in the operator's own practice.

**Provenance:** distilled from ten years of daily writing at [nonharvard.wordpress.com](https://nonharvard.wordpress.com) — Day 36 *Worst Mistakes People Make in Their 20s*, Day 73 *Six Basic Human Needs*, Day 75 *12 Rules for Life*, Day 87 *The Anti-Fragile Manifesto*, Day 90 *The One Simple Trick to Re-Designing Your Life*, Day 91 *In Praise of Checklists*, Day 95 *In Praise of Incrementalism*, Day 100 *The 44 Books that Change My Life*, Day 122 *Finding Flow*. The generalizable moves are kept; the personal-philosophy cheatsheet cards (Stoic exercises, the 6 needs framework as a personal-development lens) are stripped where the engineering application is thin.

---

## The 6 moves in order

When the problem is a system, the agent's first move is *not* to fix the part. The first move is to **see the system**.

### 1. Name the feedback loop

Every system has feedback loops. A feedback loop is a chain: A → B → C → back to A. The chain can be *reinforcing* (positive feedback: the loop amplifies; growth, viral, addiction) or *balancing* (negative feedback: the loop dampens; thermostat, budget, error correction).

The first move is to name the loop because the loop is the *shape* of the system. Optimizing one part of a loop without seeing the loop is the most common systems-thinking failure.

**The agent check:** for any "fix" being proposed, can the agent draw the loop the fix acts on? If the loop is not visible, the fix is acting on a *part*, not the *system*. The fix may help the part and harm the loop.

### 2. Name the time horizon

A system has multiple time horizons. A short-term fix can have a long-term cost; a long-term investment can have short-term pain. The discipline of systems thinking is to *name the horizon* of every action.

Common time horizons:
- **Immediate** (seconds, minutes): the user click, the request response, the cache hit.
- **Short** (hours, days): the deployment, the bug fix, the A/B test.
- **Medium** (weeks, months): the feature, the migration, the team.
- **Long** (quarters, years): the platform, the practice, the operator's own development.
- **Generational** (decades): the institution, the field, the operator's life.

**The agent check:** for any action, on which horizon does it act? The "incrementalism" discipline (the 5,000-hour rule) is the recognition that the *long* horizon dominates the outcome — the operator who optimizes only the *short* horizon loses the slow loop.

### 3. Name the anti-fragility

From Nassim Taleb's *Antifragile*: a system is *fragile* (harmed by disorder), *robust* (unaffected by disorder), or *antifragile* (gains from disorder). The discipline is to ask: *does this system gain from the stress, or does it crack?*

- **Fragile**: a system that breaks under load (a brittle codebase, a brittle team, a brittle commitment).
- **Robust**: a system that survives under load without change (a well-tested codebase, a stable team, a flexible commitment).
- **Antifragile**: a system that *improves* under load (a codebase with good test coverage that finds bugs faster when stressed, a team that learns from incidents, a commitment that grows with the marriage).

**The agent check:** for the system being designed, named, or operated, which of the three is it? If the answer is "robust" but the system will face *frequent* disorder, the answer should be "antifragile" — and the move is to add feedback loops that turn disorder into learning.

### 4. Name the flow

From Csikszentmihalyi's *Flow*: a system is in *flow* when the challenge matches the skill, the goal is clear, the feedback is immediate, and the operator loses the sense of self in the activity. The discipline is to ask: *is the operator in flow, or is the operator fighting the system?*

A system that supports flow:
- Has clear goals (the operator knows what "done" looks like).
- Has immediate feedback (the operator sees the result of the action).
- Matches the operator's skill (the challenge is high but achievable).
- Removes the sense of self-consciousness (the activity is its own reward).

A system that fights flow:
- Has unclear goals ("what is this project for?").
- Has delayed feedback (the operator cannot tell if the action worked).
- Mismatches the operator's skill (too easy = boredom, too hard = anxiety).
- Forces self-monitoring (the operator is being watched, evaluated, judged).

**The agent check:** for the system being designed or operated, which of the four flow conditions does it support? The move is to *name the missing one* and design for it.

### 5. Name the canon (the books that change the system)

From Day 100 *The 44 Books that Change My Life*: every long-arc system has a *canon* — a set of books, papers, talks, or works that *changed the system*. The canon is not a list; it is a *shape*. The shape is the system's intellectual lineage.

The discipline: for the system being designed or operated, what is the *canon*? Not "what should I read" — what are the *3 to 5 works* that, if the operator knew them well, would change how the operator sees this system?

**The agent check:** the agent can name the canon for the system? If the agent cannot, the agent is operating without a frame of reference. The first move is to *build the canon* — read the 3 to 5 works that the field considers load-bearing.

### 6. Name the failure modes (the worst mistakes)

From Day 36 *Worst Mistakes People Make in Their 20s*: every system has *failure modes* — the ways the system breaks when the operator or the user is young, naive, or under pressure. The discipline is to *name the failure modes* before they happen, and to design the system to *resist* them.

Common failure modes:
- **Optimizing the wrong metric**: a system that hits the metric but loses the purpose.
- **Premature scaling**: a system that scales before the unit-economics are right.
- **Hiring the wrong people**: a system that scales the team before the practice is right.
- **Skipping the feedback loop**: a system that ships without measurement.
- **Confusing the system for the goal**: a system that serves the practice, not the outcome.

**The agent check:** for the system being designed or operated, what are the *3 to 5 failure modes*? If the agent cannot name them, the system has not been pressure-tested. The move is to *name the failure modes* and design the system to resist them.

---

## The corollary disciplines (the cases that trip the moves)

### 1. Incrementalism — the 5,000-hour loop

From Day 95: a long-arc skill is built in 5,000 hours over 6 years. The 5,000 hours is the *slow loop* that dominates the outcome. The fast loop (the daily commit, the weekly review) is the *feedback* that keeps the slow loop on track.

**The agent check:** for any long-arc system (a skill, a project, a practice), the slow loop is the load-bearing loop. The fast loop is the test. If the agent is optimizing only the fast loop, the system is being run without the slow loop.

### 2. The checklist — the system's immune system

From Day 91: a checklist is the *immune system* of a system. The checklist does not *do* the work; the checklist ensures the *known failure modes* are not introduced. The discipline is to write the checklist for the *known* failure modes, not the *impossible* ones.

**The agent check:** for the system being designed, the checklist is for the failures the operator has *already seen*. The failures the operator has not seen are not on the checklist; the checklist is not a substitute for judgment.

### 3. The 12 rules — the system's failure-mode catalog

From Day 75 (Peterson's *12 Rules for Life*): each rule is a *failure mode* with a *corrective action*. The rule is not the action; the rule is the *diagnosis*. The discipline is to name the failure mode the system is in, then apply the rule.

**The agent check:** the agent can name which of the 12 failure modes the system is currently in? If the agent cannot, the agent is treating the rules as *to-do* items rather than *diagnoses*.

### 4. The 6 needs — the system that motivates people

From Day 73 (Maslow-style): a system is operated by people; people are motivated by needs. The 6 needs are the *axes* of the human-side system. The discipline is to ask: *which need is this system serving, and which is it compromising?*

**The agent check:** for the system being designed, the operator or the user is acting on a need. The agent can name which need? If the agent cannot, the system is being designed *for an abstract user*, not for a person.

### 5. The 44 books — the canon as a diagnostic

From Day 100: the 44 books the author returned to is the *canon* of the author's system. The canon is not a curriculum; the canon is a *map of the territory the system has covered*. The discipline is to *read the canon twice* (Dobelli's discipline: the second reading captures 10× the first).

**The agent check:** for the system being designed, what is the load-bearing canon? The agent can name 3 to 5 works? The agent has read them twice? If the agent has read them once, the system is being designed from a partial map.

---

## What this skill is *not*

- It is not a substitute for the specific discipline. Systems thinking names the *shape* of the problem; the specific discipline (engineering, product, design, team) is the *content*. The skill is the *frame*, not the *fill*.
- It is not a way to avoid action. Naming the loop is the first move; the next move is to act on the loop. A system that is being named but not changed is a system in paralysis.
- It is not a 6-step universal process. The 6 moves are *moves*, not *steps*. The order is the order of *seeing* (loop, horizon, anti-fragility, flow, canon, failure modes) — but the agent can return to any move at any time.
- It is not the systems-thinking of Forrester or Meadows. The discipline is the *agent-facing* form: the moves the agent makes when facing a system. The academic form is the *reference*; the moves are the *application*.

## Pairs with

- [`power-of-hindsight`](../power-of-hindsight/SKILL.md) — the data-driven retrospective. The retrospective is the *practice*; systems thinking is the *frame* the retrospective uses.
- [`ninja-innovation`](../ninja-innovation/SKILL.md) — reframe before refactor. The reframe is often a *systems* reframe: the problem is not the part; the problem is the loop.
- [`design-by-writing-100-day-reflection-engine`](../design-by-writing-100-day-reflection-engine/SKILL.md) — the 5-minute reflection at the end of every session is the *fast loop* the slow loop needs.
- [`risk-posture`](../risk-posture/SKILL.md) — calibrate solo shipping speed against blast radius. The blast radius is a *system* property, not a *part* property.
- [`production-spine`](../production-spine/SKILL.md) — software touching users, money, or data. The system is the production; the parts are the services.
- [`aesthetics-and-economy`](../aesthetics-and-economy/SKILL.md) — the durability category is a *systems* property. A generative design is one that improves the system over time.

## Check

A "systems" decision is *ready* to ship when:

- The feedback loop the decision acts on is named (and the loop is visible to the agent).
- The time horizon the decision acts on is named (and the agent is acting on the right horizon for the system).
- The anti-fragility, robustness, or fragility of the system is named (and the decision moves the system toward anti-fragility if disorder is expected).
- The flow conditions the system supports are named (and the missing one is being designed for).
- The canon for the system is named (3 to 5 works, read twice).
- The 3 to 5 failure modes the system faces are named (and the decision resists at least one of them).
- The slow loop (the long-arc skill, the 5,000-hour practice) is not being sacrificed for the fast loop.
- The system is being improved, not the part. (If the part is being improved and the system is not, the move is wrong.)
