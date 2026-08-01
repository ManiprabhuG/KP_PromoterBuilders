'use client';

import React from 'react';
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider';
import { CTABanner } from '@/components/home/CTABanner';
import { useAppShell } from '@/context/AppShellContext';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function TestimonialsPage({ params }: PageProps) {
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
          <span className="badge badge-gold mb-3">Client Trust</span>
          <h1 className="text-4xl font-extrabold text-white mb-2">{dict.test_title}</h1>
          <p className="text-slate-200 text-lg max-w-xl mx-auto">{dict.test_desc}</p>
        </div>
      </section>

      <TestimonialsSlider dict={dict} />

      <CTABanner dict={dict} onBookVisit={() => onOpenBookingModal()} />
    </>
  );
}
