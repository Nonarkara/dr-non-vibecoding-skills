# The Relay Leg — what a cold agent found in a finished overhaul

*2026-09-09 — the user said: "Gemini just worked on this codebase and report this back. Your turn. Make it better. Complete the stack and discuss at length about how using many agents to bounce back ideas and commits from each other might be the way to go and create a workflow for that."*

## What the user asked for

Three things, and the order matters. Take over from another agent's finished work
(not review it — take it over). Close the remaining gaps in the production stack.
And turn the thing that was implicitly happening — agents handing a repo back and
forth — into a written protocol with tooling, because it had been working by luck.

The ask arrived immediately after commit `2af5775` — a large, competent, single-agent
overhaul that had already been pushed to `main`. That timing is the whole lesson.

## What landed

### `skills/agent-relay/SKILL.md` — the protocol for sequential, cross-vendor handoffs

The repo already had dispatch ([`subagent-routing`](../../skills/subagent-routing/SKILL.md),
one session, parent and child) and swarm ([`staff-swarm`](../../skills/staff-swarm/SKILL.md),
many agents at once under one orchestrator). It had no name for the third shape:
agents working the same repo *in sequence*, across sessions and vendors, where
nobody is orchestrating and the commit is the only thing that survives.

The one design decision that defines it: **the handoff note must not contain
reasoning.** LANDED is facts a stranger can verify; OPEN is questions with no
preferred answer. Everything persuasive is stripped, because the next agent's cold
read is the asset being purchased, and an argument installs the previous agent's
frame before the read happens. The reasoning goes here, in `docs/lessons/`, where it
is opt-in and late rather than mandatory and first.

The second decision: **a verdict on the previous leg is required before adding
anything.** Confirm, correct, or reject, with a file:line. Without it a chain of
agents is a chain of authors, and plural authorship is what produces three helper
names for one concept.

### `scripts/relay.sh` — baton, ledger, trailers, convergence

Bash, awk, git. `open` refuses a second baton. `handoff` refuses to close a leg that
recorded no verdict — *silence is not confirmation* is enforced, not advised.
`status` prints the zero-correction streak; two consecutive clean legs means the
chain converged and further legs buy preference churn. `check` is wired into
`make test`.

Chosen thresholds: **two** clean legs, not one (one can be a lazy reviewer) and not
three (an agent asked to review always finds something, so the third finding is
taste). Legs are sized by "a diff a human could read end to end" — that constant
comes from `playbooks/04`'s observation that verification scales worse than
generation.

### `skills/auth-entitlement`, `observability-budget`, `restore-drill` — the spine's missing links

The September overhaul added hosting (`google-cloud-run`) and money
(`stripe-checkout-billing`) and stopped. What sat between them was unwritten: the
stack could serve a request and charge a card but could not say *who* the request
was from, could not notice its own death, and had never gotten its data back.

### The corrections to leg 01

Recorded in [`docs/relay/RELAY.md`](../relay/RELAY.md), and the reason this document
exists:

1. Cloud Run free-tier figures were **swapped** — 360k vCPU-s / 180k GiB-s, where
   the vendor publishes the reverse and `reference/hosting-matrix.md` in the same
   repo already had it right. Two files, weeks apart, neither wrong-looking alone.
2. `README.md` opened with *"99% of vibe-coded projects evaporate within a week."*
   Invented, in a repo whose `CONTRIBUTING.md` bans invented benchmark numbers.
3. A cold-start claim of "milliseconds", contradicting the repo's own "<2s".
4. A commit trailer crediting `Antigravity <antigravity@google.com>` — an address
   nobody owns, now permanent in history.

And one found in passing, older than leg 01: `setup.sh`'s `audit_project()` used
bare `((passed++))` under `set -euo pipefail`. With `passed=0` that arithmetic
evaluates to zero, returns exit 1, and the script aborts. **The audit had been
printing one line and exiting silently.** Line 126 of the same file already carried
the `|| true` guard, so someone had hit this before and fixed only the instance in
front of them.

## Patterns borrowed

| Source | Pattern | Where it landed |
|---|---|---|
| `playbooks/04-multi-agent-and-worktrees.md` | "reviewed, fixed 3 real issues, shipped" as the honest verb for accepting another agent's work | `agent-relay`'s three-verdict table |
| [`adversarial-review`](../../skills/adversarial-review/SKILL.md) | stop when a round yields zero confirmed findings | the two-clean-legs stop rule |
| [`staff-swarm`](../../skills/staff-swarm/SKILL.md) | token tiers — cheap models verify, frontier assembles | the decorrelation pairing table |
| Git's own trailer convention | machine-readable state in the commit, so history reconstructs without a side file | `Relay-Leg` / `Relay-Agent` / `Relay-Reviewed` / `Relay-Open` |
| A shared lock file or `.relay-lock` | looked like the obvious baton primitive | **Refused** — a lock is invisible in `git log` and dies with the session; the ledger is the artifact, and it merges |

## Honest limits

- **The relay has one chain behind it: this one.** Every other skill in this repo is
  paired with an incident that cost something. `agent-relay` is paired with a single
  handoff that went well enough to write up. It needs a second chain, ideally one
  that goes badly, before it deserves the confidence its own prose projects.
- **`restore-drill` has no receipt.** It is correct as far as it goes and it is
  assembled from general practice, not from a restore this practice has performed.
  That is recorded as an open question in the ledger rather than smoothed over.
- **The stop rule is asserted, not measured.** Two clean legs is a judgment call
  about diminishing returns. Nobody has counted the findings-per-leg curve here.
- **Decorrelation assumes different vendors fail differently.** Directionally sound,
  and this chain is one data point for it. It is not a measured claim.
