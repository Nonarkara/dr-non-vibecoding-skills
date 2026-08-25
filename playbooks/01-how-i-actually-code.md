# How I Actually Code

Not the idealised version. The actual loop, as it runs on a normal day.

*Visual summary: [`INFOGRAPHICS.md`](../INFOGRAPHICS.md), page 3.*

---

## The shape of the day

I don't have a sprint. I have a **fleet**: roughly twenty first-party projects, of which three or four are hot at any time, plus around 110 background services that must keep running whether I'm looking or not.

A typical day is three or four *passes*. A pass is one coherent intention, start to shipped, usually 60–180 minutes:

> "Now that it's about trading — I have provided you with a lot of repos that do that — can we learn from that and populate the landing page with more info: what to watch, what to trade now, and the data. Not just Thai but also overseas market. Look across the globe."

That's a real prompt that produced a real ship. Note what it contains: a domain, a source of prior art, a concrete surface (`the landing page`), and a scope boundary (`look across the globe`). No architecture, no file names, no step-by-step. That's deliberate — the agent reads the code; I hold the intent.

Six months of this is about **1,691 commits**, averaging nine a day.

---

## The loop, in order

### 1. Start where the memory is

Every session begins with the agent reading `CLAUDE.md` — the workspace index, then the project contract. That's not politeness; it's how it learns the deploy command, the port, the load-bearing CSS reset, and the three things it must not touch. See [agent-memory](../skills/agent-memory/SKILL.md).

If I'm returning to a dormant project, the agent reads `docs/lessons/` too. Five weeks away, productive in ten minutes.

### 2. State the intention at the altitude of an outcome

I describe what the user should be able to *do*, and what the surface should *feel* like. Not the implementation.

Where I *do* get specific is **negatives and constraints**: don't add a fourth font size, keep it under the mobile budget, the universe is eight instruments not five hundred. Constraints travel much better than instructions.

### 3. Let it work; read the diff, not the summary

I don't watch tokens. I read the diff. The summary is the agent's account of what it did; the diff is what it did.

What I'm scanning for, in order:
- Did it touch files nobody asked it to touch? (see [karpathy-guidelines](../skills/karpathy-guidelines/SKILL.md))
- Did it introduce a token, a font size, a colour that isn't in the system?
- Did it delete something that looked like an oddity but was load-bearing?
- Did it invent a fallback that hides a failure instead of surfacing it?

### 4. Ship it — CPDT, every time

Commit → Push → Deploy → **Test on the live URL**. Localhost is never a deliverable. The T is a `curl` that greps for the thing I just added, not a green test suite. See [ship-discipline](../skills/ship-discipline/SKILL.md).

If the CDN is involved, the deploy script does content-level probing, because CDNs lie. See [deploy-verification](../skills/deploy-verification/SKILL.md).

### 5. Write the lesson while it's fresh

Anything that was hard gets `docs/lessons/YYYY-MM-DD-the-<something>-pass.md`, ending in one line for the next agent. Anything that was *painful* also gets a CLAUDE.md gotcha with a date.

This step feels optional every single time. It is the highest-compounding twenty minutes in the whole loop.

---

## What I delegate, and what I never do

**Delegated entirely:** boilerplate, adapters, test scaffolding, refactors with a clear target, data ingestion, recall of anything I wrote three weeks ago, and every kind of "do this same thing across eleven files."

**Never delegated:**
- **Taste.** Whether a surface is right is not a question with a retrievable answer.
- **What to build next.** The agent optimises within the frame; choosing the frame is the job.
- **When it's done.** "Done" is a claim about a live URL and real users, not about code.
- **Whether to kill it.** Sunk cost is a human failure mode and needs a human to override it.

The division: **the agent holds the typing, the recall, and the patience. I hold the taste, the risk appetite, and the definition of done.**

---

## Prompts that consistently work

**Name the surface and the reader.** *"The citizen panel, for someone on a 5-year-old Android in a flood, who may not read English."* Every ambiguous decision downstream now has an answer.

**Give prior art, demand patterns not copies.** *"Here are ten trading repos — learn from them."* What landed was a table of `repo → pattern → where it landed`, plus an explicit list of the four repos that were **refused** and why. Stealing patterns scales; vendoring repos doesn't.

**Ask for honest limits in the output.** *"Say what this can't do, in the code, not in fine print."* Produces things like *"no fundamentals for global indices — this read is 100% technical, there is no Graham number for the S&P 500."* That sentence is worth more than the feature.

**Ask it to audit other agents.** *"Audit and unify other agents' work, then ship it."* When several sessions have run in parallel, this is a real and repeatable commit type.

**Make it prove it read the code.** Any prompt that can be answered without opening a file will be. Ask for file names and line numbers.

---

## Prompts that consistently fail

- *"Make it better"* — produces a fourth font size.
- *"Add error handling"* — produces handlers for impossible cases and swallowed real ones.
- *"Refactor this"* with no target — produces a diff you can't review.
- Anything that lets the agent decide scope. It will always choose more.

---

## The uncomfortable truth about speed

The reason this works is not that the agent is fast. It's that **the cost of being wrong was engineered down first** — small commits, mock fallbacks, last-good caching, watchdogs, nightly backups, graceful degradation.

Speed is a *consequence* of cheap mistakes, not a substitute for handling them. Every technique in this repo is really about the same thing: making it safe to move at this pace, alone.
