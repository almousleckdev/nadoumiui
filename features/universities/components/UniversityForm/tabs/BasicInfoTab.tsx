import { useFormContext } from "react-hook-form";
import type { UniversityFormValues } from "@/lib/validations/university";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { INSTITUTION_TYPE_OPTIONS } from "../constants";

export function BasicInfoTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UniversityFormValues>();

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
        Core Identities & Academic Standing
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="University ID * (Unique)"
          placeholder="e.g. U-Tsinghua"
          {...register("universityId")}
          error={errors.universityId?.message}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="English Name *"
          placeholder="e.g. Tsinghua University"
          {...register("name")}
          error={errors.name?.message}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Chinese Name"
          placeholder="e.g. 清华大学"
          {...register("nameInChinese")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Select
          label="Institution Type"
          {...register("type")}
          options={INSTITUTION_TYPE_OPTIONS}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Input
          label="City"
          placeholder="e.g. Beijing"
          {...register("city")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Province"
          placeholder="e.g. Beijing"
          {...register("province")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Founded Year"
          type="number"
          {...register("foundedYear")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Input
          label="Total Students"
          type="number"
          {...register("totalStudents")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="International Students"
          type="number"
          {...register("internationalStudents")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="QS World Rank"
          type="number"
          {...register("qsRank")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Faculty Count"
          type="number"
          {...register("facultyCount")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Number of Programs"
          type="number"
          {...register("numberOfPrograms")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Quick Introduction</label>
        <textarea
          rows={2}
          placeholder="Punchy one-liner..."
          {...register("introduction")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </Card>
  );
}
