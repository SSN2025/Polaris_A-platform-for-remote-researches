'use client';

import { useState } from 'react';
import PaperCard from '@/components/PaperCard';

export default function ResearchDrilldown({ papers, categoryCounts }) {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});

  // Group papers: category → subcategory → papers
  const grouped = {};
  papers.forEach((paper) => {
    const cat = paper.category || 'Uncategorized';
    const sub = paper.subcategory || 'General';
    if (!grouped[cat]) grouped[cat] = {};
    if (!grouped[cat][sub]) grouped[cat][sub] = [];
    grouped[cat][sub].push(paper);
  });

  const toggleCategory = (cat) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const toggleSubcategory = (key) => {
    setExpandedSubcategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = Object.keys(grouped).sort();

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 mb-6">
        Drill down by category and subcategory to find specific research papers.
      </p>

      {categories.map((cat) => {
        const subcategories = Object.keys(grouped[cat]).sort();
        const totalInCat = subcategories.reduce(
          (sum, sub) => sum + grouped[cat][sub].length,
          0
        );
        const isExpanded = expandedCategories[cat];

        return (
          <div key={cat} className="card overflow-hidden">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(cat)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
              aria-expanded={isExpanded}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900">{cat}</h3>
              </div>
              <span className="badge bg-gray-100 text-gray-600">
                {totalInCat} paper{totalInCat !== 1 ? 's' : ''}
              </span>
            </button>

            {/* Subcategories */}
            {isExpanded && (
              <div className="border-t border-gray-100">
                {subcategories.map((sub) => {
                  const subKey = `${cat}::${sub}`;
                  const isSubExpanded = expandedSubcategories[subKey];
                  const subPapers = grouped[cat][sub];

                  return (
                    <div key={subKey}>
                      <button
                        onClick={() => toggleSubcategory(subKey)}
                        className="w-full flex items-center justify-between px-6 py-3 pl-14 hover:bg-gray-50 transition-colors text-left border-b border-gray-50"
                        aria-expanded={isSubExpanded}
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              isSubExpanded ? 'rotate-90' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          <span className="text-sm text-gray-700">{sub}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {subPapers.length}
                        </span>
                      </button>

                      {/* Papers */}
                      {isSubExpanded && (
                        <div className="bg-gray-50/50 px-6 py-4 pl-20 grid gap-4 sm:grid-cols-2">
                          {subPapers.map((paper) => (
                            <PaperCard key={paper.id} paper={paper} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
