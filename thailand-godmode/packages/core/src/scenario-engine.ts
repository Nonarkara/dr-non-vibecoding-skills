/**
 * Deterministic scenario engine.
 *
 * When ?scenario=<id> is set, every module returns pre-modeled data instead
 * of calling external APIs — a consistent, impressive demo regardless of
 * live-data availability, and the ONLY floor that guarantees a governor demo
 * never shows a blank panel.
 *
 * The critical invariant, learned the hard way on the Lopburi build: every
 * scenario dataset must agree with every other scenario dataset on the same
 * screen. A "flood" scenario whose weather module independently rolls a dry
 * forecast breaks the exact "join the layers" concept this whole toolkit
 * exists to demonstrate. Scenarios are therefore defined once, as a single
 * cross-checked record per city, not assembled per-module.
 */

export interface ScenarioDefinition<T extends Record<string, unknown>> {
  id: string;
  labelTh: string;
  labelEn: string;
  /** The full cross-checked dataset for this scenario — one object touched by every module that needs scenario data. */
  data: T;
}

export class ScenarioRegistry<T extends Record<string, unknown>> {
  private scenarios = new Map<string, ScenarioDefinition<T>>();

  define(scenario: ScenarioDefinition<T>): void {
    this.scenarios.set(scenario.id, scenario);
  }

  get(id: string | null | undefined): ScenarioDefinition<T> | null {
    if (!id) return null;
    return this.scenarios.get(id) ?? null;
  }

  list(): ScenarioDefinition<T>[] {
    return Array.from(this.scenarios.values());
  }

  /** Parse ?scenario= from a URL search string, returning the matched scenario or null (live mode). */
  fromSearchParams(search: URLSearchParams): ScenarioDefinition<T> | null {
    return this.get(search.get("scenario"));
  }
}

/**
 * Cross-consistency check to run in a test suite for every scenario a city
 * defines — catches the class of bug where one field of a scenario dataset
 * quietly disagrees with another (e.g. "heavy rain forecast" scenario paired
 * with a dry-weather dew point that makes the cloud/rain coupling nonsensical).
 */
export function assertScenarioConsistency(
  checks: { label: string; ok: boolean }[],
): { label: string; ok: boolean }[] {
  const failures = checks.filter((c) => !c.ok);
  if (failures.length > 0) {
    throw new Error(`scenario consistency check(s) failed: ${failures.map((f) => f.label).join(", ")}`);
  }
  return checks;
}
