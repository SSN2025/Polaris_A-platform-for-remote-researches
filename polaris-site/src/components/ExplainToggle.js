"use client";

import { useState } from "react";
import GlossaryText from "./GlossaryText";

export default function ExplainToggle({ summary, abstract }) {
  const [mode, setMode] = useState("simple");

  const hasSummary = Boolean(summary);
  const hasAbstract = Boolean(abstract);

  if (!hasSummary && !hasAbstract) {
    return null;
  }

  const text = mode === "simple" ? summary : abstract;

  return (
    <div className="explain-toggle">
      <div className="explain-toggle-switch" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "simple"}
          disabled={!hasSummary}
          className={
            mode === "simple"
              ? "explain-toggle-button active"
              : "explain-toggle-button"
          }
          onClick={() => setMode("simple")}
        >
          Explain it simply
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === "scientific"}
          disabled={!hasAbstract}
          className={
            mode === "scientific"
              ? "explain-toggle-button active"
              : "explain-toggle-button"
          }
          onClick={() => setMode("scientific")}
        >
          Scientific version
        </button>
      </div>

        <p className="explain-toggle-text">
        {text ? (
          <GlossaryText text={text} />
        ) : mode === "simple" ? (
          "No plain-language summary available for this record."
        ) : (
          "No scientific abstract available for this record."
        )}
      </p>
    </div>
  );
}