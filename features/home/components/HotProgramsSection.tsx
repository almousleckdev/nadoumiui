"use client";

import { Flame } from "lucide-react";
import { getScholarships } from "@/services/scholarshipService";
import { ScholarshipCard } from "@/features/scholarships/components/ScholarshipCard";
import HomeShowcaseSection from "./HomeShowcaseSection";
import type { Scholarship } from "@/types";

export function HotProgramsSection() {
  return (
    <HomeShowcaseSection<Scholarship>
      title="Hot Programs"
      description="The scholarships getting the most attention right now — high demand, strong outcomes, and closing soon."
      browseHref="/scholarships"
      browseLabel="Browse All Scholarships"
      queryKey={["hotScholarships"]}
      queryFn={async () => (await getScholarships({ isHot: true, limit: 3 })).scholarships}
      itemKey={(scholarship) => scholarship.id}
      renderItem={(scholarship) => <ScholarshipCard scholarship={scholarship} />}
      emptyIcon={<Flame className="w-5 h-5 text-gray-400" aria-hidden="true" />}
      emptyTitle="No hot programs right now"
      emptyDescription="Check back soon — we regularly spotlight the scholarships in highest demand."
      errorTitle="We couldn't load hot programs"
      className="py-24 bg-gray-50"
    />
  );
}

export default HotProgramsSection;
