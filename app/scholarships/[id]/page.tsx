import React from "react";
import { getScholarshipById } from "@/services/scholarshipService";
import ScholarshipDetailsClient from "./ScholarshipDetailsClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const scholarship = await getScholarshipById(id);
    if (!scholarship) {
      return {
        title: "Scholarship Not Found - Nadoumi",
        description: "The requested scholarship details could not be found.",
      };
    }
    return {
      title: `${scholarship.title} - Study in China | Nadoumi`,
      description: scholarship.description ? scholarship.description.substring(0, 160) : "Learn details, eligibility, benefits, and apply for this scholarship on Nadoumi.",
    };
  } catch (error) {
    return {
      title: "Scholarship Details - Nadoumi",
      description: "Learn details, eligibility, benefits, and apply for this scholarship on Nadoumi.",
    };
  }
}

export default async function ScholarshipDetailsPage({ params }: PageProps) {
  const { id } = await params;
  try {
    const scholarship = await getScholarshipById(id);
    return <ScholarshipDetailsClient initialData={scholarship} />;
  } catch (error) {
    // If details fetch fails on server (e.g. backend offline during build or render),
    // let Next.js error boundary handle it, or render the client component with empty data
    throw error;
  }
}
