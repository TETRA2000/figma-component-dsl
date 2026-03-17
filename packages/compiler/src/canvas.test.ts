import { describe, it, expect } from 'vitest';
import { compile } from './compiler.js';
import { canvas, text, frame, component } from '@figma-dsl/core';

describe('compile() — canvas nodes', () => {
  it('preserves isCanvas and canvasName on compiled output', () => {
    const node = canvas('Banner', {
      size: { x: 300, y: 200 },
      children: [text('Hello')],
    });
    const result = compile(node);
    expect(result.root.isCanvas).toBe(true);
    expect(result.root.canvasName).toBe('Banner');
  });

  it('preserves canvasScale on compiled output', () => {
    const node = canvas('HiDPI', {
      size: { x: 300, y: 200 },
      scale: 2,
    });
    const result = compile(node);
    expect(result.root.canvasScale).toBe(2);
  });

  it('omits canvasScale when not specified', () => {
    const node = canvas('Banner', { size: { x: 100, y: 100 } });
    const result = compile(node);
    expect(result.root.canvasScale).toBeUndefined();
  });

  it('compiles children with standard layout', () => {
    const node = canvas('Content', {
      size: { x: 200, y: 100 },
      children: [
        text('Title', { fontSize: 24 }),
        text('Body', { fontSize: 14 }),
      ],
    });
    const result = compile(node);
    expect(result.root.children).toHaveLength(2);
    expect(result.root.children[0]!.type).toBe('TEXT');
    expect(result.root.children[1]!.type).toBe('TEXT');
  });

  it('canvas nodes outside COMPONENT compile without errors', () => {
    const node = frame('Page', {
      children: [
        canvas('Banner', {
          size: { x: 300, y: 200 },
          children: [text('Hello')],
        }),
      ],
    });
    const result = compile(node);
    expect(result.errors).toHaveLength(0);
    expect(result.root.children[0]!.isCanvas).toBe(true);
  });

  it('canvas nodes inside COMPONENT compile without errors', () => {
    const node = component('Card', {
      size: { x: 300, y: 400 },
      children: [
        canvas('Hero', {
          size: { x: 300, y: 200 },
          children: [text('Image area')],
        }),
      ],
    });
    const result = compile(node);
    expect(result.errors).toHaveLength(0);
    expect(result.root.children[0]!.isCanvas).toBe(true);
  });

});
