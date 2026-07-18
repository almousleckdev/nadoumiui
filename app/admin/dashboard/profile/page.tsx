"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminProfile,
  updateAdminProfile,
  updateAdminProfilePicture,
  changeAdminPassword,
} from "@/services/authService";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function AdminProfilePage() {
  const queryClient = useQueryClient();

  // Queries
  const {
    data: admin,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: getAdminProfile,
  });

  // State for Profile Information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  // State for Security Settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Sync state once data loads
  React.useEffect(() => {
    if (admin) {
      setName(admin.name || "");
      setEmail(admin.email || "");
      setPhone(admin.phone || "");
      setCountry(admin.country || "");
    }
  }, [admin]);

  // Mutations
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

  const uploadPhotoMutation = useMutation({
    mutationFn: updateAdminProfilePicture,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["adminProfile"] });
      toast.success("Profile picture updated successfully!");
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to upload profile picture."));
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changeAdminPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to change password."));
    },
  });

  // Handle Handlers
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    updateProfileMutation.mutate({
      name,
      email,
      phone: phone || null,
      country: country || null,
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Current password is required.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadPhotoMutation.mutate(file);
    }
  };

  if (isLoading) {
    return <Loading variant="page" text="Loading profile..." />;
  }

  if (error || !admin) {
    return (
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-medium">
        Failed to fetch admin profile. Please ensure you are logged in.
      </div>
    );
  }

  const pfpUrl = admin.profilePicture
    ? admin.profilePicture.startsWith("http")
      ? admin.profilePicture
      : `http://localhost:3002${admin.profilePicture}`
    : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
          Profile Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Update your administrative info, change your avatar, or reset your
          password.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar/Photo */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border-gray-200 flex flex-col items-center">
            <h2 className="text-base font-bold text-gray-900 font-heading mb-4 self-start">
              Profile Photo
            </h2>
            <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
              {pfpUrl ? (
                <Image
                  src={pfpUrl}
                  alt={admin.name}
                  fill
                  sizes="128px"
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-gray-400 uppercase">
                  {admin.name?.charAt(0) || "A"}
                </span>
              )}
              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold cursor-pointer">
                <Upload className="w-6 h-6 mb-1" strokeWidth={2} />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploadPhotoMutation.isPending}
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
              Recommended: Square JPG or PNG, max 2MB.
            </p>
          </Card>
        </div>

        {/* Right Side: Account Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Form */}
          <Card className="p-6 bg-white border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 font-heading mb-6">
              Account Information
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Administrator"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@nadoumi.com"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +86 138 0000 0000"
                />
                <Input
                  label="Country/Region"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. China"
                />
              </div>



              <div className="flex justify-end pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={updateProfileMutation.isPending}
                >
                  Save Information
                </Button>
              </div>
            </form>
          </Card>

          {/* Change Password Form */}
          <Card className="p-6 bg-white border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 font-heading mb-6">
              Security & Password
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                />
              </div>



              <div className="flex justify-end pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={changePasswordMutation.isPending}
                >
                  Change Password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
