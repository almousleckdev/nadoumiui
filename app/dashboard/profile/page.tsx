"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";

import { getStudentProfile, updateStudentProfile, updateProfilePicture } from "@/services/authService";
import Card from "@/components/ui/Card";
import ErrorState from "@/components/ui/ErrorState";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { updateProfileSchema, type ProfileFormValues } from "./schema";
import { ProfileSidebarCard, type ProfileTab } from "./ProfileSidebarCard";
import { GeneralTab } from "./sections/GeneralTab";
import { EducationTab } from "./sections/EducationTab";
import { SecurityTab } from "./sections/SecurityTab";

export default function StudentProfilePage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ProfileTab>("General");
  const [countries] = useState(() => countryList().getData());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: profile, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: getStudentProfile,
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
  });
  const { handleSubmit, reset, formState: { isSubmitting: isUpdatingProfile } } = form;

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
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to update profile."));
    },
  });

  const handleProfileSave = (data: ProfileFormValues) => {
    updateMutation.mutate({
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
          },
        ],
        preferences: {
          studyLevel: data.studyLevel,
          desiredField: data.desiredField,
          preferredCities: data.preferredCities,
        },
      },
    });
  };

  const uploadPicMutation = useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
      toast.success("Profile picture updated!");
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to upload picture."));
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

  if (error) {
    return (
      <ErrorState
        title="We couldn't load your profile"
        onRetry={() => refetch()}
        isRetrying={isRefetching}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <ProfileSidebarCard
          profile={profile}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          isUploadingPicture={uploadPicMutation.isPending}
        />

        <div className="w-full md:w-2/3">
          <Card className="p-8 border border-gray-100 shadow-sm rounded-2xl min-h-[500px]">
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(handleProfileSave)} className="space-y-6">
                {/* Both tabs stay mounted (toggled via display) rather than conditionally
                    rendered — they're fields of the same form, and switching tabs
                    shouldn't require re-registering them. */}
                <div className={activeTab === "General" ? "block" : "hidden"}>
                  <GeneralTab countries={countries} isSaving={isUpdatingProfile} />
                </div>
                <div className={activeTab === "Education" ? "block space-y-8" : "hidden"}>
                  <EducationTab isSaving={isUpdatingProfile} />
                </div>
              </form>
            </FormProvider>

            {activeTab === "Security" && <SecurityTab />}
          </Card>
        </div>
      </div>
    </div>
  );
}
