---
name: definition-of-done
description: >-
  Write the pass condition first, run it, and show the evidence. Use before
  any claim that work is done or fixed.
license: MIT
---

# Definition of done

> The pass condition is a sentence you can fail. Write it before the edit. The claim comes after the command.

[`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) already says to define success and verify. [`result-honesty`](../result-honesty/SKILL.md) is how the report is shaped. [`ship-discipline`](../ship-discipline/SKILL.md) is the live URL. This skill is the order: criteria, command, run, evidence, then the buckets.

## The rule

No "done", "fixed", or "passing" until the pass condition has been run in this session and the output is in the reply. If you could not run it, the bucket is unverified. Unverified is a finished report. It is not a synonym for done.

## The procedure

1. Write one pass sentence. It names the observable thing. "Add validation" becomes "A request with a missing `name` returns 400 and does not write a row."
2. Write the command, or the click-path, that would fail if the sentence were false.
3. Then edit.
4. Run that command. Paste the evidence: the exit code and the line that mattered. A summary of a log is not the line.
5. Report with the four buckets in [`result-honesty`](../result-honesty/SKILL.md): succeeded, failed, skipped, unverified. Fill each one, even when the text is "nothing".
6. If the class from [`proportionality`](../proportionality/SKILL.md) is production or civic and the change is supposed to be live, also run [`ship-discipline`](../ship-discipline/SKILL.md). Localhost is not that proof.
7. If the thing you measured can stay green while the user-facing failure is still there, switch the check. That is [`wrong-green`](../wrong-green/SKILL.md).

Match the check to the class:

| Class | The check that counts |
| --- | --- |
| Throwaway | The one path, run once, output shown. |
| Prototype | The path you will demo, on the labeled build. |
| Production | A test that fails when the behavior breaks, and the live check when the change is deployed. A user-visible flow also gets [`browser-as-t`](../browser-as-t/SKILL.md). [Playwright](https://github.com/microsoft/playwright) is the vetted runner for a first-visit smoke after deploy. Use a clean profile. Skip it when `fetch` plus a parser already proves the claim. |
| Civic | The production checks, plus the failure a resident would feel. [k6](https://github.com/grafana/k6) only against an API you own, never against a live life-safety host. |

Python changes that an agent edited take [Ruff](https://github.com/astral-sh/ruff) on the files you touched, version pinned in `pyproject.toml`. Do not reformat the rest of the repo in the same change.

## Anti-patterns

- Writing the pass sentence after the code, so it describes what you built.
- "All tests pass" with no count, no command, and no named skip.
- A screenshot of a page you did not click through.
- Playwright against your logged-in daily browser profile.
- A load test aimed at a third party, or at a live flood or air-quality host.

## The test

Ask for a small fix and refuse to start until the pass sentence exists. After the edit, the reply contains the command and the output. A reply that ends with "done" and no output has failed this skill.

## Influences

"Define success criteria and verify" is the goal-driven section of [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md), which credits [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (MIT). The review habit that tests should fail when the code breaks is paraphrased from Google's [eng-practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html) (CC BY 3.0; their page is not copied).
