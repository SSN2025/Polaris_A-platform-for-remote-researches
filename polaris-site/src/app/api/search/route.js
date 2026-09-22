import { NextResponse } from "next/server";
import { searchResearch, cleanCategoryLabel } from "@/lib/research";
import { searchExpeditions } from "@/lib/expeditions";

/*
 * Unified Global Search (structure doc §8.1), scoped to the
 * content types that actually have data in this project today:
 * Research papers and Expeditions. Reports, Photos, Videos,
 * and Datasets are additional categories in the full spec but
 * have no backing data yet, so they are intentionally left out
 * rather than faked.
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({
      query,
      categories: [],
    });
  }

  const { total: researchTotal, results: researchResults } =
    await searchResearch(query, 5);

  const expeditionResults = searchExpeditions(query, 5);

  const categories = [
    {
      key: "research",
      label: "Research",
      total: researchTotal,
      href: `/research?q=${encodeURIComponent(query)}`,
      results: researchResults.map((paper) => ({
        // document_id, not id — id collides across ~40% of the
        // dataset; document_id is the pipeline's actual unique
        // identifier and is what the result link uses.
        id: paper.document_id,
        title:
          paper?.bibliographic?.title || "Untitled Research",
        meta: [
          cleanCategoryLabel(paper?.taxonomy?.category),
          paper?.bibliographic?.year,
        ]
          .filter(Boolean)
          .join(" · "),
        href: `/research/${paper.document_id}`,
      })),
    },
    {
      key: "expeditions",
      label: "Expeditions",
      total: expeditionResults.length,
      href: "/expeditions",
      results: expeditionResults.map((expedition) => ({
        id: expedition.id,
        title: expedition.name,
        meta: [
          expedition.location,
          expedition.status,
        ]
          .filter(Boolean)
          .join(" · "),
        href: `/expeditions/${expedition.id}`,
      })),
    },
  ];

  return NextResponse.json({ query, categories });
}