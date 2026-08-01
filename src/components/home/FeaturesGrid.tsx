'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { History, Award, CircleDollarSign, ShieldCheck, Landmark, FileText } from 'lucide-react';

interface FeaturesGridProps {
  dict: Record<string, string>;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ dict }) => {
  const features = [
    {
      icon: <History className="w-7 h-7" />,
      title: dict.feat_1_title,
      desc: dict.feat_1_desc,
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: dict.feat_2_title,
      desc: dict.feat_2_desc,
    },
    {
      icon: <CircleDollarSign className="w-7 h-7" />,
      title: dict.feat_3_title,
      desc: dict.feat_3_desc,
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: dict.feat_4_title,
      desc: dict.feat_4_desc,
    },
    {
      icon: <Landmark className="w-7 h-7" />,
      title: dict.feat_5_title,
      desc: dict.feat_5_desc,
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: dict.feat_6_title,
      desc: dict.feat_6_desc,
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">{dict.why_subtitle}</span>
          <h2 className="section-title">{dict.why_title}</h2>
          <p className="section-desc">{dict.why_desc}</p>
        </div>

        <div className="features-grid">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="feature-card"
            >
              <div className="feature-icon">{feat.icon}</div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
