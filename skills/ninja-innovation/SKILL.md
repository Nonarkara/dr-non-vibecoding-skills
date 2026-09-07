---
name: ninja-innovation
description: >-
  Use before writing code for improve/fix/rebuild requests. Find the simplest
  path to the real goal — reframe before refactor, subtract before add, reuse
  before build.
license: MIT
---

# Ninja Innovation

> Don't find a difficult way of doing a difficult thing. Find the simplest way to get what you actually want.

A ninja doesn't break down doors when the window is open. The first hour is reconnaissance, not implementation.

This practice's answer to the same problem `karpathy-guidelines` and `dr-non-golden-rules` solve from other angles: those set the bar ("simplest code that works," "choose the boring solution"); this one is the move set for *getting there* when the request is open-ended.

---

## When this skill applies

- User asks to "improve", "fix", "make better", "redesign", or "rebuild" something.
- User describes a complex outcome with no specified path.
- User requests a feature that *sounds* like it needs new infrastructure.
- You're tempted to spin up a new endpoint, table, page, or module.
- You're about to write more than 200 lines for a task that "should be simple."

If the user has explicitly asked for a specific implementation ("rewrite this in Rust", "use Postgres"), respect that. Ninja innovation is for open-ended improvement requests.

---

## The Five-Question Audit (run before writing code)

1. **What does the user actually want?** Not the feature they asked for — the *outcome*. Approval rating up. Page load fast. Conversion higher. Crisis avoided. Name the outcome in one sentence.
2. **What's already in the codebase that delivers 80% of that outcome?** Walk the data. Walk the components. The answer is almost always already there in some form.
3. **What can I delete to make the existing surface clearer?** A removal often beats an addition. Empty space focuses attention.
4. **What's the smallest change that makes the difference visible?** Not "the right architecture." The *visible* change. A reframe of an existing panel often beats a new panel.
5. **Where's the asymmetric leverage?** Small effort, disproportionate impact. The 5-line change that lands like a 500-line one. Identify it before you start.

If you can't answer all five, you're not ready to code. Sit with the questions another minute.

---

## The Five Ninja Moves

### 1. Reframe, don't refactor

Most "needs new feature" requests are actually "needs new framing of existing data." Before writing a new endpoint or component, ask: *can I rearrange what's already there?*

> Example. User: "Build an approval forecast for the governor."
> Engineer: builds new ML pipeline.
> Ninja: relabels the existing 30-day approval trend as "30-day trajectory" and adds a one-line projection from linear extrapolation. Ships in 20 minutes. The user's actual need was visibility into momentum, not a forecast.

### 2. Subtract before you add

Removing a thing often beats adding one. The clearest dashboards have the fewest panels. The fastest pages render the fewest components.

> Example. User: "Make the dashboard easier to read."
> Engineer: adds a "focus mode" toggle.
> Ninja: deletes three panels nobody uses, slims the header from 9 elements to 4. Now there is nothing to focus.

### 3. Reuse before you build

If the data exists somewhere in the system, route it to the new place. Don't build a parallel pipeline. Two pipelines is one too many.

> Example. User: "Show news on the governor page."
> Engineer: builds a news ingestion service.
> Ninja: imports the existing news component from the operations dashboard. Done.

### 4. Pick the asymmetric move

A small change with disproportionate impact wins over a big change with proportional impact. Asymmetry is the whole game.

> Example. User: "Make the dashboard feel more credible."
> Engineer: writes 2,000-word case study page.
> Ninja: adds "updated 2m ago" timestamps next to every metric. Five-word change per panel. Credibility goes up because freshness is now visible.

### 5. Stealth, not announcement

Demonstrate the value first. Talk about it second. Don't add a "🔥 NEW!" badge or write a launch post. Let users discover the improvement and feel it.

> Example. User: "Tell people about our new live data."
> Engineer: writes blog post + email blast.
> Ninja: ships it without a word. Adds a small green pulsing dot next to live values. Users notice and ask about it. The dot is the announcement.

---

## Engineer vs Ninja

| Engineer | Ninja |
|---|---|
| Builds new endpoint for "approval forecast" | Reframes existing approval trend as forecast |
| Adds new database table | Routes existing data through a new component |
| Refactors module to support a new feature | Adds the feature as a thin new view over existing data |
| Designs config system "for flexibility" | Hardcodes the right thing and ships |
| Shows 50 metrics on dashboard | Shows the 3 decisions the user must make today |
| "Let me clean this up first" | "Let me ship the user-visible change first" |
| New service per concern | One file that wraps existing services |
| Generic abstraction in case it's needed later | Specific code that solves the case at hand |

---

## The Decision Test (for any tool / dashboard / form)

When designing a tool that helps a user *decide* something, ask:

**"What three decisions does this user need to make today?"**

Build for those three. Everything else is context, evidence, or chrome. If you can't name the three decisions in one sentence each, you don't yet know the user's job — interview them, watch them work, read the role description, before you write code.

A good ninja deliverable is small enough that the user can describe what changed in one sentence, but lands hard enough that they bring it up two days later unprompted.

---

## When ninja is the wrong tool

- **Performance work.** Sometimes you do need new infrastructure: caching layers, indexes, async queues. No reframe will save you from a missing index.
- **Genuine new categories of data.** If the system has never tracked a thing before, you need to track it.
- **Greenfield products.** No existing codebase = no reuse path. Ninja moves emerge from accumulated material.
- **Compliance / safety.** Don't subtract a security check because it would be cleaner. Some additions are mandatory.
- **Explicit user spec.** If the user asked for the long path on purpose, take it.

---

## The opening question

Whenever you read an "improve X" request, before you read further, ask in your head:

> "What is the user's actual goal — and what's the laziest possible thing I could ship that gets them 80% of the way there with material I already have?"

That question is the skill. The rest of this document is justification.

---

## Pairs with

`karpathy-guidelines` (minimum code; the bar this move set serves) · `dr-non-golden-rules` (boring over clever, reuse before build) · `no-design-tells` (the restraint the result must not trip) · `design-method` (diverge before you converge, then subtract). If those skills agree on a move, take it — the ninja move is usually their intersection.