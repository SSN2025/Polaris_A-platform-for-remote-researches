'use client';

import { useState } from 'react';
import PolarMap from './PolarMap';
import PaperCard from '@/components/PaperCard';

export default function DiscoverClient({ siteData, allPapers }) {
  const [selectedSite, setSelectedSite] = useState(null);

  // Filter papers matching selected site
  const sitePapers = selectedSite
    ? allPapers.filter((p) => {
        const sites = p.content?.research_sites || [];
        return sites.some(
          (s) => s?.toLowerCase().includes(selectedSite.toLowerCase()) || selectedSite.toLowerCase().includes(s?.toLowerCase())
        );
      })
    : [];

  return (
    <div className="space-y-8">
      {/* Interactive Map */}
      <PolarMap
        siteData={siteData}
        selectedSite={selectedSite}
        onSelectSite={setSelectedSite}
      />

      {/* Location View: Papers for the selected site regardless of expedition */}
      {selectedSite && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm transition-all animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                <h3 className="text-xl font-bold text-gray-900">
                  Research Records for &ldquo;{selectedSite}&rdquo;
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Showing all papers conducted at or referencing this site across all expeditions.
              </p>
            </div>
            <button
              onClick={() => setSelectedSite(null)}
              className="text-sm text-gray-500 hover:text-gray-800 underline"
            >
              Close Location View
            </button>
          </div>

          {sitePapers.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-sm">
              No research papers found specifically linked to {selectedSite} in the database yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sitePapers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

