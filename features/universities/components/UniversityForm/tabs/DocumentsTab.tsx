import { useFieldArray, useFormContext } from "react-hook-form";
import type { UniversityFormValues } from "@/lib/validations/university";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export function DocumentsTab() {
  const { control, register } = useFormContext<UniversityFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "requiredDocuments" });

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Required Documents Checklist</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", required: true, notes: "" })}
        >
          + Add Document
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-400 text-sm py-4 text-center">No required documents specified.</p>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-4 border border-gray-200 bg-gray-50 rounded-lg">
              <div className="flex-1 space-y-3">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Document Name (e.g. Passport Copy)"
                      {...register(`requiredDocuments.${index}.name` as const)}
                      className="bg-white border-gray-200 text-gray-900"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      {...register(`requiredDocuments.${index}.required` as const)}
                      className="h-4.5 w-4.5 rounded border-gray-200 bg-gray-50 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Required</span>
                  </div>
                </div>
                <Input
                  placeholder="Notes/Instructions (optional)"
                  {...register(`requiredDocuments.${index}.notes` as const)}
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
