export default function HumanInsights() {
  return (
    <section className="insights-section" id="insights">
      <div className="insights-background" />
      <div className="insights-overlay" />

      <div className="insights-container">
        <div className="insights-top">
          <span className="insights-label">
            FIELD RESEARCH · 05
          </span>

          <span className="insights-location">
            ANTARCTICA / MAITRI STATION
          </span>
        </div>

        <div className="insights-main">
          <div className="insights-heading">
            <span className="vertical-label">
              ON THE GROUND
            </span>

            <h2>
              For a Greater
              <br />
              <em>Picture.</em>
            </h2>
          </div>

          <div className="insights-copy">
            <div className="quote-mark">“</div>

            <p>
              Every observation tells a story. Every measurement
              becomes part of a much larger picture of our planet.
            </p>

            <div className="researcher-info">
              <div className="researcher-line" />

              <div>
                <strong>FIELD OBSERVATION</strong>
                <span>
                  POLAR RESEARCH EXPEDITION
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="insights-bottom">
          <div className="insight-stat">
            <span>RESEARCH STATION</span>
            <strong>MAITRI</strong>
          </div>

          <div className="insight-stat">
            <span>OBSERVATION TYPE</span>
            <strong>FIELD DATA</strong>
          </div>

          <div className="insight-stat">
            <span>REGION</span>
            <strong>QUEEN MAUD LAND</strong>
          </div>

          <a href="#research" className="insights-link">
            <span>Explore field research</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}