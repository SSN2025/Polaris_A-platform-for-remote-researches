import Link from 'next/link';
import { getCategoryCounts, getMapData, getResearchTimeline, getAllPapersForDiscover } from '@/lib/data';
import { CATEGORIES, CATEGORY_ICONS, getCategoryColor } from '@/lib/constants';
import TimelineChart from './TimelineChart';
import DiscoverClient from './DiscoverClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Discover Polar Science',
  description: 'Explore Indian polar research by scientific topics, polar stations map, and chronological publication timeline.',
};

export default async function DiscoverPage() {
  const [categoryCounts, mapData, timelineData, allPapers] = await Promise.all([
    getCategoryCounts(),
    getMapData(),
    getResearchTimeline(),
    getAllPapersForDiscover(),
  ]);

  // Build map of category counts
  const countMap = {};
  categoryCounts.forEach((c) => {
    countMap[c.category] = c.count;
  });

  // Extract all unique tags across all papers
  const tagCounts = {};
  allPapers.forEach((p) => {
    const tags = p.taxonomy?.tags || [];
    tags.forEach((tag) => {
      if (tag) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    });
  });

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  return (
    <div className="bg-gray-50/50 min-h-screen py-10">
      <div className="container-wide space-y-12">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Discover</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Discover Polar Science</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Explore India&apos;s polar knowledge repository through spatial station maps, scientific disciplines, and multi-decade research timelines.
          </p>
        </div>

        {/* 1. Topics: Categories & Tags */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>📚</span> Scientific Disciplines &amp; Topics
              </h2>
              <p className="text-sm text-gray-500">
                Browse records structured under NCPOR&apos;s 10 core polar science categories.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {CATEGORIES.map((cat) => {
              const count = countMap[cat] || 0;
              const colors = getCategoryColor(cat);
              const icon = CATEGORY_ICONS[cat] || '📋';

              return (
                <Link
                  key={cat}
                  href={`/research?category=${encodeURIComponent(cat)}`}
                  className="card p-4 flex flex-col justify-between hover:-translate-y-0.5 transition-all group"
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 line-clamp-2">
                      {cat}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      {count} paper{count === 1 ? '' : 's'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Popular Tags */}
          {popularTags.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                Popular Science Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/research?q=${encodeURIComponent(tag)}`}
                    className="chip bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs px-3 py-1 font-medium inline-flex items-center gap-1.5"
                  >
                    <span>#{tag}</span>
                    <span className="text-[10px] bg-blue-200/70 text-blue-900 rounded-full px-1.5 py-0.2">
                      {count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 2. Polar Research Map & Location View */}
        <section>
          <DiscoverClient
            siteData={mapData}
            allPapers={allPapers}
          />
        </section>

        {/* 3. Research Output Timeline */}
        <section>
          <TimelineChart timelineData={timelineData} />
        </section>
      </div>
    </div>
  );
}
