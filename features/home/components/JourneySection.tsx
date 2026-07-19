import SectionHeader from "@/components/ui/SectionHeader";
import ProcessSteps from "./ProcessSteps";
import { applicationSteps } from "@/data/applicationSteps";

export function JourneySection() {
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
          description="From application fee to visa in hand — here's exactly how the Nadoumi process works, start to finish."
        />

        <ProcessSteps steps={applicationSteps} variant="dark" />
      </div>
    </section>
  );
}

export default JourneySection;
