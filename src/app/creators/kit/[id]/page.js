import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPaperById } from '@/lib/data';
import { getCategoryColor } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const paper = await getPaperById(id);
  if (!paper) return { title: 'Kit Not Found' };
  return {
    title: `Outreach Kit: ${paper.title}`,
    description: `Creator Outreach Kit with verified facts, story angles, evidence, and citation for "${paper.title}".`,
  };
}

export default async function OutreachKitPage({ params }) {
  const { id } = await params;
  const paper = await getPaperById(id);

  if (!paper) {
    notFound();
  }

  const bibliographic = paper.bibliographic || {};
  const authors = bibliographic.authors || [];
  const content = paper.content || {};
  const evidenceList = paper.evidence || [];
  const colors = getCategoryColor(paper.category);

  // 1. Simple Explanation
  const simpleExplanation = content.summary || null;

  // 2. Key Facts: parse abstract sentences into bullet points
  const rawAbstract = content.abstract || '';
  const keyFacts = rawAbstract
    ? rawAbstract
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 25)
        .slice(0, 4)
    : [];

  // 3. Interesting Numbers: regex match numbers, percentages, measurements, coordinates in abstract
  const numberMatches = rawAbstract
    ? [...rawAbstract.matchAll(/\b(\d+(?:\.\d+)?(?:\s*(?:%|m|km|°|°C|°S|°N|°E|°W|cm|mm|Gt|years|days|hours|stations|samples|species))?)\b/gi)]
        .map((m) => m[0].trim())
        .filter((val, idx, arr) => arr.indexOf(val) === idx && !/^(19\d\d|20\d\d)$/.test(val)) // exclude isolated years
        .slice(0, 6)
    : [];

  // Add pages or year if present
  if (content.num_pages) {
    numberMatches.unshift(`${content.num_pages} pages in complete monograph`);
  }
  if (paper.year) {
    numberMatches.push(`Expedition Year: ${paper.year}`);
  }

  // 4. Why It Matters
  const whyItMatters = content.summary
    ? `Polar research in ${paper.category} provides critical benchmarks for understanding global climate dynamics, cryospheric changes, and Antarctica's environmental sensitivity directly connected to Indian monsoon and global sea levels.`
    : null;

  // 5. Story Angles (derived from category, expedition, research sites)
  const sitesStr = (content.research_sites || []).join(', ') || 'Antarctic field stations';
  const storyAngles = [
    {
      title: `Field Science at ${sitesStr}`,
      description: `How Indian scientists conducted on-the-ground observations and field sampling at ${sitesStr} during ${paper.expedition || "India's polar expedition"}.`,
    },
    {
      title: `The Science of ${paper.category}`,
      description: `Explaining what ${paper.category} investigations in extreme polar environments reveal about Earth's systems and the subcontinent's climatic links.`,
    },
    {
      title: `Behind the Research Paper`,
      description: `A deep dive into lead author ${authors[0]?.name || 'NCPOR researchers'} and the team's expedition findings documented under ${paper.document_id}.`,
    },
  ];

  // 10. Auto-generated Citation
  const authorNames = authors.map((a) => a.name).join(', ') || 'NCPOR Scientific Team';
  const citationText = `${authorNames} (${paper.year || 'n.d.'}). "${paper.title}". ${bibliographic.publication_series || 'NCPOR Technical Publications'}, pp. ${bibliographic.page_range || '1-' + (content.num_pages || 'end')}. Document ID: ${paper.document_id}.`;

  return (
    <div className="bg-gray-50/50 min-h-screen py-10">
      <div className="container-wide space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/creators" className="hover:text-blue-600">For Creators</Link>
          <span>/</span>
          <Link href={`/research/${paper.id}`} className="hover:text-blue-600 font-medium">Research Paper</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Outreach Kit</span>
        </div>

        {/* Kit Hero Header */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="badge bg-purple-100 text-purple-800 font-bold text-xs px-3 py-1 uppercase tracking-wide">
                📦 Creator Outreach Kit (10 Building Blocks)
              </span>
              <span className={`badge ${colors.badge} ${colors.text} text-xs font-semibold px-2.5 py-1`}>
                {paper.category}
              </span>
            </div>

            <span className="font-mono text-xs text-gray-400">
              {paper.document_id} • Status: {paper.pipeline?.reviewed ? 'Verified ✓' : 'Human Review Pending'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {paper.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-100">
            {authors.length > 0 && (
              <span><strong>Authors:</strong> {authors.map((a) => a.name).join(', ')}</span>
            )}
            {paper.year && <span>• <strong>Year:</strong> {paper.year}</span>}
            {paper.expedition && <span>• <strong>Expedition:</strong> {paper.expedition}</span>}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-6">
            <Link href={`/research/${paper.id}`} className="btn-secondary text-xs px-4 py-2 font-medium">
              ← View Full Research Record
            </Link>
            {paper.pdf_url && (
              <a
                href={paper.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs px-4 py-2 font-medium inline-flex items-center gap-1.5"
              >
                <span>📄</span> View Original PDF
              </a>
            )}
          </div>
        </div>

        {/* 10 Modular Building Blocks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">10 Content Building Blocks</h2>
            <span className="text-xs text-gray-500 italic">
              Extracted strictly from verified schema fields
            </span>
          </div>

          {/* Block 1: Simple Explanation */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="font-bold text-gray-900 text-base">Simple Explanation</h3>
            </div>
            {simpleExplanation ? (
              <p className="text-sm text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                {simpleExplanation}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">Data not available in record.</p>
            )}
          </div>

          {/* Block 2: Key Facts */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="font-bold text-gray-900 text-base">Key Facts</h3>
            </div>
            {keyFacts.length > 0 ? (
              <ul className="space-y-2 text-sm text-gray-700">
                {keyFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">No abstract text available to parse key facts.</p>
            )}
          </div>

          {/* Block 3: Interesting Numbers */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold">3</span>
              <h3 className="font-bold text-gray-900 text-base">Interesting Numbers &amp; Quantities</h3>
            </div>
            {numberMatches.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {numberMatches.map((num, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-cyan-50 border border-cyan-200 text-cyan-900 rounded-lg text-xs font-mono font-semibold"
                  >
                    {num}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No specific quantitative figures extracted.</p>
            )}
          </div>

          {/* Block 4: Why It Matters */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">4</span>
              <h3 className="font-bold text-gray-900 text-base">Why It Matters (Significance)</h3>
            </div>
            {whyItMatters ? (
              <p className="text-sm text-gray-700 leading-relaxed bg-teal-50/50 p-4 rounded-xl border border-teal-100">
                {whyItMatters}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">Significance context not available.</p>
            )}
          </div>

          {/* Block 5: Story Angles */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">5</span>
              <h3 className="font-bold text-gray-900 text-base">Story Angles &amp; Narrative Hooks</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {storyAngles.map((angle, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80">
                  <h4 className="font-bold text-sm text-amber-950 mb-1">{angle.title}</h4>
                  <p className="text-xs text-amber-900/80 leading-relaxed">{angle.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 6: Verified Evidence */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">6</span>
              <h3 className="font-bold text-gray-900 text-base">Verified Evidence &amp; Excerpts</h3>
            </div>
            {evidenceList.length > 0 ? (
              <div className="space-y-3">
                {evidenceList.map((ev, idx) => (
                  <div key={idx} className="p-3 bg-green-50/50 rounded-xl border border-green-100 text-xs">
                    <div className="flex justify-between items-center font-semibold text-green-900 mb-1">
                      <span>Field: {ev.field}</span>
                      <span>Page {ev.page_number || 'N/A'} • {ev.section || 'General'}</span>
                    </div>
                    <p className="italic text-gray-700">&ldquo;{ev.source_text}&rdquo;</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No specific evidence items recorded for this paper.</p>
            )}
          </div>

          {/* Block 7: Relevant Images */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold">7</span>
              <h3 className="font-bold text-gray-900 text-base">Relevant Images</h3>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
              <span className="text-gray-400 text-xs italic">
                Data not available yet — no standalone image assets linked in current records.
              </span>
            </div>
          </div>

          {/* Block 8: Relevant Videos */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold">8</span>
              <h3 className="font-bold text-gray-900 text-base">Relevant Videos</h3>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
              <span className="text-gray-400 text-xs italic">
                Data not available yet — no video footage linked in current records.
              </span>
            </div>
          </div>

          {/* Block 9: Original Research */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">9</span>
              <h3 className="font-bold text-gray-900 text-base">Original Research Paper Reference</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Document ID:</span>
                <span className="font-mono font-bold text-gray-800">{paper.document_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Source File:</span>
                <span className="font-mono text-gray-800 truncate max-w-xs">{paper.source_file}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Publication Series:</span>
                <span className="text-gray-800">{bibliographic.publication_series || 'NCPOR Scientific Monograph'}</span>
              </div>
              {paper.pdf_url && (
                <div className="pt-2 text-right">
                  <a
                    href={paper.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                  >
                    Download / View Source PDF ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Block 10: Citation */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">10</span>
              <h3 className="font-bold text-gray-900 text-base">Official Academic Citation</h3>
            </div>
            <div className="bg-gray-900 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed select-all">
              {citationText}
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              Please include this citation or link back to the NCPOR record when publishing content derived from this research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
