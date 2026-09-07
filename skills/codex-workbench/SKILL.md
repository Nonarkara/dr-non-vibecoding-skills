---
name: codex-workbench
description: >-
  Place repeated Codex behavior in the right surface: prompt, AGENTS.md, skill,
  plugin, app, automation, hook, or subagent. Use for Codex setup or workflow ports.
license: MIT
---

# Codex Workbench

> One behavior, one owner, one surface.

Most broken agent setups put everything in one giant instruction file. That makes one-off context permanent, turns reusable workflows into repo law, and asks prose to enforce things a hook or test should enforce.

## Route to the smallest surface

| Need | Put it here | Why |
|---|---|---|
| One task, one exception, one temporary constraint | Current prompt or task | It should disappear with the task. |
| Durable conventions for one repository | `AGENTS.md` | Codex reads it before work and layers nearer files over broader ones. |
| A repeatable workflow with its own trigger | Skill | `SKILL.md` loads only when its description matches or the user invokes it. |
| Two or more distributable skills, optionally with tools | Plugin | The bundle installs and versions as one unit. |
| Authenticated live data or controlled external action | MCP server or app | The server owns auth and action boundaries; the skill owns the workflow. |
| Work that repeats later | Automation | The schedule is state, not prose. |
| A mechanical rule around commands, edits, or lifecycle events | Hook or CI | A rule that must fire needs an executable gate. |
| Independent, bounded work inside the current task | Subagent | Fresh context is useful only when the brief and ownership are clear. |

If a behavior spans surfaces, split it. Example: “always validate skills before release” belongs as a short `AGENTS.md` rule plus a validator in CI. The full validation procedure belongs in a skill only if people run it outside CI too.

## Codex discovery, correctly

Codex reads repository skills from `.agents/skills/` between the current directory and the repository root. User-wide skills live in `$HOME/.agents/skills/`. Do not paste a complete `SKILL.md` into `AGENTS.md`; that defeats progressive loading and can hit the instruction-size limit.

Codex starts with each skill's name and description, then reads the full skill only when selected. Therefore:

- front-load the actual trigger in `description`;
- keep every skill focused on one recognizable job;
- put conditional detail in linked references;
- do not create 30 near-duplicate skills whose descriptions compete for the same prompt.

For a repository that distributes many skills, keep one canonical `skills/` tree and package it as a plugin. Copying the same tree into `.agents/skills/`, `.cursor/skills/`, and `.claude/skills/` inside the source repo creates silent drift.

## `AGENTS.md` is a hierarchy, not a mirror

Codex combines guidance from the global Codex home down through the repository to the current directory. A nearer `AGENTS.override.md` or `AGENTS.md` wins when rules conflict.

Write project `AGENTS.md` for the project. It should carry:

- the conservation law;
- exact run, test, deploy, and health-check commands;
- sacred items and anti-regression rules;
- current architecture and dated gotchas;
- code-review rules that matter enough to repeat.

Do not generate it with a blind `sed` pass from `CLAUDE.md`. Shared facts can match; harness-specific commands and tool names need an explicit adapter.

## Detect before prescribing

Borrowed from ECC's harness audit: installed, discoverable, wired, fired.

1. **Installed** — the file or tool exists.
2. **Discoverable** — the current Codex session can see it from this working directory.
3. **Wired** — config points at the real path and required dependencies exist.
4. **Fired** — a safe test proves the hook, validator, skill, or integration actually runs.

A capability that only passes steps 1–3 is unverified. Say so.

## Subagents are internal; tasks are user-owned

Use an internal subagent for a bounded piece of the current request when it saves context or gives an independent check. The parent owns intent, integration, and the final answer.

A separate Codex task is different: it appears to the user as its own task and continues independently. Create or fork one only when the user asks for a new task or explicit delegation. Do not turn ordinary internal work into sidebar noise.

For either form, the brief states objective, known facts, exact scope, deliverable, acceptance criteria, and output shape. See [`subagent-routing`](../subagent-routing/SKILL.md).

## External actions keep their own gate

Reading public docs or inspecting a repo is not the same as publishing, pushing, merging, sending a message, starting paid compute, or changing credentials. A skill or plugin does not create permission. Keep the approval boundary immediately before the external mutation unless the user already authorized that exact action.

## Sources

- [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI: Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [OpenAI: Plugins](https://learn.chatgpt.com/docs/plugins)
- [ECC](https://github.com/affaan-m/ecc) — the installed/discoverable/wired/fired harness test

## The test

If removing one surface changes unrelated behavior, too much lives there. Split it until each surface has one clear job.
