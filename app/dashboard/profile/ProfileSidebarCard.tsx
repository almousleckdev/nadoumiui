import { type RefObject } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import Card from "@/components/ui/Card";
import type { Student } from "@/types";

export type ProfileTab = "General" | "Education" | "Security";

const TABS: Array<{ id: ProfileTab; label: string }> = [
  { id: "General", label: "Personal Details" },
  { id: "Education", label: "Education & Preferences" },
  { id: "Security", label: "Security & Password" },
];

interface ProfileSidebarCardProps {
  profile: Student | undefined;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploadingPicture: boolean;
}

export function ProfileSidebarCard({
  profile,
  activeTab,
  onTabChange,
  fileInputRef,
  onFileChange,
  isUploadingPicture,
}: ProfileSidebarCardProps) {
  return (
    <div className="w-full md:w-1/3 space-y-6">
      <Card className="p-6 flex flex-col items-center border border-gray-100 shadow-sm rounded-2xl">
        <div className="relative group mb-4">
          <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
            {profile?.profilePicture ? (
              <Image src={profile.profilePicture} alt="Profile" fill sizes="128px" unoptimized className="object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-300 bg-gray-50">
                {profile?.firstName?.[0]}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-orange-600 text-white shadow-md hover:bg-orange-500 transition-colors"
            disabled={isUploadingPicture}
          >
            <Camera className="w-4 h-4" />
          </button>
          <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 font-heading">
          {profile?.firstName} {profile?.lastName}
        </h2>
        <p className="text-sm text-gray-500 mb-4">{profile?.email}</p>

        <div className="w-full pt-4 border-t border-gray-100 flex flex-col space-y-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                activeTab === tab.id ? "bg-orange-50 text-orange-700" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
