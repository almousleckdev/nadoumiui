import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { PageHero } from '@/components/ui/PageHero';

interface GuideLayoutProps {
  title: string;
  subtitle: string;
  image: string;
  children: React.ReactNode;
}

export default function GuideLayout({ title, subtitle, image, children }: GuideLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="bg-white flex-grow font-sans pb-20">
        <PageHero 
          title={title} 
          description={subtitle} 
          imageSrc={image} 
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">

          {/* ── CONTENT BODY ─────────────────────────────────────────── */}
          <div className="w-full border-t border-gray-100 pt-16">
            {children}
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
