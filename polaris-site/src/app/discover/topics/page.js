import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const topics = [
  {
    number: "01",
    title: "Atmospheric Sciences",
    description:
      "Research into Antarctic atmosphere, weather, climate processes, and atmospheric observations.",
  },
  {
    number: "02",
    title: "Biological Sciences",
    description:
      "Polar ecosystems, microorganisms, biodiversity, and biological processes in extreme environments.",
  },
  {
    number: "03",
    title: "Earth Sciences",
    description:
      "Geological, geomorphological, and geophysical understanding of polar environments.",
  },
  {
    number: "04",
    title: "Environmental Sciences",
    description:
      "Studies of Antarctic environments, ecosystems, pollution, and environmental change.",
  },
  {
    number: "05",
    title: "Glaciology",
    description:
      "Ice, glaciers, snow, ice-sheet processes, and their response to changing conditions.",
  },
  {
    number: "06",
    title: "Ocean Sciences",
    description:
      "Polar oceans, marine systems, sea ice, circulation, and interactions between ocean and atmosphere.",
  },
  {
    number: "07",
    title: "Space & Upper Atmosphere",
    description:
      "Research involving the upper atmosphere, ionospheric processes, and polar space science.",
  },
  {
    number: "08",
    title: "Human & Social Sciences",
    description:
      "Human activity, logistics, operational environments, and the wider social dimension of polar research.",
  },
  {
    number: "09",
    title: "Technology & Engineering",
    description:
      "Technologies, instruments, infrastructure, and engineering systems supporting polar research.",
  },
  {
    number: "10",
    title: "Climate & Cryosphere",
    description:
      "Long-term interactions between climate systems, snow, ice, oceans, and the polar environment.",
  },
];

export default function TopicsPage() {
  return (
    <main className="polaris-site topics-page">
      <Navbar />

      <section className="topics-hero">
        <div className="topics-hero-grid" />

        <div className="topics-hero-inner">
          <div className="topics-navigation">
            <Link href="/" className="back-home-button">
              <span>←</span>
              BACK TO HOME
            </Link>

            <Link href="/discover" className="topics-back">
              ← BACK TO DISCOVER
            </Link>
          </div>

          <span className="section-index">04 / 01 — TOPICS</span>

          <h1>
            Explore
            <br />
            <em>Polar Science.</em>
          </h1>

          <p>
            Navigate India's polar research through the scientific
            disciplines and themes represented across the knowledge
            repository.
          </p>
        </div>
      </section>

      <section className="topics-section">
        <div className="topics-container">
          <div className="topics-section-heading">
            <span>SCIENCE INDEX</span>

            <p>
              Browse the research landscape by scientific category.
              Each topic connects to the research outputs within the
              repository.
            </p>
          </div>

          <div className="topics-grid">
            {topics.map((topic) => (
              <Link
                href={`/research?category=${encodeURIComponent(
                  topic.title
                )}`}
                className="topic-card"
                key={topic.number}
              >
                <div className="topic-card-number">
                  {topic.number}
                </div>

                <div className="topic-card-content">
                  <h2>{topic.title}</h2>

                  <p>{topic.description}</p>
                </div>

                <div className="topic-card-arrow">
                  EXPLORE
                  <span>↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="topics-footer-section">
        <div className="topics-container">
          <div className="topics-footer-inner">
            <span>LOOKING FOR SOMETHING SPECIFIC?</span>

            <div>
              <h2>
                Search the
                <br />
                <em>research archive.</em>
              </h2>

              <Link href="/research" className="topics-research-link">
                OPEN RESEARCH EXPLORER
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}