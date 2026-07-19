import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/features/home/components/Hero";
import FeaturedSection from "@/features/home/components/FeaturedSection";
import HotProgramsSection from "@/features/home/components/HotProgramsSection";
import RecommendedSection from "@/features/home/components/RecommendedSection";
import WhyChooseUs from "@/features/home/components/WhyChooseUs";
import PartnerUniversitiesSection from "@/features/home/components/PartnerUniversitiesSection";
import JourneySection from "@/features/home/components/JourneySection";
import TestimonialSection from "@/features/home/components/TestimonialSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedSection />
        <HotProgramsSection />
        <RecommendedSection />
        <PartnerUniversitiesSection />
        <WhyChooseUs />
        <JourneySection />
        <TestimonialSection />
      </main>
      <Footer />
    </>
  );
}
