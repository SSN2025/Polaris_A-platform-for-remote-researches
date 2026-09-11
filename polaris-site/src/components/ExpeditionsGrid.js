import Link from "next/link";
import { expeditions } from "@/lib/expeditions";


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