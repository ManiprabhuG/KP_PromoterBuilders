'use client';

import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { OfficeMap } from '@/components/contact/OfficeMap';
import { CTABanner } from '@/components/home/CTABanner';
import { useAppShell } from '@/context/AppShellContext';
import type { Locale } from '@/types';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ContactPage({ params }: PageProps) {
  const { onOpenBookingModal, onShowSuccess } = useAppShell();
  const [lang, setLang] = React.useState<Locale>('en');
  const [dict, setDict] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    params.then(async (resolvedParams) => {
      const selectedLang = (resolvedParams.lang === 'ta' ? 'ta' : 'en') as Locale;
      setLang(selectedLang);
      const dictionary = selectedLang === 'ta'
        ? (await import('@/i18n/dictionaries/ta.json')).default
        : (await import('@/i18n/dictionaries/en.json')).default;
      setDict(dictionary);
    });
  }, [params]);

  if (!dict.brand_name) return null;

  return (
    <>
      <section className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white py-16 text-center">
        <div className="container">
          <span className="badge badge-gold mb-3">Office Location & Inquiry</span>
          <h1 className="text-4xl font-extrabold text-white mb-2">{dict.contact_title}</h1>
          <p className="text-slate-200 text-lg max-w-xl mx-auto">{dict.contact_subtitle}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[var(--primary)]">Office Information</h2>

              <div className="flex gap-4 mb-6 bg-[var(--card-bg)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm">
                <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Main Office Address</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Kopuram Promoter and Builders LLP
                    <br />
                    Anna Nagar, Madurai, Tamil Nadu, India - 625020
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mb-6 bg-[var(--card-bg)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm">
                <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Phone & WhatsApp</h4>
                  <p className="text-slate-500 text-sm">
                    <a href="tel:+918681851548" className="text-[var(--primary)] font-bold">
                      +91 86818 51548
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mb-6 bg-[var(--card-bg)] p-5 rounded-xl border border-[var(--border-color)] shadow-sm">
                <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Business Hours</h4>
                  <p className="text-slate-500 text-sm">
                    Monday – Saturday: 10:00 AM – 7:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <a href="tel:+918681851548" className="btn btn-primary flex-1">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a
                  href="https://wa.me/918681851548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary flex-1"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            <div>
              <ContactForm
                dict={dict}
                lang={lang}
                onSubmitSuccess={(t, m) => onShowSuccess(t, m)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="section-header mb-8">
            <span className="section-subtitle">Location Map</span>
            <h2 className="section-title">Visit Our Anna Nagar Office</h2>
          </div>

          <OfficeMap />
        </div>
      </section>

      <CTABanner dict={dict} onBookVisit={() => onOpenBookingModal()} />
    </>
  );
}
