import { describe, it, expect, beforeAll } from 'vitest';
import { resolveLayout } from '../layout-resolver.js';
import { TextMeasurer } from '../text-measurer.js';
import type { DslNode, AutoLayoutConfig } from '../../../dsl-core/src/types.js';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = resolve(__dirname, '..', '..', '..', 'dsl-core', 'fonts');

let measurer: TextMeasurer;

beforeAll(() => {
  measurer = new TextMeasurer();
  measurer.loadFont(resolve(fontsDir, 'Inter-Regular.otf'), 'Inter', 400);
  measurer.loadFont(resolve(fontsDir, 'Inter-Medium.otf'), 'Inter', 500);
  measurer.loadFont(resolve(fontsDir, 'Inter-SemiBold.otf'), 'Inter', 600);
  measurer.loadFont(resolve(fontsDir, 'Inter-Bold.otf'), 'Inter', 700);
});

function h(overrides?: Partial<AutoLayoutConfig>): AutoLayoutConfig {
  return Object.freeze({ direction: 'HORIZONTAL' as const, ...overrides });
}

function v(overrides?: Partial<AutoLayoutConfig>): AutoLayoutConfig {
  return Object.freeze({ direction: 'VERTICAL' as const, ...overrides });
}

function makeText(chars: string, fontSize = 14, overrides: Partial<DslNode> = {}): DslNode {
  return Object.freeze({
    type: 'TEXT' as const,
    name: chars,
    characters: chars,
    textStyle: { fontSize },
    opacity: 1,
    visible: true,
    children: Object.freeze([]),
    ...overrides,
  }) as DslNode;
}

function makeRect(name: string, w: number, h: number, overrides: Partial<DslNode> = {}): DslNode {
  return Object.freeze({
    type: 'RECTANGLE' as const,
    name,
    size: { x: w, y: h },
    opacity: 1,
    visible: true,
    children: Object.freeze([]),
    ...overrides,
  }) as DslNode;
}

function makeFrame(name: string, autoLayout: AutoLayoutConfig, children: DslNode[], overrides: Partial<DslNode> = {}): DslNode {
  return Object.freeze({
    type: 'FRAME' as const,
    name,
    autoLayout,
    opacity: 1,
    visible: true,
    children: Object.freeze(children),
    ...overrides,
  }) as DslNode;
}

describe('Layout resolver — HUG sizing', () => {
  it('computes HUG size for horizontal frame with fixed children', () => {
    const f = makeFrame('Row', h({ spacing: 8, padX: 16, padY: 8 }), [
      makeRect('A', 50, 30),
      makeRect('B', 40, 20),
    ]);
    const resolved = resolveLayout(f, measurer);
    // width: 16 + 50 + 8 + 40 + 16 = 130
    // height: 8 + max(30, 20) + 8 = 46
    expect(resolved.size!.x).toBeCloseTo(130, 0);
    expect(resolved.size!.y).toBeCloseTo(46, 0);
  });

  it('computes HUG size for vertical frame with fixed children', () => {
    const f = makeFrame('Col', v({ spacing: 12, padX: 16, padY: 16 }), [
      makeRect('A', 100, 30),
      makeRect('B', 80, 40),
    ]);
    const resolved = resolveLayout(f, measurer);
    // width: 16 + max(100, 80) + 16 = 132
    // height: 16 + 30 + 12 + 40 + 16 = 114
    expect(resolved.size!.x).toBeCloseTo(132, 0);
    expect(resolved.size!.y).toBeCloseTo(114, 0);
  });
});

describe('Layout resolver — Child positioning', () => {
  it('positions children sequentially in horizontal layout', () => {
    const f = makeFrame('Row', h({ spacing: 10, padX: 5, padY: 5 }), [
      makeRect('A', 20, 20),
      makeRect('B', 30, 20),
    ]);
    const resolved = resolveLayout(f, measurer);
    const [a, b] = resolved.children!;
    // A at (5, 5), B at (5+20+10, 5) = (35, 5)
    expect(a!._resolvedPosition).toEqual({ x: 5, y: 5 });
    expect(b!._resolvedPosition).toEqual({ x: 35, y: 5 });
  });

  it('positions children sequentially in vertical layout', () => {
    const f = makeFrame('Col', v({ spacing: 10, padX: 5, padY: 5 }), [
      makeRect('A', 20, 20),
      makeRect('B', 20, 30),
    ]);
    const resolved = resolveLayout(f, measurer);
    const [a, b] = resolved.children!;
    // A at (5, 5), B at (5, 5+20+10) = (5, 35)
    expect(a!._resolvedPosition).toEqual({ x: 5, y: 5 });
    expect(b!._resolvedPosition).toEqual({ x: 5, y: 35 });
  });
});

describe('Layout resolver — FIXED sizing', () => {
  it('uses explicit size for FIXED frame', () => {
    const f = makeFrame('F', h({ spacing: 0 }), [
      makeRect('A', 50, 30),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    expect(resolved.size!.x).toBe(200);
    expect(resolved.size!.y).toBe(100);
  });
});

describe('Layout resolver — FILL sizing', () => {
  it('distributes remaining space to FILL children on primary axis', () => {
    const f = makeFrame('F', h({ spacing: 0, padX: 0, padY: 0 }), [
      makeRect('Fixed', 50, 30),
      makeRect('Fill', 10, 30, { layoutSizingHorizontal: 'FILL' } as Partial<DslNode>),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    // FILL child gets remaining: 200 - 50 = 150
    expect(resolved.children![1]!.size!.x).toBeCloseTo(150, 0);
  });

  it('distributes space equally among multiple FILL children', () => {
    const f = makeFrame('F', h({ spacing: 0, padX: 0, padY: 0 }), [
      makeRect('F1', 10, 30, { layoutSizingHorizontal: 'FILL' } as Partial<DslNode>),
      makeRect('F2', 10, 30, { layoutSizingHorizontal: 'FILL' } as Partial<DslNode>),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    expect(resolved.children![0]!.size!.x).toBeCloseTo(100, 0);
    expect(resolved.children![1]!.size!.x).toBeCloseTo(100, 0);
  });

  it('FILL on counter axis stretches to container', () => {
    const f = makeFrame('F', h({ spacing: 0, padX: 0, padY: 0 }), [
      makeRect('A', 50, 30, { layoutSizingVertical: 'FILL' } as Partial<DslNode>),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    expect(resolved.children![0]!.size!.y).toBeCloseTo(100, 0);
  });

  it('treats FILL children inside HUG parents as HUG', () => {
    const child = makeRect('Fill', 50, 30, { layoutSizingHorizontal: 'FILL' } as Partial<DslNode>);
    const f = makeFrame('HugParent', h({ padX: 10, padY: 10 }), [child]);
    const resolved = resolveLayout(f, measurer);
    // FILL in HUG context keeps its intrinsic size
    expect(resolved.children![0]!.size!.x).toBe(50);
  });
});

describe('Layout resolver — Alignment', () => {
  it('CENTER primary axis alignment centers child block', () => {
    const f = makeFrame('F', h({ align: 'CENTER', padX: 0, padY: 0 }), [
      makeRect('A', 50, 30),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    // Centered: (200 - 50) / 2 = 75
    expect(resolved.children![0]!._resolvedPosition!.x).toBeCloseTo(75, 0);
  });

  it('MAX primary axis alignment packs to end', () => {
    const f = makeFrame('F', h({ align: 'MAX', padX: 0, padY: 0 }), [
      makeRect('A', 50, 30),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    // Max: 200 - 50 = 150
    expect(resolved.children![0]!._resolvedPosition!.x).toBeCloseTo(150, 0);
  });

  it('SPACE_BETWEEN distributes spacing evenly', () => {
    const f = makeFrame('F', h({ align: 'SPACE_BETWEEN', padX: 0, padY: 0 }), [
      makeRect('A', 30, 20),
      makeRect('B', 30, 20),
      makeRect('C', 30, 20),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    const [a, b, c] = resolved.children!;
    expect(a!._resolvedPosition!.x).toBeCloseTo(0, 0);
    // Remaining: 200 - 90 = 110, gaps: 2, each gap: 55
    expect(b!._resolvedPosition!.x).toBeCloseTo(85, 0);
    expect(c!._resolvedPosition!.x).toBeCloseTo(170, 0);
  });

  it('CENTER counter axis alignment centers children', () => {
    const f = makeFrame('F', h({ counterAlign: 'CENTER', padX: 0, padY: 0 }), [
      makeRect('Tall', 30, 50),
      makeRect('Short', 30, 20),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    // Tall centered: (100 - 50) / 2 = 25
    expect(resolved.children![0]!._resolvedPosition!.y).toBeCloseTo(25, 0);
    // Short centered: (100 - 20) / 2 = 40
    expect(resolved.children![1]!._resolvedPosition!.y).toBeCloseTo(40, 0);
  });

  it('MAX counter axis alignment packs to end', () => {
    const f = makeFrame('F', h({ counterAlign: 'MAX', padX: 0, padY: 0 }), [
      makeRect('A', 30, 20),
    ], { size: { x: 200, y: 100 } });
    const resolved = resolveLayout(f, measurer);
    expect(resolved.children![0]!._resolvedPosition!.y).toBeCloseTo(80, 0);
  });
});

describe('Layout resolver — Text measurement integration', () => {
  it('measures text nodes and computes HUG parent size', () => {
    const f = makeFrame('Button', h({ spacing: 8, padX: 16, padY: 8 }), [
      makeText('Click me', 14),
    ]);
    const resolved = resolveLayout(f, measurer);
    // Text should have been measured, parent HUG includes it
    expect(resolved.size!.x).toBeGreaterThan(32); // At least padding
    expect(resolved.size!.y).toBeGreaterThan(16); // At least padding
  });
});

describe('Layout resolver — Nested layout', () => {
  it('handles nested auto-layout frames', () => {
    const badge = makeFrame('Badge', h({ padX: 8, padY: 2 }), [
      makeText('3', 12),
    ]);
    const row = makeFrame('Row', h({ spacing: 12, padX: 8, padY: 4, counterAlign: 'CENTER' }), [
      makeText('Label', 14),
      badge,
    ]);
    const resolved = resolveLayout(row, measurer);
    // Should compute sizes for all nested elements
    expect(resolved.size!.x).toBeGreaterThan(0);
    expect(resolved.size!.y).toBeGreaterThan(0);
    expect(resolved.children).toHaveLength(2);
  });
});
