import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { updateAdminProfile } from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { Admin } from "@/types";

const accountInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
});

type AccountInfoFormValues = z.infer<typeof accountInfoSchema>;

export function AccountInfoForm({ admin }: { admin: Admin }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountInfoFormValues>({
    resolver: zodResolver(accountInfoSchema),
  });

  useEffect(() => {
    reset({
      name: admin.name || "",
      email: admin.email || "",
      phone: admin.phone || "",
      country: admin.country || "",
    });
  }, [admin, reset]);

  const updateProfileMutation = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: (updatedAdmin) => {
      queryClient.setQueryData(["adminProfile"], updatedAdmin);
      toast.success("Profile information updated successfully!");
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to update profile info."));
    },
  });

  const onSubmit = (data: AccountInfoFormValues) => {
    updateProfileMutation.mutate({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      country: data.country || null,
    });
  };

  return (
    <Card className="p-6 bg-white border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 font-heading mb-6">Account Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Name"
            placeholder="e.g. Administrator"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. admin@nadoumi.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="e.g. +86 138 0000 0000"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Country/Region"
            placeholder="e.g. China"
            error={errors.country?.message}
            {...register("country")}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" type="submit" isLoading={updateProfileMutation.isPending}>
            Save Information
          </Button>
        </div>
      </form>
    </Card>
  );
}
