/**
 * data.go.th search-by-city — Thailand's government open-data portal.
 *
 * data.go.th runs on CKAN (the same platform behind data.humdata.org and
 * hundreds of other open-data portals), so the CKAN Action API applies
 * directly: package_search with a free-text q= parameter matches dataset
 * titles, notes, tags, and organization names.
 *
 * No key required. This is the harvester behind the /<city>/data analytics
 * page pattern (see docs/ARCHITECTURE.md and the Lopburi reference build's
 * /lopburi/data page).
 */

const CKAN_ROOT = "https://data.go.th/api/3/action";

export interface DataGoThResource {
  id: string;
  name: string;
  format: string;
  url: string;
  lastModified: string | null;
}

export interface DataGoThDataset {
  id: string;
  title: string;
  titleTh: string | null;
  notes: string | null;
  organization: string | null;
  tags: string[];
  resources: DataGoThResource[];
  metadataModified: string | null;
  url: string;
}

interface CkanPackageSearchResponse {
  success: boolean;
  result: {
    count: number;
    results: CkanPackage[];
  };
}

interface CkanPackage {
  id: string;
  title: string;
  title_th?: string;
  notes?: string;
  organization?: { title?: string };
  tags?: { name: string }[];
  resources?: { id: string; name?: string; format?: string; url: string; last_modified?: string }[];
  metadata_modified?: string;
  name: string;
}

function toDataset(pkg: CkanPackage): DataGoThDataset {
  return {
    id: pkg.id,
    title: pkg.title,
    titleTh: pkg.title_th ?? null,
    notes: pkg.notes ?? null,
    organization: pkg.organization?.title ?? null,
    tags: (pkg.tags ?? []).map((t) => t.name),
    resources: (pkg.resources ?? []).map((r) => ({
      id: r.id,
      name: r.name ?? r.format ?? "resource",
      format: (r.format ?? "unknown").toLowerCase(),
      url: r.url,
      lastModified: r.last_modified ?? null,
    })),
    metadataModified: pkg.metadata_modified ?? null,
    url: `https://data.go.th/dataset/${pkg.name}`,
  };
}

/**
 * Search data.go.th for every dataset whose title/notes/tags/organization
 * mention any of the given search terms (pass citySearchTerms(cityConfig)).
 * Runs one package_search per term and de-dupes by dataset id — CKAN's q=
 * doesn't reliably OR multiple free-text phrases, so multiple honest calls
 * beat one query that silently misses a spelling variant.
 */
export async function searchDataGoThByCity(
  searchTerms: string[],
  opts?: { rowsPerTerm?: number; fetchImpl?: typeof fetch },
): Promise<DataGoThDataset[]> {
  const doFetch = opts?.fetchImpl ?? fetch;
  const rows = opts?.rowsPerTerm ?? 50;
  const seen = new Map<string, DataGoThDataset>();

  for (const term of searchTerms) {
    const url = `${CKAN_ROOT}/package_search?q=${encodeURIComponent(term)}&rows=${rows}`;
    const res = await doFetch(url, { headers: { "User-Agent": "DrNon-Thailand-Godmode/1.0 (+city data harvester)" } });
    if (!res.ok) continue; // one bad term shouldn't fail the whole harvest — degrade, don't throw
    const body = (await res.json()) as CkanPackageSearchResponse;
    if (!body.success) continue;
    for (const pkg of body.result.results) {
      const dataset = toDataset(pkg);
      if (!seen.has(dataset.id)) seen.set(dataset.id, dataset);
    }
  }

  return Array.from(seen.values()).sort((a, b) => (b.metadataModified ?? "").localeCompare(a.metadataModified ?? ""));
}
