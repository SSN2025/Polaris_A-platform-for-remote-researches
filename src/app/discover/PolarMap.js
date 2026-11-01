'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PolarMap({ siteData, selectedSite, onSelectSite }) {
  const [activeHover, setActiveHover] = useState(null);

  // Stations & coordinates configured for visual polar map representation
  const SITES = [
    {
      id: 'Maitri',
      name: 'Maitri Station',
      region: 'Antarctic (Schirmacher Oasis)',
      coords: '70°45′57″ S, 11°44′09″ E',
      x: 38, // percentage across map
      y: 68,
      hemisphere: 'antarctic',
    },
    {
      id: 'Bharati',
      name: 'Bharati Station',
      region: 'Antarctic (Larsemann Hills)',
      coords: '69°24′28″ S, 76°11′14″ E',
      x: 62,
      y: 72,
      hemisphere: 'antarctic',
    },
    {
      id: 'Schirmacher Oasis',
      name: 'Schirmacher Oasis',
      region: 'Queen Maud Land, East Antarctica',
      coords: '70°45′ S, 11°38′ E',
      x: 35,
      y: 62,
      hemisphere: 'antarctic',
    },
    {
      id: 'Larsemann Hills',
      name: 'Larsemann Hills',
      region: 'Prydz Bay, East Antarctica',
      coords: '69°24′ S, 76°12′ E',
      x: 65,
      y: 66,
      hemisphere: 'antarctic',
    },
    {
      id: 'Himadri',
      name: 'Himadri / Arctic Station',
      region: 'Ny-Ålesund, Svalbard (Arctic)',
      coords: '78°55′ N, 11°56′ E',
      x: 50,
      y: 22,
      hemisphere: 'arctic',
    },
  ];

  // Helper to get stats for a site
  const getStats = (siteId) => {
    const data = siteData.find((s) => s.name?.toLowerCase() === siteId.toLowerCase()) || {
      papers: 0,
      expeditions: 0,
    };
    return data;
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 text-white p-6 shadow-xl overflow-hidden relative">
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>🌐</span> Polar Research Interactive Map
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Indian Polar Research Stations and Field Sites in Antarctica &amp; the Arctic
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-400/50" />
            <span className="text-slate-300">Antarctic Sites</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-indigo-400 inline-block shadow-sm shadow-indigo-400/50" />
            <span className="text-slate-300">Arctic (Svalbard)</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map Container */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950/60 rounded-xl border border-slate-800/80 overflow-hidden">
        {/* Subtle grid and polar rings */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cyan-500 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-500 rounded-full" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyan-500" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-cyan-500" />
        </div>

        {/* Region Labels */}
        <div className="absolute top-4 left-6 text-[11px] font-mono tracking-widest text-indigo-400/80 uppercase">
          ▲ Arctic Region (Svalbard Archipelago)
        </div>
        <div className="absolute bottom-4 left-6 text-[11px] font-mono tracking-widest text-cyan-400/80 uppercase">
          ▼ Antarctic Continent (Queen Maud Land &amp; Prydz Bay)
        </div>

        {/* Interactive Site Pins */}
        {SITES.map((site) => {
          const stats = getStats(site.id);
          const isSelected = selectedSite === site.id;
          const isArctic = site.hemisphere === 'arctic';

          return (
            <div
              key={site.id}
              style={{ left: `${site.x}%`, top: `${site.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => onSelectSite(site.id)}
                onMouseEnter={() => setActiveHover(site.id)}
                onMouseLeave={() => setActiveHover(null)}
                className={`relative group flex flex-col items-center focus:outline-none`}
                aria-label={`Select ${site.name}`}
              >
                {/* Ping animation when selected */}
                {isSelected && (
                  <span
                    className={`absolute w-8 h-8 rounded-full ${
                      isArctic ? 'bg-indigo-400/40' : 'bg-cyan-400/40'
                    } animate-ping pointer-events-none`}
                  />
                )}

                {/* Marker Dot */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 shadow-lg ${
                    isSelected
                      ? 'bg-white ring-4 ' + (isArctic ? 'ring-indigo-500' : 'ring-cyan-500')
                      : isArctic
                      ? 'bg-indigo-500 text-white hover:bg-indigo-400'
                      : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                  }`}
                >
                  <span className="text-[10px] font-bold">📍</span>
                </div>

                {/* Pin Name Label */}
                <span
                  className={`mt-1.5 text-xs font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-white text-slate-900 font-bold'
                      : 'bg-slate-800/90 text-slate-200 group-hover:bg-slate-700'
                  }`}
                >
                  {site.name}
                </span>

                {/* Hover / Active Info Tooltip */}
                {(activeHover === site.id || isSelected) && (
                  <div
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-slate-800 text-slate-100 p-3 rounded-xl border border-slate-700 shadow-2xl pointer-events-auto z-30"
                    role="tooltip"
                  >
                    <div className="font-bold text-sm text-white mb-0.5">{site.name}</div>
                    <div className="text-[11px] text-slate-400 mb-2">{site.region}</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-center bg-slate-900/80 p-2 rounded-lg text-xs mb-2">
                      <div>
                        <span className="font-bold text-cyan-400 text-sm block">{stats.papers}</span>
                        <span className="text-[10px] text-slate-400">Papers</span>
                      </div>
                      <div>
                        <span className="font-bold text-cyan-400 text-sm block">{stats.expeditions}</span>
                        <span className="text-[10px] text-slate-400">Expeditions</span>
                      </div>
                    </div>

                    <Link
                      href={`/research?researchSite=${encodeURIComponent(site.id)}`}
                      className="block text-center text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-slate-950 py-1.5 rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View All Research →
                    </Link>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Site Location Card */}
      {selectedSite && (
        <div className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold block">Currently Inspected Site:</span>
            <span className="text-lg font-bold text-white">{selectedSite}</span>
            <span className="text-xs text-slate-400 block">
              Showing all associated research records from database across all expeditions
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/research?researchSite=${encodeURIComponent(selectedSite)}`}
              className="btn-primary text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 px-4 py-2 font-bold"
            >
              Open in Research Explorer
            </Link>
            <button
              onClick={() => onSelectSite(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

