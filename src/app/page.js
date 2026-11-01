import Link from 'next/link';
import { getArchiveStats, getFeaturedPapers, getCategoryCounts, getExpeditionTimeline } from '@/lib/data';
import { CATEGORIES, CATEGORY_ICONS, getCategoryColor } from '@/lib/constants';
import PaperCard from '@/components/PaperCard';
import EmptyState from '@/components/EmptyState';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [stats, featured, categoryCounts, timeline] = await Promise.all([
    getArchiveStats(),
    getFeaturedPapers(),
    getCategoryCounts(),
    getExpeditionTimeline(),
  ]);

  // Build a map of category → count from DB results
  const countMap = {};
  categoryCounts.forEach((c) => {
    countMap[c.category] = c.count;
  });

  const statCards = [
    {
      label: 'Total Papers',
      value: stats.totalPapers,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      label: 'Expeditions',
      value: stats.totalExpeditions,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
    },
    {
      label: 'Research Sites',
      value: stats.totalSites,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
    },
  ];

  const outreachSteps = [
    {
      title: 'Research',
      emoji: '📄',
      description: 'NCPOR publishes polar research papers from Indian expeditions',
    },
    {
      title: 'Verified',
      emoji: '✅',
      description: 'AI extracts data with human verification and confidence scoring',
    },
    {
      title: 'Outreach Kit',
      emoji: '📦',
      description: 'Simplified summaries, key findings, and visual hooks for creators',
      href: '/creators',
    },
    {
      title: 'Creator',
      emoji: '🎬',
      description: 'Content creators turn research into engaging public content',
    },
    {
      title: 'Public',
      emoji: '🌍',
      description: 'Accurate science reaches millions through trusted creators',
    },
  ];

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800">
        {/* Decorative ice-like elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-cyan-300/5 blur-2xl" />
          {/* Subtle ice crystal dots */}
          <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-cyan-300/30" />
          <div className="absolute top-40 right-1/3 w-1.5 h-1.5 rounded-full bg-blue-300/20" />
          <div className="absolute bottom-20 left-1/3 w-1 h-1 rounded-full bg-cyan-200/25" />
        </div>

        <div className="container-wide relative z-10 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-cyan-300 font-medium text-sm tracking-wider uppercase mb-4">
              NCPOR Polar Research Outreach Portal
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              India&apos;s polar research,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                open to the world
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/80 mb-10 max-w-2xl leading-relaxed">
              Explore verified, evidence-backed research from India&apos;s Antarctic and Arctic expeditions.
              Built for scientists, educators, and content creators who want to share real polar science with the public.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/research" className="btn-primary text-base px-8 py-4">
                Explore Research
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/creators"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-cyan-400/50 text-cyan-100 font-semibold hover:bg-cyan-400/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-blue-900 text-base"
              >
                For Creators
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== ARCHIVE STATS ===== */}
      <section className="py-16 sm:py-20" aria-labelledby="stats-heading">
        <div className="container-wide">
          <h2 id="stats-heading" className="sr-only">Archive Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="card p-6 sm:p-8 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPEDITION TIMELINE ===== */}
      <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="timeline-heading">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 id="timeline-heading" className="section-title">Expedition Timeline</h2>
            <p className="section-subtitle">Decades of Indian polar expeditions at a glance</p>
          </div>

          {timeline.length === 0 ? (
            <EmptyState
              icon="🧭"
              title="No expeditions yet"
              description="Expedition data will appear here once research papers are added to the archive."
            />
          ) : (
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex items-start gap-6 min-w-max">
                {timeline.map((expedition, i) => {
                  const years = Object.keys(expedition.years).sort();
                  const totalPapers = Object.values(expedition.years).reduce((sum, n) => sum + n, 0);
                  return (
                    <Link
                      key={expedition.name}
                      href={`/expeditions/${encodeURIComponent(expedition.name)}`}
                      className="group flex flex-col items-center relative"
                    >
                      {/* Connector line */}
                      {i < timeline.length - 1 && (
                        <div className="absolute top-8 left-1/2 w-full h-0.5 bg-blue-200" aria-hidden="true" />
                      )}

                      {/* Node */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-blue-300 group-hover:border-blue-500 group-hover:shadow-lg transition-all flex items-center justify-center mb-3">
                        <span className="text-xl">🚢</span>
                      </div>

                      {/* Label */}
                      <div className="text-center max-w-[140px]">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {expedition.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {years.length === 1 ? years[0] : `${years[0]}–${years[years.length - 1]}`}
                        </p>
                        <p className="text-xs text-blue-600 font-medium mt-1">
                          {totalPapers} {totalPapers === 1 ? 'paper' : 'papers'}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== FEATURED RESEARCH ===== */}
      <section className="py-16 sm:py-20" aria-labelledby="featured-heading">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 id="featured-heading" className="section-title">Featured Research</h2>
              <p className="section-subtitle mb-0">Highlighted papers from India&apos;s polar expeditions</p>
            </div>
            <Link href="/research" className="hidden sm:inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View all
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {featured.length === 0 ? (
            <EmptyState
              icon="⭐"
              title="No featured papers yet"
              description="Highlighted research papers will appear here. Browse all research to explore the archive."
              actionHref="/research"
              actionLabel="Browse Research"
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== EXPLORE BY SCIENCE ===== */}
      <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="categories-heading">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="section-title">Explore by Science</h2>
            <p className="section-subtitle">Browse research across 10 scientific disciplines</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((category) => {
              const colors = getCategoryColor(category);
              const icon = CATEGORY_ICONS[category] || '📋';
              const count = countMap[category] || 0;

              return (
                <Link
                  key={category}
                  href={`/research?category=${encodeURIComponent(category)}`}
                  className={`card p-5 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform ${colors.bg} ${colors.border}`}
                >
                  <span className="text-3xl mb-3" role="img" aria-hidden="true">
                    {icon}
                  </span>
                  <h3 className={`text-sm font-semibold ${colors.text} mb-1 leading-snug`}>
                    {category}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {count} {count === 1 ? 'paper' : 'papers'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== OUTREACH FLOW VISUAL ===== */}
      <section className="py-16 sm:py-20" aria-labelledby="outreach-heading">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 id="outreach-heading" className="section-title">From Lab to Public</h2>
            <p className="section-subtitle">
              How verified polar research becomes accessible content for everyone
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-0">
            {outreachSteps.map((step, i) => {
              const inner = (
                <div
                  className={`flex flex-col items-center text-center max-w-[180px] ${
                    step.href ? 'group' : ''
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-3 ${
                      step.href
                        ? 'bg-blue-100 ring-2 ring-blue-300 group-hover:ring-blue-500 transition-all'
                        : 'bg-gray-100'
                    }`}
                  >
                    {step.emoji}
                  </div>
                  <h3
                    className={`text-sm font-bold mb-1 ${
                      step.href ? 'text-blue-700 group-hover:text-blue-800' : 'text-gray-900'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              );

              return (
                <div key={step.title} className="flex flex-col lg:flex-row items-center">
                  {step.href ? (
                    <Link href={step.href}>{inner}</Link>
                  ) : (
                    inner
                  )}

                  {/* Arrow between steps */}
                  {i < outreachSteps.length - 1 && (
                    <div className="flex items-center justify-center py-2 lg:py-0 lg:px-4" aria-hidden="true">
                      {/* Vertical arrow on mobile */}
                      <svg
                        className="w-6 h-6 text-blue-300 lg:hidden"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      {/* Horizontal arrow on desktop */}
                      <svg
                        className="w-8 h-8 text-blue-300 hidden lg:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-900 to-cyan-800 text-center">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to explore?
          </h2>
          <p className="text-lg text-blue-100/80 max-w-xl mx-auto mb-8">
            Search through India&apos;s polar research archive or learn how creators can help bring this science to the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/research" className="btn-primary text-base px-8 py-4">
              Browse the Archive
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors text-base">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
