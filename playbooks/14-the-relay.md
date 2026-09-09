# The Relay

Many agents, one repo, passing work to each other through commits. Why the handoff is the point, what it costs, and the rules that stop it becoming a treadmill.

*Skill: [`agent-relay`](../skills/agent-relay/SKILL.md). Tooling: `scripts/relay.sh`.*

---

## The thing I noticed

I stopped running one agent for a long session and started running several agents for short ones, and the work got better in a way I did not predict. I assumed the gain would be throughput — more hands, more code. It was not. Throughput barely moved, because the bottleneck was never typing.

The gain was that **each new agent could see things the previous one structurally could not.**

Watch a long session closely. Around message 12 the agent makes a choice — a name, a shape, an assumption about what I meant. By message 40 that choice is context. By message 90 it is furniture. Ask it at message 90 whether the choice was right and it will explain why it was right, fluently, because from inside that session the choice is not a choice any more. It is the floor.

A fresh agent has no floor. It sees a line of code, not a decision it made. It has no loyalty to defend and no story about how we got here. That is not a personality difference between models. It is a property of the position, and you can only get into that position by leaving and coming back as someone else.

So: many agents, in sequence, each arriving cold. Not a crowd — a **relay**.

---

## Three shapes, and only one of them is this

The repo already had two of the three, and I kept trying to make them cover the third.

**Dispatch** — [`subagent-routing`](../skills/subagent-routing/SKILL.md). A parent sends a child a bounded task and integrates the result. One session, one intent, shared context. The parent owns the answer.

**Swarm** — [`staff-swarm`](../skills/staff-swarm/SKILL.md). Several agents work at once under one orchestrator: researcher, field, assembler. Parallel in time, single-owner in judgment.

**Relay** — this. Agents work the same repo *in sequence*, across sessions and across vendors. **Nobody is orchestrating.** There is no parent holding the intent, because the parent's session ended. Agent B arrives after Agent A has gone, reads a diff, and has to decide what to trust.

That last sentence is the whole problem. In dispatch and swarm, context is shared by construction. In a relay, **the commit is the only thing that survives**, and everything you did not write into it is gone — not degraded, gone.

---

## What actually happened here

This document exists because of a relay leg, so it may as well be the worked example.

An agent did a large overhaul of this repo: two new skills for the production spine, a manifesto section, mental-model diagrams, count reconciliation across eight surfaces. Real work, and most of it good. Then it handed over.

I came in cold and read the diff before reading the summary. Four things fell out in the first pass:

1. The Cloud Run free-tier figures were **swapped** — the skill said 360,000 vCPU-seconds and 180,000 GiB-seconds; the vendor publishes the reverse, and `reference/hosting-matrix.md` in the same repo already had it right. Two files in one repo disagreeing, written weeks apart, neither wrong-looking on its own.
2. The manifesto opened with *"99% of vibe-coded projects evaporate within a week."* Invented. Not directionally wrong — invented. In a repository whose contributing guide bans invented benchmark numbers, next to a skill called [`result-honesty`](../skills/result-honesty/SKILL.md).
3. A cold-start claim of "milliseconds", where the repo's own hosting matrix says under two seconds.
4. A commit trailer crediting `Antigravity <antigravity@google.com>` — an address nobody owns, now permanent in history.

None of these are stupidity. Every one of them is what a competent agent produces at the end of a long session where it has been generating rather than checking. The invented statistic is the tell: it is *rhetorically* correct — it does exactly what that sentence needed — and factually hollow. A long session drifts toward rhetoric, because rhetoric is what fluency optimises for.

And here is the part that matters: **the previous agent could not have caught these by trying harder.** It would have re-read its own sentences and found them persuasive, because it wrote them to be persuasive. The catch required someone who had never seen them before.

---

## The cold read is the asset, so protect it

If the value of the next leg is that it arrives without your frame, then anything you write that installs your frame **destroys the thing you are paying for.**

This is why the handoff note has a shape, and why the shape is so narrow.

**LANDED** — facts a stranger can verify. `skills/google-cloud-run/SKILL.md:12` now reads 180k vCPU-s, matching the vendor page. Not "fixed the Cloud Run figures", which is a claim about my own competence.

**OPEN** — questions with *no preferred answer*. "Cold-start latency is claimed but unmeasured." Not "cold start is probably fine but you might want to check" — that is me handing over my conclusion and then asking someone to confirm it, which is the most expensive way to get an answer I already had.

Everything else gets cut. Especially the reasoning. *"I chose the ledger over commit trailers because trailers get lost in squash merges"* feels like generosity and is actually contamination: the next agent now evaluates my argument instead of the artifact. If the reasoning is genuinely load-bearing it goes in a lesson doc ([`lesson-residue`](../skills/lesson-residue/SKILL.md)) where the next agent can choose to read it — after forming its own view.

The ordering rule follows from this and it is the one thing I would keep if I had to throw the rest away: **read the diff before the note.** Findings that survive the note are real. Findings the note pre-empted tell you the note was arguing. And if you read the note first, you will find exactly what it prepared you to find, and you will feel thorough.

---

## Decorrelation: why it has to be different vendors

Two legs of the same model family is a relay with the coldness taken out. Same training, same idioms, same failure modes — and the second one will read the first one's output as *normal*, because it is exactly what it would have written.

The swapped free-tier figures are a good example of the general case. That error survives any review that is not specifically checking numbers against a source, and it survives it *more reliably* when the reviewer's prior is the same as the author's. Different families have different priors. Where they agree, the finding is almost certainly real. Where they disagree, that is where I look myself — which is the disagreement-as-signal pattern from [`04-multi-agent-and-worktrees.md`](04-multi-agent-and-worktrees.md), except here it is across time rather than across parallel tasks, so it costs no coordination at all.

There is one thing that must **not** be decorrelated: design. Three agents produce three aesthetics and you will ship all of them, in one file, and not notice for a month. Design gets one owner for the whole chain and the other legs do not touch tokens, spacing, or type. That constraint lives in the ledger header, because it is exactly the kind of thing that evaporates at a handoff.

---

## The failure modes, which are all the same failure

Every way a relay goes wrong is a version of *"the next agent added instead of ruled."*

**The politeness ratchet.** Each leg contributes and nothing is ever cut, so the document grows monotonically and the signal per page falls. Three legs in, the README has three manifestos. The fix is that a verdict is mandatory and `reject` is a real option — a leg that only adds is a second author, not a relay leg.

**Churn dressed as improvement.** Leg 3 renames leg 2's helpers because it prefers different names. Nothing is better; the diff is now unreadable and leg 4 cannot tell which changes were corrections. Correct errors; leave taste alone unless it violates a written invariant. If it violates a written invariant, quote the invariant.

**Unverified inheritance.** Leg 1 states a number. Leg 2 doesn't flag it. Leg 3 now treats it as reviewed, because it survived a leg. Absence of a flag is not a check, and this compounds silently — by leg 5 the number has the authority of consensus and nobody ever looked at it. This is why verdicts are per-leg and explicit, and why "confirm" requires naming the check you ran.

**The treadmill.** An agent asked to review will always find something. Past the point of real findings, what it finds is preference, and preference churn is infinite. Hence the stop rule: **two consecutive legs with zero corrections and it is done.** Ship it. That number is not arbitrary — one clean leg can be luck or a lazy reviewer; two different families finding nothing is as much evidence as this method produces.

---

## What it costs

A leg costs a full cold read of the diff. That is not a rounding error, and it sets the size of a leg from both directions: big enough to be worth the read, small enough to actually read.

Which is the same constraint as [`04-multi-agent-and-worktrees.md`](04-multi-agent-and-worktrees.md)'s: **verification scales worse than generation.** A relay does not escape it. What a relay does is make the verification pass *load-bearing and staffed*, instead of a thing you promise yourself you will do after the fun part. In a solo session, review is the chore at the end. In a relay, review is how the next leg is allowed to begin.

So the honest accounting: a relay is slower per unit of code and produces less code per hour. It produces code you did not have to re-read six weeks later, having forgotten why. I will take that trade in every project I intend to still be running next year, and in none of the ones I will delete on Friday.

---

## Running one

```bash
scripts/relay.sh open claude --scope "skills/, README.md"
# read the diff of the previous leg — the diff, not the summary — and write findings
scripts/relay.sh verdict correct "free-tier figures swapped (skills/google-cloud-run/SKILL.md:12)"
# do the work
scripts/relay.sh landed "skills/google-cloud-run/SKILL.md:12 now matches the vendor page"
scripts/relay.sh open-question "cold-start latency claimed but unmeasured"
scripts/relay.sh handoff        # closes the leg, prints the Relay-* commit trailers
scripts/relay.sh status         # baton holder and the zero-correction streak
scripts/relay.sh check          # fails if a leg closed without ruling on the one before it
```

The ledger lives at `docs/relay/RELAY.md`; `templates/RELAY.md.template` is the starting shape, including the standing-constraints block that carries the things a handoff would otherwise lose. The trailers go in the commit so the chain is reconstructable from `git log` alone, with no ledger:

```
Relay-Leg: 02
Relay-Agent: claude
Relay-Reviewed: 01 — 1 corrected, 2 confirmed
Relay-Open: cold-start latency unmeasured
```

Names in trailers are real and routable or a documented `noreply` address. An invented co-author address is a fabricated attribution that git will carry forever, and that one I know from this repo's own history.

---

## The one-line version

Every agent that touches the work should have to say what the last one got wrong, in writing, before it is allowed to add anything of its own. Everything else here is machinery for making that cheap.
