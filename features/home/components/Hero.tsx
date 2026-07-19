"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Search, GraduationCap, School, Award } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/scholarships?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/scholarships");
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero-group.png"
          alt="Chinese University Campus"
          fill
          priority
          className="object-cover object-center animate-slow-zoom"
          sizes="100vw"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="animate-fade-in-up flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-orange-600/20 border border-orange-500/35 text-orange-400 mb-6 uppercase tracking-wider">
            Sichuan Nadoumi Education Consulting
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl text-balance">
            Your Future <span className="text-orange-500">Starts in China</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl text-balance">
            Discover thousands of fully-funded scholarships and world-class programs at China&apos;s most prestigious institutions. Your gateway to global academic excellence.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15 flex flex-col sm:flex-row gap-2 mb-12 shadow-2xl shadow-black/20"
          >
            <div className="flex-1 relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search scholarships, fields of study, or universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 pl-11 pr-4 py-3.5 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 text-sm sm:text-base"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-orange-600/30 rounded-xl"
            >
              Search Scholarships
            </Button>
          </form>

          {/* KPI Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl pt-4 border-t border-white/10">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-heading">5,000+</span>
              <span className="text-xs text-gray-400">Available Scholarships</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2">
                <School className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-heading">150+</span>
              <span className="text-xs text-gray-400">Partner Universities</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-heading">98%</span>
              <span className="text-xs text-gray-400">Visa & Admission Success</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
