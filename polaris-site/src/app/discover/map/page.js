import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const locations = [
  {
    number: "01",
    name: "Maitri Station",
    region: "Schirmacher Oasis · East Antarctica",
    description:
      "India's second permanent Antarctic research station and a major base for multidisciplinary polar science.",
  },
  {
    number: "02",
    name: "Bharati Station",
    region: "Larsemann Hills · East Antarctica",
    description:
      "India's third Antarctic station supporting research across ocean, atmospheric, biological, and earth sciences.",
  },
  {
    number: "03",
    name: "Schirmacher Oasis",
    region: "Queen Maud Land · Antarctica",
    description:
      "A distinctive ice-free Antarctic landscape surrounding Maitri and supporting diverse field observations.",
  },
  {
    number: "04",
    name: "Larsemann Hills",
    region: "Princess Elizabeth Land · Antarctica",
    description:
      "A coastal Antarctic region associated with India's Bharati station and extensive scientific activity.",
  },
];

export default function PolarResearchMapPage() {
  return (
    <main className="polaris-site polar-map-page">
      <Navbar />

      <section className="polar-map-hero">
        <div className="polar-map-atmosphere" />
        <div className="polar-map-image" />
        <div className="polar-map-lines" />

        <div className="polar-map-hero-inner">
          <div className="polar-map-navigation">
            <Link href="/" className="back-home-button">
              <span>←</span>
              BACK TO HOME
            </Link>

            <Link href="/discover" className="polar-map-back">
              ← BACK TO DISCOVER
            </Link>
          </div>

          <span className="section-index">
            04 / 02 — POLAR RESEARCH MAP
          </span>

          <h1>
            Science
            <br />
            <em>has a place.</em>
          </h1>

          <p>
            Explore the locations connected to India&apos;s polar research
            and see how scientific activity extends across the Antarctic
            landscape.
          </p>
        </div>
      </section>

      <section className="polar-map-section">
        <div className="polar-map-container">
          <div className="polar-map-heading">
            <div>
              <span>FIELD LOCATIONS</span>
              <h2>
                Research
                <br />
                <em>on the map.</em>
              </h2>
            </div>

            <p>
              Research sites are extracted from the repository&apos;s
              structured records. Select a location to explore the
              research associated with that place.
            </p>
          </div>

          <div className="polar-map-visual">
            <div className="polar-globe">
              <div className="polar-globe-ring ring-one" />
              <div className="polar-globe-ring ring-two" />
              <div className="polar-globe-ring ring-three" />

              <div className="polar-globe-center">
                <span>ANTARCTICA</span>
                <strong>70°S</strong>
              </div>

              <div className="map-marker marker-one">
                <span />
                <small>MAITRI</small>
              </div>

              <div className="map-marker marker-two">
                <span />
                <small>BHARATI</small>
              </div>

              <div className="map-marker marker-three">
                <span />
                <small>SCHIRMACHER</small>
              </div>

              <div className="map-marker marker-four">
                <span />
                <small>LARSEMANN</small>
              </div>
            </div>

            <div className="polar-map-meta">
              <span>MAP / 01</span>
              <span>INDIAN POLAR RESEARCH</span>
              <span>ANTARCTIC REGION</span>
            </div>
          </div>
        </div>
      </section>

      <section className="polar-locations-section">
        <div className="polar-map-container">
          <div className="polar-locations-header">
            <span>LOCATION INDEX</span>

            <p>
              Browse the principal locations represented in the
              current discovery layer.
            </p>
          </div>

          <div className="polar-locations-grid">
            {locations.map((location) => (
              <Link
                href={`/research?site=${encodeURIComponent(
                  location.name
                )}`}
                className="polar-location-card"
                key={location.number}
              >
                <div className="polar-location-number">
                  {location.number}
                </div>

                <div className="polar-location-content">
                  <span>{location.region}</span>

                  <h3>{location.name}</h3>

                  <p>{location.description}</p>
                </div>

                <div className="polar-location-action">
                  VIEW RESEARCH
                  <span>↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="polar-map-note">
        <div className="polar-map-container">
          <div>
            <span>DISCOVERY LOGIC</span>
          </div>

          <p>
            Locations are treated as a discovery dimension of the
            research repository, connecting scientific outputs with
            their documented research sites.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}