#!/usr/bin/env tsx
/**
 * Batch PDF processor for all restaurant menus.
 *
 * Maps each PDF file to its menu slug and processes them into
 * 3-tier WebP images + manifest.json under public/data/menus/{slug}/
 *
 * Usage: npx tsx scripts/process-all.ts
 */

import { processPdf } from "./process-pdf";
import * as path from "path";
import * as fs from "fs";

interface PdfEntry {
  pdfPath: string;
  slug: string;
}

const ROOT = path.resolve(__dirname, "../..");

const entries: PdfEntry[] = [
  // === TEIEN ===
  { pdfPath: "Restaurants/Teien/Teien_Ala_Carte_Menu.pdf", slug: "teien-alacarte-eng" },
  { pdfPath: "Restaurants/Teien/Teien_Ala_Carte_Menu_CHN.pdf", slug: "teien-alacarte-chn" },
  { pdfPath: "Restaurants/Teien/Teien_Ala_Carte_Menu_GER.pdf", slug: "teien-alacarte-ger" },
  { pdfPath: "Restaurants/Teien/Teien_Ala_Carte_Menu_JPN.pdf", slug: "teien-alacarte-jpn" },
  { pdfPath: "Restaurants/Teien/Teien_Ala_Carte_Menu_RUS.pdf", slug: "teien-alacarte-rus" },
  { pdfPath: "Restaurants/Teien/Teien_Teppanyaki_Menu.pdf", slug: "teien-teppanyaki" },

  // === TAZAA ===
  { pdfPath: "Restaurants/Tazaa/Tazaa Breakfast.pdf", slug: "tazaa-breakfast" },
  { pdfPath: "Restaurants/Tazaa/Tazaa Lunch.pdf", slug: "tazaa-lunch" },
  { pdfPath: "Restaurants/Tazaa/Tazäa Dinner.pdf", slug: "tazaa-dinner" },
  { pdfPath: "Restaurants/Tazaa/Translated/RUS/Tazäa Dinner Russian.pdf", slug: "tazaa-dinner-rus" },

  // === ACQUAPAZZA ===
  { pdfPath: "Restaurants/Aquapazza/Acquapazza Menu LUNCH ENG.pdf", slug: "acquapazza-lunch-eng" },
  { pdfPath: "Restaurants/Aquapazza/Acquapazza Menu LUNCH CHN.pdf", slug: "acquapazza-lunch-chn" },
  { pdfPath: "Restaurants/Aquapazza/Acquapazza Menu LUNCH JPN.pdf", slug: "acquapazza-lunch-jpn" },
  { pdfPath: "Restaurants/Aquapazza/Acquapazza Menu LUNCH RUS.pdf", slug: "acquapazza-lunch-rus" },
  { pdfPath: "Restaurants/Aquapazza/Acquapazza Menu DINNER ENG.pdf", slug: "acquapazza-dinner-eng" },
  { pdfPath: "Restaurants/Aquapazza/Acquapazza Menu DINNER CHN.pdf", slug: "acquapazza-dinner-chn" },
  { pdfPath: "Restaurants/Aquapazza/Acquapazza Menu DINNER JPN.pdf", slug: "acquapazza-dinner-jpn" },
  { pdfPath: "Restaurants/Aquapazza/Acquapazza Menu DINNER RUS.pdf", slug: "acquapazza-dinner-rus" },

  // === MY COFFEE ===
  { pdfPath: "Restaurants/MyCoffee/My_Coffee_Menu_V5.pdf", slug: "mycoffee-menu" },

  // === GINGERMOON ===
  { pdfPath: "Restaurants/Gingermoon/Ginger_Moon_V7-PRINT.pdf", slug: "gingermoon-menu-eng" },
  { pdfPath: "Restaurants/Gingermoon/Ginger_Moon_V7-CHN-PRINT.pdf", slug: "gingermoon-menu-chn" },
  { pdfPath: "Restaurants/Gingermoon/Ginger_Moon_V7_JPN-PRINT.pdf", slug: "gingermoon-menu-jpn" },
  { pdfPath: "Restaurants/Gingermoon/Ginger_Moon_V7-RUS-PRINT.pdf", slug: "gingermoon-menu-rus" },
];

async function main() {
  const outputBase = path.join(__dirname, "..", "public", "data", "menus");
  let succeeded = 0;
  let failed = 0;

  console.log(`\n📚 Processing ${entries.length} PDFs...\n`);

  for (const entry of entries) {
    const pdfPath = path.join(ROOT, entry.pdfPath);
    const outputDir = path.join(outputBase, entry.slug);

    // Skip if already processed
    if (fs.existsSync(path.join(outputDir, "manifest.json"))) {
      console.log(`⏭  ${entry.slug} — already processed, skipping`);
      succeeded++;
      continue;
    }

    if (!fs.existsSync(pdfPath)) {
      console.error(`❌ ${entry.slug} — PDF not found: ${pdfPath}`);
      failed++;
      continue;
    }

    try {
      console.log(`\n📖 Processing: ${entry.slug}`);
      await processPdf({
        pdfPath,
        outputDir,
        menuSlug: entry.slug,
      });

      // Generate cover from first page mobile image
      const coverSrc = path.join(outputDir, "page-01-800w.webp");
      const coverDst = path.join(outputDir, "cover.webp");
      if (fs.existsSync(coverSrc) && !fs.existsSync(coverDst)) {
        fs.copyFileSync(coverSrc, coverDst);
        console.log(`  ✓ Cover generated`);
      }

      succeeded++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ ${entry.slug} — FAILED: ${msg}`);
      failed++;
    }
  }

  console.log(`\n✅ Done: ${succeeded} succeeded, ${failed} failed out of ${entries.length} total\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

main();
