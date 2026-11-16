# Compact cards and visit information — 15 November 2026

## Design review

Studied HappyRancho/Notes.thatvetguy.net (homepage source, assets/homepage.css and the rendered mobile page at https://notes.thatvetguy.net/). Useful principles: a recognisable purpose-led masthead, soft colour by content type, readable white cards, short paths to actions, compact mobile navigation and varied but consistent section styling. Vetlas applies those principles with mint/teal veterinary identity, amber fees/ratings, blue and lilac service accents, photographic discovery tiles and pet categories. The existing dog/cat header remains across the site.

The reported empty space came from `.save-facility { margin-left: auto }`. Cards now use a predictable three-column action grid spanning the available width. Facility photography sits beside the name, location, associated doctors and services. Timings and consultation prices sit immediately above Save / Call / Directions. Profiles group hours, doctor sessions, contact information and fees into a visit panel. Evidence and photo credits remain accessible without repeated warning panels.

## Evidence and price handling

All 15 branches retain their existing sourced map coordinates and facility photos. All now have `visitHours` with a timetable, source URL and check date in `src/data/visit-details.json`. Prefer the clinic's own site where available; remaining schedules were read on the exact-address Nuzzy branch pages. Google Maps observations corroborated several Sunday sessions, but a Sunday-only result was not extrapolated to the whole week.

- PetVet, Pet Matrix, Happy Tails, Royal's two branches, Myra, Dogsvilla, Animal Veterinary Hospital and V Care: official clinic sites.
- Nigam, My Pet Clinic, Prime Vet, PetWell, Pet's Mate and PetnVets: exact-branch Nuzzy pages (URLs stored per record).
- Royal distinguishes clinic opening hours from Dr. Abhay Patel's consultation sessions.
- Myra's website shows daily 10 AM–9 PM; Practo shows a shorter Sunday session. The difference is retained in the profile details.
- V Care website hours differ from Google's 24-hour label. PetnVets' Nuzzy 24-hour label differs from the observed Sunday Maps timetable. Both explicitly require a call for overnight availability.

Prices are consultation charges, not vaccination, grooming, boarding, treatment packages or total visit costs:

| Facility | Display | Treatment |
| --- | --- | --- |
| Myra | ₹200 | Existing published consultation fee |
| Dogsvilla | From ₹300 | Existing starting fee |
| Nigam | ₹200–₹300 | Differing Justdial/Practo prices, excluded from averages |
| Royal Ganeshganj | ₹300 previously listed | Older Justdial snapshot, ask current fee; excluded from averages |
| My Pet Clinic | ₹200 previously listed | Timesmed's older EB137 address, not a current quote for D1/G3–6; excluded from averages |
| Other facilities | Ask clinic | No defensible clinic-specific consultation price found |

Searches covered clinic websites, Google Maps, Justdial, Practo, Timesmed, Drlogy, Nuzzy and other public results. Rejected generic category price ranges and apparent placeholder directory prices (including a petcare.ai veterinarian result containing a phone-product description). No synthetic reviews, quotes or votes were added. Existing community cost voting remains separate from consultation fees. Public sources do not establish clinical quality or independently validate qualifications.

## Doctor photography

Named portraits downloaded from pages explicitly identifying the doctor:

- Narendra Chouhan: https://www.myrapetclinic.co.in/
- Rashmi Khandelwal: https://www.happytailspet-clinic.com/
- Amrit Lal Sharma: https://www.indorepetvet.com/
- Abhay Patel: https://www.royalveterinaryclinic.shop/about
- Hemant Mehta: https://www.timesmed.com/Doctor/Indore/dr-hemant-mehta-70912 (browser-loaded named portrait; user previously confirmed H. K. / Hemant identity)

Original image URLs and page attribution are preserved in the veterinarian dataset and linked from profile details. Dr. Abhay Patel's official clinic page supports adding the ninth doctor profile and the two Royal practice associations. Unidentified people in group images were not assigned to doctors. The inaccessible Ashutosh Nigam portrait URL was not replaced with an invented face. Pet category photos are illustrative Unsplash assets, separately credited on About.

## Validation

Run Astro check/build, ratings/cost unit tests, directory and map data checks, and browser suites for search, maps, responsive layouts, shared cost voting and compact cards. Write tests use local Durable Objects only; production verification is read-only. Google Places remains prepared but unconfigured until an API project/key is supplied.
