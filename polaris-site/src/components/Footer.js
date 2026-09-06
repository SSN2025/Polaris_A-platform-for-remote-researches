export default function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="footer-main">

        <div className="footer-brand-block">
          <div className="footer-brand">
            <span className="footer-brand-symbol">P</span>

            <div>
              <h2>POLARIS</h2>
              <span>EARTH BEYOND BORDERS</span>
            </div>
          </div>

          <p>
            An integrated platform for polar science,
            knowledge and public understanding.
          </p>
        </div>

        <div className="footer-column">
          <span className="footer-heading">EXPLORE</span>

          <a href="#observe">Observe</a>
          <a href="#research">Research</a>
          <a href="#expeditions">Expeditions</a>
          <a href="#archive">Archive</a>
          <a href="#discover">Discover</a>
        </div>

        <div className="footer-column">
          <span className="footer-heading">RESEARCH</span>

          <a href="#research">Research Explorer</a>
          <a href="#research">Publications</a>
          <a href="#research">Datasets</a>
          <a href="#research">Field Research</a>
        </div>

        <div className="footer-column">
          <span className="footer-heading">PORTAL</span>

          <a href="#about">Methodology</a>
          <a href="#about">For Creators</a>
          <a href="#about">Accessibility</a>
          <a href="#about">NCPOR</a>
        </div>

      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">

        <span>
          © 2026 POLARIS · NCPOR
        </span>

        <span>
          INTEGRATED POLAR SCIENCE OUTREACH PORTAL
        </span>

        <a href="#top">
          BACK TO TOP ↑
        </a>

      </div>
    </footer>
  );
}