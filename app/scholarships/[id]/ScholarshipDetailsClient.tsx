"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import type { Scholarship } from "@/types";
import { getScholarshipById } from "@/services/scholarshipService";
import { ScholarshipDetails } from "@/features/scholarships/components/ScholarshipDetails";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { Timeline, TimelineStep } from "@/components/ui/Timeline";
import { 
  ClockIcon, 
  AcademicCapIcon, 
  MapPinIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  DocumentCheckIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

interface ScholarshipDetailsClientProps {
  initialData: Scholarship;
}

export default function ScholarshipDetailsPage({ initialData }: ScholarshipDetailsClientProps) {
  const params = useParams();
  const router = useRouter();
  const id = (params.id as string) || initialData.id;

  const { data: scholarship, isLoading, error } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: () => getScholarshipById(id),
    initialData: initialData,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Loading variant="page" text="Loading details..." />
        <Footer />
      </>
    );
  }

  if (error || !scholarship) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 pb-20 bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Scholarship Not Found</h2>
            <p className="text-gray-500 mb-6">The scholarship you are looking for does not exist or has closed.</p>
            <Button onClick={() => router.push("/scholarships")}>Browse Scholarships</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const deadlineDate = new Date(scholarship.applicationDeadline);
  const deadlineStr = deadlineDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  
  // Calculate days left
  const daysLeft = Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const isUrgent = daysLeft > 0 && daysLeft <= 14;
  
  const university = scholarship.universities?.[0];

  const applicationSteps: TimelineStep[] = [
    {
      title: "Check Eligibility",
      description: "Review the general and language requirements carefully.",
      icon: <CheckCircleIcon className="w-5 h-5" />
    },
    {
      title: "Prepare Documents",
      description: "Gather all required documents including transcripts and language certificates.",
      icon: <DocumentCheckIcon className="w-5 h-5" />
    },
    {
      title: "Submit Application",
      description: `Complete the online application before ${deadlineStr}.`,
      icon: <AcademicCapIcon className="w-5 h-5" />
    },
    {
      title: "Review & Interview",
      description: "Wait for the initial review and potential interview invitation.",
      icon: <UserGroupIcon className="w-5 h-5" />
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 bg-gray-50 min-h-screen">
        
        {/* Premium Hero Section */}
        <div className="relative h-[450px] w-full bg-blue-950 flex flex-col justify-end">
          <div className="absolute inset-0 bg-blue-950 overflow-hidden">
            <Image
              src={scholarship.coverImage ?? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920"}
              alt="Scholarship Banner"
              fill
              priority
              className="object-cover opacity-30 mix-blend-overlay"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/80 to-transparent" />
          
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex flex-col md:flex-row gap-8 items-end justify-between">
              <div className="flex-1 text-white">
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge className="bg-orange-500 text-white font-bold border-none px-3 py-1 shadow-lg shadow-orange-500/30">
                    {scholarship.scholarshipCategory.replace("_", " ")}
                  </Badge>
                  {scholarship.isTop && (
                    <Badge className="bg-blue-500 text-white font-bold border-none px-3 py-1 shadow-lg shadow-blue-500/30">Top Pick</Badge>
                  )}
                  {scholarship.isHot && (
                    <Badge className="bg-red-500 text-white font-bold border-none px-3 py-1 shadow-lg shadow-red-500/30">High Demand</Badge>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 text-white drop-shadow-sm max-w-4xl leading-tight">
                  {scholarship.title}
                </h1>
                
                {scholarship.titleInChinese && (
                  <p className="text-2xl font-medium text-blue-200 mb-6 drop-shadow-sm">
                    {scholarship.titleInChinese}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-blue-100 font-medium">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-orange-400" />
                    <span>Deadline: <strong className="text-white">{deadlineStr}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AcademicCapIcon className="w-5 h-5 text-green-400" />
                    <span>Levels: <strong className="text-white">{scholarship.programCategories.join(", ")}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ScholarshipDetails scholarship={scholarship} />
              
              {/* Application Timeline */}
              <section className="pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <ClockIcon className="w-7 h-7 text-blue-600" />
                  Application Process
                </h2>
                <Timeline steps={applicationSteps} />
              </section>
            </div>
            
            {/* Right Sidebar (Sticky) */}
            <div className="space-y-8">
              <div className="sticky top-24 space-y-8">
                
                {/* Action Section without card bg */}
                <div className="pb-6 border-b border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply Now</h3>
                  
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm font-medium text-gray-500">Available Slots</p>
                    {scholarship.availableSlots > 0 ? (
                      <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
                        {scholarship.availableSlots} left
                      </span>
                    ) : (
                      <span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">
                        Limited
                      </span>
                    )}
                  </div>
                  
                  {isUrgent && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-red-500" />
                      Closing soon! Only {daysLeft} days remaining.
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-3">
                    <Button variant="primary" className="shadow-md shadow-blue-500/20">
                      Start Application
                    </Button>
                    <Button variant="outline" className="border-2 text-gray-700">
                      Contact Advisor
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                    <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                    Official Nadoumi Processing
                  </div>
                </div>

                {/* Linked University Snippet */}
                {university && (
                  <div className="pt-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Host Institution</h3>
                    <div className="flex items-center gap-4 mb-5">
                      {university.logo ? (
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image src={university.logo} alt={university.name} fill className="object-contain rounded-xl border border-gray-100 p-1" sizes="64px" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                          <AcademicCapIcon className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900 leading-tight mb-1">{university.name}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                          <MapPinIcon className="w-4 h-4 text-orange-500" />
                          {university.city}, {university.province}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2 text-sm font-bold bg-slate-50 border-transparent hover:bg-slate-100 hover:border-slate-200"
                      onClick={() => router.push(`/universities/${university.id}`)}
                    >
                      View University Profile
                    </Button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
