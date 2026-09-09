---
name: canary
description: >-
  Post-deploy monitoring: watch the live app for console errors, perf
  regressions, and page failures vs a pre-deploy baseline. Use after any
  ship, before the deploy is called done.
license: MIT
---

# Canary

> A deploy is not done when the script says "OK." A deploy is done when the live app behaves like the build, for long enough that the operator can be sure.

[`ship-discipline`](../ship-discipline/SKILL.md) is the four-step commit-push-deploy-test loop. The fourth step is the *probe*: `curl <url>` to prove the bytes are there. The canary is the step that comes **after** the probe — the operator's window of paying attention, watching the live app behave like the build, and rolling back if it does not.

The probe proves existence. The canary proves *behaviour*. A deploy can pass the probe (the bytes are there) and fail the canary (the bytes are broken, or the bytes depend on something the deploy did not change). The two are different checks for different failure modes.

---

## Why "canary"

The name comes from the coal-mine practice: a canary in a cage is lowered into the mine first; if the canary stops singing, the miners know the air is bad and leave. The canary is the cheap, replaceable signal that the human is not yet in. In software, the canary is a small slice of *real* traffic or *real* synthetic traffic that exercises the new build, watched by an operator who can roll back in seconds.

The point is not the canary itself. The point is the **window of attention**. A deploy that the operator abandons after the probe is a deploy that the operator cannot trust. A deploy that the operator watches for five minutes is a deploy that the operator can sign off on.

The window length is a function of risk. A typo fix can be canaried for 60 seconds. A schema migration can be canaried for 30 minutes. A model swap can be canaried for a day. The canary is the same skill; the parameter changes with the risk.

---

## What the canary watches

The canary is not a re-test. The canary watches **runtime signals** that the test suite cannot see, because they depend on the deployed environment, the live data, the live integrations, the real user-agent, the real network conditions.

| Signal | What it tells you | How to watch |
|---|---|---|
| **Console errors** | The new build throws on the real page, with the real data. A test that mocks the data does not catch this. | A headless browser visit to the page, `page.on('console', ...)` capturing every error. |
| **Performance regressions** | The new build is slower than the previous one, in a way the local perf test did not catch (different cache state, different network, different query plan). | A headless browser visit, time-to-first-byte, time-to-interactive, Largest Contentful Paint, captured against a pre-deploy baseline. |
| **Page failures** | The new build returns 5xx on a real URL, or a 200 with a broken body (HTML that does not render). | A `curl` to the live URL, the same probe as [`deploy-verification`](../deploy-verification/SKILL.md), but run continuously during the canary window. |
| **Live integrations** | The new build cannot reach an external API that the previous build could, or vice versa. | A canary probe that calls the integration explicitly — e.g., for a flood dashboard, a canary request to the data source. |
| **Real user signals** (when there are real users) | The error rate or the latency has shifted in a way the synthetic test does not see. | A pre-defined alert on the real-user-monitoring system, or a wait-and-watch on the error budget. |

The signals are *the same shape* as the [`wrong-green`](../wrong-green/SKILL.md) failure modes. The canary is the discipline that catches wrong-green *at deploy time* instead of at the next user complaint.

---

## The protocol

A canary is a structured watch. It has a start, a length, an exit, and a rollback.

### 1. Start — at the deploy, not after

The canary starts the moment the deploy script says "OK," not when the operator next looks at the screen. A canary that begins when the operator gets to the terminal has already missed the first 30 seconds of signal. The deploy script's last step is to start the canary.

The start is also the **baseline capture**. Before the canary begins, the canary tool reads the pre-deploy state: the console-error count, the page-load time, the integration availability, the real-user-error rate. The canary compares post-deploy against this baseline. Without a baseline, the canary is just "is the new thing fine" — which is the test the operator cannot make.

### 2. Length — the window of attention

The window is a function of the change. A heuristic:

| Change class | Canary length |
|---|---|
| Cosmetic (typo, colour, copy) | 60 seconds |
| UI change (a new component, a new page) | 5 minutes |
| Backend change (a new endpoint, a new query) | 15 minutes |
| Data change (a schema, a migration) | 30 minutes |
| Model / agent change (a new model, a new prompt) | 1 hour |
| Security change (a new auth flow, a new secret) | 24 hours |

The window is a default. The operator can extend it. The operator should not shorten it without a reason. A canary that ends "because the operator got bored" is a canary that did not finish.

### 3. Watch — the operator's three jobs

During the canary, the operator is doing three things, in priority order:

1. **Watching for a hard fail.** A 5xx, a console error on every page load, a real-user error rate that has tripled. A hard fail triggers an immediate rollback, no questions.
2. **Watching for a soft regression.** A 200ms slower page load, a console warning that was not there before, a single integration error in 1000. A soft regression does not trigger a rollback; it triggers an investigation at the end of the canary.
3. **Watching for unexpected successes.** A 100ms *faster* page load because the new build shed a slow path. A console error that *disappeared* because the new build fixed it. An unexpected success is worth a note; the operator can decide if it is a feature.

The three jobs are in priority order. A hard fail is the only one that interrupts the canary. A soft regression is logged, not actioned. An unexpected success is celebrated, not investigated.

### 4. End — sign off, or rollback

At the end of the canary window, the operator signs off, or the operator rolls back. There is no third option. A "let it run and see" is a canary that did not end, and a deploy that did not end is a deploy that cannot be signed off.

The sign-off is recorded: date, deploy commit, canary length, signals observed, sign-off or rollback reason. The record is the input to the next canary (and the next [`power-of-hindsight`](../power-of-hindsight/SKILL.md) reconstruction). A history of sign-offs is the evidence that the team is paying attention; a history of "we did not watch" is the evidence that the team is not.

---

## The tool

The canary tool is a small, headless-browser-running loop. It is **not** [`browser-as-t`](../browser-as-t/SKILL.md) (which is the operator's manual verification) and it is not [`human-walkthrough`](../human-walkthrough/SKILL.md) (which is the multi-persona exploratory test). The canary tool is closer to [`deploy-verification`](../deploy-verification/SKILL.md) extended to a window: same `curl` + headless-browser probe, run on a schedule, with diff against the pre-deploy baseline.

The tool is the same one the operator would write by hand for a single deploy. The canary is the *automation* of that tool over the window. The script lives at `scripts/canary.sh` (added by `setup.sh` on the first canary), with a one-line config: the URLs to watch, the signal thresholds, the window length. The output is a single line per signal per minute, with the diff against baseline. A regression prints red; a baseline match prints green; an unexpected improvement prints cyan.

The canary tool is a discipline, not a magic tool. A team that runs the canary script without watching the output is no better than a team that does not run the canary. The tool is the structure; the operator's attention is the substance.

---

## What the canary is *not*

**It is not a real-user test.** The canary uses synthetic or low-volume traffic. A real-user test happens after the canary, when the deploy is signed off and the user base is the actual test. The canary is the canary, not the miner.

**It is not a feature-flag rollout.** A feature flag is a different discipline: the change is deployed but disabled, and turned on for 1% of users, 10%, 50%, 100%. The canary is the watch on the deploy as a whole, regardless of feature flags. The two compose: a change is deployed under a flag, the canary watches the deploy, the flag is flipped after the canary signs off.

**It is not the [`deploy-verification`](../deploy-verification/SKILL.md) probe.** The probe proves the bytes are there. The canary proves the bytes behave. The probe is one-shot; the canary is a window. Both run on every deploy; the probe is the immediate check, the canary is the sustained check.

**It is not a substitute for a real incident post-mortem.** A hard fail during the canary is an incident. The post-mortem is a separate skill ([`lesson-residue`](../lesson-residue/SKILL.md)), and the canary finding is the input to the post-mortem, not the post-mortem itself.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The probe step | [`deploy-verification`](../deploy-verification/SKILL.md) | The probe is the immediate existence check; the canary is the sustained behaviour check. |
| The deploy step | [`ship-discipline`](../ship-discipline/SKILL.md) | The canary is the part of ship-discipline that comes after CPDT's test step, sustained over a window. |
| The signals | [`wrong-green`](../wrong-green/SKILL.md) | The canary is the discipline that catches wrong-green at deploy time, not at the next user complaint. |
| The sign-off | [`result-honesty`](../result-honesty/SKILL.md) | The canary sign-off is a `result-honesty` four-bucket report: succeeded (sign-off), failed (rollback), skipped (window expired without attention — this is a finding), unverified (the tool ran but the operator did not watch — also a finding). |
| The history | [`power-of-hindsight`](../power-of-hindsight/SKILL.md) | The canary history is one of the longitudinal data sources the hindsight skill analyses. |
| Dual-write | [`dual-write-resilience`](../dual-write-resilience/SKILL.md) | The canary's integration probe and dual-write's fallback mirror are the two sides of "the public surface survives the deploy." |

---

## The check

```
□ The canary starts at the deploy, not when the operator gets to the terminal
□ The canary captures a pre-deploy baseline before the new build takes traffic
□ The canary window matches the change class (cosmetic 60s, model swap 1h)
□ The operator's three jobs are clear: hard fail, soft regression, unexpected success
□ A hard fail triggers an immediate rollback, no questions
□ The end of the window is a sign-off or a rollback, never "we'll see"
□ The canary history is recorded (date, commit, length, signals, sign-off/rollback)
□ The canary tool is at scripts/canary.sh, the config is one line, the output is one line per signal per minute
□ The canary sign-off appears in the next [power-of-hindsight] reconstruction as a data point
```

Pairs with [`ship-discipline`](../ship-discipline/SKILL.md) (CPDT + canary = the full deploy discipline), [`deploy-verification`](../deploy-verification/SKILL.md) (the immediate existence check that runs before the canary starts), [`wrong-green`](../wrong-green/SKILL.md) (the failure modes the canary catches), and [`dual-write-resilience`](../dual-write-resilience/SKILL.md) (the integration-survival layer the canary's "live integrations" signal watches).
