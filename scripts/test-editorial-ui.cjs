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
      ['/reads/','Find a story','surgical'],
      ['/pet-health/','Find a story','radiograph'],
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
    await page.setViewportSize({width:390,height:844});
    await page.goto(base);
    const map=page.locator('[data-facility-map]');
    assert.equal(await map.locator('[data-city]').inputValue(),'');
    assert(await map.locator('[data-branch]').isDisabled());
    await map.locator('[data-city]').selectOption('indore');
    assert.equal(await map.locator('[data-branch]').inputValue(),'');
    await map.locator('[data-branch]').selectOption('indore-myra-usha');
    assert(await map.locator('a[data-route]').isVisible());
    await map.locator('[data-city]').selectOption('');
    assert(await map.locator('a[data-route]').isHidden());
    const nav=page.getByRole('navigation',{name:'Quick navigation'});
    const more=nav.getByRole('link',{name:'More'});
    await more.click();
    assert(await page.getByRole('dialog').isVisible());
    await page.keyboard.press('Escape');
    assert(await more.evaluate(el=>el===document.activeElement));
    await nav.getByRole('link',{name:'Categories'}).click();
    assert.equal(await page.locator('.category-grid a').count(),12);
    await page.locator('.category-grid').getByRole('link',{name:/Home visits/}).click();
    await page.getByRole('link',{name:'Find home-visit practices'}).click();
    assert(await page.locator('.discovery-result:visible').count()>0);
    await page.goto(base+'/reads/cat-foods-india/');
    const table = page.getByRole('table');
    assert.equal(await table.getByRole('columnheader').count(),3);
    const comparisonLabel = table.locator('.comparison-label').first();
    assert(await comparisonLabel.isVisible());
    await page.setViewportSize({width:1280,height:844});
    assert(await comparisonLabel.isHidden());
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
