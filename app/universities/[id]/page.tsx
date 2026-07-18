import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import { getUniversityById } from "@/services/universityService";
import { getScholarships } from "@/services/scholarshipService";
import UniversityDetailsClient from "./UniversityDetailsClient";

function isNotFoundError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 404;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const university = await getUniversityById(id);
    return {
      title: `${university.name} - Study in China | Nadoumi`,
      description:
        university.introduction?.slice(0, 160) ||
        university.description?.slice(0, 160) ||
        `Explore programs, scholarships, and campus life at ${university.name} on Nadoumi.`,
    };
  } catch {
    return {
      title: "University Details - Nadoumi",
      description: "Explore programs, scholarships, and campus life on Nadoumi.",
    };
  }
}

export default async function UniversityDetailsPage({ params }: PageProps) {
  const { id } = await params;

  let university;
  try {
    university = await getUniversityById(id);
  } catch (error) {
    if (isNotFoundError(error)) {
      notFound();
    }
    throw error;
  }

  // Related scholarships genuinely depend on the university's name, so this
  // can't be parallelized with the university fetch itself — but doing both
  // fetches here (server-to-server) instead of as two sequential client-side
  // round trips removes a full network hop's worth of latency for the user.
  const scholarshipsData = await getScholarships({ search: university.name, limit: 3 }).catch(
    () => ({ scholarships: [], total: 0, page: 1, limit: 3, totalPages: 0 }),
  );

  return (
    <UniversityDetailsClient
      initialUniversity={university}
      initialScholarships={scholarshipsData.scholarships}
    />
  );
}
