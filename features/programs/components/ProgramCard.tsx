import Link from "next/link";
import { GraduationCap, Languages, Wallet, Clock3, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CardMetaRow from "@/components/ui/CardMetaRow";
import type { Program } from "@/types";

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const title = program.programName || program.field || `${program.category} Program`;
  const university = program.scholarship?.universities?.[0]?.name;

  return (
    <Card hover className="group flex flex-col h-full overflow-hidden p-0 border border-gray-100">
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between gap-3 mb-4">
          <Badge variant="orange" className="bg-orange-600 text-white font-semibold shadow-sm">
            {program.category}
          </Badge>
          {program.stipendEnabled && (
            <Badge className="bg-emerald-600 border-none text-white font-semibold shadow-sm">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              Stipend
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{title}</h3>
        {university && <p className="text-sm text-gray-400 mb-3 line-clamp-1">{university}</p>}

        {program.majors.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {program.majors.slice(0, 3).map((major) => (
              <span
                key={major}
                className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1"
              >
                {major}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 pt-4 mt-auto flex flex-col flex-1">
        <div className="space-y-2.5 mb-6 pt-4 border-t border-gray-100">
          <CardMetaRow icon={<GraduationCap className="w-4 h-4" />} label="Level" value={program.category} />
          <CardMetaRow
            icon={<Languages className="w-4 h-4" />}
            label="Language"
            value={program.teachingLanguage}
          />
          {program.duration && (
            <CardMetaRow icon={<Clock3 className="w-4 h-4" />} label="Duration" value={`${program.duration} yrs`} />
          )}
          <CardMetaRow
            icon={<Wallet className="w-4 h-4" />}
            label="Tuition After"
            value={
              !program.tuitionFeeAfter
                ? "Free (100% Covered)"
                : `${program.currency === "USD" ? "$" : "¥"}${program.tuitionFeeAfter}/year`
            }
            valueClassName="text-orange-600"
          />
        </div>

        <div className="mt-auto">
          <Link href={`/programs/${program.id}`} className="block">
            <Button variant="primary" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default ProgramCard;
