import { NextResponse } from "next/server";
import { searchResearch } from "@/lib/research";
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
    searchResearch(query, 5);

  const expeditionResults = searchExpeditions(query, 5);

  const categories = [
    {
      key: "research",
      label: "Research",
      total: researchTotal,
      href: `/research?q=${encodeURIComponent(query)}`,
      results: researchResults.map((paper) => ({
        id: paper.id,
        title:
          paper?.bibliographic?.title || "Untitled Research",
        meta: [
          paper?.taxonomy?.category,
          paper?.bibliographic?.year,
        ]
          .filter(Boolean)
          .join(" · "),
        href: `/research/${paper.id}`,
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