import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Tell us about your project. Fill out our client intake brief and we\'ll get back to you within one business day.',
  alternates: { canonical: 'https://zaliznyakgroup.com/start' },
  robots: { index: false, follow: false },
}

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}