"use client";

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

import { partnersData } from '@/data/partners';
import { PageHero } from '@/components/ui/PageHero';

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white flex-grow font-sans pb-20">
        <PageHero 
          title="Our Partners" 
          description="We collaborate with top universities and leading organizations to provide the best opportunities for our students." 
          imageSrc="/images/team.jpg" 
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partnersData.map((partner) => (
              <div key={partner.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-center aspect-square">
                <div className="relative w-full h-full">
                  <Image 
                    src={partner.image} 
                    alt={`Partner ${partner.id}`} 
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
