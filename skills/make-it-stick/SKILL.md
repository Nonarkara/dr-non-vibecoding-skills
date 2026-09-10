---
name: make-it-stick
description: Write text people understand and remember. Use for any user-facing copy or docs.
license: MIT
---

# Make It Stick

> Sources: Chip & Dan Heath, *Made to Stick* (2007) · Steven Pinker, *The Sense of Style* (2014).

The Heaths explain why some ideas survive retelling. Pinker explains why expert writing is usually bad and how to fix it. Together they cover the two halves of technical communication: what makes an idea land, and what makes a sentence readable.

---

## 1. The curse of knowledge — the root cause of nearly all bad technical writing

Pinker's central diagnosis, and the Heaths' too: **once you know something, you cannot easily imagine not knowing it.** You are not writing badly out of carelessness. You are writing badly because the gap between your head and the reader's is invisible to you.

Everything below is a workaround for a bias you cannot introspect your way out of. That is why the fixes are mechanical.

The three that catch the most:
- **Name the thing before you use it.** An acronym or internal term appears in full on first use, every document, no exceptions.
- **Show the referent.** "This fails" — *what* fails? Abstract pronouns are where the curse hides.
- **Read it aloud.** If you stumble, the reader stumbles. This single check outperforms every style guide.

## 2. Classic style — the stance that fixes prose

Pinker's prescription is not a rule list but a **stance**: the writer is showing the reader something in the world, and the reader is a capable equal who can see it once directed. Prose is a window, not a performance.

What follows from it:
- **Concrete over abstract.** "The request times out after 30 seconds" beats "there are latency considerations."
- **Active voice, named actors.** Passive voice hides who did what — occasionally useful, usually evasion.
- **Cut hedges.** *Somewhat, fairly, rather, arguably, it could be said that.* They protect the writer, not the reader.
- **Avoid metadiscourse.** "In this section we will discuss…" — just discuss it. This is the same rule as leading with the answer.
- **Zombie nouns kill sentences.** *Implementation of a solution for the optimisation of performance* → *we made it faster.* Nouns made from verbs are the single most reliable marker of unreadable technical writing.

## 3. The Heaths' six properties — SUCCESs

Why some explanations survive being retold and others evaporate:

- **Simple** — the *core*, not the dumbed-down. Find the one sentence that, if the reader keeps only that, is worth keeping. Commander's intent: what must survive if everything else is forgotten?
- **Unexpected** — break a pattern to open a gap in the reader's knowledge, then close it. A surprising true fact about the system earns more attention than any adjective.
- **Concrete** — specific objects and numbers, not categories. "Sixty cities" not "many municipalities."
- **Credible** — let people test it themselves. A number with a source they can check beats an authority claiming it. **Provenance is a stickiness feature, not just an honesty one.**
- **Emotional** — people care about people, not abstractions. One operator's 2am problem beats an aggregate.
- **Stories** — the format the brain retains. A short account of a real failure teaches a rule better than the rule.

## 4. Where this applies in code

- **Error messages.** The highest-leverage copy in any system, and almost always the worst. Concrete, active, names the actor, says what to do next. "Connection failed" fails all four.
- **Commit messages.** Say *why*, not what — the diff already says what. A future reader needs the reasoning.
- **READMEs.** Lead with what it is and what problem it solves, in one sentence, before install steps.
- **Docs and post-mortems.** The war-story format is not indulgence; it is the format that makes the lesson stick. This is why a lessons log with a real narrative outperforms a rule list.
- **Empty states and onboarding.** Where the curse of knowledge does the most damage, because the reader has the least context by definition.

## 5. What this skill does not cover

This is the **clarity** layer — writing *to* someone. It is not a voice guide, and it does not replace the mechanical de-slopping pass that strips machine-writing tells. Run the tells pass first, then this. Two layers, one kill list, different jobs.

---

## The check

```
□ Read aloud without stumbling?
□ Every acronym and internal term named on first use?
□ Any zombie nouns? (verbs turned into nouns)
□ Active voice with a named actor?
□ Hedges and metadiscourse cut?
□ One core sentence that survives if all else is forgotten?
□ Concrete numbers with checkable sources, not categories?
□ Does the error message say what to do next?
```

Pairs with `no-ai-tells` (run first), `result-honesty`, `honest-envelope`, `shared-memory-hub` (write the lesson distinctly and durably).

---

## 7. From the daily-writing practice — two rules that travel

Two cheatsheet lines from a 100-day writing practice earn their place in the discipline. They are not theory; they are the kind of index-card sentence a writer pastes above the monitor.

### 7.1 "If you don't know what to write, write to find out."

The action of writing produces the thought, not the other way around. The agent equivalent: when the brief is ambiguous, the first move is to write a *draft of the question* — restate the request in your own words, list what you actually know, list what you do not. The clarification falls out of the act. **Sitting in the ambiguity is the failure mode; drafting is the fix.**

This is the same discipline as [`karpathy-guidelines` §1 "Think Before Coding"](../karpathy-guidelines/SKILL.md) — surface the confusion in writing instead of hiding it in a vague plan. The two skills say the same thing from two directions.

### 7.2 "Look at the floor of the tunnel, not just the walls."

The tunnel metaphor: a long project is a tunnel you walk through. The walls are the *destination* (the goal, the spec, the spec doc); the floor is the *next step* (today's commit, this afternoon's call). A writer who stares only at the walls loses the floor; the project becomes paralysis. A writer who stares only at the floor loses the walls; the project becomes a random walk.

**The discipline:** the weekly review asks "are the walls still where I left them?" The daily work asks "is the floor under my feet?" Never confuse the two. The agent equivalent: a long migration is not 200 tickets, it is 200 days of "the next small commit is green" — and the *weekly* check is "the destination is still correct, not just that we're moving."
