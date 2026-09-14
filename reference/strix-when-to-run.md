# Strix: when to run it

Strix is an optional exploit-verification layer, not a default dependency of this stack. The normal path remains `appsec-stack`: secrets scanning, static analysis, dependency scanning, an SBOM, updates, and passive DAST. Strix becomes useful when the question changes from “does this look vulnerable?” to “can this vulnerability be reproduced against a target I am authorized to test?”

Source: [usestrix/strix](https://github.com/usestrix/strix) and its [agent skill](https://github.com/usestrix/strix/blob/main/skills/penetration-testing-with-strix/SKILL.md). Checked 2026-09-14. Strix is Apache-2.0; this file is original guidance and does not vendor its skill pack.

## Decision boundary

| Situation | Use |
|---|---|
| Every commit or pull request | Gitleaks + Semgrep + Trivy; do not launch an autonomous pentest |
| Public release candidate on disposable staging | Strix quick/standard scan can add exploit evidence |
| Auth, billing, file upload, webhook, or access-control change | Focused authorized scan after ordinary tests pass |
| Incident response | Preserve evidence first, then scan a clone or isolated environment |
| Third-party domain, production system, or shared infrastructure without written authorization | Do not scan |

## Safe operating contract

1. Record the exact allowed targets, accounts, paths, scan window, and stop conditions.
2. Prefer a disposable staging deployment and seeded test accounts. Never point an autonomous exploit tool at production by habit.
3. Run the self-hosted CLI in Docker against a clean checkout. The upstream skill warns that a local path supplied as a target is mounted writable; do not give it uncommitted work you care about.
4. Set a time/turn/budget ceiling. The open-source engine is free software, but its model calls and operator time are not necessarily free.
5. Keep credentials in environment variables or a secret manager. Put only test credentials in scan instructions, and rotate them after the engagement.
6. Treat exit code 0 as “no validated findings in the analyzed scope,” not “secure.” Read run status, coverage, and the report before accepting a green result.
7. Reproduce each confirmed finding, patch it, rerun the narrow test, then rerun the ordinary AppSec gates.

## Installation choice

Do not merge Strix’s nine agent skills into this repository. Install them per project when the project actually needs autonomous pentesting:

```bash
npx skills add usestrix/strix
```

Or use the upstream self-hosted CLI instructions. Pin a reviewed release or commit in CI; do not execute a moving remote install script inside a privileged production runner.

## Evidence to retain

- authorization and scope;
- tool version or commit;
- target version/commit and environment;
- run status, coverage, and configured ceilings;
- validated proof of concept with secrets redacted;
- remediation commit and focused rerun result.

Pair with [`appsec-stack`](../skills/appsec-stack/SKILL.md), [`cso`](../skills/cso/SKILL.md), [`risk-posture`](../skills/risk-posture/SKILL.md), and [`result-honesty`](../skills/result-honesty/SKILL.md).
