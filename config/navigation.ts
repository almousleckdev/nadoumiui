export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Universities", href: "/universities" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Universities", href: "/universities" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_GUIDE_LINKS: NavLink[] = [
  { label: "How to Apply", href: "/guides/how-to-apply" },
  { label: "Scholarship Types", href: "/guides/scholarship-types" },
  { label: "Student Visa Guide", href: "/guides/student-visa" },
  { label: "Living in China", href: "/guides/living-in-china" },
  { label: "City Guides", href: "/guides/city-guides" },
  { label: "FAQ", href: "/faq" },
];
