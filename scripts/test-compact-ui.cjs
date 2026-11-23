const {chromium}=require('playwright'),assert=require('node:assert/strict');
const base=process.env.VETLAS_TEST_URL||'http://127.0.0.1:4327';
(async()=>{
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']}),p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
const data=await(await p.request.get(base+'/directory.json')).json();data.facilities=data.facilities.filter(p=>p.cityId==='indore');assert.equal(data.facilities.length,15);assert(data.facilities.every(f=>f.visitHours?.schedule?.length&&f.visitHours.sourceUrl));assert.equal(data.facilities.filter(f=>f.consultationListing).length,3);assert(data.facilities.filter(f=>f.consultationListing).every(f=>!f.fees));
await p.goto(base+'/indore/');
for(const width of [320,390,430,768,1440]) {
 await p.setViewportSize({width,height:844});
 assert.equal(await p.locator('.listing').count(),15);
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
}
const save=p.locator('[data-save]').first();await save.click();assert.equal(await save.getAttribute('aria-pressed'),'true');await p.reload();assert.equal(await p.locator('[data-save]').first().getAttribute('aria-pressed'),'true');await p.locator('[data-save]').first().click();
await p.goto(base+'/indore/veterinarians/');assert.equal(await p.locator('.vet-portrait img').count(),0);for(const i of await p.locator('.vet-portrait img').all()){await i.scrollIntoViewIfNeeded();await i.evaluate(i=>i.decode());}
await p.goto(base+'/indore/royal-vet-clinic-kesharbagh/');assert((await p.locator('.visit-schedule').innerText()).includes('10 AM–9 PM'));assert((await p.locator('.visit-doctor-hours').innerText()).includes('2–5 PM'));assert.equal(await p.locator('.clinic-evidence').getAttribute('open'),null);assert(!(await p.locator('#doctors .vet-card-bottom').innerText()).includes('₹300'),'Do not transfer fees between Royal branches');assert(!(await p.locator('body').innerText()).includes('No first-party Vetlas reviews yet'));
await p.goto(base+'/');
for(const image of await p.locator('.atlas-art img,.campus img').all()) await image.evaluate(i=>i.decode());
assert.equal(await p.locator('.atlas-cities a').count(),10);
assert.deepEqual(errors,[]);await b.close();console.log('Passed compact directory checks');
})().catch(e=>{console.error(e);process.exit(1)});
