import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { UniversityFormValues } from "@/lib/validations/university";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { TagsInput } from "@/components/ui/TagsInput";

export function AccommodationTab() {
  const { control, register } = useFormContext<UniversityFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "accommodation" });

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Accommodation Pricing Options</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ type: "", pricePerYear: 0, feeUnit: "RMB/Year", facilities: [], notes: "" })}
        >
          + Add Room Option
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-400 text-sm py-4 text-center">No accommodation options added yet.</p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border border-gray-200 bg-gray-50 rounded-lg relative">
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-400 font-bold"
              >
                Remove
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 pr-12">
                <Input
                  label="Room Type"
                  placeholder="e.g. Double Room"
                  {...register(`accommodation.${index}.type` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
                <Input
                  label="Price"
                  type="number"
                  {...register(`accommodation.${index}.pricePerYear` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
                <Input
                  label="Unit"
                  placeholder="e.g. RMB/Year"
                  {...register(`accommodation.${index}.feeUnit` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
              </div>
              <div className="space-y-4">
                <Controller
                  name={`accommodation.${index}.facilities` as const}
                  control={control}
                  render={({ field }) => (
                    <TagsInput
                      label="Room Facilities"
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="e.g. AC, Private Bathroom"
                    />
                  )}
                />
                <Input
                  label="Notes"
                  placeholder="Additional details..."
                  {...register(`accommodation.${index}.notes` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
