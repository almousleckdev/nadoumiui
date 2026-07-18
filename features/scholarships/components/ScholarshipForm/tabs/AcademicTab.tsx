import { useFormContext } from "react-hook-form";
import type { ScholarshipFormValues } from "@/lib/validations/scholarship";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { TEACHING_LANGUAGE_OPTIONS } from "../constants";

export function AcademicTab() {
  const { register } = useFormContext<ScholarshipFormValues>();

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
        Score & Language Requirements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Teaching Language *"
          {...register("teachingLanguage")}
          options={TEACHING_LANGUAGE_OPTIONS}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Minimum GPA"
          type="number"
          step="0.01"
          {...register("gpaMin")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Input
          label="IELTS Score"
          type="number"
          step="0.5"
          {...register("ieltsScore")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="TOEFL Score"
          type="number"
          {...register("toeflScore")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Duolingo Score"
          type="number"
          {...register("duolingoScore")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="HSK Level"
          type="number"
          {...register("hskLevel")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Custom Score Requirements"
          placeholder="e.g. Math > 80%"
          {...register("scoreRequirements")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">English Score Requirements Details</label>
        <textarea
          rows={2}
          placeholder="e.g. IELTS 6.0 or TOEFL 80"
          {...register("scoreRequirementsEnglish")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Chinese Score Requirements Details</label>
        <textarea
          rows={2}
          placeholder="e.g. HSK 4 minimum 210"
          {...register("scoreRequirementsChinese")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </Card>
  );
}
