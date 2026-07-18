import Image from "next/image";
import Card from "@/components/ui/Card";
import { Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
export function TestimonialSection() {
  const testimonials = [
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
          {testimonials.map((t, idx) => (
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
                  className="rounded-full object-cover bg-gray-100"
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
