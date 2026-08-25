# Multi-Agent and Worktrees

Several agents, one repo, no merge hell. Also: what parallelism is genuinely good for, and where it quietly costs more than it saves.

---

## The isolation primitive: `git worktree`, never a sibling clone

Every parallel agent gets its own worktree inside the project:

```bash
git worktree add .claude/worktrees/feature-x -b feature-x
```

Written into the workspace index as a rule:

> Don't create sibling clones of an existing repo; use `git worktree` inside the project.

Why this and not `cp -r`:

- One `.git`, one set of remotes, one set of hooks. No drift.
- Branches are visible from every worktree — you can see what the others are doing.
- Removing it is `git worktree remove`, not a judgement call about which folder was the real one.
- Sibling clones **rot silently**: someone commits to the copy, and six weeks later you have two histories and no idea which is canonical. I have cleaned this up. It's a bad afternoon.

Housekeeping that matters: prune merged worktrees. Stale worktree metadata after a repo move leaves `git` pointing at paths that no longer exist, and the error messages are unhelpful.

`prune` only clears registrations whose directory is already gone — it does nothing for the ninety worktrees still sitting on disk from finished work. For that pass, see [`workspace-lean`](../skills/workspace-lean/SKILL.md): map what's actually alive first, then gate every removal on two independent checks (is it already on a remote, and is it really disposable scratch space rather than a second project sharing a `.git` dir) before anything gets deleted.

---

## What to parallelise

Parallelism pays when tasks are **independent and read-mostly**:

- **Multi-perspective review** of one change — a security pass, a correctness pass, a consistency pass, run concurrently, results compared. Divergence between reviewers is itself signal.
- **Fan-out search** across a large codebase — "find every place we wire a data adapter" is a job for several readers and one synthesiser.
- **Evaluating options** — three independent attempts at a design from different starting angles, scored, then synthesised from the winner while grafting the best bits of the runners-up. Beats one attempt iterated, when the solution space is wide.
- **Mechanical sweeps** — the same transformation across many files, one worktree, verified after.

## What not to parallelise

- **Anything touching shared files.** Two agents in the same module is not parallelism, it's a merge conflict with extra steps.
- **Anything where step 2 needs step 1's judgement.** You'll get two plausible, incompatible halves.
- **Design decisions.** Two agents will produce two aesthetics and you will ship both by accident. Design gets one owner. See [design-dna](../skills/design-dna/SKILL.md).
- **Deploys.** One deploy at a time, always. Two concurrent deploys to a CDN is how you poison a cache key.

---

## The unify pass — non-optional

When multiple agents have worked, there's a real commit type in my history:

```
chore: audit + unify other agents' work, ship as 3.8.8
feat: Research in Progress tab (GLM 5.2) — reviewed, fixed 3 real issues, shipped as 3.8.9
```

Parallel work produces *plural* work. Three agents will invent three helper names for the same concept, three slightly different error shapes, and at least one duplicated utility. Budget a pass whose only job is:

1. Read the union of the diffs, not the summaries.
2. Collapse duplicated helpers to one.
3. Force naming and error-shape consistency.
4. Check the design system wasn't quietly extended (a fourth font size, a new colour).
5. Then, and only then, one commit, one deploy, one verification.

That last line — "reviewed, fixed 3 real issues, shipped as 3.8.9" — is the honest shape of accepting another agent's work. Not "merged". *Reviewed, corrected, then shipped.*

---

## Using several different models

I run more than one model family, deliberately. The useful pattern isn't "the best model" — it's **disagreement as a signal**:

- Give two different models the same review task on the same diff. Where both flag the same line, it's almost certainly real. Where they diverge, that's where I look myself.
- Cheap/fast models are genuinely fine for mechanical passes: renames, adapter scaffolding, test stubs, doc sync.
- Expensive/slow models earn their cost on architecture, adversarial review, and anything where being confidently wrong is expensive.

And a practical note: keep a **local fallback** (Ollama or similar) wired up. Not because it matches a frontier model, but because a working offline path means an outage or a plane doesn't stop the day.

---

## Verification scales worse than generation

The real constraint on multi-agent work isn't token cost. It's that **you can generate ten changes in the time you can properly verify two.**

So the ratio I hold: as parallelism goes up, the fraction of effort spent on the unify-and-verify pass goes up with it — not down. If a session produced more code than you can read the diff of, you did not go faster. You just moved the debugging to next week, where it will cost more and you'll have forgotten the context.
