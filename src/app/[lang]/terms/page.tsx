import React from 'react';
import type { Locale } from '@/types';
import { getDictionary } from '@/i18n/get-dictionary';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function TermsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang === 'ta' ? 'ta' : 'en') as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white py-16 text-center">
        <div className="container">
          <span className="badge badge-gold mb-3">Legal & Governance</span>
          <h1 className="text-4xl font-extrabold text-white mb-2">{dict.nav_terms}</h1>
          <p className="text-slate-200 text-base max-w-xl mx-auto">
            Terms of Service & Plot Promotion Guidelines
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="bg-[var(--card-bg)] p-8 md:p-12 rounded-xl border border-[var(--border-color)] shadow-sm space-y-6 text-slate-600 dark:text-slate-300">
            <h2 className="text-2xl font-bold text-[var(--primary)]">Terms & Conditions</h2>
            <p>
              Welcome to Kopuram Promoter & Builders LLP. By accessing or browsing our website and layout project listings, you agree to comply with and be bound by the following terms.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-main)]">1. Government Approvals</h3>
            <p>
              All plot layout developments promoted by Kopuram Promoter & Builders LLP strictly comply with government Directorate of Town and Country Planning (DTCP) and Real Estate Regulatory Authority (RERA) standards. Specific RERA and DTCP approval numbers are published for each project layout.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-main)]">2. Plot Availability & Pricing</h3>
            <p>
              Plot availability, dimensions, and per-sq.ft rates listed on this website are subject to real-time verification and developer confirmation at the time of site booking.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-main)]">3. Free Site Visit Services</h3>
            <p>
              Free pickup and drop cab facilities for family site visits are provided as a complimentary customer service subject to advance scheduling and location availability across Madurai district.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-main)]">4. Legal Title Guarantee</h3>
            <p>
              We guarantee 100% clear parent deeds, encumbrance certificate (EC) clearance, and assistance for prompt Patta mutation upon full registration.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
