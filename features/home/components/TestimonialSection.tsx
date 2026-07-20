import Image from "next/image";
import Card from "@/components/ui/Card";
import { Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/data/homeData";

export function TestimonialSection() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Student Stories"
          title="Scholar Success Stories"
          description="Hear from international scholars who successfully made their move to China with the help of Nadoumi Consulting."
        />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <Card key={idx} hover className="flex flex-col h-full bg-white p-8 border border-gray-100 relative">
              
              {/* Star Rating */}
              <div className="flex gap-1 text-amber-400 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
                &quot;{t.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 shrink-0 rounded-full object-cover bg-gray-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-orange-600 font-semibold mb-0.5">
                    {t.university}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {t.program} ({t.country})
                  </p>
                </div>
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TestimonialSection;
