import { useFormContext } from "react-hook-form";
import type { ScholarshipFormValues } from "@/lib/validations/scholarship";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { CURRENCY_OPTIONS } from "../constants";

export function FinancialsTab() {
  const { register } = useFormContext<ScholarshipFormValues>();

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
          University Fees
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Select
            label="University Currency"
            {...register("universityFeeCurrency")}
            options={CURRENCY_OPTIONS}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Input
            label="Registration Fee"
            type="number"
            {...register("registrationFee")}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Original Tuition Fee"
            type="number"
            {...register("originalTuitionFee")}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Input
            label="Tuition After Scholarship"
            type="number"
            {...register("tuitionFeeAfterScholarship")}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Input
            label="Original Quad Room Fee"
            type="number"
            {...register("accommodationFeeQuad")}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Input
            label="Quad Room After Scholarship"
            type="number"
            {...register("accommodationFeeAfterScholarship")}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Insurance Fee"
            placeholder="e.g. 800 RMB/year"
            {...register("insurance")}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
        </div>

        <div className="flex flex-col gap-1.5 mt-4">
          <label className="text-sm font-medium text-gray-700">Fee Structure</label>
          <textarea
            rows={4}
            placeholder="Detailed breakdown of fees..."
            {...register("feeStructure")}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex flex-col gap-1.5 mt-4">
          <label className="text-sm font-medium text-gray-700">Additional Fees</label>
          <textarea
            rows={3}
            placeholder="Any other fees..."
            {...register("additionalFees")}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </Card>

      <Card className="border border-gray-200 bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
          Nadoumi Agency Fees
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Select
            label="Agency Currency"
            {...register("nadoumiFeeCurrency")}
            options={CURRENCY_OPTIONS}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Input
            label="Nadoumi App Fee"
            type="number"
            {...register("nadoumiApplicationFee")}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Input
            label="Nadoumi Service Fee"
            type="number"
            {...register("nadoumiServiceFee")}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
        </div>
      </Card>
    </div>
  );
}
