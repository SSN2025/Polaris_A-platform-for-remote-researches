import { Suspense } from 'react';
import Link from 'next/link';
import { searchPapers, getFilterOptions } from '@/lib/data';
import PaperCard from '@/components/PaperCard';
import EmptyState from '@/components/EmptyState';
import SearchFilters from './SearchFilters';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Research Explorer',
  description: 'Search and filter Indian Antarctic and Arctic research papers by expedition, category, year, site, and keywords.',
};

export default async function ResearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || '';
  const expedition = params?.expedition || '';
  const category = params?.category || '';
  const subcategory = params?.subcategory || '';
  const year = params?.year || '';
  const researchSite = params?.researchSite || '';
  const keyword = params?.keyword || '';
  const page = parseInt(params?.page || '1', 10);

  const [filterOptions, searchResult] = await Promise.all([
    getFilterOptions(),
    searchPapers({
      query,
      expedition,
      category,
      subcategory,
      year,
      researchSite,
      keyword,
      page,
      pageSize: 12,
    }),
  ]);

  const { papers, total, totalPages } = searchResult;

  const hasActiveFilters = Boolean(
    query || expedition || category || subcategory || year || researchSite || keyword
  );

  return (
    <div className="bg-gray-50/50 min-h-screen py-8">
      <div className="container-wide">
        {/* Breadcrumb / Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Research</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Research Explorer</h1>
          <p className="text-gray-600 mt-1">
            Search and filter verified records from India&apos;s polar expeditions.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <Suspense fallback={<div className="h-24 bg-white rounded-xl shadow-sm animate-pulse mb-8" />}>
          <SearchFilters filterOptions={filterOptions} />
        </Suspense>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-gray-600">
            {total === 0 ? 'No papers found' : `Showing ${papers.length} of ${total} paper${total === 1 ? '' : 's'}`}
          </p>
          {totalPages > 1 && (
            <p className="text-xs text-gray-500">
              Page {page} of {totalPages}
            </p>
          )}
        </div>

        {/* Results Grid / Empty State */}
        {papers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12">
            <EmptyState
              icon="🔍"
              title={hasActiveFilters ? "No matching research records" : "No research papers yet"}
              description={
                hasActiveFilters
                  ? "Try clearing some filters or searching with different keywords."
                  : "PDFs placed in public/pdfs/ will appear here once processed by the extraction pipeline."
              }
              actionHref={hasActiveFilters ? "/research" : undefined}
              actionLabel={hasActiveFilters ? "Clear All Filters" : undefined}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            {page > 1 && (
              <Link
                href={`/research?${new URLSearchParams({
                  ...(query && { q: query }),
                  ...(expedition && { expedition }),
                  ...(category && { category }),
                  ...(subcategory && { subcategory }),
                  ...(year && { year }),
                  ...(researchSite && { researchSite }),
                  ...(keyword && { keyword }),
                  page: String(page - 1),
                }).toString()}`}
                className="btn-secondary text-sm px-4 py-2"
              >
                Previous
              </Link>
            )}

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                if (
                  p === 1 ||
                  p === totalPages ||
                  (p >= page - 2 && p <= page + 2)
                ) {
                  return (
                    <Link
                      key={p}
                      href={`/research?${new URLSearchParams({
                        ...(query && { q: query }),
                        ...(expedition && { expedition }),
                        ...(category && { category }),
                        ...(subcategory && { subcategory }),
                        ...(year && { year }),
                        ...(researchSite && { researchSite }),
                        ...(keyword && { keyword }),
                        page: String(p),
                      }).toString()}`}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                        p === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                }
                if (p === page - 3 || p === page + 3) {
                  return <span key={p} className="text-gray-400 px-1">...</span>;
                }
                return null;
              })}
            </div>

            {page < totalPages && (
              <Link
                href={`/research?${new URLSearchParams({
                  ...(query && { q: query }),
                  ...(expedition && { expedition }),
                  ...(category && { category }),
                  ...(subcategory && { subcategory }),
                  ...(year && { year }),
                  ...(researchSite && { researchSite }),
                  ...(keyword && { keyword }),
                  page: String(page + 1),
                }).toString()}`}
                className="btn-secondary text-sm px-4 py-2"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
