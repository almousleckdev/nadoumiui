"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadMediaAsset } from "@/services/mediaService";
import { universitySchema, type UniversityFormValues } from "@/lib/validations/university";
import { resolveDocumentUrl } from "@/utils/resolveUrl";
import { toast } from "react-hot-toast";

// UI Components
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { TagsInput } from "@/components/ui/TagsInput";
import { MultiImageUpload } from "@/components/ui/MultiImageUpload";
import { cn } from "@/utils/cn";

const TABS = [
  { id: "basic", label: "Basic Info" },
  { id: "academics", label: "Academics" },
  { id: "content", label: "Content & Details" },
  { id: "accommodation", label: "Accommodation" },
  { id: "documents", label: "Documents" },
  { id: "media", label: "Media & Links" },
  { id: "publish", label: "Publish Settings" },
];


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

export function UniversityForm({ initialData, onSubmit, isLoading, isError, errorMessage, title, subtitle, submitText, onCancel }: UniversityFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
  
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

  const { control, register, handleSubmit, watch, setValue, reset, formState: { errors } } = form;


  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Field Arrays
  const { fields: accFields, append: appendAcc, remove: removeAcc } = useFieldArray({
    control,
    name: "accommodation",
  });

  const { fields: docFields, append: appendDoc, remove: removeDoc } = useFieldArray({
    control,
    name: "requiredDocuments",
  });

  const { fields: majorFields, append: appendMajor, remove: removeMajor } = useFieldArray({
    control,
    name: "majors",
  });

  const { fields: rankFields, append: appendRank, remove: removeRank } = useFieldArray({
    control,
    name: "rankings",
  });




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

  // Error debugging
  if (Object.keys(errors).length > 0) {
    console.log("Validation Errors:", errors);
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
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
          <Button type="button" variant="primary" onClick={handleSubmit((data) => onSubmit(data as any))} isLoading={isLoading}>
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
          Please fix the validation errors in the form before submitting. Check console for details.
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors duration-200",
                activeTab === tab.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-white hover:text-gray-800"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <form id="universityForm" onSubmit={handleSubmit((data) => onSubmit(data as any))} className="space-y-6">
            
            {/* TAB 1: BASIC INFO */}
            {activeTab === "basic" && (
              <Card className="border border-gray-200 bg-white p-6 space-y-6">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                  Core Identities & Academic Standing
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="University ID * (Unique)"
                    placeholder="e.g. U-Tsinghua"
                    {...register("universityId")}
                    error={errors.universityId?.message}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="English Name *"
                    placeholder="e.g. Tsinghua University"
                    {...register("name")}
                    error={errors.name?.message}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Chinese Name"
                    placeholder="e.g. 清华大学"
                    {...register("nameInChinese")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Select
                    label="Institution Type"
                    {...register("type")}
                    options={[
                      { value: "Public", label: "Public" },
                      { value: "Private", label: "Private" },
                    ]}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Input
                    label="City"
                    placeholder="e.g. Beijing"
                    {...register("city")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Province"
                    placeholder="e.g. Beijing"
                    {...register("province")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Founded Year"
                    type="number"
                    {...register("foundedYear")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Input
                    label="Total Students"
                    type="number"
                    {...register("totalStudents")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="International Students"
                    type="number"
                    {...register("internationalStudents")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="QS World Rank"
                    type="number"
                    {...register("qsRank")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Faculty Count"
                    type="number"
                    {...register("facultyCount")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Number of Programs"
                    type="number"
                    {...register("numberOfPrograms")}
                    className="bg-gray-50 border-gray-200 text-gray-900"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Quick Introduction</label>
                  <textarea
                    rows={2}
                    placeholder="Punchy one-liner..."
                    {...register("introduction")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </Card>
            )}

            {/* TAB: ACADEMICS */}
            {activeTab === "academics" && (
              <div className="space-y-6">
                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                      University Rankings
                    </h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendRank({ rank: "", organization: "", year: new Date().getFullYear() })}
                    >
                      + Add Ranking
                    </Button>
                  </div>
                  {rankFields.length === 0 ? (
                    <p className="text-gray-400 text-sm py-4 text-center">No rankings added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {rankFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 border border-gray-200 bg-gray-50 rounded-lg">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Input
                              placeholder="Organization (e.g. QS, Times)"
                              {...register(`rankings.${index}.organization` as const)}
                              className="bg-white border-gray-200 text-gray-900"
                            />
                            <Input
                              placeholder="Rank (e.g. 15, Top 100)"
                              {...register(`rankings.${index}.rank` as const)}
                              className="bg-white border-gray-200 text-gray-900"
                            />
                            <Input
                              placeholder="Year"
                              type="number"
                              {...register(`rankings.${index}.year` as const)}
                              className="bg-white border-gray-200 text-gray-900"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeRank(index)}
                            className="mt-2 text-red-500 hover:text-red-400 font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                      Available Majors
                    </h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendMajor({ name: "", degree: "Bachelor", duration: "4 Years", tuitionFee: "" })}
                    >
                      + Add Major
                    </Button>
                  </div>
                  {majorFields.length === 0 ? (
                    <p className="text-gray-400 text-sm py-4 text-center">No majors added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {majorFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start p-4 border border-gray-200 bg-gray-50 rounded-lg">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                              label="Major Name"
                              placeholder="e.g. Computer Science"
                              {...register(`majors.${index}.name` as const)}
                              className="bg-white border-gray-200 text-gray-900"
                            />
                            <Input
                              label="Degree"
                              placeholder="e.g. Bachelor, Master"
                              {...register(`majors.${index}.degree` as const)}
                              className="bg-white border-gray-200 text-gray-900"
                            />
                            <Input
                              label="Duration"
                              placeholder="e.g. 4 Years"
                              {...register(`majors.${index}.duration` as const)}
                              className="bg-white border-gray-200 text-gray-900"
                            />
                            <Input
                              label="Tuition Fee (RMB/Year)"
                              placeholder="e.g. 25000"
                              {...register(`majors.${index}.tuitionFee` as const)}
                              className="bg-white border-gray-200 text-gray-900"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMajor(index)}
                            className="mt-8 text-red-500 hover:text-red-400 font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* TAB 2: CONTENT & DETAILS */}
            {activeTab === "content" && (
              <div className="space-y-6">
                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    Rich Descriptions
                  </h2>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Detailed Description</label>
                    <textarea
                      rows={5}
                      {...register("description")}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">History & Background</label>
                    <textarea
                      rows={4}
                      {...register("history")}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </Card>

                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    Arrays & Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Controller
                      name="highlights"
                      control={control}
                      render={({ field }) => (
                        <TagsInput
                          label="University Highlights"
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="Add a highlight..."
                        />
                      )}
                    />
                    <Controller
                      name="advantages"
                      control={control}
                      render={({ field }) => (
                        <TagsInput
                          label="Study Advantages"
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="Add an advantage..."
                        />
                      )}
                    />
                    <Controller
                      name="campusFacilities"
                      control={control}
                      render={({ field }) => (
                        <TagsInput
                          label="Campus Facilities"
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="e.g. Olympic Swimming Pool"
                        />
                      )}
                    />
                    <Controller
                      name="opportunities"
                      control={control}
                      render={({ field }) => (
                        <TagsInput
                          label="Global Opportunities"
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="e.g. Internships at ByteDance"
                        />
                      )}
                    />
                    <Controller
                      name="searchTags"
                      control={control}
                      render={({ field }) => (
                        <TagsInput
                          label="Search Tags (SEO)"
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="e.g. engineering, medical"
                        />
                      )}
                    />
                  </div>
                </Card>
              </div>
            )}

            {/* TAB 3: ACCOMMODATION */}
            {activeTab === "accommodation" && (
              <Card className="border border-gray-200 bg-white p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                    Accommodation Pricing Options
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendAcc({ type: "", pricePerYear: 0, feeUnit: "RMB/Year", facilities: [], notes: "" })}
                  >
                    + Add Room Option
                  </Button>
                </div>
                
                {accFields.length === 0 ? (
                  <p className="text-gray-400 text-sm py-4 text-center">No accommodation options added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {accFields.map((field, index) => (
                      <div key={field.id} className="p-4 border border-gray-200 bg-gray-50 rounded-lg relative">
                        <button
                          type="button"
                          onClick={() => removeAcc(index)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-400 font-bold"
                        >
                          Remove
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 pr-12">
                          <Input
                            label="Room Type"
                            placeholder="e.g. Double Room"
                            {...register(`accommodation.${index}.type` as const)}
                            className="bg-white border-gray-200 text-gray-900"
                          />
                          <Input
                            label="Price"
                            type="number"
                            {...register(`accommodation.${index}.pricePerYear` as const)}
                            className="bg-white border-gray-200 text-gray-900"
                          />
                          <Input
                            label="Unit"
                            placeholder="e.g. RMB/Year"
                            {...register(`accommodation.${index}.feeUnit` as const)}
                            className="bg-white border-gray-200 text-gray-900"
                          />
                        </div>
                        <div className="space-y-4">
                          <Controller
                            name={`accommodation.${index}.facilities` as const}
                            control={control}
                            render={({ field }) => (
                              <TagsInput
                                label="Room Facilities"
                                value={field.value || []}
                                onChange={field.onChange}
                                placeholder="e.g. AC, Private Bathroom"
                              />
                            )}
                          />
                          <Input
                            label="Notes"
                            placeholder="Additional details..."
                            {...register(`accommodation.${index}.notes` as const)}
                            className="bg-white border-gray-200 text-gray-900"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* TAB 4: DOCUMENTS */}
            {activeTab === "documents" && (
              <Card className="border border-gray-200 bg-white p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                    Required Documents Checklist
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendDoc({ name: "", required: true, notes: "" })}
                  >
                    + Add Document
                  </Button>
                </div>
                
                {docFields.length === 0 ? (
                  <p className="text-gray-400 text-sm py-4 text-center">No required documents specified.</p>
                ) : (
                  <div className="space-y-3">
                    {docFields.map((field, index) => (
                      <div key={field.id} className="flex gap-4 items-start p-4 border border-gray-200 bg-gray-50 rounded-lg">
                        <div className="flex-1 space-y-3">
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <Input
                                placeholder="Document Name (e.g. Passport Copy)"
                                {...register(`requiredDocuments.${index}.name` as const)}
                                className="bg-white border-gray-200 text-gray-900"
                              />
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <input
                                type="checkbox"
                                {...register(`requiredDocuments.${index}.required` as const)}
                                className="h-4.5 w-4.5 rounded border-gray-200 bg-gray-50 text-orange-600 focus:ring-orange-500"
                              />
                              <span className="text-sm text-gray-700">Required</span>
                            </div>
                          </div>
                          <Input
                            placeholder="Notes/Instructions (optional)"
                            {...register(`requiredDocuments.${index}.notes` as const)}
                            className="bg-white border-gray-200 text-gray-900"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDoc(index)}
                          className="mt-2 text-red-500 hover:text-red-400 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* TAB 5: MEDIA & LINKS */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    Branding Assets
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">University Logo</label>
                      {watch("logo") ? (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-32 flex items-center justify-center p-4">
                          <Image
                            src={resolveDocumentUrl(watch("logo")!)}
                            alt="Logo"
                            fill
                            sizes="128px"
                            unoptimized
                            className="object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => setValue("logo", "", { shouldValidate: true })}
                            className="absolute top-2 right-2 bg-red-600 text-gray-900 rounded p-1 text-[10px]"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-32">
                          <input type="file" onChange={(e) => handleImageUpload(e, "logo")} className="hidden" id="logo-upload" />
                          <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById("logo-upload")?.click()} isLoading={isLogoUploading}>
                            Upload Logo
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700">Cover Banner</label>
                      {watch("bannerImage") ? (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-32">
                          <Image
                            src={resolveDocumentUrl(watch("bannerImage")!)}
                            alt="Banner"
                            fill
                            sizes="100vw"
                            unoptimized
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setValue("bannerImage", "", { shouldValidate: true })}
                            className="absolute top-2 right-2 bg-red-600 text-gray-900 rounded p-1 text-[10px]"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-32">
                          <input type="file" onChange={(e) => handleImageUpload(e, "banner")} className="hidden" id="banner-upload" />
                          <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById("banner-upload")?.click()} isLoading={isBannerUploading}>
                            Upload Banner
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    Campus Life Gallery (Albums)
                  </h2>
                  <Controller
                    name="albums"
                    control={control}
                    render={({ field }) => (
                      <MultiImageUpload
                        value={field.value || []}
                        onChange={field.onChange}
                        folder="universities/albums"
                      />
                    )}
                  />
                </Card>

                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    Contact Channels
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Input
                      label="Official Website"
                      {...register("officialWebsite")}
                      error={errors.officialWebsite?.message}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Input
                      label="Admissions Email"
                      {...register("admissionsEmail")}
                      error={errors.admissionsEmail?.message}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Input
                      label="Office Phone"
                      {...register("officePhone")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                  </div>
                </Card>
              </div>
            )}

            {/* TAB 6: PUBLISH & PROMO */}
            {activeTab === "publish" && (
              <div className="space-y-6">
                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    System Flags
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Select
                      label="Publish Status *"
                      {...register("status")}
                      options={[
                        { value: "active", label: "Active & Published" },
                        { value: "draft", label: "Draft" },
                        { value: "inactive", label: "Inactive / Hidden" },
                      ]}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <Select
                      label="Scholarships Status"
                      {...register("scholarshipAvailability")}
                      options={[
                        { value: "Available", label: "Available" },
                        { value: "Limited", label: "Limited Slots" },
                        { value: "Not Available", label: "Not Available" },
                      ]}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                  </div>
                </Card>

                <Card className="border border-gray-200 bg-white p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
                    Promotional Settings
                  </h2>
                  <div className="flex flex-col gap-4 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        {...register("isRecommended")}
                        className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-bold text-gray-900">Nadoumi Recommended</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        {...register("isPartner")}
                        className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-bold text-gray-900">Official Partner University</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        {...register("isTop")}
                        className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-bold text-gray-900">Top Tier Institution</span>
                    </label>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <Controller
                      name="searchTags"
                      control={control}
                      render={({ field }) => (
                        <TagsInput
                          label="SEO Search Tags"
                          value={field.value || []}
                          onChange={field.onChange}
                          placeholder="e.g. engineering, scholarships"
                        />
                      )}
                    />
                    <Input
                      label="Search Keywords"
                      placeholder="e.g. Beijing top tech school"
                      {...register("searchKeywords")}
                      className="bg-gray-50 border-gray-200 text-gray-900"
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">Recommendation Notes</label>
                      <textarea
                        rows={3}
                        placeholder="Why do we recommend this university?"
                        {...register("recommendationNotes")}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
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
