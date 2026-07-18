import { Controller, useFormContext } from "react-hook-form";
import type { UniversityFormValues } from "@/lib/validations/university";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { TagsInput } from "@/components/ui/TagsInput";
import { PUBLISH_STATUS_OPTIONS, SCHOLARSHIP_AVAILABILITY_OPTIONS } from "../constants";

export function PublishTab() {
  const { control, register } = useFormContext<UniversityFormValues>();

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
          System Flags
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            label="Publish Status *"
            {...register("status")}
            options={PUBLISH_STATUS_OPTIONS}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Select
            label="Scholarships Status"
            {...register("scholarshipAvailability")}
            options={SCHOLARSHIP_AVAILABILITY_OPTIONS}
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
  );
}
