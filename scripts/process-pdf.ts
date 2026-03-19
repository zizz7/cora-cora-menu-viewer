#!/usr/bin/env tsx
/**
 * PDF-to-WebP Processing Script
 *
 * Converts a PDF menu into optimized WebP images at 3 tiers:
 *   - LQIP: 20px wide, quality 30, base64 data URI
 *   - Mobile: 800px wide, quality 82
 *   - Desktop: 1400px wide, quality 85
 *
 * Generates a manifest.json with MenuManifest schema.
 *
 * Uses pdf-to-png-converter (pure JS, no native binaries) + Sharp for WebP.
 */

import { pdfToPng } from 'pdf-to-png-converter';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

// --- Interfaces ---

interface ProcessOptions {
  pdfPath: string;
  outputDir: string;
  menuSlug: string;
}

interface ManifestPage {
  pageNum: number;
  width: number;
  height: number;
  lqip: string;
  mobile: string;
  desktop: string;
}

interface MenuManifest {
  menuSlug: string;
  pageCount: number;
  pages: ManifestPage[];
}

// --- Helpers ---

function padPageNum(n: number): string {
  return String(n).padStart(2, '0');
}

async function processPageBuffer(
  pngBuffer: Buffer,
  pageNum: number,
  outputDir: string,
): Promise<ManifestPage> {
  const metadata = await sharp(pngBuffer).metadata();
  const origWidth = metadata.width!;
  const origHeight = metadata.height!;

  const prefix = `page-${padPageNum(pageNum)}`;

  // --- LQIP: 20px wide, quality 30, base64 ---
  const lqipBuffer = await sharp(pngBuffer)
    .resize({ width: 20 })
    .webp({ quality: 30 })
    .toBuffer();
  const lqipBase64 = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;

  // --- Mobile: 800px wide, quality 82 ---
  const mobileFilename = `${prefix}-800w.webp`;
  await sharp(pngBuffer)
    .resize({ width: 800 })
    .webp({ quality: 82 })
    .toFile(path.join(outputDir, mobileFilename));

  // --- Desktop: 1400px wide, quality 85 ---
  const desktopFilename = `${prefix}-1400w.webp`;
  await sharp(pngBuffer)
    .resize({ width: 1400 })
    .webp({ quality: 85 })
    .toFile(path.join(outputDir, desktopFilename));

  console.log(`  ✓ Page ${pageNum}: LQIP + ${mobileFilename} + ${desktopFilename}`);

  return {
    pageNum,
    width: origWidth,
    height: origHeight,
    lqip: lqipBase64,
    mobile: mobileFilename,
    desktop: desktopFilename,
  };
}

export async function processPdf(options: ProcessOptions): Promise<MenuManifest> {
  const { pdfPath, outputDir, menuSlug } = options;

  // Validate input
  const resolvedPdfPath = path.resolve(pdfPath);
  if (!fs.existsSync(resolvedPdfPath)) {
    throw new Error(`PDF file not found: ${resolvedPdfPath}`);
  }

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`Processing: ${resolvedPdfPath}`);
  console.log(`Output dir: ${path.resolve(outputDir)}`);
  console.log(`Menu slug:  ${menuSlug}`);
  console.log('');

  // Convert all PDF pages to PNG buffers at high resolution
  console.log('Converting PDF pages to PNG...');
  const pngPages = await pdfToPng(resolvedPdfPath, {
    viewportScale: 2.0,  // 2x scale for high-res output
    returnPageContent: true,
    verbosityLevel: 0,
  });

  if (pngPages.length === 0) {
    throw new Error('PDF has no pages or could not be read');
  }
  console.log(`Found ${pngPages.length} pages\n`);

  // Process each page with error resilience
  const pages: ManifestPage[] = [];
  const failedPages: number[] = [];

  for (let i = 0; i < pngPages.length; i++) {
    const pageNum = i + 1;
    try {
      const pngPage = pngPages[i];
      if (!pngPage.content) {
        throw new Error(`No PNG content returned for page ${pageNum}`);
      }
      const page = await processPageBuffer(
        Buffer.from(pngPage.content),
        pageNum,
        outputDir,
      );
      pages.push(page);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ Page ${pageNum} FAILED: ${message}`);
      failedPages.push(pageNum);
      // Continue processing remaining pages
    }
  }

  if (failedPages.length > 0) {
    console.warn(`\n⚠ ${failedPages.length} page(s) failed: ${failedPages.join(', ')}`);
  }

  // Generate manifest
  const manifest: MenuManifest = {
    menuSlug,
    pageCount: pages.length,
    pages,
  };

  const manifestPath = path.join(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✓ Manifest written to ${manifestPath}`);
  console.log(`  ${pages.length} pages processed successfully`);

  return manifest;
}

// --- CLI Entry Point ---

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error('Usage: tsx scripts/process-pdf.ts <pdfPath> <outputDir> <menuSlug>');
    process.exit(1);
  }

  const [pdfPath, outputDir, menuSlug] = args;

  try {
    await processPdf({ pdfPath, outputDir, menuSlug });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`\nFatal error: ${message}`);
    process.exit(1);
  }
}

main();
