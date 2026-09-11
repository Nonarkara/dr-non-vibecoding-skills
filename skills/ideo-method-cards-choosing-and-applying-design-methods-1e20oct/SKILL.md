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

## Quick reference

For vocabulary: see `glossary.md` (terms, chapter-anchored).
For reusable moves: see `patterns.md` (steps, chapter-anchored).
For decision rules: see `cheatsheet.md` (imperative sentences by category).
