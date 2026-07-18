"use client";

import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Check } from "lucide-react";
import { contactData } from '@/data/contact';
import { PageHero } from '@/components/ui/PageHero';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

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
                      {line}<br/>
                    </React.Fragment>
                  ))}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{contactData.contact.title}</h3>
                <a href={`mailto:${contactData.contact.email}`} className="block text-orange-600 hover:text-orange-700 font-medium transition-colors mb-2">
                  {contactData.contact.email}
                </a>
                <a href={`tel:${contactData.contact.phone.replace(/\s+/g, '')}`} className="block text-gray-600 hover:text-orange-700 font-medium transition-colors">
                  {contactData.contact.phone}
                </a>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">{contactData.hours.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {contactData.hours.details.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}<br/>
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>

            {/*RIGHT: CONTACT FORM*/}
            <div className="w-full lg:w-2/3">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent</h3>
                    <p className="text-gray-600">We've received your inquiry and will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input 
                          required 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                          placeholder="John" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input 
                          required 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                          placeholder="Doe" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
                        placeholder="john@example.com" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea 
                        required 
                        rows={5}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow resize-y"
                        placeholder="How can we help you?" 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
