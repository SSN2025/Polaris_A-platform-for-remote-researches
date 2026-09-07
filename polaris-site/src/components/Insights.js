import ObservationModal from "./ObservationModal";

export default function Insights() {
  return (
    <section id="insights" className="insights-section">
      <div
        className="insights-background"
        style={{ backgroundImage: "url('/images/insights-bg.jpg')" }}
      />
      <div className="insights-overlay" />

      <div className="insights-container">
        <span className="section-index">03 / 04</span>

        <div className="insights-layout">
          <div>
            <h2>
              On the Ground.
              <br />
              <em>For a Greater</em>
              <br />
              Picture.
            </h2>
          </div>

          <div className="insights-copy">
            <p>
              Every expedition creates another piece of the polar story.
              Explore field observations, photographs and research from
              scientists working at the edge of the world.
            </p>
            <ObservationModal />
          </div>
        </div>

        <div className="insight-bottom">
          <span>FIELD RESEARCH / ANTARCTICA</span>
          <span>SCIENCE · PEOPLE · PLANET</span>
        </div>
      </div>
    </section>
  );
}
