import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { TagsInput } from "@/components/ui/TagsInput";
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
          <Controller
            name="currentLevel"
            control={control}
            render={({ field }) => (
              <Select
                label="Current Level"
                options={CURRENT_LEVEL_OPTIONS}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors.currentLevel?.message}
              />
            )}
          />
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
          <Controller
            name="studyLevel"
            control={control}
            render={({ field }) => (
              <Select
                label="Desired Level"
                options={STUDY_LEVEL_OPTIONS}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors.studyLevel?.message}
              />
            )}
          />
          <Input label="Desired Field" {...register("desiredField")} error={errors.desiredField?.message} />
          <div className="sm:col-span-2">
            <Controller
              name="preferredCities"
              control={control}
              render={({ field }) => (
                <TagsInput
                  label="Preferred Cities"
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Type a city and press Enter..."
                  error={errors.preferredCities?.message}
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
