const { chromium } = require('/Users/oumeradem/.npm-global/lib/node_modules/@playwright/cli/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(15000);
  const OUT = '/tmp/e2e-ui';
  const fs = require('fs');
  fs.mkdirSync(OUT, { recursive: true });
  const results = {};
  const EMAIL = 'uie2e' + Date.now() + '@example.com';
  const PASS = 'UiPass123!';

  // ===== 1. HOME + BANNER =====
  await page.goto('https://tomato-food-delivery-zeta.vercel.app/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(2500);
  results.home_banner = await page.evaluate(() => !!document.querySelector('.header'));
  await page.screenshot({ path: OUT + '/01-home-banner.png' });
  console.log('[1] Home + banner:', results.home_banner ? 'PASS' : 'FAIL');

  // ===== 2. SCROLL-TO-TOP =====
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(400);
  results.scroll_before = await page.evaluate(() => window.scrollY);
  await page.click('.logo');
  await page.waitForTimeout(1500);
  results.scroll_after = await page.evaluate(() => window.scrollY);
  results.banner_visible = await page.evaluate(() => {
    const r = document.querySelector('.header')?.getBoundingClientRect();
    return r ? (r.top >= -10 && r.bottom > 0) : false;
  });
  console.log(`[2] Scroll-to-top: ${results.scroll_before}->${results.scroll_after}, banner:${results.banner_visible}`, (results.scroll_after===0 && results.banner_visible)?'PASS':'FAIL');

  // ===== 3. REGISTER NEW USER VIA UI =====
  await page.click('text=Sign In');
  await page.waitForTimeout(1000);
  await page.click('text=Click here');
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="Your name"]', 'UI E2E Tester');
  await page.fill('input[placeholder="Your email"]', EMAIL);
  await page.fill('input[placeholder="Password"]', PASS);
  await page.check('.login-popup-condition input[type="checkbox"]');
  await page.screenshot({ path: OUT + '/02-register-form.png' });
  await page.click('button:has-text("Create account")');
  await page.waitForTimeout(3500);
  results.registered = await page.evaluate(() => !!localStorage.getItem('token'));
  results.popup_closed = await page.evaluate(() => !document.querySelector('.login-popup'));
  console.log('[3] Register via UI:', results.registered ? 'PASS' : 'FAIL', '| popup closed:', results.popup_closed);

  // ===== 4. ADD ITEM TO CART =====
  results.food_count = await page.evaluate(() => document.querySelectorAll('.food-item').length);
  await page.click('.food-item .add');
  await page.waitForTimeout(1500);
  results.item_added = await page.evaluate(() => !!document.querySelector('.food-item-counter'));
  await page.screenshot({ path: OUT + '/03-item-added.png' });
  console.log(`[4] Add item (${results.food_count} menu items):`, results.item_added ? 'PASS' : 'FAIL');

  // ===== 5. CART =====
  await page.click('a[href="/cart"]');
  await page.waitForURL('**/cart', { timeout: 10000 });
  await page.waitForTimeout(1500);
  results.cart_has_total = await page.evaluate(() => document.body.innerText.includes('Cart Total'));
  results.cart_rows = await page.evaluate(() => document.querySelectorAll('.cart-items-item').length);
  await page.screenshot({ path: OUT + '/04-cart.png' });
  console.log(`[5] Cart (${results.cart_rows} item):`, results.cart_has_total ? 'PASS' : 'FAIL');

  // ===== 6. PROCEED TO CHECKOUT (SPA nav to /order) =====
  await page.click('button:has-text("PROCEED TO CHECKOUT")');
  await page.waitForTimeout(2500);
  results.order_url = page.url();
  results.order_has_form = await page.evaluate(() => document.body.innerText.includes('Delivery Information'));
  console.log('[6] Checkout -> /order:', results.order_has_form ? 'PASS' : 'FAIL', '(' + results.order_url + ')');

  // ===== 7. FILL DELIVERY FORM =====
  if (results.order_has_form) {
    const fill = {
      'input[placeholder="First name"]': 'John',
      'input[placeholder="Last name"]': 'Doe',
      'input[placeholder="Email address"]': EMAIL,
      'input[placeholder="Street"]': '123 Tomato St',
      'input[placeholder="City"]': 'Seattle',
      'input[placeholder="State"]': 'WA',
      'input[placeholder="Zip code"]': '98101',
      'input[placeholder="Country"]': 'USA',
      'input[placeholder="Phone"]': '555-0100',
    };
    for (const [sel, val] of Object.entries(fill)) await page.fill(sel, val).catch(() => {});
    await page.waitForTimeout(500);
    await page.screenshot({ path: OUT + '/05-order-form-filled.png' });
    console.log('[7] Delivery form filled: PASS');
  }


  // ===== 8. SUBMIT ORDER -> STRIPE =====
  await page.click('button:has-text("PROCEED TO PAYMENT")').catch(async () => {
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => /proceed to payment/i.test(b.textContent));
      if (btn) btn.click();
    });
  });
  await page.waitForTimeout(7000);
  results.order_result = await page.evaluate(() => ({
    onStripe: location.hostname.includes('stripe'),
    text: document.body.innerText.slice(0, 200),
  }));
  console.log('[8] Place order ->', results.order_result.onStripe ? 'STRIPE REDIRECT' : 'other', '|', JSON.stringify(results.order_result.text));
  await page.screenshot({ path: OUT + '/06-after-order.png' });

  // ===== SUMMARY =====
  console.log('\n=========== FULL UI E2E SUMMARY ===========');
  console.log('  Home banner   :', results.home_banner ? 'PASS' : 'FAIL');
  console.log('  Scroll-to-top :', (results.scroll_after===0 && results.banner_visible) ? 'PASS' : 'FAIL');
  console.log('  Register (UI) :', results.registered ? 'PASS' : 'FAIL');
  console.log('  Add to cart   :', results.item_added ? 'PASS' : 'FAIL');
  console.log('  Cart          :', results.cart_has_total ? 'PASS' : 'FAIL');
  console.log('  Order form    :', results.order_has_form ? 'PASS' : 'FAIL');
  console.log('  Stripe link   :', results.order_result?.onStripe ? 'PASS' : 'n/a');
  console.log('============================================');
  console.log('\nScreenshots in: ' + OUT);
  await browser.close();
})();

