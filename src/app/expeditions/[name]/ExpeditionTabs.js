'use client';

import { useState } from 'react';
import EmptyState from '@/components/EmptyState';
import ResearchDrilldown from './ResearchDrilldown';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'research', label: 'Research' },
  { id: 'reports', label: 'Reports' },
  { id: 'datasets', label: 'Datasets' },
  { id: 'media', label: 'Media' },
  { id: 'publications', label: 'Publications' },
];

export default function ExpeditionTabs({
  papers,
  categoryCounts,
  researchSites,
  yearDistribution,
  yearRange,
}) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      {/* Tab Bar */}
      <div className="border-b border-gray-200 mb-8 overflow-x-auto">
        <nav className="flex gap-0 min-w-max" role="tablist" aria-label="Expedition sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <OverviewPanel
          papers={papers}
          categoryCounts={categoryCounts}
          researchSites={researchSites}
          yearDistribution={yearDistribution}
          yearRange={yearRange}
        />
      )}

      {activeTab === 'research' && (
        <ResearchDrilldown papers={papers} categoryCounts={categoryCounts} />
      )}

      {activeTab === 'reports' && (
        <EmptyState
          icon="📄"
          title="Reports not available yet"
          description="Expedition reports will be available for reading and PDF download once they are added to the archive."
        />
      )}

      {activeTab === 'datasets' && (
        <EmptyState
          icon="📊"
          title="Datasets not available yet"
          description="Research datasets will be available for preview and download once they are added to the archive."
        />
      )}

      {activeTab === 'media' && (
        <EmptyState
          icon="📸"
          title="Media not available yet"
          description="Expedition photos and videos will appear here once media assets are uploaded to the archive."
        />
      )}

      {activeTab === 'publications' && (
        <EmptyState
          icon="📚"
          title="Publications not available yet"
          description="Published journal articles and conference papers will be linked here once added."
        />
      )}
    </div>
  );
}

function OverviewPanel({
  papers,
  categoryCounts,
  researchSites,
  yearDistribution,
  yearRange,
}) {
  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Papers" value={papers.length} icon="📝" />
        <StatCard label="Categories" value={categoryCounts.length} icon="📂" />
        <StatCard
          label="Year Range"
          value={yearRange.min === yearRange.max ? `${yearRange.min}` : `${yearRange.min}–${yearRange.max}`}
          icon="📅"
        />
        <StatCard label="Research Sites" value={researchSites.length} icon="📍" />
      </div>

      {/* Category Breakdown */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {categoryCounts.map(({ category, count }) => {
            const percentage = Math.round((count / papers.length) * 100);
            return (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{category}</span>
                  <span className="text-gray-500">
                    {count} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Research Sites */}
      {researchSites.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Research Sites</h3>
          <div className="flex flex-wrap gap-2">
            {researchSites.map((site) => (
              <span key={site} className="chip">
                📍 {site}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Year Distribution */}
      {yearDistribution.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Year Distribution
          </h3>
          <div className="flex items-end gap-1 h-32">
            {yearDistribution.map(({ year, count }) => {
              const maxCount = Math.max(
                ...yearDistribution.map((y) => y.count)
              );
              const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div
                  key={year}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <span className="text-xs text-gray-500">{count}</span>
                  <div
                    className="w-full bg-blue-400 rounded-t min-h-[4px]"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-gray-400 -rotate-45 origin-top-left whitespace-nowrap">
                    {year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}
