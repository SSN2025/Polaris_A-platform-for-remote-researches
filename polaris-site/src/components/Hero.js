import FilmModal from "./FilmModal";
import { getAllResearch } from "@/lib/research";
import { expeditions } from "@/lib/expeditions";

async function getArchiveStats() {
  const allResearch = await getAllResearch();

  const uniqueSites = new Set();
  allResearch.forEach((paper) => {
    if (Array.isArray(paper?.content?.research_sites)) {
      paper.content.research_sites.forEach((site) =>
        uniqueSites.add(site)
      );
    }
  });

  return {
    researchCount: allResearch.length,
    expeditionCount: expeditions.length,
    siteCount: uniqueSites.size,
  };
}

export default async function Hero() {
  const stats = await getArchiveStats();
  return (
    <section id="hero" className="hero-section">
      <div
        className="hero-background"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="hero-overlay" />
      <div className="hero-vignette" />
      <div className="hero-grain" />

      <div className="hero-location">
        <span>ANTARCTICA</span>
        <i />
        <span>INDIAN POLAR RESEARCH PROGRAMME</span>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow-line" />
          INTEGRATED POLAR SCIENCE PORTAL
        </div>

        <h1>
          Listening to a
          <br />
          <em>Colder</em> Tomorrow
        </h1>

        <p className="hero-description">
          Discover the science, stories and observations shaping our
          understanding of Earth&apos;s polar regions.
        </p>

        <div className="hero-buttons">
          <a className="primary-button" href="#monitoring">
            EXPLORE DATA
            <span>↗</span>
          </a>
          <FilmModal />
        </div>
      </div>

      <div className="hero-coordinates">
        <span>70°45′S</span>
        <span>11°44′E</span>
      </div>

            <div className="hero-data">
        <div className="data-block">
          <span>RESEARCH RECORDS</span>
          <strong>{stats.researchCount}</strong>
        </div>
        <div className="data-block">
          <span>EXPEDITIONS</span>
          <strong>{stats.expeditionCount}</strong>
        </div>
        <div className="data-block">
          <span>RESEARCH SITES</span>
          <strong>{stats.siteCount}</strong>
        </div>
        <div className="data-block">
          <span>STATUS</span>
          <strong>ARCHIVE LIVE</strong>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="scroll-line" />
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}
