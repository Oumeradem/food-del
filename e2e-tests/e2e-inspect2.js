const { chromium } = require('/Users/oumeradem/.npm-global/lib/node_modules/@playwright/cli/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Go directly to /cart
  await page.goto('https://tomato-food-delivery-zeta.vercel.app/cart', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  console.log('=== CART PAGE URL:', page.url());
  console.log('=== CART PAGE TEXT (first 600 chars):');
  console.log((await page.evaluate(() => document.body.innerText)).slice(0, 600));

  // Check for elements on cart page
  console.log('\n=== CART ELEMENT CHECK:');
  console.log(await page.evaluate(() => ({
    cartItems: document.querySelectorAll('.cart-items-title, .cart-items-item').length,
    total: !!document.querySelector('.cart-total'),
    proceedBtns: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()).filter(t => t),
    forms: document.querySelectorAll('form').length,
  })));

  // Menu section
  await page.goto('https://tomato-food-delivery-zeta.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log('\n=== HOME MENU SECTION:');
  console.log(await page.evaluate(() => ({
    exploreMenu: !!document.getElementById('explore-menu'),
    ids: Array.from(document.querySelectorAll('section, div[id]')).map(e => e.id).filter(Boolean).slice(0, 15),
  })));

  await browser.close();
})();
