import React, { useState, useRef } from "react";
import { cn } from "@/utils/cn";
import { X, PlusCircle } from "lucide-react";
import Image from "next/image";
import { resolveDocumentUrl } from "@/utils/resolveUrl";
import { uploadMediaAsset } from "@/services/mediaService";

interface MultiImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  folder?: string;
  error?: string;
  className?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  label,
  folder = "uploads",
  error,
  className,
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadMediaAsset(file, folder));
      const results = await Promise.all(uploadPromises);
      const newUrls = results.map((res) => res.url);
      onChange([...value, ...newUrls]);
    } catch (err) {
      console.error("Multi-image upload failed:", err);
      alert("Failed to upload some images. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && <label className="text-sm font-medium text-gray-900">{label}</label>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-square"
          >
            <Image
              src={resolveDocumentUrl(url)}
              alt={`Upload ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              unoptimized
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 bg-red-600/90 text-white rounded p-1.5 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 shadow"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center aspect-square bg-gray-50 cursor-pointer hover:border-gray-400 transition-colors",
            isUploading && "opacity-50 cursor-not-allowed",
            error && "border-red-500/50"
          )}
        >
          {isUploading ? (
            <div className="w-6 h-6 rounded-full border-2 border-gray-400 border-t-transparent animate-spin mb-2" />
          ) : (
            <PlusCircle className="w-6 h-6 text-gray-400 mb-2" />
          )}
          <span className="text-xs text-gray-500 font-medium text-center">
            {isUploading ? "Uploading..." : "Add Images"}
          </span>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        accept="image/*"
        multiple
        disabled={isUploading}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
