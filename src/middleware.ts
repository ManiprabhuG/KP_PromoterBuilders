import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

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

  // Redirect to localized URL
  const newUrl = new URL(`/${targetLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images).*)'],
};
