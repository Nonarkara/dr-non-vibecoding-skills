---
name: build-journal
description: Use when a meaningful change to a project must be recorded. The 5-line flight-recorder discipline. The journal is the narrative, not the log.
license: MIT
---

# Build Journal — the Flight Recorder

> Every meaningful change is recorded. The journal is the *narrative*, not the *log*. A new builder reads the journal to understand what was built, what was added, what was discussed, and *why*. The journal is the black box that is always on.

This skill is the *discipline* of maintaining a project's build journal. The trigger is the moment a meaningful change is about to be made: a new skill added, a breaking change to the install path, a security incident, a rename, a milestone, a decision that closes a future option. The journal is the *artifact*; this skill is the *how*.

The discipline is the same whether the journal is in the repo (`JOURNAL.md`, `CHANGELOG.md`, `HISTORY.md`), in a notes app, in a wiki, or in a chat thread. The *form* is the form. The *practice* is the practice.

---

## When to use this skill

Load `build-journal` before any of these:

- A new skill, playbook, reference, or template is being added.
- A breaking change to the install path is being made.
- A security incident has been discovered and remediated.
- A rename, rebrand, or reorganization is being applied.
- A milestone is being crossed (100 skills, 1000 commits, 1 year of operation).
- A decision is being made that closes a future option (deprecation, removal, hard pivot).
- A new contributor is joining and the journal needs an entry to introduce the work.

Do **not** use this skill for:

- Routine commits (the journal is the *narrative*, not the *log*; a routine commit is not a narrative event).
- Internal refactors that do not change observable behavior.
- Style changes, comment additions, dependency bumps (these go in the git log, not the journal).

---

## The 5-line format

Every journal entry is exactly **5 lines**:

1. **Date.** ISO format (YYYY-MM-DD or YYYY-MM-DD → YYYY-MM-DD for a range). Sortable. The date is the *first* line because the journal is read in chronological order; the date is the navigation index.
2. **What.** 1-2 sentences. The *change* in observable terms. A new skill called `X` is added; a refactor moves `Y` from `A` to `B`; a decision is made to deprecate `Z`. The What is the *narrative event*.
3. **Why.** 1-2 sentences. The reasoning. The *load-bearing idea* that motivated the change. The Why is the *story*; without it, the What is a log line, not a narrative event.
4. **Diff.** Link to the commit, the file, the skill, the issue, the PR, the discussion. The Diff is the *trace*. A future reader can follow the Diff to the source.
5. **Tags.** 3-5 short tags. `first-skill · milestone · corpus-extraction · security · rename · etc.` The Tags are the *index*. A future reader can search the journal by tag.

The 5-line format is *non-negotiable*. Anything more than 5 lines is moved to a separate doc (a playbook, a reference, a lesson). The discipline is the journal is the *narrative index*; the narrative lives in the linked docs.

### An example entry (good)

```
## 2026-09-09 — Corpus extraction round 2: 3 more paths

**Date:** 2026-09-09
**What:** Three new skills distilled from the corpus, one per the 5 themes the user named: `argument-construction`, `moral-reasoning`, `aesthetics-and-economy`. Each is a *path* (decision logic), not a vendored blog argument.
**Why:** The corpus had more load-bearing ideas than the round 1 bundle captured. The 5 themes mapped to 5 decision types a builder faces. Three of the five themes were net new; two (design thinking, meaning of life) were covered or weak.
**Diff:** `skills/argument-construction/SKILL.md`, `skills/moral-reasoning/SKILL.md`, `skills/aesthetics-and-economy/SKILL.md`
**Tags:** `corpus-extraction · round-2 · 100-skill-milestone`
```

### An example entry (bad)

```
## 2026-09-09 — Various things

**What:** Lots of stuff happened today. I worked on the codebase and added some new skills and also fixed some bugs and refactored some things. The skills are about argument-construction, moral-reasoning, and aesthetics-and-economy. They are good skills that I think will be useful for builders. I also did a round 2 of the corpus extraction process. The previous round was round 1. This is round 2. I will keep doing rounds in the future. I also did other things like reviewing existing skills and adding tags. I am tired now.
```

The bad entry is *12 lines of prose*. The good entry is 5 lines of structured record. The bad entry has no Why, no Diff, no Tags. The bad entry is the *log*; the good entry is the *narrative*.

---

## The discipline (the 7 rules)

### 1. The journal is the *narrative*, not the *log*

The git log is the log: every commit, every line, every whitespace change. The journal is the narrative: the *meaningful* events, the *why*, the *context* a future reader needs to understand what happened and why.

A meaningful event is one that a future reader would want to know about. A new skill, a new playbook, a new reference, a new template, a breaking change, a security incident, a rename, a milestone, a decision that closes a future option. The *list* of meaningful events is small; the journal does not grow with every commit.

### 2. The journal is *append-only*

The journal is never edited. A correction goes in a *new* entry: "Correction to 2026-09-09: the skill was `X`, not `Y` as originally logged." This is the same discipline as the flight data recorder on a commercial airliner: the data is preserved; corrections are recorded as new data.

This is the opposite of the wiki model (where entries are edited) and the changelog model (where entries are versioned). The journal is the *narrative*; the narrative is not edited, the narrative is *appended to*.

### 3. The journal is *AI-maintained*

The user is the operator. The AI is the data entry clerk. The AI reads the commit, the PR, the discussion; the AI drafts the 5-line entry; the user reviews and approves.

The discipline is the AI is *not* free to invent. The What is observable in the diff. The Why is in the discussion. The Diff is the link. The Tags are the AI's classification. The AI is the *secretary*; the user is the *author*.

### 4. The journal is the *first* thing a new builder reads

A new builder — a contributor, a future maintainer, a curious user — reads the journal to understand the *narrative* of the project. The journal is the *first* file to read after `README.md` and `ABOUT.md`. The journal is the *shortcut* to understanding the project: read the journal, know the project.

The discipline is the journal is *legible* without context. A new builder who has never seen the project should be able to read the journal and answer: what is this project? what was built? what is the *trajectory*?

### 5. The journal is *complete* but not *verbose*

Every meaningful event has an entry. No meaningful event is missing. The journal is the *complete* narrative; the narrative is not *verbose*.

The discipline is the journal is the *narrative index*; the long-form explanation lives in the linked docs. A 5-line entry in the journal points to a 200-line playbook; the playbook is the *detail*, the journal is the *index*.

### 6. The journal is the *audit trail*

The journal is the *evidence* the project is being maintained well. A regulator, a partner, a future maintainer, or the user herself can read the journal and answer: is this project healthy? is the discipline being applied? are the meaningful events being recorded?

The discipline is the journal is *honest*. The What is observable. The Why is reasoned. The Diff is verifiable. The Tags are accurate. A journal that is inflated, padded, or self-congratulatory is a journal that has lost the audit-trail discipline; the user stops trusting it; the journal is no longer load-bearing.

### 7. The journal is the *user's* memory, not the AI's

The journal is the *user's* memory. The AI maintains it, but the user is the *author*. The journal is the *evidence* the user has been doing the work, the *narrative* the user has been building, the *audit trail* the user can hand to a future maintainer.

The AI does not own the journal. The AI is the *secretary*. If the AI is replaced (a new model, a new agent, a new operator), the journal persists. The journal is the *user's* memory; the AI is a *tool* the user uses to maintain it.

---

## The corollary disciplines

### 1. The "what counts as meaningful" check

When the AI is drafting an entry, the AI runs the *meaningful* check: *is this a meaningful event?*

- Is this a new skill, playbook, reference, or template? *Yes* if added; *no* if edited.
- Is this a breaking change to the install path? *Yes* if it changes a 1-liner the user has memorized; *no* if it's a bug fix.
- Is this a security incident? *Yes* if it affected users; *no* if it was a pre-emptive patch.
- Is this a rename, rebrand, or reorganization? *Yes* if users have to update references; *no* if it's a typo fix.
- Is this a milestone? *Yes* if it changes how the project is perceived (100 skills, 1000 commits, 1 year of operation); *no* if it's a round number.
- Is this a decision that closes a future option? *Yes* if the user has to know; *no* if it's a tentative choice that can be reversed.

A meaningful event is *load-bearing*; a non-meaningful event is *log noise*. The journal is the *load-bearing events*; the git log is the *log noise*.

### 2. The "what is the load-bearing idea" check

When the AI is drafting the *Why* line, the AI runs the *load-bearing idea* check: *what is the load-bearing idea this change expresses?*

- The change adds a skill. The load-bearing idea is the discipline the skill captures.
- The change deprecates a feature. The load-bearing idea is the *why now* (the timing, the trigger, the consequence).
- The change makes a decision. The load-bearing idea is the *trade-off* the decision resolves.

The Why is the *narrative*; without it, the What is a log line. The Why is the load-bearing idea the change expresses.

### 3. The "is the diff a path" check

When the AI is drafting the *Diff* line, the AI runs the *path* check: *is the diff a path a future reader can follow?*

- A commit hash is a path. The reader can `git show <hash>` and see the change.
- A file path is a path. The reader can `cat` the file and see the change.
- An issue or PR number is a path. The reader can visit the URL and see the discussion.
- "I think I added a skill" is not a path. The reader cannot follow it.

The Diff is the *trace*; without it, the journal is *narrative without evidence*. The discipline is the Diff is a path a future reader can follow.

### 4. The "is the tag accurate" check

When the AI is drafting the *Tags* line, the AI runs the *tag accuracy* check: *is the tag accurate?*

- The tag must be searchable. A future reader searching for `corpus-extraction` should find every corpus-extraction event.
- The tag must be specific. `corpus-extraction · round-2` is better than `update · round-2`.
- The tag must be consistent. If one event is tagged `corpus-extraction · round-1`, the next is tagged `corpus-extraction · round-2` (not `extraction-2` or `corpus-2`).

The Tags are the *index*; without them, the journal is *narrative without searchability*. The discipline is the Tags are searchable, specific, consistent.

### 5. The "is the journal still legible" check

Periodically (every quarter, or every 50 entries), the AI runs the *legibility* check on the journal:

- Read the journal cover-to-cover.
- Is the narrative *coherent*? Does the journal tell a story a new builder can follow?
- Are the *transitions* clear? Does the journal explain why the project moved from Stage N to Stage N+1?
- Are the *dead ends* marked? Are decisions that closed future options annotated with the *what was lost*?

A journal that is *legible* is a journal that a new builder can read and understand the project. A journal that is not legible is a journal that has accumulated entries without the narrative.

The discipline is the journal is *read*, not just *written*. The journal is the *narrative*; a narrative that is not read is a narrative that has lost its purpose.

### 6. The "is the user still the author" check

Periodically, the user runs the *author* check on the journal: *is the journal still mine?*

- Is the journal in the user's voice (or close to it)?
- Is the journal's reasoning aligned with the user's reasoning?
- Is the journal's discipline (the 5-line format, the meaningful check) being applied?

A journal that is no longer the user's is a journal that has been *captured* by the AI's voice. The discipline is the journal is the user's *memory*; the AI is the *secretary*. The user can replace the AI; the user cannot replace the journal.

### 7. The "is the journal the black box" check

When the journal is the *black box* — the flight recorder — the check is: *if the user is hit by a bus tomorrow, can a future maintainer read the journal and continue the work?*

- Is the project state recoverable from the journal?
- Is the reasoning recoverable from the journal?
- Is the discipline (the 7 rules) recoverable from the journal?

A journal that is the *black box* is a journal that is *durable*. A journal that is not the *black box* is a journal that depends on the user; when the user is gone, the journal is gone.

The discipline is the journal is the *durable record*. The user is the *current* author; the journal is the *future* author. The user is mortal; the journal is not.

---

## What this skill is *not*

- It is not a substitute for the git log. The git log is the *every-change* record; the journal is the *meaningful-event* record. The two stack: git log for the *what changed*; journal for the *what it means*.
- It is not a substitute for the changelog. The changelog is the *user-facing* record of *what's new*; the journal is the *internal* record of *what was built and why*. The two stack: changelog for the user; journal for the maintainer.
- It is not a substitute for the about. The about is the *who and why*; the journal is the *what and when*. The two stack: about for the *identity*; journal for the *trajectory*.
- It is not a substitute for the playbook. The playbook is the *how*; the journal is the *what was built*. The two stack: playbook for the *method*; journal for the *history*.
- It is not a press release. The journal is the *honest* record, not the *promotional* record. A journal entry that reads like a press release ("we are excited to announce…") is a journal entry that has lost the audit-trail discipline.

## Pairs with

- **The about file** — the who and why. The journal is the what and when; the about is the who and why. The two stack.
- **The git log** — the every-change record. The journal is the meaningful-event record; the git log is the every-change record. The two stack.
- **The changelog** — the user-facing record. The journal is the internal record; the changelog is the user-facing record. The two stack.
- **The playbook** — the how. The journal is the what was built; the playbook is the how to do it again. The two stack.
- **The lessons file** — the painful-session record. The journal is the *forward* record (what was built); the lessons file is the *backward* record (what went wrong). The two stack.
- **The war-stories file** — the named-incident record. The journal is the *every-event* record; the war-stories is the *narrative* record of the painful events. The two stack.
- **The `narrative-companion-surfaces`** skill — the show-the-work discipline. The journal is the *show*; the work is the *do*. The two stack.

## Check

A "build journal" entry is *ready* to ship when:

- The 5-line format is followed: Date, What, Why, Diff, Tags.
- The Date is in ISO format.
- The What is 1-2 sentences, observable in the diff.
- The Why is 1-2 sentences, the load-bearing idea the change expresses.
- The Diff is a path a future reader can follow (commit hash, file path, issue or PR number).
- The Tags are 3-5, searchable, specific, consistent.
- The meaningful check was run: is this a meaningful event?
- The load-bearing-idea check was run: what is the load-bearing idea this change expresses?
- The path check was run: is the Diff a path?
- The tag-accuracy check was run: are the tags accurate?
- The entry is appended (not edited); the journal is the *append-only* record.

The journal itself is *ready* to read when:

- A new builder can read the journal cover-to-cover and understand the project.
- The narrative is *coherent*; the transitions are clear; the dead ends are marked.
- The journal is the *black box*: a future maintainer can continue the work from the journal alone.
- The journal is the *user's* memory, not the AI's voice; the user can recognize the journal as *theirs*.
- The journal is *honest*; the What is observable, the Why is reasoned, the Diff is verifiable, the Tags are accurate.
