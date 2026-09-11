"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Reset local state and notify the parent. Used by every
  // dismissal path (backdrop click, close button, Escape,
  // clicking a result) so state resets on user action rather
  // than inside an effect.
  const handleClose = () => {
    setQuery("");
    setCategories([]);
    onClose();
  };

  // Focus the input as soon as the overlay opens.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Debounced fetch against the search API. Only runs (and
  // only ever calls setState) when there is a non-empty query;
  // the empty-query case is handled by rendering nothing below
  // rather than resetting state here.
  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);

      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => {
          setCategories(data.categories || []);
        })
        .catch(() => {
          setCategories([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  const visibleCategories = query.trim() ? categories : [];

  if (!open) {
    return null;
  }

  return (
    <div
      className="global-search-backdrop"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="global-search-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search Polaris"
      >
        <div className="global-search-input-row">
          <span className="global-search-icon">⌕</span>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search research, expeditions..."
            className="global-search-input"
          />

          <button
            type="button"
            className="global-search-close"
            onClick={handleClose}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        <div className="global-search-results">
          {!query.trim() && (
            <p className="global-search-hint">
              Try a station name, expedition, or research
              topic.
            </p>
          )}

          {query.trim() && loading && (
            <p className="global-search-hint">Searching...</p>
          )}

          {query.trim() &&
            !loading &&
            visibleCategories.every((c) => c.total === 0) && (
              <p className="global-search-hint">
                No results for &ldquo;{query}&rdquo;.
              </p>
            )}

          {!loading &&
            visibleCategories.map(
              (category) =>
                category.total > 0 && (
                  <div
                    className="global-search-category"
                    key={category.key}
                  >
                    <div className="global-search-category-header">
                      <span>{category.label}</span>
                      <Link
                        href={category.href}
                        onClick={handleClose}
                        className="global-search-category-count"
                      >
                        {category.total}
                        {category.total > category.results.length
                          ? "+"
                          : ""}
                      </Link>
                    </div>

                    {category.results.map((result) => (
                      <Link
                        key={result.id}
                        href={result.href}
                        onClick={handleClose}
                        className="global-search-result"
                      >
                        <span className="global-search-result-title">
                          {result.title}
                        </span>
                        {result.meta && (
                          <span className="global-search-result-meta">
                            {result.meta}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}