import Button from "@/components/ui/Button";
import Link from "next/link";
import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { WHY_CHOOSE_US_FEATURES, WHY_CHOOSE_US_BULLETS } from "@/data/homeData";

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: 2x2 Feature Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {WHY_CHOOSE_US_FEATURES.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: CTA & Context */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionHeader
              align="left"
              badge="Why Study in China"
              title="Empowering Global Students to Reach New Heights"
              description="China has emerged as a global superpower in technological innovation, high-tech manufacturing, and academic research. Nadoumi Education Consulting provides a seamless pathway for international students to access fully funded positions in this dynamic environment."
              className="mb-8"
            />

            <ul className="space-y-4 mb-8 text-sm text-gray-700 font-medium">
              {WHY_CHOOSE_US_BULLETS.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <Link href="/about">
              <Button variant="secondary" size="lg" className="rounded-xl shadow-sm">
                Learn More About Us
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
