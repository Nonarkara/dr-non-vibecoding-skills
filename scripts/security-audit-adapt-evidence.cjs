#!/usr/bin/env node
/**
 * Map confirmed security-audit findings to file:line plus observed result.
 * Usage: node scripts/security-audit-adapt-evidence.cjs <path-to-findings.json>
 *
 * Dependency-free. Does not replace validate-findings.cjs. The gate runs
 * the validator first; this file is the report line.
 */
"use strict";

const fs = require("fs");

function evidenceLines(findings) {
  if (!Array.isArray(findings)) {
    throw new Error("findings.json must be an array");
  }
  const lines = [];
  for (const finding of findings) {
    if (!finding || finding.verdict !== "confirmed") continue;
    const fingerprint =
      typeof finding.fingerprint === "string" && finding.fingerprint
        ? finding.fingerprint
        : "(missing fingerprint)";
    const observed = finding.execution && finding.execution.observed_result;
    if (typeof observed !== "string" || observed.trim() === "") {
      throw new Error(`${fingerprint}: confirmed finding has no observed result`);
    }
    const evidence = Array.isArray(finding.evidence) ? finding.evidence.slice() : [];
    if (evidence.length === 0) {
      throw new Error(`${fingerprint}: confirmed finding has no file:line evidence`);
    }
    evidence.sort((a, b) => {
      const fileOrder = String(a && a.file).localeCompare(String(b && b.file));
      if (fileOrder !== 0) return fileOrder;
      return Number(a && a.line) - Number(b && b.line);
    });
    for (const item of evidence) {
      const file = item && item.file;
      const line = item && item.line;
      if (typeof file !== "string" || file.length === 0 || !Number.isInteger(line) || line < 1) {
        throw new Error(`${fingerprint}: confirmed evidence is missing file:line`);
      }
      lines.push(`${file}:${line} — observed result: ${observed}`);
    }
  }
  return lines;
}

function run(filePath) {
  if (!filePath) {
    console.error("Usage: node scripts/security-audit-adapt-evidence.cjs <path-to-findings.json>");
    return 2;
  }
  let findings;
  try {
    findings = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Failed to read findings JSON: ${error.message}`);
    return 1;
  }
  let lines;
  try {
    lines = evidenceLines(findings);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    return 1;
  }
  for (const line of lines) console.log(line);
  return 0;
}

module.exports = { evidenceLines };

if (require.main === module) process.exit(run(process.argv[2]));
