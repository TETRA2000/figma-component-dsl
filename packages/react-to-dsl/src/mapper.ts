/**
 * Maps a DomSnapshot tree to a DslNode tree.
 *
 * Converts extracted DOM elements with computed CSS styles
 * into the DSL node representation used by @figma-dsl/core.
 */

import type { DslNode, AutoLayoutConfig, Fill, StrokePaint } from '@figma-dsl/core';
import type { DomSnapshot, ExtractedStyles } from './types.js';
import { cssColorToHex, cssColorToOpacity, parseLinearGradient, isTransparent } from './color-utils.js';
import { deriveName } from './naming.js';

/** Warnings collected during mapping */
const warnings: string[] = [];

/**
 * Convert a DomSnapshot tree to a DslNode tree.
 * Returns the root DslNode and any warnings about unsupported features.
 */
export function mapToDsl(snapshot: DomSnapshot, componentName?: string): { node: DslNode; warnings: string[] } {
  warnings.length = 0;
  const node = mapElement(snapshot, 0, componentName);
  return { node, warnings: [...warnings] };
}

function mapElement(snap: DomSnapshot, index: number, nameOverride?: string): DslNode {
  const name = nameOverride ?? deriveName(snap, index);

  // Image element
  if (snap.tag === 'img' && snap.imgSrc) {
    return mapImage(snap, name);
  }

  // Text-only element (leaf node with just text)
  if (snap.isTextOnly && snap.textContent.length > 0) {
    return mapText(snap, name);
  }

  // Container element (div, section, nav, etc.)
  return mapContainer(snap, name);
}

// --- Text Node ---

function mapText(snap: DomSnapshot, _name: string): DslNode {
  const s = snap.styles;
  const content = snap.textContent;

  const fontSize = parsePx(s.fontSize) ?? 16;
  const fontWeight = clampFontWeight(parseInt(s.fontWeight, 10));
  const color = cssColorToHex(s.color);

  const textStyle: Record<string, unknown> = {};
  if (fontSize !== 16) textStyle.fontSize = fontSize;
  if (fontWeight !== 400) textStyle.fontWeight = fontWeight;
  if (color) textStyle.color = color;

  // Text alignment
  const align = mapTextAlign(s.textAlign);
  if (align) textStyle.textAlignHorizontal = align;

  // Line height
  const lh = parseLineHeight(s.lineHeight, fontSize);
  if (lh) textStyle.lineHeight = lh;

  // Letter spacing
  const ls = parseLetterSpacing(s.letterSpacing);
  if (ls) textStyle.letterSpacing = ls;

  // Text decoration
  const td = parseTextDecoration(s.textDecoration);
  if (td) textStyle.textDecoration = td;

  // Build the node
  const node: DslNode = {
    type: 'TEXT',
    name: content,
    characters: content,
    textStyle: Object.keys(textStyle).length > 0 ? textStyle as DslNode['textStyle'] : undefined,
    visible: true,
    opacity: 1,
  };

  // Text color as fill (preserve alpha/opacity)
  if (color) {
    const hex = cssColorToHex(s.color)!;
    const rgba = hexToRgba(hex);
    const colorOpacity = cssColorToOpacity(s.color);
    node.fills = [{ type: 'SOLID', color: rgba, opacity: colorOpacity, visible: true }];
  }

  // Size for constrained text
  if (snap.rect.width > 0 && parsePx(s.maxWidth) !== null) {
    node.size = { x: snap.rect.width, y: 0 };
    node.textAutoResize = 'HEIGHT';
  }

  return node;
}

// --- Image Node ---

function mapImage(snap: DomSnapshot, name: string): DslNode {
  return {
    type: 'IMAGE',
    name,
    visible: true,
    opacity: parseFloat(snap.styles.opacity) || 1,
    size: { x: snap.rect.width, y: snap.rect.height },
    imageSrc: snap.imgSrc ?? '',
    imageScaleMode: 'FILL',
  };
}

// --- Container Node ---

function mapContainer(snap: DomSnapshot, name: string): DslNode {
  const s = snap.styles;
  const isFlex = s.display === 'flex' || s.display === 'inline-flex';
  const isGrid = s.display === 'grid';

  // Map children
  const children: DslNode[] = snap.children.map((child, i) =>
    mapElement(child, i)
  );

  // Build auto-layout config
  let autoLayout: AutoLayoutConfig | undefined;
  if (isFlex) {
    autoLayout = mapAutoLayout(s);
  } else if (isGrid) {
    warnings.push(`Grid layout not supported on "${name}" — converted to vertical stack`);
    autoLayout = mapBlockAutoLayout(s);
  } else if (children.length > 0) {
    // Block layout with children → treat as vertical auto-layout
    // Block-level elements stack vertically by default
    autoLayout = mapBlockAutoLayout(s, snap.children);
  }

  // Fills
  const fills = mapFills(s);

  // Strokes
  const strokes = mapStrokes(s);

  // Corner radius
  const { cornerRadius, cornerRadii } = mapCornerRadius(s);

  // Opacity
  const opacity = parseFloat(s.opacity);

  // Clip content
  const clipContent = s.overflow === 'hidden' ? true : undefined;

  // Size — use bounding rect for all containers
  const size = { x: Math.round(snap.rect.width), y: Math.round(snap.rect.height) };

  const node: DslNode = {
    type: 'FRAME',
    name,
    visible: true,
    opacity: opacity !== 1 ? opacity : 1,
    ...(size.x > 0 && { size }),
    ...(autoLayout && { autoLayout }),
    ...(fills && fills.length > 0 && { fills }),
    ...(strokes && strokes.length > 0 && { strokes }),
    ...(cornerRadius !== undefined && { cornerRadius }),
    ...(cornerRadii && { cornerRadii }),
    ...(clipContent && { clipContent }),
    ...(children.length > 0 && { children }),
  };

  // Add child layout sizing props
  addChildLayoutSizing(node, snap);

  return node;
}

// --- Auto-Layout Mapping ---

function mapAutoLayout(s: ExtractedStyles): AutoLayoutConfig {
  const direction: 'HORIZONTAL' | 'VERTICAL' =
    s.flexDirection === 'column' || s.flexDirection === 'column-reverse'
      ? 'VERTICAL'
      : 'HORIZONTAL';

  const config: AutoLayoutConfig = { direction };

  // Spacing (gap)
  const gap = parsePx(s.gap) ?? parsePx(direction === 'HORIZONTAL' ? s.columnGap : s.rowGap);
  if (gap !== null && gap > 0) {
    config.spacing = gap;
  }

  // Padding
  const padTop = parsePx(s.paddingTop) ?? 0;
  const padRight = parsePx(s.paddingRight) ?? 0;
  const padBottom = parsePx(s.paddingBottom) ?? 0;
  const padLeft = parsePx(s.paddingLeft) ?? 0;

  // Use padX/padY for uniform padding, individual otherwise
  if (padTop === padBottom && padLeft === padRight) {
    if (padTop > 0) config.padY = padTop;
    if (padLeft > 0) config.padX = padLeft;
  } else {
    if (padTop > 0) config.padTop = padTop;
    if (padRight > 0) config.padRight = padRight;
    if (padBottom > 0) config.padBottom = padBottom;
    if (padLeft > 0) config.padLeft = padLeft;
  }

  // Primary axis alignment (justify-content)
  config.align = mapJustifyContent(s.justifyContent);

  // Cross axis alignment (align-items)
  config.counterAlign = mapAlignItems(s.alignItems);

  return config;
}

/**
 * Create auto-layout config for block-level containers (non-flex).
 * Block elements stack vertically, so we use VERTICAL direction
 * and capture padding. Also infer spacing from child margins.
 */
function mapBlockAutoLayout(s: ExtractedStyles, children?: DomSnapshot[]): AutoLayoutConfig {
  const config: AutoLayoutConfig = { direction: 'VERTICAL' };

  // Padding
  const padTop = parsePx(s.paddingTop) ?? 0;
  const padRight = parsePx(s.paddingRight) ?? 0;
  const padBottom = parsePx(s.paddingBottom) ?? 0;
  const padLeft = parsePx(s.paddingLeft) ?? 0;

  if (padTop === padBottom && padLeft === padRight) {
    if (padTop > 0) config.padY = padTop;
    if (padLeft > 0) config.padX = padLeft;
  } else {
    if (padTop > 0) config.padTop = padTop;
    if (padRight > 0) config.padRight = padRight;
    if (padBottom > 0) config.padBottom = padBottom;
    if (padLeft > 0) config.padLeft = padLeft;
  }

  // Infer spacing from child margins (marginBottom is most common)
  if (children && children.length > 1) {
    const margins: number[] = [];
    for (const child of children) {
      const mb = parsePx(child.styles.marginBottom) ?? 0;
      const mt = parsePx(child.styles.marginTop) ?? 0;
      const gap = mb > 0 ? mb : mt;
      if (gap > 0) margins.push(gap);
    }
    if (margins.length > 0) {
      // Use the most common margin value as spacing
      const freq = new Map<number, number>();
      for (const m of margins) freq.set(m, (freq.get(m) ?? 0) + 1);
      let bestMargin = margins[0]!;
      let bestCount = 0;
      for (const [m, c] of freq) {
        if (c > bestCount) { bestMargin = m; bestCount = c; }
      }
      config.spacing = bestMargin;
    }
  }

  return config;
}

function mapJustifyContent(jc: string): 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN' {
  switch (jc) {
    case 'center': return 'CENTER';
    case 'flex-end':
    case 'end': return 'MAX';
    case 'space-between': return 'SPACE_BETWEEN';
    case 'space-around':
    case 'space-evenly': return 'SPACE_BETWEEN'; // closest DSL approximation
    case 'flex-start':
    case 'start':
    case 'normal':
    default: return 'MIN';
  }
}

function mapAlignItems(ai: string): 'MIN' | 'CENTER' | 'MAX' {
  switch (ai) {
    case 'center': return 'CENTER';
    case 'flex-end':
    case 'end': return 'MAX';
    case 'flex-start':
    case 'start':
    case 'stretch':
    case 'normal':
    default: return 'MIN';
  }
}

// --- Fill Mapping ---

function mapFills(s: ExtractedStyles): Fill[] {
  const fills: Fill[] = [];

  // Background image (gradient)
  if (s.backgroundImage && s.backgroundImage !== 'none') {
    const gradientInfo = parseLinearGradient(s.backgroundImage);
    if (gradientInfo) {
      fills.push(createGradientFill(gradientInfo));
    }
  }

  // Background color
  if (!isTransparent(s.backgroundColor)) {
    const hex = cssColorToHex(s.backgroundColor);
    const opacity = cssColorToOpacity(s.backgroundColor);
    if (hex) {
      const rgba = hexToRgba(hex);
      fills.push({
        type: 'SOLID',
        color: { ...rgba, a: 1 },
        opacity,
        visible: true,
      });
    }
  }

  return fills;
}

function createGradientFill(info: import('./color-utils.js').GradientInfo): Fill {
  const angleRad = (info.angleDeg * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);

  const gradientStops = info.stops.map(stop => ({
    color: { ...hexToRgba(stop.hex), a: 1 },
    position: stop.position,
  }));

  // Compute gradient transform from angle
  const cx = 0.5;
  const cy = 0.5;
  const gradientTransform: [[number, number, number], [number, number, number]] = [
    [cos, sin, cx * (1 - cos) - cy * sin],
    [-sin, cos, cx * sin + cy * (1 - cos)],
  ];

  return {
    type: 'GRADIENT_LINEAR',
    gradientStops,
    gradientTransform,
    opacity: 1,
    visible: true,
  };
}

// --- Stroke Mapping ---

function mapStrokes(s: ExtractedStyles): StrokePaint[] {
  const strokes: StrokePaint[] = [];

  // Check all border sides
  const sides = [
    { width: s.borderTopWidth, color: s.borderTopColor, style: s.borderTopStyle },
    { width: s.borderRightWidth, color: s.borderRightColor, style: s.borderRightStyle },
    { width: s.borderBottomWidth, color: s.borderBottomColor, style: s.borderBottomStyle },
    { width: s.borderLeftWidth, color: s.borderLeftColor, style: s.borderLeftStyle },
  ];

  // Find the most common border (DSL doesn't support per-side borders)
  const validSides = sides.filter(side => {
    const w = parsePx(side.width);
    return w !== null && w > 0 && side.style !== 'none' && !isTransparent(side.color);
  });

  if (validSides.length > 0) {
    // Use the first valid side as the stroke
    const side = validSides[0]!;
    const weight = parsePx(side.width) ?? 1;
    const hex = cssColorToHex(side.color);
    if (hex) {
      strokes.push({
        color: hexToRgba(hex),
        weight,
        align: 'INSIDE' as const,
      });
    }
  }

  return strokes;
}

// --- Corner Radius ---

function mapCornerRadius(s: ExtractedStyles): {
  cornerRadius?: number;
  cornerRadii?: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
} {
  const tl = parsePx(s.borderTopLeftRadius) ?? 0;
  const tr = parsePx(s.borderTopRightRadius) ?? 0;
  const bl = parsePx(s.borderBottomLeftRadius) ?? 0;
  const br = parsePx(s.borderBottomRightRadius) ?? 0;

  // All zero → no radius
  if (tl === 0 && tr === 0 && bl === 0 && br === 0) {
    return {};
  }

  // All equal → uniform radius
  if (tl === tr && tr === bl && bl === br) {
    return { cornerRadius: tl };
  }

  // Per-corner
  return {
    cornerRadii: { topLeft: tl, topRight: tr, bottomLeft: bl, bottomRight: br },
  };
}

// --- Size Mapping ---


// --- Child Layout Sizing ---

function addChildLayoutSizing(node: DslNode, snap: DomSnapshot): void {
  const s = snap.styles;

  const flexGrow = parseFloat(s.flexGrow);
  if (flexGrow > 0) {
    node.layoutGrow = flexGrow;
  }

  // Check if width is 100% (fill parent)
  if (s.width === '100%' || s.flexBasis === '100%') {
    node.layoutSizingHorizontal = 'FILL';
  }

  if (s.height === '100%') {
    node.layoutSizingVertical = 'FILL';
  }
}

// --- Utility Functions ---

function parsePx(value: string | undefined | null): number | null {
  if (!value) return null;
  const match = value.match(/^([\d.]+)px$/);
  if (match) return Math.round(parseFloat(match[1]!));

  // Handle 'normal' and other non-numeric values
  if (value === '0') return 0;
  return null;
}

function clampFontWeight(weight: number): 400 | 500 | 600 | 700 {
  if (isNaN(weight) || weight < 450) return 400;
  if (weight < 550) return 500;
  if (weight < 650) return 600;
  return 700;
}

function mapTextAlign(textAlign: string): 'LEFT' | 'CENTER' | 'RIGHT' | undefined {
  switch (textAlign) {
    case 'center': return 'CENTER';
    case 'right':
    case 'end': return 'RIGHT';
    case 'left':
    case 'start':
    default: return undefined; // LEFT is default, omit
  }
}

function parseLineHeight(lh: string, fontSize: number): { value: number; unit: 'PERCENT' | 'PIXELS' } | undefined {
  const px = parsePx(lh);
  if (px !== null && px !== fontSize) {
    // Convert to percentage of font size
    const pct = Math.round((px / fontSize) * 100);
    if (pct !== 100 && pct !== 0) {
      return { value: pct, unit: 'PERCENT' };
    }
  }
  return undefined;
}

function parseLetterSpacing(ls: string): { value: number; unit: 'PIXELS' } | undefined {
  if (!ls || ls === 'normal' || ls === '0px') return undefined;
  const px = parsePx(ls);
  if (px !== null && px !== 0) {
    return { value: px, unit: 'PIXELS' };
  }
  return undefined;
}

function parseTextDecoration(td: string): 'UNDERLINE' | 'STRIKETHROUGH' | undefined {
  if (!td || td === 'none') return undefined;
  if (td.includes('underline')) return 'UNDERLINE';
  if (td.includes('line-through')) return 'STRIKETHROUGH';
  return undefined;
}

function hexToRgba(hex: string): { r: number; g: number; b: number; a: number } {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return { r, g, b, a: 1 };
}
