# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Observe then co‑create with users

**When to use:** When starting a new interaction design and you lack clear user goals.

**Recipe:**

1. Find a small group of representative users who will actually use the system.
2. Ask them to show you how they currently achieve the goal, noting pain points.
3. Invite them to sketch or describe a better way, then build a quick prototype of that idea.
4. Test the prototype with the same users, observe where they hesitate or err, and refine.

**Chapter:** ch01

---

## Blank screen experiment

**When to use:** When you need to discover the most natural way users would manipulate an object with a new input device.

**Recipe:**

1. Give the user a blank screen and only the input device (e.g., mouse, stylus).
2. Present a simple task (e.g., delete a word, insert a sentence) using a paper reference.
3. Ask the user to describe aloud what they would do with the device.
4. Transcribe their description into concrete interaction rules (e.g., point‑then‑type for insert).

**Chapter:** ch03

---

## Iconic spatial metaphor

**When to use:** When you need to represent files, commands, or concepts that users must recognize quickly.

**Recipe:**

1. Identify a real‑world object that users already associate with the concept (e.g., folder for documents).
2. Sketch a simple, recognizable silhouette of that object, avoiding unnecessary detail.
3. Test the icon with users: can they name its meaning without explanation?
4. Iterate until the icon is instantly recognizable, then use it consistently.

**Chapter:** ch02

---

## Reduce modes via double‑click

**When to use:** When a multi‑button input device causes frequent mode errors or you want to keep the device simple.

**Recipe:**

1. Map a single click to a primary action (e.g., place cursor or select).
2. Map a rapid double‑click in the same spot to a secondary action (e.g., select word).
3. Optionally map a triple‑click to a tertiary action (e.g., select sentence).
4. Test with novices and experts to ensure the timing feels natural and does not cause accidental triggers.

**Chapter:** ch04

---

## Cut/paste buffer model

**When to use:** When you need to let users move or duplicate content within a document.

**Recipe:**

1. Define a selection mechanism (click‑drag, double‑click, etc.) that highlights the target.
2. Provide a ‘cut’ command that removes the selection and stores it in a temporary buffer.
3. Provide a ‘paste’ command that inserts the buffer contents at the current cursor position.
4. Optionally add a ‘copy’ command that leaves the original intact while storing to buffer.

**Chapter:** ch04

---

## Cursor between characters for insertion

**When to use:** When users find it unclear where new text will appear after clicking.

**Recipe:**

1. Render the insertion point as a thin vertical line (or blinking caret) positioned between two characters.
2. Ensure that clicking anywhere on a character positions the cursor either before or after it based on horizontal click location.
3. Make the cursor blink or change shape to draw attention to the active insertion point.
4. Verify that typing inserts text visibly after the left character, matching user expectation.

**Chapter:** ch04

---

## Three‑pane browser

**When to use:** When users need to navigate a hierarchy (classes→methods→code, folders→files→contents) and edit the leaf item.

**Recipe:**

1. Create three side‑by‑side panes: top‑left for the first level list (e.g., classes), top‑right for the second level list (e.g., methods), bottom for the detail view (e.g., source code).
2. Give each pane its own independent scroll bar so users can browse before committing.
3. Make the detail view editable using the same edit commands used elsewhere in the system.
4. Highlight the selected item in each list to keep context clear.

**Chapter:** ch05

---

## Persistent top‑edge menu bar

**When to use:** When you want commands to be always reachable without memorizing deep hierarchies.

**Recipe:**

1. Place a horizontal strip at the very top of the screen, spanning the full width.
2. Distribute menu titles evenly within the strip; clicking a title shows its pull‑down menu beneath it.
3. Make the menu bar a constant visual target: users only need to get the horizontal position right; vertical position can be anywhere at or above the top edge.
4. Provide keyboard shortcuts and visual highlighting for the active menu to speed up expert use.

**Chapter:** ch06

---

## Constraint‑first ideation

**When to use:** When faced with limits on budget, hardware, or time that seem to block innovation.

**Recipe:**

1. Write down the concrete constraints (e.g., max cost, CPU speed, memory, desired price point).
2. Ask: ‘What is the simplest interaction that satisfies the user goal within these limits?’
3. Brainstorm solutions that explicitly use the constraint as a feature (e.g., a white background to enable WYSIWYG despite power concerns).
4. Prototype the most promising constraint‑driven idea and test it with users to confirm it feels better, not just cheaper.

**Chapter:** ch07

---

## Designer‑engineer day‑night loop

**When to use:** When you need to explore many interaction ideas quickly and validate them with real users.

**Recipe:**

1. Pair a builder (who can code prototypes fast) with an evaluator (who can run user tests).
2. At night, the builder creates a testable artifact of one interaction idea.
3. During the day, the evaluator runs the artifact with novice users, notes where they succeed or struggle, and gives a concise debrief.
4. The next night, the builder revises the artifact based on the debrief, then starts the next cycle.

**Chapter:** ch08

---
