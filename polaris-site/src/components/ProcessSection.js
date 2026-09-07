const processItems = [
  {
    number: "01",
    title: "OBSERVATION",
    text: "Field teams collect observations, measurements and environmental signals across polar regions.",
  },
  {
    number: "02",
    title: "DOCUMENTATION",
    text: "Research reports, publications, photographs and datasets become part of the knowledge archive.",
  },
  {
    number: "03",
    title: "EXTRACTION",
    text: "Scientific information is structured into accessible knowledge while preserving its original evidence.",
  },
  {
    number: "04",
    title: "VERIFICATION",
    text: "Extracted information is checked against source documents before entering the public repository.",
  },
  {
    number: "05",
    title: "OUTREACH",
    text: "Verified knowledge becomes understandable stories, facts and resources for wider audiences.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="process-section">
      <div
        className="process-background"
        style={{ backgroundImage: "url('/images/process-bg.jpg')" }}
      />
      <div className="process-overlay" />

      <div className="process-introduction">
        <span className="section-index dark">02 / 04</span>
        <h2>
          From Observation
          <br />
          <em>to Action.</em>
        </h2>
        <p>
          Polar science does more than describe a changing environment. It
          gives us the evidence to understand what comes next.
        </p>
      </div>

      <div className="process-list">
        {processItems.map((item) => (
          <article className="process-item" key={item.number}>
            <span className="process-number">{item.number}</span>
            <div className="process-copy">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <span className="process-arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
