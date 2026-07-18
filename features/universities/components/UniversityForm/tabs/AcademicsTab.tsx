import { useFieldArray, useFormContext } from "react-hook-form";
import type { UniversityFormValues } from "@/lib/validations/university";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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

function MajorsSection() {
  const { control, register } = useFormContext<UniversityFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "majors" });

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Available Majors</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", degree: "Bachelor", duration: "4 Years", tuitionFee: "" })}
        >
          + Add Major
        </Button>
      </div>
      {fields.length === 0 ? (
        <p className="text-gray-400 text-sm py-4 text-center">No majors added yet.</p>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-4 border border-gray-200 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Major Name"
                  placeholder="e.g. Computer Science"
                  {...register(`majors.${index}.name` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
                <Input
                  label="Degree"
                  placeholder="e.g. Bachelor, Master"
                  {...register(`majors.${index}.degree` as const)}
                  className="bg-white border-gray-200 text-gray-900"
                />
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
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-8 text-red-500 hover:text-red-400 font-bold"
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

export function AcademicsTab() {
  return (
    <div className="space-y-6">
      <RankingsSection />
      <MajorsSection />
    </div>
  );
}
