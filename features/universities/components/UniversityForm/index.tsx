"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { universitySchema, type UniversityFormValues } from "@/lib/validations/university";
import { toast } from "react-hot-toast";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useTabErrorCount } from "@/hooks/useTabErrorCount";

import Button from "@/components/ui/Button";
import { SidebarTabs } from "@/components/ui/SidebarTabs";
import {
  UNIVERSITY_FORM_TABS,
  UNIVERSITY_TAB_FIELD_MAP,
  getTabForField,
  type UniversityFormTabId,
} from "./constants";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { AcademicsTab } from "./tabs/AcademicsTab";
import { ContentTab } from "./tabs/ContentTab";
import { AccommodationTab } from "./tabs/AccommodationTab";
import { DocumentsTab } from "./tabs/DocumentsTab";
import { MediaTab } from "./tabs/MediaTab";
import { PublishTab } from "./tabs/PublishTab";
import { AlertCircle } from "lucide-react";

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

  const logoUpload = useImageUpload(setValue, "logo", "universities/logos", "logo");
  const bannerUpload = useImageUpload(setValue, "bannerImage", "universities/banners", "banner");
  const isLogoUploading = logoUpload.isUploading;
  const isBannerUploading = bannerUpload.isUploading;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "logo" | "banner") =>
    target === "logo" ? logoUpload.handleUpload(e) : bannerUpload.handleUpload(e);

  const onInvalid = (fieldErrors: any) => {
    console.error("University form validation errors:", fieldErrors);
    toast.error("Please fix the validation errors in the highlighted tabs.");

    // Auto-switch to the first tab that has an error
    const firstErrorKey = Object.keys(fieldErrors)[0];
    if (firstErrorKey) {
      const targetTab = getTabForField(firstErrorKey);
      setActiveTab(targetTab.id);
    }
  };

  const handleFormSubmit = handleSubmit((data) => onSubmit(data as any), onInvalid);

  const getTabErrorCount = useTabErrorCount<UniversityFormTabId>(errors, UNIVERSITY_TAB_FIELD_MAP);

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

        {/* Backend / Network Error Banner */}
        {isError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-800 font-medium flex items-center gap-2 shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <span className="font-bold text-rose-900">Submission Error: </span>
              <span>{errorMessage || "An error occurred during submission."}</span>
            </div>
          </div>
        )}

        {/* Form Validation Errors Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Please resolve the following validation errors before submitting:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(errors).map(([key, err]) => {
                const tab = getTabForField(key);
                const message = (err as any)?.message || "Required / Invalid format";
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-start justify-between p-2.5 bg-white rounded-lg border border-rose-200 hover:border-rose-400 cursor-pointer transition-colors group shadow-2xs text-left w-full"
                  >
                    <div>
                      <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px] block">
                        Tab: {tab.label}
                      </span>
                      <span className="font-bold text-rose-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </span>{" "}
                      <span className="text-gray-700">{message}</span>
                    </div>
                    <span className="text-[11px] font-bold text-orange-600 group-hover:underline shrink-0 ml-2 mt-0.5">
                      Fix &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <SidebarTabs
            tabs={UNIVERSITY_FORM_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            getErrorCount={getTabErrorCount}
          />

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
