---
name: power-of-hindsight
description: >-
  Data-driven retrospective: collect every signal, analyze statistically,
  reconstruct from what works. Use to escape the Frankenstein phase and
  ship a coherent whole.
license: MIT
---

# Power of Hindsight

> Every dashboard is a data-collection window. No data is left behind. The system that emerged from a year of patching can be rebuilt as a coherent whole, because we now know which part goes with which part.

This is the long-cycle retrospective. It is not `lesson-residue` (one session, one lesson), not `result-honesty` (one handoff, four buckets), not `systematic-debugging` (one bug, one trace). It is the discipline of treating your own system as a longitudinal dataset and using it to reconstruct a cleaner version of itself.

The shape:

```
build → measure → keep → patch → measure → keep → patch ... → RECONSTRUCT
   ↑                                                              ↓
   └──────────────────── hindsight closes the loop ──────────────┘
```

The Frankenstein phase is real. Most systems spend their first year as a patchwork of borrowed pieces — patterns from one repo, deploy scripts from another, design tokens inherited from a third, error handling written under deadline. **That is not a failure mode. It is the standard mode.** The failure is staying there. Hindsight is the tool that gets you out.

---

## The three phases

### Phase 1 — Collect: every dashboard is a window, no data is left behind

Before the system is finished, while the team is still probing, editing, and modifying, **lock the data-collection contract.** This is the highest-leverage decision in the whole practice, and it is made in week one, not week fifty.

| Surface | What to log | Why |
|---|---|---|
| Every metric displayed | The value, the source, the freshness, the fallback tier | `honest-envelope` already requires `{source, tier, age}`; the log is the same shape, persisted |
| Every user action | Click / scroll / form submit / navigation, with the persona and the timestamp | The trail that retrospective analysis runs on |
| Every error and edge case | Console error, network failure, validation rejection, fallback activation | The 80% of the user experience nobody tests until a real user hits it |
| Every deploy | The commit, the time, the rollout state, the rollback (if any) | The ground truth for "what was live when this number was reported" |
| Every config change | Env var change, feature flag flip, secret rotation, DNS change | Most outages are misattributed to the wrong commit because this log is missing |
| Every operator note | The non-ritualised text an operator types when something looks off | The context the dashboards cannot capture; gold in retrospect |

The "no data left behind" rule is the load-bearing one. **If a log line might be useful in six months and costs nothing to keep, keep it.** The marginal cost of storage is far below the cost of re-deriving what the system did when a question is asked a year later.

Pair the data-collection contract with `production-spine` and `dual-write-resilience`: the data must survive the database going down. If the only place user actions live is the primary Postgres and Postgres goes down for an hour, the hindsight analysis has a hole exactly where it mattered.

### Phase 2 — Analyze: statistical methods, applied to retrospective questions

The "Study" step of Deming's PDSA cycle, but across the whole system lifecycle instead of one change. The methods are standard; the discipline is using them on your own product.

| Retrospective question | Method | What you get |
|---|---|---|
| Did this change actually move the metric? | Control chart (Shewhart), pre/post with confidence interval | Distinguishes signal from noise — the single most important answer in hindsight |
| What was the counterfactual? | Causal inference from observational data, propensity matching, A/B holdout | "What would have happened if we hadn't shipped X" — the question that turns patching into understanding |
| Which users were affected and how? | Cohort analysis, funnel analysis, segmentation | The 10% of users generating 80% of the issues, or the 10% we are unintentionally excluding |
| What pattern of errors preceded the outage? | Time-series clustering, anomaly detection on error rates | The early-warning signal you can wire into `wrong-green` for the next time |
| Where did the system surprise us? | Surprise metrics: actual − predicted, signed and bucketed | The places the mental model diverged from reality — exactly the edges that matter |
| How did the system change? | Drift detection on distributions, version-pair diffs | The slow drift nobody noticed in the moment but is obvious in the year-over-year plot |

The methods are not the hard part. The hard part is **asking the question in the first place.** Most retrospective work fails because nobody scheduled it, not because the statistics are wrong. Put a quarterly "what does the data say we should rebuild" review on the calendar before the system stabilises, not after.

The skill that *does* the analysis is whatever the team's good at — SQL, Python notebooks, R, a BI tool. The skill that *schedules and uses* the analysis is this one.

### Phase 3 — Reconstruct: from Frankenstein to coherent

The third phase is the one most teams skip. The data shows you which parts of the system carry weight, which parts are vestigial, and which parts were never right. **The next step is to rebuild the parts that carry weight from first principles, with the rationale now known.**

The reconstruction is not a rewrite. It is targeted:

| What the data shows | What to do |
|---|---|
| A module is touched by 80% of incidents and is the densest patch | Rewrite it from first principles, with the incidents as the test cases |
| A pattern was imported from three different repos and the seams leak | Replace the three with one internal package, single source of truth |
| A feature was built under deadline and the data shows nobody uses it | Remove it. The cost of carrying dead code is higher than the cost of the migration |
| A dashboard is always open during incidents | Promote it to a Tier-2 surface (redundancy, monitoring, on-call training) |
| A config was set in week one and never re-examined | Audit it, document the rationale, retire it if the rationale is gone |

The criterion for a good reconstruction: **a new engineer should be able to read the codebase and find a coherent story for why each major piece exists.** That is what the hindsight gives you. It is not what the original patchwork had.

The reconstruction is the *output* of the hindsight. Without phase 3, the data was just a museum. The point is to feed it back into the design.

---

## The data-collection contract, written down

A `docs/data-contract.md` (or whatever the project calls it) at the project root. The contents:

```markdown
# Data contract

## What we log
| Surface | Fields | Retention | Access |
|---|---|---|---|
| Dashboard metrics | {value, source, tier, age, request_id, session_id} | 18 months | All operators |
| User actions | {action, persona, page, timestamp, latency_ms, status} | 12 months | Engineering + product |
| Errors | {level, message, stack, request_id, user_id_hash, breadcrumbs} | 6 months hot, 2 years cold | Engineering |
| Deploys | {commit, time, env, state, rollback_to} | Forever | All |

## What we never log
- Plaintext secrets, even hashed (rotate first, log a marker)
- Plaintext PII (hash, truncate, or omit at the source)

## What we have agreed to use this for
- Quarterly retrospective ("what does the data say we should rebuild")
- Incident response ("what did the user see, in order, with what timing")
- Counterfactual analysis ("would the metric have moved without this change")
```

The "what we never log" section is not optional. The data discipline is what makes the rest of this skill work; the privacy discipline is what makes the data discipline sustainable in a regulated environment.

---

## The reconstruction log

For every reconstructed module, write a short doc: `docs/reconstructions/YYYY-MM-DD-<module>.md`. The shape:

```markdown
# <module name> — reconstruction

## What the data showed
- <the 1–3 retrospective findings that triggered the rewrite>

## What was there before
- <one paragraph on the patchwork state — short, the goal is to honour the work>

## What it is now
- <the new structure, the rationale, the seams that disappeared>

## What got deleted
- <the dead code that was removed>

## What is now testable that wasn't before
- <the tests that the incidents became, preserved>

## What we are watching for
- <the metric that tells us the rewrite worked; cite the source and tier>
```

The reconstruction log is the artefact that prevents the next Frankenstein phase. A new engineer reading the codebase hits the `docs/reconstructions/` directory and finds a written history of why each major piece looks the way it does.

---

## Pairing with the rest of the stack

| This skill | Pairs with | Why |
|---|---|---|
| Phase 1 (collect) | [`production-spine`](../production-spine/SKILL.md), [`dual-write-resilience`](../dual-write-resilience/SKILL.md) | The data must survive a DB hiccup; the analysis cannot have holes |
| Phase 1 (collect) | [`honest-envelope`](../honest-envelope/SKILL.md) | Every metric already carries `{source, tier, age}`; persist the same envelope |
| Phase 2 (analyze) | [`wrong-green`](../wrong-green/SKILL.md) | The same discipline that rejects a green checkmark answers the hindsight question right |
| Phase 2 (analyze) | [`data-display`](../data-display/SKILL.md) | The retrospective findings must be charted honestly, not decoratively |
| Phase 3 (reconstruct) | [`anti-regression`](../anti-regression/SKILL.md) | The reconstruction is the most aggressive form of cleanup; it needs the rationale preserved |
| Phase 3 (reconstruct) | [`lesson-residue`](../lesson-residue/SKILL.md) | Each reconstruction doc is a `lesson-residue` that ties data to a decision |
| All phases | [`shared-memory-hub`](../shared-memory-hub/SKILL.md) | The reconstruction log lives longer than any project; cross-agent memory is how it survives a five-year break |

---

## When not to use this

**A project younger than six months.** The data is too thin for the statistics to mean anything, and the system has not stabilised enough for "reconstruction" to be a useful question. Wait until the second patch round lands.

**A project that has not been measuring.** You cannot retro-fit this skill. The data contract has to be in place from the start of a project, even if the analysis happens later. The discipline is the cheap part; the missing data is the irrecoverable part.

**A change so small that the analysis is bigger than the change.** Don't run a quarterly retrospective on a typo fix. The skill is for system-level questions, not line-level ones.

**A team that will not delete the dead code.** The reconstruction is the least useful if the patchwork stays in place. If the team's instinct is "we might need it later," the hindsight has nowhere to land.

---

## The check

```
□ docs/data-contract.md lists every surface that is logged, with retention and access
□ The "what we never log" section is non-empty and includes plaintext secrets + PII
□ At least one metric is in a control chart, not a single point estimate
□ A counterfactual analysis has been run on at least one major change in the last quarter
□ A reconstruction log exists for every module that has been rewritten in the last year
□ A quarterly retrospective is on the calendar, with a named owner
□ The Frankenstein phase has an end date in writing, not just an aspiration
```

Pairs with [`lesson-residue`](../lesson-residue/SKILL.md) (one-session close-out), [`result-honesty`](../result-honesty/SKILL.md) (one-handoff reporting), [`production-spine`](../production-spine/SKILL.md) (the maturity label a public deploy earns), and [`anti-regression`](../anti-regression/SKILL.md) (the rationale-preservation discipline the reconstruction log depends on).
