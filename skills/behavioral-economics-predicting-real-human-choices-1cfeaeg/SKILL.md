---
name: behavioral-economics-predicting-real-human-choices-1cfeaeg
description: Use when me: behavioral-economics-predicting-real-human-choices-1cfeaeg
license: MIT
---


# Behavioral Economics: Predicting Real Human Choices

> This skill distills the core insights from Misbehaving, showing how human decisions deviate from the rational-actor model in predictable ways. It equips an AI to anticipate actual behavior, design systems that work with real people, and identify exploitable market anomalies. The focus is on practical tools: heuristics, prospect theory, mental accounting, self-control, fairness, and choice architecture.

Source: /Users/axiom/.minimax/v2/assets/2026/09/11/11-52-47-235-asset_20260911-115247-235_d4395513b12d_65ebbde5-Richard H. Thaler - Misbehaving_ The Making of Behavioral Economics (2015, W. W. Norton and Company) - libgen.li.pdf  
Purpose: You are extracting a BEHAVIORAL ECONOMICS skill for an AI agent. The source is Richard Thaler's Misbehaving — the memoir of how behavioral economics displaced the rational-actor model, written by one of the people who built it.

Distil for the AI use case, not the human reader. The AI loads this when it has to:
1. Predict what humans will actually do (not what the rational-actor model says they should do). The whole point of behavioral economics is that the standard model is wrong, in specific, predictable, exploitable ways.
2. Distinguish Econs (the rational fictional agent in the textbook) from Humans (the actual mess). When designing systems, optimize for Humans.
3. Apply the three lists: "no one is as rational as the Econ, but no one is as dumb as the behavioral agent either" — the truth is usually in the middle. The AI should not over-correct.
4. Use mental accounting, loss aversion, endowment effect, status quo bias, and self-control problems as defaults when designing for real people.
5. Recognize when a market is "anomalous" in a stable, repeatable way and not a one-off. Anomalies are signal; they are also opportunity for the alert designer.
6. Apply libertarian paternalism: design the choice architecture so the default is the better choice, without removing the option. The AI should design defaults, not commands.

Output: 8-10 self-contained chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules. The deliverable is a skill the AI loads when it has to predict human behaviour, design a system humans will actually use, or critique a rational-actor assumption.

Voice: Dr Non's standard of comprehension. Plain English. No "leverage", "utilize", "robust", "holistic", "synergy", "paradigm", "delve", "tapestry", "testament", "landscape", "journey", "in today's fast-paced world", "it is important to note that", "at the end of the day".  

Chapters: 10  
Glossary terms: 21  
Patterns: 10  
Cheatsheet rules: 20  

## When to load this skill

This skill distills the core insights from Misbehaving, showing how human decisions deviate from the rational-actor model in predictable ways. It equips an AI to anticipate actual behavior, design systems that work with real people, and identify exploitable market anomalies. The focus is on practical tools: heuristics, prospect theory, mental accounting, self-control, fairness, and choice architecture.

## Core principles

- Humans rely on simple rules of thumb (heuristics) that lead to systematic, predictable errors.
- Prospect theory shows people evaluate outcomes as gains or losses relative to a reference point, with losses hurting about twice as much as equivalent gains.
- Mental accounting causes people to treat money differently depending on how it is labeled or received, affecting spending and saving.
- Self-control problems arise because a present-focused 'doer' often overrides a future-focused 'planner', leading to procrastination or overindulgence.
- Fairness considerations can override economic incentives; people reject offers they perceive as unfair even at a cost to themselves.
- Market anomalies that persist across time and contexts signal real behavioral patterns, not random noise.
- Experimental evidence, including hypothetical surveys, reveals biases when it predicts real-world behavior despite economist skepticism.
- Libertarian paternalism improves outcomes by setting beneficial defaults while preserving freedom to choose.
- Bounded rationality means humans are neither fully rational nor utterly irrational; the truth lies in between.
- Designing for Humans requires defaulting to the better choice, simplifying decisions, and aligning incentives with actual psychology.

## Chapter index

- **ch01 — Heuristics and Biases** — Humans use mental shortcuts to judge frequency, probability, and value. These shortcuts work well in familiar contexts but fail predictably when the environment changes, producing biases such as availability and anchoring. (load: `chapters/ch01.md`)
- **ch02 — Prospect Theory and the Value Function** — Prospect theory replaces the idea of utility from wealth with utility from changes in wealth. The value function is S-shaped: concave for gains, convex for losses, and steeper for losses than gains, capturing loss aversion and diminishing sensitivity. (load: `chapters/ch02.md`)
- **ch03 — Mental Accounting** — People treat money as non-fungible, placing it into mental accounts such as 'salary', 'bonus', or 'gift money'. Spending decisions depend on which account the money comes from and whether the purchase feels like a bargain or a rip-off relative to a reference price. (load: `chapters/ch03.md`)
- **ch04 — Self-Control and the Planner-Doer Model** — Individuals contain a forward-looking planner that wants to save and a present-focused doer that seeks immediate gratification. Conflict between them explains procrastination, undersaving, and overconsumption. (load: `chapters/ch04.md`)
- **ch05 — Fairness and Psychological Pricing** — People reject transactions they perceive as unfair, even when accepting them would leave them materially better off. Fairness concerns shape pricing, wage negotiations, and responses to price changes. (load: `chapters/ch05.md`)
- **ch06 — Anomalies as Signals and Opportunities** — Persistent deviations from rational predictions in markets or experiments are anomalies. When stable, they reveal real behavioral patterns and can be exploited for profit or social good. (load: `chapters/ch06.md`)
- **ch07 — Experimental Methods in Behavioral Economics** — Behavioral economics relies on experiments, including hypothetical surveys and incentivized lab tests, to uncover biases. While economists often distrust survey data, well-designed experiments predict real-world behavior. (load: `chapters/ch07.md`)
- **ch08 — Libertarian Paternalism and Choice Architecture** — Libertarian paternalism seeks to influence choices toward welfare-improving outcomes while preserving freedom to opt out. This is done by shaping the choice architecture—defaults, framing, and ease of options. (load: `chapters/ch08.md`)
- **ch09 — Bounded Rationality and the Econs-Humans Distinction** — Econs are the perfectly rational, self-interested agents of traditional economics. Humans are actual people with limits on computation, willpower, and emotional stability. Good models must reflect this middle ground. (load: `chapters/ch09.md`)
- **ch10 — Applying Behavioral Economics: A Checklist for AI** — When designing systems or predicting behavior, use this checklist to ensure real human psychology is accounted for. It integrates the major domains into actionable steps. (load: `chapters/ch10.md`)

## Quick reference

For vocabulary: see `glossary.md` (terms, chapter-anchored).
For reusable moves: see `patterns.md` (steps, chapter-anchored).
For decision rules: see `cheatsheet.md` (imperative sentences by category).
