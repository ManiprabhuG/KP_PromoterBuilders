import type { Metadata } from 'next';
import Script from 'next/script';
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
      : 'Kopuram Promoter & Builders | DTCP Approved Plots Madurai',
    description: isTa
      ? 'கோபுரம் புரமோட்டர் & பில்டர்ஸ் எல்.எல்.பி மதுரையில் 20+ ஆண்டுகள் அனுபவம் கொண்ட முன்னணி DTCP & RERA அங்கீகரிக்கப்பட்ட மனைப் பிரிவு நிறுவனம். அண்ணா நகர் & ரிங் ரோட்டில் மனைகள் வாங்க உடனே தொடர்புகொள்ளுங்கள்.'
      : 'Kopuram Promoter and Builders LLP is Madurai\'s premier DTCP & RERA approved land developer with 20+ years of trusted experience. Buy residential plots in Anna Nagar, Ring Road & Samanar Hills.',
    keywords: [
      'Kopuram Builders',
      'Kopuram Promoter',
      'Plots in Madurai',
      'DTCP Approved Plots Madurai',
      'RERA Approved Plots',
      'Land Promotion Madurai',
      'Plots for sale in Anna Nagar Madurai',
      'Ring Road plots Madurai',
    ],
    metadataBase: new URL('https://kp-promoter-builders.vercel.app'),
    alternates: {
      canonical: `https://kp-promoter-builders.vercel.app/${lang}`,
      languages: {
        en: 'https://kp-promoter-builders.vercel.app/en',
        ta: 'https://kp-promoter-builders.vercel.app/ta',
      },
    },
    icons: {
      icon: [
        { url: '/images/logo-icon.png', type: 'image/png' },
      ],
      shortcut: '/images/logo-icon.png',
      apple: '/images/logo-icon.png',
    },
    openGraph: {
      title: isTa
        ? 'கோபுரம் புரமோட்டர் & பில்டர்ஸ் | மதுரையில் அங்கீகரிக்கப்பட்ட மனைகள்'
        : 'Kopuram Promoter & Builders | DTCP Approved Plots Madurai',
      description: isTa
        ? 'கோபுரம் புரமோட்டர் & பில்டர்ஸ் எல்.எல்.பி மதுரையில் 20+ ஆண்டுகள் அனுபவம் கொண்ட முன்னணி DTCP & RERA அங்கீகரிக்கப்பட்ட மனைப் பிரிவு நிறுவனம்.'
        : 'Kopuram Promoter and Builders LLP is Madurai\'s premier DTCP & RERA approved land developer with 20+ years of trusted experience.',
      url: `https://kp-promoter-builders.vercel.app/${lang}`,
      siteName: 'Kopuram Promoter & Builders LLP',
      images: [
        {
          url: '/images/hero_bg.png',
          width: 1200,
          height: 630,
          alt: 'Kopuram Promoter & Builders Layouts',
        },
      ],
      locale: isTa ? 'ta_IN' : 'en_US',
      type: 'website',
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

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RealEstateAgent', 'LocalBusiness'],
        '@id': 'https://kp-promoter-builders.vercel.app/#organization',
        name: 'Kopuram Promoter and Builders LLP',
        legalName: 'Kopuram Promoter and Builders LLP',
        url: 'https://kp-promoter-builders.vercel.app',
        logo: 'https://kp-promoter-builders.vercel.app/images/logo-icon.png',
        image: 'https://kp-promoter-builders.vercel.app/images/bg-logo.png',
        telephone: '+91 86818 51548',
        email: 'info@kopurambuilders.com',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Anna Nagar',
          addressLocality: 'Madurai',
          addressRegion: 'Tamil Nadu',
          postalCode: '625020',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 9.9196,
          longitude: 78.1394,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Madurai, Tamil Nadu, India',
        },
        sameAs: [
          'https://www.instagram.com/kopuram_promoter_builders_llp/',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '55',
          bestRating: '5',
          worstRating: '1',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '19:00',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://kp-promoter-builders.vercel.app/#website',
        url: 'https://kp-promoter-builders.vercel.app',
        name: 'Kopuram Promoter & Builders LLP',
        publisher: {
          '@id': 'https://kp-promoter-builders.vercel.app/#organization',
        },
        inLanguage: ['en', 'ta'],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://kp-promoter-builders.vercel.app/${lang}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `https://kp-promoter-builders.vercel.app/${lang}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `https://kp-promoter-builders.vercel.app/${lang}/projects`,
          },
        ],
      },
    ],
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-KPBUILDERS';

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        {/* Google Analytics 4 (GA4) Tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
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
