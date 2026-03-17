/**
 * Test page generator — produces 200 self-contained React TSX pages
 * across 18 categories for the React-to-DSL conversion pipeline.
 *
 * Each generated file is a standalone React component that can be
 * served by the test server and rendered in a browser.
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { buildRegistry } from './test-registry.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

/** Wrap a React component body in a full TSX file with default export. */
function wrapComponent(name: string, body: string): string {
  const safeName = name.replace(/-/g, '_');
  return `export default function ${safeName}() {
  return (
${body}
  );
}
`;
}

/** Create a root div with data-testid for extraction. */
function root(style: string, children: string): string {
  return `    <div data-testid="root" style={${style}}>
${children}
    </div>`;
}

/** Create a styled div. */
function div(style: string, children: string, indent = 6): string {
  const pad = ' '.repeat(indent);
  return `${pad}<div style={${style}}>
${children}
${pad}</div>`;
}

/** Create a styled text span. */
function span(text: string, style?: string, indent = 8): string {
  const pad = ' '.repeat(indent);
  if (style) {
    return `${pad}<span style={${style}}>${text}</span>`;
  }
  return `${pad}<span>${text}</span>`;
}

/** Create a styled paragraph. */
function p(text: string, style?: string, indent = 8): string {
  const pad = ' '.repeat(indent);
  if (style) {
    return `${pad}<p style={${style}}>${text}</p>`;
  }
  return `${pad}<p>${text}</p>`;
}

/** Create a heading. */
function h(level: number, text: string, style?: string, indent = 8): string {
  const pad = ' '.repeat(indent);
  const tag = `h${level}`;
  if (style) {
    return `${pad}<${tag} style={${style}}>${text}</${tag}>`;
  }
  return `${pad}<${tag}>${text}</${tag}>`;
}

// ---------------------------------------------------------------------------
// Category generators
// ---------------------------------------------------------------------------

type PageGenerator = (variant: number, total: number) => string;

const generators: Record<string, PageGenerator> = {
  'layout-horizontal': generateLayoutHorizontal,
  'layout-vertical': generateLayoutVertical,
  'layout-nested': generateLayoutNested,
  'layout-sizing': generateLayoutSizing,
  'typography': generateTypography,
  'colors-solid': generateColorsSolid,
  'colors-gradient': generateColorsGradient,
  'borders-strokes': generateBordersStrokes,
  'corner-radius': generateCornerRadius,
  'spacing-padding': generateSpacingPadding,
  'opacity': generateOpacity,
  'clip-content': generateClipContent,
  'cards': generateCards,
  'navigation': generateNavigation,
  'heroes-banners': generateHeroesBanners,
  'lists-grids': generateListsGrids,
  'badges-tags': generateBadgesTags,
  'combined-complex': generateCombinedComplex,
};

// ---------------------------------------------------------------------------
// Layout Horizontal (15 variants)
// ---------------------------------------------------------------------------

function generateLayoutHorizontal(variant: number): string {
  const gaps = [0, 4, 8, 12, 16, 20, 24, 32, 8, 12, 16, 20, 8, 16, 24];
  const gap = gaps[(variant - 1) % gaps.length]!;

  const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-between',
    'flex-start', 'center', 'flex-end', 'space-between', 'flex-start',
    'center', 'space-between', 'flex-start', 'center', 'flex-end'];
  const justify = justifyOptions[(variant - 1) % justifyOptions.length]!;

  const alignOptions = ['stretch', 'center', 'flex-start', 'flex-end', 'center',
    'stretch', 'flex-start', 'center', 'flex-end', 'stretch',
    'center', 'flex-start', 'center', 'flex-end', 'stretch'];
  const align = alignOptions[(variant - 1) % alignOptions.length]!;

  const childCount = 2 + (variant % 4);
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];

  const children = Array.from({ length: childCount }, (_, i) => {
    const color = colors[i % colors.length]!;
    const w = 40 + (i * 20);
    const h = 40 + ((variant * 7 + i * 13) % 40);
    return div(
      `{ width: ${w}, height: ${h}, backgroundColor: '${color}' }`,
      '',
      8,
    );
  }).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: 'row', gap: ${gap}, justifyContent: '${justify}', alignItems: '${align}', padding: 16, backgroundColor: '#f5f5f5', minHeight: 120 }`;
  return wrapComponent(`layout_horizontal_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Layout Vertical (15 variants)
// ---------------------------------------------------------------------------

function generateLayoutVertical(variant: number): string {
  const gaps = [0, 4, 8, 12, 16, 20, 24, 32, 8, 12, 16, 20, 8, 16, 24];
  const gap = gaps[(variant - 1) % gaps.length]!;

  const alignOptions = ['stretch', 'center', 'flex-start', 'flex-end', 'center',
    'stretch', 'flex-start', 'center', 'flex-end', 'stretch',
    'center', 'flex-start', 'center', 'flex-end', 'stretch'];
  const align = alignOptions[(variant - 1) % alignOptions.length]!;

  const childCount = 2 + (variant % 3);
  const colors = ['#1abc9c', '#e67e22', '#3498db', '#e74c3c', '#8e44ad'];

  const children = Array.from({ length: childCount }, (_, i) => {
    const color = colors[i % colors.length]!;
    const h = 30 + (i * 10);
    return div(
      `{ height: ${h}, backgroundColor: '${color}' }`,
      '',
      8,
    );
  }).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: 'column', gap: ${gap}, alignItems: '${align}', padding: 16, backgroundColor: '#fafafa', minWidth: 200 }`;
  return wrapComponent(`layout_vertical_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Layout Nested (15 variants)
// ---------------------------------------------------------------------------

function generateLayoutNested(variant: number): string {
  const gap = 8 + (variant % 4) * 4;
  const outerDir = variant % 2 === 0 ? 'row' : 'column';
  const innerDir = outerDir === 'row' ? 'column' : 'row';

  const innerGap = 4 + (variant % 3) * 4;
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
  const innerCount = 2 + (variant % 3);
  const outerCount = 2 + (variant % 2);

  const innerChildren = (offset: number) =>
    Array.from({ length: innerCount }, (_, i) => {
      const c = colors[(i + offset) % colors.length]!;
      return div(`{ width: 50, height: 30, backgroundColor: '${c}' }`, '', 12);
    }).join('\n');

  const outerChildren = Array.from({ length: outerCount }, (_, i) => {
    return div(
      `{ display: 'flex', flexDirection: '${innerDir}', gap: ${innerGap}, padding: 8, backgroundColor: '#eee', borderRadius: 4 }`,
      innerChildren(i * 2),
      8,
    );
  }).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: '${outerDir}', gap: ${gap}, padding: 16, backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`layout_nested_${pad(variant)}`, root(rootStyle, outerChildren));
}

// ---------------------------------------------------------------------------
// Layout Sizing (10 variants)
// ---------------------------------------------------------------------------

function generateLayoutSizing(variant: number): string {
  const configs: Array<{ desc: string; children: string[] }> = [
    { desc: 'Fixed width children', children: [
      `{ width: 100, height: 50, backgroundColor: '#e74c3c' }`,
      `{ width: 200, height: 50, backgroundColor: '#3498db' }`,
    ]},
    { desc: 'Flex grow', children: [
      `{ flexGrow: 1, height: 50, backgroundColor: '#2ecc71' }`,
      `{ width: 100, height: 50, backgroundColor: '#e67e22' }`,
    ]},
    { desc: 'Multiple flex grow', children: [
      `{ flexGrow: 1, height: 50, backgroundColor: '#9b59b6' }`,
      `{ flexGrow: 2, height: 50, backgroundColor: '#1abc9c' }`,
    ]},
    { desc: 'Width 100%', children: [
      `{ width: '100%', height: 40, backgroundColor: '#e74c3c' }`,
      `{ width: '100%', height: 40, backgroundColor: '#3498db' }`,
    ]},
    { desc: 'Fixed height', children: [
      `{ width: 80, height: 100, backgroundColor: '#2ecc71' }`,
      `{ width: 80, height: 60, backgroundColor: '#e67e22' }`,
    ]},
    { desc: 'Auto width (hug)', children: [
      `{ padding: 16, backgroundColor: '#9b59b6' }`,
      `{ padding: 24, backgroundColor: '#1abc9c' }`,
    ]},
    { desc: 'Min width constraint', children: [
      `{ minWidth: 100, height: 50, backgroundColor: '#e74c3c', flexGrow: 1 }`,
      `{ minWidth: 150, height: 50, backgroundColor: '#3498db', flexGrow: 1 }`,
    ]},
    { desc: 'Max width constraint', children: [
      `{ maxWidth: 200, height: 50, backgroundColor: '#2ecc71', flexGrow: 1 }`,
      `{ height: 50, backgroundColor: '#e67e22', flexGrow: 1 }`,
    ]},
    { desc: 'Mixed sizing', children: [
      `{ width: 100, height: 50, backgroundColor: '#9b59b6' }`,
      `{ flexGrow: 1, height: 50, backgroundColor: '#1abc9c' }`,
      `{ width: 80, height: 50, backgroundColor: '#e74c3c' }`,
    ]},
    { desc: 'Vertical fill', children: [
      `{ height: 60, backgroundColor: '#3498db' }`,
      `{ flexGrow: 1, backgroundColor: '#2ecc71' }`,
      `{ height: 40, backgroundColor: '#e67e22' }`,
    ]},
  ];

  const config = configs[(variant - 1) % configs.length]!;
  const isVertical = variant > 8;
  const dir = isVertical ? 'column' : 'row';

  const children = config.children.map((style) =>
    div(style, span('Content'), 8)
  ).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: '${dir}', gap: 8, padding: 16, backgroundColor: '#f5f5f5'${isVertical ? ', height: 400' : ''} }`;
  return wrapComponent(`layout_sizing_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Typography (20 variants)
// ---------------------------------------------------------------------------

function generateTypography(variant: number): string {
  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 14, 16, 18, 20, 24, 12, 16, 20, 28, 36];
  const fontWeights = [400, 400, 500, 500, 600, 600, 700, 700, 400, 500, 600, 700, 400, 500, 600, 700, 400, 600, 700, 500];
  const textAligns: string[] = ['left', 'left', 'center', 'right', 'left', 'center', 'left', 'center', 'right', 'left',
    'center', 'right', 'left', 'center', 'left', 'right', 'center', 'left', 'center', 'right'];
  const colors = ['#333333', '#1a1a1a', '#2c3e50', '#e74c3c', '#3498db', '#27ae60', '#8e44ad', '#c0392b', '#2980b9', '#16a085',
    '#d35400', '#2c3e50', '#7f8c8d', '#e74c3c', '#3498db', '#1a1a1a', '#333333', '#2c3e50', '#e74c3c', '#27ae60'];
  const lineHeights = [1.2, 1.4, 1.5, 1.6, 1.8, 1.2, 1.4, 1.5, 1.6, 1.8, 1.3, 1.5, 1.7, 1.4, 1.6, 1.2, 1.5, 1.8, 1.4, 1.6];

  const fontSize = fontSizes[(variant - 1) % fontSizes.length]!;
  const fontWeight = fontWeights[(variant - 1) % fontWeights.length]!;
  const textAlign = textAligns[(variant - 1) % textAligns.length]!;
  const color = colors[(variant - 1) % colors.length]!;
  const lineHeight = lineHeights[(variant - 1) % lineHeights.length]!;

  const hasLetterSpacing = variant % 4 === 0;
  const hasDecoration = variant % 5 === 0;
  const letterSpacingStr = hasLetterSpacing ? `, letterSpacing: ${variant % 3 === 0 ? 2 : 1}` : '';
  const decorationStr = hasDecoration ? `, textDecoration: 'underline'` : '';

  const textContent = variant <= 10
    ? 'The quick brown fox jumps over the lazy dog'
    : `Typography variant ${variant} — font size ${fontSize}px, weight ${fontWeight}`;

  const textStyle = `{ fontSize: ${fontSize}, fontWeight: ${fontWeight}, color: '${color}', textAlign: '${textAlign}' as const, lineHeight: ${lineHeight}${letterSpacingStr}${decorationStr} }`;

  const children = [
    p(textContent, textStyle, 8),
  ];

  // Add a second line for some variants
  if (variant > 5) {
    const secondStyle = `{ fontSize: ${Math.max(12, fontSize - 4)}, fontWeight: 400, color: '#666666', marginTop: 8 }`;
    children.push(p('Secondary text with different styling', secondStyle, 8));
  }

  const rootStyle = `{ padding: 24, backgroundColor: '#ffffff' }`;
  return wrapComponent(`typography_${pad(variant)}`, root(rootStyle, children.join('\n')));
}

// ---------------------------------------------------------------------------
// Colors Solid (10 variants)
// ---------------------------------------------------------------------------

function generateColorsSolid(variant: number): string {
  const palettes = [
    ['#e74c3c', '#c0392b', '#ff6b6b'],
    ['#3498db', '#2980b9', '#74b9ff'],
    ['#2ecc71', '#27ae60', '#55efc4'],
    ['#f39c12', '#e67e22', '#ffeaa7'],
    ['#9b59b6', '#8e44ad', '#a29bfe'],
    ['#1abc9c', '#16a085', '#81ecec'],
    ['#34495e', '#2c3e50', '#636e72'],
    ['#e74c3c', '#3498db', '#2ecc71'],
    ['#f39c12', '#9b59b6', '#1abc9c'],
    ['#2c3e50', '#e74c3c', '#f39c12'],
  ];

  const palette = palettes[(variant - 1) % palettes.length]!;

  const children = palette.map((color, i) =>
    div(
      `{ backgroundColor: '${color}', padding: 16, marginBottom: ${i < palette.length - 1 ? 8 : 0} }`,
      p(`Color: ${color}`, `{ color: '${isLight(color) ? '#333' : '#fff'}', fontSize: 14 }`, 10),
      8,
    )
  ).join('\n');

  const rootStyle = `{ padding: 16, backgroundColor: '#fafafa' }`;
  return wrapComponent(`colors_solid_${pad(variant)}`, root(rootStyle, children));
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// ---------------------------------------------------------------------------
// Colors Gradient (10 variants)
// ---------------------------------------------------------------------------

function generateColorsGradient(variant: number): string {
  const gradients = [
    'linear-gradient(to right, #e74c3c, #3498db)',
    'linear-gradient(to bottom, #2ecc71, #3498db)',
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(to right, #f093fb, #f5576c)',
    'linear-gradient(45deg, #fa709a, #fee140)',
    'linear-gradient(to bottom right, #a18cd1, #fbc2eb)',
    'linear-gradient(120deg, #84fab0, #8fd3f4)',
    'linear-gradient(to right, #ffecd2, #fcb69f)',
    'linear-gradient(180deg, #a1c4fd, #c2e9fb)',
    'linear-gradient(to top, #fbc2eb, #a6c1ee)',
  ];

  const gradient = gradients[(variant - 1) % gradients.length]!;

  const children = div(
    `{ background: '${gradient}', padding: 32, borderRadius: 8 }`,
    p('Gradient background', `{ color: '#fff', fontSize: 18, fontWeight: 600, textAlign: 'center' as const }`, 10),
    8,
  );

  const rootStyle = `{ padding: 16, backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`colors_gradient_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Borders & Strokes (10 variants)
// ---------------------------------------------------------------------------

function generateBordersStrokes(variant: number): string {
  const borders = [
    '1px solid #e74c3c',
    '2px solid #3498db',
    '3px solid #2ecc71',
    '1px solid #333',
    '2px solid #e67e22',
    '4px solid #9b59b6',
    '1px solid #bdc3c7',
    '2px solid #1abc9c',
    '3px solid #e74c3c',
    '2px solid #2c3e50',
  ];

  const border = borders[(variant - 1) % borders.length]!;

  const children = div(
    `{ border: '${border}', padding: 24, backgroundColor: '#fff' }`,
    [
      p(`Border: ${border}`, `{ fontSize: 14, color: '#333' }`, 10),
      p('Content inside bordered container', `{ fontSize: 12, color: '#666', marginTop: 8 }`, 10),
    ].join('\n'),
    8,
  );

  const rootStyle = `{ padding: 16, backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`borders_strokes_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Corner Radius (8 variants)
// ---------------------------------------------------------------------------

function generateCornerRadius(variant: number): string {
  const radii: Array<string | number> = [0, 4, 8, 12, 16, 24, 9999, '8px 16px 8px 16px'];

  const radius = radii[(variant - 1) % radii.length]!;
  const radiusStyle = typeof radius === 'string' ? `'${radius}'` : radius;

  const children = div(
    `{ borderRadius: ${radiusStyle}, backgroundColor: '#3498db', padding: 24 }`,
    p(`Border radius: ${radius}${typeof radius === 'number' ? 'px' : ''}`, `{ color: '#fff', fontSize: 14, textAlign: 'center' as const }`, 10),
    8,
  );

  const rootStyle = `{ padding: 24, backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`corner_radius_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Spacing & Padding (12 variants)
// ---------------------------------------------------------------------------

function generateSpacingPadding(variant: number): string {
  const paddings = [
    '8', '16', '24', '32',
    "'8px 16px'", "'16px 24px'", "'8px 16px 24px 32px'",
    "'24px 48px'", "'4px 8px'", "'12px 24px 12px 24px'",
    "'0px 16px'", "'32px 0px'",
  ];

  const gaps = [0, 4, 8, 12, 16, 8, 12, 16, 4, 8, 12, 16];

  const padding = paddings[(variant - 1) % paddings.length]!;
  const gap = gaps[(variant - 1) % gaps.length]!;

  const children = Array.from({ length: 3 }, (_, i) => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71'];
    return div(
      `{ backgroundColor: '${colors[i]}', padding: 12 }`,
      p(`Item ${i + 1}`, `{ color: '#fff', fontSize: 14 }`, 10),
      8,
    );
  }).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: 'column', gap: ${gap}, padding: ${padding}, backgroundColor: '#f0f0f0' }`;
  return wrapComponent(`spacing_padding_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Opacity (5 variants)
// ---------------------------------------------------------------------------

function generateOpacity(variant: number): string {
  const opacities = [0.2, 0.4, 0.6, 0.8, 0.5];
  const opacity = opacities[(variant - 1) % opacities.length]!;

  const children = [
    div(
      `{ opacity: ${opacity}, backgroundColor: '#3498db', padding: 24, borderRadius: 8 }`,
      p(`Opacity: ${opacity}`, `{ color: '#fff', fontSize: 16 }`, 10),
      8,
    ),
    div(
      `{ backgroundColor: '#e74c3c', padding: 24, borderRadius: 8, marginTop: 12 }`,
      p('Full opacity reference', `{ color: '#fff', fontSize: 16 }`, 10),
      8,
    ),
  ].join('\n');

  const rootStyle = `{ padding: 16, backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`opacity_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Clip Content (5 variants)
// ---------------------------------------------------------------------------

function generateClipContent(variant: number): string {
  const overflow = variant <= 3 ? 'hidden' : 'visible';
  const childSize = 100 + variant * 30;

  const children = div(
    `{ width: 200, height: 150, overflow: '${overflow}', backgroundColor: '#ecf0f1', border: '1px solid #bdc3c7', borderRadius: 8 }`,
    div(
      `{ width: ${childSize}, height: ${childSize}, backgroundColor: '#3498db', borderRadius: 4 }`,
      p('Overflowing content', `{ color: '#fff', fontSize: 12, padding: 8 }`, 12),
      10,
    ),
    8,
  );

  const rootStyle = `{ padding: 24, backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`clip_content_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Cards (15 variants)
// ---------------------------------------------------------------------------

function generateCards(variant: number): string {
  const cardColors = ['#fff', '#fafafa', '#f8f9fa', '#fff5f5', '#f0f7ff'];
  const accentColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];

  const bgColor = cardColors[(variant - 1) % cardColors.length]!;
  const accent = accentColors[(variant - 1) % accentColors.length]!;
  const radius = [4, 8, 12, 16, 8][(variant - 1) % 5]!;
  const padding = [16, 20, 24, 16, 20][(variant - 1) % 5]!;

  let cardContent: string;

  if (variant <= 5) {
    // Simple card with title and body
    cardContent = [
      h(3, `Card Title ${variant}`, `{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }`, 10),
      p('This is a simple card with a title and body text. It demonstrates basic card layout patterns.', `{ fontSize: 14, color: '#666', lineHeight: 1.5 }`, 10),
    ].join('\n');
  } else if (variant <= 10) {
    // Card with colored top bar and content
    cardContent = [
      div(`{ backgroundColor: '${accent}', height: 4, borderRadius: '${radius}px ${radius}px 0 0' }`, '', 10),
      div(`{ padding: ${padding}, display: 'flex', flexDirection: 'column', gap: 8 }`, [
        h(3, 'Featured Card', `{ fontSize: 16, fontWeight: 600, color: '#333' }`, 12),
        p('Card content with an accent top bar.', `{ fontSize: 14, color: '#666', lineHeight: 1.5 }`, 12),
      ].join('\n'), 10),
    ].join('\n');
  } else {
    // Card with footer/action area
    cardContent = [
      h(3, `Card ${variant}`, `{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }`, 10),
      p('Card with action buttons at the bottom.', `{ fontSize: 14, color: '#666', lineHeight: 1.5, marginBottom: 16 }`, 10),
      div(`{ display: 'flex', gap: 8, justifyContent: 'flex-end' }`,
        [
          div(`{ backgroundColor: '${accent}', padding: '8px 16px', borderRadius: 4 }`,
            span('Action', `{ color: '#fff', fontSize: 14 }`, 14), 12),
          div(`{ backgroundColor: '#eee', padding: '8px 16px', borderRadius: 4 }`,
            span('Cancel', `{ color: '#333', fontSize: 14 }`, 14), 12),
        ].join('\n'), 10),
    ].join('\n');
  }

  const cardPadding = (variant > 5 && variant <= 10) ? 0 : padding;
  const children = div(
    `{ backgroundColor: '${bgColor}', borderRadius: ${radius}, padding: ${cardPadding}, border: '1px solid #e0e0e0', overflow: 'hidden' }`,
    cardContent,
    8,
  );

  const rootStyle = `{ padding: 24, backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`cards_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Navigation (10 variants)
// ---------------------------------------------------------------------------

function generateNavigation(variant: number): string {
  const navItems = ['Home', 'About', 'Products', 'Contact', 'Blog'];
  const bgColors = ['#2c3e50', '#1a1a2e', '#ffffff', '#f8f9fa', '#16213e', '#0f3460', '#2c3e50', '#ffffff', '#1a1a2e', '#f8f9fa'];
  const textColors = ['#ffffff', '#ffffff', '#333333', '#333333', '#ffffff', '#ffffff', '#ffffff', '#333333', '#ffffff', '#333333'];

  const bgColor = bgColors[(variant - 1) % bgColors.length]!;
  const textColor = textColors[(variant - 1) % textColors.length]!;
  const itemCount = 3 + (variant % 3);

  const items = navItems.slice(0, itemCount).map((item) =>
    span(item, `{ color: '${textColor}', fontSize: 14, fontWeight: 500, cursor: 'pointer' }`, 12)
  ).join('\n');

  const logoStyle = `{ fontSize: 18, fontWeight: 700, color: '${textColor}' }`;

  const children = div(
    `{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '${bgColor}', padding: '12px 24px' }`,
    [
      span('Logo', logoStyle, 10),
      div(`{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }`, items, 10),
    ].join('\n'),
    8,
  );

  const rootStyle = `{ backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`navigation_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Heroes & Banners (10 variants)
// ---------------------------------------------------------------------------

function generateHeroesBanners(variant: number): string {
  const bgColors = ['#2c3e50', '#1a1a2e', '#667eea', '#f093fb', '#00b894', '#6c5ce7', '#fd79a8', '#0984e3', '#00cec9', '#e17055'];
  const bgColor = bgColors[(variant - 1) % bgColors.length]!;
  const hasGradient = variant % 3 === 0 && variant <= 6;

  const bgStyle = hasGradient
    ? `background: 'linear-gradient(135deg, ${bgColor}, #333)'`
    : `backgroundColor: '${bgColor}'`;

  const children = div(
    `{ ${bgStyle}, padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }`,
    [
      h(1, `Hero Title ${variant}`, `{ fontSize: 36, fontWeight: 700, color: '#fff', textAlign: 'center' as const }`, 10),
      p('A compelling subtitle that describes the value proposition of this hero section.', `{ fontSize: 16, color: '#cccccc', textAlign: 'center' as const, maxWidth: 600, lineHeight: 1.6 }`, 10),
      div(`{ backgroundColor: '#fff', padding: '12px 32px', borderRadius: 8 }`,
        span('Get Started', `{ color: '${bgColor}', fontSize: 16, fontWeight: 600 }`, 12), 10),
    ].join('\n'),
    8,
  );

  const rootStyle = `{ backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`heroes_banners_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Lists & Grids (10 variants)
// ---------------------------------------------------------------------------

function generateListsGrids(variant: number): string {
  const isGrid = variant > 5;
  const itemCount = 3 + (variant % 4);
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

  const items = Array.from({ length: itemCount }, (_, i) => {
    const color = colors[i % colors.length]!;
    return div(
      `{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }`,
      [
        div(`{ width: 40, height: 40, backgroundColor: '${color}', borderRadius: 20, marginBottom: 8 }`, '', 12),
        p(`Item ${i + 1}`, `{ fontSize: 14, fontWeight: 600, color: '#333' }`, 12),
        p('Description text', `{ fontSize: 12, color: '#999', marginTop: 4 }`, 12),
      ].join('\n'),
      10,
    );
  }).join('\n');

  let containerStyle: string;
  if (isGrid) {
    containerStyle = `{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16 }`;
  } else {
    containerStyle = `{ display: 'flex', flexDirection: 'column', gap: 12 }`;
  }

  const children = div(containerStyle, items, 8);

  const rootStyle = `{ padding: 24, backgroundColor: '#f5f5f5' }`;
  return wrapComponent(`lists_grids_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Badges & Tags (5 variants)
// ---------------------------------------------------------------------------

function generateBadgesTags(variant: number): string {
  const badges = [
    ['New', 'Sale', 'Hot'],
    ['Active', 'Pending', 'Closed'],
    ['v1.0', 'v2.0', 'Beta'],
    ['React', 'TypeScript', 'Node.js', 'CSS'],
    ['Success', 'Warning', 'Error', 'Info'],
  ];
  const colorSets = [
    ['#e74c3c', '#3498db', '#f39c12'],
    ['#2ecc71', '#f39c12', '#e74c3c'],
    ['#3498db', '#9b59b6', '#e67e22'],
    ['#61dafb', '#3178c6', '#68a063', '#264de4'],
    ['#2ecc71', '#f39c12', '#e74c3c', '#3498db'],
  ];

  const labels = badges[(variant - 1) % badges.length]!;
  const colors = colorSets[(variant - 1) % colorSets.length]!;

  const items = labels.map((label, i) => {
    const color = colors[i % colors.length]!;
    return div(
      `{ backgroundColor: '${color}', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }`,
      span(label, `{ color: '#fff', fontSize: 12, fontWeight: 600 }`, 12),
      10,
    );
  }).join('\n');

  const children = div(
    `{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }`,
    items,
    8,
  );

  const rootStyle = `{ padding: 24, backgroundColor: '#fff' }`;
  return wrapComponent(`badges_tags_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Combined Complex (15 variants)
// ---------------------------------------------------------------------------

function generateCombinedComplex(variant: number): string {
  const accentColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#2c3e50'];
  const accent = accentColors[(variant - 1) % accentColors.length]!;

  if (variant <= 5) {
    // Dashboard-style layout: sidebar + main content
    return wrapComponent(`combined_complex_${pad(variant)}`, root(
      `{ display: 'flex', flexDirection: 'row', minHeight: 400, backgroundColor: '#f5f5f5' }`,
      [
        // Sidebar
        div(`{ width: 200, backgroundColor: '#2c3e50', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }`, [
          h(3, 'Dashboard', `{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 16 }`, 10),
          ...['Overview', 'Analytics', 'Settings'].map(item =>
            div(`{ padding: '8px 12px', borderRadius: 4, backgroundColor: '${item === 'Overview' ? accent : 'transparent'}' }`,
              span(item, `{ color: '#fff', fontSize: 14 }`, 12), 10)
          ),
        ].join('\n'), 8),
        // Main content
        div(`{ flexGrow: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }`, [
          h(2, 'Overview', `{ fontSize: 24, fontWeight: 700, color: '#333' }`, 10),
          div(`{ display: 'flex', flexDirection: 'row', gap: 16 }`, [
            ...['Users', 'Revenue', 'Orders'].map((label, i) =>
              div(`{ flexGrow: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e0e0e0' }`, [
                p(label, `{ fontSize: 12, color: '#999' }`, 14),
                p(`${(i + 1) * 1234}`, `{ fontSize: 24, fontWeight: 700, color: '${accent}', marginTop: 4 }`, 14),
              ].join('\n'), 12)
            ),
          ].join('\n'), 10),
        ].join('\n'), 8),
      ].join('\n'),
    ));
  } else if (variant <= 10) {
    // Landing page section: hero + features
    return wrapComponent(`combined_complex_${pad(variant)}`, root(
      `{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }`,
      [
        // Hero
        div(`{ backgroundColor: '${accent}', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }`, [
          h(1, 'Welcome', `{ fontSize: 32, fontWeight: 700, color: '#fff' }`, 10),
          p('Build amazing things with our platform.', `{ fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center' as const }`, 10),
        ].join('\n'), 8),
        // Features
        div(`{ padding: 32, display: 'flex', flexDirection: 'row', gap: 24, justifyContent: 'center' }`, [
          ...['Fast', 'Secure', 'Scalable'].map(feature =>
            div(`{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16 }`, [
              div(`{ width: 48, height: 48, borderRadius: 24, backgroundColor: '${accent}', opacity: 0.1 }`, '', 12),
              p(feature, `{ fontSize: 16, fontWeight: 600, color: '#333' }`, 12),
              p('Lorem ipsum dolor sit amet.', `{ fontSize: 13, color: '#666', textAlign: 'center' as const }`, 12),
            ].join('\n'), 10)
          ),
        ].join('\n'), 8),
      ].join('\n'),
    ));
  } else {
    // Profile/settings page
    return wrapComponent(`combined_complex_${pad(variant)}`, root(
      `{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, backgroundColor: '#f5f5f5' }`,
      [
        // Header
        div(`{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e0e0e0' }`, [
          div(`{ width: 64, height: 64, borderRadius: 32, backgroundColor: '${accent}' }`, '', 10),
          div(`{ display: 'flex', flexDirection: 'column', gap: 4 }`, [
            h(2, `User ${variant}`, `{ fontSize: 20, fontWeight: 700, color: '#333' }`, 12),
            p('user@example.com', `{ fontSize: 14, color: '#999' }`, 12),
          ].join('\n'), 10),
        ].join('\n'), 8),
        // Settings sections
        ...['General', 'Notifications'].map(section =>
          div(`{ backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0' }`, [
            h(3, section, `{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 12 }`, 10),
            div(`{ display: 'flex', flexDirection: 'column', gap: 8 }`, [
              div(`{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }`, [
                span('Setting option', `{ fontSize: 14, color: '#333' }`, 14),
                div(`{ width: 40, height: 20, borderRadius: 10, backgroundColor: '${accent}' }`, '', 14),
              ].join('\n'), 12),
            ].join('\n'), 10),
          ].join('\n'), 8)
        ),
      ].join('\n'),
    ));
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface GenerateTestPagesOptions {
  /** Output directory for generated test pages */
  outputDir: string;
  /** Only generate pages for specific categories (default: all) */
  categories?: string[];
}

export interface GenerateTestPagesResult {
  totalGenerated: number;
  byCategory: Record<string, number>;
  outputDir: string;
}

/**
 * Generate all test page TSX files to disk.
 */
export function generateTestPages(options: GenerateTestPagesOptions): GenerateTestPagesResult {
  const { outputDir, categories } = options;
  const registry = buildRegistry();
  const byCategory: Record<string, number> = {};
  let totalGenerated = 0;

  for (const entry of registry) {
    if (categories && !categories.includes(entry.category)) continue;

    const generator = generators[entry.category];
    if (!generator) {
      console.warn(`No generator for category: ${entry.category}`);
      continue;
    }

    // Extract variant number from name: "layout-horizontal-01" → 1
    const match = /-(\d+)$/.exec(entry.name);
    const variant = match ? parseInt(match[1]!, 10) : 1;

    const code = generator(variant, 0);
    const filePath = join(outputDir, entry.filePath);
    const fileDir = join(outputDir, entry.category);

    if (!existsSync(fileDir)) {
      mkdirSync(fileDir, { recursive: true });
    }

    writeFileSync(filePath, code, 'utf-8');

    byCategory[entry.category] = (byCategory[entry.category] ?? 0) + 1;
    totalGenerated++;
  }

  return { totalGenerated, byCategory, outputDir };
}
