"use client";

export default function Hero() {
  return (
    <section className="exact-hero" id="observe">

      {/* HERO IMAGE */}
      <div className="exact-hero-bg" />

      {/* IMAGE DARKENING */}
      <div className="exact-hero-overlay" />

      {/* NAV */}

      {/* HERO CONTENT */}
      <div className="exact-hero-content">

        <div className="exact-eyebrow">
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

        <p>
          A unified platform for environmental intelligence,
          combining satellite data, local observations and
          AI-driven forecasts — for a safer, more resilient planet.
        </p>

        <div className="exact-buttons">

          <a href="#monitoring" className="exact-primary">
            Explore Data
            <span>↗</span>
          </a>

          <a href="#insights" className="exact-secondary">
            Watch Film
            <span>▷</span>
          </a>

        </div>

      </div>

      {/* COORDINATES */}
      <div className="exact-coordinates">

        <div className="coordinate-rule" />

        <strong>72° 18′ S</strong>
        <strong>103° 42′ E</strong>

        <small>
          ANTARCTICA
          <br />
          RESEARCH ZONE
        </small>

      </div>

      {/* WEATHER */}
      <div className="exact-weather">

        <div className="exact-weather-item">
          <strong>-28.6°C</strong>
          <span>CURRENT TEMP</span>
        </div>

        <div className="exact-weather-divider" />

        <div className="exact-weather-item">
          <strong>12 km/h</strong>
          <span>WIND SPEED</span>
        </div>

        <div className="exact-weather-divider" />

        <div className="exact-weather-item">
          <strong>8.2 km</strong>
          <span>VISIBILITY</span>
        </div>

      </div>

      {/* SCROLL */}
      <a href="#monitoring" className="exact-scroll">

        <div className="exact-scroll-circle">
          <span>▶</span>
        </div>

        <div>
          SCROLL
          <br />
          TO EXPLORE
        </div>

      </a>

      {/* BOTTOM BORDER */}
      <div className="exact-hero-border" />

    </section>
  );
}