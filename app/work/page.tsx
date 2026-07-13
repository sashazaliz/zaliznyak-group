'use client'

import { useEffect, useState } from 'react'

/* ═══════════════════════════════════════════
   SCROLL REVEAL — matches homepage pattern
═══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ═══════════════════════════════════════════
   STICKY NAV BORDER ON SCROLL
═══════════════════════════════════════════ */
function useNavScroll() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrolled
}

/* ═══════════════════════════════════════════
   NINE CLIENT PROJECTS
═══════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1,
    name: 'Veldt Skincare',
    tagline: 'Editorial patience. Luxury DTC.',
    callout: 'Editorial pace · DTC engine',
    category: 'Luxury DTC',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85',
    url: 'https://sashazaliz.github.io/veldt-skincare/',
  },
  {
    id: 2,
    name: 'Moku Tea',
    tagline: 'Artisan tea, sold with restraint.',
    callout: 'Silence as brand asset',
    category: 'Artisan DTC',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=85',
    url: 'https://sashazaliz.github.io/moku-tea/',
  },
  {
    id: 3,
    name: 'Lume Aesthetics',
    tagline: 'Above the noise.',
    callout: 'Confidence without clinical',
    category: 'Medical · Wellness',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=85',
    url: 'https://sashazaliz.github.io/lume-aesthetics/',
  },
  {
    id: 4,
    name: 'Coastline HVAC',
    tagline: 'Editorial voice, local business.',
    callout: 'Trades work · Magazine discipline',
    category: 'Home Services',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85',
    url: 'https://sashazaliz.github.io/coastline-hvac/',
  },
  {
    id: 5,
    name: 'Cove Dental',
    tagline: 'Warmth without softness.',
    callout: 'Dentistry without fluorescent',
    category: 'Healthcare Practice',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=85',
    url: 'https://sashazaliz.github.io/cove-dental/',
  },
  {
    id: 6,
    name: 'Garner Landscaping',
    tagline: 'A design object, not a brochure.',
    callout: 'Object, not brochure',
    category: 'Landscape Design',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=900&q=85',
    url: 'https://sashazaliz.github.io/garner-landscaping/',
  },
  {
    id: 7,
    name: 'Hartwell Advisory',
    tagline: 'Independent, minus the ceremony.',
    callout: 'Independent · Not indie',
    category: 'Financial Advisory',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=900&q=85',
    url: 'https://sashazaliz.github.io/hartwell-advisory/',
  },
  {
    id: 8,
    name: 'Ossian Restaurant',
    tagline: 'A room that speaks first.',
    callout: 'Room first, menu second',
    category: 'Hospitality · Fine Dining',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=85',
    url: 'https://sashazaliz.github.io/ossian-restaurant/',
  },
  {
    id: 9,
    name: 'Vance & Co',
    tagline: 'Reads like a monograph.',
    callout: 'Monograph, not marketing',
    category: 'Professional Services',
    role: 'Design + Build',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=85',
    url: 'https://sashazaliz.github.io/vance-and-co/',
  },
]

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function WorkPage() {
  useReveal()
  const scrolled = useNavScroll()
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ═══ SITE NAV ═══ */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w nav-inner">
          <a href="/" className="nav-mark">
            <span className="nav-mark-text">
  Zaliznyak Group
</span>
          </a>
          <div className="nav-links">
            <a href="/#about" className="nav-link">About</a>
            <a href="/#services" className="nav-link">Services</a>
            <a
              href="/work"
              className="nav-link is-active"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
            >
              Work
            </a>
            <a href="/#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* ═══ PAGE HERO ═══ */}
      <section className="work-hero">
        <div className="max-w">
          <div className="work-hero-eyebrow">Selected Work · Zaliznyak Group</div>
          <h1 className="work-hero-h1">
            What I have shipped, and what I ship for <em>others.</em>
          </h1>
          <p className="work-hero-thesis">
            This page shows the three parts of the practice: the product I built and operate, the advisory I do with founders, and a selection of client work that shows how I approach design and build.
          </p>
        </div>
      </section>

      {/* ═══ EDITORIAL VOICE LINE ═══ */}
      <section className="work-voice">
        <div className="max-w">
          <p className="work-voice-line">
            Web design lives at the intersection of art and science. The science can always be replicated. The art cannot. This is where I spend my time.
          </p>
        </div>
      </section>

      {/* ═══ SECTION 1: PRODUCTS & ADVISORY ═══ */}
      <section className="section">
        <div className="max-w">
          <div className="section-head reveal">
            <div className="eyebrow">Products &amp; Advisory</div>
            <h2 className="h2">What I build and advise on.</h2>
          </div>

          {/* Featured — OptionsAnalytx */}
          <div className="work-block work-block--featured reveal">
            <div>
              <div className="work-eyebrow">Flagship Build · v2.0 July 2026</div>
              <h3 className="work-name">OptionsAnalytx</h3>
              <p className="work-body">
                OptionsAnalytx is a covered call research SaaS I founded and
                operate solo. It surfaces a weekly Top 10 list of covered call
                opportunities scored by a gradient boosting machine learning
                model trained on roughly 1.38 million labeled historical
                outcomes. Each contract gets a letter grade, A+ through F, plus
                a per contract explanation, so subscribers can interrogate the
                reasoning instead of trusting a black box. It is end of day
                research, not a live trading platform, and it ranks setups
                rather than recommending trades.
              </p>
              <p className="work-body">
                The product reflects 25 years of personal covered call trading
                practice, and I built the model, the data pipeline, and the
                product end to end.
              </p>
              <a
                href="https://optionsanalytx.com"
                className="work-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit optionsanalytx.com
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <div className="work-data">
              <div className="work-data-row">
                <div className="work-data-label">Category</div>
                <div className="work-data-value">
                  Covered call research SaaS. End of day research, not a live
                  trading platform.
                </div>
              </div>
              <div className="work-data-row">
                <div className="work-data-label">Method</div>
                <div className="work-data-value">
                  Gradient boosting machine learning model. Smart Score
                  composite. Letter grades A+ through F with per contract
                  explanations.
                </div>
              </div>
              <div className="work-data-row">
                <div className="work-data-label">Dataset</div>
                <div className="work-data-value">
                  Research grade backtest on roughly 1.38 million labeled
                  historical outcomes.
                </div>
              </div>
              <div className="work-data-row">
                <div className="work-data-label">Output</div>
                <div className="work-data-value">
                  Weekly Top 10 list. Holding period returns tracked in the
                  open.
                </div>
              </div>
              <div className="work-data-row">
                <div className="work-data-label">Build</div>
                <div className="work-data-value">
                  Solo founder. Built the model, data pipeline, and product
                  end to end.
                </div>
              </div>
              <div className="work-data-row">
                <div className="work-data-label">Thesis</div>
                <div className="work-data-value">
                  Boring is better. Consistent singles beat occasional home
                  runs.
                </div>
              </div>
              <div className="work-data-row">
                <div className="work-data-label">Stack</div>
                <div className="work-data-value">
                  Next.js, TypeScript, Tailwind on Vercel. Python for the
                  gradient boosting model. Stripe for billing, Kit for email.
                  Thetadata for institutional options data.
                </div>
              </div>
            </div>
          </div>

          {/* Advisory */}
          <div className="work-block reveal">
            <div>
              <div className="work-eyebrow">Advisory</div>
              <h3 className="work-name">
                Go to market and operations for early stage companies.
              </h3>
              <p className="work-body">
                Go to market and operations advisory for early stage companies,
                including an early stage women&apos;s health startup, plus data
                driven decision support for local businesses. Engagements are
                kept small and personal, with direct founder access.
              </p>
            </div>

            <div className="work-data">
              <div className="work-data-row">
                <div className="work-data-label">Engagement</div>
                <div className="work-data-value">
                  Project based or short retainers. Direct work with founders
                  and operators.
                </div>
              </div>
              <div className="work-data-row">
                <div className="work-data-label">Focus</div>
                <div className="work-data-value">
                  Go to market strategy, operations design, and the data
                  infrastructure that supports both.
                </div>
              </div>
              <div className="work-data-row">
                <div className="work-data-label">Stage</div>
                <div className="work-data-value">
                  Pre seed through early commercial. Where the right system
                  early compounds into real leverage later.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: SELECTED CLIENT WORK ═══ */}
      <section className="section section--alt">
        <div className="max-w">
          <div className="section-head reveal">
            <div className="eyebrow">Selected Client Work</div>
            <h2 className="h2">Nine projects. Same standard, different registers.</h2>
          </div>

          <div className="work-grid reveal">
            {PROJECTS.map((p) => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="project-card">
                <div className="project-card-imgwrap">
                  <img
                    className="project-card-img"
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                  />
                  <div className="project-callout">{p.callout}</div>
                </div>
                <div className="project-meta-top">
                  <span className="project-index">{String(p.id).padStart(2, '0')}</span>
                  <span className="project-year">{p.year}</span>
                </div>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-tagline">{p.tagline}</p>
                <div className="project-tag-row">
                  <span>{p.category}</span>
                  <span>·</span>
                  <span>{p.role}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLOSING CTA ═══ */}
      <section className="work-closing">
        <div className="max-w">
          <h2 className="work-closing-h2">
            Ready to build something worth <em>reading about?</em>
          </h2>
          <p className="work-closing-body">
            If one of these projects looks like the register you are trying to reach, or you do not see your industry here, I want to hear about it. Discovery conversations are free and I read every message personally.
          </p>
          <a
            href="mailto:alex@zaliznyakgroup.com?subject=New%20Project%20Inquiry"
            className="btn-primary"
          >
            Get in touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      {/* ═══ BACK TO TOP ═══ */}
      <button
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  )
}
