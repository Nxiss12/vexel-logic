Website (Next.js)
=================

This folder contains the new Next.js App Router website scaffold for Vexel Logic.

Local dev

1. cd website
2. npm install
3. npm run dev

Build

1. cd website
2. npm run typecheck
3. npm run build

Notes

- This environment where the agent runs currently does not have Node.js / npm installed, so builds are run in CI. If you are developing locally, ensure Node.js (>=18) and npm are installed and run the commands above.

Environment

- `NEXT_PUBLIC_BOOK_DEMO_URL` - Calendly demo URL (default: https://calendly.com/ben-vexellogic/demo)
- `NEXT_PUBLIC_BASE_URL` - Public site base url for sitemap generation

Vercel

Set the `Root Directory` to `/website` in the Vercel project dashboard if you keep the app here.

Auth / Portal

This is a development stub: `vexel_session` cookie is used as a simple session flag. TODO: replace with Auth.js / NextAuth or Clerk.

Tools pages

- The legacy tool pages under `PRODUCT/tools` and `PRODUCT/tools/marketing_tools` are available under `/tools/<slug>` via a dynamic server route. The original HTML is rendered verbatim into the site and internal `.html` links are rewritten to new paths so CTAs keep working.
