# How Dr Non Prompts

Eleven seconds of typing that produces three hours of correctly-scoped work. Why it violates most prompt-engineering advice, why it works anyway, and what you have to already have in place before it does.

*Skill: [`prompt-like-dr-non`](../skills/prompt-like-dr-non/SKILL.md). One-paste transfer: [`HANDSHAKE.md`](../HANDSHAKE.md).*

---

## The observation

Here is a real prompt, unedited:

> "Gemini just worked on this codebase and report this back. Your turn. Make it better. Complete the stack and discuss at length about how using many agents to bounce back ideas and commits from each other might be the way to go and create a workflow for that."

Now count the violations. No role assignment. No output format. No examples. No
step-by-step. No file paths. Three separate requests in one paragraph. A grammar
error in the first sentence. And *"make it better"* — which
[`01-how-i-actually-code.md`](01-how-i-actually-code.md) lists, by name, as a
prompt that consistently fails.

It produced a protocol, a playbook, a tested script, three skills, corrections to
four factual errors in the previous agent's work, and a pushed commit.

Something is going on that the advice does not describe.

---

## What is actually going on

Prompt-engineering guidance is written for a **stranger**. It assumes a model that
knows nothing about you, your project, your taste, or what you already decided —
so it tells you to supply all of that, every time, in the prompt. That is correct
advice for its situation.

These prompts are not addressed to a stranger. They are addressed to a colleague
who has already read the contract, the lessons, and eleven surfaces of standing
instruction. **The context does not need to be in the prompt because it is in the
repository.**

Which means the prompt style and the repo are the same artifact seen from two
ends. Every skill written, every lesson filed, every gotcha dated, is a token that
no longer has to appear in any future prompt. That is the actual return on the
twenty minutes that feels optional every single time.

It also means the style is **not portable on its own.** Copy the prompts without
the substrate and you get under-specification, which looks identical to
compression right up until you read the diff.

---

## Reading one, clause by clause

> **"Gemini just worked on this codebase and report this back."**

Context handoff and, quietly, an ownership transfer. Not *review Gemini's work* —
which produces a findings list and a shrug — but *this is yours now.* The
difference in output is enormous and the difference in wording is almost nothing.

> **"Your turn."**

Two words that set the frame as a relay. The agent that reads this as "your turn
to comment" produces comments. The agent that reads it as "your turn to hold the
baton" produces a commit. See [`14-the-relay.md`](14-the-relay.md).

> **"Make it better."**

On its own, the prompt that fails — it produces a fourth font size, because the
agent gets to choose scope and it will always choose more. It is almost never on
its own. **The clauses after it are the scope**, and reading them as elaboration
rather than as boundary is the single most common misread.

> **"Complete the stack"**

The actual work, stated at outcome altitude. Not *add auth and monitoring* — that
would be the director doing the agent's job. *Complete* presumes the agent can
see what is incomplete, which is a test as much as an instruction.

> **"and discuss at length about..."**

The extraction step. He is an academic; the theory is what makes the work portable
to the next project. An agent that trims this "for brevity" has thrown away the
half that compounds. **Depth in the answer, brevity in the ask** — the compression
runs one direction only.

> **"and create a workflow for that."**

The institutionalise clause. Nothing may live only in the chat. If the reply is
the only place the thing exists, the work did not happen.

Four deliverables, one paragraph, no file paths. The full decoder — nine patterns
and the failure mode of misreading each — is
[`prompt-like-dr-non`](../skills/prompt-like-dr-non/SKILL.md).

---

## The exemplar as a spec

The second prompt in the same chain opened with *"if I want this repo to go as
viral as Garry Tan's skill repo, what else do I need?"*

One proper noun carrying a requirements document. This is how architects brief —
you do not hand a builder a list of forty properties, you hand them a building and
say *like that, but for this site*. It is enormously efficient and it has exactly
one failure mode: the agent builds toward its own private idea of the name and
never says what that idea was, so the mismatch only surfaces at delivery.

The fix is cheap and belongs on the agent's side: **decompress the name in writing
before building.** Three to six concrete properties, which ones you are targeting,
which you are not. Then the director corrects one line instead of rejecting a
deliverable.

---

## The unconventional parts, named plainly

**The prompts are not proofread.** Typos, run-ons, a misremembered name. This is
correct behaviour, not sloppiness: polishing a prompt is work the agent can absorb
for free. An agent that corrects the spelling back, or asks which spelling was
meant, has converted a free inference into a wasted turn.

**Three requests in one message.** Standard advice says one task per prompt. This
violates it deliberately and works because the three tasks share a *subject*.
Compound asks fail when the tasks share only a *session* — that is the real rule
underneath the advice, and it is a better rule.

**"No matter how unconventional."** An explicit lifting of the politeness ceiling.
Models hedge toward the median because the median is safe; this clause says stop.
It is rare, it is deliberate, and hedging after receiving it is the failure most
likely to be noticed — because it is the reason the clause was typed.

**Zero implementation detail, heavy constraint detail.** Across the record: no file
paths, no function names, no architecture. But very specific negatives — no fourth
font size, eight instruments not five hundred, do not touch the deploy script.
**Constraints travel across sessions and models. Instructions do not.** A
constraint stated once keeps working after the conversation is deleted; an
instruction has to be repeated forever.

---

## What you must already have

The compression is not free. It is a transfer of work **from the prompt to the
review**, and it collapses without four things:

1. **Memory that loads itself.** The agent reads the project contract before you type. Without it you are not compressing, you are omitting.
2. **A low cost of being wrong.** Small commits, fallbacks, backups, a path back. Terse prompts are safe because mistakes are cheap — not because the model is good.
3. **You actually read the diff.** This is where the work went. Skip it and you have not saved time, you have moved the debugging to next week, where it costs more and the context is gone.
4. **A named reader.** *"The citizen panel, for someone on a five-year-old Android in a flood, who may not read English."* One sentence that answers every ambiguous decision downstream, and the only place it is worth spending words.

Miss any of the four and the same prompts produce worse output than a careful
paragraph would have. That is the honest version, and it is why
[`HANDSHAKE.md`](../HANDSHAKE.md) leads with the authority boundary rather than
with the prompt patterns.

---

## The one-line version

The prompt is short because the repository is long. Write the repository, and the
prompts get to be eleven seconds.
