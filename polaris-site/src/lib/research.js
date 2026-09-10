import fs from "fs";
import path from "path";

const DATA_ROOT = path.join(
  process.cwd(),
  "Final_json_files"
);

function readJsonFile(filePath) {
  try {
    const raw = fs.readFileSync(
      filePath,
      "utf-8"
    );

    return JSON.parse(raw);
  } catch (error) {
    console.error(
      `Failed to read JSON file: ${filePath}`,
      error
    );

    return null;
  }
}

function findJsonFiles(directory) {
  if (!fs.existsSync(directory)) {
    console.warn(
      `Research data directory not found: ${directory}`
    );

    return [];
  }

  const entries = fs.readdirSync(
    directory,
    {
      withFileTypes: true,
    }
  );

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      files.push(
        ...findJsonFiles(fullPath)
      );
    } else if (
      entry.isFile() &&
      entry.name.toLowerCase() ===
        "data.json"
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

/*
 * Convert the absolute JSON file path into
 * a project-relative path.
 *
 * Example:
 *
 * Final_json_files/
 * └── 10th Exp/
 *     └── Atmos Sci/
 *         └── Meteo...
 *             └── data.json
 */

function getSourcePath(filePath) {
  return path
    .relative(
      process.cwd(),
      filePath
    )
    .replace(/\\/g, "/");
}

/*
 * Extract the folder hierarchy from
 * Final_json_files.
 */

function getSourceHierarchy(
  sourcePath
) {
  const normalized =
    sourcePath.replace(
      /\\/g,
      "/"
    );

  const prefix =
    "Final_json_files/";

  if (
    !normalized.startsWith(prefix)
  ) {
    return [];
  }

  const parts = normalized
    .slice(prefix.length)
    .split("/");

  return parts.slice(0, -1);
}

/*
 * Extract the expedition folder.
 *
 * Examples:
 *
 * "10th Exp"  → "10th Exp"
 * "24th Exp"  → "24th Exp"
 * "Exp 2"     → "Exp 2"
 */

function getExpeditionFolder(
  sourceHierarchy
) {
  return (
    sourceHierarchy.find(
      (part) =>
        /^(?:\d+(?:st|nd|rd|th)\s+Exp|Exp(?:\s+\d+)?)$/i.test(
          part.trim()
        )
    ) || null
  );
}

export function getAllResearch() {
  const files =
    findJsonFiles(DATA_ROOT);

  return files
    .map((filePath) => {
      const paper =
        readJsonFile(filePath);

      if (!paper) {
        return null;
      }

      const sourcePath =
        getSourcePath(
          filePath
        );

      const sourceHierarchy =
        getSourceHierarchy(
          sourcePath
        );

      const expeditionFolder =
        getExpeditionFolder(
          sourceHierarchy
        );

      return {
        ...paper,

        /*
         * Preserve source information.
         *
         * These fields are display/helper
         * metadata and do not replace any
         * existing schema fields.
         */

        source_path:
          sourcePath,

        source_hierarchy:
          sourceHierarchy,

        source_expedition_folder:
          expeditionFolder,

        display: {
          title:
            paper?.bibliographic
              ?.title ||
            paper?.id ||
            "Untitled Research",

          category:
            paper?.taxonomy
              ?.category ||
            "Unclassified",

          subcategory:
            paper?.taxonomy
              ?.subcategory ||
            "Research",

          expedition:
            paper?.bibliographic
              ?.expedition ||
            "Unknown Expedition",

          year:
            paper?.bibliographic
              ?.year ||
            "Unknown",

          summary:
            paper?.content
              ?.summary ||
            paper?.content
              ?.abstract ||
            "No summary available.",

          sites:
            Array.isArray(
              paper?.content
                ?.research_sites
            )
              ? paper.content
                  .research_sites
              : [],

          keywords:
            Array.isArray(
              paper?.content
                ?.keywords
            )
              ? paper.content
                  .keywords
              : [],

          tags:
            Array.isArray(
              paper?.taxonomy
                ?.tags
            )
              ? paper.taxonomy.tags
              : [],

          pages:
            paper?.content
              ?.num_pages ||
            null,

          status:
            paper?.pipeline
              ?.status ||
            "UNKNOWN",

          sourcePath,

          sourceHierarchy,

          expeditionFolder,
        },
      };
    })
    .filter(Boolean);
}

export function getResearchById(
  id
) {
  const research =
    getAllResearch();

  return (
    research.find(
      (paper) =>
        String(paper.id) ===
        String(id)
    ) || null
  );
}