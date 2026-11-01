import Link from 'next/link';
import { getCategoryColor } from '@/lib/constants';

export default function PaperCard({ paper }) {
  const colors = getCategoryColor(paper.category);
  const summary = paper.content?.summary;
  const tags = paper.taxonomy?.tags || [];
  const keywords = paper.content?.keywords || [];

  return (
    <article className="card p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className={`badge ${colors.badge} ${colors.text}`}>
          {paper.category}
        </span>
        {paper.year && (
          <span className="text-sm text-gray-500 shrink-0">{paper.year}</span>
        )}
      </div>

      <Link href={`/research/${paper.id}`} className="group">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {paper.title}
        </h3>
      </Link>

      {summary && (
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{summary}</p>
      )}
      {!summary && (
        <p className="text-sm text-gray-400 italic mb-4 flex-1">Summary not available</p>
      )}

      <div className="space-y-3 mt-auto">
        {/* Tags */}
        {(tags.length > 0 || keywords.length > 0) && (
          <div className="flex flex-wrap gap-1.5">
            {[...tags, ...keywords].slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                {tag}
              </span>
            ))}
            {[...tags, ...keywords].length > 4 && (
              <span className="text-xs text-gray-400">+{[...tags, ...keywords].length - 4}</span>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {paper.expedition && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              {paper.expedition}
            </span>
          )}
          {paper.subcategory && (
            <span>{paper.subcategory}</span>
          )}
        </div>
      </div>
    </article>
  );
}

