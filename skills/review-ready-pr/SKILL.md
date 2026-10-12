---
name: review-ready-pr
description: >-
  Open one-intent PRs under a size cap with a risk label and evidence in the
  body. Use before opening a pull request, or when the review queue is the bottleneck.
license: MIT
---

# Review-ready PR

> The queue is the bottleneck. Write the PR so a person can finish it in one sitting. Do not merge it yourself.

คิวรีวิวคือคอขวด เขียนพีอาร์ให้อ่านจบในรอบเดียว แล้วอย่ารวมเอง

## The incident

Fiona Chen and James Stratton (Harvard), on Jellyfish data from January 2021 through March 2026, as carried in THINK 101. The paper is [Artificial Intelligence in the Firm: Bottlenecks in Software Production](https://fion.ac/jellyfish.pdf).

After firms adopted AI coding agents, lines of code rose **30%** and pull requests rose **23%**. Calendar time from PR open to merge rose **49%** (3.45 days on a 7.03-day baseline). The share of pull requests with changes requested nearly doubled. Resolved Jira issues and epics did not rise by a statistically significant amount.

More code arrived than review could clear. This skill is the author's side of that constraint: smaller PRs, a risk label, evidence in the body, and a batch list the owner merges.

## The rule

1. Climb the [ponytail](../ponytail/SKILL.md) ladder before any code. Stop at the first rung that holds.
2. One intent per PR. A bugfix and a rename are two PRs.
3. Size target: **≤300 changed lines** and **≤10 files**. Hard cap: **600 lines or 20 files**. Over the cap, do not open it. Split into stacked PRs, each under the cap.
4. Label the PR `risk:low`, `risk:med`, or `risk:high`.
5. **High is never batched.** High means the diff touches auth, secrets, Firestore or storage rules, payments, migrations, CI or deploy, or FloodDash production. Those get a full human review, one at a time.
6. Run the tests. When the host has the upstream plugin, also run `/ponytail-review`.
7. Fill the body sections below. A claim with no command output, sha, or URL is not done (Non-Bluff).
8. Low-risk PRs that are green go on a batch list for the owner. Agents never merge their own PRs. `gh pr merge` is not a step here.

Changed lines means additions plus deletions.

## Body

Required sections, in this order:

| Section | What belongs there |
|---|---|
| What changed | The intent, in one paragraph. |
| Why | The incident, the cost, or the request. Name the source. |
| How verified | Command output, the commit sha, and a URL. No evidence means not done. |
| Risk tier | `low`, `med`, or `high`, plus the path or label that decided it. |
| Look here first | The few files a reviewer should open before the rest. |
| Not done | What this PR leaves open, including "not merged". |

## Risk

| Tier | When | What happens |
|---|---|---|
| `risk:low` | Docs, copy, tests, or a small change outside the high list | Green ones go to the batch list. The owner merges. |
| `risk:med` | Behaviour change that is not on the high list, or the file list was incomplete | A person reviews it on its own. It is not batched. |
| `risk:high` | Auth, secrets, Firestore or storage rules, payments, migrations, CI or deploy, FloodDash production | Full human review. Never batched, even when CI is green. |

A `risk:low` label does not override a high path. The higher of the label and the paths wins.

## The digest

```bash
python3 scripts/pr_queue.py <owner>
```

Read-only. It uses `gh` GraphQL search, a few paged calls, and prints one screen. It does not merge, comment, label, close, or approve.

| Mark | Meaning |
|---|---|
| `BATCH` | Low risk, CI green, not a draft, under the hard cap, required sections present, How verified has evidence, no changes requested. Leave it for the owner. |
| `HUMAN` | Anything else that is open and not a draft. |
| `DRAFT` | Still a draft. Not merge-ready. |

Flags on the same line: `missing:…`, `no-evidence`, `wide` (over the 300/10 target), `oversize` (over the 600/20 cap), `paths-partial`, `changes-requested`, `label=low` when a path raised the tier.

One named repo is omitted from the list. The script does not print its pull requests. Every other title the token can see is printed. Do not paste a digest from a token that can see repos you would not show in chat.

## Self-review, before `gh pr create`

- [ ] Ponytail ladder run, first rung that held named in the PR
- [ ] One intent
- [ ] ≤300 lines and ≤10 files, or stacked because it passed 600 or 20
- [ ] `risk:low` / `risk:med` / `risk:high` set, high surfaces not labelled low
- [ ] Tests run, output pasted
- [ ] `/ponytail-review` run when [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) is installed (MIT). This repo's `ponytail` skill is the ladder. The slash command is the upstream plugin. Skip the slash command when the plugin is absent.
- [ ] All six body sections present
- [ ] How verified has a command, a sha, and a URL
- [ ] Not done includes "agent does not merge"
- [ ] No `gh pr merge`

## What this skill does not replace

[`pr-slop-patterns`](../pr-slop-patterns/SKILL.md) is the CI gate for title, description, and diff shape, from [peakoss/anti-slop](https://github.com/peakoss/anti-slop). [`adversarial-review`](../adversarial-review/SKILL.md) is the flaw pass on the diff. [`result-honesty`](../result-honesty/SKILL.md) is the four buckets. [`ship-discipline`](../ship-discipline/SKILL.md) is commit, push, deploy, test. This skill is the packaging of the PR and the owner's batch list.

## The test

An agent loaded this skill, about to open a PR, does four things without being reminded of the filename:

- It runs the ponytail ladder before writing code.
- It refuses to open one PR that is over 600 lines or 20 files.
- It labels auth, secrets, rules, payments, migrations, CI/deploy, and FloodDash production as `risk:high` and does not put them on the batch list.
- It leaves a green low-risk PR open for the owner.

`python3 scripts/pr_queue.py <owner>` prints `BATCH` only for the low-risk green rows, and `bash scripts/test-pr-queue.sh` is the fixture check.

## Credits

- Fiona Chen and James Stratton, Harvard, Jellyfish (January 2021–March 2026), via THINK 101. Paper: <https://fion.ac/jellyfish.pdf>
- Ponytail, Dietrich Gebert, MIT: <https://github.com/DietrichGebert/ponytail> (`/ponytail-review`)
- peakoss/anti-slop, the PR-slop checks this skill does not reimplement: <https://github.com/peakoss/anti-slop>
