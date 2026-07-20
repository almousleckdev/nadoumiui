import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { UniversityFormValues } from "@/lib/validations/university";
import type { ProgramType } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

function RankingsSection() {
  const { control, register } = useFormContext<UniversityFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "rankings" });

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">University Rankings</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ rank: "", organization: "", year: new Date().getFullYear() })}
        >
          + Add Ranking
        </Button>
      </div>
      {fields.length === 0 ? (
        <p className="text-gray-400 text-sm py-4 text-center">No rankings added yet.</p>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-4 border border-gray-200 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  placeholder="Organization (e.g. QS, Times)"
                  {...register(`rankings.${index}.organization` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
                <Input
                  placeholder="Rank (e.g. 15, Top 100)"
                  {...register(`rankings.${index}.rank` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
                <Input
                  placeholder="Year"
                  type="number"
                  {...register(`rankings.${index}.year` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-2 text-red-500 hover:text-red-400 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

const PROGRAM_TYPE_OPTIONS: Array<{ value: ProgramType; label: string }> = [
  { value: "Bachelor", label: "Bachelor Program (Requires Majors)" },
  { value: "Master", label: "Master Program (Requires Majors)" },
  { value: "PhD", label: "PhD Program (Requires Majors)" },
  { value: "Language", label: "Language Program (No Majors)" },
];

function ProgramsAndMajorsSection() {
  const { control, register, watch } = useFormContext<UniversityFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "majors" });

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
            Programs & Majors Architecture
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Configure programs (Language, Bachelor, Master, PhD) and their corresponding majors.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", degree: "Bachelor", duration: "4 Years", tuitionFee: "" })}
        >
          + Add Program/Major
        </Button>
      </div>

      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium">
        <strong>Program Rules:</strong> Bachelor, Master, and PhD programs must have one or more assigned majors. Language programs do not have majors.
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-400 text-sm py-4 text-center">No programs or majors registered yet.</p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => {
            const currentDegree = watch(`majors.${index}.degree` as const) || "Bachelor";
            const isLanguage = currentDegree === "Language";

            return (
              <div key={field.id} className="p-4 border border-gray-200 bg-gray-50 rounded-xl space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Program Type (ProgramType Enum) *"
                    {...register(`majors.${index}.degree` as const)}
                    options={PROGRAM_TYPE_OPTIONS}
                    className="bg-white border-gray-200 text-gray-900"
                  />

                  {isLanguage ? (
                    <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 font-medium mt-6">
                      Language programs are general preparatory/language tracks and do not feature majors.
                    </div>
                  ) : (
                    <Input
                      label="Major Name *"
                      placeholder="e.g. Computer Science & Engineering"
                      {...register(`majors.${index}.name` as const)}
                      className="bg-white border-gray-200 text-gray-900"
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Duration"
                    placeholder="e.g. 4 Years"
                    {...register(`majors.${index}.duration` as const)}
                    className="bg-white border-gray-200 text-gray-900"
                  />
                  <Input
                    label="Tuition Fee (RMB/Year)"
                    placeholder="e.g. 25000"
                    {...register(`majors.${index}.tuitionFee` as const)}
                    className="bg-white border-gray-200 text-gray-900"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-400 font-bold text-xs flex items-center gap-1"
                  >
                    Remove Program / Major
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export function AcademicsTab() {
  return (
    <div className="space-y-6">
      <RankingsSection />
      <ProgramsAndMajorsSection />
    </div>
  );
}

export default AcademicsTab;
