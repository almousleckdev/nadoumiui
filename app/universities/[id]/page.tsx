"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getUniversityById } from "@/services/universityService";
import { getScholarships } from "@/services/scholarshipService";

import { ScholarshipCard } from "@/features/scholarships/components/ScholarshipCard";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { MetricCard } from "@/components/ui/MetricCard";
import { Tabs, Tab } from "@/components/ui/Tabs";
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  MapPinIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  StarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const TABS: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "scholarships", label: "Admissions & Scholarships" },
  { id: "campus", label: "Campus Life" },
  { id: "location", label: "Location & Contact" },
];

export default function UniversityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<string>("overview");

  const { data: university, isLoading, error } = useQuery({
    queryKey: ["university", id],
    queryFn: () => getUniversityById(id),
  });

  const { data: scholarshipsData } = useQuery({
    queryKey: ["scholarships", "university", university?.name],
    queryFn: () => getScholarships({ search: university?.name, limit: 3 }),
    enabled: !!university?.name,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Loading variant="page" text="Loading university..." />
        <Footer />
      </>
    );
  }

  if (error || !university) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 pb-20 bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">University Not Found</h2>
            <p className="text-gray-500 mb-6">The university you are looking for does not exist or has been removed.</p>
            <Button onClick={() => router.push("/universities")}>Back to Universities</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Parse albums if it exists
  let albumImages: string[] = [];
  if (Array.isArray(university.albums) && university.albums.length > 0) {
    albumImages = university.albums as string[];
  } else if (university.bannerImage) {
    albumImages = [university.bannerImage];
  }

  // Get a featured image for the overview section
  const overviewImage = albumImages.length > 0 ? albumImages[0] : "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920";

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 bg-gray-50 min-h-screen">
        {/* Premium Hero Section */}
        <div className="relative h-[450px] w-full bg-slate-900 flex flex-col justify-end">
          <div className="absolute inset-0 bg-slate-900 overflow-hidden">
            <Image
              src={university.bannerImage ?? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920"}
              alt="University Campus"
              fill
              priority
              className="object-cover opacity-40 mix-blend-overlay"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
          
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              {university.logo && (
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl p-3 shadow-2xl flex-shrink-0 relative overflow-hidden border-4 border-white/10">
                  <Image src={university.logo} alt="Logo" fill className="object-contain p-3" sizes="(max-width: 768px) 128px, 160px" />
                </div>
              )}
              <div className="flex-1 text-white">
                <div className="flex flex-wrap gap-3 mb-4">
                  {university.isTop && (
                    <Badge className="bg-orange-500 text-white font-bold border-none px-3 py-1 shadow-lg shadow-orange-500/30">Top Ranked</Badge>
                  )}
                  {university.isPartner && (
                    <Badge className="bg-blue-600 text-white font-bold border-none px-3 py-1 shadow-lg shadow-blue-600/30">Official Partner</Badge>
                  )}
                  <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 font-medium px-3 py-1">{university.type}</Badge>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 text-white drop-shadow-sm">
                  {university.name}
                </h1>
                {university.nameInChinese && (
                  <p className="text-2xl font-medium text-slate-300 mb-6 drop-shadow-sm">
                    {university.nameInChinese}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-6 text-slate-200 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-orange-400" />
                    <span>{university.city}, {university.province}</span>
                  </div>
                  {university.foundedYear && (
                    <div className="flex items-center gap-2">
                      <BuildingOfficeIcon className="w-5 h-5 text-blue-400" />
                      <span>Est. {university.foundedYear}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Key Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-16 relative z-20">
            <MetricCard 
              label="Total Students" 
              value={university.totalStudents?.toLocaleString() || "N/A"} 
              icon={<UserGroupIcon className="w-6 h-6" />}
            />
            <MetricCard 
              label="Intl. Students" 
              value={university.internationalStudents?.toLocaleString() || "N/A"} 
              icon={<GlobeAltIcon className="w-6 h-6" />}
            />
            <MetricCard 
              label="Degree Programs" 
              value={university.numberOfPrograms?.toLocaleString() || "N/A"} 
              icon={<AcademicCapIcon className="w-6 h-6" />}
            />
            <MetricCard 
              label="QS Ranking" 
              value={university.qsRank ? `#${university.qsRank}` : "Unranked"} 
              icon={<StarIcon className="w-6 h-6" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              
              <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
              
              <div className="pt-6">
                
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About {university.name}</h2>
                      <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed mb-8">
                        <p>{university.introduction || university.description || "No detailed description available."}</p>
                      </div>
                      
                      {/* Featured Overview Image */}
                      <div className="relative w-full h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-md group">
                        <Image 
                          src={overviewImage} 
                          alt="Campus View" 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          sizes="(max-width: 768px) 100vw, 800px" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <p className="text-white font-bold text-lg drop-shadow-sm">Discover your future at {university.name}</p>
                        </div>
                      </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {university.highlights && university.highlights.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                            <StarIcon className="w-5 h-5 text-orange-500" /> Key Highlights
                          </h3>
                          <ul className="space-y-3">
                            {university.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600 font-medium">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {university.advantages && university.advantages.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                            <AcademicCapIcon className="w-5 h-5 text-blue-600" /> Advantages
                          </h3>
                          <ul className="space-y-3">
                            {university.advantages.map((a, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600 font-medium">{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SCHOLARSHIPS TAB */}
                {activeTab === "scholarships" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="py-4 border-b border-gray-100 flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Scholarship Availability</h3>
                        <p className="text-gray-600">Status: <strong className="uppercase">{university.scholarshipAvailability.replace("_", " ")}</strong></p>
                      </div>
                      <AcademicCapIcon className="w-10 h-10 text-gray-200" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">Available Scholarships</h3>
                    {scholarshipsData?.scholarships && scholarshipsData.scholarships.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {scholarshipsData.scholarships.map(scholarship => (
                          <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8">
                        <AcademicCapIcon className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium text-lg">No specific scholarships found associated with this university right now.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* CAMPUS LIFE TAB */}
                {activeTab === "campus" && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <BuildingOfficeIcon className="w-7 h-7 text-indigo-600" />
                        Campus Facilities
                      </h2>
                      {university.campusFacilities && university.campusFacilities.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {university.campusFacilities.map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                <CheckCircleIcon className="w-4 h-4" />
                              </div>
                              <span className="font-semibold text-gray-700 leading-tight">{facility}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No facility details provided.</p>
                      )}
                    </section>

                    <section className="pt-4 border-t border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <PhotoIcon className="w-7 h-7 text-pink-600" />
                        Life at {university.name}
                      </h2>
                      {albumImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {albumImages.map((src, idx) => (
                            <div key={idx} className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm group">
                              <Image 
                                src={src} 
                                alt={`Campus Life ${idx + 1}`} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">No photos available.</p>
                      )}
                    </section>
                  </div>
                )}

                {/* LOCATION TAB */}
                {activeTab === "location" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">Location & Contact</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: Contact Info */}
                      <div className="space-y-6 pt-4 relative">
                          
                          <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                              <MapPinIcon className="w-4 h-4 text-orange-500" /> Headquarters
                            </span>
                            <span className="text-2xl font-extrabold text-gray-900">
                              {university.city}, {university.province}
                            </span>
                          </div>
                          
                          <div className="h-px w-full bg-gray-100"></div>

                          {university.officialWebsite && (
                            <div className="flex flex-col gap-1 group">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Website</span>
                              <a href={university.officialWebsite.startsWith('http') ? university.officialWebsite : `https://${university.officialWebsite}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                                <GlobeAltIcon className="w-5 h-5" />
                                {university.officialWebsite.replace(/^https?:\/\//, '')}
                              </a>
                            </div>
                          )}
                          
                          {university.admissionsEmail && (
                            <div className="flex flex-col gap-1 group">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admissions Office</span>
                              <a href={`mailto:${university.admissionsEmail}`} className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                {university.admissionsEmail}
                              </a>
                            </div>
                          )}
                          
                          {university.officePhone && (
                            <div className="flex flex-col gap-1 group">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</span>
                              <a href={`tel:${university.officePhone}`} className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                <PhoneIcon className="w-5 h-5 text-gray-400" />
                                {university.officePhone}
                              </a>
                            </div>
                          )}
                        </div>
                      
                      {/* Right: Map Placeholder / Visual */}
                      <div className="relative bg-slate-100 rounded-3xl overflow-hidden shadow-sm h-[400px] border border-gray-200 flex items-center justify-center group">
                        <Image 
                          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                          alt="Map Location" 
                          fill 
                          className="object-cover opacity-60 group-hover:opacity-70 transition-opacity" 
                          sizes="(max-width: 768px) 100vw, 400px" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                        <div className="relative z-10 text-center bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[80%]">
                          <MapPinIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                          <p className="font-bold text-gray-900 text-lg">Map View Coming Soon</p>
                          <p className="text-sm text-gray-600 mt-1">Explore the vibrant campus of {university.name} in {university.city}.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar (Sticky) */}
            <div className="space-y-6">
              <div className="sticky top-24">
                <div className="pb-8 border-b border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Interested?</h3>
                  <p className="text-gray-500 mb-8">
                    Discover your opportunities and start the application process for {university.name}.
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <Button 
                      variant="primary" 
                      className="shadow-md shadow-blue-500/20"
                      onClick={() => router.push(`/scholarships?search=${encodeURIComponent(university.name)}`)}
                    >
                      Find Scholarships
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-2 border-gray-200 hover:border-gray-300"
                      onClick={() => router.push("/contact")}
                    >
                      Contact Advisor
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                      Need help? <a href="/contact" className="text-blue-600 font-semibold hover:underline">Speak to our experts</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
