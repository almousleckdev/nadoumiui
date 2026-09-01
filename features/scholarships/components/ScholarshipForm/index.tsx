"use client";

import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/services/universityService";
import { scholarshipSchema, type ScholarshipFormValues } from "@/lib/validations/scholarship";
import { toast } from "react-hot-toast";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useTabErrorCount } from "@/hooks/useTabErrorCount";

import Button from "@/components/ui/Button";
import { SidebarTabs } from "@/components/ui/SidebarTabs";
import {
  SCHOLARSHIP_FORM_TABS,
  SCHOLARSHIP_TAB_FIELD_MAP,
  getScholarshipTabForField,
  type ScholarshipFormTabId,
} from "./constants";
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

  const { isUploading: isCoverUploading, handleUpload: handleImageUpload } = useImageUpload(
    setValue,
    "coverImage",
    "scholarships",
    "cover image"
  );

  const onInvalid = (fieldErrors: any) => {
    console.error("Scholarship form validation errors:", fieldErrors);
    toast.error("Please fix the validation errors in the highlighted tabs.");

    const firstErrorKey = Object.keys(fieldErrors)[0];
    if (firstErrorKey) {
      const targetTab = getScholarshipTabForField(firstErrorKey);
      setActiveTab(targetTab.id);
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
    onInvalid
  );

  const universityOptions =
    universitiesData?.universities.map((u) => ({
      value: u.id,
      label: u.name,
    })) || [];

  const getTabErrorCount = useTabErrorCount<ScholarshipFormTabId>(errors, SCHOLARSHIP_TAB_FIELD_MAP);

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

        {/* Backend / Network Error Banner */}
        {isError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-800 font-medium flex items-center gap-2 shadow-xs">
            <span className="font-bold text-rose-900">Submission Error:</span> {errorMessage || "An error occurred during submission."}
          </div>
        )}

        {/* Form Validation Errors Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 shadow-sm space-y-3">
            <div className="font-bold flex items-center gap-2 text-rose-800 text-sm">
              <span>Please resolve the following validation errors before submitting:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(errors).map(([key, err]) => {
                const tab = getScholarshipTabForField(key);
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
          <SidebarTabs
            tabs={SCHOLARSHIP_FORM_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            getErrorCount={getTabErrorCount}
          />

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
