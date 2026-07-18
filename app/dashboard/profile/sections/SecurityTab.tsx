import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { changeStudentPassword } from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { passwordSchema, type PasswordFormValues } from "../schema";

export function SecurityTab() {
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const passwordMutation = useMutation({
    mutationFn: changeStudentPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      passwordForm.reset();
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to change password."));
    },
  });

  const handlePasswordSave = (data: PasswordFormValues) => {
    passwordMutation.mutate({ currentPassword: data.currentPassword, newPassword: data.newPassword });
  };

  return (
    <form onSubmit={passwordForm.handleSubmit(handlePasswordSave)} className="space-y-6 max-w-md">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Change Password</h3>

      <Input
        label="Current Password"
        type="password"
        {...passwordForm.register("currentPassword")}
        error={passwordForm.formState.errors.currentPassword?.message}
      />
      <Input
        label="New Password"
        type="password"
        {...passwordForm.register("newPassword")}
        error={passwordForm.formState.errors.newPassword?.message}
      />
      <Input
        label="Confirm New Password"
        type="password"
        {...passwordForm.register("confirmPassword")}
        error={passwordForm.formState.errors.confirmPassword?.message}
      />

      <div className="pt-4">
        <Button type="submit" variant="primary" isLoading={passwordMutation.isPending}>
          Update Password
        </Button>
      </div>
    </form>
  );
}
