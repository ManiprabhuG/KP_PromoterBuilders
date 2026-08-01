import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from 'lucide-react';
import type { Locale } from '@/types';

interface FooterProps {
  lang: Locale;
  dict: Record<string, string>;
}

export const Footer: React.FC<FooterProps> = ({ lang, dict }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <div className="footer-logo-badge">
                <Image
                  src="/images/logo-icon.png"
                  alt="Kopuram Promoter & Builders Logo"
                  width={48}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="footer-brand-text">
                <span className="footer-brand-name">{dict.brand_name}</span>
                <span className="footer-brand-sub">{dict.brand_sub}</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{dict.footer_tagline}</p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/kopuram_promoter_builders_llp/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn instagram"
                title="Follow Kopuram Builders on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918681851548"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn whatsapp"
                title="Chat with Kopuram Builders on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="tel:+918681851548" className="social-icon-btn" title="Call Kopuram Builders">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{dict.footer_quick_links}</h4>
            <ul className="footer-links">
              <li><Link href={`/${lang}`}>{dict.nav_home}</Link></li>
              <li><Link href={`/${lang}/about`}>{dict.nav_about}</Link></li>
              <li><Link href={`/${lang}/projects`}>{dict.nav_projects}</Link></li>
              <li><Link href={`/${lang}/testimonials`}>{dict.nav_testimonials}</Link></li>
              <li><Link href={`/${lang}/contact`}>{dict.nav_contact}</Link></li>
              <li><Link href={`/${lang}/privacy`}>{dict.nav_privacy}</Link></li>
              <li><Link href={`/${lang}/terms`}>{dict.nav_terms}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Featured Layouts</h4>
            <ul className="footer-links">
              <li><Link href={`/${lang}/projects`}>Kopuram Nagar Phase 2</Link></li>
              <li><Link href={`/${lang}/projects`}>Sangatamil Nagar Phase III</Link></li>
              <li><Link href={`/${lang}/projects`}>Kopuram Diamond City</Link></li>
              <li><Link href={`/${lang}/contact`}>Anna Nagar Office</Link></li>
              <li><Link href={`/${lang}/contact`}>Book Free Site Visit</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{dict.footer_contact_info}</h4>
            <ul className="footer-contact">
              <li>
                <MapPin className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                <span>Anna Nagar, Madurai, Tamil Nadu, India - 625020</span>
              </li>
              <li>
                <Phone className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                <a href="tel:+918681851548" className="hover:text-[#D4AF37]">
                  +91 86818 51548
                </a>
              </li>
              <li>
                <Mail className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                <span>info@kopurambuilders.com</span>
              </li>
              <li>
                <Clock className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                <span>Mon-Sat: 10:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center space-y-2">
          <div className="flex justify-center gap-4 text-xs text-slate-400 mb-2">
            <Link href="/en" className="hover:underline">English Version</Link>
            <span>•</span>
            <Link href="/ta" className="hover:underline">தமிழ் பதிப்பு</Link>
          </div>
          <p className="text-sm text-slate-400">{dict.footer_rights}</p>
          <p className="text-xs text-slate-500">{dict.footer_legal_notice}</p>
        </div>
      </div>
    </footer>
  );
};
