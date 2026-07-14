/**
 * Screenshot script untuk Next.js Prototype (Delight Bakery)
 *
 * Mengambil screenshot dari setiap halaman prototype menggunakan Playwright.
 * Customer pages diambil dengan viewport mobile (414×896),
 * Admin & Landing pages dengan viewport desktop (1440×900).
 *
 * Prasyarat:
 *   1. Pastikan dev server sudah berjalan: pnpm dev
 *   2. Jalankan script ini: node screenshot-prototype.js [BASE_URL] [OUTPUT_DIR]
 *
 * Argumen:
 *   BASE_URL   : URL dasar Next.js dev server (default: http://localhost:3000)
 *   OUTPUT_DIR : Folder output screenshot (default: ./screenshots)
 *
 * Contoh:
 *   node screenshot-prototype.js
 *   node screenshot-prototype.js http://localhost:3000 ./screenshots
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

// ──────────────────────────────────────────────
// Page definitions
// ──────────────────────────────────────────────
const CUSTOMER_PAGES = [
  { route: "/login",               name: "Login_Pelanggan" },
  { route: "/katalog",             name: "Katalog_Pelanggan" },
  { route: "/pembayaran",          name: "Pembayaran_DP" },
  { route: "/pesanan",             name: "Riwayat_Pesanan" },
  { route: "/pesanan/PO-102",      name: "Lacak_Pesanan" },
  { route: "/profil",              name: "Profil_Pelanggan" },
];

const ADMIN_PAGES = [
  { route: "/admin/login",         name: "Login_Admin" },
  { route: "/admin",               name: "Dashboard_Admin" },
  { route: "/admin/orders",        name: "Kelola_Pesanan" },
  { route: "/admin/orders/PO-102", name: "Detail_Pesanan" },
  { route: "/admin/profile",       name: "Profil_Admin" },
];

const LANDING_PAGE = [
  { route: "/",                    name: "Landing_Page" },
];

// ──────────────────────────────────────────────
// Viewport configs
// ──────────────────────────────────────────────
const MOBILE_VIEWPORT = { width: 414, height: 896 };   // iPhone 11 Pro
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };  // Laptop HD

// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────
(async () => {
  const baseUrl = process.argv[2] || "http://localhost:3000";
  const outputDir = path.resolve(process.argv[3] || "./screenshots");

  // Create output dirs
  const customerDir = path.join(outputDir, "customer");
  const adminDir = path.join(outputDir, "admin");
  const landingDir = path.join(outputDir, "landing");
  fs.mkdirSync(customerDir, { recursive: true });
  fs.mkdirSync(adminDir, { recursive: true });
  fs.mkdirSync(landingDir, { recursive: true });

  console.log(`Base URL  : ${baseUrl}`);
  console.log(`Output Dir: ${outputDir}\n`);

  // Check if server is reachable
  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    // Quick connectivity check
    const checkPage = await browser.newPage();
    try {
      await checkPage.goto(baseUrl, { timeout: 5000 });
      console.log("Server connected.\n");
    } catch {
      console.error(
        `ERROR: Cannot reach ${baseUrl}.\nMake sure the dev server is running (pnpm dev).`
      );
      await browser.close();
      process.exit(1);
    } finally {
      await checkPage.close();
    }

    // Screenshot landing page (desktop)
    console.log("--- Landing Page ---");
    await screenshotPages(browser, LANDING_PAGE, DESKTOP_VIEWPORT, landingDir, baseUrl);

    // Screenshot customer pages (mobile)
    console.log("\n--- Customer Pages (Mobile) ---");
    await screenshotPages(browser, CUSTOMER_PAGES, MOBILE_VIEWPORT, customerDir, baseUrl);

    // Screenshot admin pages (desktop)
    console.log("\n--- Admin Pages (Desktop) ---");
    await screenshotPages(browser, ADMIN_PAGES, DESKTOP_VIEWPORT, adminDir, baseUrl);

    console.log(`\nDone. ${CUSTOMER_PAGES.length + ADMIN_PAGES.length + LANDING_PAGE.length} screenshots saved to ${outputDir}`);
  } finally {
    await browser.close();
  }
})();

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
async function screenshotPages(browser, pages, viewport, outputDir, baseUrl) {
  for (const { route, name } of pages) {
    const page = await browser.newPage({
      viewport,
      deviceScaleFactor: 3, // 3x for retina-quality PNGs
    });

    try {
      const url = `${baseUrl}${route}`;
      process.stdout.write(`  ${name} ... `);

      await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
      // Extra wait for fonts + images + animations to settle
      await page.waitForTimeout(1500);

      const outPath = path.join(outputDir, `${name}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log("OK");
    } catch (err) {
      console.error(`FAILED (${err.message})`);
    } finally {
      await page.close();
    }
  }
}
