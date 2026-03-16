import { describe, it, expect } from 'vitest';
import { generatePluginInput } from './exporter.js';
import { compile } from '@figma-dsl/compiler';
import { canvas, frame, text, component } from '@figma-dsl/core';

describe('generatePluginInput() — canvas nodes', () => {
  it('encodes canvas metadata on exported node', () => {
    const node = canvas('Banner', {
      size: { x: 300, y: 200 },
      children: [text('Hello')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const root = input.components[0]!;
    expect(root.isCanvas).toBe(true);
    expect(root.canvasName).toBe('Banner');
  });

  it('marks canvas nodes as slots for Figma compatibility', () => {
    const node = canvas('Banner', {
      size: { x: 300, y: 200 },
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const root = input.components[0]!;
    expect(root.isSlot).toBe(true);
    expect(root.slotPropertyName).toBe('Banner');
  });

  it('preserves canvas children in export', () => {
    const node = canvas('Content', {
      size: { x: 200, y: 100 },
      children: [text('Title'), text('Body')],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const root = input.components[0]!;
    expect(root.children).toHaveLength(2);
  });

  it('handles canvas inside a component', () => {
    const node = component('Card', {
      size: { x: 400, y: 300 },
      children: [
        canvas('Hero', {
          size: { x: 400, y: 200 },
          children: [text('Image area')],
        }),
      ],
    });
    const compiled = compile(node);
    const input = generatePluginInput(compiled);
    const cardNode = input.components[0]!;
    const heroNode = cardNode.children[0]!;
    expect(heroNode.isCanvas).toBe(true);
    expect(heroNode.canvasName).toBe('Hero');
    expect(heroNode.isSlot).toBe(true);
  });
});
