import StationMonitor from "./StationMonitor";

export default function Monitoring() {
  return (
    <section id="monitoring" className="monitoring-section">
      <div
        className="monitoring-map"
        style={{ backgroundImage: "url('/images/map-bg.jpg')" }}
      />
      <div className="monitoring-overlay" />

      <div className="monitoring-side">
        <span className="section-index">01 / 04</span>
        <h2>
          Observe
          <br />
          <em>the Polar</em>
          <br />
          Frontier.
        </h2>
        <p>
          A living view of research stations, expeditions and scientific
          activity across Antarctica.
        </p>
        <a className="outline-button" href="#process">
          VIEW RESEARCH
          <span>↗</span>
        </a>
      </div>

      <StationMonitor />

      <div className="network-status">
        <span className="network-dot" />
        POLAR MONITORING NETWORK
        <strong>ONLINE</strong>
      </div>
    </section>
  );
}
