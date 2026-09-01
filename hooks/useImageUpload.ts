import { useRef, useState } from "react";
import type { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { toast } from "react-hot-toast";
import { uploadMediaAsset } from "@/services/mediaService";

/**
 * Shared upload-to-form-field flow used by admin resource forms
 * (university logo/banner, scholarship cover, partner logo, etc.).
 */
export function useImageUpload<TFieldValues extends FieldValues>(
  setValue: UseFormSetValue<TFieldValues>,
  fieldName: Path<TFieldValues>,
  folder: string,
  label = "image"
) {
  const [isUploading, setIsUploading] = useState(false);
  const requestIdRef = useRef(0);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const requestId = ++requestIdRef.current;
    setIsUploading(true);

    try {
      const res = await uploadMediaAsset(file, folder);
      // Only apply/settle if no newer upload was started while this one was in flight.
      if (requestId === requestIdRef.current) {
        setValue(fieldName, res.url as any, { shouldValidate: true });
      }
    } catch (err) {
      console.error(`${label} upload failed:`, err);
      if (requestId === requestIdRef.current) {
        toast.error(`Failed to upload ${label}. Please try again.`);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setIsUploading(false);
      }
    }
  };

  return { isUploading, handleUpload };
}
