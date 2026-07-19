"use client";

import { Sparkles } from "lucide-react";
import { getUniversities } from "@/services/universityService";
import { UniversityCard } from "@/features/universities/components/UniversityCard";
import HomeShowcaseSection from "./HomeShowcaseSection";
import type { University } from "@/types";

export function RecommendedSection() {
  return (
    <HomeShowcaseSection<University>
      title="Recommended by Nadoumi"
      description="Institutions our advisory team personally vouches for, based on outcomes, support, and student feedback."
      browseHref="/universities"
      browseLabel="Browse All Universities"
      queryKey={["recommendedUniversities"]}
      queryFn={async () => (await getUniversities({ isRecommended: true, limit: 3 })).universities}
      itemKey={(university) => university.id}
      renderItem={(university) => <UniversityCard university={university} />}
      emptyIcon={<Sparkles className="w-5 h-5 text-gray-400" aria-hidden="true" />}
      emptyTitle="No recommendations yet"
      emptyDescription="Our team is still curating this list — check back soon."
      errorTitle="We couldn't load our recommendations"
    />
  );
}

export default RecommendedSection;
