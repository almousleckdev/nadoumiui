"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Languages, Wallet, Clock3, CalendarClock, Sparkles, Home as HomeIcon } from "lucide-react";
import { getProgramById } from "@/services/programService";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CardMetaRow from "@/components/ui/CardMetaRow";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";

export default function ProgramDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: program, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["program", id],
    queryFn: () => getProgramById(id),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Loading variant="page" text="Loading program..." />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 pb-20 bg-gray-50 flex items-center justify-center px-4">
          <ErrorState
            title="We couldn't load this program"
            onRetry={() => refetch()}
            isRetrying={isRefetching}
            className="max-w-md"
          />
        </main>
        <Footer />
      </>
    );
  }

  if (!program) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 pb-20 bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Program Not Found</h2>
            <p className="text-gray-500 mb-6">The program you are looking for does not exist or has been removed.</p>
            <Button onClick={() => router.push("/programs")}>Browse Programs</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const title = program.programName || program.field || `${program.category} Program`;
  const university = program.scholarship?.universities?.[0];
  const currencySymbol = program.currency === "USD" ? "$" : "¥";

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge variant="orange" className="bg-orange-600 text-white font-semibold mb-4">
              {program.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">{title}</h1>
            {university && (
              <p className="text-gray-500">
                Offered through{" "}
                {program.scholarship ? (
                  <Link
                    href={`/scholarships/${program.scholarship.id}`}
                    className="text-orange-600 font-semibold hover:text-orange-700"
                  >
                    {program.scholarship.title}
                  </Link>
                ) : (
                  <span className="font-semibold text-gray-700">{university.name}</span>
                )}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Program Overview</h2>
                <div className="space-y-3">
                  <CardMetaRow icon={<GraduationCap className="w-4 h-4" />} label="Level" value={program.category} />
                  <CardMetaRow
                    icon={<Languages className="w-4 h-4" />}
                    label="Teaching Language"
                    value={program.teachingLanguage}
                  />
                  {program.duration && (
                    <CardMetaRow
                      icon={<Clock3 className="w-4 h-4" />}
                      label="Duration"
                      value={`${program.duration} years`}
                    />
                  )}
                  {program.intake && (
                    <CardMetaRow icon={<CalendarClock className="w-4 h-4" />} label="Intake" value={program.intake} />
                  )}
                </div>
              </Card>

              {program.majors.length > 0 && (
                <Card className="p-6 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Available Majors</h2>
                  <div className="flex flex-wrap gap-2">
                    {program.majors.map((major) => (
                      <span
                        key={major}
                        className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5"
                      >
                        {major}
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              {program.notes && (
                <Card className="p-6 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Notes</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{program.notes}</p>
                </Card>
              )}

              {program.accommodations && program.accommodations.length > 0 && (
                <Card className="p-6 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HomeIcon className="w-4 h-4" aria-hidden="true" />
                    Accommodation Options
                  </h2>
                  <div className="space-y-3">
                    {program.accommodations.map((acc) => (
                      <div
                        key={acc.id}
                        className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <span className="text-sm font-medium text-gray-800">{acc.roomType}</span>
                        <span className="text-sm font-semibold text-orange-600">
                          {acc.isFree
                            ? "Free"
                            : `${acc.currency === "USD" ? "$" : "¥"}${acc.price ?? "N/A"}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Financial sidebar */}
            <div className="space-y-6">
              <Card className="p-6 border border-gray-100 sticky top-32">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Wallet className="w-4 h-4" aria-hidden="true" />
                  Financials
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tuition (Original)</span>
                    <span className="font-semibold text-gray-900">
                      {program.tuitionFee ? `${currencySymbol}${program.tuitionFee}/year` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tuition After Scholarship</span>
                    <span className="font-semibold text-orange-600">
                      {!program.tuitionFeeAfter ? "Free (100% Covered)" : `${currencySymbol}${program.tuitionFeeAfter}/year`}
                    </span>
                  </div>
                  {program.applicationFee !== null && program.applicationFee !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Application Fee</span>
                      <span className="font-semibold text-gray-900">
                        {currencySymbol}
                        {program.applicationFee}
                      </span>
                    </div>
                  )}
                  {program.serviceFee !== null && program.serviceFee !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Fee</span>
                      <span className="font-semibold text-gray-900">
                        {currencySymbol}
                        {program.serviceFee}
                      </span>
                    </div>
                  )}
                  {program.stipendEnabled && (
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                        Monthly Stipend
                      </span>
                      <span className="font-semibold text-emerald-600">
                        {program.stipendAmount
                          ? `${currencySymbol}${program.stipendAmount}/${program.stipendUnit ?? "month"}`
                          : "Available"}
                      </span>
                    </div>
                  )}
                </div>

                {program.scholarship && (
                  <Link href={`/scholarships/${program.scholarship.id}`} className="block mt-6">
                    <Button variant="primary" className="w-full">
                      View Full Scholarship
                    </Button>
                  </Link>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
