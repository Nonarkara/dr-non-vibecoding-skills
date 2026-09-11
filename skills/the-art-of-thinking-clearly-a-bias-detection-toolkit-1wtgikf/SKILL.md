<!-- consolidated by data/scrape/consolidate_skills.py -->

# The Art of Thinking Clearly: A Bias-Detection Toolkit

> This skill provides a framework for identifying and neutralizing cognitive biases that distort decision-making. It helps agents move from intuitive, error-prone reactions to rational, evidence-based analysis by recognizing common mental traps like the sunk cost fallacy, social proof, and confirmation bias. It is designed for use when evaluating risks, assessing expertise, or making strategic choices where human intuition often fails.

Source: The Art of Thinking Clearly  
Purpose: The AI loads this when it has to think clearly about a decision and is prone to one of the standard cognitive biases. Dobelli 99 short chapters each name one bias and unpack it: survivorship bias, sunk-cost fallacy, confirmation bias, the halo effect, the conjunction fallacy, the anchoring effect, the availability heuristic, etc. Distil for the AI: a one-paragraph description of each bias with a concrete example and a one-line rule for avoiding it. Output 8-10 chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules. Plain English.  

Chapters: 10  
Glossary terms: 15  
Patterns: 4  
Cheatsheet rules: 15  

## When to load this skill

This skill provides a framework for identifying and neutralizing cognitive biases that distort decision-making. It helps agents move from intuitive, error-prone reactions to rational, evidence-based analysis by recognizing common mental traps like the sunk cost fallacy, social proof, and confirmation bias. It is designed for use when evaluating risks, assessing expertise, or making strategic choices where human intuition often fails.

## Core principles

- Past investments of time or money should never justify future expenditures on a failing project.
- The popularity of an idea is not a metric for its truth or functional value.
- Actively seek out information that contradicts your current beliefs to prevent mental stagnation.
- Judge the quality of a decision by the logic used at the time, not the eventual outcome.
- Recognize that extreme performance or events will naturally return to a moderate average over time.
- Distinguish between deep, functional expertise and the mere ability to mimic complex terminology.
- Incentives drive behavior more reliably than appeals to logic, morals, or company culture.
- Evaluate options in isolation rather than relying on relative comparisons that distort value.

## Chapter index

- **ch01 — The Sunk Cost Fallacy** — Explains why we irrationally persist in failing endeavors due to past investments. Provides a rule for making decisions based on future utility rather than past loss. (load: `chapters/ch01.md`)
- **ch02 — Social Proof and the Herd** — Analyzes the instinct to follow the crowd and why popularity is a poor indicator of truth. Offers a strategy for independent verification. (load: `chapters/ch02.md`)
- **ch03 — Confirmation Bias** — Describes the tendency to filter information to fit existing beliefs. Provides a method for 'murdering your darlings' to find the truth. (load: `chapters/ch03.md`)
- **ch04 — The Authority Bias** — Examines why we over-rely on experts and status symbols. Suggests challenging authority to ensure logical consistency. (load: `chapters/ch04.md`)
- **ch05 — The Contrast Effect** — Explains how relative comparisons distort our sense of value. Provides a rule for absolute evaluation. (load: `chapters/ch05.md`)
- **ch06 — Availability Bias** — Discusses why we overvalue information that is easy to recall. Offers a strategy for using data over anecdotes. (load: `chapters/ch06.md`)
- **ch07 — Story Bias** — Analyzes how narratives distort facts to create a false sense of understanding. Suggests deconstructing stories into raw data. (load: `chapters/ch07.md`)
- **ch08 — The Overconfidence Effect** — Explains why we overestimate our knowledge and predictive power. Provides a rule for building margins of error. (load: `chapters/ch08.md`)
- **ch09 — Incentive Super-Response** — Discusses how rewards drive behavior in unexpected ways. Offers a method for predicting behavior by following incentives. (load: `chapters/ch09.md`)
- **ch10 — Outcome Bias** — Explains the error of judging a decision by its result rather than its process. Suggests evaluating the logic of the choice. (load: `chapters/ch10.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **Sunk Cost** | Resources already spent that cannot be recovered and should be ignored in future decision-making. | ch01 |
| **Social Proof** | The psychological phenomenon where people copy the actions of others in an attempt to undertake behavior in a given situation. | ch02 |
| **Confirmation Bias** | The tendency to search for, interpret, and recall information in a way that confirms one's preexisting beliefs. | ch03 |
| **Disconfirming Evidence** | Facts or observations that contradict a current hypothesis or belief. | ch03 |
| **Authority Bias** | The tendency to attribute greater accuracy to the opinion of an authority figure and be more influenced by that opinion. | ch04 |
| **Contrast Effect** | The enhancement or diminishment of perception as a result of successive or simultaneous exposure to a stimulus of lesser or greater value. | ch05 |
| **Availability Heuristic** | A mental shortcut that relies on immediate examples that come to a given person's mind when evaluating a specific topic. | ch06 |
| **Story Bias** | The tendency to interpret information as part of a narrative, even when the facts are random or unrelated. | ch07 |
| **Overconfidence Effect** | A bias in which a person's subjective confidence in their judgments is reliably greater than the objective accuracy of those judgments. | ch08 |
| **Incentive Super-Response** | The tendency for people to change their behavior drastically in response to rewards, often ignoring the original intent of the reward. | ch09 |
| **Outcome Bias** | An error made in evaluating the quality of a decision when the outcome of that decision is already known. | ch10 |
| **Chauffeur Knowledge** | Knowledge that is mimicked or recited without a deep, functional understanding of the underlying principles. | ch08 |
| **Circle of Competence** | The limit of a person's true expertise; staying within this boundary reduces the risk of error. | ch08 |
| **Regression to the Mean** | The phenomenon that if a variable is extreme on its first measurement, it will tend to be closer to the average on its second measurement. | ch10 |
| **Illusion of Control** | The tendency for people to overestimate their ability to influence events that are objectively determined by chance. | ch07 |

## Patterns

# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## The Disconfirmation Audit

**When to use:** When you are highly certain about a strategy or belief.

**Recipe:**

1. State your current belief clearly.
2. Actively search for three pieces of evidence that prove the belief is wrong.
3. Consult a person who disagrees with you and listen without defending your position.
4. Update your certainty level based on the new data.

**Chapter:** ch03

---

## The Sunk Cost Exit

**When to use:** When deciding whether to continue a project that is currently underperforming.

**Recipe:**

1. List all costs incurred to date (time, money, effort).
2. Mentally 'delete' those costs; assume you are starting from zero today.
3. Evaluate only the future costs required to finish vs. the expected future benefit.
4. If the future benefit is lower than the future cost, terminate the project immediately.

**Chapter:** ch01

---

## The Isolation Valuation

**When to use:** When evaluating a purchase or an upgrade.

**Recipe:**

1. Remove the item from its current context (e.g., the discount or the bundle).
2. Find the absolute price of the item.
3. Compare that price to other unrelated items of similar value.
4. Decide if the utility of the item justifies the absolute cost.

**Chapter:** ch05

---

## The Incentive Audit

**When to use:** When trying to predict the behavior of a partner, employee, or competitor.

**Recipe:**

1. Identify exactly how the person is being measured or paid.
2. Determine what behavior maximizes their personal reward.
3. Assume they will perform that behavior, regardless of what they say their goals are.
4. Adjust your strategy to align your goals with their rewards.

**Chapter:** ch09

---

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## process

- If you wouldn't start the project today, don't continue it just because you've already spent money.
- Assume your project will take twice as long and cost twice as much as you think.
- Don't mistake a return to the average for a successful intervention.

## argument

- The more people follow an idea, the more skeptical you should be of its truth.

## design

- Treat every 'exception' as a potential piece of evidence that your theory is wrong.
- If a task feels overwhelming, check if you are paralyzed by too many options.

## general

- Ignore the white coat and the title; focus only on the logic of the expert's claim.
- A lucky win is not proof of a good strategy.

## life

- Never judge a price by the discount; judge it by the absolute value.
- Never ask a salesperson if you need their product.
- Focus on the few things you can actually influence; ignore the 'placebo buttons.'

## product

- Base your risk assessments on statistics, not on the most recent news story.

## writing

- When you hear a compelling story, ask: 'What facts were left out to make this plot work?'
- Write down your predictions to prevent your brain from saying 'I told you so' later.

## code

- If you can't explain the limits of your knowledge, you don't have true expertise.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

