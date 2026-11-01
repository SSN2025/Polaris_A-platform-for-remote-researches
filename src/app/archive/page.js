import Link from 'next/link';
import EmptyState from '@/components/EmptyState';

export const metadata = {
  title: 'Archive',
  description: 'NCPOR Polar Archive: Scientific Reports, Datasets, Publications, Expedition Photos, Videos, and Institutional Activities.',
};

export default function ArchivePage() {
  const sections = [
    {
      id: 'reports',
      title: 'Scientific & Technical Reports',
      icon: '📑',
      description: 'Comprehensive cruise and expedition reports, station maintenance logs, and technical debriefings.',
      keyFields: ['Expedition', 'Report Type', 'Lead Author / Chief Scientist', 'Station / Vessel', 'Date of Submission'],
      actionLabel: 'Read Online / View PDF',
      emptyMessage: 'No standalone technical reports ingested yet. As PDF reports are processed, they will appear here.',
    },
    {
      id: 'datasets',
      title: 'Polar Research Datasets',
      icon: '📊',
      description: 'Raw and processed geophysical, meteorological, oceanographic, and cryospheric measurements.',
      keyFields: ['Dataset Title', 'Parameters Measured', 'Spatial Coordinates', 'Temporal Range', 'File Format (CSV/NetCDF)'],
      actionLabel: 'Preview / Download',
      emptyMessage: 'Polar observational datasets have not been linked to the repository yet.',
    },
    {
      id: 'publications',
      title: 'Peer-Reviewed Publications',
      icon: '📚',
      description: 'External journal articles, conference proceedings, and collaborative papers arising from NCPOR missions.',
      keyFields: ['Journal Name', 'Impact Factor', 'DOI Link', 'Authors & Institution', 'Open Access Status'],
      actionLabel: 'View Publication',
      emptyMessage: 'External peer-reviewed publications catalog is currently being indexed.',
    },
    {
      id: 'photos',
      title: 'Expedition Photographic Archive',
      icon: '📸',
      description: 'High-resolution field photography from Antarctic bases, research icebreakers, and Arctic campaigns.',
      keyFields: ['Location / Coordinates', 'Expedition Season', 'Photographer Credit', 'Subject / Wildlife / Base', 'License'],
      actionLabel: 'View Grid with Lightbox',
      emptyMessage: 'Photographic media archive is not available yet. Image ingestion pipeline scheduled.',
    },
    {
      id: 'videos',
      title: 'Expedition Video Records',
      icon: '🎥',
      description: 'Footage documenting logistics operations, scientific deployments, wildlife monitoring, and base life.',
      keyFields: ['Duration', 'Expedition / Year', 'Resolution', 'Subject Category', 'Transcript Availability'],
      actionLabel: 'Watch Video',
      emptyMessage: 'Expedition video records are not available yet.',
    },
    {
      id: 'activities',
      title: 'Institutional Activities & Outreach',
      icon: '🏛️',
      description: 'Records of polar day celebrations, student interaction workshops, international Antarctic treaty conferences, and exhibitions.',
      keyFields: ['Activity Name', 'Organizing Division', 'Date & Venue', 'Participant Count', 'Summary of Outcomes'],
      actionLabel: 'View Activity',
      emptyMessage: 'Institutional outreach activities have not been logged into the database yet.',
    },
  ];

  return (
    <div className="bg-gray-50/50 min-h-screen py-10">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Archive</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Polar Knowledge Archive</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Integrated repository for India&apos;s polar science assets — reports, raw datasets, media, and institutional outreach records.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="space-y-8">
          {sections.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <span className="text-4xl p-3 bg-gray-50 rounded-2xl border border-gray-100">{sec.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{sec.title}</h2>
                    <p className="text-sm text-gray-600 mt-1 max-w-xl">{sec.description}</p>
                    
                    {/* Key Schema Fields */}
                    <div className="mt-3">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Key Fields Captured:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sec.keyFields.map((field) => (
                          <span
                            key={field}
                            className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md font-medium"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-start md:items-end">
                  <span className="text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full font-semibold">
                    Status: Data not available yet
                  </span>
                  <button
                    disabled
                    className="mt-3 text-xs font-medium text-gray-400 bg-gray-100 px-4 py-2 rounded-lg cursor-not-allowed opacity-60 inline-flex items-center gap-1.5"
                  >
                    <span>🔒</span> {sec.actionLabel}
                  </button>
                </div>
              </div>

              {/* State Container */}
              <div className="pt-6">
                <EmptyState
                  icon={sec.icon}
                  title={`${sec.title} (0 records)`}
                  description={sec.emptyMessage}
                  actionHref="/research"
                  actionLabel="Explore Research Papers"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

