import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface AuthLayoutProps {
  title: string;
  subtitle: string;
  align?: "center" | "start";
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, align = "center", children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Left Sidebar (Image/Branding) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero-group.png"
          alt="Nadoumi Scholars"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent" />
        
        {/* Branding Content */}
        <div className="absolute bottom-16 left-16 right-16 text-white z-10">
          <Link href="/" className="inline-block bg-white p-3 rounded-2xl mb-8 shadow-xl">
            <div className="relative h-14 w-14 overflow-hidden">
              <Image
                src="/logo/logo.jpg"
                alt="Nadoumi Consulting Logo"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Your Future Starts in China
          </h1>
          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            Join thousands of international students who have successfully secured fully-funded scholarships and world-class education with Nadoumi Consulting.
          </p>
        </div>
      </div>

      {/* Right Content (Form) */}
      <div
        className={`w-full lg:w-1/2 flex flex-col justify-center items-center ${align === "start" ? "lg:items-start" : ""} py-12 px-4 sm:px-6 lg:px-16 xl:px-24 bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-10`}
      >
        
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8 w-full max-w-md">
          <Link href="/" className="inline-block bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm">
            <div className="relative h-11 w-11 overflow-hidden">
              <Image
                src="/logo/logo.jpg"
                alt="Nadoumi Consulting Logo"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500">{subtitle}</p>
          </div>

          <div className="bg-white rounded-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
