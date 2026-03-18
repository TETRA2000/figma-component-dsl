#!/usr/bin/env tsx
/**
 * Baseline update script — regenerates all React and DSL baseline PNGs.
 *
 * Usage: npx tsx packages/react-to-dsl/src/__tests__/update-baselines.ts
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { tmpdir } from 'os';
import { compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import { render, initializeRenderer } from '@figma-dsl/renderer';
import { startTestServer } from '../test-server.js';
import { buildRegistry } from '../test-registry.js';
import { extractFromPage } from '../extractor.js';
import { mapToDsl } from '../mapper.js';
import { generateDslCode } from '../codegen.js';
import {
  VISUAL_REGRESSION_PAGES,
  REACT_BASELINES_DIR,
  DSL_BASELINES_DIR,
  TEST_PAGES_DIR,
  FONT_DIR,
  ROOT_SELECTOR,
} from './visual-regression-config.js';

async function main() {
  console.log('Initializing fonts...');
  textMeasurer.initialize(FONT_DIR);
  initializeRenderer(FONT_DIR);

  console.log('Starting test server...');
  const { port, stop } = await startTestServer({
    testPagesDir: TEST_PAGES_DIR,
    port: 0,
  });
  const baseUrl = `http://localhost:${port}`;

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const registry = buildRegistry();
  const registryByName = new Map(registry.map((e) => [e.name, e]));

  mkdirSync(REACT_BASELINES_DIR, { recursive: true });
  mkdirSync(DSL_BASELINES_DIR, { recursive: true });

  const tmpDir = join(tmpdir(), 'visual-regression-dsl-baselines');
  mkdirSync(tmpDir, { recursive: true });

  for (const pageName of VISUAL_REGRESSION_PAGES) {
    const entry = registryByName.get(pageName);
    if (!entry) {
      console.error(`  SKIP ${pageName} — not found in registry`);
      continue;
    }

    process.stdout.write(`  ${pageName} ...`);

    // Set viewport and navigate
    await page.setViewportSize(entry.viewport);
    const url = `${baseUrl}/test/${pageName}`;
    await page.goto(url, { waitUntil: 'load', timeout: 10_000 });
    await page.waitForTimeout(200);

    // --- React baseline ---
    const rootHandle = await page.$(ROOT_SELECTOR);
    if (!rootHandle) {
      console.error(` FAIL (root element not found)`);
      continue;
    }
    const reactPng = Buffer.from(
      await rootHandle.screenshot({ type: 'png', timeout: 10_000 }),
    );
    writeFileSync(join(REACT_BASELINES_DIR, `${pageName}.png`), reactPng);

    // --- DSL baseline ---
    try {
      const snapshot = await extractFromPage(page, ROOT_SELECTOR);
      const { node: dslNode } = mapToDsl(snapshot, pageName);
      const dslCode = generateDslCode(dslNode, {
        componentName: pageName,
        asComponent: true,
      });

      const dslFilePath = join(tmpDir, `${pageName}.dsl.ts`);
      writeFileSync(dslFilePath, dslCode);

      const mod = await import(pathToFileURL(dslFilePath).href);
      const importedNode = mod.default;
      const compiled = compileWithLayout(importedNode, textMeasurer);
      const renderResult = render(compiled.root);
      writeFileSync(
        join(DSL_BASELINES_DIR, `${pageName}.png`),
        Buffer.from(renderResult.pngBuffer),
      );

      console.log(' OK');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(` DSL FAIL (${msg})`);
      // React baseline was still saved
    }
  }

  await page.close();
  await browser.close();
  await stop();

  console.log(`\nDone. Baselines written to:`);
  console.log(`  React: ${REACT_BASELINES_DIR}`);
  console.log(`  DSL:   ${DSL_BASELINES_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
