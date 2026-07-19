"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPartner } from "@/services/partnerService";
import { type PartnerFormValues } from "@/lib/validations/partner";
import { PartnerForm } from "@/features/partners/components/PartnerForm";
import { toast } from "react-hot-toast";

export default function NewPartnerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminPartners"] });
      toast.success("Partner added successfully!");
      router.push("/admin/dashboard/partners");
    },
    onError: () => {
      toast.error("Failed to add partner");
    },
  });

  const onSubmit = (data: PartnerFormValues) => {
    createMutation.mutate(data);
  };

  return (
    <PartnerForm
      onSubmit={onSubmit}
      isLoading={createMutation.isPending}
      isError={createMutation.isError}
      errorMessage="Failed to add partner. Please check the required fields."
      title="Add Partner University"
      subtitle="Add a new institution to the public Partners showcase."
      submitText="Save Partner"
      onCancel={() => router.push("/admin/dashboard/partners")}
    />
  );
}
