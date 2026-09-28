/**
 * AirDash — Air4Thai (Thai PCD) + Open-Meteo air-quality, generalized.
 *
 * Air4Thai has no fully-open, documented JSON API with a stable contract;
 * the Lopburi reference build combines whatever Air4Thai station export is
 * reachable with Open-Meteo's air-quality endpoint (no key, global
 * coverage) as the always-available floor. That floor is what's ported
 * here unconditionally; a province-specific Air4Thai station wiring is a
 * connector detail to fill in per docs/NEW-CITY-CHECKLIST.md step 4.
 */

import type { AirQualityStation } from "../../core/src/city-config.ts";
import type { Tier } from "../../core/src/cache.ts";

export type AqiBand = "good" | "moderate" | "unhealthySensitive" | "unhealthy" | "veryUnhealthy" | "hazardous";

/** Thai PCD's published PM2.5 (µg/m³, 24h avg) breakpoints — not an invented scale. */
export function classifyPm25(pm25: number): AqiBand {
  if (pm25 <= 15) return "good";
  if (pm25 <= 25) return "moderate";
  if (pm25 <= 37.5) return "unhealthySensitive";
  if (pm25 <= 75) return "unhealthy";
  if (pm25 <= 100) return "veryUnhealthy";
  return "hazardous";
}

export const AQI_BAND_TH: Record<AqiBand, string> = {
  good: "อากาศดี",
  moderate: "ปานกลาง",
  unhealthySensitive: "เริ่มมีผลต่อสุขภาพกลุ่มเสี่ยง",
  unhealthy: "มีผลต่อสุขภาพ",
  veryUnhealthy: "มีผลต่อสุขภาพมาก",
  hazardous: "อันตราย",
};

export interface AirReading {
  station: AirQualityStation | { id: "open-meteo-fallback"; nameTh: string; lon: number; lat: number };
  pm25: number | null;
  band: AqiBand | null;
  observedAt: string | null;
  tier: Tier;
}

interface OpenMeteoAirQualityResponse {
  hourly?: { time: string[]; pm2_5: number[] };
}

/** Always-available floor: Open-Meteo air-quality, no key, works for any lon/lat in Thailand (or anywhere). */
export async function fetchOpenMeteoAirQuality(
  lon: number,
  lat: number,
  opts?: { fetchImpl?: typeof fetch },
): Promise<AirReading> {
  const doFetch = opts?.fetchImpl ?? fetch;
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm2_5`;
  const res = await doFetch(url);
  if (!res.ok) {
    return { station: { id: "open-meteo-fallback", nameTh: "จุดอ้างอิงเมือง", lon, lat }, pm25: null, band: null, observedAt: null, tier: "unavailable" };
  }
  const body = (await res.json()) as OpenMeteoAirQualityResponse;
  const times = body.hourly?.time ?? [];
  const values = body.hourly?.pm2_5 ?? [];
  const nowIdx = times.length - 1; // most recent hour in the response
  const pm25 = nowIdx >= 0 ? values[nowIdx] : null;
  return {
    station: { id: "open-meteo-fallback", nameTh: "จุดอ้างอิงเมือง", lon, lat },
    pm25: pm25 ?? null,
    band: pm25 != null ? classifyPm25(pm25) : null,
    observedAt: nowIdx >= 0 ? times[nowIdx] : null,
    tier: pm25 != null ? "live" : "unavailable",
  };
}

/** Province-wide AQI distribution across every configured station plus the city-center fallback point. */
export function rankAirReadings(readings: AirReading[]): AirReading[] {
  return [...readings].filter((r) => r.pm25 != null).sort((a, b) => (b.pm25 ?? 0) - (a.pm25 ?? 0));
}
