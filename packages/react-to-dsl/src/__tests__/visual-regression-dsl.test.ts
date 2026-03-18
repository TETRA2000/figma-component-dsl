/**
 * Visual Regression Tests — DSL Baselines
 *
 * Runs the full React-to-DSL pipeline for each of the 18 test pages
 * (extract DOM → map → codegen → compile → render) and compares
 * the rendered PNG against committed baseline PNGs.
 *
 * Golden file pattern:
 * - If baseline doesn't exist: saves the render AS the baseline (test passes)
 * - If baseline exists: compares render against it (test fails on mismatch)
 *
 * Skipped when Chromium is not installed (e.g., local dev without Playwright).
 * Run `npx playwright install chromium` to enable.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { tmpdir } from 'os';
import { compare } from '@figma-dsl/comparator';
import { compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import { render, initializeRenderer } from '@figma-dsl/renderer';
import { startTestServer } from '../test-server.js';
import { buildRegistry } from '../test-registry.js';
import { extractFromPage } from '../extractor.js';
import { mapToDsl } from '../mapper.js';
import { generateDslCode } from '../codegen.js';
import {
  VISUAL_REGRESSION_PAGES,
  DSL_SIMILARITY_THRESHOLD,
  DSL_BASELINES_DIR,
  DIFFS_DIR,
  TEST_PAGES_DIR,
  FONT_DIR,
  ROOT_SELECTOR,
} from './visual-regression-config.js';

let browser: Browser | undefined;
let page: Page | undefined;
let stopServer: (() => Promise<void>) | undefined;
let baseUrl: string;
let skipAll = false;

const registry = buildRegistry();
const registryByName = new Map(registry.map((e) => [e.name, e]));

beforeAll(async () => {
  try {
    textMeasurer.initialize(FONT_DIR);
    initializeRenderer(FONT_DIR);

    const { port, stop } = await startTestServer({
      testPagesDir: TEST_PAGES_DIR,
      port: 0,
    });
    stopServer = stop;
    baseUrl = `http://localhost:${port}`;

    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  } catch {
    console.warn('Chromium not available — skipping DSL visual regression tests');
    skipAll = true;
  }
}, 30_000);

afterAll(async () => {
  await page?.close();
  await browser?.close();
  await stopServer?.();
});

describe('DSL visual regression', () => {
  for (const pageName of VISUAL_REGRESSION_PAGES) {
    it(`${pageName} matches baseline`, async () => {
      if (skipAll || !page) return;

      const entry = registryByName.get(pageName);
      expect(entry).toBeDefined();

      // Navigate and extract DOM
      await page.setViewportSize(entry!.viewport);
      const url = `${baseUrl}/test/${pageName}`;
      await page.goto(url, { waitUntil: 'load', timeout: 10_000 });
      await page.waitForTimeout(200);

      const snapshot = await extractFromPage(page, ROOT_SELECTOR);

      // Map to DSL node tree
      const { node: dslNode } = mapToDsl(snapshot, pageName);

      // Generate DSL code
      const dslCode = generateDslCode(dslNode, {
        componentName: pageName,
        asComponent: true,
      });

      // Write to temp file and dynamically import
      const tmpDir = join(tmpdir(), 'visual-regression-dsl');
      mkdirSync(tmpDir, { recursive: true });
      const dslFilePath = join(tmpDir, `${pageName}.dsl.ts`);
      writeFileSync(dslFilePath, dslCode);

      const mod = await import(pathToFileURL(dslFilePath).href);
      const importedNode = mod.default;

      // Compile and render
      const compiled = compileWithLayout(importedNode, textMeasurer);
      const renderResult = render(compiled.root);
      const renderedBuffer = Buffer.from(renderResult.pngBuffer);

      // Golden file: if baseline doesn't exist, create it
      const baselinePath = join(DSL_BASELINES_DIR, `${pageName}.png`);
      if (!existsSync(baselinePath)) {
        mkdirSync(DSL_BASELINES_DIR, { recursive: true });
        writeFileSync(baselinePath, renderedBuffer);
        console.log(`Created DSL baseline: ${pageName}.png`);
        return;
      }

      const baseline = readFileSync(baselinePath);
      const result = compare(baseline, renderedBuffer, {
        failThreshold: DSL_SIMILARITY_THRESHOLD,
      });

      if (!result.pass && result.diffPngBuffer) {
        mkdirSync(DIFFS_DIR, { recursive: true });
        writeFileSync(join(DIFFS_DIR, `${pageName}-dsl-diff.png`), result.diffPngBuffer);
      }

      expect(result.similarity).toBeGreaterThanOrEqual(DSL_SIMILARITY_THRESHOLD);
    }, 30_000);
  }
});
