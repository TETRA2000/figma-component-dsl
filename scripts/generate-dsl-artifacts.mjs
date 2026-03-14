#!/usr/bin/env node

/**
 * Generate DSL artifacts (source text, compiled JSON, rendered PNG) for Storybook consumption.
 * Run before Storybook starts via the `prestorybook` npm script.
 */

import { resolve, join, basename, dirname } from 'path';
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';
import { compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import { renderToFile, initializeRenderer } from '@figma-dsl/renderer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const EXAMPLES_DIR = resolve(ROOT, 'examples');
const OUTPUT_DIR = resolve(ROOT, 'preview/.storybook/dsl-artifacts');

function findFontDir() {
  const candidates = [
    join(ROOT, 'packages/dsl-core/fonts'),
    join(ROOT, 'node_modules/@figma-dsl/core/fonts'),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return candidates[0];
}

function toKebabCase(name) {
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

async function loadDslModule(dslPath) {
  const absolutePath = resolve(dslPath);
  const fileUrl = pathToFileURL(absolutePath).href;
  const mod = await import(fileUrl);
  if (!mod.default) {
    throw new Error(`DSL module must export a default DslNode: ${dslPath}`);
  }
  return mod.default;
}

async function main() {
  console.log('[dsl-artifacts] Starting artifact generation...');

  // Initialize services
  const fontDir = findFontDir();
  textMeasurer.initialize(fontDir);
  initializeRenderer(fontDir);

  // Discover DSL files
  const dslFiles = readdirSync(EXAMPLES_DIR)
    .filter((f) => f.endsWith('.dsl.ts'))
    .sort();

  if (dslFiles.length === 0) {
    console.log('[dsl-artifacts] No .dsl.ts files found in examples/');
    writeManifest({});
    return;
  }

  console.log(`[dsl-artifacts] Found ${dslFiles.length} DSL files`);

  const artifacts = {};
  let successCount = 0;
  let errorCount = 0;

  for (const filename of dslFiles) {
    const componentName = basename(filename, '.dsl.ts');
    const dslPath = join(EXAMPLES_DIR, filename);
    const componentDir = join(OUTPUT_DIR, componentName);
    mkdirSync(componentDir, { recursive: true });

    try {
      // Read source text
      const source = readFileSync(dslPath, 'utf-8');
      writeFileSync(join(componentDir, 'source.ts'), source);

      // Compile
      const dslNode = await loadDslModule(dslPath);
      const compiled = compileWithLayout(dslNode, textMeasurer);
      const compiledJson = JSON.stringify(compiled.root, null, 2);
      writeFileSync(join(componentDir, 'compiled.json'), compiledJson);

      // Render to PNG
      const pngPath = join(componentDir, 'rendered.png');
      renderToFile(compiled.root, pngPath);

      artifacts[componentName] = {
        componentName,
        dslFilePath: filename,
        source,
        compiledJson,
        sourcePath: `${componentName}/source.ts`,
        jsonPath: `${componentName}/compiled.json`,
        pngPath: `${componentName}/rendered.png`,
        error: null,
      };

      successCount++;
      console.log(`  [ok] ${componentName}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      artifacts[componentName] = {
        componentName,
        dslFilePath: filename,
        source: null,
        compiledJson: null,
        sourcePath: null,
        jsonPath: null,
        pngPath: null,
        error: message,
      };
      errorCount++;
      console.error(`  [error] ${componentName}: ${message}`);
    }
  }

  writeManifest(artifacts);

  console.log(
    `[dsl-artifacts] Done: ${successCount} succeeded, ${errorCount} failed, ${dslFiles.length} total`,
  );
}

function writeManifest(artifacts) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const manifest = {
    generatedAt: new Date().toISOString(),
    artifacts,
  };
  writeFileSync(join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

main().catch((err) => {
  console.error('[dsl-artifacts] Fatal error:', err);
  process.exit(1);
});
