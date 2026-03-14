import { mkdirSync } from 'fs';
import { join } from 'path';
import { generateTestSuite } from './test-suite-generator.js';
import type { PropertyCategory } from './test-suite-generator.js';
import { processBatch } from './batch-processor.js';
import type { BatchResult } from './batch-processor.js';
import { captureFigmaImages, loadNodeIdMap } from './figma-capturer.js';
import { batchCompare, formatReportMarkdown } from './calibration-reporter.js';
import type { BatchCompareReport } from './calibration-reporter.js';

export interface CalibrateOptions {
  outputDir: string;
  properties?: PropertyCategory[];
  include?: string[];
  skipGenerate?: boolean;
  captureMode?: 'api';
  fileKey?: string;
  token?: string;
  nodeIdMapPath?: string;
  threshold?: number;
}

export interface CalibrateResult {
  runDir: string;
  batch: BatchResult;
  report?: BatchCompareReport;
}

export async function runCalibration(options: CalibrateOptions): Promise<CalibrateResult> {
  // Create timestamped run directory
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const runDir = join(options.outputDir, timestamp);
  mkdirSync(runDir, { recursive: true });

  console.log(`\n[calibrate] Run directory: ${runDir}`);

  // Step 1: Generate test suite (unless skipped)
  const testSuiteDir = join(runDir, 'test-suite');
  if (!options.skipGenerate) {
    console.log('\n[calibrate] Step 1: Generating test suite...');
    const genResult = generateTestSuite({
      outputDir: testSuiteDir,
      properties: options.properties,
    });
    console.log(`[calibrate] Generated ${genResult.filesGenerated} test files across ${genResult.categories.length} categories`);
  } else {
    console.log('\n[calibrate] Step 1: Skipped (--skip-generate)');
  }

  // Step 2: Batch compile/render/export
  console.log('\n[calibrate] Step 2: Batch compile, render, and export...');
  const batchInput = options.skipGenerate ? options.outputDir : testSuiteDir;
  const batch = await processBatch({
    input: batchInput,
    outputDir: runDir,
    include: options.include,
  });
  console.log(`[calibrate] Batch complete: ${batch.successCount} success, ${batch.errorCount} errors`);

  // Step 3: Figma capture (if API mode)
  let report: BatchCompareReport | undefined;

  if (options.captureMode === 'api') {
    if (!options.fileKey || !options.token) {
      console.error('[calibrate] --capture-mode api requires --file-key and --token');
    } else {
      console.log('\n[calibrate] Step 3: Capturing from Figma REST API...');

      let nodeIdMap: Record<string, string>;
      if (options.nodeIdMapPath) {
        nodeIdMap = loadNodeIdMap(options.nodeIdMapPath);
      } else {
        console.error('[calibrate] --node-id-map is required for API capture mode');
        printNextSteps(runDir, batch);
        return { runDir, batch };
      }

      const figmaDir = join(runDir, 'figma');
      await captureFigmaImages({
        outputDir: figmaDir,
        fileKey: options.fileKey,
        token: options.token,
        nodeIdMap,
      });

      // Step 4: Compare
      console.log('\n[calibrate] Step 4: Comparing DSL vs Figma renders...');
      const dslDir = join(runDir, 'dsl');
      const reportPath = join(runDir, 'report.json');
      const diffDir = join(runDir, 'diffs');

      // Build source map from batch results
      const dslSourceMap: Record<string, string> = {};
      for (const comp of batch.components) {
        if (comp.dslPath) {
          dslSourceMap[comp.name] = comp.dslPath;
        }
      }

      report = batchCompare({
        dslDir,
        figmaDir,
        outputPath: reportPath,
        diffDir,
        threshold: options.threshold,
        dslSourceMap,
      });

      const markdown = formatReportMarkdown(report);
      console.log(`\n${markdown}`);
    }
  } else {
    printNextSteps(runDir, batch);
  }

  return { runDir, batch, report };
}

function printNextSteps(runDir: string, batch: BatchResult): void {
  console.log('\n[calibrate] Next steps:');
  console.log(`  1. Import ${batch.mergedPluginInputPath} into Figma via the plugin`);
  console.log(`  2. Download the exported PNGs and node-id-map.json from the plugin`);
  console.log(`  3. Place Figma PNGs in: ${join(runDir, 'figma/')}`);
  console.log(`  4. Run: figma-dsl batch-compare ${join(runDir, 'dsl')} ${join(runDir, 'figma')} -o ${join(runDir, 'report.json')}`);
}
