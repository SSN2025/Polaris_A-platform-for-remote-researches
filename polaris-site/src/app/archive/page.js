import { getAllResearch } from "@/lib/research";
import ArchiveClient from "./ArchiveClient";

export default async function ArchivePage() {
  const allResearch = await getAllResearch();

  const expeditionSet = new Set(
    allResearch
      .map((paper) => paper.source_expedition_folder)
      .filter(Boolean)
  );

  return (
    <ArchiveClient
      reportsCount={allResearch.length}
      expeditionsCount={expeditionSet.size}
    />
  );
}
