import FilmModal from "./FilmModal";

export default function Hero() {
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
          <span>TEMPERATURE</span>
          <strong>−18°C</strong>
        </div>
        <div className="data-block">
          <span>WIND</span>
          <strong>24 KM/H</strong>
        </div>
        <div className="data-block">
          <span>VISIBILITY</span>
          <strong>18 KM</strong>
        </div>
        <div className="data-block">
          <span>STATUS</span>
          <strong>FIELD ACTIVE</strong>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="scroll-line" />
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}
