---
name: reproducible-result
description: >-
  Pin versions, commit the lockfile, and record the seed and the command.
  Use when a result has to be rerun or adjusted.
license: MIT
---

# Reproducible result

> A result you cannot rerun is a story about a result. Record the command, the versions, and the input, and the next session can change one thing and see what moves.

## The rule

Every result someone may need again ships with a record that a second machine can follow. The record is the command, the tool versions, the lockfile, the input, and the seed when chance is involved. The class from [`proportionality`](../proportionality/SKILL.md) decides how formal the record is.

| Class | The record |
| --- | --- |
| Throwaway | The exact command, pasted in the reply. |
| Prototype | That command, plus the language version, in the PR or a one-screen `RUN.md`. |
| Production | A committed lockfile, SHA-pinned actions, versions in the file that installs them, and the command in the PR. |
| Civic | The production record, plus the input named by hash or by URL and the date you fetched it, and the seed. |

## The procedure

1. Prefer the lockfile the ecosystem already has: `package-lock.json`, `pnpm-lock.yaml`, `uv.lock`, `poetry.lock`, `go.sum`, `Cargo.lock`. Commit it. For Python, [uv](https://github.com/astral-sh/uv) is the vetted installer when you need pins without a new ritual.
2. Pin GitHub Actions to a commit SHA. A floating tag is not a pin. [Dependabot](https://github.com/dependabot/dependabot-core) is how a live repo keeps those SHAs current. Skip it on a throwaway.
3. When the result depends on chance, set the seed in the command or the config and write the seed down. A picture or a sample that changes every run gets the same treatment.
4. Name the input. A file gets a hash in the record. A URL gets the URL and the date.
5. Put the command in the PR body or in `RUN.md`. One screen. Include the version flags you actually ran (`python3 --version`, `node --version`) when the lockfile does not already pin the runtime.
6. To adjust: change one named input, rerun the same command, and show the old line and the new line. A new command for the same question is a different result.

## Anti-patterns

- "Latest" as the version in a production or civic install.
- A notebook whose outputs are saved and whose kernel versions are not.
- Regenerating by re-prompting the model and calling it the same result.
- A lockfile that is gitignored.
- Pinning an action with a tag you have not resolved to a commit.

## The test

Hand the record to a clean directory. The command produces the same artifact, or it fails on a named missing input. If it produces a different artifact and you cannot name which input moved, the record is incomplete.

## Influences

The pin-the-SHA and lockfile habits match the owner's vetted catalog (Dependabot, uv, Trivy reading lockfiles). No upstream text is copied. See [`CREDITS.md`](../../CREDITS.md).
