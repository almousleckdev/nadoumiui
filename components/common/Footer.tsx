import Link from "next/link";
import { cn } from "@/utils/cn";

import Image from "next/image";
import { FOOTER_QUICK_LINKS, FOOTER_GUIDE_LINKS } from "@/config/navigation";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-slate-900 text-gray-300", className)}>
      {/*Main Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 — Logo & About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3 focus-ring group transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-11 w-11 rounded-xl bg-white p-1 overflow-hidden shadow-sm shrink-0 border border-slate-700/50">
                <Image
                  src="/logo/logo.jpg"
                  alt="Nadoumi Consulting Logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-extrabold text-white tracking-tight leading-none group-hover:text-orange-400 transition-colors">
                  Nadoumi
                </span>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider leading-none mt-1">
                  Education Consulting
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
              Connecting international students with fully-funded scholarships
              and world-class programs at China&apos;s most prestigious
              universities.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-orange-400 focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 Guides */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Guides
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_GUIDE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-orange-400 focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 Corporate Address */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Corporate Office
            </h3>
            <address className="mt-5 space-y-3 not-italic">
              <p className="text-sm leading-relaxed text-gray-400">
                Sichuan Nadoumi Education
                <br />
                Consulting Co., Ltd.
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                MianYang, China
                <br />
                四川省绵阳市涪城区西路2号九洲北郡6栋一单元8层02号
              </p>
              <p className="text-sm">
                <a
                  href="mailto:team@nadoumiconsulting.com"
                  className="block text-orange-500 transition-colors hover:text-orange-400 focus-ring mb-1"
                >
                  team@nadoumiconsulting.com
                </a>
                <a
                  href="tel:+8615908237607"
                  className="block text-orange-500 transition-colors hover:text-orange-400 focus-ring"
                >
                  +86 159 0823 7607
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Sichuan Nadoumi Education Consulting Co., Ltd.
            All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-xs text-gray-500 transition-colors hover:text-gray-300 focus-ring"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-gray-500 transition-colors hover:text-gray-300 focus-ring"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
