import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import type { RegisterFormValues } from "../schema";
import { STUDY_LEVEL_OPTIONS } from "../schema";
import Input from "@/components/ui/Input";

export function PreferencesSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <section className="space-y-6">
      <div className="border-b border-gray-200 pb-2">
        <h3 className="text-lg font-bold text-gray-900">3. Study Preferences</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Desired Study Level *</label>
          <Controller
            name="studyLevel"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={STUDY_LEVEL_OPTIONS}
                value={STUDY_LEVEL_OPTIONS.find((o) => o.value === field.value)}
                onChange={(val) => field.onChange(val?.value)}
                placeholder="Select Desired Level"
              />
            )}
          />
          {errors.studyLevel && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.studyLevel.message}</p>
          )}
        </div>

        <Input
          label="Desired Field / Major *"
          type="text"
          placeholder="e.g. Artificial Intelligence"
          {...register("desiredField")}
          error={errors.desiredField?.message}
        />

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Cities *</label>
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
                formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
              />
            )}
          />
          {errors.preferredCities && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.preferredCities.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
