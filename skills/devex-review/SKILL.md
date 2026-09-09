---
name: devex-review
description: >-
  Live DX audit: navigate docs, time the onboarding flow, screenshot error
  messages, score the CLI. Use to measure TTHW before declaring a
  developer-facing feature shipped.
license: MIT
---

# DevEx Review

> A feature is not "developer-facing" because the team calls it one. A feature is developer-facing when a developer, on a Tuesday morning, with a coffee, can find it, understand it, install it, and use it without asking the team.

[`human-walkthrough`](../human-walkthrough/SKILL.md) is the multi-persona user test for the end user. This is the same discipline, applied to the *developer* as the user. The personas are the same shape: a first-time developer, a returning developer, an extreme developer (the one who reads the source, who opens issues, who is the first to hit an edge case). The walkthrough is the same protocol: four questions at every step, failure points filed with severity, blueprint and roadmap output. The difference is the *target*: not the public app, but the developer-facing surface — the docs, the CLI, the install path, the error messages, the API.

The point of the test is to **measure the time-to-hello-world (TTHW)**. A library, a CLI, a plugin, a framework, a service: a developer should be able to go from "I have never seen this" to "I have a working example, in under N minutes." N is the team's choice; the practice suggests N ≤ 5 for a CLI, N ≤ 10 for a library, N ≤ 30 for a service. If the TTHW is above the team's threshold, the feature is not developer-facing yet; it is developer-adjacent, and the next sprint should close the gap.

The discipline is older than "DevEx" as a label. What is new is **the automation**: a headless browser can navigate the docs, time the click-path, screenshot the error messages, score the CLI help text. The human review is still the gold standard; the automated review is the daily check.

---

## The audit protocol

A DevEx review is a structured walk of the developer-facing surface, with a TTHW measurement at the end. It has a target persona, a scenario, a step-by-step walk, a scoring rubric, and a report.

### 1. The persona

A first-time developer, on a Tuesday morning, with a coffee. The persona has:

- A modern laptop, a clean install of the project dependencies, no prior context.
- A general familiarity with the *category* of the project (e.g., if it's a CLI, they have used other CLIs; if it's a library, they have used other libraries in the same language).
- **No prior knowledge of this specific project.** They have not read the README. They have not joined the Discord. They are arriving from a search result or a recommendation.

The persona is "the developer you are trying to acquire." If the project is open-source, the persona is "a developer who has not contributed before." If the project is internal, the persona is "an engineer in a different team." The persona is the *new* developer; the existing team is not the audience.

### 2. The scenario

A written scenario, one paragraph, with a starting state and a goal state. The scenario is the *first task* a developer would attempt, the one that proves the project works for them.

For a CLI: "Install the CLI on a fresh Mac. Run the `hello-world` command. Capture the output." For a library: "Add the library to a new project. Call the documented entry point. Verify the documented return value." For a service: "Sign up for an account, get an API key, make the documented first request, capture the response."

The scenario is the *one* task, not the whole surface. A first-time developer does not need to use every feature; they need to get past the gate.

### 3. The walk

A step-by-step walk of the persona's path through the scenario, with the four questions at every step:

1. **Will they try to achieve this result?** Do they understand *this* action is the right next step?
2. **Will they notice the correct action is available?** Is the control visible, findable, in the place they would look?
3. **Will they associate the correct action with the result they want?** Do they understand the label, the help text, the example?
4. **After the action, will they see that progress was made?** Does the system respond, or does the persona have to guess?

A "no" on any of the four is a **DevEx failure point** — a moment where the developer is stuck, confused, or misled. The failure points are filed with the step, the question, the severity, the effort to fix, and the recommended fix.

### 4. The TTHW measurement

The walk has a clock. The clock starts at the moment the persona begins the scenario (a fresh terminal, a fresh browser, no history) and stops at the moment the persona has a working example. The time is recorded in seconds; the seconds are the TTHW.

The TTHW is **the score that matters**. A DevEx audit with zero failure points and a 20-minute TTHW is a worse audit than one with three failure points and a 3-minute TTHW, because the first is *not developer-facing* in any meaningful sense — the developer is lost, even if the lostness is not flagged as a discrete failure. The TTHW is the single number; the failure points are the why.

### 5. The scorecard

The output is a markdown file at `docs/devex/audit-YYYY-MM-DD-<feature>.md`. The file has:

- The persona, the scenario, the walk's step-by-step log
- The failure points (severity, question, fix)
- The TTHW, in seconds
- A 0-10 DevEx score: 10 for TTHW < 60s and zero failure points, 0 for "could not complete," interpolated in between
- The trend vs the last audit (if any)
- The recommended next sprint's DevEx work

The scorecard is the input to the next audit and to the [`power-of-hindsight`](../power-of-hindsight/SKILL.md) retrospective. The scorecard is *not* a marketing artefact; it is an internal engineering record.

---

## The four persona variants

The first-time persona is the default. Three variants catch complementary failure modes.

| Persona | What they catch |
|---|---|
| **First-time** (default) | Missing docs, missing install steps, missing examples, error messages that do not help. |
| **Returning** | Missing changelog, breaking changes without migration notes, deprecated paths not marked, removed features still in the docs. |
| **Adversarial / extreme** | Edge cases the docs do not cover, malformed inputs the CLI does not handle, error states the API does not document. The persona that finds the security holes, the perf cliffs, the data-corruption paths. |
| **Source-reader** | The developer who reads the source code instead of the docs. Catches the cases where the docs say one thing and the code does another, where the public API is documented but the implementation is a different shape, where the examples work but the underlying mechanism is opaque. |

The four personas are **complementary**. The first-time finds the missing onboarding. The returning finds the missing migration. The adversarial finds the missing edge cases. The source-reader finds the missing truth. A DevEx audit with only the first-time persona catches only the first class.

---

## The tool

The audit is partly automatable. The parts that are automatable should be automated; the parts that need a human should be done by a human.

| Step | Automated? | Tool |
|---|---|---|
| Navigate the docs in a headless browser | Yes | A `playwright` script that walks the public docs, screenshots every page, captures every link, times every page load. |
| Time the install path | Yes | A `bash` script that runs the install in a clean container, captures the output, screenshots any prompt. |
| Run the first command / call | Yes | A `bash` script that runs the documented first command, captures stdout / stderr / exit code. |
| Time the TTHW | Yes | The clock is the script's wall time. |
| Capture the error messages | Yes | The script captures every error to a screenshot, with the URL or command that produced it. |
| Score the CLI help text | Partial | A `bash` script that runs `--help` and `--help-all` on every command, parses the output, scores the consistency. |
| Apply the four questions at every step | No | The four questions need a human. The script's output is the input to the human's review. |
| Decide the recommended fix | No | The fix is a human judgment. The script flags the failure point; the human decides the fix. |

The tool is at `scripts/devex-audit.sh`, added by `setup.sh` on first run. The script is the same one the human would run by hand; the audit is the *automation* of the script over the developer-facing surface, with the human review as the final step. A team that runs the script without the human review is collecting data they will not use.

---

## The DevEx score, 0-10

The score is the same shape as the [`health`](../health/SKILL.md) score: a 0-10 float, with per-signal breakdown, trend-tracked. The signals are different:

| Signal | What it measures | Default weight |
|---|---|---|
| **TTHW** | Time to a working example, in seconds, on a fresh machine. | 4.0 |
| **Failure points** | Count of moments where the persona is stuck, weighted by severity. | 3.0 |
| **Error message quality** | When something goes wrong, does the message tell the developer what to do? | 1.5 |
| **CLI consistency** | Across commands, is the flag pattern, the help text, the output format consistent? | 1.0 |
| **Docs completeness** | Every public API has an example. Every error has a fix. Every command has a `--help`. | 0.5 |

The weights sum to 10.0. The score is normalised 0-10. A first-time TTHW under 60s with zero failure points scores 10; a TTHW over 30 minutes scores 0. The trend is over the last 10 audits; the trajectory is over the last 30.

The score is **not the same as the health score**. A codebase can have a health score of 9 and a DevEx score of 3 — a perfect codebase that no one can figure out how to use. The two scores measure different things. A team that tracks both has the full picture.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The walk protocol | [`human-walkthrough`](../human-walkthrough/SKILL.md) | Same four questions, same failure-point filing, same blueprint + roadmap. Different target (developer vs end user). |
| The TTHW measurement | [`full-stack-bootstrap`](../full-stack-bootstrap/SKILL.md) | The bootstrap is the "happy path" the DevEx audit measures. A 30-second TTHW is the bootstrap working. |
| The CLI scoring | `scripts/install-skills.sh` | The skill installer is itself a CLI; the DevEx audit scores it like any other CLI. The audit is the feedback loop on the installer's UX. |
| The source-reader persona | [`ux-archaeology`](../ux-archaeology/SKILL.md) | Both skills are about reading prior art; the source-reader persona is the operational version. |
| The trend | [`power-of-hindsight`](../power-of-hindsight/SKILL.md) | The trend log is one of the longitudinal data sources the hindsight skill analyses. A DevEx audit every quarter is a hindsight input. |
| The failure points | [`anti-regression`](../anti-regression/SKILL.md) | A DevEx failure point is a *new* failure; the regression list is the catalogue of *named* failures the team has already learned to avoid. |

---

## The check

```
□ The persona is the new developer, not the existing team
□ The scenario is the first task, not the whole surface
□ The four questions are applied at every step, by a human
□ The TTHW is measured on a fresh machine, not on the team's dev box
□ The scorecard is filed at docs/devex/audit-YYYY-MM-DD-<feature>.md
□ The score is 0-10, the trend is over the last 10 audits
□ The score is on a dashboard, not buried in CI logs
□ The recommended fix for every failure point has an owner
```

Pairs with [`human-walkthrough`](../human-walkthrough/SKILL.md) (the end-user version of the same discipline), [`full-stack-bootstrap`](../full-stack-bootstrap/SKILL.md) (the happy path the audit measures), [`ux-archaeology`](../ux-archaeology/SKILL.md) (the source-reading skill the source-reader persona is the operational form of), and [`power-of-hindsight`](../power-of-hindsight/SKILL.md) (the longitudinal analysis the trend is an input to).
