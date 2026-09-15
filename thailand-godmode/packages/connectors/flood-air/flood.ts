/**
 * FloodDash — generalized from the Lopburi reference build's
 * src/lib/lopburi/flood.ts, parameterized by a city's own hydrology config
 * instead of hardcoded station IDs.
 *
 * Thailand's RID (Royal Irrigation Department) publishes station telemetry
 * at thaiwater.net; there is no single stable no-auth JSON API for every
 * station, so this connector's fetchLive function is intentionally a thin,
 * swappable seam — wire in whatever the target province's actual telemetry
 * source is (RID public API, a provincial irrigation office's own feed, or
 * DDPM's flood-warning feed) and keep the classification/coupling logic
 * (packages/core/src/cook.ts) untouched.
 */

import type { HydrologyStation, DamConfig, DownstreamLeg } from "../../core/src/city-config.ts";
import { classifyWaterLevel, cookStaleness, EXPECTED_INTERVAL_MIN, type RidWaterClass, type Freshness } from "../../core/src/cook.ts";
import type { Tier } from "../../core/src/cache.ts";

export interface StationReading {
  station: HydrologyStation;
  levelMsl: number | null;
  capacityPct: number | null;
  waterClass: RidWaterClass | null;
  observedAt: string | null;
  freshness: Freshness;
  tier: Tier;
}

export interface DamReading {
  dam: DamConfig;
  totalStorageMcm: number | null;
  observedAt: string | null;
  tier: Tier;
}

/**
 * Cook a raw station reading into a classified one. Pass null levelMsl/
 * observedAt when a station has no live feed at all — the reading still
 * renders, honestly tagged "unavailable", rather than being omitted (an
 * omitted station reads as "nothing to report" when the truth is "we don't
 * have this station wired up").
 */
export function cookStationReading(
  station: HydrologyStation,
  raw: { levelMsl: number | null; observedAt: string | null },
  tier: Tier,
  now: Date = new Date(),
): StationReading {
  const capacityPct = station.bankLevelMsl > 0 && raw.levelMsl != null ? Math.round((raw.levelMsl / station.bankLevelMsl) * 1000) / 10 : null;
  return {
    station,
    levelMsl: raw.levelMsl,
    capacityPct,
    waterClass: capacityPct != null ? classifyWaterLevel(capacityPct) : null,
    observedAt: raw.observedAt,
    freshness: cookStaleness(raw.observedAt, now, station.expectedIntervalMin ?? EXPECTED_INTERVAL_MIN.telemetry),
    tier: raw.levelMsl == null ? "unavailable" : tier,
  };
}

/** Finds the downstream leg(s) fed by a given dam/station id — used to compute "hours until this district needs to act". */
export function downstreamLegsFor(downstream: DownstreamLeg[], stationOrDamId: string): DownstreamLeg[] {
  return downstream.filter((leg) => leg.fromStationId === stationOrDamId);
}

/** Province-wide water-level distribution — where does each station rank, not just its own history. */
export function rankStations(readings: StationReading[]): StationReading[] {
  return [...readings]
    .filter((r) => r.capacityPct != null)
    .sort((a, b) => (b.capacityPct ?? 0) - (a.capacityPct ?? 0));
}
