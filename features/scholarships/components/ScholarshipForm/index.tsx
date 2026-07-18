"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/services/universityService";
import { uploadMediaAsset } from "@/services/mediaService";
import { scholarshipSchema, type ScholarshipFormValues } from "@/lib/validations/scholarship";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { SCHOLARSHIP_FORM_TABS, type ScholarshipFormTabId } from "./constants";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { AcademicTab } from "./tabs/AcademicTab";
import { EligibilityTab } from "./tabs/EligibilityTab";
import { FinancialsTab } from "./tabs/FinancialsTab";
import { DetailsTab } from "./tabs/DetailsTab";
import { PublishTab } from "./tabs/PublishTab";

export interface ScholarshipFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  title: string;
  subtitle?: string;
  submitText: string;
  onCancel: () => void;
}

export function ScholarshipForm({
  initialData,
  onSubmit,
  isLoading,
  isError,
  errorMessage,
  title,
  subtitle,
  submitText,
  onCancel,
}: ScholarshipFormProps) {
  const [activeTab, setActiveTab] = useState<ScholarshipFormTabId>("basic");
  const [isCoverUploading, setIsCoverUploading] = useState(false);

  // Fetch partner universities for dropdown
  const { data: universitiesData } = useQuery({
    queryKey: ["adminUniversitiesDropdown"],
    queryFn: () => getUniversities({ limit: 100 }),
  });

  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(scholarshipSchema) as any,
    defaultValues: {
      scholarshipCategory: "Partial",
      programCategories: ["Bachelor"],
      teachingLanguage: "English",
      status: "draft",
      availableSlots: 1,
      scholarshipDuration: 4,
      ageMin: 18,
      ageMax: 30,
      isRecommended: false,
      isHot: false,
      isTop: false,
      universities: [],
      acceptedCountries: [],
      tags: [],
      universityFeeCurrency: "RMB",
      nadoumiFeeCurrency: "USD",
      acceptMinors: false,
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
      const formattedData = { ...initialData };
      if (typeof formattedData.applicationDocuments === "object") {
        formattedData.applicationDocuments = JSON.stringify(formattedData.applicationDocuments, null, 2);
      }
      reset(formattedData);
    }
  }, [initialData, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCoverUploading(true);
      const res = await uploadMediaAsset(file, "scholarships");
      setValue("coverImage", res.url, { shouldValidate: true });
    } catch (err) {
      console.error("Cover upload failed:", err);
      toast.error("Failed to upload cover image. Please try again.");
    } finally {
      setIsCoverUploading(false);
    }
  };

  const handleFormSubmit = handleSubmit((data) => {
    const submitData = { ...data };
    const appDocs = submitData.applicationDocuments as any;
    if (typeof appDocs === "string" && appDocs.trim().startsWith("[")) {
      try {
        submitData.applicationDocuments = JSON.parse(appDocs);
      } catch {
        // Ignore parse errors and submit as string
      }
    }
    onSubmit(submitData as any);
  });

  const universityOptions =
    universitiesData?.universities.map((u) => ({
      value: u.id,
      label: u.name,
    })) || [];

  return (
    <FormProvider {...form}>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
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
            There are validation errors. Please fix them before submitting.
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 shrink-0 space-y-1">
            {SCHOLARSHIP_FORM_TABS.map((tab) => (
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

          <div className="flex-1">
            <form id="scholarshipForm" onSubmit={handleFormSubmit} className="space-y-6">
              {activeTab === "basic" && <BasicInfoTab universityOptions={universityOptions} />}
              {activeTab === "academic" && <AcademicTab />}
              {activeTab === "eligibility" && <EligibilityTab />}
              {activeTab === "financials" && <FinancialsTab />}
              {activeTab === "details" && <DetailsTab />}
              {activeTab === "publish" && (
                <PublishTab isCoverUploading={isCoverUploading} onImageUpload={handleImageUpload} />
              )}
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
