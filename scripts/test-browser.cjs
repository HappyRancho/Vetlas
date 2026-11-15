const {chromium}=require('playwright');const assert=require('node:assert/strict');
// Requires Playwright and Chromium; see docs/GOOGLE-PLACES-SETUP.md.
const base=process.env.VETLAS_TEST_URL || 'http://127.0.0.1:4323';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await context.route(/https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
 for(const width of [320,390,430,768,1440]){await page.setViewportSize({width,height:900});for(const route of ['/','/search/','/indore/','/indore/myra-pet-clinic-usha-nagar/','/indore/royal-vet-clinic-kesharbagh/','/costs/','/review/','/map/']){await page.goto(base+route);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow '+width);}}
 await page.goto(base+'/search/');assert.equal(await page.locator('.discovery-result').count(),8);await page.locator('#filter-sort').selectOption('rating');
 const first=await page.locator('.discovery-result').first().innerText();assert(first.includes('Ganeshganj'),first);
 await page.goto(base+'/map/?city=indore&clinic=indore-royal-ganeshganj');assert((await page.locator('#area-map').getAttribute('src')).includes('22.7186253'));assert((await page.locator('#map-status').textContent()).includes('provider-published'));
 await page.locator('#map-clinic').selectOption('indore-royal-kesharbagh');assert((await page.locator('#area-map').getAttribute('src')).includes('22.6788412'));
 await page.locator('#map-city').selectOption('delhi');assert.equal(await page.locator('#map-clinic').inputValue(),'');assert((await page.locator('#map-status').textContent()).includes('Area preview'));
 await page.goto(base+'/indore/myra-pet-clinic-usha-nagar/');assert((await page.locator('[data-rating-value]').innerText()).includes('4.3/5'));assert.equal(await page.locator('[data-rating-sources]>li').count(),2);assert.equal(await page.locator('script[src*="maps.googleapis.com"]').count(),0);
 assert(!(await page.locator('script[type="application/ld+json"]').first().textContent()).includes('aggregateRating'));
 await page.goto(base+'/costs/');assert((await page.locator('#fee-average').textContent()).includes('₹200'));await page.locator('[data-fee="300"]').check();assert((await page.locator('#fee-average').textContent()).includes('₹250'));
 await page.goto(base+'/');await page.setViewportSize({width:390,height:844});if(process.env.VETLAS_SCREENSHOT) await page.screenshot({path:process.env.VETLAS_SCREENSHOT,fullPage:true});assert.deepEqual(errors,[]);
 await context.close();
 for(const scenario of ['success','no-photo','error','broken-photo']){
  const ctx=await browser.newContext();const p=await ctx.newPage();
  await ctx.addInitScript(({scenario})=>{
    window.google={maps:{importLibrary:async()=>({Place:class{
      constructor(){this.rating=4.0;this.userRatingCount=18;this.googleMapsURI='https://www.google.com/maps/?cid=123';this.photos=scenario==='no-photo'?[]:[{getURI:()=>scenario==='broken-photo'?'https://example.invalid/photo.jpg':'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="teal"/></svg>',authorAttributions:[{displayName:'Test Photographer',uri:'https://example.com/photographer'},{displayName:'Unsafe link',uri:'javascript:alert(1)'}]}]}
      async fetchFields(){if(scenario==='error')throw new Error('quota');}
    }})}};
  },{scenario});
  await ctx.route(/https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
  await ctx.route(base+'/indore/myra-pet-clinic-usha-nagar/',async route=>{
   const response=await route.fetch();const html=(await response.text()).replace('class="facility-photo"','class="facility-photo" data-google-place="mock-only" data-google-key="mock-key"');await route.fulfill({response,body:html});
  });
  await p.goto(base+'/indore/myra-pet-clinic-usha-nagar/');
  if(scenario==='error'){await p.waitForTimeout(200);assert((await p.locator('[data-rating-value]').textContent()).includes('4.3/5'));}
  else{await p.waitForFunction(()=>document.querySelector('[data-rating-value]')?.textContent.includes('4.2/5'));assert.equal(await p.locator('[data-rating-sources]>li').count(),3);}
  if(scenario==='success'){await p.locator('[data-google-photo]').waitFor({state:'visible'});assert((await p.locator('[data-photo-credits]').innerText()).includes('Test Photographer'));assert.equal(await p.locator('[data-photo-credits] a').count(),1);assert.equal(await p.locator('[data-photo-fallback]').isVisible(),false);}
  else assert.equal(await p.locator('[data-photo-fallback]').isVisible(),true);
  await ctx.close();
 }
 console.log('PASS: eight records; all main pages at 320/390/430/768/1440; ratings/sort/source coverage; branch maps/city reset; fee comparison; Google mock success, no photo, API failure, broken image, attribution and unsafe-link handling; no JS errors.');await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
