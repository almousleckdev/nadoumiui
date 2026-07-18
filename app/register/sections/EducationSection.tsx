import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import type { RegisterFormValues } from "../schema";
import { CURRENT_LEVEL_OPTIONS } from "../schema";
import Input from "@/components/ui/Input";

export function EducationSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <section className="space-y-6">
      <div className="border-b border-gray-200 pb-2">
        <h3 className="text-lg font-bold text-gray-900">2. Education Background</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Level *</label>
          <Controller
            name="currentLevel"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={CURRENT_LEVEL_OPTIONS}
                value={CURRENT_LEVEL_OPTIONS.find((o) => o.value === field.value)}
                onChange={(val) => field.onChange(val?.value)}
                placeholder="Select Level"
              />
            )}
          />
          {errors.currentLevel && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.currentLevel.message}</p>
          )}
        </div>

        <Input
          label="University / School Name *"
          type="text"
          placeholder="Harvard University"
          {...register("university")}
          error={errors.university?.message}
        />

        <Input
          label="Major / Field of Study *"
          type="text"
          placeholder="Computer Science"
          {...register("major")}
          error={errors.major?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input label="GPA (Optional)" type="text" placeholder="3.8" {...register("gpa")} error={errors.gpa?.message} />
          <Input
            label="Graduation Year *"
            type="text"
            placeholder="2024"
            {...register("gradYear")}
            error={errors.gradYear?.message}
          />
        </div>
      </div>
    </section>
  );
}
