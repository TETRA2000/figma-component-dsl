/**
 * Visual Regression Tests — React Baselines
 *
 * Screenshots each of the 18 test pages via Playwright/Chromium and
 * compares against committed baseline PNGs.
 *
 * Golden file pattern:
 * - If baseline doesn't exist: saves the screenshot AS the baseline (test passes)
 * - If baseline exists: compares screenshot against it (test fails on mismatch)
 *
 * Skipped when Chromium is not installed (e.g., local dev without Playwright).
 * Run `npx playwright install chromium` to enable.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { compare } from '@figma-dsl/comparator';
import { startTestServer } from '../test-server.js';
import { buildRegistry } from '../test-registry.js';
import {
  VISUAL_REGRESSION_PAGES,
  REACT_SIMILARITY_THRESHOLD,
  REACT_BASELINES_DIR,
  DIFFS_DIR,
  TEST_PAGES_DIR,
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
    const { port, stop } = await startTestServer({
      testPagesDir: TEST_PAGES_DIR,
      port: 0,
    });
    stopServer = stop;
    baseUrl = `http://localhost:${port}`;

    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  } catch {
    console.warn('Chromium not available — skipping React visual regression tests');
    skipAll = true;
  }
}, 30_000);

afterAll(async () => {
  await page?.close();
  await browser?.close();
  await stopServer?.();
});

describe('React visual regression', () => {
  for (const pageName of VISUAL_REGRESSION_PAGES) {
    it(`${pageName} matches baseline`, async () => {
      if (skipAll || !page) return;

      const entry = registryByName.get(pageName);
      expect(entry).toBeDefined();

      await page.setViewportSize(entry!.viewport);
      const url = `${baseUrl}/test/${pageName}`;
      await page.goto(url, { waitUntil: 'load', timeout: 10_000 });
      await page.waitForTimeout(200);

      const rootHandle = await page.$(ROOT_SELECTOR);
      expect(rootHandle).not.toBeNull();

      const screenshotBuffer = Buffer.from(
        await rootHandle!.screenshot({ type: 'png', timeout: 10_000 }),
      );

      const baselinePath = join(REACT_BASELINES_DIR, `${pageName}.png`);

      // Golden file: if baseline doesn't exist, create it
      if (!existsSync(baselinePath)) {
        mkdirSync(REACT_BASELINES_DIR, { recursive: true });
        writeFileSync(baselinePath, screenshotBuffer);
        console.log(`Created React baseline: ${pageName}.png`);
        return;
      }

      const baseline = readFileSync(baselinePath);
      const result = compare(baseline, screenshotBuffer, {
        failThreshold: REACT_SIMILARITY_THRESHOLD,
      });

      if (!result.pass && result.diffPngBuffer) {
        mkdirSync(DIFFS_DIR, { recursive: true });
        writeFileSync(join(DIFFS_DIR, `${pageName}-react-diff.png`), result.diffPngBuffer);
      }

      expect(result.similarity).toBeGreaterThanOrEqual(REACT_SIMILARITY_THRESHOLD);
    }, 15_000);
  }
});
