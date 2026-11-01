import Link from 'next/link';
import { getExpeditionDetails } from '@/lib/data';
import EmptyState from '@/components/EmptyState';
import ExpeditionTabs from './ExpeditionTabs';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  return {
    title: decodedName,
    description: `Explore research papers, data, and findings from the ${decodedName} expedition — part of India's polar research programme.`,
  };
}

export default async function ExpeditionDetailPage({ params }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const papers = await getExpeditionDetails(decodedName);

  if (!papers || papers.length === 0) {
    return (
      <div className="container-wide py-16">
        <Link
          href="/expeditions"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Expeditions
        </Link>
        <EmptyState
          icon="🧭"
          title={`No papers found for "${decodedName}"`}
          description="This expedition does not have any research papers in the archive yet."
          actionHref="/expeditions"
          actionLabel="View All Expeditions"
        />
      </div>
    );
  }

  // Compute stats
  const years = papers.map((p) => p.year).filter(Boolean);
  const yearRange = {
    min: years.length > 0 ? Math.min(...years) : null,
    max: years.length > 0 ? Math.max(...years) : null,
  };

  // Category counts
  const catMap = {};
  papers.forEach((p) => {
    const cat = p.category || 'Other';
    catMap[cat] = (catMap[cat] || 0) + 1;
  });
  const categoryCounts = Object.entries(catMap)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // Research sites
  const sitesSet = new Set();
  papers.forEach((p) => {
    (p.content?.research_sites || []).forEach((s) => sitesSet.add(s));
  });
  const researchSites = [...sitesSet].sort();

  // Year distribution
  const yearMap = {};
  years.forEach((y) => {
    yearMap[y] = (yearMap[y] || 0) + 1;
  });
  const yearDistribution = Object.entries(yearMap)
    .map(([year, count]) => ({ year: Number(year), count }))
    .sort((a, b) => a.year - b.year);

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container-wide py-12 md:py-16">
          <Link
            href="/expeditions"
            className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Expeditions
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{decodedName}</h1>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-300">📝</span>
              <span>
                <strong className="text-white">{papers.length}</strong>{' '}
                <span className="text-blue-300">Papers</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-300">📂</span>
              <span>
                <strong className="text-white">{categoryCounts.length}</strong>{' '}
                <span className="text-blue-300">Categories</span>
              </span>
            </div>
            {yearRange.min && (
              <div className="flex items-center gap-2">
                <span className="text-blue-300">📅</span>
                <span>
                  <strong className="text-white">
                    {yearRange.min === yearRange.max
                      ? yearRange.min
                      : `${yearRange.min} – ${yearRange.max}`}
                  </strong>{' '}
                  <span className="text-blue-300">Year Range</span>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-blue-300">📍</span>
              <span>
                <strong className="text-white">{researchSites.length}</strong>{' '}
                <span className="text-blue-300">Research Sites</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="container-wide py-8">
        <ExpeditionTabs
          papers={papers}
          categoryCounts={categoryCounts}
          researchSites={researchSites}
          yearDistribution={yearDistribution}
          yearRange={yearRange}
        />
      </section>
    </div>
  );
}
