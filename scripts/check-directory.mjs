import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const dataset = JSON.parse(readFileSync(new URL('../dist/directory.json', import.meta.url)));
const candidates = JSON.parse(readFileSync(new URL('../research/indore-candidates.json', import.meta.url)));
const mappings = JSON.parse(readFileSync(new URL('../src/data/google-places.json', import.meta.url)));
const sitemap = readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
const ids = new Set(), slugs = new Set();
for (const p of dataset.facilities) {
  assert(!ids.has(p.id), `Duplicate provider ID: ${p.id}`); ids.add(p.id);
  assert(!slugs.has(p.slug), `Duplicate provider slug: ${p.slug}`); slugs.add(p.slug);

  assert.notEqual(p.dataSource, 'sample', `Sample provider leaked into public data: ${p.id}`);
  assert(p.imageUrl && p.imageLicenseUrl, `Missing approved photograph: ${p.id}`);
  if (p.imageUrl) {
    assert(p.imageSourceUrl && p.imageCredit && p.imageAlt);
    assert(readFileSync(new URL('../public' + p.imageUrl, import.meta.url)).length > 1000);
  }
  assert(p.name && p.address && p.area, `Missing public identity: ${p.id}`);
  assert(p.evidence?.length || (p.researchNote && Object.values(p.sources ?? {}).length), `Missing evidence: ${p.id}`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked), `Missing research date: ${p.id}`);
  for (const evidence of p.evidence ?? []) assert(['https:', 'http:'].includes(new URL(evidence.url).protocol), `Invalid evidence URL: ${p.id}`);
  if (p.fees) {
    assert(Number.isFinite(p.fees.opd) && p.fees.opd > 0, `Invalid fee: ${p.id}`);
    assert.notEqual(p.fees.trustLevel, 'sample', `Sample fee leaked: ${p.id}`);
    assert(p.researchNote || p.evidence.some(e=>/fee|consultation/i.test(e.label)), `Fee has no evidence label: ${p.id}`);
  }
  if (p.feeIsStarting) assert(p.fees && p.feeNote, `Starting price lacks explanation: ${p.id}`);
  if (/conflict/i.test(p.feeNote || '')) assert(!p.fees, `Conflicting fee entered numeric comparison: ${p.id}`);
  assert(sitemap.includes(`/${p.cityId}/${p.slug}/`), `Published profile missing from sitemap: ${p.id}`);
  if (p.coordinates) {
    assert(Number.isFinite(p.coordinates.lat) && Math.abs(p.coordinates.lat) <= 90);
    assert(Number.isFinite(p.coordinates.lng) && Math.abs(p.coordinates.lng) <= 180);
    assert(p.coordinateSource && p.evidence.some(e => e.url === p.coordinateSource), `Coordinate provenance missing: ${p.id}`);
  }
  const platforms = new Set();
  for (const r of p.platformRatings ?? []) {
    assert(!platforms.has(r.platform), `Duplicate rating platform: ${p.id}`); platforms.add(r.platform);
    assert(r.score >= 1 && r.score <= 5 && Number.isFinite(r.score));
    assert.equal(new URL(r.url).protocol, 'https:');
    assert(/^\d{4}-\d{2}-\d{2}$/.test(r.checkedAt));
    assert(['platform','cross-web','republished'].includes(r.kind));
    assert(['search-index','page','api'].includes(r.access));
    if (r.count !== undefined) assert(Number.isInteger(r.count) && r.count >= 0);
    if (r.access === 'search-index') assert(r.note, `Snapshot needs freshness note: ${p.id}`);
  }
  if (p.cityId === "indore") assert(!p.rating && !p.reviewCount, `Pilot must not import aggregate review counts: ${p.id}`);
}
const portraits = JSON.parse(readFileSync(new URL('../dist/veterinarians.json', import.meta.url))).veterinarians;
for (const vet of portraits) {
  assert(vet.imageLicenseUrl && vet.imageSourceUrl && vet.imageCredit && vet.imageAlt, `Incomplete portrait rights: ${vet.id}`);
  assert(readFileSync(new URL('../dist' + vet.imageUrl, import.meta.url)).length > 1000);
}
for (const candidate of candidates.candidates) {
  if (candidate.status !== 'published-public-source') assert(!ids.has(candidate.id), `Unresolved research candidate published: ${candidate.id}`);
  assert(candidate.observations.length && candidate.nextActions.length, `Candidate lacks an evidence/action trail: ${candidate.id}`);
}
for (const [id, mapping] of Object.entries(mappings)) {

  assert(mapping.placeId && !/REPLACE|EXAMPLE|TEST/i.test(mapping.placeId), `Unreviewed Place ID: ${id}`);
  assert.equal(new URL(mapping.sourceUrl).protocol, 'https:');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(mapping.checkedAt));
}
console.log(`Directory checks passed: ${ids.size} public records; ${candidates.candidates.filter(c => c.status !== 'published-public-source').length} unresolved candidates kept separate.`);
