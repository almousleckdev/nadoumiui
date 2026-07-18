"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUniversityById, updateUniversity } from "@/services/universityService";
import { type UniversityFormValues } from "@/lib/validations/university";
import { UniversityForm } from "@/features/universities/components/UniversityForm";
import { toast } from "react-hot-toast";

export default function EditUniversityPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();

  const { data: university, isLoading: isUniversityLoading, error: fetchError } = useQuery({
    queryKey: ["adminUniversity", id],
    queryFn: () => getUniversityById(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => updateUniversity(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUniversities"] });
      queryClient.invalidateQueries({ queryKey: ["adminUniversity", id] });
      toast.success("University updated successfully!");
      router.push("/admin/dashboard/universities");
    },
    onError: () => {
      toast.error("Failed to update university");
    }
  });

  const onSubmit = (data: UniversityFormValues) => {
    updateMutation.mutate(data as any);
  };

  if (isUniversityLoading) {
    return <div className="text-center py-20 text-gray-500 text-sm animate-pulse">Loading university data...</div>;
  }

  if (fetchError || !university) {
    return <div className="p-4 rounded-xl bg-red-950/40 border border-red-900/60 text-sm text-red-400 font-medium">Error loading university profile.</div>;
  }

  return (
    <UniversityForm 
      initialData={university}
      onSubmit={onSubmit}
      isLoading={updateMutation.isPending}
      isError={updateMutation.isError}
      errorMessage="Failed to update university. Please check validation rules."
      title={`Edit University: ${university.name || id}`}
      submitText="Update University"
      onCancel={() => router.push("/admin/dashboard/universities")}
    />
  );
}
