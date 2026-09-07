"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="polaris-navbar">
      <a className="polaris-brand" href="#hero">
        <span className="brand-mark">P</span>
        <span>POLARIS</span>
      </a>

      <nav className={`polaris-nav ${menuOpen ? "open" : ""}`}>
        <a href="/expeditions" onClick={() => setMenuOpen(false)}>
          EXPEDITIONS
        </a>
        <a href="/#process" onClick={() => setMenuOpen(false)}>
          RESEARCH
        </a>
        <a href="/#insights" onClick={() => setMenuOpen(false)}>
          DISCOVER
        </a>
        <a href="/#footer" onClick={() => setMenuOpen(false)}>
          ABOUT
        </a>
      </nav>

      <div className="navbar-right">
        <button className="search-button">⌕</button>

        <a className="mission-button" href="#monitoring">
          ENTER PORTAL
          <span>↗</span>
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}