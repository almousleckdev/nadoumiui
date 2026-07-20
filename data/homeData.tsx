import React from "react";
import { GraduationCap, Globe, Lightbulb, Compass, School, Award } from "lucide-react";

export interface WhyChooseUsFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const WHY_CHOOSE_US_FEATURES: WhyChooseUsFeature[] = [
  {
    title: "Affordable Excellence",
    description: "Access world-class higher education at a fraction of Western costs, backed by generous full and partial scholarship structures.",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    title: "Global Career Gateway",
    description: "Build robust connections with China's tech and industrial giants, opening up unmatched international and domestic career channels.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Innovation Hub",
    description: "Learn in state-of-the-art campus laboratories, engaging directly with artificial intelligence, clean energy, and advanced hardware.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    title: "Cultural Immersion",
    description: "Experience a perfect blend of ancient heritage and modern convenience, learning Mandarin along the way for high-value fluency.",
    icon: <Compass className="w-6 h-6" />,
  },
];

export const WHY_CHOOSE_US_BULLETS: string[] = [
  "Direct partnership with top-tier double first-class Chinese universities.",
  "Professional counseling with 98% application & visa success rates.",
  "End-to-end guidance from university selection to campus arrival.",
  "Bilingual support desk handling all document translating and certification.",
];

export interface Testimonial {
  name: string;
  country: string;
  university: string;
  program: string;
  image: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Abdoulaye Diallo",
    country: "Guinea",
    university: "Tsinghua University",
    program: "M.S. in Computer Science",
    image: "/images/student.jpg",
    quote: "Thanks to Nadoumi, I received a fully funded CSC scholarship at Tsinghua. The team helped me translate all certificates, prepare the research proposal, and walked me through the visa process seamlessly.",
  },
  {
    name: "Sophia Martinez",
    country: "Mexico",
    university: "Zhejiang University",
    program: "MBA",
    image: "/images/student1.jpg",
    quote: "Applying to study abroad was overwhelming, but Nadoumi took care of everything. They selected three partner universities that fit my business interests, and within two months I had my admission letter.",
  },
  {
    name: "Muhammad Ali",
    country: "Pakistan",
    university: "Sichuan University",
    program: "Ph.D. in Biotechnology",
    image: "/images/student2.jpg",
    quote: "I highly recommend Nadoumi for doctoral applicants. They mapped my research background with academic supervisors in Chengdu, securing both my tuition waiver and full monthly stipend.",
  },
];

export interface HeroStat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const HERO_STATS: HeroStat[] = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    value: "5,000+",
    label: "Available Scholarships",
  },
  {
    icon: <School className="w-5 h-5" />,
    value: "150+",
    label: "Partner Universities",
  },
  {
    icon: <Award className="w-5 h-5" />,
    value: "98%",
    label: "Visa & Admission Success",
  },
];
