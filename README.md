# Kopuram Promoter & Builders LLP - Next.js Enterprise Web Application

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-burgundy?style=for-the-badge)](#)

Official modern production-grade web application for **Kopuram Promoter and Builders LLP**, Madurai's leading DTCP & RERA approved residential plot promotion and land development firm with 20+ years of trusted excellence.

---

## 🌟 Key Features & Architecture

### 🚀 Modern Tech Stack
- **Frontend Framework**: [Next.js 15+](https://nextjs.org/) (App Router with SSG static page prerendering & zero layout shift).
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict type definitions for layout projects, form inputs, and translation dictionaries.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) integrated with custom brand CSS variables (Deep Burgundy `#7A0C2E` / `#1B2A4A`, Warm Gold `#D4AF37`).
- **Icons & Animations**: [Lucide React](https://lucide.dev/) vector icons and [Framer Motion](https://www.framer.com/motion/) hardware-accelerated micro-animations.
- **Form System**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation schemas for type-safe user submissions.
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes) providing persistent Light / Dark mode switching.

### 🌐 Internationalization (i18n)
- Native route-based localized navigation (`/en` and `/ta`) for **English** and **Tamil** languages.
- Automatic locale detection middleware (`src/middleware.ts`) with cookie (`kp_lang`) and `localStorage` state persistence.

### 🏡 Real Estate Showcase & Features
- **Featured Layouts**: Dynamic project filtering ("All Layouts", "Available Plots", "Ongoing Layouts") featuring Kopuram Nagar Phase 2, Kopuram Sangatamil Nagar Phase III, and Kopuram Diamond City.
- **Project Overview Modal**: Comprehensive amenity breakdown, government DTCP & RERA approval details, pricing, and location advantages.
- **Site Visit Booking System**: Modal dialog allowing customers to book free AC cab site visits with preferred date, time slot, and layout selection.
- **Lead Capture Popup**: Delayed interactive popup (20s trigger) with session storage state dismissal.
- **Interactive Location Map**: Dynamically imported OpenStreetMap (Leaflet) displaying Anna Nagar, Madurai office location.

### 🔍 Complete SEO & Accessibility Optimization
- Next.js Metadata API with localized titles, meta descriptions, OpenGraph cards, and canonical URL structure.
- **Schema.org Structured Data**: JSON-LD `RealEstateAgent` markup for rich search result snippet cards.
- **Dynamic Sitemap & Robots**: Prerendered `sitemap.xml` and `robots.txt` endpoints for search engine indexers.

---

## 📁 Project Directory Structure

```text
KP_PromoterBuilders/
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── layout.tsx         # Root localized layout with metadata & JSON-LD
│   │   │   ├── page.tsx           # Home Page
│   │   │   ├── about/page.tsx     # About Us Page
│   │   │   ├── projects/page.tsx  # Layout Projects Page
│   │   │   ├── testimonials/page.tsx # Client Reviews Page
│   │   │   ├── contact/page.tsx   # Contact Us Page & Form
│   │   │   ├── privacy/page.tsx   # Privacy Policy Page
│   │   │   ├── terms/page.tsx     # Terms & Conditions Page
│   │   │   └── not-found.tsx     # Custom 404 Page
│   │   ├── sitemap.ts             # Dynamic sitemap generator
│   │   ├── robots.ts              # Dynamic robots.txt generator
│   │   └── globals.css            # Tailwind v4 & Design System Tokens
│   ├── components/
│   │   ├── layout/                # TopBar, Navbar, Footer, MobileCallBar, FloatingButtons
│   │   ├── home/                  # HeroSection, StatsRibbon, FeaturesGrid, TestimonialsSlider, CTABanner
│   │   ├── projects/              # ProjectCard, ProjectsFilterGrid, ProjectDetailModal
│   │   ├── contact/               # ContactForm, OfficeMap
│   │   └── modals/                # BookingModal, LeadPopupModal, SuccessModal
│   ├── context/
│   │   └── AppShellContext.tsx    # Modal control hooks & context provider
│   ├── data/
│   │   └── projects.ts            # Layout projects dataset
│   ├── i18n/
│   │   ├── dictionaries/          # en.json & ta.json translation dictionaries
│   │   ├── config.ts              # Supported locales configuration
│   │   └── get-dictionary.ts      # Dictionary loader for server components
│   ├── lib/
│   │   └── validations.ts         # Zod schemas for forms
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   └── middleware.ts              # Locale routing middleware
├── public/
│   └── images/                    # High-res project images, logos, background graphics
├── css/
│   └── styles.css                 # Legacy CSS fallback design reference
├── next.config.ts                 # Next.js configuration & security headers
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.mjs             # PostCSS plugin configuration
├── tsconfig.json                  # TypeScript strict mode configuration
├── vercel.json                    # Vercel deployment settings
└── package.json                   # Project dependencies & scripts
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ManiprabhuG/KP_PromoterBuilders.git
   cd KP_PromoterBuilders
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🏗️ Building for Production

To test and compile the production bundle:

```bash
# Run Next.js production build and type checking
npm run build

# Start the production server locally
npm start
```

---

## 🚀 Deployment

The project is optimized for deployment on **Vercel**:

1. Connect the repository to [Vercel](https://vercel.com).
2. Vercel automatically detects Next.js framework settings.
3. Deploy!

---

## 📄 License & Legal Notice

© 2026 Kopuram Promoter and Builders LLP. All Rights Reserved.  
All layout developments are government DTCP and RERA approved. Complete legal documentation guaranteed.
