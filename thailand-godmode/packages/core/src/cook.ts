/**
 * The cooking + coupling engine — the actual product of this toolkit.
 *
 * "A number without a comparison is not information." Three rules, ported
 * unchanged from the Lopburi reference build's src/lib/lopburi/cook.ts:
 *   1. Never invent a comparison — classify against a published agency band
 *      or a stated physical formula, never a made-up threshold.
 *   2. Rank inside the province before reaching outside it.
 *   3. An action must come from a rule already in this file, not improvised
 *      per city.
 *
 * Everything here is province-agnostic: the formulas are physics, the RID/
 * TMD bands are Thailand-wide published classifications. Only the station
 * data and downstream geometry (packages/core/src/city-config.ts) change
 * per city.
 */

import type { Tier } from "./cache.ts";
import { weakestTier } from "./cache.ts";

// ── Staleness ─────────────────────────────────────────────────────────────

export type Freshness = "fresh" | "aging" | "stale" | "abandoned" | "unknown";

export const FRESHNESS_TH: Record<Freshness, string> = {
  fresh: "ข้อมูลล่าสุด",
  aging: "ข้อมูลเริ่มเก่า",
  stale: "ข้อมูลล้าสมัย",
  abandoned: "ไม่มีข้อมูลใหม่เป็นเวลานาน",
  unknown: "ไม่ทราบช่วงเวลาข้อมูล",
};

/** Default expected reporting cadence in minutes, by source kind. Override per-station in city config where an agency states a different cadence. */
export const EXPECTED_INTERVAL_MIN = {
  telemetry: 60,
  dam: 1440,
  air: 60,
  radar: 15,
  forecast: 360,
} as const;

export function cookStaleness(observedAt: string | null, now: Date, expectedIntervalMinutes: number): Freshness {
  if (!observedAt) return "unknown";
  const ageMin = (now.getTime() - new Date(observedAt).getTime()) / 60000;
  if (ageMin < 0) return "unknown";
  if (ageMin <= expectedIntervalMinutes * 1.5) return "fresh";
  if (ageMin <= expectedIntervalMinutes * 4) return "aging";
  if (ageMin <= expectedIntervalMinutes * 24) return "stale";
  return "abandoned";
}

const FRESHNESS_RANK: Record<Freshness, number> = { fresh: 4, aging: 3, stale: 2, abandoned: 1, unknown: 0 };
export function worstFreshness(all: Freshness[]): Freshness {
  if (all.length === 0) return "unknown";
  return all.reduce((worst, f) => (FRESHNESS_RANK[f] < FRESHNESS_RANK[worst] ? f : worst));
}

// ── RID 5-band water classification (Thailand-wide published bands) ──────

export type RidWaterClass = "low" | "normal" | "monitor" | "high" | "overflowing";

export const RID_WATER_CLASS_TH: Record<RidWaterClass, string> = {
  low: "น้ำน้อย",
  normal: "ปกติ",
  monitor: "เฝ้าระวัง",
  high: "น้ำมาก",
  overflowing: "น้ำล้นตลิ่ง",
};

/** capacityPct: current storage as % of bank/critical reference. */
export function classifyWaterLevel(capacityPct: number): RidWaterClass {
  if (capacityPct >= 100) return "overflowing";
  if (capacityPct >= 80) return "high";
  if (capacityPct >= 50) return "monitor";
  if (capacityPct >= 20) return "normal";
  return "low";
}

export type Band = "good" | "watch" | "alert" | "critical";

export function bandForWaterClass(c: RidWaterClass): Band {
  switch (c) {
    case "overflowing": return "critical";
    case "high": return "alert";
    case "monitor": return "watch";
    default: return "good";
  }
}

// ── TMD 5-band rain classification (Thai Meteorological Dept published bands) ──

export type TmdRainClass = "none" | "light" | "moderate" | "heavy" | "veryHeavy";

export const TMD_RAIN_CLASS_TH: Record<TmdRainClass, string> = {
  none: "ไม่มีฝน",
  light: "ฝนเล็กน้อย",
  moderate: "ฝนปานกลาง",
  heavy: "ฝนหนัก",
  veryHeavy: "ฝนหนักมาก",
};

/** mm: rainfall over the reporting window (commonly 24h). TMD bands: 0.1-10 light, 10.1-35 moderate, 35.1-90 heavy, >90 very heavy. */
export function classifyRain24h(mm: number): TmdRainClass {
  if (mm <= 0) return "none";
  if (mm <= 10) return "light";
  if (mm <= 35) return "moderate";
  if (mm <= 90) return "heavy";
  return "veryHeavy";
}

export function bandForRainClass(c: TmdRainClass): Band {
  switch (c) {
    case "veryHeavy": return "critical";
    case "heavy": return "alert";
    case "moderate": return "watch";
    default: return "good";
  }
}

// ── Distributions — rank inside the province, never in isolation ─────────

export interface DistributionSlice<K extends string> {
  key: K;
  count: number;
  pct: number;
}
export type Distribution<K extends string> = DistributionSlice<K>[];

export function buildDistribution<T, K extends string>(items: T[], keyFn: (item: T) => K): Distribution<K> {
  const counts = new Map<K, number>();
  for (const item of items) {
    const k = keyFn(item);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const total = items.length || 1;
  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count, pct: Math.round((count / total) * 1000) / 10 }))
    .sort((a, b) => b.count - a.count);
}

// ── Usable water — dead storage handled honestly, never invented ─────────

export interface UsableWater {
  usableMcm: number | null;
  tier: Tier;
}

/** Prefers a live feed value; falls back to a documented dead-storage constant (reference tier); otherwise unavailable. Never guesses. */
export function cookUsableWater(
  totalStorageMcm: number | null,
  deadStorageMcm: number | undefined,
  feedUsableMcm: number | null | undefined,
): UsableWater {
  if (feedUsableMcm != null) return { usableMcm: feedUsableMcm, tier: "live" };
  if (totalStorageMcm != null && deadStorageMcm != null) {
    return { usableMcm: Math.max(0, totalStorageMcm - deadStorageMcm), tier: "reference" };
  }
  return { usableMcm: null, tier: "unavailable" };
}

// ── Published physical formulas (not province-specific) ──────────────────

/** Tetens equation — saturation vapour pressure in kPa, given air temperature in °C. */
export function saturationVapourPressureKpa(tempC: number): number {
  return 0.6108 * Math.exp((17.27 * tempC) / (tempC + 237.3));
}

/** Vapour pressure deficit (kPa) — how much drier the air is than saturated, given temp and relative humidity %. */
export function vapourPressureDeficitKpa(tempC: number, relativeHumidityPct: number): number {
  const es = saturationVapourPressureKpa(tempC);
  return es * (1 - relativeHumidityPct / 100);
}

/** Ångström fire-weather index — higher means more fire-prone. Classic form using temp (°C) and relative humidity (%). */
export function angstromIndex(tempC: number, relativeHumidityPct: number): number {
  return relativeHumidityPct / 20 + (27 - tempC) / 10;
}

/** Espy's law — approximate cloud-base height in metres from surface temp/dew-point spread (°C), ~125m per °C of spread. */
export function cloudBaseMetres(tempC: number, dewPointC: number): number {
  return Math.max(0, (tempC - dewPointC) * 125);
}

// ── Couplings — the joins between factors, not single readings ───────────

export interface CouplingFactor {
  labelTh: string;
  valueTh: string;
  tier: Tier;
}

export interface Coupling {
  id: string;
  titleTh: string;
  band: Band;
  verdictTh: string;
  /** Present when a required leg is missing — the coupling still renders, hedged, never hidden or silently upgraded. */
  missingTh?: string[];
  factors: CouplingFactor[];
  tier: Tier;
  priority: number;
}

function weakestFactorTier(factors: CouplingFactor[]): Tier {
  return weakestTier(factors.map((f) => f.tier));
}

/** Flood risk: reservoir level x rainfall forecast x downstream travel time. Overflow always dominates (never reasoned about as a "future" risk once it has already happened). */
export function coupleFlood(input: {
  waterClass: RidWaterClass | null;
  waterTier: Tier;
  rainForecastMm24h: number | null;
  rainTier: Tier;
  downstreamHours: number | null;
}): Coupling {
  const missing: string[] = [];
  if (input.waterClass == null) missing.push("ระดับน้ำในอ่างเก็บน้ำ");
  if (input.rainForecastMm24h == null) missing.push("ปริมาณฝนคาดการณ์");

  const factors: CouplingFactor[] = [
    { labelTh: "ระดับน้ำ", valueTh: input.waterClass ? RID_WATER_CLASS_TH[input.waterClass] : "ไม่ทราบ", tier: input.waterTier },
    { labelTh: "ฝนคาดการณ์ 24 ชม.", valueTh: input.rainForecastMm24h != null ? `${input.rainForecastMm24h} มม.` : "ไม่ทราบ", tier: input.rainTier },
  ];

  if (input.waterClass === "overflowing") {
    return {
      id: "flood",
      titleTh: "ความเสี่ยงน้ำท่วม",
      band: "critical",
      verdictTh: "น้ำล้นตลิ่งแล้ว — นี่คือเหตุการณ์ที่เกิดขึ้นจริง ไม่ใช่ความเสี่ยงในอนาคต",
      factors,
      tier: weakestFactorTier(factors),
      priority: 100,
    };
  }

  const rainClass = input.rainForecastMm24h != null ? classifyRain24h(input.rainForecastMm24h) : null;
  const waterBand = input.waterClass ? bandForWaterClass(input.waterClass) : "good";
  const rainBand = rainClass ? bandForRainClass(rainClass) : "good";
  const bandOrder: Band[] = ["good", "watch", "alert", "critical"];
  const band = bandOrder[Math.max(bandOrder.indexOf(waterBand), bandOrder.indexOf(rainBand))];

  let verdictTh: string;
  if (band === "good") {
    verdictTh = "ระดับน้ำและฝนคาดการณ์อยู่ในเกณฑ์ปกติ";
  } else if (band === "watch") {
    verdictTh = "ระดับน้ำหรือฝนเริ่มสูงขึ้น ควรเฝ้าระวังต่อเนื่อง";
  } else if (band === "alert") {
    verdictTh = `ระดับน้ำสูงร่วมกับฝนคาดการณ์ ${input.downstreamHours != null ? `พื้นที่ท้ายน้ำมีเวลาเตรียมตัวประมาณ ${input.downstreamHours} ชม.` : "ควรประเมินเวลาที่พื้นที่ท้ายน้ำต้องเตรียมตัว"}`;
  } else {
    verdictTh = "ระดับน้ำและฝนคาดการณ์อยู่ในเกณฑ์วิกฤต ควรแจ้งเตือนพื้นที่ท้ายน้ำทันที";
  }

  if (missing.length > 0 && band !== "critical") {
    verdictTh += ` (ข้อมูลบางส่วนยังไม่ครบ: ${missing.join(", ")} — ข้อสรุปนี้อาจเปลี่ยนแปลงเมื่อมีข้อมูลครบ)`;
  }

  return {
    id: "flood",
    titleTh: "ความเสี่ยงน้ำท่วม",
    band,
    verdictTh,
    missingTh: missing.length > 0 ? missing : undefined,
    factors,
    tier: weakestFactorTier(factors),
    priority: 90,
  };
}

/** False-calm: heavy rain in the last 24h but a currently-calm gauge — the surge may still be arriving. */
export function coupleLag(input: {
  rainLast24hMm: number | null;
  rainTier: Tier;
  currentWaterClass: RidWaterClass | null;
  waterTier: Tier;
}): Coupling | null {
  if (input.rainLast24hMm == null || input.currentWaterClass == null) return null;
  const heavyRainRecently = classifyRain24h(input.rainLast24hMm) === "heavy" || classifyRain24h(input.rainLast24hMm) === "veryHeavy";
  const gaugeCalm = input.currentWaterClass === "low" || input.currentWaterClass === "normal";
  if (!heavyRainRecently || !gaugeCalm) return null;

  const factors: CouplingFactor[] = [
    { labelTh: "ฝน 24 ชม.ที่ผ่านมา", valueTh: `${input.rainLast24hMm} มม.`, tier: input.rainTier },
    { labelTh: "ระดับน้ำปัจจุบัน", valueTh: RID_WATER_CLASS_TH[input.currentWaterClass], tier: input.waterTier },
  ];
  return {
    id: "lag",
    titleTh: "ความเงียบสงบชั่วคราว",
    band: "watch",
    verdictTh: "ฝนตกหนักในช่วง 24 ชม.ที่ผ่านมา แต่ระดับน้ำยังปกติ — น้ำจากต้นน้ำอาจยังเดินทางมาไม่ถึง ไม่ควรตีความว่าปลอดภัยแล้ว",
    factors,
    tier: weakestFactorTier(factors),
    priority: 70,
  };
}

/** Crop water demand: vapour-pressure deficit x usable reservoir storage. */
export function coupleCropDemand(input: {
  tempC: number | null;
  relativeHumidityPct: number | null;
  weatherTier: Tier;
  usableWater: UsableWater;
}): Coupling | null {
  if (input.tempC == null || input.relativeHumidityPct == null) return null;
  const vpd = vapourPressureDeficitKpa(input.tempC, input.relativeHumidityPct);
  const demandHigh = vpd > 1.2; // kPa — commonly cited threshold above which crop water stress accelerates
  const factors: CouplingFactor[] = [
    { labelTh: "ความขาดแคลนไอน้ำ (VPD)", valueTh: `${vpd.toFixed(2)} kPa`, tier: input.weatherTier },
    {
      labelTh: "น้ำใช้การได้ในอ่าง",
      valueTh: input.usableWater.usableMcm != null ? `${input.usableWater.usableMcm.toFixed(1)} ล้าน ลบ.ม.` : "ไม่ทราบ",
      tier: input.usableWater.tier,
    },
  ];
  const lowUsable = input.usableWater.usableMcm != null && input.usableWater.usableMcm < 20;
  const band: Band = demandHigh && lowUsable ? "alert" : demandHigh ? "watch" : "good";
  const verdictTh =
    band === "alert"
      ? "ความต้องการน้ำของพืชสูงขึ้นขณะที่น้ำใช้การได้ในอ่างเหลือน้อย ควรวางแผนการส่งน้ำล่วงหน้า"
      : band === "watch"
        ? "อากาศแห้งขึ้น ความต้องการน้ำของพืชเริ่มสูงขึ้น"
        : "ความต้องการน้ำของพืชอยู่ในเกณฑ์ปกติ";
  return { id: "crop-demand", titleTh: "ความต้องการน้ำเพื่อการเกษตร", band, verdictTh, factors, tier: weakestFactorTier(factors), priority: 40 };
}

/** Fire weather: Ångström index x real active-hotspot count. Critical requires BOTH legs — dry weather alone is not enough. */
export function coupleFireWeather(input: {
  tempC: number | null;
  relativeHumidityPct: number | null;
  weatherTier: Tier;
  activeHotspotCount: number | null;
  hotspotTier: Tier;
}): Coupling | null {
  if (input.tempC == null || input.relativeHumidityPct == null) return null;
  const index = angstromIndex(input.tempC, input.relativeHumidityPct);
  const dryDangerous = index < 2.5; // lower Ångström index = more fire-prone
  const hasHotspots = (input.activeHotspotCount ?? 0) > 0;
  const factors: CouplingFactor[] = [
    { labelTh: "ดัชนีสภาพอากาศไฟป่า (Ångström)", valueTh: index.toFixed(2), tier: input.weatherTier },
    { labelTh: "จุดความร้อนที่ตรวจพบ", valueTh: input.activeHotspotCount != null ? `${input.activeHotspotCount} จุด` : "ไม่ทราบ", tier: input.hotspotTier },
  ];
  const band: Band = dryDangerous && hasHotspots ? "critical" : dryDangerous ? "watch" : "good";
  const verdictTh =
    band === "critical"
      ? "สภาพอากาศแห้งเสี่ยงไฟป่าร่วมกับพบจุดความร้อนจริง — นี่คือความเสี่ยงที่เกิดขึ้นจริง ไม่ใช่แค่สภาพอากาศแห้ง"
      : dryDangerous
        ? "สภาพอากาศแห้งเสี่ยงไฟป่า แต่ยังไม่พบจุดความร้อน"
        : "สภาพอากาศไม่เอื้อต่อการเกิดไฟป่ารุนแรง";
  return { id: "fire-weather", titleTh: "สภาพอากาศเสี่ยงไฟป่า", band, verdictTh, factors, tier: weakestFactorTier(factors), priority: 60 };
}

/** Cloud/rain: dew-point spread vs cloud cover — will the cloud actually produce rain? */
export function coupleCloudRain(input: {
  tempC: number | null;
  dewPointC: number | null;
  cloudCoverPct: number | null;
  weatherTier: Tier;
}): Coupling | null {
  if (input.tempC == null || input.dewPointC == null || input.cloudCoverPct == null) return null;
  const baseM = cloudBaseMetres(input.tempC, input.dewPointC);
  const lowBase = baseM < 1000;
  const heavyCover = input.cloudCoverPct > 70;
  const factors: CouplingFactor[] = [
    { labelTh: "ความสูงฐานเมฆโดยประมาณ", valueTh: `${Math.round(baseM)} ม.`, tier: input.weatherTier },
    { labelTh: "ปริมาณเมฆปกคลุม", valueTh: `${input.cloudCoverPct}%`, tier: input.weatherTier },
  ];
  const band: Band = lowBase && heavyCover ? "watch" : "good";
  const verdictTh = band === "watch" ? "ฐานเมฆต่ำและปกคลุมมาก มีโอกาสเกิดฝนจริง" : "เมฆปกคลุมอาจให้ร่มเงาแต่มีโอกาสเกิดฝนต่ำ";
  return { id: "cloud-rain", titleTh: "โอกาสฝนจากเมฆ", band, verdictTh, factors, tier: weakestFactorTier(factors), priority: 30 };
}

/** Washout: rainfall x PM2.5 — will rain clear the air, or does today's AQI reading become unreliable? */
export function coupleWashout(input: { rain24hMm: number | null; rainTier: Tier; pm25: number | null; pm25Tier: Tier }): Coupling | null {
  if (input.rain24hMm == null || input.pm25 == null) return null;
  const rained = input.rain24hMm > 5;
  const wasHazy = input.pm25 > 37.5; // Thai PCD moderate threshold
  if (!wasHazy) return null;
  const factors: CouplingFactor[] = [
    { labelTh: "ฝน 24 ชม.", valueTh: `${input.rain24hMm} มม.`, tier: input.rainTier },
    { labelTh: "PM2.5", valueTh: `${input.pm25} ไมโครกรัม/ลบ.ม.`, tier: input.pm25Tier },
  ];
  const band: Band = rained ? "good" : "watch";
  const verdictTh = rained ? "ฝนที่ตกน่าจะช่วยลดฝุ่น PM2.5 ได้บางส่วน" : "ยังไม่มีฝนช่วยชะล้างฝุ่น ค่า PM2.5 อาจสูงต่อเนื่อง";
  return { id: "washout", titleTh: "ฝนกับฝุ่น PM2.5", band, verdictTh, factors, tier: weakestFactorTier(factors), priority: 35 };
}

/** Aggregate every coupling that could be built, sorted by priority (most operationally urgent first). */
export function cookCouplings(couplings: (Coupling | null)[]): Coupling[] {
  return couplings.filter((c): c is Coupling => c != null).sort((a, b) => b.priority - a.priority);
}

// ── Thai-aware near-duplicate detection for action lists ─────────────────
// Whitespace tokenizing is an English reflex — Thai has no word spaces.
// Character-run (LCS-style) comparison catches near-duplicate action text
// that a naive split(" ") comparison would miss entirely.

function longestSharedRun(a: string, b: string): number {
  const dp: number[] = new Array(b.length + 1).fill(0);
  let best = 0;
  for (let i = 1; i <= a.length; i++) {
    let prevDiag = 0;
    for (let j = 1; j <= b.length; j++) {
      const temp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prevDiag + 1 : 0;
      if (dp[j] > best) best = dp[j];
      prevDiag = temp;
    }
  }
  return best;
}

const SAME_INSTRUCTION_RUN = 14;
export function saysTheSameThing(a: string, b: string): boolean {
  return longestSharedRun(a, b) >= SAME_INSTRUCTION_RUN;
}

const MAX_ACTIONS = 5;

/** Build a deduplicated, capped action list: coupling-derived actions first, then reading-derived ones. */
export function buildActions(couplingActionsTh: string[], readingActionsTh: string[]): string[] {
  const out: string[] = [];
  for (const candidate of [...couplingActionsTh, ...readingActionsTh]) {
    if (out.some((existing) => saysTheSameThing(existing, candidate))) continue;
    out.push(candidate);
    if (out.length >= MAX_ACTIONS) break;
  }
  return out;
}

export const __testables = { saysTheSameThing, longestSharedRun };
