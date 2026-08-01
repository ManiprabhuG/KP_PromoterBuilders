'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export const FloatingButtons: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <a
        href="https://wa.me/918681851548?text=Hi%20Kopuram%20Builders,%20I%20want%20to%20inquire%20about%20plots%20in%20Madurai."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="back-to-top visible"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
