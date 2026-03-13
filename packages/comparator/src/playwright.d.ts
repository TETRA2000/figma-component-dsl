declare module "playwright" {
  interface Browser {
    newContext(options?: {
      viewport?: { width: number; height: number };
      deviceScaleFactor?: number;
    }): Promise<BrowserContext>;
    close(): Promise<void>;
  }

  interface BrowserContext {
    newPage(): Promise<Page>;
  }

  interface Page {
    goto(url: string, options?: { waitUntil?: string }): Promise<void>;
    locator(selector: string): Locator;
  }

  interface Locator {
    first(): Locator;
    screenshot(options?: { path?: string; type?: string }): Promise<Buffer>;
    boundingBox(): Promise<{ x: number; y: number; width: number; height: number } | null>;
  }

  interface BrowserType {
    launch(options?: { headless?: boolean }): Promise<Browser>;
  }

  export const chromium: BrowserType;
}

declare module "vite" {
  interface ViteDevServer {
    listen(): Promise<void>;
    close(): Promise<void>;
    httpServer: {
      address(): { port: number } | string | null;
    } | null;
  }

  export function createServer(config: {
    configFile?: boolean;
    root?: string;
    server?: { port?: number };
    logLevel?: string;
    resolve?: { alias?: Record<string, string> };
  }): Promise<ViteDevServer>;
}
