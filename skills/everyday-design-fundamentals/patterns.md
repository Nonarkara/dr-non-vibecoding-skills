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
