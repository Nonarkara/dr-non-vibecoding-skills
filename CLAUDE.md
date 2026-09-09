# CLAUDE.md — entry point for Claude-based agents

This repo's canonical instructions are [`AGENTS.md`](AGENTS.md). This file exists
because `AGENTS.md` names `CLAUDE.md` as the Claude entry point, and a contract
that names a file which does not exist is the exact failure
[`skills/harness-hardening`](skills/harness-hardening/SKILL.md) was written for.

It is a pointer, not a parallel contract. Do not author rules here that belong in
`AGENTS.md` — mirrors drift, and the drift is always discovered late.

## Before your first edit

**Check whether you are a relay leg, not a fresh author:**

```bash
scripts/relay.sh status        # who held the baton last, and whether the chain converged
```

If a leg is closed and unruled, you are the next leg. Read
[`skills/agent-relay/SKILL.md`](skills/agent-relay/SKILL.md) first. The short form:
read the **diff** of the previous leg before its summary, rule on it (`confirm` /
`correct` / `reject`, with a file:line), then add your own work. Two consecutive
legs with zero corrections and the chain is done.

The standing constraints for the current chain are in the header of
[`docs/relay/RELAY.md`](docs/relay/RELAY.md). Read that block before touching
anything — it carries the constraints that a handoff would otherwise lose.

## What this repo is

The meta layer: skills, playbooks, references, and templates for shipping with
agents. No runtime, nothing to compile. Counts live on eleven surfaces and
`make validate` is the only authority — never hand-edit one of them.

## Anti-regression

This repository's distinctive parts are load-bearing and get flattened by
well-meaning cleanup. Before removing or "simplifying" any of these, say out loud
what replaces them:

- **Named incidents.** Every rule is paired with something that actually happened.
  Do not add a rule without one, and do not invent one to fill the slot. An
  invented statistic has already been shipped here once and reverted — see leg 02
  in [`docs/relay/RELAY.md`](docs/relay/RELAY.md).
- **The four shapes.** `skills/` (standing instructions), `playbooks/` (the
  reasoning), `reference/` (stable recipes), `templates/` (drop-in files). Content
  that belongs in one does not get duplicated into another.
- **The voice.** Production-tested, plain, humble, bilingual Thai–English. The
  repo ships [`no-ai-tells`](skills/no-ai-tells/SKILL.md); prose that violates it
  in this repo is a defect, not a style preference.
- **Count surfaces.** Eleven files carry the skill / playbook / reference /
  template counts. `make validate` is the authority.

## Before you claim done

```bash
make validate                  # counts, links, plugin packaging, description budget
scripts/relay.sh check         # every leg ruled on the one before it
```

Then report in [`skills/result-honesty`](skills/result-honesty/SKILL.md) buckets:
succeeded / failed / skipped / unverified.
