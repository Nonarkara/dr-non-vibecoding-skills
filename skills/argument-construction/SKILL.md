---
name: argument-construction
description: Use when an agent must make a case, evaluate a claim, or recognize a fallacy. Eight rules for a good argument + six named fallacies. Pairs with karpathy-guidelines, no-ai-tells.
license: MIT
---

# Argument Construction

> An argument is not a fight. It is a *learning process* where two opposite views, both grounded in evidence, are exchanged for the benefit of both parties. The discipline below is the path of making such an argument and recognizing when one has fallen off the path.

This skill is the *decision logic* for making a case. It is not a debate manual, not a persuasion playbook, not a writing-style guide. The trigger is the moment an agent or writer must put a claim on the table and defend it — in a spec, a review, a proposal, a message to a stakeholder, or a chat reply. The same load-bearing rules apply to evaluating someone else's claim: the same fallacies trip the same tripwires.

**Provenance:** distilled from ten years of daily argument-construction practice at [nonharvard.wordpress.com](https://nonharvard.wordpress.com) — Day 8 *On the Nature of Question*, Day 42 *On Bad Arguments*, Day 94 *On Making an Argument*. The generalizable moves are kept; the personal-philosophy cheatsheet cards (bad faith, biopower, the nuclear family) are stripped.

---

## The 8 rules for a good argument

These are the undergirding structure. Any one of them missing is the reason an argument fails.

### 1. Nonviolent communication is the floor, not the ceiling

The single most important rule. From Marshall Rosenberg's *Nonviolent Communication*:

> "Have you ever found yourself in the middle of an argument listening to your opposition, and you have a strong feeling that something is very wrong with the point that they're making, but you can't pinpoint exactly what it is?"

Violent communication is not just direct abuse. It is *any* ineffective communication: criticism, judgment, sarcasm, vague statement. *"You're always late"* is violent; *"Did you forget to take the trash out?"* is precise. Same observation; very different move.

**The agent check:** before publishing any claim, run it for these four tells. If any is present, rewrite. The rewrite is almost always more specific, not softer.

### 2. Treat yourself like someone you are responsible for helping

Many of us treat other people (and even our pets) better than we treat ourselves. In an argument, this asymmetry shows up as *willingness to be wrong on the other side, but not on our own*. The fix is the same: we owe ourselves the same honesty we owe the counterpart.

**The agent check:** if the agent's first instinct on a counter-claim is to defend, the rule is violated. The right first move is to *check* — *"is the counter-claim true?"* — before rebutting.

### 3. "If you can't first argue in the position of your opposition, you have no right to argue your own."

The steelman rule. Before stating a position, the agent must be able to state the strongest version of the counter-position. If the agent cannot, the agent has not understood the question.

**The agent check:** for any contested claim, write the steelman first. If the steelman is weak, the claim is not yet understood. If the steelman is strong and the claim still survives, the claim is load-bearing.

### 4. Tell the truth — or, at least, don't lie

The simplest rule and the one most often skirted. Lying includes: misrepresenting the source, omitting the disconfirming evidence, softening the trade-off, framing the unknown as known. The discipline is not "always be right" — it is "never present what you don't believe."

**The agent check:** for any claim, ask *"could I defend this statement verbatim to a hostile reviewer with the same evidence?"* If no, the claim is unready.

### 5. Be precise in your speech

Vague language is violence. *"I want you to let me be me"* is vague; *"I want you to give me the freedom to grow and be myself"* is precise. Same speaker, same need, two different arguments.

**The agent check:** every claim should be translatable to a single, falsifiable statement. If the translation requires a paragraph, the claim is not yet specific enough.

### 6. Do some research, or don't

> "It's completely okay to not have an opinion on something." — the Stoic stance

An argument is only worth pursuing when both sides are based on some research. If neither side has read the source, the exchange is not an argument — it is a vibe. The agent's job is to *say so* and to offer the research, not to fill the gap with confabulation.

**The agent check:** for any contested claim, can the agent name the source? If the answer is "I'm reasoning from priors," the claim is a hypothesis, not a finding — name it as such.

### 7. "When the facts change, I change my mind. What do you do, sir?" — Keynes

The discipline of *not* being a consistency-trap prisoner. Robert Cialdini's research: *consistency* is one of the six weapons of influence — once a person has taken a public position, the social pressure to defend it outweighs the new evidence. The argument is not the position. The argument is the *learning*.

**The agent check:** the moment the agent catches itself defending a position rather than evaluating the evidence, the rule is violated. Reframe: "what would change my mind?" If the answer is "nothing," the position is dogma.

### 8. Use "I," not "you" — and follow it with "because"

> "I believe…" / "I think…" / "I feel…" — followed by the magic word, "because."

The classic ad hominem move is to attack the person. The fix is to attack the *position* with *I*-statements. *"I disagree with the claim that X is faster than Y, because in my benchmark on the [date] dataset, Y was 2.3× faster"* is a position. *"You're wrong about X being faster than Y"* is a person-attack.

Ellen Langer's 1978 study: the word "because" substantially increases logical compliance — even when the reason that follows is trivial. Use it. The agent's claims should be: "I claim X, because Y, and the source is Z."

---

## The 6 fallacies to recognize (and refuse to use)

A fallacy is a move that *feels* like an argument but isn't. The list below is the minimum vocabulary. The agent should recognize each in incoming text and refuse to deploy any of them in outgoing text.

### 1. Ad Hominem — attacking the person, not the position

> "Yeah right, how *absurd* it is that a person who hasn't got any children is trying to answer the question whether to have any children."

The attacker is trying to disengage from the argument entirely by discrediting the source. The fix on the *receiving* end: name the move and return to the position. The fix on the *defending* end: refuse the bait; restate the position.

### 2. Slippery Slope — "the only possible scenario is the most extreme"

> "If I have been in China for 7 years — doing well — without having to learn Chinese, why would I need it now?"

The slippery slope assumes the most extreme version of the consequence is the only one. The fix: name the intermediate scenarios. The fix on the receiving end: refuse the framing; ask for the actual chain of steps, with probabilities.

### 3. Appeal to Consequences — "I want it to be true, so it must be"

> "Why have children? For me, it's one major thing to experience in life as a human being."

The arguer conflates "I would like this to be true" with "this is true." The fix on the receiving end: separate the desire from the evidence. The fix on the defending end: state the consequence, but do not let it stand in for the evidence.

### 4. Appeal to Ignorance — "no proof it doesn't exist, therefore it does"

> "Nobody has ever proved to me there's a God, so I know there is no God."

The absence of evidence against a claim is not evidence for the claim. The fix on the receiving end: name the move. The fix on the defending end: do not deploy this move even when the conclusion happens to be true.

### 5. Appeal to Comforting Status Quo — "if it ain't broke, don't fix it"

> "I have been doing X for years and it works fine, why change now?"

The arguer assumes the current state of affairs is self-justifying. The fix: name the cost of the status quo — what is it costing *now*, not what it might cost later. The fix on the receiving end: ask "for whom does the status quo work? at what cost? for how long?"

### 6. Straw Man / False Equivalence / Bandwagon — three related moves

- **Straw Man**: attacking a *simplified* version of the argument instead of the actual one. *"Senator Jones says we should not fund X. I disagree entirely — he wants us to be defenseless."* The fix: restate the original position in its strongest form before responding.
- **False Equivalence / False Dilemma**: presenting two options as the only ones when more exist. *"Either you marry me or you live the rest of your life without me."* The fix on the receiving end: name the missing options. The fix on the defending end: refuse to compress a complex space into two points.
- **Bandwagon**: peer pressure as evidence. *"I have to get married because I turn 27, otherwise the whole society will think of me as unwanted."* The fix: replace "I have to" with "I should" — and demand the reason.

---

## The check (apply before publishing any claim)

```
□ Rule 1 — is the language non-violent (no criticism, no judgment, no sarcasm, no vague statement)?
□ Rule 2 — is the agent willing to be wrong on this side as well as the other?
□ Rule 3 — has the steelman been stated and engaged?
□ Rule 4 — could this claim be defended verbatim to a hostile reviewer with the same evidence?
□ Rule 5 — is the claim translatable to a single, falsifiable statement?
□ Rule 6 — is the source named? (If the answer is "I'm reasoning from priors," the claim is a hypothesis.)
□ Rule 7 — what would change the agent's mind? (If the answer is "nothing," the position is dogma.)
□ Rule 8 — does the claim use "I" + "because" + named source, not "you" + assertion?
```

Six of these eight failing = the claim is not ready to publish. Four = the claim is hypothesis-level; mark it as such. Two = the claim is acceptable; refine later if challenged.

---

## What this skill is *not*

- It is not a debate manual. Debate is competitive; argument is cooperative. The win-condition of an argument is *both parties updated*, not *one party defeated*.
- It is not a persuasion playbook. Persuasion aims at compliance; argument aims at truth. The agent's job is the second, not the first.
- It is not a writing-style guide. The rules are about *what* is said, not *how* it is phrased. (`no-ai-tells` and `make-it-stick` cover the *how*.)
- It is not exhaustive. The list above is the minimum vocabulary. Real-world arguments have more moves (motte-and-bailey, no true Scotsman, moving the goalposts) — the agent should grow the list with practice.

## Pairs with

- [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) — state assumptions before the argument; the argument cannot be evaluated without them.
- [`no-ai-tells`](../no-ai-tells/SKILL.md) §1 — the mechanical tells of machine-generated text are the same shape as the argument fallacies: "not just X but Y" is the false-equivalence fallacy in disguise; the over-softening pattern is the appeal-to-consequences-as-antecedent in disguise.
- [`make-it-stick`](../make-it-stick/SKILL.md) §2 — classic style. The active voice and concrete over abstract are the writing discipline that backs Rule 5 (be precise).
- [`systematic-debugging`](../systematic-debugging/SKILL.md) — finding the flaw in a system is finding the flaw in an argument; the two disciplines are kin.
- [`wrong-green`](../wrong-green/SKILL.md) — testing the failure the user cares about, not the success a CI check confirms; this is Rule 7 (Keynes) in disguise.
- [`ninja-innovation`](../ninja-innovation/SKILL.md) — reframe before refactor; the steelman (Rule 3) is the *reframe* move applied to a contested claim.
- [`cognition-first`](../cognition-first/SKILL.md) — design for the human who shows up; the audience is the counterpart, not the abstract reader.

## Check

An "argument" is *ready* to publish when:

- The 8-rule check above is run, and the failures are below the threshold for the claim's stakes.
- The fallacies check is run on both the agent's text and the incoming text.
- The steelman is stated *first* in any back-and-forth, before the agent's own position.
- The agent can name the source for every load-bearing claim, or label the claim as a hypothesis.
- The agent can name what would change its mind — and the answer is not "nothing."
- The argument survives the read-aloud test: an honest, intelligent, hostile reader would find the argument fair even if they disagreed.
