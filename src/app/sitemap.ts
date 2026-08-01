import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kp-builders.vercel.app';
  const locales = ['en', 'ta'];
  const routes = ['', '/about', '/projects', '/testimonials', '/contact', '/privacy', '/terms'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/projects' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
