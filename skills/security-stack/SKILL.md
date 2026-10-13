---
name: security-stack
description: >-
  Pick the free scan for each pipeline stage and set a new repo up in ten
  minutes. Use when starting a repo or adding CI. Do not use to pentest a
  system you do not own.
license: MIT
---

# Security stack

> No key in the repo. Report-only scans. Heavy and active scans on the M5, against our own systems. A "done" without the log is not done.

The long pipeline stays in [`appsec-stack`](../appsec-stack/SKILL.md). Secrets discipline stays in [`secrets-management`](../secrets-management/SKILL.md). Cloudflare's bill with no stop stays in [`cf-runaway-cost`](../cf-runaway-cost/SKILL.md). This skill is the stage table and the first ten minutes: [`secure-new-repo-10min.md`](secure-new-repo-10min.md).

Licences below were read from the upstream repos on 13 Oct 2026. Re-read the live licence before you vendor anything. Nothing here is vendored.

## No keys in repos

A secret value does not land in a file git can see. That includes `.env`, `.dev.vars`, `wrangler.toml`, a notebook, a screenshot, a scan printout, and the first characters of a key. `.env.example` ships with empty values. The real value goes in `wrangler secret put` or a GitHub Actions secret. A leaked key is rotated. Deleting the line is not the rotation.

Scanners print the file, the line, and the rule id. `gitleaks detect --redact` is the form. If a report contains the value, delete the report and rotate the key.

## What the toolbox already rated

The owner's toolbox already marks these **ADOPT**. This page does not restate the cards:

| Tool | Licence checked 13 Oct 2026 | What this skill asks of it |
|---|---|---|
| [Trivy](https://github.com/aquasecurity/trivy) | Apache-2.0 | `trivy fs` and `trivy config`, report-only |
| [Semgrep](https://github.com/semgrep/semgrep) | Engine LGPL-2.1. Rules under their own licence | `semgrep scan`, no app token |
| [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates) | Free GitHub service. Core repo is MIT | Weekly, grouped, never auto-merge |
| [restic](https://github.com/restic/restic) + [rclone](https://github.com/rclone/rclone) | BSD-2-Clause and MIT | A dated restore, via [`restore-drill`](../restore-drill/SKILL.md) |
| [Beszel](https://github.com/henrygd/beszel) | MIT | Host view. Not a new service on the M3 |

The toolbox file is not in this tree. Open pull request [#20](https://github.com/Nonarkara/dr-non-vibecoding-skills/pull/20) records the same ADOPT ratings for Trivy, Semgrep, and Dependabot. When that page is on `main`, link it from here. Until then the upstream links above are the pointers.

## Decision table

| Stage | Use | Leave out |
|---|---|---|
| Secrets | [gitleaks](https://github.com/gitleaks/gitleaks) **MIT** CLI, pre-commit, plus one history scan on the M5. Copy [`configs/.pre-commit-config.yaml`](configs/.pre-commit-config.yaml). | [`gitleaks-action`](https://github.com/gitleaks/gitleaks-action) is a separate EULA, not MIT. Organization accounts need a licence key. [TruffleHog](https://github.com/trufflesecurity/trufflehog) is **AGPL-3.0**: CLI only, on the M5, when you must see whether a leaked secret is still live. Never copy its source into a repo. |
| Dependencies | [osv-scanner](https://github.com/google/osv-scanner) **Apache-2.0**, local and in CI, report-only. Dependabot opens the update PRs. GitHub's pricing page lists version updates and security updates on the Free plan; the 22 Apr 2024 changelog says Dependabot runs do not consume Actions minutes. | [Renovate](https://github.com/renovatebot/renovate) is **AGPL-3.0**. It is not the default, and it does not get vendored into a public product. |
| SAST | Semgrep Community Edition. `semgrep scan --config auto --metrics=off` with `SEMGREP_APP_TOKEN` unset. Registry rules are fetched for that run under the [Semgrep Rules License v1.0](https://semgrep.dev/legal/rules-license) (13 Dec 2024): internal use, no redistribution, no resale as a service. | Do not commit the rules. Do not run `semgrep ci` with a token: that sends findings to Semgrep's platform. `--config auto` turns metrics on unless you pass `--metrics=off` ([metrics docs](https://docs.semgrep.dev/metrics)). |
| DAST / pentest | [OWASP ZAP](https://github.com/zaproxy/zaproxy) **Apache-2.0** baseline, from the M5, against a live URL we own. Image tag `ghcr.io/zaproxy/zaproxy:2.17.0` (release 15 Dec 2025). Config: [`configs/zap-baseline.yml`](configs/zap-baseline.yml). | Not the M3. Not a third-party API. Not `ubuntu-latest`. Strix is a trial, below. |
| Containers / IaC | Trivy filesystem scan and Trivy config scan. The workflow pins [`trivy-action` v0.36.0](https://github.com/aquasecurity/trivy-action) and asks it for Trivy **v0.75.0** (1 Oct 2026). | [checkov](https://github.com/bridgecrewio/checkov) is **Apache-2.0**. Add it only when you can name a policy the Trivy config report missed. |
| Supply chain | Every `uses:` is a full commit SHA. Workflow `permissions: contents: read`. Dependabot keeps the SHAs moving. [CodeQL](https://github.com/github/codeql) queries are **MIT**. The CLI the action runs is under the [GitHub CodeQL Terms](https://github.com/github/codeql-cli-binaries/blob/main/LICENSE.md): analysis of a public OSI-licensed codebase. `upload: never`. | A private repo, or a public repo that is not OSI-licensed, stays off CodeQL. Do not turn on GitHub Advanced Security. That product is paid. |
| Runtime | Beszel for the host view, on the M5 or behind a login, while a person is looking. Page a person only after **10 minutes** down ([`observability-budget`](../observability-budget/SKILL.md)). restic + rclone for backups. The proof is a restore you have done and dated. | A metrics stack installed so an alert has somewhere to live. An alert with no action. A backup job that has never been restored. |
| Proof of done | The scan log, the Actions run URL, and `curl -sI` of the live headers, pasted in the PR. Buckets: [`result-honesty`](../result-honesty/SKILL.md). | "CI passed" when the run does not exist. GitHub Actions on this account has a hard $10 budget and can be blocked by billing. A missing check is not a green check. Paste the local output and say the Action did not run. |

## Machines and money

DAST and Strix run on the **M5** only. Never the M3. Never a third-party API. The M3 does not get Docker, a scanner install, or a model download. The first `pre-commit` run of the gitleaks hook compiles Go. That compile is an M5 job.

Cloudflare has no hard spending cap. A budget email arrives after usage. It does not turn the meter off. The incident is the one [`cf-runaway-cost`](../cf-runaway-cost/SKILL.md) already records. Before a Worker or Pages project ships, the guards in [`configs/wrangler-guards.md`](configs/wrangler-guards.md) are present: loop guards, a per-route rate limit, a usage cap, and a spend alert. No card on Cloudflare. No card on Google. Google stays on the free tier ([`google-cloud-run`](../google-cloud-run/SKILL.md)). If a console asks for a card, stop.

## Strix — trial

Checked 13 Oct 2026. [usestrix/strix](https://github.com/usestrix/strix) reports **Apache-2.0** on the GitHub licence API and on the README badge. The README's prerequisites are Docker and an LLM API key. The documented install is `curl | bash`. The first run pulls a sandbox image. `npx skills add usestrix/strix` installs nine skills. There is also a paid cloud.

**Trial, not the day-one gate.**

- The licence allows the CLI. Do not copy the nine skills into this repo. The boundary that is already written is [`reference/strix-when-to-run.md`](../../reference/strix-when-to-run.md).
- Docker and an LLM key fail the default bar: Docker stays off the M3, and a key can bill. Free key first. If the provider asks for a card, stop.
- Do not run the README installer. If you trial it, install a pinned `strix-agent` release on the M5 and write the version in the PR.
- One capped run, against a system we own, with a time ceiling. Keep the report. If that report does not change a fix, stop. It does not go on every pull request.
- Day-one ADOPT stays Trivy, Semgrep, and Dependabot report-only.

## Configs to copy

Copy these into the **app** repo. They do not belong in this skills repo's `.github/`.

| File | Lands at |
|---|---|
| [`configs/.pre-commit-config.yaml`](configs/.pre-commit-config.yaml) | repo root |
| [`configs/security.yml`](configs/security.yml) | `.github/workflows/security.yml` |
| [`configs/dependabot.yml`](configs/dependabot.yml) | `.github/dependabot.yml` |
| [`configs/zap-baseline.yml`](configs/zap-baseline.yml) | `.github/workflows/zap-baseline.yml` only if the M5 is the self-hosted runner |
| [`configs/_headers`](configs/_headers) | the Cloudflare Pages output (`public/_headers`, or the project root Pages actually publishes) |
| [`configs/wrangler-guards.md`](configs/wrangler-guards.md) | keep it next to the Worker, or fold the checks into the PR |

Pins in `security.yml`, resolved 13 Oct 2026:

- `actions/checkout` `3d3c42e5aac5ba805825da76410c181273ba90b1` (v7.0.1)
- `actions/setup-python` `5fda3b95a4ea91299a34e894583c3862153e4b97` (v7.0.0)
- `aquasecurity/trivy-action` `ed142fd0673e97e23eac54620cfb913e5ce36c25` (v0.36.0), Trivy version `v0.75.0`
- `github/codeql-action` `24c54180a607b1449ed407dd24f251e4e9147c8d` (v4.38.3)
- gitleaks CLI `v8.30.1`, commit `83d9cd684c87d95d656c1458ef04895a7f1cbd8e`, checksum in the workflow
- osv-scanner CLI `v2.7.0`, checksum in the workflow
- Semgrep CLI `1.180.0`, commit `a35fe8306115b3e55274969098cc46f8451d6b4d`

Dependabot is what moves those SHAs. A floating tag is a fail.

## The test

Walk [`secure-new-repo-10min.md`](secure-new-repo-10min.md) on a repo you are about to push. The pull request contains the gitleaks history log, the osv-scanner and Trivy logs, the Semgrep log, the `curl -sI` headers, the ZAP log from the M5 or an explicit skip, and either the Actions run URL or the sentence that billing blocked the run.

## Influences

Tool pages linked above. [`reference/security-hygiene.md`](../../reference/security-hygiene.md) is the shorter hygiene list. No upstream skill text is copied.
