import Link from 'next/link';
import { getVerifiedPapers } from '@/lib/data';
import PaperCard from '@/components/PaperCard';
import { CATEGORIES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'For Creators & Educators',
  description: 'Transform verified Indian polar research into public outreach content, videos, stories, and educational materials.',
};

export default async function CreatorsPage() {
  const latestPapers = await getVerifiedPapers(6);
  const hasVerified = latestPapers.some((p) => p.pipeline?.reviewed);

  return (
    <div className="bg-gray-50/50 min-h-screen py-10">
      <div className="container-wide space-y-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="badge bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs px-3 py-1 font-semibold uppercase tracking-wider mb-4 inline-block">
              Outreach &amp; Public Science Dissemination
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Polar Research Outreach Kit for Creators
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Bridge the gap between peer-reviewed Antarctic and Arctic science and the public. 
              Polaris translates technical research papers into structured building blocks — key facts, verified evidence excerpts, story angles, and citations.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/research" className="btn-primary bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3">
                Explore Research Papers →
              </Link>
              <Link href="/about#pipeline" className="btn-ghost text-white hover:bg-white/10 px-6 py-3 border border-white/20">
                How Verification Works
              </Link>
            </div>
          </div>

          {/* Ice / Aurora Glow background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* 4-Step Flow Explanation */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-gray-900">How the Outreach Kit Works</h2>
            <p className="text-sm text-gray-500 mt-2">
              Polaris delivers reliable building blocks. You bring your unique voice, storytelling style, and audience connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Discover Research</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Browse by discipline (Glaciology, Biology, Oceanography) or by Indian Antarctic expeditions.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-600 mt-4 block">10 Categories Available →</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Select Verified Paper</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Choose a paper with confirmed evidence citations and plain-language summaries.
                </p>
              </div>
              <span className="text-xs font-semibold text-purple-600 mt-4 block">Full Evidence Traceability →</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Open 10-Part Kit</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Access 10 structured sections: Simple Explanation, Key Facts, Numbers, Story Angles, Evidence, and Citations.
                </p>
              </div>
              <span className="text-xs font-semibold text-teal-600 mt-4 block">Instant Outreach Kit →</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
                  4
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Create Public Content</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Produce videos, podcasts, infographics, social threads, or school lessons grounded in authentic scientific records.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 mt-4 block">No Misinformation →</span>
            </div>
          </div>

          <div className="mt-8 bg-blue-50/70 rounded-xl p-4 border border-blue-100 text-center text-xs text-blue-900">
            <strong>Important Creator Principle:</strong> The Outreach Kit provides factual building blocks from peer-reviewed NCPOR records. It does not auto-post or auto-generate artificial social posts; creators retain full creative editorial autonomy.
          </div>
        </section>

        {/* Topic Discovery */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">1. Research Discovery: Choose a Topic</h2>
              <p className="text-sm text-gray-500">Pick a scientific topic to find relevant research papers with Outreach Kits.</p>
            </div>
            <Link href="/research" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              All Research →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/research?category=${encodeURIComponent(cat)}`}
                className="card p-3 text-center hover:border-blue-400 transition-colors"
              >
                <span className="text-xs font-semibold text-gray-800 line-clamp-1">{cat}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Available Papers for Outreach */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">2. Select a Paper for Your Outreach Kit</h2>
              <p className="text-sm text-gray-500">
                {hasVerified
                  ? 'Showing verified research papers ready for public dissemination.'
                  : 'Showing latest ingested research records. Each has an Outreach Kit available.'}
              </p>
            </div>
          </div>

          {latestPapers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
              No papers found in database. Run the extraction pipeline to populate records.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPapers.map((paper) => (
                <div key={paper.id} className="relative group flex flex-col">
                  <PaperCard paper={paper} />
                  <div className="mt-2">
                    <Link
                      href={`/creators/kit/${paper.id}`}
                      className="w-full btn-secondary text-xs py-2 bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 flex items-center justify-center gap-1.5 font-semibold"
                    >
                      <span>📦</span> Open Outreach Kit for this Paper
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
