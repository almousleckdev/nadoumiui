import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Building2, Award } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CardMetaRow from "@/components/ui/CardMetaRow";
import type { University } from "@/types";

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Card hover className="group flex flex-col h-full overflow-hidden p-0 border border-gray-100">
      {/* Cover Image */}
      <div className="h-48 w-full relative bg-gray-100 overflow-hidden">
        <Image
          src={
            university.bannerImage ??
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600"
          }
          alt={university.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {university.isTop && (
            <Badge variant="orange" className="bg-orange-600 text-white font-semibold shadow-sm">
              Top Ranked
            </Badge>
          )}
          {university.isPartner && (
            <Badge variant="orange" className="bg-white text-orange-700 font-semibold border-orange-200 shadow-sm">
              Partner
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{university.name}</h3>
        {university.nameInChinese && (
          <p className="text-sm font-medium text-gray-400 mb-2">{university.nameInChinese}</p>
        )}
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 leading-relaxed">
          {university.introduction || university.description || "A prestigious institution offering excellent programs."}
        </p>

        <div className="space-y-2.5 mb-6 pt-4 border-t border-gray-100">
          <CardMetaRow
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={`${university.city || "Unknown"}, ${university.province || "Unknown"}`}
          />
          <CardMetaRow icon={<Building2 className="w-4 h-4" />} label="Type" value={university.type} />
          <CardMetaRow
            icon={<Award className="w-4 h-4" />}
            label="Scholarships"
            value={university.scholarshipAvailability.replace("_", " ")}
            valueClassName="text-orange-600"
          />
        </div>

        <div className="mt-auto">
          <Link href={`/universities/${university.id}`} className="block">
            <Button variant="primary" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
