import React from 'react';
import type { Locale } from '@/types';
import { getDictionary } from '@/i18n/get-dictionary';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang === 'ta' ? 'ta' : 'en') as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white py-16 text-center">
        <div className="container">
          <span className="badge badge-gold mb-3">Legal & Governance</span>
          <h1 className="text-4xl font-extrabold text-white mb-2">{dict.nav_privacy}</h1>
          <p className="text-slate-200 text-base max-w-xl mx-auto">
            Kopuram Promoter & Builders LLP - Data Protection Policy
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="bg-[var(--card-bg)] p-8 md:p-12 rounded-xl border border-[var(--border-color)] shadow-sm space-y-6 text-slate-600 dark:text-slate-300">
            <h2 className="text-2xl font-bold text-[var(--primary)]">Privacy Policy Overview</h2>
            <p>
              At Kopuram Promoter & Builders LLP (&quot;Kopuram Builders&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we respect your privacy and are committed to protecting the personal information you share with us through our website.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-main)]">1. Information We Collect</h3>
            <p>
              When you submit an inquiry form, schedule a site visit, or contact us via phone/WhatsApp, we collect your name, contact phone number, email address, and layout project preferences.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-main)]">2. How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>To contact you regarding layout plot availability, DTCP & RERA approval details, and pricing.</li>
              <li>To arrange free AC cab site visits for you and your family.</li>
              <li>To send requested project brochures, site layout maps, and deed documentation guidance.</li>
              <li>We strictly DO NOT sell, rent, or lease your personal contact details to third-party telemarketers.</li>
            </ul>

            <h3 className="text-xl font-bold text-[var(--text-main)]">3. Data Security</h3>
            <p>
              We implement industry-standard security measures to safeguard your personal data from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-main)]">4. Contacting Us</h3>
            <p>
              If you have any questions regarding this Privacy Policy, please contact our office at:
              <br />
              <strong>Kopuram Promoter and Builders LLP</strong>
              <br />
              Anna Nagar, Madurai, Tamil Nadu - 625020
              <br />
              Phone: +91 86818 51548 | Email: info@kopurambuilders.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
