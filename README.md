# Vetlas — Indore pilot

Current scope: four real, publicly sourced Indore clinics; no independent quality verification or imported ratings. Active directory exports exclude development sample data.

See [complete delivery plan](docs/INDORE-DIRECTORY-PLAN.md) for implementation status, research evidence, pricing methodology, review backend requirements and launch gates.

## Run

`npm ci`, `npm run dev`, `npm run check`, `npm run build`.

Maps use Google area previews; the cost planner compares selected published prices with explicit exclusions. Reviews currently prepare an email draft; server-side intake and moderation are planned, not live.
