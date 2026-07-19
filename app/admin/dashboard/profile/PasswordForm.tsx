import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { changeAdminPassword } from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function PasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const changePasswordMutation = useMutation({
    mutationFn: changeAdminPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      reset();
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to change password."));
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    changePasswordMutation.mutate({ currentPassword: data.currentPassword, newPassword: data.newPassword });
  };

  return (
    <Card className="p-6 bg-white border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 font-heading mb-6">Security & Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="New Password"
            type="password"
            placeholder="At least 8 characters"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Repeat new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" type="submit" isLoading={changePasswordMutation.isPending}>
            Change Password
          </Button>
        </div>
      </form>
    </Card>
  );
}
