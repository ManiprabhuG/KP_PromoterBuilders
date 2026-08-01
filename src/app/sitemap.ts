import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kp-promoter-builders.vercel.app';
  const locales = ['en', 'ta'];
  const routes = ['', '/about', '/projects', '/testimonials', '/contact', '/privacy', '/terms'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === '' || route === '/projects' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/projects' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ta: `${baseUrl}/ta${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
