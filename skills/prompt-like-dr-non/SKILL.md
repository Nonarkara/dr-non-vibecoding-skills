---
name: prompt-like-dr-non
description: >-
  Decode a director's terse, compound prompt into the work it actually asks for.
  Use when a request is compressed, unconventional, or names a person as spec.
license: MIT
---

# Prompt Like Dr Non

> The prompt is short because the director is compressing, not because the job is small. A prompt that took eleven seconds to type can carry three hours of correctly-scoped work — if you read its shape instead of its words.

[`director-not-typer`](../director-not-typer/SKILL.md) settles *who decides what*.
[`subagent-routing`](../subagent-routing/SKILL.md) is how you brief a child.
This skill is the missing third: **how to read a brief written by a director who
does not write briefs.**

It is written for both directions. An agent uses it to decode. A human learning
this practice uses it to see why these prompts get more out of an agent than
carefully engineered ones do.

---

## The rule

Read the prompt for its shape. Answer the whole shape, including the parts that
were compressed into a name, a comparison, or a trailing clause.

---

## The patterns, and the failure mode of misreading each

### 1. The relay opener — *"X just worked on this. Your turn. Make it better."*

**Asks for:** ownership transfer, not a review.
**Misread as:** a request to grade the previous agent.

The difference is everything. A grader produces a list of findings and stops. An
owner reads the diff, rules on what is wrong with file:line, fixes it, and ships.
Naked *"make it better"* is a prompt that reliably fails — it produces a fourth
font size — but it is almost never naked. The clauses after it are the scope, and
they are the only scope you have.

**What you owe:** the previous agent's errors named plainly, the corrections
committed, and no politeness about it. See [`agent-relay`](../agent-relay/SKILL.md).

### 2. The exemplar as spec — *"as good as \<person or project\>"*

**Asks for:** a whole requirements document compressed into one proper noun.
**Misread as:** flattery, or a vague vibe to gesture at.

This is how architects brief and it is extremely efficient — one name carries
fifty implicit requirements. Your job is to **decompress it in writing before you
build**: name three to six concrete, checkable properties you believe the exemplar
has, say which ones you are targeting and which you are not, then work. If you
decompress it wrong, the director corrects one line instead of rejecting the whole
deliverable.

**Failure:** building toward your own private idea of the name and never stating
it, so the mismatch surfaces only at the end.

### 3. The meta-tail — *"...and discuss at length about Y"*

**Asks for:** the reasoning, in full, as a deliverable.
**Misread as:** an optional preamble to trim for brevity.

The director is an academic; the theory is what makes the work portable to the
next project. Trimming it to "keep the response tight" destroys the thing being
paid for. **Depth in the answer, brevity in the ask** — the compression runs one
way only.

### 4. The institutionalise clause — *"...and set that up"* / *"create a workflow for that"*

**Asks for:** a durable artifact. Nothing may live only in the chat.
**Misread as:** a description of a workflow, written in prose, in the reply.

If the reply is the only place the thing exists, the work did not happen. Ship a
file, a script, a committed document — something that is still there next session
when nobody remembers this conversation.

### 5. The audit opener — *"audit, check, find gaps"*

**Asks for:** negative space, ranked, before any addition.
**Misread as:** permission to add everything you can think of.

Negative space is cheaper to survey than to fill, and the ranking is the actual
deliverable. Build the top few. **Then say explicitly what you did not build and
why** — an honest unbuilt list is worth more than three mediocre additions, and
it leaves the scope decision where it belongs.

### 6. The ceiling lift — *"no matter how unconventional"* / *"be honest"*

**Asks for:** the answer you were rounding off.
**Misread as:** a licence for edginess, or as ordinary politeness to be returned.

Most models hedge toward the median because the median is safe. This clause is an
explicit instruction to stop. Give the real answer including the uncomfortable
one — the naming problem, the thing that will not work, the part of the plan that
is vanity. Hedging *here* is the failure, and it is the one that will be noticed.

### 7. The known-facts clause — *"since \<thing\> is already working"*

**Asks for:** skip the re-derivation, spend the turn on the unknown.
**Misread as:** conversational filler.

This is the *known facts and ruled-out paths* field of a formal brief, arriving in
casual clothes. Re-verifying what you were just told is working burns the turn.

### 8. *"Re-read our history"*

**Asks for:** treating the repository as a corpus — commits, playbooks, lessons,
the record of what was refused.
**Misread as:** a figure of speech.

Actually read it, and quote it. The anthropologist's premise is that the artifact
record is the evidence; an answer that ignores it is an opinion.

### 9. The compound message — three requests, one paragraph

**Asks for:** all of them.
**Misread as:** an invitation to ask which comes first.

Standard advice says one task per prompt. This practice violates it deliberately,
and it works because the tasks share a **subject**. Compound asks fail only when
the tasks share nothing but a session. Do not ask the director to decompose their
own message; that is your job and it costs them a turn.

---

## What is never in these prompts, and what that means

Across real prompts in this practice: **no file paths, no function names, no
architecture, no step-by-step.** That is deliberate, not an oversight, and it is
the load-bearing half of [`director-not-typer`](../director-not-typer/SKILL.md).

Where the director *does* get specific is **negatives and constraints** — no
fourth font size, eight instruments not five hundred, do not touch the deploy
script. Constraints travel across sessions and models; instructions do not.

So: an ambiguity about *mechanism* is yours to resolve and state. An ambiguity
about *intent, users, money, or taste* is theirs, and worth one question — asked
at the moment it blocks you, while you keep doing everything that does not depend
on the answer.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Correcting the director's typos, or mirroring them back | The prompt is unproofread on purpose; polishing it was never the constraint |
| Asking which of the three requests to do first | Decomposition is your job; the question costs them a turn and returns nothing |
| Answering the "discuss at length" part in two bullets | The reasoning was the deliverable |
| Returning a plan and waiting | Plans are how sessions end without shipping. Do the work, then report |
| Grading the previous agent instead of owning the work | A findings list is not a fix |
| Treating "make it better" as licence to widen scope | The following clauses are the scope; the agent always chooses more |
| Hedging after "no matter how unconventional" | You were explicitly told the ceiling is lifted |
| Asking a question answerable by reading the repo | Any prompt that can be answered without opening a file will be — that is the tell they are testing for |

---

## For the human: writing prompts this way

The compression only works if these four things are true, and they are the actual
prerequisites — not the wording.

1. **The memory exists.** The agent reads a project contract before you type. Without it, compression is just under-specification. See [`agent-memory`](../agent-memory/SKILL.md).
2. **The cost of being wrong is already low.** Small commits, fallbacks, backups, a rollback path. Terse prompts are safe because mistakes are cheap, not because the agent is good.
3. **You read the diff.** Compression moves work from the prompt to the review. If you do not review, you have not saved anything — you have deferred it.
4. **You name the reader.** *"The citizen panel, for someone on a five-year-old Android in a flood, who may not read English."* One sentence like that answers every ambiguous decision downstream.

Prompts that consistently fail, from the same record: *"make it better"* alone,
*"add error handling"*, *"refactor this"* with no target, and anything that lets
the agent decide its own scope.

---

## The test

Restate the prompt as a numbered list of deliverables before starting, including
the ones hidden in trailing clauses and proper nouns. If your list has fewer items
than the prompt had clauses, you dropped something — usually the meta-tail, which
is usually the part that mattered.
