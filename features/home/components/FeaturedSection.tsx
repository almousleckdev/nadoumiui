"use client";

import { GraduationCap } from "lucide-react";
import { getFeaturedScholarships } from "@/services/scholarshipService";
import { ScholarshipCard } from "@/features/scholarships/components/ScholarshipCard";
import HomeShowcaseSection from "./HomeShowcaseSection";
import type { Scholarship } from "@/types";

export function FeaturedSection() {
  return (
    <HomeShowcaseSection<Scholarship>
      title="Featured Scholarships"
      description="Hand-picked opportunities offering high tuition coverage and accommodation support for international students."
      browseHref="/scholarships"
      browseLabel="Browse All Scholarships"
      queryKey={["featuredScholarships"]}
      queryFn={getFeaturedScholarships}
      itemKey={(scholarship) => scholarship.id}
      renderItem={(scholarship) => <ScholarshipCard scholarship={scholarship} />}
      emptyIcon={<GraduationCap className="w-5 h-5 text-gray-400" aria-hidden="true" />}
      emptyTitle="No featured scholarships yet"
      emptyDescription="We're curating new opportunities — check back soon or browse the full list."
      errorTitle="We couldn't load featured scholarships"
    />
  );
}

export default FeaturedSection;
