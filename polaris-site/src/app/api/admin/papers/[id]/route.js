import { NextResponse } from "next/server";
import {
  getResearchById,
  getConfidenceBreakdown,
  savePaperUpdates,
} from "@/lib/research";
import { validatePaperUpdate } from "@/lib/adminValidation";

export async function GET(request, { params }) {
  const { id } = await params;
  const paper = await getResearchById(id);

  if (!paper) {
    return NextResponse.json(
      { ok: false, error: "not_found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    paper,
    confidence: getConfidenceBreakdown(paper),
  });
}

export async function PATCH(request, { params }) {
  const { id } = await params;

  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 400 }
    );
  }

  const validation = validatePaperUpdate(body);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", details: validation.errors },
      { status: 400 }
    );
  }

  const result = await savePaperUpdates(id, validation.cleaned);

  if (!result.ok) {
    const status = result.error === "not_found" ? 404 : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
