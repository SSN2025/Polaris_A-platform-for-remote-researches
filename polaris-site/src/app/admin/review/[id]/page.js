import { notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { getResearchById, getConfidenceBreakdown } from "@/lib/research";
import ReviewClient from "./ReviewClient";

export default async function AdminReviewPage({ params }) {
  const { id } = await params;
  const paper = await getResearchById(id);

  if (!paper) {
    notFound();
  }

  const confidence = getConfidenceBreakdown(paper);

  return (
    <>
      <AdminNav />
      <ReviewClient paper={paper} confidence={confidence} />
    </>
  );
}
