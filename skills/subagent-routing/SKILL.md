---
name: subagent-routing
description: >-
  Decide whether to delegate and write a six-field brief. Use when a bounded
  subtask, independent review, or parallel work could justify a fresh agent.
license: MIT
---

# Subagent Routing

> The parent owns intent. The child owns a bounded subtask. Forgetting either side of that contract wastes tokens and produces bad output.

The hardest decision in agentic coding is not *how* to do a task. It is *whether* to do the task, or to dispatch it. Get the decision wrong, and you either burn your own context on something a child should have done, or you dispatch to a child something you should have just done in three lines.

This skill is the routing discipline that makes the answer obvious. It is the Mavis / Claude Code / MiniMax Code side of the system — the routing primitives in `playbooks/04-multi-agent-and-worktrees.md` are the model-agnostic version; this is the API surface that Claude-based agents actually expose.

---

## The decision: do it myself, or dispatch?

Three questions, in order. The first one that resolves decides.

### 1. Would delegation cost more context than it saves?

Dispatching a child costs: the brief, the child's own context-loading, the output you have to read. If the task is "read one file and tell me what's in it" or "edit three lines", the dispatch costs more than the work. **Do it yourself.**

If the task is "explore an unfamiliar 40-file repo and summarise the architecture" or "audit all 28 projects for CLAUDE.md anti-regression coverage", a child saves the parent context. Dispatch.

Rule of thumb: **read-mostly, one-shot, large surface → dispatch. Targeted edits, single-file changes, anything that needs the parent's already-loaded state → do it yourself.**

### 2. Does the task need more than one perspective?

If the work is design or architecture (real trade-offs, judgement calls), a single child in the parent's role is no better than the parent itself. **Either do it yourself and iterate, or run two children with different starting angles and synthesise** — see `playbooks/04-multi-agent-and-worktrees.md` for the disagreement-as-signal pattern. Running one child to "double-check your thinking" is the worst of both worlds: it costs the dispatch and gives you no signal, because the brief was identical to the parent's own thinking.

### 3. Does the task block the next decision?

If yes, run it in the foreground. The child returns, you read, you continue. If no, run it in the background and continue non-overlapping work. **Background work must not touch files the parent is touching** — the default assumption is the parent owns writes; the background child reads, suggests, and waits. Two writers to the same files is a merge conflict with extra steps, not parallelism.

---

## The four built-in targets

| Target | What it does | When to call it | What it cannot do |
|---|---|---|---|
| `explore` | Read-only mapping. Searches, reads, summarises. | "Find every place we wire a data adapter", "Map the routing of this Next.js app", "What's the structure of `CLAUDE.md` across all 28 projects?" | **Cannot create or edit files.** This is by design. |
| `worker` | Bounded production work. Writes code, runs commands, ships a diff. Owns the diff it produces. | "Add a `/api/health` route that returns the right shape and update `CLAUDE.md`", "Refactor the auth middleware to use `withApiGuards`" | Cannot talk to the user. Cannot decide whether its work is what the user actually wanted. |
| `verifier` | Independent validation. Reads an existing deliverable, checks it against a spec, reports findings. | "Did the new `ship-discipline` deploy script actually pass its poison-proof check?", "Audit the seven unauthenticated API routes I just listed" | **Cannot fix what it finds.** Reports only. |
| `mavis` | Broad or mixed-scope work that doesn't fit a specialist role. | "Investigate why the dashboard is slow, decide whether to optimise or rewrite" | Cannot read the user's mind about whether to optimise or rewrite. |

**Use the most specific target. Reach for `mavis` only when no specialist fits.** Each child has its own context and its own system prompt; the more specific the target, the less generic the output.

`explore` is the only one of the four that never writes files. This is the safe default for any "I need to understand X before I touch it" question. If a parent needs read-only mapping, an `explore` child is always cheaper than a `mavis` child.

---

## The brief format — six fields, every time

A child agent has no parent context. The brief is the only thing it sees. Missing one of these fields turns the work into guessing.

1. **Objective and why it matters** — the *what* and the *why*. Not the *how*. "Audit the seven API routes that were flagged unauthenticated" is the what. The why is "the board proposal Phase 1 needs this closed before sign-off." A child that knows the why makes better trade-offs when the brief is ambiguous at the edges.
2. **Known facts and ruled-out paths** — evidence the child should not waste time re-deriving. "I already checked the `proxy.ts` middleware — it's not the issue. The issue is in the route handlers themselves." This is the part that prevents the child from re-running the same investigation.
3. **Exact scope, ownership, and out-of-scope actions** — the *bounded* part. "Touch only `src/lib/safe-fetch.ts` and `src/app/api/news/route.ts`. Do not modify other routes. Do not change the deploy script." This is the part most briefs forget, and the part most likely to produce collateral edits.
4. **Expected deliverable** — what shape the answer should be in. "A list of seven file paths with one-line descriptions of what's missing. No code changes." Or "A working PR with these three files modified, build green, deploy verified."
5. **Acceptance criteria** — how the child knows it's done. "The file exists at path X and contains Y; the new test passes; the deploy at `https://example.org/health` returns 200." Without this, the child stops at "I made the change" instead of "I verified the change."
6. **Output format and length** — "one paragraph", "a table", "a diff with line numbers", "a list of five files with one-line reasons". Children default to essays; tell them when you want a list.

**Never say "continue the work above" in a brief.** The child has no "above". State the work as if the child is reading it first, because it is.

**Bad brief**:
> "Fix the auth bug. The cookies aren't being set right. Check the middleware."

**Good brief**:
> "**Objective:** Fix the `auth()` returns null issue in `src/middleware.ts` when the deployed host is `nonarkara.org` but `AUTH_URL` is set to the canonical Cloudflare Pages URL.
> **Why:** Without this fix, every user who signs in via Google OAuth on the production URL gets logged out on the next request, because the session cookie is set on a domain the browser won't send to the live host.
> **Known facts:** The OAuth callback succeeds — `auth()` is being called with a valid session token, but the cookie is not propagating. The cookie name and value are correct. The issue is domain scoping.
> **Scope:** Modify only `src/middleware.ts` and `src/lib/auth-config.ts`. Do not touch the route handlers. Do not change `AUTH_URL` itself — the issue is the cookie attributes, not the env var.
> **Deliverable:** The fix, with a one-paragraph explanation of the mechanism. A `curl` trace showing the cookie is now set with `Domain=.nonarkara.org` (with leading dot) on the live URL.
> **Acceptance:** `curl -i https://<host>/api/pulse` with a valid session cookie returns 200, not 401. The cookie is visible in the response headers with the correct domain attribute.
> **Output:** One paragraph + the diff + the curl trace. Under 300 words of prose."

The same work, two briefs, two very different outcomes.

---

## When the child returns

Treat the child's output as **evidence, not the final user answer.** Two checks before integrating:

1. **Are the important claims actually true?** A child can lie with confidence. Spot-check one of its file references. `read` one of the files it says it changed. If it claims "I deployed and verified", `curl` the URL yourself once before believing it.
2. **Is the deliverable in the form you asked for?** A child that returns a 600-word essay when you asked for a five-row table wasted your reading time. Push back once, briefly, with the form you want. "Same content, but as a table with file path and one-line fix per row."

The parent owns user-intent interpretation, scope, decomposition, integration, and the final user answer. The child owns a bounded subtask. **The child never talks to the user directly.** That is the rule that prevents the "two confused agents arguing in the chat" failure mode.

---

## Parallelism: when it pays, when it costs

Two children in parallel is great when the work is independent and the deliverables combine. Three is great for "evaluate three design approaches from different starting angles, then synthesise." Five is a smell — if you have five children, you probably haven't decomposed the work into units of bounded subtask.

`playbooks/04-multi-agent-and-worktrees.md` is the longer treatment. The Mavis-side version: **parallelism pays when verification scales with generation, which it doesn't.** As parallelism goes up, the unify-and-verify pass the parent runs goes up with it. If a session produced more code than the parent can read the diff of, the session did not go faster. It moved the debugging to next week, where it will cost more and the context will be gone.

---

## The failure modes this prevents

- **Context blow-up** — the parent doing a thirty-file read when a child could have done it in five.
- **"The agent said it was done"** — a verifier child independently confirmed the deliverable; the parent doesn't have to take the worker's word for it.
- **Parallel collision** — two children writing to the same file with no ownership.
- **Confirmation theatre** — running "a second opinion" that has no signal because the brief was identical to the parent's own thinking.
- **The "do it myself for 30 minutes when a child could have done it in 3"** tax — the parent reading a whole unfamiliar repo when an `explore` child could have mapped it.

The cleanest version: parent decides, child produces, parent verifies, parent integrates. Every other shape costs more and is harder to debug.

---

## The single test

If the work is going to need more than one agent to finish, and the work can be cleanly bounded, dispatch. If the work is going to need the parent's already-loaded state, do it yourself. If both, do the part that needs the parent's state, and dispatch the part that doesn't — sequentially, not interleaved, unless the parts are truly independent.
