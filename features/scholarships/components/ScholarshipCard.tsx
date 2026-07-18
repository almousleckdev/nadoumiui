import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Scholarship } from "@/types";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const deadline = new Date(scholarship.applicationDeadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card hover className="flex flex-col h-full overflow-hidden p-0 border border-gray-100">
      {/* Image Placeholder with Cover */}
      <div className="h-48 w-full relative bg-gray-100 overflow-hidden">
        <Image
          src={
            scholarship.coverImage ??
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600"
          }
          alt={scholarship.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge variant="orange" className="bg-orange-600 text-white font-semibold">
            {scholarship.scholarshipCategory.replace("_", " ")}
          </Badge>
          {scholarship.isTop && (
            <Badge className="bg-blue-600 border-none text-white font-semibold">Top</Badge>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {scholarship.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3">
          {scholarship.description}
        </p>

        {/* Meta Details */}
        <div className="space-y-3 mb-6 pt-4 border-t border-gray-100 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Program Levels:</span>
            <span className="font-semibold text-gray-900">
              {scholarship.programCategories.join(", ")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Language:</span>
            <span className="font-semibold text-gray-900">
              {scholarship.teachingLanguage ?? "English/Chinese"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tuition After:</span>
            <span className="font-semibold text-orange-600">
              {scholarship.tuitionFeeAfterScholarship === 0 || scholarship.tuitionFeeAfterScholarship === null
                ? "Free (100% Covered)"
                : `¥${scholarship.tuitionFeeAfterScholarship}/year`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Deadline:</span>
            <span className="font-semibold text-gray-900">{deadline}</span>
          </div>
        </div>

        {/* View Details Link */}
        <div className="mt-auto">
          <Link href={`/scholarships/${scholarship.id}`} className="block">
            <Button variant="primary" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
