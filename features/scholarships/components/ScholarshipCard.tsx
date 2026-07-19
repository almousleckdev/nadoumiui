import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Languages, Wallet, CalendarClock } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CardMetaRow from "@/components/ui/CardMetaRow";
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
    <Card hover className="group flex flex-col h-full overflow-hidden p-0 border border-gray-100">
      {/* Cover Image */}
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
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge variant="orange" className="bg-orange-600 text-white font-semibold shadow-sm">
            {scholarship.scholarshipCategory.replace("_", " ")}
          </Badge>
          {scholarship.isTop && (
            <Badge className="bg-blue-600 border-none text-white font-semibold shadow-sm">Top</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{scholarship.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 leading-relaxed">{scholarship.description}</p>

        <div className="space-y-2.5 mb-6 pt-4 border-t border-gray-100">
          <CardMetaRow
            icon={<GraduationCap className="w-4 h-4" />}
            label="Program Levels"
            value={scholarship.programCategories.join(", ")}
          />
          <CardMetaRow
            icon={<Languages className="w-4 h-4" />}
            label="Language"
            value={scholarship.teachingLanguage ?? "English/Chinese"}
          />
          <CardMetaRow
            icon={<Wallet className="w-4 h-4" />}
            label="Tuition After"
            value={
              scholarship.tuitionFeeAfterScholarship === 0 || scholarship.tuitionFeeAfterScholarship === null
                ? "Free (100% Covered)"
                : `¥${scholarship.tuitionFeeAfterScholarship}/year`
            }
            valueClassName="text-orange-600"
          />
          <CardMetaRow icon={<CalendarClock className="w-4 h-4" />} label="Deadline" value={deadline} />
        </div>

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
