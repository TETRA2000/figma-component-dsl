import { describe, it, expect, beforeAll } from 'vitest';
import { resolveLayout } from './layout-resolver.js';
import { textMeasurer } from './text-measurer.js';
import { frame, text, rectangle } from '@figma-dsl/core';
import { solid } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname2 = dirname(fileURLToPath(import.meta.url));
const fontDir = join(__dirname2, '../../dsl-core/fonts');

beforeAll(() => {
  textMeasurer.initialize(fontDir);
});

describe('resolveLayout() — basic sizes', () => {
  it('leaf shapes use explicit size', () => {
    const node = rectangle('R', { size: { x: 100, y: 50 } });
    const { sizes } = resolveLayout(node, textMeasurer);
    expect(sizes.get(node)).toEqual({ width: 100, height: 50 });
  });

  it('text nodes are measured', () => {
    const node = text('Hello', { fontSize: 14 });
    const { sizes } = resolveLayout(node, textMeasurer);
    const size = sizes.get(node)!;
    expect(size.width).toBeGreaterThan(0);
    expect(size.height).toBeGreaterThan(0);
  });
});

describe('resolveLayout() — HUG sizing', () => {
  it('horizontal frame hugs children', () => {
    const child = rectangle('R', { size: { x: 50, y: 30 } });
    const node = frame('Row', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      children: [child],
    });
    const { sizes } = resolveLayout(node, textMeasurer);
    const nodeSize = sizes.get(node)!;
    // width: 50 + 16 + 16 = 82
    expect(nodeSize.width).toBe(82);
    // height: 30 + 8 + 8 = 46
    expect(nodeSize.height).toBe(46);
  });

  it('horizontal frame with multiple children sums widths', () => {
    const c1 = rectangle('R1', { size: { x: 40, y: 20 } });
    const c2 = rectangle('R2', { size: { x: 60, y: 30 } });
    const node = frame('Row', {
      autoLayout: horizontal({ spacing: 10, padX: 5, padY: 5 }),
      children: [c1, c2],
    });
    const { sizes } = resolveLayout(node, textMeasurer);
    const nodeSize = sizes.get(node)!;
    // width: 40 + 60 + 10 + 5 + 5 = 120
    expect(nodeSize.width).toBe(120);
    // height: max(20, 30) + 5 + 5 = 40
    expect(nodeSize.height).toBe(40);
  });

  it('vertical frame hugs children', () => {
    const c1 = rectangle('R1', { size: { x: 100, y: 20 } });
    const c2 = rectangle('R2', { size: { x: 80, y: 30 } });
    const node = frame('Col', {
      autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
      children: [c1, c2],
    });
    const { sizes } = resolveLayout(node, textMeasurer);
    const nodeSize = sizes.get(node)!;
    // width: max(100, 80) + 16 + 16 = 132
    expect(nodeSize.width).toBe(132);
    // height: 20 + 30 + 12 + 16 + 16 = 94
    expect(nodeSize.height).toBe(94);
  });
});

describe('resolveLayout() — FIXED sizing', () => {
  it('fixed-size container ignores children for own size', () => {
    const child = rectangle('R', { size: { x: 200, y: 200 } });
    const node = frame('Fixed', {
      size: { x: 100, y: 100 },
      autoLayout: horizontal(),
      children: [child],
    });
    const { sizes } = resolveLayout(node, textMeasurer);
    expect(sizes.get(node)).toEqual({ width: 100, height: 100 });
  });
});

describe('resolveLayout() — FILL children', () => {
  it('FILL child takes remaining space', () => {
    const c1 = rectangle('Fixed', { size: { x: 60, y: 20 } });
    const c2 = rectangle('Fill', {
      size: { x: 0, y: 20 },
      layoutSizingHorizontal: 'FILL',
    });
    const node = frame('Container', {
      size: { x: 200, y: 40 },
      autoLayout: horizontal({ spacing: 10, padX: 10, padY: 10 }),
      children: [c1, c2],
    });
    const { sizes } = resolveLayout(node, textMeasurer);
    const fillSize = sizes.get(c2)!;
    // Available: 200 - 10 - 10 = 180. Fixed: 60. Spacing: 10. Remaining: 180 - 60 - 10 = 110
    expect(fillSize.width).toBe(110);
  });

  it('FILL inside HUG parent is treated as HUG', () => {
    const child = rectangle('R', {
      size: { x: 50, y: 20 },
      layoutSizingHorizontal: 'FILL',
    });
    const node = frame('HugParent', {
      autoLayout: horizontal({ padX: 8, padY: 4 }),
      children: [child],
    });
    const { sizes } = resolveLayout(node, textMeasurer);
    // Parent should HUG to child's intrinsic size
    expect(sizes.get(node)!.width).toBe(50 + 8 + 8);
  });
});

describe('resolveLayout() — FILL inside FILL container', () => {
  it('FILL children expand inside a FILL-sized container', () => {
    const c1 = rectangle('R1', {
      size: { x: 0, y: 30 },
      layoutSizingHorizontal: 'FILL',
    });
    const c2 = rectangle('R2', {
      size: { x: 0, y: 30 },
      layoutSizingHorizontal: 'FILL',
    });
    // Inner row is FILL-sized (no explicit width or widthSizing)
    const innerRow = frame('InnerRow', {
      autoLayout: horizontal({ spacing: 10 }),
      layoutSizingHorizontal: 'FILL',
      children: [c1, c2],
    });
    // Outer container has fixed width
    const outer = frame('Outer', {
      size: { x: 400, y: 100 },
      autoLayout: vertical({ spacing: 0, padX: 20, padY: 10 }),
      children: [innerRow],
    });
    const { sizes } = resolveLayout(outer, textMeasurer);
    // InnerRow gets FILL: 400 - 20 - 20 = 360
    expect(sizes.get(innerRow)!.width).toBe(360);
    // Each child: (360 - 10) / 2 = 175
    expect(sizes.get(c1)!.width).toBe(175);
    expect(sizes.get(c2)!.width).toBe(175);
  });

  it('three FILL children share space equally inside FILL container', () => {
    const cards = [0, 1, 2].map(i =>
      rectangle(`Card${i}`, {
        size: { x: 0, y: 40 },
        layoutSizingHorizontal: 'FILL',
      })
    );
    const row = frame('Row', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: cards,
    });
    const page = frame('Page', {
      size: { x: 960, y: 200 },
      autoLayout: vertical({ spacing: 0, padX: 32, padY: 0 }),
      children: [row],
    });
    const { sizes } = resolveLayout(page, textMeasurer);
    // Row: 960 - 32 - 32 = 896
    expect(sizes.get(row)!.width).toBe(896);
    // Each card: (896 - 16*2) / 3 = 864/3 = 288
    const cardWidth = sizes.get(cards[0]!)!.width;
    expect(cardWidth).toBeCloseTo(288, 0);
    expect(sizes.get(cards[1]!)!.width).toBeCloseTo(288, 0);
    expect(sizes.get(cards[2]!)!.width).toBeCloseTo(288, 0);
  });
});

describe('resolveLayout() — positioning', () => {
  it('positions children along primary axis with spacing', () => {
    const c1 = rectangle('R1', { size: { x: 40, y: 20 } });
    const c2 = rectangle('R2', { size: { x: 60, y: 30 } });
    const node = frame('Row', {
      autoLayout: horizontal({ spacing: 10, padX: 5, padY: 5 }),
      children: [c1, c2],
    });
    const { offsets } = resolveLayout(node, textMeasurer);
    expect(offsets.get(c1)).toEqual({ x: 5, y: 5 });
    expect(offsets.get(c2)).toEqual({ x: 55, y: 5 }); // 5 + 40 + 10
  });

  it('center aligns children on counter axis', () => {
    const short = rectangle('Short', { size: { x: 40, y: 10 } });
    const tall = rectangle('Tall', { size: { x: 40, y: 30 } });
    const node = frame('Row', {
      autoLayout: horizontal({ spacing: 0, padX: 0, padY: 0, counterAlign: 'CENTER' }),
      children: [short, tall],
    });
    const { sizes, offsets } = resolveLayout(node, textMeasurer);
    const nodeHeight = sizes.get(node)!.height; // max(10, 30) = 30
    expect(nodeHeight).toBe(30);
    // Short centered: (30 - 10) / 2 = 10
    expect(offsets.get(short)!.y).toBe(10);
    expect(offsets.get(tall)!.y).toBe(0);
  });

  it('max aligns children on counter axis', () => {
    const short = rectangle('Short', { size: { x: 40, y: 10 } });
    const tall = rectangle('Tall', { size: { x: 40, y: 30 } });
    const node = frame('Row', {
      autoLayout: horizontal({ counterAlign: 'MAX' }),
      children: [short, tall],
    });
    const { offsets } = resolveLayout(node, textMeasurer);
    expect(offsets.get(short)!.y).toBe(20); // 30 - 10
    expect(offsets.get(tall)!.y).toBe(0);
  });
});

describe('resolveLayout() — primary axis alignment', () => {
  it('CENTER primary alignment', () => {
    const child = rectangle('R', { size: { x: 40, y: 20 } });
    const node = frame('Row', {
      size: { x: 100, y: 20 },
      autoLayout: horizontal({ align: 'CENTER' }),
      children: [child],
    });
    const { offsets } = resolveLayout(node, textMeasurer);
    // Available: 100. Child: 40. Offset: (100 - 40) / 2 = 30
    expect(offsets.get(child)!.x).toBe(30);
  });

  it('MAX primary alignment', () => {
    const child = rectangle('R', { size: { x: 40, y: 20 } });
    const node = frame('Row', {
      size: { x: 100, y: 20 },
      autoLayout: horizontal({ align: 'MAX' }),
      children: [child],
    });
    const { offsets } = resolveLayout(node, textMeasurer);
    expect(offsets.get(child)!.x).toBe(60); // 100 - 40
  });

  it('SPACE_BETWEEN primary alignment', () => {
    const c1 = rectangle('R1', { size: { x: 20, y: 20 } });
    const c2 = rectangle('R2', { size: { x: 20, y: 20 } });
    const c3 = rectangle('R3', { size: { x: 20, y: 20 } });
    const node = frame('Row', {
      size: { x: 100, y: 20 },
      autoLayout: horizontal({ align: 'SPACE_BETWEEN' }),
      children: [c1, c2, c3],
    });
    const { offsets } = resolveLayout(node, textMeasurer);
    // Available: 100. Children total: 60. Remaining: 40. Gaps: 2. Each gap: 20
    expect(offsets.get(c1)!.x).toBe(0);
    expect(offsets.get(c2)!.x).toBe(40); // 20 + 20
    expect(offsets.get(c3)!.x).toBe(80); // 40 + 20 + 20
  });
});

describe('resolveLayout() — worked examples from design doc', () => {
  it('Example 1: Button with label', () => {
    const label = text('Click me', { fontSize: 14, fontWeight: 500 });
    const button = frame('Button', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      fills: [solid('#7c3aed')],
      children: [label],
    });
    const { sizes, offsets } = resolveLayout(button, textMeasurer);
    const buttonSize = sizes.get(button)!;
    const textSize = sizes.get(label)!;

    // Text should have measured width
    expect(textSize.width).toBeGreaterThan(30);
    // Button HUG: text.width + 16 + 16
    expect(buttonSize.width).toBeCloseTo(textSize.width + 32, 0);
    // Button height: text.height + 8 + 8
    expect(buttonSize.height).toBeCloseTo(textSize.height + 16, 0);
    // Text positioned at padding offset
    expect(offsets.get(label)).toEqual({ x: 16, y: 8 });
  });

  it('Example 2: Vertical card with FILL-width title', () => {
    const title = text('Title', { fontSize: 18, layoutSizingHorizontal: 'FILL' });
    const body = text('Body text here', { fontSize: 14, layoutSizingHorizontal: 'FILL' });
    const card = frame('Card', {
      size: { x: 300, y: 200 },
      autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
      children: [title, body],
    });
    const { sizes, offsets } = resolveLayout(card, textMeasurer);
    // Card is FIXED: 300x200
    expect(sizes.get(card)).toEqual({ width: 300, height: 200 });
    // Both texts get FILL width: 300 - 16 - 16 = 268
    expect(sizes.get(title)!.width).toBe(268);
    expect(sizes.get(body)!.width).toBe(268);
    // Title at (16, 16)
    expect(offsets.get(title)).toEqual({ x: 16, y: 16 });
  });

  it('Example 3: Nested layout (badge inside horizontal row)', () => {
    const badgeText = text('3', { fontSize: 12 });
    const badge = frame('Badge', {
      autoLayout: horizontal({ padX: 8, padY: 2 }),
      fills: [solid('#ef4444')],
      children: [badgeText],
    });
    const label = text('Label', { fontSize: 14 });
    const row = frame('Row', {
      autoLayout: horizontal({ spacing: 12, padX: 8, padY: 4, counterAlign: 'CENTER' }),
      children: [label, badge],
    });

    const { sizes, offsets } = resolveLayout(row, textMeasurer);
    const badgeSize = sizes.get(badge)!;
    const labelSize = sizes.get(label)!;
    const rowSize = sizes.get(row)!;

    // Badge should be HUG-sized
    expect(badgeSize.width).toBeGreaterThan(10);
    // Row HUG: 8 + label.w + 12 + badge.w + 8
    expect(rowSize.width).toBeCloseTo(8 + labelSize.width + 12 + badgeSize.width + 8, 0);

    // Counter axis centering
    const rowContentHeight = rowSize.height - 4 - 4;
    const labelOffset = offsets.get(label)!;
    const expectedLabelY = 4 + (rowContentHeight - labelSize.height) / 2;
    expect(labelOffset.y).toBeCloseTo(expectedLabelY, 0);
  });
});

describe('resolveLayout() — hidden children', () => {
  it('skips invisible children in layout calculations', () => {
    const visible = rectangle('V', { size: { x: 50, y: 30 } });
    const hidden = rectangle('H', { size: { x: 100, y: 100 }, visible: false });
    const node = frame('Row', {
      autoLayout: horizontal({ padX: 0, padY: 0 }),
      children: [visible, hidden],
    });
    const { sizes } = resolveLayout(node, textMeasurer);
    // Only visible child contributes to size
    expect(sizes.get(node)!.width).toBe(50);
  });
});

describe('resolveLayout() — per-side padding', () => {
  it('supports per-side padding', () => {
    const child = rectangle('R', { size: { x: 50, y: 30 } });
    const node = frame('Container', {
      autoLayout: vertical({
        padTop: 10,
        padRight: 20,
        padBottom: 30,
        padLeft: 40,
      }),
      children: [child],
    });
    const { sizes, offsets } = resolveLayout(node, textMeasurer);
    expect(sizes.get(node)!.width).toBe(50 + 40 + 20); // 110
    expect(sizes.get(node)!.height).toBe(30 + 10 + 30); // 70
    expect(offsets.get(child)).toEqual({ x: 40, y: 10 });
  });
});
