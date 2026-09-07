export default function Footer() {
  return (
    <footer id="footer" className="polar-footer">
      <div
        className="footer-background"
        style={{ backgroundImage: "url('/images/footer-bg.jpg')" }}
      />
      <div className="footer-overlay" />

      <div className="footer-content">
        <span className="section-index dark">04 / 04</span>

        <h2>
          For People.
          <br />
          For Ecosystems.
          <br />
          <em>For Tomorrow.</em>
        </h2>

        <div className="footer-bottom">
          <div>
            <span className="footer-label">POLARIS</span>
            <p>
              Integrated Polar Science Outreach,
              <br />
              Knowledge Repository &amp; Media Portal
            </p>
          </div>

          <div className="footer-links">
            <a href="#hero">HOME</a>
            <a href="#monitoring">EXPEDITIONS</a>
            <a href="#process">RESEARCH</a>
            <a href="#insights">DISCOVER</a>
          </div>

          <div className="footer-meta">
            <span>NCPOR / MOES</span>
            <span>SIH 2026 · PS 26063</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
