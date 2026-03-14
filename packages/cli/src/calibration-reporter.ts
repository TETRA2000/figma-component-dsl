import { readdirSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, basename, resolve } from 'path';
import { compareFiles } from '@figma-dsl/comparator';
import { PNG } from 'pngjs';

export interface BatchCompareOptions {
  dslDir: string;
  figmaDir: string;
  outputPath: string;
  diffDir?: string;
  threshold?: number;
}

export interface ComponentCompareResult {
  componentName: string;
  propertyCategory: string;
  dslImagePath: string;
  figmaImagePath: string;
  diffImagePath: string | null;
  similarity: number;
  pass: boolean;
  dimensionMatch: boolean;
  dslDimensions: { width: number; height: number };
  figmaDimensions: { width: number; height: number };
}

export interface BatchCompareReport {
  timestamp: string;
  threshold: number;
  results: ComponentCompareResult[];
  unpaired: {
    dslOnly: string[];
    figmaOnly: string[];
  };
  summary: {
    total: number;
    passed: number;
    failed: number;
    passRate: number;
    worstDiscrepancies: ComponentCompareResult[];
  };
  categoryBreakdown: Record<string, {
    total: number;
    passed: number;
    failed: number;
    avgSimilarity: number;
  }>;
}

function extractPropertyCategory(name: string): string {
  // Pattern: {category}-{variant} — extract everything before the last dash-separated variant
  // e.g., "auto-layout-horizontal-basic" → "auto-layout-horizontal"
  // e.g., "corner-radius-zero" → "corner-radius"
  // e.g., "fills-solid-single" → "fills-solid"
  const knownCategories = [
    'auto-layout-horizontal',
    'auto-layout-vertical',
    'auto-layout-nested',
    'corner-radius',
    'fills-solid',
    'fills-gradient',
    'clip-content',
    'combined',
    'strokes',
    'typography',
    'opacity',
  ];

  for (const cat of knownCategories) {
    if (name.startsWith(cat)) return cat;
  }

  // Fallback: use entire name
  return 'unknown';
}

function getPngDimensions(filePath: string): { width: number; height: number } {
  const buffer = readFileSync(filePath);
  const png = PNG.sync.read(buffer);
  return { width: png.width, height: png.height };
}

function findPngFiles(dir: string): Map<string, string> {
  const files = new Map<string, string>();
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.png')) {
        const name = basename(entry.name, '.png');
        files.set(name, join(dir, entry.name));
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }
  return files;
}

export function batchCompare(options: BatchCompareOptions): BatchCompareReport {
  const threshold = options.threshold ?? 95;
  const dslFiles = findPngFiles(options.dslDir);
  const figmaFiles = findPngFiles(options.figmaDir);

  if (options.diffDir) {
    mkdirSync(options.diffDir, { recursive: true });
  }

  // Find paired and unpaired
  const allNames = new Set([...dslFiles.keys(), ...figmaFiles.keys()]);
  const dslOnly: string[] = [];
  const figmaOnly: string[] = [];
  const results: ComponentCompareResult[] = [];

  for (const name of allNames) {
    const dslPath = dslFiles.get(name);
    const figmaPath = figmaFiles.get(name);

    if (dslPath && !figmaPath) {
      dslOnly.push(name);
      continue;
    }
    if (!dslPath && figmaPath) {
      figmaOnly.push(name);
      continue;
    }
    if (!dslPath || !figmaPath) continue;

    const diffPath = options.diffDir ? join(options.diffDir, `${name}-diff.png`) : undefined;

    const compareResult = compareFiles(dslPath, figmaPath, diffPath, {
      failThreshold: threshold,
    });

    const dslDimensions = getPngDimensions(dslPath);
    const figmaDimensions = getPngDimensions(figmaPath);

    results.push({
      componentName: name,
      propertyCategory: extractPropertyCategory(name),
      dslImagePath: dslPath,
      figmaImagePath: figmaPath,
      diffImagePath: diffPath ?? null,
      similarity: compareResult.similarity,
      pass: compareResult.pass,
      dimensionMatch: compareResult.dimensionMatch,
      dslDimensions,
      figmaDimensions,
    });
  }

  // Summary
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  const total = results.length;
  const passRate = total > 0 ? (passed / total) * 100 : 100;

  const worstDiscrepancies = [...results]
    .filter(r => !r.pass)
    .sort((a, b) => a.similarity - b.similarity)
    .slice(0, 5);

  // Category breakdown
  const categoryBreakdown: BatchCompareReport['categoryBreakdown'] = {};
  for (const result of results) {
    const cat = result.propertyCategory;
    if (!categoryBreakdown[cat]) {
      categoryBreakdown[cat] = { total: 0, passed: 0, failed: 0, avgSimilarity: 0 };
    }
    const entry = categoryBreakdown[cat];
    entry.total++;
    if (result.pass) entry.passed++;
    else entry.failed++;
    entry.avgSimilarity += result.similarity;
  }
  for (const entry of Object.values(categoryBreakdown)) {
    if (entry.total > 0) {
      entry.avgSimilarity = entry.avgSimilarity / entry.total;
    }
  }

  const report: BatchCompareReport = {
    timestamp: new Date().toISOString(),
    threshold,
    results,
    unpaired: { dslOnly, figmaOnly },
    summary: { total, passed, failed, passRate, worstDiscrepancies },
    categoryBreakdown,
  };

  // Write JSON report
  mkdirSync(resolve(options.outputPath, '..'), { recursive: true });
  writeFileSync(options.outputPath, JSON.stringify(report, null, 2));

  return report;
}

export function formatReportMarkdown(report: BatchCompareReport): string {
  const lines: string[] = [];

  lines.push('# Calibration Report');
  lines.push('');
  lines.push(`**Date**: ${report.timestamp}`);
  lines.push(`**Threshold**: ${report.threshold}%`);
  lines.push(`**Pass Rate**: ${report.summary.passRate.toFixed(1)}% (${report.summary.passed}/${report.summary.total})`);
  lines.push('');

  // Category breakdown
  lines.push('## Results by Category');
  lines.push('');
  lines.push('| Category | Total | Passed | Failed | Avg Similarity |');
  lines.push('|----------|-------|--------|--------|----------------|');

  for (const [cat, stats] of Object.entries(report.categoryBreakdown)) {
    lines.push(`| ${cat} | ${stats.total} | ${stats.passed} | ${stats.failed} | ${stats.avgSimilarity.toFixed(1)}% |`);
  }
  lines.push('');

  // Worst discrepancies
  if (report.summary.worstDiscrepancies.length > 0) {
    lines.push('## Worst Discrepancies');
    lines.push('');
    for (const result of report.summary.worstDiscrepancies) {
      lines.push(`### ${result.componentName}`);
      lines.push(`- **Category**: ${result.propertyCategory}`);
      lines.push(`- **Similarity**: ${result.similarity.toFixed(2)}%`);
      lines.push(`- **Dimensions match**: ${result.dimensionMatch}`);
      lines.push(`- **DSL dimensions**: ${result.dslDimensions.width}×${result.dslDimensions.height}`);
      lines.push(`- **Figma dimensions**: ${result.figmaDimensions.width}×${result.figmaDimensions.height}`);
      lines.push(`- **DSL source**: ${result.dslImagePath}`);
      if (result.diffImagePath) {
        lines.push(`- **Diff image**: ${result.diffImagePath}`);
      }
      lines.push('');
    }
  }

  // Unpaired
  if (report.unpaired.dslOnly.length > 0 || report.unpaired.figmaOnly.length > 0) {
    lines.push('## Unpaired Components');
    lines.push('');
    if (report.unpaired.dslOnly.length > 0) {
      lines.push('**DSL only** (no Figma match):');
      for (const name of report.unpaired.dslOnly) {
        lines.push(`- ${name}`);
      }
      lines.push('');
    }
    if (report.unpaired.figmaOnly.length > 0) {
      lines.push('**Figma only** (no DSL match):');
      for (const name of report.unpaired.figmaOnly) {
        lines.push(`- ${name}`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}
