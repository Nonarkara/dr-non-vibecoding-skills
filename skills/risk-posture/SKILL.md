---
name: risk-posture
description: >-
  How to take risk when shipping solo with AI. Use when deciding whether to ship without
  staging, whether to test in production, how much to automate, when to kill a project,
  or when weighing speed against safety on a user-facing system.
license: MIT
---

# Risk Posture

> No staging environment. No QA team. A laptop and a room full of mayors.

That's the actual operating condition. It sounds reckless. It's survivable — and faster than the alternative — because the risk is *asymmetric and deliberately shaped*, not absent.

This skill is the calculus.

---

## The core asymmetry

Most engineering caution is calibrated for a failure mode that doesn't apply to you:

| Their risk | Solo-with-AI risk |
|---|---|
| Ship a bug → 200 engineers blocked, customer SLA breached | Ship a bug → *you* fix it in 45 minutes |
| Wrong architecture → 18-month migration | Wrong architecture → delete it, rebuild in a weekend |
| Move fast → lose trust with a board | Move slow → the project never exists at all |

**Your dominant risk is not breaking something. It's building something nobody wanted, slowly.** Optimise against that one.

A 45-minute fix beats a two-week stabilisation sprint. But it only beats it if you can *see* the breakage. Which is the entire price of admission:

> **Monitoring is not optional. If you can't see it's broken, it is broken.**
> The test: if this broke right now, would you know within 5 minutes?

---

## Where the line actually is

I ship to production daily, un-reviewed, on public dashboards. I still hold four things absolutely:

### 1. Life-safety code gets the ceremony

Flood and air-quality dashboards carry a different bar than a trading toy:
- **Hold-to-confirm** for any broadcast action — press and hold ~1.8s with progress fill, plus a sticky cancel banner reachable from anywhere.
- **Auto-expiry baked into every alert** (`expiresAt = now + 1 hour`). A stuck alert must die on its own.
- **De-escalation is silent.** You escalate loudly; you stand down quietly.
- **Corroboration before alarm.** A single sensor spike is a sensor, not an event.

The rule: *ship fast on everything the user can ignore; ship carefully on everything that shouts at them.*

### 2. Aggregate data only, never individual

Province-level, age-bracket, device-class. Never a person. *"We don't know who you are; we know what people in this province are watching."*

This isn't compliance theatre — it's what lets me move fast everywhere else. A system that never holds personal data cannot leak personal data, so I never have to slow down to protect it.

### 3. Honest labelling over false polish

If it isn't real, label it `DEMO` or `PROTOTYPE`. Open assumptions, sensitivity sliders, *"this is a model, not a forecast."* Every feasibility surface names three ways the project can fail and the salvage value if it does.

Shipping a rough thing honestly is low-risk. Shipping a rough thing that *looks* authoritative is how you lose the ability to ship at all.

### 4. Secrets never touch a repo, a note, or a prompt

The only hard security invariant. Keychain or an env store, referenced by name. Everything else in my setup is deliberately permeable to agents — this isn't. And I still got it wrong once; see [security hygiene](../../reference/security-hygiene.md).

---

## Making risk cheap instead of avoiding it

Everything above is affordable because the *cost of being wrong* was engineered down first:

| Technique | What it buys |
|---|---|
| Small commits, many per day | Any single change is revertible in one command |
| Feature flags over long branches | Ship the code, enable for 1%, then scale |
| Mock-data fallbacks (`mock.ts`) | The app renders fully with zero API keys — an upstream outage degrades, doesn't break |
| Cache-with-last-good on every source | A dead feed shows stale-but-labelled data instead of an error page |
| Watchdogs + health endpoints | You find out in minutes, not from a user |
| Nightly backups as separate jobs | Worst case is losing a day, not a project |
| Graceful-degradation architecture | Frontend on a CDN, data from the laptop — if the laptop sleeps, the site still loads |

**Take risk with the code. Never with the recovery path.**

---

## Kill fast, and mean it

- **If nobody uses it after 90 days, kill it.** Not archive. Not "pivot." Delete.
- **If you wouldn't rebuild it today, don't maintain it.**
- The best optimisation is deleting code you don't need.

The test: if this project disappeared tomorrow, would anyone notice?

Sunk-cost sentimentality is a far bigger risk than a bad deploy. A bad deploy costs an hour. A dead project you keep maintaining costs you every week, forever, and quietly.

---

## Open source by default

> If it's not secret, it's public. The code is not the value. The knowledge is.

The perceived risk — someone steals it — is almost entirely imaginary. If someone forks your work and builds something better, good: you'll be building the next thing while they're reading your licence. The only thing worse than someone stealing your idea is nobody caring about it.

---

## Learn by doing

I learned Python in a month by building dashboards. No course, no textbook.

- **Ship before you're ready.** You learn more from the first 100 users than from any book.
- **Read error messages.** They're clues, not punishments.
- **Steal everything** — patterns, not repos. Copy from GitHub, read the source, understand it, rewrite it your way.

The test: can you explain the last thing you built to a ten-year-old? If yes, you understand it.

---

## The one-line version

> Take large risks with things that are cheap to undo. Take no risks at all with things that shout at people, hold their data, or can't be restored.
