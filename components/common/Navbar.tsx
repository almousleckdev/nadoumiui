"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/cn";
import { MAIN_NAV_LINKS } from "@/config/navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4 sm:px-6 transition-all duration-500 ease-in-out pointer-events-none">
      <nav 
        className={cn(
          "pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-in-out",
          scrolled 
            ? "bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5" 
            : "bg-white/20 backdrop-blur-lg border border-white/30 shadow-sm"
        )}
      >
        {/* Logo Section */}
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex items-center gap-2 focus-ring group transition-transform duration-300 hover:scale-[1.02]">
            <div className="relative h-10 w-32 sm:w-36 sm:h-11 overflow-hidden flex items-center">
               <Image 
                 src="/logo/logo.jpg" 
                 alt="Nadoumi Consulting Logo" 
                 fill
                 sizes="(max-width: 768px) 128px, 144px"
                 className="object-contain object-left mix-blend-multiply"
                 priority
               />
            </div>
          </Link>
        </div>

        {/* Centered Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 px-4">
          <ul className="flex items-center gap-1">
            {MAIN_NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[15px] font-medium transition-all duration-300",
                      active
                        ? "text-orange-600 font-semibold bg-white/80 shadow-sm"
                        : "text-gray-700 hover:text-gray-900 hover:bg-white/50"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Section (Auth Buttons) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link
            href="/login"
            className="rounded-full px-5 py-2 text-[15px] font-medium text-gray-800 transition-all duration-300 hover:bg-white/60 focus-ring"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-full px-6 py-2 text-[15px] font-medium text-white bg-orange-600 shadow-sm transition-all duration-300 hover:bg-orange-700 hover:shadow-orange-500/25 hover:shadow-lg active:scale-[0.98] focus-ring"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center shrink-0 ml-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full p-2 text-gray-700 transition-colors hover:bg-white/60 focus-ring"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "absolute left-4 right-4 top-full mt-4 overflow-hidden rounded-3xl bg-white/95 backdrop-blur-2xl transition-all duration-300 ease-in-out lg:hidden shadow-xl border-gray-100 pointer-events-auto",
          mobileMenuOpen ? "max-h-[32rem] opacity-100 border" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <div className="flex flex-col space-y-1 px-6 pb-8 pt-4">
          {MAIN_NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block rounded-2xl px-5 py-4 text-base font-semibold transition-all duration-200",
                  active
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-gray-100">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full px-5 py-4 text-center text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-ring border border-gray-200"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full bg-orange-600 px-5 py-4 text-center text-base font-semibold text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700 focus-ring"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
