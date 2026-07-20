import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { ScholarshipFormValues } from "@/lib/validations/scholarship";
import type { University } from "@/types";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { TagsInput } from "@/components/ui/TagsInput";
import { CheckCircle2, FileText } from "lucide-react";

interface EligibilityTabProps {
  universities?: University[];
}

export function EligibilityTab({ universities = [] }: EligibilityTabProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<ScholarshipFormValues>();

  const selectedUniversityId = watch("universities.0");
  const selectedUniversity = universities.find((u) => u.id === selectedUniversityId);
  const universityRequiredDocuments = (selectedUniversity?.requiredDocuments as any[]) || [];

  const { fields: additionalFields, append: appendAdditional, remove: removeAdditional } = useFieldArray({
    control,
    name: "additionalDocuments" as any,
  });

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
        Eligibility & Application Documents
      </h2>

      {/* Age & Nationalities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Minimum Age"
          type="number"
          {...register("ageMin")}
          error={errors.ageMin?.message}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Maximum Age"
          type="number"
          {...register("ageMax")}
          error={errors.ageMax?.message}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="China Visit Policy"
          placeholder="e.g. Never visited China"
          {...register("chinaVisitPolicy")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Current Location Policy"
          placeholder="e.g. Must be outside China"
          {...register("currentLocationPolicy")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <Controller
        name="acceptedCountries"
        control={control}
        render={({ field }) => (
          <TagsInput
            label="Accepted Countries (Leave empty for all)"
            value={field.value || []}
            onChange={field.onChange}
            placeholder="e.g. Morocco, Algeria, Guinea"
          />
        )}
      />

      <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <input
          type="checkbox"
          {...register("acceptMinors")}
          className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
        />
        <span className="text-sm font-bold text-gray-900">Accepts students under 18 (Minors)</span>
      </label>

      {/* Auto-Fetched University Required Documents */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-800" />
              Auto-Fetched Application Documents
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fetched automatically from the host university registry.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80">
            Read-Only Checklist
          </span>
        </div>

        {universityRequiredDocuments.length === 0 ? (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
            {selectedUniversity ? (
              "No specific required documents registered for this university."
            ) : (
              "Select a host university in Basic Info to automatically load its required document checklist."
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {universityRequiredDocuments.map((doc: any, idx: number) => (
              <div key={idx} className="p-3.5 border border-slate-200 bg-white rounded-xl flex items-start gap-3 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 truncate">{doc.name || doc.title}</span>
                    {doc.required && (
                      <span className="text-[10px] font-bold text-rose-600 uppercase">Required</span>
                    )}
                  </div>
                  {doc.notes && <p className="text-[11px] text-slate-500 mt-0.5">{doc.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Documents (University Document Format) */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Additional Scholarship Documents
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Add any extra document requirements specific to this scholarship.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendAdditional({ name: "", required: true, notes: "" })}
          >
            + Add Document
          </Button>
        </div>

        {additionalFields.length === 0 ? (
          <p className="text-gray-400 text-xs py-2 text-center">No additional documents specified.</p>
        ) : (
          <div className="space-y-3">
            {additionalFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start p-4 border border-gray-200 bg-gray-50 rounded-xl">
                <div className="flex-1 space-y-3">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Document Name (e.g. Research Proposal)"
                        {...register(`additionalDocuments.${index}.name` as const)}
                        className="bg-white border-gray-200 text-gray-900"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        {...register(`additionalDocuments.${index}.required` as const)}
                        className="h-4.5 w-4.5 rounded border-gray-200 bg-gray-50 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-xs font-semibold text-gray-700">Required</span>
                    </div>
                  </div>
                  <Input
                    placeholder="Notes/Instructions (optional)"
                    {...register(`additionalDocuments.${index}.notes` as const)}
                    className="bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeAdditional(index)}
                  className="mt-2 text-red-500 hover:text-red-400 font-bold text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 mt-4 pt-4 border-t border-gray-200">
        <label className="text-sm font-medium text-gray-700">Applicant Criteria & Eligibility Notes</label>
        <textarea
          rows={3}
          placeholder="Specific eligibility requirements for applicants..."
          {...register("applicantRequirements")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </Card>
  );
}

export default EligibilityTab;
