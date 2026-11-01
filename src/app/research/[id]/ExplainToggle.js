'use client';

import { useState } from 'react';
import GlossaryText from '@/components/GlossaryText';

export default function ExplainToggle({ summary, abstract }) {
  const [mode, setMode] = useState('summary'); // 'summary' | 'abstract'

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50/70 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Reading Mode:</span>
          <div className="inline-flex rounded-lg bg-gray-200 p-0.5" role="tablist">
            <button
              onClick={() => setMode('summary')}
              role="tab"
              aria-selected={mode === 'summary'}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                mode === 'summary'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Plain-Language Summary
            </button>
            <button
              onClick={() => setMode('abstract')}
              role="tab"
              aria-selected={mode === 'abstract'}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                mode === 'abstract'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Scientific Abstract
            </button>
          </div>
        </div>

        <span className="text-xs text-gray-400">
          {mode === 'summary' ? 'AI simplified for general public' : 'Verbatim paper extract'}
        </span>
      </div>

      <div className="p-6">
        {mode === 'summary' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Plain-Language Overview
            </div>
            <p className="text-gray-800 text-base leading-relaxed">
              {summary || <span className="italic text-gray-400">Plain-language summary not available yet.</span>}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Verbatim Scientific Abstract
            </div>
            <div className="text-gray-800 text-base leading-relaxed font-serif">
              {abstract ? (
                <GlossaryText text={abstract} />
              ) : (
                <span className="italic text-gray-400">Scientific abstract not available yet.</span>
              )}
            </div>
            <p className="mt-3 text-xs text-gray-400 italic">
              Hover or tap highlighted terms for polar science glossary definitions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

