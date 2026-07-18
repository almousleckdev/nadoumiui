import type { Scholarship } from "@/types";
import { OverviewSection } from "./scholarship-details/OverviewSection";
import { FinancialsSection } from "./scholarship-details/FinancialsSection";
import { RequirementsSection } from "./scholarship-details/RequirementsSection";

interface ScholarshipDetailsProps {
  scholarship: Scholarship;
}

export function ScholarshipDetails({ scholarship }: ScholarshipDetailsProps) {
  return (
    <div className="space-y-12">
      <OverviewSection scholarship={scholarship} />
      <FinancialsSection scholarship={scholarship} />
      <RequirementsSection scholarship={scholarship} />
    </div>
  );
}
