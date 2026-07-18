import { useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "../schema";
import Input from "@/components/ui/Input";

export function SecuritySection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <section className="space-y-6">
      <div className="border-b border-gray-200 pb-2">
        <h3 className="text-lg font-bold text-gray-900">4. Security & Confirmation</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Password *"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
          autoComplete="new-password"
        />
        <Input
          label="Confirm Password *"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
        />
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              type="checkbox"
              {...register("terms")}
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              I agree to the Terms of Service & Privacy Policy
            </label>
            {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms.message}</p>}
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="accuracy"
              type="checkbox"
              {...register("accuracy")}
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="accuracy" className="font-medium text-gray-700">
              I confirm that all information provided is accurate and exactly matches my passport.
            </label>
            {errors.accuracy && <p className="mt-1 text-xs text-red-500">{errors.accuracy.message}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
