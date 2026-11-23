const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const base = process.env.VETLAS_TEST_URL || 'http://127.0.0.1:4321';

async function main() {
  const browser = await chromium.launch({ executablePath:'/usr/bin/chromium', args:['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport:{width:390,height:844} });
    await page.goto(base);
    for (const width of [320,390,768,1280]) {
      await page.setViewportSize({ width,height:844 });
      for (const shelf of await page.locator('.editorial-shelf').all()) {
        const grid = shelf.locator('.edition-grid');
        assert.equal(await grid.locator(':scope > a').count(),6);
        assert.equal(await grid.evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),2);
      }
    }
    assert.equal(await page.getByText('THAT VET GUY',{exact:true}).count(),6);
    for (const [path,label,term] of [
      ['/care-guide/','Find a guide','rabbit'],
      ['/reads/','Find a story','radiograph'],
      ['/locations/','Find a city or state','Indore'],
      ['/indore/','Find a neighbourhood or practice','Myra'],
    ]) {
      await page.goto(base+path);
      const input=page.getByRole('searchbox',{name:label});
      await input.fill('unmatchedwordxyz');
      const empty=page.getByRole('status').filter({hasText:'No matches'});
      await empty.waitFor();
      await input.fill(term);
      await empty.waitFor({state:'hidden'});
      await input.fill('');
    }
    await page.goto(base+'/guides/checking-a-surgical-incision/');
    const faq=page.locator('.story-faq');
    await faq.locator('summary').click();
    assert(await faq.locator('p').isVisible());
    assert(await page.locator('#references a').count()>0);
  } finally {
    await browser.close();
  }
}
main().catch(error=>{ console.error(error); process.exitCode=1; });
