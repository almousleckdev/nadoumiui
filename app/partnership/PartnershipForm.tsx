"use client";

import { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

export function PartnershipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [partnershipType, setPartnershipType] = useState("");
  const [userTimezone, setUserTimezone] = useState("");

  useEffect(() => {
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call to send email
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Inquiry Sent!</h3>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Thank you for your interest in partnering with Nadoumi. Our business development team will review your
          inquiry and get back to you within 24-48 hours.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-orange-600 font-semibold hover:text-orange-700">
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Partnership Inquiry Form</h2>
      <p className="text-gray-500 mb-8">Fill out the form below and we&apos;ll be in touch shortly.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
            <input
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              placeholder="Jane"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
            <input
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email</label>
            <input
              type="email"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              placeholder="jane@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone / WhatsApp</label>
            <input
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Partnership Type</label>
          <div className="relative">
            <select
              required
              value={partnershipType}
              onChange={(e) => setPartnershipType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow appearance-none"
            >
              <option value="" disabled>
                Select an option...
              </option>
              <option value="agency">Student Recruitment Agency</option>
              <option value="university">University / Institution</option>
              <option value="influencer">Content Creator / Influencer</option>
              <option value="student">Student (Looking for admission)</option>
              <option value="other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {partnershipType === "student" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Degree Level</label>
              <select
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
              >
                <option value="">Select...</option>
                <option value="bachelor">Bachelor&apos;s</option>
                <option value="master">Master&apos;s</option>
                <option value="phd">Ph.D.</option>
                <option value="language">Language Program</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Intended Major</label>
              <input
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                placeholder="e.g. MBBS"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred City</label>
              <input
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                placeholder="e.g. Beijing"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company / Agency Name</label>
            <input
              required={partnershipType !== "student"}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              placeholder="Your Organization"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Meeting Date</label>
            <input
              type="date"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Meeting Time
              {userTimezone && <span className="text-orange-500 font-normal ml-2">({userTimezone})</span>}
            </label>
            <input
              type="time"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
            />
            <p className="text-xs text-gray-400 mt-2">
              Please select a time in your local timezone. We will handle the conversion to Beijing Time.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">How can we collaborate?</label>
          <textarea
            required
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow resize-y"
            placeholder="Tell us a bit about your organization and what you have in mind..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-orange-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-orange-600/20"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </>
  );
}
