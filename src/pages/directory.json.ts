import { providers } from '../data';
import { summarizeRatings } from '../lib/ratings.mjs';
export function GET() {
 return new Response(JSON.stringify({version:2,scope:'Indore pilot',checked:'2026-11-15',limitations:'Public-source facts, not independent clinical verification. Unknown fields omitted. Platform rating snapshots retain source, access method and observation date; counts are never pooled. Google Places photos and live scores require configuration and are not persisted in this dataset. Coordinates are provider-published where present. Conflicting fees are excluded from numeric comparisons.',facilities:providers.map(p => ({...p, platformRatingSummary:{...summarizeRatings(p.platformRatings),method:"equal-platform-mean",coverage:"available sources only; overlap possible; not unique-reviewer average"}}))},null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});
}
