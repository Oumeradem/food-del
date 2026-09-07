const { chromium } = require('/Users/oumeradem/.npm-global/lib/node_modules/@playwright/cli/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(12000);

  console.log('Navigating to /order...');
  const t0 = Date.now();
  try {
    await page.goto('https://tomato-food-delivery-zeta.vercel.app/order', { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log('goto done in', Date.now() - t0, 'ms, url:', page.url());
  } catch (e) {
    console.log('goto error:', e.message.slice(0, 200));
  }
  await page.waitForTimeout(3000);
  console.log('After 3s wait, url:', page.url());
  const text = await page.evaluate(() => document.body.innerText.slice(0, 400));
  console.log('Body text:', JSON.stringify(text));
  console.log('Has Delivery Information:', text.includes('Delivery Information'));
  console.log('Has loading spinner:', await page.evaluate(() => !!document.querySelector('.spinner, .loading')));
  await page.screenshot({ path: '/tmp/e2e-ui/order-isolated.png' });
  console.log('Screenshot saved');
  await browser.close();
})();
