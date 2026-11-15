# Vetlas — Indore pilot

Current scope: eight publicly sourced Indore facilities; no independent clinical-quality verification. Attributed platform rating snapshots show source coverage and possible overlap. Active directory exports exclude development sample data.

See [complete delivery plan](docs/INDORE-DIRECTORY-PLAN.md) for implementation status, research evidence, pricing methodology, review backend requirements and launch gates.

## Run

`npm ci`, `npm run dev`, `npm run check`, `npm run build`.

Maps use Google area previews; the cost planner compares selected published prices with explicit exclusions. Reviews currently prepare an email draft; server-side intake and moderation are planned, not live.

Google Maps photo/live-rating setup: [docs/GOOGLE-PLACES-SETUP.md](docs/GOOGLE-PLACES-SETUP.md). Disabled until a restricted browser key and reviewed branch Place IDs are configured.
