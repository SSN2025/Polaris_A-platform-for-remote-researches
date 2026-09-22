"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/*
 * Archive content types (structure doc §7).
 *
 * "available" types are backed by real, on-disk NCPOR data
 * right now. Everything else is honestly marked as pending —
 * the extraction pipeline doesn't produce these content types
 * yet, so this shows a clear "coming soon" state instead of
 * faking counts or synthetic items (locked-schema principle:
 * report unavailable rather than approximate).
 */

function buildArchiveTypes(reportsCount, expeditionsCount) {
  return [
    {
      id: "reports",
      number: "01",
      title: "Reports",
      description:
        "Every extracted NCPOR expedition report, introduction and scientific paper — evidence-backed and searchable.",
      count: `${reportsCount} DOCUMENTS`,
      action: "READ REPORTS",
      href: "/research",
      available: true,
    },
    {
      id: "publications",
      number: "02",
      title: "Publications",
      description:
        "Journal articles, technical publications, books and chapters — distinct from expedition reports.",
      count: "PENDING PIPELINE",
      action: "VIEW PUBLICATIONS",
      available: false,
    },
    {
      id: "datasets",
      number: "03",
      title: "Datasets",
      description:
        "Scientific datasets supporting polar research, observation and analysis.",
      count: "PENDING PIPELINE",
      action: "EXPLORE DATA",
      available: false,
    },
    {
      id: "photos",
      number: "04",
      title: "Photographs",
      description:
        "Visual records from Indian polar expeditions, stations and field research.",
      count: "PENDING PIPELINE",
      action: "OPEN PHOTO ARCHIVE",
      available: false,
    },
    {
      id: "videos",
      number: "05",
      title: "Videos",
      description:
        "Expedition footage, scientific stories and polar outreach material.",
      count: "PENDING PIPELINE",
      action: "WATCH VIDEOS",
      available: false,
    },
    {
      id: "activities",
      number: "06",
      title: "Institutional Activities",
      description:
        "Workshops, conferences, training programmes, outreach and institutional events.",
      count: "PENDING PIPELINE",
      action: "VIEW ACTIVITIES",
      available: false,
    },
  ];
}

export default function ArchiveClient({ reportsCount, expeditionsCount }) {
  const archiveTypes = buildArchiveTypes(reportsCount, expeditionsCount);
  const [activeType, setActiveType] = React.useState("all");
  const [noticeId, setNoticeId] = React.useState(null);

  const visibleTypes =
    activeType === "all"
      ? archiveTypes
      : archiveTypes.filter((item) => item.id === activeType);

  return (
    <main className="archive-page">
      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="archive-hero">
        <div className="archive-hero-overlay" />

        <div className="archive-container archive-hero-inner">
          <Link href="/" className="back-home-button">
            <span>←</span>
            BACK TO HOME
          </Link>

          <div className="archive-section-index">03 / 07</div>

          <div className="archive-eyebrow">NCPOR DIGITAL ARCHIVE</div>

          <h1>
            The Polar
            <br />
            Archive
          </h1>

          <p>
            One place for the reports, datasets, publications,
            photographs, videos and institutional record of India&apos;s
            polar research.
          </p>

          <div className="archive-hero-meta">
            <span>RESEARCH · MEDIA · KNOWLEDGE</span>
            <span>NCPOR</span>
          </div>
        </div>
      </section>

      {/* =================================================
          ARCHIVE INTRO
      ================================================= */}

      <section className="archive-intro">
        <div className="archive-container">
          <div className="archive-intro-grid">
            <div className="archive-label">
              <span>01</span>
              ARCHIVE INDEX
            </div>

            <div>
              <h2>
                Explore the
                <br />
                complete record.
              </h2>

              <p>
                {reportsCount} documents across {expeditionsCount} expeditions
                are already extracted, evidence-linked and searchable. The
                remaining archive types below light up as the data pipeline
                extends past research papers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          FILTER
      ================================================= */}

      <section className="archive-navigation">
        <div className="archive-container">
          <div className="archive-filter-label">BROWSE BY CONTENT TYPE</div>

          <div className="archive-filter">
            <button
              type="button"
              className={activeType === "all" ? "active" : ""}
              onClick={() => setActiveType("all")}
            >
              ALL
            </button>

            {archiveTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={activeType === item.id ? "active" : ""}
                onClick={() => setActiveType(item.id)}
              >
                {item.title.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          ARCHIVE CARDS
      ================================================= */}

      <section className="archive-grid-section">
        <div className="archive-container">
          <div className="archive-grid">
            {visibleTypes.map((item) => (
              <article
                className={`archive-card${item.available ? "" : " archive-card-pending"}`}
                key={item.id}
              >
                <div className="archive-card-top">
                  <span className="archive-card-number">{item.number}</span>
                  <span className="archive-card-count">{item.count}</span>
                </div>

                <div className="archive-card-icon">{item.number}</div>

                <div className="archive-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="archive-card-bottom">
                  <span>ARCHIVE</span>

                  {item.available ? (
                    <Link href={item.href} className="archive-card-link">
                      {item.action}
                      <span>↗</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setNoticeId(noticeId === item.id ? null : item.id)
                      }
                    >
                      {item.action}
                      <span>↗</span>
                    </button>
                  )}
                </div>

                {!item.available && noticeId === item.id ? (
                  <p className="archive-card-notice">
                    Not yet available — the NCPOR extraction pipeline
                    currently produces research-paper records only.
                    {item.title} will appear here once that data type is
                    part of the pipeline output.
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          RESEARCH CONNECTION
      ================================================= */}

      <section className="archive-research">
        <div className="archive-container">
          <div className="archive-research-inner">
            <div>
              <span className="archive-dark-label">CONNECTED RESEARCH</span>

              <h2>
                The archive is
                <br />
                not a dead end.
              </h2>

              <p>
                Research papers connect the archive to expeditions,
                locations, evidence and the wider polar knowledge network.
              </p>
            </div>

            <Link href="/research" className="archive-research-button">
              EXPLORE RESEARCH
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          FOOTER NOTE
      ================================================= */}

      <section className="archive-note">
        <div className="archive-container">
          <div className="archive-note-grid">
            <span>ARCHIVE PRINCIPLE</span>

            <p>
              Preserve the source. Structure the knowledge. Make it
              discoverable.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
