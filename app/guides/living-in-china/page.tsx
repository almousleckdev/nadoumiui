import React from 'react';
import PageShell from '@/components/layout/PageShell';
import { Train, Smartphone, Bike, QrCode, PartyPopper, Moon, Flag, Sailboat } from 'lucide-react';

import { livingExpenses as expenses } from '@/data/guides';

const transportOptions = [
  { icon: Train, label: 'Metro & High-Speed Rail' },
  { icon: Smartphone, label: 'Didi (Ride-Hailing)' },
  { icon: Bike, label: 'Shared Bikes (Meituan/Hello)' },
  { icon: QrCode, label: 'QR-Code Payment on Transit' },
];

const festivals = [
  {
    icon: PartyPopper,
    name: 'Spring Festival',
    timing: 'Late Jan – Feb',
    description:
      "China's biggest holiday. Most campuses close for 2–4 weeks and the whole country travels home — book early or explore while it's quiet.",
  },
  {
    icon: Moon,
    name: 'Mid-Autumn Festival',
    timing: 'September / October',
    description: 'A family reunion holiday centered on mooncakes and moon-viewing — many campuses host their own celebrations.',
  },
  {
    icon: Flag,
    name: 'National Day (Golden Week)',
    timing: 'Oct 1 – Oct 7',
    description: 'A week-long national holiday — one of the best windows for students to travel domestically.',
  },
  {
    icon: Sailboat,
    name: 'Dragon Boat Festival',
    timing: 'May / June',
    description: 'Marked by dragon boat races and sticky rice dumplings (zongzi) — a fun, low-key campus tradition.',
  },
];

export default function LivingInChinaPage() {
  return (
    <PageShell
      title="Living in China"
      description="Experience a vibrant mix of ancient traditions and futuristic innovation. Discover what daily life, culture, and expenses look like for an international student."
    >
      <div className="max-w-4xl mx-auto space-y-16">

        {/* ── COST OF LIVING ─────────────────────────────────────────── */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost of Living</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Compared to Western countries, living in China is remarkably affordable. Your expenses will largely depend on the city tier and your personal lifestyle. The estimates below reflect a standard student budget.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm text-left">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Expense Type
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Estimated Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map((exp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {exp.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                      {exp.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── GETTING AROUND: TRANSPORTATION ─────────────────────────────────────────── */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Around: Transportation</h2>
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 text-left">
            <p className="text-gray-600 leading-relaxed mb-6">
              Chinese cities have some of the world&apos;s most extensive metro networks, and the national
              high-speed rail grid connects most major cities in just a few hours — a train from Shanghai to
              Beijing takes around 4.5 hours. For daily trips, shared bikes and ride-hailing apps like Didi
              cover the rest. Almost all public transit is paid by scanning a QR code with Alipay or WeChat,
              so setting up mobile payments in your first week will make getting around effortless.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {transportOptions.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm"
                >
                  <Icon className="w-4 h-4 text-orange-600" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CULTURE & INTEGRATION ─────────────────────────────────────────── */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Culture & Integration</h2>
          <div className="prose prose-orange text-gray-600 mx-auto text-left">
            <p className="leading-relaxed">
              Chinese society places a strong emphasis on community, respect, and hospitality. While the language barrier might seem daunting initially, locals are incredibly welcoming and appreciative of foreigners who attempt to learn their language and customs.
            </p>
            <ul className="mt-6 space-y-3 list-disc pl-5">
              <li><strong>Food:</strong> Try local street food and campus canteens to fully immerse yourself and save money.</li>
              <li><strong>Language:</strong> Learn basic Mandarin. Even a small effort goes a long way in daily interactions.</li>
              <li><strong>Respect:</strong> Always show respect to teachers and elders, a core tenet of Chinese culture.</li>
            </ul>
          </div>
        </div>

        {/* ── FESTIVALS & CULTURE ─────────────────────────────────────────── */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Festivals & Culture</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            China&apos;s calendar is shaped by traditional festivals — several of them mean campus closures or
            a rare chance to travel, so it&apos;s worth planning your semester around them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {festivals.map(({ icon: Icon, name, timing, description }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{name}</h3>
                    <span className="text-xs text-gray-400">{timing}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIGITAL LIFE ─────────────────────────────────────────── */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Digital Ecosystem</h2>
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 text-left">
            <p className="text-gray-600 leading-relaxed mb-6">
              China operates in a highly advanced digital ecosystem. Cash is rarely used. Instead, everything from paying for groceries to booking train tickets is done via smartphone apps. Setting up your phone with these essential apps is the first step upon arrival.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
                WeChat (Social & Payment)
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
                Alipay (Payment)
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
                Taobao (Shopping)
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
                Meituan (Food Delivery)
              </span>
            </div>
          </div>
        </div>

      </div>
    </PageShell>
  );
}
