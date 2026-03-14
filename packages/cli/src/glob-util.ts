import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

/**
 * Simple glob utility that finds .dsl.ts files.
 * Supports directory paths (recursively finds .dsl.ts files)
 * and basic glob patterns ending with *.dsl.ts or **\/*.dsl.ts.
 */
export function glob(pattern: string): string[] {
  const resolved = resolve(pattern);

  try {
    const stat = statSync(resolved);
    if (stat.isDirectory()) {
      return findDslFiles(resolved);
    }
    if (stat.isFile() && resolved.endsWith('.dsl.ts')) {
      return [resolved];
    }
  } catch {
    // Not a direct path — treat as glob-like pattern
  }

  // If pattern contains * or **, try to resolve the base directory
  if (pattern.includes('*')) {
    const baseParts = pattern.split(/[*]/);
    const baseDir = resolve(baseParts[0]!);
    try {
      if (statSync(baseDir).isDirectory()) {
        return findDslFiles(baseDir);
      }
    } catch {
      // Base directory doesn't exist
    }
  }

  return [];
}

function findDslFiles(dir: string): string[] {
  const results: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...findDslFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.dsl.ts')) {
        results.push(fullPath);
      }
    }
  } catch {
    // Skip directories we can't read
  }

  return results;
}
