---
name: cognition-first
description: Design for the human who shows up. Use before any UX, copy, or default decision.
license: MIT
---

# Cognition First

> Sources: Daniel Kahneman, *Thinking, Fast and Slow* (2011) · Daniel Pink, *Drive* (2009).

Every user is a human, not an economic abstraction: not perfectly rational, not infinitely patient, and always affected by how a choice is framed. These two books cover how people *decide* and what makes them *keep going*.

---

## 1. Most interaction is System 1

Kahneman's two systems: **System 1** is fast, automatic, effortless, always on. **System 2** is slow, deliberate, effortful, and lazy — it defers to System 1 unless forced.

Interfaces are read by System 1. Consequences:

- **A routine check that requires deliberate reading has already failed.** Status must be *felt*, not parsed. A hairline turning amber beats a sentence saying "threshold exceeded."
- **Reserve System 2 friction deliberately, for rare and irreversible actions.** A confirmation dialog on a daily action is a tax; on a delete-everything action it is the safety feature. Most products get this exactly backwards.
- **A sign read twice has failed.** If comprehension needs a second pass, the design is wrong, not the reader.

## 2. The biases that actually hit software

Not the full list — the ones that change code:

- **Anchoring.** The first number shown sets the frame for every number after it. Choose the hero metric knowing it anchors everything below.
- **Availability.** People judge frequency by ease of recall. A dashboard that surfaces dramatic events makes them feel more common than they are. Show base rates next to incidents.
- **Loss aversion.** Losses hurt roughly twice as much as equivalent gains please. Legitimate for framing real risk; manipulative for manufacturing urgency. Use it for the former only.
- **WYSIATI** — *what you see is all there is.* People build a coherent story from available evidence and do not feel the absence of what is missing. This is the strongest argument for stating what a dashboard **cannot** tell you, explicitly, on the surface.
- **The planning fallacy.** Estimates ignore base rates from similar past work. Applies to your own build estimates as much as the user's.

## 3. Defaults are never neutral

Whatever requires no action is what most people get. That makes every default a decision made on the user's behalf.

- A **nudge** makes the better choice easier without hiding the cost of the alternative.
- A **sludge** does the opposite, for the platform's benefit.
- Never ship a sludge. Not once, not "just for the trial flow."

## 4. Pink — what actually motivates

For anything beyond mechanical work, if-then rewards reliably *reduce* performance. Three drivers replace them:

- **Autonomy** — control over task, time, technique, team.
- **Mastery** — visible progress toward getting better at something that matters.
- **Purpose** — the work connects to something beyond the metric.

Applied to software:

- **Gamification usually backfires.** Points, badges and streaks are if-then rewards. They boost a novel behaviour briefly and crowd out the intrinsic motive that would have sustained it. If a civic reporting tool needs streaks to get reports, the reporting flow is the problem.
- **Show mastery, not scores.** "You have mapped 40% of your district" beats "1,250 points."
- **Autonomy is a design property.** Let users choose the order, skip the wizard, see the raw number behind the summary. Every forced linear flow spends motivation.
- **Purpose belongs in the interface, honestly.** Not a mission statement — the actual consequence of the work, visible.

## 5. Applied to working with agents

Pink's three apply to the human directing an AI, which is why long agent sessions go sour:

- **Autonomy** dies when the agent asks the human to arbitrate implementation mechanics they cannot evaluate. Decide it and say what you decided.
- **Mastery** dies when the human cannot see what changed. Show diffs, not prose.
- **Purpose** dies in busywork. Preambles, recaps and restated questions are motivation taxes.

---

## The check

```
□ Can the state be felt by System 1, or must it be read?
□ Is System 2 friction reserved for rare, irreversible actions only?
□ Does every default serve the user rather than the platform?
□ Does the surface state what it CANNOT tell you? (WYSIATI)
□ Is any motivation mechanic an if-then reward crowding out an intrinsic one?
□ Does the hero number anchor the right thing?
```

Pairs with `honest-envelope` (WYSIATI made enforceable), `legible-systems`, `no-design-tells`.
