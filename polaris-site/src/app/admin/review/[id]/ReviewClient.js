"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function evidenceFor(evidence, field) {
  return evidence.filter((item) => item.field === field);
}

export default function ReviewClient({ paper, confidence }) {
  const bibliographic = paper.bibliographic || {};
  const content = paper.content || {};
  const taxonomy = paper.taxonomy || {};
  const evidence = Array.isArray(paper.evidence) ? paper.evidence : [];

  const [form, setForm] = useState({
    title: bibliographic.title || "",
    category: taxonomy.category || "",
    subcategory: taxonomy.subcategory || "",
    summary: content.summary || "",
    research_sites: (content.research_sites || []).join(", "),
    tags: (taxonomy.tags || []).join(", "),
  });

  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reviewed, setReviewed] = useState(Boolean(paper?.pipeline?.reviewed));

  const confidenceMap = useMemo(() => {
    const map = {};
    for (const entry of confidence) {
      map[entry.field] = entry.value;
    }
    return map;
  }, [confidence]);

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const runAction = async (action) => {
    setSaving(true);
    setStatus(null);

    const body =
      action === "approve"
        ? { action: "approve" }
        : {
            action: "edit",
            bibliographic: { title: form.title },
            taxonomy: {
              category: form.category,
              subcategory: form.subcategory,
              tags: form.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            },
            content: {
              summary: form.summary,
              research_sites: form.research_sites
                .split(",")
                .map((site) => site.trim())
                .filter(Boolean),
            },
          };

    try {
      const res = await fetch(`/api/admin/papers/${paper.document_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus({ ok: false, message: "Save failed. Try again." });
        setSaving(false);
        return;
      }

      setReviewed(true);
      setStatus({
        ok: true,
        message:
          action === "approve"
            ? "Approved — marked as reviewed."
            : "Saved — changes written back to source file.",
      });
    } catch (error) {
      setStatus({ ok: false, message: "Save failed. Try again." });
    }

    setSaving(false);
  };

  return (
    <main className="admin-main">
      <Link href="/admin/queue" className="admin-back-link">
        ← BACK TO QUEUE
      </Link>

      <div className="admin-eyebrow">
        {paper.document_id} · {paper.source_expedition_folder || "—"}
      </div>

      <h1 className="admin-title" style={{ marginBottom: 6 }}>
        {bibliographic.title || paper.id}
      </h1>

      <p style={{ color: "var(--muted)", marginBottom: 30, fontSize: 13.5 }}>
        <span
          className={`admin-badge ${reviewed ? "ok" : "pending"}`}
          style={{ marginRight: 10 }}
        >
          {reviewed ? "Reviewed" : "Pending review"}
        </span>
        Source: {paper.source_path}
      </p>

      <div className="admin-review-grid">
        {/* ---------------------------------------------------
            LEFT — editable extracted fields
        --------------------------------------------------- */}
        <div>
          <div className="admin-panel" style={{ padding: 22 }}>
            <div className="admin-field">
              <div className="admin-field-label">
                <span>TITLE</span>
              </div>
              <input value={form.title} onChange={update("title")} />
            </div>

            <div className="admin-field">
              <div className="admin-field-label">
                <span>CATEGORY</span>
                <ConfidenceTag value={confidenceMap.category} />
              </div>
              <input value={form.category} onChange={update("category")} />
            </div>

            <div className="admin-field">
              <div className="admin-field-label">
                <span>SUBCATEGORY</span>
                <ConfidenceTag value={confidenceMap.subcategory} />
              </div>
              <input
                value={form.subcategory}
                onChange={update("subcategory")}
              />
            </div>

            <div className="admin-field">
              <div className="admin-field-label">
                <span>SUMMARY</span>
                <ConfidenceTag value={confidenceMap.summary} />
              </div>
              <textarea
                rows={4}
                value={form.summary}
                onChange={update("summary")}
              />
            </div>

            <div className="admin-field">
              <div className="admin-field-label">
                <span>RESEARCH SITES (comma-separated)</span>
                <ConfidenceTag value={confidenceMap.research_sites} />
              </div>
              <input
                value={form.research_sites}
                onChange={update("research_sites")}
              />
            </div>

            <div className="admin-field">
              <div className="admin-field-label">
                <span>TAGS (comma-separated)</span>
              </div>
              <input value={form.tags} onChange={update("tags")} />
            </div>

            <div className="admin-actions">
              <button
                type="button"
                className="admin-btn approve"
                disabled={saving}
                onClick={() => runAction("approve")}
              >
                {saving ? "…" : "APPROVE AS-IS"}
              </button>

              <button
                type="button"
                className="admin-btn primary"
                disabled={saving}
                onClick={() => runAction("edit")}
              >
                {saving ? "…" : "SAVE EDITS"}
              </button>

              <a
                className="admin-btn"
                href={`/research/${paper.document_id}`}
                target="_blank"
                rel="noreferrer"
              >
                VIEW LIVE PAGE ↗
              </a>
            </div>

            {status ? (
              <div
                className="admin-save-status"
                style={{
                  color: status.ok ? "#7fd9a4" : "var(--orange)",
                }}
              >
                {status.message}
              </div>
            ) : null}
          </div>
        </div>

        {/* ---------------------------------------------------
            RIGHT — source evidence
        --------------------------------------------------- */}
        <div>
          <div className="admin-panel-head" style={{ border: "none", padding: "0 0 14px" }}>
            <span>SOURCE EVIDENCE</span>
          </div>

          {evidence.length === 0 ? (
            <div className="admin-evidence-card">
              <span className="meta">
                No evidence recorded for this record.
              </span>
            </div>
          ) : (
            evidence.map((item, index) => (
              <div className="admin-evidence-card" key={`${item.field}-${index}`}>
                <span className="field-tag">{item.field}</span>
                <blockquote>&ldquo;{item.source_text}&rdquo;</blockquote>
                <span className="meta">
                  Page {item.page_number ?? "—"} · {item.section || "—"}
                </span>
              </div>
            ))
          )}

          <div className="admin-evidence-card">
            <span className="field-tag">SOURCE FILE</span>
            <span className="meta" style={{ display: "block" }}>
              {paper.source_file || "—"}
            </span>
            {paper.pdf_url ? (
              <a
                href={paper.pdf_url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--cyan)", fontSize: 11, marginTop: 8, display: "inline-block" }}
              >
                VIEW ORIGINAL PDF ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

function ConfidenceTag({ value }) {
  if (typeof value !== "number") {
    return null;
  }

  const pct = Math.round(value * 100);
  const tone = value < 0.85 ? "warn" : "ok";

  return <span className={`admin-badge ${tone}`}>{pct}%</span>;
}
