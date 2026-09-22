import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { getVerificationQueue } from "@/lib/research";

export default async function AdminQueuePage() {
  const { total, results } = await getVerificationQueue({ limit: 150 });

  return (
    <>
      <AdminNav />

      <main className="admin-main">
        <div className="admin-eyebrow">REVIEW QUEUE</div>
        <h1 className="admin-title">Verification Queue</h1>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <span>{total} RECORDS · RANKED BY LOWEST FIELD CONFIDENCE</span>
          </div>

          {results.length === 0 ? (
            <div className="admin-empty">Nothing in the queue.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Expedition</th>
                  <th>Weakest Field</th>
                  <th>Confidence</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {results.map((row) => (
                  <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.category}</td>
                    <td>{row.expedition}</td>
                    <td>{row.lowestField || "—"}</td>
                    <td>
                      {typeof row.lowestConfidence === "number" ? (
                        <ConfidencePill value={row.lowestConfidence} />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <span
                        className={`admin-badge ${
                          row.reviewed ? "ok" : "pending"
                        }`}
                      >
                        {row.reviewed ? "Reviewed" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/review/${row.id}`}>REVIEW →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}

function ConfidencePill({ value }) {
  const pct = Math.round(value * 100);
  const tone = value < 0.85 ? "warn" : "ok";

  return <span className={`admin-badge ${tone}`}>{pct}%</span>;
}
