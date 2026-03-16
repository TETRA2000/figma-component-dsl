import { resolve, join, basename, dirname, relative } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { pathToFileURL } from 'url';
import { compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import type { DslNode } from '@figma-dsl/core';
import { renderToFile, collectImageSources, preloadImages, renderCanvasNodes } from '@figma-dsl/renderer';
import { generatePluginInput } from '@figma-dsl/exporter';
import type { PluginInput, PluginNodeDef } from '@figma-dsl/exporter';
import { glob } from './glob-util.js';

export interface BatchOptions {
  input: string;
  outputDir: string;
  include?: string[];
  pageName?: string;
  scale?: number;
  assetDir?: string;
}

export interface BatchComponentResult {
  name: string;
  dslPath: string;
  pngPath: string | null;
  status: 'success' | 'error';
  error?: string;
  dimensions?: { width: number; height: number };
}

export interface BatchResult {
  components: BatchComponentResult[];
  mergedPluginInputPath: string;
  manifestPath: string;
  successCount: number;
  errorCount: number;
}

export interface BatchManifest {
  timestamp: string;
  inputPattern: string;
  outputDir: string;
  components: BatchComponentResult[];
  mergedPluginInput: string;
  summary: {
    total: number;
    success: number;
    errors: number;
  };
}

async function loadDslModule(dslPath: string): Promise<DslNode> {
  const absolutePath = resolve(dslPath);
  const fileUrl = pathToFileURL(absolutePath).href;
  const mod = await import(fileUrl) as { default?: DslNode };
  if (!mod.default) {
    throw new Error(`DSL module must export a default DslNode: ${dslPath}`);
  }
  return mod.default;
}

export async function processBatch(options: BatchOptions): Promise<BatchResult> {
  const dslDir = join(options.outputDir, 'dsl');
  mkdirSync(dslDir, { recursive: true });

  // Discover DSL files
  const dslFiles = discoverDslFiles(options.input, options.include);

  if (dslFiles.length === 0) {
    throw new Error(`No .dsl.ts files found matching: ${options.input}`);
  }

  const components: BatchComponentResult[] = [];
  const allPluginNodes: PluginNodeDef[] = [];

  for (const dslPath of dslFiles) {
    const name = basename(dslPath, '.dsl.ts');
    console.log(`  [batch] Processing: ${name}`);

    try {
      const dslNode = await loadDslModule(dslPath);
      const compiled = compileWithLayout(dslNode, textMeasurer);

      // Resolve asset directory: explicit option > DSL file's directory
      const assetDir = options.assetDir ?? dirname(resolve(dslPath));

      // Pre-load images
      const imageSources = collectImageSources(compiled.root);
      const imageCache = imageSources.size > 0
        ? await preloadImages(imageSources, assetDir)
        : undefined;

      // Render to PNG
      const pngPath = join(dslDir, `${name}.png`);
      const scale = options.scale ?? 1;
      const renderResult = renderToFile(compiled.root, pngPath, {
        scale,
        imageCache,
      });

      // Per-canvas PNG extraction
      const canvasResults = renderCanvasNodes(compiled.root, { scale, imageCache });
      for (const [canvasName, canvasResult] of canvasResults) {
        const canvasPath = join(dslDir, `${canvasName}.png`);
        writeFileSync(canvasPath, canvasResult.pngBuffer);
        console.log(`  [batch] Canvas: ${canvasName} (${canvasResult.width}×${canvasResult.height})`);
      }

      // Generate plugin input and collect nodes
      const pluginInput = generatePluginInput(compiled, options.pageName, { assetDir });
      allPluginNodes.push(...pluginInput.components);

      components.push({
        name,
        dslPath: resolve(dslPath),
        pngPath,
        status: 'success',
        dimensions: { width: renderResult.width, height: renderResult.height },
      });

      console.log(`  [batch] OK: ${name} (${renderResult.width}×${renderResult.height})`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      components.push({
        name,
        dslPath: resolve(dslPath),
        pngPath: null,
        status: 'error',
        error: message,
      });
      console.error(`  [batch] ERROR: ${name}: ${message}`);
    }
  }

  // Write merged plugin input
  const mergedPluginInputPath = join(options.outputDir, 'plugin-input.json');
  const mergedInput: PluginInput = {
    schemaVersion: '1.0.0',
    targetPage: options.pageName ?? 'Calibration',
    components: allPluginNodes,
  };
  writeFileSync(mergedPluginInputPath, JSON.stringify(mergedInput, null, 2));

  // Write manifest
  const successCount = components.filter(c => c.status === 'success').length;
  const errorCount = components.filter(c => c.status === 'error').length;

  const manifest: BatchManifest = {
    timestamp: new Date().toISOString(),
    inputPattern: options.input,
    outputDir: options.outputDir,
    components,
    mergedPluginInput: relative(options.outputDir, mergedPluginInputPath),
    summary: {
      total: components.length,
      success: successCount,
      errors: errorCount,
    },
  };

  const manifestPath = join(options.outputDir, 'batch-manifest.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  return {
    components,
    mergedPluginInputPath,
    manifestPath,
    successCount,
    errorCount,
  };
}

function discoverDslFiles(input: string, include?: string[]): string[] {
  const files = new Set<string>();

  // Add files from primary input
  for (const f of glob(input)) {
    files.add(resolve(f));
  }

  // Add files from include patterns
  if (include) {
    for (const pattern of include) {
      for (const f of glob(pattern)) {
        files.add(resolve(f));
      }
    }
  }

  return [...files].sort();
}
