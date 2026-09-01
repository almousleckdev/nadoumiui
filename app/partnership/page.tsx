import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import StatsHeroStrip from "@/components/common/StatsHeroStrip";
import Button from "@/components/ui/Button";
import { PartnershipPaths } from "./PartnershipPaths";
import { PartnershipNextSteps } from "./PartnershipNextSteps";
import { PartnershipForm } from "./PartnershipForm";

export const metadata: Metadata = {
  title: "Partner with Nadoumi | Sichuan Nadoumi Education Consulting",
  description:
    "Whether you are an educational agency, a university, or a content creator, we are always looking for strategic partnerships to expand our global reach.",
};

export default function PartnershipPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* ========================================================================= */}
        {/* HERO SECTION (Clean White Aesthetic)                                      */}
        {/* ========================================================================= */}
        <section className="relative pt-32 pb-14 bg-white border-b border-gray-100">
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 mb-6 shadow-sm">
              <Handshake className="w-4 h-4 text-orange-600" />
              <span>Strategic Institutional Cooperation</span>
              <span className="text-gray-300">&bull;</span>
              <span>Global Education Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight text-balance">
              Partner with Nadoumi
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed text-balance mb-8">
              Whether you are an agency, a university, a content creator, or a prospective student — let&apos;s build an enduring admissions pathway together.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#inquiry-form">
                <Button variant="primary" size="lg" className="shadow-md shadow-orange-600/20 font-bold px-8 py-3">
                  Submit Partnership Inquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/partners">
                <Button variant="outline" size="lg" className="font-semibold px-8 py-3 border-gray-200 text-gray-800 hover:bg-gray-50">
                  View Partner Network
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
        {/* WAYS TO WORK TOGETHER & FORM                                              */}
        {/* ========================================================================= */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20">
          <PartnershipPaths />

          <section id="inquiry-form" className="pt-6">
            <div className="max-w-2xl mb-10">
              <span className="text-orange-600 font-bold tracking-wider uppercase text-xs mb-3 block">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                Tell us about your organization
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Fill out the form below — the more detail you share, the faster our business development team can tailor the right cooperation framework.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 order-2 lg:order-1">
                <PartnershipNextSteps />
              </div>
              <div className="lg:col-span-8 order-1 lg:order-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm">
                  <PartnershipForm />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
