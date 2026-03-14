#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';

const execFileAsync = promisify(execFile);

// ─── Helpers ─────────────────────────────────────────────────

function fail(message: string, code = 2): never {
  console.error(`Error: ${message}`);
  process.exit(code);
}

function parseViewport(vp: string): { width: number; height: number } {
  const m = vp.match(/^(\d+)x(\d+)$/);
  if (!m) fail(`Invalid viewport format "${vp}". Expected WIDTHxHEIGHT (e.g. 1280x720)`);
  return { width: Number(m![1]), height: Number(m![2]) };
}

// ─── compile ─────────────────────────────────────────────────

export async function compileCommand(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
    },
    allowPositionals: true,
  });

  const inputFile = positionals[0];
  if (!inputFile) fail('Usage: figma-dsl compile <input.dsl.ts> [--output nodes.json]');

  const absInput = path.resolve(inputFile);
  if (!fs.existsSync(absInput)) fail(`Input file not found: ${absInput}`);

  const { VirtualFigmaApi, Compiler } = await import('@figma-dsl/core');

  const api = new VirtualFigmaApi();
  const mod = await import(absInput);

  const buildFn = mod.default ?? mod.build ?? mod.main;
  if (typeof buildFn !== 'function') {
    fail('DSL module must export a default function, or a named "build"/"main" function');
  }

  const rootNode = await buildFn(api);
  const compiler = new Compiler();
  const result = compiler.compile(rootNode);

  const json = JSON.stringify(result.root, null, 2);

  if (values.output) {
    fs.writeFileSync(values.output, json, 'utf-8');
    console.log(`Compiled ${result.nodeCount} nodes → ${values.output}`);
  } else {
    process.stdout.write(json + '\n');
  }
}

// ─── render ──────────────────────────────────────────────────

export async function renderCommand(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      scale: { type: 'string', short: 's' },
      bg: { type: 'string' },
    },
    allowPositionals: true,
  });

  const inputFile = positionals[0];
  if (!inputFile || !values.output) {
    fail('Usage: figma-dsl render <nodes.json> --output render.png [--scale 2] [--bg white|transparent]');
  }

  const absInput = path.resolve(inputFile);
  if (!fs.existsSync(absInput)) fail(`Input file not found: ${absInput}`);

  const pythonBin = process.env.FIGMA_DSL_PYTHON ?? 'python3';
  const cmdArgs = ['-m', 'figma_component_dsl', '--input', absInput, '--output', values.output!];

  if (values.scale) cmdArgs.push('--scale', values.scale);
  if (values.bg) cmdArgs.push('--bg', values.bg);

  try {
    const { stdout, stderr } = await execFileAsync(pythonBin, cmdArgs);
    if (stdout) console.log(stdout.trim());
    if (stderr) {
      const lines = stderr.trim().split('\n');
      for (const line of lines) {
        if (line.toLowerCase().includes('error')) {
          console.error(`Python renderer error: ${line}`);
        }
      }
    }
    console.log(`Rendered → ${values.output}`);
  } catch (err: unknown) {
    const e = err as { stderr?: string; message?: string };
    fail(`Render failed: ${e.stderr?.trim() || e.message || String(err)}`);
  }
}

// ─── bundle ──────────────────────────────────────────────────

export async function bundleCommand(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
    },
    allowPositionals: true,
  });

  const inputFile = positionals[0];
  if (!inputFile || !values.output) {
    fail('Usage: figma-dsl bundle <input.dsl.ts> --output bundle.js');
  }

  const absInput = path.resolve(inputFile);
  if (!fs.existsSync(absInput)) fail(`Input file not found: ${absInput}`);

  const esbuild = await import('esbuild');

  await esbuild.build({
    entryPoints: [absInput],
    bundle: true,
    format: 'iife',
    outfile: values.output,
    platform: 'neutral',
    alias: {
      'figma-dsl': '@figma-dsl/plugin',
    },
    banner: {
      js: '// Bundled DSL for Figma plugin execution',
    },
    footer: {
      js: '\n// Entry: async main()\n',
    },
  });

  console.log(`Bundled → ${values.output}`);
}

// ─── capture ─────────────────────────────────────────────────

export async function captureCommand(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      viewport: { type: 'string' },
      props: { type: 'string' },
    },
    allowPositionals: true,
  });

  const target = positionals[0];
  if (!target || !values.output) {
    fail('Usage: figma-dsl capture <component-path-or-url> --output screenshot.png [--viewport 1280x720] [--props \'{}\']');
  }

  const viewport = values.viewport
    ? parseViewport(values.viewport)
    : { width: 1280, height: 720 };

  const props = values.props ? JSON.parse(values.props) as Record<string, unknown> : {};

  const { PlaywrightCapturer } = await import('@figma-dsl/core');
  const capturer = new PlaywrightCapturer();

  const isUrl = target.startsWith('http://') || target.startsWith('https://');

  let result;
  if (isUrl) {
    result = await capturer.captureUrl(target, values.output!, {
      viewport,
    });
  } else {
    result = await capturer.capture(target, props, values.output!, {
      viewport,
    });
  }

  console.log(`Captured ${result.width}x${result.height} → ${result.pngPath}`);
}

// ─── compare ─────────────────────────────────────────────────

export async function compareCommand(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      threshold: { type: 'string', short: 't' },
      diff: { type: 'string', short: 'd' },
    },
    allowPositionals: true,
  });

  const image1 = positionals[0];
  const image2 = positionals[1];
  if (!image1 || !image2) {
    fail('Usage: figma-dsl compare <image1.png> <image2.png> [--threshold 95] [--diff diff.png]');
  }

  if (!fs.existsSync(image1)) fail(`Image not found: ${image1}`);
  if (!fs.existsSync(image2)) fail(`Image not found: ${image2}`);

  const threshold = values.threshold ? Number(values.threshold) : 95;
  const diffPath = values.diff ?? 'diff.png';

  const { Comparator } = await import('@figma-dsl/core');
  const comparator = new Comparator();

  const result = await comparator.compare(image1, image2, diffPath, {
    failThreshold: threshold,
  });

  console.log(`Similarity: ${result.similarity.toFixed(2)}%`);
  console.log(`Mismatched pixels: ${result.mismatchedPixels} / ${result.totalPixels}`);
  console.log(`Dimensions match: ${result.dimensionMatch ? 'yes' : 'no'}`);
  if (result.diffImagePath) {
    console.log(`Diff image: ${result.diffImagePath}`);
  }

  if (result.passed) {
    console.log(`Result: PASS (>= ${threshold}%)`);
  } else {
    console.log(`Result: FAIL (< ${threshold}%)`);
    process.exit(1);
  }
}

// ─── pipeline ────────────────────────────────────────────────

export async function pipelineCommand(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      'react-url': { type: 'string' },
      threshold: { type: 'string', short: 't' },
      output: { type: 'string', short: 'o' },
    },
    allowPositionals: true,
  });

  const inputFile = positionals[0];
  if (!inputFile) {
    fail('Usage: figma-dsl pipeline <input.dsl.ts> [--react-url http://...] [--threshold 95]');
  }

  const threshold = values.threshold ? Number(values.threshold) : 95;
  const outputDir = values.output ?? '.';

  // Stage 1: Compile
  console.log('[1/4] Compiling DSL...');
  const nodesJson = path.join(outputDir, 'pipeline-nodes.json');
  try {
    await compileCommand([inputFile, '--output', nodesJson]);
  } catch {
    fail('Pipeline failed at stage: compile');
  }

  // Stage 2: Render
  console.log('[2/4] Rendering...');
  const renderPng = path.join(outputDir, 'pipeline-render.png');
  try {
    await renderCommand([nodesJson, '--output', renderPng]);
  } catch {
    fail('Pipeline failed at stage: render');
  }

  // Stage 3: Capture
  const reactUrl = values['react-url'];
  if (!reactUrl) {
    console.log('[3/4] Capture skipped (no --react-url provided)');
    console.log('[4/4] Compare skipped (no capture to compare)');
    console.log('Pipeline completed (compile + render only)');
    return;
  }

  console.log('[3/4] Capturing screenshot...');
  const capturePng = path.join(outputDir, 'pipeline-capture.png');
  try {
    await captureCommand([reactUrl, '--output', capturePng]);
  } catch {
    fail('Pipeline failed at stage: capture');
  }

  // Stage 4: Compare
  console.log('[4/4] Comparing images...');
  const diffPng = path.join(outputDir, 'pipeline-diff.png');
  try {
    await compareCommand([renderPng, capturePng, '--threshold', String(threshold), '--diff', diffPng]);
  } catch {
    // compareCommand exits with code 1 on failure, but that's caught here
    fail('Pipeline failed at stage: compare', 1);
  }

  console.log('Pipeline completed successfully');
}

// ─── doctor ──────────────────────────────────────────────────

interface DoctorCheck {
  name: string;
  status: 'ok' | 'warn' | 'fail';
  message: string;
}

export async function doctorCommand(): Promise<DoctorCheck[]> {
  const checks: DoctorCheck[] = [];

  // Node.js version
  const nodeVersion = process.versions.node;
  const nodeMajor = parseInt(nodeVersion.split('.')[0], 10);
  if (nodeMajor >= 22) {
    checks.push({ name: 'Node.js', status: 'ok', message: `v${nodeVersion}` });
  } else {
    checks.push({
      name: 'Node.js',
      status: 'fail',
      message: `v${nodeVersion} (requires 22+). Install from https://nodejs.org`,
    });
  }

  // Python version
  const pythonBin = process.env.FIGMA_DSL_PYTHON ?? 'python3';
  try {
    const { stdout } = await execFileAsync(pythonBin, ['--version']);
    const pyVersion = stdout.trim().replace('Python ', '');
    const [pyMajor, pyMinor] = pyVersion.split('.').map(Number);
    if (pyMajor >= 3 && pyMinor >= 10) {
      checks.push({ name: 'Python', status: 'ok', message: `v${pyVersion}` });
    } else {
      checks.push({
        name: 'Python',
        status: 'fail',
        message: `v${pyVersion} (requires 3.10+). Install from https://python.org`,
      });
    }
  } catch {
    checks.push({
      name: 'Python',
      status: 'fail',
      message: `"${pythonBin}" not found. Install Python 3.10+ or set FIGMA_DSL_PYTHON env var`,
    });
  }

  // PyCairo
  try {
    await execFileAsync(pythonBin, ['-c', 'import cairo; print(cairo.version)']);
    checks.push({ name: 'PyCairo', status: 'ok', message: 'installed' });
  } catch {
    checks.push({
      name: 'PyCairo',
      status: 'fail',
      message: 'PyCairo not installed. Run: pip install pycairo',
    });
  }

  // Inter font
  const fontPaths = [
    '/usr/share/fonts/truetype/inter',
    '/usr/share/fonts/inter',
    '/usr/local/share/fonts',
    path.join(process.env.HOME ?? '', '.local/share/fonts'),
    path.join(process.env.HOME ?? '', '.fonts'),
    // macOS
    '/Library/Fonts',
    path.join(process.env.HOME ?? '', 'Library/Fonts'),
  ];

  let fontFound = false;
  for (const fp of fontPaths) {
    try {
      const entries = fs.readdirSync(fp);
      if (entries.some(e => /inter/i.test(e) && /\.(ttf|otf|woff2?)$/i.test(e))) {
        fontFound = true;
        checks.push({ name: 'Inter font', status: 'ok', message: `found in ${fp}` });
        break;
      }
    } catch {
      // directory doesn't exist, skip
    }
  }
  if (!fontFound) {
    checks.push({
      name: 'Inter font',
      status: 'warn',
      message: 'Inter font not found. Download from https://rsms.me/inter/',
    });
  }

  // Print results
  for (const check of checks) {
    const icon = check.status === 'ok' ? '[OK]' : check.status === 'warn' ? '[WARN]' : '[FAIL]';
    console.log(`${icon} ${check.name}: ${check.message}`);
  }

  return checks;
}

// ─── Main CLI entry point ────────────────────────────────────

const COMMANDS: Record<string, (args: string[]) => Promise<void>> = {
  compile: compileCommand,
  render: renderCommand,
  bundle: bundleCommand,
  capture: captureCommand,
  compare: compareCommand,
  pipeline: pipelineCommand,
  doctor: () => doctorCommand().then(() => {}),
};

const USAGE = `figma-dsl - Figma Component DSL CLI

Commands:
  compile  <input.dsl.ts> [--output nodes.json]
  render   <nodes.json> --output render.png [--scale 2] [--bg white|transparent]
  bundle   <input.dsl.ts> --output bundle.js
  capture  <component-path-or-url> --output screenshot.png [--viewport 1280x720]
  compare  <image1.png> <image2.png> [--threshold 95] [--diff diff.png]
  pipeline <input.dsl.ts> [--react-url http://...] [--threshold 95]
  doctor   Check system dependencies
`;

export async function main(argv: string[] = process.argv.slice(2)): Promise<void> {
  if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h') {
    console.log(USAGE);
    return;
  }

  const subcommand = argv[0];
  const subArgs = argv.slice(1);

  const handler = COMMANDS[subcommand];
  if (!handler) {
    console.error(`Unknown command: ${subcommand}\n`);
    console.log(USAGE);
    process.exit(2);
  }

  await handler(subArgs);
}

// Run if executed directly
const isDirectRun = process.argv[1] &&
  (process.argv[1].endsWith('/cli.js') || process.argv[1].endsWith('/cli.ts'));

if (isDirectRun) {
  main().catch((err: Error) => {
    console.error(err.message);
    process.exit(2);
  });
}
