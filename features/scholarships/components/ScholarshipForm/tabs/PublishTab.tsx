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
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              {...register("isHot")}
              className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm font-bold text-gray-900">Hot Selection (High Demand)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              {...register("isRecommended")}
              className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm font-bold text-gray-900">Nadoumi Recommended</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              {...register("isTop")}
              className="h-5 w-5 rounded border-gray-200 bg-white text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm font-bold text-gray-900">Top Tier Program</span>
          </label>
        </div>
      </Card>
    </div>
  );
}
