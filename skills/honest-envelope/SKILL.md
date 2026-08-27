---
name: honest-envelope
description: >-
  Every displayed number carries {source, tier, age}. A fake number shown as live is
  worse than an error. Use when rendering metrics, wiring fallback data, labeling a
  cache, when a dashboard would look more certain than it is, or when an upstream
  outage is about to be papered over with last week's value.
license: MIT
---

# Honest Envelope

> An error costs a demo. A fake number shown as live costs the company.

Civic dashboards in this practice are opened by real people during floods and dust season. A green checkmark on a stale number is not comfort. It is a lie by omission.

This skill is the conservation law for any surface that displays a value: **the number is never just a number.** It is a triple.

```
displayed = { value, source, tier, age }
```

If you cannot fill the triple, you do not know what you are showing. Show that fact, not a confident blank.

---

## The triple

| Field | What it answers | Example |
|---|---|---|
| **source** | Who produced this? | `open-meteo` · `mirror:sheets` · `mock` |
| **tier** | How live is this, honestly? | `live` · `live→cache` · `reference` · `fallback` · `mock` |
| **age** | When was it last successfully fetched? | `2m` · `36d` · `unknown` |

`dual-write-resilience` is the storage pattern that makes failover possible. This skill is the **display contract** that makes failover honest. A Sheets mirror that silently replaces Postgres, with no label, is a dual-write that learned the wrong lesson.

---

## The four tiers, named

1. **live** — fetched this request, or within the stated SLA (minutes).
2. **live→cache** — last-good value from a real source, with age shown. The common honest state during a blip.
3. **reference** — daily/weekly dataset. Not a live feed. Do not pulse it.
4. **fallback / mock** — not from the real source. Must be **visibly labeled in the UI**, not only in a comment. `src/lib/api/mock.ts` exists so the app renders with zero keys. It does not exist so you can ship a demo as production.

Never promote a lower tier to look like a higher one. A mock labeled "LIVE" is the failure mode this skill exists to prevent.

---

## Where agents cheat

- **Omitting age** when the number is hours old. "Last updated" in a footer nobody reads does not count. Put age next to the value.
- **Using last-good without saying so.** The cache is a gift. Pretending it is live is the poison.
- **Watchdogs that check the wrong thing.** A process can be perfectly alive and doing nothing. Report last-successful-ingest per source, not "server responding." See the watchdog war story.
- **Generative copy that invents a number.** If a model wrote the figure, it is not a source. It does not get an envelope. It does not ship. See "the podcast that invented a senator."

---

## The fallback label, minimum viable

When the primary is down and the mirror answers:

```
PM2.5  41 µg/m³
source: sheets-mirror · tier: fallback · age: 12m
```

Not a toast. Not a console warning. On the number. The person looking at a flood map on a phone in the rain is the audience — not the developer who knows which table is which.

---

## Conservation law

For any dashboard that claims to show the world:

```
every visible number = a real fetch, a labeled cache, or a labeled mock
```

If a number is on screen and you cannot name its source, tier, and age, it is unlabeled fiction. Remove it or envelope it. There is no third option.

---

## The test

Squint at the screen. Can a stranger tell which numbers are live, which are last-good, and which are fake? If they all look equally confident, the envelope is missing.
