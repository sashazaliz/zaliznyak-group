import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit, DM_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// ── Google Fonts (next/font — self-hosted, zero CLS) ──────────────
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// ── SEO Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://zaliznyakgroup.com'),

  title: {
    default: 'The Zaliznyak Group — AI Tools · Digital Agency · Automation | San Diego',
    template: '%s | The Zaliznyak Group',
  },

  description:
    'The Zaliznyak Group builds AI-powered financial tools, bespoke custom websites, and intelligent business automation for founders who demand precision. San Diego, CA. Zero templates. No compromise.',

  keywords: [
    'web design San Diego',
    'custom website development San Diego',
    'Next.js web development San Diego',
    'bespoke digital agency San Diego',
    'small business website San Diego',
    'covered call screener',
    'OptionsAnalytx',
    'options trading algorithm',
    'AI automation small business',
    'Facebook ads setup San Diego',
    'SEO San Diego small business',
    'The Zaliznyak Group',
  ],

  authors: [{ name: 'Alex Zaliznyak', url: 'https://zaliznyakgroup.com' }],

  creator: 'The Zaliznyak Group, LLC',
  publisher: 'The Zaliznyak Group, LLC',

  // ── Open Graph ─────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zaliznyakgroup.com',
    siteName: 'The Zaliznyak Group',
    title: 'The Zaliznyak Group — AI Tools · Digital Agency · Automation',
    description:
      'AI-powered financial tools, bespoke custom websites, and intelligent business automation. Built for founders who demand precision. San Diego, CA.',
    images: [
      {
        url: '/og-image.jpg',        // 1200×630 — place in /public
        width: 1200,
        height: 630,
        alt: 'The Zaliznyak Group — AI Tools, Digital Agency, Automation',
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'The Zaliznyak Group — AI Tools · Digital Agency · Automation',
    description:
      'AI-powered financial tools, bespoke custom websites, and intelligent automation. San Diego, CA.',
    images: ['/og-image.jpg'],
  },

  // ── Canonical & Robots ────────────────────────────────────────
  alternates: {
    canonical: 'https://zaliznyakgroup.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Verification (fill in once Search Console is set up) ───────
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  // },
}

// ── JSON-LD Structured Data ───────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Local Business
    {
      '@type': 'LocalBusiness',
      '@id': 'https://zaliznyakgroup.com/#business',
      name: 'The Zaliznyak Group, LLC',
      description:
        'AI-powered financial tools, bespoke digital agency, and intelligent business automation for founders who demand precision.',
      url: 'https://zaliznyakgroup.com',
      telephone: '+1-858-281-0071',
      email: 'info@zaliznyakgroup.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Diego',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 32.7157,
        longitude: -117.1611,
      },
      areaServed: [
        { '@type': 'City', name: 'San Diego' },
        { '@type': 'State', name: 'California' },
        { '@type': 'Country', name: 'United States' },
      ],
      priceRange: '$$$',
      openingHours: 'Mo-Fr 09:00-17:00',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Audit & Strategy Report', description: 'Comprehensive website and competitive analysis with actionable roadmap.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Website Design & Development', description: 'Zero-template Next.js website built to exact client specifications.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Foundation', description: 'Custom metadata, schema markup, and Search Console setup for Google page 1 rankings.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facebook & Instagram Ads Setup', description: 'Complete Meta Ads infrastructure with Pixel, custom audiences, and creative.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Business Automation', description: 'AI-powered workflow automation for lead response, proposal generation, and client onboarding.' } },
        ],
      },
    },
    // Software Application — OptionsAnalytx
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://optionsanalytx.com/#app',
      name: 'OptionsAnalytx',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: 'https://optionsanalytx.com',
      description:
        'AI-powered covered call screener that ranks every opportunity using a proprietary 9-factor Smart Score algorithm. Backtested across 96,208 real contracts, 488 symbols, 2018–2025.',
      creator: { '@id': 'https://zaliznyakgroup.com/#business' },
      offers: [
        { '@type': 'Offer', name: 'Free Tier', price: '0', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Pro', price: '39', priceCurrency: 'USD', billingIncrement: 'P1M' },
        { '@type': 'Offer', name: 'Pro Plus', price: '59', priceCurrency: 'USD', billingIncrement: 'P1M' },
      ],
    },
    // Person — Alex Zaliznyak
    {
      '@type': 'Person',
      '@id': 'https://zaliznyakgroup.com/#founder',
      name: 'Alex Zaliznyak',
      jobTitle: 'Founder',
      worksFor: { '@id': 'https://zaliznyakgroup.com/#business' },
      knowsAbout: [
        'Options Trading',
        'Covered Call Strategies',
        'Web Development',
        'Digital Marketing',
        'AI Automation',
        'Next.js',
        'SEO',
      ],
    },
    // Website
    {
      '@type': 'WebSite',
      '@id': 'https://zaliznyakgroup.com/#website',
      url: 'https://zaliznyakgroup.com',
      name: 'The Zaliznyak Group',
      publisher: { '@id': 'https://zaliznyakgroup.com/#business' },
    },
  ],
}

// ── Root Layout ───────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${dmMono.variable}`}
    >
      <head>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y67LRLSKMT"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y67LRLSKMT');
          `}
        </Script>
      </body>
    </html>
  )
}
