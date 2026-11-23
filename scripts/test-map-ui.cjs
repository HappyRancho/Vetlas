const {chromium}=require('playwright'),assert=require('node:assert/strict');
const base=process.env.VETLAS_TEST_URL||'http://127.0.0.1:4326';
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const context=await browser.newContext({viewport:{width:1200,height:900},geolocation:{latitude:22.697707,longitude:75.8350332},permissions:['geolocation']});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await context.route(/https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
await page.goto(base+'/map/');await page.locator('#care-map').scrollIntoViewIfNeeded();await page.waitForSelector('.vet-map-pin');assert.equal(await page.locator('.vet-map-pin').count(),15);assert.equal(await page.locator('[data-map-result]:visible').count(),15);
await page.locator('[name=q]').fill('Hemant');assert.equal(await page.locator('[data-map-result]:visible').count(),1);assert.equal(await page.locator('.vet-map-pin').count(),1);await page.locator('[data-select=indore-my-pet]').click();assert((await page.locator('[data-selected-name]').innerText()).includes('My Pet'));assert((await page.url()).includes('clinic=indore-my-pet'));await page.locator('[data-travel]').selectOption('walking');assert.equal(new URL(await page.locator('[data-selected-directions]').getAttribute('href')).searchParams.get('travelmode'),'walking');await page.locator('[data-google-preview] summary').click();await page.waitForFunction(()=>document.querySelector('[data-google-preview] iframe').getAttribute('src'));assert((await page.locator('[data-google-preview] iframe').getAttribute('src')).includes('22.7520625'));
await page.reload();await page.locator('#care-map').scrollIntoViewIfNeeded();assert.equal(await page.locator('[name=q]').inputValue(),'Hemant');assert((await page.locator('[data-selected-name]').innerText()).includes('My Pet'));
await page.locator('[data-reset]').click();await page.locator('[name=q]').fill('no-such-clinic');assert(await page.locator('[data-map-empty]').isVisible());assert.equal(await page.locator('.vet-map-pin').count(),0);assert(await page.locator('.map-selected').isHidden());
await page.locator('[data-reset]').click();await page.locator('[name=fee]').check();assert.equal(await page.locator('[data-map-result]:visible').count(),2);await page.locator('[name=fee]').uncheck();await page.locator('[name=pet]').selectOption('cat');assert((await page.locator('[data-map-result]:visible').count())>0);assert((await page.locator('[data-map-result]:visible').count())<15);
await page.locator('[data-reset]').click();await context.setGeolocation({latitude:22.697707,longitude:75.8350332});await page.locator('[data-nearby]').click();await page.waitForFunction(()=>document.querySelector('[data-map-status]').textContent.includes('nearest first')).catch(async e=>{console.error('NEARBY',await page.locator('[data-map-status]').textContent(),errors);throw e});assert.equal(await page.locator('[data-map-result]:visible').first().getAttribute('data-map-result'),'indore-myra-usha');assert(!(new URL(page.url()).search).includes('22.697'));
await page.locator('[data-reset]').click();assert(await page.locator('[data-tile-status]').innerText().then(t=>t.includes('unavailable')));
await page.setViewportSize({width:390,height:844});await page.goto(base+'/map/');assert(await page.locator('.map-stage').isHidden());await page.locator('[data-select=indore-petvet]').click();assert(await page.locator('.map-stage').isVisible());assert(await page.locator('.map-results').isHidden());await page.locator('[data-view=list]').click();assert(await page.locator('.map-results').isVisible());
const published = (await (await page.request.get(base+'/veterinarians.json')).json()).veterinarians;
const localDoctors = published.filter(doctor => doctor.cityId === 'indore');
assert(localDoctors.length > 0);
await page.goto(base+'/indore/veterinarians/');
assert.equal(await page.locator('[data-vet-row]:visible').count(), localDoctors.length);
for (const doctor of localDoctors) {
  await page.locator('#vet-search').fill(doctor.name);
  assert.equal(await page.locator('[data-vet-row]:visible').count(), 1);
}
await page.locator('#vet-search').fill('');
await page.locator('#vet-practice').selectOption('mapped');
assert.equal(await page.locator('[data-vet-row]:visible').count(),localDoctors.filter(d=>d.providerIds.length).length);
await page.goto(base+'/search/?type=doctor&city=indore');
assert.equal(await page.locator('.discovery-result:visible').count(),localDoctors.length);
await page.goto(base+'/indore/petvet-surya-dev-nagar/');
const preview = page.locator('[data-preview-frame]');
await preview.locator('xpath=ancestor::details').locator('summary').click();
await page.waitForFunction(()=>document.querySelector('[data-preview-frame]').getAttribute('src'));
assert.equal(await preview.getAttribute('src'),await preview.getAttribute('data-src'));
assert.equal(new URL(await preview.getAttribute('src')).hostname,'maps.google.com');
for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/map/','/indore/veterinarians/',localDoctors[0].url,'/indore/myra-pet-clinic-usha-nagar/']) {
    await page.goto(base+route);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow '+width);
    assert(await page.getByRole('banner').getByRole('link',{name:'Vetlas home'}).isVisible());
  }
}
await page.setViewportSize({width:390,height:844});
await page.goto(base+'/map/?clinic=indore-myra-usha');
await page.locator('[data-view=map]').click();
assert((await page.locator('[data-selected-name]').innerText()).includes('Myra'));
assert.deepEqual(errors,[]);await context.close();const outside=await browser.newContext({geolocation:{latitude:28.61,longitude:77.21},permissions:['geolocation']});const out=await outside.newPage();await out.goto(base+'/map/');await out.locator('[data-nearby]').click();await out.waitForFunction(()=>document.querySelector('[data-map-status]').textContent.includes('outside Indore'));await outside.close();const denied=await browser.newContext();await denied.addInitScript(()=>{navigator.geolocation.getCurrentPosition=(_,reject)=>reject({code:1});});const p=await denied.newPage();await p.goto(base+'/map/');await p.locator('[data-nearby]').click();await p.getByText('Location could not be accessed.',{exact:false}).waitFor();assert.equal(await p.locator('[data-map-result]:visible').count(),15);await denied.close();await browser.close();console.log('PASS: 15 pins, filters, selection, deep links, travel, preview, nearby/outside/denied location, tile fallback, published doctors, name filters, search and mobile layouts.');})().catch(e=>{console.error(e);process.exit(1)});
