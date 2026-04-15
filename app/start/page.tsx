'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CSSProperties } from 'react'

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
interface FormData {
  // Step 1
  bizName: string
  yourName: string
  email: string
  industry: string
  location: string
  bizDesc: string
  currentSite: string
  // Step 2
  idealCustomer: string
  problem: string
  differentiator: string
  competitors: string
  // Step 3
  hasAssets: string
  colors: { hex: string; label: string }[]
  refSites: { url: string; why: string }[]
  toneTags: string[]
  toneCustom: string
  avoid: string
  // Step 4
  services: string[]
  goal: string
  photography: string
  projectNotes: string
  // Step 5
  budget: string
  timeline: string
  referral: string
  finalNotes: string
}

const INITIAL: FormData = {
  bizName: '', yourName: '', email: '', industry: '', location: '', bizDesc: '', currentSite: '',
  idealCustomer: '', problem: '', differentiator: '', competitors: '',
  hasAssets: '', colors: [{ hex: '#C4965A', label: '' }, { hex: '#07070A', label: '' }, { hex: '#EAE4D8', label: '' }],
  refSites: [{ url: '', why: '' }, { url: '', why: '' }, { url: '', why: '' }],
  toneTags: [], toneCustom: '', avoid: '',
  services: [], goal: '', photography: '', projectNotes: '',
  budget: '', timeline: '', referral: '', finalNotes: '',
}

const TONE_TAGS = ['Minimal','Warm','Bold','Editorial','Luxurious','Trustworthy','Playful','Technical','Feminine','Masculine','Clean','Organic','Authoritative','Approachable']

const PHASES = [
  { value: 'audit',       label: 'Digital Audit & Strategy Report',    sub: '$650 · Performance analysis, competitive landscape, prioritized roadmap' },
  { value: 'prototype',   label: 'Design & Interactive Prototype',      sub: '$950–$1,100 · Full visual design, clickable browser preview, 2 revision rounds' },
  { value: 'development', label: 'Full Custom Development',             sub: '$2,800–$3,200 · Next.js, custom CSS, all integrations — zero templates' },
  { value: 'seo',         label: 'SEO Foundation',                      sub: '$700–$800 · Custom titles, meta, schema markup, Search Console setup' },
  { value: 'ads',         label: 'Facebook & Instagram Ads Setup',      sub: '$500 · Full Meta Ads infrastructure, pixel, audiences, 2–3 creatives' },
  { value: 'shopify',     label: 'Shopify Consulting',                  sub: 'Storefront optimization, conversion improvements, SEO — priced per scope' },
  { value: 'automation',  label: 'AI Automation & Workflow Systems',    sub: 'Lead response, proposal generation, onboarding — priced per scope' },
]

const GOALS = [
  { value: 'bookings',    label: 'Drive bookings / appointments' },
  { value: 'ecommerce',   label: 'Sell products online (e-commerce)' },
  { value: 'leads',       label: 'Generate leads / inquiries' },
  { value: 'credibility', label: 'Build credibility and brand presence' },
  { value: 'rank',        label: 'Rank on Google for specific terms' },
]

const PHOTO_OPTS = [
  { value: 'yes',     label: 'Yes — professional photos/video ready to use' },
  { value: 'partial', label: 'Partial — some assets exist, some need to be created' },
  { value: 'no',      label: 'No — we\'ll need to source or plan a shoot' },
]

const BUDGET_OPTS = [
  { value: 'under1500', range: 'Under $1,500',     label: 'Single-phase or consulting only' },
  { value: '1500-3500', range: '$1,500 – $3,500',  label: '2–3 phases, focused scope' },
  { value: '3500-6600', range: '$3,500 – $6,600',  label: 'Full project package' },
  { value: '6600plus',  range: '$6,600+',           label: 'Full package + retainer' },
  { value: 'unsure',    range: 'Not sure yet',      label: "Let's talk and figure out what makes sense" },
]

const TIMELINE_OPTS = [
  { value: 'asap',      label: 'As soon as possible — this is urgent' },
  { value: '1month',    label: 'Within 1 month' },
  { value: '2-3months', label: '2–3 months — no rush, do it right' },
  { value: 'exploring', label: 'Still exploring — just gathering information' },
]

const STEP_LABELS = ['Your Business','Your Customer','Brand & Aesthetic','Project Scope','Investment & Timeline']

/* ═══════════════════════════════════════════
   FIELD COMPONENTS
═══════════════════════════════════════════ */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="si-field">
      <label className="si-label">{label}</label>
      {hint && <span className="si-hint">{hint}</span>}
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return <input className="si-input" type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
}

function Textarea({ value, onChange, placeholder, minHeight = 90 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; minHeight?: number
}) {
  return (
    <textarea
      className="si-input si-textarea"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ minHeight }}
    />
  )
}

function RadioRow({ name, value, checked, onChange, label, sub }: {
  name: string; value: string; checked: boolean; onChange: () => void; label: string; sub?: string
}) {
  return (
    <label className={`si-check-row ${checked ? 'si-checked' : ''}`}>
      <div className={`si-radio ${checked ? 'si-radio-on' : ''}`} onClick={onChange} />
      <div className="si-check-label" onClick={onChange}>
        {label}
        {sub && <span className="si-sublabel">{sub}</span>}
      </div>
    </label>
  )
}

function CheckRow({ value, checked, onChange, label, sub }: {
  value: string; checked: boolean; onChange: () => void; label: string; sub?: string
}) {
  return (
    <label className={`si-check-row ${checked ? 'si-checked' : ''}`}>
      <div className={`si-checkbox ${checked ? 'si-checkbox-on' : ''}`} onClick={onChange}>
        {checked && <span style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'8px', color:'var(--bg)', fontWeight:'bold', lineHeight:1 }}>✓</span>}
      </div>
      <div className="si-check-label" onClick={onChange}>
        {label}
        {sub && <span className="si-sublabel">{sub}</span>}
      </div>
    </label>
  )
}

/* ═══════════════════════════════════════════
   LOGO (reuse same SVG as main page)
═══════════════════════════════════════════ */
function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="zGradS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A6030"/><stop offset="30%" stopColor="#C4965A"/>
          <stop offset="55%" stopColor="#FAECC8"/><stop offset="75%" stopColor="#C4965A"/>
          <stop offset="100%" stopColor="#7A5020"/>
        </linearGradient>
        <linearGradient id="gGradS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5A7A96"/><stop offset="40%" stopColor="#8AACCC"/>
          <stop offset="65%" stopColor="#D0E4F4"/><stop offset="100%" stopColor="#3D5A73"/>
        </linearGradient>
        <linearGradient id="shineS" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
          <stop offset="50%" stopColor="rgba(255,255,255,0.35)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="2 0" dur="3s" repeatCount="indefinite"/>
        </linearGradient>
        <filter id="g3dS">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.7)"/>
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(196,150,90,0.4)"/>
        </filter>
        <filter id="g3dGS">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.7)"/>
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(90,122,150,0.4)"/>
        </filter>
      </defs>
      <rect x="3" y="3" width="32" height="32" rx="2" fill="rgba(196,150,90,0.08)" stroke="rgba(196,150,90,0.2)" strokeWidth="0.5"/>
      <g filter="url(#g3dGS)" transform="translate(1,0)">
        <path d="M 22 9 A 10 10 0 1 0 28 25 L 28 19 L 23 19" fill="none" stroke="url(#gGradS)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 22 9 A 10 10 0 1 0 28 25 L 28 19 L 23 19" fill="none" stroke="url(#shineS)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g filter="url(#g3dS)" transform="translate(-1,0)">
        <polyline points="9,9 25,9 9,27 25,27" fill="none" stroke="url(#zGradS)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9,9 25,9 9,27 25,27" fill="none" stroke="url(#shineS)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function StartPage() {
  const [step, setStep]       = useState(1)
  const [animDir, setAnimDir] = useState<'forward' | 'back'>('forward')
  const [animating, setAnimating] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData]       = useState<FormData>(INITIAL)

  const TOTAL = 5
  const pct   = submitted ? 100 : Math.round((step / TOTAL) * 100)

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  function navigate(dir: 'forward' | 'back') {
    if (animating) return
    setAnimating(true)
    setAnimDir(dir)
    setTimeout(() => {
      if (dir === 'forward') {
        if (step < TOTAL) setStep(s => s + 1)
        else setSubmitted(true)
      } else {
        setStep(s => Math.max(1, s - 1))
      }
      setAnimating(false)
    }, 320)
  }

  function toggleService(v: string) {
    set('services', data.services.includes(v)
      ? data.services.filter(s => s !== v)
      : [...data.services, v]
    )
  }

  function toggleTag(tag: string) {
    set('toneTags', data.toneTags.includes(tag)
      ? data.toneTags.filter(t => t !== tag)
      : data.toneTags.length < 6 ? [...data.toneTags, tag] : data.toneTags
    )
  }

  function updateRefSite(i: number, field: 'url' | 'why', val: string) {
    const next = [...data.refSites]
    next[i] = { ...next[i], [field]: val }
    set('refSites', next)
  }

  function addRefSite() {
    if (data.refSites.length < 6) set('refSites', [...data.refSites, { url: '', why: '' }])
  }

  const animClass = animating
    ? (animDir === 'forward' ? 'si-step-exit' : 'si-step-exit-back')
    : ''

  /* ── CONFIRMATION SCREEN ──────────────────── */
  if (submitted) {
    const selectedServices = PHASES.filter(p => data.services.includes(p.value)).map(p => p.label)
    const budgetOpt  = BUDGET_OPTS.find(b => b.value === data.budget)
    const timelineOpt = TIMELINE_OPTS.find(t => t.value === data.timeline)
    return (
      <>
        <NavBar />
        <div className="si-page">
          <div className="si-split">
            <LeftPanel step={0} submitted />
            <div className="si-right">
              <ProgressBar pct={100} step={0} total={TOTAL} submitted />
              <div className="si-confirm">
                <div className="si-confirm-mark"><div className="si-confirm-mark-inner" /></div>
                <h2 className="si-confirm-h2">Brief <em>received.</em></h2>
                <p className="si-confirm-body">
                  Your project brief has been submitted. <strong>Alex will review it personally</strong> and get back to you within one business day to schedule your call.
                </p>
                <div className="si-confirm-details">
                  {[
                    ['Name', data.yourName || '—'],
                    ['Business', data.bizName || '—'],
                    ['Email', data.email || '—'],
                    ['Services', selectedServices.length ? selectedServices.join(', ') : 'TBD on call'],
                    ['Budget', budgetOpt?.range || 'TBD'],
                    ['Timeline', timelineOpt?.label || 'TBD'],
                  ].map(([k, v]) => (
                    <div key={k} className="si-confirm-row">
                      <span className="si-confirm-key">{k}</span>
                      <span className="si-confirm-val">{v}</span>
                    </div>
                  ))}
                </div>
                <p className="si-confirm-body" style={{ fontSize:'0.82rem' }}>
                  Questions? Email directly at{' '}
                  <a href="mailto:info@zaliznyakgroup.com" style={{ color:'var(--gold)' }}>info@zaliznyakgroup.com</a>
                </p>
                <Link href="/" className="btn-primary" style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', marginTop:'1.5rem' }}>
                  <span>← Back to Main Site</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar />
      <div className="si-page">
        <div className="si-split">
          <LeftPanel step={step} />
          <div className="si-right">
            <ProgressBar pct={pct} step={step} total={TOTAL} />

            <div className={`si-steps ${animClass}`}>

              {/* ── STEP 1 — Your Business ── */}
              {step === 1 && (
                <div className="si-step">
                  <div className="si-step-eye">Step 1 — Your Business</div>
                  <h2 className="si-step-h2">Tell us about<br/><em>your business.</em></h2>
                  <p className="si-step-desc">The basics — who you are and what you do. Keep it direct; we&apos;ll go deeper on the call.</p>
                  <div className="si-field-group">
                    <div className="si-field-row">
                      <Field label="Business Name">
                        <Input value={data.bizName} onChange={v => set('bizName', v)} placeholder="e.g. Raanya Studio" />
                      </Field>
                      <Field label="Your Name">
                        <Input value={data.yourName} onChange={v => set('yourName', v)} placeholder="First and last" />
                      </Field>
                    </div>
                    <Field label="Email Address">
                      <Input type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@yourbusiness.com" />
                    </Field>
                    <div className="si-field-row">
                      <Field label="Industry / Category">
                        <Input value={data.industry} onChange={v => set('industry', v)} placeholder="e.g. Beauty, E-commerce, Fintech" />
                      </Field>
                      <Field label="Business Location">
                        <Input value={data.location} onChange={v => set('location', v)} placeholder="e.g. San Diego, CA" />
                      </Field>
                    </div>
                    <Field label="What does your business do?">
                      <Textarea value={data.bizDesc} onChange={v => set('bizDesc', v)} placeholder="One or two sentences. What do you offer, and who do you serve?" />
                    </Field>
                    <Field label="Current Website (if any)" hint="Leave blank if you don't have one yet.">
                      <Input type="url" value={data.currentSite} onChange={v => set('currentSite', v)} placeholder="https://..." />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── STEP 2 — Your Customer ── */}
              {step === 2 && (
                <div className="si-step">
                  <div className="si-step-eye">Step 2 — Your Customer</div>
                  <h2 className="si-step-h2">Who are you<br/>building this <em>for?</em></h2>
                  <p className="si-step-desc">The best websites are built for a specific person. Help us understand yours.</p>
                  <div className="si-field-group">
                    <Field label="Describe your ideal customer">
                      <Textarea
                        value={data.idealCustomer}
                        onChange={v => set('idealCustomer', v)}
                        placeholder="Age, location, lifestyle, what they care about. Be specific — 'women 28–45 in San Diego who invest in self-care' beats 'anyone who needs my service'."
                        minHeight={110}
                      />
                    </Field>
                    <Field label="What problem do you solve for them?">
                      <Textarea value={data.problem} onChange={v => set('problem', v)} placeholder="What pain, frustration, or desire does your product or service address?" />
                    </Field>
                    <Field label="What makes you different from competitors?">
                      <Textarea value={data.differentiator} onChange={v => set('differentiator', v)} placeholder="What do you do better, differently, or more specifically than anyone else in your market?" />
                    </Field>
                    <Field label="Name 2–3 direct competitors (optional)" hint="We'll audit their digital presence as part of your project.">
                      <Input value={data.competitors} onChange={v => set('competitors', v)} placeholder="e.g. competitor-a.com, competitor-b.com" />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── STEP 3 — Brand & Aesthetic ── */}
              {step === 3 && (
                <div className="si-step">
                  <div className="si-step-eye">Step 3 — Brand &amp; Aesthetic</div>
                  <h2 className="si-step-h2">The look<br/>and <em>feel.</em></h2>
                  <p className="si-step-desc">The more specific you are here, the more precisely we match your vision — and the fewer revision rounds needed.</p>
                  <div className="si-field-group">

                    <Field label="Do you have existing brand assets?">
                      {[
                        { value: 'yes-complete', label: 'Yes — logo, colors, and fonts defined', sub: 'I can describe or share them below' },
                        { value: 'yes-partial',  label: 'Partial — logo exists but colors/fonts are undefined' },
                        { value: 'no',           label: 'No — starting fresh, all to be designed', sub: 'We\'ll develop your full visual identity' },
                      ].map(opt => (
                        <RadioRow key={opt.value} name="hasAssets" value={opt.value} label={opt.label} sub={opt.sub} checked={data.hasAssets === opt.value} onChange={() => set('hasAssets', opt.value)} />
                      ))}
                    </Field>

                    <Field label="Brand Colors" hint="Enter hex codes or describe the colors in words.">
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                        {data.colors.map((c, i) => (
                          <div key={i} style={{ display:'grid', gridTemplateColumns:'38px 1fr', gap:'0.5rem', alignItems:'center' }}>
                            <input
                              type="color"
                              value={c.hex}
                              onChange={e => {
                                const next = [...data.colors]
                                next[i] = { ...next[i], hex: e.target.value }
                                set('colors', next)
                              }}
                              className="si-color-swatch"
                            />
                            <input
                              type="text"
                              className="si-input"
                              value={c.label}
                              onChange={e => {
                                const next = [...data.colors]
                                next[i] = { ...next[i], label: e.target.value }
                                set('colors', next)
                              }}
                              placeholder={i === 0 ? 'Primary — e.g. deep navy #0D1B2A' : i === 1 ? 'Secondary or background' : 'Accent (optional)'}
                            />
                          </div>
                        ))}
                      </div>
                    </Field>

                    <Field label="Reference Websites (3–5 you admire)" hint="Sites you love the look of — doesn't have to be your industry. Note what specifically appeals to you.">
                      <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                        {data.refSites.map((s, i) => (
                          <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:'0.5rem' }}>
                            <div>
                              <div className="si-ref-num">0{i+1}</div>
                              <input type="url" className="si-input" value={s.url} onChange={e => updateRefSite(i, 'url', e.target.value)} placeholder="https://..." />
                            </div>
                            <div>
                              <div className="si-ref-num">Why you like it</div>
                              <input type="text" className="si-input" value={s.why} onChange={e => updateRefSite(i, 'why', e.target.value)} placeholder="e.g. Dark, editorial, great photography" />
                            </div>
                          </div>
                        ))}
                        {data.refSites.length < 6 && (
                          <button type="button" className="si-add-link" onClick={addRefSite}>+ Add another reference</button>
                        )}
                      </div>
                    </Field>

                    <Field label="Brand Tone (select up to 6)" hint="Pick words that describe the feeling you want to project.">
                      <div className="si-tag-wrap">
                        {TONE_TAGS.map(tag => (
                          <button key={tag} type="button" className={`si-tag ${data.toneTags.includes(tag) ? 'si-tag-on' : ''}`} onClick={() => toggleTag(tag)}>
                            {tag}
                          </button>
                        ))}
                      </div>
                      <input type="text" className="si-input" value={data.toneCustom} onChange={e => set('toneCustom', e.target.value)} placeholder="Add your own words..." style={{ marginTop:'0.6rem' }} />
                    </Field>

                    <Field label="Styles or aesthetics to avoid (optional)">
                      <Input value={data.avoid} onChange={v => set('avoid', v)} placeholder="e.g. Overly corporate, cluttered, bright colors, rounded bubbly fonts" />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── STEP 4 — Project Scope ── */}
              {step === 4 && (
                <div className="si-step">
                  <div className="si-step-eye">Step 4 — Project Scope</div>
                  <h2 className="si-step-h2">What are we<br/><em>building?</em></h2>
                  <p className="si-step-desc">Select everything that applies. We&apos;ll refine scope on our call based on what you actually need.</p>
                  <div className="si-field-group">

                    <Field label="Which services are you interested in?">
                      {PHASES.map(p => (
                        <CheckRow key={p.value} value={p.value} label={p.label} sub={p.sub} checked={data.services.includes(p.value)} onChange={() => toggleService(p.value)} />
                      ))}
                    </Field>

                    <Field label="Primary goal for this project">
                      {GOALS.map(g => (
                        <RadioRow key={g.value} name="goal" value={g.value} label={g.label} checked={data.goal === g.value} onChange={() => set('goal', g.value)} />
                      ))}
                    </Field>

                    <Field label="Do you have photography / video?">
                      {PHOTO_OPTS.map(o => (
                        <RadioRow key={o.value} name="photography" value={o.value} label={o.label} checked={data.photography === o.value} onChange={() => set('photography', o.value)} />
                      ))}
                    </Field>

                    <Field label="Anything else important to know about the project?">
                      <Textarea value={data.projectNotes} onChange={v => set('projectNotes', v)} placeholder="Special requirements, integrations you need, things you've hated about past agency experiences, anything that would help us prepare." />
                    </Field>
                  </div>
                </div>
              )}

              {/* ── STEP 5 — Budget & Timeline ── */}
              {step === 5 && (
                <div className="si-step">
                  <div className="si-step-eye">Step 5 — Investment &amp; Timeline</div>
                  <h2 className="si-step-h2">Budget and<br/><em>timing.</em></h2>
                  <p className="si-step-desc">No wrong answers here. This helps us scope the right engagement and avoid wasting each other&apos;s time.</p>
                  <div className="si-field-group">

                    <Field label="Approximate project budget">
                      <div className="si-budget-grid">
                        {BUDGET_OPTS.map(b => (
                          <div
                            key={b.value}
                            className={`si-budget-cell ${data.budget === b.value ? 'si-budget-on' : ''} ${b.value === 'unsure' ? 'si-budget-full' : ''}`}
                            onClick={() => set('budget', b.value)}
                          >
                            {data.budget === b.value && <div className="si-budget-check" />}
                            <div className="si-budget-range">{b.range}</div>
                            <div className="si-budget-label">{b.label}</div>
                          </div>
                        ))}
                      </div>
                    </Field>

                    <Field label="Preferred timeline">
                      {TIMELINE_OPTS.map(o => (
                        <label key={o.value} className={`si-timeline-row ${data.timeline === o.value ? 'si-tl-on' : ''}`} onClick={() => set('timeline', o.value)}>
                          <div className={`si-radio ${data.timeline === o.value ? 'si-radio-on' : ''}`} />
                          <span className="si-check-label">{o.label}</span>
                        </label>
                      ))}
                    </Field>

                    <Field label="How did you hear about The Zaliznyak Group?">
                      <Input value={data.referral} onChange={v => set('referral', v)} placeholder="e.g. Referral from Raanya, Google search, LinkedIn..." />
                    </Field>

                    <Field label="Anything else before we talk?">
                      <Textarea value={data.finalNotes} onChange={v => set('finalNotes', v)} placeholder="Questions, concerns, things you want to cover on the call..." />
                    </Field>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="si-nav">
              <button className={`si-btn-back ${step > 1 ? 'si-btn-back-vis' : ''}`} onClick={() => navigate('back')}>
                ← Previous
              </button>
              <button className="btn-primary si-btn-next" onClick={() => navigate('forward')}>
                <span>{step === TOTAL ? 'Submit Brief →' : 'Continue →'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════
   NAV BAR
═══════════════════════════════════════════ */
function NavBar() {
  return (
    <nav className="scrolled">
      <div className="nav-logo">
        <LogoMark />
        <span className="nav-name">The Zaliznyak Group</span>
      </div>
      <Link href="/" className="si-nav-back">← Back to main site</Link>
    </nav>
  )
}

/* ═══════════════════════════════════════════
   LEFT PANEL
═══════════════════════════════════════════ */
function LeftPanel({ step, submitted = false }: { step: number; submitted?: boolean }) {
  return (
    <div className="si-left">
      <div className="si-left-content">
        <div className="s-eye">Client Intake Brief</div>
        <h1 className="si-left-h1">Let&apos;s build<br/>something<br/><em>exceptional.</em></h1>
        <p className="si-left-sub">This brief takes about 8 minutes. It ensures the conversation we have is focused, informed, and worth your time — and ours.</p>

        <div className="si-indicators">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            const isActive = !submitted && step === n
            const isDone   = submitted || step > n
            return (
              <div key={n} className={`si-ind ${isActive ? 'si-ind-active' : ''} ${isDone ? 'si-ind-done' : ''}`}>
                <div className="si-ind-dot" />
                <span>{label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="si-left-footer">
        Responses reviewed personally by Alex Zaliznyak.<br/>
        You&apos;ll hear back within one business day.<br/><br/>
        <a href="mailto:info@zaliznyakgroup.com">info@zaliznyakgroup.com</a><br/>
        <a href="tel:8582810071">(858) 281-0071</a>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════ */
function ProgressBar({ pct, step, total, submitted = false }: {
  pct: number; step: number; total: number; submitted?: boolean
}) {
  return (
    <div className="si-progress">
      <div className="si-progress-label">
        <span>{submitted ? 'Complete' : `Step ${step} of ${total}`}</span>
        <span>{pct}%</span>
      </div>
      <div className="si-progress-track">
        <div className="si-progress-fill" style={{ width: `${pct}%` } as CSSProperties} />
      </div>
    </div>
  )
}
