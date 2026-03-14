import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { main, compileCommand, doctorCommand } from './cli.js';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';

// ─── parseArgs / subcommand routing ──────────────────────────

describe('CLI — subcommand routing', () => {
  let exitSpy: ReturnType<typeof vi.spyOn>;
  let stderrSpy: ReturnType<typeof vi.spyOn>;
  let stdoutSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit');
    }) as never);
    stderrSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    stdoutSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    exitSpy.mockRestore();
    stderrSpy.mockRestore();
    stdoutSpy.mockRestore();
  });

  it('should show usage when no args', async () => {
    await main([]);
    expect(stdoutSpy).toHaveBeenCalledWith(expect.stringContaining('figma-dsl'));
  });

  it('should show usage on --help', async () => {
    await main(['--help']);
    expect(stdoutSpy).toHaveBeenCalledWith(expect.stringContaining('Commands:'));
  });

  it('should error on unknown command', async () => {
    await expect(main(['nonexistent'])).rejects.toThrow('process.exit');
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('Unknown command'));
  });

  it('should error when compile called without input', async () => {
    await expect(main(['compile'])).rejects.toThrow('process.exit');
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('Usage'));
  });

  it('should error when compile called with non-existent file', async () => {
    await expect(main(['compile', '/tmp/nonexistent-file-xyz.dsl.ts'])).rejects.toThrow('process.exit');
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('not found'));
  });

  it('should error when render called without required flags', async () => {
    await expect(main(['render'])).rejects.toThrow('process.exit');
  });

  it('should error when compare called without images', async () => {
    await expect(main(['compare'])).rejects.toThrow('process.exit');
  });

  it('should error when bundle called without output', async () => {
    await expect(main(['bundle'])).rejects.toThrow('process.exit');
  });
});

// ─── doctor command ──────────────────────────────────────────

describe('CLI — doctor command', () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should return an array of checks', async () => {
    const checks = await doctorCommand();
    expect(Array.isArray(checks)).toBe(true);
    expect(checks.length).toBeGreaterThanOrEqual(1);
  });

  it('should check Node.js version', async () => {
    const checks = await doctorCommand();
    const nodeCheck = checks.find(c => c.name === 'Node.js');
    expect(nodeCheck).toBeDefined();
    expect(nodeCheck!.status).toBe('ok'); // we're running on Node 22+
    expect(nodeCheck!.message).toContain(process.versions.node);
  });

  it('should check Python availability', async () => {
    const checks = await doctorCommand();
    const pyCheck = checks.find(c => c.name === 'Python');
    expect(pyCheck).toBeDefined();
    // Status depends on environment, but check should exist
    expect(['ok', 'fail']).toContain(pyCheck!.status);
  });

  it('should include PyCairo and Inter font checks', async () => {
    const checks = await doctorCommand();
    const names = checks.map(c => c.name);
    expect(names).toContain('PyCairo');
    expect(names).toContain('Inter font');
  });
});

// ─── compile command integration ─────────────────────────────

describe('CLI — compile command', () => {
  let tmpDir: string;
  let logSpy: ReturnType<typeof vi.spyOn>;
  let exitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'figma-dsl-test-'));
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit');
    }) as never);
  });

  afterEach(() => {
    logSpy.mockRestore();
    exitSpy.mockRestore();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('should compile a simple DSL file to JSON output', async () => {
    // Create a minimal DSL module
    const dslContent = `
export default async function build(api) {
  const frame = api.createFrame();
  frame.name = 'TestFrame';
  frame.resize(200, 100);
  return frame;
}
`;
    const dslFile = path.join(tmpDir, 'test.dsl.mjs');
    fs.writeFileSync(dslFile, dslContent);

    const outputFile = path.join(tmpDir, 'output.json');
    await compileCommand([dslFile, '--output', outputFile]);

    expect(fs.existsSync(outputFile)).toBe(true);
    const json = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
    expect(json.name).toBe('TestFrame');
    expect(json.type).toBe('FRAME');
    expect(json.size).toEqual({ x: 200, y: 100 });
  });

  it('should compile to stdout when no output specified', async () => {
    const dslContent = `
export default async function build(api) {
  const frame = api.createFrame();
  frame.name = 'StdoutTest';
  frame.resize(50, 50);
  return frame;
}
`;
    const dslFile = path.join(tmpDir, 'stdout.dsl.mjs');
    fs.writeFileSync(dslFile, dslContent);

    const writeSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    await compileCommand([dslFile]);

    expect(writeSpy).toHaveBeenCalled();
    const output = writeSpy.mock.calls[0][0] as string;
    const json = JSON.parse(output);
    expect(json.name).toBe('StdoutTest');
    writeSpy.mockRestore();
  });

  it('should error on missing DSL file', async () => {
    const stderrSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(compileCommand(['/tmp/does-not-exist.dsl.ts'])).rejects.toThrow('process.exit');
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('not found'));
    stderrSpy.mockRestore();
  });

  it('should error if module has no valid export', async () => {
    const dslContent = `export const something = 42;\n`;
    const dslFile = path.join(tmpDir, 'bad.dsl.mjs');
    fs.writeFileSync(dslFile, dslContent);

    const stderrSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(compileCommand([dslFile])).rejects.toThrow('process.exit');
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('must export'));
    stderrSpy.mockRestore();
  });
});

// ─── Error handling ──────────────────────────────────────────

describe('CLI — error handling', () => {
  let exitSpy: ReturnType<typeof vi.spyOn>;
  let stderrSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('process.exit');
    }) as never);
    stderrSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    exitSpy.mockRestore();
    stderrSpy.mockRestore();
  });

  it('should fail compare with non-existent image1', async () => {
    await expect(main(['compare', '/tmp/no1.png', '/tmp/no2.png']))
      .rejects.toThrow('process.exit');
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('not found'));
  });

  it('should fail render with non-existent input', async () => {
    await expect(main(['render', '/tmp/nonexistent.json', '--output', '/tmp/out.png']))
      .rejects.toThrow('process.exit');
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('not found'));
  });

  it('should fail bundle with non-existent input', async () => {
    await expect(main(['bundle', '/tmp/nonexistent.dsl.ts', '--output', '/tmp/out.js']))
      .rejects.toThrow('process.exit');
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('not found'));
  });
});
