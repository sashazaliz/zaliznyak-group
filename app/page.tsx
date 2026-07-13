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
            Building the analytics, automation, and websites that{' '}
            <em>businesses run on.</em>
          </h1>
          <p className="hero-sub">
            I have spent twenty-five years inside the enterprise, building the
            data, analytics, and systems teams depend on, and I have started a
            handful of my own ventures along the way. I like working across
            different problems and different worlds, and that range is what I
            bring to every engagement.
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
            <span className="hero-chip">25+ years across data &amp; systems</span>
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
            <h2 className="h2">Corporate operator. Independent builder.</h2>
          </div>

          <div className="about-grid reveal">
            <div className="about-photo">
              <img src="/alex.jpg" alt="Alex Zaliznyak, founder and principal of Zaliznyak Group" />
            </div>
            <div>
              <p className="about-body">
                Most of my career has been spent inside the enterprise, building
                the data, analytics, and systems that businesses rely on to make
                decisions. I started in corporate finance, in budgeting and
                forecasting, where financial modeling and data work became second
                nature. That foundation has run through everything since: the way
                I think about measurement, the way I structure a problem, the way
                I turn a mess of numbers into something a team can act on.
              </p>
              <p className="about-body" style={{ marginTop: '1.25rem' }}>
                Over the years I kept building things of my own on the side. A
                skincare and microdermabrasion business with a partner. A
                consulting practice teaching companies to get more out of Excel
                and their own data. An upscale baby goods store I started and
                scaled on Shopify during COVID. OptionsAnalytx, the options
                research platform I built and run today. Along the way I designed
                and developed more than a dozen websites, everything from quick
                builds on Shopify and Wix to fully custom code, for my own
                ventures and for people who needed the help. None of it was a
                grand plan. I just like building, and I like working across
                different problems and different industries.
              </p>
              <p className="about-body" style={{ marginTop: '1.25rem' }}>
                Most recently I spent years building the commercial systems and
                analytics behind specialty and rare disease launches, owning data
                strategy end to end and directing the machine learning work
                behind predicting patient behavior. It is the same instinct that
                runs through everything I do, applied at enterprise scale.
              </p>
              <p className="about-body" style={{ marginTop: '1.25rem' }}>
                I do my best work hands on, close to the business and close to the
                build. Zaliznyak Group is where I bring that to companies and
                founders who want an operator in the room: someone who can build
                the analytics, automate the busywork, and ship a site that looks
                and works the part.
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
            <h2 className="h2">Three services. One dedicated operator.</h2>
          </div>

          <div className="services-grid reveal">
            {/* Service 1 */}
            <div className="service">
              <div className="service-num">01</div>
              <h3 className="service-name">
                Analytics &amp; Decision Support
              </h3>
              <p className="service-body">
                Turning messy, multi-source data into decisions teams actually
                use. I build the measurement and analytics behind commercial and
                operational work: KPI frameworks, customer and patient journey
                analytics, forecasting, segmentation, and predictive modeling. I
                also advise early stage companies on go to market and operations.
                The throughline is decisions: what to measure, what it means,
                and what to do next.
              </p>
              <div className="service-footer">
                <ul className="service-list">
                  <li>KPI frameworks</li>
                  <li>Journey analytics</li>
                  <li>Forecasting</li>
                  <li>Segmentation &amp; targeting</li>
                  <li>Predictive modeling</li>
                  <li>GTM advisory</li>
                </ul>
                <a href="#contact" className="service-link">
                  Start a conversation
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

            {/* Service 3 */}
            <div className="service">
              <div className="service-num">03</div>
              <h3 className="service-name">Web Design &amp; Development</h3>
              <p className="service-body">
                Bespoke websites built one at a time, for one business, for one
                customer. No templates, no page builders. I handle design, build,
                and the technical layer underneath: performance, SEO foundations,
                structured data, and the integrations that make a site actually
                run, from Stripe and payments to email, CRM, booking, and
                analytics. The result is a site that looks considered and works
                as hard as the business behind it.
              </p>
              <div className="service-footer">
                <ul className="service-list">
                  <li>Bespoke design</li>
                  <li>Custom development</li>
                  <li>SEO foundations</li>
                  <li>Stripe &amp; payments</li>
                  <li>Email &amp; CRM integration</li>
                  <li>Analytics setup</li>
                </ul>
                <a href="/work#selected-work" className="service-link">
  See selected work
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
