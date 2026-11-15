import { providers } from '../data';
export function GET() {
 return new Response(JSON.stringify({version:1,scope:'Indore pilot',checked:'2026-11-15',limitations:'Public-source facts, not independent clinical verification. Unknown fields omitted. No imported ratings. Conflicting fees are excluded from numeric comparisons.',facilities:providers},null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});
}
