// scripts/insert-data.js  —  DELETE existing content, paste this
// (only change from what you have: import path now points to
// extraction.js instead of research.js, and it now also saves
// source_path — needed for expedition-folder matching)

// #!/usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");
const { findJsonFiles, readJsonFile, getSourcePath, DATA_ROOT } = require("../src/lib/extraction.js");

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Create a `.env` file in the project root with:\n" +
      '  DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/polaris"'
  );
  process.exit(1);
}

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  console.log("Connected to database.");

  const files = findJsonFiles(DATA_ROOT);
  console.log(`Found ${files.length} data.json files.`);

  let inserted = 0;
  let skipped = 0;

  for (const filePath of files) {
    const paper = readJsonFile(filePath);

    if (!paper || !paper.document_id) {
      skipped += 1;
      console.warn(`Skipping (unreadable or no document_id): ${filePath}`);
      continue;
    }

    try {
      await client.query(
        `INSERT INTO papers (document_id, source_path, data)
         VALUES ($1, $2, $3)
         ON CONFLICT (document_id) DO UPDATE SET
           source_path = EXCLUDED.source_path,
           data = EXCLUDED.data`,
        [paper.document_id, getSourcePath(filePath), JSON.stringify(paper)]
      );
      inserted += 1;
    } catch (error) {
      skipped += 1;
      console.error(`Failed on ${filePath}: ${error.message}`);
    }
  }

  console.log(`\nInserted/updated: ${inserted}`);
  console.log(`Skipped: ${skipped}`);

  const { rows } = await client.query("SELECT count(*)::int AS count FROM papers");
  console.log(`Total rows now in papers table: ${rows[0].count}`);

  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});