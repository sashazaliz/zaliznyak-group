'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ═══════════════════════════════════════════
   WAVE CANVAS HOOK
═══════════════════════════════════════════ */
function useWaveGrid(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  wrapRef:   React.RefObject<HTMLDivElement   | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0
    const COLS = 22, ROWS = 16

    function resize() {
      if (!canvas || !wrap) return
      canvas.width  = wrap.offsetWidth
      canvas.height = wrap.offsetHeight
    }
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      const cw = W / COLS, ch = H / ROWS

      const pts: Array<Array<{ px: number; py: number; edgeAlpha: number }>> = []
      for (let xi = 0; xi <= COLS; xi++) {
        pts[xi] = []
        for (let yi = 0; yi <= ROWS; yi++) {
          const bx = xi * cw, by = yi * ch
          const w1 = Math.sin(xi * 0.45 + t * 0.55) * 11
          const w2 = Math.cos(yi * 0.38 + t * 0.42) * 9
          const w3 = Math.sin((xi + yi) * 0.3 + t * 0.28) * 5
          const px = bx + w1 + w3
          const py = by + w2 + w3
          const fx = (xi / COLS - 0.5) * 2
          const fy = (yi / ROWS - 0.5) * 2
          const edgeDist  = Math.sqrt(fx * fx + fy * fy)
          const edgeAlpha = Math.max(0, 0.72 - edgeDist * 0.42)
          pts[xi][yi] = { px, py, edgeAlpha }
        }
      }

      // Lines
      for (let xi = 0; xi <= COLS; xi++) {
        for (let yi = 0; yi <= ROWS; yi++) {
          const { px, py, edgeAlpha } = pts[xi][yi]
          if (xi < COLS) {
            const n = pts[xi + 1][yi]
            const a = (edgeAlpha + n.edgeAlpha) / 2
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(n.px, n.py)
            ctx.strokeStyle = `rgba(196,150,90,${(a * 0.7).toFixed(3)})`
            ctx.lineWidth = 0.8; ctx.stroke()
          }
          if (yi < ROWS) {
            const n = pts[xi][yi + 1]
            const a = (edgeAlpha + n.edgeAlpha) / 2
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(n.px, n.py)
            ctx.strokeStyle = `rgba(196,150,90,${(a * 0.55).toFixed(3)})`
            ctx.lineWidth = 0.55; ctx.stroke()
          }
        }
      }

      // Dots — sequential right-to-left sweep
      const SWEEP_PERIOD = 20
      const sweepX  = COLS * (1 - (t % SWEEP_PERIOD) / SWEEP_PERIOD)
      const FALLOFF = 3.5

      for (let xi = 0; xi <= COLS; xi++) {
        for (let yi = 0; yi <= ROWS; yi++) {
          const { px, py, edgeAlpha } = pts[xi][yi]
          if (edgeAlpha < 0.04) continue
          const dist  = Math.abs(xi - sweepX)
          const sweep = Math.max(0, 1 - dist / FALLOFF)
          const dotAlpha = Math.min(1, edgeAlpha * (0.22 + sweep * 3.8))
          const dotSize  = 0.7 + sweep * 3.2
          ctx.beginPath()
          ctx.arc(px, py, dotSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212,174,120,${dotAlpha.toFixed(3)})`
          ctx.fill()
          if (sweep > 0.4 && edgeAlpha > 0.15) {
            ctx.beginPath()
            ctx.arc(px, py, dotSize * 2.8, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(196,150,90,${(edgeAlpha * sweep * 0.15).toFixed(3)})`
            ctx.fill()
          }
        }
      }

      t += 0.007
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(animId)
    }
  }, [canvasRef, wrapRef])
}

/* ═══════════════════════════════════════════
   COUNTER HOOK
═══════════════════════════════════════════ */
function useCountUp(target: number, suffix: string, isVisible: boolean) {
  const [display, setDisplay] = useState('0' + suffix)
  useEffect(() => {
    if (!isVisible) return
    const duration = 2200
    const start = performance.now()
    function step(now: number) {
      const p    = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(target * ease).toLocaleString() + suffix)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isVisible, target, suffix])
  return display
}

/* ═══════════════════════════════════════════
   REVEAL HOOK
═══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))

    const scoreIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        setTimeout(() => {
          document.querySelectorAll('.score-row').forEach(r => r.classList.add('loaded'))
          document.querySelectorAll('.cf-bar').forEach(b => b.classList.add('animate'))
        }, 200)
      })
    }, { threshold: 0.2 })
    const sc = document.querySelector('.score-card')
    if (sc) scoreIO.observe(sc)

    const factorIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        setTimeout(() => document.querySelectorAll('.factor-fill').forEach(f => f.classList.add('animate')), 200)
      })
    }, { threshold: 0.2 })
    const fl = document.getElementById('factorList')
    if (fl) factorIO.observe(fl)

    return () => { io.disconnect(); scoreIO.disconnect(); factorIO.disconnect() }
  }, [])
}

/* ═══════════════════════════════════════════
   METRIC CELL
═══════════════════════════════════════════ */
function MetricCell({ target, suffix, label, sub, delay }: {
  target: number; suffix: string; label: string; sub: string; delay: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const display = useCountUp(target, suffix, visible)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); el.classList.add('animated') } },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="metric-cell reveal" ref={ref} style={{ transitionDelay: delay }}>
      <div className="metric-num">{display}</div>
      <div className="metric-lbl">{label}</div>
      <div className="metric-sub">{sub}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   LOGO SVG
═══════════════════════════════════════════ */
function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="zGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#8A6030"/>
          <stop offset="30%"  stopColor="#C4965A"/>
          <stop offset="55%"  stopColor="#FAECC8"/>
          <stop offset="75%"  stopColor="#C4965A"/>
          <stop offset="100%" stopColor="#7A5020"/>
        </linearGradient>
        <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#5A7A96"/>
          <stop offset="40%"  stopColor="#8AACCC"/>
          <stop offset="65%"  stopColor="#D0E4F4"/>
          <stop offset="100%" stopColor="#3D5A73"/>
        </linearGradient>
        <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)"/>
          <stop offset="50%"  stopColor="rgba(255,255,255,0.35)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          <animateTransform attributeName="gradientTransform" type="translate"
            from="-1 0" to="2 0" dur="3s" repeatCount="indefinite"/>
        </linearGradient>
        <filter id="glow3d">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.7)"/>
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(196,150,90,0.4)"/>
        </filter>
        <filter id="glow3dG">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.7)"/>
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(90,122,150,0.4)"/>
        </filter>
      </defs>
      <rect x="3" y="3" width="32" height="32" rx="2"
        fill="rgba(196,150,90,0.08)" stroke="rgba(196,150,90,0.2)" strokeWidth="0.5"/>
      <g filter="url(#glow3dG)" transform="translate(1,0)">
        <path d="M 22 9 A 10 10 0 1 0 28 25 L 28 19 L 23 19"
          fill="none" stroke="url(#gGrad)" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 22 9 A 10 10 0 1 0 28 25 L 28 19 L 23 19"
          fill="none" stroke="url(#shine)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g filter="url(#glow3d)" transform="translate(-1,0)">
        <polyline points="9,9 25,9 9,27 25,27"
          fill="none" stroke="url(#zGrad)" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9,9 25,9 9,27 25,27"
          fill="none" stroke="url(#shine)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const [mobOpen, setMobOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useWaveGrid(canvasRef, wrapRef)
  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobOpen(false)
  }

  const factorStyle = (pct: number): React.CSSProperties => ({ '--pct': pct } as React.CSSProperties)
  const cfStyle     = (p: number):   React.CSSProperties => ({ '--p':   p   } as React.CSSProperties)
  const rowStyle    = (w: string):   React.CSSProperties => ({ '--w':   w   } as React.CSSProperties)

  // ── Agency phases data ──────────────────────────────────────────────
  const phases = [
    { num:'01', name:'Digital Audit & Strategy Report',
      price:'$500 – $750',
      desc:'We perform a hands-on expert analysis of your website performance, Google ranking, every local competitor, and your full social media presence — then deliver a prioritized, plain-English roadmap.',
      why:'Why we\'re different: agencies charge $1,500–$2,500 for a generic scan. We deliver a bespoke roadmap for less than half the cost.' },
    { num:'02', name:'Design & Interactive Prototype',
      price:'$800 – $1,200',
      desc:'We collaborate on your complete visual identity — full color palette, typography system, feature list, and page-by-page user journey. Then we build a fully interactive browser preview with your real brand, photos, and content in place. Two revision rounds included.',
      why:'Why it matters: prototyping first eliminates costly mid-build changes and gives you full creative control before a line of production code is written.' },
    { num:'03', name:'Full Custom Development',
      price:'$3,500 – $4,750',
      desc:'100% custom — no templates, no page builders, no WordPress. We build in Next.js with hand-crafted CSS that makes your site load fast and look pixel-perfect on every device. Booking integrations, contact forms, Facebook Pixel, and Google Analytics 4 all wired in from day one.',
      why:'Why it matters: custom-built sites rank better, load faster, and convert more than any template — and they look like nothing else in your market.' },
    { num:'04', name:'SEO Foundation',
      price:'$600 – $900',
      desc:'92% of Google users never click past page 1 — and the top 3 results capture over 68% of all clicks. We hand-craft custom page titles, meta descriptions, and structured schema data for every page so Google finds, trusts, and ranks your site.',
      why:'Why we\'re different: most platforms auto-generate weak, generic SEO tags. We write keyword-researched copy for every single page — the difference between page 1 and page 5.' },
    { num:'05', name:'Facebook & Instagram Ads Setup',
      price:'$400 – $600',
      desc:'Full Meta Ads infrastructure: Business Manager, Pixel, custom audiences, 2–3 ad creatives written and designed for your exact customer, full campaign launch, and a plain-English handoff guide. Pixel retargeting delivers up to 3× higher conversion vs. cold ads.',
      why:'Why it matters: we build audiences around your specific customers by location, age, income, and interests — not broad demographic guesses.' },
  ]

  return (
    <>
      {/* Mobile menu */}
      <div className={`mob-menu ${mobOpen ? 'open' : ''}`}>
        <button className="mob-close" onClick={() => setMobOpen(false)}>✕</button>
        {['divisions','ai-tools','digital','automation','contact'].map(id => (
          <a key={id} href={`#${id}`} onClick={() => scrollTo(id)}>
            {id === 'ai-tools' ? 'AI Tools'
              : id === 'divisions' ? 'Services'
              : id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-logo">
          <LogoMark/>
          <span className="nav-name">The Zaliznyak Group</span>
        </div>
        <ul className="nav-links">
          {[['divisions','Services'],['ai-tools','AI Tools'],['digital','Digital Agency'],['automation','Automation']].map(([id,label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>{label}</a>
            </li>
          ))}
        </ul>
        <a href="https://calendly.com/zaliznyakgroup-info/new-meeting"
          target="_blank" rel="noopener noreferrer" className="nav-contact">
          Start a Project
        </a>
        <button className="nav-toggle" onClick={() => setMobOpen(true)}>
          <span/><span/><span/>
        </button>
      </nav>

      {/* ═══ HERO ═══ */}
      <div id="heroWrap" className="hero-wrap" ref={wrapRef}>
        <canvas ref={canvasRef} className="wave-canvas"/>
        <div className="hero-vignette"/>
        <section id="hero">
          <div className="hero-inner">
            <div className="hero-eyebrow">AI · Digital · Automation</div>
            <h1 className="hero-h1">
              <span className="word-the">The</span><br/>
              <span className="word-z">Zaliznyak</span><br/>
              <span className="word-g">Group</span>
            </h1>
            <div className="hero-descriptor">
              {['AI Financial Tools','Bespoke Digital Agency','Intelligent Automation'].map(t => (
                <span key={t} className="hero-desc-item">{t}</span>
              ))}
            </div>
            <p className="hero-sub">
              Three divisions. One philosophy: intelligence applied with precision
              outperforms scale every time. We build for founders who know the difference.
            </p>
            <div className="hero-actions">
              <a href="#divisions" className="btn-primary"
                onClick={e => { e.preventDefault(); scrollTo('divisions') }}>
                <span>Explore Our Work</span>
              </a>
              <a href="#contact" className="btn-text"
                onClick={e => { e.preventDefault(); scrollTo('contact') }}>
                Start a Conversation
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ═══ METRICS ═══ */}
      <section id="metrics">
        <div className="metrics-inner">
          <MetricCell target={96208} suffix=""    label="Contracts Backtested"  sub="OptionsAnalytx · 488 symbols · 2018–2025"  delay="0s"/>
          <MetricCell target={93}    suffix=".2%" label="A+ Grade Win Rate"     sub="9-factor Smart Score · Validated"           delay="0.07s"/>
          <MetricCell target={50}    suffix="%+"  label="Below Agency Rates"    sub="Agency quality · Founder-level attention"   delay="0.14s"/>
          <MetricCell target={100}   suffix="%"   label="Custom — No Templates" sub="Every project built from the ground up"     delay="0.21s"/>
        </div>
      </section>

      {/* ═══ DIVISIONS ═══ */}
      <section id="divisions" className="s-pad">
        <div className="max-w">
          <div className="divisions-head">
            <div className="reveal">
              <div className="s-eye">Service Architecture</div>
              <h2 className="s-h2">Three divisions.<br/><em>One standard.</em></h2>
            </div>
            <p className="s-body reveal d1">
              <strong>Each division operates independently</strong> — its own toolkit, its own
              market, its own measure of excellence. Together they form a single thesis: precision
              intelligence, applied deliberately, changes outcomes.
            </p>
          </div>
          <div className="divisions-grid">
            <div className="div-card reveal">
              <div className="div-index">01 / 03</div>
              <div className="div-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round">
                  <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="currentColor"/>
                  <polyline points="7,12 10,15 17,9" stroke="currentColor"/>
                </svg>
              </div>
              <div className="div-name">AI Financial Tools</div>
              <div className="div-tag">Fintech · Quantitative Analysis</div>
              <p className="div-desc">Proprietary algorithms that rank, score, and surface
                high-probability trades — built on real backtested data across 96,208 contracts.
                The only screener that ranks instead of filters.</p>
              <div className="div-items">
                {['OptionsAnalytx — Live Production SaaS','9-Factor Smart Score Algorithm',
                  '96,208 Contracts · 488 Symbols · 7 Years','New Financial Verticals In Development'
                ].map(i => <span key={i} className="div-item">{i}</span>)}
              </div>
              <a href="#ai-tools" className="div-link"
                onClick={e => { e.preventDefault(); scrollTo('ai-tools') }}>Explore Division →</a>
            </div>
            <div className="div-card reveal d1">
              <div className="div-index">02 / 03</div>
              <div className="div-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" stroke="currentColor">
                  <rect x="2" y="3" width="20" height="15" rx="1"/>
                  <polyline points="8,21 16,21"/>
                  <line x1="12" y1="18" x2="12" y2="21"/>
                  <line x1="2" y1="13" x2="22" y2="13"/>
                  <rect x="5" y="6" width="5" height="4" rx="0.5"/>
                  <line x1="13" y1="7" x2="18" y2="7"/>
                  <line x1="13" y1="9.5" x2="16" y2="9.5"/>
                </svg>
              </div>
              <div className="div-name">Bespoke Digital Agency</div>
              <div className="div-tag">Design · Development · Strategy</div>
              <p className="div-desc">Zero templates. Every pixel, animation, and line of code
                built to your exact specification — from your color palette through to live
                deployment. For founders who understand the website is the product.</p>
              <div className="div-items">
                {['Digital Audit & Strategy Report','Interactive Prototype & Design',
                  'Next.js Custom Production Build','SEO Foundation & Paid Media Setup'
                ].map(i => <span key={i} className="div-item">{i}</span>)}
              </div>
              <a href="#digital" className="div-link"
                onClick={e => { e.preventDefault(); scrollTo('digital') }}>Explore Division →</a>
            </div>
            <div className="div-card reveal d2">
              <div className="div-index">03 / 03</div>
              <div className="div-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" stroke="currentColor">
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="4"  cy="6"  r="2"/><circle cx="20" cy="6"  r="2"/>
                  <circle cx="4"  cy="18" r="2"/><circle cx="20" cy="18" r="2"/>
                  <line x1="6"  y1="7"  x2="10" y2="10"/>
                  <line x1="18" y1="7"  x2="14" y2="10"/>
                  <line x1="6"  y1="17" x2="10" y2="14"/>
                  <line x1="18" y1="17" x2="14" y2="14"/>
                </svg>
              </div>
              <div className="div-name">Intelligent Automation</div>
              <div className="div-tag">AI Workflows · Operations</div>
              <p className="div-desc">AI-powered workflow systems that eliminate manual overhead
                — from lead response to proposal generation. Built on the Claude API, Zapier,
                and custom architecture so your business runs while you focus on growth.</p>
              <div className="div-items">
                {['AI Lead Response & Follow-Up','Automated Proposal Generation',
                  'Client Intake & Onboarding','Custom AI Solutions'
                ].map(i => <span key={i} className="div-item">{i}</span>)}
              </div>
              <a href="#automation" className="div-link"
                onClick={e => { e.preventDefault(); scrollTo('automation') }}>Explore Division →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OPTIONSANALYTX ═══ */}
      <section id="ai-tools" className="s-pad-lg">
        <div className="max-w">
          <div className="oa-layout">
            <div>
              <div className="s-eye reveal">Division 01 — AI Financial Tools · Flagship Product</div>
              <h2 className="s-h2 reveal" style={{ fontSize:'clamp(2.8rem,4.5vw,5rem)' }}>
                <span style={{ color:'var(--gold-pale)' }}>Ω</span>ptions<em>Analytx</em> —<br/>
                the algorithm<br/>that ranks.
              </h2>
              <div className="oa-badge reveal">Live Production System · optionsanalytx.com</div>
              <p className="s-body reveal" style={{ marginTop:'0.8rem' }}>
                Every other covered call screener gives you a list. OptionsAnalytx gives you a{' '}
                <strong>ranked verdict</strong>. Every contract across 5,500+ securities is scored
                0–100 across 9 proprietary factors simultaneously. The highest-quality trade
                surfaces to position #1, automatically.
              </p>
              <p className="s-body reveal" style={{ marginTop:'1rem' }}>
                Built on <strong>25 years of covered call trading experience</strong> and validated
                against 96,208 real contracts across 7 years of market data. Every factor weight is
                derived from outcome correlation, not intuition.
              </p>
              <div className="oa-stats-row reveal">
                <div className="oa-stat"><div className="oa-stat-num">93.2%</div><div className="oa-stat-lbl">A+ Win Rate</div></div>
                <div className="oa-stat"><div className="oa-stat-num">86.1%</div><div className="oa-stat-lbl">A/A+ Combined</div></div>
                <div className="oa-stat"><div className="oa-stat-num">96,208</div><div className="oa-stat-lbl">Contracts Tested</div></div>
              </div>
              <div className="factor-section reveal">
                <div className="factor-section-title">9-Factor Smart Score — Algorithm Weight Distribution</div>
                <div className="factor-list" id="factorList">
                  {[
                    ['Probability of Profit (POP)',       0.27, '27%'],
                    ['OTM Buffer — Downside Protection',   0.19, '19%'],
                    ['Theta Decay Efficiency',             0.17, '17%'],
                    ['IV Rank (52-week normalized)',        0.12, '12%'],
                    ['Annualized Yield Score',             0.08,  '8%'],
                    ['Liquidity Score',                    0.06,  '6%'],
                    ['Event Risk Penalty',                 0.05,  '5%'],
                    ['Relative OI Rank',                   0.03,  '3%'],
                    ['Theta-to-Premium Ratio',             0.03,  '3%'],
                  ].map(([label, pct, display]) => (
                    <div key={label as string} className="factor-row">
                      <div className="factor-label">{label}</div>
                      <div className="factor-bar-wrap">
                        <div className="factor-fill" style={factorStyle(pct as number)}/>
                      </div>
                      <div className="factor-pct">{display}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop:'1.8rem' }} className="reveal">
                <Link href="https://optionsanalytx.com" target="_blank" className="btn-primary"
                  style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem' }}>
                  <span>Launch OptionsAnalytx ↗</span>
                </Link>
              </div>
            </div>

            {/* Score card */}
            <div className="score-card reveal d2">
              <div className="score-card-header">
                <span className="sc-title">Smart Score · Top Ranked Contracts</span>
                <span className="sc-live">Live Data</span>
              </div>
              <div className="score-rows">
                {[
                  { rank:'#1', name:'MSFT · $420C · 21d', detail:'POP 82% · Yield 2.1%', grade:'A+', g:'g-aplus', w:'92%' },
                  { rank:'#2', name:'JNJ · $155C · 28d',  detail:'POP 79% · Yield 1.8%', grade:'A+', g:'g-aplus', w:'87%' },
                  { rank:'#3', name:'PG · $148C · 14d',   detail:'POP 76% · Yield 1.4%', grade:'A+', g:'g-aplus', w:'81%' },
                  { rank:'#4', name:'KO · $62C · 21d',    detail:'POP 73% · Yield 1.2%', grade:'A',  g:'g-a',    w:'75%' },
                  { rank:'#5', name:'WFC · $52C · 35d',   detail:'POP 74% · Yield 1.5%', grade:'A',  g:'g-a',    w:'69%' },
                  { rank:'#6', name:'VZ · $40C · 28d',    detail:'POP 68% · Yield 1.6%', grade:'B',  g:'g-b',    w:'58%' },
                ].map(r => (
                  <div key={r.rank} className="score-row" style={rowStyle(r.w)}>
                    <div className="score-row-bg"/>
                    <div className="sr-rank">{r.rank}</div>
                    <div className="sr-name">{r.name}</div>
                    <div className="sr-detail">{r.detail}</div>
                    <div className={`sr-grade ${r.g}`}>{r.grade}</div>
                  </div>
                ))}
              </div>
              <div className="card-factors">
                {[['Prob. Profit',0.82],['OTM Buffer',0.74],['Theta Effic.',0.88],
                  ['IV Rank',0.61],['Liquidity',0.91],['Event Risk',0.78]
                ].map(([n,p]) => (
                  <div key={n as string}>
                    <div className="cf-name">{n}</div>
                    <div className="cf-bar"><div className="cf-fill" style={cfStyle(p as number)}/></div>
                  </div>
                ))}
              </div>
              <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid rgba(196,150,90,0.07)', background:'rgba(196,150,90,0.04)' }}>
                <div style={{ fontFamily:'var(--mono)', fontSize:'0.55rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.3rem' }}>Core Principle</div>
                <div style={{ fontSize:'0.8rem', color:'var(--cream-2)', lineHeight:1.6, fontStyle:'italic' }}>&quot;Boring is Better — consistent premium collection on low-volatility names outperforms chasing high-premium volatile stocks over time.&quot;</div>
              </div>
              <div style={{ padding:'1rem 1.5rem 1.4rem', borderTop:'1px solid rgba(196,150,90,0.07)' }}>
                <div style={{ fontFamily:'var(--mono)', fontSize:'0.55rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-body)', marginBottom:'0.8rem' }}>Win Rate by Grade · 96,208 Contracts</div>
                {[['A+','#86C878','93.2%','93.2'],['A','var(--gold)','79.0%','79'],['B','var(--steel-lt)','67.1%','67.1']].map(([g,c,lbl,w]) => (
                  <div key={g} style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'0.5rem' }}>
                    <div style={{ fontFamily:'var(--serif)', fontSize:'0.9rem', color:c, minWidth:24 }}>{g}</div>
                    <div style={{ flex:1, height:4, background:'var(--muted-2)', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${w}%`, background:c, borderRadius:2 }}/>
                    </div>
                    <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', color:c, minWidth:36, textAlign:'right' }}>{lbl}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding:'1rem 1.5rem 1.4rem', borderTop:'1px solid rgba(196,150,90,0.07)' }}>
                <div style={{ fontFamily:'var(--mono)', fontSize:'0.55rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-body)', marginBottom:'0.7rem' }}>A/A+ Win Rate — All 7 Market Regimes</div>
                {[
                  ['2018–2019 Pre-COVID Bull','91.2%','#86C878'],
                  ['2020 COVID Crash & Recovery','83.4%','var(--gold)'],
                  ['2021 Post-COVID Bull','88.9%','#86C878'],
                  ['2022 Bear Market','88.1%','var(--gold)'],
                  ['2024 AI-Driven Bull Run','89.7%','#86C878'],
                ].map(([label,pct,c]) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.4rem' }}>
                    <span style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', color:'var(--cream-2)' }}>{label}</span>
                    <span style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', color:c }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIGITAL AGENCY ═══ */}
      <section id="digital" className="s-pad">
        <div className="max-w">
          <div className="agency-layout">

            {/* Phases — right column */}
            <div className="reveal" style={{ order:1 }}>
              <div className="phases-wrap">
                {phases.map(p => (
                  <div key={p.num} className="phase-row">
                    <div className="phase-header">
                      <span className="phase-num">{p.num}</span>
                      <span className="phase-name">{p.name}</span>
                      <span className="phase-price">{p.price}</span>
                    </div>
                    <div className="phase-detail">
                      {p.desc}
                      {/* ↓ phase-why bumped to cream-2 so it reads as copy, not footnote */}
                      <div className="phase-why" style={{ color:'var(--cream-2)' }}>{p.why}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total — updated ranges + green savings */}
              <div className="agency-total">
                <div className="at-label">Total Project Investment</div>
                <div className="at-num">$5,800 – $8,200</div>
                <div className="at-sub">
                  Agency equivalent: $13,000–$22,000 ·{' '}
                  <span style={{ color:'#86C878', fontWeight:400 }}>You save 50%+</span>
                </div>
              </div>
            </div>

            {/* Copy — left column */}
            <div style={{ order:0 }}>
              <div className="s-eye reveal">Division 02 — Bespoke Digital Agency</div>
              <h2 className="s-h2 reveal">Built to your<br/><em>exact vision.</em><br/>Not a template.</h2>
              <p className="s-body reveal" style={{ marginTop:'1.8rem' }}>
                We begin every engagement with a complete discovery session — your color palette,
                typography system, feature requirements, and customer journey. Every interaction,
                every hover state, every animation is{' '}
                <strong>designed collaboratively and then built in custom Next.js and CSS</strong>.
                No page builders. No WordPress. No compromise.
              </p>
              <p className="s-body reveal" style={{ marginTop:'1rem' }}>
                The result loads fast, ranks well, and looks like nothing else in your market —
                because it isn&apos;t anything else. It&apos;s yours.
              </p>
              <div style={{ fontFamily:'var(--mono)', fontSize:'0.65rem', lineHeight:2, color:'var(--text-body)', borderLeft:'1px solid rgba(196,150,90,0.2)', paddingLeft:'1.2rem', marginTop:'2rem' }} className="reveal">
                <span style={{ color:'var(--gold)', letterSpacing:'0.18em' }}>STACK</span><br/>
                Next.js · TypeScript · Tailwind + Custom CSS<br/>
                Vercel Deployment · Clerk Auth · Stripe<br/>
                Facebook Pixel · Google Analytics 4 · GTM<br/><br/>
                <span style={{ color:'var(--gold)', letterSpacing:'0.18em' }}>PHILOSOPHY</span><br/>
                <span style={{ color:'var(--cream-2)' }}>Build for the client&apos;s customer, not the client&apos;s ego.</span>
              </div>
              <div style={{ marginTop:'2.5rem', padding:'1.4rem', background:'var(--bg-3)', border:'1px solid rgba(196,150,90,0.07)', position:'relative', overflow:'hidden' }} className="reveal">
                <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(196,150,90,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,150,90,0.04) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }}/>
                <div style={{ position:'relative', zIndex:1 }}>
                  <div style={{ fontFamily:'var(--mono)', fontSize:'0.56rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem' }}>This Division Is Built For</div>
                  {[
                    'Small businesses who have outgrown their current site and need something that actually converts visitors',
                    'Service businesses in competitive local markets where showing up on Google page 1 is the difference between busy and slow',
                    'Founders who understand their website is a business asset — not a brochure — and want it built accordingly',
                  ].map(item => (
                    <div key={item} style={{ display:'flex', gap:'0.7rem', alignItems:'flex-start', marginBottom:'0.6rem' }}>
                      <span style={{ color:'var(--gold)', flexShrink:0, marginTop:'0.1rem' }}>◆</span>
                      <span style={{ fontSize:'0.82rem', color:'var(--cream-2)', lineHeight:1.6 }}>{item}</span>
                    </div>
                  ))}
                  <div style={{ marginTop:'1.2rem', paddingTop:'1rem', borderTop:'1px solid rgba(196,150,90,0.08)', fontFamily:'var(--mono)', fontSize:'0.62rem', color:'var(--text-body)' }}>
                    Monthly retainer available · $200–$350/mo · Updates, reporting, ads management
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AUTOMATION ═══ */}
      <section id="automation" className="s-pad">
        <div className="max-w">
          <div className="auto-head">
            <div className="reveal">
              <div className="s-eye">Division 03 — Intelligent Automation</div>
              <h2 className="s-h2">AI that works<br/>while you <em>don&apos;t.</em></h2>
            </div>
            <p className="s-body reveal d1">
              <strong>Small business owners lose 40% of their week</strong> to tasks that AI can
              handle in seconds. We build systems that eliminate the overhead — so every hour you
              work is an hour only you can fill.
            </p>
          </div>
          <div className="auto-grid">
            {[
              { num:'01',
                icon: <><rect x="2" y="4" width="20" height="16" rx="1" stroke="currentColor"/><polyline points="2,8 12,14 22,8" stroke="currentColor"/></>,
                title:'Lead Response Automation',
                body:'Every inquiry receives an intelligent, personalized response within 60 seconds — 24/7, in your voice. Whether it comes in at 2am on a Sunday or during your busiest day, no lead falls through while you\'re heads-down doing the work.',
                metric:'↑ 3× more conversions vs. manual follow-up · 40% faster response rate' },
              { num:'02',
                icon: <><rect x="4" y="2" width="16" height="20" rx="1" stroke="currentColor"/><line x1="8" y1="8" x2="16" y2="8" stroke="currentColor"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor"/><line x1="8" y1="16" x2="12" y2="16" stroke="currentColor"/></>,
                title:'Proposal Generation',
                body:'Input a client brief — receive a fully scoped, branded, priced proposal in under two minutes. What used to consume an hour of careful writing happens automatically, consistently, every time. More proposals sent means more projects closed.',
                metric:'↓ 90% reduction in proposal creation time · Consistent professional quality' },
              { num:'03',
                icon: <><circle cx="12" cy="12" r="10" stroke="currentColor"/><polyline points="12,6 12,12 16,14" stroke="currentColor"/></>,
                title:'Client Onboarding Systems',
                body:'The moment a contract is signed, an automated sequence begins — intake form delivered, welcome email sent, project brief collected, kickoff scheduled, access credentials prepared. Your client\'s experience is professional from the first second.',
                metric:'Zero manual onboarding steps · Professional first impression, every time' },
              { num:'04',
                icon: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor"/>,
                title:'Custom AI Solutions',
                body:'Your business doesn\'t fit neatly into a template — and neither should your AI. We design and build bespoke automation systems for workflows unique to your operation. Inventory intelligence, content pipelines, pricing optimization — if it can be made smarter with AI, we build it.',
                metric:'Scoped individually · Built on Claude API, Make, Zapier, and custom code' },
            ].map((card, i) => (
              <div key={card.num} className={`auto-card reveal${i > 0 ? ` d${i}` : ''}`}>
                <div className="auto-num">{card.num}</div>
                <svg className="auto-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round">
                  {card.icon}
                </svg>
                <div className="auto-title">{card.title}</div>
                <p className="auto-body">{card.body}</p>
                <div className="auto-metric">{card.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact">
        <div className="contact-inner reveal">
          <div className="s-eye" style={{ justifyContent:'center' }}>Begin a Conversation</div>
          <h2 className="contact-h2">Build something<br/><em>exceptional.</em></h2>
          <p className="contact-sub">
            Whether you&apos;re launching a financial tool, rebuilding your digital presence, or
            automating your operations —{' '}
            <span>we build for founders who demand precision.</span>{' '}
            No templates. No offshore. No compromise.
          </p>
          <a href="mailto:info@zaliznyakgroup.com" className="contact-email">
            info@zaliznyakgroup.com
          </a>
          <div className="contact-actions">
            <a href="https://calendly.com/zaliznyakgroup-info/new-meeting"
              target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span>Start a Project</span>
            </a>
            <a href="tel:8582810071" className="btn-text">(858) 281-0071</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">The Zaliznyak Group</div>
        <ul className="footer-links">
          {[['ai-tools','AI Tools'],['digital','Digital Agency'],['automation','Automation'],['contact','Contact']].map(([id,label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="footer-copy">© 2024 The Zaliznyak Group, LLC · San Diego, CA</div>
      </footer>
    </>
  )
}
