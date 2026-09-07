---
name: data-catalog
description: >-
  Record reusable data-source contracts and known-good adapters. Use before adding
  an API or feed, reusing an integration, or responding to upstream drift.
license: MIT
---

# Data Catalog

> Before wiring a new adapter, check whether it's already catalogued — and port the known-good implementation instead of rebuilding it.

The fourth time you write an Open-Meteo client, you write a subtly different one, with a different cache TTL and a different failure behaviour. Then a feed changes shape and you fix it in one project out of four.

*Visual summary: [`INFOGRAPHICS.md`](../../INFOGRAPHICS.md), page 10.*

---

## The artifact

A shared folder — `_shared/data-catalog/` — containing:

- **`CATALOG.md`** — the index. Every source, one row.
- **`sources/<domain>/<source>.md`** — a detail file per source.
- **`CLAUDE.md`** — instructions telling agents to read the catalog *before* writing an adapter.

### The index columns that actually matter

| Column | Why |
|---|---|
| Source | Name |
| **Cadence → real latency** | Two different numbers. "Updates every 10 min" and "data is 10–60 min old" are both true and only the second one matters to your UI. |
| Auth | `none`, or the env var name — never the value |
| Tier | `live` / `live→cache` / `reference` / `database` — how fresh the consumer can assume it is |
| Status | ✅ has a detail file, 📋 in production but not yet written up |
| Detail | Link to the file, or `project:path/to/adapter.ts` for the 📋 rows |

That `📋` state is what makes the catalog survive contact with reality. You will never have time to write up every source before shipping. So point at the working implementation — `FloodDash:server/sources-catalog.js (air4thai)` — and mark it as not-yet-ported.

**The rule that keeps it alive:** the catalog *grows from real builds*. When you touch a project that uses a 📋 source, you port it to a detail file then. Not in a documentation sprint that will never happen.

---

## What a detail file contains

Not API docs — the upstream has those. Write down what the upstream *won't* tell you:

- The exact endpoint you actually call, with real parameters
- **Observed** latency and update behaviour, not the documented one
- Rate limits you've actually hit
- Failure modes: what a broken response looks like, what it returns during an outage
- The quirk. (Every source has one. A station that reports `-999`. A timestamp in local time with no offset. A field that's a string sometimes and a number others.)
- Which project has the reference implementation

---

## Two-tier freshness, always

Every live source gets a cache with an explicit TTL, and every consumer knows which tier it's reading:

```
live      → hit upstream, TTL measured in minutes
live→cache→ serve last-good on upstream failure, and say how old it is
reference → refreshed daily/weekly, treat as static within a session
database  → ingested once, queried locally
```

**APIs are promises, not contracts.** Cache aggressively, always keep last-good, and show the user the age of what they're looking at. A dashboard that says "data 47 minutes old" is trustworthy. One that silently shows stale numbers is a liability — especially when the numbers are flood levels.

---

## Free tiers are usually enough

Sixty-plus production-grade sources, no key required for most of the good ones: Open-Meteo, USGS, NASA EONET, GDELT, World Bank, ReliefWeb, Nominatim, Overpass, Frankfurter, UN Data. Government and intergovernmental agencies are *legally obligated* to publish much of this.

Full catalog with signup links, free-tier limits, and copy-paste endpoints: [`reference/free-apis.md`](../../reference/free-apis.md).

**The test:** is there a free version of what you're about to pay for? Find it. Only pay when you're certain you can't live without it.

---

## Where this pays off

A flood dashboard and an air-quality dashboard sharing one backbone. When the second one was built, the weather adapter, the caching tier, the archive path, and the health endpoint all ported directly. It shipped in days rather than weeks, and a fix to the shared ingest pattern fixes both.

That only worked because the sources were written down somewhere neither project owned.
