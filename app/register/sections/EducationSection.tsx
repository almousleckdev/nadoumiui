import { Controller, useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "../schema";
import { CURRENT_LEVEL_OPTIONS } from "../schema";
import Input from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

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
        <Controller
          name="currentLevel"
          control={control}
          render={({ field }) => (
            <Select
              label="Current Level *"
              options={CURRENT_LEVEL_OPTIONS}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Select Level"
              error={errors.currentLevel?.message}
            />
          )}
        />

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
