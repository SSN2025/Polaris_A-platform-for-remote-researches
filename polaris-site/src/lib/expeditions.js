export const expeditions = [
  {
    id: "maitri",
    name: "Maitri Station",
    location: "Schirmacher Oasis · East Antarctica",
    founded: "1989",
    status: "ACTIVE",
    image: "/images/expedition-maitri.jpg",
    description:
      "India's second permanent Antarctic research station and a major base for multidisciplinary polar science.",
  },
  {
    id: "bharati",
    name: "Bharati Station",
    location: "Larsemann Hills · East Antarctica",
    founded: "2012",
    status: "ACTIVE",
    image: "/images/expedition-bharati.jpg",
    description:
      "India's third Antarctic station supporting research across ocean, atmospheric, biological, and earth sciences.",
  },
  {
    id: "dakshin-gangotri",
    name: "Dakshin Gangotri",
    location: "Queen Maud Land · East Antarctica",
    founded: "1983",
    status: "ARCHIVED",
    image: "/images/expedition-gangotri.jpg",
    description:
      "India's first Antarctic research station and the beginning of the country's sustained scientific presence in Antarctica.",
  },
];

/*
 * Simple substring search across expedition name, location,
 * and description. Powers the global search overlay.
 */
export function searchExpeditions(query, limit = 5) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  return expeditions
    .filter((expedition) => {
      const haystack = [
        expedition.name,
        expedition.location,
        expedition.description,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    })
    .slice(0, limit);
}