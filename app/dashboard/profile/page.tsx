"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";

import {
  getStudentProfile,
  updateStudentProfile,
  changeStudentPassword,
  updateProfilePicture,
} from "@/services/authService";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Camera } from "lucide-react";

const currentLevelOptions = [
  { value: "High School", label: "High School" },
  { value: "Bachelor", label: "Bachelor" },
  { value: "Master", label: "Master" },
  { value: "PhD", label: "PhD" },
  { value: "Other", label: "Other" },
];

const studyLevelOptions = [
  { value: "High School", label: "High School" },
  { value: "Bachelor", label: "Bachelor" },
  { value: "Master", label: "Master" },
  { value: "PhD", label: "PhD" },
  { value: "Other", label: "Other" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const updateProfileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(5, "Phone is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  passportNumber: z.string().min(5, "Passport is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().optional(),
  currentLevel: z.string().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  gpa: z.string().optional(),
  gradYear: z.string().optional(),
  studyLevel: z.string().optional(),
  desiredField: z.string().optional(),
  preferredCities: z.array(z.string()).optional(),
});

type ProfileFormValues = z.infer<typeof updateProfileSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function StudentProfilePage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"General" | "Education" | "Security">("General");
  const [countries] = useState(() => countryList().getData());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: getStudentProfile,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting: isUpdatingProfile },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    if (profile) {
      const p = profile.profile || {};
      reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        country: profile.country || "",
        city: profile.city || "",
        passportNumber: profile.passportNumber || "",
        gender: profile.gender || "Male",
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split("T")[0] : "",
        currentLevel: p.education?.[0]?.degree || "",
        university: p.education?.[0]?.institution || "",
        major: p.education?.[0]?.field || "",
        gpa: p.education?.[0]?.gpa || "",
        gradYear: p.education?.[0]?.gradYear || "",
        studyLevel: p.preferences?.studyLevel || "",
        desiredField: p.preferences?.desiredField || "",
        preferredCities: p.preferences?.preferredCities || [],
      });
    }
  }, [profile, reset]);

  const updateMutation = useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["studentProfile"], data);
      toast.success("Profile updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error?.message || err.response?.data?.message || "Failed to update profile.");
    },
  });

  const handleProfileSave = (data: ProfileFormValues) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      country: data.country,
      city: data.city,
      passportNumber: data.passportNumber,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      profile: {
        education: [
          {
            degree: data.currentLevel,
            institution: data.university,
            field: data.major,
            gpa: data.gpa || undefined,
            gradYear: data.gradYear,
          }
        ],
        preferences: {
          studyLevel: data.studyLevel,
          desiredField: data.desiredField,
          preferredCities: data.preferredCities,
        }
      }
    };
    updateMutation.mutate(payload);
  };

  const passwordMutation = useMutation({
    mutationFn: changeStudentPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      passwordForm.reset();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error?.message || err.response?.data?.message || "Failed to change password.");
    },
  });

  const handlePasswordSave = (data: PasswordFormValues) => {
    passwordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  const uploadPicMutation = useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
      toast.success("Profile picture updated!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error?.message || err.response?.data?.message || "Failed to upload picture.");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadPicMutation.mutate(file);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse p-6">
        <div className="h-10 bg-gray-200 rounded-lg w-1/4" />
        <div className="h-[500px] bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Profile Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="p-6 flex flex-col items-center border border-gray-100 shadow-sm rounded-2xl">
            <div className="relative group mb-4">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                {profile?.profilePicture ? (
                  <Image
                    src={profile.profilePicture}
                    alt="Profile"
                    fill
                    sizes="128px"
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-300 bg-gray-50">
                    {profile?.firstName?.[0]}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-orange-600 text-white shadow-md hover:bg-orange-500 transition-colors"
                disabled={uploadPicMutation.isPending}
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-heading">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{profile?.email}</p>
            
            <div className="w-full pt-4 border-t border-gray-100 flex flex-col space-y-2">
              <button
                onClick={() => setActiveTab("General")}
                className={`text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  activeTab === "General" ? "bg-orange-50 text-orange-700" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveTab("Education")}
                className={`text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  activeTab === "Education" ? "bg-orange-50 text-orange-700" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Education & Preferences
              </button>
              <button
                onClick={() => setActiveTab("Security")}
                className={`text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  activeTab === "Security" ? "bg-orange-50 text-orange-700" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Security & Password
              </button>
            </div>
          </Card>
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-2/3">
          <Card className="p-8 border border-gray-100 shadow-sm rounded-2xl min-h-[500px]">
            <form onSubmit={handleSubmit(handleProfileSave)} className="space-y-6">
              <div className={activeTab === "General" ? "block" : "hidden"}>
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Personal Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input label="First Name" {...register("firstName")} error={errors.firstName?.message} />
                  <Input label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          international
                          className={`flex h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm transition-all focus-within:ring-2 focus-within:ring-orange-600/20 focus-within:border-orange-600 ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={countries}
                          value={countries.find((c) => c.label === field.value)}
                          onChange={(val) => field.onChange(val?.label)}
                        />
                      )}
                    />
                  </div>

                  <Input label="City" {...register("city")} error={errors.city?.message} />
                  <Input label="Passport Number" {...register("passportNumber")} error={errors.passportNumber?.message} />
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={genderOptions}
                          value={genderOptions.find((o) => o.value === field.value)}
                          onChange={(val) => field.onChange(val?.value)}
                        />
                      )}
                    />
                  </div>

                  <Input type="date" label="Date of Birth" {...register("dateOfBirth")} />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button type="submit" variant="primary" isLoading={isUpdatingProfile}>
                    Save Changes
                  </Button>
                </div>
              
              </div>
              <div className={activeTab === "Education" ? "block space-y-8" : "hidden"}>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Education Background</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Level</label>
                      <Controller
                        name="currentLevel"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={currentLevelOptions}
                            value={currentLevelOptions.find((o) => o.value === field.value)}
                            onChange={(val) => field.onChange(val?.value)}
                          />
                        )}
                      />
                    </div>
                    <Input label="University" {...register("university")} />
                    <Input label="Major" {...register("major")} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="GPA" {...register("gpa")} />
                      <Input label="Grad Year" {...register("gradYear")} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Study Preferences</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Desired Level</label>
                      <Controller
                        name="studyLevel"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={studyLevelOptions}
                            value={studyLevelOptions.find((o) => o.value === field.value)}
                            onChange={(val) => field.onChange(val?.value)}
                          />
                        )}
                      />
                    </div>
                    <Input label="Desired Field" {...register("desiredField")} />
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Cities</label>
                      <Controller
                        name="preferredCities"
                        control={control}
                        render={({ field }) => (
                          <CreatableSelect
                            {...field}
                            isMulti
                            components={{ DropdownIndicator: null }}
                            value={(field.value || []).map((v) => ({ value: v, label: v }))}
                            onChange={(selected) => field.onChange(selected.map((s) => s.value))}
                            placeholder="Type a city and press Enter..."
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" variant="primary" isLoading={isUpdatingProfile}>
                    Save Preferences
                  </Button>
                </div>
              
              </div>
            </form>

            {activeTab === "Security" && (
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
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
