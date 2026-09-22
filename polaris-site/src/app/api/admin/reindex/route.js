import { NextResponse } from "next/server";
import { rebuildIndex, getIndexHealth } from "@/lib/research";

export async function POST() {
  const records = await rebuildIndex();
  const health = await getIndexHealth();

  return NextResponse.json({
    ok: true,
    total: records.length,
    corrupted: health.corrupted.length,
    corruptedFiles: health.corrupted,
    builtAt: health.builtAt,
  });
}
