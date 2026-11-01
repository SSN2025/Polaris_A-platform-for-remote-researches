import prisma from './prisma';

/**
 * Get aggregate stats from the database
 */
export async function getArchiveStats() {
  try {
    const totalPapers = await prisma.paper.count();

    if (totalPapers === 0) {
      return { totalPapers: 0, totalExpeditions: 0, totalSites: 0, totalCategories: 0 };
    }

    const expeditions = await prisma.paper.findMany({
      where: { expedition: { not: null } },
      select: { expedition: true },
      distinct: ['expedition'],
    });

    const papers = await prisma.paper.findMany({
      select: { content: true },
    });

    const sitesSet = new Set();
    papers.forEach((p) => {
      const sites = p.content?.research_sites || [];
      sites.forEach((s) => sitesSet.add(s));
    });

    const categories = await prisma.paper.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    return {
      totalPapers,
      totalExpeditions: expeditions.length,
      totalSites: sitesSet.size,
      totalCategories: categories.length,
    };
  } catch (err) {
    console.warn('[Database Notice] getArchiveStats error (check DATABASE_URL in .env):', err.message);
    return { totalPapers: 0, totalExpeditions: 0, totalSites: 0, totalCategories: 0 };
  }
}

/**
 * Get featured/highlighted papers
 */
export async function getFeaturedPapers(limit = 6) {
  try {
    const papers = await prisma.paper.findMany({
      where: {
        outreach: {
          path: ['highlight'],
          equals: true,
        },
      },
      take: limit,
      orderBy: { year: 'desc' },
    });
    return papers;
  } catch (err) {
    console.warn('[Database Notice] getFeaturedPapers error:', err.message);
    return [];
  }
}

/**
 * Get category counts for "Explore by Science"
 */
export async function getCategoryCounts() {
  try {
    const counts = await prisma.paper.groupBy({
      by: ['category'],
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    });
    return counts.map((c) => ({ category: c.category, count: c._count.category }));
  } catch (err) {
    console.warn('[Database Notice] getCategoryCounts error:', err.message);
    return [];
  }
}

/**
 * Get all unique expeditions with paper counts
 */
export async function getExpeditions() {
  try {
    const expeditions = await prisma.paper.groupBy({
      by: ['expedition'],
      where: { expedition: { not: null } },
      _count: { expedition: true },
      orderBy: { expedition: 'asc' },
    });
    return expeditions.map((e) => ({
      name: e.expedition,
      paperCount: e._count.expedition,
    }));
  } catch (err) {
    console.warn('[Database Notice] getExpeditions error:', err.message);
    return [];
  }
}

/**
 * Get expedition details with all papers
 */
export async function getExpeditionDetails(expeditionName) {
  try {
    const papers = await prisma.paper.findMany({
      where: { expedition: expeditionName },
      orderBy: { year: 'desc' },
    });
    return papers;
  } catch (err) {
    console.warn('[Database Notice] getExpeditionDetails error:', err.message);
    return [];
  }
}

/**
 * Get years for expedition timeline
 */
export async function getExpeditionTimeline() {
  try {
    const results = await prisma.paper.groupBy({
      by: ['expedition', 'year'],
      where: {
        expedition: { not: null },
        year: { not: null },
      },
      _count: { id: true },
      orderBy: { year: 'asc' },
    });

    const timeline = {};
    results.forEach((r) => {
      if (!timeline[r.expedition]) {
        timeline[r.expedition] = { name: r.expedition, years: {} };
      }
      timeline[r.expedition].years[r.year] = r._count.id;
    });

    return Object.values(timeline).sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.warn('[Database Notice] getExpeditionTimeline error:', err.message);
    return [];
  }
}

/**
 * Search/filter papers
 */
export async function searchPapers({
  query,
  expedition,
  category,
  subcategory,
  year,
  researchSite,
  keyword,
  page = 1,
  pageSize = 12,
} = {}) {
  try {
    const where = {};

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { path: ['abstract'], string_contains: query } },
        { content: { path: ['summary'], string_contains: query } },
      ];
    }

    if (expedition) where.expedition = expedition;
    if (category) where.category = category;
    if (subcategory) where.subcategory = subcategory;
    if (year) where.year = parseInt(year, 10);

    if (researchSite) {
      where.content = {
        ...where.content,
        path: ['research_sites'],
        array_contains: [researchSite],
      };
    }

    const [papers, total] = await Promise.all([
      prisma.paper.findMany({
        where,
        orderBy: { year: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.paper.count({ where }),
    ]);

    return {
      papers,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (err) {
    console.warn('[Database Notice] searchPapers error:', err.message);
    return {
      papers: [],
      total: 0,
      page: 1,
      pageSize,
      totalPages: 0,
    };
  }
}

/**
 * Get a single paper by slug ID
 */
export async function getPaperById(id) {
  try {
    return await prisma.paper.findUnique({ where: { id } });
  } catch (err) {
    console.warn('[Database Notice] getPaperById error:', err.message);
    return null;
  }
}

/**
 * Get related papers based on shared fields
 */
export async function getRelatedPapers(paper, limit = 5) {
  if (!paper) return [];
  try {
    const tags = paper.taxonomy?.tags || [];
    const keywords = paper.content?.keywords || [];
    const sites = paper.content?.research_sites || [];

    const candidates = await prisma.paper.findMany({
      where: {
        id: { not: paper.id },
        OR: [
          { expedition: paper.expedition },
          { category: paper.category },
          ...(tags.length > 0
            ? [{ taxonomy: { path: ['tags'], array_contains: tags.slice(0, 3) } }]
            : []),
        ],
      },
      take: limit * 3,
    });

    const scored = candidates.map((c) => {
      let score = 0;
      if (c.expedition === paper.expedition) score += 3;
      if (c.category === paper.category) score += 2;
      const cTags = c.taxonomy?.tags || [];
      const cKeywords = c.content?.keywords || [];
      const cSites = c.content?.research_sites || [];
      score += tags.filter((t) => cTags.includes(t)).length;
      score += keywords.filter((k) => cKeywords.includes(k)).length;
      score += sites.filter((s) => cSites.includes(s)).length * 2;
      return { ...c, _score: score };
    });

    scored.sort((a, b) => b._score - a._score);
    return scored.slice(0, limit);
  } catch (err) {
    console.warn('[Database Notice] getRelatedPapers error:', err.message);
    return [];
  }
}

/**
 * Get all unique filter values
 */
export async function getFilterOptions() {
  try {
    const [expeditions, categories, subcategories, years] = await Promise.all([
      prisma.paper.findMany({
        where: { expedition: { not: null } },
        select: { expedition: true },
        distinct: ['expedition'],
        orderBy: { expedition: 'asc' },
      }),
      prisma.paper.findMany({
        select: { category: true },
        distinct: ['category'],
        orderBy: { category: 'asc' },
      }),
      prisma.paper.findMany({
        where: { subcategory: { not: null } },
        select: { subcategory: true },
        distinct: ['subcategory'],
        orderBy: { subcategory: 'asc' },
      }),
      prisma.paper.findMany({
        where: { year: { not: null } },
        select: { year: true },
        distinct: ['year'],
        orderBy: { year: 'desc' },
      }),
    ]);

    const allPapers = await prisma.paper.findMany({
      select: { content: true },
    });

    const sitesSet = new Set();
    const keywordsSet = new Set();
    allPapers.forEach((p) => {
      (p.content?.research_sites || []).forEach((s) => sitesSet.add(s));
      (p.content?.keywords || []).forEach((k) => keywordsSet.add(k));
    });

    return {
      expeditions: expeditions.map((e) => e.expedition),
      categories: categories.map((c) => c.category),
      subcategories: subcategories.map((s) => s.subcategory),
      years: years.map((y) => y.year),
      researchSites: [...sitesSet].sort(),
      keywords: [...keywordsSet].sort(),
    };
  } catch (err) {
    console.warn('[Database Notice] getFilterOptions error:', err.message);
    return {
      expeditions: [],
      categories: [],
      subcategories: [],
      years: [],
      researchSites: [],
      keywords: [],
    };
  }
}

/**
 * Get papers for a specific research site
 */
export async function getPapersBySite(site) {
  try {
    return await prisma.paper.findMany({
      where: {
        content: {
          path: ['research_sites'],
          array_contains: [site],
        },
      },
      orderBy: { year: 'desc' },
    });
  } catch (err) {
    console.warn('[Database Notice] getPapersBySite error:', err.message);
    return [];
  }
}

/**
 * Get research timeline data (papers per year)
 */
export async function getResearchTimeline() {
  try {
    const results = await prisma.paper.groupBy({
      by: ['year'],
      where: { year: { not: null } },
      _count: { id: true },
      orderBy: { year: 'asc' },
    });
    return results.map((r) => ({ year: r.year, count: r._count.id }));
  } catch (err) {
    console.warn('[Database Notice] getResearchTimeline error:', err.message);
    return [];
  }
}

/**
 * Get papers needing review, sorted by lowest confidence
 */
export async function getVerificationQueue(page = 1, pageSize = 20) {
  try {
    const papers = await prisma.paper.findMany({
      where: {
        pipeline: {
          path: ['reviewed'],
          equals: false,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const sorted = papers
      .map((p) => {
        const confidence = p.pipeline?.confidence || {};
        const values = Object.values(confidence).filter((v) => typeof v === 'number');
        const minConfidence = values.length > 0 ? Math.min(...values) : 0;
        return { ...p, _minConfidence: minConfidence };
      })
      .sort((a, b) => a._minConfidence - b._minConfidence);

    const total = sorted.length;
    const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

    return {
      papers: paginated,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (err) {
    console.warn('[Database Notice] getVerificationQueue error:', err.message);
    return {
      papers: [],
      total: 0,
      page: 1,
      pageSize,
      totalPages: 0,
    };
  }
}

/**
 * Update paper (for admin review)
 */
export async function updatePaper(id, data) {
  return prisma.paper.update({
    where: { id },
    data,
  });
}

/**
 * Get admin dashboard stats
 */
export async function getAdminStats() {
  try {
    const total = await prisma.paper.count();

    const papers = await prisma.paper.findMany({
      select: { pipeline: true },
    });

    let extracted = 0;
    let reviewed = 0;
    let published = 0;
    let lowConfidence = 0;

    papers.forEach((p) => {
      const status = p.pipeline?.status;
      if (status === 'extracted') extracted++;
      if (status === 'reviewed') reviewed++;
      if (status === 'published') published++;

      const confidence = p.pipeline?.confidence || {};
      const values = Object.values(confidence).filter((v) => typeof v === 'number');
      if (values.some((v) => v < 0.7)) lowConfidence++;
    });

    return { total, extracted, reviewed, published, lowConfidence };
  } catch (err) {
    console.warn('[Database Notice] getAdminStats error:', err.message);
    return { total: 0, extracted: 0, reviewed: 0, published: 0, lowConfidence: 0 };
  }
}

/**
 * Get verified papers (for Creators page)
 */
export async function getVerifiedPapers(limit = 6) {
  try {
    const verified = await prisma.paper.findMany({
      where: {
        pipeline: {
          path: ['reviewed'],
          equals: true,
        },
      },
      take: limit,
      orderBy: { year: 'desc' },
    });

    if (verified.length > 0) return verified;

    return await prisma.paper.findMany({
      take: limit,
      orderBy: { year: 'desc' },
    });
  } catch (err) {
    console.warn('[Database Notice] getVerifiedPapers error:', err.message);
    return [];
  }
}

/**
 * Get all papers for Discover page
 */
export async function getAllPapersForDiscover() {
  try {
    return await prisma.paper.findMany({
      select: {
        id: true,
        document_id: true,
        title: true,
        year: true,
        expedition: true,
        category: true,
        subcategory: true,
        content: true,
        taxonomy: true,
        bibliographic: true,
      },
      orderBy: { year: 'desc' },
    });
  } catch (err) {
    console.warn('[Database Notice] getAllPapersForDiscover error:', err.message);
    return [];
  }
}

/**
 * Get recent papers for Admin dashboard
 */
export async function getRecentAdminPapers(limit = 5) {
  try {
    return await prisma.paper.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        document_id: true,
        title: true,
        year: true,
        expedition: true,
        category: true,
        pipeline: true,
        createdAt: true,
      },
    });
  } catch (err) {
    console.warn('[Database Notice] getRecentAdminPapers error:', err.message);
    return [];
  }
}

/**
 * Get map data: aggregate papers by research site
 */
export async function getMapData() {
  try {
    const papers = await prisma.paper.findMany({
      select: {
        content: true,
        expedition: true,
      },
    });

    const siteData = {};
    papers.forEach((p) => {
      const sites = p.content?.research_sites || [];
      sites.forEach((site) => {
        if (!siteData[site]) {
          siteData[site] = { name: site, papers: 0, expeditions: new Set() };
        }
        siteData[site].papers++;
        if (p.expedition) siteData[site].expeditions.add(p.expedition);
      });
    });

    return Object.values(siteData).map((s) => ({
      name: s.name,
      papers: s.papers,
      expeditions: s.expeditions.size,
    }));
  } catch (err) {
    console.warn('[Database Notice] getMapData error:', err.message);
    return [];
  }
}
