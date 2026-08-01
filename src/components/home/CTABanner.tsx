'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface CTABannerProps {
  dict: Record<string, string>;
  onBookVisit: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ dict, onBookVisit }) => {
  return (
    <section className="cta-banner">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="cta-content"
        >
          <h2 className="cta-title">{dict.cta_title}</h2>
          <p className="cta-desc">{dict.cta_desc}</p>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={onBookVisit}
          >
            <Calendar className="w-5 h-5" />
            <span>{dict.cta_btn}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
