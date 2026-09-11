# Value Investing: Graham's Core Discipline

> This skill equips an AI agent to reason about investments using Benjamin Graham's timeless principles: distinguishing price from intrinsic value, demanding a margin of safety, treating market offers as optional, separating investing from speculation, mastering temperament, focusing on long-term compounding, and recognizing the limits of early‑era tactics. Each chapter isolates a theme so the agent can load only what it needs for a given decision.

Source: /Users/axiom/Downloads/Benjamin Graham, Seymour Chatman - Benjamin Graham_ The Memoirs of the Dean of Wall Street (1996, Mcgraw-Hill) - libgen.li.pdf  
Purpose: You are extracting a VALUE INVESTING skill for an AI agent. The source is Benjamin Graham's memoirs — the reflections of the father of value investing, mentor to Warren Buffett, on what makes a good investor, what makes a good business, and what makes a good steward of other people's money.

Distil for the AI use case, not the human reader. The AI loads this when it has to:
1. Distinguish price from value. The market price is a vote; the value is the underlying business. The AI should always ask "what is this thing actually worth?" before accepting the market's number.
2. Apply margin of safety: the difference between price and value is your margin. The AI should never recommend an investment that does not have a clear margin of safety.
3. Reason about Mr. Market — the manic-depressive allegorical partner who offers you different prices every day. The AI should learn to ignore the mood and use the offer.
4. Distinguish investing from speculating. Investing is "an investment operation which, upon thorough analysis, promises safety of principal and an adequate return." Speculation is everything else. The AI should be clear which one is being proposed.
5. Recognise the role of temperament over intellect. Graham is explicit: the investor's chief problem is temperament, not intelligence. The AI should warn when the user is making a temperament-driven decision (FOMO, panic, overconfidence).
6. Reason about the long game: compounding is the engine, time in the market beats timing the market, and most "opportunities" are distractions. The AI should help the user stay patient.
7. Be honest about Graham's limits. He was writing in a different era; the modern stock market has more participants and more information asymmetry, and Graham himself revised his view of the value approach over time. The skill is his principles, not his tactics.

Output: 8-10 self-contained chapters, 5-10 core principles, 15-25 glossary terms, 8-12 patterns, 15-25 cheatsheet rules. The deliverable is a skill the AI loads when it has to reason about an investment, critique a financial decision, or talk to a user about the long-term discipline of money.

Voice: Dr Non's standard of comprehension. Plain English. No "leverage", "utilize", "robust", "holistic", "synergy", "paradigm", "delve", "tapestry", "testament", "landscape", "journey", "in today's fast-paced world", "it is important to note that", "at the end of the day".  

Chapters: 10  
Glossary terms: 23  
Patterns: 8  
Cheatsheet rules: 20  

## When to load this skill

This skill equips an AI agent to reason about investments using Benjamin Graham's timeless principles: distinguishing price from intrinsic value, demanding a margin of safety, treating market offers as optional, separating investing from speculation, mastering temperament, focusing on long-term compounding, and recognizing the limits of early‑era tactics. Each chapter isolates a theme so the agent can load only what it needs for a given decision.

## Core principles

- Price is what you pay; value is what you get, and the investor must always estimate the latter before accepting the former.
- A margin of safety—the gap between price and estimated value—protects against error and uncertainty.
- Mr. Market offers daily prices; the wise investor ignores his mood and acts only when the offer suits their valuation.
- Investing promises safety of principal and an adequate return after thorough analysis; speculation lacks this promise.
- Temperament, not intellect, determines investment success; emotional discipline outweighs IQ.
- Compounding over time beats market timing; staying invested through cycles yields the best results.
- Graham's methods were forged in a less‑efficient market; modern agents must adapt while keeping the underlying principles.
- Honest self‑appraisal and rigorous record‑keeping prevent self‑deception and improve future decisions.
- Diversification across many undervalued issues reduces idiosyncratic risk without diluting potential gain.
- Continuous learning from both successes and mistakes is the investor's most reliable edge.

## Chapter index

- **ch01 — Price versus Value** — Explains why market price is a vote while intrinsic value is the underlying business worth. Shows how to estimate value using earnings, assets, and cash flows, and why confusing the two leads to costly mistakes. (load: `chapters/ch01.md`)
- **ch02 — Margin of Safety** — Defines the margin of safety as the difference between price and intrinsic value, and shows how to quantify it. Describes why a sufficient margin protects against analytical errors and unforeseen downturns. (load: `chapters/ch02.md`)
- **ch03 — Mr. Market Allegory** — Introduces the manic‑depressive partner who offers to buy or sell his share each day. Teaches how to treat his offers as optional and to act only when they suit the investor’s valuation. (load: `chapters/ch03.md`)
- **ch04 — Investing versus Speculating** — Provides Graham’s precise definition of investing and shows how to test any proposed operation against it. Highlights the importance of thorough analysis, safety of principal, and adequate return. (load: `chapters/ch04.md`)
- **ch05 — Temperament over Intellect** — Explains why emotional discipline is the investor’s chief challenge and how to detect temperament‑driven decisions such as FOMO, panic, or overconfidence. (load: `chapters/ch05.md`)
- **ch06 — Long‑Term Compounding** — Shows why time in the market beats timing the market, and how compounding turns modest gains into substantial wealth over decades. (load: `chapters/ch06.md`)
- **ch07 — Limits of Graham’s Era** — Acknowledges that Graham’s tactics were shaped by a less‑efficient market and that modern conditions require adaptation while preserving core principles. (load: `chapters/ch07.md`)
- **ch08 — Practical Application Checklist** — Provides a step‑by‑step routine the agent can follow when evaluating a security: estimate value, compute margin, check temperament, decide, and record. (load: `chapters/ch08.md`)
- **ch09 — Case Study: Bargain Issue Selection** — Illustrates how Graham’s ‘bargain issue’ rule—buying at less than two‑thirds of net current asset value—worked historically and how to apply it today. (load: `chapters/ch09.md`)
- **ch10 — Summary and Discipline** — Reiterates the core habits: intrinsic value focus, margin of safety, Mr. Market discipline, investing vs speculation, temperament, long‑term view, and continuous learning. (load: `chapters/ch10.md`)

## Quick reference

For vocabulary: see `glossary.md` (terms, chapter-anchored).
For reusable moves: see `patterns.md` (steps, chapter-anchored).
For decision rules: see `cheatsheet.md` (imperative sentences by category).
