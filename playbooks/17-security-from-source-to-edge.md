# 17 — Security from source to edge

The operator asks for head-to-toe protection. The answer is a chain of enforced
boundaries and reproducible failure tests, not another scanner badge. This is
preventive guidance requested on 2026-10-14, not a claim that every control already
exists in every project or a compliance certification.

## Map the system before choosing tools

Record assets, data classes, tenant identities, public routes, dependencies,
agent tools, ingress aliases and who owns incident response. Trace one request
from browser to edge to API to data, including exports, background jobs and retries.

| Boundary | Negative proof to retain | Skill |
|---|---|---|
| Browser | Unsafe HTML remains inert; framing/cookies/CORS match the actual model | [appsec-stack](../skills/appsec-stack/SKILL.md) |
| API | Invalid input, upload abuse, private-network fetch, invalid webhook and oversized request fail | [api-design](../skills/api-design/SKILL.md), [webhooks-reliable](../skills/webhooks-reliable/SKILL.md) |
| Identity | Anonymous, expired-session and wrong-tenant access fail before data/spend | [auth-entitlement](../skills/auth-entitlement/SKILL.md) |
| Data | Cross-tenant queries, caches, exports and signed object URLs cannot reveal another user's data | [data-protection-pdpa](../skills/data-protection-pdpa/SKILL.md) |
| Supply chain | Known-bad secret/dependency fixture fails CI; untrusted PR cannot reach release credentials | [appsec-stack](../skills/appsec-stack/SKILL.md), [cso](../skills/cso/SKILL.md) |
| Edge | Direct origin and unwanted aliases fail; rate/cost stops are bounded | [cloudflare-security](../skills/cloudflare-security/SKILL.md), [cf-runaway-cost](../skills/cf-runaway-cost/SKILL.md) |
| Agent | Canary secret/network denial works; malicious retrieved text cannot authorize an action | [claude-security](../skills/claude-security/SKILL.md), [agent-attack-surface](../skills/agent-attack-surface/SKILL.md) |
| Operations | A test alert reaches the owner; rollback and dated restore succeed | [observability-budget](../skills/observability-budget/SKILL.md), [restore-drill](../skills/restore-drill/SKILL.md) |

For each relevant row, retain the command/probe, expected failure, actual outcome,
scope and exact commit. Minimize reports: no credentials, PII or real origin details.
Tests for static sites may demonstrate that a backend/identity boundary does not
exist; that is a reviewed non-applicability decision, not a fabricated test pass.

## New projects: inventory first, no false green

Bootstrap copies `docs/security-controls.json` and `scripts/security_release.py`.
All eight boundaries start unverified. `bash scripts/verify.sh` checks inventory
shape but does not clear a production release. On an existing project, copy the
[manifest](../templates/security-controls.json.template) and
[validator](../templates/security-release.py.template) deliberately; preserve existing work.

Before deployment, fill `target_commit` with the exact revision being shipped.
For each `passed` or `not_applicable` control, provide an owner, reason, and at least
one sanitized project-relative artifact with SHA-256 and `checked_at` (ISO timestamp
with timezone). Example evidence entry:

```json
{"path":"docs/security-evidence/auth-test.txt","sha256":"FULL_64_CHARACTER_SHA256","checked_at":"2026-10-14T09:00:00+07:00"}
```

Get the digest with `shasum -a 256 PATH` (macOS) or `sha256sum PATH` (Linux).
Artifacts must be inside the project, at most 5 MB each, and checked within 30 days.
Do not publish private reports; use a sanitized receipt that identifies restricted
evidence held by the owner. The validator cannot judge the truth of a receipt.

```bash
python3 scripts/security_release.py                 # inventory; not clearance
python3 scripts/security_release.py --release --commit FULL_TARGET_COMMIT
```

The strict command rejects missing controls, failed/unverified states, stale dates,
changed/missing evidence and the wrong revision. Run it as a required CI/release
step in the application, alongside real security regression tests. This meta repo
does not configure branch protection or deployment enforcement for your account.

## Add deeper audits without widening authority

Cloudflare's [security-audit-skill](https://github.com/cloudflare/security-audit-skill)
contributes coverage-led hunting and independently checked records. Integrate that
method through [cso](../skills/cso/SKILL.md); do not equate skipped code with coverage.
Its full upstream workflow requires isolated target-code execution and independent
reviewers. If those are unavailable, record the unresolved claim, not a confirmed flaw.

Claude review tools are optional and can consume tokens; they complement tests,
not replace permission enforcement. Use [strix-authorized-pentest](../skills/strix-authorized-pentest/SKILL.md)
only with explicit scope, disposable staging and budget approval. No autonomous
production scan or paid installation is part of bootstrap.

## Close the release

List confirmed defects separately from hardening opportunities and unresolved
claims. Reproduce, fix and retest within scope; keep rollback and incident contacts.
Report passed, failed, skipped and unverified checks. A passing ledger proves only
that its attestations are complete and unchanged; it is not proof the application
is free of vulnerabilities. Mark the actual maturity: Demo, Pilot, Production or Contract.
