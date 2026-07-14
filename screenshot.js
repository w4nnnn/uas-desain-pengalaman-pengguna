/**
 * Script untuk mengambil screenshot (PNG) dari file HTML dengan resolusi tinggi (3x).
 * Menggunakan Playwright untuk merender HTML secara akurat.
 *
 * Cara Penggunaan:
 * node screenshot.js <TARGET_INPUT> [OUTPUT_DIR] [WIDTH] [HEIGHT] [FULL_PAGE]
 *
 * Keterangan Argumen:
 * - TARGET_INPUT : (Wajib) Path ke file HTML tunggal atau folder yang berisi file HTML.
 * - OUTPUT_DIR   : (Opsional) Folder tujuan hasil screenshot. (Default: 'screenshoot_png' di direktori script)
 * - WIDTH        : (Opsional) Lebar viewport. (Default: 2000)
 *                  Catatan: Anda harus mengisi OUTPUT_DIR jika ingin mengatur WIDTH.
 * - HEIGHT       : (Opsional) Tinggi viewport. (Default: 1500)
 * - FULL_PAGE    : (Opsional) 'true' atau 'false' untuk mengambil seluruh halaman (scroll ke bawah).
 *                  (Default: 'true' jika HEIGHT tidak diatur, 'false' jika HEIGHT diatur)
 *
 * Contoh Lengkap:
 * 1. Default (satu file, full page):
 *    node screenshot.js file.html
 * 
 * 2. Mobile viewport (hanya area yang tampil, tidak full page):
 *    node screenshot.js file.html ./out 375 812
 * 
 * 3. Mobile viewport tapi dipaksa full page (halaman memanjang):
 *    node screenshot.js file.html ./out 375 812 true
 *
 * --- Contoh Kombinasi Viewport Umum ---
 * - Mobile (Smartphone)  : node screenshot.js file.html screenshoot_png 375 812
 * - Tablet (iPad)        : node screenshot.js file.html screenshoot_png 768 1024
 * - Laptop (HD)          : node screenshot.js file.html screenshoot_png 1366 768
 * - Desktop (Full HD)    : node screenshot.js file.html screenshoot_png 1920 1080
 * - Ultra HD (4K)        : node screenshot.js file.html screenshoot_png 3840 2160
 * - Square / Feed IG     : node screenshot.js file.html screenshoot_png 1080 1080
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const target = process.argv[2];
  const outputDirArg = process.argv[3];
  const widthArg = process.argv[4];
  const heightArg = process.argv[5];
  const fullPageArg = process.argv[6];
  
  if (!target) {
      console.error("Error: Argumen TARGET_INPUT wajib diisi.");
      process.exit(1);
  }

  // Set viewport yang lebih besar
  const viewportWidth = widthArg ? parseInt(widthArg, 10) : 2000;
  const viewportHeight = heightArg ? parseInt(heightArg, 10) : 1500;
  
  // Tentukan apakah fullPage atau tidak
  let isFullPage = true;
  if (fullPageArg !== undefined) {
      isFullPage = fullPageArg.toLowerCase() === 'true';
  } else if (heightArg) {
      // Jika user mengatur spesifik tinggi (misal 812), defaultnya jangan full page
      isFullPage = false;
  }
  
  const browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const defaultPngDir = path.join(__dirname, 'screenshoot_png');
  const pngDir = outputDirArg ? path.resolve(outputDirArg) : defaultPngDir;
  
  if (!fs.existsSync(pngDir)) {
      fs.mkdirSync(pngDir, { recursive: true });
  }
  
  let filesToProcess = [];
  const resolvedTarget = path.resolve(target);
  
  const stat = fs.statSync(resolvedTarget);
  if (stat.isFile() && resolvedTarget.endsWith('.html')) {
      filesToProcess.push({ name: path.basename(resolvedTarget), fullPath: resolvedTarget });
  } else if (stat.isDirectory()) {
      const files = fs.readdirSync(resolvedTarget).filter(f => f.endsWith('.html'));
      filesToProcess = files.map(f => ({ name: f, fullPath: path.join(resolvedTarget, f) }));
  }

  for (const fileObj of filesToProcess) {
    const page = await browser.newPage({
      viewport: { width: viewportWidth, height: viewportHeight },
      deviceScaleFactor: 4, // 4x scale for super high resolution
    });
    
    console.log(`Processing ${fileObj.name}...`);
    const fileUrl = 'file://' + fileObj.fullPath;
    
    try {
      await page.goto(fileUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500); // Wait longer for mermaid to finish
      
      const outName = path.join(pngDir, fileObj.name.replace('.html', '.png'));
      
      const mermaidBox = page.locator('.mermaid');
      if (await mermaidBox.count() > 0) {
          console.log("-> Memperbesar vektor SVG untuk kualitas super tajam...");
          await page.evaluate(() => {
              const el = document.querySelector('.mermaid');
              el.style.padding = '40px';
              el.style.backgroundColor = '#ffffff';
              el.style.borderRadius = '16px';
              
              // Force the SVG to render much larger
              const svg = el.querySelector('svg');
              if (svg) {
                  svg.style.maxWidth = '100%';
                  svg.style.width = '1800px'; 
                  svg.style.height = 'auto';
              }
          });
          
          // Wait a tick for styles to apply
          await new Promise(r => setTimeout(r, 200));
          
          await mermaidBox.first().screenshot({ path: outName });
      } else {
          await page.screenshot({ path: outName, fullPage: isFullPage });
      }
      console.log(`Saved: ${outName}`);
    } catch (e) {
      console.error(`Failed processing ${fileObj.name}:`, e);
    } finally {
      await page.close();
    }
  }
  
  await browser.close();
})();
