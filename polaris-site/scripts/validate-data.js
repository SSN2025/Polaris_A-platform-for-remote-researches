#!/usr/bin/env node

/*
 * Validates every `data.json` under Final_json_files/ against
 * the locked schema (see ncpor_paper_schema_final.md). This is
 * intentionally standalone (no Next.js imports) so it can run
 * in CI or before a demo without booting the app.
 *
 * Usage:
 *   npm run validate-data
 *   npm run validate-data -- --strict   (exit non-zero on any warning)
 */

const fs = require("fs");
const path = require("path");

const DATA_ROOT = path.join(process.cwd(), "Final_json_files");
const STRICT = process.argv.includes("--strict");

const REQUIRED_TOP_LEVEL = [
  "id",
  "document_id",
  "source_file",
  "bibliographic",
  "content",
  "taxonomy",
  "outreach",
  "evidence",
  "pipeline",
];

const CATEGORY_LIST = [
  "Biology / Microbiology",
  "Glaciology",
  "Geophysics",
  "Geology",
  "Oceanography",
  "Atmospheric Science / Meteorology",
  "Marine Biology",
  "Environmental Science",
  "Logistics / Expedition Operations",
  "Other",
];

function findJsonFiles(directory) {
  if (!fs.existsSync(directory)) return [];

  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase() === "data.json") {
      files.push(fullPath);
    }
  }
  return files;
}

function checkRecord(record, relativePath) {
  const errors = [];
  const warnings = [];

  for (const key of REQUIRED_TOP_LEVEL) {
    if (!(key in record)) {
      errors.push(`missing top-level field "${key}"`);
    }
  }

  if (record.evidence !== undefined && !Array.isArray(record.evidence)) {
    errors.push('"evidence" must be an array');
  }

  const bib = record.bibliographic || {};
  if (!bib.title) warnings.push("bibliographic.title is empty");
  if (!bib.year) warnings.push("bibliographic.year is empty");

  const content = record.content || {};
  if (!content.summary) warnings.push("content.summary is empty");
  if (
    content.research_sites !== undefined &&
    !Array.isArray(content.research_sites)
  ) {
    errors.push("content.research_sites must be an array");
  }

  const taxonomy = record.taxonomy || {};
  const rawCategory = (taxonomy.category || "").replace(/^\s*\d+\]\s*/, "").trim();
  if (!rawCategory) {
    warnings.push("taxonomy.category is empty");
  } else if (!CATEGORY_LIST.includes(rawCategory)) {
    warnings.push(
      `taxonomy.category "${rawCategory}" is not in the locked category list (§3)`
    );
  }

  const pipeline = record.pipeline || {};
  if (pipeline.confidence && typeof pipeline.confidence !== "object") {
    errors.push("pipeline.confidence must be an object");
  }

  return { errors, warnings };
}

function main() {
  const files = findJsonFiles(DATA_ROOT);

  if (files.length === 0) {
    console.error(`No data.json files found under ${DATA_ROOT}`);
    process.exit(1);
  }

  let parseFailures = 0;
  let errorCount = 0;
  let warningCount = 0;
  const categoryTally = new Map();
  const idTally = new Map();
  const documentIdTally = new Map();

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath);
    let record;

    try {
      record = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      parseFailures += 1;
      console.log(`✗ PARSE ERROR  ${relativePath}\n    ${error.message}`);
      continue;
    }

    const { errors, warnings } = checkRecord(record, relativePath);

    if (record.id) {
      idTally.set(record.id, (idTally.get(record.id) || 0) + 1);
    }
    if (record.document_id) {
      documentIdTally.set(
        record.document_id,
        (documentIdTally.get(record.document_id) || 0) + 1
      );
    }

    const rawCategory = (record?.taxonomy?.category || "")
      .replace(/^\s*\d+\]\s*/, "")
      .trim() || "(none)";
    categoryTally.set(rawCategory, (categoryTally.get(rawCategory) || 0) + 1);

    if (errors.length > 0) {
      errorCount += 1;
      console.log(`✗ SCHEMA ERROR  ${relativePath}`);
      for (const e of errors) console.log(`    - ${e}`);
    }

    if (warnings.length > 0) {
      warningCount += 1;
      if (STRICT) {
        console.log(`! WARNING  ${relativePath}`);
        for (const w of warnings) console.log(`    - ${w}`);
      }
    }
  }

  console.log("\n---------------------------------------------");
  console.log(`Files scanned:     ${files.length}`);
  console.log(`Parse failures:    ${parseFailures}`);
  console.log(`Schema errors:     ${errorCount}`);
  console.log(`Records w/ warnings: ${warningCount}`);
  console.log("\nCategory values found (cleaned, sorted by count):");

  const sorted = [...categoryTally.entries()].sort((a, b) => b[1] - a[1]);
  for (const [category, count] of sorted) {
    const flag = CATEGORY_LIST.includes(category) ? "" : "  ← not in locked list";
    console.log(`  ${String(count).padStart(4)}  ${category}${flag}`);
  }

  console.log("---------------------------------------------\n");

  const failed = parseFailures > 0 || errorCount > 0 || (STRICT && warningCount > 0);

  if (failed) {
    console.error("Validation FAILED.");
    process.exit(1);
  }

  console.log("Validation passed.");
}

main();
