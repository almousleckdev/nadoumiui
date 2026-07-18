"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUniversity } from "@/services/universityService";
import { type UniversityFormValues } from "@/lib/validations/university";
import { UniversityForm } from "@/features/universities/components/UniversityForm";
import { toast } from "react-hot-toast";

export default function NewUniversityPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUniversities"] });
      toast.success("University onboarded successfully!");
      router.push("/admin/dashboard/universities");
    },
    onError: () => {
      toast.error("Failed to onboard university");
    }
  });

  const onSubmit = (data: UniversityFormValues) => {
    createMutation.mutate(data as any);
  };

  return (
    <UniversityForm 
      onSubmit={onSubmit}
      isLoading={createMutation.isPending}
      isError={createMutation.isError}
      errorMessage="Failed to onboard university. Check the unique ID constraint or validation rules."
      title="Onboard Partner University"
      subtitle="Enterprise-grade institution registry with strict validation."
      submitText="Save University"
      onCancel={() => router.push("/admin/dashboard/universities")}
    />
  );
}
