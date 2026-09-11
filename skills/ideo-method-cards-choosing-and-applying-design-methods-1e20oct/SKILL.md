<!-- consolidated by data/scrape/consolidate_skills.py -->

# IDEO Method Cards: Choosing and Applying Design Methods

> A practical guide for an AI agent to recommend, sequence, and run IDEO’s 51 design methods. It explains how to match methods to project phases, adapt them to constraints, respect participants, and avoid over‑engineering. Load a chapter when the agent needs detailed guidance on a specific aspect of method selection or execution.

Source: /Users/axiom/.minimax/v2/assets/2026/09/11/11-52-47-296-asset_20260911-115247-296_97b794e5b9f4_b4fae33a-IDEO - IDEO Method Cards (IDEO) - libgen.li.pdf  
Purpose: You are extracting a DESIGN METHODS CATALOGUE skill for an AI agent. The source is IDEO's Method Cards — 51 specific, named design methods, each with a "Why", a "How", and a "When to use" note.

Distil for the AI use case, not the human reader. The AI loads this when it has to:
1. Pick the right design method for the situation. The book has 51 methods; the AI should be able to recommend one (or a sequence) given the design problem and the phase.
2. Sequence methods correctly: a method for Inspiration is wrong in Implementation. A method for synthesis is wrong in research. The AI should match the method to the phase.
3. Run a method without oversimplifying it. Each method has prerequisites and a deliverable; running a method correctly is more than running its name. The AI should not strip a method down to its name and lose the rigour.
4. Adapt methods to context. The 51 are not a checklist; they are a menu. The AI should be able to substitute ("there's no ethnographer, but you can run a structured customer interview instead") and explain why.
5. Recognise the underlying categories the methods fall into: understand (research), synthesise (frames and models), ideate (generate), prototype (build), test (validate), implement (ship). The AI should organise methods by these categories when helping a user plan.
6. Be honest about when a method is overkill. A 12-person brainstorm for a tiny copy change is waste. The AI should match the rigour to the problem.

Output: 8-10 self-contained chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules. The deliverable is a skill the AI loads when it has to choose a design method, plan a design activity, or advise on a specific kind of user research / synthesis / prototyping move.

Voice: Dr Non's standard of comprehension. Plain English. No "leverage", "utilize", "robust", "holistic", "synergy", "paradigm", "delve", "tapestry", "testament", "landscape", "journey", "in today's fast-paced world", "it is important to note that", "at the end of the day".  

Chapters: 10  
Glossary terms: 30  
Patterns: 7  
Cheatsheet rules: 20  

## When to load this skill

A practical guide for an AI agent to recommend, sequence, and run IDEO’s 51 design methods. It explains how to match methods to project phases, adapt them to constraints, respect participants, and avoid over‑engineering. Load a chapter when the agent needs detailed guidance on a specific aspect of method selection or execution.

## Core principles

- Methods belong to one of five phases – Learn, Look, Ask, Try, or Implement – and should only be used in their intended phase.
- Every method has a minimum set of prerequisites (participants, materials, data) and a concrete deliverable; skipping either breaks the method’s rigor.
- Methods can be substituted when resources are missing, but the substitute must satisfy the same research or design goal.
- Participant safety, consent, and dignity are non‑negotiable; any method that violates these rules must be dropped or redesigned.
- Overkill hurts more than under‑use; choose the simplest method that still answers the question.
- Group methods into four categories – Learn, Look, Ask, Try – to help the agent navigate the catalogue quickly.
- Sequencing matters: synthesis methods (e.g., Affinity Diagrams) follow data‑gathering methods (e.g., Interviews); prototyping methods follow synthesis.
- Document the “Why”, “How”, and “When” for each method to keep the AI from reducing a method to a name only.
- Cross‑cultural and extreme‑user variants expand insight breadth but require extra logistics.
- Iterate: run a method, evaluate its output, then decide whether to deepen, broaden, or move to the next phase.

## Chapter index

- **ch01 — Method Phase Map** — Shows how the 51 methods split across the five design phases and why phase alignment matters. (load: `chapters/ch01.md`)
- **ch02 — Prerequisites & Deliverables** — Details the minimum inputs and expected outputs for each method, ensuring the AI runs them with full rigor. (load: `chapters/ch02.md`)
- **ch03 — Method Substitution Rules** — Guides the AI on how to replace unavailable methods with suitable alternatives while preserving intent. (load: `chapters/ch03.md`)
- **ch04 — Sequencing Methods Correctly** — Explains how to order methods from discovery to validation, preventing phase mismatches. (load: `chapters/ch04.md`)
- **ch05 — Participant Ethics Checklist** — Provides a concise checklist to guarantee respectful and legal treatment of participants. (load: `chapters/ch05.md`)
- **ch06 — Overkill Detection & Scaling Down** — Helps the AI recognize when a method is too heavyweight for the problem and suggests lighter alternatives. (load: `chapters/ch06.md`)
- **ch07 — Cross‑Cultural & Extreme‑User Adaptations** — Describes how to adjust methods for global contexts or for users at the edges of the target market. (load: `chapters/ch07.md`)
- **ch08 — Synthesizing Insights: From Data to Concepts** — Shows how to turn raw observations into actionable design concepts using synthesis methods. (load: `chapters/ch08.md`)
- **ch09 — Prototyping & Testing Best Practices** — Guides the AI through rapid prototyping, scenario testing, and iteration loops. (load: `chapters/ch09.md`)
- **ch10 — Method Catalog at a Glance** — Provides a compact table of all 51 methods with phase tags, typical duration, and key deliverables. (load: `chapters/ch10.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **Learn Phase** | The stage where designers gather background information and secondary data. | ch01 |
| **Look Phase** | The stage focused on observing people in their natural contexts. | ch01 |
| **Ask Phase** | The stage where designers directly query participants through interviews or surveys. | ch01 |
| **Try Phase** | The stage where ideas are turned into low‑fidelity prototypes for testing. | ch01 |
| **Implement Phase** | The final stage where validated solutions are refined and shipped. | ch01 |
| **Affinity Diagram** | A method that clusters raw data into themes using sticky notes. | ch08 |
| **Experience Prototype** | A quick physical or digital mock‑up used to simulate real use. | ch09 |
| **Extreme User** | A participant who is either highly familiar or completely unfamiliar with the product. | ch07 |
| **Cultural Probe** | A kit sent to participants to collect personal artifacts and reflections. | ch07 |
| **Fly on the Wall** | Passive observation of people without interfering. | ch04 |
| **Flow Analysis** | Mapping the movement of information or actions through a system. | ch04 |
| **Five Whys** | A questioning technique that drills down to root causes by asking "Why?" five times. | ch04 |
| **Guided Tour** | Accompanying participants through their own spaces to observe behavior. | ch04 |
| **Participant Consent** | Permission granted by a participant to use their data and recordings. | ch05 |
| **Overkill** | Using a method that is more complex or resource‑intensive than the problem requires. | ch06 |
| **Scalable Method** | A method that can be reduced in size or duration without losing core insight. | ch06 |
| **Cross‑Cultural Study** | Research that gathers data from multiple cultural contexts to reveal universal and local patterns. | ch07 |
| **Conceptual Landscape** | A visual matrix that positions ideas across dimensions such as feasibility and desirability. | ch08 |
| **Narrative Mapping** | Creating user stories that connect observed insights into a coherent journey. | ch08 |
| **Scenario Testing** | Running participants through realistic use cases to evaluate a prototype. | ch09 |
| **Quick‑and‑Dirty Prototyping** | Building a rough model with everyday materials to surface issues fast. | ch09 |
| **Secondary Research** | Collecting existing data such as reports, articles, and market analyses. | ch02 |
| **Behavioral Mapping** | Charting where and how people move within a space. | ch02 |
| **Participant Ethics** | Guidelines ensuring respect, safety, and privacy for research subjects. | ch05 |
| **Deliverable** | The concrete output a method is expected to produce, such as a diagram or insight list. | ch02 |
| **Method Substitution** | Replacing an unavailable method with another that fulfills the same research goal. | ch03 |
| **Root Cause** | The fundamental reason behind a behavior uncovered by techniques like Five Whys. | ch04 |
| **Insight** | A clear, actionable understanding derived from data. | ch08 |
| **Prototype** | A tangible or digital representation of a design concept used for testing. | ch09 |
| **Iteration** | Repeating a method after learning from previous results to refine the solution. | ch09 |

## Patterns

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

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## research

- If you have no data, start with Secondary Research.
- Use Fly on the Wall to validate assumptions about real behavior.
- Apply Five Whys only after an interview, not as a stand‑alone survey.
- If you need cultural nuance, run Foreign Correspondents before any local survey.
- When you lack extreme users, broaden your interview pool and ask probing questions.

## process

- Never run a prototype before you have at least one user insight.
- Match method phase to project phase; never mix.
- Document every deliverable; it feeds the next method.
- Keep participant groups under 6 for focused insight sessions.
- If a method’s duration exceeds your sprint, split it into two shorter activities.

## ethics

- If a method requires strangers, offer compensation before asking.
- Always ask for permission before photographing or recording.

## prototype

- When time is limited, replace a high‑fidelity prototype with Paper Prototyping.

## general

- When a method feels too complex, ask: "What is the minimum data needed?"

## synthesis

- Run an Affinity Diagram after any set of interviews or observations.
- Prioritize insights that affect the core user journey first.
- Use a Conceptual Landscape to compare ideas on feasibility and desirability.

## test

- Use Scenario Testing to evaluate a prototype’s usability before full build.
- After each test, write one sentence summarizing the biggest issue discovered.

## interview

- If a participant says "I don't know", follow up with a concrete example.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

