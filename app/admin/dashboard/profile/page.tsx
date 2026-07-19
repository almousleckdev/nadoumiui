"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminProfile } from "@/services/authService";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import { AdminAvatarCard } from "./AdminAvatarCard";
import { AccountInfoForm } from "./AccountInfoForm";
import { PasswordForm } from "./PasswordForm";

export default function AdminProfilePage() {
  const { data: admin, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: getAdminProfile,
  });

  if (isLoading) {
    return <Loading variant="page" text="Loading profile..." />;
  }

  if (error || !admin) {
    return (
      <ErrorState
        title="We couldn't load your profile"
        description="Please ensure you are logged in, then try again."
        onRetry={() => refetch()}
        isRetrying={isRefetching}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">Profile Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update your administrative info, change your avatar, or reset your password.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <AdminAvatarCard admin={admin} />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <AccountInfoForm admin={admin} />
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}
