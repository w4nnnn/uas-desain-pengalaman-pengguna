/**
 * Screenshot script for Next.js prototype (Delight Bakery)
 * 
 * Usage:
 *   1. Start dev server: pnpm dev (runs on localhost:3000)
 *   2. Run: node screenshot-nextjs.js
 * 
 * Saves screenshots to: prototype_delight_bakery/public/screenshots/
 * Maps routes to friendly filenames for report embedding.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, 'prototype_delight_bakery/public/screenshots');

// Route config: { route, fileName, waitForSelector, viewport }
const ROUTES = [
  // Landing
  { route: '/', fileName: '00_Landing_High-Fidelity.png', waitForSelector: 'h1:has-text("Pre-Order")' },

  // Customer flow (mobile viewport)
  { route: '/login', fileName: '01_Login_Pelanggan_High-Fidelity.png', waitForSelector: 'h1:has-text("Delight Bakery")', viewport: { width: 375, height: 812 } },
  { route: '/katalog', fileName: '02_Katalog__PO_High-Fidelity.png', waitForSelector: 'text=Delight Bakery', viewport: { width: 375, height: 812 } },
  { route: '/pembayaran', fileName: '03_Pembayaran_DP_High-Fidelity.png', waitForSelector: 'text=Pembayaran & DP', viewport: { width: 375, height: 812 } },
  { route: '/pesanan', fileName: '04_Riwayat_Pesanan_High-Fidelity.png', waitForSelector: 'text=Pesanan Saya', viewport: { width: 375, height: 812 } },
  { route: '/pesanan/PO-102', fileName: '05_Lacak_Pesanan_High-Fidelity.png', waitForSelector: 'text=Lacak Pesanan', viewport: { width: 375, height: 812 } },
  { route: '/profil', fileName: '06_Profil_Pelanggan_High-Fidelity.png', waitForSelector: 'text=Profil Saya', viewport: { width: 375, height: 812 } },

  // Admin flow (desktop viewport)
  { route: '/admin/login', fileName: '10_Login_Admin_High-Fidelity.png', waitForSelector: 'text=Login Pemilik' },
  { route: '/admin', fileName: '11_Dashboard_Admin_High-Fidelity.png', waitForSelector: 'text=Halo, Admin!' },
  { route: '/admin/orders', fileName: '12_Kelola_Pesanan_Admin_High-Fidelity.png', waitForSelector: 'text=Kelola Pesanan' },
  { route: '/admin/orders/PO-102', fileName: '13_Detail_Pesanan_Admin_High-Fidelity.png', waitForSelector: 'text=Detail Pesanan' },
  { route: '/admin/profile', fileName: '14_Profil_Admin_High-Fidelity.png', waitForSelector: 'text=Profil Admin' },
];

async function screenshotRoute(config) {
  const { route, fileName, waitForSelector, viewport } = config;
  const url = `${BASE_URL}${route}`;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: viewport || { width: 1440, height: 900 },
    deviceScaleFactor: 3, // 3x for high-res
  });

  console.log(`\n📸 Capturing: ${route} → ${fileName}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for content to be ready
    await page.waitForSelector(waitForSelector, { timeout: 15000 });
    await page.waitForTimeout(1000); // Extra settle time
    
    const outPath = path.join(OUT_DIR, fileName);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`   ✅ Saved: ${fileName}`);
  } catch (err) {
    console.error(`   ❌ Failed ${route}: ${err.message}`);
  } finally {
    await browser.close();
  }
}

(async () => {
  // Ensure output dir exists
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUT_DIR}`);
  }

  console.log(`\n🎯 Target: ${BASE_URL}`);
  console.log(`📁 Output: ${OUT_DIR}`);
  console.log(`📄 Routes: ${ROUTES.length}\n`);

  for (const config of ROUTES) {
    await screenshotRoute(config);
  }

  console.log('\n🎉 All screenshots captured!');
})();