---
name: proportionality
description: >-
  Classify work as throwaway, prototype, production, or civic before picking
  tests and security. Use when scope or stakes are unclear.
license: MIT
---

# Proportionality

> The class of the task picks the engineering. A toy that grows a framework, and a flood alert that ships like a toy, are the same mistake.

Write the class down before the first edit. [`ponytail`](../ponytail/SKILL.md) still asks whether the code needs to exist. [`risk-posture`](../risk-posture/SKILL.md) still sets blast radius. This skill only chooses how much ceremony the class earns.

## The rule

Four classes. One of them is true. If two seem true, use the higher one.

| Class | It is this when | Engineering | Tests | Security |
| --- | --- | --- | --- | --- |
| **Throwaway** | Dies today. No users, no private data, no publish. | One file. No framework, no new dependency. | Run the one path once. | No secret in the file. No CI. No Dependabot. |
| **Prototype** | A person will see it. Labeled `DEMO` or `PROTOTYPE`. | Small and reversible. Happy path only. | The path you will show. | Secrets stay out. If it will be pushed, Trivy report-only. |
| **Production** | Real users, money, or private data. | The minimum that also handles the failure you can name. | A test that fails when that behavior breaks, plus the live check. | [`security-baseline`](../security-baseline/SKILL.md): report-only scans, SHA-pinned actions, Dependabot, server-side auth if an account exists. |
| **Civic** | Safety, a public alert, health, children, money movement, or personal data at scale. | Happy path stays small. The failure path is allowed to be larger: expiry, a second source, a named operator, a restore. | The failure a resident would feel. Browser walkthrough before a major release. | Production baseline, plus authorization on every mutation, input checks, and a scanner you have seen find a real issue. |

A game for yourself tonight is throwaway or prototype. The same game with accounts and payments is production. A dashboard that can tell a city a road is safe is civic even when the UI is small.

## The procedure

1. Name the class in the first reply, in one line, with the reason.
2. If the user disagrees, change the class and change the plan with it.
3. Load [`user-need`](../user-need/SKILL.md) next. Class is stakes. Need is depth.
4. Write the pass condition with [`definition-of-done`](../definition-of-done/SKILL.md) before editing.
5. At production, a "done" claim also has to pass [`production-spine`](../production-spine/SKILL.md). At civic, [`wrong-green`](../wrong-green/SKILL.md) picks the failure that matters, and [`human-walkthrough`](../human-walkthrough/SKILL.md) runs before a major release.

## What stays heavy, and what stays light

Stay light on the happy path at every class. [`ponytail`](../ponytail/SKILL.md) is the ladder.

Go heavy only where the class names a cost you cannot undo in an hour:

- Civic alerts: hold-to-confirm, auto-expiry, corroboration. Those rules live in [`risk-posture`](../risk-posture/SKILL.md). Do not copy them into a second design.
- Data you cannot recreate: a dated restore, [`restore-drill`](../restore-drill/SKILL.md).
- A binary or container other people install: sign it, [`security-baseline`](../security-baseline/SKILL.md).
- Load: [k6](https://github.com/grafana/k6) only against an API you own, and never against a live life-safety system.

[Open Policy Agent](https://github.com/open-policy-agent/opa) waits until many teams already share one policy language. The catalog says to start without it.

## Anti-patterns

- "Production quality" on a one-evening experiment.
- A public alert with no expiry and no second source, because the prototype was fun.
- Dependabot, a design system, and a seven-layer scanner on a file you will delete today.
- Treating star count, or a tool's speed of growth, as a reason to add it. The vetted list is the owner's catalog. Anything else needs your own check.

## The test

"Add a delete button to the flood-alert tool." The class is civic. A prototype plan is the wrong plan.

"A dice page I will throw away tonight." The class is throwaway. A CI security workflow is the wrong plan. The page still must not contain a secret.

## Influences

The four classes are this repo's. The idea that assurance rises with impact is the public shape of the [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) (CC BY-SA 4.0; no control text copied). Review pressure against speculative generality is paraphrased from Google's [eng-practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html) (CC BY 3.0). Tool choice follows the owner's vetted catalog, recorded in [`CREDITS.md`](../../CREDITS.md).
