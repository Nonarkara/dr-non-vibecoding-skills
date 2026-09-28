/**
 * Tiered cache — the freshness vocabulary every consumer must expose.
 *
 * Ported from the Lopburi reference build's src/lib/cache.ts (the mechanism)
 * plus dr-non-vibecoding-skills/skills/data-catalog's tier vocabulary (the
 * naming). The mechanism doesn't change per city; only the TTLs a given
 * connector chooses do.
 *
 * live       → hit upstream, TTL measured in minutes
 * database   → ingested once, queried locally
 * cache      → serving last-good after an upstream failure
 * scenario   → deterministic demo data (?scenario= set, or live+cache both
 *              unavailable and a demo must still work)
 * reference  → refreshed daily/weekly, treated as static within a session
 *              (published constants, agency thresholds)
 * unavailable→ no source, no scenario, no reference — say so, don't guess
 */

export type Tier = "live" | "database" | "cache" | "scenario" | "reference" | "unavailable";

/** Tiers ordered worst-to-best for "weakest tier wins" aggregation (couplings, multi-source rollups). */
const TIER_RANK: Record<Tier, number> = {
  unavailable: 0,
  scenario: 1,
  reference: 2,
  cache: 3,
  database: 4,
  live: 5,
};

/** The weakest of any set of tiers — used when combining several readings into one derived value. */
export function weakestTier(tiers: Tier[]): Tier {
  if (tiers.length === 0) return "unavailable";
  return tiers.reduce((worst, t) => (TIER_RANK[t] < TIER_RANK[worst] ? t : worst));
}

interface CacheEntry<T> {
  data: T;
  tier: Tier;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();
const pending = new Map<string, Promise<unknown>>();

export interface Tiered<T> {
  data: T;
  tier: Tier;
  /** ms since this value was actually fetched from its source (0 for a fresh live hit). */
  ageMs: number;
}

/** Get a cached value verbatim, or null if expired/missing. */
export function getCache<T>(key: string): CacheEntry<T> | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) return entry; // expired but kept for last-good fallback
  return entry;
}

export function setCache<T>(key: string, data: T, tier: Tier, ttlSeconds: number): void {
  store.set(key, { data, tier, expiresAt: Date.now() + ttlSeconds * 1000 });
}

export function invalidateCache(key: string): void {
  store.delete(key);
}

/**
 * Fetch-or-serve-cached with automatic degrade-to-last-good.
 *
 * On a fresh hit: caches at `tier` (normally "live") for ttlSeconds, returns it.
 * On failure with a stale-but-present cache entry: returns the stale entry tagged "cache".
 * On failure with nothing cached: returns the scenarioFallback, tagged "scenario",
 *   or throws if no scenarioFallback was given (the caller must then say "unavailable").
 */
export async function cachedFetch<T>(
  key: string,
  ttlSeconds: number,
  compute: () => Promise<T>,
  opts?: { tier?: Tier; scenarioFallback?: () => T },
): Promise<Tiered<T>> {
  const fresh = getCache<T>(key);
  if (fresh && Date.now() <= fresh.expiresAt) {
    return { data: fresh.data, tier: fresh.tier, ageMs: 0 };
  }

  const inflight = pending.get(key) as Promise<Tiered<T>> | undefined;
  if (inflight) return inflight;

  const promise = (async (): Promise<Tiered<T>> => {
    try {
      const data = await compute();
      const tier = opts?.tier ?? "live";
      setCache(key, data, tier, ttlSeconds);
      return { data, tier, ageMs: 0 };
    } catch (err) {
      if (fresh) {
        // stale-but-present beats nothing — serve it, honestly tagged
        return { data: fresh.data, tier: "cache", ageMs: Date.now() - (fresh.expiresAt - ttlSeconds * 1000) };
      }
      if (opts?.scenarioFallback) {
        const data = opts.scenarioFallback();
        return { data, tier: "scenario", ageMs: 0 };
      }
      throw err;
    } finally {
      pending.delete(key);
    }
  })();

  pending.set(key, promise);
  return promise;
}
