import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { ProfileFormValues } from "../schema";
import { CURRENT_LEVEL_OPTIONS, STUDY_LEVEL_OPTIONS } from "../schema";

export function EducationTab({ isSaving }: { isSaving: boolean }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <>
      <div>
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Education Background</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Level</label>
            <Controller
              name="currentLevel"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={CURRENT_LEVEL_OPTIONS}
                  value={CURRENT_LEVEL_OPTIONS.find((o) => o.value === field.value)}
                  onChange={(val) => field.onChange(val?.value)}
                />
              )}
            />
            {errors.currentLevel && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.currentLevel.message}</p>
            )}
          </div>
          <Input label="University" {...register("university")} error={errors.university?.message} />
          <Input label="Major" {...register("major")} error={errors.major?.message} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="GPA" {...register("gpa")} error={errors.gpa?.message} />
            <Input label="Grad Year" {...register("gradYear")} error={errors.gradYear?.message} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Study Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Desired Level</label>
            <Controller
              name="studyLevel"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={STUDY_LEVEL_OPTIONS}
                  value={STUDY_LEVEL_OPTIONS.find((o) => o.value === field.value)}
                  onChange={(val) => field.onChange(val?.value)}
                />
              )}
            />
            {errors.studyLevel && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.studyLevel.message}</p>
            )}
          </div>
          <Input label="Desired Field" {...register("desiredField")} error={errors.desiredField?.message} />
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Cities</label>
            <Controller
              name="preferredCities"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isMulti
                  components={{ DropdownIndicator: null }}
                  value={(field.value || []).map((v) => ({ value: v, label: v }))}
                  onChange={(selected) => field.onChange(selected.map((s) => s.value))}
                  placeholder="Type a city and press Enter..."
                />
              )}
            />
            {errors.preferredCities && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.preferredCities.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" variant="primary" isLoading={isSaving}>
          Save Preferences
        </Button>
      </div>
    </>
  );
}
