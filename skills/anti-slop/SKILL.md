---
name: anti-slop
description: >-
  Catch banned patterns in generated code, interface, and prose before they
  ship. Use when a diff or a page looks machine-made.
license: MIT
---

# Anti-slop

> One pass, three surfaces. A hit is a rewrite. Then the pass runs again.

This is the short card. The tests and the long lists already live in [`code-slop-patterns`](../code-slop-patterns/SKILL.md), [`no-design-tells`](../no-design-tells/SKILL.md), [`design-slop-field-guide`](../design-slop-field-guide/SKILL.md), [`no-ai-tells`](../no-ai-tells/SKILL.md), and [`slop-detect-stack`](../slop-detect-stack/SKILL.md). Load those when a hit needs the full rule. Do not restate them here.

## The rule

Before you call generated code, UI, or prose finished, name every hit as `file:line` or quote the sentence. Zero hits, or a rewritten hit, is the pass. "Looks fine" is not a result.

## Code

Fail the diff when you see any of these without a reason on the same line:

- A type or lint suppression (`as any`, `@ts-ignore`, `# noqa`, `# type: ignore`, `eslint-disable`).
- An exception handler whose body is empty, `pass`, or a bare log.
- A `TODO` or `Not implemented` left as the body of the change.
- An import or call that does not resolve in this tree.
- The same helper written twice in the diff.

The twelve detection rules are in [`code-slop-patterns`](../code-slop-patterns/SKILL.md).

## Interface

Fail the surface when any of these is the unchosen default:

- A font the design system did not name. The hard-gate list is in [`no-design-tells`](../no-design-tells/SKILL.md).
- An indigo or violet gradient used as the accent.
- Three identical cards with no different job.
- A hero sentence that would fit a different product if you swapped the noun.
- A `<meta name="generator">` that names the builder.

[`design-slop-field-guide`](../design-slop-field-guide/SKILL.md) is the field list from real flood apps, each with a test. A layout change still goes through [`see-and-revise`](../see-and-revise/SKILL.md).

## Don't make users do the backend's job

The system infers, defaults, and saves. The screen shows an exception, or a decision that needs a person. A control for a fact the system already holds is a hit. A picture that adds no fact is a hit.

ครูชีต is the attendance card Non pointed at. The phone is class ม.2/3 maths. Each visible student has a chip for มา, สาย, ลา, and ขาด: a tap per student per status. Four tiles above the list repeat those same counts. A green button asks the teacher to save the roll for 32 people. The page is a pale mint frame with stock 3D icons (clipboard, calendar, document, books, cap). The useful fact, that the rows live in the teacher's own Google Sheet and the maker cannot see the students, sits in a footnote under the phone.

For each input or tap on a screen:

1. Could the system know this already?
2. Could it be a default, so the person changes only the exception?
3. Does this need a save step?

A yes on 1 or 2, or a save step for a change the person just made, is a hit. Rewrite so the person acts only where a human decision is required.

## Prose

Fail the paragraph when any of these is true:

- The first sentence delays the fact ("In today's world", "It's important to note").
- A sentence announces itself ("Let's dive in", "Here's the thing").
- Three sentences in a row have the same length and shape.
- A metaphor is explained in the next sentence.
- Two or more words from the banned list in [`no-ai-tells`](../no-ai-tells/SKILL.md) §1.1 appear in one short passage.

Questions to ask, in your own words, before sending: does the sentence state the fact? Can a sentence be deleted without losing a fact? Does the paragraph trust the reader?

## What this card does not adopt

[stop-slop](https://github.com/hardikpandya/stop-slop) is MIT and useful as a prose pass. Its bans on em dashes, on every adverb, and on question-word openers are opinionated. This repo's voice uses em dashes. The owner's catalog says to merge that skill with your own style guide, so those three bans stay out. The word list we enforce is the one already in `no-ai-tells`.

## Anti-patterns

- A new 40-rule pack beside the four skills that already fire.
- Scoring prose with someone else's point scale and treating the number as proof.
- Cleaning the prose while leaving `as any` in the diff.
- Running this pass and skipping the test that shows the behavior.

## The test

Take a 20-line generated diff and one generated paragraph. The pass names each hit and the rewrite. A pass that says "no slop" and quotes nothing has not run.

## Influences

Format of a short triggerable skill: [Anthropic's skill authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) (the description is the trigger; the body stays a procedure). Prose pass: [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop), MIT, paraphrased, phrase list not copied. Code and UI lists point at this repo's existing skills rather than a second copy.
