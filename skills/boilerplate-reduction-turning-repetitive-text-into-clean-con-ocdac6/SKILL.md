<!-- consolidated by data/scrape/consolidate_skills.py -->

# Boilerplate Reduction: Turning Repetitive Text into Clean Content

> A practical skill for spotting, analyzing, and removing repetitive filler in drafts so that a document becomes concise, readable, and ready for production. Load this skill when a text contains many duplicated sentences or placeholder copy.

Source: (unknown)  
Purpose: test the endpoint  

Chapters: 5  
Glossary terms: 12  
Patterns: 6  
Cheatsheet rules: 10  

## When to load this skill

A practical skill for spotting, analyzing, and removing repetitive filler in drafts so that a document becomes concise, readable, and ready for production. Load this skill when a text contains many duplicated sentences or placeholder copy.

## Core principles

- Repeated sentences signal placeholder content that should be replaced with meaningful copy.
- The first instance of a repeated phrase is the only one that needs to stay; all others are redundant.
- Identify the purpose of the filler before deleting it – it may be a structural cue, a template marker, or an accidental copy‑paste.
- Replace bulk repetition with a single variable or template token to keep the document DRY (Don't Repeat Yourself).
- After cleaning, re‑read the document to ensure logical flow and that no required information was lost.
- A clean document is easier for downstream agents (design, code, translation) to load and act on.

## Chapter index

- **ch01 — Spotting Boilerplate** — Learn how to quickly detect when a text is filled with duplicated sentences and why that matters for downstream work. (load: `chapters/ch01.md`)
- **ch02 — Understanding the Role of the Repeated Text** — Distinguish between intentional placeholders, structural markers, and accidental duplication. (load: `chapters/ch02.md`)
- **ch03 — Condensing Repetition with Tokens** — Learn how to replace bulk repeated sentences with a single token or variable for future content insertion. (load: `chapters/ch03.md`)
- **ch04 — Verifying Logical Flow After Cleanup** — Ensure that removing repeated text does not break the narrative or the document’s hierarchy. (load: `chapters/ch04.md`)
- **ch05 — Automating Boilerplate Reduction** — Introduce simple scripts and tools that can automate detection and replacement of repeated filler. (load: `chapters/ch05.md`)

## Glossary

# Glossary

Terms and named ideas from the source, anchored to the chapter that explains them.

| Term | Definition | Chapter |
| --- | --- | --- |
| **boilerplate** | Repeated placeholder text that adds no unique information. | ch01 |
| **placeholder** | A temporary piece of text that signals where real content will be inserted later. | ch01 |
| **token** | A short marker like {{TOKEN}} used to replace repeated filler. | ch03 |
| **DRY** | Don't Repeat Yourself; a principle to avoid unnecessary duplication. | ch03 |
| **structural cue** | A repeated phrase that serves as a heading or section marker. | ch02 |
| **frequency map** | A data structure that records how many times each line appears in a document. | ch05 |
| **regular expression** | A pattern used to search and manipulate text programmatically. | ch05 |
| **awk** | A command‑line tool for pattern scanning and processing. | ch05 |
| **sed** | A stream editor used to perform basic text transformations. | ch05 |
| **comment block** | A section of notes in the file that explains why changes were made. | ch04 |
| **logical flow** | The smooth progression of ideas without gaps or abrupt jumps. | ch04 |
| **section header** | A line that introduces a new part of the document, often repeated for formatting. | ch02 |

## Patterns

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

## Cheatsheet

# Cheatsheet

Imperative decision rules from the source, grouped by category. Each is the kind of sentence you would write on an index card.

## process

- If a sentence appears more than three times, treat it as filler.
- If a token appears, ensure its meaning is documented nearby.

## writing

- Keep only the first instance of any repeated line.

## code

- Replace bulk filler with a clear token like {{TOKEN}}.
- Use a comment block to document every automated replacement.
- Run a regex search for '^(.+)$' and count matches to find repeats.

## design

- Never delete a repeated line if it serves as a heading.

## life

- After cleanup, read the whole document aloud to catch flow breaks.
- If you are unsure about a repeated line, ask the author before deleting.

## general

- When automating, back up the original file first.

## How to use this skill

This single SKILL.md is everything an AI agent needs to act on this book. The core principles are the load-bearing claims; the glossary defines the vocabulary; the patterns are reusable moves; the cheatsheet is the imperative "do this, not that" rules. The chapter files under `chapters/` are deep dives — load a chapter only when a single principle / pattern / rule needs the underlying argument. The chapter index above tells you which one.

