---
name: thinking-fast-and-slow-the-ai-decision-engine-tntcy7
description: Use when me: thinking-fast-and-slow-the-ai-decision-engine-tntcy7
license: MIT
---

# Thinking, Fast and Slow: The AI Decision Engine

> This skill provides a technical framework for AI agents to navigate human cognitive architecture. It enables the agent to identify when a human is relying on flawed intuition, how to communicate to ensure information is actually retained, and how to apply rigorous decision hygiene to its own outputs to avoid common logical traps like the planning fallacy and base-rate neglect.

Source: Daniel Kahneman, "Thinking, Fast and Slow" (2011)  
Purpose: You are extracting the PSYCHOLOGY BRAIN for an AI editor. The output will be loaded by an AI agent that needs to think clearly, write clearly, and communicate cleanly with humans in the AI-human intertwined world.

Distil the source for an AI use case, not for a human reader. Extract:
1. Deep technical comprehension of human traits — how humans actually perceive, decide, attend, speak, listen, write, and update beliefs.
2. Thorough understanding of incentives, language, and communication.
3. AI-relevant patterns — concrete moves an AI should make so the human on the other end actually understands, believes, and acts.
4. Cognitive biases translated into "the AI must always do X" rules rather than "humans tend to do Y".
5. Decision hygiene moves: pre-mortems, base rates, outside views, reference classes, the planning fallacy, the fourfold pattern. Translated into "the AI must do X before shipping" rules.

Output: 8-12 self-contained chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules. The deliverable is a skill the AI loads when it needs to think, write, or communicate. Be concrete. Voice: Dr Non's standard of comprehension. Plain English.  

Chapters: 10  
Glossary terms: 22  
Patterns: 5  
Cheatsheet rules: 15  

## When to load this skill

This skill provides a technical framework for AI agents to navigate human cognitive architecture. It enables the agent to identify when a human is relying on flawed intuition, how to communicate to ensure information is actually retained, and how to apply rigorous decision hygiene to its own outputs to avoid common logical traps like the planning fallacy and base-rate neglect.

## Core principles

- System 1 is the default operating mode; it is fast, associative, and cannot be turned off.
- System 2 is the effortful monitor; it is lazy and will accept System 1's suggestions unless forced to intervene.
- Humans answer hard questions by substituting them with easier ones without noticing.
- Cognitive ease is a proxy for truth; if a message is easy to process, humans are more likely to believe it.
- Losses are weighted twice as heavily as gains in human decision-making.
- The remembering self ignores duration and only cares about the peak and the end of an experience.
- Confidence is a measure of a story's coherence, not its accuracy.
- Statistical thinking is not intuitive and must be manually triggered by System 2.

## Chapter index

- **ch01 — The Dual-Agent Architecture** — Understanding the interaction between the fast, intuitive System 1 and the slow, deliberate System 2. (load: `chapters/ch01.md`)
- **ch02 — The Substitution Trap** — How humans simplify complex problems and how an AI can correct the resulting bias. (load: `chapters/ch02.md`)
- **ch03 — Cognitive Ease and Truth Perception** — The relationship between how easy a message is to read and how much a human trusts it. (load: `chapters/ch03.md`)
- **ch04 — The Law of Small Numbers** — Why humans see patterns in random noise and how the AI must enforce statistical rigor. (load: `chapters/ch04.md`)
- **ch05 — Anchoring and Adjustment** — The power of the first number mentioned and how to neutralize its effect. (load: `chapters/ch05.md`)
- **ch06 — Availability and Salience** — How the ease of remembering an event distorts the perception of its frequency. (load: `chapters/ch06.md`)
- **ch07 — Prospect Theory and Loss Aversion** — The math of human choice: why we fear loss and how framing changes everything. (load: `chapters/ch07.md`)
- **ch08 — The Planning Fallacy and the Outside View** — Why humans are consistently over-optimistic and how to use reference classes to fix it. (load: `chapters/ch08.md`)
- **ch09 — The Two Selves: Experience vs. Memory** — Managing the conflict between the self that lives through events and the self that remembers them. (load: `chapters/ch09.md`)
- **ch10 — Decision Hygiene and the Pre-Mortem** — Practical moves to sanitize the decision-making process before it's too late. (load: `chapters/ch10.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **System 1** | The brain's fast, automatic, and intuitive mode of operation. | ch01 |
| **System 2** | The brain's slow, deliberate, and effortful mode of operation. | ch01 |
| **Cognitive Busy** | A state where System 2 is occupied, leaving System 1 in total control of behavior. | ch01 |
| **Substitution** | Replacing a complex question with a simpler one without noticing. | ch02 |
| **Affect Heuristic** | Making judgments based on emotional likes or dislikes rather than data. | ch02 |
| **Cognitive Ease** | The mental state where things feel simple, familiar, and true. | ch03 |
| **Cognitive Strain** | The mental state of effort that triggers critical thinking and suspicion. | ch03 |
| **Law of Small Numbers** | The bias of believing that small samples accurately represent the whole population. | ch04 |
| **Anchoring** | The tendency to rely too heavily on the first piece of information offered. | ch05 |
| **Availability Heuristic** | Estimating the frequency of an event based on how easily it is remembered. | ch06 |
| **Base Rate** | The underlying statistical probability of an event occurring in a population. | ch06 |
| **Loss Aversion** | The psychological principle that losses hurt more than equivalent gains feel good. | ch07 |
| **Framing Effect** | How the presentation of information influences the decision made about it. | ch07 |
| **Planning Fallacy** | The tendency to underestimate the time and resources needed for a task. | ch08 |
| **Inside View** | Focusing on the specific circumstances of a plan rather than historical data. | ch08 |
| **Outside View** | Using the results of similar past events to predict the outcome of a current one. | ch08 |
| **Experiencing Self** | The part of the mind that lives in the present moment. | ch09 |
| **Remembering Self** | The part of the mind that constructs stories about the past and makes future choices. | ch09 |
| **Peak-End Rule** | The memory bias where an experience is judged by its most intense point and its end. | ch09 |
| **Pre-Mortem** | A strategy of imagining a future failure to identify current risks. | ch10 |
| **Joint Evaluation** | Comparing two or more options simultaneously to reveal hidden differences. | ch10 |
| **Decision Hygiene** | Systematic processes used to reduce error and bias in judgment. | ch10 |

## Patterns

# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## The Outside View Reset

**When to use:** When a user provides a highly optimistic timeline or budget for a new project.

**Recipe:**

1. Identify the category of the project (the Reference Class).
2. Retrieve the average completion time or cost for that category.
3. Present the average as the baseline before discussing the user's specific plan.
4. Ask the user why their project will be different from the average.

**Chapter:** ch08

---

## The Pre-Mortem Intervention

**When to use:** When a user is about to finalize a high-stakes decision.

**Recipe:**

1. Ask the user to imagine they are one year in the future and the decision was a total failure.
2. Ask them to list the specific reasons why it failed.
3. Review the current plan to see which of those reasons are currently unaddressed.
4. Adjust the plan to mitigate those identified risks.

**Chapter:** ch10

---

## Substitution Check

**When to use:** When a user asks for a subjective judgment (e.g., 'Is this a good idea?').

**Recipe:**

1. Identify the 'easy' question the user might be answering (e.g., 'Do I feel excited?').
2. Identify the 'hard' question that actually matters (e.g., 'What is the ROI?').
3. Provide the data for the 'hard' question alongside the user's 'easy' intuition.

**Chapter:** ch02

---

## Framing Inversion

**When to use:** When presenting a choice with risks and benefits.

**Recipe:**

1. State the outcome in terms of survival/success (e.g., 90% success).
2. Immediately state the same outcome in terms of mortality/failure (e.g., 10% failure).
3. Ask the user if their preference changes based on the wording.

**Chapter:** ch07

---

## Peak-End Optimization

**When to use:** When designing a multi-step workflow or long interaction.

**Recipe:**

1. Identify the most difficult or 'peak' effort part of the process.
2. Provide extra support or positive feedback during that peak.
3. Ensure the final step of the interaction is exceptionally smooth and rewarding.
4. Ignore the total duration; focus on the quality of the conclusion.

**Chapter:** ch09

---

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## general

- If the user is confident, assume they have a coherent story, not necessarily a true one.
- Never trust a trend based on a small sample size.
- When a user is tired or busy, simplify all instructions to the absolute minimum.
- Check if a user's 'gut feeling' is actually just an Affect Heuristic (liking vs. knowing).

## process

- Always provide the base rate before discussing specific cases.
- Ignore the user's first number in a negotiation; it is an anchor.
- Ask for an 'Outside View' estimate before an 'Inside View' plan.
- Before shipping a plan, run a pre-mortem to find the 'hidden' failure points.
- If a task is repetitive, use a checklist to prevent System 1 lapses.

## writing

- To be believed, use high-contrast fonts and simple, clear language.
- To trigger critical thinking, introduce a small amount of cognitive strain.
- Frame suggestions as 'avoiding a loss' to increase user motivation.
- Use vivid examples for rules you want remembered; use statistics for facts you want believed.

## design

- Present options side-by-side to force a rational comparison.
- End every interaction with a clear, positive resolution to anchor the user's memory.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

