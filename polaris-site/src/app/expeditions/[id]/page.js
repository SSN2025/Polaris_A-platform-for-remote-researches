import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllResearch } from "@/lib/research";

const expeditions = {
  maitri: {
    name: "Maitri Station",
    location: "Schirmacher Oasis · East Antarctica",
    founded: "1989",
    status: "ACTIVE",
    code: "MAITRI",

    description:
      "India's second permanent Antarctic research station and a major base for multidisciplinary polar science.",

    stationTerms: [
      "maitri",
    ],
  },

  bharati: {
    name: "Bharati Station",
    location: "Larsemann Hills · East Antarctica",
    founded: "2012",
    status: "ACTIVE",
    code: "BHARATI",

    description:
      "India's third Antarctic station supporting research across ocean, atmospheric, biological, and earth sciences.",

    stationTerms: [
      "bharati",
      "larsemann",
    ],
  },

  "dakshin-gangotri": {
    name: "Dakshin Gangotri",
    location: "Queen Maud Land · East Antarctica",
    founded: "1983",
    status: "ARCHIVED",
    code: "DAKSHIN GANGOTRI",

    description:
      "India's first Antarctic research station and the beginning of the country's sustained scientific presence in Antarctica.",

    stationTerms: [
      "dakshin gangotri",
      "dakshin",
      "gangotri",
    ],
  },
};

/*
 * Build searchable text from the actual
 * structured research record.
 */
function getResearchText(paper) {
  try {
    return JSON.stringify(paper).toLowerCase();
  } catch {
    return "";
  }
}

/*
 * Determine whether a record is connected
 * to this station.
 */
function matchesStation(paper, expedition) {
  const text = getResearchText(paper);

  return expedition.stationTerms.some(
    (term) =>
      text.includes(
        term.toLowerCase()
      )
  );
}

export default async function ExpeditionDetailPage({
  params,
}) {
  const { id } = await params;

  const expedition = expeditions[id];

  if (!expedition) {
    notFound();
  }

  const research = getAllResearch();

  const expeditionResearch =
    research.filter((paper) =>
      matchesStation(
        paper,
        expedition
      )
    );

  return (
    <main className="polaris-site expedition-detail-page">
      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="expedition-detail-hero">

        <div className="expedition-detail-grid" />

        <div className="expedition-detail-container">

          <div className="expedition-detail-navigation">

            <Link
              href="/"
              className="back-home-button"
            >
              <span>←</span>
              BACK TO HOME
            </Link>

            <Link
              href="/expeditions"
              className="expedition-detail-back"
            >
              ← BACK TO EXPEDITIONS
            </Link>

          </div>

          <span className="section-index">
            EXPEDITION / {expedition.code}
          </span>

          <div className="expedition-detail-heading">

            <div>

              <h1>
                {expedition.name}
              </h1>

              <p>
                {expedition.description}
              </p>

            </div>

            <div className="expedition-detail-meta">

              <div>
                <span>
                  LOCATION
                </span>

                <strong>
                  {expedition.location}
                </strong>
              </div>

              <div>
                <span>
                  ESTABLISHED
                </span>

                <strong>
                  {expedition.founded}
                </strong>
              </div>

              <div>
                <span>
                  STATUS
                </span>

                <strong>
                  {expedition.status}
                </strong>
              </div>

              <div>
                <span>
                  RESEARCH RECORDS
                </span>

                <strong>
                  {expeditionResearch.length}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          EXPEDITION CONTENT
      ================================================= */}

      <section className="expedition-detail-content">

        <div className="expedition-detail-container">

          <div className="expedition-detail-intro">

            <span>
              EXPEDITION RECORD
            </span>

            <div>

              <h2>
                A gateway to
                <br />
                <em>
                  polar science.
                </em>
              </h2>

              <p>
                Explore research and
                documented outputs
                associated with this
                station and its
                scientific activity.
              </p>

            </div>

          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="expedition-detail-tabs">

            <Link
              href={`/research?site=${encodeURIComponent(
                expedition.name
              )}`}
              className="expedition-detail-tab active"
            >
              <span>
                01
              </span>

              Research

              <b>
                ↗
              </b>
            </Link>

            <Link
              href="/archive"
              className="expedition-detail-tab"
            >
              <span>
                02
              </span>

              Reports

              <b>
                ↗
              </b>
            </Link>

            <Link
              href="/archive"
              className="expedition-detail-tab"
            >
              <span>
                03
              </span>

              Datasets

              <b>
                ↗
              </b>
            </Link>

            <Link
              href="/archive"
              className="expedition-detail-tab"
            >
              <span>
                04
              </span>

              Media

              <b>
                ↗
              </b>
            </Link>

            <Link
              href="/archive"
              className="expedition-detail-tab"
            >
              <span>
                05
              </span>

              Publications

              <b>
                ↗
              </b>
            </Link>

          </div>

          {/* =================================================
              CONNECTED RESEARCH
          ================================================= */}

          <div className="expedition-research-preview">

            <div className="expedition-research-preview-header">

              <div>

                <span>
                  CONNECTED RESEARCH
                </span>

                <h3>
                  Research from
                  <br />
                  this station.
                </h3>

              </div>

              <Link
                href={`/research?site=${encodeURIComponent(
                  expedition.name
                )}`}
              >
                VIEW ALL
                <span>
                  ↗
                </span>
              </Link>

            </div>

            {expeditionResearch.length >
            0 ? (
              <div className="expedition-research-list">

                {expeditionResearch
                  .slice(0, 5)
                  .map(
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

                      return (
                        <Link
                          key={
                            paperId ||
                            `${display.title}-${index}`
                          }
                          href={
                            paperId
                              ? `/research/${encodeURIComponent(
                                  String(
                                    paperId
                                  )
                                )}`
                              : "/research"
                          }
                          className="expedition-research-item"
                        >

                          <span>
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <div>

                            <small>
                              {display.category ||
                                "RESEARCH"}
                            </small>

                            <h4>
                              {display.title ||
                                "Untitled Research"}
                            </h4>

                            <p>
                              {display.summary ||
                                "No summary available."}
                            </p>

                          </div>

                          <b>
                            ↗
                          </b>

                        </Link>
                      );
                    }
                  )}

              </div>
            ) : (
              <div className="expedition-research-empty">

                <span>
                  NO LINKED RESEARCH RECORDS
                </span>

                <p>
                  No research records
                  currently contain
                  identifiable station
                  information in the
                  structured repository.
                </p>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* =================================================
          DATA CONNECTION
      ================================================= */}

      <section className="expedition-detail-note">

        <div className="expedition-detail-container">

          <span>
            DATA CONNECTION
          </span>

          <p>
            Expedition pages connect
            station records with research,
            reports, datasets, media, and
            publications across the wider
            polar knowledge repository.
          </p>

        </div>

      </section>

      <Footer />
    </main>
  );
}