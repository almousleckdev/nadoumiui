import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { PartnershipInfoPanel } from "./PartnershipInfoPanel";
import { PartnershipForm } from "./PartnershipForm";

export const metadata: Metadata = {
  title: "Partner with Nadoumi",
  description:
    "Whether you are an educational agency, a university, or a content creator, we are always looking for strategic partnerships to expand our global reach.",
};

export default function PartnershipPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 flex-grow font-sans pt-24 pb-24 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 max-w-6xl mx-auto">
            <PartnershipInfoPanel />
            <div className="w-full lg:w-7/12 p-10 md:p-14">
              <PartnershipForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
