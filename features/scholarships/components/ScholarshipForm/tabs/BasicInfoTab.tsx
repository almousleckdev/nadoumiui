import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { ScholarshipFormValues } from "@/lib/validations/scholarship";
import type { ProgramType, University } from "@/types";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { TagsInput } from "@/components/ui/TagsInput";
import { SCHOLARSHIP_CATEGORY_OPTIONS } from "../constants";

interface BasicInfoTabProps {
  universityOptions: Array<{ value: string; label: string }>;
  universities?: University[];
}

const PROGRAM_TYPES: ProgramType[] = ["Language", "Bachelor", "Master", "PhD"];

export function BasicInfoTab({ universityOptions, universities = [] }: BasicInfoTabProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ScholarshipFormValues>();

  const selectedUniversityId = watch("universities.0");
  const programCategories = watch("programCategories") || ["Bachelor"];
  const hasStipend = watch("hasStipend");

  // Find host university and its available majors
  const selectedUniversity = universities.find((u) => u.id === selectedUniversityId);
  const universityMajors = selectedUniversity?.majors || [];

  const handleProgramToggle = (type: ProgramType) => {
    const current = [...programCategories];
    const index = current.indexOf(type);
    let updated: ProgramType[];
    if (index > -1) {
      updated = current.filter((t) => t !== type);
    } else {
      updated = [...current, type];
    }
    setValue("programCategories", updated, { shouldValidate: true });
  };

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
        Core Setup & Program Classification
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
          label="Partner Host University *"
          {...register("universities.0")}
          options={[{ value: "", label: "Select host university..." }, ...universityOptions]}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      {/* Program Types Selection */}
      <div className="space-y-3 pt-2">
        <label className="text-sm font-bold text-slate-900 block">
          Available Program Types * <span className="text-xs text-slate-500 font-normal">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROGRAM_TYPES.map((type) => {
            const isChecked = programCategories.includes(type);
            return (
              <button
                type="button"
                key={type}
                onClick={() => handleProgramToggle(type)}
                className={`p-3.5 rounded-xl border text-sm font-bold flex items-center justify-between transition-all ${
                  isChecked
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm ring-2 ring-slate-900/10"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                <span>{type}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Program-Specific Majors Selection */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Program Majors Configuration
        </h3>
        {programCategories.map((pType) => {
          if (pType === "Language") {
            return (
              <div key={pType} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium">
                <strong className="text-white">Language Program:</strong> Non-degree track. No specific majors required.
              </div>
            );
          }

          return (
            <div key={pType} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{pType} Program Majors *</span>
                {universityMajors.length > 0 && (
                  <span className="text-xs text-slate-600 font-semibold bg-slate-200/60 px-2 py-0.5 rounded-full">
                    {universityMajors.length} majors in host registry
                  </span>
                )}
              </div>

              <Controller
                name={`programSelection.${pType as any}.majors` as any}
                control={control}
                render={({ field }) => (
                  <TagsInput
                    label={`Majors for ${pType} Degree`}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder={
                      universityMajors.length > 0
                        ? `e.g. Computer Science, Mechanical Engineering`
                        : `Enter major names for ${pType}...`
                    }
                  />
                )}
              />
            </div>
          );
        })}
      </div>

      {/* Stipend Configuration */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <label className="flex items-center gap-3 cursor-pointer p-3.5 bg-slate-900 text-white border border-slate-800 rounded-xl shadow-sm">
          <input
            type="checkbox"
            {...register("hasStipend")}
            className="h-5 w-5 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-400"
          />
          <div>
            <span className="text-sm font-bold block">Provide Monthly Living Stipend</span>
            <span className="text-xs text-slate-400 block">
              Enable program-specific stipend amounts for students (e.g. Bachelor vs Master vs PhD stipend)
            </span>
          </div>
        </label>

        {hasStipend && (
          <div className="p-4 border border-slate-200 bg-white rounded-xl space-y-4 shadow-sm animate-in fade-in duration-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Program-Specific Monthly Stipend Amounts (RMB/month)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programCategories.map((pType) => (
                <Input
                  key={pType}
                  label={`${pType} Stipend (RMB/month)`}
                  placeholder="e.g. 2500"
                  type="number"
                  {...register(`programSelection.${pType as any}.stipendAmount` as any)}
                  className="bg-slate-50 border-slate-200 text-slate-900"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dates, Intake & Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-gray-100">
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
          label="Scholarship Duration (Years)"
          type="number"
          {...register("scholarshipDuration")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Duration Display Text"
          placeholder="e.g. 4 Years"
          {...register("scholarshipDurationText")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>
    </Card>
  );
}

export default BasicInfoTab;
