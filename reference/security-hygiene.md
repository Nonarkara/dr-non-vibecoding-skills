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

## Before any public repo

```bash
git log -p | grep -nE '(sk-|ghp_|gho_|AIza|xox[baprs]-|-----BEGIN.*PRIVATE KEY)'
```

Check the **history**, not just the working tree. A key removed in a later commit is still in the history, still cloneable, and still live until rotated. If you find one: rotate first, then rewrite history. In that order — rotation is the fix, history rewriting is cleanup.

---

## The line I hold absolutely

Everything else in my setup is deliberately permeable to agents — the vault, the projects, the logs, the shell history. That openness is what makes the whole system work.

Secrets are the one exception, and they're an exception precisely *because* everything else is open. There is no second layer to catch it.
