/**
 * City-config types + loader.
 *
 * The one file that should change per city is configs/cities/<slug>.city.json
 * (validated against configs/schema/city-config.schema.json). Everything in
 * packages/core and packages/connectors reads through this type — if a
 * connector needs a Lopburi-specific fact that isn't here, add the field to
 * the schema and this interface, don't hardcode it in the connector.
 */

export type ThaiRegion = "north" | "northeast" | "central" | "east" | "west" | "south";

export interface HydrologyStation {
  id: string;
  nameTh: string;
  nameEn?: string;
  lon?: number;
  lat?: number;
  /** Bank/critical level in metres MSL. 0 marks a rain-gauge-only station. */
  bankLevelMsl: number;
  expectedIntervalMin?: number;
}

export interface DamConfig {
  id: string;
  nameTh: string;
  nameEn?: string;
  /** Published dead-storage constant (MCM). Used as a reference-tier fallback only — never a live value. */
  deadStorageMcm?: number;
}

export interface DownstreamLeg {
  districtTh: string;
  districtEn?: string;
  fromStationId?: string;
  travelTimeHours: number;
}

export interface AirQualityStation {
  id: string;
  nameTh: string;
  nameEn?: string;
  lon?: number;
  lat?: number;
}

export interface CorridorGeometry {
  id: string;
  labelTh: string;
  labelEn?: string;
  aliases?: string[];
  center: [number, number];
  zoom?: number;
  defaultActionTh?: string;
}

export interface BrandPalette {
  /** Primary brand color (e.g. provincial flag blue). Chrome only — never a status color. */
  cool: string;
  /** Secondary/seasonal accent (e.g. sunflower yellow). Chrome only. */
  sun: string;
  /** Up to 4 local motif accents (street art, craft, textile). Chrome only. */
  streetAccents?: string[];
}

export interface CityConfig {
  slug: string;
  nameTh: string;
  nameEn: string;
  aliases?: string[];
  region: ThaiRegion;
  center: { lon: number; lat: number; zoom?: number };
  isCoastal?: boolean;
  dataGoThQueries?: string[];
  hydrology?: {
    stations?: HydrologyStation[];
    dams?: DamConfig[];
    downstream?: DownstreamLeg[];
  };
  airQuality?: {
    stations?: AirQualityStation[];
  };
  geometry?: {
    corridors?: CorridorGeometry[];
    marinePoints?: unknown[];
  };
  cctv?: {
    /** [minLon, minLat, maxLon, maxLat] — filters the national ITIC/Longdo feed to this province. */
    bbox?: [number, number, number, number];
  };
  socialListening?: {
    keywords?: string[];
    rssFeeds?: string[];
  };
  brandPalette?: BrandPalette;
}

/** All the search terms a data.go.th harvest or social-listening scrape should use for this city. */
export function citySearchTerms(config: CityConfig): string[] {
  const terms = [config.nameTh, config.nameEn, ...(config.aliases ?? [])];
  return Array.from(new Set(terms.filter(Boolean)));
}

/** Load and lightly validate a city config object (already-parsed JSON). Throws on missing required fields. */
export function loadCityConfig(raw: unknown): CityConfig {
  const c = raw as Partial<CityConfig>;
  const missing = (["slug", "nameTh", "nameEn", "region", "center"] as const).filter((k) => !c[k]);
  if (missing.length > 0) {
    throw new Error(`city config missing required field(s): ${missing.join(", ")}`);
  }
  return c as CityConfig;
}
