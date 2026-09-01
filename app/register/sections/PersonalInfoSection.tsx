import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import PhoneInput from "react-phone-number-input";
import type { RegisterFormValues } from "../schema";
import { GENDER_OPTIONS } from "../schema";
import Input from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface PersonalInfoSectionProps {
  countries: Array<{ value: string; label: string }>;
}

export function PersonalInfoSection({ countries }: PersonalInfoSectionProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <section className="space-y-6">
      <div className="border-b border-gray-200 pb-2">
        <h3 className="text-lg font-bold text-gray-900">1. Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Surname (as on passport) *"
          type="text"
          placeholder="Doe"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Input
          label="Given Name (as on passport) *"
          type="text"
          placeholder="John"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="john.doe@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="US"
                className={`flex h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm transition-all focus-within:ring-2 focus-within:ring-orange-600/20 focus-within:border-orange-600 ${
                  errors.phone ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                }`}
              />
            )}
          />
          {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country *</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                instanceId="register-country-select"
                options={countries}
                value={countries.find((c) => c.label === field.value)}
                onChange={(val) => field.onChange(val?.label)}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select Country"
              />
            )}
          />
          {errors.country && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.country.message}</p>}
        </div>

        <Input
          label="Current City *"
          type="text"
          placeholder="e.g. New York"
          {...register("city")}
          error={errors.city?.message}
        />

        <Input
          label="Passport Number *"
          type="text"
          placeholder="A00000000"
          {...register("passportNumber")}
          error={errors.passportNumber?.message}
        />

        <Input
          label="Date of Birth *"
          type="date"
          {...register("dateOfBirth")}
          error={errors.dateOfBirth?.message}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              label="Gender *"
              options={GENDER_OPTIONS}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Select Gender"
              error={errors.gender?.message}
            />
          )}
        />
      </div>
    </section>
  );
}
