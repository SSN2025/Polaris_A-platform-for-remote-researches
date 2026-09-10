import Link from "next/link";

export default function ExpeditionsHero() {
  return (
    <section id="expeditions-hero" className="expeditions-hero">
      <div
        className="expeditions-hero-bg"
        style={{ backgroundImage: "url('/images/expeditions-hero-bg.jpg')" }}
      />
      <div className="expeditions-hero-overlay" />

      <div className="expeditions-hero-content">

        <Link href="/" className="back-home-button">
          <span>←</span>
          BACK TO HOME
        </Link>
        
        <span className="section-index">EXPEDITIONS</span>
        
        <h1>
          Field Missions.
          <br />
          <em>Real Stations.</em>
        </h1>
        <p>
          A record of India&apos;s Antarctic expeditions — the stations,
          the teams, and the science carried out at the edge of the world.
        </p>
      </div>
    </section>
  );
}