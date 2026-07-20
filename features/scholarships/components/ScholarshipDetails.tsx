import React from "react";
import type { Scholarship } from "@/types";
import { OverviewSection } from "./scholarship-details/OverviewSection";
import { FinancialsSection } from "./scholarship-details/FinancialsSection";
import { EligibilitySection } from "./scholarship-details/EligibilitySection";
import { RequirementsSection } from "./scholarship-details/RequirementsSection";

interface ScholarshipDetailsProps {
  scholarship: Scholarship;
}

export function ScholarshipDetails({ scholarship }: ScholarshipDetailsProps) {
  return (
    <div className="space-y-12">
      <OverviewSection scholarship={scholarship} />
      <FinancialsSection scholarship={scholarship} />
      <EligibilitySection scholarship={scholarship} />
      <RequirementsSection scholarship={scholarship} />
    </div>
  );
}

export default ScholarshipDetails;
