'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Car, LayoutGrid } from 'lucide-react';
import type { Locale } from '@/types';

interface HeroSectionProps {
  lang: Locale;
  dict: Record<string, string>;
  onBookVisit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  dict,
  onBookVisit,
}) => {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hero-content"
        >
          <div className="hero-tag">
            <Award className="w-4 h-4 text-[#F4E086]" />
            <span>{dict.hero_tag}</span>
          </div>

          <h1 className="hero-title">
            {dict.hero_title}
            <span>{dict.hero_title_accent}</span>
          </h1>

          <p className="hero-subtitle">{dict.hero_subtitle}</p>

          <div className="hero-btns">
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onBookVisit}
            >
              <Car className="w-5 h-5" />
              <span>{dict.hero_btn_visit}</span>
            </button>
            <Link href={`/${lang}/projects`} className="btn btn-white btn-lg">
              <LayoutGrid className="w-5 h-5" />
              <span>{dict.hero_btn_projects}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
