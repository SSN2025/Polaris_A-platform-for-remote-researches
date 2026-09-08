"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const archiveTypes = [
  {
    id: "reports",
    number: "01",
    title: "Reports",
    description:
      "Expedition reports and scientific documentation from India's polar missions.",
    count: "EXPEDITIONS",
    action: "READ REPORTS",
    icon: "01",
  },
  {
    id: "datasets",
    number: "02",
    title: "Datasets",
    description:
      "Scientific datasets supporting polar research, observation and analysis.",
    count: "SCIENTIFIC DATA",
    action: "EXPLORE DATA",
    icon: "02",
  },
  {
    id: "publications",
    number: "03",
    title: "Publications",
    description:
      "Journal articles, technical publications, books and research chapters.",
    count: "RESEARCH OUTPUT",
    action: "VIEW PUBLICATIONS",
    icon: "03",
  },
  {
    id: "photos",
    number: "04",
    title: "Photographs",
    description:
      "Visual records from Indian polar expeditions, stations and field research.",
    count: "VISUAL ARCHIVE",
    action: "OPEN PHOTO ARCHIVE",
    icon: "04",
  },
  {
    id: "videos",
    number: "05",
    title: "Videos",
    description:
      "Expedition footage, scientific stories and polar outreach material.",
    count: "MEDIA ARCHIVE",
    action: "WATCH VIDEOS",
    icon: "05",
  },
  {
    id: "activities",
    number: "06",
    title: "Institutional Activities",
    description:
      "Workshops, conferences, training programmes, outreach and institutional events.",
    count: "NCPOR ACTIVITIES",
    action: "VIEW ACTIVITIES",
    icon: "06",
  },
];

export default function ArchivePage() {
  const [activeType, setActiveType] = React.useState("all");

  const visibleTypes =
    activeType === "all"
      ? archiveTypes
      : archiveTypes.filter(
          (item) => item.id === activeType
        );

  return (
    <main className="archive-page">
      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="archive-hero">
        <div className="archive-hero-overlay" />

        <div className="archive-container archive-hero-inner">
          <a href="/" className="back-home-button">
            <span>←</span>
            BACK TO HOME
          </a>

          <div className="archive-section-index">
            03 / 07
          </div>

          <div className="archive-eyebrow">
            NCPOR DIGITAL ARCHIVE
          </div>

          <h1>
            The Polar
            <br />
            Archive
          </h1>

          <p>
            One place for the reports, datasets,
            publications, photographs, videos and
            institutional record of India&apos;s polar
            research.
          </p>

          <div className="archive-hero-meta">
            <span>
              RESEARCH · MEDIA · KNOWLEDGE
            </span>

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
                The archive connects scientific
                knowledge with the visual and
                institutional history of India&apos;s
                polar programme.
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
          <div className="archive-filter-label">
            BROWSE BY CONTENT TYPE
          </div>

          <div className="archive-filter">
            <button
              type="button"
              className={
                activeType === "all"
                  ? "active"
                  : ""
              }
              onClick={() => setActiveType("all")}
            >
              ALL
            </button>

            {archiveTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  activeType === item.id
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveType(item.id)
                }
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
                className="archive-card"
                key={item.id}
              >
                <div className="archive-card-top">
                  <span className="archive-card-number">
                    {item.number}
                  </span>

                  <span className="archive-card-count">
                    {item.count}
                  </span>
                </div>

                <div className="archive-card-icon">
                  {item.icon}
                </div>

                <div className="archive-card-content">
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>

                <div className="archive-card-bottom">
                  <span>ARCHIVE</span>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `${item.title} explorer will be connected to the archive dataset.`
                      )
                    }
                  >
                    {item.action}
                    <span>↗</span>
                  </button>
                </div>
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
              <span className="archive-dark-label">
                CONNECTED RESEARCH
              </span>

              <h2>
                The archive is
                <br />
                not a dead end.
              </h2>

              <p>
                Research papers connect the archive
                to expeditions, locations, evidence
                and the wider polar knowledge network.
              </p>
            </div>

            <Link
              href="/research"
              className="archive-research-button"
            >
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
              Preserve the source. Structure the
              knowledge. Make it discoverable.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}