---
name: systematic-debugging
description: >-
  Debug by reproducing, collecting, isolating, and verifying. Use when something
  is broken and the first plausible patch is tempting; skip greenfield work.
license: MIT
---

# Systematic Debugging

> The failure is almost never where the alarm is pointing.

Superpowers calls this four phases. Compound Engineering has `/ce-debug`. The civic-studio version is the same shape, calibrated to a laptop fleet: **do not shotgun a live dashboard.** Guess-and-patch on FloodDash or AirDash is how you ship a lying green.

Influences: [Superpowers](https://github.com/obra/superpowers) and
[Every's Compound Engineering plugin](https://github.com/EveryInc/compound-engineering-plugin).

---

## The four phases (in order, no skipping)

### 1. Reproduce

Write the smallest command or click path that shows the bug **on this machine, this commit.** If you cannot reproduce it, you cannot claim you fixed it.

```
# Bad: "users said the map is blank"
# Good: `curl -sS https://host/ | grep -c leaflet` → 0 on production, 1 on localhost
```

If it only happens on the custom domain, that is already a clue (CDN, SW, cookie). See [`deploy-verification`](../deploy-verification/SKILL.md).

### 2. Collect

Gather evidence *before* changing code:

- The exact error, not a paraphrase
- Last successful ingest / last deploy / last known-good commit (`git log --stat`)
- Whether the watchdog, the health endpoint, and the user-visible page agree

If those three disagree, you have a [`wrong-green`](../wrong-green/SKILL.md) problem, not a missing `if`.

### 3. Isolate

Name **one** causal hypothesis. Disprove it or confirm it. Then the next.

| Move | Not this |
|---|---|
| Bisect (`git bisect`, or `git log -p -- path`) | Rewrite the module "to be safe" |
| Add one probe, run it, delete it | Leave debug `console.log` in production |
| Check the question the monitor asks | Restart every launchd job |

Defense in depth is for *after* you know the cause. Spraying retries, timeouts, and fallbacks at an undiagnosed failure manufactures a second bug.

### 4. Verify

Fix the cause. Re-run the reproduction from phase 1. It must fail before the fix and pass after — even if the "test" is a curl, a browser flow ([`browser-as-t`](../browser-as-t/SKILL.md)), or a watchdog reading **last successful ingest**.

Then check the nearby path you did not intend to touch. The Codex Incident was a "fix" that deleted the map.

---

## Anti-patterns

- **"I think it's X"** followed immediately by a multi-file edit
- Restarting the process to "clear it" without a hypothesis
- Fixing localhost and declaring production healed
- Adding a fallback that hides the error instead of surfacing it (`honest-envelope`)

---

## The test

You can replay the bug on the old commit and show it gone on the new one, with the same command. If the only proof is "I read the diff and it looks right," you are still in phase 2.

One bug, one trace. For the longitudinal reconstruct — Collect → Analyze → Reconstruct when the patches have become Frankenstein — use [`power-of-hindsight`](../power-of-hindsight/SKILL.md).
