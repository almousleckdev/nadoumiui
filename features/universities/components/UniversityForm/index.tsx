"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadMediaAsset } from "@/services/mediaService";
import { universitySchema, type UniversityFormValues } from "@/lib/validations/university";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { UNIVERSITY_FORM_TABS, type UniversityFormTabId } from "./constants";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { AcademicsTab } from "./tabs/AcademicsTab";
import { ContentTab } from "./tabs/ContentTab";
import { AccommodationTab } from "./tabs/AccommodationTab";
import { DocumentsTab } from "./tabs/DocumentsTab";
import { MediaTab } from "./tabs/MediaTab";
import { PublishTab } from "./tabs/PublishTab";

export interface UniversityFormProps {
  initialData?: any;
  onSubmit: (data: UniversityFormValues) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  title: string;
  subtitle?: string;
  submitText: string;
  onCancel: () => void;
}

export function UniversityForm({
  initialData,
  onSubmit,
  isLoading,
  isError,
  errorMessage,
  title,
  subtitle,
  submitText,
  onCancel,
}: UniversityFormProps) {
  const [activeTab, setActiveTab] = useState<UniversityFormTabId>("basic");

  // Media Upload States for single files
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  const form = useForm<UniversityFormValues>({
    resolver: zodResolver(universitySchema) as any,
    defaultValues: {
      type: "Public",
      status: "active",
      scholarshipAvailability: "Available",
      isPartner: false,
      isRecommended: false,
      isTop: false,
      foundedYear: 1950,
      totalStudents: 10000,
      internationalStudents: 500,
      facultyCount: 1000,
      qsRank: 0,
      highlights: [],
      opportunities: [],
      partnershipCountries: [],
      searchTags: [],
      advantages: [],
      campusFacilities: [],
      albums: [],
      accommodation: [],
      requiredDocuments: [],
      scholarshipNotes: [],
      rankings: [],
    },
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "logo" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (target === "logo") {
        setIsLogoUploading(true);
        const res = await uploadMediaAsset(file, "universities/logos");
        setValue("logo", res.url, { shouldValidate: true });
      } else {
        setIsBannerUploading(true);
        const res = await uploadMediaAsset(file, "universities/banners");
        setValue("bannerImage", res.url, { shouldValidate: true });
      }
    } catch (err) {
      console.error(`${target} upload failed:`, err);
      toast.error(`Failed to upload ${target}. Please try again.`);
    } finally {
      if (target === "logo") setIsLogoUploading(false);
      else setIsBannerUploading(false);
    }
  };

  const handleFormSubmit = handleSubmit((data) => onSubmit(data as any));

  return (
    <FormProvider {...form}>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-200 pb-4 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 font-heading">{title}</h1>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={handleFormSubmit} isLoading={isLoading}>
              {submitText}
            </Button>
          </div>
        </div>

        {isError && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-900/60 text-sm text-red-400 font-medium">
            {errorMessage || "An error occurred."}
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-900/60 text-sm text-orange-400 font-medium">
            Please fix the validation errors in the form before submitting.
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 shrink-0 space-y-1">
            {UNIVERSITY_FORM_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors duration-200",
                  activeTab === tab.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:bg-white hover:text-gray-800",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <form id="universityForm" onSubmit={handleFormSubmit} className="space-y-6">
              {activeTab === "basic" && <BasicInfoTab />}
              {activeTab === "academics" && <AcademicsTab />}
              {activeTab === "content" && <ContentTab />}
              {activeTab === "accommodation" && <AccommodationTab />}
              {activeTab === "documents" && <DocumentsTab />}
              {activeTab === "media" && (
                <MediaTab
                  isLogoUploading={isLogoUploading}
                  isBannerUploading={isBannerUploading}
                  onImageUpload={handleImageUpload}
                />
              )}
              {activeTab === "publish" && <PublishTab />}
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
