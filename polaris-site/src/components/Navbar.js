"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import GlobalSearch from "./GlobalSearch";

const navItems = [
  {
    label: "EXPEDITIONS",
    href: "/expeditions",
  },
  {
    label: "RESEARCH",
    href: "/research",
  },
  {
    label: "ARCHIVE",
    href: "/archive",
  },
  {
    label: "DISCOVER",
    href: "/discover",
  },
  {
    label: "FOR CREATORS",
    href: "/creators",
  },
  {
    label: "ABOUT",
    href: "/about",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);


  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    
    <header className="polaris-navbar">
      <Link
        href="/"
        className="polaris-brand"
        onClick={closeMenu}
        aria-label="POLARIS home"
      >
        <span className="brand-mark">P</span>
        <span>POLARIS</span>
      </Link>

      <nav
        id="polaris-primary-navigation"
        className={`polaris-nav ${menuOpen ? "open" : ""
          }`}
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className={
              isActive(item.href)
                ? "active"
                : ""
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="navbar-right">
        <button
          className="search-button"
          type="button"
          aria-label="Search Polaris"
        >
          ⌕
        </button>

        <Link
          href="/research"
          className="mission-button"
          onClick={closeMenu}
        >
          ENTER PORTAL
          <span>↗</span>
        </Link>

        <button
          className="menu-button"
          type="button"
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="polaris-primary-navigation"
        >
          <span />
          <span />
        </button>
        <button
          className="search-button"
          type="button"
          aria-label="Search Polaris"
          onClick={() => setSearchOpen(true)}
        >
          ⌕
        </button>
      </div>
            <GlobalSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
}