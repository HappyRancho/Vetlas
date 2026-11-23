import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {distanceKm,googleDirections,googlePreview} from '../src/lib/map-links.mjs';
const locations=JSON.parse(readFileSync(new URL('../src/data/facility-locations.json',import.meta.url)));
const directory=JSON.parse(readFileSync(new URL('../dist/directory.json',import.meta.url)));
const vets=JSON.parse(readFileSync(new URL('../dist/veterinarians.json',import.meta.url))).veterinarians;
function decode(code){const chars='23456789CFGHJMPQRVWX',raw=code.replace('+','');let lat=-90,lng=-180;[20,1,.05,.0025,.000125].forEach((scale,i)=>{lat+=chars.indexOf(raw[i*2])*scale;lng+=chars.indexOf(raw[i*2+1])*scale;});return {lat:lat+.0000625,lng:lng+.0000625};}
test('all 15 branches have source-backed local coordinates and consistent published Plus Codes',()=>{
 assert.equal(Object.keys(locations).length,15);const mapped=directory.facilities.filter(p=>p.cityId==='indore');assert.equal(mapped.length,15);
 for(const p of mapped){const loc=locations[p.id];assert(loc,p.id);assert.equal(p.coordinates.lat,loc.coordinates.lat);assert(distanceKm(p.coordinates,{lat:22.7196,lng:75.8577})<20,p.id);assert(distanceKm(p.coordinates,decode(p.mapLocation.plusCode))<.03,p.id+' plus-code mismatch');assert.equal(p.mapLocation.checkedAt,'2026-11-15');assert(p.coordinateSource.startsWith('https://www.google.com/maps/'));
 const dir=new URL(googleDirections(p));assert.equal(dir.searchParams.get('destination'),`${p.coordinates.lat},${p.coordinates.lng}`);if(p.mapLocation.placeId)assert.equal(dir.searchParams.get('destination_place_id'),p.mapLocation.placeId);
 assert.equal(new URL(googleDirections(p,'bad')).searchParams.get('travelmode'),'driving');assert.equal(new URL(googlePreview(p)).searchParams.get('output'),'embed');
 }
 assert.equal(locations['indore-animal-hospital'].coordinates.lat,22.6465519,'use destination, not camera centre');
});
test('published doctor routes use supported associations without inferred ratings or unknown location pins',()=>{
 assert(vets.length>0);const ids=new Set(directory.facilities.map(p=>p.id));const sitemap=readFileSync(new URL('../dist/sitemap-0.xml',import.meta.url),'utf8');
 for(const v of vets){if(v.providerIds){v.providerIds.forEach(id=>assert(ids.has(id)));assert(v.sources.length>0);}else{assert(v.providerSlugs.length && v.degrees.length);}const path=v.url;const html=readFileSync(new URL('../dist'+path+'index.html',import.meta.url),'utf8');assert(sitemap.includes(path));assert(html.includes('"@type":"Person"'));assert(!html.includes('"@type":"Physician"'));assert(!html.includes('"aggregateRating"'));assert(html.includes('rel="canonical"'));}
 assert(!vets.some(v=>['bp-shukla','hk-mehta','harendra-rajput'].includes(v.id)));
});
test('distance calculations handle identical, nearby and distant locations',()=>{
 assert.equal(distanceKm({lat:0,lng:0},{lat:0,lng:0}),0);assert(Math.abs(distanceKm({lat:0,lng:0},{lat:1,lng:0})-111.195)<.01);assert(Number.isFinite(distanceKm({lat:90,lng:0},{lat:-90,lng:0})));
});
