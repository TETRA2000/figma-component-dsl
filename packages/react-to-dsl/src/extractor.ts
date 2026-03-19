/**
 * Browser-based DOM extraction using Playwright.
 *
 * Navigates to a React component URL, walks the DOM tree,
 * and extracts computed styles from each element using getComputedStyle().
 */

import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import type { DomSnapshot, ExtractOptions, ExtractedStyles } from './types.js';

/** Style properties to extract from each element */
const STYLE_PROPERTIES: (keyof ExtractedStyles)[] = [
  'display', 'flexDirection', 'gap', 'rowGap', 'columnGap',
  'justifyContent', 'alignItems', 'flexGrow', 'flexShrink', 'flexBasis',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'boxSizing',
  'backgroundColor', 'backgroundImage', 'opacity', 'overflow',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  'fontFamily', 'fontSize', 'fontWeight', 'color', 'textAlign',
  'lineHeight', 'letterSpacing', 'textDecoration', 'whiteSpace',
  // Canvas Mode features
  'boxShadow', 'textShadow', 'transform', 'mixBlendMode', 'textTransform',
  // Positioning
  'position', 'top', 'left',
];

/**
 * Extract DOM snapshot from a URL using Playwright.
 * Launches a headless browser, navigates to the URL, and walks the DOM tree.
 */
export async function extractDom(options: ExtractOptions): Promise<DomSnapshot> {
  const selector = options.selector ?? '#root > *';
  const viewportWidth = options.viewportWidth ?? 1280;
  const viewportHeight = options.viewportHeight ?? 720;

  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: viewportWidth, height: viewportHeight },
    });

    await page.goto(options.url, { waitUntil: 'networkidle' });
    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    const snapshot = await extractElement(page, selector);
    if (!snapshot) {
      throw new Error(`No element found for selector: ${selector}`);
    }

    return snapshot;
  } finally {
    if (browser) await browser.close();
  }
}

/**
 * Extract DOM snapshot using an existing Playwright page (for reuse in batch).
 */
export async function extractFromPage(page: Page, selector: string): Promise<DomSnapshot> {
  const snapshot = await extractElement(page, selector);
  if (!snapshot) {
    throw new Error(`No element found for selector: ${selector}`);
  }
  return snapshot;
}

/**
 * Internal: Extract a single element and its children.
 * Runs entirely in the browser context via page.evaluate().
 */
async function extractElement(page: Page, selector: string): Promise<DomSnapshot | null> {
  const styleProps = STYLE_PROPERTIES;

  return await page.evaluate(
    ({ sel, props }) => {
      const root = document.querySelector(sel);
      if (!root || !(root instanceof HTMLElement || root instanceof SVGSVGElement)) return null;

      function walkElement(el: Element): DomSnapshot {
        const computed = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();

        // Extract specified style properties
        const styles: Record<string, string> = {};
        for (const prop of props) {
          styles[prop] = computed.getPropertyValue(
            // Convert camelCase to kebab-case for getPropertyValue
            prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
          );
        }

        // Check if element contains only text (no child elements)
        const childElements = Array.from(el.children).filter(
          child => (child instanceof HTMLElement || child instanceof SVGSVGElement) &&
          getComputedStyle(child).display !== 'none'
        );
        const isTextOnly = childElements.length === 0;

        // Get text content for text-only elements
        let textContent = '';
        if (isTextOnly) {
          textContent = el.textContent?.trim() ?? '';
        }

        // Get img src
        let imgSrc: string | undefined;
        if (el.tagName.toLowerCase() === 'img') {
          imgSrc = (el as HTMLImageElement).src;
        }

        // SVG detection: capture outerHTML and skip child recursion
        let svgContent: string | undefined;
        const isSvg = el instanceof SVGSVGElement;
        if (isSvg) {
          svgContent = (el as SVGSVGElement).outerHTML;
        }

        // Recurse into visible children (skip for SVG — children are vector data)
        const children: DomSnapshot[] = [];
        if (!isSvg) {
          for (const child of childElements) {
            if (child instanceof HTMLElement || child instanceof SVGSVGElement) {
              const childComputed = getComputedStyle(child);
              // Skip hidden elements
              if (childComputed.display === 'none' ||
                  childComputed.visibility === 'hidden' ||
                  childComputed.opacity === '0') {
                continue;
              }
              children.push(walkElement(child));
            }
          }
        }

        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          className: (typeof el.className === 'string' ? el.className : '') || '',
          textContent: isSvg ? '' : textContent,
          isTextOnly: isSvg ? false : isTextOnly,
          styles: styles as unknown as ExtractedStyles,
          rect: {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
          children,
          imgSrc,
          svgContent,
        } satisfies DomSnapshot;
      }

      return walkElement(root);
    },
    { sel: selector, props: styleProps },
  );
}
