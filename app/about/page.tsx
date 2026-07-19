import React from 'react';
import Image from 'next/image';
import PageShell from '@/components/layout/PageShell';

import { aboutData } from '@/data/about';

export default function AboutPage() {
  return (
    <PageShell
      title="About Nadoumi"
      description="Bridging Dreams & Opportunities since 2014."
    >
      {/*HISTORY & MISSION*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">{aboutData.history.title}</h2>
          <p className="text-gray-600 leading-relaxed">{aboutData.history.content}</p>
        </div>
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">{aboutData.mission.title}</h2>
          <p className="text-gray-600 leading-relaxed">{aboutData.mission.content}</p>
        </div>
      </div>

      {/*TEAM SECTION*/}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-10 text-center">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutData.team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col items-center text-center p-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 bg-gray-100 border-4 border-white shadow-sm">
                <Image
                  src={member.image.replace('/src/assets/images', '/images')}
                  alt={member.name}
                  fill
                  sizes="128px"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
                {member.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
