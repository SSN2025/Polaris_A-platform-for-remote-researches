"use client";

import React from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

const ALL_CATEGORIES = "All categories";
const ALL_SUBCATEGORIES = "All subcategories";
const ALL_YEARS = "All years";
const ALL_SITES = "All research sites";
const ALL_EXPEDITIONS = "All expeditions";
const ALL_KEYWORDS = "All keywords";

const ITEMS_PER_PAGE = 12;

const SITE_TERMS = {
  "Maitri Station": ["maitri"],
  "Bharati Station": ["bharati", "larsemann"],
  "Dakshin Gangotri": [
    "dakshin gangotri",
    "dakshin",
    "gangotri",
  ],
  "Schirmacher Oasis": ["schirmacher"],
  "Larsemann Hills": ["larsemann"],
  Arctic: ["arctic"],
};

/*
 * =========================================================
 * HELPERS
 * =========================================================
 */

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function getFullResearchText(paper) {
  try {
    return JSON.stringify(paper).toLowerCase();
  } catch {
    return "";
  }
}

/*
 * =========================================================
 * RESEARCH SITE MATCHING
 * =========================================================
 */

function matchesResearchSite(
  paper,
  selectedSite
) {
  if (selectedSite === ALL_SITES) {
    return true;
  }

  const researchText =
    getFullResearchText(paper);

  const terms =
    SITE_TERMS[selectedSite] || [
      selectedSite,
    ];

  return terms.some((term) =>
    researchText.includes(
      normalize(term)
    )
  );
}

/*
 * =========================================================
 * FILTER COMPONENT
 * =========================================================
 */

function Filter({
  label,
  value,
  setValue,
  options = [],
}) {
  return (
    <label>
      <span>{label}</span>

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

/*
 * =========================================================
 * MAIN COMPONENT
 * =========================================================
 */

export default function ResearchInterface({
  research = [],
}) {
  const searchParams =
    useSearchParams();

  const router = useRouter();

  /*
   * =========================================================
   * URL PARAMETERS
   * =========================================================
   */

  const urlQuery =
    searchParams.get("q") || "";

  const urlCategory =
    searchParams.get("category") || "";

  const urlSubcategory =
    searchParams.get("subcategory") || "";

  const urlYear =
    searchParams.get("year") || "";

  const urlSite =
    searchParams.get("site") || "";

  const urlExpedition =
    searchParams.get("expedition") || "";

  const urlKeyword =
    searchParams.get("keyword") || "";

  /*
   * =========================================================
   * SEARCH
   * =========================================================
   */

  const [search, setSearch] =
    React.useState(urlQuery);

  /*
   * =========================================================
   * AVAILABLE YEARS
   * =========================================================
   */

  const availableYears =
    React.useMemo(() => {
      const values = research
        .map(
          (paper) =>
            paper?.display?.year ??
            paper?.bibliographic?.year
        )
        .filter(
          (value) =>
            value !== null &&
            value !== undefined &&
            String(value).trim() !== ""
        )
        .map(String);

      return Array.from(
        new Set(values)
      ).sort(
        (a, b) =>
          Number(b) - Number(a)
      );
    }, [research]);

  /*
   * =========================================================
   * FILTER STATE
   * =========================================================
   */

  const [category, setCategory] =
    React.useState(
      urlCategory || ALL_CATEGORIES
    );

  const [subcategory, setSubcategory] =
    React.useState(
      urlSubcategory ||
        ALL_SUBCATEGORIES
    );

  const [year, setYear] =
    React.useState(
      urlYear || ALL_YEARS
    );

  const [site, setSite] =
    React.useState(
      urlSite || ALL_SITES
    );

  const [expedition, setExpedition] =
    React.useState(
      urlExpedition ||
        ALL_EXPEDITIONS
    );

  const [keyword, setKeyword] =
    React.useState(
      urlKeyword || ALL_KEYWORDS
    );

  const [currentPage, setCurrentPage] =
    React.useState(1);

  /*
   * =========================================================
   * ACTUAL DATASET CATEGORIES
   * =========================================================
   */

  const categories =
    React.useMemo(() => {
      const values = research
        .map(
          (paper) =>
            paper?.display?.category
        )
        .filter(Boolean);

      return [
        ALL_CATEGORIES,
        ...Array.from(
          new Set(values)
        ).sort((a, b) =>
          String(a).localeCompare(
            String(b)
          )
        ),
      ];
    }, [research]);

  /*
   * =========================================================
   * ACTUAL DATASET SUBCATEGORIES
   * =========================================================
   *
   * When a category is selected, only subcategories
   * belonging to that category are shown.
   */

  const subcategories =
    React.useMemo(() => {
      let source = research;

      if (
        category !==
        ALL_CATEGORIES
      ) {
        source = source.filter(
          (paper) =>
            normalize(
              paper?.display?.category
            ) ===
            normalize(category)
        );
      }

      const values = source
        .map(
          (paper) =>
            paper?.display
              ?.subcategory
        )
        .filter(Boolean);

      return [
        ALL_SUBCATEGORIES,
        ...Array.from(
          new Set(values)
        ).sort((a, b) =>
          String(a).localeCompare(
            String(b)
          )
        ),
      ];
    }, [
      research,
      category,
    ]);

  /*
   * =========================================================
   * ACTUAL DATASET EXPEDITIONS
   * =========================================================
   */

  const expeditions =
    React.useMemo(() => {
      const values = research
        .map(
          (paper) =>
            paper?.display?.expedition
        )
        .filter(Boolean);

      return [
        ALL_EXPEDITIONS,
        ...Array.from(
          new Set(values)
        ).sort((a, b) =>
          String(a).localeCompare(
            String(b)
          )
        ),
      ];
    }, [research]);

  /*
   * =========================================================
   * RESEARCH SITES
   * =========================================================
   */

  const sites =
    React.useMemo(() => {
      const values =
        research.flatMap(
          (paper) =>
            Array.isArray(
              paper?.display?.sites
            )
              ? paper.display.sites
              : []
        );

      const datasetSites =
        Array.from(
          new Set(values)
        )
          .filter(Boolean)
          .sort((a, b) =>
            String(a).localeCompare(
              String(b)
            )
          );

      const locationSites =
        Object.keys(SITE_TERMS);

      return [
        ALL_SITES,
        ...Array.from(
          new Set([
            ...locationSites,
            ...datasetSites,
          ])
        ),
      ];
    }, [research]);

  /*
   * =========================================================
   * KEYWORDS
   * =========================================================
   *
   * Uses both:
   * content.keywords
   * taxonomy.tags
   */

  const keywords =
    React.useMemo(() => {
      const values =
        research.flatMap(
          (paper) => {
            const display =
              paper?.display || {};

            const paperKeywords =
              Array.isArray(
                display.keywords
              )
                ? display.keywords
                : [];

            const tags =
              Array.isArray(
                display.tags
              )
                ? display.tags
                : [];

            return [
              ...paperKeywords,
              ...tags,
            ];
          }
        );

      return [
        ALL_KEYWORDS,
        ...Array.from(
          new Set(
            values
              .filter(Boolean)
              .map((value) =>
                String(value).trim()
              )
              .filter(Boolean)
          )
        )
          .sort((a, b) =>
            String(a).localeCompare(
              String(b)
            )
          )
          .slice(0, 100),
      ];
    }, [research]);

  /*
   * =========================================================
   * URL → FILTER STATE
   * =========================================================
   */

  React.useEffect(() => {
    setSearch(urlQuery);

    setCategory(
      urlCategory || ALL_CATEGORIES
    );

    setSubcategory(
      urlSubcategory ||
        ALL_SUBCATEGORIES
    );

    setYear(
      urlYear || ALL_YEARS
    );

    setSite(
      urlSite || ALL_SITES
    );

    setExpedition(
      urlExpedition ||
        ALL_EXPEDITIONS
    );

    setKeyword(
      urlKeyword || ALL_KEYWORDS
    );

    setCurrentPage(1);
  }, [
    urlQuery,
    urlCategory,
    urlSubcategory,
    urlYear,
    urlSite,
    urlExpedition,
    urlKeyword,
  ]);

  /*
   * =========================================================
   * FILTER STATE → URL
   * =========================================================
   */

  React.useEffect(() => {
    const params =
      new URLSearchParams();

    if (search.trim()) {
      params.set(
        "q",
        search.trim()
      );
    }

    if (
      category !==
      ALL_CATEGORIES
    ) {
      params.set(
        "category",
        category
      );
    }

    if (
      subcategory !==
      ALL_SUBCATEGORIES
    ) {
      params.set(
        "subcategory",
        subcategory
      );
    }

    if (year !== ALL_YEARS) {
      params.set(
        "year",
        year
      );
    }

    if (site !== ALL_SITES) {
      params.set(
        "site",
        site
      );
    }

    if (
      expedition !==
      ALL_EXPEDITIONS
    ) {
      params.set(
        "expedition",
        expedition
      );
    }

    if (
      keyword !==
      ALL_KEYWORDS
    ) {
      params.set(
        "keyword",
        keyword
      );
    }

    const queryString =
      params.toString();

    const nextUrl =
      queryString
        ? `/research?${queryString}`
        : "/research";

    const currentUrl =
      window.location.pathname +
      window.location.search;

    if (currentUrl !== nextUrl) {
      router.replace(
        nextUrl,
        {
          scroll: false,
        }
      );
    }
  }, [
    search,
    category,
    subcategory,
    year,
    site,
    expedition,
    keyword,
    router,
  ]);

  /*
   * =========================================================
   * RESET INVALID SUBCATEGORY
   * =========================================================
   */

  React.useEffect(() => {
    if (
      subcategory !==
        ALL_SUBCATEGORIES &&
      !subcategories.some(
        (item) =>
          normalize(item) ===
          normalize(subcategory)
      )
    ) {
      setSubcategory(
        ALL_SUBCATEGORIES
      );
    }
  }, [
    subcategory,
    subcategories,
  ]);

  /*
   * =========================================================
   * FILTER RESEARCH
   * =========================================================
   */

  const filteredResearch =
    React.useMemo(() => {
      const query =
        search
          .toLowerCase()
          .trim();

      return research.filter(
        (paper) => {
          const display =
            paper?.display || {};

          /*
           * COMPLETE SEARCHABLE RECORD
           */

          const searchableText = [
            display.title,
            display.summary,
            display.category,
            display.subcategory,
            display.expedition,

            ...(Array.isArray(
              display.sites
            )
              ? display.sites
              : []),

            ...(Array.isArray(
              display.keywords
            )
              ? display.keywords
              : []),

            ...(Array.isArray(
              display.tags
            )
              ? display.tags
              : []),

            getFullResearchText(
              paper
            ),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !query ||
            searchableText.includes(
              query
            );

          /*
           * CATEGORY
           */

          const matchesCategory =
            category ===
              ALL_CATEGORIES ||
            normalize(
              display.category
            ) ===
              normalize(category);

          /*
           * SUBCATEGORY
           */

          const matchesSubcategory =
            subcategory ===
              ALL_SUBCATEGORIES ||
            normalize(
              display.subcategory
            ) ===
              normalize(
                subcategory
              );

          /*
           * YEAR
           */

          const matchesYear =
            year === ALL_YEARS ||
            normalize(
              display.year
            ) ===
              normalize(year);

          /*
           * SITE
           */

          const matchesSite =
            matchesResearchSite(
              paper,
              site
            );

          /*
           * EXPEDITION
           */

          const matchesExpedition =
            expedition ===
              ALL_EXPEDITIONS ||
            normalize(
              display.expedition
            ) ===
              normalize(
                expedition
              );

          /*
           * KEYWORD
           */

          const paperKeywords = [
            ...(Array.isArray(
              display.keywords
            )
              ? display.keywords
              : []),

            ...(Array.isArray(
              display.tags
            )
              ? display.tags
              : []),
          ];

          const matchesKeyword =
            keyword ===
              ALL_KEYWORDS ||
            paperKeywords.some(
              (item) =>
                normalize(item) ===
                normalize(keyword)
            );

          return (
            matchesSearch &&
            matchesCategory &&
            matchesSubcategory &&
            matchesYear &&
            matchesSite &&
            matchesExpedition &&
            matchesKeyword
          );
        }
      );
    }, [
      research,
      search,
      category,
      subcategory,
      year,
      site,
      expedition,
      keyword,
    ]);

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages =
    Math.ceil(
      filteredResearch.length /
        ITEMS_PER_PAGE
    );

  const safeCurrentPage =
    Math.max(
      1,
      Math.min(
        currentPage,
        Math.max(
          1,
          totalPages
        )
      )
    );

  const paginatedResearch =
    React.useMemo(() => {
      const start =
        (safeCurrentPage - 1) *
        ITEMS_PER_PAGE;

      return filteredResearch.slice(
        start,
        start + ITEMS_PER_PAGE
      );
    }, [
      filteredResearch,
      safeCurrentPage,
    ]);

  /*
   * =========================================================
   * RESET PAGINATION
   * =========================================================
   */

  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    subcategory,
    year,
    site,
    expedition,
    keyword,
  ]);

  /*
   * =========================================================
   * RESET FILTERS
   * =========================================================
   */

  function clearFilters() {
    setSearch("");
    setCategory(
      ALL_CATEGORIES
    );
    setSubcategory(
      ALL_SUBCATEGORIES
    );
    setYear(ALL_YEARS);
    setSite(ALL_SITES);
    setExpedition(
      ALL_EXPEDITIONS
    );
    setKeyword(
      ALL_KEYWORDS
    );
    setCurrentPage(1);
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

            <h2>
              Find a paper
            </h2>
          </div>

          <div className="research-result-count">

            <strong>
              {
                filteredResearch.length
              }
            </strong>

            <span>
              RESULTS
            </span>

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
              setSearch(
                event.target.value
              )
            }
            placeholder="Search research, papers, topics, locations..."
            aria-label="Search research"
          />

          {search && (
            <button
              type="button"
              className="research-clear-search"
              onClick={() =>
                setSearch("")
              }
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
              setValue={
                setExpedition
              }
              options={
                expeditions
              }
            />

            <Filter
              label="CATEGORY"
              value={category}
              setValue={
                setCategory
              }
              options={
                categories
              }
            />

            <Filter
              label="SUBCATEGORY"
              value={
                subcategory
              }
              setValue={
                setSubcategory
              }
              options={
                subcategories
              }
            />

            <Filter
              label="YEAR"
              value={year}
              setValue={setYear}
              options={[
                ALL_YEARS,
                ...availableYears,
              ]}
            />

            <Filter
              label="RESEARCH SITE"
              value={site}
              setValue={setSite}
              options={sites}
            />

            <Filter
              label="KEYWORD"
              value={keyword}
              setValue={setKeyword}
              options={keywords}
            />

          </div>

          <button
            type="button"
            className="research-reset"
            onClick={
              clearFilters
            }
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
            ).padStart(
              2,
              "0"
            )}{" "}
            FOUND
          </span>

        </div>

        {/* =================================================
            RESEARCH RESULTS
        ================================================= */}

        <div className="research-list">

          {paginatedResearch.map(
            (
              paper,
              index
            ) => {
              const display =
                paper?.display ||
                {};

              const paperId =
                paper?.id ||
                paper?.document_id;

              const resultNumber =
                (safeCurrentPage -
                  1) *
                  ITEMS_PER_PAGE +
                index +
                1;

              return (
                <article
                  className="research-card"
                  key={
                    paperId
                      ? String(
                          paperId
                        )
                      : `${
                          display.title ||
                          "research"
                        }-${index}`
                  }
                >

                  {/* NUMBER */}

                  <div className="research-card-number">

                    {String(
                      resultNumber
                    ).padStart(
                      2,
                      "0"
                    )}

                  </div>

                  {/* MAIN CONTENT */}

                  <div className="research-card-main">

                    <div className="research-card-top">

                      <div className="research-taxonomy">

                        <span>
                          {
                            display.category ||
                            "Unclassified"
                          }
                        </span>

                        <i>
                          /
                        </i>

                        <span>
                          {
                            display.subcategory ||
                            "Research"
                          }
                        </span>

                      </div>

                      <span className="research-year">

                        {
                          display.year ||
                          "—"
                        }

                      </span>

                    </div>

                    <h3>
                      {
                        display.title ||
                        "Untitled Research"
                      }
                    </h3>

                    <p>
                      {
                        display.summary ||
                        "No summary available."
                      }
                    </p>

                    {/* META */}

                    <div className="research-card-meta">

                      {
                        display.expedition && (
                          <span>
                            {
                              display.expedition
                            }
                          </span>
                        )
                      }

                      {
                        Array.isArray(
                          display.sites
                        ) &&
                        display.sites
                          .length >
                          0 && (
                          <span>
                            {
                              display.sites.join(
                                " · "
                              )
                            }
                          </span>
                        )
                      }

                      {
                        display.pages && (
                          <span>
                            {
                              display.pages
                            }{" "}
                            pages
                          </span>
                        )
                      }

                    </div>

                    {/* TAGS */}

                    {
                      Array.isArray(
                        display.tags
                      ) &&
                      display.tags
                        .length >
                        0 && (
                        <div className="research-tags">

                          {
                            display.tags
                              .slice(
                                0,
                                5
                              )
                              .map(
                                (
                                  tag,
                                  tagIndex
                                ) => (
                                  <span
                                    key={`${tag}-${tagIndex}`}
                                  >
                                    #
                                    {
                                      tag
                                    }
                                  </span>
                                )
                              )
                          }

                        </div>
                      )
                    }

                  </div>

                  {/* ACTION */}

                  <div className="research-card-action">

                    <span className="research-status">

                      {
                        display.status ||
                        "UNKNOWN"
                      }

                    </span>

                    {
                      paperId && (
                        <Link
                          href={`/research/${encodeURIComponent(
                            String(
                              paperId
                            )
                          )}`}
                        >
                          VIEW PAPER

                          <span>
                            ↗
                          </span>

                        </Link>
                      )
                    }

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
              disabled={
                safeCurrentPage ===
                1
              }
              onClick={() =>
                setCurrentPage(
                  (page) =>
                    Math.max(
                      1,
                      page - 1
                    )
                )
              }
            >
              ← PREVIOUS
            </button>

            <div className="research-page-numbers">

              {
                Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (
                    _,
                    index
                  ) =>
                    index + 1
                )
                  .filter(
                    (page) =>
                      page === 1 ||
                      page ===
                        totalPages ||
                      Math.abs(
                        page -
                          safeCurrentPage
                      ) <= 2
                  )
                  .map(
                    (
                      page,
                      index,
                      pages
                    ) => {

                      const previous =
                        pages[
                          index - 1
                        ];

                      return (
                        <React.Fragment
                          key={
                            page
                          }
                        >

                          {
                            previous &&
                            page -
                              previous >
                              1 && (
                              <span className="research-page-dots">
                                ...
                              </span>
                            )
                          }

                          <button
                            type="button"
                            className={
                              safeCurrentPage ===
                              page
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              setCurrentPage(
                                page
                              )
                            }
                          >
                            {String(
                              page
                            ).padStart(
                              2,
                              "0"
                            )}
                          </button>

                        </React.Fragment>
                      );
                    }
                  )
              }

            </div>

            <button
              type="button"
              disabled={
                safeCurrentPage ===
                totalPages
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

        {
          filteredResearch.length ===
            0 && (
            <div className="research-empty">

              <div>
                NO MATCHING RESEARCH
              </div>

              <p>
                Try changing your
                search terms or
                removing some
                filters.
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
              >
                CLEAR ALL FILTERS
              </button>

            </div>
          )
        }

        {/* =================================================
            DATASET INFORMATION
        ================================================= */}

        <div className="research-demo-note">

          <span>
            REPOSITORY
          </span>

          <p>
            Research records are
            loaded from the structured
            NCPOR extraction dataset.
            Classification, evidence
            and provenance are retained
            from the source records.
          </p>

        </div>

      </div>
    </section>
  );
}