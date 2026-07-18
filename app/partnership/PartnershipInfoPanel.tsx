import { Users, Briefcase } from "lucide-react";

export function PartnershipInfoPanel() {
  return (
    <div className="w-full lg:w-5/12 bg-gray-900 p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-orange-500 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>

      <div className="relative z-10">
        <span className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-4 block">
          Partner with Nadoumi
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
          Let&apos;s grow together and empower students worldwide.
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Whether you are an educational agency, a university, or a content creator, we are always looking for
          strategic partnerships to expand our global reach.
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">Agency Collaboration</h4>
              <p className="text-sm text-gray-400">Refer students and earn competitive commissions.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">University Partnerships</h4>
              <p className="text-sm text-gray-400">Expand your international student recruitment.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
        <p className="text-sm text-gray-400">
          Direct inquiries:{" "}
          <a href="mailto:team@nadoumiconsulting.com" className="text-orange-400 hover:text-orange-300">
            team@nadoumiconsulting.com
          </a>
        </p>
      </div>
    </div>
  );
}
