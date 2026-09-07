---
name: written-principles
description: Make recurring judgment calls reusable. Use when a decision or mistake repeats.
license: MIT
---

# Written Principles

> Sources: Ray Dalio, *Principles* (2017) · Adam Smith, *The Wealth of Nations* (1776).

Dalio's claim is that most decisions are recurrences of an earlier decision, so the leverage is writing down how you decided and reusing it. Smith's is that output multiplies when work is split by comparative advantage rather than shared evenly. Both are directly operational in a multi-agent practice.

---

## 1. Pain + reflection = progress

Dalio's core loop, and the whole justification for a lessons log:

> An error is only expensive the second time.

The mechanism that makes it work is not the log itself — it is that the log is **consulted before acting**, not just appended after failing. A lessons file nobody reads at session start is a diary, not a system.

**The entry form** (anything less is unusable later):

```
## YYYY-MM-DD · short title
- What went wrong:   the symptom, concretely
- Root cause:        the mechanism, not the guess
- Correct behaviour: what to do instead
- How to recognise:  the signal that this class is recurring
```

"How to recognise" is the field everyone omits and the only one that makes the lesson fire next time. Without it you have a story; with it you have a trigger.

## 2. Believability-weighted decisions

Not all opinions weigh the same, and pretending otherwise is its own failure. Weight input by **demonstrated track record in the specific domain**, not by confidence, seniority, or eloquence.

Applied to agents:

- A model's fluency is not evidence. Confidence is a writing style, not a signal.
- **An executing test outweighs any model's opinion**, including a top-tier one. Spend the review budget on the test first.
- A second agent's review counts only if it is genuinely decorrelated — different model family, different lens, or different evidence. Same model, same prompt, same context is a photocopy at full price.
- Track which reviews produce confirmed findings versus noise. That ratio is believability, measured on your own work rather than someone's benchmark.

## 3. Radical transparency, scoped

Dalio's version is about organisations. The software version is narrower and non-negotiable: **the system never claims more certainty than it has.**

- No green checkmark over a real failure.
- Every number carries source, tier and age.
- A failed feed says it failed; it does not hold the last good value and let it rot.

Anything else is the system lying to the person who has to act on it.

## 4. Smith — division of labour, applied to a fleet

Smith's pin factory: specialised workers vastly outproduce generalists doing every step. The modern reading that matters here is **comparative advantage** — split by relative strength, not absolute.

- **Match model tier to task shape.** Mechanical, well-specified, already-decided work goes to the cheap fast model. Ambiguity, architecture, cross-project synthesis, and anything where a wrong call is expensive goes to the expensive one. Using the top model for `git push` is the same waste as scanning a monorepo for a one-file question.
- **Specialise agents by lens, not by file.** Two agents on the same task with different mandates (build / break) beat two agents splitting the files evenly.
- **Coordination is the cost that eats the gain.** Smith's factory worked because the handoff was trivial. When splitting work costs more context than it saves, do it yourself. This is the real limit on multi-agent fan-out and the reason "more agents" stops helping.

## 5. Where these two disagree, and who wins

Dalio says write the principle down. Smith says specialise. Together they suggest a trap: **a principle written by a specialist may not generalise.** A rule learned from one dashboard becomes workspace law and then silently damages a different kind of surface.

The guard: every written principle states its **scope** — the class of work it applies to — and a principle that has never been applied outside its origin project is a hypothesis, not a law.

---

## The check

```
□ Was the lessons log read at session start, not just written at the end?
□ Does every lesson have a "how to recognise" trigger?
□ Is this review decorrelated, or a photocopy?
□ Is a test doing the verification, or only an opinion?
□ Does this task's model tier match its shape?
□ Does this principle state the scope it is true within?
```

Pairs with `result-honesty`, `honest-envelope`, `subagent-routing`, `adversarial-review`.
