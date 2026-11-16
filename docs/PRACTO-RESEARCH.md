# Practo public-content study and Vetlas implementation

Reviewed 15 November 2026. Scope: public search-index content for the Indore veterinarian directory, veterinary-surgery clinic category, Myra clinic and Narendra Chouhan profile. Direct requests to the sampled Practo pages returned 403/503, so this is **not a complete visual, HTML, technical SEO or internal product audit**. We cannot establish their traffic, conversions, ranking causes, schema implementation or mobile performance. No review text or design assets were copied.

## Observed information patterns and decisions

| Publicly visible pattern | Useful principle | Vetlas implementation / improvement |
| --- | --- | --- |
| City + specialty headings and doctor/practice pages | Specific search intent and stable information hierarchy | Indexable Indore hub, veterinarian hub, eight individual profiles and clinic map; clean canonical URLs and sitemap entries |
| Doctor name, qualifications, locality and affiliated practice near the decision | Identify who treats the animal and where | Doctor links on clinic cards, doctor profiles, source-attributed qualifications, clinic links and previews; uncertain private location omitted |
| Listed consultation fee beside profile/contact actions | Make cost visible before contacting | Indicative practice fee clearly separated from treatment totals and community cost votes; conflicting or unknown fees excluded from comparisons |
| Filters for fees, availability, experience and patient stories | Reduce search effort | Name/alias/area/care filters; map service/pet/fee/emergency filters; nearest-first sorting only after location permission. No invented appointment slots or experience values |
| Profile sections for overview, doctors, services, images and reviews | Put details in a predictable order | Doctor overview, qualifications, appointment guidance, practice and consultation, map, evidence. Facility pages retain services, costs and attributed ratings |
| Maps, call actions and nearby discovery | Make the visit easy to arrange | Fifteen pins, selected-clinic detail, list/map synchronization, mobile switch, filter sharing, travel modes, Google directions, fit/reset and list fallback |
| Recommendation percentages and patient-story counts | Evidence can help users compare | Retain source-specific facility scores and observation dates; do not convert recommendation percentages to stars or assign clinic scores to doctors |
| FAQ and city/service comparison tables | Answer common questions in crawlable content | Server-rendered selection, fees and verification guidance; source-linked machine-readable datasets. No invented waiting times or city-wide average |
| Numerous profile/search query variants | Separate navigable filters from canonical pages | Query-free canonical URLs; search filters remain noindex; stable doctor URLs; old /doctors/ redirects to Indore hub |

The visible Practo pages sometimes disagree internally (e.g. experience figures) or with other directories (Dr. Nigam consultation fee). Vetlas records those limits instead of choosing an unsupported number. “Top veterinarians” is addressed as a selection question, not an evidence-free best-to-worst ranking.

## Sources reviewed

- https://www.practo.com/indore/veterinarian
- https://www.practo.com/indore/clinics/veterinary-surgery-clinics
- https://www.practo.com/indore/clinic/myra-pet-clinic-surgery-centre-indore-nagar
- https://www.practo.com/indore/doctor/drnarendra-chouhan-veterinarian
- https://www.practo.com/Indore/clinic/veterinary-clinic-17-new-palasia

Doctor-specific supporting sources and observation methods live in `src/data/veterinarians.ts`, on each profile, and in `/veterinarians.json`. Location evidence lives in `src/data/facility-locations.json` and `/directory.json`.

## Location audit

Branch geometry comes from `!3d` / `!4d` place links, not the `@lat,lng` camera position. Where only a short Plus Code was visible, the Indore locality restores the full `7JJQ` prefix and the decoded cell centre is used, with approximately 14 m cell precision disclosed. Animal Veterinary Hospital uses the destination coordinate pair in its official site's Google Maps directions link. Myra's older website map coordinate differs from the current branch Google Maps geometry by roughly 150–200 m; this release uses the branch-matched public Google position. Pets Mate is the Palsikar branch, not the closed Tulip Enclave listing. Coordinates are source-matched, not physically surveyed.

Google Maps URLs work without a browser API key. The all-clinic basemap is Leaflet/OpenStreetMap with attribution and ordinary visible-tile requests; it is not presented as a Google basemap. The optional Places integration is still unconfigured. Map loading is deferred until visible and a list/directions fallback remains available.

References: [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started), [OSM tile policy](https://operations.osmfoundation.org/policies/tiles/), [Google local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Search and AI discovery

Build-time HTML contains names, addresses, qualifications, fee caveats and source links. Facility schema uses VeterinaryCare and sourced GeoCoordinates; doctor schema uses Person with jobTitle Veterinarian. No invented aggregateRating or human Physician classification is introduced. Breadcrumbs, descriptive titles, canonical URLs, sitemap, internal links, robots.txt, llms.txt and two versioned JSON datasets make the same facts accessible through multiple formats. These are discoverability measures, not ranking or AI-citation guarantees; no special AI schema is claimed.

## Next phases and acceptance criteria

1. **Clinic confirmation and freshness.** Contact/owner-claim workflow, verified authority before changes, per-field source history, review queue, correction audit and configurable recheck schedule. Resolve B. P. Shukla's appointment branch, the Mehta identity independently, and fee/hour conflicts before asserting them. Measure source coverage and outdated records.
2. **Reviews with moderation.** Shared authenticated submissions, visit evidence optional and private, consent, abuse reporting, moderation/appeal tools and publication audit. Current review flow remains an email draft; it must not claim a published review. Keep firsthand reviews separate from external snapshots and do not import full third-party review text.
3. **Appointments and consultations.** Only show slots after a clinic-connected availability system exists. Add confirmation/cancellation/reschedule, reminders with consent, fee inclusion/exclusion, species/urgency triage and doctor identity checks. No guaranteed wait-time claims without measurement.
4. **Cost evidence.** Keep existing working shared band voting; add opt-in procedure-specific reports and moderator-reviewed receipts with private storage/redaction. Display count, date, sample limitations and percentile ranges when the sample supports them. Separate consultation, diagnostics, medication and procedures.
5. **Maps and media.** Configure Google Places with restricted browser key and billing controls, validate branch Place IDs, preserve photographer attribution and API terms. Establish a production tile provider if traffic exceeds the community basemap's practical limits. Add verified accessibility/entrance information and measured route estimates only with a routing integration.
6. **Specialty/locality coverage.** Expand source-supported species and services. Publish locality/specialty landing pages only when useful original comparison content and sufficient real practices exist; avoid thin combinatorial pages. Expand cities after source coverage and maintenance capacity justify it.
7. **Operations.** Permissioned admin, durable backups, spam monitoring, review/cost data retention, accessibility and performance checks, Search Console setup and structured-data validation. Track successful calls/directions, search zero-results, correction turnaround and real booking completion without claiming clinical outcomes.

Shipped in this release: sourced 15-clinic map, eight veterinarian profiles, clinician links/search, map filters/directions/nearby UI, provenance, structured data and crawlable directory integration. The above future systems are not represented as live features.
