import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..', '..', '..', '..');

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(resolve(root, path), 'utf-8'));
}

describe('Monorepo workspace structure', () => {
  it('root package.json defines all workspace packages', () => {
    const pkg = readJson('package.json') as { workspaces: string[] };
    const expected = [
      'packages/dsl-core',
      'packages/compiler',
      'packages/capturer',
      'packages/comparator',
      'packages/exporter',
      'packages/plugin',
      'packages/cli',
    ];
    expect(pkg.workspaces).toEqual(expected);
  });

  it('root package.json is private and ESM', () => {
    const pkg = readJson('package.json') as { private: boolean; type: string };
    expect(pkg.private).toBe(true);
    expect(pkg.type).toBe('module');
  });

  const packages = [
    'dsl-core',
    'compiler',
    'capturer',
    'comparator',
    'exporter',
    'plugin',
    'cli',
  ];

  for (const name of packages) {
    it(`packages/${name} has package.json with correct name`, () => {
      const pkg = readJson(`packages/${name}/package.json`) as { name: string; type: string };
      const expectedName = name === 'dsl-core' ? '@figma-dsl/core' : `@figma-dsl/${name}`;
      expect(pkg.name).toBe(expectedName);
      expect(pkg.type).toBe('module');
    });

    it(`packages/${name} has tsconfig.json extending base`, () => {
      const tsconfig = readJson(`packages/${name}/tsconfig.json`) as { extends: string };
      expect(tsconfig.extends).toBe('../../tsconfig.base.json');
    });

    it(`packages/${name} has src/index.ts entry point`, () => {
      expect(existsSync(resolve(root, `packages/${name}/src/index.ts`))).toBe(true);
    });
  }
});

describe('Shared TypeScript configuration', () => {
  it('tsconfig.base.json has strict mode and ES2023 target', () => {
    const tsconfig = readJson('tsconfig.base.json') as {
      compilerOptions: {
        target: string;
        strict: boolean;
        module: string;
        moduleResolution: string;
      };
    };
    expect(tsconfig.compilerOptions.target).toBe('ES2023');
    expect(tsconfig.compilerOptions.strict).toBe(true);
    expect(tsconfig.compilerOptions.module).toBe('NodeNext');
    expect(tsconfig.compilerOptions.moduleResolution).toBe('NodeNext');
  });
});

describe('Vitest configuration', () => {
  it('vitest.config.ts exists at root', () => {
    expect(existsSync(resolve(root, 'vitest.config.ts'))).toBe(true);
  });

  it('root package.json has vitest as devDependency', () => {
    const pkg = readJson('package.json') as { devDependencies: Record<string, string> };
    expect(pkg.devDependencies).toHaveProperty('vitest');
  });

  it('root package.json has typescript as devDependency', () => {
    const pkg = readJson('package.json') as { devDependencies: Record<string, string> };
    expect(pkg.devDependencies).toHaveProperty('typescript');
  });
});

describe('Inter font files', () => {
  const fonts = [
    'Inter-Regular.otf',
    'Inter-Medium.otf',
    'Inter-SemiBold.otf',
    'Inter-Bold.otf',
  ];

  for (const font of fonts) {
    it(`dsl-core/fonts/${font} exists`, () => {
      expect(existsSync(resolve(root, `packages/dsl-core/fonts/${font}`))).toBe(true);
    });
  }
});

describe('Package dependencies', () => {
  it('compiler depends on @figma-dsl/core', () => {
    const pkg = readJson('packages/compiler/package.json') as {
      dependencies: Record<string, string>;
    };
    expect(pkg.dependencies).toHaveProperty('@figma-dsl/core');
  });

  it('cli depends on core, compiler, capturer, comparator, exporter', () => {
    const pkg = readJson('packages/cli/package.json') as {
      dependencies: Record<string, string>;
    };
    expect(pkg.dependencies).toHaveProperty('@figma-dsl/core');
    expect(pkg.dependencies).toHaveProperty('@figma-dsl/compiler');
    expect(pkg.dependencies).toHaveProperty('@figma-dsl/capturer');
    expect(pkg.dependencies).toHaveProperty('@figma-dsl/comparator');
    expect(pkg.dependencies).toHaveProperty('@figma-dsl/exporter');
  });

  it('exporter depends on core and compiler', () => {
    const pkg = readJson('packages/exporter/package.json') as {
      dependencies: Record<string, string>;
    };
    expect(pkg.dependencies).toHaveProperty('@figma-dsl/core');
    expect(pkg.dependencies).toHaveProperty('@figma-dsl/compiler');
  });
});
