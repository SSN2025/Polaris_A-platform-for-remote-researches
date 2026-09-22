import "./admin.css";

export const metadata = {
  title: "Admin — POLARIS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="admin-shell">{children}</div>;
}
