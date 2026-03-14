import { describe, it, expect } from 'vitest';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { VirtualFigmaApi } from './virtual-api.js';
import { solidPaint, setAutoLayout, gradientPaint } from './helpers.js';
import { Compiler } from './compiler.js';

const execFileAsync = promisify(execFile);

function findPython(): string {
  return process.env.FIGMA_DSL_PYTHON ?? 'python3';
}

describe('Compile-to-Render Integration', () => {
  it('should compile a DSL definition and render it via Python subprocess', async () => {
    const api = new VirtualFigmaApi();

    // Build a simple colored frame
    const frame = api.createFrame();
    frame.name = 'TestFrame';
    frame.resize(200, 100);
    frame.fills = [solidPaint('#ff0000')];

    const compiler = new Compiler();
    const result = compiler.compile(frame);
    expect(result.errors).toHaveLength(0);

    // Write JSON to temp file
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-test-'));
    const jsonPath = path.join(tmpDir, 'nodes.json');
    const pngPath = path.join(tmpDir, 'output.png');

    fs.writeFileSync(jsonPath, JSON.stringify(result.root));

    // Render via Python subprocess
    const python = findPython();
    await execFileAsync(python, [
      '-m', 'figma_component_dsl',
      '--input', jsonPath,
      '--output', pngPath,
    ]);

    expect(fs.existsSync(pngPath)).toBe(true);
    const stats = fs.statSync(pngPath);
    expect(stats.size).toBeGreaterThan(0);

    // Cleanup
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('should compile and render a frame with text', async () => {
    const api = new VirtualFigmaApi();

    const frame = api.createFrame();
    frame.name = 'TextFrame';
    frame.resize(300, 100);
    frame.fills = [solidPaint('#ffffff')];
    setAutoLayout(frame, { direction: 'VERTICAL', spacing: 8, padX: 16, padY: 16 });

    const text = await api.createText();
    text.characters = 'Hello World';
    text.fontSize = 24;
    text.fontWeight = 700;
    text.fills = [solidPaint('#000000')];
    frame.appendChild(text);

    const compiler = new Compiler();
    const result = compiler.compile(frame);
    expect(result.errors).toHaveLength(0);

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-test-'));
    const jsonPath = path.join(tmpDir, 'nodes.json');
    const pngPath = path.join(tmpDir, 'output.png');

    fs.writeFileSync(jsonPath, JSON.stringify(result.root));

    const python = findPython();
    await execFileAsync(python, [
      '-m', 'figma_component_dsl',
      '--input', jsonPath,
      '--output', pngPath,
    ]);

    expect(fs.existsSync(pngPath)).toBe(true);

    fs.rmSync(tmpDir, { recursive: true });
  });

  it('should compile and render with gradient fills', async () => {
    const api = new VirtualFigmaApi();

    const frame = api.createFrame();
    frame.name = 'GradientFrame';
    frame.resize(200, 200);
    frame.fills = [gradientPaint([
      { color: '#ff0000', position: 0 },
      { color: '#0000ff', position: 1 },
    ], 45)];

    const compiler = new Compiler();
    const result = compiler.compile(frame);

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-test-'));
    const jsonPath = path.join(tmpDir, 'nodes.json');
    const pngPath = path.join(tmpDir, 'output.png');

    fs.writeFileSync(jsonPath, JSON.stringify(result.root));

    const python = findPython();
    await execFileAsync(python, [
      '-m', 'figma_component_dsl',
      '--input', jsonPath,
      '--output', pngPath,
    ]);

    expect(fs.existsSync(pngPath)).toBe(true);

    fs.rmSync(tmpDir, { recursive: true });
  });

  it('should compile and render with scale factor', async () => {
    const api = new VirtualFigmaApi();

    const frame = api.createFrame();
    frame.name = 'ScaledFrame';
    frame.resize(100, 50);
    frame.fills = [solidPaint('#3b82f6')];

    const compiler = new Compiler();
    const result = compiler.compile(frame);

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-test-'));
    const jsonPath = path.join(tmpDir, 'nodes.json');
    const pngPath = path.join(tmpDir, 'output.png');

    fs.writeFileSync(jsonPath, JSON.stringify(result.root));

    const python = findPython();
    await execFileAsync(python, [
      '-m', 'figma_component_dsl',
      '--input', jsonPath,
      '--output', pngPath,
      '--scale', '2',
    ]);

    expect(fs.existsSync(pngPath)).toBe(true);

    fs.rmSync(tmpDir, { recursive: true });
  });

  it('should propagate renderer errors for invalid JSON', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-test-'));
    const jsonPath = path.join(tmpDir, 'invalid.json');
    const pngPath = path.join(tmpDir, 'output.png');

    fs.writeFileSync(jsonPath, 'not valid json');

    const python = findPython();
    await expect(
      execFileAsync(python, [
        '-m', 'figma_component_dsl',
        '--input', jsonPath,
        '--output', pngPath,
      ]),
    ).rejects.toThrow();

    fs.rmSync(tmpDir, { recursive: true });
  });

  it('should round-trip JSON interchange format correctly', async () => {
    const api = new VirtualFigmaApi();

    const frame = api.createFrame();
    frame.name = 'RoundTrip';
    frame.resize(150, 75);
    frame.fills = [solidPaint('#22c55e')];
    frame.cornerRadius = 8;

    const child = api.createRectangle();
    child.name = 'Inner';
    child.resize(50, 50);
    child.fills = [solidPaint('#000000')];
    frame.appendChild(child);

    const compiler = new Compiler();
    const result = compiler.compile(frame);

    // Verify JSON can be serialized and deserialized
    const json = JSON.stringify(result.root);
    const parsed = JSON.parse(json);

    expect(parsed.type).toBe('FRAME');
    expect(parsed.name).toBe('RoundTrip');
    expect(parsed.size).toEqual({ x: 150, y: 75 });
    expect(parsed.children).toHaveLength(1);
    expect(parsed.children[0].type).toBe('RECTANGLE');
    expect(parsed.children[0].name).toBe('Inner');
    expect(parsed.fillPaints).toHaveLength(1);
    expect(parsed.fillPaints[0].type).toBe('SOLID');
  });
});
