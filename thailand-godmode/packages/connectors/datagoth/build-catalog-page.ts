/**
 * Turns a data.go.th harvest into the model for a /<city>/data analytics
 * page — grouped by organization, format-tagged, and honestly labelled with
 * when each dataset was last touched by its publisher (not when this
 * toolkit last fetched it — those are two different ages).
 */

import type { DataGoThDataset } from "./search-by-city.ts";

export interface CatalogOrganizationGroup {
  organization: string;
  datasets: DataGoThDataset[];
}

export interface CatalogPageModel {
  totalDatasets: number;
  totalResources: number;
  formats: { format: string; count: number }[];
  byOrganization: CatalogOrganizationGroup[];
  harvestedAt: string;
}

export function buildCatalogPage(datasets: DataGoThDataset[], harvestedAt: Date = new Date()): CatalogPageModel {
  const byOrg = new Map<string, DataGoThDataset[]>();
  const formatCounts = new Map<string, number>();
  let totalResources = 0;

  for (const ds of datasets) {
    const org = ds.organization ?? "ไม่ระบุหน่วยงาน";
    if (!byOrg.has(org)) byOrg.set(org, []);
    byOrg.get(org)!.push(ds);

    for (const resource of ds.resources) {
      totalResources += 1;
      formatCounts.set(resource.format, (formatCounts.get(resource.format) ?? 0) + 1);
    }
  }

  return {
    totalDatasets: datasets.length,
    totalResources,
    formats: Array.from(formatCounts.entries())
      .map(([format, count]) => ({ format, count }))
      .sort((a, b) => b.count - a.count),
    byOrganization: Array.from(byOrg.entries())
      .map(([organization, orgDatasets]) => ({ organization, datasets: orgDatasets }))
      .sort((a, b) => b.datasets.length - a.datasets.length),
    harvestedAt: harvestedAt.toISOString(),
  };
}
