/**
 * Generic module registry — the exact shape used by DrNon-Global-Satellite-Toolkit
 * (src/modules/registry.ts, src/types/modules.ts). Reused verbatim rather than
 * reinvented, per docs/SIBLING-REPOS.md: don't invent a second registry shape.
 *
 * A "module" is one data source integration: fetchData for the live call,
 * mockData for the scenario/reference floor, uiType for how a consuming app
 * should render it, pollInterval for how often to refresh.
 */

export type ModuleCategory =
  | "earth-observation"
  | "orbital-air-traffic"
  | "conflict-events"
  | "environmental"
  | "news-info"
  | "thailand"
  | "flood-air"
  | "cctv"
  | "social-listening"
  | "open-data";

export type ModuleUiType = "map" | "table" | "chart" | "card";

export interface ModuleDefinition<T = unknown> {
  id: string;
  label: string;
  category: ModuleCategory;
  description: string;
  pollInterval: number;
  uiType: ModuleUiType;
  fetchData: () => Promise<T>;
  mockData: T;
  requiredEnvVars?: string[];
  wrapsExisting?: boolean;
  tableColumns?: string[];
  chartConfig?: Record<string, unknown>;
}

export interface ModuleMetadata {
  id: string;
  label: string;
  category: ModuleCategory;
  description: string;
  pollInterval: number;
  uiType: ModuleUiType;
  tableColumns?: string[];
  chartConfig?: Record<string, unknown>;
  wrapsExisting?: boolean;
  requiredEnvVars?: string[];
  configured: boolean;
}

/** A city binds its own list of modules (built from packages/connectors/*, parameterized by its city-config) rather than importing a fixed global list. */
export class ModuleRegistry {
  private modules: ModuleDefinition[] = [];

  register(mod: ModuleDefinition): void {
    if (this.modules.some((m) => m.id === mod.id)) {
      throw new Error(`module id already registered: ${mod.id}`);
    }
    this.modules.push(mod);
  }

  registerAll(mods: ModuleDefinition[]): void {
    for (const m of mods) this.register(m);
  }

  getById(id: string): ModuleDefinition | undefined {
    return this.modules.find((m) => m.id === id);
  }

  getByCategory(category: ModuleCategory): ModuleDefinition[] {
    return this.modules.filter((m) => m.category === category);
  }

  getAll(): ModuleDefinition[] {
    return this.modules;
  }

  private isConfigured(mod: ModuleDefinition, env: Record<string, string | undefined>): boolean {
    if (!mod.requiredEnvVars || mod.requiredEnvVars.length === 0) return true;
    return mod.requiredEnvVars.every((key) => !!env[key]);
  }

  toMetadata(mod: ModuleDefinition, env: Record<string, string | undefined> = {}): ModuleMetadata {
    return {
      id: mod.id,
      label: mod.label,
      category: mod.category,
      description: mod.description,
      pollInterval: mod.pollInterval,
      uiType: mod.uiType,
      tableColumns: mod.tableColumns,
      chartConfig: mod.chartConfig,
      wrapsExisting: mod.wrapsExisting,
      requiredEnvVars: mod.requiredEnvVars,
      configured: this.isConfigured(mod, env),
    };
  }

  /** Client-safe catalog (strips fetchData/mockData closures). */
  getCatalog(env: Record<string, string | undefined> = {}): ModuleMetadata[] {
    return this.modules.map((m) => this.toMetadata(m, env));
  }
}
