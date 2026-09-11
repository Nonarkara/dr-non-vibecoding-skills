# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Phase‑First Filtering

**When to use:** When the AI receives a design problem without a specified phase.

**Recipe:**

1. Ask the user what data they already have.
2. Map existing data to a phase (Learn, Look, Ask, Try).
3. Filter the method list to methods tagged for that phase.
4. Recommend the simplest method that satisfies the goal.

**Chapter:** ch01

---

## Method Substitution

**When to use:** When a required method cannot be performed due to missing resources.

**Recipe:**

1. Identify the core goal of the original method.
2. Search the catalog for methods with the same goal tag.
3. Rank alternatives by data fidelity and resource cost.
4. Select the highest‑fidelity alternative and note the substitution.

**Chapter:** ch03

---

## Overkill Check

**When to use:** Before launching any method, to ensure the method matches problem scale.

**Recipe:**

1. Estimate the effort (time, participants, materials).
2. Estimate the insight needed (depth, breadth).
3. If effort > insight need by more than 2×, pick a lighter method.
4. Document the scaling decision.

**Chapter:** ch06

---

## Synthesis Loop

**When to use:** After collecting raw data from Look or Ask methods.

**Recipe:**

1. Gather all raw artifacts into a digital board.
2. Run an Affinity Diagram to cluster themes.
3. Prioritize clusters using voting or impact scoring.
4. Translate top clusters into Conceptual Landscape entries.

**Chapter:** ch08

---

## Rapid Prototype‑Test Cycle

**When to use:** When a design concept needs quick validation.

**Recipe:**

1. Build a low‑fidelity prototype focused on one question.
2. Create a short scenario that exercises that question.
3. Run the scenario with 3‑5 participants.
4. Record observations and iterate the prototype.
5. Repeat until the question is answered.

**Chapter:** ch09

---

## Cross‑Cultural Insight Gathering

**When to use:** When a product will be used in multiple regions.

**Recipe:**

1. Select Foreign Correspondents or Cultural Probes as base methods.
2. Translate materials and recruit local contacts.
3. Collect anecdotes and artifacts from each region.
4. Synthesize findings into a Comparative Landscape.
5. Highlight region‑specific constraints for design.

**Chapter:** ch07

---

## Ethics First Prompt

**When to use:** Any method that involves human participants.

**Recipe:**

1. Display the participant‑ethics checklist.
2. Require the AI to confirm each item before proceeding.
3. If any item is missing, pause and generate a remediation step.
4. Log the confirmation for audit.

**Chapter:** ch05

---
