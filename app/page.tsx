'use client'

import { useEffect, useState } from 'react'

/* ═══════════════════════════════════════════
   SCROLL REVEAL — single utility hook
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
   PAGE
═══════════════════════════════════════════ */
export default function Page() {
  useReveal()
  const scrolled = useNavScroll()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w nav-inner">
          <a
            href="#"
            className="nav-mark"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="nav-mark-text">
              Zaliznyak Group
              <small>Independent Practice</small>
            </span>
          </a>
          <div className="nav-links">
  <a
    href="#about"
    className="nav-link"
    onClick={(e) => {
      e.preventDefault()
      scrollTo('about')
    }}
  >
    About
  </a>
  <a
    href="#services"
    className="nav-link"
    onClick={(e) => {
      e.preventDefault()
      scrollTo('services')
    }}
  >
    Services
  </a>
  <a href="/work" className="nav-link">Work</a>
  <a
    href="#contact"
    className="nav-link"
    onClick={(e) => {
      e.preventDefault()
      scrollTo('contact')
    }}
  >
    Contact
  </a>
</div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="max-w">
          <h1 className="hero-h1">
            Analytics, AI, and decision systems that turn{' '}
            <em>data into outcomes.</em>
          </h1>
          <p className="hero-sub">
            Zaliznyak Group is an independent practice applying AI/ML, analytics,
            and automation to commercial and operational problems. Built on years
            leading commercial analytics in life sciences.
          </p>
          <div className="hero-actions">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('contact')
              }}
            >
              Get in touch
              <svg
                className="btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="/work" className="btn-secondary">
  See the work
</a>
          </div>
          <div className="hero-chips">
            <span className="hero-chip">15+ years in life sciences commercial</span>
            <span className="hero-chip">Founder, OptionsAnalytx</span>
            <span className="hero-chip">Based in San Diego</span>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="section section--alt">
        <div className="max-w">
          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <div className="eyebrow">About</div>
            <h2 className="h2">A senior operator. A builder.</h2>
          </div>

          <div className="about-grid reveal">
            <div className="about-photo">
              <img src="/alex.jpg" alt="Alex Zaliznyak, founder and principal of Zaliznyak Group" />
            </div>
            <div>
              <p className="about-body">
                For 15+ years I have built the commercial systems, analytics, and
                infrastructure behind specialty and rare disease launches across
                pharma, biotech, and medical device. I led commercial analytics
                and insights for a rare neurology franchise, built the KPI
                frameworks and patient journey analytics leadership ran on, owned
                the specialty pharmacy data strategy end to end, and directed
                AI/ML predictive work that improved patient conversion. Earlier,
                I built and owned the enterprise platform an entire field sales
                organization ran on.
              </p>
              <p className="about-body" style={{ marginTop: '1.25rem' }}>
                I do my best work hands on, at the intersection of business and
                technology. Zaliznyak Group is where I bring that to companies
                that need to turn data into outcomes and build AI driven
                efficiency.
              </p>
              <div className="about-name">
                <strong>Alex Zaliznyak</strong>
                <span>Founder and Principal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="section">
        <div className="max-w">
          <div className="section-head reveal">
            <div className="eyebrow">Services</div>
            <h2 className="h2">Two practices. One throughline: decisions.</h2>
          </div>

          <div className="services-grid reveal">
            {/* Service 1 */}
            <div className="service">
              <div className="service-num">01</div>
              <h3 className="service-name">
                Commercial Analytics &amp; Decision Systems
              </h3>
              <p className="service-body">
                Turning messy, multi source data into decision ready insight and
                systems. I build the measurement and analytics that leadership
                and teams actually use: KPI frameworks and performance metrics,
                customer and patient journey analytics, forecasting, segmentation
                and targeting, and predictive modeling. I also advise early stage
                companies on go to market strategy, operations, and data driven
                decision support. The throughline is decisions: what to measure,
                what it means, and what to do next.
              </p>
              <div className="service-footer">
                <ul className="service-list">
                  <li>KPI frameworks</li>
                  <li>Patient journey analytics</li>
                  <li>Forecasting</li>
                  <li>Segmentation &amp; targeting</li>
                  <li>Predictive modeling</li>
                  <li>GTM advisory</li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div className="service">
              <div className="service-num">02</div>
              <h3 className="service-name">AI Agents &amp; Automation</h3>
              <p className="service-body">
                Building AI agents and automated workflows that remove manual
                work and make teams faster. I design and build custom AI
                agents, automate repetitive processes, and integrate machine
                learning and large language models into real business workflows.
                The work tends to start where teams are losing hours to
                low value tasks: report generation, data entry and reconciliation,
                research and summarization, inbound triage, and the long tail
                of operational glue. The goal is leverage: fewer hours on those
                tasks, more consistent execution, and decision support that
                runs on its own.
              </p>
              <div className="service-footer">
                <ul className="service-list">
                  <li>Custom AI agents</li>
                  <li>Workflow automation</li>
                  <li>LLM integration</li>
                  <li>ML in production</li>
                  <li>Process redesign</li>
                  <li>Decision support</li>
                </ul>
                <a href="/agents" className="service-link">
  See seven ways it earns its keep
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
</a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="contact">
        <div className="max-w">
          <div className="reveal">
            <div className="eyebrow">Contact</div>
            <h2 className="contact-h2">
              Have a problem worth <em>solving?</em>
            </h2>
            <p className="contact-body">
              I take a small number of engagements at a time. If your work fits
              the practice, I would like to hear about it. The fastest way to
              start is a short email describing what you are trying to figure
              out.
            </p>
            <div className="contact-actions">
              <a
                href="mailto:alex@zaliznyakgroup.com?subject=Engagement%20Inquiry"
                className="btn-primary"
              >
                Send a message
              </a>
              <a
                href="https://linkedin.com/in/alex-zaliznyak"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </div>
            <div className="contact-meta">
              <a href="mailto:alex@zaliznyakgroup.com">
                alex@zaliznyakgroup.com
              </a>
              <span>San Diego, California</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="max-w footer-inner">
          <span>© 2026 Zaliznyak Group, LLC · San Diego, CA</span>
          <a
            href="https://linkedin.com/in/alex-zaliznyak"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </>
  )
}
