---
name: ponytail
description: >-
  YAGNI decision ladder: does it need to exist, is it in the codebase, does
  stdlib do it, can it be one line, then the minimum. Use before writing
  any code.
license: MIT
---

# Ponytail

> The rule was never "fewest tokens." It is: write only what the task needs, and never cut validation, error handling, security, or accessibility.

The YAGNI ladder, before any code. Seven rungs; the agent stops at the first rung that holds.

```
1. Does this need to exist?            → no: skip it (YAGNI)
2. Already in this codebase?           → reuse it, don't rewrite
3. Stdlib does it?                     → use it
4. Native platform feature?            → use it
5. Installed dependency?               → use it
6. One line?                           → one line
7. Only then: the minimum that works
```

**~54% less code (up to 94%) · ~20% cheaper · ~27% faster · 100% safe.** Measured on real Claude Code sessions editing a real open-source repo, against the same agent with no skill. The numbers are the by-product; the discipline is the ladder.

This skill is the agent-facing form of [DietrichGebert/ponytail](https://github.com/dietrichgebert/ponytail), MIT-licensed, with credit. The upstream ships as a multi-host plugin (Claude Code, Codex, Cursor, GitHub Copilot CLI, OpenCode, Gemini CLI, Pi, Swival, Hermes, Qoder, Devin, OpenClaw, Grok Build, etc.); this skill is the same ladder written for this repo's voice and paired with the rest of the collection.

Influence: [DietrichGebert/ponytail](https://github.com/dietrichgebert/ponytail) (the ladder), [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) (the surgical-edit baseline), [`ninja-innovation`](../ninja-innovation/SKILL.md) (the subtract-before-add discipline).

---

## The seven rungs, in detail

The ladder is read **top to bottom, not bottom to top**. A senior dev reads the same way: is the thing needed at all, before deciding how to write it. The mistake the ladder prevents is the one most agents make by default — they start writing at rung 7 because the prompt asked for code.

### 1. Does this need to exist?

The first question is not "how do I write this," it is "do I write this at all." A date picker that the user clicks once does not need a library, a wrapper component, a stylesheet, a discussion about time zones. It needs `<input type="date">`. The agent that skips this rung ships fifty lines where the senior dev ships one.

The signal that rung 1 holds: the user prompt names a thing the user *thinks* they need, but the user is not the senior dev. The senior dev's job is the question the agent is too eager to skip.

### 2. Already in this codebase?

The agent reads the tree, finds the existing helper, and uses it. The mistake this rung prevents: a new utility that does the same thing as a helper the codebase already has. A new `formatDate` when the codebase already exports a `formatDate`. A new `parseUser` when the user object has its own parser. The agent that skips this rung ships a parallel implementation; the codebase ends up with two ways to do the same thing; the next agent has to choose.

The signal that rung 2 holds: the tree is large enough that a re-read of the relevant subtree is part of "writing the change," not part of "investigating the change."

### 3. Stdlib does it?

The standard library of the language the agent is writing in does most of what the prompt names. The mistake this rung prevents: a new file with one function that is one line of stdlib. A new `truncate` helper when the language has `String#slice`. A new `assert` helper when the language has `assert` in the standard library. The agent that skips this rung ships code that exists twice; the next agent has to learn which is the "real" one.

The signal that rung 3 holds: the function would be a one-line wrapper around a function that the language ships with.

### 4. Native platform feature?

The runtime the agent is writing for — the browser, the Node version, the Postgres version, the React version — has a feature for what the prompt names. The mistake this rung prevents: a hand-rolled implementation of a platform feature. A new modal library when the platform has `<dialog>`. A new date format library when the platform has `Intl.DateTimeFormat`. A new state library when React has `useState`. The agent that skips this rung ships a third-party for what the platform already gave them.

The signal that rung 4 holds: the platform has shipped the feature in a version the codebase already targets.

### 5. Installed dependency?

The project already pulls in a library that does the thing. The mistake this rung prevents: a new dependency for what an existing dependency does. A new `date-fns` when the codebase already has `dayjs`. A new `axios` when the codebase already has `fetch`. The agent that skips this rung ships a parallel API; the bundle gets bigger; the security surface gets bigger; the next agent has to learn which is the "real" one.

The signal that rung 5 holds: a quick `grep` of the existing `package.json` / `requirements.txt` / `go.mod` finds the helper.

### 6. One line?

If the function the agent is about to write is a one-liner, write the one-liner. Don't split it into a helper, a comment, a type annotation, and a test for a one-liner. The mistake this rung prevents: a multi-line function that does what an expression does. A multi-line `isEmpty` when `!x || x.length === 0` is one expression. A multi-line `clamp` when `Math.max(lo, Math.min(hi, x))` is one expression.

The signal that rung 6 holds: the function is short enough that a single expression captures it.

### 7. Only then: the minimum that works

If none of the above holds, *then* write the minimum code. "Minimum" means: handles the happy path, handles the error path the test catches, does not silently swallow the rest, does not over-abstract, does not add a feature the user did not ask for, does not write a wrapper around a wrapper. The minimum is **disciplined, not lazy**. A minimum that drops validation is a different failure mode and the ladder is the wrong tool for that one.

The signal that rung 7 holds: the code is the smallest thing that lands the task and survives the test.

---

## The "deliberate simplifications" rule

Some simplifications are **not** the ladder. They are choices the team has made — "we don't need TypeScript on this file," "we don't need tests for this prototype," "we don't need i18n for this internal tool." A simplification that the ladder produces is unnamed; a choice the team has made should be named.

The discipline: **mark every deliberate simplification with a comment that names the ceiling and the upgrade path.** A one-line comment above the simplified code:

```ts
// Ponytail ceiling: no error handling for unreachable paths.
// Upgrade: replace with `result-honesty` four-bucket status when this ships.
```

The comment is **the receipt**. A reviewer who finds the simplified code can find the comment, can find the rationale, can find the upgrade path. The next agent who picks up the code does not have to re-derive the choice; the comment is the choice.

A simplification without the comment is a choice nobody made; the next agent will assume the choice was an oversight and "fix" it. A simplification with the comment is a choice the team made; the next agent respects the choice and the comment.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The seven rungs | [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) | The coding discipline aims for surgical edits; the ladder is the pre-edit discipline. Apply the ladder *before* the karpathy-guidelines. |
| The "simplifications are choices" rule | [`ninja-innovation`](../ninja-innovation/SKILL.md) | The subtract-before-add discipline says "remove before re-adding"; the simplification rule says "name what you removed." |
| The "stdlib / platform / dep" rungs | [`no-design-tells`](../no-design-tells/SKILL.md), [`dashboard-discipline`](../dashboard-discipline/SKILL.md) | The design discipline says "don't ship the agent-default look"; the ladder says "use what the platform gave you before reaching for a library." |
| The "mark the ceiling" rule | [`lesson-residue`](../lesson-residue/SKILL.md) | The comment that names the ceiling is a lesson; the residue is the durable record. |
| The up-to-94% reduction | [`power-of-hindsight`](../power-of-hindsight/SKILL.md) | The retrospective looks at what shipped; the data point is "how much of the shipped code was ladder-eliminated." |

---

## When not to use this skill

**A prototype.** The ladder is for production code where the cost of the comment is paid back by the cost of the next maintainer. A prototype does not have a next maintainer; the ladder's "mark the ceiling" rule is overhead. Use the ladder, skip the comment.

**A security-sensitive surface.** The ladder's rung 7 ("the minimum that works") is disciplined, not lazy — but a security-sensitive surface has threat models the ladder does not have. A `cso` audit, a `appsec-stack` review, and a `careful` mode are the right tools for that surface, not the ladder alone.

**A user-facing design choice.** The ladder is for code, not design. A button the user clicks once does not need a library (rung 1); a button the user can also drag-and-drop needs more than `<input type="date">`. The design judgment is in [`axiom-design-core`](../axiom-design-core/SKILL.md) and [`design-dna`](../design-dna/SKILL.md), not here.

**A decision the team has already made.** If the codebase has a `// Ponytail ceiling: ...` comment, the next agent's job is to respect the comment, not to climb the ladder again. The ladder is for *new* code. The comment is for *existing* code.

---

## The check

```
□ The seven rungs are read top to bottom on every new file
□ The first question is "does this need to exist," not "how do I write this"
□ A one-line wrapper around a stdlib function was caught by rung 3 or 4
□ A parallel implementation of an existing helper was caught by rung 2
□ A new dependency for an existing helper was caught by rung 5
□ Every deliberate simplification has a comment naming the ceiling and the upgrade path
□ The comment is the receipt; the next agent can find the rationale and the upgrade path
□ The ladder is read before the karpathy-guidelines, not after
```

Pairs with [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) (the surgical-edit baseline), [`ninja-innovation`](../ninja-innovation/SKILL.md) (the subtract-before-add discipline), [`lesson-residue`](../lesson-residue/SKILL.md) (the durable record of deliberate simplifications), and [`power-of-hindsight`](../power-of-hindsight/SKILL.md) (the retrospective that measures the ladder's effect on shipped code).
