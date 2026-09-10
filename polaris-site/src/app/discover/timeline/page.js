import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeline = [
  {
    year: "1983",
    number: "01",
    title: "Dakshin Gangotri",
    type: "FIRST INDIAN ANTARCTIC STATION",
    description:
      "India's first Antarctic research station marked the beginning of a sustained national presence in polar science.",
  },
  {
    year: "1989",
    number: "02",
    title: "Maitri",
    type: "SECOND ANTARCTIC STATION",
    description:
      "Maitri became a long-term base for multidisciplinary scientific research in the Antarctic.",
  },
  {
    year: "2012",
    number: "03",
    title: "Bharati",
    type: "THIRD ANTARCTIC STATION",
    description:
      "Bharati expanded India's research capabilities in the coastal East Antarctic region.",
  },
  {
    year: "TODAY",
    number: "04",
    title: "Connected Polar Knowledge",
    type: "DIGITAL RESEARCH ARCHIVE",
    description:
      "Research outputs can now be connected across expeditions, locations, scientific categories, publications, and media.",
  },
];

export default function TimelinePage() {
  return (
    <main className="polaris-site research-timeline-page">
      <Navbar />

      <section className="research-timeline-hero">
        <div className="research-timeline-grid" />

        <div className="research-timeline-hero-inner">
          <div className="research-timeline-navigation">
            <Link href="/" className="back-home-button">
              <span>←</span>
              BACK TO HOME
            </Link>

            <Link
              href="/discover"
              className="research-timeline-back"
            >
              ← BACK TO DISCOVER
            </Link>
          </div>

          <span className="section-index">
            04 / 03 — RESEARCH TIMELINE
          </span>

          <h1>
            Science
            <br />
            <em>through time.</em>
          </h1>

          <p>
            Trace the development of India&apos;s polar research journey
            through stations, expeditions, and the growing body of
            scientific knowledge.
          </p>
        </div>
      </section>

      <section className="research-timeline-intro">
        <div className="research-timeline-container">
          <div className="research-timeline-intro-label">
            POLAR RESEARCH / CHRONOLOGY
          </div>

          <div className="research-timeline-intro-content">
            <h2>
              From the first
              <br />
              <em>station to the archive.</em>
            </h2>

            <p>
              India&apos;s polar research story spans decades of field
              missions, scientific observations, stations, and
              publications. This timeline provides a contextual view
              of that journey.
            </p>
          </div>
        </div>
      </section>

      <section className="research-timeline-section">
        <div className="research-timeline-container">
          <div className="timeline-axis">
            <div className="timeline-axis-line" />

            {timeline.map((item) => (
              <article
                className="timeline-event"
                key={item.number}
              >
                <div className="timeline-year">
                  {item.year}
                </div>

                <div className="timeline-node">
                  <span />
                </div>

                <div className="timeline-event-content">
                  <span className="timeline-event-type">
                    {item.number} — {item.type}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  {item.title !== "TODAY" && (
                    <Link
                      href="/expeditions"
                      className="timeline-event-link"
                    >
                      EXPLORE EXPEDITIONS
                      <span>↗</span>
                    </Link>
                  )}

                  {item.title === "TODAY" && (
                    <Link
                      href="/research"
                      className="timeline-event-link"
                    >
                      EXPLORE RESEARCH
                      <span>↗</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="research-timeline-end">
        <div className="research-timeline-container">
          <span>THE RECORD CONTINUES</span>

          <h2>
            Explore the
            <br />
            <em>research itself.</em>
          </h2>

          <Link
            href="/research"
            className="timeline-research-button"
          >
            OPEN RESEARCH EXPLORER
            <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}