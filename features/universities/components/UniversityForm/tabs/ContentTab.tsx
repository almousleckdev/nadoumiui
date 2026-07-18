import { Controller, useFormContext } from "react-hook-form";
import type { UniversityFormValues } from "@/lib/validations/university";
import Card from "@/components/ui/Card";
import { TagsInput } from "@/components/ui/TagsInput";

export function ContentTab() {
  const { control, register } = useFormContext<UniversityFormValues>();

  return (
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
  );
}
