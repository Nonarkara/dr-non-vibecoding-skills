---
name: map-api-recycle
description: >-
  Port a proven map or API adapter before adding an endpoint. Use when a map
  or feed needs data. Do not invent coordinates or a second client.
license: MIT
---

# Map API recycle

> The fourth weather client is how the dashboards drift. Port the one that already works.

Before a new endpoint, a new tile URL, or a new "small" fetch:

1. Name the feed in one line: what, which place, which refresh.
2. Search adapters this practice already trusts: [`data-catalog`](../data-catalog/SKILL.md), [`reference/free-apis.md`](../../reference/free-apis.md), and the godmode skills for the same domain.
3. If the vault checkout on this machine has `Kit/Map-API-Recycling.md`, read it and prefer a row that is actually there. The file is human-owned. Do not edit it, and do not invent rows when it is missing or empty. It is not on every Mac yet ([`obsidian-mcp-forge`](../obsidian-mcp-forge/SKILL.md)).
4. If a known-good adapter exists, port it. Change the bbox, the station id, or the layer name. Do not rewrite the client.
5. If two catalogs already answer the question, layer them ([`couple-dont-silo`](../couple-dont-silo/SKILL.md)) before adding a third source.
6. A feed that is actually absent climbs [`public-api-integration`](../public-api-integration/SKILL.md), then gets a catalog row in the same change.
7. Coordinates in the response are data. Do not fill a missing lat/lon. Leave the feature out, or mark it unlocated. [`geospatial-core`](../geospatial-core/SKILL.md) and [`ANTI-SPATIAL-HALLUCINATION.md`](../../ANTI-SPATIAL-HALLUCINATION.md).

## Anti-patterns

| Temptation | Refuse because |
|---|---|
| A new Open-Meteo wrapper | The catalog already has the failure behaviour. A new one will disagree. |
| Filling a null coordinate so the pin shows | The pin is then a lie. |
| Writing `Kit/Map-API-Recycling.md` because the checkout lacks it | That note is Non's. Absence is a fact, not a slot to fill. |

## The test

```
□ The feed is named, and an existing adapter was searched before a new client?
□ A port changes the place, not the client?
□ Missing coordinates stay missing?
□ Kit/Map-API-Recycling.md was read only if this machine has it, and not edited?
```
