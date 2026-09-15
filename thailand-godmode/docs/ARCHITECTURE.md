# Architecture — raw → cooked → coupling

## Why this exists

> "My critiques of all these subsystems and data ... is that I don't think
> anyone can understand these data if they were to be looked at
> independently, system by system. No way. The only way that these data
> would make sense is when you bring them together and look at the
> relationships between factors like: water levels in the reservoirs and
> flooding chance; humidity and draft; cloud and rain possibilities. It has
> to be more than one layer that you look at. Otherwise, it's just a bunch
> of scientific data that would mean nothing to anyone."

This is the design brief for the entire toolkit, verbatim, and it is the
reason this repo is not "another dashboard template." A dashboard that shows
a reservoir gauge next to a rainfall chart next to a humidity number is three
subsystems. A **God Mode** dashboard shows what happens when those three
numbers are read together — and says so in one sentence a governor can act
on. Every layer below exists to make that possible for any city, not just
Lopburi.

## The five stages

```
1. SOURCE      →  2. RAW  →  3. CACHED  →  4. COOKED  →  5. COUPLED
   (an agency        (parsed,   (tiered,      (classified,   (joined across
    API/feed)         typed)     TTL'd)        compared,      factors, one
                                               staleness-      verdict, one
                                               tagged)         action)
```

### 1–2. Source → Raw

`packages/connectors/*` — one connector per external source (data.go.th,
Air4Thai, Open-Meteo, RID/TMD gauges, ITIC/Longdo cameras, satellite/EO
registries). Each connector's only job is: fetch, parse, normalize into a
typed shape. It does not decide what a number *means* — that's stage 4.

### 3. Cached

`packages/core/src/cache.ts` — the tier vocabulary, borrowed from
`dr-non-vibecoding-skills/skills/data-catalog`:

```
live       → hit upstream, TTL measured in minutes
live→cache → serve last-good on upstream failure, say how old it is
scenario   → deterministic demo data, used when ?scenario= is set or live
             data is genuinely unavailable and a demo must still work
reference  → refreshed daily/weekly, static within a session (e.g. dead-
             storage constants, published agency thresholds)
database   → ingested once, queried locally
unavailable→ no source, no scenario, no reference — say so, don't guess
```

Every value that reaches a UI carries its tier. A dashboard that silently
shows stale numbers during a flood is a liability, not a convenience.

### 4. Cooked

`packages/core/src/cook.ts` — turns a raw reading into something a human can
act on:

- **Classification against agency-published bands**, never an invented
  threshold — RID's 5-band water classification, TMD's 5-band rain
  classification, or the equivalent bands the target province's own agencies
  publish.
- **Distributions** — where does this station rank against every other
  station in the province, not just its own history.
- **Staleness** — `fresh` / `aging` / `stale` / `abandoned` / `unknown`,
  computed against each source's own expected cadence (a dam gauge that
  reports daily is not "stale" at 12 hours old; a telemetry feed that
  reports hourly is).
- **A number without a comparison is not information.** Every cooked value
  answers "compared to what?" before it reaches stage 5.

### 5. Coupled — the actual product

A **coupling** is a named join between two or more cooked factors, using a
published formula or an explicit, stated rule — never an invented one:

| Coupling | Formula / rule | What it answers |
|---|---|---|
| Flood risk | reservoir level × rainfall forecast × downstream travel time | "Will this district flood, and when do they need to act?" |
| False-calm | heavy rain in the last 24h × currently-calm gauge | "Is 'levels are fine' actually true, or is the surge still arriving?" |
| Release risk | planned dam release × travel time × downstream freeboard | "Does a scheduled release put anyone over their bank downstream?" |
| Crop water demand | vapour-pressure deficit (Tetens) × usable reservoir storage | "Can irrigation demand be met this week?" |
| Fire weather | Ångström index × real active-hotspot count | "Is today actually dangerous, or just dry?" (both legs required — dry weather alone is not `critical`) |
| Cloud/rain | dew-point spread × cloud cover (Espy cloud-base height) | "Will the cloud cover actually produce rain, or just shade?" |
| Washout | rainfall × PM2.5 | "Will rain clear the air, or is today's AQI reading about to become unreliable?" |

Each coupling carries the **weakest tier and worst staleness of its legs** —
a coupling built from one `live` gauge and one `scenario` fallback is itself
`scenario`-tier, never silently promoted. A coupling with a missing leg still
renders, with an explicit hedge sentence, rather than either hiding or
overclaiming confidence.

This stage is genuinely portable: the *formulas* (Tetens, Ångström, Espy) are
physics, not province-specific. Only the station config, the agency bands,
and the downstream geometry change per city — which is exactly what
`configs/cities/<slug>.city.json` is for.

## Where the map/CCTV/social layers sit

These are **presentation-adjacent, not part of the cooking pipeline** — they
give an operator situational awareness (what does the road look like right
now, what is social media saying) rather than a computed verdict. They still
obey the same tier/staleness discipline (a CCTV snapshot has an age; a social
post has a timestamp), but they don't get coupled against cook.ts factors
unless a specific rule says to (e.g. "washout" coupling above touches AQI,
which a social-listening keyword box could annotate with "haze complaints
rising", but that annotation is descriptive, not a new coupling formula).

## OOTBPAP — out of the box, plug and play

The promise this toolkit makes to a new city: fill in one config file, run
one harvest script, and the following come up wired with sane defaults and
no paid API key required:

1. **Maps + satellite** — basemap fallback chain (Mapbox if a token exists,
   else OSM/ESRI/CartoDB, in that order) + the EO/satellite registry, both
   vendored from `DrNon-Global-Satellite-Toolkit`, filtered to the modules
   relevant to a Thai province.
2. **CCTV** — ITIC/Longdo public traffic cameras for any Thai province,
   honestly tiered (stream / snapshot / pin — never claim video you don't
   have), per `dr-non-vibecoding-skills/skills/itic-cctv-integration`.
3. **Social listening** — RSS + GDELT keyword box scoped to the city name (TH
   + EN spellings), sentiment-tagged, always labelled with source + age.
4. **Flood + air** — RID/TMD-classified water and rain, Air4Thai/OpenAQ AQI,
   coupled per the table above, once station IDs are in the city config.
5. **data.go.th data page** — every dataset on the government open-data
   portal whose title, tags, or organization mention the city name, turned
   into a browsable analytics page — see
   `packages/connectors/datagoth/README` inline docs.
6. **Frontend** — Axiom Design Core's tokens + a generated per-province brand
   palette that never touches the load-bearing status ramp.
7. **Backend** — the cache tiers above, plus whatever of
   `dr-non-vibecoding-skills`'s backend skills the deploy target needs
   (`db-migrations`, `auth-entitlement`, `appsec-stack`,
   `data-protection-pdpa`, `always-on-services`).

See `docs/NEW-CITY-CHECKLIST.md` for the exact sequence.
