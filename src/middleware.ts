import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig } from '@/i18n/config';

export function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;

  // Ignore static assets, public folder images, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname has a supported locale prefix
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Check saved locale from cookie or header
  const savedLocale = request.cookies.get('kp_lang')?.value;
  const targetLocale = i18nConfig.locales.includes(savedLocale as any)
    ? savedLocale
    : i18nConfig.defaultLocale;

  // Clean path to prevent trailing slash redirect chaining
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');

  // Redirect directly to localized URL (1-step redirect)
  const newUrl = new URL(`/${targetLocale}${cleanPath}`, request.url);
  return NextResponse.redirect(newUrl, 301);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images).*)'],
};
