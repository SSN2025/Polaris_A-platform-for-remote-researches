import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const discoveryItems = [
  {
    number: "01",
    label: "TOPICS",
    title: "Explore Polar Science",
    description:
      "Discover research through scientific themes, categories, and the questions shaping polar knowledge.",
    href: "/discover/topics",
  },
  {
    number: "02",
    label: "POLAR RESEARCH MAP",
    title: "Science Across the Ice",
    description:
      "Explore where Indian polar research happens and connect research outputs to their field locations.",
    href: "/discover/map",
  },
  {
    number: "03",
    label: "RESEARCH TIMELINE",
    title: "Science Through Time",
    description:
      "Trace India's polar research journey through expeditions, publications, and scientific output.",
    href: "/discover/timeline",
  },
];

export default function DiscoverPage() {
  return (
    <main className="polaris-site discover-page">
      <Navbar />

      <section className="discover-hero">
        <div className="discover-hero-grid" />

        <div className="discover-hero-inner">
          <Link href="/" className="back-home-button">
            <span>←</span>
            BACK TO HOME
          </Link>

          <span className="section-index">04 / DISCOVER</span>

          <h1>
            Find the
            <br />
            <em>Polar Story.</em>
          </h1>

          <p>
            Move beyond the archive. Explore India&apos;s polar research
            through topics, places, and time.
          </p>
        </div>
      </section>

      <section className="discover-intro">
        <div className="discover-container">
          <div className="discover-intro-label">
            DISCOVERY LAYER
          </div>

          <div className="discover-intro-content">
            <h2>
              One body of research.
              <br />
              <em>Three ways in.</em>
            </h2>

            <p>
              Polar knowledge is connected. A research paper belongs to a
              scientific field, a place, and a moment in India&apos;s
              expedition history. Discover lets you navigate those
              connections from different directions.
            </p>
          </div>
        </div>
      </section>

      <section className="discover-grid-section">
        <div className="discover-container">
          <div className="discover-grid">
            {discoveryItems.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="discover-card"
              >
                <div className="discover-card-top">
                  <span>{item.number}</span>
                  <span>↗</span>
                </div>

                <div className="discover-card-body">
                  <span className="discover-card-label">
                    {item.label}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>

                <div className="discover-card-footer">
                  EXPLORE
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}