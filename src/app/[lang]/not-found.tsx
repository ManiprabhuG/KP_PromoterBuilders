import React from 'react';
import Link from 'next/link';
import { Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-4 py-20">
      <div className="max-w-md">
        <h1 className="text-7xl font-extrabold text-[var(--primary)] mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/en" className="btn btn-primary">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <a href="tel:+918681851548" className="btn btn-outline">
            <Phone className="w-4 h-4" /> Contact Office
          </a>
        </div>
      </div>
    </div>
  );
}
