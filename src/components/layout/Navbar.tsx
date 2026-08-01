'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar } from 'lucide-react';
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
          <button
            type="button"
            className="btn btn-primary btn-sm nav-book-btn hidden sm:inline-flex"
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
