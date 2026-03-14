import { chromium, type Browser, type Page } from 'playwright';
import fs from 'node:fs';

interface CaptureOptions {
  viewport: { width: number; height: number };
  selector?: string;
  background?: 'white' | 'transparent';
  deviceScaleFactor?: number;
  scrollPosition?: number;
}

interface CaptureResult {
  pngPath: string;
  width: number;
  height: number;
}

export class Capturer {
  async capture(
    componentPath: string,
    props: Record<string, unknown>,
    outputPath: string,
    options: CaptureOptions,
  ): Promise<CaptureResult> {
    // For module path capture, we'd spin up a minimal Vite server
    // This is a placeholder — full implementation requires Vite integration
    throw new Error(
      `Module capture not yet implemented. Use captureUrl() with a running dev server. Path: ${componentPath}`,
    );
  }

  async captureUrl(
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

      if (options.scrollPosition) {
        await page.evaluate((pos) => window.scrollTo(0, pos), options.scrollPosition);
      }

      const element = options.selector
        ? await page.locator(options.selector).first()
        : page;

      const screenshot = await (options.selector
        ? (element as Awaited<ReturnType<Page['locator']>>).screenshot({
            type: 'png',
            omitBackground: options.background === 'transparent',
          })
        : page.screenshot({
            type: 'png',
            omitBackground: options.background === 'transparent',
          }));

      fs.writeFileSync(outputPath, screenshot);

      // Get dimensions
      const dims = options.selector
        ? await (element as Awaited<ReturnType<Page['locator']>>).boundingBox()
        : { width: options.viewport.width, height: options.viewport.height };

      await context.close();

      return {
        pngPath: outputPath,
        width: Math.ceil((dims?.width ?? options.viewport.width) * (options.deviceScaleFactor ?? 1)),
        height: Math.ceil((dims?.height ?? options.viewport.height) * (options.deviceScaleFactor ?? 1)),
      };
    } finally {
      await browser?.close();
    }
  }
}
