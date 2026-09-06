"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`site-navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">

        {/* Brand */}
        <a href="/" className="nav-brand" onClick={closeMenu}>
          <div className="brand-symbol">
            <span />
            <span />
            <span />
          </div>

          <div className="brand-text">
            <span className="brand-title">POLARIS</span>
            <span className="brand-subtitle">
              EARTH BEYOND BORDERS
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#observe">Observe</a>
          <a href="#research">Research</a>
          <a href="#expeditions">Expeditions</a>
          <a href="#archive">Archive</a>
          <a href="#discover">Discover</a>
          <a href="#about">About</a>
        </nav>

        {/* Right Controls */}
        <div className="nav-actions">

          <button
            className="nav-search"
            aria-label="Search"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 16L21 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <a href="#research" className="mission-button">
            <span>Mission Portal</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile menu */}
          <button
            className={`menu-button ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <nav>
          <a href="#observe" onClick={closeMenu}>
            Observe
          </a>

          <a href="#research" onClick={closeMenu}>
            Research
          </a>

          <a href="#expeditions" onClick={closeMenu}>
            Expeditions
          </a>

          <a href="#archive" onClick={closeMenu}>
            Archive
          </a>

          <a href="#discover" onClick={closeMenu}>
            Discover
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>
        </nav>

        <a
          href="#research"
          className="mobile-mission-button"
          onClick={closeMenu}
        >
          Mission Portal
          <span>↗</span>
        </a>
      </div>
    </header>
  );
}