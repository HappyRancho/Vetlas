# Indore coverage phase — started 15 November 2026

## Production milestone

PR #7 merged as `232f3c16a9841f23d23bca24498ee5c932f73e95`. Cloudflare production build `1d81313b-19f0-42e6-bc5d-0c375dc6951e` succeeded; version `8c3b9bf3-645a-4434-8780-dffe0b592a69`. Public site: https://vetlas.thatvetguy.net/.

Live checks passed for four sourced records, home/city/search/cost/review routes, consultation arithmetic, mobile horizontal overflow and JavaScript errors. This confirms the deployed pilot, not clinical quality or backend review submission.

## Coverage work begun

The research queue in `research/indore-candidates.json` records four additional candidates: Panacea, Pet Matrix, My Pet Clinic/Dr. Mehta and Zigly. None is automatically published. Panacea and Pet Matrix have street-address discrepancies; My Pet Clinic needs branch/price corroboration and has noisy directory-template data; Zigly needs confirmation that the Indore branch provides veterinary care. Source URLs, access methods and next actions are retained per observation.

Use Reddit as community discovery, then Justdial and Maps for branch lookup, followed by other public/official sources. No new Google reviews or verified coordinates have been collected in this batch. Search-index observations are not described as direct page verification. Do not contact clinics without explicit outreach authorization.

## Data guardrail

Run `npm run build && node scripts/check-directory.mjs` before publishing changes. The check rejects active sample data, duplicate identities, missing provenance, invalid consultation amounts, unresolved conflicting fees in numeric comparisons, and imported review aggregates. It cannot establish whether an external source is accurate; editorial branch checks remain necessary.

## Compactness budget

Keep home sections in the reference order with one featured card. Preserve 16px section gaps, a roughly 185px mobile animal image, compact 78px category tiles, and the floating nav. City controls must remain at least 44px high. New source detail should go on the profile or in an expandable section, not increase homepage height. Check at 390px/430px plus desktop; do not shrink text to compensate for added content.

Next batch: resolve current branch identities and publicly documented locations, then add only adequately supported profiles with unknown fees left unknown. Review backend remains the later milestone in the full plan.
