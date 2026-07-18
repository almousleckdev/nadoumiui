"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/services/universityService";
import { uploadMediaAsset } from "@/services/mediaService";
import {
  scholarshipSchema,
  type ScholarshipFormValues,
} from "@/lib/validations/scholarship";
import { resolveDocumentUrl } from "@/utils/resolveUrl";
import { toast } from "react-hot-toast";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { TagsInput } from "@/components/ui/TagsInput";
import { cn } from "@/utils/cn";

const TABS = [
  { id: "basic", label: "Basic Info & Setup" },
  { id: "academic", label: "Academic Requirements" },
  { id: "eligibility", label: "Eligibility & Policies" },
  { id: "financials", label: "Fees & Financials" },
  { id: "details", label: "Details & Benefits" },
  { id: "publish", label: "Publish Settings" },
];


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

export function ScholarshipForm({ initialData, onSubmit, isLoading, isError, errorMessage, title, subtitle, submitText, onCancel }: ScholarshipFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
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
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;


  useEffect(() => {
    if (initialData) {
      const formattedData = { ...initialData };
      if (typeof formattedData.applicationDocuments === 'object') {
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

  const universityOptions =
    universitiesData?.universities.map((u) => ({
      value: u.id,
      label: u.name,
    })) || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-200 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={handleSubmit((data) => {
            const submitData = { ...data };
            const appDocs = submitData.applicationDocuments as any;
            if (typeof appDocs === 'string' && appDocs.trim().startsWith('[')) {
              try {
                submitData.applicationDocuments = JSON.parse(appDocs);
              } catch (e) {
                // Ignore parse errors and submit as string
              }
            }
            onSubmit(submitData as any);
          })} isLoading={isLoading}>
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
          {TABS.map((tab) => (
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
          <form
            id="scholarshipForm"
            onSubmit={handleSubmit(onSubmit as any)}
            className="space-y-6"
          >
            {/* TAB 1: BASIC INFO */}
            {activeTab === "basic" && (
              <Card className="border border-gray-200 bg-white p-6 space-y-6">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                  Core Setup
                </h2>

                <Input
                  label="Scholarship Title *"
                  placeholder="e.g. Sichuan Provincial Government Scholarship"
                  {...register("title")}
                  error={errors.title?.message}
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />
                <Input
                  label="Title in Chinese"
                  placeholder="e.g. 四川省政府奖学金"
                  {...register("titleInChinese")}
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Select
                    label="Funding Category *"
                    {...register("scholarshipCategory")}
                    options={[
                      { value: "CSC", label: "CSC (Government)" },
                      { value: "Province", label: "Province Scholarship" },
                      {
                        value: "Universities",
                        label: "University Scholarship",
                      },
                      { value: "Partial", label: "Partial Funding" },
                      { value: "Self_funded", label: "Self Funded" },
                      { value: "HSK", label: "HSK Scholarship" },
                      { value: "Type_A", label: "Type A (Full)" },
                      { value: "Type_B", label: "Type B (Partial)" },
                    ]}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Select
                    label="Partner University"
                    {...register("universities.0")}
                    options={[
                      { value: "", label: "No specific university" },
                      ...universityOptions,
                    ]}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Program Name"
                    placeholder="e.g. Computer Science"
                    {...register("programName")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Field of Study"
                    placeholder="e.g. Engineering"
                    {...register("field")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Degree"
                    placeholder="e.g. Bachelor, Master"
                    {...register("degree")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Program Duration (Years)"
                    type="number"
                    {...register("duration")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Input
                    label="Application Deadline *"
                    type="date"
                    {...register("applicationDeadline")}
                    error={errors.applicationDeadline?.message}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Start Date"
                    type="date"
                    {...register("startDate")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Intake"
                    placeholder="e.g. Autumn 2026"
                    {...register("intake")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Input
                    label="Available Slots"
                    type="number"
                    {...register("availableSlots")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Duration (Years)"
                    type="number"
                    {...register("scholarshipDuration")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Duration Text"
                    placeholder="e.g. 4 Years"
                    {...register("scholarshipDurationText")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>
              </Card>
            )}

            {/* TAB 2: ACADEMIC */}
            {activeTab === "academic" && (
              <Card className="border border-gray-200 bg-white p-6 space-y-6">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                  Score & Language Requirements
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Select
                    label="Teaching Language *"
                    {...register("teachingLanguage")}
                    options={[
                      { value: "English", label: "English Taught" },
                      { value: "Chinese", label: "Chinese Taught" },
                      { value: "Both", label: "Bilingual" },
                    ]}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Minimum GPA"
                    type="number"
                    step="0.01"
                    {...register("gpaMin")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Input
                    label="IELTS Score"
                    type="number"
                    step="0.5"
                    {...register("ieltsScore")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="TOEFL Score"
                    type="number"
                    {...register("toeflScore")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Duolingo Score"
                    type="number"
                    {...register("duolingoScore")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="HSK Level"
                    type="number"
                    {...register("hskLevel")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Custom Score Requirements"
                    placeholder="e.g. Math > 80%"
                    {...register("scoreRequirements")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    English Score Requirements Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. IELTS 6.0 or TOEFL 80"
                    {...register("scoreRequirementsEnglish")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Chinese Score Requirements Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. HSK 4 minimum 210"
                    {...register("scoreRequirementsChinese")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </Card>
            )}

            {/* TAB 3: ELIGIBILITY */}
            {activeTab === "eligibility" && (
              <Card className="border border-gray-200 bg-white p-6 space-y-6">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                  Age & Nationalities
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Minimum Age"
                    type="number"
                    {...register("ageMin")}
                    error={errors.ageMin?.message}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Maximum Age"
                    type="number"
                    {...register("ageMax")}
                    error={errors.ageMax?.message}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="China Visit Policy"
                    placeholder="e.g. Never visited China"
                    {...register("chinaVisitPolicy")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Current Location Policy"
                    placeholder="e.g. Must be outside China"
                    {...register("currentLocationPolicy")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <Controller
                  name="acceptedCountries"
                  control={control}
                  render={({ field }) => (
                    <TagsInput
                      label="Accepted Countries (Leave empty for all)"
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="e.g. Morocco, Algeria"
                    />
                  )}
                />

                <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    {...register("acceptMinors")}
                    className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm font-bold text-gray-900">
                    Accepts students under 18 (Minors)
                  </span>
                </label>

                <div className="flex flex-col gap-1.5 mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Applicant Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specific requirements for applicants..."
                    {...register("applicantRequirements")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Application Documents
                  </label>
                  <textarea
                    rows={4}
                    placeholder="List the required documents..."
                    {...register("applicationDocuments")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5 mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Additional Documents
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Any optional or additional documents..."
                    {...register("additionalDocuments")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </Card>
            )}

            {/* TAB 4: FINANCIALS */}
            {activeTab === "financials" && (
              <div className="space-y-6">
                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    University Fees
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Select
                      label="University Currency"
                      {...register("universityFeeCurrency")}
                      options={[
                        { value: "RMB", label: "RMB (¥)" },
                        { value: "USD", label: "USD ($)" },
                      ]}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Input
                      label="Registration Fee"
                      type="number"
                      {...register("registrationFee")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Original Tuition Fee"
                      type="number"
                      {...register("originalTuitionFee")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Input
                      label="Tuition After Scholarship"
                      type="number"
                      {...register("tuitionFeeAfterScholarship")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Input
                      label="Original Quad Room Fee"
                      type="number"
                      {...register("accommodationFeeQuad")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Input
                      label="Quad Room After Scholarship"
                      type="number"
                      {...register("accommodationFeeAfterScholarship")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Insurance Fee"
                      placeholder="e.g. 800 RMB/year"
                      {...register("insurance")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mt-4">
                    <label className="text-sm font-medium text-gray-700">
                      Fee Structure
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Detailed breakdown of fees..."
                      {...register("feeStructure")}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 mt-4">
                    <label className="text-sm font-medium text-gray-700">
                      Additional Fees
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any other fees..."
                      {...register("additionalFees")}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </Card>

                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    Nadoumi Agency Fees
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Select
                      label="Agency Currency"
                      {...register("nadoumiFeeCurrency")}
                      options={[
                        { value: "RMB", label: "RMB (¥)" },
                        { value: "USD", label: "USD ($)" },
                      ]}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Input
                      label="Nadoumi App Fee"
                      type="number"
                      {...register("nadoumiApplicationFee")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Input
                      label="Nadoumi Service Fee"
                      type="number"
                      {...register("nadoumiServiceFee")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                  </div>
                </Card>
              </div>
            )}

            {/* TAB 5: DETAILS & BENEFITS */}
            {activeTab === "details" && (
              <Card className="border border-gray-200 bg-white p-6 space-y-6">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                  Descriptions & Policies
                </h2>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Full Description *
                  </label>
                  <textarea
                    rows={6}
                    {...register("description")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Scholarship Policy
                  </label>
                  <textarea
                    rows={4}
                    {...register("scholarshipPolicy")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Special Notes
                  </label>
                  <textarea
                    rows={3}
                    {...register("specialNotes")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Stipend Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 2500 RMB/month for living expenses"
                    {...register("stipend")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    General Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide any additional requirements here..."
                    {...register("requirements")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Scholarship Benefits
                  </label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Free dorm, waived tuition..."
                    {...register("benefits")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Recommendation Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Why do we recommend this scholarship?"
                    {...register("recommendationNotes")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TagsInput
                      label="SEO Search Tags"
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="e.g. computer science, full scholarship"
                    />
                  )}
                />
              </Card>
            )}

            {/* TAB 6: PUBLISH & MEDIA */}
            {activeTab === "publish" && (
              <div className="space-y-6">
                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    Cover Media
                  </h2>
                  {watch("coverImage") ? (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-40 w-64">
                      <Image
                        src={resolveDocumentUrl(watch("coverImage")!)}
                        alt="Cover"
                        fill
                        sizes="256px"
                        unoptimized
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setValue("coverImage", "", { shouldValidate: true })
                        }
                        className="absolute top-2 right-2 bg-red-600 text-gray-900 rounded p-1.5 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center bg-gray-50 flex flex-col items-center justify-center min-h-40 w-64">
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="cover-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("cover-upload")?.click()
                        }
                        isLoading={isCoverUploading}
                      >
                        Upload Cover
                      </Button>
                    </div>
                  )}
                </Card>

                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    System Flags
                  </h2>
                  <Select
                    label="Publish Status *"
                    {...register("status")}
                    options={[
                      { value: "published", label: "Published & Active" },
                      { value: "draft", label: "Draft" },
                      { value: "closed", label: "Closed / Full" },
                      { value: "limited", label: "Limited Slots" },
                    ]}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />

                  <div className="flex flex-col gap-4 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        {...register("isHot")}
                        className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-bold text-gray-900">
                        Hot Selection (High Demand)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        {...register("isRecommended")}
                        className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-bold text-gray-900">
                        Nadoumi Recommended
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        {...register("isTop")}
                        className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-bold text-gray-900">
                        Top Tier Program
                      </span>
                    </label>
                  </div>
                </Card>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
