import { Controller, useFormContext } from "react-hook-form";
import type { ScholarshipFormValues } from "@/lib/validations/scholarship";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { TagsInput } from "@/components/ui/TagsInput";

export function EligibilityTab() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ScholarshipFormValues>();

  return (
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
        <span className="text-sm font-bold text-gray-900">Accepts students under 18 (Minors)</span>
      </label>

      <div className="flex flex-col gap-1.5 mt-4">
        <label className="text-sm font-medium text-gray-700">Applicant Requirements</label>
        <textarea
          rows={4}
          placeholder="Specific requirements for applicants..."
          {...register("applicantRequirements")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-1.5 mt-4">
        <label className="text-sm font-medium text-gray-700">Application Documents</label>
        <textarea
          rows={4}
          placeholder="List the required documents..."
          {...register("applicationDocuments")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-1.5 mt-4">
        <label className="text-sm font-medium text-gray-700">Additional Documents</label>
        <textarea
          rows={4}
          placeholder="Any optional or additional documents..."
          {...register("additionalDocuments")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </Card>
  );
}
