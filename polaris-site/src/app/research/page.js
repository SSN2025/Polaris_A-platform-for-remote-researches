"use client";

import { useMemo, useState } from "react";

const researchData = [
  {
    id: "gravity-stations",
    category: "Geophysics",
    subcategory: "Gravity surveying",
    title: "Establishment of Gravity Stations around Indian Station in Antarctica by NGRI",
    summary:
      "Researchers established gravity measurement points around India's Antarctic station to record variations that help scientists understand the region's underlying geology.",
    expedition: "Tenth Indian Expedition to Antarctica",
    site: "Maitri Station",
    year: "1995",
    pages: "4 pages",
    tags: ["gravity survey", "Maitri", "Schirmacher Oasis"],
    status: "EXTRACTED",
  },
  {
    id: "ice-sheet",
    category: "Glaciology",
    subcategory: "Ice dynamics",
    title: "Ice Sheet Behaviour and Environmental Change",
    summary:
      "Research examining changes in Antarctic ice conditions and the environmental processes influencing ice behaviour across polar regions.",
    expedition: "42nd Indian Antarctic Expedition",
    site: "Bharati",
    year: "2023",
    pages: "26 pages",
    tags: ["ice sheet", "glacier", "environment"],
    status: "DEMO RECORD",
  },
  {
    id: "polar-atmosphere",
    category: "Atmospheric Science / Meteorology",
    subcategory: "Atmospheric studies",
    title: "Understanding Polar Atmospheric Change",
    summary:
      "Observations of atmospheric conditions in Antarctica contribute to understanding polar weather patterns and their relationship with wider environmental change.",
    expedition: "43rd Indian Antarctic Expedition",
    site: "Maitri Station",
    year: "2024",
    pages: "18 pages",
    tags: ["atmosphere", "climate", "weather"],
    status: "DEMO RECORD",
  },
  {
    id: "polar-ecosystems",
    category: "Biology / Microbiology",
    subcategory: "Polar ecosystems",
    title: "Life in Extreme Polar Environments",
    summary:
      "Studies of organisms living in extreme Antarctic environments help researchers understand how life adapts to cold, dry and highly seasonal conditions.",
    expedition: "42nd Indian Antarctic Expedition",
    site: "Larsemann Hills",
    year: "2023",
    pages: "21 pages",
    tags: ["biology", "microbiology", "ecosystems"],
    status: "DEMO RECORD",
  },
  {
    id: "ocean-systems",
    category: "Oceanography",
    subcategory: "Marine systems",
    title: "Observing Antarctic Ocean Systems",
    summary:
      "Ocean observations provide information about Antarctic marine conditions and the processes connecting polar waters with the wider Southern Ocean.",
    expedition: "41st Indian Antarctic Expedition",
    site: "Southern Ocean",
    year: "2022",
    pages: "32 pages",
    tags: ["ocean", "marine", "Southern Ocean"],
    status: "DEMO RECORD",
  },
];

const categories = [
  "All categories",
  "Biology / Microbiology",
  "Glaciology",
  "Geophysics",
  "Geology",
  "Oceanography",
  "Atmospheric Science / Meteorology",
  "Marine Biology",
  "Environmental Science",
  "Logistics / Expedition Operations",
];

const years = [
  "All years",
  "2024",
  "2023",
  "2022",
  "1995",
];

export default function ResearchPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [year, setYear] = useState("All years");
  const [site, setSite] = useState("All research sites");
  const [expedition, setExpedition] = useState("All expeditions");

  const filteredResearch = useMemo(() => {
    const query = search.toLowerCase().trim();

    return researchData.filter((item) => {
      const searchableText = [
        item.title,
        item.summary,
        item.category,
        item.subcategory,
        item.expedition,
        item.site,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesCategory =
        category === "All categories" ||
        item.category === category;

      const matchesYear =
        year === "All years" ||
        item.year === year;

      const matchesSite =
        site === "All research sites" ||
        item.site === site;

      const matchesExpedition =
        expedition === "All expeditions" ||
        item.expedition === expedition;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesYear &&
        matchesSite &&
        matchesExpedition
      );
    });
  }, [search, category, year, site, expedition]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All categories");
    setYear("All years");
    setSite("All research sites");
    setExpedition("All expeditions");
  };

  return (
    <main className="research-page">
      {/* HERO */}
      <section className="research-hero">
        <div className="research-hero-inner">
          <div className="section-index">02 / 07</div>

          <div className="research-eyebrow">
            NCPOR KNOWLEDGE REPOSITORY
          </div>

          <h1>
            Explore
            <br />
            Polar Research
          </h1>

          <p>
            Search structured research extracted from India's polar
            expedition knowledge archive.
          </p>

          <div className="research-hero-meta">
            <span>RESEARCH EXPLORER</span>
            <span>SEARCH · FILTER · DISCOVER</span>
          </div>
        </div>
      </section>

      {/* EXPLORER */}
      <section className="research-explorer">
        <div className="research-container">
          <div className="research-heading-row">
            <div>
              <span className="eyebrow-dark">RESEARCH DATABASE</span>
              <h2>Find a paper</h2>
            </div>

            <div className="research-result-count">
              <strong>{filteredResearch.length}</strong>
              <span>RESULTS</span>
            </div>
          </div>

          {/* SEARCH */}
          <div className="research-search">
            <span className="research-search-icon">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search research, papers, topics, locations..."
              aria-label="Search research"
            />

            {search && (
              <button
                className="research-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* FILTERS */}
          <div className="research-filter-panel">
            <div className="filter-label">
              FILTER RESEARCH
            </div>

            <div className="research-filters">
              <label>
                <span>EXPEDITION</span>
                <select
                  value={expedition}
                  onChange={(e) => setExpedition(e.target.value)}
                >
                  <option>All expeditions</option>
                  <option>Tenth Indian Expedition to Antarctica</option>
                  <option>41st Indian Antarctic Expedition</option>
                  <option>42nd Indian Antarctic Expedition</option>
                  <option>43rd Indian Antarctic Expedition</option>
                </select>
              </label>

              <label>
                <span>CATEGORY</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>YEAR</span>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>RESEARCH SITE</span>
                <select
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                >
                  <option>All research sites</option>
                  <option>Maitri Station</option>
                  <option>Bharati</option>
                  <option>Larsemann Hills</option>
                  <option>Southern Ocean</option>
                </select>
              </label>
            </div>

            <button
              className="research-reset"
              onClick={clearFilters}
            >
              RESET FILTERS
            </button>
          </div>

          {/* RESULTS */}
          <div className="research-results-header">
            <span>RESEARCH PAPERS</span>
            <span>
              {filteredResearch.length.toString().padStart(2, "0")} FOUND
            </span>
          </div>

          <div className="research-list">
            {filteredResearch.map((item, index) => (
              <article className="research-card" key={item.id}>
                <div className="research-card-number">
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                <div className="research-card-main">
                  <div className="research-card-top">
                    <div className="research-taxonomy">
                      <span>{item.category}</span>
                      <i>/</i>
                      <span>{item.subcategory}</span>
                    </div>

                    <span className="research-year">
                      {item.year}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.summary}</p>

                  <div className="research-card-meta">
                    <span>{item.expedition}</span>
                    <span>{item.site}</span>
                    <span>{item.pages}</span>
                  </div>

                  <div className="research-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="research-card-action">
                  <span className="research-status">
                    {item.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (item.status === "EXTRACTED") {
                        window.location.href = `/research/${item.id}`;
                      }
                    }}
                  >
                    VIEW PAPER
                    <span>↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* EMPTY */}
          {filteredResearch.length === 0 && (
            <div className="research-empty">
              <div>NO MATCHING RESEARCH</div>
              <p>
                Try changing your search terms or removing some filters.
              </p>
              <button onClick={clearFilters}>
                CLEAR ALL FILTERS
              </button>
            </div>
          )}

          <div className="research-demo-note">
            <span>DEMO DATA</span>
            <p>
              This explorer currently uses a small verified/demo dataset
              for interface development. The production portal will connect
              these cards to the structured NCPOR research repository.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}