"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedScholarships } from "@/services/scholarshipService";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export function FeaturedSection() {
  const {
    data: scholarships,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredScholarships"],
    queryFn: getFeaturedScholarships,
  });

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="w-12 h-1 bg-orange-600 mb-4 rounded-full" />
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Scholarships
            </h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl">
              Hand-picked opportunities offering high tuition coverage and
              accommodation support for international students.
            </p>
          </div>
          <Link href="/scholarships">
            <Button
              variant="outline"
              className="w-full md:w-auto font-semibold"
            >
              Browse All Scholarships
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-50 rounded-2xl border border-gray-100 p-6 h-[400px]"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 rounded-2xl border border-red-150 bg-red-50 text-red-700">
            <p className="font-semibold">
              Unable to load featured scholarships
            </p>
            <p className="text-sm mt-1 text-red-500">
              Please verify your backend server is running.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && scholarships?.length === 0 && (
          <div className="text-center py-12 rounded-2xl border border-gray-200 bg-gray-50">
            <p className="font-semibold text-gray-900">No data found</p>
            <p className="text-sm mt-1 text-gray-500">
              There are currently no featured scholarships to display.
            </p>
          </div>
        )}

        {/* Grid Content */}
        {!isLoading && !error && scholarships && scholarships.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scholarships.slice(0, 3).map((scholarship) => {
              const deadline = new Date(
                scholarship.applicationDeadline,
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <Card
                  key={scholarship.id}
                  hover
                  className="flex flex-col h-full overflow-hidden p-0 border border-gray-100"
                >
                  {/* Image Placeholder with Cover */}
                  <div className="h-48 w-full relative bg-gray-100 overflow-hidden">
                    <Image
                      src={scholarship.coverImage ?? "/images/hero-group.png"}
                      alt={scholarship.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <Badge
                        variant="orange"
                        className="bg-orange-600 text-white font-semibold"
                      >
                        {scholarship.scholarshipCategory.replace("_", " ")}
                      </Badge>
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
                          {scholarship.tuitionFeeAfterScholarship === 0 ||
                          scholarship.tuitionFeeAfterScholarship === null
                            ? "Free (100% Covered)"
                            : `¥${scholarship.tuitionFeeAfterScholarship}/year`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Deadline:</span>
                        <span className="font-semibold text-gray-900">
                          {deadline}
                        </span>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="mt-auto">
                      <Link
                        href={`/scholarships/${scholarship.id}`}
                        className="block"
                      >
                        <Button variant="primary" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedSection;
