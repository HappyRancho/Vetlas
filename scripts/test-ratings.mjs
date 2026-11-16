import { test } from 'node:test';
import assert from 'node:assert/strict';
import { summarizeRatings } from '../src/lib/ratings.mjs';
const source = (platform, score, extra = {}) => ({platform, score, kind:'platform', checkedAt:'2026-11-15', ...extra});
test('equal platform weight, not a pooled review average', () => {
  const result = summarizeRatings([source('Practo',4.5,{count:108}),source('Justdial',4.1,{count:582,kind:'cross-web'})]);
  assert.equal(result.average,4.3); assert.equal(result.platformCount,2);
  assert.equal(result.sources[0].count,108); assert.equal(result.sources[1].count,582);
});
test('unknown is null; one source is explicitly one platform', () => {
  assert.equal(summarizeRatings().average,null);
  const result=summarizeRatings([source('Google Maps',4.8)]);
  assert.equal(result.average,4.8); assert.equal(result.platformCount,1);
});
test('latest snapshot wins, syndicated copies and invalid scores are excluded', () => {
  const result=summarizeRatings([source('Google Maps',4.8),source('Google Maps',4.6,{checkedAt:'2026-01-01'}),source('Copy',4.8,{kind:'republished'}),source('Invalid',6),source('Missing',NaN)]);
  assert.equal(result.average,4.8); assert.equal(result.platformCount,1);
});
