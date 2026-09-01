"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUniversityById, updateUniversity } from "@/services/universityService";
import { type UniversityFormValues } from "@/lib/validations/university";
import { UniversityForm } from "@/features/universities/components/UniversityForm";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import { toast } from "react-hot-toast";

import { getErrorMessage } from "@/utils/getErrorMessage";

export default function EditUniversityPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();

  const {
    data: university,
    isLoading: isUniversityLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useQuery({
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
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err));
    }
  });

  const onSubmit = (data: UniversityFormValues) => {
    updateMutation.mutate(data as any);
  };

  if (isUniversityLoading) {
    return <Loading variant="page" text="Loading university data..." />;
  }

  if (fetchError) {
    return (
      <ErrorState
        title="We couldn't load this university"
        onRetry={() => refetch()}
        isRetrying={isRefetching}
      />
    );
  }

  if (!university) {
    return (
      <ErrorState
        title="University not found"
        description="It may have been deleted. Go back and try another one."
      />
    );
  }

  return (
    <UniversityForm 
      initialData={university}
      onSubmit={onSubmit}
      isLoading={updateMutation.isPending}
      isError={updateMutation.isError}
      errorMessage={updateMutation.error ? getErrorMessage(updateMutation.error) : undefined}
      title={`Edit University: ${university.name || id}`}
      submitText="Update University"
      onCancel={() => router.push("/admin/dashboard/universities")}
    />
  );
}
