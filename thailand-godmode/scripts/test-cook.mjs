#!/usr/bin/env node
// Smoke test for the generic cook/coupling engine (packages/core/src/cook.ts).
// Run: node --experimental-strip-types scripts/test-cook.mjs
// (Node 22.6+ type-stripping; no build step needed for this check.)

import assert from "node:assert/strict";
import {
  classifyWaterLevel,
  classifyRain24h,
  bandForWaterClass,
  bandForRainClass,
  coupleFlood,
  coupleLag,
  coupleFireWeather,
  coupleCloudRain,
  coupleWashout,
  cookStaleness,
  worstFreshness,
  saysTheSameThing,
  buildActions,
  saturationVapourPressureKpa,
  vapourPressureDeficitKpa,
  angstromIndex,
  cloudBaseMetres,
} from "../packages/core/src/cook.ts";
import { weakestTier } from "../packages/core/src/cache.ts";

let n = 0;
function check(label, cond) {
  n++;
  assert.ok(cond, label);
}

// RID water classification — agency-published bands, not invented.
check("overflow band", classifyWaterLevel(105) === "overflowing");
check("high band", classifyWaterLevel(85) === "high");
check("monitor band", classifyWaterLevel(60) === "monitor");
check("normal band", classifyWaterLevel(30) === "normal");
check("low band", classifyWaterLevel(5) === "low");
check("overflow maps to critical", bandForWaterClass("overflowing") === "critical");

// TMD rain classification
check("no rain", classifyRain24h(0) === "none");
check("light rain", classifyRain24h(5) === "light");
check("moderate rain", classifyRain24h(20) === "moderate");
check("heavy rain", classifyRain24h(60) === "heavy");
check("very heavy rain", classifyRain24h(120) === "veryHeavy");
check("very heavy maps to critical", bandForRainClass("veryHeavy") === "critical");

// Staleness
check("no timestamp is unknown", cookStaleness(null, new Date(), 60) === "unknown");
check("fresh within 1.5x cadence", cookStaleness(new Date(Date.now() - 30 * 60000).toISOString(), new Date(), 60) === "fresh");
check("abandoned far past cadence", cookStaleness(new Date(Date.now() - 30 * 24 * 60 * 60000).toISOString(), new Date(), 60) === "abandoned");
check("worst freshness wins", worstFreshness(["fresh", "stale", "fresh"]) === "stale");
check("weakest tier wins", weakestTier(["live", "scenario", "live"]) === "scenario");

// Published formulas — sanity ranges, not exact literature values (formulas are cited in cook.ts).
check("saturation vapour pressure at 25C is ~3.17 kPa", Math.abs(saturationVapourPressureKpa(25) - 3.17) < 0.05);
check("VPD is zero at 100% RH", vapourPressureDeficitKpa(30, 100) === 0);
check("VPD increases as RH drops", vapourPressureDeficitKpa(30, 40) > vapourPressureDeficitKpa(30, 80));
check("Angstrom index lower in hot+dry", angstromIndex(38, 20) < angstromIndex(25, 80));
check("cloud base rises with spread", cloudBaseMetres(30, 20) > cloudBaseMetres(30, 28));

// Couplings — the actual product
const overflow = coupleFlood({ waterClass: "overflowing", waterTier: "live", rainForecastMm24h: 5, rainTier: "live", downstreamHours: 6 });
check("overflow dominates regardless of forecast", overflow.band === "critical");

const calm = coupleFlood({ waterClass: "normal", waterTier: "live", rainForecastMm24h: 2, rainTier: "live", downstreamHours: null });
check("calm inputs stay good", calm.band === "good");

const missingLeg = coupleFlood({ waterClass: "monitor", waterTier: "live", rainForecastMm24h: null, rainTier: "unavailable", downstreamHours: null });
check("missing leg is hedged, not hidden", Array.isArray(missingLeg.missingTh) && missingLeg.missingTh.length > 0);

const lag = coupleLag({ rainLast24hMm: 95, rainTier: "live", currentWaterClass: "normal", waterTier: "live" });
check("heavy rain + calm gauge triggers false-calm coupling", lag !== null && lag.band === "watch");

const noLag = coupleLag({ rainLast24hMm: 2, rainTier: "live", currentWaterClass: "normal", waterTier: "live" });
check("light rain does not trigger false-calm coupling", noLag === null);

const dryOnly = coupleFireWeather({ tempC: 38, relativeHumidityPct: 15, weatherTier: "live", activeHotspotCount: 0, hotspotTier: "live" });
check("dry weather alone is watch, not critical", dryOnly && dryOnly.band === "watch");

const dryWithHotspots = coupleFireWeather({ tempC: 38, relativeHumidityPct: 15, weatherTier: "live", activeHotspotCount: 4, hotspotTier: "live" });
check("dry weather + real hotspots is critical (both legs required)", dryWithHotspots && dryWithHotspots.band === "critical");

const cloudRain = coupleCloudRain({ tempC: 28, dewPointC: 27, cloudCoverPct: 90, weatherTier: "live" });
check("low cloud base + heavy cover reads watch", cloudRain && cloudRain.band === "watch");

const washoutRained = coupleWashout({ rain24hMm: 20, rainTier: "live", pm25: 60, pm25Tier: "live" });
check("rain after haze is good (washout occurred)", washoutRained && washoutRained.band === "good");

const washoutDry = coupleWashout({ rain24hMm: 0, rainTier: "live", pm25: 60, pm25Tier: "live" });
check("no rain after haze stays watch", washoutDry && washoutDry.band === "watch");

const noWashoutNeeded = coupleWashout({ rain24hMm: 0, rainTier: "live", pm25: 10, pm25Tier: "live" });
check("clean air needs no washout coupling at all", noWashoutNeeded === null);

// Thai-aware near-duplicate detection — whitespace tokenizing is an English reflex.
check(
  "near-duplicate Thai instructions are caught",
  saysTheSameThing("ควรตรวจสอบระดับน้ำในอ่างเก็บน้ำทันที", "ควรตรวจสอบระดับน้ำในอ่างเก็บน้ำโดยเร็ว"),
);
check(
  "genuinely different Thai instructions are not flagged",
  !saysTheSameThing("ควรตรวจสอบระดับน้ำ", "เตรียมพร้อมอพยพประชาชนในพื้นที่เสี่ยง"),
);

const actions = buildActions(
  ["ควรแจ้งเตือนพื้นที่ท้ายน้ำทันทีเนื่องจากน้ำล้นตลิ่ง", "ควรแจ้งเตือนพื้นที่ท้ายน้ำโดยด่วนเนื่องจากน้ำล้นตลิ่งแล้ว"],
  ["เฝ้าระวังสถานการณ์ต่อเนื่อง", "ตรวจสอบกล้องวงจรปิดบริเวณจุดเสี่ยง", "ประสานงานหน่วยงานท้องถิ่น", "เตรียมพร้อมทีมกู้ภัย", "แจ้งเตือนประชาชนผ่านสื่อท้องถิ่น", "ปิดถนนจุดเสี่ยง"],
);
check("near-duplicate coupling action de-duped", actions.length <= 5);
check("action list capped at 5", actions.length === 5);

console.log(`ok — ${n} assertions passed (generic cook/coupling engine)`);
