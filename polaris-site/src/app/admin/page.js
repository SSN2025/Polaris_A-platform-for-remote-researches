import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { getAdminStats } from "@/lib/research";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const reviewedPct = stats.total
    ? Math.round((stats.reviewed / stats.total) * 100)
    : 0;

  return (
    <>
      <AdminNav />

      <main className="admin-main">
        <div className="admin-eyebrow">NCPOR EXTRACTION PIPELINE</div>
        <h1 className="admin-title">Dashboard</h1>

        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <div className="value">{stats.total}</div>
            <div className="label">Documents Extracted</div>
          </div>

          <div className="admin-stat-card">
            <div className="value">{stats.reviewed}</div>
            <div className="label">Human Verified</div>
          </div>

          <div className="admin-stat-card accent">
            <div className="value">{stats.pending}</div>
            <div className="label">Awaiting Review</div>
          </div>

          <div className="admin-stat-card">
            <div className="value">{reviewedPct}%</div>
            <div className="label">Verification Coverage</div>
          </div>

          <div className="admin-stat-card">
            <div className="value">{stats.byExpedition.length}</div>
            <div className="label">Expeditions Represented</div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <span>PIPELINE STATUS</span>
            <Link href="/admin/queue">OPEN VERIFICATION QUEUE →</Link>
          </div>

          <div style={{ padding: "18px 22px", fontSize: 13.5, lineHeight: 1.7 }}>
            Every extracted record starts as <strong>unreviewed</strong>.
            Approve a record once its evidence checks out, or edit a field
            directly — either action writes back to the exact source file
            and marks it <strong>reviewed</strong>. Nothing here overwrites
            the locked schema; only the existing field groups
            (<code>bibliographic</code>, <code>content</code>,{" "}
            <code>taxonomy</code>, <code>outreach</code>) can change.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div className="admin-panel">
            <div className="admin-panel-head">
              <span>BY CATEGORY (CLEANED)</span>
            </div>

            {stats.byCategory.slice(0, 12).map(([category, count]) => (
              <DistRow
                key={category}
                label={category}
                count={count}
                max={stats.byCategory[0]?.[1] || 1}
              />
            ))}
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <span>BY EXPEDITION</span>
            </div>

            {stats.byExpedition.slice(0, 12).map(([expedition, count]) => (
              <DistRow
                key={expedition}
                label={expedition}
                count={count}
                max={stats.byExpedition[0]?.[1] || 1}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function DistRow({ label, count, max }) {
  const pct = Math.max(6, Math.round((count / max) * 100));

  return (
    <div className="admin-dist-row">
      <span className="admin-dist-label">{label}</span>

      <div className="admin-bar-track">
        <div
          className="admin-bar-fill"
          style={{ width: `${pct}%`, background: "var(--cyan, #9bdce1)" }}
        />
      </div>

      <span className="admin-dist-count">{count}</span>
    </div>
  );
}
