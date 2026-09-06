"use client";

import { useState } from "react";

const stations = [
  { name: "Research Station", type: "MAITRI", x: 48, y: 30 },
  { name: "Satellite Link", type: "ORBITAL", x: 29, y: 48 },
  { name: "Sensor Node", type: "FIELD SENSOR", x: 70, y: 50 },
  { name: "Observation", type: "FIELD DATA", x: 53, y: 69 },
];

export default function Home() {
  const [activeStation, setActiveStation] = useState(0);
  const [filmOpen, setFilmOpen] = useState(false);
  const [observationOpen, setObservationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <main className="polaris-site">

      {/* ================= NAVBAR ================= */}

      <header className="polaris-navbar">

        <button
          className="polaris-brand"
          onClick={() => goTo("home")}
        >
          <span className="brand-symbol">△</span>

          <span className="brand-name">
            <strong>POLARIS</strong>
            <small>EARTH BEYOND BORDERS</small>
          </span>
        </button>

        <nav className={`polaris-nav ${menuOpen ? "mobile-open" : ""}`}>
          <button onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("monitoring")}>Explore</button>
          <button onClick={() => goTo("monitoring")}>Data</button>
          <button onClick={() => goTo("process")}>Forecast</button>
          <button onClick={() => goTo("insights")}>Report</button>
          <button onClick={() => goTo("footer")}>About</button>
        </nav>

        <div className="navbar-right">
          <button
            className="search-button"
            onClick={() => goTo("monitoring")}
            aria-label="Search"
          >
            ⌕
          </button>

          <button
            className="mission-button"
            onClick={() => goTo("monitoring")}
          >
            Mission Portal
            <span>→</span>
          </button>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="hero-section" id="home">

        <div className="hero-background" />
        <div className="hero-overlay" />

        <div className="hero-content">

          <div className="hero-eyebrow">
            OBSERVE
            <span>•</span>
            UNDERSTAND
            <span>•</span>
            PROTECT
          </div>

          <h1>
            Listening
            <br />
            to a Colder
            <br />
            Tomorrow
          </h1>

          <p className="hero-description">
            A unified platform for environmental intelligence,
            <br />
            combining satellite data, local observations and
            <br />
            AI-driven forecasts — for a safer, more resilient planet.
          </p>

          <div className="hero-buttons">

            <button
              className="light-button"
              onClick={() => goTo("monitoring")}
            >
              Explore Data
              <span>↗</span>
            </button>

            <button
              className="outline-button"
              onClick={() => setFilmOpen(true)}
            >
              Watch Film
              <span>▷</span>
            </button>

          </div>

          <div className="weather-data">

            <div>
              <strong>-28.6°C</strong>
              <small>CURRENT TEMP</small>
            </div>

            <div>
              <strong>12 km/h</strong>
              <small>WIND SPEED</small>
            </div>

            <div>
              <strong>8.2 km</strong>
              <small>VISIBILITY</small>
            </div>

          </div>

        </div>


        <div className="hero-coordinates">
          <strong>72° 18′ S</strong>
          <strong>103° 42′ E</strong>

          <small>
            ANTARCTICA
            <br />
            RESEARCH ZONE
          </small>
        </div>


        <button
          className="hero-scroll"
          onClick={() => goTo("monitoring")}
        >
          <span>▶</span>
          <div>
            SCROLL
            <br />
            TO EXPLORE
          </div>
        </button>

      </section>


      {/* ================= MONITORING ================= */}

      <section
        className="monitoring-section"
        id="monitoring"
      >

        <div className="monitoring-side">
          A
          <br />
          CLEARER
          <br />
          SAFER
          <br />
          PLANET
          <br />
          BEGINS
          <br />
          WITH
          <br />
          UNDERSTANDING

          <i />
        </div>


        <div className="monitoring-map">

          <img
            src="/images/map-bg.png"
            alt="Antarctica monitoring map"
          />

          {stations.map((station, index) => (

            <button
              key={station.name}
              className={`station-node ${
                activeStation === index ? "active" : ""
              }`}
              style={{
                left: `${station.x}%`,
                top: `${station.y}%`,
              }}
              onClick={() => setActiveStation(index)}
            >

              <span className="station-dot" />

              <span className="station-label">
                <strong>{station.name}</strong>
                <small>{station.type}</small>
              </span>

            </button>

          ))}

        </div>


        <div className="monitoring-content">

          <div className="section-label">
            REAL-TIME MONITORING
          </div>

          <h2>
            A Clearer View
            <br />
            <em>of Tomorrow.</em>
          </h2>

          <p>
            Integrating satellite, sensor and human observations
            to deliver accurate local forecasts and early warnings.
          </p>

          <div className="section-line" />

          <div className="monitoring-stats">

            <div>
              <strong>50+</strong>
              <span>Active Sensors</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Research Stations</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Live Data</span>
            </div>

          </div>

          <div className="network-status">
            <span />
            NETWORK OPERATIONAL
          </div>

        </div>

      </section>


      {/* ================= PROCESS ================= */}

      <section
        className="process-section"
        id="process"
      >

        <img
          className="process-background"
          src="/images/process-bg.png"
          alt=""
        />

        <div className="process-overlay" />


        <div className="process-introduction">

          <div className="section-label dark">
            OUR PROCESS
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

          <button
            className="dark-button"
            onClick={() => goTo("monitoring")}
          >
            How It Works
            <span>→</span>
          </button>

        </div>


        <div className="process-list">

          {[
            {
              number: "01",
              title: "Observe",
              icon: "⌁",
              text: "Satellite, sensors and field data",
            },
            {
              number: "02",
              title: "Collect",
              icon: "◎",
              text: "Real-time & historical data",
            },
            {
              number: "03",
              title: "Analyze",
              icon: "⌁",
              text: "AI-driven insights",
            },
            {
              number: "04",
              title: "Forecast",
              icon: "☁",
              text: "Localised predictions",
            },
            {
              number: "05",
              title: "Respond",
              icon: "◇",
              text: "Early warnings & action",
            },
          ].map((step) => (

            <button
              className="process-item"
              key={step.number}
              onClick={() => goTo("monitoring")}
            >

              <small>{step.number}</small>

              <strong>{step.title}</strong>

              <span className="process-icon">
                {step.icon}
              </span>

              <p>{step.text}</p>

            </button>

          ))}

        </div>

      </section>


      {/* ================= HUMAN INSIGHTS ================= */}

      <section
        className="insights-section"
        id="insights"
      >

        <img
          className="insights-background"
          src="/images/insights-bg.png"
          alt=""
        />

        <div className="insights-overlay" />


        <div className="insights-container">

          <div className="section-label">
            HUMAN INSIGHTS
          </div>


          <div className="insights-layout">

            <div className="insights-main">

              <h2>
                On the Ground.
                <br />
                <em>For a Greater Picture.</em>
              </h2>

              <p>
                Researchers and local observers contribute
                essential real-world insights, making our
                forecasts more accurate and actionable.
              </p>

              <button
                className="light-button"
                onClick={() => setObservationOpen(true)}
              >
                Submit Observation
                <span>→</span>
              </button>

            </div>


            <blockquote>

              “Every observation
              <br />
              brings us closer to a safer
              <br />
              tomorrow.”

              <small>
                — Field Researcher
                <br />
                Antarctica Mission
              </small>

            </blockquote>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer
        className="polar-footer"
        id="footer"
      >

        <img
          src="/images/footer-bg.png"
          alt=""
        />

        <div className="footer-overlay" />

        <div className="footer-content">

          <p>
            For People. For Ecosystems. For Tomorrow.
          </p>

          <small>
            POLARIS · EARTH BEYOND BORDERS
          </small>

        </div>

      </footer>


      {/* ================= FILM MODAL ================= */}

      {filmOpen && (

        <div
          className="modal-backdrop"
          onClick={() => setFilmOpen(false)}
        >

          <div
            className="film-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setFilmOpen(false)}
            >
              ×
            </button>

            <div className="film-screen">

              <div className="film-title">
                POLARIS
              </div>

              <div className="film-subtitle">
                FIELD RESEARCH FILM
              </div>

              <div className="film-play">
                ▶
              </div>

            </div>

          </div>

        </div>

      )}


      {/* ================= OBSERVATION MODAL ================= */}

      {observationOpen && (

        <div
          className="modal-backdrop"
          onClick={() => setObservationOpen(false)}
        >

          <form
            className="observation-modal"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              alert("Observation submitted successfully.");
              setObservationOpen(false);
            }}
          >

            <button
              type="button"
              className="modal-close"
              onClick={() => setObservationOpen(false)}
            >
              ×
            </button>

            <div className="section-label dark">
              FIELD OBSERVATION
            </div>

            <h2>
              Submit an Observation
            </h2>

            <input
              required
              type="text"
              placeholder="Location"
            />

            <input
              required
              type="text"
              placeholder="Observation type"
            />

            <textarea
              required
              placeholder="Describe your observation"
            />

            <button
              className="dark-button"
              type="submit"
            >
              Submit Observation →
            </button>

          </form>

        </div>

      )}

    </main>
  );
}