import Image from "next/image";
import { useFormContext } from "react-hook-form";
import type { ScholarshipFormValues } from "@/lib/validations/scholarship";
import { resolveDocumentUrl } from "@/utils/resolveUrl";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { PUBLISH_STATUS_OPTIONS } from "../constants";

interface PublishTabProps {
  isCoverUploading: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PublishTab({ isCoverUploading, onImageUpload }: PublishTabProps) {
  const { register, watch, setValue } = useFormContext<ScholarshipFormValues>();
  const coverImage = watch("coverImage");

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
          Cover Media
        </h2>
        {coverImage ? (
          <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-40 w-64">
            <Image
              src={resolveDocumentUrl(coverImage)}
              alt="Cover"
              fill
              sizes="256px"
              unoptimized
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setValue("coverImage", "", { shouldValidate: true })}
              className="absolute top-2 right-2 bg-red-600 text-gray-900 rounded p-1.5 text-xs"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="border border-dashed border-gray-200 rounded-lg p-6 text-center bg-gray-50 flex flex-col items-center justify-center min-h-40 w-64">
            <input type="file" onChange={onImageUpload} className="hidden" id="cover-upload" />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("cover-upload")?.click()}
              isLoading={isCoverUploading}
            >
              Upload Cover
            </Button>
          </div>
        )}
      </Card>

      <Card className="border border-gray-200 bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
          System Flags
        </h2>
        <Select
          label="Publish Status *"
          {...register("status")}
          options={PUBLISH_STATUS_OPTIONS}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />

        <div className="flex flex-col gap-4 mt-4">
          <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 border border-slate-200 rounded-2xl transition-all hover:bg-slate-100/80">
            <input
              type="checkbox"
              {...register("isRecommended")}
              className="h-5 w-5 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-800 shrink-0"
            />
            <div>
              <span className="text-sm font-extrabold text-slate-900 block">
                Featured Scholarship (Nadoumi Recommended)
              </span>
              <span className="text-xs text-slate-500 font-medium block mt-0.5">
                Displays this scholarship prominently in the &quot;Featured Scholarships&quot; carousel on the homepage and top listings.
              </span>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 border border-slate-200 rounded-2xl transition-all hover:bg-slate-100/80">
            <input
              type="checkbox"
              {...register("isHot")}
              className="h-5 w-5 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-800 shrink-0"
            />
            <div>
              <span className="text-sm font-extrabold text-slate-900 block">
                Hot Program (High Student Demand)
              </span>
              <span className="text-xs text-slate-500 font-medium block mt-0.5">
                Adds a &quot;High Demand&quot; flame badge to the scholarship card.
              </span>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer p-4 bg-slate-50 border border-slate-200 rounded-2xl transition-all hover:bg-slate-100/80">
            <input
              type="checkbox"
              {...register("isTop")}
              className="h-5 w-5 mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-800 shrink-0"
            />
            <div>
              <span className="text-sm font-extrabold text-slate-900 block">
                Top Tier Institution Program
              </span>
              <span className="text-xs text-slate-500 font-medium block mt-0.5">
                Adds a &quot;Top Pick&quot; badge to the scholarship card.
              </span>
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
}
