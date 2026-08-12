# Taking Risk Like Dr Non

People see the surface — daily deploys to public-safety dashboards, 110 services on a laptop, no staging, no team — and read it as recklessness.

It isn't. It's a specific, repeatable calculus. Here it is.

---

## Start from an honest read of your actual risk

The engineering caution you absorbed was written for a different situation:

| Institutional risk | Solo-with-AI risk |
|---|---|
| Ship a bug → 200 engineers blocked, SLA breached | Ship a bug → *you* fix it in 45 minutes |
| Wrong architecture → 18-month migration | Wrong architecture → delete it, rebuild in a weekend |
| Move fast → lose the board's trust | **Move slow → the project never exists** |

Your dominant failure mode is not breaking things. It's **building something nobody wanted, slowly**, and running out of momentum before anyone sees it.

So the default flips: ship the ugly working thing now, learn from a real user, then decide whether it deserves polish. *A working dashboard in 45 minutes beats a perfect one in 45 days.*

---

## Make being wrong cheap, then be wrong often

Every fast decision I make is affordable because I paid for reversibility first:

| What I built | What it buys |
|---|---|
| Small commits, ~9/day | Any change is revertible in one command |
| Feature flags over long branches | Ship the code, enable for 1%, then scale |
| `mock.ts` fallbacks in every project | App renders fully with zero API keys |
| Cache-with-last-good on every feed | A dead upstream degrades, doesn't break |
| Health endpoints + watchdogs | You learn in minutes, not from a user |
| Nightly backups as separate jobs | Worst case is losing a day |
| Frontend on a CDN, data from the laptop | Laptop asleep → site still loads |

**Take risk with the code. Never with the recovery path.** That single sentence is most of it.

---

## Where I do not move fast

Four hard lines. Everything else is negotiable.

### 1. Anything that shouts at a human

Alerts, broadcasts, life-safety UI get ceremony the rest of the app doesn't:

- **Hold-to-confirm** — press and hold ~1.8s with a progress fill. No accidental dispatch.
- **A sticky, pulsing cancel banner** reachable from anywhere while an alert is live.
- **Auto-expiry baked in** — `expiresAt = now + 1 hour` on every dispatch. A stuck alert must die on its own.
- **Editing the composer silently cancels the live alert** — because the human's attention has already moved on.
- **De-escalation is silent.** Escalate loudly, stand down quietly.
- **Corroboration before alarm.** A single sensor spike is a sensor, not an event.

The rule: *fast on everything a user can ignore; careful on everything that interrupts them.*

### 2. Personal data — simply don't hold it

Province-level, age-bracket, device-class. Never individual. *"We don't know who you are; we know what people in this province are watching."*

This is not compliance theatre. It's what licenses speed everywhere else: a system that never holds personal data cannot leak it, so I never have to slow down to protect it. Deleting a category of risk beats managing it.

### 3. Secrets

Keychain or a credentials store, referenced by name — never a repo, never a note, never a prompt. This is the only invariant I hold absolutely. I still got it wrong once: live API keys landed in an auto-ingested folder of my notes vault and sat there for weeks. Every one had to be treated as compromised and rotated. See [security hygiene](../reference/security-hygiene.md).

### 4. Honesty about what's real

If it isn't real, it's labelled `DEMO` or `PROTOTYPE`. Open assumptions, sensitivity sliders, *"this is a model, not a forecast."* Every feasibility surface names three ways the project can fail and the salvage value if it does.

Shipping a rough thing honestly is low-risk. Shipping a rough thing that *looks* authoritative is how you lose the standing to ship anything.

---

## Killing things is the risk people won't take

- **Nobody uses it after 90 days → kill it.** Not archive. Not "pivot." Delete.
- **Wouldn't rebuild it today → don't maintain it.**
- **The best optimisation is deleting code you don't need.**

The test: *if this project disappeared tomorrow, would anyone notice?*

I have deleted a superseded copy of a live project after rescuing four unique files. I have retired an entire notification integration and then gone back to remove the dead signup paths it left behind. Neither was comfortable. Both were cheaper than the alternative.

**Sunk-cost sentimentality is a bigger risk than any bad deploy.** A bad deploy costs an hour. A dead project you keep maintaining costs you every week, forever, quietly, and it's the reason you don't have time for the next thing.

---

## Constraints are the advantage, not the handicap

A second-hand laptop, a $25 cloud bill, and 45 minutes are not limitations. They force you to stay practical.

- **Free API > paid subscription.** Space agencies, UN portals, and government feeds are *legally obligated* to publish much of what you'd otherwise buy. Sixty-plus of them in [free-apis.md](../reference/free-apis.md).
- **Build inside tools people already have.** 54 million Thais use LINE. A LINE bot beats a custom app you have to convince someone to install.
- **If you can't build it on $25/month, you're overcomplicating it.**

Don't add a tool until you've felt the pain of not having it. Don't keep a tool that isn't earning its keep.

---

## Open by default

> If it's not secret, it's public. The code is not the value. The knowledge is.

The fear — someone steals it — is close to imaginary. If someone forks your work and builds something better, good: you'll be shipping the next thing while they're still reading the licence. **The only thing worse than someone stealing your idea is nobody caring about it.**

This repo is that principle applied to itself.

---

## Aim high enough that the risk is worth taking

The last piece, and the one that makes the rest coherent:

> **Aim at Nobel-shaped impact, not "good enough."** Design-award and patent ambition are the bar, not the dream. If the artefact doesn't read defensibly to a juror *and* an examiner, raise it.

Taking risk for a marginal outcome is just carelessness. The calculus above only pays if what you're building is worth the exposure — public infrastructure, a knowledge lever, something a household could remember by name.

Pick something big enough to justify moving this fast. Then make being wrong cheap, and go.
