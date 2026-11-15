import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const dataset = JSON.parse(readFileSync(new URL('../dist/directory.json', import.meta.url)));
const candidates = JSON.parse(readFileSync(new URL('../research/indore-candidates.json', import.meta.url)));
const ids = new Set(), slugs = new Set();
for (const p of dataset.facilities) {
  assert(!ids.has(p.id), `Duplicate provider ID: ${p.id}`); ids.add(p.id);
  assert(!slugs.has(p.slug), `Duplicate provider slug: ${p.slug}`); slugs.add(p.slug);
  assert.equal(p.cityId, 'indore', `Unexpected pilot city: ${p.id}`);
  assert.notEqual(p.dataSource, 'sample', `Sample provider leaked into public data: ${p.id}`);
  assert(p.name && p.address && p.area, `Missing public identity: ${p.id}`);
  assert(p.evidence?.length, `Missing evidence: ${p.id}`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(p.lastChecked), `Missing research date: ${p.id}`);
  for (const evidence of p.evidence) assert.equal(new URL(evidence.url).protocol, 'https:', `Invalid evidence URL: ${p.id}`);
  if (p.fees) {
    assert(Number.isFinite(p.fees.opd) && p.fees.opd > 0, `Invalid fee: ${p.id}`);
    assert.notEqual(p.fees.trustLevel, 'sample', `Sample fee leaked: ${p.id}`);
    assert(p.evidence.some(e=>/fee|consultation/i.test(e.label)), `Fee has no evidence label: ${p.id}`);
  }
  if (p.feeIsStarting) assert(p.fees && p.feeNote, `Starting price lacks explanation: ${p.id}`);
  if (/conflict/i.test(p.feeNote || '')) assert(!p.fees, `Conflicting fee entered numeric comparison: ${p.id}`);
  assert(!p.rating && !p.reviewCount, `Pilot must not import aggregate review counts: ${p.id}`);
}
for (const candidate of candidates.candidates) {
  assert(!ids.has(candidate.id), `Unresolved research candidate published: ${candidate.id}`);
  assert(candidate.observations.length && candidate.nextActions.length, `Candidate lacks an evidence/action trail: ${candidate.id}`);
}
console.log(`Directory checks passed: ${ids.size} public records; ${candidates.candidates.length} unresolved candidates kept separate.`);
