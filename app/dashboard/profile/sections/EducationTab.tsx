import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { ProfileFormValues } from "../schema";
import { CURRENT_LEVEL_OPTIONS, STUDY_LEVEL_OPTIONS } from "../schema";

export function EducationTab({ isSaving }: { isSaving: boolean }) {
  const { register, control } = useFormContext<ProfileFormValues>();

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
          </div>
          <Input label="University" {...register("university")} />
          <Input label="Major" {...register("major")} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="GPA" {...register("gpa")} />
            <Input label="Grad Year" {...register("gradYear")} />
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
          </div>
          <Input label="Desired Field" {...register("desiredField")} />
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
