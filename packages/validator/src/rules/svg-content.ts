import { existsSync } from 'fs';
import { join, isAbsolute } from 'path';
import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

/**
 * Extract svg() calls and their properties from source code.
 * Looks for patterns like:
 *   svg('Name', { svgContent: '...', src: '...' })
 */
function extractSvgCalls(
  content: string,
): Array<{
  line: number;
  hasSvgContent: boolean;
  hasSrc: boolean;
  srcValue?: string;
  hasEffects: boolean;
  hasBlendMode: boolean;
  hasRotation: boolean;
}> {
  const results: Array<{
    line: number;
    hasSvgContent: boolean;
    hasSrc: boolean;
    srcValue?: string;
    hasEffects: boolean;
    hasBlendMode: boolean;
    hasRotation: boolean;
  }> = [];

  const lines = content.split('\n');

  // Find lines with svg( calls — we parse from that point to gather properties
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    // Match svg( call — but not svgContent, svgSrc, etc.
    if (!/\bsvg\s*\(/.test(line)) continue;
    // Exclude lines that are just property names containing "svg"
    if (/^\s*(\/\/|svgContent|svgSrc|svgScaleMode)/.test(line.trim())) continue;

    // Collect the block of text from this line onward (up to 30 lines or closing paren)
    let block = '';
    let parenDepth = 0;
    let started = false;
    for (let j = i; j < Math.min(i + 30, lines.length); j++) {
      block += lines[j] + '\n';
      for (const ch of lines[j]!) {
        if (ch === '(') { parenDepth++; started = true; }
        if (ch === ')') parenDepth--;
      }
      if (started && parenDepth <= 0) break;
    }

    const hasSvgContent = /svgContent\s*:/.test(block);
    const hasSrc = /\bsrc\s*:/.test(block);
    const hasEffects = /effects\s*:/.test(block);
    const hasBlendMode = /blendMode\s*:/.test(block);
    const hasRotation = /rotation\s*:/.test(block);

    let srcValue: string | undefined;
    if (hasSrc) {
      const srcMatch = block.match(/\bsrc\s*:\s*['"]([^'"]+)['"]/);
      if (srcMatch) {
        srcValue = srcMatch[1]!;
      }
    }

    results.push({
      line: i + 1,
      hasSvgContent,
      hasSrc,
      srcValue,
      hasEffects,
      hasBlendMode,
      hasRotation,
    });
  }

  return results;
}

/**
 * Detect whether the DSL file uses canvas mode.
 * Canvas mode is indicated by: export const mode = 'canvas' (or 'banner')
 */
function isCanvasMode(content: string): boolean {
  return /export\s+const\s+mode\s*=\s*['"](?:canvas|banner)['"]/.test(content);
}

export const svgContentRule: ValidationRule = {
  id: 'svg-content',
  severity: 'warning',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const content = context.tsxContent;
    const filePath = context.tsxPath ?? context.componentDir;

    if (!content) return errors;

    // Only check files that reference svg()
    if (!/\bsvg\s*\(/.test(content)) return errors;

    const svgCalls = extractSvgCalls(content);
    const canvasMode = isCanvasMode(content);

    for (const call of svgCalls) {
      // Check content presence: must have svgContent or src
      if (!call.hasSvgContent && !call.hasSrc) {
        errors.push({
          rule: 'svg-content',
          message: 'SVG node must have either svgContent or src defined.',
          filePath,
          line: call.line,
          severity: 'error',
        });
        continue;
      }

      // Check src file existence
      if (call.hasSrc && call.srcValue) {
        const src = call.srcValue;
        // Skip URLs
        if (!src.startsWith('http://') && !src.startsWith('https://')) {
          const resolved = isAbsolute(src)
            ? src
            : join(context.componentDir, src);
          if (!existsSync(resolved)) {
            errors.push({
              rule: 'svg-content',
              message: `SVG source file not found: ${src}`,
              filePath,
              line: call.line,
              severity: 'warning',
            });
          }
        }
      }

      // In standard mode, warn about canvas-only visual properties
      if (!canvasMode) {
        if (call.hasEffects) {
          errors.push({
            rule: 'svg-content',
            message:
              'SVG effects are only fully supported in canvas mode. They may not render correctly in standard mode.',
            filePath,
            line: call.line,
            severity: 'warning',
          });
        }
        if (call.hasBlendMode) {
          errors.push({
            rule: 'svg-content',
            message:
              'SVG blendMode is only fully supported in canvas mode. It may not render correctly in standard mode.',
            filePath,
            line: call.line,
            severity: 'warning',
          });
        }
        if (call.hasRotation) {
          errors.push({
            rule: 'svg-content',
            message:
              'SVG rotation is only fully supported in canvas mode. It may not render correctly in standard mode.',
            filePath,
            line: call.line,
            severity: 'warning',
          });
        }
      }
    }

    return errors;
  },
};
