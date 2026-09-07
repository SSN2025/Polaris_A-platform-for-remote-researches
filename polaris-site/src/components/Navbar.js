"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="polaris-navbar">

      {/* BRAND */}
      <a
        className="polaris-brand"
        href="/"
        onClick={closeMenu}
      >
        <span className="brand-mark">P</span>
        <span>POLARIS</span>
      </a>

      {/* NAVIGATION */}
      <nav
        className={`polaris-nav ${
          menuOpen ? "open" : ""
        }`}
      >
        <a
          href="/expeditions"
          onClick={closeMenu}
        >
          EXPEDITIONS
        </a>

        <a
          href="/research"
          onClick={closeMenu}
        >
          RESEARCH
        </a>

        <a
          href="/archive"
          onClick={closeMenu}
        >
          ARCHIVE
        </a>

        <a
          href="/#insights"
          onClick={closeMenu}
        >
          DISCOVER
        </a>

        <a
          href="/creators"
          onClick={closeMenu}
        >
          FOR CREATORS
        </a>

        <a
          href="/about"
          onClick={closeMenu}
        >
          ABOUT
        </a>
      </nav>

      {/* RIGHT SIDE */}
      <div className="navbar-right">

        <button
          className="search-button"
          type="button"
          aria-label="Search Polaris"
        >
          ⌕
        </button>

        <a
          className="mission-button"
          href="/research"
          onClick={closeMenu}
        >
          ENTER PORTAL
          <span>↗</span>
        </a>

        <button
          className="menu-button"
          type="button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>

      </div>

    </header>
  );
}