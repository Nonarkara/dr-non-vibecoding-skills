---
name: secrets-management
description: >-
  Keep secrets out of code, notes, shell history — Keychain, .env.example,
  pre-commit gitleaks, rotation-not-rewrite. Use when adding API keys or
  auditing agent-touched setups.
license: MIT
---

# Secrets Management

> A secret that lives in a place an agent reads is a secret that's already leaked.

The threat model is not an attacker. **Your own tooling, reading everything you gave it a path to.** An agent with filesystem access reads your `.env`. An email-ingest pipeline writes an API key into your notes vault. A shell config with `export` lines gets displayed in a terminal you're screen-sharing. A prompt you paste to debug something includes a token in the middle of a stack trace.

None of these is an attack. All of them are leaks. **And they're far more likely than anything adversarial.**

*See [`../../reference/security-hygiene.md`](../../reference/security-hygiene.md) for the broader discipline; this skill is the operational discipline.*

---

## The core claim

Secrets live in **exactly one place** — macOS Keychain, or a dedicated credentials store outside every repo. Every other place that mentions a secret does so by *name*, not by value. `.env.example` ships with empty values and signup URLs beside each one. `.env` is gitignored. `.mcpignore` is a polite request, not an enforcement — the filesystem server reads whatever it can read, regardless of `.mcpignore`. **Documenting a control you don't actually have is worse than having none, because you'll trust it.**

When a secret does leak — and they do — the fix is **rotate first, rewrite history second**. Rotation is what makes the secret dead; rewriting history is cleanup. Doing them in the wrong order leaves the secret live in your history, cloneable by anyone with read access.

---

## When to load

- You're about to commit an API key, OAuth token, or password to a repo.
- An agent asks "where do I store this secret?"
- You're auditing a vault / notes folder that has been touched by ingest pipelines.
- You found a leaked key in a repo's history.
- You're wiring a CI/CD pipeline and need to decide how secrets reach the build.

---

## The moves

### One place, by name

```bash
# Add a secret to Keychain (one-time, on the developer's machine)
security add-generic-password -a "$USER" \
                              -s "github-token" \
                              -w "$(openssl rand -hex 32)"

# Read it from anywhere (script, agent, app)
TOKEN=$(security find-generic-password -a "$USER" -s "github-token" -w)
```

The value lives in Keychain. The *name* — `github-token` — is what every config file, env var, and notes folder references. The value is fetched at runtime, never persisted in a file the agent can read.

### `.env.example` ships, `.env` doesn't

```env
# .env.example — committed, no values
GITHUB_TOKEN=           # https://github.com/settings/tokens
STRIPE_SECRET_KEY=      # https://dashboard.stripe.com/apikeys
FRED_API_KEY=           # https://fred.stlouisfed.org/docs/api
MAPBOX_TOKEN=           # https://www.mapbox.com
```

```gitignore
# .gitignore
.env
.env.*
!.env.example
```

**The signup URL next to the name is half the value.** A future agent (or future you) that needs to provision a new key has the link in the same file as the variable name. Don't make them search.

### Pre-commit hook: gitleaks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
```

Catches the obvious patterns (`sk-`, `ghp_`, `gho_`, `AIza`, `xoxb-`, `-----BEGIN ... PRIVATE KEY-----`) before they hit history. **But — gitleaks catches patterns, not all secrets.** A custom-prefixed internal API key will sail through. Use gitleaks as the cheap first layer; treat your discipline as the real layer.

### `.mcpignore` is intent-only — don't trust it

```text
# .mcpignore
secrets/
.env
*.pem
```

The filesystem MCP server **does not enforce `.mcpignore`**. It documents *intent* — what files the human doesn't want agents reading. If an agent has filesystem access, the agent can read whatever the agent can read. The control is in the filesystem permissions, not in the ignore file.

> **The rule that goes in the vault's `README.md`:**
> Nothing in this vault is hidden from you. `.mcpignore` exists but the filesystem server does **not** enforce it — it documents *intent* only. Therefore: never write secrets, API keys, tokens, or passwords into any note. Point to the Keychain or an env var instead.

### Rotate first, rewrite history second

```bash
# 1. Rotate the key in the source system (GitHub, Stripe, etc.)
#    THIS IS THE FIX. Until you do this, the key is live.

# 2. BFG Repo-Cleaner or git filter-repo to rewrite history
git filter-repo --replace-text expressions.txt
# (where expressions.txt has the OLD key → REDACTED)

# 3. Force-push (only safe in a solo / coordinated repo)
git push --force-with-lease
```

**In that order.** Rotation kills the secret. Rewriting history is cleanup. Doing the cleanup first leaves the secret live in your history, cloneable by anyone with read access.

---

## The architecture

```mermaid
flowchart LR
  K[("macOS Keychain<br/>(the ONLY place values live)")]
  K -->|security find-generic-password| A["App / agent<br/>(reads by name)"]
  K -->|export MY_TOKEN=$(security ...)| S["Shell / script"]
  EX[".env.example<br/>(names only, URLs beside)"] --> N["Notes / config<br/>(references by name)"]
  GL["gitleaks pre-commit<br/>(catches patterns)"] -.->|"blocks commits"| C["git commit"]
  MCP[".mcpignore<br/>(intent only — does NOT enforce)"] -.->|"documented intent,<br/>not a control"| MCPNote["agents can read<br/>whatever they can read"]
  style K fill:#0d2a1c,stroke:#00c896,color:#e8e8e8
  style GL fill:#1a1a1a,stroke:#ffd000,color:#e8e8e8
  style MCP fill:#2a1414,stroke:#e8002d,color:#e8e8e8
  style MCPNote fill:#2a1414,stroke:#ffd000,color:#e8e8e8
```

Solid arrows: real data flow. Dashed arrows: claims of control that don't actually exist. The `.mcpignore` line is honest about being a polite request, not an enforcement — that's the load-bearing piece.

---

## Connects to

- [`../../reference/security-hygiene.md`](../../reference/security-hygiene.md) — the full discipline: vault, scanners, rotation
- [`../appsec-stack/SKILL.md`](../appsec-stack/SKILL.md) — secrets scanning is layer 1 of the seven-layer AppSec stack
- [`../harness-hardening/SKILL.md`](../harness-hardening/SKILL.md) — audit what hooks are actually wired vs documented
- [`../local-ai-fabric/SKILL.md`](../local-ai-fabric/SKILL.md) — the upstream-failover gateway keeps its API key in Keychain, never in a config file

---

## For the full thing

The discipline is the same regardless of where the secrets live (Keychain, 1Password, Vault, AWS Secrets Manager). What changes is the retrieval command. The architecture — values in one place, references by name, gitleaks as the cheap first layer, `.mcpignore` as documented intent only — is what this skill encodes.
