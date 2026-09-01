"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPartnerById, updatePartner } from "@/services/partnerService";
import { type PartnerFormValues } from "@/lib/validations/partner";
import type { Partner } from "@/types";
import { PartnerForm } from "@/features/partners/components/PartnerForm";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function EditPartnerPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();

  const {
    data: partner,
    isLoading: isPartnerLoading,
    error: fetchError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["adminPartner", id],
    queryFn: () => getPartnerById(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: PartnerFormValues) => updatePartner(id, payload as Partial<Partner>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPartners"] });
      queryClient.invalidateQueries({ queryKey: ["adminPartner", id] });
      toast.success("Partner updated successfully!");
      router.push("/admin/dashboard/partners");
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err));
    },
  });

  const onSubmit = (data: PartnerFormValues) => {
    updateMutation.mutate(data);
  };

  if (isPartnerLoading) {
    return <Loading variant="page" text="Loading partner data..." />;
  }

  if (fetchError) {
    return (
      <ErrorState
        title="We couldn't load this partner"
        onRetry={() => refetch()}
        isRetrying={isRefetching}
      />
    );
  }

  if (!partner) {
    return (
      <ErrorState
        title="Partner not found"
        description="It may have been deleted. Go back and try another one."
      />
    );
  }

  return (
    <PartnerForm
      initialData={partner}
      onSubmit={onSubmit}
      isLoading={updateMutation.isPending}
      isError={updateMutation.isError}
      errorMessage="Failed to update partner. Please confirm all required fields."
      title={`Edit Partner: ${partner.nameEn}`}
      submitText="Update Partner"
      onCancel={() => router.push("/admin/dashboard/partners")}
    />
  );
}
