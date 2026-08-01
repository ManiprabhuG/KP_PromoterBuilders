'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsSliderProps {
  dict: Record<string, string>;
}

export const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({ dict }) => {
  const testimonials = [
    {
      stars: 5,
      text: `"Buying a plot in Kopuram Nagar Phase 2 was the best decision for our family. The legal title verification process was crystal clear, and the team helped us get bank loan approval within a week!"`,
      author: 'M. Sundaram',
      role: 'Plot Owner, Ring Road Layout',
      avatar: 'MS',
    },
    {
      stars: 5,
      text: `"Kopuram Builders provided end-to-end guidance right from our initial site visit to Patta transfer. Very honest management and no hidden charges at all."`,
      author: 'K. Ramanathan',
      role: 'Investor, Madurai',
      avatar: 'KR',
    },
    {
      stars: 5,
      text: `"Excellent layout infrastructure in Narasingam layout! Wide asphalt roads, streetlights, and green park spaces. Highly recommended real estate promoter in Madurai."`,
      author: 'Lakshmi Priya',
      role: 'Home Buyer, Madurai',
      avatar: 'LP',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">{dict.test_subtitle}</span>
          <h2 className="section-title">{dict.test_title}</h2>
          <p className="section-desc">{dict.test_desc}</p>
        </div>

        <div className="rating-summary-box">
          <div className="rating-badge-item">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#B38F22] font-bold text-lg">
              G
            </div>
            <div>
              <div className="rating-val">4.9 ★★★★★</div>
              <div className="rating-count">Google Rating (55+ Reviews)</div>
            </div>
          </div>
          <div className="rating-badge-item">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#B38F22] font-bold text-lg">
              J
            </div>
            <div>
              <div className="rating-val">4.7 ★★★★★</div>
              <div className="rating-count">Justdial Rating (42+ Reviews)</div>
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="testimonial-card"
              >
                <div className="testimonial-stars flex gap-1 mb-3">
                  {[...Array(test.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="testimonial-text">{test.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{test.avatar}</div>
                  <div className="author-info">
                    <h5>{test.author}</h5>
                    <p>{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
