---
name: harness-hardening
description: >-
  Audit whether agent rules, specialists, and hooks actually exist and fire. Use
  when setting up or debugging an AI coding harness.
license: MIT
---

# Harness Hardening

> A rule the model can ignore is a suggestion. A hook is a rule.

For months my global rules told every agent: *"STOP and use the security-reviewer agent when touching auth, user input, or database queries."* The rule was well written. It was loaded into every single session.

The agent did not exist.

`~/.claude/rules/` referenced fourteen specialist agents by name. `~/.claude/agents/` contained none of them. Every instruction to "use the code-reviewer agent" resolved to nothing, silently, for months — and because the rule *sounded* enforced, I stopped checking whether it was. In the same audit I found five quality hooks sitting on disk, fully written, never wired into `settings.json`. Zero of them had ever fired.

Nothing errored. Nothing warned. The harness looked hardened and was decorative.

This skill is the audit that catches that, and the wiring that fixes it.

---

## 1. The principle: enforcement lives outside the context window

Everything you tell an agent competes for attention with everything else you tell it. Rules are *probabilistic* — they shift behaviour, they do not guarantee it. As a session gets long, or the task gets hard, or the model gets pressured toward "just make it pass," prose loses.

Three tiers, weakest to strongest:

| Tier | Mechanism | Strength | Fails when |
|---|---|---|---|
| **Prose** | `CLAUDE.md`, rules files | Suggestion | Context fills, task gets hard, rule competes with another rule |
| **Agent** | Subagent with its own fresh context | Strong — separate context, can't be argued with | Only if actually invoked |
| **Hook** | Script, runs outside the model, exit code 2 = blocked | Absolute — the model does not get a vote | Only if actually wired |

Put the things you *cannot* have violated in tier 3. Put judgement in tier 2. Leave preference in tier 1.

The corollary that cost me months: **tiers 2 and 3 fail silently when they are not installed.** A missing agent doesn't error. An unwired hook doesn't warn. You get the comfort of the rule with none of the enforcement.

---

## 2. Audit your own harness

Run this before trusting any rule you've written. It answers one question: *does the thing my rules reference actually exist?*

```bash
# Every agent your rules name, vs every agent actually installed
grep -rhoE '\b[a-z0-9-]+-(reviewer|resolver|guide|runner|cleaner|updater)\b|\b(planner|architect)\b' \
  ~/.claude/rules/ | sort -u > /tmp/referenced.txt
ls ~/.claude/agents/ | sed 's/\.md$//' | sort -u > /tmp/installed.txt
comm -23 /tmp/referenced.txt /tmp/installed.txt   # referenced but MISSING — this list must be empty
```

```bash
# Hooks on disk vs hooks actually wired into settings.json
ls ~/.claude/hooks/**/*.js 2>/dev/null
python3 -c "import json;print(json.load(open('$HOME/.claude/settings.json')).get('hooks',{}).keys())"
```

If a hook file exists and its filename never appears in `settings.json`, it has never run. Mine hadn't. For months.

**Do this audit again every time you install a rules pack.** Rules packs ship rules. They do not always ship the agents and hooks those rules depend on, and nothing tells you.

---

## 3. The four hooks that earn their place

Not every hook is worth the latency. These four are, because each one blocks a specific failure I have personally shipped.

### `block-no-verify` — PreToolUse, matcher `Bash`
Blocks git's hook-bypass flags. An agent that cannot get past your pre-commit hook will eventually try to go around it; this is the failure mode where your linter, your secret scanner, and your test gate all quietly stop applying.

The tell that it works: it will block *you* too, including when you paste a test command containing the flag. That is the correct behaviour. Enforcement you can talk your way out of is not enforcement.

### `config-protection` — PreToolUse, matcher `Edit|Write|MultiEdit`
Blocks *modifying* an existing `eslint.config.js`, `.prettierrc`, `tsconfig.json`. Allows *creating* a new one.

This is the sharpest one, because it targets the most seductive agent behaviour there is: the lint error is real, the fix is hard, and weakening the rule makes the red go away. Its refusal message is the whole philosophy in one line — *"Fix the source code to satisfy linter/formatter rules instead of weakening the config."*

### `post-edit-accumulator` + `stop-format-typecheck` — PostToolUse + Stop
A pair. The first records every `.ts/.tsx/.js/.jsx` file touched during a response to a session-scoped temp file. The second, at Stop, reads that list, formats once per project root and runs `tsc --noEmit` once per tsconfig, then deletes the list.

Batching is the point. Formatting on every edit is latency you feel on every single tool call; formatting once at the end is latency you feel once. This is how you get a typecheck gate without making the agent slow to work with.

### The one I skipped
A `pre-bash-git-push-reminder` that prints "Review changes before push… continuing with push." It warns and then does nothing. A gate that always opens is not a gate — it is noise that trains you to ignore hook output. **Deleting a fake gate is worth more than adding a real one**, because fake gates are what make you stop reading the warnings.

---

## 4. Wiring

Hooks go in `~/.claude/settings.json`. `Stop` takes an array, so append — do not overwrite whatever is already there (mine had a session logger I would have silently destroyed).

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/ecc/hooks/block-no-verify.js", "timeout": 10 }] },
      { "matcher": "Edit|Write|MultiEdit",
        "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/ecc/hooks/config-protection.js", "timeout": 10 }] }
    ],
    "PostToolUse": [
      { "matcher": "Edit|Write|MultiEdit",
        "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/ecc/hooks/post-edit-accumulator.js", "timeout": 10 }] }
    ],
    "Stop": [
      { "matcher": "", "hooks": [
        { "type": "command", "command": "~/.claude/hooks/session-log.sh", "timeout": 30 },
        { "type": "command", "command": "node ~/.claude/hooks/ecc/hooks/stop-format-typecheck.js", "timeout": 120 }
      ]}
    ]
  }
}
```

**Then prove each one fires.** Wiring is not installing. Feed the hook the payload it expects and check the exit code — `2` means blocked, `0` means allowed:

```bash
H=~/.claude/hooks/ecc/hooks
printf '{"tool_input":{"command":"git status"}}' | node $H/block-no-verify.js; echo "exit=$?"   # expect 0
# for the blocking case, build the flag indirectly or your own hook will block the test itself
```

Two traps I hit doing exactly this:

- **Test against reality, not a plausible path.** `config-protection` returned `0` on a config path I invented, and I nearly recorded it as broken. It only blocks files that *exist* — creating a new config is legitimate, modifying an existing one is the attack. Test with a real file.
- **Read the script for its input contract.** The accumulator keys its temp file off the `CLAUDE_SESSION_ID` *environment variable*, not the `session_id` field in the JSON payload. I passed the JSON field, got a silent no-op, and briefly believed the hook was dead. Grep the source for what it actually reads.

---

## 5. Agents are tier 2: fresh context is the feature

The reason a `code-reviewer` subagent beats "review your own code" is not that the prompt is better. It is that the subagent has **not been in the room** while you talked yourself into the design. It cannot inherit your rationalisations, because it cannot see them.

So: match the model to the job and let it start clean.

| Job | Model | Why |
|---|---|---|
| `planner`, `architect` | opus | Judgement, tradeoffs, things expensive to get wrong |
| `code-reviewer`, `security-reviewer`, language reviewers | sonnet | Pattern-matching against known failure classes |
| `doc-updater` | haiku | Mechanical, high-volume, low-judgement |

Install the specialists your rules already name. An agent your rules reference and you never installed is worse than no rule at all — it is a quality gate that reports success without running.

---

## The rule

**Write the rule. Then go check the rule can actually be enforced.**

If the enforcement is a hook, fire it and read the exit code. If it is an agent, confirm the file exists. If it is prose, accept that it is a preference and stop pretending otherwise.

A harness you have not audited is a harness you are trusting on vibes — which is fine for preferences, and not fine for the things you told yourself you'd never ship.

---

*The hooks and specialist agents described here come from [affaan-m/ecc](https://github.com/affaan-m/ecc) (MIT) — an agent-harness optimisation system whose core idea, "optimise the context window, persist everything else," is the thing this skill is built on. The audit, the wiring, the skipped hook, and the two testing traps are mine, found the hard way on my own machine.*
