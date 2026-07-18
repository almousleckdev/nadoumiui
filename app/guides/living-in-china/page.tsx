import React from 'react';
import GuideLayout from '../components/GuideLayout';

import { livingExpenses as expenses } from '@/data/guides';

export default function LivingInChinaPage() {
  return (
    <GuideLayout 
      title="Living in China"
      subtitle="Experience a vibrant mix of ancient traditions and futuristic innovation. Discover what daily life, culture, and expenses look like for an international student."
      image="/images/hero-group.png"
    >
      <div className="space-y-16">
        
        {/* ── COST OF LIVING ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cost of Living</h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-4xl">
            Compared to Western countries, living in China is remarkably affordable. Your expenses will largely depend on the city tier and your personal lifestyle. The estimates below reflect a standard student budget.
          </p>
          
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm max-w-3xl">
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

        {/* ── CULTURE & INTEGRATION ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Culture & Integration</h2>
          <div className="prose prose-orange max-w-4xl text-gray-600">
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

        {/* ── DIGITAL LIFE ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Digital Ecosystem</h2>
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 max-w-4xl">
            <p className="text-gray-600 leading-relaxed mb-6">
              China operates in a highly advanced digital ecosystem. Cash is rarely used. Instead, everything from paying for groceries to booking train tickets is done via smartphone apps. Setting up your phone with these essential apps is the first step upon arrival.
            </p>
            <div className="flex flex-wrap gap-3">
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
    </GuideLayout>
  );
}
