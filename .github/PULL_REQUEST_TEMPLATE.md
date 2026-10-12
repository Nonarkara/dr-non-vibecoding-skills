## What

A clear, one-sentence description of the change.

## Why

The trigger, the lesson, the cost of not changing. If the change came from a
production incident, paste the date and the cost. If it came from a book,
name the book. If it came from a sister practice, name the source repo.

## How to verify

The exact commands a reviewer can run to confirm the change works. For a
`SKILL.md` change, name the trigger and the expected agent behavior. For a
template change, show the rendered output. For an illustration, paste the path.

## Affected surfaces

- [ ] New or modified `SKILL.md` (which one)
- [ ] New or modified template (which one)
- [ ] New or modified reference doc (which one)
- [ ] New or modified playbook (which one)
- [ ] Illustration in `assets/illustrations/`
- [ ] Top-level file (`README.md`, `AGENTS.md`, `BLUEPRINT.md`, etc.)
- [ ] `scripts/` (CI / install / validate)
- [ ] Plugin manifest (`.claude-plugin/`, `.codex-plugin/`, `.agents/`)
- [ ] Workflow (`.github/workflows/`)

## Anti-slop self-check

This repo has a four-layer anti-slop pipeline
([`slop-detect-stack`](../skills/slop-detect-stack/SKILL.md)). Confirm:

- [ ] Code: no `as any` / swallowed exceptions / TODO stubs / oversized functions introduced
- [ ] PR: title is `type(scope): subject`; description has *what* AND *why*
- [ ] Prose: no banned vocabulary (`delve`, `tapestry`, `leverage`, "In today's world")
- [ ] UI (if changed): no gradients introduced; `axiom-audit` passes

## Anti-regression check

- [ ] No earned UI file collapsed by more than 30% in this diff
- [ ] No sacred design invariant changed without a documented reason
- [ ] No live data source removed or throttled

## Tests

- [ ] `python3 scripts/validate_repo.py` passes locally
- [ ] `bash -n setup.sh scripts/*.sh` passes
- [ ] (if applicable) the relevant `scripts/test-*.sh` passes

## Out of scope

What this PR explicitly does NOT touch, so reviewers don't scope-creep.
