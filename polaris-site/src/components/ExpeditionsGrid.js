import Link from "next/link";

const expeditions = [
  {
    id: "maitri",
    name: "Maitri Station",
    location: "Schirmacher Oasis · East Antarctica",
    founded: "1989",
    status: "ACTIVE",
    image: "/images/expedition-maitri.jpg",
    description:
      "India's second permanent Antarctic research station and a major base for multidisciplinary polar science.",
  },
  {
    id: "bharati",
    name: "Bharati Station",
    location: "Larsemann Hills · East Antarctica",
    founded: "2012",
    status: "ACTIVE",
    image: "/images/expedition-bharati.jpg",
    description:
      "India's third Antarctic station supporting research across ocean, atmospheric, biological, and earth sciences.",
  },
  {
    id: "dakshin-gangotri",
    name: "Dakshin Gangotri",
    location: "Queen Maud Land · East Antarctica",
    founded: "1983",
    status: "ARCHIVED",
    image: "/images/expedition-gangotri.jpg",
    description:
      "India's first Antarctic research station and the beginning of the country's sustained scientific presence in Antarctica.",
  },
];

export default function ExpeditionsGrid() {
  return (
    <section className="expeditions-grid-section">
      <div className="expeditions-container">
        <div className="expeditions-grid">
          {expeditions.map((expedition) => (
            <article
              className="expedition-card"
              key={expedition.id}
            >
              <div
                className="expedition-card-image"
                style={{
                  backgroundImage: `url('${expedition.image}')`,
                }}
              />

              <div className="expedition-card-overlay" />

              <div className="expedition-card-content">
                <div className="expedition-card-top">
                  <span>{expedition.status}</span>
                  <span>{expedition.founded}</span>
                </div>

                <div className="expedition-card-main">
                  <span className="expedition-location">
                    {expedition.location}
                  </span>

                  <h2>{expedition.name}</h2>

                  <p>{expedition.description}</p>
                </div>

                <Link
                  href={`/expeditions/${expedition.id}`}
                  className="expedition-card-link"
                >
                  VIEW EXPEDITION
                  <span>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}