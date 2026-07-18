import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { University } from "@/types";

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Card hover className="flex flex-col h-full overflow-hidden p-0 border border-gray-100">
      {/* Image Placeholder with Cover */}
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
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {university.isTop && (
            <Badge variant="orange" className="bg-orange-600 text-white font-semibold">
              Top Ranked
            </Badge>
          )}
          {university.isPartner && (
            <Badge variant="orange" className="bg-orange-100 text-orange-800 font-semibold border-orange-200">
              Partner
            </Badge>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
          {university.name}
        </h3>
        {university.nameInChinese && (
          <p className="text-sm font-medium text-gray-400 mb-2">
            {university.nameInChinese}
          </p>
        )}
        <p className="text-sm text-gray-500 mb-4 line-clamp-3">
          {university.introduction || university.description || "A prestigious institution offering excellent programs."}
        </p>

        {/* Meta Details */}
        <div className="space-y-3 mb-6 pt-4 border-t border-gray-100 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Location:</span>
            <span className="font-semibold text-gray-900">
              {university.city || "Unknown"}, {university.province || "Unknown"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Type:</span>
            <span className="font-semibold text-gray-900">
              {university.type}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Scholarships:</span>
            <span className="font-semibold text-orange-600">
              {university.scholarshipAvailability.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* View Details Link */}
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
