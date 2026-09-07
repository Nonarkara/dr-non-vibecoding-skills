---
name: appsec-stack
description: >-
  Stack seven free AppSec layers — secrets, SAST, SCA, SBOM, auto-update,
  DAST, exploit verify. Use on every commit, before public deploy, or
  for an OWASP / CIS audit.
license: MIT
---

# AppSec Stack

> One scanner cannot answer "is this safe?" — secrets, code, dependencies, runtime, and exploitability are different questions that need different tools.

This skill lands the seven-layer AppSec pipeline a solo builder can actually run, without paying for a SaaS platform. It is the operational companion to [`reference/security-hygiene.md`](../../reference/security-hygiene.md), which states the discipline; this skill ships the working configuration.

The two named standards to cite when a client or auditor asks: **OWASP Top 10** (the vulnerability classes), **CIS Critical Security Controls v8 IG1** (the implementation floor — "essential cyber hygiene," the tier a resource-limited team can actually meet). IG2 and IG3 assume security staff a solo operator does not have.

---

## The threat model this stack answers

**Not an attacker. Ambient exposure.**

An agent with filesystem access reads your `.env`. An email-ingest pipeline writes a key into your notes. A shell `export` line shows up in a screen recording. A prompt you paste to debug something includes a token inside a stack trace. None of these is adversarial. All of these are leaks, and they are far more likely than anything an attacker does. The seven layers below exist to catch these *and* the classic injection / IDOR / dependency-CVE class, with overlapping coverage so no single miss is fatal.

---

## The seven layers

| # | Layer | Free tool | Catches | Where it runs |
|---|---|---|---|---|
| 1 | **Secrets** | [Gitleaks](https://github.com/gitleaks/gitleaks) | Hardcoded credentials — the single highest hit-rate finding | pre-commit hook + CI safety net |
| 1b | Secrets verify (incident response only) | [TruffleHog](https://github.com/trufflesecurity/trufflehog) | Whether a detected secret is still *live* | on-demand, not the default |
| 2 | **SAST** | [Semgrep CE](https://semgrep.dev) | Injection, unsafe eval, missing auth, custom house rules | every PR |
| 2b | SAST language-specific | Bandit (Python), Brakeman (Rails), gosec (Go) | Patterns the generic engine misses in one language | every PR, in addition to Semgrep |
| 3 | **SCA + containers + IaC** | [Trivy](https://trivy.dev) | Known-CVE packages, Dockerfile misconfig, Terraform drift | CI |
| 3b | Container alt | [Grype](https://github.com/anchore/grype) | Container-focused SCA when Trivy's surface is too broad | CI |
| 4 | **SBOM** | [Syft](https://github.com/anchore/syft) + [CDXgen](https://github.com/CycloneDX/cdxgen) | What is *actually* in the artifact (CycloneDX / SPDX) | CI, attach to release |
| 5 | **Auto-update** | [Renovate](https://github.com/renovatebot/renovate) | Auto-PRs for vulnerable or out-of-date deps, with tests | scheduled, on its own cadence |
| 6 | **DAST** | [OWASP ZAP](https://www.zaproxy.org) (baseline + API scan) | Runtime issues static scanners cannot see — auth bypass, XSS via cookies, CORS | scheduled + PR-diff mode |
| 6b | DAST templates | [Nuclei](https://github.com/projectdiscovery/nuclei) | Known-vuln patterns at runtime, fast | scheduled |
| 7 | **Exploit verify** | (a pentest tool of choice — manual or [Nuclei](https://github.com/projectdiscovery/nuclei) with verified templates) | Whether a found pattern is *actually* exploitable | scheduled + on critical changes |

Every layer is free, runs in CI on GitHub Actions runners, and has no per-seat cost.

---

## Rollout order that respects a real backlog

The temptation is to turn on all seven at once. Don't. Each layer has its own noise-to-signal curve, and a solo operator has only so many findings they can fix in a week.

**1. Secrets (day one).** Cheapest, highest hit rate. One pre-commit hook covers every future commit; one CI job catches what the hook missed. Don't add TruffleHog until you have an incident to investigate — it is a verification tool, not a prevention tool.

**2. SAST (week one).** Semgrep on its default ruleset against your codebase. Triage the existing findings before turning the gate on for new PRs; otherwise the first PR of the week will be drowned in pre-existing noise. Add a language-specific tool (Bandit / Brakeman / gosec) only for the language you actually use.

**3. SCA (week two or three).** Trivy scans a `package.json` / `requirements.txt` / `Dockerfile` in under a minute. Add `osv-scanner` if you want Google-backed vulnerability data, but Trivy already includes the OSV database. If you ship containers, Grype is a sharper alternative to Trivy's container mode.

**4. SBOM (when first asked).** Syft generates a CycloneDX bill-of-materials for every release. Required for some compliance regimes; useful for incident response ("what version of `libfoo` did 1.4.2 actually ship with?").

**5. Renovate (after the SCA backlog is drained).** Once a week, the bot opens PRs for outdated deps. Auto-merge for patch versions after CI passes; review minor and major manually. Dependabot is a drop-in alternative if you are already on GitHub.

**6. DAST (after the first public deploy).** ZAP baseline against a staging URL on a schedule. ZAP API scan against any OpenAPI spec you publish. The baseline scan will not break the build; treat findings as advisory until triaged.

**7. Exploit verify (only on critical changes, or in incident response).** Nuclei with verified templates, or a manual pentest of the surface. This is the layer that answers "static said yes, but is it really exploitable?" — the one every other layer is structurally unable to answer.

---

## Concrete configuration snippets

### 1. Gitleaks pre-commit hook

```bash
# One-time install
brew install gitleaks
# ~/.git/hooks/pre-commit
#!/usr/bin/env bash
gitleaks protect --staged --redact --no-banner
```

```yaml
# .github/workflows/secrets.yml
name: secrets
on: [push, pull_request]
jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: gitleaks/gitleaks-action@v2
        env: { GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} }
```

Keyless cloud deployment safety net (ban exported service account JSON keys in CI):

```yaml
# Workload Identity Federation (Google Cloud / GitHub OIDC — zero stored private keys)
- uses: google-github-actions/auth@v2
  with:
    workload_identity_provider: 'projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider'
    service_account: 'ci-deployer@PROJECT_ID.iam.gserviceaccount.com'
```

### 2. Semgrep on every PR

```yaml
# .github/workflows/sast.yml
name: sast
on: [push, pull_request]
jobs:
  semgrep:
    runs-on: ubuntu-latest
    container: { image: returntocorp/semgrep }
    steps:
      - uses: actions/checkout@v4
      - run: semgrep ci --config p/default --config p/owasp-top-ten
```

`p/default` is the community ruleset. `p/owasp-top-ten` is the named mapping every auditor recognises. Add a `semgrep.yml` in repo root for house rules (e.g., `no-eval`, `no-innerHTML`, `require-auth-on-public-route`).

### 3. Trivy SCA + container + IaC

```yaml
# .github/workflows/sca.yml
name: sca
on: [push, pull_request]
jobs:
  trivy-fs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aquasecurity/trivy-action@master
        with:
          scan-type: fs
          scan-ref: .
          severity: CRITICAL,HIGH
          exit-code: 1
          ignore-unfixed: true
  trivy-image:
    if: github.event_name == 'push' && startsWith(github.ref, 'refs/tags/')
    runs-on: ubuntu-latest
    steps:
      - uses: aquasecurity/trivy-action@master
        with:
          image-ref: ghcr.io/your-org/your-app:${{ github.ref_name }}
          format: sarif
          output: trivy-results.sarif
      - uses: github/codeql-action/upload-sarif@v3
        with: { sarif_file: trivy-results.sarif }
```

### 4. Syft SBOM on every release

```yaml
# .github/workflows/sbom.yml
name: sbom
on: { release: { types: [created] } }
jobs:
  syft:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anchore/sbom-action@v0
        with: { format: cyclonedx-json, artifact-name: sbom.cdx.json }
      - uses: actions/upload-artifact@v4
        with: { name: sbom, path: sbom.cdx.json }
```

### 5. Renovate (a `renovate.json` in the repo root)

```json5
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:recommended", ":automergeMinor"],
  "packageRules": [
    { "matchUpdateTypes": ["minor", "patch"], "automerge": true },
    { "matchUpdateTypes": ["major"], "labels": ["breaking"] }
  ],
  "vulnerabilityAlerts": { "enabled": true }
}
```

### 6. OWASP ZAP baseline (scheduled)

```yaml
# .github/workflows/dast.yml
name: dast
on: { schedule: [{ cron: '0 6 * * 1' }], workflow_dispatch: }
jobs:
  zap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: zaproxy/action-baseline@v0.10.0
        with: { target: 'https://staging.your-app.example' }
```

Baseline scan = passive only, no auth, won't break things. The `zaproxy/action-full-scan` exists but is a different conversation.

---

## The OWASP Top 10 → layer mapping

For audit-grade credibility, the named mapping. Every entry below is covered by at least one of the seven layers above.

| OWASP 2021 | Primary layer | Secondary layer |
|---|---|---|
| A01 Broken Access Control | SAST (custom rule: `require-auth-on-public-route`) | DAST (ZAP auth tests) |
| A02 Cryptographic Failures | SAST (Semgrep `p/security-audit`) | SCA (Trivy for known-bad crypto deps) |
| A03 Injection | SAST (`p/owasp-top-ten` rules) | DAST (ZAP active scan) |
| A04 Insecure Design | threat-model review (not a tool) | SAST (custom rule: missing-state-machine checks) |
| A05 Security Misconfiguration | Trivy (IaC scan) | SCA (container config) |
| A06 Vulnerable & Outdated Components | SCA (Trivy) | Auto-update (Renovate) |
| A07 Identification & Auth Failures | SAST (custom rules) | DAST (ZAP auth tests) |
| A08 Software & Data Integrity Failures | SCA (SBOM diff) | SAST (Semgrep `p/owasp-top-ten`) |
| A09 Security Logging & Monitoring Failures | (out of scope for this skill — see `dual-write-resilience` and `wrong-green`) | |
| A10 Server-Side Request Forgery | SAST (`p/security-audit`) | DAST (ZAP SSRF plugin) |

A09 is the gap. AppSec tooling cannot tell you whether your logs actually surface the attack. Pair this skill with [`dual-write-resilience`](../../skills/dual-write-resilience/SKILL.md) (logs and metrics survive a DB hiccup) and [`wrong-green`](../../skills/wrong-green/SKILL.md) (the health check answers a useful question).

---

## CIS Controls IG1 crosswalk

The IG1 ("essential cyber hygiene") implementation group of CIS Critical Security Controls v8 is what a solo builder can actually meet. Each of the five IG1 controls maps onto a layer above:

| CIS IG1 control | Layer |
|---|---|
| 1. Inventory and Control of Enterprise Assets | SBOM (Syft) + selective CI |
| 2. Inventory and Control of Software Assets | SBOM (Syft) + Renovate |
| 3. Data Protection | SAST (custom rules) + secrets scanning (Gitleaks) |
| 4. Secure Configuration of Enterprise Assets and Software | Trivy IaC scan + SAST |
| 5. Account Management | SAST (auth checks) + DAST (ZAP auth tests) |

IG1 is the floor. State it explicitly when the conversation turns to "are we doing enough?" — because the honest answer is "yes, for IG1" rather than the more expensive IG2/IG3.

---

## Anti-patterns

**The all-at-once gate.** Turning on Semgrep, Trivy, ZAP, and Renovate the same week means every PR fails for the first month. The team learns to ignore the gate. Each layer needs a triaged backlog before it gates.

**The custom-everything ruleset.** Semgrep's `p/default` already covers the OWASP Top 10 in good faith. Writing your own rules for what the default catches is a tax you pay forever. Custom rules are for *house* anti-patterns (`require-auth-on-public-route`, `no-process-env-in-client-bundle`) — not for re-implementing the engine.

**ZAP full scan on a live production URL.** The baseline scan is passive. The full scan actively probes for vulnerabilities. Run the full scan only against a disposable staging environment, never against a user-facing service.

**Renovate with no automerge policy.** The bot opens 40 PRs a week; the team ignores them; deps go stale. Configure `automerge` for patch and minor, and review majors manually. The default Renovate behaviour is to ask for everything.

**Treating "no findings" as "secure".** A scanner that produces zero findings is either perfect or broken. The real test: deliberately introduce a known-bad pattern (a hardcoded `sk-` token, an `eval()` call, a `package.json` entry pointing at a vulnerable version) and verify the gate fires. Then remove it. Run this test once per quarter, per layer.

**The audit-only mindset.** Running the seven layers on a quarterly audit is reporting, not defence. Run them on every commit, on a schedule, and on every release. The audit posture is the *output* of an always-on pipeline, not a substitute for one.

---

## The check

```
□ Gitleaks pre-commit hook installed and verified (introduce a fake key, see the gate fire, then delete)
□ Gitleaks GitHub Action on every push and PR
□ Semgrep CI on every PR, with p/default and p/owasp-top-ten enabled
□ Trivy filesystem scan on every PR; container scan on every release
□ Syft SBOM generated and attached to every release
□ Renovate running, with automerge for patch + minor, manual review for major
□ ZAP baseline scan on a schedule (weekly) against staging
□ Known-bad-pattern test deliberately introduced and caught at each layer
□ Pre-commit hooks are bypassable (--no-verify); CI gates are not — both are present
□ A09 (logging & monitoring) is paired with dual-write-resilience and wrong-green
```

Pairs with [`production-spine`](../../skills/production-spine/SKILL.md) (the maturity label a public deploy earns), [`security-hygiene.md`](../../reference/security-hygiene.md) (the discipline the seven layers implement), and [`risk-posture`](../../skills/risk-posture/SKILL.md) (how much of this stack to run, given the blast radius).
