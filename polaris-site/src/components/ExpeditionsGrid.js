const expeditions = [
  {
    id: "maitri",
    name: "Maitri Station",
    location: "Schirmacher Oasis, East Antarctica",
    founded: "1989",
    status: "ACTIVE",
    image: "/images/expedition-maitri.jpg",
    summary:
      "India's primary year-round research station, supporting glaciology, atmospheric science and biology programmes.",
  },
  {
    id: "bharati",
    name: "Bharati Station",
    location: "Larsemann Hills, East Antarctica",
    founded: "2012",
    status: "ACTIVE",
    image: "/images/expedition-bharati.jpg",
    summary:
      "India's newest station, built on modular stilted architecture, focused on geosciences and remote sensing.",
  },
  {
    id: "gangotri",
    name: "Dakshin Gangotri",
    location: "Queen Maud Land, East Antarctica",
    founded: "1983",
    status: "ARCHIVED",
    image: "/images/expedition-gangotri.jpg",
    summary:
      "India's first Antarctic station, now buried under ice, marking the start of the national polar programme.",
  },
];

export default function ExpeditionsGrid() {
  return (
    <section id="expeditions-grid" className="expeditions-grid-section">
      <div className="expeditions-grid">
        {expeditions.map((exp) => (
          <article className="expedition-card" key={exp.id}>
            <div
              className="expedition-card-image"
              style={{ backgroundImage: `url('${exp.image}')` }}
            />
            <div className="expedition-card-body">
              <div className="expedition-card-top">
                <span
                  className={`status ${
                    exp.status === "ARCHIVED" ? "archived" : ""
                  }`}
                >
                  <i />
                  {exp.status}
                </span>
                <span className="expedition-founded">Est. {exp.founded}</span>
              </div>
              <h3>{exp.name}</h3>
              <p className="expedition-location">{exp.location}</p>
              <p className="expedition-summary">{exp.summary}</p>
              <a href="#" className="outline-button small">
                VIEW STATION
                <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}