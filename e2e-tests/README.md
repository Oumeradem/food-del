# 🧪 Food-Del End-to-End Tests

Automated end-to-end tests for the Food-Del app. These test the **live deployed** application
(frontend on Vercel, backend on Render), simulating a real user's journey.

## What's Here

| File | What it does |
|------|--------------|
| `e2e-full.sh` | Backend API tests — runs all 8 REST endpoints via `curl` (registration, food list, cart, orders, login, admin) |
| `e2e-ui.js` | Frontend UI tests — Playwright browser automation for the full user journey (home → scroll-to-top → register → menu → cart → checkout → Stripe) |
| `e2e-inspect.js` | Helper — inspects page content/structure |
| `e2e-inspect2.js` | Helper — additional page inspection |
| `e2e-order.js` | Helper — isolated order/checkout flow test |
| `E2E_TEST_RESULTS.md` | The saved results from the last full test run |
| `screenshots/` | 17 screenshots captured during the UI test run |

## Deployed Endpoints Tested

- **Frontend (Vercel):** `https://tomato-food-delivery-zeta.vercel.app`
- **Backend API (Render):** `https://food-del-backend-api-croo.onrender.com`
- **Admin Panel (Render):** `https://food-del-admin.onrender.com`

## How to Run

### Backend API tests (curl)

```bash
bash e2e-full.sh
```

### Frontend UI tests (Playwright)

Requires Node.js and Playwright installed:

```bash
npm init -y
npm install playwright
npx playwright install chromium
node e2e-ui.js
```

Screenshots will be saved to the `screenshots/` directory.

## Latest Results (September 7, 2026)

- **Backend API:** 8/8 tests passed ✅
- **Frontend UI:** 8/8 steps passed ✅
  - Full journey completed: registration → menu → cart → checkout → **real Stripe checkout page reached**
- **Status:** ✅ ALL TESTS PASSED — app ready for public release

## Notes

- These tests hit the **live** deployed services, not a local server.
- The UI test creates a new test user on each run.
- A test order is placed through the real Stripe test-mode checkout.
