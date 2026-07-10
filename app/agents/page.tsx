'use client'

import { useEffect, useState } from 'react'

/* ═══════════════════════════════════════════
   AGENTS PAGE - /agents
   Applied Patterns for AI Agents · Zaliznyak Group
═══════════════════════════════════════════ */

const PATTERNS = [
  { id: 'pattern-01', label: '01 · Inbound' },
  { id: 'pattern-02', label: '02 · Reporting' },
  { id: 'pattern-03', label: '03 · Research' },
  { id: 'pattern-04', label: '04 · Meeting Notes' },
  { id: 'pattern-05', label: '05 · Status' },
  { id: 'pattern-06', label: '06 · Sales Follow-Up' },
  { id: 'pattern-07', label: '07 · Knowledge' },
]

export default function AgentsPage() {
  const [activePattern, setActivePattern] = useState('pattern-01')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePattern(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    PATTERNS.forEach((p) => {
      const el = document.getElementById(p.id)
      if (el) observer.observe(el)
    })

    const onScroll = () => setShowBackToTop(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollToPattern = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ═══ PAGE HERO ═══ */}
      <section className="agents-hero">
        <div className="max-w">
          <div className="agents-hero-eyebrow">Applied Patterns · Zaliznyak Group</div>
          <h1 className="agents-hero-h1">
            Seven ways AI agents earn their keep for teams that need <em>hours back.</em>
          </h1>
          <p className="agents-hero-thesis">
            What follows is a set of applied patterns for putting AI agents to work on real business problems. These are not delivered case studies. They are the patterns I return to when scoping automation work, with a look at how the architecture holds together and what the return typically looks like in practice.
          </p>
        </div>
      </section>

      {/* ═══ STICKY PATTERN NAV ═══ */}
      <nav className="pattern-nav" aria-label="Pattern navigation">
        <div className="max-w">
          <div className="pattern-nav-list">
            {PATTERNS.map((p) => (
              <button
                key={p.id}
                className={`pattern-nav-item ${activePattern === p.id ? 'is-active' : ''}`}
                onClick={() => scrollToPattern(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ PATTERN 01 · Inbound Response Agent ═══ */}
      <article id="pattern-01" className="pattern">
        <div className="max-w">

          <header className="pattern-header">
            <div className="pattern-num">Pattern 01</div>
            <h2 className="pattern-name">The Reservation and Inbound <em>Response Agent</em></h2>
            <p className="pattern-summary">
              Every business with a customer-facing phone line, chat, or web form is losing revenue to inbound requests that go unanswered outside business hours, sit too long in a queue, or reach the wrong person. This pattern gives the team a reliable way to capture, sort, and respond to inbound demand at any hour of the day.
            </p>
          </header>

          <section className="pattern-section">
            <div className="section-label">The Problem</div>
            <p className="section-body">
              Inbound demand does not respect business hours. Appointment calls, reservation requests, quote inquiries, and support tickets arrive throughout the day and night. The people who answer them work in shifts. What happens in the gap is predictable. Calls go to voicemail and never get returned. Web form submissions sit overnight and lose to whoever answers first the next morning. A support ticket lands in the wrong queue and takes three days to reach the right person.
            </p>
            <p className="section-body">
              The cost is quiet but real. In most businesses nobody owns the metric for missed inbound, so nobody measures it. Every operator recognizes the pattern anyway. A missed reservation at 8pm is often a booking that never gets made. A quote request left overnight loses to a competitor who answered inside the hour. Front desk staff spend the first two hours of every morning digging out from a backlog they did not cause.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Architecture</div>
            <p className="section-body">
              An agent sits at the front of the inbound channel, whether that is a phone line, a chat widget, or an email inbox. It answers the first interaction. It captures what the person wants through natural conversation. Then it does one of three things. It handles the request directly when it can. It routes the request to the right queue with full context attached when a human should take it from there. It escalates immediately to a live person when the situation calls for it.
            </p>

            <div className="flowchart-frame">
              <svg className="flowchart-svg" viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-ink-1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#14171C"/>
                  </marker>
                  <marker id="arr-gold-1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#8A6F45"/>
                  </marker>
                  <marker id="arr-teal-1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3F5C6B"/>
                  </marker>
                  <marker id="arr-terra-1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86842"/>
                  </marker>
                </defs>

                <ellipse cx="80" cy="130" rx="70" ry="30" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="80" y="126" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Inbound customer</text>
                <text x="80" y="143" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">EXTERNAL</text>

                <rect x="200" y="105" width="170" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="285" y="127" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Intake channel</text>
                <text x="285" y="143" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Phone · Chat · Email · Form</text>

                <rect x="430" y="105" width="180" height="50" fill="none" stroke="#8A6F45" strokeWidth="2"/>
                <text x="520" y="127" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="600" fill="#14171C">Agent core</text>
                <text x="520" y="143" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Intent · Classification</text>

                <polygon points="770,130 850,90 930,130 850,170" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="850" y="127" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Request type?</text>
                <text x="850" y="143" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#6E7079">DECISION</text>

                <line x1="150" y1="130" x2="195" y2="130" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-1)"/>
                <line x1="370" y1="130" x2="425" y2="130" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-1)"/>
                <line x1="610" y1="130" x2="765" y2="130" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-1)"/>

                <rect x="80" y="260" width="180" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="170" y="282" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Auto-complete</text>
                <text x="170" y="298" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Book, schedule, confirm</text>

                <rect x="410" y="260" width="180" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="500" y="282" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Route with context</text>
                <text x="500" y="298" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Queue + transcript</text>

                <rect x="740" y="260" width="180" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="830" y="282" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Escalate live</text>
                <text x="830" y="298" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Human handoff, warm</text>

                <path d="M 820 165 Q 500 200 170 258" fill="none" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-1)"/>
                <line x1="850" y1="170" x2="500" y2="258" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-1)"/>
                <path d="M 890 165 Q 870 210 830 258" fill="none" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-1)"/>

                <text x="450" y="215" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#8A6F45" fontWeight="500">SIMPLE</text>
                <text x="710" y="215" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#8A6F45" fontWeight="500">STRUCTURED</text>
                <text x="930" y="215" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#8A6F45" fontWeight="500">URGENT</text>

                <g>
                  <ellipse cx="170" cy="370" rx="80" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="90" y1="370" x2="90" y2="405" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="250" y1="370" x2="250" y2="405" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 90 405 A 80 8 0 0 0 250 405" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="170" y="392" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Scheduling system</text>
                </g>

                <g>
                  <ellipse cx="500" cy="370" rx="80" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="420" y1="370" x2="420" y2="405" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="580" y1="370" x2="580" y2="405" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 420 405 A 80 8 0 0 0 580 405" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="500" y="392" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">CRM / ticket system</text>
                </g>

                <ellipse cx="830" cy="380" rx="80" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="830" y="378" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Live coordinator</text>
                <text x="830" y="393" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">EXTERNAL</text>

                <line x1="170" y1="310" x2="170" y2="360" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-1)"/>
                <line x1="500" y1="310" x2="500" y2="360" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-1)"/>
                <line x1="830" y1="310" x2="830" y2="352" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-1)"/>

                <path d="M 950 370 Q 1050 370 1050 250 Q 1050 130 950 130" fill="none" stroke="#8A6F45" strokeWidth="1.5" strokeDasharray="5,4" markerEnd="url(#arr-gold-1)"/>
                <text x="1055" y="255" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#6E7079" transform="rotate(90 1055 255)">HUMAN REVIEW LOOP</text>
              </svg>
            </div>

            <p className="section-body">
              The key architectural choice is that the agent handles what it handles well and hands off cleanly for everything else. Returning customers booking their usual appointment get an immediate confirmation. Complicated or unfamiliar requests get routed to the right human with the full conversation transcript already attached. Emergencies trigger a live handoff on the spot. This is what separates an agent that gets adopted from one that gets turned off after two weeks of missed handoffs.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Payoff</div>

            <div className="payoff-assumptions">
              <strong>How the math typically works.</strong> Four separate revenue streams tend to move when a business puts this pattern in place. Missed inbound gets recovered and converted. No-show rates drop because reminders and confirmations happen without human intervention. Downstream administrative tasks like insurance verification or claim work get automated. And post-visit or post-purchase follow-ups get sent consistently instead of when someone remembers. The numbers below reflect a primary care clinic with 2 to 3 physicians, 800 to 1,200 monthly inbound calls, and $235 average revenue per visit. The methodology scales up or down to any team with an inbound funnel.
            </div>

            <div className="payoff-panels">
              <div className="payoff-panel">
                <div className="payoff-panel-label">Time Recovered</div>
                <div className="payoff-panel-value">80+ hrs</div>
                <div className="payoff-panel-unit">per month, freed from inbound triage and follow-up</div>
              </div>
              <div className="payoff-panel">
                <div className="payoff-panel-label">Net Monthly Gain</div>
                <div className="payoff-panel-value">$15K</div>
                <div className="payoff-panel-unit">after all subscription and operating costs</div>
              </div>
            </div>

            <p className="payoff-translation">
              For a mid-size clinic, that is roughly the equivalent of a second full-time front desk hire, without adding a second full-time front desk hire.
            </p>
          </section>

          <section className="pattern-section">
            <div className="stack-row">
              <div className="stack-label">Stack</div>
              <div className="stack-value">
                Twilio for the phone line and SMS. Whisper for turning speech into text the agent can work with. LangChain for orchestration and intent routing. Anthropic Claude for the conversation itself. Direct integrations to whichever scheduling system the team already runs, whether that is Athena Health, Epic, Cerner, or something lighter. A small Flask review interface for human sign-off on the small percentage of interactions that are not clear-cut.
              </div>
            </div>
          </section>

          <div className="pattern-footer">
            This pattern is grounded in <strong>CareDesk AI</strong>, a HIPAA-compliant AI receptionist for primary care clinics that I designed and prototyped in 2025. Architecture, data pipeline, demo interface, and ROI model built end to end.
          </div>

        </div>
      </article>

      {/* ═══ PATTERN 02 · Reporting and Update Agent ═══ */}
      <article id="pattern-02" className="pattern pattern--alt">
        <div className="max-w">

          <header className="pattern-header">
            <div className="pattern-num">Pattern 02</div>
            <h2 className="pattern-name">The Reporting and <em>Update Agent</em></h2>
            <p className="pattern-summary">
              Every leadership team runs on regular updates: the weekly sales pipeline snapshot, the monthly financial roll-up, the quarterly commercial scorecard. Someone spends hours pulling data from three or four systems, reconciling small inconsistencies, and writing the narrative around the numbers. This pattern gives that time back.
            </p>
          </header>

          <section className="pattern-section">
            <div className="section-label">The Problem</div>
            <p className="section-body">
              Leadership updates are a tax on the smartest people in the organization. The analyst or ops manager who owns the weekly commercial report typically spends four to six hours every Monday pulling from the CRM, exporting to the BI tool, cross-checking against last week, formatting the deck, and writing the narrative summary. By the time the update lands in front of leadership on Tuesday, the data is already three days old and the analyst has spent a fifth of their week on report production instead of analysis.
            </p>
            <p className="section-body">
              The report gets built, the meeting happens, and the cycle starts again the next week. Nobody questions the workflow because everyone accepts it as the cost of running a data-driven business. What is actually being lost is the analytical thinking that a senior analyst could be doing if they were not producing the same report every week.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Architecture</div>
            <p className="section-body">
              An agent runs on a scheduled cadence, weekly or monthly, and pulls structured data through APIs from the source systems the team already runs. It applies a defined set of transformations and comparisons against the prior period. A language model layer generates a narrative summary in the organization's normal voice, highlighting movement worth noting and framing the numbers with context. The draft update lands in a Slack channel or an email inbox where the owner reviews it, adjusts the framing where needed, and sends it to leadership.
            </p>

            <div className="flowchart-frame">
              <svg className="flowchart-svg" viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-ink-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#14171C"/>
                  </marker>
                  <marker id="arr-gold-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#8A6F45"/>
                  </marker>
                  <marker id="arr-teal-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3F5C6B"/>
                  </marker>
                  <marker id="arr-terra-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86842"/>
                  </marker>
                </defs>

                {/* Left column: 4 data sources */}
                <g>
                  <ellipse cx="90" cy="60" rx="70" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="60" x2="20" y2="95" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="160" y1="60" x2="160" y2="95" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 95 A 70 8 0 0 0 160 95" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="80" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">CRM</text>
                </g>
                <g>
                  <ellipse cx="90" cy="150" rx="70" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="150" x2="20" y2="185" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="160" y1="150" x2="160" y2="185" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 185 A 70 8 0 0 0 160 185" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="170" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">BI / Warehouse</text>
                </g>
                <g>
                  <ellipse cx="90" cy="240" rx="70" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="240" x2="20" y2="275" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="160" y1="240" x2="160" y2="275" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 275 A 70 8 0 0 0 160 275" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="260" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Finance</text>
                </g>
                <g>
                  <ellipse cx="90" cy="330" rx="70" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="330" x2="20" y2="365" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="160" y1="330" x2="160" y2="365" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 365 A 70 8 0 0 0 160 365" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="350" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Ticketing / Ops</text>
                </g>

                {/* Middle: Scheduler + Agent core */}
                <rect x="320" y="130" width="180" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="410" y="152" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Scheduler</text>
                <text x="410" y="168" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Weekly · Monthly</text>

                <rect x="320" y="220" width="180" height="55" fill="none" stroke="#8A6F45" strokeWidth="2"/>
                <text x="410" y="243" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="600" fill="#14171C">Agent core</text>
                <text x="410" y="260" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Transform · Narrate</text>

                {/* Arrows: sources → agent core */}
                <path d="M 160 78 Q 240 190 320 235" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-2)"/>
                <path d="M 160 168 Q 240 200 320 240" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-2)"/>
                <path d="M 160 258 Q 240 255 320 250" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-2)"/>
                <path d="M 160 348 Q 240 305 320 260" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-2)"/>

                <line x1="410" y1="180" x2="410" y2="218" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-2)"/>

                {/* Right: Draft + review + leadership */}
                <rect x="620" y="220" width="180" height="55" fill="none" stroke="#8A6F45" strokeWidth="1.5"/>
                <text x="710" y="243" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Draft update</text>
                <text x="710" y="260" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Narrative + charts</text>

                <ellipse cx="920" cy="245" rx="80" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="920" y="243" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Owner review</text>
                <text x="920" y="258" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">SIGN-OFF</text>

                <ellipse cx="710" cy="370" rx="80" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="710" y="368" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Leadership</text>
                <text x="710" y="383" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">READER</text>

                <line x1="500" y1="248" x2="615" y2="248" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-2)"/>
                <line x1="800" y1="248" x2="840" y2="248" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-2)"/>
                <path d="M 900 271 Q 800 340 730 345" fill="none" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-2)"/>
              </svg>
            </div>

            <p className="section-body">
              The key architectural choice is that the agent produces a draft, not a final. Human review before distribution catches hallucinations, adds context the systems do not have, and preserves the accountability that makes leadership trust the report. This is what separates an agent that gets adopted from one that gets turned off after a bad Monday morning.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Payoff</div>

            <div className="payoff-assumptions">
              <strong>How the math typically works.</strong> Two analysts each spending four hours per week compiling and formatting the weekly commercial update, at a fully loaded rate of $90 per hour. Reports become faster to produce and are therefore produced more often. The real value is not just the hours saved. It is the shift in what those analysts do with their week when they are not building the same deck every Monday.
            </div>

            <div className="payoff-panels">
              <div className="payoff-panel">
                <div className="payoff-panel-label">Time Recovered</div>
                <div className="payoff-panel-value">32 hrs</div>
                <div className="payoff-panel-unit">per month, freed from report production</div>
              </div>
              <div className="payoff-panel">
                <div className="payoff-panel-label">Annual Value</div>
                <div className="payoff-panel-value">$35K+</div>
                <div className="payoff-panel-unit">in analyst capacity redirected to analysis</div>
              </div>
            </div>

            <p className="payoff-translation">
              For a typical commercial ops team, that is roughly one senior analyst who stops producing reports and starts producing the insights leadership actually wants from them.
            </p>
          </section>

          <section className="pattern-section">
            <div className="stack-row">
              <div className="stack-label">Stack</div>
              <div className="stack-value">
                Python for orchestration, or a low-code layer like n8n if the team prefers visual pipelines. Anthropic Claude for the narrative writing. Direct API connections to whichever CRM, BI tool, and finance system the team runs. Airflow, Prefect, or a simple cron for the scheduling layer. Slack, Teams, or email as the distribution channel.
              </div>
            </div>
          </section>

        </div>
      </article>

      {/* ═══ PATTERN 03 · Research and Monitoring Agent ═══ */}
      <article id="pattern-03" className="pattern">
        <div className="max-w">

          <header className="pattern-header">
            <div className="pattern-num">Pattern 03</div>
            <h2 className="pattern-name">The Research and <em>Monitoring Agent</em></h2>
            <p className="pattern-summary">
              Every team needs to stay on top of something external. Competitor moves, industry news, regulatory changes, key customer signals, mentions of the brand. Doing this manually means someone spends a chunk of their week reading, filtering, and forwarding. This pattern turns that into a scheduled digest.
            </p>
          </header>

          <section className="pattern-section">
            <div className="section-label">The Problem</div>
            <p className="section-body">
              Someone on every team has an unofficial job that is not in their job description. They watch the competitor sites, read the industry newsletters, monitor the LinkedIn feed for key customer announcements, and forward anything worth knowing to the group. It is the kind of task that never quite makes it onto a to-do list because it is always in the background, always half-done, and always subject to being dropped the moment anything urgent comes up.
            </p>
            <p className="section-body">
              The cost of doing this poorly is not visible day-to-day. It shows up quarters later, when a competitor launches something the team should have seen coming, or when a regulatory change catches the compliance team off guard, or when a key account signals distress on LinkedIn three weeks before they churn.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Architecture</div>
            <p className="section-body">
              An agent monitors a defined set of sources on a scheduled cadence, whether that is hourly for high-signal feeds or daily for lower-priority ones. It fetches new content, filters against relevance criteria the team has defined, and summarizes the material that made it through the filter. The output is a digest posted to a channel or emailed to the team, structured so that a busy reader can skim the headlines and dive deep only on the items that matter to them.
            </p>

            <div className="flowchart-frame">
              <svg className="flowchart-svg" viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-ink-3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#14171C"/>
                  </marker>
                  <marker id="arr-gold-3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#8A6F45"/>
                  </marker>
                  <marker id="arr-teal-3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3F5C6B"/>
                  </marker>
                  <marker id="arr-terra-3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86842"/>
                  </marker>
                </defs>

                {/* Left column: 5 sources */}
                <g>
                  <ellipse cx="80" cy="55" rx="60" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="55" x2="20" y2="85" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="140" y1="55" x2="140" y2="85" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 85 A 60 8 0 0 0 140 85" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="80" y="73" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fontWeight="500" fill="#14171C">Competitor sites</text>
                </g>
                <g>
                  <ellipse cx="80" cy="125" rx="60" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="125" x2="20" y2="155" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="140" y1="125" x2="140" y2="155" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 155 A 60 8 0 0 0 140 155" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="80" y="143" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fontWeight="500" fill="#14171C">News feeds</text>
                </g>
                <g>
                  <ellipse cx="80" cy="195" rx="60" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="195" x2="20" y2="225" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="140" y1="195" x2="140" y2="225" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 225 A 60 8 0 0 0 140 225" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="80" y="213" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fontWeight="500" fill="#14171C">LinkedIn</text>
                </g>
                <g>
                  <ellipse cx="80" cy="265" rx="60" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="265" x2="20" y2="295" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="140" y1="265" x2="140" y2="295" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 295 A 60 8 0 0 0 140 295" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="80" y="283" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fontWeight="500" fill="#14171C">SEC filings</text>
                </g>
                <g>
                  <ellipse cx="80" cy="335" rx="60" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="335" x2="20" y2="365" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="140" y1="335" x2="140" y2="365" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 365 A 60 8 0 0 0 140 365" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="80" y="353" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fontWeight="500" fill="#14171C">Podcasts</text>
                </g>

                {/* Middle: Fetcher */}
                <rect x="260" y="180" width="170" height="55" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="345" y="203" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Fetch on schedule</text>
                <text x="345" y="220" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Hourly · Daily</text>

                {/* Filter diamond */}
                <polygon points="530,207 620,170 620,240 530,275" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="575" y="212" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Relevance?</text>
                <text x="575" y="230" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#6E7079">DECISION</text>

                {/* Agent core */}
                <rect x="720" y="180" width="180" height="55" fill="none" stroke="#8A6F45" strokeWidth="2"/>
                <text x="810" y="203" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="600" fill="#14171C">Agent core</text>
                <text x="810" y="220" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Summarize · Rank</text>

                {/* Digest */}
                <rect x="960" y="180" width="130" height="55" fill="none" stroke="#8A6F45" strokeWidth="1.5"/>
                <text x="1025" y="203" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Digest</text>
                <text x="1025" y="220" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Structured</text>

                {/* Arrows: sources → fetcher */}
                <path d="M 140 73 Q 200 130 258 195" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-3)"/>
                <path d="M 140 143 Q 200 170 258 200" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-3)"/>
                <path d="M 140 213 Q 200 210 258 208" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-3)"/>
                <path d="M 140 283 Q 200 245 258 220" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-3)"/>
                <path d="M 140 353 Q 200 285 258 230" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-3)"/>

                {/* Fetcher → filter → agent → digest */}
                <line x1="430" y1="208" x2="525" y2="215" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-3)"/>
                <line x1="620" y1="205" x2="715" y2="205" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-3)"/>
                <text x="665" y="195" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#8A6F45" fontWeight="500">RELEVANT</text>
                <line x1="900" y1="207" x2="955" y2="207" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-3)"/>

                {/* Discard */}
                <line x1="575" y1="276" x2="575" y2="330" stroke="#6E7079" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arr-ink-3)"/>
                <text x="585" y="350" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#6E7079">DISCARD</text>

                {/* Team readers */}
                <ellipse cx="1025" cy="340" rx="80" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="1025" y="338" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Team members</text>
                <text x="1025" y="353" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">READERS</text>

                <line x1="1025" y1="235" x2="1025" y2="313" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-3)"/>
              </svg>
            </div>

            <p className="section-body">
              The key architectural choice is what the agent chooses not to include. A digest that surfaces everything becomes noise the reader learns to skip. A digest that surfaces only what the team defined as relevant, and does so consistently, becomes the first thing they read on Monday morning. The relevance filter is where the pattern earns its keep.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Payoff</div>

            <div className="payoff-assumptions">
              <strong>How the math typically works.</strong> Two team members currently spending three hours per week each on informal monitoring across sources, at a loaded rate of $75 per hour. Most of that time is scanning and filtering rather than reading anything important. The agent absorbs the scanning work and delivers the small percentage that actually matters directly to the team.
            </div>

            <div className="payoff-panels">
              <div className="payoff-panel">
                <div className="payoff-panel-label">Time Recovered</div>
                <div className="payoff-panel-value">24 hrs</div>
                <div className="payoff-panel-unit">per month, freed from manual monitoring</div>
              </div>
              <div className="payoff-panel">
                <div className="payoff-panel-label">Annual Value</div>
                <div className="payoff-panel-value">$22K+</div>
                <div className="payoff-panel-unit">in scanning time redirected to action</div>
              </div>
            </div>

            <p className="payoff-translation">
              Beyond the direct hours, the change is that the team stops missing things. Signals that used to surface a quarter late show up in the Monday digest instead.
            </p>
          </section>

          <section className="pattern-section">
            <div className="stack-row">
              <div className="stack-label">Stack</div>
              <div className="stack-value">
                Python for orchestration and source fetching, or Zapier for teams that want a lower-code path. RSS parsers and web scraping libraries for pulling from public sources. Anthropic Claude for summarization and relevance filtering. A vector database like Pinecone or a lighter alternative for deduplication across sources. Slack or email as the delivery channel.
              </div>
            </div>
          </section>

        </div>
      </article>

      {/* ═══ PATTERN 04 · Meeting Notes and Action-Item Agent ═══ */}
      <article id="pattern-04" className="pattern pattern--alt">
        <div className="max-w">

          <header className="pattern-header">
            <div className="pattern-num">Pattern 04</div>
            <h2 className="pattern-name">The Meeting Notes and <em>Action-Item Agent</em></h2>
            <p className="pattern-summary">
              Meetings generate decisions and commitments. Whether those commitments turn into action depends on whether someone captured them, assigned them, and followed up. This pattern makes that whole loop automatic.
            </p>
          </header>

          <section className="pattern-section">
            <div className="section-label">The Problem</div>
            <p className="section-body">
              A meeting ends. Someone said they would send the deck by Thursday. Someone else agreed to loop in legal on the contract. A third person committed to opening a JIRA ticket for the design change. If nobody wrote those down, they will not happen. If somebody did write them down, they wrote them in a notebook or a Google Doc that nobody looks at again. Two weeks later the same meeting happens with the same commitments made by the same people.
            </p>
            <p className="section-body">
              Every operator has watched this cycle. The meeting notes exist. The action items exist. What does not exist is the connective tissue between the meeting and the tools where work actually happens. That gap is where commitments go to die.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Architecture</div>
            <p className="section-body">
              An agent ingests the meeting content, whether that is a live transcript from Zoom or Teams, an uploaded recording processed through Whisper, or a text transcript from a note-taker tool. It extracts the decisions made, the action items committed to, the owners assigned, and the deadlines mentioned. It writes those into the project management system as new tasks with the right owner and due date. It sends a summary to the meeting attendees so everyone sees what got captured and can flag anything that was missed.
            </p>

            <div className="flowchart-frame">
              <svg className="flowchart-svg" viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-ink-4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#14171C"/>
                  </marker>
                  <marker id="arr-gold-4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#8A6F45"/>
                  </marker>
                  <marker id="arr-teal-4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3F5C6B"/>
                  </marker>
                  <marker id="arr-terra-4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86842"/>
                  </marker>
                </defs>

                {/* Far left: Meeting */}
                <ellipse cx="90" cy="210" rx="75" ry="28" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="90" y="207" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Meeting attendees</text>
                <text x="90" y="222" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">HUMANS</text>

                {/* Middle-left column: 3 capture options */}
                <rect x="240" y="85" width="170" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="325" y="107" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Live transcript</text>
                <text x="325" y="123" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Zoom · Teams · Meet</text>

                <rect x="240" y="185" width="170" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="325" y="207" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Recorded audio</text>
                <text x="325" y="223" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Via Whisper</text>

                <rect x="240" y="285" width="170" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="325" y="307" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Note-taker text</text>
                <text x="325" y="323" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Otter · Fireflies</text>

                {/* Meeting → capture */}
                <line x1="165" y1="200" x2="235" y2="110" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-4)"/>
                <line x1="165" y1="210" x2="235" y2="210" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-4)"/>
                <line x1="165" y1="220" x2="235" y2="310" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-4)"/>

                {/* Agent core */}
                <rect x="500" y="180" width="180" height="65" fill="none" stroke="#8A6F45" strokeWidth="2"/>
                <text x="590" y="205" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="600" fill="#14171C">Agent core</text>
                <text x="590" y="222" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Extract · Assign owners</text>
                <text x="590" y="238" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Set due dates</text>

                {/* Capture → agent */}
                <path d="M 410 110 Q 460 160 500 200" fill="none" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-4)"/>
                <line x1="410" y1="210" x2="500" y2="212" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-4)"/>
                <path d="M 410 310 Q 460 265 500 230" fill="none" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-4)"/>

                {/* Right column: outputs */}
                <g>
                  <ellipse cx="880" cy="100" rx="80" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="800" y1="100" x2="800" y2="135" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="960" y1="100" x2="960" y2="135" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 800 135 A 80 8 0 0 0 960 135" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="880" y="120" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Project system</text>
                </g>

                <g>
                  <ellipse cx="880" cy="220" rx="80" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="800" y1="220" x2="800" y2="255" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="960" y1="220" x2="960" y2="255" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 800 255 A 80 8 0 0 0 960 255" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="880" y="240" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Doc / wiki</text>
                </g>

                <ellipse cx="880" cy="345" rx="85" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="880" y="343" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Summary to team</text>
                <text x="880" y="358" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">SLACK · EMAIL</text>

                {/* Agent → outputs */}
                <path d="M 680 190 Q 740 140 800 115" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-4)"/>
                <line x1="680" y1="215" x2="800" y2="220" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-4)"/>
                <path d="M 680 240 Q 750 300 800 335" fill="none" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-4)"/>
              </svg>
            </div>

            <p className="section-body">
              The key architectural choice is that the tasks land in the tool where work already happens. A summary emailed to the team is nice. A task appearing in Linear with the owner assigned and the due date set is the thing that actually changes behavior. This is the difference between an agent that produces artifacts and an agent that produces outcomes.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Payoff</div>

            <div className="payoff-assumptions">
              <strong>How the math typically works.</strong> A team of eight averaging four meetings per week each, with a rough estimate that 15 minutes of post-meeting admin per meeting gets skipped or done poorly. That is two hours of unpaid tax per person per week, plus the harder-to-measure cost of dropped commitments and repeated conversations. This pattern absorbs the admin and preserves the commitments.
            </div>

            <div className="payoff-panels">
              <div className="payoff-panel">
                <div className="payoff-panel-label">Time Recovered</div>
                <div className="payoff-panel-value">64 hrs</div>
                <div className="payoff-panel-unit">per month across an 8-person team</div>
              </div>
              <div className="payoff-panel">
                <div className="payoff-panel-label">Annual Value</div>
                <div className="payoff-panel-value">$60K+</div>
                <div className="payoff-panel-unit">in meeting admin plus recovered follow-through</div>
              </div>
            </div>

            <p className="payoff-translation">
              The harder-to-quantify win is that meetings start ending with real accountability instead of a shared assumption that someone else is writing it down.
            </p>
          </section>

          <section className="pattern-section">
            <div className="stack-row">
              <div className="stack-label">Stack</div>
              <div className="stack-value">
                Otter, Fireflies, or Fathom for the meeting capture layer, or Whisper if the team wants to process recordings directly. Anthropic Claude for extraction, decision parsing, and summary writing. Direct API integrations to whichever PM tool the team runs, plus Notion or Confluence for the long-form record. Slack for team summaries.
              </div>
            </div>
          </section>

        </div>
      </article>

      {/* ═══ PATTERN 05 · Project Status Agent ═══ */}
      <article id="pattern-05" className="pattern">
        <div className="max-w">

          <header className="pattern-header">
            <div className="pattern-num">Pattern 05</div>
            <h2 className="pattern-name">The Project <em>Status Agent</em></h2>
            <p className="pattern-summary">
              Every team wastes time answering "what is the status of X." Standups exist for this. Weekly status decks exist for this. Slack updates exist for this. This pattern replaces most of that overhead by turning the tools where work actually happens into a living status feed.
            </p>
          </header>

          <section className="pattern-section">
            <div className="section-label">The Problem</div>
            <p className="section-body">
              Status is a paradox in most teams. Everyone wants to know where things stand. Nobody wants to write the status update. The information exists in the project tool, in the code repository, in the ticket queue, in the design file. Assembling it into a coherent picture takes the manager or PM a couple of hours every week, plus another few hours of meeting time to communicate what could have been read in five minutes if it were written down.
            </p>
            <p className="section-body">
              Async status updates in Slack are the current best answer, but they push the writing work onto every individual contributor. What most teams actually want is the assembled picture without anyone having to assemble it.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Architecture</div>
            <p className="section-body">
              An agent reads state changes across the tools where work happens: task movement in Linear or JIRA, pull request activity in GitHub, status changes in Asana, comments and mentions in Slack. It rolls that up on a defined cadence (daily standup, weekly team update, monthly leadership roll-up) into a written status that reads like a human wrote it. It highlights what shipped, what is blocked, what is stale, and what needs a decision. The manager reviews and edits the draft before it goes out, or the agent posts it directly for lower-stakes updates.
            </p>

            <div className="flowchart-frame">
              <svg className="flowchart-svg" viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-ink-5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#14171C"/>
                  </marker>
                  <marker id="arr-gold-5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#8A6F45"/>
                  </marker>
                  <marker id="arr-teal-5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3F5C6B"/>
                  </marker>
                  <marker id="arr-terra-5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86842"/>
                  </marker>
                </defs>

                {/* Left column: 4 work tools */}
                <g>
                  <ellipse cx="90" cy="60" rx="70" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="60" x2="20" y2="95" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="160" y1="60" x2="160" y2="95" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 95 A 70 8 0 0 0 160 95" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="80" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Project tool</text>
                </g>
                <g>
                  <ellipse cx="90" cy="150" rx="70" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="150" x2="20" y2="185" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="160" y1="150" x2="160" y2="185" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 185 A 70 8 0 0 0 160 185" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="170" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Code repo</text>
                </g>
                <g>
                  <ellipse cx="90" cy="240" rx="70" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="240" x2="20" y2="275" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="160" y1="240" x2="160" y2="275" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 275 A 70 8 0 0 0 160 275" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="260" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Chat / mentions</text>
                </g>
                <g>
                  <ellipse cx="90" cy="330" rx="70" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="20" y1="330" x2="20" y2="365" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="160" y1="330" x2="160" y2="365" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 20 365 A 70 8 0 0 0 160 365" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="350" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Design / spec</text>
                </g>

                {/* Middle: Cadence + Agent */}
                <rect x="290" y="130" width="180" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="380" y="152" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Cadence trigger</text>
                <text x="380" y="168" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Daily · Weekly</text>

                <rect x="290" y="220" width="180" height="65" fill="none" stroke="#8A6F45" strokeWidth="2"/>
                <text x="380" y="245" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="600" fill="#14171C">Agent core</text>
                <text x="380" y="262" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Roll up · Categorize</text>
                <text x="380" y="277" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Shipped · Blocked · Stale</text>

                {/* Sources → agent */}
                <path d="M 160 78 Q 220 175 288 235" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-5)"/>
                <path d="M 160 168 Q 220 200 288 240" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-5)"/>
                <path d="M 160 258 Q 220 258 288 258" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-5)"/>
                <path d="M 160 348 Q 220 305 288 275" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-5)"/>

                <line x1="380" y1="180" x2="380" y2="218" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-5)"/>

                {/* Draft status */}
                <rect x="580" y="220" width="180" height="65" fill="none" stroke="#8A6F45" strokeWidth="1.5"/>
                <text x="670" y="245" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Draft status</text>
                <text x="670" y="262" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Structured update</text>
                <text x="670" y="277" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Highlights + risks</text>

                <line x1="470" y1="252" x2="575" y2="252" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-5)"/>

                {/* Right: Manager review + Team delivery */}
                <ellipse cx="880" cy="150" rx="85" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="880" y="148" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Manager review</text>
                <text x="880" y="163" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">OPTIONAL</text>

                <ellipse cx="880" cy="350" rx="90" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="880" y="348" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Team / leadership</text>
                <text x="880" y="363" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">DELIVERY</text>

                <path d="M 760 235 Q 830 200 810 173" fill="none" stroke="#14171C" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arr-ink-5)"/>
                <path d="M 800 175 Q 860 260 870 322" fill="none" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-5)"/>
                <path d="M 760 270 Q 830 310 810 325" fill="none" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-5)"/>
              </svg>
            </div>

            <p className="section-body">
              The key architectural choice is what the agent categorizes. A dump of everything that happened this week is not a status update. A structured breakdown of what shipped, what is blocked, what has gone stale, and what needs a decision is a status update. The categorization is where the pattern becomes useful instead of just informative.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Payoff</div>

            <div className="payoff-assumptions">
              <strong>How the math typically works.</strong> A team of ten with a PM or engineering manager spending three hours per week compiling status updates and running standups that exist primarily to share status. Individual contributors also spend roughly 20 minutes per week writing async updates. At loaded rates of $95 per hour for the manager and $70 for ICs, this pattern pays back its own build cost in the first quarter.
            </div>

            <div className="payoff-panels">
              <div className="payoff-panel">
                <div className="payoff-panel-label">Time Recovered</div>
                <div className="payoff-panel-value">27 hrs</div>
                <div className="payoff-panel-unit">per month across the team</div>
              </div>
              <div className="payoff-panel">
                <div className="payoff-panel-label">Annual Value</div>
                <div className="payoff-panel-value">$28K+</div>
                <div className="payoff-panel-unit">plus fewer meetings that exist only for status</div>
              </div>
            </div>

            <p className="payoff-translation">
              Standups often survive. But they change from "everyone says what they are working on" to "we all read the update in advance and only talk about what needs discussing."
            </p>
          </section>

          <section className="pattern-section">
            <div className="stack-row">
              <div className="stack-label">Stack</div>
              <div className="stack-value">
                Direct API integrations to Linear, JIRA, GitHub, Slack, and Notion. Python for orchestration, or n8n for teams that prefer visual pipelines. Anthropic Claude for the narrative generation and categorization. A simple state store like Postgres or Redis for tracking what has changed since the last update. Slack, email, or a dashboard as the delivery surface.
              </div>
            </div>
          </section>

        </div>
      </article>

      {/* ═══ PATTERN 06 · Sales Pipeline and Follow-Up Agent ═══ */}
      <article id="pattern-06" className="pattern pattern--alt">
        <div className="max-w">

          <header className="pattern-header">
            <div className="pattern-num">Pattern 06</div>
            <h2 className="pattern-name">The Sales Pipeline and <em>Follow-Up Agent</em></h2>
            <p className="pattern-summary">
              Every sales team has deals that went cold and never got re-engaged. This is not because the reps do not care. It is because the mechanical work of writing personalized follow-ups at scale is impossible to do well while also selling. This pattern handles the mechanical part and gives reps back their time for the human part.
            </p>
          </header>

          <section className="pattern-section">
            <div className="section-label">The Problem</div>
            <p className="section-body">
              In any sales team of five or more, look at the CRM. There is a long tail of opportunities that have gone dark. Someone had a good call two months ago, sent a proposal, and never heard back. The rep meant to follow up. Then a bigger deal came in and the follow-up got pushed. Then another one. The lead sits in the pipeline generating a false sense of activity that is really just neglect.
            </p>
            <p className="section-body">
              Managers know this happens. Reps know this happens. The fix is not another sales enablement platform. The fix is somebody watching every stalled deal, writing a smart re-engagement touch based on what actually happened in the conversation, and either sending it directly or handing the rep a draft they can send in thirty seconds instead of thirty minutes.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Architecture</div>
            <p className="section-body">
              An agent reads the CRM daily and identifies opportunities that have gone stale by the team's own definition. For each stale opportunity, it pulls the conversation history from the CRM notes, email history, and call transcripts. It generates a personalized follow-up draft that references specific things from the last conversation, proposes a specific next step, and matches the rep's voice as closely as possible. Depending on the team's preference, it either sends the touch directly for lower-value opportunities or drops it into the rep's inbox as a one-click send.
            </p>

            <div className="flowchart-frame">
              <svg className="flowchart-svg" viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-ink-6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#14171C"/>
                  </marker>
                  <marker id="arr-gold-6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#8A6F45"/>
                  </marker>
                  <marker id="arr-teal-6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3F5C6B"/>
                  </marker>
                  <marker id="arr-terra-6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86842"/>
                  </marker>
                </defs>

                {/* Left column: 3 data sources */}
                <g>
                  <ellipse cx="90" cy="80" rx="75" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="15" y1="80" x2="15" y2="115" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="165" y1="80" x2="165" y2="115" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 15 115 A 75 8 0 0 0 165 115" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="100" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">CRM</text>
                </g>
                <g>
                  <ellipse cx="90" cy="185" rx="75" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="15" y1="185" x2="15" y2="220" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="165" y1="185" x2="165" y2="220" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 15 220 A 75 8 0 0 0 165 220" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="205" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Email history</text>
                </g>
                <g>
                  <ellipse cx="90" cy="290" rx="75" ry="8" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="15" y1="290" x2="15" y2="325" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="165" y1="290" x2="165" y2="325" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 15 325 A 75 8 0 0 0 165 325" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="90" y="310" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Call transcripts</text>
                </g>

                {/* Stale detection diamond */}
                <polygon points="300,205 380,155 460,205 380,255" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="380" y="200" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Stale?</text>
                <text x="380" y="218" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Team-defined</text>
                <text x="380" y="238" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#6E7079">DECISION</text>

                {/* Agent core */}
                <rect x="540" y="180" width="180" height="55" fill="none" stroke="#8A6F45" strokeWidth="2"/>
                <text x="630" y="203" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="600" fill="#14171C">Agent core</text>
                <text x="630" y="220" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Draft re-engagement</text>

                {/* CRM → stale */}
                <line x1="165" y1="100" x2="310" y2="185" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-6)"/>
                {/* Email + calls → agent core */}
                <path d="M 165 200 Q 350 250 540 210" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-6)"/>
                <path d="M 165 305 Q 350 270 540 220" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-6)"/>

                {/* Stale → agent */}
                <line x1="460" y1="205" x2="535" y2="205" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-6)"/>
                <text x="490" y="196" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#8A6F45" fontWeight="500">YES</text>

                {/* Right column: Two outcomes */}
                <rect x="800" y="110" width="180" height="55" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="890" y="133" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Auto-send</text>
                <text x="890" y="150" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Lower-value tier</text>

                <rect x="800" y="240" width="180" height="55" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="890" y="263" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Rep review</text>
                <text x="890" y="280" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">One-click send</text>

                <path d="M 720 195 Q 760 165 800 140" fill="none" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-6)"/>
                <path d="M 720 220 Q 760 245 800 265" fill="none" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-6)"/>

                {/* Prospect */}
                <ellipse cx="890" cy="370" rx="90" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="890" y="368" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Prospect</text>
                <text x="890" y="383" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">RE-ENGAGED</text>

                <path d="M 870 165 Q 910 260 880 344" fill="none" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-6)"/>
                <path d="M 890 295 Q 890 320 890 344" fill="none" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-6)"/>
              </svg>
            </div>

            <p className="section-body">
              The key architectural choice is the auto-send tier versus the rep-review tier. Auto-sending every touch removes the rep entirely and produces generic outreach that damages the relationship. Requiring rep review on every touch reintroduces the friction that killed follow-up in the first place. The right pattern draws the line by opportunity value: below a threshold, agent sends. Above, agent drafts and rep sends.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Payoff</div>

            <div className="payoff-assumptions">
              <strong>How the math typically works.</strong> A five-rep sales team where each rep has roughly 40 stalled opportunities in the pipeline at any time. Historical re-engagement conversion runs about 8% when done well, versus 1-2% when the touch is generic or nonexistent. Even a modest recovery lift at typical B2B deal values compounds fast. Time returned to reps for actual selling is the leading edge; recovered revenue is the trailing edge.
            </div>

            <div className="payoff-panels">
              <div className="payoff-panel">
                <div className="payoff-panel-label">Time Recovered</div>
                <div className="payoff-panel-value">40 hrs</div>
                <div className="payoff-panel-unit">per rep per month, freed for real selling</div>
              </div>
              <div className="payoff-panel">
                <div className="payoff-panel-label">Pipeline Impact</div>
                <div className="payoff-panel-value">6-8x</div>
                <div className="payoff-panel-unit">lift on re-engagement conversion vs. generic touch</div>
              </div>
            </div>

            <p className="payoff-translation">
              The strategic change is that stalled opportunities stop being pipeline furniture. Every deal in the CRM either gets moved forward or gets closed out honestly, and the manager finally has a pipeline number they trust.
            </p>
          </section>

          <section className="pattern-section">
            <div className="stack-row">
              <div className="stack-label">Stack</div>
              <div className="stack-value">
                Direct API integrations to the CRM and to the email system, whether that is Salesforce plus Outlook or HubSpot plus Gmail. Gong or Chorus for call transcript context if the team uses one. Anthropic Claude for the drafting layer, tuned on prior successful outreach from the rep or team. A lightweight queue and review interface for the rep-facing side, typically a Slack integration or an inbox extension.
              </div>
            </div>
          </section>

        </div>
      </article>

      {/* ═══ PATTERN 07 · Onboarding and Knowledge Agent ═══ */}
      <article id="pattern-07" className="pattern">
        <div className="max-w">

          <header className="pattern-header">
            <div className="pattern-num">Pattern 07</div>
            <h2 className="pattern-name">The Onboarding and <em>Knowledge Agent</em></h2>
            <p className="pattern-summary">
              Every business has the same set of questions asked repeatedly. New hires ramping up. New customers finding their way. Existing team members forgetting where the document is. Someone always answers, but that someone burns hours answering the same thing over and over. This pattern gives that time back.
            </p>
          </header>

          <section className="pattern-section">
            <div className="section-label">The Problem</div>
            <p className="section-body">
              Institutional knowledge lives in three places. Documents nobody reads, the memory of one senior person on the team, and the muscle memory of processes that were figured out once and never written down. A new hire asks a question in Slack. Three people answer. The answers do not fully agree. The right answer sits in a Notion page from 2023 that nobody remembers exists.
            </p>
            <p className="section-body">
              The customer version of this problem looks different. A customer emails support asking something that is documented in the help center. Support answers, copies the link, moves on. The next customer asks the same question the next day. Multiply that by hundreds of interactions and the pattern becomes obvious: the same knowledge is being surfaced repeatedly through the highest-cost channel available.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Architecture</div>
            <p className="section-body">
              An agent has read access to the team's or company's documented knowledge: the wiki, the help center, the SOP library, the onboarding materials. When a question arrives through Slack, email, chat, or a portal, the agent retrieves the relevant sources, answers in natural language with a link back to the original document, and logs the interaction. When it does not know the answer, it says so clearly and hands off to a human, then learns from what the human said so the next similar question gets answered correctly.
            </p>

            <div className="flowchart-frame">
              <svg className="flowchart-svg" viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arr-ink-7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#14171C"/>
                  </marker>
                  <marker id="arr-gold-7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#8A6F45"/>
                  </marker>
                  <marker id="arr-teal-7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3F5C6B"/>
                  </marker>
                  <marker id="arr-terra-7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#B86842"/>
                  </marker>
                </defs>

                {/* Left: Question source */}
                <ellipse cx="90" cy="130" rx="80" ry="28" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="90" y="127" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Question source</text>
                <text x="90" y="143" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="1" fill="#B86842">HIRE · CUSTOMER · TEAM</text>

                {/* Intake channel */}
                <rect x="220" y="105" width="170" height="50" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="305" y="127" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Intake channel</text>
                <text x="305" y="143" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Slack · Email · Portal</text>

                {/* Agent core */}
                <rect x="440" y="105" width="180" height="50" fill="none" stroke="#8A6F45" strokeWidth="2"/>
                <text x="530" y="127" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="600" fill="#14171C">Agent core</text>
                <text x="530" y="143" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#8A6F45">Retrieval + generation</text>

                {/* Knowledge base (large cylinder below) */}
                <g>
                  <ellipse cx="530" cy="255" rx="180" ry="10" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="350" y1="255" x2="350" y2="305" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <line x1="710" y1="255" x2="710" y2="305" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <path d="M 350 305 A 180 10 0 0 0 710 305" fill="none" stroke="#3F5C6B" strokeWidth="1.5"/>
                  <text x="530" y="278" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Knowledge base</text>
                  <text x="530" y="295" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#3F5C6B">Notion · Confluence · Help center · SOPs</text>
                </g>

                {/* Bidirectional agent ↔ KB */}
                <path d="M 500 160 Q 460 200 465 240" fill="none" stroke="#3F5C6B" strokeWidth="1.5" markerEnd="url(#arr-teal-7)"/>
                <path d="M 560 240 Q 570 195 555 160" fill="none" stroke="#8A6F45" strokeWidth="1.5" markerEnd="url(#arr-gold-7)"/>

                {/* Arrows: source → intake → agent */}
                <line x1="170" y1="130" x2="215" y2="130" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-7)"/>
                <line x1="390" y1="130" x2="435" y2="130" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-7)"/>

                {/* Decision: confident? */}
                <polygon points="770,130 850,90 930,130 850,170" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="850" y="127" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Confident?</text>
                <text x="850" y="143" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#6E7079">DECISION</text>

                <line x1="620" y1="130" x2="765" y2="130" stroke="#14171C" strokeWidth="1.5" markerEnd="url(#arr-ink-7)"/>

                {/* Two outcomes */}
                <rect x="770" y="250" width="180" height="55" fill="none" stroke="#14171C" strokeWidth="1.5"/>
                <text x="860" y="273" textAnchor="middle" fontFamily="Inter Tight" fontSize="12" fontWeight="500" fill="#14171C">Answer with source</text>
                <text x="860" y="290" textAnchor="middle" fontFamily="Inter Tight" fontSize="10" fill="#6E7079">Cited response</text>

                <ellipse cx="1010" cy="130" rx="75" ry="26" fill="none" stroke="#B86842" strokeWidth="1.5"/>
                <text x="1010" y="128" textAnchor="middle" fontFamily="Inter Tight" fontSize="11" fontWeight="500" fill="#14171C">Human expert</text>
                <text x="1010" y="143" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842">ESCALATE</text>

                <path d="M 850 170 Q 855 210 860 248" fill="none" stroke="#8A6F45" strokeWidth="2" markerEnd="url(#arr-gold-7)"/>
                <text x="820" y="220" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#8A6F45" fontWeight="500">YES</text>

                <line x1="930" y1="130" x2="932" y2="130" stroke="#B86842" strokeWidth="1.5" markerEnd="url(#arr-terra-7)"/>
                <text x="960" y="115" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1" fill="#B86842" fontWeight="500">NO</text>

                {/* Learning loop */}
                <path d="M 1010 156 Q 1010 380 500 380 Q 200 380 200 310" fill="none" stroke="#8A6F45" strokeWidth="1.5" strokeDasharray="5,4" markerEnd="url(#arr-gold-7)"/>
                <text x="600" y="400" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1" fill="#6E7079">HUMAN ANSWER LEARNED · KB UPDATED</text>
              </svg>
            </div>

            <p className="section-body">
              The key architectural choice is that the agent is honest about what it does not know. An agent that hallucinates confident answers to questions it cannot actually answer becomes worse than useless: it becomes actively harmful. An agent that says "I do not have a good answer, let me connect you with someone who does" preserves trust. The learning loop, where human answers get folded back into the knowledge base, is what turns this from a static Q&A tool into an actual asset.
            </p>
          </section>

          <section className="pattern-section">
            <div className="section-label">The Payoff</div>

            <div className="payoff-assumptions">
              <strong>How the math typically works.</strong> A 50-person company where senior team members collectively field roughly 200 internal questions per week, at an average of 6 minutes per response including context-switching cost, at a loaded rate of $95 per hour. Separately, a customer support team handling 400 inbound tickets per week where 40% are covered by existing documentation. Both flows compound. The agent handles the well-documented cases and hands off the harder ones cleanly.
            </div>

            <div className="payoff-panels">
              <div className="payoff-panel">
                <div className="payoff-panel-label">Time Recovered</div>
                <div className="payoff-panel-value">80+ hrs</div>
                <div className="payoff-panel-unit">per month across internal + customer flows</div>
              </div>
              <div className="payoff-panel">
                <div className="payoff-panel-label">Annual Value</div>
                <div className="payoff-panel-value">$90K+</div>
                <div className="payoff-panel-unit">plus faster onboarding and better customer response times</div>
              </div>
            </div>

            <p className="payoff-translation">
              Beyond the direct hours, the compounding win is that the knowledge base finally gets used. Documentation stops being write-only and starts being the actual source of truth the team runs on.
            </p>
          </section>

          <section className="pattern-section">
            <div className="stack-row">
              <div className="stack-label">Stack</div>
              <div className="stack-value">
                A vector database like Pinecone, Weaviate, or a Postgres extension like pgvector for retrieval across the knowledge sources. Direct API integrations to Notion, Confluence, SharePoint, or Zendesk for the source documents. Anthropic Claude for the answer generation with source citations. Slack, Zendesk, or a web widget for the intake interface. A simple review queue for capturing human answers into the KB when the agent escalates.
              </div>
            </div>
          </section>

        </div>
      </article>

      {/* ═══ CLOSING CTA ═══ */}
      <section className="agents-closing">
        <div className="max-w">
          <h2 className="agents-closing-h2">
            Have a problem worth <em>solving?</em>
          </h2>
          <p className="agents-closing-body">
            If one of these patterns looks like a problem your team is living with, or if the one you need is not on this list, I would like to hear about it.
          </p>
          <a
            href="mailto:alex@zaliznyakgroup.com?subject=Applied%20Patterns%20Inquiry"
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
