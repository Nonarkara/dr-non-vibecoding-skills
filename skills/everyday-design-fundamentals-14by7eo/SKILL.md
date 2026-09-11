<!-- consolidated by data/scrape/consolidate_skills.py -->

# Everyday Design Fundamentals

> A compact guide for agents that need to create or evaluate products used by people. It contains the essential concepts from Don Norman’s work—affordances, signifiers, mapping, feedback, constraints, conceptual models, error types, and the seven‑stage action cycle—organized into self‑contained chapters that can be loaded individually.

Source: Don Norman, 'The Design of Everyday Things' (Revised and Expanded Edition, 2013, Basic Books)  
Purpose: The AI loads this when it has to design anything humans will use. Extract Don Norman's affordance, sign, mapping, feedback, and conceptual-model framework. The seven stages of action (goal, plan, specify, perform, perceive, interpret, compare). The four kinds of error (slip, mistake, mode, capture). The principles of mapping, feedback, constraints, and discoverability. The rule: design for the person who has never seen the product before. Output 8-10 self-contained chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules — phrased as rules the AI must follow, not observations about humans. Plain English. No corporate-buzzword speak.  

Chapters: 10  
Glossary terms: 26  
Patterns: 7  
Cheatsheet rules: 20  

## When to load this skill

A compact guide for agents that need to create or evaluate products used by people. It contains the essential concepts from Don Norman’s work—affordances, signifiers, mapping, feedback, constraints, conceptual models, error types, and the seven‑stage action cycle—organized into self‑contained chapters that can be loaded individually.

## Core principles

- Affordances are the possible actions an object allows; they may be hidden but must be made visible for users to discover.
- Signifiers are any perceivable cues that tell a user where and how to act; they are the primary communication device in design.
- Good mapping aligns controls with their effects using spatial or cultural analogies so that the relationship is obvious.
- Feedback must be immediate and informative, showing the result of an action and confirming that the system has responded.
- Constraints limit the set of possible actions and guide users toward the correct operation.
- A clear conceptual model lets users predict outcomes, understand failures, and recover without consulting manuals.
- Design must bridge the Gulf of Execution (how to act) and the Gulf of Evaluation (how to tell what happened).
- Always design for the person who has never seen the product before; first‑time usability is the baseline.

## Chapter index

- **ch01 — Affordances and Perceived Affordances** — Explains the difference between real affordances and those that are merely visible. Shows how designers can expose hidden affordances and avoid misleading cues. (load: `chapters/ch01.md`)
- **ch02 — Signifiers and Communication** — Describes how signifiers convey meaning, both intentional (labels, icons) and accidental (traces, patterns), and why they are more important than affordances for discoverability. (load: `chapters/ch02.md`)
- **ch03 — Mapping and Natural Mapping** — Shows how to align controls with their effects using spatial relationships, cultural conventions, and Gestalt principles to make actions intuitive. (load: `chapters/ch03.md`)
- **ch04 — Feedback: Timing and Content** — Explains why feedback must be prompt and informative, and how to avoid over‑ or under‑feedback that confuses users. (load: `chapters/ch04.md`)
- **ch05 — Constraints and Discoverability** — Shows how physical, logical, and cultural constraints limit user actions and help them discover correct usage without trial‑and‑error. (load: `chapters/ch05.md`)
- **ch06 — Conceptual Models and System Image** — Describes how users build mental models from the system image—what they see, hear, and read—and why aligning the two is crucial. (load: `chapters/ch06.md`)
- **ch07 — The Seven‑Stage Action Cycle** — Breaks down human activity into goal, plan, specify, perform, perceive, interpret, and compare, showing where design can support each stage. (load: `chapters/ch07.md`)
- **ch08 — Error Types and Prevention** — Defines slips, mistakes, mode errors, and capture errors, and offers strategies to reduce each through design. (load: `chapters/ch08.md`)
- **ch09 — Designing for First‑Time Users** — Provides a checklist for ensuring that a product can be used correctly by someone who has never seen it before. (load: `chapters/ch09.md`)
- **ch10 — Integrating Principles: A Design Checklist** — Combines all previous concepts into a practical, step‑by‑step checklist that can be applied to any new product. (load: `chapters/ch10.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **affordance** | A property of an object that makes a particular action possible. | ch01 |
| **perceived affordance** | An affordance that a user can see or feel, allowing them to recognize the possible action. | ch01 |
| **signifier** | Any visible cue that tells a user where and how to act. | ch02 |
| **mapping** | The relationship between a control and the effect it produces. | ch03 |
| **natural mapping** | A mapping that uses spatial or cultural analogies so the relationship is obvious. | ch03 |
| **feedback** | Information given to the user after an action, showing the result. | ch04 |
| **constraint** | A limit that prevents incorrect actions and guides the user toward the right one. | ch05 |
| **conceptual model** | The mental picture a user has of how a device works. | ch06 |
| **system image** | All the cues a designer provides—visual, auditory, textual—that form the user's conceptual model. | ch06 |
| **Gulf of Execution** | The gap between a user's goal and figuring out how to act. | ch07 |
| **Gulf of Evaluation** | The gap between performing an action and understanding whether it succeeded. | ch07 |
| **slip** | An error where the intended action is correct but the wrong movement is made. | ch08 |
| **mistake** | An error caused by an incorrect plan or mental model. | ch08 |
| **mode error** | An error that occurs because a control behaves differently in different modes. | ch08 |
| **capture error** | An error where a familiar pattern overrides the intended action. | ch08 |
| **discoverability** | How easily a user can find the correct actions without instructions. | ch05 |
| **visibility** | The degree to which affordances and signifiers can be seen or sensed. | ch01 |
| **mental model** | Another term for conceptual model; the user's internal understanding. | ch06 |
| **visceral level** | Fast, automatic processing that reacts to basic stimuli like danger. | ch10 |
| **behavioral level** | Subconscious processing that handles routine actions and habits. | ch10 |
| **reflective level** | Slow, conscious reasoning used for novel or complex problems. | ch10 |
| **root cause analysis** | A method of repeatedly asking "Why?" to uncover the fundamental goal behind a task. | ch09 |
| **error‑resilient design** | Design that anticipates errors and provides ways to recover gracefully. | ch08 |
| **gesture affordance** | An implied action that can be performed by moving a hand or body part. | ch01 |
| **signifier overload** | When too many cues compete, causing confusion or ignoring important signals. | ch04 |
| **feedback hierarchy** | Prioritizing feedback so critical alerts dominate over routine confirmations. | ch04 |

## Patterns

# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Visible Affordance Pattern

**When to use:** When a user must discover how to interact with a new object.

**Recipe:**

1. Identify the primary actions the object should support.
2. Shape the object (size, texture, movement) so the action is obvious.
3. Test with users who have never seen the object; iterate until the action is guessed correctly.
4. Add a signifier only if the affordance cannot be made fully visible.

**Chapter:** ch01

---

## Signifier Placement Pattern

**When to use:** When an action is possible but not obvious from the object's shape alone.

**Recipe:**

1. Locate the exact spot where the user must act.
2. Add a visual or auditory cue (label, icon, sound) directly at that spot.
3. Ensure the cue contrasts with the background and is legible under normal lighting.
4. Validate that users follow the cue without consulting a manual.

**Chapter:** ch02

---

## Spatial Mapping Pattern

**When to use:** Designing controls for multiple related functions (e.g., lighting panels, vehicle steering).

**Recipe:**

1. Arrange controls in the same spatial order as the elements they control.
2. Use consistent orientation (e.g., up = increase, left = decrease).
3. Group related controls together and separate unrelated ones.
4. Check that a first‑time user can predict which control affects which element.

**Chapter:** ch03

---

## Immediate Feedback Pattern

**When to use:** Any action that changes the state of a system.

**Recipe:**

1. Provide a response within 0.1 seconds of the user’s input.
2. Make the feedback convey the new state (e.g., change color, show a progress bar).
3. Use the same modality the user is currently attending to (visual if looking, auditory if eyes are elsewhere).
4. Avoid adding extra, unrelated signals that could mask the primary feedback.

**Chapter:** ch04

---

## Constraint‑Guided Design Pattern

**When to use:** When the device could be misused or damaged by incorrect actions.

**Recipe:**

1. Identify actions that must be prevented.
2. Apply physical constraints (shape, size, lock) to block those actions.
3. If physical constraints are impossible, use logical constraints (disable buttons, require confirmation).
4. Make the constraint visible so the user understands why an action is unavailable.

**Chapter:** ch05

---

## Conceptual Model Alignment Pattern

**When to use:** When the product’s controls do not clearly indicate their function.

**Recipe:**

1. Create a simple mental model that explains the relationship between controls and outcomes.
2. Design the system image (shape, labels, icons) to match that model.
3. Provide feedback that reinforces the model after each action.
4. Test with users to ensure their mental model matches the intended one.

**Chapter:** ch06

---

## Error‑Resilient Interaction Pattern

**When to use:** Any interface where slips, mistakes, mode or capture errors are likely.

**Recipe:**

1. Make the most common action visible and easy to perform.
2. Add confirmation steps for high‑risk actions (e.g., “Are you sure?”).
3. Display the current mode prominently.
4. Design unique signifiers for each context to avoid capture errors.

**Chapter:** ch08

---

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## design

- Show the action before the user asks how to do it.
- Never rely on a label alone; pair it with a visible affordance.
- Place a control where its effect occurs.
- Give feedback within a tenth of a second.
- Use a single, clear cue for each action.
- Block impossible actions with physical shape.
- Make the current mode visible at all times.
- Use cultural conventions for up/down, left/right when no natural mapping exists.
- Prioritize alerts: critical > warning > informational.
- When two controls look alike, add a distinguishing signifier.
- Avoid hidden modes; if a mode exists, highlight it.
- Use the same signifier across similar devices to build familiarity.
- Design for the worst‑case user: low vision, limited dexterity, no prior knowledge.
- Keep the system image consistent across all documentation and packaging.

## process

- Design for the user who has never seen the product.
- Test the full seven‑stage cycle with a first‑time user.
- If a user must read a manual, the design has failed.
- Limit the number of steps a user must remember.
- If an error occurs, show the cause and the next correct step.
- When adding a new feature, ask what goal it serves; if none, discard it.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

