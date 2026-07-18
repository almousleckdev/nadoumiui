import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react";
import Card from "@/components/ui/Card";
import { updateAdminProfilePicture } from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { resolveDocumentUrl } from "@/utils/resolveUrl";
import type { Admin } from "@/types";

export function AdminAvatarCard({ admin }: { admin: Admin }) {
  const queryClient = useQueryClient();

  const uploadPhotoMutation = useMutation({
    mutationFn: updateAdminProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProfile"] });
      toast.success("Profile picture updated successfully!");
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err, "Failed to upload profile picture."));
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadPhotoMutation.mutate(file);
    }
  };

  const pfpUrl = admin.profilePicture ? resolveDocumentUrl(admin.profilePicture) : null;

  return (
    <Card className="p-6 bg-white border-gray-200 flex flex-col items-center">
      <h2 className="text-base font-bold text-gray-900 font-heading mb-4 self-start">Profile Photo</h2>
      <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
        {pfpUrl ? (
          <Image src={pfpUrl} alt={admin.name} fill sizes="128px" unoptimized className="object-cover" />
        ) : (
          <span className="text-4xl font-bold text-gray-400 uppercase">{admin.name?.charAt(0) || "A"}</span>
        )}
        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold cursor-pointer">
          <Upload className="w-6 h-6 mb-1" strokeWidth={2} />
          Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploadPhotoMutation.isPending}
          />
        </label>
      </div>
      <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
        Recommended: Square JPG or PNG, max 2MB.
      </p>
    </Card>
  );
}
