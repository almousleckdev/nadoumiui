import {
  Users,
  Building2,
  Video,
  GraduationCap,
  Award,
  Clock,
  School,
  FileEdit,
  Search,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

export interface PartnershipPathItem {
  icon: LucideIcon;
  title: string;
  bestFor: string;
  description: string;
}

export const PARTNERSHIP_PATHS: PartnershipPathItem[] = [
  {
    icon: Users,
    title: "Recruitment Agencies",
    bestFor: "Best for agencies & counselors",
    description: "Refer students into our partner programs and earn competitive commissions on successful placements.",
  },
  {
    icon: Building2,
    title: "Universities & Institutions",
    bestFor: "Best for admissions offices",
    description: "Expand your international student pipeline through a dedicated pathway with our advisory network.",
  },
  {
    icon: Video,
    title: "Content Creators",
    bestFor: "Best for education creators",
    description: "Collaborate on scholarship guides, campus tours, and study-abroad content for our student audience.",
  },
  {
    icon: GraduationCap,
    title: "Prospective Students",
    bestFor: "Best for direct applicants",
    description: "Not a partnership, but the same door — tell us your goals and we'll match you with the right program.",
  },
];

export interface PartnershipStatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

export const PARTNERSHIP_STATS: PartnershipStatItem[] = [
  { icon: GraduationCap, value: "5,000+", label: "Available Scholarships" },
  { icon: School, value: "150+", label: "Partner Universities" },
  { icon: Award, value: "98%", label: "Visa & Admission Success" },
  { icon: Clock, value: "24h", label: "Typical Response Time" },
];

export interface PartnershipNextStepItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PARTNERSHIP_NEXT_STEPS: PartnershipNextStepItem[] = [
  {
    icon: FileEdit,
    title: "Submit your inquiry",
    description: "Tell us a bit about your organization and what you have in mind.",
  },
  {
    icon: Search,
    title: "We review within 24 hours",
    description: "Our business development team looks at every inquiry personally.",
  },
  {
    icon: PhoneCall,
    title: "We schedule a call",
    description: "If it's a fit, we'll reach out to set up a time that works for you.",
  },
];

export const PARTNERSHIP_TYPE_OPTIONS = [
  { value: "agency", label: "Recruitment Agency / Education Counselor" },
  { value: "university", label: "University / Academic Institution" },
  { value: "creator", label: "Content Creator / Media Partner" },
  { value: "student", label: "Student / Parent (Direct Application)" },
  { value: "other", label: "Other" },
];

export const DEGREE_LEVEL_OPTIONS = [
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "phd", label: "Ph.D. / Doctoral" },
  { value: "language", label: "Non-Degree / Chinese Language" },
  { value: "undecided", label: "Not Sure Yet" },
];
