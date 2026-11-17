# Pune Research Log

Session date: **2026-11-16** · All findings below were observed live on this date via web
search (result snippets and fetched pages). Nothing in the directory data was invented; where
a fact could not be observed, the field is absent in `src/data/pune.ts`.

## Access notes & limitations (important)

- **LinkedIn**: profiles and company pages were NOT accessible this pass (login wall).
  Professional-history corroboration is therefore incomplete for all named doctors. Recorded
  here so a future session with access can complete it — per policy, no practice association
  was inferred from old employment entries because none were seen at all.
- **Veterinary Council of India / Maharashtra State Veterinary Council**: registration
  lookup is not exposed via a public search interface; no registration numbers are asserted.
- **Google Maps**: observed via search-result listing snippets (which include address, hours,
  rating, coordinates and dated reviews) rather than an interactive maps session.
- **Justdial / Practo pages**: observed via search snippets; full page fetches were not
  attempted for every listing (rate-limit caution). Where only a snippet was seen, the
  evidence field on the record says so.
- **Reddit/Facebook/Instagram/YouTube**: used for discovery in batch 1 (Instagram handles
  recorded on clinic profiles where the clinic itself links them); no community post was
  treated as evidence of clinical quality.

## Sources used (batch 1)

Official clinic/hospital/NGO websites: raintreevet.in, crown.vet, vetic.in (branch pages),
auravets.in, shivrajpetclinicpune.com, thevetnest.com, lifecareanimal.clinic, metrovet.in,
petcoverpune.com, spcuvet.com, premiumpetshospital.com, petaegisveterinaryhospital.com,
animalwelfarepune.com, bcspune.org, resqct.org, dogwithblog.in (community NGO guide).

Public directories: sploot.space (Pune index + area pages + clinic pages), practo.com,
lybrate.com, myfurries.com, gullydirectory.com, gullytails.com, docindia.org, petcare.ai.

Google Maps listing snippets (place pages surfaced in search) for: Animal World Clinic,
Aura Vets, Shivraj Pet Clinic & Lab, Dr Mohan Deshkar Pet Animal Clinic, Sarvadnya Pet Care
Unit, Government Animal Clinic (Nigdi), Siddhant Pet Clinic, Dr Deepak Autade's GoodWill Pet
Clinic.

## Records added (35 facilities, 22 doctors)

See `src/data/pune.ts` for the authoritative list with per-record evidence. Highlights:

- **24-hour/emergency anchors**: Raintree (Uday Baug; 24h ER + night vet, official site),
  Crown Vet Aundh (24/7, official site), Vetic Kalyani Nagar (24/7, official site + Sploot),
  Animal World Clinic (Mangalwar Peth; 24h per Google listing), Pet Health Clinic (Anand
  Nagar; 24h per Sploot), Tranquil Paws (Baner; 24h per Sploot — **address unconfirmed**).
- **Government / civic**: Government Animal Clinic, Nigdi (₹20 checkup / ₹100 ARV are
  reviewer-reported, not official), SWAP–SPCA Pune (est. 1932), Blue Cross Sunanda Das
  Animal Hospital, Mundhwa (published free-OPD price list; IPD admission by email only).
- **NGO/rescue**: RESQ Charitable Trust (24h helpline is wildlife + large-animal ONLY —
  captured precisely to prevent misuse for pet emergencies), Mission Possible (paralysed-dog
  care), Blue Cross (ABC programmes).
- **Documented adverse themes retained**: Siddhant Pet Clinic Moshi (vaccination-order
  guidance complaint, rude-behaviour complaints), GoodWill Chikhali (treatment-outcome
  complaint), Dr. Deshkar Nigdi (hygiene complaint). Kept deliberately — Vetlas is
  decision-support, not a brochure.

## Conflicts & open questions (unresolved)

1. **Complete Pet Care Clinic (KP)**: Sploot (Oct 2026) vs MyFurries give different street
   addresses; Sploot used. Verify on-site.
2. **Crown Vet Kharadi**: address string references "Shivane Road" despite Kharadi/behind-
   Zensar placement — likely a site copy error; verify. Also: Crown Vet's 24/7 Kalyani Nagar
   branch address not researched to street level yet.
3. **Brahmankar (Undri)**: PetCare.AI hours show a 10:00–14:00 block only; likely truncated.
   Call to confirm extended hours.
4. **Tranquil Paws (Baner)**, **Pet Aid (Kalyani Nagar)**, **Pet's Heaven
   (Magarpatta/Mundhwa)**: street address unconfirmed → recorded `confidence: "low"`; resolve
   or delist in batch 2.
5. **Vetic ratings**: brand pages claim 4.9; Sploot's Google snapshot for Kalyani Nagar says
   4.5 (627). Both recorded where applicable; independent counts missing for NIBM/Aundh/
   Wakad branches.
6. **Petaegis**: dual listings (Kothrud clinic + Hingne Khurd hospital); hospital record kept.
7. **Premium Pets (Moshi)**: 24/7 claim from own site only; ICU staffing unverified.
8. **Sploot snapshot** (207 clinics / 12 open 24h / 79 areas) is a useful completeness
   benchmark; ~172 clinics remain unresearched for future batches.

## Candidate list for batch 2 (discovered, not yet researched)

Hadapsar: AmVet Pet Clinic (4.9/461 Sploot), Alva Animal Care, My Pet Care, Om Sai Pets Care,
Dr. Mali's (Magarpatta). Manjari Budruk cluster. Kondhwa: Animal Medical Services, Fifth
Sense, PetCetera, Fauna Vets (Parvati), Fur N Feather (Tadiwala Rd). Deccan/Bhandarkar Rd:
Dr. Joshi's Vet Clinic. Sadashiv Peth: Animal Health Care (₹200, Lybrate). Bavdhan: Dr
Deesha's, PET-A-HOLIC. Pashan: Dr. Aher's. Baner: Animal Profile Pet Clinic. Pimple
Saudagar: Dr. Gawaskar's, Blue Pulse (Rahatani, Dr. Kapil Dhayaje). Kothrud: Dr. Gorhes Pet
Clinic (Lybrate variant), pet Life Vet Clinic (Dr Biipin Sonar), GRB pet clinic (24h,
4.6/43), Vets For Pets (Dr. Khagol Chavan), Pet Wellness Center. Warje: JANA Pets, Pet
Passion, Dr. Pet (MCC Tower). Katraj: Vet Pet Clinic (Wonder City), N S Veterinary Clinic.
Yerawada: Dr. Vivek Pande (Indira Park). Tingre Nagar/Vishrantwadi: Furballs, Leelai Pet
Care. Dhankawadi: Dr. Amit Nerlekar (Vet For Pets), Shiv Samartha Clinic (24h claim).
Bhosari: SUDHA PETS (4.5/224), Veterinary Polyclinic Pimpri, Dr. Kamble's (2.4/28 — verify
before including), 24h listing behind PDC Bank. Talegaon/Dhruv/Dehu: Samruddhi Pet Clinic.
Home-visit services: Sniffi (Pune+PCMC), Dr. Anil Deshpande (Yerawada home visits, 32 yrs).
Karma Foundation (Aundh NGO).

## Next session checklist

- [ ] Batch 2 area sweeps (list above), keeping per-record evidence discipline
- [ ] Resolve the 5 open conflicts (call-verify or delist)
- [ ] Fetch + read remaining official sites not fully read this pass (spcuvet.com,
      petcoverpune.com subpages)
- [ ] Attempt LinkedIn/VCI research if access available; record outcomes either way
- [ ] Photos: only with verified usage rights; otherwise skip (no fabricated imagery)
- [ ] Re-run `npm run check:data` and `npm run build` after every batch

---

# BATCH 2 (same day, second research pass)

## Sources used (batch 2)

- **Sploot area pages** (fetched directly): /area/hadapsar, /area/kondhwa, /area/kothrud,
  /area/warje, /area/bhosari, /area/manjari-budruk, /area/rajiv-gandhi-infotech-park,
  /area/wakad, plus the /vets/city/pune index and its "government veterinary hospitals in
  Pune" guide section. Each page yields name + Google rating snapshot + count + 24h flags.
  /area/katraj and /area/pimple-saudagar returned 404 (areas spelled differently or absent).
- **Google Maps derived listings** (via search-snippet place pages): The Pet Specialist,
  G.R.B. Pet Clinic, Zigly Kothrud, Aruna Anand Pet Clinic / Dr. Salunkhe (Hinjawadi).
- **Aggregators/directories**: ProMallu (Google-derived, includes women-owned attribute and
  split hours), Justdial (AMS insights incl. negative themes), Practo (AMS clinic page,
  Hadapsar vet list), myUpchar (Dr. Sagar Bhongle bio), Timesmed, Haduk, Petofy,
  GullyDirectory, MyFurries, Happy Tails (Pet's Heaven trust-audit page), Yappe.
- **Official sites**: vetic.in/clinics/pune/hadapsar (5th branch), petcoverpune.com,
  petpalaceclinic.com (includes coordinates), thevetnest.com (re-confirmed batch-1 record).

## Records added (batch 2): 26 facilities (pnp36–pnp61), 7 doctors (pnd23–pnd29)

Highlights: Animal Medical Services Kondhwa (surgery-heavy, 4.4/1,024 Google + Practo 5.0/418,
Dr. Sagar Bhongle); The Pet Specialist Hinjawadi (4.9/638, women-owned, Dr. "Abhishek");
AmVet/Om Sai/Sniffy Nose/Alva/Vetic Hadapsar cluster; Wakad cluster (Caring Hands, Dr. Devde's,
MH14 Animal Hospital/Earth Charitable Foundation); Kothrud additions (Pet Wellness Center,
Vets For Pets/Dr. Khagol Chavan, Zigly chain, pet Life/Dr. Biipin Sonar); Warje (Pet Passion
4.7/319); PCMC (Mon Ami Pimple Nilakh, Homely Vet Old Sangvi, SUDHA PETS Bhosari); Kharadi
(Healthy Tails); govt/NGO nodes (Karma Foundation Aundh, Govt Vet Polyclinic + May-2025
Super-Specialty Hospital Aundh, PCMC Animal Government Hospital Bhosari); PetCetera (Dr.
Anjali Dave); Vivek Pande's Pet Clinic Yerawada; Pet Palace Hadapsar (own-site coordinates).
Enriched batch-1 record: Dr. Gorhe's Pet Cover (Google 4.4/~1,200 snapshot, split hours,
Sunday closed, coordinates).

Eight thin records (Sniffy Nose, Caring Hands, Dr. Devde's, Pet Passion, Mon Ami, Homely Vet,
Healthy Tails, SUDHA PETS, pet Life) carry area + rating snapshot only, with street addresses
marked "pending verification" — confidence: low, deliberately kept out of any "verified" claim.

## New conflicts & open questions (batch 2)

1. **GRB Pet Clinic**: Google-derived data places it in Aundh Gaon (3.9/157, open 24h, Nov
   2026) while Sploot lists "GRB pet clinic (4)" under Kothrud (4.6/43, open 24h). One brand
   with two branches or a mis-mapped single clinic — call to resolve. Recorded under Aundh.
2. **AMS address**: Practo says "21, Sunshree Suntek"; Timesmed/Haduk say "12". AMS hours also
   conflict (Sploot 9–9 Mon–Sat vs Practo/Haduk 10:30–16 + 18–21, Sun 10:30–12:30).
3. **Alva Animal Care** (Hadapsar): GullyDirectory address (Magarpatta Chowk, Nobel gate) vs
   MyFurries address (Shop 10, Gandharva Serenity, Bhosale Garden). Own site alvapetclinic.com
   not yet fetched — next pass.
4. **Vets For Pets / Samvedna** (Kothrud): identical address + phones (9960292239) under two
   names on MyFurries; treated as one practice with dual names.
5. **Vivek Pande's Pet Clinic** (Yerawada): same Indira Park CHS address appears under
   "Animedics Pet Health Care Center" on GullyDirectory — possible earlier name.
6. **Zigly Kothrud** rating differs across snapshots (Sploot 4.5/62 vs Google-derived 4.6/78);
   both recorded, evidence field explains.
7. **Government vet hospitals**: Sploot's guide states the Aundh Road polyclinic was free in
   2021 but lacked CT/MRI/sonography/in-patient ward, and that a Super-Specialty Veterinary
   Hospital opened in Aundh in May 2025. No official government page found; charges/hours
   unpublished. Emergency guidance: no government vet hospital found open 24h — private
   clinic first for night emergencies; Blue Cross stray helpline 1800-419-9005; 1962
   helpline 7am–6pm Mon–Sat (mobile vet units); ZP DAO 020-26131799 (228 clinics district-wide).
8. **Dr. "Abhishek" (The Pet Specialist)**: first name only, from review text; no surname or
   credentials published — no doctor record created.
9. **Sploot snapshot counts** are Google snapshots taken at unknown earlier months; where a
   newer Google-derived figure exists (GRB, Zigly), both are recorded.

## Remaining batch-2 candidates (not researched this pass)

Deccan Gymkhana (Dr. Joshi's), Sadashiv Peth (Animal Health Care), Bavdhan (Dr. Deesha's,
PET-A-HOLIC, Petology 4.9/169, PetFix, Animedics Bavdhan), Pashan (Dr. Aher's, Vet For Pet
Sus Road), Baner (Animal Profile), Pimple Saudagar/Rahatani (Dr. Gawaskar's, Blue Pulse/Dr.
Kapil Dhayaje), Katraj (Vet Pet Clinic Wonder City, N S Veterinary Clinic), Dhankawadi (Dr.
Amit Nerlekar/Vet For Pets, Shiv Samartha 24h claim), Tingre Nagar/Vishrantwadi (Furballs,
Leelai), Manjari Budruk cluster (PVD Diagnostics 4.9/45, Dr. Tejankar, PetWellSoon), Aundh
additions (The Pets Gallery 5/117, Pet Doc 24/7 claim, Small Animal Clinic Sakal Nagar 342
reviews), Hadapsar (VetXpert, My Pet Care Veterinary Centre, Dog & Cat Clinic Gadital,
Pet Junction Sasane Nagar), Wanowrie/Bibwewadi, Kalyani Nagar (Small Animal Clinic Hermes
Waves?), Dighi (Pet's Vision 174 reviews), home-visit services (Sniffi app, Dr. Anil
Deshpande 32-yr claim), Wagholi/Lohegaon/Dhanori.

## Batch-2 checklist status

- [x] Batch 2 area sweeps (Hadapsar/Kondhwa/Kothrud/Warje/Wakad/Hinjawadi/Bhosari + PCMC/govt)
- [ ] Resolve the 5 open batch-1 conflicts (call-verify or delist) — still open
- [x] Fetch remaining official sites partially (vetic.in Hadapsar added; spcuvet.com and
      petcoverpune.com subpages still pending)
- [x] LinkedIn/VCI re-attempt — not attempted again this pass (same environment); stays open
- [ ] Call-verify the 10 low-confidence (area-only) records to collect addresses/phones
- [ ] Photos: only with verified usage rights; otherwise skip (no fabricated imagery)
- [x] Re-run `npm run check:data` and `npm run build` after batch (343 pages, 0 errors)

## Batch 3 (2026-11-16, third pass): 27 facilities (pnp62–pnp88), 4 doctors (pnd30–pnd33)

Focus: Katraj–Bibwewadi–Wanowrie corridor, Erandwane/Deccan side, Bavdhan,
Pimple Saudagar/Wakad-adjacent periphery, Wagholi/Dighi, and home-visit services.

### Records added (batch 3)

- **Companion Pet Clinic & Surgical Centre, Katraj** (pnp62): full Google-derived
  dataset — 4.6/657, "open 24 hours", Sun Market Road near Katraj–Kondhwa Road;
  Dr. Mahesh Raut named in listing title. Surgery-heavy dated reviews
  (orthopaedic repair, spays, dental); second surgeon "Dr. Uddav" in reviews.
  Doctor record pnd30. **Conflicts:** a second address (13 Vaishnavi Empire,
  Shree Ganesh Nagar, Kondhwa Budruk) appears on Yappe — possible second location.
- **Dr. Brahmankar's Vet, Handewadi** (pnp63): 4.5/~24 (Google snapshot via Yappe);
  hours 9:30–20:30 Mon–Sat, Sun 10–18. **Enrichment:** pnd08
  (dr-mahesh-brahmankar) `providerSlugs` += `brahmankars-vet-handewadi`.
- **Dr. Katre's Pet Clinic, Bibwewadi** (pnp64): 4.6/246 total but mixed recent
  themes (pricing/behaviour complaints in 2025 reviews); retained honestly.
- **Tulpule's Pet Care Clinic, Wanowrie** (pnp65): Yappe 4.6/557; Dr. Deepak
  Tulpule (pnd31, Practo: 33 yrs, 94%, ₹500). Possible second "Manas" location
  in Erandwane (Sploot snapshot).
- **Erandwane cluster** (pnp66–68): PET-AID branch (4.4/329; enrichment), Petmax
  branch (brand listings), Metrovet (diagnostics/lab listing).
- **Aundh/Sakal Nagar cluster** (pnp69–71): The Pets Gallery, Vets On Main,
  Small Animal Clinic; **Pritam Pet Clinic** (Dr. H. N. Patil, pnd32, 4.7/29).
- **Bavdhan cluster** (pnp72–74): Petology, Dr. Deesha's, PetFix — mostly
  directory-sourced, confidence medium/low.
- **Home-visit services** (pnp75–77): **Sniffi** (official site sniffi.in,
  founded 2025, Pune + PCMC house-call service — rare with an official site),
  Dr. Anil Deshpande (Yerawada home visits), Pet Home Visit Katraj
  (Dr. Saagar M.S., MyFurries only, no rating).
- **Periphery/south-west** (pnp78–88): Anandi (Ambegaon Budruk), Dr. Dahekar
  (Sasane Nagar), Dr. Singhal (Pimple Nilakh), Animal and Pet Care Clinic
  (Wagholi, 24h *advertised*), Pets Vision (Dighi), Pet Ozone (Pimple
  Saudagar), Fur's (Thergaon), Dr. Nerlekar's (Dhankawadi), Pet Junction
  (Sasane Nagar).
- **Enrichments to batch-1/2 records:** pnp02 Crown Vet Aundh 4.4/600; pnp05
  Vetic Aundh 4.6/658; pnp24 Pet Aid Kalyani 4.4/329; pnp20 SWAP–SPCA
  enriched — 3.5/130, coordinates, 10:00–17:00 Mon–Sat, official name **Sir
  Manekji Mehta Veterinary Hospital** recorded; same phone (020-26444960) on
  official site and Google listing confirms same facility; pnp50 Pet Passion
  address (NDA Road, Warje Jakat Naka); pnp46 GRB + pnp56 Govt hospital
  evidence notes from Sploot Aundh snapshots.

### New conflicts & open questions (batch 3)

1. **Sir Manekji Mehta Veterinary Hospital (SPCA) vs SWAP** — RESOLVED this
   pass: Google listing shares the official site's phone; treated as one
   organisation, formal name recorded in the about text.
2. **Companion Pet Clinic** second address (13 Vaishnavi Empire, Kondhwa
   Budruk) on Yappe vs primary Sun Market Road listing — call to confirm.
3. **Petmax / PET-AID / MetroVet (Erandwane)**: shared storefront addresses;
   brand relationships (franchise vs co-located) unpublished.
4. **Tulpule's "Manas" Erandwane listing**: same doctor name on Sploot's
   Erandwane page — second location or stale listing.
5. **Dr. Katre's**: good aggregate (4.6/246) but negative 2025 review themes
   (pricing, staff behaviour) — retained with both recorded.
6. Sniffi: young company (2025); no doctor credentials published; provider-
   confirmed status not yet available.
7. LinkedIn/VCI re-attempt: not attempted again (same environment constraints).

### Sources used (batch 3)

- Sploot area pages (aundh, bavdhan, erandwane) — Google-snapshot aggregates
- Google-derived listings via Yappe/MyFurries aggregates
- Justdial Katraj/Handewadi pages (Dr. Brahmankar's, Pet Home Visit)
- sniffi.in (official site)
- Practo Hadapsar veterinarian list (Dr. Tulpule)
- Review text (dated) for surgical/care themes

### Batch-3 checklist status

- [x] 27 new facilities + 4 doctors researched, all `dataSource: "public"`
- [x] SWAP–SPCA enriched (rating/coords/hours/formal name)
- [x] Ratings for Crown/Vetic/Pet Aid captured
- [x] `npm run check:data` — pass; `npx astro check` — 0 errors; `npm run build` — 373 pages
- [ ] Call-verify low-confidence records (incl. batch-3 thin ones: Metrovet,
      Petmax, Pets Gallery, Vets On Main, Small Animal Clinic, PetFix,
      Dr. Dahekar, Dr. Singhal, Fur's, Pet Junction, Pets Vision, Pet Ozone)
- [ ] Photos: only with verified usage rights; otherwise skip
