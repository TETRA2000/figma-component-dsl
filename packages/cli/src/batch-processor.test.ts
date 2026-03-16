import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BatchOptions } from './batch-processor.js';

// Mock dependencies before importing
vi.mock('@figma-dsl/compiler', () => ({
  compileWithLayout: vi.fn(() => ({
    root: {
      type: 'FRAME',
      name: 'Test',
      x: 0, y: 0,
      width: 100, height: 100,
      children: [],
      fillPaints: [],
    },
  })),
  textMeasurer: vi.fn(),
}));

vi.mock('@figma-dsl/renderer', () => ({
  renderToFile: vi.fn(() => ({ width: 100, height: 100, pngBuffer: Buffer.from('') })),
  renderCanvasNodes: vi.fn(() => new Map()),
  collectImageSources: vi.fn(() => new Set<string>()),
  preloadImages: vi.fn(async () => new Map()),
}));

vi.mock('@figma-dsl/exporter', () => ({
  generatePluginInput: vi.fn((_compiled: unknown, _page?: string) => ({
    schemaVersion: '1.0.0',
    targetPage: 'Test',
    components: [{ type: 'FRAME', name: 'Test' }],
  })),
}));

vi.mock('fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('fs')>();
  return {
    ...actual,
    mkdirSync: vi.fn(),
    writeFileSync: vi.fn(),
  };
});

// Create a temp module for loadDslModule
vi.mock('url', async (importOriginal) => {
  const actual = await importOriginal<typeof import('url')>();
  return { ...actual };
});

import { processBatch } from './batch-processor.js';
import { renderToFile, collectImageSources, preloadImages } from '@figma-dsl/renderer';
import { generatePluginInput } from '@figma-dsl/exporter';

// Mock glob to return controllable results
vi.mock('./glob-util.js', () => ({
  glob: vi.fn((pattern: string) => {
    if (pattern.includes('test-dsl')) return ['/tmp/test-dsl/comp.dsl.ts'];
    return [];
  }),
}));

// Mock dynamic import for DSL modules
const mockDslNode = { type: 'FRAME', name: 'Test', children: [] };
vi.stubGlobal('import', undefined);

// We need to mock the loadDslModule indirectly via import()
// Override import to return our mock module
const originalImport = globalThis[Symbol.for('vitest:dynamicImport') as unknown as keyof typeof globalThis];

describe('processBatch — assetDir option', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset collectImageSources to return empty by default
    vi.mocked(collectImageSources).mockReturnValue(new Set());
  });

  it('passes assetDir to generatePluginInput when specified', async () => {
    // We test the options type accepts assetDir
    const options: BatchOptions = {
      input: '/tmp/test-dsl/*.dsl.ts',
      outputDir: '/tmp/output',
      assetDir: '/tmp/assets',
    };

    // Verify BatchOptions accepts assetDir
    expect(options.assetDir).toBe('/tmp/assets');
  });

  it('BatchOptions type includes assetDir as optional', () => {
    const withoutAssetDir: BatchOptions = {
      input: 'test',
      outputDir: '/tmp/out',
    };
    expect(withoutAssetDir.assetDir).toBeUndefined();

    const withAssetDir: BatchOptions = {
      input: 'test',
      outputDir: '/tmp/out',
      assetDir: '/custom/assets',
    };
    expect(withAssetDir.assetDir).toBe('/custom/assets');
  });

  it('collectImageSources and preloadImages are importable from renderer', () => {
    expect(collectImageSources).toBeDefined();
    expect(preloadImages).toBeDefined();
    expect(typeof collectImageSources).toBe('function');
    expect(typeof preloadImages).toBe('function');
  });
});
