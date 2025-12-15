# Website Migration — Build Log

Date: 2025-12-15

Summary
-------
This document captures the repository audit and initial notes for migrating the static site to a modern Next.js (App Router) + TypeScript + Tailwind web app. It records pages, assets, Calendly links, and important content/claims that must be preserved exactly (or lightly rephrased without changing meaning).

Findings
--------

1) Pages (primary static HTML files)
- `index.html` — Home (primary source of hero copy, claims, structured data, FAQ schema)
- `growth-engine.html` — Product: Growth Engine
- `admin-assassin.html` — Product: Admin Assassin
- `reputation-defender.html` — Product: Reputation Defender
- `vexel-logic-pro.html` — Product / Pro features
- `partners.html` — Partner information and Calendly partner link
- `privacy-policy.html` — Privacy policy (legal content — migrate verbatim)
- `terms-of-service.html` — Terms (legal content — migrate verbatim)
- Industry pages: `tradesmen.html`, `plumbers.html`, `electricians.html`, `dental.html`, `legal.html` (copy + CTAs)
- Other product/tool pages under `PRODUCT/tools/...` (many small tool pages; treat as secondary content to be surfaced under /products or /resources as needed)
- `billing.html`, `pro-dashboard.html`, `workflow-requests.html` (admin / internal pages)

Notes: There are 100+ HTML files; the most important for public-facing site are listed above. Legal pages must be migrated verbatim.

2) Calendly Links (single source of truth)
- Primary demo: `https://calendly.com/ben-vexellogic/demo` (used across product pages)
- Trials / 7-day: `https://calendly.com/ben-vexellogic/7-day-trial`
- Partners: `https://calendly.com/ben-vexellogic/partner-inquiry`

Action: treat `https://calendly.com/ben-vexellogic/demo` as canonical `BOOK_DEMO_URL` env var and use it across the site.

3) Assets & Brand
- Pages reference `assets/logo-icon.svg` and `og-image.png` (OG image URL uses https://vexellogic.com/og-image.png). Logo/favicons are embedded or referenced; no centralized `/assets` folder found in repo root — verify missing files and add optimized versions in the Next.js `public/` folder.

4) SEO & Structured Data
- `index.html` includes extensive SEO meta tags, Open Graph, Twitter card, and JSON-LD (SoftwareApplication + FAQ). Preserve key claims and Schema markup (ratings, pricing ranges, featureList) and ensure per-page metadata is present in Next.js pages.

5) Vercel config
- `vercel.json` exists and currently builds the site as static HTML using `@vercel/static`. After migrating to Next.js we will update `vercel.json` or configure the Vercel project to use the new Next build (or set `Root Directory` if site is placed under `/website`). Document Vercel settings in `docs/WEBSITE_README.md`.

6) Forms & Backend
- There are references to a client/login and admin pages (e.g., `missed-call-bot/public/login.html`) and a small server component in `missed-call-bot`. We'll implement serverless route handlers for contact/lead capture and support that write to local `data/*.json` in dev and include TODO hooks for SendGrid/Resend.

7) Claims & Copy (must not be fabricated)
- The site makes several specific claims (e.g., "64% call recovery rate", "20+ hours/week saved", pricing ranges £249–£697, 48-hour setup, 30-day money-back guarantee). These are present in the site and must be preserved exactly as written unless instruction to rephrase for clarity is required — in any case, do not invent or strengthen claims/metrics.

8) Redirects Required
- We will add 301 redirects for legacy `.html` pages to new Next routes (examples below).
  - `/growth-engine.html` → `/products/growth-engine`
  - `/admin-assassin.html` → `/products/admin-assassin`
  - `/reputation-defender.html` → `/products/reputation-defender`
  - `/tradesmen.html` → `/industries/tradesmen-services`
  - `/privacy-policy.html` → `/legal/privacy`
  - `/terms-of-service.html` → `/legal/terms`

Migration Plan (short)
- Scaffold Next.js (App Router) + TypeScript + Tailwind at repository root (or `/website` if root is too noisy). Document choice in `docs/WEBSITE_README.md`.
- Add canonical `BOOK_DEMO_URL` env and implement global layout, design system, and components.
- Migrate homepage content and top products first, wire Book Demo to Calendly URL, add Find My Solution quiz, and build contact lead handler.

Next Steps
- Create `docs/WEBSITE_README.md` with dev & build instructions and Vercel guidance.
-	Scaffold Next.js + TypeScript + Tailwind and add initial pages + layout. (completed)
-	Add redirects and sitemap/robots handlers. (completed)
-	Add contact API, portal stub, and basic pages (completed)
-	Implement Find My Solution quiz and core components (completed)

Audit done by: GitHub Copilot agent

Milestones (2025-12-15):
- Scaffolding: Next.js app created under `/website` with App Router, TypeScript and Tailwind.
- Routes added: `/`, `/products/*`, `/industries/*`, `/pricing`, `/faq`, `/contact`, `/legal/*`, `/portal/*`.
- API handlers: `/api/lead`, `/api/support`, and dev auth `/api/auth/login`.
- Robots & sitemap: `robots.txt` and `/sitemap.xml` route implemented.
- Docs: `docs/WEBSITE_README.md` added with Vercel instructions.

Notes: Local environment where this agent is running does not have `npm` installed, so I could not run `npm install` or `npm run build` locally. The scaffold is complete and ready to be installed and built in CI or on a developer machine with Node.js (>=18) and npm. If you want, I can run the build in CI or in a container if you enable Docker here.

Update (2025-12-15): Content migration & design system progress
- Migrated product detail pages for Growth Engine, Admin Assassin, Reputation Defender (hero, features, how it works, case studies, pricing previews).
- Implemented shared UI components: Button, Hero, FeatureGrid, HowItWorks, CaseStudy, TrustStrip, TestimonialGrid, PricingCard, Accordion, and more.
- Home page: hero, trust strip, quiz, testimonial grid, software JSON-LD preserved from legacy site.
- Industry pages: Tradesmen page migrated and content preserved (hero, problems, toolkits, pricing, "Barry" CTA, and Book Demo CTAs wired to `BOOK_DEMO_URL`).
- Product/Tool pages: Added a dynamic `/tools/[slug]` route that serves the existing `PRODUCT/tools/*.html` and `PRODUCT/tools/marketing_tools/*.html` files verbatim while rewriting internal `.html` links to the new routes (keeps copy exact and preserves CTAs).
- Legal pages are rendered verbatim from existing HTML (privacy & terms).
- Contact & support endpoints store submissions to `website/data/*.json` in dev.
- CI: added `website-build` job to run `npm ci`, `npm run typecheck`, `npm run build` and `npm run lint` on PRs to validate the migration.

Next recommended steps:
- Replace placeholder `public/og-image.png` with final OG image and ensure `public/logo.svg` is the production asset.
- Run `npm install` and `npm run build` in a Node environment to verify and fix any TypeScript or build-time issues.
- Add GitHub Actions to run builds and preview deploys to Vercel once local build is confirmed.
