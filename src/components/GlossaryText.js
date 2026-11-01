'use client';

import { useState } from 'react';
import { findGlossaryTerms } from '@/lib/glossary';

export default function GlossaryText({ text }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  if (!text) return null;

  const terms = findGlossaryTerms(text);
  if (terms.length === 0) return <span>{text}</span>;

  const segments = [];
  let lastIndex = 0;

  terms.forEach((term, i) => {
    if (term.start > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, term.start), key: `t${i}` });
    }
    segments.push({
      type: 'term',
      content: text.slice(term.start, term.end),
      definition: term.definition,
      key: `g${i}`,
    });
    lastIndex = term.end;
  });

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex), key: 'end' });
  }

  return (
    <span>
      {segments.map((seg) =>
        seg.type === 'text' ? (
          <span key={seg.key}>{seg.content}</span>
        ) : (
          <span key={seg.key} className="relative inline-block">
            <button
              onMouseEnter={() => setActiveTooltip(seg.key)}
              onMouseLeave={() => setActiveTooltip(null)}
              onFocus={() => setActiveTooltip(seg.key)}
              onBlur={() => setActiveTooltip(null)}
              className="border-b border-dotted border-blue-400 text-blue-700 cursor-help focus:outline-none focus:ring-1 focus:ring-blue-300 rounded"
              aria-describedby={`tooltip-${seg.key}`}
            >
              {seg.content}
            </button>
            {activeTooltip === seg.key && (
              <span
                id={`tooltip-${seg.key}`}
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 pointer-events-none"
              >
                <span className="font-semibold block mb-1">{seg.content}</span>
                {seg.definition}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </span>
            )}
          </span>
        )
      )}
    </span>
  );
}

