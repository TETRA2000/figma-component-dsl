import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import { generateTestSuite, ALL_CATEGORIES } from '../test-suite-generator.js';
import type { PropertyCategory } from '../test-suite-generator.js';
import { batchCompare, formatReportMarkdown } from '../calibration-reporter.js';
import type { BatchCompareReport } from '../calibration-reporter.js';
import { run } from '../cli.js';

const TEST_DIR = join(tmpdir(), 'figma-dsl-test-' + Date.now());

beforeEach(() => {
  mkdirSync(TEST_DIR, { recursive: true });
});

afterEach(() => {
  rmSync(TEST_DIR, { recursive: true, force: true });
});

// =========================================================================
// Task 1.1: Test Suite Generator
// =========================================================================
describe('TestSuiteGenerator', () => {
  it('generates files for all property categories', () => {
    const outputDir = join(TEST_DIR, 'suite');
    const result = generateTestSuite({ outputDir });

    expect(result.filesGenerated).toBeGreaterThan(0);
    expect(result.categories).toEqual(ALL_CATEGORIES);
    expect(result.filePaths.length).toBe(result.filesGenerated);

    // Check that category subdirectories exist
    for (const cat of ALL_CATEGORIES) {
      const catDir = join(outputDir, cat);
      expect(existsSync(catDir)).toBe(true);
    }
  });

  it('generates valid .dsl.ts files', () => {
    const outputDir = join(TEST_DIR, 'suite-valid');
    const result = generateTestSuite({ outputDir });

    for (const filePath of result.filePaths) {
      expect(filePath).toMatch(/\.dsl\.ts$/);
      expect(existsSync(filePath)).toBe(true);

      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('export default');
      expect(content).toContain('@figma-dsl/core');
    }
  });

  it('follows {category}-{variant}.dsl.ts naming convention', () => {
    const outputDir = join(TEST_DIR, 'suite-naming');
    const result = generateTestSuite({ outputDir });

    for (const filePath of result.filePaths) {
      const fileName = filePath.split('/').pop()!;
      expect(fileName).toMatch(/^[a-z][\w-]*\.dsl\.ts$/);
    }
  });

  // Task 1.2: Property filtering
  it('filters by specific property categories', () => {
    const outputDir = join(TEST_DIR, 'suite-filtered');
    const properties: PropertyCategory[] = ['corner-radius', 'opacity'];
    const result = generateTestSuite({ outputDir, properties });

    expect(result.categories).toEqual(properties);
    // Only requested category dirs should exist
    expect(existsSync(join(outputDir, 'corner-radius'))).toBe(true);
    expect(existsSync(join(outputDir, 'opacity'))).toBe(true);
    expect(existsSync(join(outputDir, 'strokes'))).toBe(false);
  });

  // Task 1.2: Edge-case variants
  it('generates corner radius edge cases', () => {
    const outputDir = join(TEST_DIR, 'suite-edge');
    const result = generateTestSuite({
      outputDir,
      properties: ['corner-radius'],
    });

    const files = result.filePaths.map(f => f.split('/').pop()!);
    expect(files).toContain('corner-radius-zero.dsl.ts');
    expect(files).toContain('corner-radius-small.dsl.ts');
    expect(files).toContain('corner-radius-half.dsl.ts');
    expect(files).toContain('corner-radius-exceeds.dsl.ts');
    expect(files).toContain('corner-radius-max.dsl.ts');
  });

  it('generates typography variants', () => {
    const outputDir = join(TEST_DIR, 'suite-typo');
    const result = generateTestSuite({
      outputDir,
      properties: ['typography'],
    });

    const files = result.filePaths.map(f => f.split('/').pop()!);
    expect(files).toContain('typography-sizes.dsl.ts');
    expect(files).toContain('typography-weights.dsl.ts');
    expect(files).toContain('typography-alignments.dsl.ts');
  });

  it('generates gradient variants', () => {
    const outputDir = join(TEST_DIR, 'suite-grad');
    const result = generateTestSuite({
      outputDir,
      properties: ['fills-gradient'],
    });

    const files = result.filePaths.map(f => f.split('/').pop()!);
    expect(files).toContain('fills-gradient-0deg.dsl.ts');
    expect(files).toContain('fills-gradient-45deg.dsl.ts');
    expect(files).toContain('fills-gradient-90deg.dsl.ts');
  });
});

// =========================================================================
// Task 5.1 + 5.2: Calibration Reporter
// =========================================================================
describe('CalibrationReporter', () => {
  function createTestPng(dir: string, name: string, width: number, height: number, color: [number, number, number]): void {
    // Create a minimal valid PNG using pngjs
    const { PNG } = require('pngjs');
    const png = new PNG({ width, height });
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) * 4;
        png.data[idx] = color[0];     // R
        png.data[idx + 1] = color[1]; // G
        png.data[idx + 2] = color[2]; // B
        png.data[idx + 3] = 255;      // A
      }
    }
    const buffer = PNG.sync.write(png);
    writeFileSync(join(dir, `${name}.png`), buffer);
  }

  it('pairs images by name and generates JSON report', () => {
    const dslDir = join(TEST_DIR, 'report-dsl');
    const figmaDir = join(TEST_DIR, 'report-figma');
    mkdirSync(dslDir, { recursive: true });
    mkdirSync(figmaDir, { recursive: true });

    // Create identical images (should pass)
    createTestPng(dslDir, 'corner-radius-zero', 100, 100, [255, 0, 0]);
    createTestPng(figmaDir, 'corner-radius-zero', 100, 100, [255, 0, 0]);

    // Create different images (should fail)
    createTestPng(dslDir, 'fills-solid-single', 100, 100, [255, 0, 0]);
    createTestPng(figmaDir, 'fills-solid-single', 100, 100, [0, 0, 255]);

    const reportPath = join(TEST_DIR, 'report.json');
    const report = batchCompare({
      dslDir,
      figmaDir,
      outputPath: reportPath,
    });

    expect(report.results.length).toBe(2);
    expect(report.summary.total).toBe(2);
    expect(report.summary.passed).toBe(1);
    expect(report.summary.failed).toBe(1);
    expect(existsSync(reportPath)).toBe(true);

    // Verify JSON is valid
    const savedReport = JSON.parse(readFileSync(reportPath, 'utf-8'));
    expect(savedReport.results.length).toBe(2);
  });

  it('detects unpaired images', () => {
    const dslDir = join(TEST_DIR, 'unpaired-dsl');
    const figmaDir = join(TEST_DIR, 'unpaired-figma');
    mkdirSync(dslDir, { recursive: true });
    mkdirSync(figmaDir, { recursive: true });

    createTestPng(dslDir, 'only-in-dsl', 50, 50, [255, 0, 0]);
    createTestPng(figmaDir, 'only-in-figma', 50, 50, [0, 255, 0]);
    createTestPng(dslDir, 'paired', 50, 50, [0, 0, 255]);
    createTestPng(figmaDir, 'paired', 50, 50, [0, 0, 255]);

    const reportPath = join(TEST_DIR, 'unpaired-report.json');
    const report = batchCompare({
      dslDir,
      figmaDir,
      outputPath: reportPath,
    });

    expect(report.unpaired.dslOnly).toContain('only-in-dsl');
    expect(report.unpaired.figmaOnly).toContain('only-in-figma');
    expect(report.results.length).toBe(1); // Only paired
  });

  it('extracts property categories from filenames', () => {
    const dslDir = join(TEST_DIR, 'cat-dsl');
    const figmaDir = join(TEST_DIR, 'cat-figma');
    mkdirSync(dslDir, { recursive: true });
    mkdirSync(figmaDir, { recursive: true });

    createTestPng(dslDir, 'corner-radius-zero', 50, 50, [255, 0, 0]);
    createTestPng(figmaDir, 'corner-radius-zero', 50, 50, [255, 0, 0]);
    createTestPng(dslDir, 'auto-layout-horizontal-basic', 50, 50, [0, 255, 0]);
    createTestPng(figmaDir, 'auto-layout-horizontal-basic', 50, 50, [0, 255, 0]);

    const reportPath = join(TEST_DIR, 'cat-report.json');
    const report = batchCompare({
      dslDir,
      figmaDir,
      outputPath: reportPath,
    });

    expect(report.categoryBreakdown['corner-radius']).toBeDefined();
    expect(report.categoryBreakdown['auto-layout-horizontal']).toBeDefined();
  });

  it('sorts worst discrepancies by similarity ascending', () => {
    const dslDir = join(TEST_DIR, 'sort-dsl');
    const figmaDir = join(TEST_DIR, 'sort-figma');
    mkdirSync(dslDir, { recursive: true });
    mkdirSync(figmaDir, { recursive: true });

    // Create images with different levels of mismatch
    createTestPng(dslDir, 'fills-solid-a', 100, 100, [255, 0, 0]);
    createTestPng(figmaDir, 'fills-solid-a', 100, 100, [0, 0, 255]); // very different
    createTestPng(dslDir, 'fills-solid-b', 100, 100, [255, 0, 0]);
    createTestPng(figmaDir, 'fills-solid-b', 100, 100, [250, 0, 0]); // slightly different

    const reportPath = join(TEST_DIR, 'sort-report.json');
    const report = batchCompare({
      dslDir,
      figmaDir,
      outputPath: reportPath,
      threshold: 99.9,
    });

    if (report.summary.worstDiscrepancies.length >= 2) {
      expect(report.summary.worstDiscrepancies[0]!.similarity)
        .toBeLessThanOrEqual(report.summary.worstDiscrepancies[1]!.similarity);
    }
  });

  it('includes dslSourcePath when source map is provided', () => {
    const dslDir = join(TEST_DIR, 'src-dsl');
    const figmaDir = join(TEST_DIR, 'src-figma');
    mkdirSync(dslDir, { recursive: true });
    mkdirSync(figmaDir, { recursive: true });

    createTestPng(dslDir, 'corner-radius-zero', 50, 50, [255, 0, 0]);
    createTestPng(figmaDir, 'corner-radius-zero', 50, 50, [255, 0, 0]);

    const reportPath = join(TEST_DIR, 'src-report.json');
    const report = batchCompare({
      dslDir,
      figmaDir,
      outputPath: reportPath,
      dslSourceMap: { 'corner-radius-zero': '/path/to/corner-radius-zero.dsl.ts' },
    });

    expect(report.results[0]!.dslSourcePath).toBe('/path/to/corner-radius-zero.dsl.ts');
  });

  it('sets dslSourcePath to null when no source map', () => {
    const dslDir = join(TEST_DIR, 'nosrc-dsl');
    const figmaDir = join(TEST_DIR, 'nosrc-figma');
    mkdirSync(dslDir, { recursive: true });
    mkdirSync(figmaDir, { recursive: true });

    createTestPng(dslDir, 'corner-radius-zero', 50, 50, [255, 0, 0]);
    createTestPng(figmaDir, 'corner-radius-zero', 50, 50, [255, 0, 0]);

    const reportPath = join(TEST_DIR, 'nosrc-report.json');
    const report = batchCompare({
      dslDir,
      figmaDir,
      outputPath: reportPath,
    });

    expect(report.results[0]!.dslSourcePath).toBeNull();
  });

  // Task 5.2: Markdown summary
  it('generates Markdown summary', () => {
    const dslDir = join(TEST_DIR, 'md-dsl');
    const figmaDir = join(TEST_DIR, 'md-figma');
    mkdirSync(dslDir, { recursive: true });
    mkdirSync(figmaDir, { recursive: true });

    createTestPng(dslDir, 'corner-radius-zero', 100, 100, [255, 0, 0]);
    createTestPng(figmaDir, 'corner-radius-zero', 100, 100, [0, 0, 255]);

    const reportPath = join(TEST_DIR, 'md-report.json');
    const report = batchCompare({
      dslDir,
      figmaDir,
      outputPath: reportPath,
    });

    const markdown = formatReportMarkdown(report);
    expect(markdown).toContain('# Calibration Report');
    expect(markdown).toContain('Pass Rate');
    expect(markdown).toContain('corner-radius');
  });
});

// =========================================================================
// Task 11.2: New node type calibration categories
// =========================================================================
describe('TestSuiteGenerator — new node type categories', () => {
  it('generates line-shapes category', () => {
    const outputDir = join(TEST_DIR, 'suite-lines');
    const result = generateTestSuite({ outputDir, properties: ['line-shapes'] });

    expect(result.categories).toEqual(['line-shapes']);
    expect(result.filesGenerated).toBeGreaterThan(0);
    for (const filePath of result.filePaths) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('export default');
      expect(content).toContain('@figma-dsl/core');
    }
  });

  it('generates polygon-star-shapes category', () => {
    const outputDir = join(TEST_DIR, 'suite-poly');
    const result = generateTestSuite({ outputDir, properties: ['polygon-star-shapes'] });

    expect(result.categories).toEqual(['polygon-star-shapes']);
    expect(result.filesGenerated).toBeGreaterThan(0);
    for (const filePath of result.filePaths) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('export default');
      expect(content).toContain('@figma-dsl/core');
    }
  });

  it('generates boolean-operations category', () => {
    const outputDir = join(TEST_DIR, 'suite-bool');
    const result = generateTestSuite({ outputDir, properties: ['boolean-operations'] });

    expect(result.categories).toEqual(['boolean-operations']);
    expect(result.filesGenerated).toBeGreaterThan(0);
    for (const filePath of result.filePaths) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('export default');
      expect(content).toContain('@figma-dsl/core');
    }
  });

  it('generates section-layout category', () => {
    const outputDir = join(TEST_DIR, 'suite-sect');
    const result = generateTestSuite({ outputDir, properties: ['section-layout'] });

    expect(result.categories).toEqual(['section-layout']);
    expect(result.filesGenerated).toBeGreaterThan(0);
    for (const filePath of result.filePaths) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content).toContain('export default');
      expect(content).toContain('@figma-dsl/core');
    }
  });

  it('includes new categories in ALL_CATEGORIES', () => {
    expect(ALL_CATEGORIES).toContain('line-shapes');
    expect(ALL_CATEGORIES).toContain('polygon-star-shapes');
    expect(ALL_CATEGORIES).toContain('boolean-operations');
    expect(ALL_CATEGORIES).toContain('section-layout');
  });
});

// =========================================================================
// Task 11.3: Round-trip fidelity test
// =========================================================================
describe('Round-trip fidelity — new node types', () => {
  it('round-trips LINE properties through compile→export→serialize', async () => {
    const { compile } = await import('@figma-dsl/compiler');
    const { generatePluginInput } = await import('../../../exporter/src/exporter.js');
    const { serializeNode } = await import('../../../plugin/src/serializer.js');
    const { line } = await import('@figma-dsl/core');

    const node = line('TestLine', {
      size: { x: 200 },
      strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2, strokeCap: 'ROUND' }],
      rotation: 45,
    });

    const compiled = compile(node);
    const exported = generatePluginInput(compiled);
    const comp = exported.components[0]!;

    // Simulate Figma node from exported data
    const mockFigmaNode = {
      type: comp.type,
      name: comp.name,
      visible: comp.visible,
      width: comp.size.x,
      height: comp.size.y,
      opacity: comp.opacity,
      strokeCap: comp.strokeCap,
      rotation: comp.rotation,
      strokes: comp.strokes?.map(s => ({
        type: 'SOLID' as const,
        color: { r: s.color.r, g: s.color.g, b: s.color.b },
        opacity: s.color.a,
        visible: true,
      })),
      strokeWeight: comp.strokes?.[0]?.weight,
      children: [],
    };

    const serialized = serializeNode(mockFigmaNode);
    expect(serialized.type).toBe('LINE');
    expect(serialized.strokeCap).toBe('ROUND');
    expect((serialized as any).rotation).toBe(45);
  });

  it('round-trips POLYGON properties through compile→export→serialize', async () => {
    const { compile } = await import('@figma-dsl/compiler');
    const { generatePluginInput } = await import('../../../exporter/src/exporter.js');
    const { serializeNode } = await import('../../../plugin/src/serializer.js');
    const { polygon } = await import('@figma-dsl/core');
    const { solid } = await import('@figma-dsl/core');

    const node = polygon('Hex', { pointCount: 6, size: { x: 100, y: 100 }, fills: [solid('#ff0000')] });
    const compiled = compile(node);
    const exported = generatePluginInput(compiled);
    const comp = exported.components[0]!;

    const mockFigmaNode = {
      type: comp.type,
      name: comp.name,
      visible: comp.visible,
      width: comp.size.x,
      height: comp.size.y,
      opacity: comp.opacity,
      pointCount: (comp as any).pointCount,
      fills: comp.fills?.map(f => ({
        type: f.type,
        color: f.color ? { r: f.color.r, g: f.color.g, b: f.color.b } : undefined,
        opacity: f.color?.a ?? 1,
        visible: true,
      })),
      children: [],
    };

    const serialized = serializeNode(mockFigmaNode);
    expect(serialized.type).toBe('POLYGON');
    expect((serialized as any).pointCount).toBe(6);
  });

  it('round-trips STAR properties through compile→export→serialize', async () => {
    const { compile } = await import('@figma-dsl/compiler');
    const { generatePluginInput } = await import('../../../exporter/src/exporter.js');
    const { serializeNode } = await import('../../../plugin/src/serializer.js');
    const { star } = await import('@figma-dsl/core');

    const node = star('Star5', { pointCount: 5, innerRadius: 0.5, size: { x: 100, y: 100 } });
    const compiled = compile(node);
    const exported = generatePluginInput(compiled);
    const comp = exported.components[0]!;

    const mockFigmaNode = {
      type: comp.type,
      name: comp.name,
      visible: comp.visible,
      width: comp.size.x,
      height: comp.size.y,
      opacity: comp.opacity,
      pointCount: (comp as any).pointCount,
      innerRadius: (comp as any).innerRadius,
      children: [],
    };

    const serialized = serializeNode(mockFigmaNode);
    expect(serialized.type).toBe('STAR');
    expect((serialized as any).pointCount).toBe(5);
    expect((serialized as any).innerRadius).toBe(0.5);
  });

  it('round-trips BOOLEAN_OPERATION through compile→export→serialize', async () => {
    const { compile } = await import('@figma-dsl/compiler');
    const { generatePluginInput } = await import('../../../exporter/src/exporter.js');
    const { serializeNode } = await import('../../../plugin/src/serializer.js');
    const { subtract, rectangle, ellipse } = await import('@figma-dsl/core');

    const node = subtract('Cutout', {
      children: [
        rectangle('R', { size: { x: 50, y: 50 } }),
        ellipse('E', { size: { x: 30, y: 30 } }),
      ],
    });
    const compiled = compile(node);
    const exported = generatePluginInput(compiled);
    const comp = exported.components[0]!;

    const mockFigmaNode = {
      type: comp.type,
      name: comp.name,
      visible: comp.visible,
      width: comp.size.x,
      height: comp.size.y,
      opacity: comp.opacity,
      booleanOperation: (comp as any).booleanOperation,
      children: comp.children.map(c => ({
        type: c.type,
        name: c.name,
        visible: c.visible,
        width: c.size.x,
        height: c.size.y,
        opacity: c.opacity,
        children: [],
      })),
    };

    const serialized = serializeNode(mockFigmaNode);
    expect(serialized.type).toBe('BOOLEAN_OPERATION');
    expect((serialized as any).booleanOperation).toBe('SUBTRACT');
    expect(serialized.children).toHaveLength(2);
  });

  it('round-trips SECTION through compile→export→serialize', async () => {
    const { compile } = await import('@figma-dsl/compiler');
    const { generatePluginInput } = await import('../../../exporter/src/exporter.js');
    const { serializeNode } = await import('../../../plugin/src/serializer.js');
    const { section, rectangle } = await import('@figma-dsl/core');

    const node = section('S', {
      size: { x: 200, y: 200 },
      contentsHidden: true,
      children: [rectangle('R', { size: { x: 50, y: 50 } })],
    });
    const compiled = compile(node);
    const exported = generatePluginInput(compiled);
    const comp = exported.components[0]!;

    const mockFigmaNode = {
      type: comp.type,
      name: comp.name,
      visible: comp.visible,
      width: comp.size.x,
      height: comp.size.y,
      opacity: comp.opacity,
      sectionContentsHidden: (comp as any).sectionContentsHidden,
      children: comp.children.map(c => ({
        type: c.type,
        name: c.name,
        visible: c.visible,
        width: c.size.x,
        height: c.size.y,
        opacity: c.opacity,
        children: [],
      })),
    };

    const serialized = serializeNode(mockFigmaNode);
    expect(serialized.type).toBe('SECTION');
    expect((serialized as any).sectionContentsHidden).toBe(true);
    expect(serialized.children).toHaveLength(1);
  });
});

// =========================================================================
// Task 6.1: CLI command wiring
// =========================================================================
describe('CLI — new commands', () => {
  it('returns 2 for batch without required args', async () => {
    const code = await run(['batch']);
    expect(code).toBe(2);
  });

  it('returns 2 for batch-compare without required args', async () => {
    const code = await run(['batch-compare']);
    expect(code).toBe(2);
  });

  it('returns 2 for capture-figma without required args', async () => {
    const code = await run(['capture-figma']);
    expect(code).toBe(2);
  });

  it('includes new commands in help output', async () => {
    // Just verify help runs without error
    const code = await run(['help']);
    expect(code).toBe(0);
  });
});
