<!-- consolidated by data/scrape/consolidate_skills.py -->

# Choice Architecture: Nudging Decisions Without Coercion

> A practical skill set for AI agents that need to design any user interaction where a choice is presented. It teaches how to map defaults, options, and frictions, run the iNUDGE checklist, apply SLIM messaging, and respect ethical limits while leveraging human cognitive biases.

Source: /Users/axiom/.minimax/v2/assets/2026/09/11/11-52-47-240-asset_20260911-115247-240_bc6bf0fb0c6e_29490a4b-Richard H. Thaler, Prof. Cass R. Sunstein - Nudge_ Improving Decisions About Health, Wealth, and Happiness (2008, Yale University Press) - libgen.li (1).pdf  
Purpose: You are extracting a CHOICE ARCHITECTURE skill for an AI agent. The source is Thaler & Sunstein's Nudge — the book that defined the field of libertarian paternalism: how to design choices so that the default helps people without removing any option.

Distil for the AI use case, not the human reader. The AI loads this when it has to:
1. Design a choice point: every UI is a choice architecture, every default is a nudge. The AI should ask "what does the default do? what does each option look like? what is the friction on each path?" for every interaction it designs.
2. Apply the iNUDGE checklist: incentives, defaults, understanding, mapping, Give feedback, avoid error, Structure complex choices. Run through it for every significant UI.
3. Translate choice into action: make the desired action the path of least resistance. Don't fight the user's inertia; design with it.
4. Surface SLIM (Salient, Likeable, In-moment, Memorable) — the qualities that make a message actually move behaviour, not just inform.
5. Recognise when a nudge is appropriate and when it crosses into manipulation. The book is about helping people, not pushing them. The AI should keep that line.
6. Frame choices in loss vs. gain terms depending on what is being asked — and be honest about the framing, not sneaky.

Output: 8-10 self-contained chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules. The deliverable is a skill the AI loads when it has to design a UI, an onboarding flow, a form, a confirmation dialog, a settings page — anything that involves the user making a choice.

Voice: Dr Non's standard of comprehension. Plain English. No "leverage", "utilize", "robust", "holistic", "synergy", "paradigm", "delve", "tapestry", "testament", "landscape", "journey", "in today's fast-paced world", "it is important to note that", "at the end of the day".  

Chapters: 10  
Glossary terms: 25  
Patterns: 10  
Cheatsheet rules: 20  

## When to load this skill

A practical skill set for AI agents that need to design any user interaction where a choice is presented. It teaches how to map defaults, options, and frictions, run the iNUDGE checklist, apply SLIM messaging, and respect ethical limits while leveraging human cognitive biases.

## Core principles

- People rely on fast, automatic thinking and will follow the path of least resistance unless a nudge makes another option more salient.
- Defaults act as powerful nudges because loss aversion and status‑quo bias make users reluctant to change their current state.
- Anchors, availability, and representativeness shape how users estimate values and probabilities, so subtle framing can shift decisions.
- Loss frames are more persuasive than gain frames when the goal is to motivate action, but framing must be honest and transparent.
- Self‑control problems arise from a conflict between a reflective Planner and an impulsive Doer; commitment devices can help the Planner win.
- Effective nudges are SLIM: Salient, Likeable, In‑the‑moment, Memorable, and they respect the line between persuasion and manipulation.
- Friction—time, effort, or complexity—determines whether a choice is taken; reducing friction on the desired path nudges behavior.
- Feedback that tells users the impact of their choice reinforces the desired behavior and reduces regret.
- Ethical nudging requires that the choice architecture preserve all options and that the nudge’s purpose be to improve welfare, not to exploit.
- Mental accounting makes people treat money and resources as non‑fungible, so labeling and earmarking can steer spending.

## Chapter index

- **ch01 — Two Minds: Automatic vs. Reflective** — Explains the dual‑system model of human cognition and why most everyday decisions are driven by the fast, unconscious Automatic System. (load: `chapters/ch01.md`)
- **ch02 — Heuristics that Shape Judgments** — Describes anchoring, availability, and representativeness, showing how they bias estimates and how to use them responsibly as nudges. (load: `chapters/ch02.md`)
- **ch03 — Loss Aversion and Status‑Quo Bias** — Shows how fear of loss and a preference for the current state create inertia, and how defaults can harness this tendency. (load: `chapters/ch03.md`)
- **ch04 — Framing Effects** — Explains how the same information presented in loss or gain terms changes behavior, and gives guidelines for honest framing. (load: `chapters/ch04.md`)
- **ch05 — The iNUDGE Checklist** — Provides a step‑by‑step checklist—Incentives, Defaults, Understanding, Mapping, Feedback, Error avoidance, Structure—for evaluating any UI. (load: `chapters/ch05.md`)
- **ch06 — SLIM Messaging** — Introduces the SLIM criteria for crafting messages that actually move behavior. (load: `chapters/ch06.md`)
- **ch07 — Designing Defaults and Reducing Friction** — Shows how to set defaults, lower effort, and shape option layout to make the desired path the easiest. (load: `chapters/ch07.md`)
- **ch08 — Temptation, Hot‑Cold Empathy Gap, and Planner‑Doer Conflict** — Explains how arousal changes preferences and how commitment devices can align short‑term actions with long‑term goals. (load: `chapters/ch08.md`)
- **ch09 — Commitment Devices and External Aids** — Provides concrete tools like automatic savings, bet contracts, and smart alarms that help users stick to plans. (load: `chapters/ch09.md`)
- **ch10 — Ethical Boundaries: Nudging vs. Manipulation** — Defines the line between helpful nudges and coercive manipulation, emphasizing transparency and choice preservation. (load: `chapters/ch10.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **Automatic System** | Fast, unconscious mental processes that drive instinctive reactions. | ch01 |
| **Reflective System** | Slow, deliberate thinking used for analysis and planning. | ch01 |
| **Heuristic** | A mental shortcut that simplifies decision making but can cause bias. | ch02 |
| **Anchoring** | Starting from a known number and adjusting insufficiently, influencing estimates. | ch02 |
| **Availability** | Judging likelihood based on how easily examples come to mind. | ch02 |
| **Representativeness** | Assessing probability by similarity to a stereotype rather than base rates. | ch02 |
| **Loss Aversion** | The tendency to feel losses more strongly than equivalent gains. | ch03 |
| **Status‑Quo Bias** | Preference for keeping things as they are, leading to inertia. | ch03 |
| **Default** | The pre‑selected option that users receive if they take no action. | ch05 |
| **Nudge** | A subtle change in choice architecture that steers behavior without restricting options. | ch05 |
| **Libertarian Paternalism** | Design philosophy that nudges while preserving freedom of choice. | ch05 |
| **SLIM** | Message criteria: Salient, Likeable, In‑the‑moment, Memorable. | ch06 |
| **Planner** | The reflective self that sets long‑term goals. | ch08 |
| **Doer** | The impulsive self driven by the Automatic System. | ch08 |
| **Hot‑Cold Empathy Gap** | Failure to predict how arousal will change future preferences. | ch08 |
| **Commitment Device** | A tool that binds future behavior to a pre‑committed plan. | ch09 |
| **Friction** | Any effort, time, or complexity that makes a choice harder to act on. | ch07 |
| **Feedback Loop** | Information given to users about the impact of their choice. | ch07 |
| **Mental Accounting** | Treating money as if it belongs to separate, non‑fungible accounts. | ch10 |
| **Incentive** | A reward or penalty that influences the desirability of an option. | ch05 |
| **Choice Architecture** | The way options are presented, ordered, and framed to shape decisions. | ch05 |
| **Bias** | Systematic deviation from rational judgment caused by heuristics. | ch02 |
| **Self‑Control** | The ability to resist immediate temptations in favor of long‑term goals. | ch08 |
| **Opt‑out** | A design where the default is the desired choice, and users must actively decline. | ch07 |
| **Opt‑in** | A design where users must actively choose the desired option. | ch07 |

## Patterns

# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Default as Nudge

**When to use:** When you want most users to adopt a beneficial option without restricting alternatives.

**Recipe:**

1. Identify the target behavior.
2. Set the target option as the pre‑selected default.
3. Make opting out require an extra step (e.g., additional click or confirmation).
4. Provide clear information about the default and how to change it.

**Chapter:** ch07

---

## Anchor Adjustment

**When to use:** When you need to influence a numeric estimate or donation amount.

**Recipe:**

1. Choose a realistic high or low anchor based on desired outcome.
2. Present the anchor before the decision point.
3. Offer a range of options that cluster around the anchor.
4. Test for insufficient adjustment and adjust anchor if needed.

**Chapter:** ch02

---

## SLIM Message Crafting

**When to use:** Any point where a brief message can influence a decision.

**Recipe:**

1. Make the message visually prominent (Salient).
2. Use a friendly tone and positive language (Likeable).
3. Show the message at the exact moment of decision (In‑the‑moment).
4. Include a memorable hook or statistic (Memorable).

**Chapter:** ch06

---

## Friction Reduction for Desired Path

**When to use:** When the desired action should be the path of least resistance.

**Recipe:**

1. Map the steps required for each option.
2. Count clicks, fields, and time for each path.
3. Remove unnecessary steps from the target path.
4. Add a small confirmation step to alternative paths.

**Chapter:** ch07

---

## Loss Frame Prompt

**When to use:** When you need to motivate a preventive or protective action.

**Recipe:**

1. Identify the relevant loss (e.g., higher bills, health risk).
2. Phrase the message in terms of avoiding that loss.
3. Pair the loss frame with a clear, easy action to prevent it.
4. Validate that the framing is truthful and not deceptive.

**Chapter:** ch04

---

## Commitment Bet

**When to use:** When users struggle with self‑control over a habit.

**Recipe:**

1. Ask the user to set a concrete goal and a deadline.
2. Create a monetary or social penalty for missing the goal.
3. Make the penalty payable to a third party or public charity.
4. Provide regular reminders and a way to verify progress.

**Chapter:** ch09

---

## Opt‑out Enrollment

**When to use:** Increasing participation in programs like retirement savings or organ donation.

**Recipe:**

1. Enroll users automatically with a clear statement of participation.
2. Offer a simple, visible way to withdraw consent.
3. Explain benefits of staying enrolled in plain language.
4. Track opt‑out rates and adjust communication if too high.

**Chapter:** ch07

---

## Feedback Reinforcement

**When to use:** After a user makes a choice that aligns with the desired outcome.

**Recipe:**

1. Immediately display the impact of the decision (e.g., saved $X).
2. Use visual cues (checkmarks, progress bars) to highlight success.
3. Store the feedback for later reference (e.g., in a dashboard).
4. Encourage repeat behavior by linking to future benefits.

**Chapter:** ch07

---

## Chunked Complex Choice

**When to use:** When a decision involves many variables or steps.

**Recipe:**

1. Break the decision into sequential, simple sub‑choices.
2. Provide a summary of previous selections at each step.
3. Allow users to review and edit earlier choices before finalizing.
4. Use progressive disclosure to hide advanced options until needed.

**Chapter:** ch05

---

## Ethical Nudge Review

**When to use:** Before launching any new choice architecture.

**Recipe:**

1. List all options and verify none are hidden or removed.
2. Check that the default is justified by evidence of benefit.
3. Confirm that framing is truthful and not deceptive.
4. Run a user test to ensure the nudge does not cause undue harm.

**Chapter:** ch10

---

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## design

- Set the desired outcome as the default and require an extra step to opt out.
- Make every choice visible; never hide an option behind a menu.
- Reduce clicks on the target path; add a confirmation on alternatives.
- Offer a clear feedback screen showing the impact of the user’s choice.
- Use anchoring only with realistic numbers that steer toward the goal.
- Break complex forms into short, sequential steps to avoid overwhelm.
- Use visual cues (color, size) to make the desired option stand out.

## writing

- Use loss framing when you need to spur immediate action.
- Keep messages SLIM: Salient, Likeable, In‑the‑moment, Memorable.
- When presenting statistics, include a relatable example to improve comprehension.

## process

- Apply the iNUDGE checklist to every UI before release.
- When users are hot, present pre‑committed plans made while cold.
- Test availability bias by asking users to recall examples before presenting risk data.
- Check for loss aversion by asking users how much they'd pay to avoid a negative outcome.

## product

- Label money in separate mental accounts only when it helps the user budget.
- Use opt‑out enrollment for public‑good programs, but provide an easy opt‑in for alternatives.

## general

- Never hide the default; always disclose why it was chosen.
- If a nudge feels manipulative, replace it with an informational prompt.
- Avoid default settings that could cause financial loss without user awareness.

## code

- Design commitment devices that impose a penalty for non‑compliance.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

