import type { DslManifestFile, DslStoryParameters } from './dsl-types';
// Vite handles JSON imports at build time. The staticDirs config serves these files.
// Import with ?url suffix is not needed — Vite bundles JSON inline.
import manifestData from '../../.storybook/dsl-artifacts/manifest.json';

const manifest = manifestData as unknown as DslManifestFile;

function toKebabCase(name: string): string {
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

export function createDslParameters(componentName: string): DslStoryParameters {
  const kebabName = toKebabCase(componentName);
  const artifact = manifest.artifacts[kebabName];

  if (!artifact) {
    return { source: null, compiledJson: null, renderedPngUrl: null, error: null };
  }

  return {
    source: artifact.source ?? null,
    compiledJson: artifact.compiledJson ?? null,
    renderedPngUrl: artifact.pngPath ? `/${artifact.pngPath}` : null,
    error: artifact.error ?? null,
  };
}
