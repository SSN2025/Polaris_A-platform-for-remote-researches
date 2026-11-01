import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getVerificationQueue } from '@/lib/data';
import ConfidenceBar from '@/components/ConfidenceBar';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Verification Queue | Admin',
};

export default async function VerificationQueuePage({ searchParams }) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const params = await searchParams;
  const page = parseInt(params?.page || '1', 10);
  const { papers, total, totalPages } = await getVerificationQueue(page, 15);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link href="/admin" className="hover:text-cyan-400">Dashboard</Link>
            <span>/</span>
            <span className="text-white">Verification Queue</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Human Verification Queue</h1>
          <p className="text-xs text-slate-400 mt-1">
            Prioritized by lowest overall confidence first. Review extracted metadata and approve or edit fields.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <span className="text-slate-400">Awaiting Verification:</span>
          <span className="font-bold text-cyan-400 font-mono">{total}</span>
        </div>
      </div>

      {/* Queue Table */}
      {papers.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <span className="text-4xl block mb-3">🎉</span>
          <h3 className="text-lg font-bold text-white mb-1">Verification Queue is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            All ingested records have been verified by human reviewers. When new papers are added and extracted, they will queue here.
          </p>
          <Link
            href="/admin"
            className="mt-6 inline-block btn-secondary text-xs bg-slate-800 text-white border-slate-700 px-4 py-2"
          >
            ← Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Document ID</th>
                  <th className="py-3.5 px-4">Paper Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Min. Confidence</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {papers.map((paper) => {
                  const conf = paper.pipeline?.confidence || {};
                  const minConf = paper._minConfidence ?? 0.8;
                  const isLow = minConf < 0.7;

                  return (
                    <tr key={paper.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-cyan-400 whitespace-nowrap">
                        {paper.document_id}
                      </td>
                      <td className="py-3.5 px-4 max-w-md">
                        <span className="font-semibold text-white line-clamp-1">{paper.title}</span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {paper.year || 'Year N/A'} • {paper.expedition || 'Expedition N/A'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">
                          {paper.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap w-44">
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <ConfidenceBar value={minConf} size="sm" />
                          </div>
                          {isLow && (
                            <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.2 rounded">
                              Low
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="bg-amber-950/70 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded text-[11px] font-medium">
                          {paper.pipeline?.status || 'extracted'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <Link
                          href={`/admin/verification/${paper.id}`}
                          className="btn-primary text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold px-3 py-1.5 rounded-lg transition-colors inline-block"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Page {page} of {totalPages}</span>
              <div className="flex items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/admin/verification?page=${page - 1}`}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200"
                  >
                    Previous
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/admin/verification?page=${page + 1}`}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
