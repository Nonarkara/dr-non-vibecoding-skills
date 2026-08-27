---
name: result-honesty
description: >-
  Report results faithfully: what succeeded, what failed, what was skipped, what remains
  unverified. Use at the end of every work session, when an agent reports work as "done",
  when handing off a task, when the user asks "did it work", or when a deploy + verification
  cycle is closing.
license: MIT
---

# Result Honesty

> The most dangerous sentence in agentic coding is "done." The second most dangerous is "should be fine."

`ship-discipline` covers one specific case: localhost is never a deliverable. This skill is the broader discipline — how an agent reports results in any context, so the human can make a real decision on the next move.

The Mavis / Claude Code / MiniMax Code side of the system. The four buckets generalise to any LLM-based agent.

---

## The four buckets, every report

Every status report — at the end of a session, in the middle of one, on a deploy, on a verification pass, on a handoff — has four buckets. The agent fills every one, in this order, even if a bucket is "nothing":

1. **Succeeded** — what is now provably true. A `curl` returned 200, a test passed, a file exists with the right shape, a deploy completed and the new version string appears in the served HTML. Cite the proof.
2. **Failed** — what was attempted and didn't work. Include the error, what was tried, and the state left behind.
   > "Failed: `/api/news` returns 500 — `db.tx` throws on null timestamp column. Tried: adding NOT NULL constraint, blocked by existing rows. State: route still returns 500; the column is still nullable."
3. **Skipped** — what was deliberately not done, and why.
   > "Skipped: smoke-test the OAuth callback on Safari — no Safari on this machine, and a real test needs a real browser, not a headless Chromium."
4. **Unverified** — what is probably true but was not directly tested.
   > "Unverified: the new `withApiGuards` wrapper behaves the same on Vercel as on localhost — only smoke-tested locally. The Vercel edge runtime is where the real risk is."

The fourth bucket is the one most agents skip. It is the one that makes the report actually useful.

---

## Why "done" is the wrong word

"Done" is a promise that the next user (which may be the same user, ten minutes later) does not have to re-verify. The agent that says "done" has removed the human's reason to check. The agent that says "deployed and verified with `curl`, returning 200, the new `?v=1.2.1` asset is served at the new URL" has given the human a reason *and* a proof.

The replacement vocabulary:

| Don't say | Say |
|-----------|-----|
| "Done" | "Implemented. Verified by [proof]. Unverified: [what you didn't test]." |
| "Should work" | "Works in [test you ran]. Not tested in [case you didn't run]." |
| "Fixed" | "Patched at `path:line`. Symptom was [X]. Untested: [Y]." |
| "Probably fine" | "No errors in the deploy log. The case I was most worried about is [Z]; not exercised." |
| "All tests pass" | "3076/3077 passing. One pre-existing flake named and explained [link]." |
| "Looks good" | "Verified [A], [B], [C]. Not checked: [D], [E]." |

The pattern: every claim is paired with its evidence and its boundary. The human can act on a claim with known limits. They cannot act on a claim with hidden limits.

---

## The CPDT trace — what every "deployed and verified" report looks like

When the task involved a deploy, the report includes the actual trace, not a summary:

```
C — Commit    a1b2c3d "feat(news): add freshness stamp to SystemBreath"
P — Push      origin/main, fast-forward
D — Deploy    npx wrangler pages deploy public --project-name=hcmc-war-room
              → 4c5cee80.hcmc-war-room.pages.dev
T — Test      curl -s https://hcmc.nonarkara.org | grep -c "freshness"
              → 1   (the new "FRESH" stamp is in the served HTML)
              curl -sI https://hcmc.nonarkara.org/_next/static/chunks/app.js | grep cache-control
              → cache-control: public, max-age=0, must-revalidate   (no poisoning)
```

That is the report. Not "deployed and verified". The trace *is* the verification. The human can replay any step.

---

## The "self-correction" rule

When the agent makes a mistake that changes the user's decision or the work's outcome, **correct it once, briefly, and continue.** Don't over-apologise. Don't ruminate. Don't write a four-paragraph post-mortem in the response.

```text
# Wrong
"I'm so sorry, I made an error earlier. Looking back at this, I
should have checked the file before claiming... This was a
mistake on my part. Let me try to be more careful..."

# Right
Correction: the route is at `src/app/api/news/route.ts`, not
`src/pages/api/news.ts` — Next.js 15 uses the app directory.
Continuing with the patch.
```

The correction is the value. The apology is the tax. Over-apologising tells the human the agent is uncertain about the *correction* too, which is not true — once the mistake is named, it is named; spending more sentences on it is a tax on the next message.

For real engineering post-mortems (a bug that took hours, an incident that affected users), the right place is `docs/lessons/YYYY-MM-DD-<slug>.md` — see `templates/lesson.md.template` and `agent-memory` Tier 3. The response itself is for the correction; the lesson doc is for the longer record.

---

## The "stuck" report

When a task cannot be completed, the report has a different shape:

1. **What was the blocker** — the precise failure mode, with the error and the input.
2. **What was tried** — a list, with outcomes.
3. **What was ruled out** — paths the agent went down and came back from.
4. **What is needed to unstick** — the smallest user input that would resolve it.

The "what is needed to unstick" line is the most important one. A stuck report that doesn't end with "I need X" is a complaint. A stuck report that does is a task that can be handed back.

```text
Blocker:    The Cloudflare API returns 403 on every KV write. Existing reads work.
Tried:      Re-auth'd the API token; verified the token has Workers KV:Edit on the
            account; the same token works on a different KV namespace.
Ruled out:  Token permissions (works elsewhere), namespace ID (matches wrangler.toml),
            rate limit (well under).
Need:       Confirmation that the KV namespace itself is on the right account —
            possibly a second namespace was created on a personal account during
            a previous incident. Need the user to log into Cloudflare and check.
```

That is a stuck report. It can be acted on.

---

## When to push back on the user

A "report results faithfully" discipline does not mean "say yes to everything." The agent has standing to push back, once, directly and respectfully, when the user's direction looks wrong. The rule:

> If you think the direction is wrong, say so once, directly and respectfully. If the user insists, follow their lead unless doing so would violate safety, permissions, security, or another hard limit.

A report that just says "succeeded" when the agent thinks the change is the wrong change is dishonest in a different direction. The honest report names the concern, names the proof, and asks whether to continue.

```text
Done what was asked, but flagging a concern: removing the
mock-data fallback in `src/lib/api/mock.ts` means the dashboard
won't render without the NASA FIRMS API key. Anti-regression
section #5 of CLAUDE.md says the app must render fully without
API keys. If the goal is to force the production path, that's
fine; if the goal is to clean up dead code, the mock is load-
bearing for the demo and onboarding flow. Want me to leave the
mock and remove it only from the production code path?
```

That is "succeeded" + "concerned" + "what would you like". Three sentences, one push, no over-apology.

---

## The failure modes this prevents

- **The "agent said it was done, it wasn't" loop** — the user didn't have to check because the agent gave them a reason to trust.
- **The silent regression** — the agent changed a load-bearing thing and reported it as "no change needed" because the verification was skipped.
- **The "where did we leave off" tax** — six sessions later, the project memory is full of confident claims about state that was never actually verified.
- **The "all tests pass" lie** — 99% passing, 1% failing in a way that matters, and the report just said "passing".
- **The over-apology** — a four-paragraph "I'm so sorry" front-loads the next response with tokens the user didn't ask to spend on remorse.

The cleanest version: every claim has a proof and a boundary. Every report has all four buckets. Every correction is one line. The user can act on the agent's output the moment they finish reading it.
