import { existsSync, statSync } from 'fs';
import { join, isAbsolute } from 'path';
import { isSupportedImageFormat } from '@figma-dsl/core';
import type { ValidationRule, ValidationContext, ValidationError } from '../types.js';

const SIZE_WARNING_BYTES = 10 * 1024 * 1024; // 10 MB

/** Extract image source strings from image() and imageFill() calls in source code */
function extractImageRefs(content: string): Array<{ src: string; line: number }> {
  const refs: Array<{ src: string; line: number }> = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    // Match image('Name', { src: '...' }) — src property
    const srcMatch = line.match(/src:\s*['"]([^'"]+)['"]/);
    if (srcMatch) {
      refs.push({ src: srcMatch[1]!, line: i + 1 });
    }

    // Match imageFill('...')
    const fillMatch = line.match(/imageFill\(\s*['"]([^'"]+)['"]/);
    if (fillMatch) {
      refs.push({ src: fillMatch[1]!, line: i + 1 });
    }
  }

  return refs;
}

function isValidUrl(src: string): boolean {
  try {
    const url = new URL(src);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export const imageRefsRule: ValidationRule = {
  id: 'image-refs',
  severity: 'warning',

  async validate(context: ValidationContext): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    const content = context.tsxContent;
    const filePath = context.tsxPath ?? context.componentDir;

    if (!content) return errors;

    // Only check files that reference image() or imageFill()
    if (!content.includes('image(') && !content.includes('imageFill(')) {
      return errors;
    }

    const refs = extractImageRefs(content);

    for (const ref of refs) {
      const { src, line } = ref;

      // Check URLs for syntactic correctness
      if (src.startsWith('https://') || src.startsWith('http://')) {
        if (!isValidUrl(src)) {
          errors.push({
            rule: 'image-refs',
            message: `Malformed image URL: ${src}`,
            filePath,
            line,
            severity: 'error',
          });
        }
        continue;
      }

      // Check format support
      if (!isSupportedImageFormat(src)) {
        errors.push({
          rule: 'image-refs',
          message: `Unsupported image format: ${src}. Supported formats: PNG, JPEG, WebP`,
          filePath,
          line,
          severity: 'error',
        });
        continue;
      }

      // Resolve path and check existence
      const resolved = isAbsolute(src)
        ? src
        : join(context.componentDir, src);

      if (!existsSync(resolved)) {
        errors.push({
          rule: 'image-refs',
          message: `Image file not found: ${src}`,
          filePath,
          line,
          severity: 'warning',
        });
        continue;
      }

      // Check file size
      try {
        const stat = statSync(resolved);
        if (stat.size > SIZE_WARNING_BYTES) {
          const sizeMB = (stat.size / 1024 / 1024).toFixed(1);
          errors.push({
            rule: 'image-refs',
            message: `Image file ${src} is ${sizeMB} MB — consider optimizing (recommended max: 10 MB)`,
            filePath,
            line,
            severity: 'warning',
          });
        }
      } catch {
        // stat failure is non-fatal
      }
    }

    return errors;
  },
};
