import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/features/home/components/Hero";
import FeaturedSection from "@/features/home/components/FeaturedSection";
import WhyChooseUs from "@/features/home/components/WhyChooseUs";
import JourneySection from "@/features/home/components/JourneySection";
import TestimonialSection from "@/features/home/components/TestimonialSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        <Hero />
        <FeaturedSection />
        <WhyChooseUs />
        <JourneySection />
        <TestimonialSection />
      </main>
      <Footer />
    </>
  );
}
