import SectionHeader from "@/components/ui/SectionHeader";

export function JourneySection() {
  const steps = [
    {
      num: "01",
      title: "Search & Shortlist",
      description: "Explore our verified database of scholarships and universities. Filter by field, teaching language, and location to find your perfect fit.",
    },
    {
      num: "02",
      title: "Submit Single Application",
      description: "Upload your academic credentials once on our secure platform. Our advisory experts will review, optimize, and translate your documents.",
    },
    {
      num: "03",
      title: "Get Admission & Visa",
      description: "Track your university reviews in real-time. Receive your JW202 visa forms and admission letters directly at your doorstep.",
    },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          theme="dark"
          badge="Easy Steps"
          title="Your Journey Starts Here"
          description="We simplify the complex Chinese university application and scholarship process into three straightforward steps."
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Horizontal Connection Lines (Desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-orange-600/20 via-orange-600 to-orange-600/20 z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative z-10">
              
              {/* Step Number Circle */}
              <div className="w-24 h-24 rounded-full bg-slate-950 border border-orange-600 flex items-center justify-center font-heading text-2xl font-black text-orange-500 shadow-xl shadow-black/40 mb-8 transition-transform duration-300 hover:scale-105">
                {step.num}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold font-heading mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default JourneySection;
