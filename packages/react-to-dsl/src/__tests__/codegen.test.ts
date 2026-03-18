import { describe, it, expect } from 'vitest';
import { generateDslCode } from '../codegen.js';
import type { DslNode } from '@figma-dsl/core';

describe('generateDslCode', () => {
  it('generates a simple frame', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Container',
      visible: true,
      opacity: 1,
      size: { x: 320, y: 200 },
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 }, opacity: 1, visible: true }],
    };

    const code = generateDslCode(node);
    expect(code).toContain("import {");
    expect(code).toContain("frame,");
    expect(code).toContain("solid,");
    expect(code).toContain("export default frame('Container'");
    expect(code).toContain("size: { x: 320, y: 200 }");
    expect(code).toContain("solid('#ffffff')");
  });

  it('generates a text node', () => {
    const node: DslNode = {
      type: 'TEXT',
      name: 'Hello World',
      characters: 'Hello World',
      visible: true,
      opacity: 1,
      textStyle: {
        fontSize: 24,
        fontWeight: 700,
        color: '#111827',
      },
      fills: [{ type: 'SOLID', color: { r: 0.067, g: 0.094, b: 0.153, a: 1 }, opacity: 1, visible: true }],
    };

    const code = generateDslCode(node);
    expect(code).toContain("text('Hello World'");
    expect(code).toContain('fontSize: 24');
    expect(code).toContain('fontWeight: 700');
    expect(code).toContain("color: '#111827'");
  });

  it('generates auto-layout with spacing and padding', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Row',
      visible: true,
      opacity: 1,
      autoLayout: {
        direction: 'HORIZONTAL',
        spacing: 16,
        padX: 24,
        padY: 12,
        align: 'CENTER',
        counterAlign: 'CENTER',
      },
    };

    const code = generateDslCode(node);
    expect(code).toContain('horizontal(');
    expect(code).toContain('spacing: 16');
    expect(code).toContain('padX: 24');
    expect(code).toContain('padY: 12');
    expect(code).toContain("align: 'CENTER'");
    expect(code).toContain("counterAlign: 'CENTER'");
  });

  it('generates vertical auto-layout', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Col',
      visible: true,
      opacity: 1,
      autoLayout: { direction: 'VERTICAL', spacing: 8 },
    };

    const code = generateDslCode(node);
    expect(code).toContain('vertical(');
    expect(code).toContain('spacing: 8');
  });

  it('generates component when asComponent is true', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Button',
      visible: true,
      opacity: 1,
    };

    const code = generateDslCode(node, { asComponent: true });
    expect(code).toContain("component('Button'");
    expect(code).toContain('component,');
  });

  it('generates nested children', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Parent',
      visible: true,
      opacity: 1,
      autoLayout: { direction: 'VERTICAL', spacing: 8 },
      children: [
        {
          type: 'TEXT',
          name: 'Title',
          characters: 'Title',
          visible: true,
          opacity: 1,
          textStyle: { fontSize: 32, fontWeight: 700, color: '#000000' },
          fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 }, opacity: 1, visible: true }],
        },
        {
          type: 'FRAME',
          name: 'Inner',
          visible: true,
          opacity: 1,
          fills: [{ type: 'SOLID', color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, opacity: 1, visible: true }],
          size: { x: 100, y: 50 },
        },
      ],
    };

    const code = generateDslCode(node);
    expect(code).toContain('children: [');
    expect(code).toContain("text('Title'");
    expect(code).toContain("frame('Inner'");
  });

  it('generates gradient fills', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'GradientBox',
      visible: true,
      opacity: 1,
      fills: [{
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          { color: { r: 0.486, g: 0.227, b: 0.929, a: 1 }, position: 0 },
          { color: { r: 0.31, g: 0.275, b: 0.898, a: 1 }, position: 1 },
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        opacity: 1,
        visible: true,
      }],
    };

    const code = generateDslCode(node);
    expect(code).toContain('gradient(');
    expect(code).toContain('hex:');
    expect(code).toContain('position: 0');
    expect(code).toContain('position: 1');
  });

  it('generates strokes', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Bordered',
      visible: true,
      opacity: 1,
      strokes: [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' }],
    };

    const code = generateDslCode(node);
    expect(code).toContain('strokes:');
    expect(code).toContain('weight: 1');
    expect(code).toContain("align: 'INSIDE'");
  });

  it('generates cornerRadius', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Rounded',
      visible: true,
      opacity: 1,
      cornerRadius: 9999,
    };

    const code = generateDslCode(node);
    expect(code).toContain('cornerRadius: 9999');
  });

  it('generates opacity', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Faded',
      visible: true,
      opacity: 0.5,
    };

    const code = generateDslCode(node);
    expect(code).toContain('opacity: 0.5');
  });

  it('generates clipContent', () => {
    const node: DslNode = {
      type: 'FRAME',
      name: 'Clipped',
      visible: true,
      opacity: 1,
      clipContent: true,
    };

    const code = generateDslCode(node);
    expect(code).toContain('clipContent: true');
  });

  it('escapes special characters in strings', () => {
    const node: DslNode = {
      type: 'TEXT',
      name: "It's a \"test\"",
      characters: "It's a \"test\"",
      visible: true,
      opacity: 1,
    };

    const code = generateDslCode(node);
    // Single quotes are escaped, double quotes are fine in single-quoted strings
    expect(code).toContain("It\\'s a \"test\"");
  });
});
