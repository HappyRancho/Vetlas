// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * Vetlas — Astro config (Vetlas spec §5, §8)
 *
 * Static output (SSG) deployed to Cloudflare Workers Static Assets:
 * server-rendered HTML at build time, zero client-JS framework runtime,
 * fits the free tier exactly. The data layer (src/data) is
 * framework-agnostic and mirrors db/schema.sql (D1), so switching to
 * on-demand SSR (adapter @astrojs/cloudflare) + D1 later requires no
 * page rewrites.
 */

/** Pages that are indexable in the demo (everything gated by spec §2/§6 is excluded) */
const INDEXABLE = [
  "/",
  "/search/",
  "/specialties/",
  "/locations/",
  "/costs/",
  "/about/",
  "/methodology/",
];

export default defineConfig({
  site: process.env.SITE_URL ?? "https://vetlas.thatvetguy.net",
  integrations: [
    sitemap({
      // Publication gates (spec §2, §6): only publish-worthy URLs are listed
      filter: (page) => {
        const path = new URL(page).pathname;
        return INDEXABLE.includes(path);
      },
    }),
  ],
  trailingSlash: "always",
  vite: {
    resolve: {
      alias: {
        "@data": new URL("./src/data", import.meta.url).href,
      },
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
});
