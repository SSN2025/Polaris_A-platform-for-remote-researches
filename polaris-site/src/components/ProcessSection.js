export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Observe",
      description: "Satellite, sensors and field data",
      icon: "⌁",
    },
    {
      number: "02",
      title: "Collect",
      description: "Real-time & historical data",
      icon: "◉",
    },
    {
      number: "03",
      title: "Analyze",
      description: "AI-driven insights",
      icon: "⌁",
    },
    {
      number: "04",
      title: "Forecast",
      description: "Localised predictions",
      icon: "☁",
    },
    {
      number: "05",
      title: "Respond",
      description: "Early warnings & action",
      icon: "◇",
    },
  ];

  return (
    <section className="process-section" id="process">
      <div className="process-mountain-layer" />

      <div className="process-container">

        <div className="process-intro">
          <div className="process-label">
            <span>OUR PROCESS</span>
          </div>

          <h2>
            From Observation
            <br />
            <em>to Action.</em>
          </h2>

          <p>
            Turning data into decisions — for people,
            ecosystems and a better tomorrow.
          </p>

          <a href="#research" className="process-button">
            <span>How It Works</span>
            <span>→</span>
          </a>
        </div>

        <div className="process-steps">
          {steps.map((step, index) => (
            <div className="process-step" key={step.number}>

              <div className="process-step-number">
                {step.number}
              </div>

              <div className="process-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

              {index < steps.length - 1 && (
                <div className="process-arrow">→</div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}