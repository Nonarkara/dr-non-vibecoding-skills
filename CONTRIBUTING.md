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

If you added a skill, a playbook, a reference or a template, the gate will
point at every file that still holds the old number. Write the counts it owns
mechanically:

```bash
make sync-counts   # rewrites the count claims, then runs the gate
```

The writer owns the badge, the tree map, the four-shapes table, the AGENTS
contract, the deck, the ecosystem reference, BLUEPRINT, QUICKSTART,
INFOGRAPHICS and the examples in this file. A
count in a skill file is yours to fix: the writer cannot know whether "33
skills" is somebody else's collection, so it leaves the sentence alone and the
gate keeps failing until you write it — as the truth, or as a hyphenated
compound.

The writer also refuses a line that holds a count claim and another number the
gate cannot read, rather than rewriting one and leaving the other. It says
which line it refused, and the gate fails on it: two generations of the same
count in one sentence is a sentence nobody can trust.

Every change the writer makes is printed — file, line, old number, new number.
Read them. The writer makes a number true; it does not know what your sentence
meant, so a count that was meant as a ceiling becomes the collection's size,
and only you can tell that from the diff.

### How to write a count so the gate can read it

The gate reads one shape of claim: a number next to the word that names the
shape — `184 skills`, `17 playbooks`, `14 references`, `21 templates`, and the
repo's own variants (`184 \`SKILL.md\` files`, `17 narratives`, `14 docs`,
`21 drop-ins`). A bare claim in that shape states the size of *this* collection,
so it must be true.

A number that belongs to something else has to be written so it cannot be read
that way:

| Meaning | Write it like this | Not like this |
|---|---|---|
| Another collection | a 91-skill collection | a bare `N skills` claim |
| A subset of this one | a 20-skill set | a bare `N skills` claim |
| A difference | 47 more skills | — (already excluded) |
| A threshold | past 160 skills, at most 20 skills | — (already excluded) |
| A past state | the 167-skill repo of that day | — (already excluded) |

The validator checks:

- folder/name/frontmatter agreement and MIT metadata;
- cross-agent frontmatter compatibility: names at most 64 characters, supported keys only, and YAML-safe descriptions;
- concise trigger descriptions within the repository discovery budget;
- local Markdown links outside fenced examples;
- sequential, unique playbook numbering, and a README list that holds every playbook;
- README and AGENTS count claims, including badge alts and QUICKSTART/BLUEPRINT expect counts;
- every count claim in prose, in every live file — the badge, the four-shapes table, the tree, the AGENTS contract, the deck, the ecosystem reference and the skill files — against the tree;
- list items and table rows that run into each other, in any markdown file;
- Codex and Claude plugin packaging;
- additive installation that preserves skills from other authors and vendors;
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
