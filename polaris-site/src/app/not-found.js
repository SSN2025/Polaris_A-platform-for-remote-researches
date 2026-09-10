import Link from "next/link";

export default function NotFound() {
  return (
    <main className="polaris-site polaris-not-found">
      <div className="not-found-grid" />

      <div className="not-found-inner">
        <div className="not-found-top">
          <Link
            href="/"
            className="not-found-brand"
          >
            <span className="brand-mark">P</span>
            <span>POLARIS</span>
          </Link>

          <span className="not-found-code">
            ERROR / 404
          </span>
        </div>

        <div className="not-found-content">
          <span className="not-found-index">
            SIGNAL NOT FOUND
          </span>

          <h1>
            This page
            <br />
            <em>does not exist.</em>
          </h1>

          <p>
            The polar record you are looking for could not
            be found. It may have moved, or the address may
            be incorrect.
          </p>

          <Link
            href="/"
            className="not-found-home"
          >
            RETURN TO POLARIS
            <span>↗</span>
          </Link>
        </div>

        <div className="not-found-footer">
          <span>NCPOR POLAR RESEARCH OUTREACH PORTAL</span>
          <span>ARCHIVE · DISCOVER · OUTREACH</span>
        </div>
      </div>
    </main>
  );
}