/**
 * Markdown report generator for batch comparison results.
 *
 * Produces a human-readable report summarizing the React-to-DSL
 * conversion accuracy across all test pages.
 */

import type { ComparisonResult, ComparisonReport } from './types.js';

/**
 * Aggregate an array of ComparisonResult into a ComparisonReport.
 */
export function generateReport(results: ComparisonResult[]): ComparisonReport {
  const totalTests = results.length;
  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  const errors = results.filter((r) => r.status === 'ERROR').length;

  // Average similarity across non-error results
  const successfulResults = results.filter((r) => r.status !== 'ERROR');
  const averageSimilarity =
    successfulResults.length > 0
      ? successfulResults.reduce((sum, r) => sum + r.reactVsScript, 0) / successfulResults.length
      : 0;

  // Worst cases: bottom 10 by similarity (excluding errors, then including errors at the end)
  const sorted = [...results].sort((a, b) => {
    // Errors go last in sorting (they have 0 similarity but are categorically different)
    if (a.status === 'ERROR' && b.status !== 'ERROR') return 1;
    if (b.status === 'ERROR' && a.status !== 'ERROR') return -1;
    return a.reactVsScript - b.reactVsScript;
  });
  const worstCases = sorted.slice(0, 10);

  // By-category breakdown
  const byCategory: ComparisonReport['byCategory'] = {};
  for (const r of results) {
    if (!byCategory[r.category]) {
      byCategory[r.category] = { count: 0, avgSimilarity: 0, passed: 0 };
    }
    const catEntry = byCategory[r.category]!;
    catEntry.count++;
    if (r.status === 'PASS') {
      catEntry.passed++;
    }
  }

  // Compute average similarity per category (excluding errors)
  for (const cat of Object.keys(byCategory)) {
    const catResults = results.filter((r) => r.category === cat && r.status !== 'ERROR');
    byCategory[cat]!.avgSimilarity =
      catResults.length > 0
        ? catResults.reduce((sum, r) => sum + r.reactVsScript, 0) / catResults.length
        : 0;
  }

  return {
    timestamp: new Date().toISOString(),
    totalTests,
    passed,
    failed,
    errors,
    averageSimilarity: Math.round(averageSimilarity * 100) / 100,
    worstCases,
    byCategory,
    results,
  };
}

/**
 * Format a ComparisonReport as a readable Markdown string.
 */
export function formatReportMarkdown(report: ComparisonReport): string {
  const lines: string[] = [];

  lines.push('# React-to-DSL Conversion Report');
  lines.push('');
  lines.push(`Generated: ${report.timestamp}`);
  lines.push('');

  // Summary table
  lines.push('## Summary');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| Total Tests | ${report.totalTests} |`);
  lines.push(`| Passed (≥85%) | ${report.passed} |`);
  lines.push(`| Failed (<85%) | ${report.failed} |`);
  lines.push(`| Errors | ${report.errors} |`);
  lines.push(`| Average Similarity | ${report.averageSimilarity.toFixed(1)}% |`);
  lines.push('');

  // Category breakdown
  const categories = Object.keys(report.byCategory).sort();
  if (categories.length > 0) {
    lines.push('## By Category');
    lines.push('| Category | Tests | Avg Similarity | Passed |');
    lines.push('|----------|-------|---------------|--------|');
    for (const cat of categories) {
      const catData = report.byCategory[cat]!;
      lines.push(
        `| ${cat} | ${catData.count} | ${catData.avgSimilarity.toFixed(1)}% | ${catData.passed}/${catData.count} |`,
      );
    }
    lines.push('');
  }

  // Worst performers
  if (report.worstCases.length > 0) {
    lines.push('## Worst Performers');
    lines.push('| Test | Similarity | Status | Warnings |');
    lines.push('|------|-----------|--------|----------|');
    for (const r of report.worstCases) {
      const warningText = r.error
        ? r.error
        : r.warnings.length > 0
          ? r.warnings.join('; ')
          : '-';
      lines.push(
        `| ${r.name} | ${r.reactVsScript.toFixed(1)}% | ${r.status} | ${warningText} |`,
      );
    }
    lines.push('');
  }

  // Full results table sorted by similarity ascending
  const allSorted = [...report.results].sort((a, b) => a.reactVsScript - b.reactVsScript);
  lines.push('## All Results');
  lines.push('| Test | Category | Similarity | Status |');
  lines.push('|------|----------|-----------|--------|');
  for (const r of allSorted) {
    lines.push(`| ${r.name} | ${r.category} | ${r.reactVsScript.toFixed(1)}% | ${r.status} |`);
  }
  lines.push('');

  return lines.join('\n');
}
