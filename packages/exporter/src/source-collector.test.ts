import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { collectSourceSnapshots } from './source-collector.js';
import * as fs from 'fs';
import * as path from 'path';

vi.mock('fs');

const mockedFs = vi.mocked(fs);

describe('collectSourceSnapshots', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('collects all 3 files when they exist in the component directory', () => {
    mockedFs.existsSync.mockImplementation((p: fs.PathLike) => {
      const s = String(p);
      return s.endsWith('Button.tsx') ||
             s.endsWith('Button.module.css') ||
             s.endsWith('button.dsl.ts');
    });
    mockedFs.readFileSync.mockImplementation((p: fs.PathOrFileDescriptor) => {
      const s = String(p);
      if (s.endsWith('.tsx')) return 'export function Button() {}';
      if (s.endsWith('.module.css')) return '.button { color: red; }';
      if (s.endsWith('.dsl.ts')) return 'export default component("Button", frame())';
      return '';
    });
    mockedFs.statSync.mockReturnValue({ size: 100 } as fs.Stats);

    const result = collectSourceSnapshots('Button', ['src/components']);

    expect(result.react).toBe('export function Button() {}');
    expect(result.css).toBe('.button { color: red; }');
    expect(result.dsl).toBe('export default component("Button", frame())');
    expect(result.paths?.react).toContain('Button.tsx');
    expect(result.paths?.css).toContain('Button.module.css');
    expect(result.paths?.dsl).toContain('button.dsl.ts');
  });

  it('returns partial snapshots when some files are missing', () => {
    mockedFs.existsSync.mockImplementation((p: fs.PathLike) => {
      const s = String(p);
      return s.endsWith('Button.tsx');
    });
    mockedFs.readFileSync.mockReturnValue('export function Button() {}');
    mockedFs.statSync.mockReturnValue({ size: 100 } as fs.Stats);

    const result = collectSourceSnapshots('Button', ['src/components']);

    expect(result.react).toBe('export function Button() {}');
    expect(result.css).toBeUndefined();
    expect(result.dsl).toBeUndefined();
  });

  it('skips files exceeding 50KB with a warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.statSync.mockImplementation((p: fs.PathLike) => {
      const s = String(p);
      if (s.endsWith('.tsx')) return { size: 60_000 } as fs.Stats; // > 50KB
      return { size: 100 } as fs.Stats;
    });
    mockedFs.readFileSync.mockReturnValue('some code');

    const result = collectSourceSnapshots('Button', ['src/components']);

    expect(result.react).toBeUndefined();
    expect(result.css).toBe('some code');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('50KB'));

    warnSpy.mockRestore();
  });

  it('returns empty snapshots for non-existent search paths', () => {
    mockedFs.existsSync.mockReturnValue(false);

    const result = collectSourceSnapshots('Button', ['nonexistent/path']);

    expect(result.react).toBeUndefined();
    expect(result.css).toBeUndefined();
    expect(result.dsl).toBeUndefined();
    expect(result.paths).toBeUndefined();
  });

  it('searches component directories first, then examples for DSL files', () => {
    const checkedPaths: string[] = [];
    mockedFs.existsSync.mockImplementation((p: fs.PathLike) => {
      const s = String(p);
      checkedPaths.push(s);
      // DSL file only exists in examples directory
      return s.includes('examples') && s.endsWith('.dsl.ts');
    });
    mockedFs.readFileSync.mockReturnValue('export default component("Card", frame())');
    mockedFs.statSync.mockReturnValue({ size: 100 } as fs.Stats);

    const result = collectSourceSnapshots('Card', ['src/components'], ['examples']);

    expect(result.dsl).toBe('export default component("Card", frame())');
    expect(result.paths?.dsl).toContain('examples');
  });

  it('records correct file paths in the returned snapshots', () => {
    mockedFs.existsSync.mockImplementation((p: fs.PathLike) => {
      const s = String(p);
      return s.endsWith('Header.tsx') || s.endsWith('Header.module.css');
    });
    mockedFs.readFileSync.mockReturnValue('code');
    mockedFs.statSync.mockReturnValue({ size: 100 } as fs.Stats);

    const result = collectSourceSnapshots('Header', ['src/components']);

    expect(result.paths?.react).toBe(path.join('src/components', 'Header.tsx'));
    expect(result.paths?.css).toBe(path.join('src/components', 'Header.module.css'));
  });
});
