#!/usr/bin/env node
// Scaffold configs/cities/<slug>.city.json from the template.
// Usage: node scripts/new-city.mjs "Nakhon Ratchasima"

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const nameEn = process.argv[2];
if (!nameEn) {
  console.error('Usage: node scripts/new-city.mjs "City Name"');
  process.exit(1);
}

const slug = nameEn
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const outPath = path.join(root, "configs", "cities", `${slug}.city.json`);
if (existsSync(outPath)) {
  console.error(`configs/cities/${slug}.city.json already exists — edit it directly instead of re-scaffolding.`);
  process.exit(1);
}

const template = JSON.parse(readFileSync(path.join(root, "configs", "cities", "_template.city.json"), "utf8"));
template.slug = slug;
template.nameEn = nameEn;
template.nameTh = "REPLACE-ME";
template.aliases = [nameEn];
template.dataGoThQueries = [nameEn];

writeFileSync(outPath, JSON.stringify(template, null, 2) + "\n");

console.log(`Wrote configs/cities/${slug}.city.json`);
console.log("");
console.log("Next: work through docs/NEW-CITY-CHECKLIST.md. Start with:");
console.log(`  node scripts/fetch-datagoth.mjs "${nameEn}"`);
