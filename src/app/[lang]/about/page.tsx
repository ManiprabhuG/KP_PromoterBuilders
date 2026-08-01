'use client';

import React from 'react';
import Image from 'next/image';
import { Target, Eye } from 'lucide-react';
import { CTABanner } from '@/components/home/CTABanner';
import { useAppShell } from '@/context/AppShellContext';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function AboutPage({ params }: PageProps) {
  const { onOpenBookingModal } = useAppShell();
  const [dict, setDict] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    params.then(async (resolvedParams) => {
      const selectedLang = (resolvedParams.lang === 'ta' ? 'ta' : 'en') as Locale;
      const dictionary = selectedLang === 'ta'
        ? (await import('@/i18n/dictionaries/ta.json')).default
        : (await import('@/i18n/dictionaries/en.json')).default;
      setDict(dictionary);
    });
  }, [params]);

  if (!dict.brand_name) return null;

  return (
    <>
      <section className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white py-16 text-center">
        <div className="container">
          <span className="badge badge-gold mb-3">Company Profile</span>
          <h1 className="text-4xl font-extrabold text-white mb-2">{dict.nav_about}</h1>
          <p className="text-slate-200 text-lg max-w-xl mx-auto">
            20+ Years of Trusted Land Development & Approved Plot Promotion in Madurai
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-title">{dict.about_story_title}</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {dict.about_story_desc}
              </p>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                We specialize in developing government DTCP and RERA approved residential layouts with superior infrastructure including blacktop roads, underground drainage, solar streetlights, and green park reserves.
              </p>

              <div className="flex gap-6 flex-wrap">
                <div className="border-l-4 border-[var(--secondary)] pl-4">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">50+ Layouts</h4>
                  <p className="text-xs text-slate-500">Successfully Handed Over</p>
                </div>
                <div className="border-l-4 border-[var(--secondary)] pl-4">
                  <h4 className="text-2xl font-bold text-[var(--primary)]">3000+ Customers</h4>
                  <p className="text-xs text-slate-500">Happy Land Owners</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-xl h-[340px] relative border border-[var(--border-color)]">
              <Image
                src="/images/project_diamond_city.png"
                alt="Kopuram Layout Project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--card-bg)] border-y border-[var(--border-color)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="feature-card">
              <div className="feature-icon">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="feature-title">{dict.mission_title}</h3>
              <p className="feature-desc">{dict.mission_desc}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="feature-title">{dict.vision_title}</h3>
              <p className="feature-desc">{dict.vision_desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Milestones</span>
            <h2 className="section-title">20 Years of Growth & Trust</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-6 bg-[var(--card-bg)] p-6 rounded-xl border-l-4 border-[var(--primary)] shadow-sm border border-[var(--border-color)]">
              <div className="text-2xl font-black text-[#B38F22] min-w-[70px]">2004</div>
              <div>
                <h4 className="font-bold text-lg">Company Foundation</h4>
                <p className="text-slate-500 text-sm mt-1">
                  Started land promotion operations in Madurai with a strong commitment to transparent land transactions.
                </p>
              </div>
            </div>

            <div className="flex gap-6 bg-[var(--card-bg)] p-6 rounded-xl border-l-4 border-[var(--primary)] shadow-sm border border-[var(--border-color)]">
              <div className="text-2xl font-black text-[#B38F22] min-w-[70px]">2012</div>
              <div>
                <h4 className="font-bold text-lg">25+ Layout Milestones</h4>
                <p className="text-slate-500 text-sm mt-1">
                  Expanded land development across Ring Road, Samanar Hills, and Panaikulam residential corridors.
                </p>
              </div>
            </div>

            <div className="flex gap-6 bg-[var(--card-bg)] p-6 rounded-xl border-l-4 border-[var(--primary)] shadow-sm border border-[var(--border-color)]">
              <div className="text-2xl font-black text-[#B38F22] min-w-[70px]">2024+</div>
              <div>
                <h4 className="font-bold text-lg">DTCP & RERA Standard Benchmark</h4>
                <p className="text-slate-500 text-sm mt-1">
                  Registered all ongoing and new layouts under RERA standards with 4.9 Google rating excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner dict={dict} onBookVisit={() => onOpenBookingModal()} />
    </>
  );
}
