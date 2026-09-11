---
name: diagram-design
description: Use when a diagram must be made (architecture, flow, sequence, state, comparison). The 7 rules for diagrams that survive being looked at. Pairs with radar-chart-pattern.
license: MIT
---

# Diagram Design

> A diagram is an argument about a system. Every shape, every arrow, every label is a claim. The discipline below is the path of making diagrams where the claim is *true*, the claim is *legible*, and the diagram survives being looked at by someone who has not seen the system.

This skill is the *decision logic* for making a diagram — a visual artifact that communicates a system, a process, a relationship, or a comparison. The trigger is the moment an agent or designer needs to communicate something that prose cannot carry, or cannot carry as efficiently: the architecture of a system, the flow of a process, the state of a machine, the comparison of two options, the timeline of a sequence.

The discipline is the same whether the diagram is drawn in Mermaid, excalidraw, Figma, ASCII art, or a napkin. The medium is a constraint; the *path* is universal.

**Provenance:** distilled from three converging practices — the Mermaid / excalidraw / Graphviz ecosystem (the most common agent-facing diagram tools), the Edward Tufte minimal-data-ink principles (the discipline of *less*), and the repo's own [`radar-chart-pattern`](../radar-chart-pattern/SKILL.md) (the specific chart type), [`narrative-companion-surfaces`](../narrative-companion-surfaces/SKILL.md) (the show-the-work discipline), and [`beyond-the-screen`](../beyond-the-screen/SKILL.md) (the deliverable discipline).

---

## The 7 rules

Every diagram is a *claim*. The 7 rules are the discipline of making the claim *true*, *legible*, and *durable*.

### 1. Pick the right diagram type for the claim

A diagram is not a *shape*; it is a *claim about a system*. The claim picks the type:

| Claim | Type | Example |
|---|---|---|
| A system has *parts* | **Component diagram** | The boxes-and-arrows architecture |
| A system has *states* | **State diagram** | The FSM of a checkout flow |
| A system has *sequence* | **Sequence diagram** | The actor-message-time arrows |
| A system has *flow* | **Flowchart** | The yes/no decision tree |
| Two things are *compared* | **Comparison table** | The side-by-side grid |
| A number *changes over time* | **Line chart** | The x-axis time, y-axis metric |
| A number *breaks down into parts* | **Stacked bar / pie** | The 100% composition |
| Two variables *correlate* | **Scatter** | The x vs y point cloud |
| A direction is *favored* | **Radar / polar** | The n-axis weighted dimensions |
| A *position* is the message | **Map** | The geo annotation |

If the agent picks the *wrong type*, no amount of polish will make the diagram legible. The right type is the *first* decision.

### 2. Name the diagram in the title

Every diagram needs a title that names the *claim*, not the *system*. Compare:

- "System architecture" (the system) — useless
- "How a request flows from the browser to the database and back, in 4 steps" (the claim) — useful

The title is the *first sentence* of the diagram's argument. If the title does not name the claim, the diagram does not have a claim.

### 3. Encode time with position, magnitude with size, relationship with proximity

The 3-encoding discipline:

- **Time is encoded by position** (left-to-right, or top-to-bottom). A reader's eye follows the arrow.
- **Magnitude is encoded by size** (longer bars, larger circles, thicker lines). A reader's eye compares the sizes.
- **Relationship is encoded by proximity** (closer = more related). A reader's eye groups by proximity.

A violation of any of the three is a *lie* in the diagram. The reader sees a relationship the diagram does not intend; the reader misses a magnitude the diagram does not encode. The discipline is the *honesty* of the visual.

### 4. Label what matters; remove what doesn't

A diagram's load-bearing elements are the ones the *reader needs to act on*. The discipline:

- **Label the load-bearing elements** (the arrows, the boxes, the edges). The label is the *action* the reader will take.
- **Remove the non-load-bearing elements** (the meta-boxes, the meta-arrows, the meta-text). A "User" box that points to nothing is decoration.
- **Remove the redundant labels** (a box labeled "API" with an arrow labeled "calls API" — the label is on the arrow, not the box).

A diagram with 10 elements is harder to read than a diagram with 5. The discipline is *the diagram is the *minimum* set of elements that conveys the claim*.

### 5. Use the discipline of contrast

A diagram that uses one color is invisible. A diagram that uses too many colors is noise. The discipline:

- **One color for the primary claim** (the thing the reader should look at first).
- **One color for the contrast** (the thing the reader should compare the primary to).
- **One color for the supporting elements** (the things the reader should know are *there*, but not focus on).
- **No color for the rest.** The rest is decoration; the rest is the *background*.

A diagram with 7 colors is *not* a richer diagram; it is a *louder* diagram. The discipline is *the diagram is *calm* where it can be, *loud* where it must be*.

### 6. Encode the message, not the system

The discipline of *what the diagram is about*:

- The diagram is *about a claim*. The claim is the title. The elements are the *evidence* for the claim.
- The diagram is *not* about the system. The system is the *context* for the claim.
- The diagram is *not* a literal map. The diagram is a *visual argument*. Arrows that point left can be right (if the *flow* is right-to-left). Boxes that are not square can be circles (if the *shape* carries the claim).

A diagram that maps the system 1:1 is a *map*. A diagram that maps the *claim* is a *diagram*. The discipline is the diagram carries the claim; the system is the source of the claim, not the diagram.

### 7. Make the diagram survive being looked at

A diagram that survives being looked at is a diagram that:

- Can be understood in 5 seconds by someone who has not seen the system.
- Can be re-drawn by the reader from memory after one viewing.
- Can be cited (the diagram is the *citation* for the claim).
- Can be wrong (the diagram's claim can be falsified by the system).

A diagram that does not survive being looked at is a diagram that:

- Requires 5 minutes of explanation to be understood.
- Cannot be re-drawn from memory.
- Cannot be cited (the diagram is *the system*, not the *claim about the system*).
- Cannot be wrong (the diagram is decoration).

The discipline is the diagram is the *simplest* visual artifact that carries the claim. The simpler the diagram, the more durable.

---

## The corollary disciplines

### 1. The Mermaid discipline

When the diagram is Mermaid (the most common agent-facing format), the discipline:

- Use `flowchart TD` or `flowchart LR` for the direction. Be explicit.
- Use `subgraph` for grouping. The grouping carries the relationship.
- Use `-->|label|` for the arrow label. The label carries the action.
- Avoid `classDef` unless the colors carry the claim. Color without a claim is decoration.
- Keep the diagram under 30 nodes. A 30-node diagram is hard to read; a 50-node diagram is unreadable.

Mermaid is fast to write and easy to share. The cost is that Mermaid has a limited vocabulary; the agent should not try to express *every* detail in the Mermaid. The diagram is a *summary*.

### 2. The excalidraw discipline

When the diagram is excalidraw (the most common hand-drawn-aesthetic tool), the discipline:

- Hand-drawn is the *look*, not the *substance*. The substance is still the claim.
- Use boxes for components, arrows for flow, colors for the primary/contrast/supporting discipline.
- Avoid the "everything is a box" anti-pattern. Use shapes that carry meaning (circles for states, diamonds for decisions, cylinders for data).
- Keep the diagram under 20 elements. excalidraw is fast; the agent can iterate.

### 3. The ASCII discipline

When the diagram is ASCII (the most universal format), the discipline:

- Use `+--+` and `|  |` for boxes.
- Use `-->` and `v` for arrows.
- Use `R1 --> R2` for relationships.
- Keep the diagram under 30 columns; wrap if necessary.

ASCII diagrams are the most portable; they render in any terminal, in any markdown, in any text field. The cost is that ASCII is limited to boxes and arrows; the agent should not try to express *flow* or *sequence* in ASCII.

### 4. The "delete the box" test

When the diagram is finished, the agent runs the *delete-the-box* test:

- For each box, ask: *if I delete this box, is the claim still legible?* If yes, the box is decoration; remove it.
- For each arrow, ask: *if I delete this arrow, is the claim still legible?* If yes, the arrow is decoration; remove it.
- For each label, ask: *if I delete this label, is the claim still legible?* If yes, the label is decoration; remove it.

The diagram is *legible* when the *minimum* set of elements carries the *claim*. A diagram that survives the delete-the-box test is a diagram that survives being looked at.

### 5. The "wrong by what" test

When the diagram is finished, the agent runs the *wrong-by-what* test:

- For each element, ask: *what would have to be true for this element to be wrong?* If the answer is "I don't know," the element is a *claim* the agent is not prepared to defend. The element is either *removed* (if the claim is not load-bearing) or *clarified* (if the claim is load-bearing).

A diagram is *defensible* when every element can be wrong by something. A diagram that is not defensible is a diagram that *looks* right but is *not* right.

### 6. The "memory of the diagram" test

When the diagram is finished, the agent runs the *memory* test:

- Show the diagram to someone who has not seen the system. Wait 10 seconds. Take the diagram away.
- Ask: *what is the diagram claiming?* If the answer matches the title, the diagram is *legible*. If the answer does not match, the diagram is *not legible*; the title is wrong, or the elements are wrong, or both.

A diagram that survives the memory test is a diagram that carries the claim. A diagram that does not survive the memory test is a diagram that *looks* like a diagram but is *not* a diagram.

---

## What this skill is *not*

- It is not a substitute for the data. The diagram is the *visual argument*; the data is the *evidence* for the argument. The two stack: data first, diagram second.
- It is not a substitute for prose. A diagram is a *summary*; a long-form explanation is the *detail*. The agent should not try to express *every* detail in the diagram.
- It is not a substitute for the system. The diagram is a *claim* about the system. A diagram that is the system (a literal map) is *not* a diagram; it is a map. The discipline is the diagram carries the claim.
- It is not a substitute for the user's understanding. The diagram is the *start* of the conversation, not the end. A diagram that the user looks at and walks away is a diagram that did not do its job.

## Pairs with

- [`radar-chart-pattern`](../radar-chart-pattern/SKILL.md) — the weighted-dimensions chart type. The radar is one diagram type; this skill is the *general* discipline.
- [`beyond-the-screen`](../beyond-the-screen/SKILL.md) — the deliverable discipline. A diagram is one deliverable; a deck is another; a doc is another. The discipline is the same.
- [`narrative-companion-surfaces`](../narrative-companion-surfaces/SKILL.md) — the show-the-work discipline. A diagram is a companion surface for an essay; the essay carries the prose, the diagram carries the visual.
- [`aesthetics-and-economy`](../aesthetics-and-economy/SKILL.md) — the durability category. A diagram that survives 10 years is *generative*; a diagram that survives 10 minutes is *decorative*.
- [`no-ai-tells`](../no-ai-tells/SKILL.md) — the visual tells. A diagram that is *recognizably agent-built* is a diagram that does not carry the claim; the claim is the *AI built this*, not the *system*.
- [`adrian-martinez-curated-web-design-skills-2026`](../adrian-martinez-curated-web-design-skills-2026/SKILL.md) — the 5-axis "Why it works" form. The diagram is the *Why it works* in visual form.

## Check

A "diagram" is *ready* to ship when:

- The right diagram type is picked for the claim (the table at the top).
- The diagram is named in the title (the title is the claim, not the system).
- The 3-encoding discipline is followed: time = position, magnitude = size, relationship = proximity.
- The load-bearing elements are labeled; the non-load-bearing elements are removed.
- The contrast discipline is followed: one color for the primary, one for the contrast, one for the supporting.
- The diagram is *about the claim*, not the system.
- The diagram survives being looked at (the memory test).
- The diagram survives the delete-the-box test (the minimum set of elements carries the claim).
- The diagram survives the wrong-by-what test (every element is defensible).
- The diagram is the *minimum* visual artifact that carries the claim.
