"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "DASHBOARD" },
  { href: "/admin/queue", label: "VERIFICATION QUEUE" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="admin-topbar">
      <Link href="/admin" className="admin-brand">
        <span className="mark">P</span>
        POLARIS ADMIN
      </Link>

      <nav className="admin-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}

        <Link href="/" target="_blank">
          VIEW SITE ↗
        </Link>

        <button type="button" className="admin-logout" onClick={logout}>
          LOG OUT
        </button>
      </nav>
    </header>
  );
}
