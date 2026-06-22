import type { Metadata } from 'next'
import { Newsreader, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// ── Google Fonts (next/font — self-hosted, zero CLS) ──────────────
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// ── SEO Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://zaliznyakgroup.com'),

  title: {
    default: 'Zaliznyak Group: Analytics, AI, and Decision Systems',
    template: '%s | Zaliznyak Group',
  },

  description:
    'An independent practice applying AI/ML, analytics, and decision systems to commercial and operational problems. Built on years leading commercial analytics in life sciences.',

  keywords: [
    'commercial analytics consulting',
    'AI agents and automation',
    'decision systems',
    'predictive modeling',
    'KPI frameworks',
    'patient journey analytics',
    'machine learning consulting',
    'go-to-market advisory',
    'data strategy',
    'life sciences analytics',
    'Alex Zaliznyak',
    'Zaliznyak Group',
  ],

  authors: [{ name: 'Alex Zaliznyak', url: 'https://zaliznyakgroup.com' }],

  creator: 'Zaliznyak Group, LLC',
  publisher: 'Zaliznyak Group, LLC',

  // ── Open Graph ─────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zaliznyakgroup.com',
    siteName: 'Zaliznyak Group',
    title: 'Zaliznyak Group: Analytics, AI, and Decision Systems',
    description:
      'An independent practice applying AI/ML, analytics, and decision systems to commercial and operational problems. San Diego, CA.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zaliznyak Group: Analytics, AI, and Decision Systems',
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Zaliznyak Group: Analytics, AI, and Decision Systems',
    description:
      'Analytics, AI, and decision systems that turn data into outcomes.',
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
}

// ── JSON-LD Structured Data ───────────────────────────────────────
// Note: OptionsAnalytx SoftwareApplication schema removed entirely.
// The product lives at optionsanalytx.com and its own schema belongs there.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // Professional Service (replaces LocalBusiness — fits an independent consulting practice better)
    {
      '@type': 'ProfessionalService',
      '@id': 'https://zaliznyakgroup.com/#business',
      name: 'Zaliznyak Group, LLC',
      description:
        'An independent practice applying AI/ML, analytics, and decision systems to commercial and operational problems. Built on years leading commercial analytics in life sciences.',
      url: 'https://zaliznyakgroup.com',
      email: 'info@zaliznyakgroup.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Diego',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      areaServed: { '@type': 'Country', name: 'United States' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial Analytics & Decision Systems',
              description:
                'KPI frameworks, customer and patient journey analytics, forecasting, segmentation, and predictive modeling. Go-to-market and operations advisory for early-stage companies.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Agents & Automation',
              description:
                'Custom AI agents and automated workflows that remove manual work and accelerate teams. Machine learning and large language models integrated into real business processes.',
            },
          },
        ],
      },
    },
    // Person — Alex Zaliznyak
    {
      '@type': 'Person',
      '@id': 'https://zaliznyakgroup.com/#founder',
      name: 'Alex Zaliznyak',
      jobTitle: 'Founder and Principal',
      worksFor: { '@id': 'https://zaliznyakgroup.com/#business' },
      sameAs: ['https://linkedin.com/in/alex-zaliznyak'],
      knowsAbout: [
        'Commercial Analytics',
        'KPI Frameworks',
        'Patient Journey Analytics',
        'Predictive Modeling',
        'Machine Learning',
        'AI Agents and Automation',
        'Go-to-Market Strategy',
        'Decision Support Systems',
        'Life Sciences Commercial Operations',
      ],
    },
    // Website
    {
      '@type': 'WebSite',
      '@id': 'https://zaliznyakgroup.com/#website',
      url: 'https://zaliznyakgroup.com',
      name: 'Zaliznyak Group',
      publisher: { '@id': 'https://zaliznyakgroup.com/#business' },
    },
  ],
}

// ── Root Layout ───────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
