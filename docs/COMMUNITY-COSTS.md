# Shared cost voting

The existing Cloudflare Worker now serves Astro's static output through `ASSETS`, and routes `/api/*` to `worker/index.js`. SQLite-backed Durable Objects provide persistent, shared storage without an external database or application account. Wrangler creates the binding and class using the `cost-votes-v1` migration during deployment. Keep this migration in later releases. Cloudflare account quotas and billing still apply; no separate API key is required.

Build: `npm ci && npm run build`. Deploy: `npx wrangler deploy` (the existing Cloudflare Builds production command). A preview-only `wrangler versions upload` cannot perform a new Durable Object migration; use the production deploy for first provisioning. Local: `npm run build && npx wrangler dev --port 4324 --persist-to ../vetlas-votes-local`.

`GET /api/cost-votes/{id}` returns aggregate bands, estimated/exact means, sample counts and only this browser's own vote. It creates an HTTP-only SameSite=Strict cookie. `POST` accepts `{band, amount: integer|null, consent: true}` with a matching Origin and cookie. `DELETE` removes this browser's vote. Unknown facility IDs are rejected. Bodies are limited to 2 KiB, exact values must fit the selected band, and 20 mutations per network/facility/day are allowed. A salted daily hash is used for the network; raw addresses are not stored. Clearing cookies can permit another vote: this is deliberately not represented as unique-person verification.

Totals include consultation and all extras. Exact amounts replace range midpoints; open-ended votes without an amount do not enter the average. Results are labelled estimates, show the denominator, and mark fewer than 10 reports as a small sample. No fabricated starter votes. Reports expire 365 days after submission. Details are published at `/methodology/` and `/privacy/`.

Validation: `npm run test:costs`, `npm run test:ratings`, `npm run check:directory`, and `VETLAS_TEST_URL=http://127.0.0.1:4324 npm run test:voting-api` against a local instance only. The API test creates temporary local votes and deletes them; never run it against production. Browser tests exercise independent visitor contexts, reload, updates and removal.

Failure behavior: the form remains disabled until the shared API loads, reports failures and offers a retry. There is no browser-only success fallback. Real review submissions remain the separately labelled email-draft workflow; they are not silently published through this API.
