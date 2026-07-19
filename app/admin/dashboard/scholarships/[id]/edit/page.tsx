"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getScholarshipById,
  updateScholarship,
} from "@/services/scholarshipService";
import { type ScholarshipFormValues } from "@/lib/validations/scholarship";
import { ScholarshipForm } from "@/features/scholarships/components/ScholarshipForm";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import { toast } from "react-hot-toast";

export default function EditScholarshipPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();

  const {
    data: scholarship,
    isLoading: isScholarshipLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["adminScholarship", id],
    queryFn: () => getScholarshipById(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => updateScholarship(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminScholarships"] });
      queryClient.invalidateQueries({ queryKey: ["adminScholarship", id] });
      toast.success("Scholarship updated successfully!");
      router.push("/admin/dashboard/scholarships");
    },
    onError: () => {
      toast.error("Failed to update scholarship.");
    },
  });

  const onSubmit = (data: ScholarshipFormValues) => {
    const payload = {
      ...data,
      applicationDeadline: data.applicationDeadline
        ? new Date(data.applicationDeadline).toISOString()
        : undefined,
      startDate: data.startDate
        ? new Date(data.startDate).toISOString()
        : undefined,
    };
    updateMutation.mutate(payload as unknown as Record<string, unknown>);
  };

  const formatInitialData = (data: any) => {
    if (!data) return data;
    const formatted = { ...data };
    
    if (formatted.startDate) {
      formatted.startDate = new Date(formatted.startDate).toISOString().split("T")[0];
    }
    if (formatted.applicationDeadline) {
      formatted.applicationDeadline = new Date(formatted.applicationDeadline).toISOString().split("T")[0];
    }

    const jsonFields = [
      "applicantRequirements",
      "applicationDocuments",
      "additionalDocuments",
      "feeStructure",
      "additionalFees",
      "stipend",
      "accommodationFee",
      "requirements",
      "benefits"
    ];

    jsonFields.forEach((field) => {
      if (typeof formatted[field] === "object" && formatted[field] !== null) {
        if (Array.isArray(formatted[field])) {
          formatted[field] = formatted[field].map((doc: any) => doc.name || doc.title || JSON.stringify(doc)).join("\n");
        } else {
          formatted[field] = JSON.stringify(formatted[field], null, 2);
        }
      }
    });

    if (formatted.universities && Array.isArray(formatted.universities)) {
      formatted.universities = formatted.universities.map((u: any) => typeof u === 'string' ? u : u.id);
    }

    return formatted;
  };

  if (isScholarshipLoading) {
    return <Loading variant="page" text="Loading scholarship data..." />;
  }

  if (fetchError) {
    return (
      <ErrorState
        title="We couldn't load this scholarship"
        onRetry={() => refetch()}
        isRetrying={isRefetching}
      />
    );
  }

  if (!scholarship) {
    return (
      <ErrorState
        title="Scholarship not found"
        description="It may have been deleted. Go back and try another one."
      />
    );
  }

  return (
    <ScholarshipForm
      initialData={formatInitialData(scholarship)}
      onSubmit={onSubmit}
      isLoading={updateMutation.isPending}
      isError={updateMutation.isError}
      errorMessage="Failed to update scholarship. Please confirm all required fields."
      title={`Edit Scholarship: ${scholarship.title || id}`}
      submitText="Update Program"
      onCancel={() => router.push("/admin/dashboard/scholarships")}
    />
  );
}
