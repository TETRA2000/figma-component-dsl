/**
 * Batch conversion and comparison pipeline.
 *
 * Orchestrates the conversion of multiple React test pages to DSL,
 * then compiles, renders, and compares the results against the original.
 */

import { chromium } from 'playwright';
import type { Page } from 'playwright';
import { join, dirname } from 'path';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { extractFromPage } from './extractor.js';
import { mapToDsl } from './mapper.js';
import { generateDslCode } from './codegen.js';
import type { ComparisonResult } from './types.js';
import { compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import { render, initializeRenderer } from '@figma-dsl/renderer';
import { compare } from '@figma-dsl/comparator';

export interface BatchConvertOptions {
  /** Base URL where test pages are served (e.g., 'http://localhost:5173') */
  baseUrl: string;
  /** Registry of test pages to convert */
  pages: Array<{
    name: string;
    category: string;
    path: string;
    viewport: { width: number; height: number };
  }>;
  /** Output directory for results */
  outputDir: string;
  /** Selector for root element (default: '[data-testid="root"]') */
  selector?: string;
  /** Optional: comparison threshold (default: 85) */
  threshold?: number;
}

export interface BatchConvertResult {
  total: number;
  succeeded: number;
  failed: number;
  results: ComparisonResult[];
}

function findFontDir(): string {
  const candidates = [
    join(dirname(new URL(import.meta.url).pathname), '../../../dsl-core/fonts'),
    join(process.cwd(), 'packages/dsl-core/fonts'),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return candidates[0]!;
}

async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
}

async function convertSinglePage(
  page: Page,
  baseUrl: string,
  entry: BatchConvertOptions['pages'][number],
  outputDir: string,
  selector: string,
  threshold: number,
): Promise<ComparisonResult> {
  const name = entry.name;
  const pageDir = join(outputDir, name);
  mkdirSync(pageDir, { recursive: true });

  const warnings: string[] = [];

  try {
    // Set viewport
    await page.setViewportSize(entry.viewport);

    // Navigate and wait for load
    const url = baseUrl.replace(/\/$/, '') + entry.path;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    // Screenshot the root element
    const rootHandle = await page.$(selector);
    if (!rootHandle) {
      throw new Error(`Root element not found for selector: ${selector}`);
    }
    const reactPngBuffer = await rootHandle.screenshot({ type: 'png' });
    writeFileSync(join(pageDir, 'react.png'), reactPngBuffer);

    // Extract DOM snapshot
    const snapshot = await extractFromPage(page, selector);

    // Map to DslNode tree
    const { node: dslNode, warnings: mapWarnings } = mapToDsl(snapshot, name);
    warnings.push(...mapWarnings);

    // Generate DSL code
    const dslCode = generateDslCode(dslNode, { componentName: name, asComponent: true });
    const dslFilePath = join(pageDir, 'script.dsl.ts');
    writeFileSync(dslFilePath, dslCode);

    // Compile the generated DSL
    let scriptDslValid = false;
    let similarity = 0;
    let diffPngBuffer: Buffer | undefined;

    try {
      const mod = await import(pathToFileURL(dslFilePath).href);
      const importedNode = mod.default;
      const compiled = compileWithLayout(importedNode, textMeasurer);

      if (compiled.errors.length > 0) {
        for (const err of compiled.errors) {
          warnings.push(`Compile error: ${err.message}`);
        }
      }

      scriptDslValid = true;

      // Render to PNG buffer
      const renderResult = render(compiled.root);
      const scriptPngBuffer = renderResult.pngBuffer;
      writeFileSync(join(pageDir, 'script-dsl.png'), scriptPngBuffer);

      // Compare react.png vs script-dsl.png
      const compareResult = compare(
        Buffer.from(reactPngBuffer),
        Buffer.from(scriptPngBuffer),
        { failThreshold: threshold },
      );

      similarity = compareResult.similarity;

      if (compareResult.diffPngBuffer) {
        diffPngBuffer = compareResult.diffPngBuffer;
        writeFileSync(join(pageDir, 'diff.png'), diffPngBuffer);
      }
    } catch (compileErr: unknown) {
      const msg = compileErr instanceof Error ? compileErr.message : String(compileErr);
      warnings.push(`DSL compile/render failed: ${msg}`);
    }

    const status: ComparisonResult['status'] =
      !scriptDslValid ? 'ERROR' :
      similarity >= threshold ? 'PASS' : 'FAIL';

    return {
      name,
      category: entry.category,
      reactVsScript: Math.round(similarity * 100) / 100,
      scriptDslValid,
      warnings,
      status,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      name,
      category: entry.category,
      reactVsScript: 0,
      scriptDslValid: false,
      warnings,
      status: 'ERROR',
      error: msg,
    };
  }
}

export async function batchConvert(options: BatchConvertOptions): Promise<BatchConvertResult> {
  const {
    baseUrl,
    pages,
    outputDir,
    selector = '[data-testid="root"]',
    threshold = 85,
  } = options;

  // Ensure output directory exists
  mkdirSync(outputDir, { recursive: true });

  // Initialize fonts for text measurer and renderer
  const fontDir = findFontDir();
  textMeasurer.initialize(fontDir);
  initializeRenderer(fontDir);

  // Launch a single browser instance
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const results: ComparisonResult[] = [];
  let succeeded = 0;
  let failed = 0;

  try {
    for (const entry of pages) {
      const result = await convertSinglePage(
        page,
        baseUrl,
        entry,
        outputDir,
        selector,
        threshold,
      );

      results.push(result);

      if (result.status === 'PASS') {
        succeeded++;
      } else {
        failed++;
      }
    }
  } finally {
    await page.close();
    await browser.close();
  }

  return {
    total: pages.length,
    succeeded,
    failed,
    results,
  };
}
