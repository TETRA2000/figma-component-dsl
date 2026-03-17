import type { SourceSnapshots } from '@figma-dsl/core';
import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const MAX_FILE_SIZE = 50 * 1024; // 50KB

interface FileCandidate {
  readonly name: string;
  readonly key: 'react' | 'css' | 'dsl';
}

function getFileCandidates(componentName: string): FileCandidate[] {
  const lowerName = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  return [
    { name: `${componentName}.tsx`, key: 'react' },
    { name: `${componentName}.module.css`, key: 'css' },
    { name: `${lowerName}.dsl.ts`, key: 'dsl' },
  ];
}

function tryReadFile(filePath: string): string | undefined {
  if (!existsSync(filePath)) return undefined;

  const stat = statSync(filePath);
  if (stat.size > MAX_FILE_SIZE) {
    console.warn(`Skipping ${filePath}: file size ${stat.size} bytes exceeds 50KB limit`);
    return undefined;
  }

  return readFileSync(filePath, 'utf-8');
}

export function collectSourceSnapshots(
  componentName: string,
  searchDirs: readonly string[],
  extraDslDirs: readonly string[] = [],
): SourceSnapshots {
  const candidates = getFileCandidates(componentName);
  const result: { react?: string; css?: string; dsl?: string } = {};
  const paths: { react?: string; css?: string; dsl?: string } = {};

  for (const dir of searchDirs) {
    for (const candidate of candidates) {
      if (result[candidate.key] !== undefined) continue;

      const filePath = join(dir, candidate.name);
      const content = tryReadFile(filePath);
      if (content !== undefined) {
        result[candidate.key] = content;
        paths[candidate.key] = filePath;
      }
    }
  }

  // Search extra directories for DSL files if not found yet
  if (result.dsl === undefined) {
    const dslCandidate = candidates.find(c => c.key === 'dsl')!;
    for (const dir of extraDslDirs) {
      const filePath = join(dir, dslCandidate.name);
      const content = tryReadFile(filePath);
      if (content !== undefined) {
        result.dsl = content;
        paths.dsl = filePath;
        break;
      }
    }
  }

  const hasPaths = paths.react || paths.css || paths.dsl;

  return {
    ...result,
    ...(hasPaths ? { paths } : {}),
  };
}
