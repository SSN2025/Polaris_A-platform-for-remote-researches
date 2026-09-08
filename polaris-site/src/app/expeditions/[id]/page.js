import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const expeditions = {
  maitri: {
    name: "Maitri Station",
    location: "Schirmacher Oasis · East Antarctica",
    founded: "1989",
    status: "ACTIVE",
    code: "MAITRI",
    description:
      "India's second permanent Antarctic research station and a major base for multidisciplinary polar science.",
    sections: [
      "Overview",
      "Research",
      "Reports",
      "Datasets",
      "Media",
      "Publications",
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
    sections: [
      "Overview",
      "Research",
      "Reports",
      "Datasets",
      "Media",
      "Publications",
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
    sections: [
      "Overview",
      "Research",
      "Reports",
      "Datasets",
      "Media",
      "Publications",
    ],
  },
};

export default async function ExpeditionDetailPage({
  params,
}) {
  const { id } = await params;

  const expedition = expeditions[id];

  if (!expedition) {
    notFound();
  }

  return (
    <main className="polaris-site expedition-detail-page">
      <Navbar />

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
              <h1>{expedition.name}</h1>

              <p>{expedition.description}</p>
            </div>

            <div className="expedition-detail-meta">
              <div>
                <span>LOCATION</span>
                <strong>{expedition.location}</strong>
              </div>

              <div>
                <span>ESTABLISHED</span>
                <strong>{expedition.founded}</strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong>{expedition.status}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="expedition-detail-content">
        <div className="expedition-detail-container">
          <div className="expedition-detail-intro">
            <span>EXPEDITION RECORD</span>

            <div>
              <h2>
                A gateway to
                <br />
                <em>polar science.</em>
              </h2>

              <p>
                Explore research and documented outputs
                associated with this expedition and station.
              </p>
            </div>
          </div>

          <div className="expedition-detail-tabs">
            {expedition.sections.map((section, index) => (
              <Link
                key={section}
                href={
                  section === "Research"
                    ? "/research"
                    : "/archive"
                }
                className={
                  index === 0
                    ? "expedition-detail-tab active"
                    : "expedition-detail-tab"
                }
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {section}

                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="expedition-detail-note">
        <div className="expedition-detail-container">
          <span>DATA CONNECTION</span>

          <p>
            Expedition pages will connect to research,
            reports, datasets, media, and publications as
            those content collections are populated.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}