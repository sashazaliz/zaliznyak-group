# The Zaliznyak Group — Next.js Build Handoff
## GTM → DEV Session Transfer | April 2026

---

## What's in This Handoff

A complete Next.js App Router project for `zaliznyakgroup.com`. All files are generated and ready. This document covers setup, deployment, SEO configuration, and a post-launch checklist.

---

## File Structure

```
zaliznyak-group/
├── app/
│   ├── layout.tsx          ← Root layout: metadata, JSON-LD, font imports
│   ├── page.tsx            ← Full page component ('use client')
│   └── globals.css         ← All styles (converted from v4 HTML)
├── public/
│   └── og-image.jpg        ← NEEDS CREATING: 1200×630px OG image
├── next.config.ts
├── next-sitemap.config.js
├── tsconfig.json
└── package.json
```

---

## Initial Setup

```bash
# 1. Create project folder and copy in the provided files
mkdir zaliznyak-group
cd zaliznyak-group

# 2. Install dependencies
npm install

# 3. Test local dev server
npm run dev
# → Opens at http://localhost:3000

# 4. Build for production (also generates sitemap)
npm run build
```

---

## Deployment to Vercel

```bash
# Install Vercel CLI if needed
npm install -g vercel

# Deploy (first time — follow prompts)
vercel

# Subsequent deploys
vercel --prod
```

Or connect the GitHub repo to Vercel dashboard for auto-deploy on push to main.

---

## DNS Configuration (GoDaddy)

After deploying to Vercel, add these records in GoDaddy DNS:

| Type  | Name | Value                  | TTL    |
|-------|------|------------------------|--------|
| A     | @    | 76.76.21.21            | 1 Hour |
| CNAME | www  | cname.vercel-dns.com   | 1 Hour |

Then in Vercel dashboard: Settings → Domains → Add `zaliznyakgroup.com` and `www.zaliznyakgroup.com`.

**IMPORTANT:** Do NOT change any existing MX, TXT, or CNAME records — those are for Microsoft 365 email and must stay untouched.

---

## SEO Configuration

### layout.tsx — Already configured with:
- Full `metadata` export (title, description, keywords, OG, Twitter card)
- Canonical URL: `https://zaliznyakgroup.com`
- Robots: index + follow
- JSON-LD structured data:
  - `LocalBusiness` (address: San Diego, CA, phone, email, services catalog)
  - `SoftwareApplication` for OptionsAnalytx
  - `Person` for Alex Zaliznyak
  - `WebSite`

### next-sitemap.config.js — Generates on `npm run build`:
- `sitemap.xml` at root
- `robots.txt` with allow all + sitemap reference
- `changefreq: weekly`

### OG Image — ACTION NEEDED
Create a 1200×630 image and save as `/public/og-image.jpg`:
- Dark navy (#07070A) background
- "The Zaliznyak Group" in Cormorant Garamond gold
- Tagline: "AI Tools · Digital Agency · Automation"
- Logo mark centered or left-aligned
- Use Playwright or a design tool; the Raanya OG image workflow applies here

---

## Google Search Console Setup

1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://zaliznyakgroup.com`
3. Verify via HTML tag (add to layout.tsx metadata.verification.google)
4. Submit `https://zaliznyakgroup.com/sitemap.xml`

Uncomment and fill in the verification token in `layout.tsx`:
```typescript
verification: {
  google: 'YOUR_TOKEN_HERE',
},
```

---

## Google Business Profile (LOCAL SEO — HIGH PRIORITY)

1. Go to https://business.google.com
2. Add business: "The Zaliznyak Group"
3. Category: "Web Design Company" (primary), "Marketing Agency" (secondary)
4. Address: San Diego, CA (service area business — no storefront)
5. Phone: (858) 281-0071
6. Website: https://zaliznyakgroup.com
7. Services: Web Design, SEO, Facebook Ads, AI Automation
8. Description: use the metadata description from layout.tsx

This puts TZG on Google Maps and in local pack results for "web design San Diego".

---

## GA4 Setup

Add Google Analytics 4 to the project:

```bash
npm install @next/third-parties
```

In `app/layout.tsx`, import and add before `</body>`:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

// In <body>:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

Replace `G-XXXXXXXXXX` with the GA4 measurement ID from analytics.google.com.

---

## Font Notes

Fonts are loaded via `next/font/google` (self-hosted at build time — zero CLS, no external requests):
- `Cormorant Garamond` → `--font-serif` → `var(--serif)` in CSS
- `Outfit` → `--font-sans` → `var(--sans)` in CSS  
- `DM Mono` → `--font-mono` → `var(--mono)` in CSS

These CSS variables are injected onto the `<html>` element via `className` in layout.tsx.

---

## CSS Variable Usage in page.tsx

Some elements use CSS custom properties set via inline style in JSX. TypeScript requires casting:

```typescript
// For factor bars (--pct) and card fills (--p, --w):
const factorStyle = (pct: number): React.CSSProperties => ({ '--pct': pct } as React.CSSProperties)
const cfStyle     = (p: number):   React.CSSProperties => ({ '--p':   p   } as React.CSSProperties)
const rowStyle    = (w: string):   React.CSSProperties => ({ '--w':   w   } as React.CSSProperties)
```

These are already in `page.tsx` — no changes needed.

---

## Wave Canvas

The animated sine-wave grid is implemented as a `useEffect` hook (`useWaveGrid`) in `page.tsx`. It:
- Attaches to `#heroWrap` via refs
- Uses a `ResizeObserver` to handle responsive resizing
- Pre-computes all node positions each frame for accurate amplitude-based dot pulsing
- Cancels `requestAnimationFrame` on unmount (no memory leaks)

---

## Post-Launch Checklist

- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] `sitemap.xml` present at `/public/sitemap.xml` after build
- [ ] `robots.txt` present at `/public/robots.txt` after build
- [ ] OG image at `/public/og-image.jpg`
- [ ] Vercel domain connected and SSL active
- [ ] DNS A + CNAME records set in GoDaddy
- [ ] Search Console verified + sitemap submitted
- [ ] Google Business Profile created
- [ ] GA4 measurement ID added
- [ ] Test OG/Twitter card: https://cards-dev.twitter.com/validator
- [ ] Test structured data: https://search.google.com/test/rich-results
- [ ] Test page speed: https://pagespeed.web.dev (target: 90+ mobile)
- [ ] Verify email still works (MX records untouched)

---

## Future: Section Routes for SEO

To give each division its own URL and meta (stronger SEO):

```
app/
├── page.tsx              → zaliznyakgroup.com
├── ai-tools/
│   └── page.tsx          → zaliznyakgroup.com/ai-tools
├── digital-agency/
│   └── page.tsx          → zaliznyakgroup.com/digital-agency
└── automation/
    └── page.tsx          → zaliznyakgroup.com/automation
```

Each sub-page gets its own `export const metadata` with targeted keywords. Not required for launch — can be added in Phase 2.

---

## Blog Setup (Phase 2 — Post-Launch SEO)

```
app/
└── blog/
    ├── page.tsx           → /blog (index)
    └── [slug]/
        └── page.tsx       → /blog/[slug] (individual posts)
```

Target posts (written, ready to publish once route exists):
1. "Web Design San Diego — What It Actually Costs in 2025"
2. "Why Your Business Isn't Showing Up on Google Page 1"
3. "How AI Is Changing the Way Small Businesses Handle Leads"
4. "Covered Call Screener Comparison: OptionsAnalytx vs DivaCup vs Saalt"
5. "What Is a Custom Website vs Template — And Why It Matters for Revenue"

---

## Contact

GTM session: Alex Zaliznyak — sashazaliz@gmail.com  
Business inbox: info@zaliznyakgroup.com  
Domain: registered on GoDaddy, pointing to Vercel  
Repo: create at github.com/sashazaliz/zaliznyak-group (new repo)
