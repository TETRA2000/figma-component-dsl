/**
 * Test page generator — produces 200 self-contained React TSX pages
 * across 18 categories for the React-to-DSL conversion pipeline.
 *
 * Each generated file uses nested React function components (component composition)
 * to simulate realistic React code. All component definitions are inlined
 * since esbuild transforms each file independently as an IIFE.
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

/** Wrap a React component body with dependencies prepended. */
function wrapComponentWithDeps(name: string, body: string, deps: string[] = []): string {
  const safeName = name.replace(/-/g, '_');
  const depsCode = deps.length > 0 ? deps.join('\n\n') + '\n\n' : '';
  return `${depsCode}export default function ${safeName}() {
  return (
${body}
  );
}
`;
}

/** Create a root div. */
function root(style: string, children: string): string {
  return `    <div data-testid="root" style={${style}}>
${children}
    </div>`;
}

// ---------------------------------------------------------------------------
// Reusable Component Definitions (return TSX source code strings)
// ---------------------------------------------------------------------------

function defBadge(): string {
  return `function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}`;
}

function defButton(): string {
  return `function Button({ children, color, textColor }: { children: React.ReactNode; color?: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color || '#3498db', padding: '8px 16px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: textColor || '#fff', fontSize: 14, fontWeight: 600 }}>{children}</span>
    </div>
  );
}`;
}

function defCard(): string {
  return `function Card({ title, children, accentColor }: { title: string; children?: React.ReactNode; accentColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>{title}</h3>
      {children}
      {accentColor && <div style={{ height: 3, backgroundColor: accentColor, marginTop: 12, borderRadius: 2 }} />}
    </div>
  );
}`;
}

function defAvatar(): string {
  return `function Avatar({ color, size }: { color: string; size?: number }) {
  const s = size || 40;
  return <div style={{ width: s, height: s, borderRadius: s / 2, backgroundColor: color }} />;
}`;
}

function defNavItem(): string {
  return `function NavItem({ label, active, color }: { label: string; active?: boolean; color?: string }) {
  return (
    <span style={{ color: color || '#333', fontSize: 14, fontWeight: active ? 600 : 400, padding: '8px 12px', borderBottom: active ? '2px solid currentColor' : 'none' }}>
      {label}
    </span>
  );
}`;
}

function defDivider(): string {
  return `function Divider({ color }: { color?: string }) {
  return <div style={{ height: 1, backgroundColor: color || '#e0e0e0', width: '100%' }} />;
}`;
}

function defStat(): string {
  return `function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: 24, fontWeight: 700, color: color || '#333' }}>{value}</span>
      <span style={{ fontSize: 12, color: '#999' }}>{label}</span>
    </div>
  );
}`;
}

function defFeatureItem(): string {
  return `function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', fontSize: 14 }}>{icon}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{title}</span>
        <span style={{ fontSize: 12, color: '#666' }}>{description}</span>
      </div>
    </div>
  );
}`;
}

function defSectionHeader(): string {
  return `function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}`;
}

function defTag(): string {
  return `function Tag({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ backgroundColor: color, color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}`;
}

function defProgressBar(): string {
  return `function ProgressBar({ percent, color }: { percent: number; color?: string }) {
  return (
    <div style={{ width: '100%', height: 8, backgroundColor: '#eee', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ width: percent + '%', height: '100%', backgroundColor: color || '#3498db', borderRadius: 4 }} />
    </div>
  );
}`;
}

function defListItem(): string {
  return `function ListItem({ label, description }: { label: string; description?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 0' }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{label}</div>
      {description && <div style={{ fontSize: 12, color: '#666' }}>{description}</div>}
    </div>
  );
}`;
}

function defChip(): string {
  return `function Chip({ label, selected, color }: { label: string; selected?: boolean; color?: string }) {
  const bg = selected ? (color || '#3498db') : '#f0f0f0';
  const textColor = selected ? '#fff' : '#333';
  return (
    <div style={{ backgroundColor: bg, color: textColor, padding: '6px 14px', borderRadius: 16, fontSize: 13, fontWeight: 500, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}`;
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
// Layout Horizontal (15 variants) — uses Badge and Button as children
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
  const labels = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];

  const children = Array.from({ length: childCount }, (_, i) => {
    const color = colors[i % colors.length]!;
    const label = labels[i % labels.length]!;
    if (i % 2 === 0) {
      return `        <Badge label="${label}" color="${color}" />`;
    } else {
      return `        <Button color="${color}">${label}</Button>`;
    }
  }).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: 'row', gap: ${gap}, justifyContent: '${justify}', alignItems: '${align}', padding: 16, backgroundColor: '#f5f5f5', minHeight: 120 }`;
  return wrapComponentWithDeps(`layout_horizontal_${pad(variant)}`, root(rootStyle, children), [defBadge(), defButton()]);
}

// ---------------------------------------------------------------------------
// Layout Vertical (15 variants) — uses Badge as children
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
  const labels = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

  const children = Array.from({ length: childCount }, (_, i) => {
    const color = colors[i % colors.length]!;
    const label = labels[i % labels.length]!;
    return `        <Badge label="${label}" color="${color}" />`;
  }).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: 'column', gap: ${gap}, alignItems: '${align}', padding: 16, backgroundColor: '#fafafa', minWidth: 200 }`;
  return wrapComponentWithDeps(`layout_vertical_${pad(variant)}`, root(rootStyle, children), [defBadge()]);
}

// ---------------------------------------------------------------------------
// Layout Nested (15 variants) — uses Badge inside nested containers
// ---------------------------------------------------------------------------

function generateLayoutNested(variant: number): string {
  const gap = 8 + (variant % 4) * 4;
  const outerDir = variant % 2 === 0 ? 'row' : 'column';
  const innerDir = outerDir === 'row' ? 'column' : 'row';

  const innerGap = 4 + (variant % 3) * 4;
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
  const innerCount = 2 + (variant % 3);
  const outerCount = 2 + (variant % 2);

  const outerChildren = Array.from({ length: outerCount }, (_, gi) => {
    const innerChildren = Array.from({ length: innerCount }, (__, i) => {
      const c = colors[(i + gi * 2) % colors.length]!;
      return `            <Badge label="Item ${gi * innerCount + i + 1}" color="${c}" />`;
    }).join('\n');

    return `        <div style={{ display: 'flex', flexDirection: '${innerDir}', gap: ${innerGap}, padding: 8, backgroundColor: '#eee', borderRadius: 4 }}>
${innerChildren}
        </div>`;
  }).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: '${outerDir}', gap: ${gap}, padding: 16, backgroundColor: '#f5f5f5' }`;
  return wrapComponentWithDeps(`layout_nested_${pad(variant)}`, root(rootStyle, outerChildren), [defBadge()]);
}

// ---------------------------------------------------------------------------
// Layout Sizing (10 variants) — uses Button as content
// ---------------------------------------------------------------------------

function generateLayoutSizing(variant: number): string {
  const configs: Array<{ children: Array<{ style: string; label: string }> }> = [
    { children: [
      { style: `{ width: 100, height: 50, backgroundColor: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Fixed 100' },
      { style: `{ width: 200, height: 50, backgroundColor: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Fixed 200' },
    ]},
    { children: [
      { style: `{ flexGrow: 1, height: 50, backgroundColor: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Grow 1' },
      { style: `{ width: 100, height: 50, backgroundColor: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Fixed' },
    ]},
    { children: [
      { style: `{ flexGrow: 1, height: 50, backgroundColor: '#9b59b6', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Grow 1' },
      { style: `{ flexGrow: 2, height: 50, backgroundColor: '#1abc9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Grow 2' },
    ]},
    { children: [
      { style: `{ width: '100%', height: 40, backgroundColor: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Full Width' },
      { style: `{ width: '100%', height: 40, backgroundColor: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Full Width' },
    ]},
    { children: [
      { style: `{ width: 80, height: 100, backgroundColor: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Tall' },
      { style: `{ width: 80, height: 60, backgroundColor: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Short' },
    ]},
    { children: [
      { style: `{ padding: 16, backgroundColor: '#9b59b6', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Hug' },
      { style: `{ padding: 24, backgroundColor: '#1abc9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Hug' },
    ]},
    { children: [
      { style: `{ minWidth: 100, height: 50, backgroundColor: '#e74c3c', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Min 100' },
      { style: `{ minWidth: 150, height: 50, backgroundColor: '#3498db', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Min 150' },
    ]},
    { children: [
      { style: `{ maxWidth: 200, height: 50, backgroundColor: '#2ecc71', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Max 200' },
      { style: `{ height: 50, backgroundColor: '#e67e22', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Fill' },
    ]},
    { children: [
      { style: `{ width: 100, height: 50, backgroundColor: '#9b59b6', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Fixed' },
      { style: `{ flexGrow: 1, height: 50, backgroundColor: '#1abc9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Grow' },
      { style: `{ width: 80, height: 50, backgroundColor: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Fixed' },
    ]},
    { children: [
      { style: `{ height: 60, backgroundColor: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Fixed H' },
      { style: `{ flexGrow: 1, backgroundColor: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Grow' },
      { style: `{ height: 40, backgroundColor: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center' }`, label: 'Fixed H' },
    ]},
  ];

  const config = configs[(variant - 1) % configs.length]!;
  const isVertical = variant > 8;
  const dir = isVertical ? 'column' : 'row';

  const children = config.children.map((c) =>
    `        <div style={${c.style}}>
          <span style={{ color: '#fff', fontSize: 12 }}>${c.label}</span>
        </div>`
  ).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: '${dir}', gap: 8, padding: 16, backgroundColor: '#f5f5f5'${isVertical ? ', height: 400' : ''} }`;
  return wrapComponentWithDeps(`layout_sizing_${pad(variant)}`, root(rootStyle, children));
}

// ---------------------------------------------------------------------------
// Typography (20 variants) — uses SectionHeader component
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

  let secondLine = '';
  if (variant > 5) {
    secondLine = `\n        <p style={{ fontSize: ${Math.max(12, fontSize - 4)}, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>`;
  }

  const children = `        <SectionHeader title="Section ${variant}" subtitle="Typography test" />
        <p style={${textStyle}}>${textContent}</p>${secondLine}`;

  const rootStyle = `{ padding: 24, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: 12 }`;
  return wrapComponentWithDeps(`typography_${pad(variant)}`, root(rootStyle, children), [defSectionHeader()]);
}

// ---------------------------------------------------------------------------
// Colors Solid (10 variants) — uses Card and Badge
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

  const children = palette.map((color) =>
    `        <div style={{ backgroundColor: '${color}', padding: 16, borderRadius: 8 }}>
          <Badge label="${color}" color="${isLight(color) ? '#333' : '#fff'}" textColor="${isLight(color) ? '#fff' : '#333'}" />
        </div>`
  ).join('\n');

  const rootStyle = `{ padding: 16, backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: 8 }`;
  return wrapComponentWithDeps(`colors_solid_${pad(variant)}`, root(rootStyle, children), [defBadge()]);
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// ---------------------------------------------------------------------------
// Colors Gradient (10 variants) — uses Button
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

  const children = `        <div style={{ background: '${gradient}', padding: 32, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ color: '#fff', fontSize: 18, fontWeight: 600, textAlign: 'center' as const }}>Gradient background</p>
          <Button color="rgba(255,255,255,0.2)" textColor="#fff">Learn More</Button>
        </div>`;

  const rootStyle = `{ padding: 16, backgroundColor: '#f5f5f5' }`;
  return wrapComponentWithDeps(`colors_gradient_${pad(variant)}`, root(rootStyle, children), [defButton()]);
}

// ---------------------------------------------------------------------------
// Borders & Strokes (10 variants) — uses Badge
// ---------------------------------------------------------------------------

function generateBordersStrokes(variant: number): string {
  const borders = [
    '1px solid #e74c3c', '2px solid #3498db', '3px solid #2ecc71',
    '1px solid #333', '2px solid #e67e22', '4px solid #9b59b6',
    '1px solid #bdc3c7', '2px solid #1abc9c', '3px solid #e74c3c', '2px solid #2c3e50',
  ];

  const border = borders[(variant - 1) % borders.length]!;

  const children = `        <div style={{ border: '${border}', padding: 24, backgroundColor: '#fff', borderRadius: 8 }}>
          <Badge label="Border: ${border.split(' ')[0]}" color="#3498db" />
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Content inside bordered container</p>
        </div>`;

  const rootStyle = `{ padding: 16, backgroundColor: '#f5f5f5' }`;
  return wrapComponentWithDeps(`borders_strokes_${pad(variant)}`, root(rootStyle, children), [defBadge()]);
}

// ---------------------------------------------------------------------------
// Corner Radius (8 variants) — uses Button
// ---------------------------------------------------------------------------

function generateCornerRadius(variant: number): string {
  const radii: Array<string | number> = [0, 4, 8, 12, 16, 24, 9999, '8px 16px 8px 16px'];
  const radius = radii[(variant - 1) % radii.length]!;
  const radiusStyle = typeof radius === 'string' ? `'${radius}'` : radius;

  const children = `        <div style={{ borderRadius: ${radiusStyle}, backgroundColor: '#3498db', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ color: '#fff', fontSize: 14, textAlign: 'center' as const }}>Radius: ${radius}${typeof radius === 'number' ? 'px' : ''}</p>
          <Button color="#fff" textColor="#3498db">Inside</Button>
        </div>`;

  const rootStyle = `{ padding: 24, backgroundColor: '#f5f5f5' }`;
  return wrapComponentWithDeps(`corner_radius_${pad(variant)}`, root(rootStyle, children), [defButton()]);
}

// ---------------------------------------------------------------------------
// Spacing & Padding (12 variants) — uses Badge
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
  const colors = ['#e74c3c', '#3498db', '#2ecc71'];
  const labels = ['First', 'Second', 'Third'];

  const children = Array.from({ length: 3 }, (_, i) => {
    return `        <Badge label="${labels[i]}" color="${colors[i]}" />`;
  }).join('\n');

  const rootStyle = `{ display: 'flex', flexDirection: 'column', gap: ${gap}, padding: ${padding}, backgroundColor: '#f0f0f0' }`;
  return wrapComponentWithDeps(`spacing_padding_${pad(variant)}`, root(rootStyle, children), [defBadge()]);
}

// ---------------------------------------------------------------------------
// Opacity (5 variants) — uses Card
// ---------------------------------------------------------------------------

function generateOpacity(variant: number): string {
  const opacities = [0.2, 0.4, 0.6, 0.8, 0.5];
  const opacity = opacities[(variant - 1) % opacities.length]!;

  const children = `        <div style={{ opacity: ${opacity} }}>
          <Card title="Opacity ${opacity}">
            <p style={{ fontSize: 14, color: '#666' }}>This card has opacity ${opacity}</p>
          </Card>
        </div>
        <Card title="Full Opacity" accentColor="#e74c3c">
          <p style={{ fontSize: 14, color: '#666' }}>Reference card at full opacity</p>
        </Card>`;

  const rootStyle = `{ padding: 16, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 12 }`;
  return wrapComponentWithDeps(`opacity_${pad(variant)}`, root(rootStyle, children), [defCard()]);
}

// ---------------------------------------------------------------------------
// Clip Content (5 variants)
// ---------------------------------------------------------------------------

function generateClipContent(variant: number): string {
  const overflow = variant <= 3 ? 'hidden' : 'visible';
  const childSize = 100 + variant * 30;

  const children = `        <div style={{ width: 200, height: 150, overflow: '${overflow}', backgroundColor: '#ecf0f1', border: '1px solid #bdc3c7', borderRadius: 8 }}>
          <div style={{ width: ${childSize}, height: ${childSize}, backgroundColor: '#3498db', borderRadius: 4 }}>
            <Badge label="Overflowing" color="#e74c3c" />
          </div>
        </div>`;

  const rootStyle = `{ padding: 24, backgroundColor: '#f5f5f5' }`;
  return wrapComponentWithDeps(`clip_content_${pad(variant)}`, root(rootStyle, children), [defBadge()]);
}

// ---------------------------------------------------------------------------
// Cards (15 variants) — uses Card, Badge, Button, Avatar, Divider
// ---------------------------------------------------------------------------

function generateCards(variant: number): string {
  const accentColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
  const accent = accentColors[(variant - 1) % accentColors.length]!;

  let cardContent: string;
  let deps: string[];

  if (variant <= 5) {
    // Simple card with badge and button
    cardContent = `        <Card title="Card ${variant}" accentColor="${accent}">
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>This is a card with nested Badge and Button components.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Badge label="New" color="${accent}" />
            <Button color="${accent}">Action</Button>
          </div>
        </Card>`;
    deps = [defCard(), defBadge(), defButton()];
  } else if (variant <= 10) {
    // Card with avatar and stats
    cardContent = `        <Card title="User Card ${variant}">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Avatar color="${accent}" size={48} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>User Name</span>
              <span style={{ fontSize: 12, color: '#999' }}>user@example.com</span>
            </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', gap: 16, marginTop: 12, justifyContent: 'center' }}>
            <Stat value="${variant * 12}" label="Posts" color="${accent}" />
            <Stat value="${variant * 89}" label="Followers" color="${accent}" />
          </div>
        </Card>`;
    deps = [defCard(), defAvatar(), defDivider(), defStat()];
  } else {
    // Card with feature items and progress bar
    cardContent = `        <Card title="Project Card ${variant}">
          <ProgressBar percent={${30 + variant * 4}} color="${accent}" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <FeatureItem icon="A" title="Feature One" description="First feature description" />
            <FeatureItem icon="B" title="Feature Two" description="Second feature description" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
            <Button color="${accent}">View Details</Button>
          </div>
        </Card>`;
    deps = [defCard(), defProgressBar(), defFeatureItem(), defButton()];
  }

  const rootStyle = `{ padding: 24, backgroundColor: '#f5f5f5' }`;
  return wrapComponentWithDeps(`cards_${pad(variant)}`, root(rootStyle, cardContent), deps);
}

// ---------------------------------------------------------------------------
// Navigation (10 variants) — uses NavItem, Avatar, Button
// ---------------------------------------------------------------------------

function generateNavigation(variant: number): string {
  const bgColors = ['#2c3e50', '#1a1a2e', '#ffffff', '#f8f9fa', '#16213e', '#0f3460', '#2c3e50', '#ffffff', '#1a1a2e', '#f8f9fa'];
  const textColors = ['#ffffff', '#ffffff', '#333333', '#333333', '#ffffff', '#ffffff', '#ffffff', '#333333', '#ffffff', '#333333'];
  const navLabels = ['Home', 'About', 'Products', 'Contact', 'Blog'];

  const bgColor = bgColors[(variant - 1) % bgColors.length]!;
  const textColor = textColors[(variant - 1) % textColors.length]!;
  const itemCount = 3 + (variant % 3);

  const items = navLabels.slice(0, itemCount).map((item, i) =>
    `            <NavItem label="${item}" active={${i === 0}} color="${textColor}" />`
  ).join('\n');

  const children = `        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '${bgColor}', padding: '12px 24px' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '${textColor}' }}>Logo</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
${items}
          </div>
          <Avatar color="${textColor === '#ffffff' ? '#fff' : '#333'}" size={32} />
        </div>`;

  const rootStyle = `{ backgroundColor: '#f5f5f5' }`;
  return wrapComponentWithDeps(`navigation_${pad(variant)}`, root(rootStyle, children), [defNavItem(), defAvatar()]);
}

// ---------------------------------------------------------------------------
// Heroes & Banners (10 variants) — uses Button, Badge, SectionHeader
// ---------------------------------------------------------------------------

function generateHeroesBanners(variant: number): string {
  const bgColors = ['#2c3e50', '#1a1a2e', '#667eea', '#f093fb', '#00b894', '#6c5ce7', '#fd79a8', '#0984e3', '#00cec9', '#e17055'];
  const bgColor = bgColors[(variant - 1) % bgColors.length]!;
  const hasGradient = variant % 3 === 0 && variant <= 6;

  const bgStyle = hasGradient
    ? `background: 'linear-gradient(135deg, ${bgColor}, #333)'`
    : `backgroundColor: '${bgColor}'`;

  const children = `        <div style={{ ${bgStyle}, padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Badge label="New Release" color="rgba(255,255,255,0.2)" textColor="#fff" />
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', textAlign: 'center' as const }}>Hero Title ${variant}</h1>
          <p style={{ fontSize: 16, color: '#cccccc', textAlign: 'center' as const, maxWidth: 600, lineHeight: 1.6 }}>A compelling subtitle that describes the value proposition.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button color="#fff" textColor="${bgColor}">Get Started</Button>
            <Button color="rgba(255,255,255,0.2)" textColor="#fff">Learn More</Button>
          </div>
        </div>`;

  const rootStyle = `{ backgroundColor: '#f5f5f5' }`;
  return wrapComponentWithDeps(`heroes_banners_${pad(variant)}`, root(rootStyle, children), [defBadge(), defButton()]);
}

// ---------------------------------------------------------------------------
// Lists & Grids (10 variants) — uses Card, Avatar, Badge, FeatureItem
// ---------------------------------------------------------------------------

function generateListsGrids(variant: number): string {
  const isGrid = variant > 5;
  const itemCount = 3 + (variant % 4);
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

  const items = Array.from({ length: itemCount }, (_, i) => {
    const color = colors[i % colors.length]!;
    if (isGrid) {
      return `          <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Avatar color="${color}" />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Item ${i + 1}</span>
            <Badge label="Tag" color="${color}" />
          </div>`;
    } else {
      return `          <FeatureItem icon="${String.fromCharCode(65 + i)}" title="Feature ${i + 1}" description="Description for feature ${i + 1}" />`;
    }
  }).join('\n');

  let containerStyle: string;
  if (isGrid) {
    containerStyle = `{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16 }`;
  } else {
    containerStyle = `{ display: 'flex', flexDirection: 'column', gap: 12 }`;
  }

  const children = `        <SectionHeader title="List ${variant}" subtitle="${isGrid ? 'Grid layout' : 'List layout'}" />
        <div style={${containerStyle}}>
${items}
        </div>`;

  const deps = isGrid
    ? [defSectionHeader(), defAvatar(), defBadge()]
    : [defSectionHeader(), defFeatureItem()];

  const rootStyle = `{ padding: 24, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 16 }`;
  return wrapComponentWithDeps(`lists_grids_${pad(variant)}`, root(rootStyle, children), deps);
}

// ---------------------------------------------------------------------------
// Badges & Tags (5 variants) — uses Badge, Tag, Chip
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

  const badgeItems = labels.map((label, i) => {
    const color = colors[i % colors.length]!;
    return `          <Badge label="${label}" color="${color}" />`;
  }).join('\n');

  const tagItems = labels.map((label, i) => {
    const color = colors[i % colors.length]!;
    return `          <Tag label="${label}" color="${color}" />`;
  }).join('\n');

  const chipItems = labels.map((label, i) => {
    const color = colors[i % colors.length]!;
    return `          <Chip label="${label}" selected={${i === 0}} color="${color}" />`;
  }).join('\n');

  const children = `        <SectionHeader title="Badges" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
${badgeItems}
        </div>
        <SectionHeader title="Tags" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
${tagItems}
        </div>
        <SectionHeader title="Chips" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
${chipItems}
        </div>`;

  const rootStyle = `{ padding: 24, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: 16 }`;
  return wrapComponentWithDeps(`badges_tags_${pad(variant)}`, root(rootStyle, children), [defSectionHeader(), defBadge(), defTag(), defChip()]);
}

// ---------------------------------------------------------------------------
// Combined Complex (15 variants) — heavy component composition
// ---------------------------------------------------------------------------

function generateCombinedComplex(variant: number): string {
  const accentColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#2c3e50'];
  const accent = accentColors[(variant - 1) % accentColors.length]!;

  if (variant <= 5) {
    // Dashboard layout: sidebar + main with stats, cards, progress
    const sidebarItems = ['Overview', 'Analytics', 'Settings'].map((item, i) =>
      `            <NavItem label="${item}" active={${i === 0}} color="#fff" />`
    ).join('\n');

    const statItems = ['Users', 'Revenue', 'Orders'].map((label, i) =>
      `              <Stat value="${(i + 1) * 1234}" label="${label}" color="${accent}" />`
    ).join('\n');

    return wrapComponentWithDeps(`combined_complex_${pad(variant)}`, root(
      `{ display: 'flex', flexDirection: 'row', minHeight: 400, backgroundColor: '#f5f5f5' }`,
      `        <div style={{ width: 200, backgroundColor: '#2c3e50', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Dashboard</h3>
${sidebarItems}
        </div>
        <div style={{ flexGrow: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionHeader title="Overview" subtitle="Dashboard stats" />
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
${statItems}
          </div>
          <Card title="Recent Activity" accentColor="${accent}">
            <ProgressBar percent={65} color="${accent}" />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Badge label="Active" color="#2ecc71" />
              <Badge label="In Progress" color="#f39c12" />
            </div>
          </Card>
        </div>`,
    ), [defNavItem(), defSectionHeader(), defStat(), defCard(), defProgressBar(), defBadge()]);
  } else if (variant <= 10) {
    // Landing page: hero + features + CTA
    const featureItems = ['Fast', 'Secure', 'Scalable'].map((f) =>
      `            <FeatureItem icon="${f[0]}" title="${f}" description="Lorem ipsum dolor sit amet." />`
    ).join('\n');

    return wrapComponentWithDeps(`combined_complex_${pad(variant)}`, root(
      `{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }`,
      `        <div style={{ backgroundColor: '${accent}', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Badge label="New" color="rgba(255,255,255,0.2)" textColor="#fff" />
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>Welcome</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center' as const }}>Build amazing things with our platform.</p>
          <Button color="#fff" textColor="${accent}">Get Started</Button>
        </div>
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHeader title="Features" subtitle="What we offer" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
${featureItems}
          </div>
        </div>`,
    ), [defBadge(), defButton(), defSectionHeader(), defFeatureItem()]);
  } else {
    // Profile page: avatar + info + settings sections
    const settingsSections = ['General', 'Notifications'].map((section) =>
      `        <Card title="${section}">
          <ListItem label="Setting option" description="Description of this setting" />
          <Divider />
          <ListItem label="Another option" description="More details here" />
        </Card>`
    ).join('\n');

    return wrapComponentWithDeps(`combined_complex_${pad(variant)}`, root(
      `{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, backgroundColor: '#f5f5f5' }`,
      `        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e0e0e0' }}>
          <Avatar color="${accent}" size={64} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#333' }}>User ${variant}</h2>
            <Badge label="Pro" color="${accent}" />
          </div>
        </div>
${settingsSections}`,
    ), [defAvatar(), defBadge(), defCard(), defListItem(), defDivider()]);
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
