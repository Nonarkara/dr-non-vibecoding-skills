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

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **heuristic** | A simple rule of thumb used to make judgments or decisions quickly. | ch01 |
| **bias** | A systematic error in judgment that repeats across people and situations. | ch01 |
| **availability heuristic** | Judging frequency or probability by how easily examples come to mind. | ch01 |
| **anchoring** | The tendency for estimates to be influenced by an initial value, even if arbitrary. | ch01 |
| **prospect theory** | A descriptive model of decision under risk that uses changes in wealth and an S-shaped value function. | ch02 |
| **value function** | The S-shaped curve in prospect theory showing diminishing sensitivity to gains and losses and loss aversion. | ch02 |
| **loss aversion** | The tendency for losses to feel about twice as bad as equivalent gains feel good. | ch02 |
| **endowment effect** | People demand more to give up an object than they would pay to acquire it. | ch02 |
| **reference dependence** | The idea that outcomes are evaluated as gains or losses relative to a reference point. | ch02 |
| **mental accounting** | The set of cognitive operations used to organize, evaluate, and track financial activities. | ch03 |
| **acquisition utility** | The intrinsic value of a good minus its opportunity cost, equivalent to consumer surplus. | ch03 |
| **transaction utility** | The pleasure or pain derived from the quality of a deal, based on the difference between price paid and reference price. | ch03 |
| **planner-doer model** | A metaphor for the conflict between long-term planning and short-term impulses. | ch04 |
| **self-control problem** | A situation where present desires undermine long-term goals. | ch04 |
| **fairness** | A preference for equitable outcomes that can override pure economic incentives. | ch05 |
| **anomaly** | A persistent, repeatable deviation from rational-model predictions that signals real behavior. | ch06 |
| **libertarian paternalism** | Designing choices so the default or easiest option is beneficial while preserving freedom to choose. | ch08 |
| **choice architecture** | The way options are presented to people, including defaults, order, and framing. | ch08 |
| **bounded rationality** | The idea that people make the best decisions they can given limited cognitive resources. | ch09 |
| **Econs** | The perfectly rational, self-interested agents of traditional economic models. | ch09 |
| **Humans** | Actual people with limits on computation, willpower, and emotional stability. | ch09 |

## Patterns

# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Use Defaults to Steer Behavior

**When to use:** When a decision is complex, infrequent, or involves inertia, and one option is clearly better for most people.

**Recipe:**

1. Identify the beneficial option.
2. Make that option the default or automatic choice.
3. Ensure opting out is simple but requires an explicit action.
4. Monitor uptake and adjust if needed.

**Chapter:** ch08

---

## Frame Outcomes as Gains or Losses

**When to use:** When presenting a choice that involves risk, delay, or trade-offs, and the reference point can be shaped.

**Recipe:**

1. Determine the user's current reference point (status quo or expectation).
2. Describe the alternative in terms of change from that point.
3. Emphasize gains if seeking risk aversion, losses if seeking risk seeking.
4. Test which frame yields the desired choice.

**Chapter:** ch02

---

## Label Money to Influence Mental Accounting

**When to use:** When designing savings, spending, or incentive programs where fungibility leads to suboptimal use.

**Recipe:**

1. Decide the desired use of funds (e.g., retirement, emergency).
2. Create a distinct label or account for that purpose (e.g., 'Holiday Fund').
3. Communicate the label clearly when funds are received or allocated.
4. Optionally restrict transfers to reinforce the label.

**Chapter:** ch03

---

## Add a Small Immediate Cost to Delay Gratification

**When to use:** When self-control problems cause overconsumption or undersaving due to present bias.

**Recipe:**

1. Identify the tempting behavior (e.g., snacking, impulse purchase).
2. Introduce a small, immediate barrier (e.g., wait ten minutes, walk to another room).
3. Keep the barrier trivial enough not to block the behavior entirely but noticeable.
4. Measure whether the barrier reduces frequency without causing backlash.

**Chapter:** ch04

---

## Test Fairness Before Changing Prices or Wages

**When to use:** When considering a price increase, wage cut, or benefit change that could be seen as exploitative.

**Recipe:**

1. Ask users how they would feel about the change if they knew the rationale.
2. If fairness concerns arise, explain cost increases or share gains.
3. Consider phased implementation or compensation for affected groups.
4. Monitor morale, turnover, or purchase intent after the change.

**Chapter:** ch05

---

## Exploit Stable Anomalies for Profit or Social Good

**When to use:** When a behavior repeatedly deviates from model predictions in a predictable direction.

**Recipe:**

1. Document the anomaly and measure its size and stability.
2. Identify the psychological bias driving it (e.g., loss aversion, status quo).
3. Design an intervention that either corrects the bias or harvests the pattern.
4. Pilot the intervention and verify it shifts behavior as expected.
5. Scale if effective.

**Chapter:** ch06

---

## Run a Small-Scale Experiment Before Scaling

**When to use:** When proposing a change to choice architecture, incentives, or messaging.

**Recipe:**

1. Define the desired outcome and the hypothesis.
2. Create a control group and a treatment group with only the proposed change.
3. Run the test long enough to observe stable behavior (days to weeks).
4. Analyze results using simple statistics (e.g., difference in means).
5. If significant, consider scaling; if not, refine or abandon.

**Chapter:** ch07

---

## Simplify Complex Choices with a Curated Set

**When to use:** When users face many similar options and may delay or choose poorly due to overload.

**Recipe:**

1. Identify the key dimensions that matter to users (e.g., risk, return, fees).
2. Eliminate dominated or redundant options.
3. Present a small set (e.g., three to five) of well-described alternatives.
4. Label each with a clear recommendation based on user profile.
5. Track selection rates and satisfaction.

**Chapter:** ch08

---

## Use Social Norms to Influence Behavior

**When to use:** When people look to others for cues on what is appropriate or common.

**Recipe:**

1. Measure the actual prevalent behavior in the target population.
2. Communicate that norm clearly (e.g., '9 out of 10 peers enroll in the plan').
3. Ensure the norm is positive and desirable.
4. Re-measure behavior after the message to see if it shifted.

**Chapter:** ch05

---

## Commitment Device for Future Actions

**When to use:** When users intend to act in the future but often fail to follow through due to present bias.

**Recipe:**

1. Ask users to make a binding choice now about a future action (e.g., schedule a workout, pledge a donation).
2. Increase the cost of backing out (e.g., non-refundable deposit, social accountability).
3. Make the commitment easy to enter but costly to exit.
4. Follow up to ensure compliance and adjust difficulty if needed.

**Chapter:** ch04

---

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## design

- If a decision feels overwhelming, reduce the number of options to three or fewer.
- Make the beneficial choice the default; require an action to opt out.
- Frame a price increase as a loss avoided later rather than a gain now.
- Label windfalls or bonuses as 'saved' or 'invested' to reduce spontaneous spending.
- Check whether users will perceive a change as fair before implementing it.
- Use a reference price (e.g., MSRP) to make a discount feel like a bargain.
- Give immediate feedback on long‑term actions (e.g., show savings growth after each deposit).
- Simplify enrollment forms to one page; ask for only essential information.
- When users must choose a risk level, describe outcomes as chances to avoid loss rather than to gain.
- Leverage social proof by showing what similar people actually do.
- If a choice involves a trade‑off now vs later, make the later option the default.
- When presenting probabilities, use frequencies (e.g., 1 in 10) rather than percentages.
- If users ignore a feature, make it the default or remove the need to enable it.
- Test whether a change in wording (gain vs loss) alters choice before finalizing.

## life

- Add a ten‑minute delay before indulging in a temptation to test if the urge passes.
- Use a commitment device: ask users to pledge now and impose a small penalty for non‑compliance.

## general

- When predicting choices, start from rational incentives then subtract loss aversion bias.
- If a behavior repeats the same mistake across contexts, treat it as a signal, not noise.
- Check whether the reference point has shifted; if so, re‑evaluate the gain/loss frame.

## process

- Run a small test with real stakes before rolling out a policy change.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

