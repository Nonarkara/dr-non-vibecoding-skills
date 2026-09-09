---
name: cso
description: >-
  Security audit mode: secrets archaeology, supply chain, STRIDE, OWASP Top 10.
  Use to audit a codebase in one command, complementing the free AppSec
  pipeline.
license: MIT
---

# CSO — Chief Security Officer

> The free AppSec pipeline is a recurring check. A CSO audit is a one-shot, deeper look at one codebase, with a confidence-gated report and trend tracking across runs.

This skill is the *audit mode* for [`appsec-stack`](../appsec-stack/SKILL.md). The pipeline is what runs on every commit; this is what you run when you want to know "is this codebase actually secure, in one answer, with evidence." The pipeline answers "did this change add a new vulnerability?" The CSO answers "what is the security posture of this thing, and where is the next incident most likely to come from?"

The threat model the CSO addresses is broader than the pipeline's: secrets already in git history, dependencies whose maintainer got phished last month, CI/CD steps that run with too much privilege, prompt-injection paths in any LLM integration, supply-chain attacks on third-party skills. The pipeline catches things at commit time. The CSO catches things at *audit* time.

---

## The two modes

The CSO runs in one of two modes. The choice is made by the trigger — "daily" goes to the lighter mode, "comprehensive" to the heavier one. If the trigger is ambiguous, the default is **daily**.

### Daily mode — zero noise, 8/10 confidence gate

The daily mode runs against the **already-deployed** surface. It does not introduce new scan traffic; it reads what the system has already collected. The output is a green/yellow/red report with a single 0-10 confidence score. A green daily report means "the deployed surface matches the last known-good posture"; a yellow means "something drifted, here is what"; a red means "a new issue is in production, here is the evidence."

The daily mode is the kind of check that an operator can run on a Tuesday morning with a coffee. It does not require a meeting. It does not produce a 30-page report. It says "still good" or "look at this."

### Comprehensive mode — monthly deep scan, 2/10 bar

The comprehensive mode is a deep scan. It introduces new scan traffic. It produces a longer report with the seven sections below. The 2/10 bar is the *minimum* coverage required before the audit is considered complete; an audit that finds no issues but only ran four of seven sections is not a comprehensive audit. The comprehensive mode is the kind of check that happens before a board report, a major release, or after an incident.

The two modes together implement the **two-cadence** discipline: light, frequent, low-noise; heavy, infrequent, high-coverage. The skill that does only the daily mode is monitoring, not auditing. The skill that does only the comprehensive mode is paranoid, not useful. Both are needed.

---

## The seven sections of a comprehensive audit

A comprehensive CSO audit produces one section per concern. Each section has a confidence level (0-10), an evidence trail, and a recommended action.

### 1. Secrets archaeology

Search the **entire git history**, not just the current tree, for high-entropy strings and known key prefixes (`sk-`, `ghp_`, `gho_`, `AIza`, `xox[baprs]-`, `-----BEGIN.*PRIVATE KEY`). The current tree is already gated by the [`appsec-stack`](../appsec-stack/SKILL.md) pipeline. The CSO looks for keys that were committed in 2023, removed in 2024, and are still cloneable from `git log`.

The single highest hit-rate finding. **Rotate first, rewrite history second.** A key removed in a later commit is still in the history, still cloneable, and still live until rotated. Rotation is the fix; history rewriting is cleanup.

### 2. Dependency supply chain

Run [`appsec-stack`](../appsec-stack/SKILL.md) layer 3 (SCA) plus a transitive analysis: which dependencies of dependencies are pulling in known-malicious or known-vulnerable code? Which dependencies have a single maintainer who lost access last month? Which dependencies have a published successor that the project has not migrated to?

The output is a list of "next incident" candidates, ranked by reachability (is the vulnerable function actually called?) and exposure (is the path on the public surface?). The list is the input to the next Renovate PR or the next dependency-rotation sprint.

### 3. CI/CD pipeline security

Inspect every step in the deploy pipeline: who has write access to the workflow file, which secrets are mounted, which steps run with elevated privilege, which third-party actions are pinned to a SHA or floating on a tag, which steps cache or upload artifacts. The pipeline is the most privileged surface in the project; the most common compromise path is the workflow.

The output is the same threat-model questions the [`appsec-stack`](../appsec-stack/SKILL.md) asks of the code, applied to the pipeline. A workflow that runs `npm publish` with a mounted publish token is a different threat from a workflow that runs `npm test`.

### 4. LLM / AI security

If the project has any LLM integration — a model API call, a RAG pipeline, a prompt-eval step, an agent runtime — the CSO asks: where does untrusted input enter the prompt, and what can it reach? The OWASP LLM Top 10 is the named framework. The specific concerns are prompt injection, training-data extraction, model-DoS, supply-chain attacks on the model's weights, and excessive agency (the model is allowed to do more than the design intended).

The output is a row in the threat model for each integration point: what enters, what can it touch, what is the worst case, what is the guardrail. An LLM integration with no prompt-injection guardrail is a CSO finding, even if the code is otherwise clean.

### 5. Skill supply chain

If the project loads Agent Skills or plugins from any source — the gstack model, the Codex marketplace, a custom `SKILL.md` from a third party — the CSO asks: who wrote the skill, what does it execute, what does it have access to, and what is the trust relationship? A skill loaded from an unverified source is an executable with a prompt; the threat model is closer to "downloaded binary" than "documentation."

This is the section closest to the dr-non-vibecoding-skills collection's own use case. A new contributor installing a third-party skill should treat it like a new package, not a new doc.

### 6. OWASP Top 10 + STRIDE

The two named frameworks that the CSO maps the codebase against. The OWASP Top 10 is the vulnerability classes; STRIDE is the threat model (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege). The CSO walks each row of each framework and asks: is this codebase exposed, and what is the evidence?

The output is a coverage table: 10 OWASP rows + 6 STRIDE rows, each with a yes/no/maybe verdict and a one-line evidence trail. A comprehensive audit is a complete table; a partial table is a yellow daily report.

### 7. Trend tracking

The output of every CSO audit is appended to a trend log: the date, the mode, the score, the section-level findings, the recommended actions, the actions taken. The trend log is the input to the next audit. A codebase that goes from 6.2 → 7.1 → 7.8 over six months is on a trajectory; a codebase that stays at 5.4 is not improving, and the trend is the evidence that the team should care.

The trend log lives at `docs/security/cso-audit-YYYY-MM-DD.md`, one file per run. The previous files are the input to the current file. The seven sections are the same in every file; the numbers and the evidence are what change.

---

## The output format

A daily report is one screen: the score, the three findings, the recommended action. A comprehensive report is a markdown file with the seven sections, each with a score, evidence, and action. The CSO does not produce a PDF. The CSO produces a markdown file the team can read, link, and diff.

The output is **gated by confidence**. A CSO report that has 2/10 confidence is a yellow report, not a green one. A CSO report that ran four of seven sections and found nothing is a yellow report, not a green one. The confidence number is the gate; a green report without 8/10 confidence is not a green report.

The output **never** includes the actual secrets it found. The CSO rotates, then references the rotation PR; the rotated key is named, never printed. A CSO report that prints a 12-character substring of a key is a failed report — it is the security incident, not the audit.

---

## What this skill is *not*

**It is not a replacement for the [`appsec-stack`](../appsec-stack/SKILL.md) pipeline.** The pipeline is the commit-time gate; the CSO is the audit-time check. A codebase that runs the CSO once a month and the pipeline on every commit has both; a codebase that runs only the CSO is unmonitored.

**It is not a pentest.** The CSO finds the things the static analysis and the threat model can find. A pen test finds the things that require a real attacker. The CSO is a prerequisite for a pen test, not a substitute. The [`appsec-stack`](../appsec-stack/SKILL.md) layer 7 (exploit verification) is the bridge.

**It is not a compliance report.** The CSO produces evidence; a compliance officer maps the evidence to a framework (SOC 2, ISO 27001, PCI-DSS). The CSO's output is the input to that mapping, not the mapping itself. The OWASP and CIS mappings live in [`appsec-stack`](../appsec-stack/SKILL.md).

**It is not adversarial.** The CSO is run by the team on the team's own codebase. The trust relationship is "we are auditing ourselves, with the same data an auditor would have." An external audit brings a different perspective; that is a different skill, not this one.

---

## The pair

| This skill | Pairs with | Why |
|---|---|---|
| The 7 sections of the comprehensive audit | [`appsec-stack`](../appsec-stack/SKILL.md) | The pipeline is the commit-time layer; the CSO is the audit-time layer. Both must run; neither replaces the other. |
| Secrets archaeology | [`reference/security-hygiene.md`](../../reference/security-hygiene.md) | The hygiene reference is the standing order; the CSO is the check that the order is being followed. |
| Threat model (STRIDE) | [`risk-posture`](../risk-posture/SKILL.md) | The risk posture is the calibration; the CSO is the measurement against the calibration. |
| Trend log | [`lesson-residue`](../lesson-residue/SKILL.md) | The CSO finding is a lesson when the finding is acted on. The trend log is the durable record. |
| OWASP LLM Top 10 | The LLM/AI integration in the project (varies) | If the project has no LLM integration, section 4 is a one-line "not applicable" and the audit is shorter. |

---

## The check

```
□ A daily CSO has been run in the last 7 days (or after the last deploy)
□ A comprehensive CSO has been run in the last 30 days
□ The trend log has at least 3 prior runs in `docs/security/`
□ No section scored 0/10 — every section was attempted, even if "not applicable"
□ No key was printed in the report, even in redacted form
□ Every finding has a recommended action and an owner
□ The audit score moved in the right direction vs the last run, or the lack of movement is acknowledged
```

Pairs with [`appsec-stack`](../appsec-stack/SKILL.md) (the pipeline that runs on every commit), [`risk-posture`](../risk-posture/SKILL.md) (the calibration the CSO measures against), [`production-spine`](../production-spine/SKILL.md) (the maturity label the public deploy earns), and [`reference/security-hygiene.md`](../../reference/security-hygiene.md) (the standing order the CSO checks).
