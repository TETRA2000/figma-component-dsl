import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const ARTIFACTS_DIR = resolve(__dirname, '../../.storybook/dsl-artifacts');
const MANIFEST_PATH = resolve(ARTIFACTS_DIR, 'manifest.json');

interface ManifestArtifact {
  componentName: string;
  dslFilePath: string;
  source: string | null;
  compiledJson: string | null;
  sourcePath: string | null;
  jsonPath: string | null;
  pngPath: string | null;
  error: string | null;
}

interface Manifest {
  generatedAt: string;
  artifacts: Record<string, ManifestArtifact>;
}

describe('DSL Artifact Generation (integration)', () => {
  let manifest: Manifest;

  beforeAll(() => {
    if (!existsSync(MANIFEST_PATH)) {
      throw new Error(
        'Manifest not found. Run `node scripts/generate-dsl-artifacts.mjs` first.',
      );
    }
    manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
  });

  it('generates a valid manifest with generatedAt timestamp', () => {
    expect(manifest.generatedAt).toBeDefined();
    expect(new Date(manifest.generatedAt).toISOString()).toBe(manifest.generatedAt);
  });

  it('produces artifacts for known DSL files', () => {
    const names = Object.keys(manifest.artifacts);
    expect(names).toContain('button');
    expect(names).toContain('card');
    expect(names).toContain('navbar');
    expect(names).toContain('pricing-card');
  });

  it('successful artifacts have source, JSON, and PNG paths', () => {
    const button = manifest.artifacts['button'];
    expect(button).toBeDefined();
    expect(button.error).toBeNull();
    expect(button.source).toBeTruthy();
    expect(button.compiledJson).toBeTruthy();
    expect(button.sourcePath).toBe('button/source.ts');
    expect(button.jsonPath).toBe('button/compiled.json');
    expect(button.pngPath).toBe('button/rendered.png');
  });

  it('artifact files exist on disk for successful components', () => {
    const button = manifest.artifacts['button'];
    expect(existsSync(resolve(ARTIFACTS_DIR, button.sourcePath!))).toBe(true);
    expect(existsSync(resolve(ARTIFACTS_DIR, button.jsonPath!))).toBe(true);
    expect(existsSync(resolve(ARTIFACTS_DIR, button.pngPath!))).toBe(true);
  });

  it('records errors gracefully for failing DSL files', () => {
    const badge = manifest.artifacts['badge-variants'];
    if (badge && badge.error) {
      expect(badge.error).toBeTruthy();
      expect(badge.sourcePath).toBeNull();
      expect(badge.jsonPath).toBeNull();
      expect(badge.pngPath).toBeNull();
    }
  });

  it('compiled JSON parses as valid JSON', () => {
    const button = manifest.artifacts['button'];
    const parsed = JSON.parse(button.compiledJson!);
    expect(parsed).toHaveProperty('type');
    expect(parsed).toHaveProperty('name');
    expect(parsed).toHaveProperty('size');
  });
});
