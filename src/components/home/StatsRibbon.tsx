'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatsRibbonProps {
  dict: Record<string, string>;
}

export const StatsRibbon: React.FC<StatsRibbonProps> = ({ dict }) => {
  const stats = [
    { number: dict.stat_exp, label: dict.stat_exp_lbl },
    { number: dict.stat_layouts, label: dict.stat_layouts_lbl },
    { number: dict.stat_rating, label: dict.stat_rating_lbl },
    { number: dict.stat_satisfaction, label: dict.stat_satisfaction_lbl },
  ];

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="stats-ribbon"
      >
        <div className="stats-grid">
          {stats.map((st, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">{st.number}</div>
              <div className="stat-label">{st.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
