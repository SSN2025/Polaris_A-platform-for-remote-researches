import fs from "fs";
import path from "path";

const DATA_ROOT = path.join(process.cwd(), "Final_json_files");

function readJsonFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Failed to read JSON: ${filePath}`, error);
    return null;
  }
}

function findJsonFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.toLowerCase() === "data.json"
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getAllResearch() {
  const files = findJsonFiles(DATA_ROOT);

  return files
    .map(readJsonFile)
    .filter(Boolean)
    .map((paper) => ({
      ...paper,

      // Keep the original JSON structure untouched.
      // These normalized fields make the UI easier to build.
      display: {
        title:
          paper?.bibliographic?.title ||
          paper?.id ||
          "Untitled Research",

        category:
          paper?.taxonomy?.category ||
          "Unclassified",

        subcategory:
          paper?.taxonomy?.subcategory ||
          "Research",

        expedition:
          paper?.bibliographic?.expedition ||
          "Unknown Expedition",

        year:
          paper?.bibliographic?.year ||
          "Unknown",

        summary:
          paper?.content?.summary ||
          paper?.content?.abstract ||
          "No summary available.",

        sites:
          Array.isArray(paper?.content?.research_sites)
            ? paper.content.research_sites
            : [],

        keywords:
          Array.isArray(paper?.content?.keywords)
            ? paper.content.keywords
            : [],

        tags:
          Array.isArray(paper?.taxonomy?.tags)
            ? paper.taxonomy.tags
            : [],

        pages:
          paper?.content?.num_pages ||
          null,

        status:
          paper?.pipeline?.status ||
          "UNKNOWN",
      },
    }));
}

export function getResearchById(id) {
  const research = getAllResearch();

  return (
    research.find(
      (paper) => String(paper.id) === String(id)
    ) || null
  );
}

export function getResearchStats() {
  const research = getAllResearch();

  const categories = new Set();
  const expeditions = new Set();
  const sites = new Set();
  const years = new Set();

  research.forEach((paper) => {
    if (paper?.taxonomy?.category) {
      categories.add(paper.taxonomy.category);
    }

    if (paper?.bibliographic?.expedition) {
      expeditions.add(paper.bibliographic.expedition);
    }

    if (Array.isArray(paper?.content?.research_sites)) {
      paper.content.research_sites.forEach((site) => {
        if (site) sites.add(site);
      });
    }

    if (paper?.bibliographic?.year) {
      years.add(String(paper.bibliographic.year));
    }
  });

  return {
    totalPapers: research.length,
    totalCategories: categories.size,
    totalExpeditions: expeditions.size,
    totalResearchSites: sites.size,
    totalYears: years.size,
  };
}