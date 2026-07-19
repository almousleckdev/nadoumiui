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
      status: "active",
      order: 0,
      topMajors: [],
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
      reset(initialData);
    }
  }, [initialData, reset]);

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
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
            {errorMessage || "An error occurred."}
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-sm text-orange-700 font-medium">
            Please fix the validation errors below before submitting.
          </div>
        )}

        <form id="partnerForm" onSubmit={handleFormSubmit} className="space-y-6">
          <Card className="border border-gray-200 bg-white p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
              Institution Identity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="University Name (English) *"
                {...register("nameEn")}
                error={errors.nameEn?.message}
              />
              <Input label="University Name (Chinese)" {...register("nameCn")} />
              <Input label="Province" {...register("province")} />
              <Input label="City" {...register("city")} />
              <Input label="Website" placeholder="https://..." {...register("website")} error={errors.website?.message} />
              <Input label="Display Order" type="number" {...register("order")} />
            </div>
          </Card>

          <Card className="border border-gray-200 bg-white p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
              Logo
            </h2>
            {logo ? (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-32 w-32 flex items-center justify-center p-4">
                <Image
                  src={resolveDocumentUrl(logo)}
                  alt="Logo"
                  fill
                  sizes="128px"
                  unoptimized
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={() => setValue("logo", "", { shouldValidate: true })}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded p-1 text-[10px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center bg-gray-50 flex flex-col items-center justify-center h-32 w-32">
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
              </div>
            )}
          </Card>

          <Card className="border border-gray-200 bg-white p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
              Academic Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Input label="Rank" type="number" {...register("rank")} />
              <Input label="Total Students" type="number" {...register("totalStudents")} />
              <Input label="Total Foreign Students" type="number" {...register("totalForeignStudents")} />
              <Input label="Total Colleges / Schools" type="number" {...register("totalColleges")} />
            </div>
            <Controller
              name="topMajors"
              control={control}
              render={({ field }) => (
                <TagsInput
                  label="Top Majors"
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="e.g. Computer Science"
                />
              )}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Research Strengths</label>
              <textarea
                rows={3}
                {...register("research")}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </Card>

          <Card className="border border-gray-200 bg-white p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
              History &amp; Introduction
            </h2>
            <textarea
              rows={5}
              {...register("introduction")}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </Card>

          <Card className="border border-gray-200 bg-white p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
              Publish Status
            </h2>
            <Select label="Status" {...register("status")} options={STATUS_OPTIONS} className="max-w-xs" />
          </Card>
        </form>
      </div>
    </FormProvider>
  );
}

export default PartnerForm;
