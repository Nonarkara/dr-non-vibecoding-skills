---
name: stack-repo-topology
description: >-
  Trunk-based dev, path-scoped CODEOWNERS, branch naming, selective CI,
  shared resource patterns. Use when a repo holds many packages or a
  monorepo is starting to drift.
license: MIT
---

# Stack Repo Topology

> A repo that holds many packages is choreography: one trunk gives a shared reality, short-lived branches let domains coordinate, and per-surface release branches respect different cadences. Without a named topology, "we'll figure it out" becomes a year of merge pain.

This skill is the top of the multi-project-architecture trio:
[`route-dont-scan`](../route-dont-scan/SKILL.md) (don't `ls -R` a monorepo),
[`workspace-lean`](../workspace-lean/SKILL.md) (delete worktrees safely),
this skill (how the repo is shaped in the first place).

It applies whether the "stack" is a monorepo with hundreds of packages, a polyrepo whose source-of-truth is one trunk, or a single repo that has accumulated enough skills, playbooks, and references to need its own structure (this repository, for one).

---

## The four rules

### 1. One trunk. Always deployable.

`main` is the only long-lived branch. The graph stays bisectable across every package. Long-lived branches (`develop`, `staging`, `qa`, `uat`) fragment the history and force every package to be tested against every other's drift.

Enforce on the server side as a ruleset (not as a wiki rule people forget):

```yaml
# .github/rulesets/main.json (GitHub) — equivalent exists for GitLab, Bitbucket
target: branch
pattern: main
enforce_admins: true
required_linear_history: true   # no merge commits — keep bisect fast
allow_force_pushes: false
allow_deletions: false
required_pull_request_reviews:
  required_approving_review_count: 1
  require_code_owner_reviews: true   # see rule 3
required_status_checks:
  strict_required_status_checks_policy: true
  required_checks: [ci, lint, test]
```

On the client side, refuse non-fast-forward local merges so the rule is structural, not procedural:

```bash
git config --local pull.rebase true
git config --local rebase.autoStash true
git config --local merge.ff only
```

**Verify:** `git branch -r --list 'origin/*' | grep -vE 'origin/(main|HEAD)'` returns no long-lived branches. `git log --merges origin/main` is empty on a linear trunk.

### 2. Branch names are contracts. Encode them as syntax.

The branch name is the only place ownership metadata lives before the pull request opens. A two-segment prefix convention makes every short-lived branch self-describing:

```
<type>/<domain>/<short-title>
```

| Prefix | Lifetime | Purpose | Example |
|---|---|---|---|
| `f/<area>/<slug>` | hours to a few days | A single feature or fix | `f/checkout/payment-timeout` |
| `chore/<area>/<slug>` | hours | Tooling, deps, refactors with no user-facing change | `chore/ci/bump-node-22` |
| `docs/<area>/<slug>` | hours | Documentation only | `docs/axiom/contrast-floor` |
| `develop/<vertical>` | days to a week | Short-lived staging when a vertical needs to integrate several features before returning to main | `develop/catalogue`, `develop/gateway` |
| `release/<surface>/<yy>.<ww>.<build>` | one to two weeks of hotfix window | Per-surface stabilisation, cut from a tag on main | `release/web/26.36.0` |
| `revert-*` | one PR | A revert created by the git hosting UI | `revert-42` |
| `cherry-pick-*` | one PR | A backport picked from main to a release branch | `cherry-pick-abc1234-to-26.36` |

The convention is enforced with a client-side hook so malformed names never reach the remote. Point Git at a tracked hooks directory so the whole team picks it up:

```bash
git config --local core.hooksPath .githooks
chmod +x .githooks/pre-push
```

```bash
# .githooks/pre-push
#!/usr/bin/env bash
branch=$(git rev-parse --abbrev-ref HEAD)
if ! [[ "$branch" =~ ^(f|chore|docs|develop|release|revert|cherry-pick)/ ]]; then
  echo "Branch name '$branch' does not match the topology convention."
  echo "Expected: <type>/<domain>/<slug> (see skills/stack-repo-topology/SKILL.md)."
  exit 1
fi
```

**Verify:** `git branch -r | grep -vE 'origin/(main|HEAD|f/|chore/|docs/|develop/|release/|revert-|cherry-pick-)'` returns nothing.

### 3. CODEOWNERS makes ownership path-shaped, not person-shaped.

A reviewer per *path*, not per *person*. The reviewer for `skills/data-catalog/` is whoever owns that skill; the reviewer for `templates/` is whoever owns the templates. People change; paths do not.

```gitignore
# .github/CODEOWNERS — LAST matching rule wins, so order most general first
*                                               @org/maintainers
/AGENTS.md                                      @org/maintainers
/README.md                                      @org/maintainers
/CHANGELOG.md                                   @org/maintainers
/skills/                                        @org/skills-maintainer
/skills/axiom-design-core/                      @nonarkara
/skills/data-catalog/                           @nonarkara
/skills/dashboard-discipline/                   @nonarkara
/reference/security-hygiene.md                  @nonarkara
/playbooks/                                     @nonarkera
/templates/                                     @org/templates-maintainer
/templates/deploy-pages.sh                      @org/infra-maintainer
/.github/workflows/                             @org/infra-maintainer
```

The last-match-wins rule is counterintuitive. Read it again. `*` matches everything; the more specific rule below it overrides the general one. New top-level folders get a CODEOWNERS row the day they are added, not the day a conflict happens.

**Verify:** opening a PR against `skills/data-catalog/` automatically requests review from `@nonarkara`; against `templates/deploy-pages.sh` from `@org/infra-maintainer`. The path-scoped review is what makes the merge queue fair.

### 4. CI is path-scoped. Only build what changed.

Building the whole monorepo on every PR is the second-most expensive thing a bad topology does (the first is the merge conflicts that result). Two patterns, often used together:

**a. Path filters in the workflow file.**

```yaml
# .github/workflows/ci.yml
name: ci
on:
  pull_request:
    paths:
      - 'skills/**'
      - 'templates/**'
      - 'playbooks/**'
      - '.github/**'
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: python3 scripts/validate_repo.py
```

**b. Affected testing for code monorepos** (N x, Bazel, Turborepo). This repo has no compiled code; path filters are sufficient. For a Next.js + Python + Go monorepo, use the build system's own affected command (`nx affected:test`, `bazel test $(bazel query 'rdeps(//..., //path/to/changed:target)')`, `turbo run test --filter=...[origin/main]`).

**Verify:** PRs that only touch a single skill do not run the deploy workflow. PRs that only touch a template do not run the security workflow. The CI badge in the README reflects what the *default* branch ran, not the union of every workflow that could run.

---

## Shared resources, centralised

The thing that makes a stack feel like a stack is shared resources, not parallel structure. The pattern: a single source of truth, referenced by import (code) or path (markdown), never duplicated.

### Shared dependencies

Centralise the version catalogue. For Node: `pnpm-workspace.yaml` with one `catalog:` block. For Python: `pyproject.toml` at the repo root with one `[tool.uv]` or `requirements/dev.txt`. For Go: `go.work`. For markdown: there is no tool — rely on the validator in `scripts/validate_repo.py` to catch stale counts.

```yaml
# pnpm-workspace.yaml (Node)
packages: [apps/*, packages/*]
catalog:
  next: ^16.2.1
  react: ^19.0.0
  zod: ^3.23.0
  typescript: ^5.6.0
```

A workspace app declares `"next": "catalog:"` — the version is pulled from the single catalogue. Update once, applies everywhere.

### Shared internal packages

A monorepo's most common refactor is "I want this code in two places." The right answer is a workspace package, not a copy-paste:

```text
packages/
  data-catalog/         # the catalogue interface
  api-client/           # one HTTP client, configured per app
  design-tokens/        # the design system source of truth
apps/
  web/                  # imports @org/api-client, @org/design-tokens
  admin/                # imports the same
```

Internal packages are not "libraries to publish" — they are "code that two apps would otherwise copy-paste." The promotion path: copy-paste, see the second copy, extract a package, import from both. Never extract a package on the first occurrence.

### Shared markdown

A repo with a catalogue, a style guide, a deployment runbook, and a lessons folder is a stack of documents. Keep them in a `docs/` or `_shared/` folder at the repo root and *reference* them from skill files and `AGENTS.md`, never duplicate. The validator in `scripts/validate_repo.py` catches broken local links — that is the safeguard against drift.

---

## Release trains: per-surface, calendar-versioned

When a stack has multiple deployable surfaces (a web app, a mobile app, a worker, a CLI), each one cuts its own release branch from a tag on `main`. Calendar versions (`YY.WW.build`) are easier to reason about than semver for a multi-surface stack because every surface's history lines up by week.

```
release/web/26.36.0       # cut on 2026-09-07 (week 36)
release/admin/26.36.0     # cut same day
release/worker/26.36.1    # hotfix on 2026-09-09, build +1
```

When a commit lands on any release branch, open a PR to merge that release branch back into main the same day. One ledger of record. After the hotfix window closes, lock the branch read-only and keep the tags.

**Release branches are fixes only.** Scope freezes at cut time. Anything larger is a new feature branch off main for the next train.

---

## What this skill does *not* do

**It does not replace release engineering.** A stack of 200 packages owned by 50 teams needs [N x affected](https://nx.dev) or [Bazel](https://bazel.build) at the build-system level. This skill is the *shape*; the build tool is the *mechanic*. Use both.

**It does not eliminate merge conflicts.** Conflicts happen. The topology reduces their frequency and keeps them small when they do.

**It does not impose on a single-package solo repo.** If your repo is one Next.js app with no shared code, you do not need a topology; you need `main` and short feature branches. Re-read this skill when the second worktree is added, not before.

**It does not approve of long-lived `develop`.** A `develop` branch that lives for more than a week is a `develop` branch that has stopped being a coordination siding and started being a parallel trunk. Either merge it back to main, or rename it `release/<surface>/<train>` and treat it as a release branch.

---

## Anti-patterns

**The `develop` branch as parallel trunk.** Two trunks = two realities. Either main is the trunk and `develop` is a coordination siding, or one of them is the trunk and the other is dead weight.

**CODEOWNERS that lists people instead of paths.** People leave teams; paths do not. The team-owned-by-team pattern (`/skills/ @org/skills-team`) is more durable than the person-owned-by-person pattern.

**Renovate + semgrep + ZAP all turned on the same day.** The first PR of the week fails for ten unrelated reasons. Each gate needs a triaged backlog before it is a gate. (See [`appsec-stack`](../appsec-stack/SKILL.md) for the same principle on the security side.)

**Path-filtered CI that hides the whole build.** If path filters mean a PR never runs *any* test, the badge is a lie. The default branch must run the full validation on every push; path filters are for PR feedback speed only.

**Force-push to `main` "just this once."** Once is a year of bisect breakage. Enforce `allow_force_pushes: false` in the ruleset; never disable.

**Deleting release branches during their hotfix window.** The branch is the history of what shipped. Keep it open and protected; after the window, lock it read-only and keep the tags.

---

## The check

```
□ main is the only long-lived branch; ruleset enforces linear history
□ All branches match <type>/<domain>/<slug> (or develop/<vertical>, release/<surface>/<yy>.<ww>.<build>)
□ .githooks/pre-push refuses malformed branch names
□ .github/CODEOWNERS covers every top-level folder; PR auto-requests the right reviewer
□ Path filters in CI workflows; the default branch still runs full validation
□ Shared deps live in one catalogue (pnpm catalog / pyproject / go.work)
□ Internal packages are extracted on the second copy, not the first
□ Calendar version (YY.WW.build) on release branches; tags persist after branches lock
□ Release-to-main back-merge happens the same day as the hotfix
□ A second worktree was not added without a plan
```

Pairs with [`route-dont-scan`](../route-dont-scan/SKILL.md) (don't `ls -R` a monorepo), [`workspace-lean`](../workspace-lean/SKILL.md) (delete worktrees safely), and [`anti-regression`](../anti-regression/SKILL.md) (the patterns earned on the trunk must not be flattened by a cleanup pass).
