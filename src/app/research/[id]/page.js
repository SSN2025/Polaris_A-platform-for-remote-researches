import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPaperById, getRelatedPapers } from '@/lib/data';
import { getCategoryColor } from '@/lib/constants';
import ConfidenceBar from '@/components/ConfidenceBar';
import PaperCard from '@/components/PaperCard';
import ExplainToggle from './ExplainToggle';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const paper = await getPaperById(id);
  if (!paper) {
    return { title: 'Paper Not Found' };
  }
  return {
    title: paper.title,
    description: paper.content?.summary || paper.title,
  };
}

export default async function PaperDetailPage({ params }) {
  const { id } = await params;
  const paper = await getPaperById(id);

  if (!paper) {
    notFound();
  }

  const relatedPapers = await getRelatedPapers(paper, 3);
  const colors = getCategoryColor(paper.category);

  // Extract nested properties safely
  const bibliographic = paper.bibliographic || {};
  const authors = bibliographic.authors || [];
  const content = paper.content || {};
  const taxonomy = paper.taxonomy || {};
  const tags = taxonomy.tags || [];
  const keywords = content.keywords || [];
  const researchSites = content.research_sites || [];
  const evidenceList = paper.evidence || [];
  const pipeline = paper.pipeline || {};
  const confidence = pipeline.confidence || {};

  // Category evidence
  const categoryEvidence = evidenceList.find((e) => e.field === 'category');

  return (
    <div className="bg-gray-50/50 min-h-screen py-10">
      <div className="container-wide">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/research" className="hover:text-blue-600">Research</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{paper.title}</span>
        </div>

        {/* Paper Main Header Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`badge ${colors.badge} ${colors.text} text-sm px-3 py-1 font-semibold`}>
                {paper.category}
              </span>
              {paper.subcategory && (
                <span className="badge bg-gray-100 text-gray-700 text-sm px-3 py-1">
                  {paper.subcategory}
                </span>
              )}
              {paper.expedition && (
                <Link
                  href={`/expeditions/${encodeURIComponent(paper.expedition)}`}
                  className="badge bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm px-3 py-1 inline-flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                  {paper.expedition}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span>{paper.document_id}</span>
              {paper.year && <span>• {paper.year}</span>}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            {paper.title}
          </h1>

          {/* Authors with Affiliations */}
          {authors.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Authors &amp; Affiliations</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {authors.map((author, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-semibold text-gray-800">{author.name}</span>
                    {author.affiliation && (
                      <span className="text-gray-500 block text-xs">{author.affiliation}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research Sites Clickable Chips */}
          {researchSites.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Research Sites</h2>
              <div className="flex flex-wrap gap-2">
                {researchSites.map((site) => (
                  <div key={site} className="inline-flex rounded-lg border border-cyan-200 overflow-hidden text-xs">
                    <Link
                      href={`/research?researchSite=${encodeURIComponent(site)}`}
                      className="bg-cyan-50 text-cyan-800 px-3 py-1.5 hover:bg-cyan-100 font-medium inline-flex items-center gap-1"
                    >
                      <span>📍</span> {site}
                    </Link>
                    <Link
                      href={`/discover?site=${encodeURIComponent(site)}`}
                      className="bg-cyan-100 text-cyan-900 px-2 py-1.5 hover:bg-cyan-200 font-medium"
                      title="View on Polar Map"
                    >
                      Map View →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords & Tags */}
          {(tags.length > 0 || keywords.length > 0) && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Keywords &amp; Taxonomy Tags</h2>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Link
                    key={`tag-${t}`}
                    href={`/research?category=${encodeURIComponent(paper.category)}`}
                    className="chip bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs"
                  >
                    #{t}
                  </Link>
                ))}
                {keywords.map((k) => (
                  <Link
                    key={`kw-${k}`}
                    href={`/research?keyword=${encodeURIComponent(k)}`}
                    className="chip text-xs"
                  >
                    {k}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
            {paper.pdf_url && (
              <a
                href={paper.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Original PDF
              </a>
            )}

            <Link
              href={`/creators/kit/${paper.id}`}
              className="btn-secondary text-sm inline-flex items-center gap-2 bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Open Outreach Kit
            </Link>
          </div>
        </div>

        {/* Explain It Simply / Abstract Toggle Section */}
        <div className="mb-8">
          <ExplainToggle
            summary={content.summary}
            abstract={content.abstract}
          />
        </div>

        {/* Two-Column Grid: AI Classification & Provenance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Classification Block */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <span className="text-xl">🤖</span> AI Classification &amp; Confidence
              </h2>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                Strict Schema
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">Assigned Category</span>
                  <span className="font-semibold text-gray-900">{paper.category}</span>
                </div>
                <ConfidenceBar
                  value={confidence.category ?? 0.9}
                  label="Category Score"
                />
              </div>

              {categoryEvidence && (
                <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100 text-sm">
                  <div className="flex items-center justify-between text-xs text-blue-800 font-semibold mb-1">
                    <span>Supporting Evidence Excerpt</span>
                    <span>
                      p. {categoryEvidence.page_number || 'N/A'} • {categoryEvidence.section || 'General'}
                    </span>
                  </div>
                  <blockquote className="italic text-gray-700 text-xs leading-relaxed border-l-2 border-blue-400 pl-3">
                    &ldquo;{categoryEvidence.source_text}&rdquo;
                  </blockquote>
                  {paper.pdf_url && (
                    <div className="mt-2 text-right">
                      <a
                        href={paper.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        [View source in PDF]
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Per-field Confidence Breakdown */}
              <div className="border-t border-gray-100 pt-3">
                <h3 className="text-xs font-bold uppercase text-gray-400 mb-2">Per-Field Confidence</h3>
                <div className="space-y-2">
                  {Object.entries(confidence).map(([field, score]) => (
                    <div key={field} className="text-xs">
                      <ConfidenceBar
                        value={typeof score === 'number' ? score : 0.85}
                        label={field.replace('_', ' ')}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Provenance Block */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <span className="text-xl">📜</span> Record Provenance
              </h2>
              <div>
                {pipeline.reviewed ? (
                  <span className="badge bg-green-100 text-green-800 font-semibold text-xs px-2.5 py-1 inline-flex items-center gap-1">
                    ✓ Verified by human reviewer
                  </span>
                ) : (
                  <span className="badge bg-amber-100 text-amber-800 font-semibold text-xs px-2.5 py-1 inline-flex items-center gap-1">
                    ⏳ Human review pending
                  </span>
                )}
              </div>
            </div>

            <dl className="divide-y divide-gray-100 text-sm">
              <div className="py-2.5 flex justify-between">
                <dt className="text-gray-500">Document ID</dt>
                <dd className="font-mono text-gray-900">{paper.document_id}</dd>
              </div>
              <div className="py-2.5 flex justify-between">
                <dt className="text-gray-500">Source PDF</dt>
                <dd className="font-mono text-gray-900 text-xs truncate max-w-xs">{paper.source_file}</dd>
              </div>
              <div className="py-2.5 flex justify-between">
                <dt className="text-gray-500">Publication Series</dt>
                <dd className="text-gray-900 font-medium">{bibliographic.publication_series || 'NCPOR Scientific Report'}</dd>
              </div>
              <div className="py-2.5 flex justify-between">
                <dt className="text-gray-500">Page Range</dt>
                <dd className="text-gray-900">{bibliographic.page_range || `1-${content.num_pages || 'N/A'}`}</dd>
              </div>
              <div className="py-2.5 flex justify-between">
                <dt className="text-gray-500">Pipeline Status</dt>
                <dd className="capitalize font-semibold text-gray-900">{pipeline.status || 'extracted'}</dd>
              </div>
              <div className="py-2.5 flex justify-between">
                <dt className="text-gray-500">Methods Used</dt>
                <dd className="text-gray-900 text-xs">
                  {(pipeline.methods_used || ['PDF Text', 'LLM Parsing', 'Confidence Heuristics']).join(', ')}
                </dd>
              </div>
              {pipeline.extracted_at && (
                <div className="py-2.5 flex justify-between">
                  <dt className="text-gray-500">Extracted At</dt>
                  <dd className="text-gray-700 text-xs">{new Date(pipeline.extracted_at).toLocaleString()}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Evidence Section */}
        {evidenceList.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>🔍</span> Inferred Field Evidence
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Exact source sentences, page numbers, and sections extracted from the original PDF to substantiate inferred metadata.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidenceList.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge bg-blue-100 text-blue-800 font-semibold text-xs uppercase tracking-wide">
                      {item.field}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      Page {item.page_number || 'N/A'} • Section: {item.section || 'General'}
                    </span>
                  </div>
                  <blockquote className="text-xs text-gray-700 leading-relaxed italic border-l-2 border-blue-500 pl-3 py-1">
                    &ldquo;{item.source_text}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Content Engine */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Related Research</h2>
              <p className="text-sm text-gray-500">
                Scored by shared expedition, category, research sites, tags, and keywords.
              </p>
            </div>
            {paper.expedition && (
              <Link
                href={`/expeditions/${encodeURIComponent(paper.expedition)}`}
                className="btn-ghost text-sm text-blue-600 font-medium"
              >
                All from {paper.expedition} →
              </Link>
            )}
          </div>

          {relatedPapers.length === 0 ? (
            <p className="text-sm text-gray-500 italic py-4">No other related research papers found in the archive yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {relatedPapers.map((relPaper) => (
                <PaperCard key={relPaper.id} paper={relPaper} />
              ))}
            </div>
          )}

          {/* Related Media / Reports / Datasets - "Data not available yet" */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Associated Digital Media &amp; Datasets
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center bg-gray-50/50">
                <span className="text-2xl block mb-1">📸</span>
                <span className="text-xs font-semibold text-gray-700 block">Field Photos</span>
                <span className="text-[10px] text-gray-400 block mt-1">Data not available yet</span>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center bg-gray-50/50">
                <span className="text-2xl block mb-1">🎥</span>
                <span className="text-xs font-semibold text-gray-700 block">Expedition Video</span>
                <span className="text-[10px] text-gray-400 block mt-1">Data not available yet</span>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center bg-gray-50/50">
                <span className="text-2xl block mb-1">📊</span>
                <span className="text-xs font-semibold text-gray-700 block">Raw Datasets</span>
                <span className="text-[10px] text-gray-400 block mt-1">Data not available yet</span>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-gray-200 text-center bg-gray-50/50">
                <span className="text-2xl block mb-1">📑</span>
                <span className="text-xs font-semibold text-gray-700 block">Logistics Reports</span>
                <span className="text-[10px] text-gray-400 block mt-1">Data not available yet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
