import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import type { UniversityFormValues } from "@/lib/validations/university";
import { getPartners } from "@/services/partnerService";
import { reserveUniversityId } from "@/services/universityService";
import type { Partner } from "@/types";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { INSTITUTION_TYPE_OPTIONS } from "../constants";
import { Sparkles, Building2 } from "lucide-react";
import { toast } from "react-hot-toast";

export function BasicInfoTab() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<UniversityFormValues>();

  const isPartner = watch("isPartner");
  const partnerId = watch("partnerId");

  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(partnerId || "");

  // Fetch partners list
  const { data: partnersData, isLoading: isPartnersLoading } = useQuery({
    queryKey: ["adminPartnersList"],
    queryFn: () => getPartners({ limit: 100 }),
  });

  const partners: Partner[] = partnersData?.partners || [];

  // Handle Partner Selection and Auto-Populate Fields
  const handlePartnerSelect = async (pId: string) => {
    setSelectedPartnerId(pId);
    setValue("partnerId", pId, { shouldValidate: true });

    const partner = partners.find((item) => item.id === pId);
    if (!partner) return;

    // Institution Identity
    if (partner.nameEn) setValue("name", partner.nameEn, { shouldValidate: true });
    if (partner.nameCn) setValue("nameInChinese", partner.nameCn, { shouldValidate: true });
    if (partner.city) setValue("city", partner.city, { shouldValidate: true });
    if (partner.province) setValue("province", partner.province, { shouldValidate: true });
    if (partner.website) setValue("officialWebsite", partner.website, { shouldValidate: true });

    // Logo
    if (partner.logo) setValue("logo", partner.logo, { shouldValidate: true });

    // Academic Profile
    if (partner.rank !== undefined && partner.rank !== null) setValue("qsRank", partner.rank, { shouldValidate: true });
    if (partner.totalStudents) setValue("totalStudents", partner.totalStudents, { shouldValidate: true });
    if (partner.totalForeignStudents) setValue("internationalStudents", partner.totalForeignStudents, { shouldValidate: true });
    if (partner.totalColleges) setValue("numberOfPrograms", partner.totalColleges, { shouldValidate: true });
    if (partner.topMajors && partner.topMajors.length > 0) setValue("advantages", partner.topMajors, { shouldValidate: true });

    // History & Introduction
    if (partner.introduction) setValue("introduction", partner.introduction, { shouldValidate: true });
    if (partner.research || partner.introduction) setValue("description", (partner.research || partner.introduction)!, { shouldValidate: true });

    // Publish Status
    if (partner.status) setValue("status", partner.status as any, { shouldValidate: true });
    setValue("isPartner", true, { shouldValidate: true });

    toast.success(`Populated university details from "${partner.nameEn}"!`);

    // Reserve a unique university ID from the server if currently empty.
    // Runs last since it's the only step that awaits — nothing above depends on it.
    if (!watch("universityId")) {
      try {
        const reservedId = await reserveUniversityId(partner.nameEn);
        // Only apply if this partner is still the active selection and the
        // admin hasn't typed an ID themselves while this request was in flight.
        if (watch("partnerId") === pId && !watch("universityId")) {
          setValue("universityId", reservedId, { shouldValidate: true });
        }
      } catch (err) {
        console.error("Failed to reserve university ID:", err);
      }
    }
  };

  const [isGeneratingId, setIsGeneratingId] = useState(false);

  const handleGenerateId = async () => {
    const name = watch("name") || "";
    const currentUniId = watch("universityId") || "";
    try {
      setIsGeneratingId(true);
      const reservedId = await reserveUniversityId(name);
      // Only apply if the name and ID fields haven't changed since the request started.
      if (watch("name") === name && (watch("universityId") || "") === currentUniId) {
        setValue("universityId", reservedId, { shouldValidate: true });
        toast.success("Generated Unique University ID");
      }
    } catch (err) {
      console.error("Failed to generate university ID:", err);
    } finally {
      setIsGeneratingId(false);
    }
  };

  return (
    <Card className="border border-gray-200 bg-white p-6 space-y-6">
      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
        Core Identities & Academic Standing
      </h2>

      {/* Partner Integration Section */}
      <div className="bg-gradient-to-r from-orange-50/80 via-amber-50/50 to-orange-50/30 border border-orange-200/80 rounded-xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-orange-600" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">Partner Integration</h3>
              <p className="text-xs text-gray-500">
                Link this university to an existing partner record to automatically reuse identity, logo, and academic data.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={Boolean(isPartner)}
              onChange={(e) => {
                const checked = e.target.checked;
                setValue("isPartner", checked, { shouldValidate: true });
                if (!checked) {
                  setValue("partnerId", "", { shouldValidate: true });
                  setSelectedPartnerId("");
                }
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            <span className="ml-3 text-sm font-bold text-gray-900">Is Partner</span>
          </label>
        </div>

        {isPartner && (
          <div className="pt-2 border-t border-orange-200/60 space-y-3">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Select Partner Institution / Agency
            </label>
            <select
              value={selectedPartnerId}
              onChange={(e) => handlePartnerSelect(e.target.value)}
              disabled={isPartnersLoading}
              className="w-full rounded-lg border border-orange-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            >
              <option value="">-- Choose Existing Partner --</option>
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.nameEn} {partner.city ? `(${partner.city})` : ""} - [{partner.status.toUpperCase()}]
                </option>
              ))}
            </select>

            {selectedPartnerId && (
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-700 bg-orange-100/60 rounded-lg px-3 py-2 border border-orange-200">
                <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
                <span>
                  University fields automatically synchronized with selected Partner. You can still modify any field if needed.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              University ID (Unique)
            </label>
            <button
              type="button"
              onClick={handleGenerateId}
              disabled={isGeneratingId}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingId ? "Generating..." : "Auto-generate"}
            </button>
          </div>
          <Input
            placeholder="e.g. UNI-TSINGHUA-2026 (or leave blank to auto-generate)"
            {...register("universityId")}
            error={errors.universityId?.message}
            className="bg-gray-50 border-gray-200 text-gray-900"
          />
        </div>
        <Input
          label="English Name *"
          placeholder="e.g. Tsinghua University"
          {...register("name")}
          error={errors.name?.message}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Chinese Name"
          placeholder="e.g. 清华大学"
          {...register("nameInChinese")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Select
          label="Institution Type"
          {...register("type")}
          options={INSTITUTION_TYPE_OPTIONS}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Input
          label="City"
          placeholder="e.g. Beijing"
          {...register("city")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Province"
          placeholder="e.g. Beijing"
          {...register("province")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Founded Year"
          type="number"
          {...register("foundedYear")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Input
          label="Total Students"
          type="number"
          {...register("totalStudents")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="International Students"
          type="number"
          {...register("internationalStudents")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="QS World Rank"
          type="number"
          {...register("qsRank")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Faculty Count"
          type="number"
          {...register("facultyCount")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
        <Input
          label="Number of Programs"
          type="number"
          {...register("numberOfPrograms")}
          className="bg-gray-50 border-gray-200 text-gray-900"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Quick Introduction</label>
        <textarea
          rows={2}
          placeholder="Punchy one-liner..."
          {...register("introduction")}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </Card>
  );
}
