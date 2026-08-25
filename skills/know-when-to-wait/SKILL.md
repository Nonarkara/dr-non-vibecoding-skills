---
name: know-when-to-wait
description: >-
  Recognise when a build is blocked by immature tooling, not insufficient effort — and
  when to stop, write it down, and come back later instead of forcing it. Use before
  adopting a new local-AI or infra tool, or when a "simple" feature keeps fighting back.
license: MIT
---

# Know When to Wait

> Most advice assumes the blocker is skill or time. Sometimes the blocker is that the technology hasn't reached the maturity the idea needs yet, and no additional effort fixes that. `risk-posture` says kill fast when a project has no value. This is the companion rule for when the value case is real and the tooling just isn't there.

---

## The standard underneath this: Technology Readiness Level

Nine levels, NASA-origin, standardised as ISO 16290. Used by DOE/DoD specifically so immature tech doesn't get load-bearing status before it's ready:

```
TRL 1-2   concept only — no experimental data
TRL 3     proof of concept — data confirms the idea works at all
TRL 4-6   validated in increasingly realistic conditions
TRL 7-9   proven in actual operating conditions
```
**TRL 6 is the conventional bar for "safe to build something else on top of this."** Below that, a technology is worth prototyping, not worth depending on.

## A real case study

A local knowledge-graph memory system — ChromaDB + ONNX embeddings, indexing full session history — was installed and removed the same day. The concept was sound. The implementation's actual resource cost on a laptop running twenty other services was ~2TB of disk. It wasn't TRL 6 for that deployment shape, whatever TRL it might have been for a dedicated server. Removed same day, not iterated on, because the blocker was the approach's fit to the constraint, not a bug to patch.

## Signals you're TRL-blocked, not skill-blocked

- **The fix keeps needing a fix.** Three consecutive "one more patch" attempts on the same *underlying mechanism* — not the same bug, the same mechanism — is a maturity signal, not a persistence problem.
- **Resource cost scales the wrong way with real data.** Fine at a hundred rows, breaks at ten thousand: a ceiling, not a bug.
- **Every available implementation is pre-1.0**, or the "production" one still ships debug-quality defaults.
- **The workaround is more code than the feature.** If papering over a dependency's immaturity costs more than the dependency saves, it isn't ready for this job yet — regardless of how promising the underlying research is.

## What "wait" actually means — not abandonment

1. **Write the attempt down.** Same discipline as any other lesson doc. A documented, dated removal is citable later; a silently-abandoned attempt just gets tried again by someone who didn't know.
2. **Ship the smaller thing that IS ready.** A TRL-3 concept doesn't block a TRL-9 fallback from shipping now — boring, proven tech (a plain SQL query, a flat-file index) is often the correct interim answer, not a compromise.
3. **Set a checkable trigger to revisit**, not a vague "someday." "Revisit once the steady-state resource cost is under X" is checkable. "Revisit when it's more mature" never gets revisited.
4. **Don't confuse this with killing a dead project.** Killing is about value — nobody uses it. Waiting is about readiness — the value case is real, the ecosystem isn't. Conflating them either keeps a genuinely dead thing on life support, or abandons a good idea that just needed six more months.

## The test

Can you name the specific resource, API-stability, or ecosystem gap that has to close before this becomes buildable — and would you actually recognise it closing if it did? If yes: TRL-blocked. Write it down, ship the fallback, move on. If you can't name the gap, it's probably not a maturity problem — and waiting won't fix a scope or skill problem.

## Where this sits against the existing principles

Not a contradiction of [`dr-non-golden-rules`](../dr-non-golden-rules/SKILL.md) Rule 8 ("kill what doesn't work") — a companion for the opposite failure mode. Rule 8 kills things with no value. This skill waits on things with real value and no ready tooling; conflating the two either keeps a dead thing on life support or abandons a good idea six months too early. And it's Rule 3 and Rule 13 in the moment of the wait itself — "use what you already have" and "steal everything, understand it, rewrite it your way" is exactly what shipping the TRL-9 fallback *is*: not giving up, just building today's version out of today's proven parts instead of tomorrow's unproven one.

Worth naming the convergence: this repo's `ETHOS.md`-equivalent in a sibling gstack repo independently arrived at the same instinct from a different direction — its "Search Before Building" layer model (check what's already solved, at increasing depth, before writing anything new) is the *upstream* half of what this skill covers; this skill is the downstream half, for the specific case where the search comes back with "solved, but not solid enough yet." Two solo practices, different tooling, same conclusion — which is itself a small piece of evidence the conclusion is right.
