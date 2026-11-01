// Polar science glossary for tooltip definitions
const GLOSSARY = {
  'cryosphere': 'The frozen water part of the Earth system, including ice sheets, glaciers, sea ice, snow cover, and permafrost.',
  'permafrost': 'Ground that remains frozen for at least two consecutive years, found in polar and high-altitude regions.',
  'ice core': 'A cylinder of ice drilled from an ice sheet or glacier, used to study past climate conditions.',
  'ice sheet': 'A mass of glacial land ice extending more than 50,000 square kilometers.',
  'glacier': 'A persistent body of dense ice that is constantly moving under its own weight.',
  'moraine': 'An accumulation of unconsolidated glacial debris (soil and rock) carried by glaciers.',
  'ablation': 'The removal of snow or ice from a glacier or ice sheet by melting, evaporation, or calving.',
  'calving': 'The breaking off of chunks of ice from the edge of a glacier, forming icebergs.',
  'firn': 'Granular snow that has been compressed and recrystallized but has not yet become glacial ice.',
  'bathymetry': 'The measurement and charting of the depths of ocean floors.',
  'thermohaline': 'Relating to the combined effect of temperature and salinity on ocean water density and circulation.',
  'katabatic wind': 'A drainage wind that carries high-density cold air down a slope under the force of gravity.',
  'nunatak': 'An exposed rocky peak or ridge not covered with ice or snow within an ice field or glacier.',
  'polynya': 'An area of open water surrounded by sea ice, important for heat exchange and biological productivity.',
  'albedo': 'The fraction of solar radiation reflected by a surface. Snow and ice have high albedo.',
  'isostasy': 'The equilibrium between the Earth\'s crust and mantle, affected by the weight of ice sheets.',
  'geomagnetic': 'Relating to the Earth\'s magnetic field, studied extensively in polar regions.',
  'ionosphere': 'The ionized part of Earth\'s upper atmosphere, where polar aurora occur.',
  'aurora': 'Natural light displays in the sky, caused by charged solar particles interacting with the atmosphere at polar latitudes.',
  'ozone layer': 'A region of Earth\'s stratosphere that absorbs most of the Sun\'s ultraviolet radiation. The ozone hole was discovered over Antarctica.',
  'sea ice': 'Ice formed from the freezing of ocean water, distinct from icebergs which break off from land-based glaciers.',
  'continental shelf': 'The extended perimeter of a continent submerged under relatively shallow ocean water.',
  'sediment core': 'A cylindrical sample of sediment taken from the ocean floor or lake bed to study geological history.',
  'paleoclimate': 'The climate of past geological periods, reconstructed from ice cores, sediment cores, and other proxies.',
  'proxy data': 'Indirect evidence of past climate conditions from natural recorders like ice cores, tree rings, or coral.',
  'lichen': 'A composite organism arising from symbiosis between fungi and photosynthetic partners, common in polar regions.',
  'extremophile': 'An organism that thrives in physically or geochemically extreme conditions.',
  'phytoplankton': 'Microscopic plants in the ocean that form the base of the marine food web.',
  'krill': 'Small crustaceans found in Antarctic waters, a keystone species in the Southern Ocean ecosystem.',
  'benthic': 'Relating to the bottom of a sea or lake, or organisms living there.',
  'pelagic': 'Relating to the open ocean away from the coast or the bottom.',
  'tundra': 'A biome characterized by low temperatures, short growing seasons, and sparse vegetation.',
  'meridional': 'Running north-south, relating to a meridian. Used in ocean and atmospheric circulation studies.',
  'circumpolar': 'Surrounding or near one of the Earth\'s poles.',
  'Gondwana': 'An ancient supercontinent that included present-day Antarctica, India, Africa, South America, and Australia.',
  'subglacial': 'Located or occurring beneath a glacier or ice sheet.',
  'supraglacial': 'Located or occurring on the surface of a glacier.',
  'crevasse': 'A deep crack or fissure in glacial ice.',
  'erratic': 'A rock or boulder carried by glacial ice and deposited in an area of different geology.',
  'till': 'Unsorted glacial sediment deposited directly by glacial ice.',
  'fluvioglacial': 'Relating to streams flowing from melting glaciers, or the deposits they leave.',
  'periglacial': 'Relating to areas near glaciers or ice sheets, subject to repeated freezing and thawing.',
  'geothermal': 'Relating to heat from within the Earth, measured in polar regions for geological studies.',
  'seismology': 'The study of earthquakes and the propagation of elastic waves through the Earth.',
  'magnetometer': 'An instrument for measuring magnetic forces, used in geophysical surveys.',
  'CTD': 'Conductivity, Temperature, and Depth — an instrument package used to profile ocean water properties.',
  'ADCP': 'Acoustic Doppler Current Profiler — an instrument that measures water current velocities using sound.',
  'lidar': 'Light Detection and Ranging — a remote sensing method using laser light to measure distances and properties.',
  'remote sensing': 'The acquisition of information about an object or phenomenon without making physical contact, typically from satellites.',
  'GIS': 'Geographic Information System — a framework for gathering, managing, and analyzing spatial data.',
  'GPS': 'Global Positioning System — a satellite-based navigation system used for precise location measurements in fieldwork.',
  'radiosonde': 'An instrument carried by weather balloons to measure atmospheric conditions at altitude.',
  'ENSO': 'El Niño-Southern Oscillation — a climate pattern involving changes in Pacific Ocean temperatures affecting global weather.',
  'ACC': 'Antarctic Circumpolar Current — the world\'s largest ocean current, flowing clockwise around Antarctica.',
  'SOI': 'Southern Oscillation Index — a measure of large-scale fluctuations in air pressure between the western and eastern tropical Pacific.',
};

/**
 * Find glossary terms in text and return their positions and definitions
 */
export function findGlossaryTerms(text) {
  if (!text) return [];
  const found = [];
  const lowerText = text.toLowerCase();
  
  for (const [term, definition] of Object.entries(GLOSSARY)) {
    const lowerTerm = term.toLowerCase();
    let index = lowerText.indexOf(lowerTerm);
    while (index !== -1) {
      found.push({
        term,
        definition,
        start: index,
        end: index + term.length,
      });
      index = lowerText.indexOf(lowerTerm, index + 1);
    }
  }
  
  // Sort by position, deduplicate overlaps
  found.sort((a, b) => a.start - b.start);
  const deduped = [];
  let lastEnd = -1;
  for (const item of found) {
    if (item.start >= lastEnd) {
      deduped.push(item);
      lastEnd = item.end;
    }
  }
  
  return deduped;
}

export default GLOSSARY;

