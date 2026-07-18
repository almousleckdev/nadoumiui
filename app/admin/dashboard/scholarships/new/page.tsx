"use client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScholarship } from "@/services/scholarshipService";
import { type ScholarshipFormValues } from "@/lib/validations/scholarship";
import { ScholarshipForm } from "@/features/scholarships/components/ScholarshipForm";
import { toast } from "react-hot-toast";

export default function NewScholarshipPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createScholarship,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminScholarships"] });
      toast.success("Scholarship published successfully!");
      router.push("/admin/dashboard/scholarships");
    },
    onError: () => {
      toast.error("Failed to publish scholarship.");
    }
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
    createMutation.mutate(payload as unknown as Record<string, unknown>);
  };

  return (
    <ScholarshipForm 
      onSubmit={onSubmit}
      isLoading={createMutation.isPending}
      isError={createMutation.isError}
      errorMessage="Failed to save scholarship. Please confirm all required fields."
      title="Add New Scholarship Program"
      subtitle="Build a comprehensive scholarship package with strict criteria enforcement."
      submitText="Publish Program"
      onCancel={() => router.push("/admin/dashboard/scholarships")}
    />
  );
}
