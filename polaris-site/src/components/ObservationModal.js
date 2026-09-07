"use client";

import { useState } from "react";

export default function ObservationModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="primary-button" onClick={() => setOpen(true)}>
        SUBMIT AN OBSERVATION
        <span>↗</span>
      </button>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div
            className="observation-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setOpen(false)}>
              ×
            </button>

            <span className="modal-eyebrow">FIELD CONTRIBUTION</span>
            <h3>Share an Observation</h3>
            <p>
              Help expand the public polar knowledge layer with a field
              observation or research contribution.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
                alert("Observation submitted for review.");
              }}
            >
              <label className="sr-only" htmlFor="obs-name">
                Your name
              </label>
              <input
                id="obs-name"
                type="text"
                placeholder="Your name"
                required
              />

              <label className="sr-only" htmlFor="obs-email">
                Email address
              </label>
              <input
                id="obs-email"
                type="email"
                placeholder="Email address"
                required
              />

              <label className="sr-only" htmlFor="obs-desc">
                Describe your observation
              </label>
              <textarea
                id="obs-desc"
                placeholder="Describe your observation..."
                rows="5"
                required
              />

              <button type="submit" className="primary-button">
                SUBMIT FOR REVIEW
                <span>↗</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
