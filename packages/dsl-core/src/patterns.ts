import type { DslNode, Fill, StrokePaint } from './types.js';
import { frame, text, rectangle } from './nodes.js';
import { solid } from './colors.js';
import { horizontal, vertical } from './layout.js';

/**
 * Card — a frame with clipContent, cornerRadius, and vertical layout.
 */
export function card(
  name: string,
  opts: {
    width?: number;
    fills?: Fill[];
    cornerRadius?: number;
    spacing?: number;
    padX?: number;
    padY?: number;
    children?: DslNode[];
    strokes?: StrokePaint[];
  } = {},
): DslNode {
  return frame(name, {
    size: opts.width ? { x: opts.width, y: 0 } : undefined,
    fills: opts.fills ?? [solid('#FFFFFF')],
    cornerRadius: opts.cornerRadius ?? 12,
    clipContent: true,
    strokes: opts.strokes,
    autoLayout: vertical({
      spacing: opts.spacing ?? 12,
      padX: opts.padX ?? 16,
      padY: opts.padY ?? 16,
      heightSizing: 'HUG',
      ...(opts.width ? { widthSizing: 'FIXED' } : {}),
    }),
    children: opts.children,
  });
}

/**
 * Badge — a small pill-shaped frame with text.
 */
export function badge(
  label: string,
  bgColor = '#7C3AED',
  textColor = '#FFFFFF',
  opts: { fontSize?: number; padX?: number; padY?: number } = {},
): DslNode {
  return frame(`Badge: ${label}`, {
    fills: [solid(bgColor)],
    cornerRadius: 9999,
    autoLayout: horizontal({
      padX: opts.padX ?? 10,
      padY: opts.padY ?? 4,
      align: 'CENTER',
      counterAlign: 'CENTER',
      widthSizing: 'HUG',
      heightSizing: 'HUG',
    }),
    children: [
      text(label, { fontSize: opts.fontSize ?? 12, fontWeight: 500, color: textColor }),
    ],
  });
}

/**
 * StatBlock — a vertical frame with a large value and small label.
 */
export function statBlock(
  value: string,
  label: string,
  opts: { valueColor?: string; labelColor?: string; fontSize?: number } = {},
): DslNode {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({
      spacing: 4,
      align: 'CENTER',
      counterAlign: 'CENTER',
      widthSizing: 'HUG',
      heightSizing: 'HUG',
    }),
    children: [
      text(value, {
        fontSize: opts.fontSize ?? 32,
        fontWeight: 700,
        color: opts.valueColor ?? '#000000',
      }),
      text(label, {
        fontSize: 12,
        fontWeight: 400,
        color: opts.labelColor ?? '#6B7280',
      }),
    ],
  });
}

/**
 * NavBar — a horizontal SPACE_BETWEEN layout with brand and links.
 */
export function navBar(
  brand: string,
  links: string[],
  opts: {
    width?: number;
    bgColor?: string;
    textColor?: string;
    padX?: number;
    padY?: number;
  } = {},
): DslNode {
  const textColor = opts.textColor ?? '#111827';
  return frame('NavBar', {
    size: { x: opts.width ?? 1440, y: 0 },
    fills: opts.bgColor ? [solid(opts.bgColor)] : undefined,
    autoLayout: horizontal({
      padX: opts.padX ?? 32,
      padY: opts.padY ?? 16,
      align: 'SPACE_BETWEEN',
      counterAlign: 'CENTER',
      widthSizing: 'FIXED',
      heightSizing: 'HUG',
    }),
    children: [
      text(brand, { fontSize: 18, fontWeight: 700, color: textColor }),
      frame('NavLinks', {
        autoLayout: horizontal({
          spacing: 24,
          counterAlign: 'CENTER',
          widthSizing: 'HUG',
          heightSizing: 'HUG',
        }),
        children: links.map(link =>
          text(link, { fontSize: 14, fontWeight: 400, color: textColor })
        ),
      }),
    ],
  });
}

/**
 * SectionHeader — a padded frame with a large title.
 */
export function sectionHeader(
  title: string,
  opts: { fontSize?: number; color?: string; padX?: number; padY?: number } = {},
): DslNode {
  return frame(`Section: ${title}`, {
    autoLayout: vertical({
      padX: opts.padX ?? 0,
      padY: opts.padY ?? 0,
      widthSizing: 'HUG',
      heightSizing: 'HUG',
    }),
    children: [
      text(title, {
        fontSize: opts.fontSize ?? 28,
        fontWeight: 700,
        color: opts.color ?? '#111827',
      }),
    ],
  });
}

/**
 * Divider — a thin horizontal line spanning full width.
 */
export function divider(color = '#E5E7EB', height = 1): DslNode {
  return rectangle('Divider', {
    size: { x: 0, y: height },
    fills: [solid(color)],
    layoutSizingHorizontal: 'FILL',
  });
}
