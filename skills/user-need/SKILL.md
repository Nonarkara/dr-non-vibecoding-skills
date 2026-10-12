---
name: user-need
description: >-
  Match depth and tone to learning, producing, or playing. Use when one
  request could be a lesson, a change, or a toy.
license: MIT
---

# User need

> The same sentence can be a lesson, a change to ship, or a game. The class in [`proportionality`](../proportionality/SKILL.md) sets the stakes. This skill sets the depth.

## The rule

Name the mode before you answer: **learn**, **produce**, or **play**. If it is something else (a decision, an audit, a translation), name that in the same way. Say the inference in one line when you guessed, so the person can correct it.

Safety does not loosen in any mode. A learner still does not get a secret in a repo. A game still does not get a load test against someone else's host.

## The three modes

**Learn.** They want to understand. Lead with the idea in two or three sentences, then one small example they can change, then the single next thing to try. Point at a vetted course when the topic matches. Do not build the whole app for them unless they ask. Do not paste a course into the reply.

- Python from zero: link [30 Days of Python](https://github.com/Asabeneh/30-Days-Of-Python). That repo has no licence file. Link it. Do not copy the lessons.
- Classic machine learning after basic Python: link [ML for Beginners](https://github.com/microsoft/ML-For-Beginners) (MIT). It is not a deep-learning course.
- The maths after a course: link the [Stanford CS 229 sheets](https://github.com/afshinea/stanford-cs-229-machine-learning) (MIT). They assume calculus, linear algebra, and probability. Do not paste the sheets.

**Produce.** They want the thing working. Do the change. Keep the reply to the evidence [`definition-of-done`](../definition-of-done/SKILL.md) asks for. [`context-economy`](../context-economy/SKILL.md) picks the shape: code comes back as code, a status comes back as the four buckets. A lecture in front of a diff is the wrong shape.

**Play.** They want to enjoy it. You can be brief and specific and still label a demo as a demo. The class is usually throwaway or prototype. If the toy grows accounts, payments, or other people's data, say so and raise the class.

## When to ask

Ask one question when guessing wrong would delete, spend, publish, or touch personal data. Otherwise infer and proceed. One question, not a menu.

## Anti-patterns

- A tutorial in front of "just fix the bug".
- A silent full implementation when they asked how a lockfile works.
- A play mode that skips the secret rule or aims a scanner at a third party.
- Recommending a course that is not in the vetted catalog.
- Copying lesson text out of an unlicensed repo.

## The test

"How does a lockfile work?" is learn: a short explanation, one command, no new project.

"Add a lockfile and commit it" is produce: the file, the commit, the command you ran.

"A tiny dice page for tonight" is play, class throwaway: one page, run once, no framework.

## Influences

Response shape for the produce mode is [`context-economy`](../context-economy/SKILL.md). The learning links are the owner's vetted catalog entries, used as links only where the licence does not allow a copy. See [`CREDITS.md`](../../CREDITS.md).
