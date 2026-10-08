---
name: vibe-review
description: >-
  Check class, need, slop, security, reproducibility, and evidence in one
  pass. Use before handing work back.
license: MIT
---

# Vibe review

> One checklist, in order. Each line loads the skill it names. This file does not replace those skills.

Copy [`templates/vibe-review.md.template`](../../templates/vibe-review.md.template) into a project when you want the list without the library. For a second, flaw-seeking pass on a production change, also run [`adversarial-review`](../adversarial-review/SKILL.md).

## The rule

You may hand work back when every line below is answered with evidence, or marked skipped with a reason. A blank line is an unfinished review.

## The checklist

1. **Class.** What did [`proportionality`](../proportionality/SKILL.md) say, and does the diff match that weight?
2. **Need.** What did [`user-need`](../user-need/SKILL.md) say, and does the reply match that depth?
3. **Pass condition.** Where is the sentence from [`definition-of-done`](../definition-of-done/SKILL.md), and where is the command output?
4. **Slop.** What did the [`anti-slop`](../anti-slop/SKILL.md) pass find in code, interface, and prose?
5. **Security.** Which row of [`security-baseline`](../security-baseline/SKILL.md) applies, and what did the scan print? Confirm it printed a location and a rule, not a secret.
6. **Reproducibility.** Can someone else rerun it from the record in [`reproducible-result`](../reproducible-result/SKILL.md)?
7. **Buckets.** Succeeded, failed, skipped, unverified, as in [`result-honesty`](../result-honesty/SKILL.md).

## What a reviewer looks at

Paraphrased from ordinary code-review practice, not a paste of any guide:

- The change belongs in this codebase.
- It does what was asked, including the edge the user will hit.
- Nothing is more general than the task that is on the table.
- Tests fail when the behavior breaks. Tests are code too.
- Names can be read aloud.
- Comments say why, when a comment is needed.
- You read the lines you are approving. If you skipped a file, say so.
- A style nit is labeled as a nit. A missing test on a production change is not a nit.
- A finding names `file:line`. A comment with no location is not a finding.
- If something in the diff is good, say that too.

UI that a person will see still needs [`browser-as-t`](../browser-as-t/SKILL.md), and a layout change needs [`see-and-revise`](../see-and-revise/SKILL.md).

## Anti-patterns

- Approving your own diff with "LGTM" and no line cited.
- Blocking a throwaway on a design-system nit.
- Letting a model review replace Semgrep once Semgrep is trusted, or letting Semgrep replace reading the diff.
- Running [open-code-review](https://github.com/alibaba/open-code-review) as a required CI job. The catalog says it is a self-review, and it is not deterministic.

## The test

Fill the template against this skill's own diff. Every line has a pointer or a skip. A review that only says "looks good" has not run.

## Influences

Review questions paraphrased from Google's [eng-practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html) (CC BY 3.0). The `file:line` bar and "deterministic check stays the gate" are the useful ideas from [alibaba/open-code-review](https://github.com/alibaba/open-code-review) (Apache-2.0). Their benchmark figures are not repeated here. The checklist ties the foundation skills together. See [`CREDITS.md`](../../CREDITS.md).
