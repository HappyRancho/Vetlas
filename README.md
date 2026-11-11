# Vetlas

> **Vetlas** is a decision-support tool (not a directory, not an ad platform) that helps pet
> owners in India choose veterinary care based on attributed, trustworthy data.
> https://vetlas.thatvetguy.net

**Status: beta.** Every listing, review, rating and price currently on the site is
**clearly-marked sample data** built to design and test the product. Vetlas never presents
sample data as verified real-world information.

---

## Architecture & why it was chosen

| Decision | Choice | Why (₹0 budget, spec §5/§8) |
|---|---|---|
| Framework | **Astro 5, static output (SSG)** | Server-rendered HTML at build time, zero framework JS shipped to visitors (total JS today ≈ 1 KB). Kills the LCP < 2.5 s and JS < 150 KB targets by construction. |
| Styling | **Vanilla CSS** (single design-system file) | No CSS-in-JS runtime, no utility purge step; tokens + component classes, fully portable. |
| Fonts | **@fontsource** (Bricolage Grotesque + Inter, self-hosted) | No third-party font requests (privacy + performance), free, versioned in npm. |
| Data layer | **Framework-agnostic TypeScript** (`src/data/`) | Mirrors `db/schema.sql` 1:1 so the UI can swap to the live database without page rewrites. |
| Database (target) | **Cloudflare D1 (SQLite, free tier)** | Schema in `db/schema.sql`; every fact carries a `trust_level`. |
| Hosting (target) | **Cloudflare Workers Static Assets (free tier)** | Static site fits the always-free plan; upgrade path to on-demand SSR (`@astrojs/cloudflare`) when D1 goes live. |
| Icons | **Hand-rolled inline SVG set** | No icon package dependency; consistent stroke style, tiny payload. |

### Spec compliance highlights

- **Never fabricate** — missing data shows “not available yet”; the demo dataset is labelled
  `sample` on every page via a persistent notice and per-record trust badges.
- **Label every fact** — 6 visual trust tiers, each pairing a **distinct geometric shape with
  colour** (verified = filled circle, provider-confirmed = ring, public = square,
  user-submitted = diamond, estimated = dashed ring, sample = outline square) for
  colour-blind accessibility.
- **Themes over stars** — reputation is led by recurring reviewer themes; aggregate ratings are
  de-emphasised and always labelled sample in the beta.
- **Publication gates** — cities publish at ≥30/15/5 vetted profiles (Tier 1/2/3); city ×
  speciality combination pages are `noindex` below 3 vetted providers; expense estimates require
  ≥10 approved reports (12-month window); AI review summaries require ≥5 public reviews and are
  generated strictly from stored review IDs.
- **URL structure** — lowercase, hyphenated: `/{city}/`, `/{city}/{speciality}/`,
  `/{city}/{provider-slug}/`.
- **SEO/LLM** — semantic HTML, JSON-LD (`VeterinaryCare`, `Physician`, `CollectionPage`,
  `WebSite`), canonical URLs, sitemap filtered by the publication gates, `robots.txt` welcoming
  AI crawlers, and `public/llms.txt`.
- **Zero dark patterns** — no popups, no lead-capture walls, no sponsored cards, no paid
  placement anywhere in ranking.
- **Accessibility & UX** — ≥44 px touch targets, skip link, focus-visible rings,
  `prefers-reduced-motion` respected, empty states on every listing surface.

## Project layout

```
db/schema.sql               Cloudflare D1 schema v0.3 (improved: indexes, checks, seeds)
src/data/                   Framework-agnostic data layer + sample dataset
  types.ts                  Entity types incl. TrustLevel (mirrors schema)
  taxonomy.ts               Cities & specialities
  seed.ts                   Sample providers, doctors, reviews, cost ranges
  index.ts                  Lookup helpers (swap point for D1)
src/components/*.astro      Icon, TrustBadge, ledger rows, sentence search builder
src/layouts/BaseLayout.astro  Head/SEO/header/footer, tiny vanilla-JS nav toggle
src/pages/                  index, search, [city]/, [city]/[speciality]/,
                            [city]/[provider]/, specialties/, locations/, costs,
                            about, methodology, 404
src/styles/global.css       Design system (vanilla CSS)
public/                     robots.txt, llms.txt, favicon.svg
```

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # static build → dist/ (174 pages)
npm run preview    # serve the build locally
npm run check      # astro type check (0 errors)
```

## Deployment (free tier)

1. **Workers Static Assets**: `npx wrangler deploy` with an asset-binding config pointing at
   `dist/` — no paid plan needed.
2. Later, to go live with real data: add `@astrojs/cloudflare` adapter + D1 binding, flip
   `noindex` gates in the pages as profiles are vetted (see `db/schema.sql` —
   `provider.indexable`, `city.is_published`), and set `SITE_URL`.

Nothing in the repo requires paid credentials; everything runs locally out of the box.

## Sample-data disclaimer

The dataset in `src/data/seed.ts` is fictional and for demo/testing only. Names, reviews,
ratings, phone numbers and prices must never be mistaken for real-world providers.
