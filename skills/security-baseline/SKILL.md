---
name: security-baseline
description: >-
  Keep secrets out of code and logs, and scan dependencies in CI as a report
  first. Use when a repo will be shared, deployed, or handed over.
license: MIT
---

# Security baseline

> Day one is secrets out, scans as a report, and actions pinned. The gate gets stricter after you have read the noise. A pentest is a different job.

The full seven-layer pipeline stays in [`appsec-stack`](../appsec-stack/SKILL.md). Secrets discipline stays in [`secrets-management`](../secrets-management/SKILL.md). This skill is the bar [`proportionality`](../proportionality/SKILL.md) turns on, using tools from the owner's vetted catalog.

## The rule

A secret value never lands in code, a notebook, a log, a prompt, or a scan printout. Scanners print `file:line` and the rule id. Dependency and code scans start as report-only. They fail the job on secrets, and then on critical vulnerabilities, only after the existing noise is triaged. Actions are pinned to a commit SHA. The default token can read the repo and nothing else.

## By class

| Class | What you turn on |
| --- | --- |
| Throwaway | No secret in the file. No scanner required. |
| Prototype, if it will be pushed | [Trivy](https://github.com/aquasecurity/trivy) report-only (`vuln,secret,misconfig`). |
| Production | Trivy and [Semgrep](https://github.com/semgrep/semgrep) report-only, SHA-pinned actions, `permissions: contents: read`, [Dependabot](https://github.com/dependabot/dependabot-core) weekly. Server-side auth if there is an account. |
| Civic | The production bar, plus authorization on every mutation, input validation, and a scan you have watched find a planted issue. |

[Sigstore](https://github.com/sigstore/cosign) signs a binary or container that other people install. A site that is only deployed does not need it. The publish job is the one place that asks for `id-token: write`.

On Cloudflare, before a public launch or after an auth change, the vetted audit is [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill), pinned to a commit, report-only, output kept out of git. The lookalike `netresearch/security-audit-skill` is not that skill. It is not an auto-fix bot.

## The procedure

1. Put secrets in a store the agent does not commit. `.env.example` has empty values. `.env` is gitignored. Rotation comes before history rewriting. Details: [`secrets-management`](../secrets-management/SKILL.md).
2. Validate input at the boundary where it enters. Reject or ignore fields you did not ask for. Treat model output, scraped text, and tool output as untrusted until checked. Webhooks are verified on the server. [`auth-entitlement`](../auth-entitlement/SKILL.md) is the paid-login case: the role is checked on the server, default deny.
3. Add the report-only workflow from [`templates/security-baseline.yml.template`](../../templates/security-baseline.yml.template). Pins below were resolved on 2026-10-08. Dependabot should move them.
4. Read the report. Then, and only then, fail the job on secrets and on critical known vulnerabilities. Semgrep stays report-only until its noise is tuned. `semgrep scan` with no app token does not upload the repo. Do not set `SEMGREP_APP_TOKEN`.
5. Supply chain, before you install:
   - The registry name is the package you meant. A one-character difference is a stop.
   - Star count is not evidence. Fast growth is not evidence.
   - `open-code-review` installs only from the `@alibaba-group` scope. Other repos with that name are lookalikes.
   - Prefer the vetted catalog over a search result.
6. [Alibaba open-code-review](https://github.com/alibaba/open-code-review) can be a second read on a solo production diff. It needs a model secret set with `gh secret set`, never a key in a file. It is not the CI gate. Semgrep is the gate, once you trust its noise. A review comment that has no `file:line` is not a finding.
7. To see whether a scanner can find anything, run it against [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) in a throwaway container bound to localhost, on a machine that holds no secrets. Never expose that app.

SARIF goes to code scanning on a public repo only. A private repo keeps the report as an artifact.

## A report-only shape

The copy you can drop in is the template. The pins, checked 2026-10-08:

- `actions/checkout` at `11d5960a326750d5838078e36cf38b85af677262` (v4.4.0)
- `actions/setup-python` at `a26af69be951a213d495a4c3e4e4022e16d87065` (v5.6.0)
- `aquasecurity/trivy-action` at `ed142fd0673e97e23eac54620cfb913e5ce36c25` (v0.36.0)
- Semgrep CLI `1.180.0` (release v1.180.0, 2026-10-07), installed in the job, no token

The old `semgrep/semgrep-action` tag `v1` still points at a floating image and can take a publish token. Do not use that action as the baseline.

## Anti-patterns

- A blocking scanner on the first day, before anyone has read a finding.
- Printing a secret, or a prefix of a secret, while "proving" the scan.
- `permissions: write-all` on a scan job.
- Gitleaks added beside Trivy because a blog named it. Trivy is the vetted secret-and-dependency scanner for this baseline. The older [`appsec-stack`](../appsec-stack/SKILL.md) examples that float `actions/checkout@v4` are the habit this skill replaces with a SHA.
- k6, or any active scan, aimed at a host you do not own.

## The test

Put a fake token-shaped string in a scratch file, run Trivy with secret scanning, and confirm the output names the file and the rule and does not repeat the value. Delete the scratch file. If the output contains the value, the scan is misconfigured.

## Influences

OWASP Top 10 and the [Cheat Sheet Series](https://cheatsheetseries.owasp.org/) are CC BY-SA 4.0. The habits here (secrets, input validation, server-side authorization, least privilege, dependency hygiene) are paraphrased. No cheat-sheet text is copied. ASVS is the same licence and the same treatment. Cloudflare's audit skill is MIT; the six-phase shape (look, hunt, check, record, re-check, report, with the checker different from the finder) is the owner's catalog summary, not a paste of their file. Tool versions and lookalikes are from the vetted catalog of 2026-10-08.
