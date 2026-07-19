import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import { PartnershipPaths } from "./PartnershipPaths";
import { PartnershipStats } from "./PartnershipStats";
import { PartnershipNextSteps } from "./PartnershipNextSteps";
import { PartnershipForm } from "./PartnershipForm";

export const metadata: Metadata = {
  title: "Partner with Nadoumi",
  description:
    "Whether you are an educational agency, a university, or a content creator, we are always looking for strategic partnerships to expand our global reach.",
};

export default function PartnershipPage() {
  return (
    <PageShell
      title="Partner with Nadoumi"
      description="Whether you're an agency, a university, a content creator, or a prospective student — let's build something great together."
      mainClassName="bg-gray-50 min-h-screen"
    >
      <div className="space-y-16 sm:space-y-20">
        <PartnershipPaths />

        <PartnershipStats />

        <section>
          <div className="max-w-2xl mb-10">
            <span className="text-orange-600 font-bold tracking-wider uppercase text-xs mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Tell us about your idea</h2>
            <p className="text-gray-500 leading-relaxed">
              Fill out the form below — the more detail you share, the faster we can point you to the right person
              on our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 order-2 lg:order-1">
              <PartnershipNextSteps />
            </div>
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
                <PartnershipForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
