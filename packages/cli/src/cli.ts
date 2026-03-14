import { parseArgs } from 'util';
import { resolve, dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import type { CompileResult } from '@figma-dsl/compiler';
import type { DslNode } from '@figma-dsl/core';
import { renderToFile, initializeRenderer } from '@figma-dsl/renderer';
import { compareFiles } from '@figma-dsl/comparator';
import { captureUrl } from '@figma-dsl/capturer';
import { exportToFile } from '@figma-dsl/exporter';
import { generateTestSuite } from './test-suite-generator.js';
import type { PropertyCategory } from './test-suite-generator.js';
import { processBatch } from './batch-processor.js';
import { batchCompare, formatReportMarkdown } from './calibration-reporter.js';
import { captureFigmaImages, loadNodeIdMap } from './figma-capturer.js';
import { runCalibration } from './calibrate-orchestrator.js';

// Find font directory relative to packages
function findFontDir(): string {
  // Try relative from CLI package
  const candidates = [
    join(dirname(new URL(import.meta.url).pathname), '../../dsl-core/fonts'),
    join(process.cwd(), 'packages/dsl-core/fonts'),
    join(process.cwd(), 'node_modules/@figma-dsl/core/fonts'),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return candidates[0]!;
}

function initServices(): void {
  const fontDir = findFontDir();
  textMeasurer.initialize(fontDir);
  initializeRenderer(fontDir);
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

function loadCompiledJson(jsonPath: string): CompileResult {
  const content = readFileSync(resolve(jsonPath), 'utf-8');
  return JSON.parse(content) as CompileResult;
}

async function cmdCompile(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
    },
    allowPositionals: true,
  });

  const dslPath = positionals[0];
  if (!dslPath) {
    console.error('Usage: figma-dsl compile <file.dsl.ts> [-o output.json]');
    return 2;
  }

  try {
    initServices();
    const dslNode = await loadDslModule(dslPath);
    const result = compileWithLayout(dslNode, textMeasurer);

    if (result.errors.length > 0) {
      console.error('Compilation errors:');
      for (const err of result.errors) {
        console.error(`  [${err.nodeType}] ${err.nodePath}: ${err.message}`);
      }
    }

    const json = JSON.stringify(result, null, 2);
    if (values.output) {
      writeFileSync(resolve(values.output), json);
      console.log(`Compiled to: ${values.output}`);
    } else {
      console.log(json);
    }
    return 0;
  } catch (err) {
    console.error(`Compile error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdRender(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      scale: { type: 'string', short: 's' },
      background: { type: 'string', short: 'b' },
    },
    allowPositionals: true,
  });

  const inputPath = positionals[0];
  if (!inputPath || !values.output) {
    console.error('Usage: figma-dsl render <file.dsl.ts|compiled.json> -o output.png [-s scale]');
    return 2;
  }

  try {
    initServices();

    let compiled: CompileResult;
    if (inputPath.endsWith('.json')) {
      compiled = loadCompiledJson(inputPath);
    } else {
      const dslNode = await loadDslModule(inputPath);
      compiled = compileWithLayout(dslNode, textMeasurer);
    }

    const scale = values.scale ? parseFloat(values.scale) : 1;
    const result = renderToFile(compiled.root, resolve(values.output), { scale });
    console.log(`Rendered: ${values.output} (${result.width}×${result.height})`);
    return 0;
  } catch (err) {
    console.error(`Render error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdCapture(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      viewport: { type: 'string', short: 'v' },
      selector: { type: 'string' },
    },
    allowPositionals: true,
  });

  const url = positionals[0];
  if (!url || !values.output) {
    console.error('Usage: figma-dsl capture <url> -o output.png [-v WxH] [--selector css]');
    return 2;
  }

  try {
    const [w, h] = (values.viewport ?? '1280x720').split('x').map(Number);
    const result = await captureUrl(url, resolve(values.output), {
      viewport: { width: w!, height: h! },
      selector: values.selector,
    });
    console.log(`Captured: ${values.output} (${result.width}×${result.height})`);
    return 0;
  } catch (err) {
    console.error(`Capture error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdCompare(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      threshold: { type: 'string', short: 't' },
      diff: { type: 'string', short: 'd' },
    },
    allowPositionals: true,
  });

  const imageA = positionals[0];
  const imageB = positionals[1];
  if (!imageA || !imageB) {
    console.error('Usage: figma-dsl compare <imageA.png> <imageB.png> [-t threshold] [-d diff.png]');
    return 2;
  }

  try {
    const threshold = values.threshold ? parseFloat(values.threshold) : 95;
    const result = compareFiles(
      resolve(imageA),
      resolve(imageB),
      values.diff ? resolve(values.diff) : undefined,
      { failThreshold: threshold },
    );

    console.log(`Similarity: ${result.similarity.toFixed(2)}%`);
    console.log(`Dimensions match: ${result.dimensionMatch}`);
    console.log(`Result: ${result.pass ? 'PASS' : 'FAIL'}`);

    if (values.diff) {
      console.log(`Diff image: ${values.diff}`);
    }

    return result.pass ? 0 : 1;
  } catch (err) {
    console.error(`Compare error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdPipeline(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      url: { type: 'string', short: 'u' },
      viewport: { type: 'string', short: 'v' },
      threshold: { type: 'string', short: 't' },
      diff: { type: 'string', short: 'd' },
    },
    allowPositionals: true,
  });

  const dslPath = positionals[0];
  if (!dslPath || !values.url) {
    console.error('Usage: figma-dsl pipeline <file.dsl.ts> -u <react-url> [-o dir] [-t threshold]');
    return 2;
  }

  const outputDir = values.output ?? '.';

  try {
    // Stage 1: Compile
    console.log('[1/4] Compiling...');
    initServices();
    const dslNode = await loadDslModule(dslPath);
    const compiled = compileWithLayout(dslNode, textMeasurer);
    if (compiled.errors.length > 0) {
      console.error('Compilation errors:');
      for (const err of compiled.errors) {
        console.error(`  [${err.nodeType}] ${err.nodePath}: ${err.message}`);
      }
      return 2;
    }

    // Stage 2: Render
    console.log('[2/4] Rendering DSL...');
    const dslPngPath = resolve(outputDir, 'dsl-render.png');
    renderToFile(compiled.root, dslPngPath);

    // Stage 3: Capture
    console.log('[3/4] Capturing React component...');
    const [w, h] = (values.viewport ?? '1280x720').split('x').map(Number);
    const reactPngPath = resolve(outputDir, 'react-capture.png');
    await captureUrl(values.url, reactPngPath, {
      viewport: { width: w!, height: h! },
    });

    // Stage 4: Compare
    console.log('[4/4] Comparing...');
    const threshold = values.threshold ? parseFloat(values.threshold) : 95;
    const diffPath = values.diff ?? resolve(outputDir, 'diff.png');
    const result = compareFiles(dslPngPath, reactPngPath, diffPath, {
      failThreshold: threshold,
    });

    console.log(`\nSimilarity: ${result.similarity.toFixed(2)}%`);
    console.log(`Result: ${result.pass ? 'PASS' : 'FAIL'}`);

    return result.pass ? 0 : 1;
  } catch (err) {
    console.error(`Pipeline error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdExport(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      page: { type: 'string', short: 'p' },
    },
    allowPositionals: true,
  });

  const dslPath = positionals[0];
  if (!dslPath || !values.output) {
    console.error('Usage: figma-dsl export <file.dsl.ts> -o plugin-input.json [-p "Page Name"]');
    return 2;
  }

  try {
    initServices();
    const dslNode = await loadDslModule(dslPath);
    const compiled = compileWithLayout(dslNode, textMeasurer);
    exportToFile(compiled, resolve(values.output), values.page);
    console.log(`Exported: ${values.output}`);
    return 0;
  } catch (err) {
    console.error(`Export error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdGenerateTestSuite(args: string[]): Promise<number> {
  const { values } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      property: { type: 'string', multiple: true },
    },
    allowPositionals: true,
  });

  if (!values.output) {
    console.error('Usage: figma-dsl generate-test-suite -o <output-dir> [--property <category>...]');
    return 2;
  }

  try {
    const result = generateTestSuite({
      outputDir: resolve(values.output),
      properties: values.property as PropertyCategory[] | undefined,
    });

    console.log(`Generated ${result.filesGenerated} test files across ${result.categories.length} categories`);
    console.log(`Output: ${resolve(values.output)}`);
    return 0;
  } catch (err) {
    console.error(`Generate error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdBatch(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      include: { type: 'string', multiple: true },
      page: { type: 'string', short: 'p' },
      scale: { type: 'string', short: 's' },
    },
    allowPositionals: true,
  });

  const input = positionals[0];
  if (!input || !values.output) {
    console.error('Usage: figma-dsl batch <dir|glob> -o <output-dir> [--include <path>...] [-p page] [-s scale]');
    return 2;
  }

  try {
    initServices();
    const result = await processBatch({
      input,
      outputDir: resolve(values.output),
      include: values.include,
      pageName: values.page,
      scale: values.scale ? parseFloat(values.scale) : undefined,
    });

    console.log(`\nBatch complete: ${result.successCount} success, ${result.errorCount} errors`);
    console.log(`Plugin input: ${result.mergedPluginInputPath}`);
    console.log(`Manifest: ${result.manifestPath}`);
    return result.errorCount > 0 ? 1 : 0;
  } catch (err) {
    console.error(`Batch error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdBatchCompare(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      threshold: { type: 'string', short: 't' },
      'diff-dir': { type: 'string' },
    },
    allowPositionals: true,
  });

  const dslDir = positionals[0];
  const figmaDir = positionals[1];
  if (!dslDir || !figmaDir) {
    console.error('Usage: figma-dsl batch-compare <dsl-dir> <figma-dir> [-o report.json] [-t threshold] [--diff-dir dir]');
    return 2;
  }

  try {
    const outputPath = values.output ? resolve(values.output) : resolve('report.json');
    const report = batchCompare({
      dslDir: resolve(dslDir),
      figmaDir: resolve(figmaDir),
      outputPath,
      diffDir: values['diff-dir'] ? resolve(values['diff-dir']) : undefined,
      threshold: values.threshold ? parseFloat(values.threshold) : undefined,
    });

    const markdown = formatReportMarkdown(report);
    console.log(markdown);
    console.log(`\nReport written to: ${outputPath}`);

    return report.summary.failed > 0 ? 1 : 0;
  } catch (err) {
    console.error(`Batch compare error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdCaptureFigma(args: string[]): Promise<number> {
  const { values } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      'file-key': { type: 'string' },
      token: { type: 'string' },
      'node-id-map': { type: 'string' },
      scale: { type: 'string', short: 's' },
    },
    allowPositionals: true,
  });

  if (!values.output || !values['file-key'] || !values.token || !values['node-id-map']) {
    console.error('Usage: figma-dsl capture-figma -o <dir> --file-key <key> --token <token> --node-id-map <path>');
    return 2;
  }

  try {
    const nodeIdMap = loadNodeIdMap(values['node-id-map']);
    const result = await captureFigmaImages({
      outputDir: resolve(values.output),
      fileKey: values['file-key'],
      token: values.token,
      nodeIdMap,
      scale: values.scale ? parseFloat(values.scale) : undefined,
    });

    console.log(`\nCaptured ${result.capturedImages.length} images`);
    if (result.missingComponents.length > 0) {
      console.log(`Missing: ${result.missingComponents.join(', ')}`);
    }
    return result.missingComponents.length > 0 ? 1 : 0;
  } catch (err) {
    console.error(`Capture error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

async function cmdCalibrate(args: string[]): Promise<number> {
  const { values } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      property: { type: 'string', multiple: true },
      include: { type: 'string', multiple: true },
      'skip-generate': { type: 'boolean' },
      'capture-mode': { type: 'string' },
      'file-key': { type: 'string' },
      token: { type: 'string' },
      'node-id-map': { type: 'string' },
      threshold: { type: 'string', short: 't' },
    },
    allowPositionals: true,
  });

  const outputDir = values.output ?? 'calibration';

  try {
    initServices();
    const result = await runCalibration({
      outputDir: resolve(outputDir),
      properties: values.property as PropertyCategory[] | undefined,
      include: values.include,
      skipGenerate: values['skip-generate'],
      captureMode: values['capture-mode'] === 'api' ? 'api' : undefined,
      fileKey: values['file-key'],
      token: values.token,
      nodeIdMapPath: values['node-id-map'],
      threshold: values.threshold ? parseFloat(values.threshold) : undefined,
    });

    console.log(`\n[calibrate] Run complete: ${result.runDir}`);
    if (result.report) {
      return result.report.summary.failed > 0 ? 1 : 0;
    }
    return 0;
  } catch (err) {
    console.error(`Calibrate error: ${err instanceof Error ? err.message : String(err)}`);
    return 2;
  }
}

export async function run(args: string[]): Promise<number> {
  const command = args[0];
  const subArgs = args.slice(1);

  switch (command) {
    case 'compile':
      return cmdCompile(subArgs);
    case 'render':
      return cmdRender(subArgs);
    case 'capture':
      return cmdCapture(subArgs);
    case 'compare':
      return cmdCompare(subArgs);
    case 'pipeline':
      return cmdPipeline(subArgs);
    case 'export':
      return cmdExport(subArgs);
    case 'generate-test-suite':
      return cmdGenerateTestSuite(subArgs);
    case 'batch':
      return cmdBatch(subArgs);
    case 'batch-compare':
      return cmdBatchCompare(subArgs);
    case 'capture-figma':
      return cmdCaptureFigma(subArgs);
    case 'calibrate':
      return cmdCalibrate(subArgs);
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      printHelp();
      return 0;
    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      return 2;
  }
}

function printHelp(): void {
  console.log(`figma-dsl — Figma Component DSL CLI

Commands:
  compile  <file.dsl.ts> [-o output.json]      Compile DSL to Figma node dict
  render   <file|json> -o output.png [-s N]    Render to PNG image
  capture  <url> -o output.png [-v WxH]        Capture React component screenshot
  compare  <a.png> <b.png> [-t N] [-d diff]    Compare two images
  pipeline <file.dsl.ts> -u <url> [opts]       Full pipeline (compile→render→capture→compare)
  export   <file.dsl.ts> -o output.json        Generate Figma plugin input

Calibration:
  generate-test-suite -o <dir> [--property ..]  Generate test .dsl.ts files
  calibrate      [-o dir] [--property cat]     Full calibration pipeline
  batch          <dir> -o <dir> [--include ..]  Batch compile/render/export
  batch-compare  <dsl-dir> <figma-dir> [-o ..]  Compare DSL vs Figma PNGs
  capture-figma  -o <dir> --file-key --token    Capture from Figma REST API

Exit codes:
  0  Success
  1  Pipeline/comparison failure
  2  Runtime error`);
}
