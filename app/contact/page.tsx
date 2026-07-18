import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { contactData } from "@/data/contact";
import { PageHero } from "@/components/ui/PageHero";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Nadoumi",
  description: "Our admission experts are here to help you navigate your journey to studying in China.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white flex-grow font-sans pb-24">
        <PageHero
          title="Contact Us"
          description="Our admission experts are here to help you navigate your journey to studying in China."
          imageSrc="/images/team.jpg"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col lg:flex-row gap-16">
            {/*LEFT: CONTACT DETAILS*/}
            <div className="w-full lg:w-1/3 space-y-10">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{contactData.office.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {contactData.office.address.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{contactData.contact.title}</h3>
                <a href={`mailto:${contactData.contact.email}`} className="block text-orange-600 hover:text-orange-700 font-medium transition-colors mb-2">
                  {contactData.contact.email}
                </a>
                <a href={`tel:${contactData.contact.phone.replace(/\s+/g, "")}`} className="block text-gray-600 hover:text-orange-700 font-medium transition-colors">
                  {contactData.contact.phone}
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{contactData.hours.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {contactData.hours.details.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>

            {/*RIGHT: CONTACT FORM*/}
            <div className="w-full lg:w-2/3">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
