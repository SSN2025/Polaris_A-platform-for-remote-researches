import Link from 'next/link';
import { getExpeditions, getExpeditionTimeline } from '@/lib/data';
import { getCategoryColor } from '@/lib/constants';
import EmptyState from '@/components/EmptyState';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Indian Polar Expeditions',
  description:
    'Explore India\'s Antarctic and Arctic expeditions — browse research papers, timelines, and scientific discoveries from NCPOR polar missions.',
};

export default async function ExpeditionsPage() {
  const [expeditions, timeline] = await Promise.all([
    getExpeditions(),
    getExpeditionTimeline(),
  ]);

  if (!expeditions || expeditions.length === 0) {
    return (
      <div className="container-wide py-16">
        <EmptyState
          icon="🧭"
          title="No expeditions yet"
          description="Expedition data will appear here once papers are added to the archive."
          actionHref="/research"
          actionLabel="Browse Research"
        />
      </div>
    );
  }

  // Build a map of expedition → year range from timeline data
  const expeditionYearMap = {};
  timeline.forEach((entry) => {
    const years = Object.keys(entry.years).map(Number);
    if (years.length > 0) {
      expeditionYearMap[entry.name] = {
        minYear: Math.min(...years),
        maxYear: Math.max(...years),
      };
    }
  });

  // Sort timeline nodes by earliest year
  const timelineNodes = expeditions
    .map((exp) => ({
      ...exp,
      minYear: expeditionYearMap[exp.name]?.minYear,
      maxYear: expeditionYearMap[exp.name]?.maxYear,
    }))
    .filter((exp) => exp.minYear)
    .sort((a, b) => a.minYear - b.minYear);

  return (
    <div>
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container-wide py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Indian Polar Expeditions
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl">
            From the first Antarctic mission in 1981 to ongoing Arctic research at
            Himadri — explore decades of India&apos;s polar science heritage through
            NCPOR-led expeditions.
          </p>
          <div className="flex gap-6 mt-8 text-sm text-blue-300">
            <div>
              <span className="text-3xl font-bold text-white block">
                {expeditions.length}
              </span>
              Expeditions
            </div>
            <div>
              <span className="text-3xl font-bold text-white block">
                {expeditions.reduce((sum, e) => sum + e.paperCount, 0)}
              </span>
              Research Papers
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Visualization */}
      {timelineNodes.length > 0 && (
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="container-wide py-10">
            <h2 className="section-title text-xl mb-6">Expedition Timeline</h2>
            <div className="overflow-x-auto pb-4">
              <div className="flex items-center gap-0 min-w-max relative">
                {/* Horizontal line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-blue-200" />

                {timelineNodes.map((node, i) => (
                  <Link
                    key={node.name}
                    href={`/expeditions/${encodeURIComponent(node.name)}`}
                    className="relative flex flex-col items-center group px-4 shrink-0"
                  >
                    {/* Node dot */}
                    <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md z-10 group-hover:bg-blue-500 group-hover:scale-125 transition-all" />
                    {/* Label */}
                    <div className="mt-3 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2 text-center group-hover:shadow-md transition-shadow min-w-[120px]">
                      <p className="text-xs text-gray-500">{node.minYear}{node.maxYear !== node.minYear ? `–${node.maxYear}` : ''}</p>
                      <p className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">
                        {node.name}
                      </p>
                      <p className="text-xs text-blue-600 mt-0.5">
                        {node.paperCount} paper{node.paperCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Expedition Cards Grid */}
      <section className="container-wide py-12">
        <h2 className="section-title">All Expeditions</h2>
        <p className="section-subtitle">
          Select an expedition to explore its research papers, categories, and findings.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expeditions.map((exp) => {
            const yearInfo = expeditionYearMap[exp.name];
            return (
              <Link
                key={exp.name}
                href={`/expeditions/${encodeURIComponent(exp.name)}`}
                className="card p-6 flex flex-col hover:border-blue-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                    🧭
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {exp.name}
                    </h3>
                    {yearInfo && (
                      <p className="text-xs text-gray-500">
                        {yearInfo.minYear}
                        {yearInfo.maxYear !== yearInfo.minYear
                          ? ` – ${yearInfo.maxYear}`
                          : ''}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {exp.paperCount}
                    </span>{' '}
                    paper{exp.paperCount !== 1 ? 's' : ''}
                  </span>
                  <span className="text-blue-600 text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
