---
name: agent-relay
description: >-
  Hand work between agents through commits with a baton, a ledger, and a
  verdict on the previous leg. Use when several agents work one repo in turn.
license: MIT
---

# Agent Relay

> A second agent is not a second opinion. It is a cold reader who was not in the room when the first one decided — and that coldness is the entire asset. The protocol exists to protect it.

[`subagent-routing`](../subagent-routing/SKILL.md) is a parent dispatching a child inside one session: shared intent, shared context, the parent integrates. [`staff-swarm`](../staff-swarm/SKILL.md) is many agents working at once under one orchestrator. This skill is the third shape and the one nobody writes down: **agents working the same repo in sequence, across sessions and vendors, where the commit is the only thing that survives the handoff.**

Nobody is orchestrating. There is no parent. Agent B arrives after Agent A has gone, reads a diff, and has to decide what to trust.

---

## Why a relay beats one long session

Three failures are structural in a single session, and only a cold agent fixes them.

**Assumption lock-in.** An agent that made a choice at message 12 defends it at message 90. It is not lying; the choice is now context, and context reads as fact. The next agent has no such loyalty — it sees a line of code, not a decision it made.

**Self-grading.** The agent that wrote the change also writes the report on the change. [`result-honesty`](../result-honesty/SKILL.md) constrains the vocabulary; it cannot manufacture an independent look. A relay leg is the only cheap way to get one.

**Correlated blind spots.** One model family fails in one family of ways. Two legs of the same family agree with each other and both miss the same thing. Two legs of different families disagree, and the disagreement is where you look. This is the load-bearing reason to relay across vendors and not just across sessions.

The cost is real and it is a **full cold read of the diff, every leg.** That sets the size of a leg: big enough to be worth reading, small enough to actually read. If a leg's diff cannot be read end to end, the relay has already failed — the next agent will skim, trust, and inherit.

---

## The rule

You do not open a leg until you have ruled on the last one. **Confirm, correct, or reject — with a line reference.** A leg that only adds is not a relay leg; it is a second author, and second authors produce plural work.

---

## The procedure

### 1. Take the baton

One agent holds write on a scope at a time. The ledger says who. Two agents on one path is not a relay, it is a merge conflict with a narrative.

```bash
scripts/relay.sh open claude --scope "skills/, README.md"
```

### 2. Read the diff blind, before the handoff note

This ordering is the protocol, not a nicety.

1. `git log --oneline` the previous leg, then read its **diff** — not its summary, not its commit message body.
2. Write down what you find. Findings, not impressions: file, line, what is wrong.
3. **Then** read the previous agent's handoff note.

Findings that survive the note are real. Findings the note pre-empts tell you the note was arguing rather than reporting — and that is itself a finding about the previous leg.

An agent that reads the note first inherits its frame and then confirms it. That is the failure this ordering exists to prevent, and it is the most common one.

### 3. Rule on the previous leg

| Verdict | Means | Required evidence |
|---|---|---|
| **Confirm** | Checked, correct, stands | The check you ran — a `grep`, a `curl`, the doc that agrees |
| **Correct** | Right shape, wrong detail | The line and the fix, in this leg's commits |
| **Reject** | Should not have landed | The line, the reason, and the revert or replacement |

Silence is not confirmation. A leg that records no verdict is treated by `relay.sh check` as an unreviewed leg, and the chain does not converge until it is ruled on.

### 4. Do your work, then hand off

The handoff note is a **work order, not a defense.** Two sections and nothing else:

- **LANDED** — facts a stranger can verify. "`skills/x/SKILL.md:41` now cites 180k vCPU-s; source: the Cloud Run free-tier page."
- **OPEN** — questions with **no preferred answer**. "Cold-start latency is claimed but unmeasured."

Strip anything that reads as *"I chose X because Y is better."* That is persuasion, and it contaminates the next agent's cold read. If the reasoning matters it belongs in a lesson doc ([`lesson-residue`](../lesson-residue/SKILL.md)); if it does not survive without the reasoning, it was not ready to hand off.

### 5. Write the trailers

Machine-readable state lives in the commit, so the chain is reconstructable from `git log` alone with no ledger file. `scripts/relay.sh handoff` prints this block — verdicts summarised by count, one `Relay-Open` line per question:

```
Relay-Leg: 07
Relay-Agent: claude
Relay-Reviewed: 06 — 2 corrected, 1 confirmed
Relay-Open: cold-start latency claim unmeasured
Relay-Open: no restore has ever been drilled on this project
```

Every trailer goes in the **last** paragraph of the message, with no blank line splitting the block — git's parser reads only the final paragraph, so a relay trailer sitting above the `Co-Authored-By` block is body text that no `%(trailers:key=…)` query will ever find, with no error to tell you. Check with `git log -1 --format='%(trailers)'`.

Names in trailers must be **real and routable, or a documented `noreply` address.** An invented `agent@vendor.com` co-author is a fabricated attribution in permanent history — see [`reference/commit-conventions.md`](../../reference/commit-conventions.md).

### 6. Stop

**Two consecutive legs with zero corrections and the chain has converged.** Ship it. A third leg will find something, because an agent asked to review always finds something; what it finds at that point is preference, and preference churn is how a relay turns into a treadmill.

---

## Decorrelation: the pairing rule

Consecutive legs should not share a model family. The chain's value is the variance between readers; same family, same variance, no signal.

| Leg shape | Good pairing | Why |
|---|---|---|
| Draft → review | Any frontier model → a **different** vendor's frontier model | Different training, different blind spots |
| Bulk sweep → audit | Cheap tier does the sweep, mid tier audits | Per [`staff-swarm`](../staff-swarm/SKILL.md) tiers; verification does not need frontier tokens |
| Architecture → implementation | Frontier plans, mid implements, frontier rules on the result | The planner should not grade its own plan |
| Fact-heavy leg | Any model → one leg whose **only** job is checking numbers against sources | Fabricated figures survive every review that is not looking for them |

Design is the exception. **Design gets one owner for the whole chain** — see [`design-dna`](../design-dna/SKILL.md). Three agents will produce three aesthetics and you will ship all of them.

---

## What travels, what does not

| Travels through a commit | Dies at the handoff |
|---|---|
| The diff | Why this name and not that one |
| Tests and what they assert | What was tried and abandoned |
| The ledger and trailers | The user's tone, urgency, and half-said preference |
| Files in the repo | Anything said only in chat |

Everything in the right column must be **written down or deliberately dropped.** The relay's real failure mode is not a bad commit — it is an unwritten constraint that the next agent violates innocently, three legs later, and nobody can say when it was lost.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Reading the handoff note first | You inherit the frame and then confirm it — the cold read was the asset and you spent it |
| "Merged agent B's work" | Merging is not reviewing. The honest verb is *reviewed, corrected, shipped* |
| Each leg only adds | The politeness ratchet: the doc grows monotonically and nothing is ever cut |
| Renaming the previous leg's helpers | Churn dressed as improvement. Correct errors; leave taste alone unless it violates a written invariant |
| Same model family for consecutive legs | Correlated blind spots — the chain agrees with itself |
| Trusting leg 1's number because leg 2 did not flag it | Absence of a flag is not a check. Unverified inheritance compounds silently down the chain |
| Relay for a one-file fix | A leg costs a cold read of the diff; small work goes to one agent per [`subagent-routing`](../subagent-routing/SKILL.md) |
| Running legs until it feels done | The stop rule is zero corrections twice, not a feeling |

---

## The test

Open `git log` and read only the `Relay-` trailers. If you can say who held the baton at every point, what each leg ruled on the one before it, and which question is still open — the relay worked. If the trailers say only that work happened, you ran a chain of authors, and somebody is going to have to read the whole thing again.
