import { readingTables } from "./src/lib/reading-tables.mjs";
import { defineConfig } from "astro/config";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const site = process.env.SITE_URL ?? "https://vetlas.thatvetguy.net";
const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");

export default defineConfig({
  site, trailingSlash: "always",
  markdown: { rehypePlugins: [readingTables] },
  vite: { resolve: { alias: { "@data": fileURLToPath(new URL("./src/data", import.meta.url)) } } },
  integrations: [{
    name: "vetlas-public-sitemap",
    hooks: { "astro:build:done": async ({ dir }) => {
      const root = fileURLToPath(dir);
      const entries = await readdir(root, { recursive: true, withFileTypes: true });
      const urls = [];
      for (const entry of entries) {
        if (entry.name !== "index.html") continue;
        const file = join(entry.parentPath, entry.name);
        const markup = await readFile(file, "utf8");
        if (/<meta[^>]+(?:noindex|http-equiv="refresh")/i.test(markup)) continue;
        const path = relative(root, file).split(sep).join("/").replace(/index\.html$/, "");
        urls.push(new URL(path, site + "/").href);
      }
      const xml = '<?xml version="1.0" encoding="UTF-8"?>';
      const xmlns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
      await writeFile(join(root, "sitemap-0.xml"), xml + '<urlset ' + xmlns + '>' + urls.sort().map(url=>'<url><loc>'+escape(url)+'</loc></url>').join('') + '</urlset>');
      await writeFile(join(root, "sitemap-index.xml"), xml + '<sitemapindex ' + xmlns + '><sitemap><loc>'+escape(new URL("sitemap-0.xml", site).href)+'</loc></sitemap></sitemapindex>');
    }}
  }]
});
