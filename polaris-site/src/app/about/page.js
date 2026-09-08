import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pipeline = [
  {
    number: "01",
    title: "SOURCE",
    description:
      "NCPOR research documents, reports, publications, and scientific records form the foundation of the repository.",
  },
  {
    number: "02",
    title: "EXTRACT",
    description:
      "Documents are processed to extract structured bibliographic, scientific, taxonomy, and content information.",
  },
  {
    number: "03",
    title: "CLASSIFY",
    description:
      "Research is organized into scientific categories, subcategories, tags, expeditions, and research sites.",
  },
  {
    number: "04",
    title: "VERIFY",
    description:
      "AI-assisted extraction is accompanied by evidence and confidence information before human verification.",
  },
  {
    number: "05",
    title: "DISCOVER",
    description:
      "The structured knowledge base connects research across expeditions, locations, topics, publications, and media.",
  },
  {
    number: "06",
    title: "OUTREACH",
    description:
      "Verified research can be transformed into accessible material for educators, creators, and the wider public.",
  },
];

export default function AboutPage() {
  return (
    <main className="polaris-site about-page">
      <Navbar />

      <section className="about-hero">
        <div className="about-hero-grid" />

        <div className="about-hero-inner">
          <div className="about-navigation">
            <Link href="/" className="back-home-button">
              <span>←</span>
              BACK TO HOME
            </Link>
          </div>

          <span className="section-index">07 / ABOUT</span>

          <h1>
            Making
            <br />
            <em>polar science visible.</em>
          </h1>

          <p>
            POLARIS is an integrated knowledge and outreach layer for
            India's polar research — connecting scientific records with
            the people who need to discover, understand, and communicate
            them.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <div className="about-container">
          <div className="about-label">
            THE IDEA
          </div>

          <div className="about-mission-content">
            <h2>
              From scattered
              <br />
              documents to
              <br />
              <em>connected knowledge.</em>
            </h2>

            <p>
              Polar research produces valuable scientific knowledge
              across expeditions, reports, datasets, publications,
              photographs, videos, and institutional activities.
            </p>

            <p>
              POLARIS brings these outputs into a structured discovery
              environment where research can be explored by expedition,
              scientific discipline, location, and time.
            </p>
          </div>
        </div>
      </section>

      <section className="about-methodology">
        <div className="about-container">
          <div className="about-methodology-header">
            <div>
              <span>METHODOLOGY</span>

              <h2>
                Archive.
                <br />
                Structure.
                <br />
                <em>Verify.</em>
              </h2>
            </div>

            <p>
              The platform combines automated extraction with evidence
              tracking and human verification so that structured
              research remains traceable to its original source.
            </p>
          </div>

          <div className="about-pipeline">
            {pipeline.map((item) => (
              <article
                className="about-pipeline-item"
                key={item.number}
              >
                <span className="about-pipeline-number">
                  {item.number}
                </span>

                <div>
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="about-container">
          <div className="about-principles-label">
            DESIGN PRINCIPLES
          </div>

          <div className="about-principles-content">
            <div className="about-principle">
              <span>01</span>
              <h3>Evidence First</h3>
              <p>
                Important classifications and extracted information
                should remain connected to their source evidence.
              </p>
            </div>

            <div className="about-principle">
              <span>02</span>
              <h3>Human Verified</h3>
              <p>
                AI assists the extraction process; human verification
                remains part of the knowledge pipeline.
              </p>
            </div>

            <div className="about-principle">
              <span>03</span>
              <h3>Built for Discovery</h3>
              <p>
                Research should be discoverable through multiple
                connected dimensions instead of a single document list.
              </p>
            </div>

            <div className="about-principle">
              <span>04</span>
              <h3>Made for Outreach</h3>
              <p>
                Scientific knowledge can be made more understandable
                without replacing the original research.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-container">
          <span>EXPLORE THE KNOWLEDGE BASE</span>

          <h2>
            Start with
            <br />
            <em>the research.</em>
          </h2>

          <Link
            href="/research"
            className="about-research-button"
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