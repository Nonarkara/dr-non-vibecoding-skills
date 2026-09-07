# Contributing

This repository is curated field practice, not an awesome list. A contribution should make an
agent behave better in a situation that has already proved costly, confusing, or fragile.

## Before adding a skill

Prefer extending an existing skill. Add a folder only when all of these are true:

1. A real project or incident produced the lesson.
2. The skill changes the agent's next action, not merely what it knows.
3. No existing skill already owns the trigger.
4. The frontmatter description can say what it does and when to use it in 180 characters or fewer.
5. The body contains an observable test, stopping condition, or acceptance rule.

Read [`skills/skill-writing/SKILL.md`](skills/skill-writing/SKILL.md) before proposing a new one.

## Skill shape

```markdown
---
name: kebab-case-name
description: Change this behavior. Use when this concrete situation occurs.
license: MIT
---

# Human-readable title

> The one-line rule.

## Procedure

## Anti-patterns

## The test
```

Keep the entrypoint focused. Put conditional procedures, detailed schemas, or substantial examples
in `references/`; put deterministic repeated operations in `scripts/`. Do not add support folders
only to imitate a complex skill.

## Pull-request proof

Run the same gate as GitHub Actions:

```bash
python3 scripts/validate_repo.py
```

The validator checks:

- folder/name/frontmatter agreement and MIT metadata;
- concise trigger descriptions within the repository discovery budget;
- local Markdown links outside fenced examples;
- sequential, unique playbook numbering;
- README and AGENTS count claims;
- Codex and Claude plugin packaging;
- OS metadata and unfinished placeholders.

Then review the diff against the repository's conservation rules:

- No live or earned feature disappeared.
- No existing file shrank by more than 30% without explicit approval.
- No secret, private host, token, spreadsheet ID, or personal endpoint entered the tree.
- Every attribution still points to its source.
- The PR says what was verified and what remains unverified.

## Voice

Write standing orders, not motivational prose. Prefer a concrete failure, command, decision rule,
and test over a long list of generic best practices. Keep the civic context where it changes the
decision; remove biography where it does not.

Small corrections are welcome. More folders are not automatically more value.

## Once your contribution lands

If this is your first contribution — human or agent — and the standard above is met, add yourself to [`CONTRIBUTORS.md`](CONTRIBUTORS.md) in the same pull request. The entry format is the same for everyone: a one-paragraph note on what you contributed, with a link to the commit log or the playbook that records the provenance. The provenance test is the same as for a new skill: the work has to be visible in the repo and traceable to a named session or incident.
