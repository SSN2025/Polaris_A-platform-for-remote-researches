"use client";

import React from "react";
import Link from "next/link";

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
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
];

export default function ResearchInterface({ research = [] }) {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] =
    React.useState("All categories");
  const [year, setYear] =
    React.useState("All years");
  const [site, setSite] =
    React.useState("All research sites");
  const [expedition, setExpedition] =
    React.useState("All expeditions");
  const [currentPage, setCurrentPage] =
    React.useState(1);

  const ITEMS_PER_PAGE = 12;

  const expeditions = React.useMemo(() => {
    const values = research
      .map((paper) => paper?.display?.expedition)
      .filter(Boolean);

    return [
      "All expeditions",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [research]);

  const sites = React.useMemo(() => {
    const values = research.flatMap(
      (paper) => paper?.display?.sites || []
    );

    return [
      "All research sites",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [research]);

  const filteredResearch = React.useMemo(() => {
    const query = search.toLowerCase().trim();

    return research.filter((paper) => {
      const display = paper?.display || {};

      const searchableText = [
        display.title,
        display.summary,
        display.category,
        display.subcategory,
        display.expedition,
        ...(display.sites || []),
        ...(display.keywords || []),
        ...(display.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesCategory =
        category === "All categories" ||
        display.category === category;

      const matchesYear =
        year === "All years" ||
        String(display.year) === year;

      const matchesSite =
        site === "All research sites" ||
        (display.sites || []).includes(site);

      const matchesExpedition =
        expedition === "All expeditions" ||
        display.expedition === expedition;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesYear &&
        matchesSite &&
        matchesExpedition
      );
    });
  }, [
    research,
    search,
    category,
    year,
    site,
    expedition,
  ]);

  const totalPages = Math.ceil(
    filteredResearch.length / ITEMS_PER_PAGE
  );

  const paginatedResearch = React.useMemo(() => {
    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredResearch.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredResearch, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    year,
    site,
    expedition,
  ]);

  function clearFilters() {
    setSearch("");
    setCategory("All categories");
    setYear("All years");
    setSite("All research sites");
    setExpedition("All expeditions");
  }

  return (
    <section className="research-explorer">
      <div className="research-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="research-heading-row">

          <div>
            <span className="eyebrow-dark">
              RESEARCH DATABASE
            </span>

            <h2>Find a paper</h2>
          </div>

          <div className="research-result-count">
            <strong>
              {filteredResearch.length}
            </strong>

            <span>RESULTS</span>
          </div>

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="research-search">

          <span
            className="research-search-icon"
            aria-hidden="true"
          >
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search research, papers, topics, locations..."
            aria-label="Search research"
          />

          {search && (
            <button
              type="button"
              className="research-clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="research-filter-panel">

          <div className="filter-label">
            FILTER RESEARCH
          </div>

          <div className="research-filters">

            <Filter
              label="EXPEDITION"
              value={expedition}
              setValue={setExpedition}
              options={expeditions}
            />

            <Filter
              label="CATEGORY"
              value={category}
              setValue={setCategory}
              options={categories}
            />

            <Filter
              label="YEAR"
              value={year}
              setValue={setYear}
              options={years}
            />

            <Filter
              label="RESEARCH SITE"
              value={site}
              setValue={setSite}
              options={sites}
            />

          </div>

          <button
            type="button"
            className="research-reset"
            onClick={clearFilters}
          >
            RESET FILTERS
          </button>

        </div>

        {/* =================================================
            RESULTS HEADER
        ================================================= */}

        <div className="research-results-header">

          <span>
            RESEARCH PAPERS
          </span>

          <span>
            {String(
              filteredResearch.length
            ).padStart(2, "0")}{" "}
            FOUND
          </span>

        </div>

        {/* =================================================
            RESEARCH RESULTS
        ================================================= */}

        <div className="research-list">

          {paginatedResearch.map(
            (paper, index) => {

              const display =
                paper?.display || {};

              const paperId =
                paper?.id ||
                paper?.document_id ||
                index;

              return (
                <article
                  className="research-card"
                  key={paperId}
                >

                  {/* NUMBER */}

                  <div className="research-card-number">
                    {String(
                      (currentPage - 1) *
                        ITEMS_PER_PAGE +
                        index +
                        1
                    ).padStart(2, "0")}
                  </div>

                  {/* MAIN CONTENT */}

                  <div className="research-card-main">

                    <div className="research-card-top">

                      <div className="research-taxonomy">

                        <span>
                          {display.category ||
                            "Unclassified"}
                        </span>

                        <i>/</i>

                        <span>
                          {display.subcategory ||
                            "Research"}
                        </span>

                      </div>

                      <span className="research-year">
                        {display.year || "—"}
                      </span>

                    </div>

                    <h3>
                      {display.title ||
                        "Untitled Research"}
                    </h3>

                    <p>
                      {display.summary ||
                        "No summary available."}
                    </p>

                    {/* META */}

                    <div className="research-card-meta">

                      {display.expedition && (
                        <span>
                          {display.expedition}
                        </span>
                      )}

                      {display.sites?.length > 0 && (
                        <span>
                          {display.sites.join(
                            " · "
                          )}
                        </span>
                      )}

                      {display.pages && (
                        <span>
                          {display.pages} pages
                        </span>
                      )}

                    </div>

                    {/* TAGS */}

                    {display.tags?.length > 0 && (
                      <div className="research-tags">

                        {display.tags
                          .slice(0, 5)
                          .map(
                            (tag, tagIndex) => (
                              <span
                                key={`${tag}-${tagIndex}`}
                              >
                                #{tag}
                              </span>
                            )
                          )}

                      </div>
                    )}

                  </div>

                  {/* ACTION */}

                  <div className="research-card-action">

                    <span className="research-status">
                      {display.status ||
                        "UNKNOWN"}
                    </span>

                    <Link
                      href={`/research/${encodeURIComponent(
                        String(paperId)
                      )}`}
                    >
                      VIEW PAPER
                      <span>↗</span>
                    </Link>

                  </div>

                </article>
              );
            }
          )}

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {totalPages > 1 && (
          <div className="research-pagination">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(1, page - 1)
                )
              }
            >
              ← PREVIOUS
            </button>

            <div className="research-page-numbers">

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => index + 1
              )
                .filter((page) => {
                  return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(
                      page - currentPage
                    ) <= 2
                  );
                })
                .map(
                  (
                    page,
                    index,
                    pages
                  ) => {

                    const previous =
                      pages[index - 1];

                    return (
                      <React.Fragment
                        key={page}
                      >

                        {previous &&
                          page - previous >
                            1 && (
                            <span className="research-page-dots">
                              ...
                            </span>
                          )}

                        <button
                          type="button"
                          className={
                            currentPage === page
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setCurrentPage(page)
                          }
                        >
                          {String(page).padStart(
                            2,
                            "0"
                          )}
                        </button>

                      </React.Fragment>
                    );
                  }
                )}

            </div>

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                )
              }
            >
              NEXT →
            </button>

          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {filteredResearch.length === 0 && (
          <div className="research-empty">

            <div>
              NO MATCHING RESEARCH
            </div>

            <p>
              Try changing your search terms
              or removing some filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              CLEAR ALL FILTERS
            </button>

          </div>
        )}

        {/* =================================================
            DATASET INFORMATION
        ================================================= */}

        <div className="research-demo-note">

          <span>
            REPOSITORY
          </span>

          <p>
            Research records are loaded from
            the structured NCPOR extraction
            dataset. Classification, evidence
            and provenance are retained from
            the source records.
          </p>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   FILTER COMPONENT
   ========================================================= */

function Filter({
  label,
  value,
  setValue,
  options = [],
}) {
  return (
    <label>

      <span>
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </label>
  );
}