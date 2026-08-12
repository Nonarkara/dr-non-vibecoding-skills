---
name: ship-discipline
description: >-
  The CPDT loop — Commit, Push, Deploy, Test — and the rule that localhost is never
  a deliverable. Use at the end of every work session, when an agent reports work as
  "done", when deciding whether a change is finished, or when the user asks "is it live?".
license: MIT
---

# Ship Discipline

> An agent that says "done" without hitting the live URL has not finished. It has stopped.

The single most expensive failure mode in AI-assisted development is not bad code. It's **unverified confidence** — a session that ends with a summary of what was built, when nothing was ever served to a real browser.

This skill is one loop and one rule.

---

## The rule

**Localhost is never a deliverable.**

Work is done when:
1. The deployed URL serves it, and
2. A command proves it — `curl`, a headless browser, a health endpoint.

If you cannot verify, report **"unverified"**. Never report "done". Reporting unverified work as done is worse than reporting a failure, because it removes the human's reason to check.

---

## The CPDT loop

Every meaningful change runs this to completion. Write the trace into the commit or the lesson doc — it is the proof of work.

```
C — Commit    git add -A && git commit -m "<type>(<scope>): <what changed, in a sentence>"
P — Push      git push origin main
D — Deploy    <the project's one deploy command — scripted, not remembered>
T — Test      curl the live URL and grep for the thing you just added
```

A real trace, from a shipped session:

```
git pull origin main
git add -A
git commit -m "feat(global): look across the globe — global scanner + what-to-watch"
git push origin main
npm run build                    # success
npx wrangler pages deploy        # 682f5208.siam-markets.pages.dev
curl day.nonarkara.org           # 200 OK, GLOBAL SCANNER present in body
git push                         # 8d30cba
```

3076/3077 tests passing (one known pre-existing flake, named and explained — not silently ignored).

### The T is not optional and it is not `npm test`

Tests prove the code is correct. **T proves the bytes reached a human.** They are different claims. A green test suite with a failed deploy is a system that does not exist.

Minimum viable T, by project type:

| Type | The test |
|---|---|
| Static site / SPA | `curl -s https://host/ \| grep -o 'v=[0-9.]*'` — is the new asset version being served? |
| API / service | `curl -sS https://host/api/health \| python3 -m json.tool` |
| Anything behind a CDN | Content-level probe, not just HTML. See the `deploy-verification` skill. |
| Anything with a service worker | Headless browser with `serviceWorkers: 'block'` — a SW will happily serve you last week. |

---

## Ship small, ship daily

The commit history that produced this repo averages ~9 commits a day for six months across ~20 projects. Not because of discipline theatre — because **small ships are the only ones you can debug.**

- A change you can describe in one sentence can be reverted in one command.
- A change you deploy today is verified by real users tomorrow.
- A change you sit on for two weeks arrives with three unrelated changes welded to it.

If a task can't ship today, it is not one task.

---

## Version everything the browser caches

Every static asset URL carries an explicit version key, bumped on every ship:

```html
<script src="/js/main.js?v=3.8.25"></script>
```

And the service worker cache name moves with it: `flooddash-v3.8.25`. And `localStorage` keys are suffixed `_v1` so a schema change doesn't hand a user a corrupt state object.

This looks like overhead until the first time an edge node serves last week's JavaScript to a citizen checking flood levels.

---

## Reporting honestly

When you finish, say exactly which of these is true:

- **Shipped and verified** — with the command and its output.
- **Shipped, verification pending** — deployed, but the edge hasn't converged. Say what you'll check.
- **Built, not shipped** — code is committed, deploy did not run or failed. Say why.
- **Unverified** — you couldn't test. Say what would test it.

Never blur these. The human's next decision depends entirely on which one it is.

---

## Anti-patterns

| Anti-pattern | What it costs |
|---|---|
| "The feature is complete!" with no URL touched | Human discovers it's broken hours later, in front of someone |
| Verifying on `localhost:3000` | Proves your machine works. Nothing else. |
| `curl`ing the custom domain before the canonical alias is live | Can pin stale bytes under the new cache key — see `deploy-verification` |
| Deploying from memory instead of a script | The one time you forget a flag is the one time it matters |
| Batching a week of work into one deploy | You now debug five changes at once |
