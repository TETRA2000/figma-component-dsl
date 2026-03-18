/**
 * Smart node naming from DOM elements.
 *
 * Derives meaningful names for DSL nodes from:
 * 1. data-name attribute (explicit)
 * 2. id attribute
 * 3. CSS class names (stripping module hashes)
 * 4. Semantic HTML tags
 * 5. Fallback: tag + index
 */

import type { DomSnapshot } from './types.js';

/** Semantic tag → name mapping */
const SEMANTIC_TAGS: Record<string, string> = {
  header: 'Header',
  nav: 'Navigation',
  main: 'Main',
  footer: 'Footer',
  section: 'Section',
  article: 'Article',
  aside: 'Sidebar',
  h1: 'Heading',
  h2: 'Heading',
  h3: 'Heading',
  h4: 'Heading',
  h5: 'Heading',
  h6: 'Heading',
  ul: 'List',
  ol: 'List',
  li: 'ListItem',
  button: 'Button',
  a: 'Link',
  img: 'Image',
  form: 'Form',
  input: 'Input',
  label: 'Label',
  table: 'Table',
  figure: 'Figure',
};

/**
 * Derive a meaningful name for a DSL node from a DOM snapshot.
 */
export function deriveName(snapshot: DomSnapshot, index: number): string {
  // 1. Explicit data-name (future-proof)
  // Not available from computed styles, but could be added as a data attribute

  // 2. id attribute
  if (snapshot.id) {
    return toPascalCase(snapshot.id);
  }

  // 3. CSS class names (strip module hashes)
  const cleanClasses = cleanClassNames(snapshot.className);
  if (cleanClasses.length > 0) {
    // Use the most meaningful class (longest, most descriptive)
    const best = cleanClasses
      .filter(c => c.length > 1 && !isUtilityClass(c))
      .sort((a, b) => b.length - a.length)[0];
    if (best) {
      return toPascalCase(best);
    }
  }

  // 4. Semantic HTML tags
  const semantic = SEMANTIC_TAGS[snapshot.tag];
  if (semantic) {
    return index > 0 ? `${semantic}${index + 1}` : semantic;
  }

  // 5. For text-only elements, use truncated text content
  if (snapshot.isTextOnly && snapshot.textContent.length > 0) {
    const truncated = snapshot.textContent.slice(0, 20).trim();
    if (truncated.length > 0) {
      return toPascalCase(truncated.replace(/[^a-zA-Z0-9\s]/g, '').trim()) || `Text${index + 1}`;
    }
  }

  // 6. Fallback
  const tagName = snapshot.tag.charAt(0).toUpperCase() + snapshot.tag.slice(1);
  return `${tagName}${index + 1}`;
}

/**
 * Clean CSS module class names by stripping hash suffixes.
 * e.g. "button_abc123 primary_def456" → ["button", "primary"]
 */
function cleanClassNames(className: string): string[] {
  if (!className) return [];

  return className
    .split(/\s+/)
    .filter(Boolean)
    .map(cls => {
      // Strip CSS Module hash suffix (e.g., _abc123, _1a2b3c)
      const cleaned = cls.replace(/_[a-zA-Z0-9]{5,}$/, '');
      // Also handle kebab-case module hashes
      return cleaned.replace(/-[a-zA-Z0-9]{5,}$/, '');
    })
    .filter(cls => cls.length > 0);
}

/**
 * Check if a class name is a utility/layout class (not useful for naming).
 */
function isUtilityClass(cls: string): boolean {
  const utilities = new Set([
    'flex', 'grid', 'block', 'inline', 'hidden',
    'row', 'col', 'column',
    'center', 'left', 'right',
    'w', 'h', 'p', 'm', 'gap',
    'text', 'font', 'bg',
  ]);
  return utilities.has(cls.toLowerCase());
}

/**
 * Convert a string to PascalCase.
 * "my-component" → "MyComponent"
 * "some_class_name" → "SomeClassName"
 */
function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
