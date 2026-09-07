# Security Hygiene

The mistakes I actually made, and the practices that came out of them. Written from a solo-with-agents perspective, where the threat model is different from a team's.

---

## Your real threat model is ambient exposure

Not an attacker. **Your own tooling, reading everything you gave it a path to.**

An agent with filesystem access reads your `.env`. An email-ingest pipeline writes an API key into your notes. A shell config with `export` lines gets displayed in a terminal you're screen-sharing. A prompt you paste to debug something includes a token in the middle of a stack trace.

None of these is an attack. All of them are leaks, and they're far more likely than anything adversarial.

---

## What happened to me

**Live API keys landed in my notes vault.** An automated pipeline ingested email into an Obsidian vault that agents read freely over MCP. Several live keys arrived by email and sat in there for weeks before anyone noticed. Every one had to be treated as compromised and rotated.

The written rule that came out of it now sits at the top of the vault, addressed to agents:

> Nothing in this vault is hidden from you. `.mcpignore` exists but the filesystem server does **not** enforce it — it documents *intent* only. Therefore: never write secrets, API keys, tokens, or passwords into any note. Point to the Keychain or an env var instead.

Note the honesty: it doesn't claim protection that doesn't exist. Documenting a control you don't actually have is worse than having none, because you'll trust it.

**Redaction markers stay in place.** Where a key was removed, a `[REDACTED-…]` marker remains with a note that the key is dead. That stops a future agent from trying to reconstruct it, and it stops me from wondering whether it was ever rotated.

---

## The practices

### Secrets live in exactly one place, referenced by name

macOS Keychain, or a dedicated credentials store outside every repo. In code, config, and notes you reference the **name** — `GITHUB_TOKEN`, `FRED_API_KEY` — never the value.

A `.env.example` with empty values and signup URLs beside each one is the right artifact to commit:

```env
FRED_API_KEY=       # https://fred.stlouisfed.org/docs/api
MAPBOX_TOKEN=       # https://www.mapbox.com
```

### Watch your shell config

This is the one that catches everyone, including me. `~/.zshrc` and `~/.bashrc` accumulate `export SOMETHING_API_KEY=...` lines over months — added by installers, by tutorials, by you at 2am. They are plaintext, they're read by every process you launch, and they show up in any screen recording of your terminal.

Audit periodically:

```bash
grep -nE '(API_KEY|TOKEN|SECRET|PASSWORD)=' ~/.zshrc ~/.bashrc ~/.profile
```

Anything with a real value should move to Keychain and be rotated, because you don't know where that file has been.

### Scan before you commit, and after you bulk-write

A pre-commit hook that greps for high-entropy strings and known key prefixes (`sk-`, `ghp_`, `gho_`, `AIza`, `cfut_`). Plus a scanner over any directory an ingest pipeline writes to — mine is a `vault-doctor.py` run after bulk writes.

### Delete the category rather than protecting it

The strongest move available to a solo builder: **don't hold the data.**

Province-level, age-bracket, device-class. Never individual. A system that never stores personal data cannot leak personal data, cannot be subpoenaed for it, and doesn't need a retention policy. That single decision removes more risk than every control you'd otherwise implement — and it's what lets me move fast on everything else.

### Assume demo credentials are public

Any password in a prototype, a README, or a demo script is public the moment it's written down. Either make it genuinely disposable and scoped to nothing, or don't have one. Never let a demo credential grow into a real one — that transition happens silently and is the origin of a startling number of breaches.

---

## The security checks that actually catch things

From my own audits, in rough order of hit rate:

1. **Hardcoded credentials** — by far the most common.
2. **IDOR** — an endpoint that takes an ID and doesn't verify the caller owns it. I shipped one on a device-binding endpoint and closed it.
3. **XSS via `href`** — user-influenced strings interpolated into link attributes. `javascript:` URLs still work in 2026.
4. **Auth bypass on static assets** — the page is gated, the asset it loads isn't. Found this on a showcase route.
5. **Weak randomness for anything security-relevant** — use a CSPRNG for binding codes, invite tokens, session identifiers. `Math.random()` is not one.
6. **Errors leaking internals** — stack traces and SQL in user-facing responses.

---

## The actual free stack, not just the practices above

Seven layers, each catching what the others structurally can't — no single scanner covers everything. The full pipeline with concrete pre-commit and GitHub Actions configs lives in [`skills/appsec-stack/SKILL.md`](../skills/appsec-stack/SKILL.md); the summary is here:

| Layer | Tool | Runs | Catches |
|---|---|---|---|
| Secrets | Gitleaks (TruffleHog for verification) | pre-commit + CI | Hardcoded credentials — the single highest hit-rate finding above |
| Static analysis (SAST) | Semgrep | every PR | Injection, unsafe eval, missing auth checks — supports custom rules for house anti-patterns |
| Dependencies / containers / IaC | Trivy | CI | Known-CVE packages, Dockerfile misconfig |
| SBOM (bill of materials) | Syft + CDXgen | every release | What the artifact actually contains (CycloneDX / SPDX) — for compliance and incident response |
| Auto-update | Renovate | scheduled | Auto-PRs for vulnerable or out-of-date deps with tests |
| Runtime dynamic scan (DAST) | OWASP ZAP (baseline + API scan), Nuclei templates | scheduled + PR-diff | Runtime issues static scanners cannot see — auth bypass, XSS via cookies, CORS, known-vuln patterns at runtime |
| Exploit verification | (a pentest tool of choice — Nuclei with verified templates, or a manual pentest) | scheduled + on critical changes | Whether a found pattern is *actually* exploitable — the layer static scanners can't answer alone |

Rollout order that respects a real backlog: secrets scanning first (cheapest, highest hit rate, one hook covers every future commit), SAST second on the default ruleset before writing custom rules, dependency scanning third on anything with a Dockerfile, SBOM fourth when first asked (some compliance regimes require it), auto-update fifth after the SCA backlog is drained, DAST sixth after the first public deploy, exploit verification seventh only on critical changes or in incident response. Named standards to cite if a client asks: **OWASP Top 10** for the vulnerability classes themselves (the named mapping is in `appsec-stack`), **CIS Controls IG1** ("essential cyber hygiene," Center for Internet Security's own recommended floor for a resource-limited team — IG2/IG3 assume security staff a solo operator doesn't have).

---

## Before any public repo

```bash
git log -p | grep -nE '(sk-|ghp_|gho_|AIza|xox[baprs]-|-----BEGIN.*PRIVATE KEY)'
```

Check the **history**, not just the working tree. A key removed in a later commit is still in the history, still cloneable, and still live until rotated. If you find one: rotate first, then rewrite history. In that order — rotation is the fix, history rewriting is cleanup.

For a continuous pipeline (every commit, every release, with the OWASP and CIS mappings ready to cite), load [`skills/appsec-stack/SKILL.md`](../skills/appsec-stack/SKILL.md).

---

## The line I hold absolutely

Everything else in my setup is deliberately permeable to agents — the vault, the projects, the logs, the shell history. That openness is what makes the whole system work.

Secrets are the one exception, and they're an exception precisely *because* everything else is open. There is no second layer to catch it.
