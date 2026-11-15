# Vetlas: Indore-first directory delivery plan

Research date: 15 November 2026. Product goal: make finding appropriate veterinary care faster and more transparent than a generic business directory. This is a proposed roadmap, not a claim that every feature is implemented or that Vetlas outperforms Practo today.

## 1. Delivery state

Implemented in this branch: screenshot-inspired shared mint/teal theme, local dog/cat artwork, compact featured card, search and filters, map previews, location permission flow, browser-saved facilities, four public-source Indore clinic profiles, source links, fee conflict handling, selected-fee comparison and optional cost inputs, and review email preparation. Sample records remain in seed.ts for development but are no longer exported to the active directory. No fictional doctor profiles are published.

Not implemented: authenticated review persistence, moderation dashboard, confirmed appointments, verified visit badges, clinic ownership claims, real-time opening/doctor availability, independently checked clinic coordinates, representative city price averages, or nationwide production coverage. Existing contact email is inherited from the repository and delivery has not been verified. Email draft creation is not submission confirmation.

## 2. Visual target and cross-page system (first priority)

Use the uploaded screenshot as the primary mobile design reference: heartbeat wordmark, generous heading with teal emphasis, dog/cat cutout, pale mint background, white pill search, city chips, four care-type cards, coral emergency banner, six speciality tiles, compact featured facility, pet-type row, transparency panel, floating five-item bottom navigation. Do not copy phone status bars or invent notification counts, reviews, verified badges or facility photographs.

Finish visual acceptance at 390px and 430px with screenshot overlays: typography scale, hero image placement, header height, section spacing, search shape, card radii, shadow softness and navigation proportions. Adapt rather than stretch at 768px and 1440px. Keep all touch targets at least 44px, keyboard focus visible and contrast at WCAG AA. Keep horizontal scrolling inside chip rows only.

Shared primitives: brand header, page intro, search field, filter chip, source badge, facility/doctor card, empty state, cost row, source citation, action group, modal/sheet and bottom navigation. Consolidate the legacy global stylesheet and the directory override layer after visual approval; prevent new per-page colour systems.

Page composition:
- Home: quick discovery and one highlighted Indore listing, with clear view-all links.
- Search: compact results on mobile; sticky list/map split on desktop; visible active filters and reset.
- Clinic: identity, last checked, consultation fee, call/directions, services, doctors, evidence and reviews.
- Doctor: registration provenance, actual practice locations, species/services and fee per location. No made-up experience figures.
- Speciality: plain-language care scope, eligible clinics and empty coverage messages.
- City/locality: locally useful introduction and actual coverage counts; avoid mass-produced doorway pages.
- Costs: comparable prices with source date, sample size, spread and optional extras.
- Review: focused guided form with moderation state and privacy controls.
- Saved/compare: 2–4 facilities compared on services, fees, distance, evidence freshness and contact options.

## 3. Indore research and coverage

Start with Usha Nagar, Lalaram Nagar, Surya Dev Nagar and Pipliyahana. Expand through Vijay Nagar, Mahalaxmi Nagar, Nipania, Palasia, Rau, Annapurna and central Indore after researching each location. Treat Mhow as a distinct locality/service area; do not merge distant teaching hospitals into city-centre proximity results.

Working source order requested by the owner: Reddit → Justdial → Google Maps → other public platforms. Use that order to discover community experiences and candidate facilities, not as an automatic truth ranking for every field. Clinic websites and registration authorities are useful corroboration for addresses, services and credentials. Reddit comments cannot establish opening hours or clinical competence.

For each candidate: resolve business/branch identity, store aliases, compare address/phone across sources, check closure/relocation, record species and services only when explicitly supported, and retain unknowns. Do not merge similarly named branches. Separate veterinarian, practice and practice-location entities.

Launch coverage target: 30 researched Indore facilities with explicit unknown fields, not 30 fabricated complete profiles. Before calling a profile independently verified, a reviewer must check its identity, contact and location. Confirm emergency admission policy and after-hours staffing separately from general 24-hour business hours. Record first-party phone confirmation only after authorised contact actually happens.

Every assertion needs field, value, unit, source URL, source type, observation date, source publication date when known, evidence excerpt/reference, access method (page vs search index), reviewer and conflict state. Save superseded assertions for audit. Research date is not provider-confirmation date.

Current evidence ledger:
- Myra Usha Nagar: clinic website supports address, phone and services; Practo lists ₹200 consultation. Reddit discusses Myra but branch identity is ambiguous, so no branch-specific sentiment score is generated.
- Dr. Nigam: Justdial search-index result lists ₹200, Practo lists ₹300. Direct Justdial access is blocked. Both figures are displayed as conflicting and excluded from the numeric average.
- PetVet: clinic site supports address, phone, weekly hours and preventive services. Fee unknown. Provider-published registration claims are not marked independently verified.
- Dogsvilla: provider lists consultation from ₹300, separately priced treatment/diagnostics, and boarding-resident on-call support. General and walk-in consultation hours differ; preserve that distinction.
- Google Maps links currently open searches/area previews; no Google review corpus or verified place IDs has been imported.

Refresh emergency/contact facts every 30 days, fees every 90 days, and ordinary service facts every 180 days as proposed operational targets. Flag stale/conflicting facts before silently overwriting them. Provide correction requests and change history.

## 4. Search, map and efficient decisions

Support city/locality, distance, species, facility type, service, specialty, consultation range, confirmed emergency admission, accessible entrance and source freshness. Show counts and unavailable filters. Keep filters in shareable URLs; preserve back navigation and scroll position. Add spelling aliases and common Hindi/English terminology.

Distance sorting requires user permission or a manually selected location plus validated facility coordinates. Never use city-centre distances as clinic distances. Map pins and list results must share the same filtered data. Marker selection highlights its card; empty maps explain missing coverage. External directions remain available if tiles fail.

Ranking should disclose its inputs: match to selected needs, distance when supported, data completeness and freshness. Do not rank by payment or raw third-party star counts. Emergency results prioritise confirmed capability and contactability, not popularity. Show phone/directions immediately; appointment requests remain requests until accepted by a provider.

## 5. Reviews and community evidence

Present four distinct sections where evidence exists: Reddit discussions, Justdial feedback links, Google Maps review links and first-party Vetlas reviews. Never blend platform star scales into a single score. Do not reuse Reddit usernames/photos in local profiles or present an anonymous comment as a verified visit. Link source discussions; paraphrase cautiously and retain attribution/date/branch uncertainty.

Production submission workflow: sign-in or verified email → select branch and visit date → species and service → communication/wait time/price clarity ratings → narrative → optional consultation amount and private invoice → explicit consent → pending moderation → published, needs-information or rejected state. Receipt upload should be optional for participation; only verified evidence earns a verified-visit badge.

Build server-side validation, rate limiting, bot mitigation, duplicate detection and redaction before accepting public posts. Reviewer privacy: separate contact identity from public display name; invoices never public; define deletion, export and retention policies. Clinic responses cannot edit the review. Moderation must distinguish opinion from allegations and preserve both positive and negative legitimate experiences. Provide reporting, appeal and audit trails.

Current static email preparation is an interim option. Next milestone requires a real POST endpoint, a database receipt ID, safe failure/retry states and an operator inbox before labelling the action “Submit review”. Do not send private review text to analytics or query strings.

## 6. Consultation charges and additional options

Store fees as observations: facility/doctor/location, service, species, weight band, visit modality, currency, exact/range/from, tax inclusion, inclusions/exclusions, source, effective date and confirmation status. Distinguish OPD, specialist, follow-up, home visit and after-hours fees.

Selectable extras: vaccine by product/dose, CBC/biochemistry, radiograph by view, ultrasound, dressing, medications, travel and after-hours surcharge. Do not infer medical necessity or combine package and item prices twice. Unknown amounts remain unknown; entered amounts are explicitly the user's budget, not sourced clinic prices.

For comparisons, use one eligible current observation per clinic for the same service/species/modality. Exclude unresolved conflicts, expired quotes and missing amounts. Keep “from” prices separate unless the user explicitly includes starting figures. Show arithmetic mean, median, min–max or interquartile range, number of clinics, dates and exclusions. Never turn a starting-price mean into a final bill estimate.

City benchmarks require at least 10 independent comparable current observations as a proposed launch gate, with geographical coverage reviewed. Small selected-list means can still be shown with an explicit small-sample label. Today only Myra's exact listed fee and Dogsvilla's starting figure are available; that is not an Indore market average.

## 7. Data and backend architecture

Retain Astro static rendering for fast public pages. Add Cloudflare Worker endpoints and D1 once provisioning is available. Keep database migrations versioned and run a staging migration before production. Store private uploaded evidence in private object storage with signed, expiring access.

Tables: cities/localities, facilities, branches, practitioners, registrations, practitioner_branches, species/services, branch_services, source_documents, field_assertions, price_observations, reviews, review_dimensions, review_evidence, moderation_events, provider_claims, corrections and appointment_requests. Use stable IDs, unique canonical slugs, foreign keys and append-only provenance. Use first-party search indexing and rebuild pages on approved data changes.

Admin roles: researcher, verifier, moderator and administrator; restrict private evidence by role. Provider claims require proof of affiliation and cannot overwrite provenance. No browser-side secrets. Add backup/restore rehearsal, schema migration rollback and error monitoring.

## 8. SEO and LLM accessibility

Render business facts, prices, source links and uncertainty in server HTML. Canonical URLs should identify branches; use redirects for renamed slugs, XML sitemaps with only indexable substantive pages, breadcrumbs, descriptive titles, useful descriptions and internal city/service links. Keep faceted query permutations, review drafts, thin localities and incomplete search views noindex. Remove sample structured data from production.

Use VeterinaryCare/LocalBusiness structured data only for visible supported facts, PostalAddress with city/locality correctly separated, canonical @id/url and BreadcrumbList/ItemList as appropriate. Add geo/hours only when reliable. Do not mark up imported platform ratings as a first-party aggregate. Validate JSON-LD and rendered content together, plus Search Console indexing, after deployment.

Expose a concise llms.txt as an optional navigation aid and a versioned machine-readable public dataset containing provenance, observation dates, conflicts and unknowns. Exclude reviewer private information. Add human-readable methodology, correction and price-definition pages. LLM optimisation is clear, crawlable, attributable content; it cannot guarantee model mentions or rankings. Google's guidance says no special AI file is required for Search or its AI features.

Performance targets: mobile p75 LCP ≤2.5s, INP ≤200ms and CLS ≤0.1; load maps on demand, compress local images, self-host fonts and avoid heavy third-party widgets on initial render. Measure on real production traffic, not only a local score.

## 9. Milestones and acceptance

A — visual and pilot foundation (current branch): compare mobile screenshot, test all page templates, remove active sample content, publish source-linked seed profiles and explicit fee limitations. Gate: type/build/browser checks, no overflow, no invented review/verification claims.

B — Indore coverage (estimated 1–2 weeks of researcher effort): research 30 facilities, resolve branches, source addresses/contact/services, check map coordinates and document fee conflicts. Gate: every displayed fact has attribution; coverage report and stale-data queue exist. This estimate depends on source availability.

C — review backend (estimated 1–2 weeks): provision database/storage, implement authenticated submission, moderation, evidence handling and correction workflows. Gate: persisted receipt IDs, spam/error tests, no private data exposed, real moderation operator assigned.

D — comparison and prices (estimated 1 week after data): saved comparison, structured fees/options and cohort statistics. Gate: averaging tests for missing/conflicting/from/package prices; minimum benchmark evidence met or benchmark stays unavailable.

E — production launch and measurement (estimated 1 week): staging review, search/schema audits, accessibility and performance checks, restore test, privacy/terms review and deployment approval. Gate: reliable calls/directions, documented emergency limitations, monitoring and support ownership.

F — later improvements: confirmed appointments, provider dashboard, verified practitioner records, Hindi interface, pet care reminders and additional cities. Expand only after Indore freshness and moderation operations are sustainable.

Success measures: median time to relevant contact/directions, search zero-result rate, filter success, correction turnaround, percentage of current attributed fields, quote-versus-paid differences and review moderation latency. Compare these with a documented baseline before claiming superiority to Practo or Justdial.

## 10. References

- Reddit discussion: https://www.reddit.com/r/Indore/comments/1e6vxp8/best_pet_hospital_in_indore/
- Myra branch website: https://www.myrapetclinic.co.in/mapview/22.698992766749594/75.8366908505559
- Practo listed fees: https://www.practo.com/indore/clinics/veterinary-surgery-clinics
- PetVet: https://www.indorepetvet.com/
- Dogsvilla services: https://www.dogsvilla.com/services/veterinary/
- Dogsvilla address: https://www.dogsvilla.com/contact/
- Google local-business documentation: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
