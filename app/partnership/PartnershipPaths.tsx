import { Users, Building2, Video, GraduationCap, type LucideIcon } from "lucide-react";

interface PartnershipPath {
  icon: LucideIcon;
  title: string;
  bestFor: string;
  description: string;
}

const PATHS: PartnershipPath[] = [
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

export function PartnershipPaths() {
  return (
    <section>
      <div className="max-w-2xl mb-10">
        <span className="text-orange-600 font-bold tracking-wider uppercase text-xs mb-3 block">
          Ways to Work Together
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Find your path</h2>
        <p className="text-gray-500 leading-relaxed">
          Every inquiry below routes through the same form — pick the description that fits, and we&apos;ll tailor
          our response accordingly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PATHS.map(({ icon: Icon, title, bestFor, description }) => (
          <div
            key={title}
            className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5 group-hover:bg-orange-600 transition-colors duration-200">
              <Icon className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-200" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-3">{bestFor}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PartnershipPaths;
