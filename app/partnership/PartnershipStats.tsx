import { PARTNERSHIP_STATS } from "@/data/partnershipData";

export function PartnershipStats() {
  return (
    <section className="bg-slate-900 rounded-3xl px-6 sm:px-10 py-10 sm:py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-orange-600/20 blur-3xl pointer-events-none" />
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
        {PARTNERSHIP_STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="text-center lg:text-left">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center mb-4 mx-auto lg:mx-0">
              <Icon className="w-5 h-5 text-orange-400" aria-hidden="true" />
            </div>
            <span className="text-3xl font-black text-white block font-heading">{value}</span>
            <span className="text-sm text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PartnershipStats;
