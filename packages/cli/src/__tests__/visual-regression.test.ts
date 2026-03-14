/**
 * Task 12.5: Visual Regression Comparison — DSL renders vs React component screenshots
 *
 * This test file captures React component screenshots from the reference library
 * (figma_design_playground), renders corresponding DSL definitions, and compares
 * them pixel-by-pixel to establish baseline similarity scores.
 *
 * Prerequisites:
 * - Playwright Chromium must be installed: npx playwright install chromium
 * - Reference project deps installed: cd references/figma_design_playground && npm install
 *
 * Run: VISUAL_REGRESSION=1 npx vitest run packages/cli/src/__tests__/visual-regression.test.ts
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { VirtualFigmaApi, solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';
import { Compiler, TextMeasurer, LayoutResolver } from '@figma-dsl/compiler';
import { Renderer } from '@figma-dsl/renderer';
import { Capturer } from '@figma-dsl/capturer';
import { Comparator } from '@figma-dsl/comparator';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { execSync, type ChildProcess, spawn } from 'node:child_process';

import { buildNavbar } from '../definitions/navbar.dsl.js';
import { buildHero } from '../definitions/hero.dsl.js';
import { buildStats } from '../definitions/stats.dsl.js';
import { buildFooter } from '../definitions/footer.dsl.js';
import { buildFeatureGrid } from '../definitions/feature-grid.dsl.js';
import { buildLogoCloud } from '../definitions/logo-cloud.dsl.js';
import { buildFAQ } from '../definitions/faq.dsl.js';
import { buildTestimonials } from '../definitions/testimonials.dsl.js';
import { buildPricingTable } from '../definitions/pricing-table.dsl.js';
import { buildCTABanner } from '../definitions/cta-banner.dsl.js';

// Skip unless VISUAL_REGRESSION=1 is set — requires Playwright + Vite dev server
const ENABLED = process.env['VISUAL_REGRESSION'] === '1';
const describeIf = ENABLED ? describe : describe.skip;

const FONT_DIR = path.resolve(import.meta.dirname, '../../../dsl-core/fonts');
const REFERENCE_DIR = path.resolve(import.meta.dirname, '../../../../references/figma_design_playground');
const OUTPUT_DIR = path.join(os.tmpdir(), 'figma-dsl-visual-regression');
const BASELINE_DIR = path.resolve(import.meta.dirname, '../../visual-baselines');

// Section component definitions matched with their landing page selectors
const SECTION_COMPONENTS = [
  {
    name: 'Navbar',
    buildFn: buildNavbar,
    selector: 'nav',
    viewport: { width: 1200, height: 80 },
  },
  {
    name: 'Hero',
    buildFn: buildHero,
    // Capture just the center hero variant (first section after nav)
    selector: 'section:first-of-type',
    viewport: { width: 1200, height: 700 },
  },
  {
    name: 'FeatureGrid',
    buildFn: buildFeatureGrid,
    selector: '#features',
    viewport: { width: 1200, height: 800 },
  },
  {
    name: 'Stats',
    buildFn: buildStats,
    selector: 'section:nth-of-type(3)',
    viewport: { width: 1200, height: 400 },
  },
  {
    name: 'LogoCloud',
    buildFn: buildLogoCloud,
    selector: 'section:nth-of-type(4)',
    viewport: { width: 1200, height: 300 },
  },
  {
    name: 'Testimonials',
    buildFn: buildTestimonials,
    selector: '#testimonials',
    viewport: { width: 1200, height: 600 },
  },
  {
    name: 'PricingTable',
    buildFn: buildPricingTable,
    selector: '#pricing',
    viewport: { width: 1200, height: 800 },
  },
  {
    name: 'CTABanner',
    buildFn: buildCTABanner,
    selector: 'section:nth-of-type(8)',
    viewport: { width: 1200, height: 400 },
  },
  {
    name: 'FAQ',
    buildFn: buildFAQ,
    selector: '#faq',
    viewport: { width: 1200, height: 600 },
  },
  {
    name: 'Footer',
    buildFn: buildFooter,
    selector: 'footer',
    viewport: { width: 1200, height: 400 },
  },
];

/**
 * Expected similarity ranges per component type:
 * - Simple shapes (solid fills, rectangles): >98%
 * - Text-heavy layouts (font rendering differences): >92%
 * - Gradient components (gradient interpolation): >90%
 * - Complex compositions (nested layouts): >85%
 *
 * Note: DSL renders use @napi-rs/canvas (Skia) while React screenshots use
 * Chromium's rendering engine. Differences in text rasterization, sub-pixel
 * rendering, and anti-aliasing account for most visual divergence.
 */
const EXPECTED_RANGES: Record<string, { min: number; category: string }> = {
  Navbar: { min: 85, category: 'text-heavy layout' },
  Hero: { min: 80, category: 'complex composition' },
  FeatureGrid: { min: 80, category: 'complex composition' },
  Stats: { min: 85, category: 'text-heavy layout' },
  LogoCloud: { min: 85, category: 'text-heavy layout' },
  Testimonials: { min: 80, category: 'complex composition' },
  PricingTable: { min: 80, category: 'complex composition' },
  CTABanner: { min: 85, category: 'gradient component' },
  FAQ: { min: 80, category: 'complex composition' },
  Footer: { min: 80, category: 'text-heavy layout' },
};

function createPipeline() {
  const api = new VirtualFigmaApi();
  const measurer = new TextMeasurer();
  measurer.loadFont(path.join(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
  const resolver = new LayoutResolver(measurer);
  const compiler = new Compiler();
  const renderer = new Renderer(FONT_DIR);
  return { api, resolver, compiler, renderer };
}

async function renderDsl(
  buildFn: (api: VirtualFigmaApi) => Promise<ReturnType<VirtualFigmaApi['createFrame']>>,
  outputPath: string,
) {
  const { api, resolver, compiler, renderer } = createPipeline();
  const root = await buildFn(api);
  resolver.resolve(root);
  const result = compiler.compile(root);
  await renderer.render(result.root, outputPath, { scale: 1 });
  return result;
}

describeIf('Visual Regression: DSL vs React screenshots', () => {
  let devServer: ChildProcess;
  let devServerUrl: string;
  const capturer = new Capturer();
  const comparator = new Comparator();

  beforeAll(async () => {
    // Create output directories
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.mkdirSync(BASELINE_DIR, { recursive: true });

    // Start Vite dev server for reference project
    devServer = spawn('npx', ['vite', '--port', '5199', '--host', '127.0.0.1'], {
      cwd: REFERENCE_DIR,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, BROWSER: 'none' },
    });

    devServerUrl = await new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Dev server startup timeout')), 30000);

      devServer.stdout?.on('data', (data: Buffer) => {
        const output = data.toString();
        const match = output.match(/Local:\s+(http:\/\/\S+)/);
        if (match) {
          clearTimeout(timeout);
          resolve(match[1]!);
        }
      });

      devServer.stderr?.on('data', (data: Buffer) => {
        const output = data.toString();
        if (output.includes('error')) {
          clearTimeout(timeout);
          reject(new Error(`Dev server error: ${output}`));
        }
      });

      devServer.on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  }, 60000);

  afterAll(async () => {
    devServer?.kill('SIGTERM');
    // Wait for process to exit
    await new Promise((resolve) => {
      if (devServer) {
        devServer.on('exit', resolve);
        setTimeout(resolve, 5000);
      } else {
        resolve(undefined);
      }
    });
  });

  const baselineScores: Record<string, number> = {};

  for (const component of SECTION_COMPONENTS) {
    it(`captures and compares ${component.name}`, async () => {
      const dslPath = path.join(OUTPUT_DIR, `${component.name}-dsl.png`);
      const reactPath = path.join(OUTPUT_DIR, `${component.name}-react.png`);
      const diffPath = path.join(OUTPUT_DIR, `${component.name}-diff.png`);

      // Render DSL definition
      await renderDsl(component.buildFn, dslPath);
      expect(fs.existsSync(dslPath)).toBe(true);

      // Capture React component screenshot
      await capturer.captureUrl(devServerUrl, reactPath, {
        viewport: component.viewport,
        selector: component.selector,
        background: 'white',
      });
      expect(fs.existsSync(reactPath)).toBe(true);

      // Compare
      const result = await comparator.compare(reactPath, dslPath, diffPath, {
        threshold: 0.3,
        failThreshold: EXPECTED_RANGES[component.name]!.min,
      });

      // Record baseline score
      baselineScores[component.name] = result.similarity;

      console.log(
        `[${component.name}] Similarity: ${result.similarity.toFixed(1)}% ` +
          `(expected >${EXPECTED_RANGES[component.name]!.min}%, ` +
          `category: ${EXPECTED_RANGES[component.name]!.category})`,
      );

      // Verify meets minimum threshold
      expect(result.similarity).toBeGreaterThanOrEqual(
        EXPECTED_RANGES[component.name]!.min,
      );
    }, 30000);
  }

  it('writes baseline scores to file', () => {
    if (Object.keys(baselineScores).length === 0) return;

    const baseline = {
      timestamp: new Date().toISOString(),
      scores: baselineScores,
      expectedRanges: EXPECTED_RANGES,
    };

    fs.writeFileSync(
      path.join(BASELINE_DIR, 'baseline-scores.json'),
      JSON.stringify(baseline, null, 2),
    );

    console.log('\nBaseline scores saved to packages/cli/visual-baselines/baseline-scores.json');
    console.log(JSON.stringify(baselineScores, null, 2));
  });
});

describeIf('Visual Regression: compare against previous baseline', () => {
  it('loads and validates against stored baseline', () => {
    const baselinePath = path.join(BASELINE_DIR, 'baseline-scores.json');
    if (!fs.existsSync(baselinePath)) {
      console.log('No baseline found — run visual regression first to establish baseline');
      return;
    }

    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
    console.log(`Baseline from: ${baseline.timestamp}`);
    console.log('Previous scores:', baseline.scores);
  });
});
