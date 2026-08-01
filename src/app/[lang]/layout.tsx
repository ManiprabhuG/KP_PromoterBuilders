import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { AppShell } from '@/components/layout/AppShell';
import { getDictionary } from '@/i18n/get-dictionary';
import { i18nConfig } from '@/i18n/config';
import type { Locale } from '@/types';
import '../globals.css';

export async function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang === 'ta' ? 'ta' : 'en') as Locale;
  const isTa = lang === 'ta';

  return {
    title: isTa
      ? 'கோபுரம் புரமோட்டர் & பில்டர்ஸ் | மதுரையில் அங்கீகரிக்கப்பட்ட மனைகள்'
      : 'Kopuram Promoter & Builders | Approved Plots Madurai',
    description: isTa
      ? 'மதுரையில் 20+ ஆண்டுகள் அனுபவம் கொண்ட முன்னணி DTCP & RERA அங்கீகரிக்கப்பட்ட மனைப் பிரிவு நிறுவனம்.'
      : 'Kopuram Promoter and Builders LLP is Madurai\'s leading DTCP & RERA approved land promotion company with 20+ years experience.',
    keywords: [
      'Kopuram Builders',
      'Kopuram Promoter',
      'Plots in Madurai',
      'DTCP Approved Plots Madurai',
      'RERA Approved Plots',
      'Land Promotion Madurai',
    ],
    metadataBase: new URL('https://kp-builders.vercel.app'),
    alternates: {
      canonical: `https://kp-builders.vercel.app/${lang}`,
      languages: {
        en: 'https://kp-builders.vercel.app/en',
        ta: 'https://kp-builders.vercel.app/ta',
      },
    },
    openGraph: {
      title: 'Kopuram Promoter & Builders | Approved Plots Madurai',
      description:
        '20+ Years of Trusted Land Development in Madurai. DTCP & RERA approved plot layouts.',
      images: ['/images/hero_bg.png'],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang === 'ta' ? 'ta' : 'en') as Locale;
  const dict = await getDictionary(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Kopuram Promoter and Builders LLP',
    image: 'https://kp-builders.vercel.app/images/bg-logo.png',
    telephone: '+91 86818 51548',
    email: 'info@kopurambuilders.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Anna Nagar',
      addressRegion: 'Madurai, Tamil Nadu',
      postalCode: '625020',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '55',
    },
    openingHours: 'Mo-Sa 10:00-19:00',
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell lang={lang} dict={dict}>
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
