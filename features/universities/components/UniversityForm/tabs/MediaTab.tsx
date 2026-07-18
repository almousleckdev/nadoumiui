import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import type { UniversityFormValues } from "@/lib/validations/university";
import { resolveDocumentUrl } from "@/utils/resolveUrl";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { MultiImageUpload } from "@/components/ui/MultiImageUpload";

interface MediaTabProps {
  isLogoUploading: boolean;
  isBannerUploading: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, target: "logo" | "banner") => void;
}

export function MediaTab({ isLogoUploading, isBannerUploading, onImageUpload }: MediaTabProps) {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<UniversityFormValues>();

  const logo = watch("logo");
  const bannerImage = watch("bannerImage");

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
          Branding Assets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">University Logo</label>
            {logo ? (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-32 flex items-center justify-center p-4">
                <Image
                  src={resolveDocumentUrl(logo)}
                  alt="Logo"
                  fill
                  sizes="128px"
                  unoptimized
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={() => setValue("logo", "", { shouldValidate: true })}
                  className="absolute top-2 right-2 bg-red-600 text-gray-900 rounded p-1 text-[10px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-32">
                <input type="file" onChange={(e) => onImageUpload(e, "logo")} className="hidden" id="logo-upload" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                  isLoading={isLogoUploading}
                >
                  Upload Logo
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Cover Banner</label>
            {bannerImage ? (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-32">
                <Image
                  src={resolveDocumentUrl(bannerImage)}
                  alt="Banner"
                  fill
                  sizes="100vw"
                  unoptimized
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setValue("bannerImage", "", { shouldValidate: true })}
                  className="absolute top-2 right-2 bg-red-600 text-gray-900 rounded p-1 text-[10px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-32">
                <input type="file" onChange={(e) => onImageUpload(e, "banner")} className="hidden" id="banner-upload" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("banner-upload")?.click()}
                  isLoading={isBannerUploading}
                >
                  Upload Banner
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="border border-gray-200 bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
          Campus Life Gallery (Albums)
        </h2>
        <Controller
          name="albums"
          control={control}
          render={({ field }) => (
            <MultiImageUpload value={field.value || []} onChange={field.onChange} folder="universities/albums" />
          )}
        />
      </Card>

      <Card className="border border-gray-200 bg-white p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
          Contact Channels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Input
            label="Official Website"
            {...register("officialWebsite")}
            error={errors.officialWebsite?.message}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Input
            label="Admissions Email"
            {...register("admissionsEmail")}
            error={errors.admissionsEmail?.message}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
          <Input label="Office Phone" {...register("officePhone")} className="bg-gray-50 border-gray-200 text-gray-900" />
        </div>
      </Card>
    </div>
  );
}
