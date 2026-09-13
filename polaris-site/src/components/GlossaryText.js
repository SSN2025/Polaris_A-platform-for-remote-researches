"use client";

import { useState } from "react";
import { glossaryTerms } from "@/lib/glossary";

// Longest terms first so "free air anomaly" matches before a
// shorter overlapping term would.
const sortedTerms = Object.keys(glossaryTerms).sort(
  (a, b) => b.length - a.length
);

const pattern = new RegExp(
  `(${sortedTerms
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "gi"
);

function GlossaryTerm({ term, definition }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="glossary-term-wrapper">
      <button
        type="button"
        className="glossary-term"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        {term}
      </button>

      {open && (
        <span className="glossary-tooltip" role="tooltip">
          {definition}
        </span>
      )}
    </span>
  );
}

export default function GlossaryText({ text }) {
  if (!text) {
    return null;
  }

  if (sortedTerms.length === 0) {
    return <>{text}</>;
  }

  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        const definition = glossaryTerms[part.toLowerCase()];

        if (definition) {
          return (
            <GlossaryTerm
              key={`${part}-${index}`}
              term={part}
              definition={definition}
            />
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}