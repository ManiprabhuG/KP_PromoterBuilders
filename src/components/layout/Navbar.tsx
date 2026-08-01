'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Calendar } from 'lucide-react';
import type { Locale } from '@/types';

interface NavbarProps {
  lang: Locale;
  dict: Record<string, string>;
  onOpenBookingModal: (projectName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  dict,
  onOpenBookingModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleLanguageSwitch = (targetLang: Locale) => {
    if (targetLang === lang) return;
    // Store in cookie and localStorage
    document.cookie = `kp_lang=${targetLang}; path=/; max-age=31536000`;
    localStorage.setItem('kp_lang', targetLang);

    // Replace locale in current path
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'ta') {
      segments[1] = targetLang;
    } else {
      segments.unshift(targetLang);
    }
    const newPath = segments.join('/') || `/${targetLang}`;
    router.push(newPath);
  };

  const navLinks = [
    { href: `/${lang}`, label: dict.nav_home, key: 'home' },
    { href: `/${lang}/about`, label: dict.nav_about, key: 'about' },
    { href: `/${lang}/projects`, label: dict.nav_projects, key: 'projects' },
    { href: `/${lang}/testimonials`, label: dict.nav_testimonials, key: 'testimonials' },
    { href: `/${lang}/contact`, label: dict.nav_contact, key: 'contact' },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}` && (pathname === `/${lang}` || pathname === `/${lang}/`)) {
      return true;
    }
    return pathname.startsWith(href) && href !== `/${lang}`;
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link href={`/${lang}`} className="brand-logo">
          <Image
            src="/images/logo-icon.png"
            alt="Kopuram Promoter & Builders LLP Logo"
            width={48}
            height={48}
            priority
            className="h-11 w-auto object-contain"
          />
          <div className="brand-text">
            <span className="brand-name">{dict.brand_name}</span>
            <span className="brand-sub">{dict.brand_sub}</span>
          </div>
        </Link>

        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="lang-switcher" title="Switch Language">
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageSwitch('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
              onClick={() => handleLanguageSwitch('ta')}
            >
              தமிழ்
            </button>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            )}
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm hidden sm:inline-flex"
            onClick={() => onOpenBookingModal()}
          >
            <Calendar className="w-4 h-4" />
            <span>{dict.nav_book_visit}</span>
          </button>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
