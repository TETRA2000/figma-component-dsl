/**
 * CLI Interface — Pipeline orchestration.
 * Uses Node.js parseArgs (no framework dependency).
 */

import { parseArgs } from 'node:util';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync, spawn } from 'node:child_process';

// Exit codes
export const EXIT_SUCCESS = 0;
export const EXIT_PIPELINE_FAILURE = 1;
export const EXIT_RUNTIME_ERROR = 2;

interface CliContext {
  pythonPath: string;
  rendererModule: string;
}

function discoverPython(): string {
  const envPython = process.env['FIGMA_DSL_PYTHON'];
  if (envPython) return envPython;
  try {
    execSync('python3 --version', { stdio: 'pipe' });
    return 'python3';
  } catch {
    return 'python';
  }
}

function getContext(): CliContext {
  return {
    pythonPath: discoverPython(),
    rendererModule: 'figma_component_dsl.renderer',
  };
}

export async function compileCommand(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
    },
    allowPositionals: true,
  });

  const inputPath = positionals[0];
  if (!inputPath) {
    console.error('Error: No input file specified');
    return EXIT_RUNTIME_ERROR;
  }

  try {
    // Dynamic import the DSL module
    const modulePath = resolve(inputPath);
    const mod = await import(modulePath);
    const dslNode = mod.default ?? mod.node ?? mod;

    // Compile
    const { compile } = await import('../../compiler/src/compiler.js');
    const result = compile(dslNode);

    if (result.errors.length > 0) {
      for (const err of result.errors) {
        console.error(`Compile error at ${err.nodePath}: ${err.message}`);
      }
    }

    const json = JSON.stringify(result, null, 2);

    if (values['output']) {
      writeFileSync(values['output'], json);
      console.log(`Compiled to ${values['output']}`);
    } else {
      process.stdout.write(json);
    }

    return EXIT_SUCCESS;
  } catch (err) {
    console.error(`Compile error: ${err instanceof Error ? err.message : String(err)}`);
    return EXIT_RUNTIME_ERROR;
  }
}

export async function renderCommand(args: string[]): Promise<number> {
  const { values } = parseArgs({
    args,
    options: {
      input: { type: 'string', short: 'i' },
      output: { type: 'string', short: 'o', default: 'output.png' },
      scale: { type: 'string', default: '1' },
      bg: { type: 'string', default: 'white' },
    },
  });

  const inputPath = values['input'];
  if (!inputPath) {
    console.error('Error: No input file specified (use --input or -i)');
    return EXIT_RUNTIME_ERROR;
  }

  const ctx = getContext();

  try {
    const result = new Promise<number>((resolveP) => {
      const child = spawn(ctx.pythonPath, [
        '-m', ctx.rendererModule,
        '--input', inputPath,
        '--output', values['output']!,
        '--scale', values['scale']!,
        '--bg', values['bg']!,
      ], { stdio: ['pipe', 'inherit', 'pipe'] });

      let stderr = '';
      child.stderr?.on('data', (data: Buffer) => { stderr += data.toString(); });

      child.on('close', (code) => {
        if (code !== 0) {
          console.error(`Renderer error (exit ${code}): ${stderr}`);
          resolveP(EXIT_RUNTIME_ERROR);
        } else {
          console.log(`Rendered to ${values['output']}`);
          resolveP(EXIT_SUCCESS);
        }
      });
    });
    return result;
  } catch (err) {
    console.error(`Render error: ${err instanceof Error ? err.message : String(err)}`);
    return EXIT_RUNTIME_ERROR;
  }
}

export async function captureCommand(args: string[]): Promise<number> {
  const { values } = parseArgs({
    args,
    options: {
      url: { type: 'string', short: 'u' },
      selector: { type: 'string', short: 's', default: '#root > *' },
      output: { type: 'string', short: 'o', default: 'capture.png' },
      viewport: { type: 'string', short: 'v', default: '1280x720' },
    },
  });

  const url = values['url'];
  if (!url) {
    console.error('Error: No URL specified (use --url or -u)');
    return EXIT_RUNTIME_ERROR;
  }

  try {
    const [width, height] = values['viewport']!.split('x').map(Number);
    const { captureFromUrl } = await import('../../capturer/src/capturer.js');
    const result = await captureFromUrl(url, values['selector']!, values['output']!, {
      width,
      height,
    });
    console.log(`Captured to ${result.outputPath}`);
    return EXIT_SUCCESS;
  } catch (err) {
    console.error(`Capture error: ${err instanceof Error ? err.message : String(err)}`);
    return EXIT_RUNTIME_ERROR;
  }
}

export async function compareCommand(args: string[]): Promise<number> {
  const { positionals, values } = parseArgs({
    args,
    options: {
      threshold: { type: 'string', default: '0.95' },
      diff: { type: 'string', short: 'd', default: 'diff.png' },
    },
    allowPositionals: true,
  });

  if (positionals.length < 2) {
    console.error('Error: Two image paths required');
    return EXIT_RUNTIME_ERROR;
  }

  try {
    const { compare } = await import('../../comparator/src/comparator.js');
    const result = await compare(positionals[0]!, positionals[1]!, {
      failThreshold: parseFloat(values['threshold']!),
    });

    console.log(`Similarity: ${(result.similarity * 100).toFixed(1)}%`);
    console.log(`Pixels compared: ${result.totalPixels}`);
    console.log(`Mismatched: ${result.mismatchedPixels}`);
    console.log(`Dimensions match: ${result.dimensionMatch}`);
    console.log(`Result: ${result.pass ? 'PASS' : 'FAIL'}`);

    if (values['diff'] && result.diffImage) {
      writeFileSync(values['diff'], result.diffImage);
      console.log(`Diff image: ${values['diff']}`);
    }

    return result.pass ? EXIT_SUCCESS : EXIT_PIPELINE_FAILURE;
  } catch (err) {
    console.error(`Compare error: ${err instanceof Error ? err.message : String(err)}`);
    return EXIT_RUNTIME_ERROR;
  }
}

export async function exportCommand(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: 'string', short: 'o' },
      page: { type: 'string', default: 'Component Library' },
    },
    allowPositionals: true,
  });

  const inputPath = positionals[0];
  if (!inputPath) {
    console.error('Error: No input file specified');
    return EXIT_RUNTIME_ERROR;
  }

  try {
    const modulePath = resolve(inputPath);
    const mod = await import(modulePath);
    const dslNode = mod.default ?? mod.node ?? mod;

    const { compile } = await import('../../compiler/src/compiler.js');
    const compileResult = compile(dslNode);

    const { exportToPluginJson } = await import('../../exporter/src/exporter.js');
    const json = exportToPluginJson(compileResult, { targetPage: values['page']! });

    if (values['output']) {
      writeFileSync(values['output'], json);
      console.log(`Exported to ${values['output']}`);
    } else {
      process.stdout.write(json);
    }

    return EXIT_SUCCESS;
  } catch (err) {
    console.error(`Export error: ${err instanceof Error ? err.message : String(err)}`);
    return EXIT_RUNTIME_ERROR;
  }
}

export async function pipelineCommand(args: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      url: { type: 'string', short: 'u' },
      selector: { type: 'string', short: 's', default: '#root > *' },
      viewport: { type: 'string', short: 'v', default: '1280x720' },
      output: { type: 'string', short: 'o', default: 'pipeline-output' },
      threshold: { type: 'string', default: '0.95' },
      bg: { type: 'string', default: 'white' },
      scale: { type: 'string', default: '1' },
    },
    allowPositionals: true,
  });

  const inputPath = positionals[0];
  if (!inputPath) {
    console.error('Error: No input DSL file specified');
    console.error('Usage: figma-dsl pipeline <input.dsl.ts> --url <react-url> [options]');
    return EXIT_RUNTIME_ERROR;
  }

  const outputDir = values['output']!;
  const { mkdirSync } = await import('node:fs');
  try { mkdirSync(outputDir, { recursive: true }); } catch { /* ignore */ }

  const jsonPath = resolve(outputDir, 'compiled.json');
  const renderPath = resolve(outputDir, 'render.png');
  const capturePath = resolve(outputDir, 'capture.png');
  const diffPath = resolve(outputDir, 'diff.png');

  // Stage 1: Compile
  console.log('Pipeline [1/4]: Compiling DSL...');
  const compileResult = await compileCommand([inputPath, '--output', jsonPath]);
  if (compileResult !== EXIT_SUCCESS) {
    console.error('Pipeline failed at compile stage');
    return EXIT_RUNTIME_ERROR;
  }

  // Stage 2: Render
  console.log('Pipeline [2/4]: Rendering to PNG...');
  const renderResult = await renderCommand([
    '--input', jsonPath,
    '--output', renderPath,
    '--scale', values['scale']!,
    '--bg', values['bg']!,
  ]);
  if (renderResult !== EXIT_SUCCESS) {
    console.error('Pipeline failed at render stage');
    return EXIT_RUNTIME_ERROR;
  }

  // Stage 3: Capture (optional — requires --url)
  if (values['url']) {
    console.log('Pipeline [3/4]: Capturing React screenshot...');
    const captureResult = await captureCommand([
      '--url', values['url'],
      '--selector', values['selector']!,
      '--output', capturePath,
      '--viewport', values['viewport']!,
    ]);
    if (captureResult !== EXIT_SUCCESS) {
      console.error('Pipeline failed at capture stage');
      return EXIT_RUNTIME_ERROR;
    }

    // Stage 4: Compare
    console.log('Pipeline [4/4]: Comparing images...');
    const compareResult = await compareCommand([
      renderPath, capturePath,
      '--threshold', values['threshold']!,
      '--diff', diffPath,
    ]);
    return compareResult;
  }

  console.log('Pipeline complete (stages 1-2). Provide --url for capture+compare.');
  return EXIT_SUCCESS;
}

export async function doctorCommand(): Promise<number> {
  console.log('figma-dsl doctor — Environment verification\n');
  let allOk = true;

  // Node.js version
  const nodeVersion = process.version;
  const nodeMajor = parseInt(nodeVersion.slice(1));
  if (nodeMajor >= 22) {
    console.log(`  ✓ Node.js ${nodeVersion}`);
  } else {
    console.log(`  ✗ Node.js ${nodeVersion} (22+ required)`);
    allOk = false;
  }

  // Python version
  const ctx = getContext();
  try {
    const pyVersion = execSync(`${ctx.pythonPath} --version`, { encoding: 'utf-8' }).trim();
    console.log(`  ✓ ${pyVersion}`);
  } catch {
    console.log(`  ✗ Python not found`);
    allOk = false;
  }

  // PyCairo
  try {
    const cairoVersion = execSync(
      `${ctx.pythonPath} -c "import cairo; print(cairo.version)"`,
      { encoding: 'utf-8' },
    ).trim();
    console.log(`  ✓ PyCairo ${cairoVersion}`);
  } catch {
    console.log(`  ✗ PyCairo not installed (pip install pycairo)`);
    allOk = false;
  }

  // Inter font files
  try {
    const fontsDir = resolve(import.meta.dirname ?? '.', '../../dsl-core/fonts');
    const fs = await import('node:fs');
    const fonts = ['Inter-Regular.otf', 'Inter-Medium.otf', 'Inter-SemiBold.otf', 'Inter-Bold.otf'];
    const allFonts = fonts.every((f) => fs.existsSync(resolve(fontsDir, f)));
    if (allFonts) {
      console.log(`  ✓ Inter font files (${fontsDir})`);
    } else {
      console.log(`  ✗ Inter font files missing (${fontsDir})`);
      allOk = false;
    }
  } catch {
    console.log(`  ? Inter font files (could not check)`);
  }

  console.log(`\n${allOk ? 'All checks passed!' : 'Some checks failed.'}`);
  return allOk ? EXIT_SUCCESS : EXIT_PIPELINE_FAILURE;
}

export async function main(argv: string[] = process.argv.slice(2)): Promise<number> {
  const command = argv[0];
  const args = argv.slice(1);

  switch (command) {
    case 'compile': return compileCommand(args);
    case 'render': return renderCommand(args);
    case 'capture': return captureCommand(args);
    case 'compare': return compareCommand(args);
    case 'export': return exportCommand(args);
    case 'pipeline': return pipelineCommand(args);
    case 'doctor': return doctorCommand();
    default:
      console.log('figma-dsl — Figma Component DSL CLI\n');
      console.log('Commands:');
      console.log('  compile  <input.dsl.ts>     Compile DSL to FigmaNodeDict JSON');
      console.log('  render   --input <json>     Render JSON to PNG via PyCairo');
      console.log('  capture  --url <url>        Capture React component screenshot');
      console.log('  compare  <img1> <img2>      Compare two images');
      console.log('  export   <input.dsl.ts>     Generate Figma plugin input JSON');
      console.log('  pipeline <input.dsl.ts>     Run full pipeline');
      console.log('  doctor                      Verify environment');
      return EXIT_SUCCESS;
  }
}
