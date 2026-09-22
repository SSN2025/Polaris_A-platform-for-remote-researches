// src/lib/research.js  —  DELETE existing content, paste this

import { prisma } from "./db.js";
import { getSourceHierarchy, getExpeditionFolder } from "./extraction.js";

/*
 * Display-only category cleanup.
 *
 * The raw pipeline output stores `taxonomy.category` as the
 * literal source folder name (e.g. "2]Atmospsheric Sciences",
 * "4] Biological Sciences"). This strips the leading ordinal
 * prefix ("2]", "4] ") and trims whitespace so cards, filters
 * and the admin panel read cleanly.
 *
 * This never touches the underlying data and never invents a
 * category that isn't already in the source data — it is pure
 * presentation, same as the provenance block in §8.6 of the
 * structure doc.
 */
export function cleanCategoryLabel(raw) {
  if (!raw || typeof raw !== "string") {
    return "Unclassified";
  }

  return raw.replace(/^\s*\d+\]\s*/, "").trim() || "Unclassified";
}

/*
 * ---------------------------------------------------------
 * In-memory index cache, now backed by Postgres.
 *
 * One query (`prisma.papers.findMany()`) loads all rows once
 * per server process; every other exported function reads from
 * this cached, enriched array instead of hitting the database
 * again. Invalidated automatically by savePaperUpdates(), and
 * force-rebuildable via rebuildIndex() (POST /api/admin/reindex)
 * if rows change outside the app - e.g. someone re-runs
 * scripts/insert-data.js while the server is already running.
 *
 * indexPromise (not indexCache) deliberately holds a Promise,
 * not a resolved array: if two requests hit a cold cache at the
 * same time, both get the SAME in-flight query instead of each
 * triggering their own `findMany()` (request coalescing).
 * ---------------------------------------------------------
 */

let indexPromise = null;
let searchBlobCache = null; // Map<document_id, string> — kept OFF the public record objects
let indexHealth = { corrupted: [], builtAt: null };

async function buildIndex() {
  const rows = await prisma.papers.findMany();
  const corrupted = [];
  const searchBlobs = new Map();

  const records = rows
    .map((row) => {
      const paper = row.data;

      if (!paper || typeof paper !== "object") {
        corrupted.push(row.document_id);
        return null;
      }

      const sourcePath = row.source_path || "";
      const sourceHierarchy = getSourceHierarchy(sourcePath);
      const expeditionFolder = getExpeditionFolder(sourceHierarchy);

      const display = {
        title: paper?.bibliographic?.title || paper?.id || "Untitled Research",
        category: cleanCategoryLabel(paper?.taxonomy?.category),
        subcategory: paper?.taxonomy?.subcategory || "Research",
        expedition: paper?.bibliographic?.expedition || "Unknown Expedition",
        year: paper?.bibliographic?.year || "Unknown",
        summary:
          paper?.content?.summary ||
          paper?.content?.abstract ||
          "No summary available.",
        sites: Array.isArray(paper?.content?.research_sites)
          ? paper.content.research_sites
          : [],
        keywords: Array.isArray(paper?.content?.keywords)
          ? paper.content.keywords
          : [],
        tags: Array.isArray(paper?.taxonomy?.tags) ? paper.taxonomy.tags : [],
        pages: paper?.content?.num_pages || null,
        status: paper?.pipeline?.status || "UNKNOWN",
        sourcePath,
        sourceHierarchy,
        expeditionFolder,
      };

      const record = {
        ...paper,
        // Guard against a raw file's own document_id field ever
        // drifting from the DB row's primary key - the row's key
        // is the one guaranteed unique and indexed.
        document_id: row.document_id,
        source_path: sourcePath,
        source_hierarchy: sourceHierarchy,
        source_expedition_folder: expeditionFolder,
        display,
      };

      /*
       * Precomputed once per record instead of re-stringifying
       * the whole paper on every station/search match. Kept in
       * a side Map (searchBlobs), NOT on `record` itself — this
       * array of records gets passed straight into a Client
       * Component (ResearchInterface) on /research, so anything
       * attached here ships to every visitor's browser.
       *
       * Keyed by `document_id` (the DB primary key - guaranteed
       * unique), not the raw pipeline `id` field, which collides
       * across ~40% of records.
       */
      searchBlobs.set(
        record.document_id,
        [
          paper?.bibliographic?.title,
          paper?.bibliographic?.expedition,
          paper?.bibliographic?.publication_series,
          paper?.content?.abstract,
          paper?.content?.summary,
          paper?.taxonomy?.category,
          paper?.taxonomy?.subcategory,
          ...(Array.isArray(paper?.taxonomy?.tags) ? paper.taxonomy.tags : []),
          ...(Array.isArray(paper?.content?.keywords)
            ? paper.content.keywords
            : []),
          ...(Array.isArray(paper?.content?.research_sites)
            ? paper.content.research_sites
            : []),
          sourcePath,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
      );

      return record;
    })
    .filter(Boolean);

  indexHealth = { corrupted, builtAt: new Date().toISOString() };
  searchBlobCache = searchBlobs;

  return records;
}

function loadIndex() {
  if (!indexPromise) {
    indexPromise = buildIndex().catch((error) => {
      // Allow the next call to retry instead of caching a failure forever.
      indexPromise = null;
      throw error;
    });
  }

  return indexPromise;
}

/*
 * Force a fresh read from Postgres, bypassing the cache. Exposed
 * through POST /api/admin/reindex.
 */
export async function rebuildIndex() {
  indexPromise = null;
  searchBlobCache = null;
  return loadIndex();
}

function getSearchBlob(documentId) {
  return (searchBlobCache && searchBlobCache.get(documentId)) || "";
}

/*
 * Exposes parse failures and last-build time so the admin
 * dashboard can show real pipeline health instead of silently
 * dropping broken records.
 */
export async function getIndexHealth() {
  await loadIndex(); // ensure indexHealth is populated
  return indexHealth;
}

export async function getAllResearch() {
  return loadIndex();
}

/*
 * Simple substring search across the fields that matter most
 * for discovery: title, summary, category, tags, keywords,
 * and research sites. Powers the global search overlay.
 */
export async function searchResearch(query, limit = 5) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return { total: 0, results: [] };
  }

  const allResearch = await getAllResearch();

  const matches = allResearch.filter((paper) =>
    getSearchBlob(paper.document_id).includes(normalized)
  );

  return {
    total: matches.length,
    results: matches.slice(0, limit),
  };
}

/*
 * Used by expedition detail pages to find every research
 * record connected to a named station (Maitri, Bharati, etc.)
 * via free-text term matching against the precomputed search
 * blob.
 */
export async function findResearchByTerms(terms = []) {
  const normalizedTerms = terms
    .map((term) => String(term).toLowerCase().trim())
    .filter(Boolean);

  if (normalizedTerms.length === 0) {
    return [];
  }

  const allResearch = await getAllResearch();

  return allResearch.filter((paper) =>
    normalizedTerms.some((term) => getSearchBlob(paper.document_id).includes(term))
  );
}

/*
 * ---------------------------------------------------------
 * Admin Panel support (structure doc §11).
 *
 * Approve/Edit updates are written directly back to the
 * matching row's `data` column in Postgres — no filesystem
 * writes, no path resolution/security checks needed (a
 * parameterized UPDATE by primary key is inherently scoped to
 * exactly one row).
 * ---------------------------------------------------------
 */

/*
 * Aggregate dashboard stats for the admin panel — counts by
 * cleaned category, by expedition folder, and reviewed vs.
 * pending, all computed on read (no cached table needed at
 * this dataset size).
 */
export async function getAdminStats() {
  const allResearch = await getAllResearch();
  const health = await getIndexHealth();

  const byCategory = {};
  const byExpedition = {};
  let reviewed = 0;

  for (const paper of allResearch) {
    const category = paper.display.category;
    byCategory[category] = (byCategory[category] || 0) + 1;

    const expedition =
      paper.source_expedition_folder ||
      paper?.bibliographic?.expedition ||
      "Unassigned";
    byExpedition[expedition] = (byExpedition[expedition] || 0) + 1;

    if (paper?.pipeline?.reviewed) {
      reviewed += 1;
    }
  }

  return {
    total: allResearch.length,
    reviewed,
    pending: allResearch.length - reviewed,
    corrupted: health.corrupted.length,
    corruptedFiles: health.corrupted,
    indexBuiltAt: health.builtAt,
    byCategory: Object.entries(byCategory).sort((a, b) => b[1] - a[1]),
    byExpedition: Object.entries(byExpedition).sort((a, b) => b[1] - a[1]),
  };
}

/*
 * Per-field confidence list for a single paper, sorted lowest
 * first, so the review screen can flag exactly which fields
 * need a human look. Pure function on an already-loaded paper —
 * no DB access, stays sync.
 */
export function getConfidenceBreakdown(paper) {
  const confidence =
    paper?.pipeline?.confidence && typeof paper.pipeline.confidence === "object"
      ? paper.pipeline.confidence
      : {};

  return Object.entries(confidence)
    .filter(([, value]) => typeof value === "number")
    .map(([field, value]) => ({ field, value }))
    .sort((a, b) => a.value - b.value);
}

/*
 * Verification Queue (structure doc §11) — every paper, ranked
 * by its single lowest-confidence field so reviewers see the
 * riskiest extractions first. Already-reviewed papers sort to
 * the bottom.
 */
export async function getVerificationQueue({ limit = 100, includeReviewed = true } = {}) {
  const allResearch = await getAllResearch();

  const rows = allResearch
    .map((paper) => {
      const breakdown = getConfidenceBreakdown(paper);
      const lowest = breakdown[0] || null;
      const reviewed = Boolean(paper?.pipeline?.reviewed);

      return {
        id: paper.document_id,
        rawId: paper.id,
        title: paper.display.title,
        category: paper.display.category,
        expedition:
          paper.source_expedition_folder ||
          paper?.bibliographic?.expedition ||
          "Unassigned",
        reviewed,
        status: paper?.pipeline?.status || "extracted",
        lowestField: lowest?.field || null,
        lowestConfidence: typeof lowest?.value === "number" ? lowest.value : null,
      };
    })
    .filter((row) => includeReviewed || !row.reviewed)
    .sort((a, b) => {
      if (a.reviewed !== b.reviewed) {
        return a.reviewed ? 1 : -1;
      }

      const av = a.lowestConfidence ?? 1;
      const bv = b.lowestConfidence ?? 1;

      return av - bv;
    });

  return {
    total: rows.length,
    results: rows.slice(0, limit),
  };
}

/*
 * Write an Approve/Edit action back to the exact database row a
 * record came from. Only the field groups defined in the locked
 * schema are ever written — nothing new can be introduced
 * through this path. Re-fetches the row fresh from Postgres
 * (not the enriched in-memory cache) so `display`/`source_path`/
 * etc. never leak into the stored `data` blob.
 */
export async function savePaperUpdates(id, updates = {}) {
  const indexed = await getResearchById(id);

  if (!indexed) {
    return { ok: false, error: "not_found" };
  }

  const documentId = indexed.document_id;

  const row = await prisma.papers.findUnique({ where: { document_id: documentId } });

  if (!row) {
    return { ok: false, error: "source_missing" };
  }

  const raw = { ...row.data };
  const { bibliographic, content, taxonomy, outreach, action } = updates;

  if (bibliographic && typeof bibliographic === "object") {
    raw.bibliographic = { ...raw.bibliographic, ...bibliographic };
  }

  if (content && typeof content === "object") {
    raw.content = { ...raw.content, ...content };
  }

  if (taxonomy && typeof taxonomy === "object") {
    raw.taxonomy = { ...raw.taxonomy, ...taxonomy };
  }

  if (outreach && typeof outreach === "object") {
    raw.outreach = { ...raw.outreach, ...outreach };
  }

  raw.pipeline = raw.pipeline || {};

  if (action === "approve") {
    raw.pipeline.reviewed = true;
    raw.pipeline.status = "reviewed";
  } else if (action === "edit") {
    raw.pipeline.reviewed = true;
    raw.pipeline.status = "reviewed";

    // A human just corrected these fields directly, so their
    // confidence is no longer a pipeline estimate.
    raw.pipeline.confidence = raw.pipeline.confidence || {};

    for (const group of [bibliographic, content, taxonomy]) {
      if (!group) continue;
      for (const field of Object.keys(group)) {
        if (field in raw.pipeline.confidence) {
          raw.pipeline.confidence[field] = 1;
        }
      }
    }
  }

  try {
    await prisma.papers.update({
      where: { document_id: documentId },
      data: { data: raw },
    });
  } catch (error) {
    return { ok: false, error: "write_failed" };
  }

  // The row just changed — drop the cached index so the next
  // read reflects it instead of serving stale data.
  indexPromise = null;
  searchBlobCache = null;

  return { ok: true, paper: await getResearchById(id) };
}

/*
 * Lookup by unique record identifier.
 *
 * Bug (fixed in an earlier pass, still relevant here): the raw
 * pipeline's `id` field (e.g. "article_6") is not globally
 * unique - 257 of 637 records share an `id` with at least one
 * other record. `document_id` IS guaranteed unique and is the
 * Postgres primary key, so it's matched first; the old ambiguous
 * `id` field is kept as a fallback for any link still using it.
 */
export async function getResearchById(identifier) {
  const research = await getAllResearch();
  const target = String(identifier);

  const byDocumentId = research.find((paper) => String(paper.document_id) === target);

  if (byDocumentId) {
    return byDocumentId;
  }

  return research.find((paper) => String(paper.id) === target) || null;
}

/*
 * Related Content Engine (structure doc §8.2).
 *
 * Scores every other paper against the given one using fields
 * that already exist in the locked schema — no new stored data,
 * this is pure query/aggregation logic:
 *
 *   +3  same expedition
 *   +2  same category
 *   +2  per shared research site
 *   +1  per shared tag
 *   +1  per shared keyword
 *
 * Returns the top-scoring papers, highest first, excluding the
 * paper itself and anything that scores 0.
 */
export async function getRelatedResearch(paper, limit = 4) {
  if (!paper) {
    return [];
  }

  const allResearch = await getAllResearch();

  const expedition = paper?.bibliographic?.expedition || null;
  const category = paper?.taxonomy?.category || null;

  const sites = new Set(
    Array.isArray(paper?.content?.research_sites) ? paper.content.research_sites : []
  );

  const tags = new Set(
    Array.isArray(paper?.taxonomy?.tags) ? paper.taxonomy.tags : []
  );

  const keywords = new Set(
    Array.isArray(paper?.content?.keywords) ? paper.content.keywords : []
  );

  const scored = allResearch
    .filter((candidate) => String(candidate.document_id) !== String(paper.document_id))
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

      score += candidateKeywords.filter((keyword) => keywords.has(keyword)).length;

      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);

  return scored;
}