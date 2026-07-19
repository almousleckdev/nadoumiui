"use client";

import { Handshake } from "lucide-react";
import { getUniversities } from "@/services/universityService";
import { UniversityCard } from "@/features/universities/components/UniversityCard";
import HomeShowcaseSection from "./HomeShowcaseSection";
import type { University } from "@/types";

export function PartnerUniversitiesSection() {
  return (
    <HomeShowcaseSection<University>
      title="Partner Universities"
      description="Institutions with a direct partnership with Nadoumi — negotiated admissions pathways and dedicated scholarship quotas."
      browseHref="/partners"
      browseLabel="View All Partners"
      queryKey={["homePartnerUniversities"]}
      queryFn={async () => (await getUniversities({ isPartner: true, limit: 3 })).universities}
      itemKey={(university) => university.id}
      renderItem={(university) => <UniversityCard university={university} />}
      emptyIcon={<Handshake className="w-5 h-5 text-gray-400" aria-hidden="true" />}
      emptyTitle="No partner universities yet"
      emptyDescription="We're growing our network of partner institutions — check back soon."
      errorTitle="We couldn't load our partner universities"
      className="py-24 bg-gray-50"
    />
  );
}

export default PartnerUniversitiesSection;
