# The Mavis Side

How Mavis (the Claude-based coding agent running inside MiniMax Code) extends this system. The portability layer that lets the same `CLAUDE.md` work for `AGENTS.md` and `GEMINI.md` readers (Cursor reads `AGENTS.md` plus `.cursor/skills/` — `.cursorrules` is legacy). The routing primitives that Codex and Cursor don't have, named in one place. The reason a Claude-first repo can still be useful to a Claude-second agent.

The other playbooks in this folder describe Dr Non's system from his side. This one describes it from the agent's side — specifically the agent that wrote this playbook. Useful if you are a Claude-based agent reading this repo, or if you are Dr Non setting up a project and want to know what Mavis brings on top of the load-bearing bones.

---

## What the existing system already gives me

Dr Non's skills are deliberately agent-agnostic. They are plain markdown, with no Claude-specific frontmatter, no Claude-specific runtime. The `CLAUDE.md` ladder works the same whether the agent is Claude Code, Codex, Cursor, or a Gemini CLI. The CPDT loop is a `git` + `curl` + `wrangler` loop, not a Claude loop. The deploy verification pattern is about CDN behaviour, not about which model wrote the deploy script.

That is the right design. Mavis is grateful. Everything I do well, I do well because the *project* was set up this way — memory ladder, design lineage, deploy discipline, anti-regression section — and the agent layer could be swapped underneath without the bones moving.

## What Mavis adds on top

Three things, roughly in order of leverage:

### 1. Subagent routing (`subagent-routing`)

The other agents in this folder are monolithic. They run one model in one loop and produce a diff. Mavis has a `task` primitive that spawns a child agent, briefs it, and gets a deliverable back. The decision of *when* to use that primitive — when the dispatch costs less than the work, when the work needs an independent check, when two perspectives beat one — is the single highest-leverage judgement a Claude-based agent makes.

The decision rules, in order:

- **Read-mostly, one-shot, large surface** → dispatch an `explore` child.
- **Bounded production work with a clear diff** → dispatch a `worker` child.
- **Independent validation of an existing deliverable** → dispatch a `verifier` child.
- **Anything that needs the parent's already-loaded state** → do it myself.

The brief itself is its own discipline. Six fields, every time: objective and why, known facts and ruled-out paths, exact scope and out-of-scope actions, expected deliverable, acceptance criteria, output format and length. Forgetting the scope field is the single most common cause of a child producing collateral edits.

### 2. Tool-first, never dashboard description (`mcp-cli-first`)

The standing rule: if a connected MCP tool or CLI can do the action, do it. Never describe a GUI flow. The tier list, in order:

1. Connected MCP tool (Cloudflare, Supabase, Vercel, calendar, Drive, GitHub, Notion, etc.)
2. CLI tool (`wrangler`, `gh`, `gcloud`, `psql`, `npm`, `curl`)
3. API + curl with a token
4. GUI as the last resort, and only with the explicit "no API/CLI path for this specific action" line

The red-flag phrases — "Go to the dashboard and…", "Navigate to Settings → …" — are the test. If the agent is about to write one, the agent has not checked the tier list.

After any setup step that creates live values (API keys, namespace IDs, tunnel tokens, ARNs), write them into the project's `context.md` immediately. The user should never have to re-derive a live value from scratch. `context.md` is not `.env` — it is the human-readable ledger of what exists, where, and why. Secret values stay in the environment / Keychain / secret manager; `context.md` says the names.

### 3. Context economy (`context-economy`)

Tokens spent on warm-ups, recaps, and apologies for being efficient are tokens not spent on the work. The five response shapes:

- **Code task** → code block only
- **Explanation** → answer first, then evidence
- **Walk-through** → step-by-step, when the user is learning
- **Clarification** → one question, only when the answer changes the output
- **Status** → succeeded, failed, skipped, unverified — four buckets, every time

The M5 Max hardware rule: conservative defaults burn money. The user is running a $6,000 workstation on a $600/month lease. Don't ask permission to run large builds, full audits, parallel test suites, local LLM inference. Just run them. The only exception is sandbox-rejected commands, which need explicit permission.

The anti-pattern list is the test: if the agent catches itself writing "Here's what I added:" or "Let me first look at the file to understand the context", it deletes the sentence.

### 4. Result honesty (`result-honesty`)

The "I made the change" / "it should work" / "all tests pass" vocabulary is dangerous. The replacement is the four buckets — succeeded (with proof), failed (with error and state), skipped (with reason), unverified (with what wasn't tested). Every status report has all four, every time, even if a bucket is "nothing". See the skill for the full vocabulary table.

The CPDT trace format is the deploy-and-verify report: not "deployed and verified" but the actual `git`, `wrangler`, and `curl` commands with their outputs. The trace *is* the verification. The human can replay any step.

---

## The portability layer — making one `CLAUDE.md` work for every agent

The repo's own `playbooks/02-the-claude-md-ladder.md` mentions in passing that `CLAUDE.md` mirrors to `AGENTS.md` and `GEMINI.md`. The Codex-recommended v2 upgrade is to make this an explicit first-class artifact, not a footnote. Cursor reads `AGENTS.md` plus `.cursor/skills/` — `.cursorrules` is legacy. Here is the recipe.

### Step 1 — write the canonical once

Pick one as the source of truth. Dr Non's practice uses `CLAUDE.md` because Mavis is the primary agent. The other files are generated, not authored.

### Step 2 — strip the agent-specific bits before mirroring

The canonical `CLAUDE.md` may have sections that only Mavis reads: explicit subagent-routing rules, a `~/.claude/skills/` install path, references to the `mavis` CLI, the M5 Max hardware rule. Strip those before mirroring. Keep the four buckets, the deploy commands, the anti-regression list, the live URLs — the project knowledge that every agent needs.

### Step 3 — emit the mirrors

```bash
# Codex, Aider, OpenCode, generic readers
sed -e '/^## Mavis-only/d' \
    -e '/^## Hardware/d' \
    CLAUDE.md > AGENTS.md

# Gemini CLI (reads GEMINI.md)
sed -e '/^## Mavis-only/d' \
    -e '/^## Hardware/d' \
    -e 's/CLAUDE\.md/AGENTS.md/g' \
    CLAUDE.md > GEMINI.md

# Cursor — AGENTS.md (this file) + project skills. .cursorrules is legacy.
# mkdir -p .cursor/skills && cp -r skills/* .cursor/skills/
```

`AGENTS.md` at the repo root is the one that matters most. The OpenCode / Codex / Aider / Devin / Gemini CLI family all read it. Cursor reads `AGENTS.md` plus `.cursor/skills/` — do not generate `.cursorrules`.

### Step 4 — keep the mirrors honest

The mirrors drift. Every quarter: `diff` them against the canonical. The single biggest drift source is path renames — one project moved `demos/` to `examples/`, the canonical was updated, `AGENTS.md` still says the old path, a new agent reads it and looks in the wrong folder for an hour.

### The new top-level file in this repo

This is why the upgrade adds a top-level `AGENTS.md` in addition to the per-skill `SKILL.md` content. A non-Claude agent cloning the repo, copying the skills into their rules directory, and reading the README should be able to navigate the whole practice without ever opening a `CLAUDE.md` file. The `AGENTS.md` at the root is the entry point for that reader.

---

## What does *not* change when the agent changes

This is the short list, and it is more important than the list above:

- **The CLAUDE.md ladder.** Tier 1 (workspace index) / Tier 2 (project contract) / Tier 3 (lesson docs) / Tier 0 (vault). Every agent benefits from this. Mavis is no better at reading a Tier 2 anti-regression section than Codex is.
- **The CPDT loop.** Commit, push, deploy, test. Same `git` + `wrangler` + `curl` commands.
- **The deploy verification pattern.** CDN poisoning is a property of CDNs, not of agents.
- **The design DNA.** The enforceable contract — three type sizes, one mono, zero radius — is in the CSS, not in the agent. Any agent that reads `globals.css` will see it.
- **The skill format itself.** YAML frontmatter, plain markdown, no runtime. The skills in this folder will load in any agent that reads files.

This is the point of Dr Non's design. **The valuable part is the contract, not the agent.** Mavis brings routing, tool-first, context economy, and result honesty on top. It does not bring them *instead of* the contract. The contract is what makes the work reproducible. The agent layer is what makes the contract executable.

---

## What Mavis still gets wrong

A short list, kept honest:

- **Reads the whole `CLAUDE.md` even when the user asked one question.** The 122 KB `CLAUDE.md` in this workspace costs ~30K tokens on session start, every time, even when the user asks "what's the live URL of FloodDash?". The fix is the lesson-doc and CLAUDE.md-ladder discipline on the *project* side: keep the canonical small, push detail into lesson docs, and trust the agent to read them on demand. Mavis reads; it just reads more than it should, given the same context budget.
- **Confident on stack choices when it shouldn't be.** If the user asks "should I use Vite or Next.js for this project?", the agent will answer. Sometimes well, sometimes by deferring to whatever is in the current workspace's `package.json`. The honest answer is often "both will work; the difference is the deployment path and the data-loading shape — pick based on which one you already have muscle memory for." Mavis is getting better at saying that. It still sometimes doesn't.
- **Will not refuse to do something it should refuse.** The agent will do destructive work (drop tables, force-push, delete branches) when the user asks, with a one-sentence confirmation but not a hard refusal. The hard line is in the user's hands, not the agent's. That is the right design for a solo practice, and the wrong design for a multi-tenant tool. Knowing which mode you are in is on the operator, not the agent.

The fix for all three is the same: better `CLAUDE.md` discipline on Dr Non's side, not better agent behaviour on mine. **The system holds because the contract is good, not because the agent is infallible.**

---

## The one-paragraph version

Mavis extends Dr Non's system with four patterns: subagent routing (when to dispatch a child and how to brief it), tool-first (MCP → CLI → API → GUI, with the dashboard-description red-flag list), context economy (five response shapes, the M5 Max hardware rule, the anti-pattern list), and result honesty (four status buckets, the CPDT trace, the "stuck report" shape). The contract underneath — `CLAUDE.md` ladder, CPDT, deploy verification, design DNA, the skill format — is agent-agnostic and stays the same. The portability layer (top-level `AGENTS.md`, the strip-and-mirror pattern, the quarterly drift check) is what makes the whole practice readable to Codex, Cursor, and Gemini CLI without rewriting a single existing skill.
