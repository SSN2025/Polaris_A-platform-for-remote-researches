"use client";

import { useState } from "react";

export default function FilmModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="secondary-button" onClick={() => setOpen(true)}>
        <span className="play-icon">▶</span>
        WATCH FILM
      </button>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="film-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)}>
              ×
            </button>
            <div className="film-placeholder">
              <span className="film-play">▶</span>
              <p>POLARIS FIELD FILM</p>
              <small>Replace this area with the final expedition film.</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
