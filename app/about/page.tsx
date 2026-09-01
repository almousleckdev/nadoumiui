import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  Globe,
  Sparkles,
  Award,
  BookOpen,
  Send,
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import StatsHeroStrip from "@/components/common/StatsHeroStrip";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { aboutData, type ValueItem } from "@/data/about";

export const metadata = {
  title: "About Us | Sichuan Nadoumi Education Consulting",
  description:
    "Bridging global scholars with top Chinese universities and fully-funded scholarships since 2014. Headquartered in Mianyang, Sichuan, China.",
};

const VALUE_ICONS: Record<ValueItem["iconName"], React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-gray-800" />,
  Building2: <Building2 className="w-6 h-6 text-gray-800" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-gray-800" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-gray-800" />,
  Globe: <Globe className="w-6 h-6 text-gray-800" />,
  Sparkles: <Sparkles className="w-6 h-6 text-gray-800" />,
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* ========================================================================= */}
        {/* HERO SECTION (Clean White & Slate Aesthetic)                              */}
        {/* ========================================================================= */}
        <section className="relative pt-32 pb-14 bg-white border-b border-gray-100">
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Bilingual Entity Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-600" />
              <span>四川纳豆米教育咨询有限公司</span>
              <span className="text-gray-300">|</span>
              <span>Est. 2014 &bull; Mianyang, China</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight text-balance">
              Empowering Global Scholars, <br className="hidden sm:inline" />
              Unlocking Higher Education in China
            </h1>

            <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed text-balance mb-8">
              For over a decade, Sichuan Nadoumi Education Consulting has connected international talent with fully-funded CSC, provincial, and university scholarships at China&apos;s most prestigious institutions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/scholarships">
                <Button variant="primary" size="lg" className="shadow-md shadow-orange-600/20 font-bold px-8 py-3">
                  Explore Scholarships
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/partners">
                <Button variant="outline" size="lg" className="font-semibold px-8 py-3 border-gray-200 text-gray-800 hover:bg-gray-50">
                  Partner Universities
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SHARED FLOATING STATS STRIP                                               */}
        {/* ========================================================================= */}
        <section className="py-10 bg-slate-50 border-b border-gray-200">
          <StatsHeroStrip />
        </section>

        {/* ========================================================================= */}
        {/* OUR STORY & HERITAGE                                                      */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-100 border border-gray-200">
                  <BookOpen className="w-3.5 h-3.5 text-orange-600" />
                  Our Story & Heritage
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Over a Decade of Educational Leadership in Mianyang, Sichuan
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                  <p>
                    Headquartered in Mianyang, Sichuan Province, <strong>Sichuan Nadoumi Education Consulting Co., Ltd. (四川纳豆米教育咨询有限公司)</strong> was founded in 2014 with an enduring commitment: to provide international students with direct, transparent, and barrier-free access to top Chinese higher education.
                  </p>
                  <p>
                    Over the past ten years, China has become one of the world&apos;s leading destinations for higher education, renowned for groundbreaking research in medicine (MBBS), artificial intelligence, advanced engineering, and international commerce.
                  </p>
                  <p>
                    Nadoumi works directly with university international admission offices and provincial authorities to secure reserved scholarship quotas, verify credentials, and guide candidates through each stage of their academic journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Direct Quota Negotiations</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Reserved full and partial scholarship allocations.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Visa & JW202 Processing</h4>
                      <p className="text-xs text-gray-500 mt-0.5">End-to-end official documentation clearance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Information Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-gray-200 bg-slate-50 p-8 shadow-sm space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-900 shadow-sm">
                    <Building2 className="w-6 h-6 text-orange-600" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Corporate Registration</span>
                    <h3 className="text-lg font-bold text-gray-900">{aboutData.company.name}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">{aboutData.company.nameCn}</p>
                  </div>

                  <div className="space-y-3 border-t border-gray-200 pt-5 text-xs sm:text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>Mianyang, Sichuan Province, China</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>Founded in 2014 &bull; 10+ Years of Operation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>Licensed Higher Education Advisory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MISSION & CORE VALUES BENTO                                               */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 border-y border-gray-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-14">
            <SectionHeader
              className="!mb-0"
              badge={
                <>
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  Guiding Principles
                </>
              }
              title="Our Core Values"
              description="Everything we do is anchored by our commitment to student success, ethical admissions practices, and academic excellence."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutData.values.map((val) => (
                <div
                  key={val.id}
                  className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                      {VALUE_ICONS[val.iconName]}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-lg font-bold text-gray-900">{val.title}</h3>
                        {val.titleCn && (
                          <span className="text-xs font-semibold text-gray-400">{val.titleCn}</span>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed mt-2 text-sm">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MILESTONE TIMELINE (10-YEAR JOURNEY)                                      */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-14">
            <SectionHeader
              className="!mb-0"
              badge={
                <>
                  <Calendar className="w-3.5 h-3.5 text-orange-600" />
                  Our Journey
                </>
              }
              title="A Decade of Milestones"
              description="From our grassroots foundation in 2014 in Mianyang, Sichuan to a trusted scholarship network today."
            />

            <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-28 space-y-10">
              {aboutData.milestones.map((milestone, idx) => (
                <div key={idx} className="relative pl-8 sm:pl-12">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-orange-600 shadow-sm" />
                  
                  <div className="sm:absolute sm:-left-24 sm:top-0 text-gray-900 font-extrabold font-heading text-lg">
                    {milestone.year}
                  </div>

                  <div className="bg-slate-50 rounded-2xl border border-gray-200 p-6 space-y-2">
                    {milestone.highlight && (
                      <span className="inline-block text-[11px] font-bold text-gray-800 uppercase tracking-wider bg-white border border-gray-200 px-2.5 py-0.5 rounded-md mb-1">
                        {milestone.highlight}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-gray-900">{milestone.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEADERSHIP & ADVISORY TEAM                                                */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 border-t border-gray-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-14">
            <SectionHeader
              className="!mb-0"
              badge={
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                  Admissions Experts
                </>
              }
              title="Meet Our Admissions Advisors"
              description="Our seasoned educators, admissions officers, and academic counselors are dedicated to maximizing your scholarship potential."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutData.team.map((member) => (
                <Card key={member.id} className="overflow-hidden p-6 flex flex-col justify-between border border-gray-200 bg-white hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-sm">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="text-center space-y-0.5">
                      <h3 className="text-base font-bold text-gray-900 leading-tight">{member.name}</h3>
                      {member.nameCn && (
                        <p className="text-xs text-gray-400 font-medium">{member.nameCn}</p>
                      )}
                      <p className="text-xs font-semibold text-gray-700 pt-1 leading-snug">
                        {member.position}
                      </p>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                    <div className="text-[11px] text-gray-500 font-medium">
                      <span className="font-bold text-gray-700">Focus:</span> {member.specialization}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.languages.map((lang, lIdx) => (
                        <span key={lIdx} className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CALL TO ACTION BANNER                                                     */}
        {/* ========================================================================= */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Start Your Educational Journey in China Today
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join thousands of scholars who have transformed their careers through Chinese higher education. Let our admissions team guide you to your ideal scholarship.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/scholarships">
                <Button variant="primary" size="lg" className="font-bold px-8 py-3 shadow-md shadow-orange-600/20">
                  Search Scholarships
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-gray-200 text-gray-800 hover:bg-gray-50 font-semibold px-8 py-3">
                  <Send className="w-4 h-4 mr-2" />
                  Contact Admissions
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
