import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import { getScholarshipById } from "@/services/scholarshipService";
import ScholarshipDetailsClient from "./ScholarshipDetailsClient";
import type { Metadata } from "next";

function isNotFoundError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 404;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const scholarship = await getScholarshipById(id);
    return {
      title: `${scholarship.title} - Study in China | Nadoumi`,
      description: scholarship.description
        ? scholarship.description.substring(0, 160)
        : "Learn details, eligibility, benefits, and apply for this scholarship on Nadoumi.",
    };
  } catch {
    return {
      title: "Scholarship Details - Nadoumi",
      description: "Learn details, eligibility, benefits, and apply for this scholarship on Nadoumi.",
    };
  }
}

export default async function ScholarshipDetailsPage({ params }: PageProps) {
  const { id } = await params;

  let scholarship;
  try {
    scholarship = await getScholarshipById(id);
  } catch (error) {
    // A 404 from the backend means the scholarship genuinely doesn't exist —
    // render Next's not-found UI. Any other failure (network, 5xx) is a real
    // error and should surface as one via the route's error boundary, not be
    // silently treated the same as "not found".
    if (isNotFoundError(error)) {
      notFound();
    }
    throw error;
  }

  return <ScholarshipDetailsClient initialData={scholarship} />;
}
