# Vetlas — Indore and Pune veterinary directories

Current scope: 15 publicly sourced Indore facilities, 9 Indore veterinarian profiles, plus 88 Pune/PCMC facility records and 33 Pune doctor records from research batches 1–3; no independent clinical-quality verification. Attributed platform rating snapshots show source coverage and possible overlap. Active directory exports exclude development sample data.

See [complete delivery plan](docs/INDORE-DIRECTORY-PLAN.md) for implementation status, research evidence, pricing methodology, review backend requirements and launch gates.

## Run

`npm ci`, `npm run dev`, `npm run check`, `npm run build`.

Maps use Google area previews; the cost planner compares selected published prices with explicit exclusions. Reviews currently prepare an email draft; server-side intake and moderation are planned, not live.

Google Maps photo/live-rating setup: [docs/GOOGLE-PLACES-SETUP.md](docs/GOOGLE-PLACES-SETUP.md). Disabled until a restricted browser key and reviewed branch Place IDs are configured.

Pune expansion: see [directory plan](docs/PUNE-DIRECTORY-PLAN.md) and [research log](docs/RESEARCH-LOG-PUNE.md). Pune content is public-source research, **not Vetlas-verified**. Indore's map, cost comparator and legacy JSON exports remain scoped to Indore; Pune-specific data is accessible through the city and profile pages. Run `npm run check:data` for cross-city integrity validation. Pune pages remain noindex until their editorial publication gate is met.
