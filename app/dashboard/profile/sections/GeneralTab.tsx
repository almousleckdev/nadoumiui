import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { ProfileFormValues } from "../schema";
import { GENDER_OPTIONS } from "../schema";

interface GeneralTabProps {
  countries: Array<{ value: string; label: string }>;
  isSaving: boolean;
}

export function GeneralTab({ countries, isSaving }: GeneralTabProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Personal Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input label="First Name" {...register("firstName")} error={errors.firstName?.message} />
        <Input label="Last Name" {...register("lastName")} error={errors.lastName?.message} />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                className={`flex h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm transition-all focus-within:ring-2 focus-within:ring-orange-600/20 focus-within:border-orange-600 ${errors.phone ? "border-red-500" : "border-gray-200"}`}
              />
            )}
          />
          {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={countries}
                value={countries.find((c) => c.label === field.value)}
                onChange={(val) => field.onChange(val?.label)}
              />
            )}
          />
          {errors.country && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.country.message}</p>}
        </div>

        <Input label="City" {...register("city")} error={errors.city?.message} />
        <Input label="Passport Number" {...register("passportNumber")} error={errors.passportNumber?.message} />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={GENDER_OPTIONS}
                value={GENDER_OPTIONS.find((o) => o.value === field.value)}
                onChange={(val) => field.onChange(val?.value)}
              />
            )}
          />
          {errors.gender && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.gender.message}</p>}
        </div>

        <Input
          type="date"
          label="Date of Birth"
          {...register("dateOfBirth")}
          error={errors.dateOfBirth?.message}
        />
      </div>
      <div className="pt-4 flex justify-end">
        <Button type="submit" variant="primary" isLoading={isSaving}>
          Save Changes
        </Button>
      </div>
    </>
  );
}
