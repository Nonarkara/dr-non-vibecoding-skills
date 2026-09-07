---
name: lesson-residue
description: >-
  A hard session is not finished until the lesson is written. Use at the end of
  a painful, surprising, or expensive pass — before you say done, before you
  context-compact, before you walk away. Do not use after a typo fix.
license: MIT
inspired-by:
  - https://github.com/EveryInc/compound-engineering-plugin
---

# Lesson Residue

> Each unit of work should make the next unit easier — not harder.

Compound Engineering's whole pitch is the return arrow: `/ce-compound` writes what you learned so the next `/ce-plan` can read it. This practice already had the artifact — `docs/lessons/YYYY-MM-DD-<slug>.md` and a dated gotcha in the project contract. The hole was **behaviour**: playbook 01 says the step always feels optional, so agents skip it.

This skill makes it a close-out, not a nice-to-have.

---

## When it fires

Write residue if any of these happened:

- Production, a deploy, or a human was wrong for more than a few minutes
- You discovered a gotcha that is not already in the contract
- You refused a tempting approach (the next agent will re-propose it)
- An agent "cleaned up" something load-bearing
- The watchdog, the CDN, or the tunnel lied

Skip: formatting, one-line copy, a test you expected to fail and did.

---

## What to write (the template already exists)

Use [`templates/lesson.md.template`](../../templates/lesson.md.template). Minimum viable:

1. **Verbatim ask** — the user's words, not your paraphrase
2. **What landed** — files and the one design decision, not a code summary
3. **Patterns borrowed / refused** — steal the idea, name the refuse
4. **Honest limits**
5. **CPDT trace** if anything shipped
6. **One line for the next agent** — a principle that changes a future decision

If it will happen again on this project, also add a **dated gotcha** to the Tier 2 contract (`CLAUDE.md` / `AGENTS.md`). The lesson is the story; the gotcha is the tripwire.

[`agent-memory`](../agent-memory/SKILL.md) is where the file lives. This skill is *when you are not allowed to leave without it.*

---

## Anti-patterns

- "I'll write the lesson tomorrow" — intent decays faster than code
- A lesson that only restates the commit message
- Capturing secrets, tokens, or private hosts into `docs/lessons/`
- A 2,000-line dump. The one-line-for-the-next-agent is the payload; the rest is evidence

---

## The test

A cold agent, next month, can read the one line and not repeat the same failure. If the file does not change a future decision, it is a diary entry — rewrite the last line.
