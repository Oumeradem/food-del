const { chromium } = require('/Users/oumeradem/.npm-global/lib/node_modules/@playwright/cli/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('https://tomato-food-delivery-zeta.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Dump clickable elements & links to understand the real DOM
  const info = await page.evaluate(() => {
    const out = {};
    out.links = Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.textContent.trim().slice(0, 30),
      href: a.getAttribute('href')
    }));
    out.buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().slice(0, 30)).slice(0, 30);
    out.addButtons = Array.from(document.querySelectorAll('.food-item .add')).length;
    out.classesWithCart = Array.from(document.querySelectorAll('[class*=cart]')).slice(0, 10).map(e => e.className);
    return out;
  });
  console.log('LINKS:', JSON.stringify(info.links, null, 2));
  console.log('BUTTONS:', JSON.stringify(info.buttons, null, 2));
  console.log('ADD BTNS:', info.addButtons);
  console.log('CART CLASSES:', JSON.stringify(info.classesWithCart));
  await browser.close();
})();
