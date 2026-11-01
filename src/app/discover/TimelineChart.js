'use client';

import Link from 'next/link';

export default function TimelineChart({ timelineData }) {
  if (!timelineData || timelineData.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm italic">
        No timeline data available yet.
      </div>
    );
  }

  const maxCount = Math.max(...timelineData.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>📈</span> Research Output Over Time
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Annual publication volume across Indian polar missions. Click any year to explore papers.
          </p>
        </div>
        <span className="text-xs font-mono text-gray-400">
          {timelineData.length} active year{timelineData.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Horizontal / Column Bar Graph */}
      <div className="h-64 flex items-end gap-2 sm:gap-4 pt-8 pb-2 px-2 overflow-x-auto border-b border-gray-200">
        {timelineData.map((item) => {
          const heightPercent = Math.max(Math.round((item.count / maxCount) * 100), 8);
          return (
            <Link
              key={item.year}
              href={`/research?year=${item.year}`}
              className="group flex-1 min-w-[38px] flex flex-col items-center justify-end h-full focus:outline-none"
              title={`${item.year}: ${item.count} paper(s)`}
            >
              <span className="text-[11px] font-semibold text-gray-500 group-hover:text-blue-600 mb-1 transition-colors">
                {item.count}
              </span>
              <div className="w-full bg-blue-100 group-hover:bg-blue-600 rounded-t-md transition-all duration-300 relative" style={{ height: `${heightPercent}%` }}>
                <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-transparent rounded-t-md" />
              </div>
              <span className="text-xs font-mono text-gray-600 group-hover:text-blue-700 font-semibold mt-2 -rotate-45 sm:rotate-0 transition-colors">
                {item.year}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-400 mt-4 px-2">
        <span>Earliest recorded: {timelineData[0]?.year}</span>
        <span>Latest recorded: {timelineData[timelineData.length - 1]?.year}</span>
      </div>
    </div>
  );
}

