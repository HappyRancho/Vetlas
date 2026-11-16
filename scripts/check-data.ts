/**
 * Vetlas data-integrity checks (run: node scripts/check-data.ts)
 *
 * Guards that Astro's type checker can't express:
 *   - unique slugs across providers and doctors (routes collide otherwise)
 *   - doctor → provider links resolve and stay within the same city
 *   - provider/doctor slug never collides with a speciality slug in a city
 *     ([city]/[provider] vs [city]/[speciality] would fight for the URL)
 *   - every "public" (research-sourced) record carries lastChecked, evidence
 *     and a confidence level — nothing unverifiable slips in unlabelled
 *   - coordinates, if present, are plausible India coordinates
 *   - specialty references resolve
 */
import { cities, specialties, providers, doctors, cityById } from "../src/data/index.ts";

let failures = 0;
const fail = (msg: string) => { failures++; console.error(`✗ ${msg}`); };
const ok = (msg: string) => console.log(`✓ ${msg}`);

const specialtySlugs = new Set(specialties.map((s) => s.slug));
const specialtyIds = new Set(specialties.map((s) => s.id));
const cityIds = new Set(cities.map((c) => c.id));

// 1. slug uniqueness
{
  const seen = new Map<string, string>();
  for (const p of providers) {
    const prev = seen.get(p.slug);
    if (prev) fail(`duplicate provider slug "${p.slug}" (${p.id} vs ${prev})`);
    else seen.set(p.slug, p.id);
  }
  for (const d of doctors) {
    const prev = seen.get(d.slug);
    if (prev) fail(`duplicate slug "${d.slug}" (doctor ${d.id} vs provider ${prev})`);
    else seen.set(d.slug, d.id);
  }
  if (failures === 0) ok(`all ${providers.length + doctors.length} slugs unique`);
}

// 2. city + specialty references
for (const p of providers) {
  if (!cityIds.has(p.cityId)) fail(`${p.slug}: unknown cityId ${p.cityId}`);
  for (const id of p.specialtyIds) if (!specialtyIds.has(id)) fail(`${p.slug}: unknown specialtyId ${id}`);
  if (p.dataSource === "sample" && !p.cityId) fail(`${p.slug}: sample record without city`);
}
for (const d of doctors) {
  if (!cityIds.has(d.cityId)) fail(`${d.slug}: unknown cityId ${d.cityId}`);
  if (!specialtyIds.has(d.primarySpecialtyId)) fail(`${d.slug}: unknown primarySpecialtyId`);
  for (const id of d.secondarySpecialtyIds) if (!specialtyIds.has(id)) fail(`${d.slug}: unknown secondarySpecialtyId ${id}`);
}
if (failures === 0) ok("all city/specialty references resolve");

// 3. doctor ↔ provider links
for (const d of doctors) {
  for (const slug of d.providerSlugs) {
    const p = providers.find((x) => x.slug === slug);
    if (!p) fail(`doctor ${d.slug}: providerSlugs references missing provider "${slug}"`);
    else if (p.cityId !== d.cityId) fail(`doctor ${d.slug}: practises at ${slug} (${p.cityId}) but cityId is ${d.cityId}`);
  }
}
if (failures === 0) ok("all doctor↔provider links resolve within the same city");

// 4. route-collision guard: slug vs speciality slug inside one city
for (const city of cities) {
  const citySlugs = [...providers, ...doctors].filter((x) => x.cityId === city.id).map((x) => x.slug);
  for (const s of specialties) {
    if (citySlugs.includes(s.slug)) fail(`route collision in /${city.slug}/: "${s.slug}" is both a record and a speciality`);
  }
}
ok("checked [city]/[provider] vs [city]/[speciality] route collisions");

// 5. research records must be fully attributed
for (const p of providers) {
  if (p.dataSource === "sample") continue;
  if (!p.lastChecked) fail(`${p.slug}: public record missing lastChecked`);
  if (!p.evidence) fail(`${p.slug}: public record missing evidence note`);
  if (!p.confidence) fail(`${p.slug}: public record missing confidence`);
}
for (const d of doctors) {
  if (d.dataSource === "sample") continue;
  if (!d.evidence) fail(`doctor ${d.slug}: public record missing evidence note`);
  if (!d.confidence) fail(`doctor ${d.slug}: public record missing confidence`);
}
if (failures === 0) ok("all public records carry lastChecked / evidence / confidence");

// 6. coordinates sanity (India bounding box)
for (const p of providers) {
  if (!p.coordinates) continue;
  const { lat, lng } = p.coordinates;
  if (lat < 6 || lat > 37 || lng < 68 || lng > 98) {
    fail(`${p.slug}: implausible coordinates ${lat},${lng}`);
  }
}
ok("checked coordinates against India bounding box");

// 7. publication gate sanity
for (const city of cities) {
  const inCity = providers.filter((p) => p.cityId === city.id).length + doctors.filter((d) => d.cityId === city.id).length;
  const min = city.isMetro ? 30 : 15;
  if (inCity > 0 && inCity < min) {
    console.log(`• gate: ${city.name} has ${inCity} public profiles (indexable needs ${min} vetted) — stays noindex`);
  }
}

// 8. fee / rating sanity for public records
for (const p of providers) {
  if (p.fees && p.fees.opd < 0) fail(`${p.slug}: negative OPD fee`);
  if (p.rating !== undefined && (p.rating < 0 || p.rating > 5)) fail(`${p.slug}: rating out of range`);
}

console.log(failures === 0 ? "\nAll data-integrity checks passed." : `\n${failures} check(s) FAILED.`);
process.exit(failures === 0 ? 0 : 1);
