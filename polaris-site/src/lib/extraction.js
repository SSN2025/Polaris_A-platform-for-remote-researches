// src/lib/extraction.js  —  NEW FILE, create it

import fs from "fs";
import path from "path";

/*
 * Disk-only helpers.
 *
 * These are used by the one-time/occasional scripts that read
 * the pipeline's raw output (scripts/insert-data.js,
 * scripts/validate-data.js) — NOT by the running app anymore.
 * The app itself (src/lib/research.js) reads from Postgres.
 */

export const DATA_ROOT = path.join(process.cwd(), "Final_json_files");

export function readJsonFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Failed to read JSON file: ${filePath}`, error);
    return null;
  }
}

export function findJsonFiles(directory) {
  if (!fs.existsSync(directory)) {
    console.warn(`Research data directory not found: ${directory}`);
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase() === "data.json") {
      files.push(fullPath);
    }
  }

  return files;
}

/*
 * Convert the absolute JSON file path into a project-relative
 * path, e.g. "Final_json_files/10th Exp/Atmos Sci/.../data.json"
 */
export function getSourcePath(filePath) {
  return path.relative(process.cwd(), filePath).replace(/\\/g, "/");
}

/*
 * Extract the folder hierarchy from Final_json_files, given a
 * source_path string (works whether that string came from a
 * live filesystem walk or was read back out of the database).
 */
export function getSourceHierarchy(sourcePath) {
  const normalized = (sourcePath || "").replace(/\\/g, "/");
  const prefix = "Final_json_files/";

  if (!normalized.startsWith(prefix)) {
    return [];
  }

  const parts = normalized.slice(prefix.length).split("/");
  return parts.slice(0, -1);
}

/*
 * Extract the expedition folder, e.g.:
 *   "10th Exp"  -> "10th Exp"
 *   "24th Exp"  -> "24th Exp"
 *   "Exp 2"     -> "Exp 2"
 */
export function getExpeditionFolder(sourceHierarchy) {
  return (
    sourceHierarchy.find((part) =>
      /^(?:\d+(?:st|nd|rd|th)\s+Exp|Exp(?:\s+\d+)?)$/i.test(part.trim())
    ) || null
  );
}