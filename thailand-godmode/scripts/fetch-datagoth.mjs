#!/usr/bin/env node
// CLI: dump a city's data.go.th catalog to JSON for review before it's
// baked into the city config's dataGoThQueries. No API key required —
// data.go.th's CKAN Action API is public.
//
// Usage: node scripts/fetch-datagoth.mjs "Lopburi" "ลพบุรี"

const terms = process.argv.slice(2);
if (terms.length === 0) {
  console.error('Usage: node scripts/fetch-datagoth.mjs "City Name" ["ชื่อจังหวัด"] ...');
  process.exit(1);
}

const CKAN_ROOT = "https://data.go.th/api/3/action";

async function searchTerm(term) {
  const url = `${CKAN_ROOT}/package_search?q=${encodeURIComponent(term)}&rows=50`;
  const res = await fetch(url, { headers: { "User-Agent": "DrNon-Thailand-Godmode/1.0 (+city data harvester)" } });
  if (!res.ok) {
    console.error(`  [${term}] request failed: ${res.status}`);
    return [];
  }
  const body = await res.json();
  if (!body.success) {
    console.error(`  [${term}] CKAN reported failure`);
    return [];
  }
  return body.result.results;
}

const seen = new Map();
for (const term of terms) {
  console.error(`Searching data.go.th for "${term}" ...`);
  const results = await searchTerm(term);
  console.error(`  ${results.length} dataset(s)`);
  for (const pkg of results) {
    if (!seen.has(pkg.id)) seen.set(pkg.id, pkg);
  }
}

const datasets = Array.from(seen.values()).map((pkg) => ({
  id: pkg.id,
  title: pkg.title,
  organization: pkg.organization?.title ?? null,
  tags: (pkg.tags ?? []).map((t) => t.name),
  resourceCount: (pkg.resources ?? []).length,
  formats: Array.from(new Set((pkg.resources ?? []).map((r) => (r.format ?? "unknown").toLowerCase()))),
  url: `https://data.go.th/dataset/${pkg.name}`,
  metadataModified: pkg.metadata_modified ?? null,
}));

console.error(`\n${datasets.length} unique dataset(s) total across ${terms.length} term(s).\n`);
console.log(JSON.stringify(datasets, null, 2));
