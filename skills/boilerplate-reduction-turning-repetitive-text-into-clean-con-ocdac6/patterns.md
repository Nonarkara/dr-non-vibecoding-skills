# Patterns

Reusable moves extracted from the source. Each is a recipe — context, then steps, then the chapter to read for the full argument.

## Detect Repeated Sentences

**When to use:** When a draft feels bloated or repetitive.

**Recipe:**

1. Run a search for identical lines.
2. Count occurrences of each line.
3. Flag any line that appears more than three times.

**Chapter:** ch01

---

## Classify Repetition

**When to use:** After detecting repeated lines, decide what to keep.

**Recipe:**

1. Ask if the line conveys unique information.
2. Check if it functions as a structural cue.
3. Determine if its removal would break flow.

**Chapter:** ch02

---

## Replace with Token

**When to use:** When pure filler is identified.

**Recipe:**

1. Delete all but the first occurrence of the repeated line.
2. Insert a token like {{PLACEHOLDER}} where the line was removed.
3. Add a comment explaining the token's purpose.

**Chapter:** ch03

---

## Validate Post‑Cleanup Flow

**When to use:** After cleaning a document.

**Recipe:**

1. Read the document from start to finish.
2. Check for missing references or broken transitions.
3. If issues appear, re‑insert minimal clarifying text.

**Chapter:** ch04

---

## Automate with Script

**When to use:** For large documents or repeated tasks.

**Recipe:**

1. Write a script that builds a frequency map of lines.
2. Replace lines with a token when count > 3.
3. Output a revised file with a comment block of changes.

**Chapter:** ch05

---

## Batch Process Multiple Files

**When to use:** When many drafts need the same cleanup.

**Recipe:**

1. Create a folder of source files.
2. Run the automation script on the folder.
3. Review the generated summary logs for each file.

**Chapter:** ch05

---
