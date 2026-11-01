import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'NCPOR Admin Panel',
  description: 'Internal Polar Research Verification & Record Management',
};

export default async function AdminLayout({ children }) {
  const headerList = await headers();
  const pathname = headerList.get('x-invoke-path') || '';

  // If login page, render children directly without navigation sidebar
  const session = await getSession();

  // If on a page other than login and not logged in, we let the page handle or redirect
  // We can pass the session down or render an authenticated shell if logged in
  if (!session) {
    return <div className="min-h-screen bg-slate-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-xs">
                P
              </div>
              <span className="font-bold text-sm tracking-wide text-white">POLARIS ADMIN</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/verification"
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-medium"
              >
                Verification Queue
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400 hidden sm:inline">
              Signed in as <strong className="text-white">{session.name || session.username}</strong>
            </span>

            <Link
              href="/"
              className="text-slate-400 hover:text-white transition-colors"
              target="_blank"
            >
              Public Portal ↗
            </Link>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {children}
      </main>
    </div>
  );
}
