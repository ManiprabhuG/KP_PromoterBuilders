'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { MessageCircle, ArrowUp, Sun, Moon, Languages } from 'lucide-react';
import type { Locale } from '@/types';

interface FloatingButtonsProps {
  lang: Locale;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ lang }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

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

  const handleLanguageSwitch = (targetLang: Locale) => {
    if (targetLang === lang) return;
    document.cookie = `kp_lang=${targetLang}; path=/; max-age=31536000`;
    localStorage.setItem('kp_lang', targetLang);

    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'ta') {
      segments[1] = targetLang;
    } else {
      segments.unshift(targetLang);
    }
    const newPath = segments.join('/') || `/${targetLang}`;
    router.push(newPath);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[990] flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating Language Switcher */}
      <div className="lang-switcher shadow-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-1 rounded-full flex items-center gap-1 backdrop-blur-md">
        <button
          type="button"
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageSwitch('en')}
          title="English"
        >
          EN
        </button>
        <button
          type="button"
          className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
          onClick={() => handleLanguageSwitch('ta')}
          title="தமிழ்"
        >
          தமிழ்
        </button>
      </div>

      {/* Floating Theme Toggle */}
      <button
        type="button"
        className="theme-toggle shadow-lg border border-[var(--border-color)] bg-[var(--card-bg)] w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title="Toggle Light / Dark Mode"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        )}
      </button>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/918681851548?text=Hi%20Kopuram%20Builders,%20I%20want%20to%20inquire%20about%20plots%20in%20Madurai."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-11 h-11 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
