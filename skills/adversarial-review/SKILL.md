---
name: adversarial-review
description: >-
  Second pass that assumes a flaw. Use before merging or declaring a civic
  surface done, after a security-sensitive change, or when the same model that
  wrote the code is about to rubber-stamp it. Not a substitute for
  ship-discipline T.
license: MIT
inspired-by:
  - https://github.com/addyosmani/agent-skills
  - https://github.com/garrytan/gstack
  - https://github.com/trailofbits/skills
---

# Adversarial Review

> A same-model photocopy is not a review. Assume a flaw; stop when you cannot confirm a new one.

Playbook 10 calls this heterogeneous review. Addy Osmani's engineering skills put a QA gate before ship. gstack's `/review` is a specialist who looks for production bugs. Trail of Bits' marketplace is the serious end of this — differential review, false-positive gates, a *second opinion* on another CLI — and it is CC-BY-SA, so **this file is original procedure**, not their text.

Do not install a 40-plugin audit suite on a flood dashboard. Steal the *stance*.

---

## The stance

1. **Decorrelate.** Prefer a different model, a different agent, or a human with the diff. If you only have one model, start a **fresh** subagent with the diff and the spec — not the conversation that produced the code.
2. **Blind to the author's story.** Give them the plan and the diff, not "here's why this is fine."
3. **Assume a flaw.** The job is to find a confirmed issue, not to generate a compliment.
4. **Executable over rhetorical.** A failing test, a curl, a click path ([`browser-as-t`](../browser-as-t/SKILL.md)) beats "this might be a concern."
5. **Stop.** When you cannot confirm a new finding, you are done. Infinite review is stalling.

---

## What to look for (civic, not Solidity)

| Axis | Question |
|---|---|
| Honesty | Does any number look live without `{source, tier, age}`? Mock painted as live? |
| Authority | Does copy imply official warning / municipal product when it is studio work? |
| Regression | File shrink >30%? Interactive surface deleted? "cleanup" commit? |
| Secrets | Keys, sheet IDs, tunnel tokens, analytics IDs in the diff? |
| Blast | Auth, user input, XSS, HTML injection on alert layers — hold-to-confirm still there? |
| Wrong green | Did verification curl the custom domain too early? Watchdog on the wrong volume? |
| Design DNA | Rounded cards, extra font size, gradient, template reflex? |

This is not a pentest. Life-safety and public HTML get ceremony ([`risk-posture`](../risk-posture/SKILL.md)). A personal essay site gets honesty and anti-regression, not a smart-contract toolkit.

---

## Output

Findings only, by severity. Each finding: location, why it is real (command or click), what would disprove it. No "nice work" paragraph. Unverified suspicions go in a separate **unverified** bucket — see [`result-honesty`](../result-honesty/SKILL.md).

Critical findings **block** ship. The author does not close them by arguing with the same context that wrote the bug.

---

## Anti-patterns

- Reviewing your own diff in the same session and reporting "LGTM"
- Pasting Trail of Bits / gstack / Osmani SKILL.md into the repo
- Running a YARA/Semgrep festival on a static civic page because the pack exists
- Generating ten "consider maybe" nits to look thorough

---

## The test

A second pair of eyes (or a fresh agent) produced at least one *attempt* to break the claim, and either a confirmed issue was fixed or the unverified bucket is named. "I looked at it" is not adversarial.
