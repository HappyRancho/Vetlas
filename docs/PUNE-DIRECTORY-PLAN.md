# Pune Directory Plan — Vetlas expansion

Status: **in progress** · Research batches 1–3 landed 2026-11-16

## Why Pune, why now

Pune + Pimpri-Chinchwad (PCMC) form a ~7–8 million metro with a dense, well-documented
veterinary ecosystem. Pune already existed in Vetlas's city taxonomy; this expansion turns it
into the platform's first real-data city while Indore's architecture stays generic.

## What landed in batch 1

- **35 facility records** (`src/data/pune.ts`) + **22 veterinarian records**, all
  `dataSource: "public"`, each with sources, evidence notes, confidence and last-checked date.
- Coverage across ~23 localities of PMC, PCMC and central Pune (see `puneLocalities`),
  including NGO (Blue Cross, RESQ, Mission Possible, SWAP–SPCA) and government (State AH dept
  clinic, Nigdi) facilities alongside private clinics/hospitals.
- Data model extended: `confidence`, `evidence`, `hoursNote`, `sources.practo`; Doctor
  `experienceYears`/`consultationFee`/`rating`/`reviewCount` became optional so unverified
  facts are omitted rather than guessed.
- City page now renders a derived locality strip and a data-driven publication-gate notice;
  all hardcoded "Indore pilot" strings generalised.
- Publication gates remain closed (Pune needs 30 *vetted* profiles to index; batch 1 records
  are public-source, not vetted) — `/pune/` stays noindex until a verification pass.

## What landed in batch 2 (same day)

- **+26 facility records** (pnp36–pnp61) and **+7 doctor records** (pnd23–pnd29): Kondhwa
  surgery hub (AMS/Dr. Sagar Bhongle), Hinjawadi (The Pet Specialist), Hadapsar cluster,
  Wakad, Kothrud, Warje, PCMC (Old Sangvi, Pimple Nilakh, Bhosari), Kharadi, plus government
  (Aundh polyclinic + May-2025 super-specialty, PCMC Bhosari) and NGO (Karma Foundation) nodes.
- `ProviderType` extended with `ngo` / `government`; `sources` extended with honest
  `aggregate` (Sploot/Yappe snapshots) and `directory` (GullyDirectory/Timesmed/Petofy) keys.
- 10 thin records carry area + rating snapshot only (addresses marked pending; confidence:
  low) — never presented as complete listings.
- New conflicts logged (GRB Aundh-vs-Kothrud, AMS address/hours, Alva dual address,
  Vets-For-Pets/Samvedna dual name, Vivek Pande/Animedics) — see RESEARCH-LOG-PUNE.md.
- Build: 343 pages; `astro check` 0 errors; `check:data` passing.

## What landed in batch 3 (same day)

- **+27 facility records** (pnp62–pnp88) and **+4 doctor records** (pnd30–pnd33):
  Katraj–Bibwewadi–Wanowrie corridor (Companion Pet Clinic surgery hub, Dr. Katre's,
  Tulpule's Pet Care Clinic), Erandwane (PET-AID/Petmax/Metrovet), Bavdhan
  (Petology, Dr. Deesha's, PetFix), Aundh/Sakal Nagar (Pritam, Pets Gallery,
  Vets On Main, Small Animal Clinic), home-visit services (Sniffi with an
  official site, Dr. Anil Deshpande, Pet Home Visit Katraj), and periphery
  (Wagholi, Dighi, Pimple Saudagar, Thergaon, Dhankawadi, Ambegaon, Sasane Nagar).
- Dataset totals: **88 facilities, 33 doctors** for Pune; ~34 localities listed.
- Enriched earlier records: SWAP–SPCA formal name (Sir Manekji Mehta Veterinary
  Hospital) + rating/coords/hours; Crown Vet, Vetic, Pet Aid ratings; Pet
  Passion address; Dr. Brahmankar linked to Handewadi location.
- Build: 373 pages; `astro check` 0 errors; `check:data` passing.

## Geographical coverage strategy

Research is area-driven, not count-driven. Priority order (from directory snapshots, e.g.
Sploot's 207-clinic Pune index showing 79 covered areas):

1. **Batch 1 (done)**: high-traffic PMC areas (Aundh, Baner, Kothrud, Koregaon Park, Kalyani
   Nagar, Warje, Sinhgad Rd, Kharadi, Viman Nagar, NIBM/Undri, Mundhwa) + PCMC (Pimple
   Nilakh, Thergaon/Wakad, Punawale, Nigdi, Bhosari, Moshi, Chikhali) + NGO/government +
   24-hour/emergency anchors (Raintree, Crown Vet Aundh, Vetic Kalyani Nagar, Animal World).
2. **Batch 2 (done)**: Hadapsar/Gadital/Amanora, Kondhwa/NIBM, Kothrud, Warje, Wakad,
   Hinjawadi Phase II, Old Sangvi, Bhosari (govt), Aundh (govt/NGO), Yerawada, Kharadi;
   remaining from the batch-2 list (Katraj, Deccan, Bavdhan, Pashan, Pimple Saudagar,
   Dhankawadi, Tingre/Vishrantwadi, Manjari, Talegaon, home-visit services) carried forward.
3. **Batch 3**: long tail via Justdial/JustDial-style per-area sweeps; verify/bump existing
   records; source photos where usage rights permit.

## Research standards (binding)

- Multi-source: official site > Google Maps listing > Practo/Lybrate > Justdial/MyFurries/
  GullyDirectory/Sploot > community guides (Reddit/Facebook/Instagram as discovery, not proof).
- Never invent: missing fields are omitted; UI shows "not verified".
- Ratings are platform-attributed snapshots; negative themes recorded alongside positive.
- "24/7" claims labelled advertised vs confirmed; profiles tell users to call before night trips.
- Self-published credentials ≠ verified qualifications (VCI/Maharashtra council registers are
  not publicly searchable; LinkedIn was login-walled in batch 1 — see log).
- Every record: `evidence` (what was seen, where, what's unresolved), `confidence`,
  `lastChecked`.

## Publication & SEO

- `/pune/` hub + provider/doctor profiles + city×speciality pages already exist and build
  (310 pages total). All gated pages remain noindex; sitemap excludes them by design.
- When gate passes: flip is automatic via `cityPublishGate()`; no template edits.
- llms.txt documents the mixed dataset honestly; each profile exposes research notes.

## Verification backlog (to become "vetted")

1. Call-verify phone + hours for the ~15 medium-confidence batch-2 records (AMS, GRB, Alva,
   Pet Wellness, Vets For Pets, Zigly, MH14, The Pet Specialist, AmVet, Om Sai, Vetic
   Hadapsar, Karma, Vivek Pande's, Pet Palace, PetCetera).
2. Collect street addresses/phones for the 10 area-only low-confidence records (Sniffy Nose,
   Caring Hands, Dr. Devde's, Pet Passion, Mon Ami, Homely Vet, Healthy Tails, SUDHA PETS,
   pet Life) or delist them.
3. Resolve the 5 batch-1 conflicts + 5 batch-2 conflicts (call-verify; see research log).
4. Collect council registration numbers for named doctors where public records/consent allow
   (incl. AMS's self-published MSVC.6603 claim).
5. Obtain provider confirmation (email/WhatsApp) for top-10 highest-traffic records to move
   them to "provider-confirmed".
