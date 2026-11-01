import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getAdminStats, getRecentAdminPapers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [stats, recentPapers] = await Promise.all([
    getAdminStats(),
    getRecentAdminPapers(5),
  ]);

  const statCards = [
    {
      label: 'Total Documents',
      value: stats.total,
      color: 'from-blue-600 to-blue-800',
      icon: '📄',
      desc: 'Ingested polar monographs',
    },
    {
      label: 'Extracted (Pending)',
      value: stats.extracted,
      color: 'from-amber-600 to-amber-800',
      icon: '⏳',
      desc: 'Awaiting human sign-off',
    },
    {
      label: 'Verified Records',
      value: stats.reviewed,
      color: 'from-green-600 to-green-800',
      icon: '✅',
      desc: 'Confirmed by human reviewer',
    },
    {
      label: 'Low Confidence (<70%)',
      value: stats.lowConfidence,
      color: 'from-red-600 to-red-800',
      icon: '⚠️',
      desc: 'Prioritized in review queue',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white">NCPOR Extraction &amp; Verification Hub</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review AI extractions, verify citations and evidence, and manage the polar research knowledge repository.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/verification"
            className="btn-primary text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold px-4 py-2.5 rounded-lg"
          >
            Open Verification Queue ({stats.extracted}) →
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{card.icon}</span>
              <span className="text-3xl font-extrabold text-white font-mono">{card.value}</span>
            </div>
            <div className="text-sm font-semibold text-slate-200">{card.label}</div>
            <div className="text-xs text-slate-500 mt-1">{card.desc}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Status & Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>📋</span> Recently Ingested Papers
            </h2>
            <Link
              href="/admin/verification"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              View All in Queue →
            </Link>
          </div>

          {recentPapers.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No papers in database yet. Run the extraction pipeline to process PDFs.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {recentPapers.map((paper) => {
                const isReviewed = paper.pipeline?.reviewed;
                return (
                  <div key={paper.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400">{paper.document_id}</span>
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {paper.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-slate-200 truncate mt-1">
                        {paper.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {isReviewed ? (
                        <span className="text-xs text-green-400 font-medium">✓ Reviewed</span>
                      ) : (
                        <span className="text-xs text-amber-400 font-medium">⏳ Pending</span>
                      )}
                      <Link
                        href={`/admin/verification/${paper.id}`}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Extraction Pipeline Runner Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <span>⚙️</span> Ingestion Pipeline
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Place research paper PDFs into <code>public/pdfs/</code>. Run the extraction pipeline using the terminal command:
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 select-all mb-4">
              npm run extract
            </div>

            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
              <li>Auto-detects unprocessed PDFs in <code>public/pdfs/</code></li>
              <li>Extracts text and routes scanned pages to OCR</li>
              <li>Performs schema extraction &amp; evidence quotation</li>
              <li>Calculates per-field confidence scores</li>
              <li>Saves JSON to <code>data/generated/</code> and database</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6">
            <span className="text-[11px] text-slate-500 block">
              Configured Database: PostgreSQL via Prisma
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
