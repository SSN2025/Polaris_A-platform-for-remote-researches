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

/*
 * Related Content Engine (structure doc §8.2).
 *
 * Scores every other paper against the given one using
 * fields that already exist in the locked schema — no new
 * stored data, this is pure query/aggregation logic:
 *
 *   +3  same expedition
 *   +2  same category
 *   +2  per shared research site
 *   +1  per shared tag
 *   +1  per shared keyword
 *
 * Returns the top-scoring papers, highest first, excluding
 * the paper itself and anything that scores 0.
 */

export function getRelatedResearch(paper, limit = 4) {
  if (!paper) {
    return [];
  }

  const allResearch = getAllResearch();

  const expedition = paper?.bibliographic?.expedition || null;
  const category = paper?.taxonomy?.category || null;

  const sites = new Set(
    Array.isArray(paper?.content?.research_sites)
      ? paper.content.research_sites
      : []
  );

  const tags = new Set(
    Array.isArray(paper?.taxonomy?.tags) ? paper.taxonomy.tags : []
  );

  const keywords = new Set(
    Array.isArray(paper?.content?.keywords) ? paper.content.keywords : []
  );

  const scored = allResearch
    .filter((candidate) => String(candidate.id) !== String(paper.id))
    .map((candidate) => {
      let score = 0;

      if (expedition && candidate?.bibliographic?.expedition === expedition) {
        score += 3;
      }

      if (category && candidate?.taxonomy?.category === category) {
        score += 2;
      }

      const candidateSites = Array.isArray(candidate?.content?.research_sites)
        ? candidate.content.research_sites
        : [];

      score += 2 * candidateSites.filter((site) => sites.has(site)).length;

      const candidateTags = Array.isArray(candidate?.taxonomy?.tags)
        ? candidate.taxonomy.tags
        : [];

      score += candidateTags.filter((tag) => tags.has(tag)).length;

      const candidateKeywords = Array.isArray(candidate?.content?.keywords)
        ? candidate.content.keywords
        : [];

      score += candidateKeywords.filter((keyword) =>
        keywords.has(keyword)
      ).length;

      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);

  return scored;
}