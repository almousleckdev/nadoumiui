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
  const {
    data: universitiesData,
    error: universitiesError,
    refetch: refetchUniversities,
    isRefetching: isRefetchingUniversities,
  } = useQuery({
    queryKey: ["adminUniversitiesDropdown"],
    queryFn: () => getUniversities({ limit: 100 }),
  });

  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(scholarshipSchema) as any,
    defaultValues: {
      title: "",
      description: "Detailed scholarship program offering tuition assistance, accommodation support, and study opportunities for international students.",
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
      if (Array.isArray(formattedData.programSelection)) {
        const progObj: Record<string, any> = {};
        formattedData.programSelection.forEach((item: any) => {
          if (item && item.programType) {
            progObj[item.programType] = {
              majors: Array.isArray(item.majors) ? item.majors : [],
              stipendAmount: item.stipendAmount ?? "",
              stipendUnit: item.stipendUnit || "RMB",
            };
          }
        });
        formattedData.programSelection = progObj;
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

  const handleFormSubmit = handleSubmit(
    (data) => {
      const submitData = { ...data };
      if (Array.isArray(submitData.universities)) {
        submitData.universities = submitData.universities.filter(Boolean);
      }
      if (
        submitData.programSelection &&
        !Array.isArray(submitData.programSelection) &&
        typeof submitData.programSelection === "object"
      ) {
        submitData.programSelection = Object.entries(submitData.programSelection).map(
          ([programType, value]: [string, any]) => ({
            programType: programType as "Language" | "Bachelor" | "Master" | "PhD",
            majors: Array.isArray(value?.majors) ? value.majors : [],
            stipendAmount: value?.stipendAmount ? Number(value.stipendAmount) : null,
            stipendUnit: "RMB",
          })
        );
      }

      // Populate legacy stipend field for backwards compatibility
      if (submitData.hasStipend && Array.isArray(submitData.programSelection)) {
        const stipendObj: Record<string, number> = {};
        (submitData.programSelection as any[]).forEach((p) => {
          if (p.stipendAmount) {
            stipendObj[p.programType] = p.stipendAmount;
          }
        });
        if (Object.keys(stipendObj).length > 0) {
          submitData.stipend = stipendObj;
        }
      }
      const appDocs = submitData.applicationDocuments as any;
      if (typeof appDocs === "string" && appDocs.trim().startsWith("[")) {
        try {
          submitData.applicationDocuments = JSON.parse(appDocs);
        } catch {
          // Ignore parse errors and submit as string
        }
      }
      onSubmit(submitData as any);
    },
    (errors) => {
      console.error("Form validation errors:", errors);
      toast.error("Please fix validation errors listed in the red error banner.");
    }
  );

  const universityOptions =
    universitiesData?.universities.map((u) => ({
      value: u.id,
      label: u.name,
    })) || [];

  // Map fields to form tabs to show validation indicator on tab buttons
  const getTabHasError = (tabId: ScholarshipFormTabId) => {
    if (Object.keys(errors).length === 0) return false;
    const tabFieldMap: Record<ScholarshipFormTabId, string[]> = {
      basic: ["title", "scholarshipCategory", "programCategories", "applicationDeadline", "universities", "programSelection"],
      academic: ["gpaMin", "ieltsScore", "toeflScore", "hskLevel"],
      eligibility: ["ageMin", "ageMax", "acceptedCountries"],
      financials: ["originalTuitionFee", "tuitionFeeAfterScholarship", "visaFee"],
      details: ["description", "benefits"],
      publish: ["coverImage", "status"],
    };
    const fields = tabFieldMap[tabId] || [];
    return fields.some((f) => Boolean(errors[f as keyof typeof errors]));
  };

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
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium flex items-center gap-2">
            <span className="font-bold">Error:</span> {errorMessage || "An error occurred during submission."}
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-900 font-medium space-y-2 shadow-xs">
            <div className="font-bold flex items-center gap-2 text-red-700 text-sm">
              <span>Form Validation Errors - Please fix the fields below:</span>
            </div>
            <ul className="list-disc pl-5 text-xs space-y-1 text-red-800">
              {Object.entries(errors).map(([key, err]) => (
                <li key={key}>
                  <strong className="capitalize font-bold text-red-900">{key}:</strong> {(err as any)?.message || "Required / Invalid format"}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 shrink-0 space-y-1">
            {SCHOLARSHIP_FORM_TABS.map((tab) => {
              const hasErr = getTabHasError(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors duration-200 flex items-center justify-between",
                    activeTab === tab.id
                      ? "bg-slate-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <span>{tab.label}</span>
                  {hasErr && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-300 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex-1">
            <form id="scholarshipForm" onSubmit={handleFormSubmit} className="space-y-6">
              {activeTab === "basic" && (
                <>
                  {universitiesError && (
                    <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100 text-xs text-orange-700">
                      <span>Couldn&apos;t load the university list.</span>
                      <button
                        type="button"
                        onClick={() => refetchUniversities()}
                        disabled={isRefetchingUniversities}
                        className="font-semibold underline hover:no-underline disabled:opacity-50"
                      >
                        {isRefetchingUniversities ? "Retrying..." : "Retry"}
                      </button>
                    </div>
                  )}
                  <BasicInfoTab
                    universityOptions={universityOptions}
                    universities={(universitiesData?.universities as any) || []}
                  />
                </>
              )}
              {activeTab === "academic" && <AcademicTab />}
              {activeTab === "eligibility" && (
                <EligibilityTab universities={(universitiesData?.universities as any) || []} />
              )}
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
