import { Controller, useFormContext } from "react-hook-form";
import type { ScholarshipFormValues } from "@/lib/validations/scholarship";
import Card from "@/components/ui/Card";
import { TagsInput } from "@/components/ui/TagsInput";

export function DetailsTab() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ScholarshipFormValues>();

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
        Descriptions & Policies
      </h2>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Full Description *</label>
        <textarea
          rows={6}
          {...register("description")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Scholarship Policy</label>
        <textarea
          rows={4}
          {...register("scholarshipPolicy")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Special Notes</label>
        <textarea
          rows={3}
          {...register("specialNotes")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Stipend Details</label>
        <textarea
          rows={3}
          placeholder="e.g. 2500 RMB/month for living expenses"
          {...register("stipend")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">General Requirements</label>
        <textarea
          rows={4}
          placeholder="Provide any additional requirements here..."
          {...register("requirements")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Scholarship Benefits</label>
        <textarea
          rows={4}
          placeholder="e.g. Free dorm, waived tuition..."
          {...register("benefits")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Recommendation Notes</label>
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
  );
}
