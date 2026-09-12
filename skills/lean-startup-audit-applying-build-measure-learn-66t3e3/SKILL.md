<!-- consolidated by data/scrape/consolidate_skills.py -->

# Lean Startup Audit: Applying Build‑Measure‑Learn

> A practical guide for turning the Lean Startup method into actionable steps. Load a chapter when you need to design an MVP, set up metrics, decide whether to pivot, or track progress with innovation accounting.

Source: (unknown)  
Purpose: test the books-to-skill endpoint with a real workflow book  

Chapters: 5  
Glossary terms: 15  
Patterns: 5  
Cheatsheet rules: 12  

## When to load this skill

A practical guide for turning the Lean Startup method into actionable steps. Load a chapter when you need to design an MVP, set up metrics, decide whether to pivot, or track progress with innovation accounting.

## Core principles

- Progress is measured by validated learning, not by the number of features shipped.
- Every product idea starts as a testable hypothesis that must be proven with real user data.
- The Build‑Measure‑Learn loop is the smallest unit of work that drives continuous improvement.
- When data shows the hypothesis is false, the team must either pivot to a new hypothesis or persevere with the current one.
- Innovation accounting provides a quantitative framework to turn raw data into business‑level insight.

## Chapter index

- **ch01 — Foundations of the Lean Startup** — Introduces the core philosophy behind the Lean Startup, focusing on hypothesis‑driven product development and the importance of learning over shipping. Sets the stage for the Build‑Measure‑Learn cycle. (load: `chapters/ch01.md`)
- **ch02 — Designing the Minimum Viable Product** — Explains how to create an MVP that is just enough to test the core hypothesis, avoiding over‑engineering and unnecessary features. (load: `chapters/ch02.md`)
- **ch03 — Measuring Real User Behavior** — Covers the metrics and data‑collection techniques needed to turn user actions into meaningful signals for the loop. (load: `chapters/ch03.md`)
- **ch04 — Learning and Decision Making** — Shows how to interpret data, decide whether to persevere or pivot, and embed learning into the product roadmap. (load: `chapters/ch04.md`)
- **ch05 — Innovation Accounting and Scaling** — Introduces the accounting system that turns raw metrics into business‑level insight, enabling startups to scale responsibly. (load: `chapters/ch05.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **hypothesis** | A testable statement about the problem a product aims to solve and the value it will deliver. | ch01 |
| **validated learning** | Evidence that a hypothesis is true or false, derived from real user data. | ch01 |
| **Build‑Measure‑Learn loop** | The core iterative cycle that turns ideas into data and then into decisions. | ch01 |
| **minimum viable product (MVP)** | The smallest product version that can still test the core hypothesis. | ch02 |
| **value proposition** | The single benefit a product promises to deliver to its users. | ch02 |
| **feature creep** | Adding unnecessary features before the hypothesis is validated. | ch02 |
| **activation rate** | The percentage of users who complete the core action that proves the hypothesis. | ch03 |
| **cohort analysis** | Grouping users by sign‑up date to track retention and behavior over time. | ch03 |
| **split testing** | Running two versions of an MVP simultaneously to compare performance on a metric. | ch03 |
| **pivot** | A strategic change to the product or target market when data disproves the current hypothesis. | ch04 |
| **persevere** | Continue building on the current hypothesis because data supports it. | ch04 |
| **innovation accounting** | A quantitative framework that tracks learning milestones and growth against a baseline. | ch05 |
| **learning milestone** | A target improvement in a key metric that signals progress toward validation. | ch05 |
| **early adopters** | The first users who try the MVP and provide the most actionable feedback. | ch02 |
| **vanity metric** | A superficial number (like page views) that does not inform product decisions. | ch03 |

## Patterns

# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Build a Minimum Viable Product

**When to use:** When you have a clear hypothesis and need to test it quickly.

**Recipe:**

1. Write the hypothesis in one sentence.
2. Identify the single core feature that proves the hypothesis.
3. Strip away all non‑essential functionality.
4. Use the fastest tool (no‑code, prototype, or simple code) to create the MVP.
5. Launch to a small group of early adopters.

**Chapter:** ch02

---

## Run a Split Test

**When to use:** When you have two variations of a feature and want to know which performs better.

**Recipe:**

1. Define the metric that matters (e.g., activation rate).
2. Create two versions differing only in the variable you want to test.
3. Randomly assign users to version A or B.
4. Collect data for a predefined period.
5. Analyze results and choose the winner.

**Chapter:** ch03

---

## Cohort Analysis for Learning

**When to use:** When you need to understand retention and long‑term value.

**Recipe:**

1. Group users by sign‑up week.
2. Track the activation and retention metrics for each cohort.
3. Compare cohorts to see if changes improve retention.
4. Document insights and adjust the hypothesis if needed.

**Chapter:** ch03

---

## Pivot Decision Process

**When to use:** When data shows the current hypothesis is not validated.

**Recipe:**

1. Review the metric against the learning milestone.
2. List alternative hypotheses that could explain the failure.
3. Select the most promising alternative and define a new hypothesis.
4. Design a new MVP to test the alternative.
5. Reset the baseline and start a new Build‑Measure‑Learn cycle.

**Chapter:** ch04

---

## Innovation Accounting Dashboard

**When to use:** When you need to track progress toward a sustainable business model.

**Recipe:**

1. Choose three key metrics: activation, retention, and revenue per user.
2. Set a baseline for each metric from the current cohort.
3. Define a learning milestone (e.g., 10% increase in activation).
4. Update the dashboard weekly with new cohort data.
5. Use the dashboard to decide on funding, scaling, or pivot.

**Chapter:** ch05

---

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## process

- Write your hypothesis in one clear sentence before you build anything.
- Track learning milestones as a percentage improvement over the baseline.
- Document each learning outcome in a shared log; treat it as a product backlog item.

## product

- If the MVP takes more than two weeks to build, cut features until it fits.
- If users abandon the product before the core action, redesign the onboarding flow.

## design

- Measure only metrics that directly test your hypothesis; discard vanity numbers.
- Use split testing for any change that could affect your core metric.

## general

- When activation is below target for two consecutive weeks, start a pivot.
- When the dashboard shows declining retention, pause scaling and focus on learning.

## life

- Show your data to the whole team every Friday to keep learning visible.
- Allocate 20% of budget to experiments that have no proven hypothesis.

## code

- Never ship a feature without a testable hypothesis attached.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

