import { chromium, type Browser } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export interface CaptureOptions {
  viewport: { width: number; height: number };
  selector?: string;
  background?: 'white' | 'transparent';
  deviceScaleFactor?: number;
}

export interface CaptureResult {
  pngPath: string;
  width: number;
  height: number;
}

export async function capture(
  componentPath: string,
  props: Record<string, unknown>,
  outputPath: string,
  options: CaptureOptions,
): Promise<CaptureResult> {
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: options.viewport,
      deviceScaleFactor: options.deviceScaleFactor ?? 1,
    });
    const page = await context.newPage();

    // Build a minimal HTML page that renders the component
    const propsJson = JSON.stringify(props);
    const html = `<!DOCTYPE html>
<html>
<head><style>body { margin: 0; background: ${options.background === 'transparent' ? 'transparent' : 'white'}; }</style></head>
<body>
<div id="root"></div>
<script type="module">
import Component from '${componentPath}';
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
const root = createRoot(document.getElementById('root'));
root.render(createElement(Component, ${propsJson}));
</script>
</body>
</html>`;

    await page.setContent(html, { waitUntil: 'networkidle' });

    const selector = options.selector ?? '#root > *';
    const element = await page.waitForSelector(selector, { timeout: 5000 });
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    const screenshot = await element.screenshot({ type: 'png' });
    const box = await element.boundingBox();

    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, screenshot);

    await context.close();

    return {
      pngPath: outputPath,
      width: box?.width ?? options.viewport.width,
      height: box?.height ?? options.viewport.height,
    };
  } finally {
    if (browser) await browser.close();
  }
}

export async function captureUrl(
  url: string,
  outputPath: string,
  options: CaptureOptions,
): Promise<CaptureResult> {
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: options.viewport,
      deviceScaleFactor: options.deviceScaleFactor ?? 1,
    });
    const page = await context.newPage();

    await page.goto(url, { waitUntil: 'networkidle' });

    const selector = options.selector ?? '#root > *';
    const element = await page.waitForSelector(selector, { timeout: 5000 });
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    const screenshot = await element.screenshot({ type: 'png' });
    const box = await element.boundingBox();

    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, screenshot);

    await context.close();

    return {
      pngPath: outputPath,
      width: box?.width ?? options.viewport.width,
      height: box?.height ?? options.viewport.height,
    };
  } finally {
    if (browser) await browser.close();
  }
}
