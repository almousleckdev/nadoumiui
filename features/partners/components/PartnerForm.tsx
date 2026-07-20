"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { uploadMediaAsset } from "@/services/mediaService";
import { partnerSchema, type PartnerFormValues } from "@/lib/validations/partner";
import { resolveDocumentUrl } from "@/utils/resolveUrl";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { TagsInput } from "@/components/ui/TagsInput";
import { BuildingOfficeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export interface PartnerFormProps {
  initialData?: any;
  onSubmit: (data: PartnerFormValues) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  title: string;
  subtitle?: string;
  submitText: string;
  onCancel: () => void;
}

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "draft", label: "Draft" },
];

export function PartnerForm({
  initialData,
  onSubmit,
  isLoading,
  isError,
  errorMessage,
  title,
  subtitle,
  submitText,
  onCancel,
}: PartnerFormProps) {
  const [isLogoUploading, setIsLogoUploading] = useState(false);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema) as any,
    defaultValues: {
      partnerType: "university",
      status: "active",
      country: "China",
      order: 0,
      topMajors: [],
      servicesOffered: [],
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        partnerType: initialData.partnerType || "university",
        country: initialData.country || (initialData.partnerType === "agency" ? "" : "China"),
      });
    }
  }, [initialData, reset]);

  const partnerType = watch("partnerType") || "university";
  const logo = watch("logo");

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLogoUploading(true);
      const res = await uploadMediaAsset(file, "partners/logos");
      setValue("logo", res.url, { shouldValidate: true });
    } catch (err) {
      console.error("Logo upload failed:", err);
      toast.error("Failed to upload logo. Please try again.");
    } finally {
      setIsLogoUploading(false);
    }
  };

  const handleFormSubmit = handleSubmit((data) => onSubmit(data as unknown as PartnerFormValues));

  return (
    <FormProvider {...form}>
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
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
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
            {errorMessage || "An error occurred."}
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-900 font-medium space-y-1">
            <p className="font-bold text-red-700">Please fix the validation errors below:</p>
            <ul className="list-disc pl-5 text-xs text-red-800">
              {Object.entries(errors).map(([key, err]) => (
                <li key={key}>
                  <strong className="capitalize">{key}:</strong> {(err as any)?.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form id="partnerForm" onSubmit={handleFormSubmit} className="space-y-6">
          {/* Partner Type Selector */}
          <Card className="border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Partner Classification *
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setValue("partnerType", "university", { shouldValidate: true });
                  if (!watch("country") || watch("country") === "") setValue("country", "China");
                }}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  partnerType === "university"
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm ring-2 ring-slate-900/10"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <BuildingOfficeIcon className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-base block">University Partner</span>
                  <span className={`text-xs block mt-0.5 ${partnerType === "university" ? "text-slate-300" : "text-slate-500"}`}>
                    Academic institution offering degree and language programs.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setValue("partnerType", "agency", { shouldValidate: true });
                  if (watch("country") === "China") setValue("country", "");
                }}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  partnerType === "agency"
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm ring-2 ring-slate-900/10"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <UserGroupIcon className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-base block">Agency Partner</span>
                  <span className={`text-xs block mt-0.5 ${partnerType === "agency" ? "text-slate-300" : "text-slate-500"}`}>
                    Education recruitment agency or international representative.
                  </span>
                </div>
              </button>
            </div>
          </Card>

          {/* Identity & Location */}
          <Card className="border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              {partnerType === "agency" ? "Agency Identity & Location" : "University Identity & Location"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label={partnerType === "agency" ? "Agency Name (English / Legal) *" : "University Name (English) *"}
                placeholder={partnerType === "agency" ? "e.g. EduPathway Global Services" : "e.g. Sichuan University"}
                {...register("nameEn")}
                error={errors.nameEn?.message}
                className="bg-slate-50 border-slate-200 text-slate-900"
              />
              <Input
                label={partnerType === "agency" ? "Agency Name (Native / Chinese)" : "University Name (Chinese)"}
                placeholder={partnerType === "agency" ? "Native business name" : "e.g. 四川大学"}
                {...register("nameCn")}
                className="bg-slate-50 border-slate-200 text-slate-900"
              />
              <Input
                label="Country *"
                placeholder={partnerType === "agency" ? "e.g. Nigeria, Morocco, Uzbekistan, Vietnam" : "China"}
                {...register("country")}
                error={errors.country?.message}
                className="bg-slate-50 border-slate-200 text-slate-900"
              />
              <Input
                label="City *"
                placeholder="e.g. Lagos, Casablanca, Tashkent, Chengdu"
                {...register("city")}
                className="bg-slate-50 border-slate-200 text-slate-900"
              />
              <Input
                label="Province / State"
                placeholder="e.g. Lagos State, Sichuan"
                {...register("province")}
                className="bg-slate-50 border-slate-200 text-slate-900"
              />
              <Input
                label="Official Website"
                placeholder="https://..."
                {...register("website")}
                error={errors.website?.message}
                className="bg-slate-50 border-slate-200 text-slate-900"
              />
              <Input
                label="Display Order"
                type="number"
                {...register("order")}
                className="bg-slate-50 border-slate-200 text-slate-900"
              />
            </div>
          </Card>

          {/* Logo / Brand Asset */}
          <Card className="border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Logo &amp; Brand Emblem
            </h2>
            {logo ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 h-36 w-36 flex items-center justify-center p-4">
                <Image
                  src={resolveDocumentUrl(logo)}
                  alt="Logo"
                  fill
                  sizes="144px"
                  unoptimized
                  className="object-contain p-2"
                />
                <button
                  type="button"
                  onClick={() => setValue("logo", "", { shouldValidate: true })}
                  className="absolute top-2 right-2 bg-rose-600 text-white rounded-lg p-1.5 text-[10px] font-bold shadow-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 flex flex-col items-center justify-center h-36 w-48 space-y-2">
                <input type="file" onChange={handleLogoUpload} className="hidden" id="partner-logo-upload" accept="image/*" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("partner-logo-upload")?.click()}
                  isLoading={isLogoUploading}
                >
                  Upload Logo
                </Button>
                <span className="text-[11px] text-slate-400">PNG, JPG or SVG logo</span>
              </div>
            )}
          </Card>

          {/* Agency-Specific Operations & Contact Details */}
          {partnerType === "agency" ? (
            <Card className="border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Agency Operations & Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Input
                  label="Managing Director / Contact Person"
                  placeholder="e.g. John Doe"
                  {...register("contactPerson")}
                  className="bg-slate-50 border-slate-200 text-slate-900"
                />
                <Input
                  label="Official Contact Email"
                  placeholder="admissions@agency.com"
                  type="email"
                  {...register("contactEmail")}
                  error={errors.contactEmail?.message}
                  className="bg-slate-50 border-slate-200 text-slate-900"
                />
                <Input
                  label="Phone / WhatsApp Hotline"
                  placeholder="+234 800 000 0000"
                  {...register("contactPhone")}
                  className="bg-slate-50 border-slate-200 text-slate-900"
                />
              </div>

              <Controller
                name="servicesOffered"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    label="Recruitment Services Offered"
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="e.g. Student Recruitment, Document Translation, Visa Counseling"
                  />
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Commission Rate / Contract Terms"
                  placeholder="e.g. 15% per enrolled student"
                  {...register("commissionRate")}
                  className="bg-slate-50 border-slate-200 text-slate-900"
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Contract & Agreement Notes</label>
                  <textarea
                    rows={2}
                    {...register("agreementNotes")}
                    placeholder="Internal partnership terms or SLA details..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800"
                  />
                </div>
              </div>
            </Card>
          ) : (
            /* University Academic Profile */
            <Card className="border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Academic Profile
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                <Input label="Rank" type="number" {...register("rank")} className="bg-slate-50 border-slate-200 text-slate-900" />
                <Input label="Total Students" type="number" {...register("totalStudents")} className="bg-slate-50 border-slate-200 text-slate-900" />
                <Input label="Total Foreign Students" type="number" {...register("totalForeignStudents")} className="bg-slate-50 border-slate-200 text-slate-900" />
                <Input label="Total Colleges / Schools" type="number" {...register("totalColleges")} className="bg-slate-50 border-slate-200 text-slate-900" />
              </div>
              <Controller
                name="topMajors"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    label="Top Majors"
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="e.g. Computer Science, Clinical Medicine"
                  />
                )}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Research Strengths</label>
                <textarea
                  rows={3}
                  {...register("research")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>
            </Card>
          )}

          {/* Profile & Overview */}
          <Card className="border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              {partnerType === "agency" ? "Agency Company Profile & Bio" : "University History & Introduction"}
            </h2>
            <textarea
              rows={5}
              {...register("introduction")}
              placeholder={
                partnerType === "agency"
                  ? "Describe the agency history, regional presence, and international student recruitment operations..."
                  : "Institutional overview and history..."
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </Card>

          {/* Status */}
          <Card className="border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Publish Status
            </h2>
            <Select label="Status" {...register("status")} options={STATUS_OPTIONS} className="max-w-xs bg-slate-50 border-slate-200 text-slate-900" />
          </Card>
        </form>
      </div>
    </FormProvider>
  );
}

export default PartnerForm;
