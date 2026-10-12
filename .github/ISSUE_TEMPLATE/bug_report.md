---
name: Bug report
about: Something in the repo is broken, misleading, or does the wrong thing
title: "[bug] "
labels: ["bug", "needs-triage"]
assignees: []
---

## What happened

A clear, one-sentence description of the bug.

## What I expected

What you expected to happen instead.

## Minimal reproduction

```bash
# The exact command(s) you ran
# or the file you edited
```

If it's a `SKILL.md` issue, paste the frontmatter and the affected section.

## Environment

- macOS / Linux / Windows:
- Agent in use (Claude Code, Codex, Cursor, MiniMax Code, other):
- Skill version (commit hash or date):
- Node / Python version (if relevant):

## Relevant logs

```
# Paste the error output, Mermaid render failure, YAML parse error, or whatever
# the agent showed. Code fences preserve indentation.
```

## Where the bug lives

- [ ] A specific `SKILL.md` (paste the path)
- [ ] A script in `scripts/`
- [ ] A template in `templates/`
- [ ] A reference doc in `reference/`
- [ ] A playbook in `playbooks/`
- [ ] The README / AGENTS.md / another top-level file
- [ ] The validate script itself (`scripts/validate_repo.py`)
- [ ] An illustration in `assets/illustrations/`
- [ ] Other:

## Impact

- [ ] Breaks skill installation (`setup.sh --install-skills`)
- [ ] Breaks first-time bootstrap (`setup.sh --become-builder`)
- [ ] Causes an agent to do the wrong thing (which one, which skill)
- [ ] Renders wrong in GitHub / marketplace
- [ ] Cosmetic / wording
- [ ] Security

## Suggested fix

If you have an idea, sketch it. Even "should this exist at all?" is a valid fix.
