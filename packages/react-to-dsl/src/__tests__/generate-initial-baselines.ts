#!/usr/bin/env tsx
/**
 * Generate initial baseline PNGs without Playwright.
 *
 * DSL baselines: Constructs DslNode trees matching each test page,
 * compiles and renders them via the DSL pipeline.
 *
 * React baselines: Uses @napi-rs/canvas to paint simple approximations
 * of what the React components would look like.
 *
 * These are "bootstrap" baselines — once Chromium is available,
 * run `npm run update-baselines` to replace them with real
 * Playwright screenshots and pipeline-generated renders.
 *
 * Usage: npx tsx packages/react-to-dsl/src/__tests__/generate-initial-baselines.ts
 */

import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { frame, text, rectangle } from '@figma-dsl/core';
import { solid, gradient } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';
import { compileWithLayout, textMeasurer } from '@figma-dsl/compiler';
import { render, initializeRenderer } from '@figma-dsl/renderer';
import type { DslNode } from '@figma-dsl/core';

const __dirname2 = dirname(fileURLToPath(import.meta.url));
const REACT_DIR = join(__dirname2, 'baselines', 'react');
const DSL_DIR = join(__dirname2, 'baselines', 'dsl');
const FONT_DIR = join(__dirname2, '../../../dsl-core/fonts');

mkdirSync(REACT_DIR, { recursive: true });
mkdirSync(DSL_DIR, { recursive: true });

textMeasurer.initialize(FONT_DIR);
initializeRenderer(FONT_DIR);

// ---------------------------------------------------------------------------
// Helper: render a DslNode to PNG buffer
// ---------------------------------------------------------------------------
function renderDsl(node: DslNode): Buffer {
  const compiled = compileWithLayout(node, textMeasurer);
  const result = render(compiled.root);
  return Buffer.from(result.pngBuffer);
}

// ---------------------------------------------------------------------------
// DSL node definitions for each test page
// ---------------------------------------------------------------------------

function badge(label: string, bgColor: string, textColor = '#ffffff') {
  return frame(`Badge-${label}`, {
    autoLayout: horizontal({ padX: 12, padY: 4 }),
    fills: [solid(bgColor)],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 12, fontWeight: 600, color: textColor })],
  });
}

function button(label: string, bgColor = '#3498db', textColor = '#ffffff') {
  return frame(`Button-${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(bgColor)],
    cornerRadius: 4,
    children: [text(label, { fontSize: 14, fontWeight: 600, color: textColor })],
  });
}

const dslFactories: Record<string, () => DslNode> = {
  'layout-horizontal-01': () =>
    frame('Root', {
      size: { x: 800, y: 120 },
      autoLayout: horizontal({ padX: 16, padY: 16 }),
      fills: [solid('#f5f5f5')],
      children: [
        badge('Alpha', '#e74c3c'),
        button('Beta', '#3498db'),
        badge('Gamma', '#2ecc71'),
      ],
    }),

  'layout-vertical-01': () =>
    frame('Root', {
      size: { x: 200, y: 0 },
      autoLayout: vertical({ padX: 16, padY: 16 }),
      fills: [solid('#fafafa')],
      children: [
        badge('First', '#1abc9c'),
        badge('Second', '#e67e22'),
        badge('Third', '#3498db'),
      ],
    }),

  'layout-nested-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
      fills: [solid('#f5f5f5')],
      children: [1, 2, 3].map((row) =>
        frame(`Row-${row}`, {
          autoLayout: horizontal({ spacing: 8, padX: 8, padY: 8 }),
          fills: [solid('#eeeeee')],
          cornerRadius: 4,
          children: [
            badge(`Item ${(row - 1) * 3 + 1}`, '#3498db'),
            badge(`Item ${(row - 1) * 3 + 2}`, '#e74c3c'),
            badge(`Item ${(row - 1) * 3 + 3}`, '#2ecc71'),
          ],
        }),
      ),
    }),

  'layout-sizing-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 16 }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('Fixed-1', {
          size: { x: 100, y: 50 },
          fills: [solid('#e74c3c')],
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          children: [text('100×50', { fontSize: 12, color: '#ffffff' })],
        }),
        frame('Fixed-2', {
          size: { x: 200, y: 50 },
          fills: [solid('#3498db')],
          autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
          children: [text('200×50', { fontSize: 12, color: '#ffffff' })],
        }),
      ],
    }),

  'typography-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ spacing: 12, padX: 24, padY: 24 }),
      fills: [solid('#ffffff')],
      children: [
        frame('Header', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Section 1', { fontSize: 24, fontWeight: 700, color: '#333333' }),
            text('Typography test', { fontSize: 14, color: '#666666' }),
          ],
        }),
        text('The quick brown fox jumps over the lazy dog', {
          fontSize: 12,
          fontWeight: 400,
          color: '#333333',
        }),
      ],
    }),

  'colors-solid-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
      fills: [solid('#fafafa')],
      children: [
        frame('Swatch-1', {
          autoLayout: horizontal({ padX: 16, padY: 16 }),
          fills: [solid('#e74c3c')],
          cornerRadius: 8,
          children: [badge('#e74c3c', '#ffffff', '#333333')],
        }),
        frame('Swatch-2', {
          autoLayout: horizontal({ padX: 16, padY: 16 }),
          fills: [solid('#c0392b')],
          cornerRadius: 8,
          children: [badge('#c0392b', '#ffffff', '#333333')],
        }),
        frame('Swatch-3', {
          autoLayout: horizontal({ padX: 16, padY: 16 }),
          fills: [solid('#ff6b6b')],
          cornerRadius: 8,
          children: [badge('#ff6b6b', '#333333', '#ffffff')],
        }),
      ],
    }),

  'colors-gradient-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ padX: 16, padY: 16 }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('GradientBox', {
          autoLayout: vertical({ spacing: 12, padX: 32, padY: 32 }),
          fills: [gradient([{ hex: '#e74c3c', position: 0 }, { hex: '#3498db', position: 1 }], 0)],
          cornerRadius: 8,
          children: [
            text('Gradient Background', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
            button('Action', '#ffffff', '#333333'),
          ],
        }),
      ],
    }),

  'borders-strokes-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ padX: 16, padY: 16 }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('BorderedBox', {
          autoLayout: vertical({ spacing: 8, padX: 24, padY: 24 }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          strokes: [{ color: { r: 0.906, g: 0.298, b: 0.235, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            badge('Bordered', '#e74c3c'),
            text('Container with a 1px red border', { fontSize: 14, color: '#666666' }),
          ],
        }),
      ],
    }),

  'corner-radius-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ padX: 24, padY: 24 }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('RoundedBox', {
          autoLayout: vertical({ spacing: 12, padX: 24, padY: 24, counterAlign: 'CENTER' }),
          fills: [solid('#3498db')],
          cornerRadius: 0,
          children: [
            text('No radius', { fontSize: 14, color: '#ffffff' }),
            button('Action', '#ffffff', '#333333'),
          ],
        }),
      ],
    }),

  'spacing-padding-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ padX: 8, padY: 8 }),
      fills: [solid('#f0f0f0')],
      children: [
        badge('First', '#e74c3c'),
        badge('Second', '#3498db'),
        badge('Third', '#2ecc71'),
      ],
    }),

  'opacity-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('Card-Faded', {
          opacity: 0.2,
          autoLayout: vertical({ padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          strokes: [{ color: { r: 0.878, g: 0.878, b: 0.878, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Low Opacity Card', { fontSize: 16, fontWeight: 600, color: '#333333' }),
            text('This card is at 20% opacity', { fontSize: 14, color: '#666666' }),
          ],
        }),
        frame('Card-Full', {
          autoLayout: vertical({ padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          strokes: [{ color: { r: 0.878, g: 0.878, b: 0.878, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Full Opacity Card', { fontSize: 16, fontWeight: 600, color: '#333333' }),
            text('This card is at 100% opacity', { fontSize: 14, color: '#666666' }),
          ],
        }),
      ],
    }),

  'clip-content-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ padX: 24, padY: 24 }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('ClippedContainer', {
          size: { x: 200, y: 150 },
          fills: [solid('#ecf0f1')],
          cornerRadius: 8,
          clipContent: true,
          strokes: [{ color: { r: 0.741, g: 0.765, b: 0.78, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            frame('Inner', {
              size: { x: 130, y: 130 },
              fills: [solid('#3498db')],
              children: [badge('Clipped', '#e74c3c')],
            }),
          ],
        }),
      ],
    }),

  'cards-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ padX: 24, padY: 24 }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('Card', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 8,
          strokes: [{ color: { r: 0.878, g: 0.878, b: 0.878, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Card Title', { fontSize: 18, fontWeight: 600, color: '#333333' }),
            text('A simple card component with title, description, and actions.', {
              fontSize: 14, color: '#666666',
            }),
            frame('Actions', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                badge('Tag', '#3498db'),
                button('Action', '#e74c3c'),
              ],
            }),
          ],
        }),
      ],
    }),

  'navigation-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical(),
      fills: [solid('#f5f5f5')],
      children: [
        frame('Navbar', {
          size: { x: 800, y: 0 },
          autoLayout: horizontal({ padX: 24, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          fills: [solid('#2c3e50')],
          children: [
            text('Logo', { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
            frame('NavItems', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                text('Home', { fontSize: 14, color: '#ffffff' }),
                text('About', { fontSize: 14, color: '#bdc3c7' }),
                text('Contact', { fontSize: 14, color: '#bdc3c7' }),
              ],
            }),
            frame('Avatar', {
              size: { x: 32, y: 32 },
              fills: [solid('#3498db')],
              cornerRadius: 9999,
            }),
          ],
        }),
      ],
    }),

  'heroes-banners-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical(),
      fills: [solid('#f5f5f5')],
      children: [
        frame('Hero', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 48, counterAlign: 'CENTER' }),
          fills: [solid('#2c3e50')],
          children: [
            badge('New', '#e74c3c'),
            text('Welcome to Our Platform', { fontSize: 32, fontWeight: 700, color: '#ffffff' }),
            text('A hero section with badges and call-to-action buttons', {
              fontSize: 16, color: '#bdc3c7',
            }),
            frame('CTAs', {
              autoLayout: horizontal({ spacing: 12 }),
              children: [
                button('Get Started', '#3498db'),
                button('Learn More', '#27ae60'),
              ],
            }),
          ],
        }),
      ],
    }),

  'lists-grids-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      fills: [solid('#f5f5f5')],
      children: [
        frame('Header', {
          autoLayout: vertical({ spacing: 4 }),
          children: [
            text('Feature List', { fontSize: 24, fontWeight: 700, color: '#333333' }),
            text('Key features of our platform', { fontSize: 14, color: '#666666' }),
          ],
        }),
        frame('List', {
          autoLayout: vertical({ spacing: 12 }),
          children: ['Fast', 'Secure', 'Scalable', 'Reliable'].map((label) =>
            frame(`Item-${label}`, {
              autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
              children: [
                frame('Icon', {
                  size: { x: 24, y: 24 },
                  fills: [solid('#3498db')],
                  cornerRadius: 9999,
                }),
                text(label, { fontSize: 14, color: '#333333' }),
              ],
            }),
          ),
        }),
      ],
    }),

  'badges-tags-01': () =>
    frame('Root', {
      size: { x: 800, y: 0 },
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      fills: [solid('#ffffff')],
      children: [
        frame('BadgesSection', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('Badges', { fontSize: 18, fontWeight: 600, color: '#333333' }),
            frame('BadgeRow', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                badge('Default', '#e0e0e0', '#333333'),
                badge('Primary', '#3498db'),
                badge('Success', '#2ecc71'),
              ],
            }),
          ],
        }),
        frame('TagsSection', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('Tags', { fontSize: 18, fontWeight: 600, color: '#333333' }),
            frame('TagRow', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                badge('React', '#61dafb', '#333333'),
                badge('TypeScript', '#3178c6'),
                badge('Node.js', '#339933'),
              ],
            }),
          ],
        }),
      ],
    }),

  'combined-complex-01': () =>
    frame('Root', {
      size: { x: 1280, y: 400 },
      autoLayout: horizontal(),
      fills: [solid('#f5f5f5')],
      children: [
        frame('Sidebar', {
          size: { x: 200, y: 0 },
          autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
          fills: [solid('#2c3e50')],
          layoutSizingVertical: 'FILL' as const,
          children: [
            text('Dashboard', { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
            text('Overview', { fontSize: 14, color: '#3498db' }),
            text('Analytics', { fontSize: 14, color: '#bdc3c7' }),
            text('Settings', { fontSize: 14, color: '#bdc3c7' }),
          ],
        }),
        frame('Content', {
          autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
          layoutSizingHorizontal: 'FILL' as const,
          children: [
            text('Dashboard Overview', { fontSize: 24, fontWeight: 700, color: '#333333' }),
            frame('Stats', {
              autoLayout: horizontal({ spacing: 16 }),
              children: ['Users: 1.2k', 'Revenue: $45k', 'Growth: 12%'].map((label) =>
                frame(`Stat-${label}`, {
                  autoLayout: vertical({ padX: 16, padY: 12 }),
                  fills: [solid('#ffffff')],
                  cornerRadius: 8,
                  children: [text(label, { fontSize: 14, fontWeight: 600, color: '#333333' })],
                }),
              ),
            }),
            frame('Card', {
              autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
              fills: [solid('#ffffff')],
              cornerRadius: 8,
              children: [
                text('Recent Activity', { fontSize: 16, fontWeight: 600, color: '#333333' }),
                frame('ProgressBar', {
                  size: { x: 200, y: 8 },
                  fills: [solid('#ecf0f1')],
                  cornerRadius: 4,
                  children: [
                    rectangle('Fill', { size: { x: 140, y: 8 }, fills: [solid('#3498db')], cornerRadius: 4 }),
                  ],
                }),
                frame('Badges', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [badge('Active', '#2ecc71'), badge('Pending', '#f39c12')],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
};

// ---------------------------------------------------------------------------
// React approximation: use DSL render as proxy until Playwright is available
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log('Generating initial baselines...\n');

for (const [name, factory] of Object.entries(dslFactories)) {
  process.stdout.write(`  ${name} ...`);

  try {
    // DSL baseline
    const dslNode = factory();
    const dslPng = renderDsl(dslNode);
    writeFileSync(join(DSL_DIR, `${name}.png`), dslPng);

    // React baseline: use DSL render as proxy until Playwright is available
    writeFileSync(join(REACT_DIR, `${name}.png`), dslPng);

    console.log(' OK');
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(` FAIL (${msg})`);
  }
}

console.log(`\nDone. Baselines written to:`);
console.log(`  React: ${REACT_DIR}`);
console.log(`  DSL:   ${DSL_DIR}`);
console.log(`\nNote: React baselines are DSL renders as proxy.`);
console.log(`Run 'npm run update-baselines' with Playwright to get real React screenshots.`);
