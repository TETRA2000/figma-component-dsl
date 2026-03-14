#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { VirtualFigmaApi } from '@figma-dsl/core';
import { Compiler, TextMeasurer, LayoutResolver } from '@figma-dsl/compiler';
import { Renderer } from '@figma-dsl/renderer';
import { Capturer } from '@figma-dsl/capturer';
import { Comparator } from '@figma-dsl/comparator';
import fs from 'node:fs';

const FONT_DIR = resolve(import.meta.dirname, '../../dsl-core/fonts');

async function compile(dslPath: string, output?: string): Promise<void> {
  const mod = await import(resolve(dslPath));
  const api = new VirtualFigmaApi();
  const root = await mod.default(api);

  const measurer = new TextMeasurer();
  measurer.loadFont(resolve(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
  const resolver = new LayoutResolver(measurer);
  resolver.resolve(root);

  const compiler = new Compiler();
  const json = compiler.compileToJson(root);

  if (output) {
    fs.writeFileSync(output, json);
    console.log(`Compiled to ${output}`);
  } else {
    process.stdout.write(json);
  }
}

async function render(
  jsonPath: string,
  options: { output?: string; scale?: number; bg?: string },
): Promise<void> {
  const json = fs.readFileSync(jsonPath, 'utf-8');
  const root = JSON.parse(json);

  const renderer = new Renderer(FONT_DIR);
  const outputPath = options.output ?? jsonPath.replace(/\.json$/, '.png');
  const scale = options.scale ?? 1;
  const bgColor = options.bg === 'transparent'
    ? { r: 0, g: 0, b: 0, a: 0 }
    : { r: 1, g: 1, b: 1, a: 1 };

  const result = await renderer.render(root, outputPath, {
    scale,
    backgroundColor: bgColor,
  });
  console.log(`Rendered to ${result.pngPath} (${result.width}x${result.height})`);
}

async function capture(
  componentPath: string,
  options: { output?: string; viewport?: string; props?: string },
): Promise<void> {
  const capturer = new Capturer();
  const viewport = parseViewport(options.viewport ?? '1200x800');
  const outputPath = options.output ?? 'capture.png';

  const result = await capturer.captureUrl(componentPath, outputPath, { viewport });
  console.log(`Captured to ${result.pngPath} (${result.width}x${result.height})`);
}

async function compare(
  image1: string,
  image2: string,
  options: { output?: string; threshold?: number },
): Promise<void> {
  const comparator = new Comparator();
  const diffPath = options.output ?? 'diff.png';
  const result = await comparator.compare(image1, image2, diffPath, {
    failThreshold: options.threshold,
  });

  console.log(`Similarity: ${result.similarity.toFixed(2)}%`);
  console.log(`Passed: ${result.passed}`);
  if (result.diffImagePath) {
    console.log(`Diff image: ${result.diffImagePath}`);
  }

  if (!result.passed) process.exit(1);
}

async function pipeline(
  dslPath: string,
  componentPath: string,
  options: { output?: string; viewport?: string; threshold?: number; scale?: number },
): Promise<void> {
  const tmpDir = fs.mkdtempSync('/tmp/figma-dsl-');

  try {
    // Compile
    const mod = await import(resolve(dslPath));
    const api = new VirtualFigmaApi();
    const root = await mod.default(api);

    const measurer = new TextMeasurer();
    measurer.loadFont(resolve(FONT_DIR, 'InterVariable.ttf'), 'Inter', 400);
    const resolver = new LayoutResolver(measurer);
    resolver.resolve(root);

    const compiler = new Compiler();
    const result = compiler.compile(root);

    // Render
    const renderer = new Renderer(FONT_DIR);
    const dslPng = resolve(tmpDir, 'dsl.png');
    await renderer.render(result.root, dslPng, { scale: options.scale ?? 1 });
    console.log('Stage: compile+render complete');

    // Capture
    const capturer = new Capturer();
    const viewport = parseViewport(options.viewport ?? '1200x800');
    const reactPng = resolve(tmpDir, 'react.png');
    await capturer.captureUrl(componentPath, reactPng, { viewport });
    console.log('Stage: capture complete');

    // Compare
    const comparator = new Comparator();
    const diffPng = options.output ?? resolve(tmpDir, 'diff.png');
    const compareResult = await comparator.compare(dslPng, reactPng, diffPng, {
      failThreshold: options.threshold,
    });
    console.log(`Similarity: ${compareResult.similarity.toFixed(2)}%`);
    if (!compareResult.passed) process.exit(1);
  } catch (error) {
    console.error(`Pipeline failed: ${error instanceof Error ? error.message : error}`);
    process.exit(2);
  }
}

async function bundle(dslPath: string, output?: string): Promise<void> {
  const esbuild = await import('esbuild');
  const outPath = output ?? dslPath.replace(/\.ts$/, '.bundle.js');
  await esbuild.build({
    entryPoints: [resolve(dslPath)],
    bundle: true,
    outfile: outPath,
    format: 'iife',
    platform: 'browser',
    external: ['figma-dsl'],
  });
  console.log(`Bundled to ${outPath}`);
}

async function doctor(tokensPath?: string): Promise<void> {
  console.log('figma-dsl doctor');
  console.log(`  Node.js: ${process.version}`);
  const nodeVersion = parseInt(process.version.slice(1), 10);
  console.log(`  Node.js >= 22: ${nodeVersion >= 22 ? 'OK' : 'FAIL'}`);

  const fontPath = resolve(FONT_DIR, 'InterVariable.ttf');
  const fontExists = fs.existsSync(fontPath);
  console.log(`  Inter font: ${fontExists ? 'OK' : 'MISSING'}`);

  if (tokensPath) {
    const tokensExist = fs.existsSync(tokensPath);
    console.log(`  tokens.css: ${tokensExist ? 'OK' : 'MISSING'}`);
  }
}

function parseViewport(str: string): { width: number; height: number } {
  const [w, h] = str.split('x').map(Number);
  return { width: w ?? 1200, height: h ?? 800 };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log('Usage: figma-dsl <command> [options]');
    console.log('Commands: compile, render, capture, compare, pipeline, bundle, doctor');
    process.exit(0);
  }

  const remaining = args.slice(1);

  try {
    switch (command) {
      case 'compile': {
        const { values, positionals } = parseArgs({
          args: remaining,
          options: { output: { type: 'string', short: 'o' } },
          allowPositionals: true,
        });
        await compile(positionals[0]!, values.output);
        break;
      }
      case 'render': {
        const { values, positionals } = parseArgs({
          args: remaining,
          options: {
            output: { type: 'string', short: 'o' },
            scale: { type: 'string', short: 's' },
            bg: { type: 'string' },
          },
          allowPositionals: true,
        });
        await render(positionals[0]!, {
          output: values.output,
          scale: values.scale ? Number(values.scale) : undefined,
          bg: values.bg,
        });
        break;
      }
      case 'capture': {
        const { values, positionals } = parseArgs({
          args: remaining,
          options: {
            output: { type: 'string', short: 'o' },
            viewport: { type: 'string', short: 'v' },
            props: { type: 'string', short: 'p' },
          },
          allowPositionals: true,
        });
        await capture(positionals[0]!, {
          output: values.output,
          viewport: values.viewport,
          props: values.props,
        });
        break;
      }
      case 'compare': {
        const { values, positionals } = parseArgs({
          args: remaining,
          options: {
            output: { type: 'string', short: 'o' },
            threshold: { type: 'string', short: 't' },
          },
          allowPositionals: true,
        });
        await compare(positionals[0]!, positionals[1]!, {
          output: values.output,
          threshold: values.threshold ? Number(values.threshold) : undefined,
        });
        break;
      }
      case 'pipeline': {
        const { values, positionals } = parseArgs({
          args: remaining,
          options: {
            output: { type: 'string', short: 'o' },
            viewport: { type: 'string', short: 'v' },
            threshold: { type: 'string', short: 't' },
            scale: { type: 'string', short: 's' },
          },
          allowPositionals: true,
        });
        await pipeline(positionals[0]!, positionals[1]!, {
          output: values.output,
          viewport: values.viewport,
          threshold: values.threshold ? Number(values.threshold) : undefined,
          scale: values.scale ? Number(values.scale) : undefined,
        });
        break;
      }
      case 'bundle': {
        const { values, positionals } = parseArgs({
          args: remaining,
          options: { output: { type: 'string', short: 'o' } },
          allowPositionals: true,
        });
        await bundle(positionals[0]!, values.output);
        break;
      }
      case 'doctor': {
        const { values } = parseArgs({
          args: remaining,
          options: { tokens: { type: 'string' } },
          allowPositionals: true,
        });
        await doctor(values.tokens);
        break;
      }
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(2);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(2);
  }
}

main();
