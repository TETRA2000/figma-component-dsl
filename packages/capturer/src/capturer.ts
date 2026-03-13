/**
 * Screenshot capturer — React component isolation via Playwright.
 * Captures React component screenshots using headless Chromium.
 */

export interface CaptureOptions {
  /** Viewport width */
  width?: number;
  /** Viewport height */
  height?: number;
  /** Device scale factor */
  deviceScaleFactor?: number;
  /** Background color: 'white' | 'transparent' */
  background?: 'white' | 'transparent';
}

export interface CaptureResult {
  /** Path to the captured PNG */
  outputPath: string;
  /** Viewport dimensions used */
  viewport: { width: number; height: number };
}

/**
 * Capture a screenshot of a React component from a URL.
 * Requires Playwright to be installed.
 */
export async function captureFromUrl(
  url: string,
  selector: string,
  outputPath: string,
  options?: CaptureOptions,
): Promise<CaptureResult> {
  // Dynamic import to avoid requiring Playwright at compile time
  const { chromium } = await import('playwright');

  const width = options?.width ?? 1280;
  const height = options?.height ?? 720;

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: options?.deviceScaleFactor ?? 1,
    });
    const page = await context.newPage();

    // Set background
    if (options?.background === 'transparent') {
      await page.addStyleTag({ content: 'body { background: transparent !important; }' });
    }

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for selector and capture element screenshot
    const element = await page.waitForSelector(selector, { timeout: 10000 });
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    await element.screenshot({ path: outputPath });

    await context.close();
    return { outputPath, viewport: { width, height } };
  } finally {
    await browser.close();
  }
}

/**
 * Capture a screenshot from a component module path using a minimal dev server.
 * This creates a temporary HTML page that imports and renders the component.
 */
export async function captureFromModule(
  modulePath: string,
  outputPath: string,
  options?: CaptureOptions & { props?: Record<string, unknown> },
): Promise<CaptureResult> {
  // This would require setting up a Vite dev server
  // For now, delegate to captureFromUrl with a dev server URL
  throw new Error(
    'captureFromModule requires a running dev server. ' +
    'Use captureFromUrl with a dev server URL instead.',
  );
}
