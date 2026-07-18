import { useFormContext } from "react-hook-form";
import type { ScholarshipFormValues } from "@/lib/validations/scholarship";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { SCHOLARSHIP_CATEGORY_OPTIONS } from "../constants";

interface BasicInfoTabProps {
  universityOptions: Array<{ value: string; label: string }>;
}

export function BasicInfoTab({ universityOptions }: BasicInfoTabProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ScholarshipFormValues>();

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
        Core Setup
      </h2>

      <Input
        label="Scholarship Title *"
        placeholder="e.g. Sichuan Provincial Government Scholarship"
        {...register("title")}
        error={errors.title?.message}
        className="bg-gray-50 border-gray-200 text-gray-900"
      />
      <Input
        label="Title in Chinese"
        placeholder="e.g. 四川省政府奖学金"
        {...register("titleInChinese")}
        className="bg-gray-50 border-gray-200 text-gray-900"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Funding Category *"
          {...register("scholarshipCategory")}
          options={SCHOLARSHIP_CATEGORY_OPTIONS}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Select
          label="Partner University"
          {...register("universities.0")}
          options={[{ value: "", label: "No specific university" }, ...universityOptions]}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Program Name"
          placeholder="e.g. Computer Science"
          {...register("programName")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Field of Study"
          placeholder="e.g. Engineering"
          {...register("field")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Degree"
          placeholder="e.g. Bachelor, Master"
          {...register("degree")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Program Duration (Years)"
          type="number"
          {...register("duration")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Input
          label="Application Deadline *"
          type="date"
          {...register("applicationDeadline")}
          error={errors.applicationDeadline?.message}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Start Date"
          type="date"
          {...register("startDate")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Intake"
          placeholder="e.g. Autumn 2026"
          {...register("intake")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Input
          label="Available Slots"
          type="number"
          {...register("availableSlots")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Duration (Years)"
          type="number"
          {...register("scholarshipDuration")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Duration Text"
          placeholder="e.g. 4 Years"
          {...register("scholarshipDurationText")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>
    </Card>
  );
}
