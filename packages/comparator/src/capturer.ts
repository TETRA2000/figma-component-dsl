import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

export interface CaptureOptions {
  readonly viewport?: { width: number; height: number };
  readonly scale?: number;
  readonly props?: Record<string, unknown>;
}

export interface CaptureResult {
  readonly outputPath: string;
  readonly width: number;
  readonly height: number;
}

/**
 * Capture a React component rendered in isolation via Playwright.
 *
 * Generates a temporary HTML file, launches an ephemeral Vite dev server,
 * navigates Playwright to render the component, and captures the element screenshot.
 */
export async function capture(
  componentPath: string,
  outputPath: string,
  options: CaptureOptions = {},
): Promise<CaptureResult> {
  const viewport = options.viewport ?? { width: 800, height: 600 };
  const scale = options.scale ?? 1;
  const props = options.props ?? {};

  // Lazy-load playwright to avoid hard dependency at import time
  const { chromium } = await import("playwright");
  const { createServer } = await import("vite");

  const tmpDir = mkdtempSync(join(tmpdir(), "figma-dsl-capture-"));

  try {
    // Generate HTML that renders the React component
    const propsJson = JSON.stringify(props);
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8" /></head>
<body style="margin:0;background:white">
<div id="root"></div>
<script type="module">
import React from 'react';
import ReactDOM from 'react-dom/client';
import Component from '${componentPath}';
const props = ${propsJson};
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(Component, props)
);
</script>
</body></html>`;

    writeFileSync(join(tmpDir, "index.html"), html);

    // Launch ephemeral Vite dev server
    const server = await createServer({
      configFile: false,
      root: tmpDir,
      server: { port: 0 },
      logLevel: "silent",
    });

    await server.listen();
    const address = server.httpServer?.address();
    const port = typeof address === "object" && address ? address.port : 5173;

    try {
      // Launch Playwright and capture
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: scale,
      });
      const page = await context.newPage();
      await page.goto(`http://localhost:${String(port)}/`, {
        waitUntil: "networkidle",
      });

      const element = await page.locator("#root").first();
      await element.screenshot({ path: outputPath, type: "png" });

      const box = await element.boundingBox();
      const width = box ? Math.round(box.width * scale) : viewport.width;
      const height = box ? Math.round(box.height * scale) : viewport.height;

      await browser.close();

      return { outputPath, width, height };
    } finally {
      await server.close();
    }
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

/**
 * Capture a screenshot from an existing URL (e.g., running Storybook).
 */
export async function captureUrl(
  url: string,
  outputPath: string,
  options: CaptureOptions = {},
): Promise<CaptureResult> {
  const viewport = options.viewport ?? { width: 800, height: 600 };
  const scale = options.scale ?? 1;

  const { chromium } = await import("playwright");

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: scale,
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });

    const element = await page.locator("#root").first();
    await element.screenshot({ path: outputPath, type: "png" });

    const box = await element.boundingBox();
    const width = box ? Math.round(box.width * scale) : viewport.width;
    const height = box ? Math.round(box.height * scale) : viewport.height;

    return { outputPath, width, height };
  } finally {
    await browser.close();
  }
}
