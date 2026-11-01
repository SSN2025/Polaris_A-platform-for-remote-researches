'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import ConfidenceBar from '@/components/ConfidenceBar';

export default function ReviewForm({ initialPaper }) {
  const router = useRouter();
  const [paper, setPaper] = useState(initialPaper);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Editable form fields
  const [title, setTitle] = useState(paper.title || '');
  const [category, setCategory] = useState(paper.category || 'Other');
  const [subcategory, setSubcategory] = useState(paper.subcategory || '');
  const [year, setYear] = useState(paper.year ? String(paper.year) : '');
  const [expedition, setExpedition] = useState(paper.expedition || '');
  const [summary, setSummary] = useState(paper.content?.summary || '');
  const [sites, setSites] = useState((paper.content?.research_sites || []).join(', '));
  const [highlight, setHighlight] = useState(paper.outreach?.highlight || false);

  const evidenceList = paper.evidence || [];
  const pipeline = paper.pipeline || {};
  const confidence = pipeline.confidence || {};

  // Find evidence for a specific field
  const getEvidence = (fieldName) => {
    return evidenceList.find((e) => e.field?.toLowerCase() === fieldName.toLowerCase());
  };

  const handleSave = async (approved = false) => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const parsedSites = sites.split(',').map((s) => s.trim()).filter(Boolean);
      const updatedData = {
        title,
        category,
        subcategory: subcategory || null,
        year: year ? parseInt(year, 10) : null,
        expedition: expedition || null,
        content: {
          ...(paper.content || {}),
          summary,
          research_sites: parsedSites,
        },
        taxonomy: {
          ...(paper.taxonomy || {}),
          category,
          subcategory: subcategory || null,
        },
        outreach: {
          ...(paper.outreach || {}),
          highlight,
        },
        pipeline: {
          ...pipeline,
          status: approved ? 'reviewed' : (pipeline.status || 'extracted'),
          reviewed: approved ? true : Boolean(pipeline.reviewed),
        },
      };

      const res = await fetch(`/api/admin/papers/${paper.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save updates');
      }

      setMessage({
        type: 'success',
        text: approved
          ? 'Paper successfully verified & marked reviewed!'
          : 'Changes saved successfully.',
      });

      setIsEditing(false);
      setTimeout(() => {
        router.push('/admin/verification');
        router.refresh();
      }, 1200);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 sticky top-20 z-30 shadow-xl">
        <div>
          <span className="font-mono text-xs text-cyan-400 block">{paper.document_id}</span>
          <h2 className="text-lg font-bold text-white truncate max-w-xl">{paper.title}</h2>
          <span className="text-xs text-slate-400">
            Current Status: <strong>{pipeline.status || 'extracted'}</strong> (Reviewed: {pipeline.reviewed ? 'Yes' : 'No'})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Fields'}
          </button>

          {isEditing && (
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSave(false)}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
            >
              {loading ? 'Saving...' : 'Save Edits'}
            </button>
          )}

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave(true)}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-green-500 hover:bg-green-400 text-slate-950 flex items-center gap-1.5"
          >
            <span>✓</span> {loading ? 'Processing...' : 'Approve & Mark Verified'}
          </button>
        </div>
      </div>

      {/* Status Alert Banner */}
      {message.text && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold ${
            message.type === 'success'
              ? 'bg-green-950/80 border border-green-800 text-green-200'
              : 'bg-red-950/80 border border-red-800 text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Field Review List with Source Evidence beside each field */}
      <div className="space-y-6">
        {/* Field 1: Category */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Scientific Category (Fixed 10)
              </label>
              <div className="w-32">
                <ConfidenceBar value={confidence.category ?? 0.9} size="sm" />
              </div>
            </div>

            {isEditing ? (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm font-semibold text-white bg-slate-950 p-3 rounded-lg border border-slate-800">
                {category}
              </div>
            )}
          </div>

          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs">
            <span className="text-[11px] font-semibold text-cyan-400 block mb-1">
              Source Evidence for Category:
            </span>
            {getEvidence('category') ? (
              <div>
                <blockquote className="italic text-slate-300 leading-relaxed border-l-2 border-cyan-500 pl-3">
                  &ldquo;{getEvidence('category').source_text}&rdquo;
                </blockquote>
                <span className="text-[10px] text-slate-500 mt-2 block">
                  Page {getEvidence('category').page_number || 'N/A'} • Section: {getEvidence('category').section || 'General'}
                </span>
              </div>
            ) : (
              <span className="text-slate-500 italic">No specific evidence item logged for category.</span>
            )}
          </div>
        </div>

        {/* Field 2: Paper Title */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Paper Title
              </label>
              <div className="w-32">
                <ConfidenceBar value={confidence.title ?? 0.95} size="sm" />
              </div>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs"
              />
            ) : (
              <div className="text-sm font-semibold text-white bg-slate-950 p-3 rounded-lg border border-slate-800">
                {title}
              </div>
            )}
          </div>

          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs">
            <span className="text-[11px] font-semibold text-cyan-400 block mb-1">
              Source PDF Metadata:
            </span>
            <div className="text-slate-400 space-y-1">
              <div>File: <span className="text-white font-mono">{paper.source_file}</span></div>
              <div>Series: <span className="text-white">{paper.bibliographic?.publication_series || 'N/A'}</span></div>
              {paper.pdf_url && (
                <a
                  href={paper.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline block pt-1"
                >
                  Open PDF to verify title ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Field 3: Year & Expedition */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                3. Year
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs font-mono"
                />
              ) : (
                <div className="text-sm font-semibold text-white bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {year || 'N/A'}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                4. Expedition
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={expedition}
                  onChange={(e) => setExpedition(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs"
                />
              ) : (
                <div className="text-sm font-semibold text-white bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {expedition || 'N/A'}
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs">
            <span className="text-[11px] font-semibold text-cyan-400 block mb-1">
              Source Evidence / Confidence:
            </span>
            <div className="space-y-2">
              <ConfidenceBar value={confidence.year ?? 0.9} label="Year Score" size="sm" />
              <p className="text-[11px] text-slate-400 mt-2">
                Bibliographic Page Range: {paper.bibliographic?.page_range || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Field 4: Research Sites */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                5. Research Sites (Comma separated)
              </label>
              <div className="w-32">
                <ConfidenceBar value={confidence.research_sites ?? 0.85} size="sm" />
              </div>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={sites}
                onChange={(e) => setSites(e.target.value)}
                placeholder="Maitri, Schirmacher Oasis"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs"
              />
            ) : (
              <div className="text-sm font-semibold text-white bg-slate-950 p-3 rounded-lg border border-slate-800">
                {sites || 'None recorded'}
              </div>
            )}
          </div>

          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs">
            <span className="text-[11px] font-semibold text-cyan-400 block mb-1">
              Source Evidence for Research Sites:
            </span>
            {getEvidence('research_sites') ? (
              <div>
                <blockquote className="italic text-slate-300 leading-relaxed border-l-2 border-cyan-500 pl-3">
                  &ldquo;{getEvidence('research_sites').source_text}&rdquo;
                </blockquote>
                <span className="text-[10px] text-slate-500 mt-2 block">
                  Page {getEvidence('research_sites').page_number || 'N/A'} • Section: {getEvidence('research_sites').section || 'General'}
                </span>
              </div>
            ) : (
              <span className="text-slate-500 italic">No specific evidence recorded for sites.</span>
            )}
          </div>
        </div>

        {/* Field 5: Plain-Language Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                6. Plain-Language Summary (2-3 lines)
              </label>
              <div className="w-32">
                <ConfidenceBar value={confidence.summary ?? 0.88} size="sm" />
              </div>
            </div>

            {isEditing ? (
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs"
              />
            ) : (
              <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
                {summary || 'No summary recorded.'}
              </div>
            )}

            <div className="mt-3 flex items-center gap-2">
              <input
                type="checkbox"
                id="highlight"
                checked={highlight}
                disabled={!isEditing}
                onChange={(e) => setHighlight(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
              />
              <label htmlFor="highlight" className="text-xs text-slate-400">
                Feature on Portal Homepage (outreach.highlight)
              </label>
            </div>
          </div>

          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs">
            <span className="text-[11px] font-semibold text-cyan-400 block mb-1">
              Verbatim Scientific Abstract (Comparison):
            </span>
            <div className="max-h-36 overflow-y-auto text-[11px] text-slate-400 font-serif leading-relaxed italic border-l-2 border-slate-700 pl-3">
              {paper.content?.abstract || 'No abstract text available.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

