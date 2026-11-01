import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getPaperById } from '@/lib/data';
import ReviewForm from './ReviewForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Review & Verify Paper | Admin',
};

export default async function AdminReviewPage({ params }) {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const paper = await getPaperById(id);

  if (!paper) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/admin" className="hover:text-cyan-400">Dashboard</Link>
        <span>/</span>
        <Link href="/admin/verification" className="hover:text-cyan-400">Verification Queue</Link>
        <span>/</span>
        <span className="text-white">{paper.document_id}</span>
      </div>

      <ReviewForm initialPaper={paper} />
    </div>
  );
}
