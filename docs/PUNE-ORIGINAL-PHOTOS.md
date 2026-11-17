# Pune original-photo coverage — research pass (2026-11-17)

Photos are from publicly accessible **clinic websites or third-party public listing pages**, and attributed to their sources. They are not AI-generated, generic stock stand-ins, or an assertion of independent clinical-quality verification.

## Data and display
- The sourced photo catalog is `src/data/pune-photos.json`. Keys are **provider or doctor slugs**, not names. The directory lookup merges only those fields with the underlying Pune records.
- Currently covered: **8 provider facilities** and **6 veterinarians**. Remaining records intentionally use the existing labelled placeholder/initials; this is **not yet complete Pune-wide photo coverage**.
- Provider visuals use `FacilityMedia` / `FacilityVisual`; doctor cards and Pune profile pages show original pictures and clickable source credits. Images have alt descriptions and `onerror` placeholders.
- Remote original image URLs can be changed, removed or blocked at any time. Verify URLs and correct clinic/branch/person identity before public launch.

## Reuse / licensing
Public availability does **not** grant an unrestricted right to republish. Attribution is not a substitute for permission. Obtain permission or confirm a suitable licence from rights holders before distributing or permanently hosting the photographs. For Google Maps content use the official Places API and follow its attribution, caching and display terms; do not silently copy or mirror Maps images into the repository.

## Hasku & Tails / Dr. Deepesh Chawre
- Public Hasku & Tails recruitment listing: https://in.linkedin.com/jobs/view/veterinary-surgeon-at-hasku-tails-4487482845 (shows a Pune veterinary employer and services, but not its exact street address or any current doctor roster).
- Dr. Deepesh Chawre's association was **supplied by the directory editor**. It is labelled user-submitted/unverified, not an independently confirmed employment or credential claim.
- Exact address, direct telephone, hours, current doctor affiliation, fees and both original photo identities still need primary-source confirmation; no photograph has been invented. Directions to the unconfirmed address are deliberately suppressed.

## Validation before merging
1. Run `npm ci && npm run build` and `npm run check:data` on the PR branch.
2. Inspect the built Pune facility, doctor-card and profile pages at mobile and desktop sizes; confirm alt text, image errors, and credit links.
3. Verify each original URL matches the intended facility branch or doctor. Secure required rights for publication.
4. Confirm Hasku's exact location and doctor association with the practice; remove the uncertainty notices only once validated.
