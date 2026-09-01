import { Controller, useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "../schema";
import { STUDY_LEVEL_OPTIONS } from "../schema";
import Input from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TagsInput } from "@/components/ui/TagsInput";

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
        <Controller
          name="studyLevel"
          control={control}
          render={({ field }) => (
            <Select
              label="Desired Study Level *"
              options={STUDY_LEVEL_OPTIONS}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Select Desired Level"
              error={errors.studyLevel?.message}
            />
          )}
        />

        <Input
          label="Desired Field / Major *"
          type="text"
          placeholder="e.g. Artificial Intelligence"
          {...register("desiredField")}
          error={errors.desiredField?.message}
        />

        <div className="sm:col-span-2">
          <Controller
            name="preferredCities"
            control={control}
            render={({ field }) => (
              <TagsInput
                label="Preferred Cities *"
                value={field.value || []}
                onChange={field.onChange}
                placeholder="Type a city and press Enter..."
                error={errors.preferredCities?.message}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}
