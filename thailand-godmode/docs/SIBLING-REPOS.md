# Sibling repos — what to reach for, and when

This folder assumes one other repo under the same account exists alongside
it (the general skill library it lives inside of *is* the other sibling —
see below). Do not re-derive what either already solved.

## `DrNon-Global-Satellite-Toolkit`

The satellite/EO/basemap/orbital API registry — ~30 sources across
`popularApis` / `proApis` / `nicheApis`, plus a basemap fallback chain
(Mapbox → OSM → ESRI → CartoDB → Stadia → gradient) and a module registry
pattern (`{id, label, category, fetchData, mockData, uiType, pollInterval,
requiredEnvVars}`).

**Use it for:** any new satellite, EO, or basemap source. Check
`src/registry/global-satellite-apis.ts` and `src/basemaps/basemap-catalog.ts`
before adding a provider here. The Thailand-city-specific slice — a
Longdo-first basemap ordering plus the EO ids with real Thailand coverage —
lives in that repo's own `src/basemaps/thailand-priority-chain.ts`, not
duplicated in this folder. A province dashboard does not need the full
global catalog (Roscosmos, DEA Australia, etc.) — only that filtered slice.

**Module registry shape to reuse exactly** (do not invent a different one —
`packages/core/src/module-registry.ts` in this folder is the same shape):

```ts
interface ModuleDefinition {
  id: string;
  label: string;
  category: ModuleCategory;
  description: string;
  pollInterval: number;
  uiType: "map" | "table" | "chart" | "card";
  fetchData: () => Promise<unknown>;
  mockData: unknown;
  requiredEnvVars?: string[];
  wrapsExisting?: boolean;
}
```

## `Axiom-Design-Core`

The design system — tokens (`tokens.css`), a Tailwind preset, a React
package, and the *reasoning* behind them (lineage → psychology → constraint
→ token roles → named regressions, per this repo's own
[`skills/axiom-design-core/SKILL.md`](../../skills/axiom-design-core/SKILL.md)).

**Use it for:** every structural design decision — type scale, spacing,
motion, the zero-border-radius/zero-shadow/zero-gradient law.

**What this folder adds on top, and only this:** a per-province *brand*
palette (`packages/design/palette.ts`) — province flag colors, a seasonal
accent, local motif accents (sunflower yellow and old-town street-art hues
for Lopburi; a different province's own colors for a different city). The
one rule that makes this safe: **status colors (green/amber/orange/red) are
load-bearing and must never be reused for branding.** A province's brand
palette owns chrome only — nav underline, logo plate, hero accents — never
a flood-risk badge or an AQI band. See the file's own header comment for
the full invariant statement.

## This repo's own general skills (not duplicated here)

| Need | Skill (in `skills/` at repo root) |
|---|---|
| Public CCTV honesty tiers | `itic-cctv-integration`, `home-cctv-grid` |
| Data source cataloguing | `data-catalog` |
| Free LLM/API keys | `free-api-keys` |
| Geospatial precision/simplification | `geospatial-core` |
| Dashboard anti-patterns | `dashboard-discipline` |
| Design reasoning | `axiom-design-core` |
| Backend security layers | `appsec-stack`, `auth-entitlement`, `data-protection-pdpa` |
| DB schema changes | `db-migrations` |
| Caching | `caching-layers` |
| Resilience / fallback on outage | `dual-write-resilience`, `always-on-services` |

**Rule:** if a `skills/godmode-*` file starts restating one of these instead
of linking to it, that's a sign it should shrink back down to a one-line
pointer plus the Thailand-city-specific delta only.
