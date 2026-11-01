// Fixed categories as specified in the schema
export const CATEGORIES = [
  'Biology / Microbiology',
  'Glaciology',
  'Geophysics',
  'Geology',
  'Oceanography',
  'Atmospheric Science / Meteorology',
  'Marine Biology',
  'Environmental Science',
  'Logistics / Expedition Operations',
  'Other',
];

// Known polar research stations and sites
export const KNOWN_RESEARCH_SITES = [
  { name: 'Maitri', lat: -70.7667, lng: 11.7333, type: 'station', region: 'Antarctic' },
  { name: 'Bharati', lat: -69.4083, lng: 76.185, type: 'station', region: 'Antarctic' },
  { name: 'Schirmacher Oasis', lat: -70.75, lng: 11.6167, type: 'site', region: 'Antarctic' },
  { name: 'Larsemann Hills', lat: -69.4, lng: 76.2, type: 'site', region: 'Antarctic' },
  { name: 'Himadri', lat: 78.9253, lng: 11.9312, type: 'station', region: 'Arctic' },
];

// Pipeline statuses
export const PIPELINE_STATUSES = ['extracted', 'reviewed', 'published'];

// Category color mapping for UI
export const CATEGORY_COLORS = {
  'Biology / Microbiology': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', badge: 'bg-green-100' },
  'Glaciology': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', badge: 'bg-cyan-100' },
  'Geophysics': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', badge: 'bg-orange-100' },
  'Geology': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-100' },
  'Oceanography': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-100' },
  'Atmospheric Science / Meteorology': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', badge: 'bg-indigo-100' },
  'Marine Biology': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', badge: 'bg-teal-100' },
  'Environmental Science': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-100' },
  'Logistics / Expedition Operations': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', badge: 'bg-slate-100' },
  'Other': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', badge: 'bg-gray-100' },
};

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['Other'];
}

// Category icons (emoji-based for simplicity)
export const CATEGORY_ICONS = {
  'Biology / Microbiology': '🧬',
  'Glaciology': '🧊',
  'Geophysics': '🌍',
  'Geology': '🪨',
  'Oceanography': '🌊',
  'Atmospheric Science / Meteorology': '🌤️',
  'Marine Biology': '🐧',
  'Environmental Science': '🌿',
  'Logistics / Expedition Operations': '🚢',
  'Other': '📋',
};

