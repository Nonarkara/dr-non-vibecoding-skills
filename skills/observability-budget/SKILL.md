---
name: observability-budget
description: >-
  Name what should wake you before adding tooling, then keep one channel and
  delete unactionable alerts. Use when a service needs monitoring or paging.
license: MIT
---

# Observability Budget

> Write the list of things that should wake you at 3 AM. If nothing on it justifies waking you, you do not need a pager — you need a morning digest. Most solo products need the digest.

[`deploy-verification`](../deploy-verification/SKILL.md) proves the new bytes are live at the moment you ship. [`wrong-green`](../wrong-green/SKILL.md) proves the check measures the right thing. Neither tells you that the service died at 3 AM on a Tuesday six weeks later — and for a laptop-anchored or scale-to-zero service, that is the failure that actually happens.

The constraint that shapes everything here: **you are one person.** An alerting setup that would work for a team on rotation will, for you, produce a phone that buzzes at things you cannot act on until morning, and you will mute it. A muted channel is worse than no channel, because you believe you are covered.

---

## The rule

Every alert names the person who acts, the action they take, and the hour they take it. An alert without those three gets deleted, not tuned.

---

## The procedure

### 1. Write the wake list first, in the project contract

Before any tool is installed:

```markdown
## Wake list
- Ingestion stopped for > 2h during daylight hours — restart the tunnel, check the upstream feed.
- Payment webhook 5xx for > 15m — entitlements are drifting; check the endpoint secret.
## Digest list (morning only)
- Any 5xx rate above baseline · certificate expiry inside 14 days · backup job failed.
## Ignore list
- Single 5xx. Cold-start latency. Bot traffic from a scanner.
```

The ignore list is the load-bearing one and the one that gets skipped. An unnamed ignorable event becomes an alert by default, and the default is how the channel fills with noise.

### 2. Three signals, and stop

| Signal | What it answers | The trap |
|---|---|---|
| **External probe** | Is it reachable from outside my network | A probe that hits `/healthz` while the real dependency is dead — per [`wrong-green`](../wrong-green/SKILL.md), probe a route that exercises the dependency |
| **Error tracking** | Did it throw, in which release | Untagged releases: you cannot tell whether your deploy caused the spike |
| **Freshness** | Is the data still arriving | The oldest `age` from [`honest-envelope`](../honest-envelope/SKILL.md), alarmed at a threshold you chose on purpose |

Three. Metrics dashboards, traces, and log aggregation are for when you have a question they answer; adding them before that is a hobby.

### 3. One channel

Alerts go to exactly one place you already read — one Telegram or Line chat, one email address that is not the one with the newsletters ([`messaging-gateway`](../messaging-gateway/SKILL.md) is already wired for this). Split channels dilute attention, and the split one you check less becomes the one carrying the real alert.

### 4. Every alert carries its runbook line

```
[WAKE] ingestion stalled 2h14m · last row 03:12 · runbook: restart tunnel `svc-ingest`, then check upstream 200
```

An alert that says only "something is wrong" trains you to open the dashboard, find nothing obvious, and close it. Three of those and you are ignoring the channel. The runbook line belongs in the alert body, not in a wiki you will not open on a phone at 3 AM.

### 5. Structured logs, and log the decision

One line per request with a request id, and a line at each branch where the code chose something surprising — cache hit, fallback taken, degraded mode entered. Not the essay; the choice. When you are reading logs, you are reconstructing a decision, and the decision is what nobody logs.

```
{"ts":"...","rid":"a1b2","route":"/api/pulse","status":200,"src":"cache","age_s":412,"decision":"upstream_timeout_fallback"}
```

### 6. Run the alert budget, monthly

Count the alerts. Count how many you acted on. If fewer than half were actionable, **delete the noisiest rule** — do not raise its threshold, delete it. A rule tuned to fire less still fires, and it still costs a check. Alert fatigue is the outage you cause yourself.

---

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| Installing the monitoring stack before writing the wake list | You will alert on what the tool measures, not on what matters to you |
| Alerting on CPU, memory, or p99 for a solo product | You cannot act on them at 3 AM and they fire during normal operation |
| Two or more alert channels | The one you check less is where the real alert lands |
| Raising a threshold instead of deleting a rule | A quieter useless alert is still a useless alert with a maintenance cost |
| Uptime probe against a static route | Green while the database is gone. Probe the dependency |
| A dashboard as the alerting strategy | A dashboard is pull; nobody pulls at 3 AM |
| Adding an alert after every incident, forever | Alerts are a budget, not a memorial — one in, one out |

---

## The test

Kill the upstream dependency deliberately, on a weekday afternoon. Time how long until something reaches your one channel, and read the message on your phone without opening anything else. If you cannot tell what broke and what to do from that message alone, the alert is not finished.
