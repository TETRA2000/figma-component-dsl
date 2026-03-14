/**
 * Screenshot capturer for React components via Playwright.
 * Requires playwright to be installed: npm install playwright
 */

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

export interface CaptureService {
  capture(
    componentPath: string,
    props: Record<string, unknown>,
    outputPath: string,
    options: CaptureOptions,
  ): Promise<CaptureResult>;

  captureUrl(
    url: string,
    outputPath: string,
    options: CaptureOptions,
  ): Promise<CaptureResult>;
}

/**
 * Playwright-based capturer.
 * Note: Requires playwright and a browser to be installed.
 * Falls back to an error if playwright is not available.
 */
export class PlaywrightCapturer implements CaptureService {
  async capture(
    componentPath: string,
    props: Record<string, unknown>,
    outputPath: string,
    options: CaptureOptions,
  ): Promise<CaptureResult> {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();

    try {
      const context = await browser.newContext({
        viewport: options.viewport,
        deviceScaleFactor: options.deviceScaleFactor ?? 1,
      });
      const page = await context.newPage();

      // Build a minimal HTML that imports and renders the component
      const propsJson = JSON.stringify(props);
      const html = `
        <!DOCTYPE html>
        <html><head><style>
          body { margin: 0; background: ${options.background === 'transparent' ? 'transparent' : 'white'}; }
        </style></head>
        <body><div id="root"></div>
        <script type="module">
          import Component from '${componentPath}';
          import { createRoot } from 'react-dom/client';
          import { createElement } from 'react';
          const root = createRoot(document.getElementById('root'));
          root.render(createElement(Component, ${propsJson}));
        </script>
        </body></html>
      `;

      await page.setContent(html);
      await page.waitForLoadState('networkidle');

      const selector = options.selector ?? '#root > *';
      const element = await page.$(selector);
      if (!element) {
        throw new Error(`Element not found: ${selector}`);
      }

      await element.screenshot({ path: outputPath, type: 'png' });
      const box = await element.boundingBox();

      await context.close();
      return {
        pngPath: outputPath,
        width: box?.width ?? options.viewport.width,
        height: box?.height ?? options.viewport.height,
      };
    } finally {
      await browser.close();
    }
  }

  async captureUrl(
    url: string,
    outputPath: string,
    options: CaptureOptions,
  ): Promise<CaptureResult> {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();

    try {
      const context = await browser.newContext({
        viewport: options.viewport,
        deviceScaleFactor: options.deviceScaleFactor ?? 1,
      });
      const page = await context.newPage();
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      const selector = options.selector ?? 'body > *';
      const element = await page.$(selector);
      if (!element) {
        throw new Error(`Element not found: ${selector}`);
      }

      await element.screenshot({ path: outputPath, type: 'png' });
      const box = await element.boundingBox();

      await context.close();
      return {
        pngPath: outputPath,
        width: box?.width ?? options.viewport.width,
        height: box?.height ?? options.viewport.height,
      };
    } finally {
      await browser.close();
    }
  }
}
