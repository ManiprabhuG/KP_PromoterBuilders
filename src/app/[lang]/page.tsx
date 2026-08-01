'use client';

import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsRibbon } from '@/components/home/StatsRibbon';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { ProjectsFilterGrid } from '@/components/projects/ProjectsFilterGrid';
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider';
import { CTABanner } from '@/components/home/CTABanner';
import { useAppShell } from '@/context/AppShellContext';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function HomePage({ params }: PageProps) {
  const { onOpenBookingModal, onOpenDetailModal } = useAppShell();
  const [lang, setLang] = React.useState<Locale>('en');
  const [dict, setDict] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    params.then(async (resolvedParams) => {
      const selectedLang = (resolvedParams.lang === 'ta' ? 'ta' : 'en') as Locale;
      setLang(selectedLang);
      const dictionary = selectedLang === 'ta'
        ? (await import('@/i18n/dictionaries/ta.json')).default
        : (await import('@/i18n/dictionaries/en.json')).default;
      setDict(dictionary);
    });
  }, [params]);

  if (!dict.brand_name) return null;

  return (
    <>
      <HeroSection
        lang={lang}
        dict={dict}
        onBookVisit={() => onOpenBookingModal()}
      />

      <StatsRibbon dict={dict} />

      <FeaturesGrid dict={dict} />

      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{dict.proj_subtitle}</span>
            <h2 className="section-title">{dict.proj_title}</h2>
            <p className="section-desc">{dict.proj_desc}</p>
          </div>

          <ProjectsFilterGrid
            lang={lang}
            dict={dict}
            onViewDetails={(proj) => onOpenDetailModal(proj)}
            onBookVisit={(name) => onOpenBookingModal(name)}
          />
        </div>
      </section>

      <TestimonialsSlider dict={dict} />

      <CTABanner
        dict={dict}
        onBookVisit={() => onOpenBookingModal()}
      />
    </>
  );
}
