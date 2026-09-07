# The Codex Workbench

Codex joined this practice after the prime directive already existed because Codex helped cause it. That history matters. The point of a Codex layer is not to pretend the incident did not happen. It is to make the harness structurally less able to repeat it.

The Codex contribution is a clean separation of surfaces: repository law in `AGENTS.md`, reusable work in skills, distributable bundles in plugins, live actions behind MCP or apps, repeated work in automations, mechanical rules in hooks and CI, and bounded parallel work in subagents. One giant prompt cannot do all of those jobs well.

## What changed when Codex became a first-class reader

This repo used to tell Codex users to concatenate skills into `AGENTS.md`. That was portable only in the loosest sense. It loaded every workflow on every task, blurred project rules with reusable technique, and risked instruction truncation.

Codex already has native surfaces for both jobs:

- `AGENTS.md` is discovered from the repository root down to the working directory. Nearer rules override broader rules.
- Skills live in `.agents/skills/` for a repository or `$HOME/.agents/skills/` for a user. Codex starts with their names and descriptions, then loads the full `SKILL.md` only when needed.
- Plugins package several skills, tools, and interface metadata as one installable unit.

That means the right port is not a text conversion. It is a routing decision.

## The daily loop from this side

1. **Route.** Find the target project and read its nearest `AGENTS.md`. Do not scan the estate.
2. **Recall.** Pull at most three relevant lessons from the shared vault. Treat them as context; current project rules and direct evidence still win.
3. **State the conservation law.** One sentence: the quantity, behavior, or experience the change must preserve.
4. **Choose the surface.** Is this a one-off prompt, durable repo rule, reusable skill, installable plugin, live connector, schedule, hard gate, or bounded child task?
5. **Plan the blast radius.** Name files, sacred items, tests, and live verification before editing.
6. **Execute surgically.** Every changed line traces to the request. Independent reads may run together; overlapping writers do not.
7. **Verify the claim.** Build, test, diff, security boundary, deploy, and live URL in proportion to risk.
8. **Capture the lesson.** Only after a novel fix is verified.

The loop is familiar because the best parts were already in this repo. Codex adds stronger surface boundaries and native packaging around them.

## What ECC added

[ECC](https://github.com/affaan-m/ecc) asks a blunt question: is the harness real, or merely described? Its useful test is four verbs:

> installed → discoverable → wired → fired

A hook sitting on disk has not fired. A subagent named in a rule but absent from the runtime is not an agent. A skill copied to the wrong directory is a document, not an active skill. This repo now applies that lesson to itself with a plugin manifest, native install paths, and CI that checks skill structure and links.

ECC also treats deterministic checks as the first grader for agent workflows. That is why the validator uses code to check what code can know. A model can review whether a skill makes good decisions; it should not be asked whether a path exists.

## What taste-skill added

[taste-skill](https://github.com/leonxlnx/taste-skill) starts with “read the room.” That is the missing bridge between a fixed design system and five different audiences.

The useful import is small:

- state the surface, reader, conditions, and register before writing CSS;
- set variance, motion, and density deliberately;
- audit an existing design before changing it;
- ship loading, empty, error, and reduced-motion states, not one perfect screenshot.

Its image-first, rounded, gradient, dark-mode-everywhere defaults do not enter this stack. Dr Non's design contract wins where they conflict. Learning from a system means keeping its good decision rule, not inheriting its whole aesthetic.

## What gstack added

[gstack](https://github.com/garrytan/gstack) carries three ideas that fit cleanly:

1. **Search before building.** Check the current repo, standard library, platform, and installed dependencies before adding code.
2. **Challenge the premise before the implementation.** Ask whether this solves the real outcome, what happens if nothing is built, and which existing flow already owns part of the job.
3. **Complete within scope.** AI makes tests and failure paths cheaper. That is a reason to finish the chosen slice, not permission to rewrite unrelated systems.

Its review discipline adds a fourth: quote the line behind a finding. Agreement between agents is signal; source evidence is proof. Dr Non remains the director.

## Internal subagent or separate task?

An internal subagent is part of the current task. It receives a bounded brief, produces evidence or a diff, and returns to the parent for integration. The parent still speaks to the user.

A separate Codex task is user-owned. It appears independently and can be opened, continued, or handed off. Create one only when the user explicitly asks for a new task. Do not turn ordinary delegation into sidebar debris.

The six-field brief from [`subagent-routing`](../skills/subagent-routing/SKILL.md) works for both: objective, known facts, scope, deliverable, acceptance criteria, and output shape.

## The Codex failure mode

Codex is fast enough to make the wrong thing large before the mistake feels expensive. The answer is not slower typing. It is earlier conservation laws, smaller surfaces, independent verification, and the same anti-regression rule that came from the original incident:

> Never rebuild earned work from memory when git can show the original.

That is the Codex side of vibecoding: use the speed, keep the director, make the evidence mechanical, and never confuse a capable harness with permission to change the brief.

## Official Codex references

- [Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
