import { describe, it, expect } from 'vitest';
import { run } from './cli.js';

describe('CLI — help', () => {
  it('returns 0 for help command', async () => {
    const code = await run(['help']);
    expect(code).toBe(0);
  });

  it('returns 0 for --help flag', async () => {
    const code = await run(['--help']);
    expect(code).toBe(0);
  });

  it('returns 0 for no arguments', async () => {
    const code = await run([]);
    expect(code).toBe(0);
  });
});

describe('CLI — unknown command', () => {
  it('returns 2 for unknown command', async () => {
    const code = await run(['unknown']);
    expect(code).toBe(2);
  });
});

describe('CLI — compile usage errors', () => {
  it('returns 2 when no file specified', async () => {
    const code = await run(['compile']);
    expect(code).toBe(2);
  });
});

describe('CLI — render usage errors', () => {
  it('returns 2 when no output specified', async () => {
    const code = await run(['render', 'test.dsl.ts']);
    expect(code).toBe(2);
  });
});

describe('CLI — compare usage errors', () => {
  it('returns 2 when fewer than 2 images', async () => {
    const code = await run(['compare', 'a.png']);
    expect(code).toBe(2);
  });
});

describe('CLI — export usage errors', () => {
  it('returns 2 when no output specified', async () => {
    const code = await run(['export', 'test.dsl.ts']);
    expect(code).toBe(2);
  });
});

describe('CLI — pipeline usage errors', () => {
  it('returns 2 when no URL specified', async () => {
    const code = await run(['pipeline', 'test.dsl.ts']);
    expect(code).toBe(2);
  });
});

describe('CLI — validate usage errors', () => {
  it('returns 2 when no path specified', async () => {
    const code = await run(['validate']);
    expect(code).toBe(2);
  });
});
