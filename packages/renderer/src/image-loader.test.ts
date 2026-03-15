import { describe, it, expect } from 'vitest';
import { collectImageSources, resolveImageSource } from './image-loader.js';
import type { FigmaNodeDict } from '@figma-dsl/compiler';

function makeNode(overrides: Partial<FigmaNodeDict>): FigmaNodeDict {
  return {
    guid: [0, 1],
    type: 'FRAME',
    name: 'Test',
    size: { x: 100, y: 100 },
    transform: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    fillPaints: [],
    opacity: 1,
    visible: true,
    children: [],
    ...overrides,
  };
}

describe('collectImageSources()', () => {
  it('collects imageSrc from IMAGE nodes', () => {
    const tree = makeNode({
      children: [
        makeNode({ type: 'IMAGE', imageSrc: './photo.png', name: 'Photo' }),
      ],
    });
    const sources = collectImageSources(tree);
    expect(sources.has('./photo.png')).toBe(true);
    expect(sources.size).toBe(1);
  });

  it('collects imageSrc from IMAGE fills', () => {
    const tree = makeNode({
      fillPaints: [
        { type: 'IMAGE', imageSrc: './bg.jpg', imageScaleMode: 'FILL', opacity: 1, visible: true },
      ],
    });
    const sources = collectImageSources(tree);
    expect(sources.has('./bg.jpg')).toBe(true);
  });

  it('collects from nested children', () => {
    const tree = makeNode({
      children: [
        makeNode({
          children: [
            makeNode({ type: 'IMAGE', imageSrc: './deep.png', name: 'Deep' }),
          ],
        }),
      ],
    });
    const sources = collectImageSources(tree);
    expect(sources.has('./deep.png')).toBe(true);
  });

  it('deduplicates identical sources', () => {
    const tree = makeNode({
      children: [
        makeNode({ type: 'IMAGE', imageSrc: './same.png', name: 'A' }),
        makeNode({ type: 'IMAGE', imageSrc: './same.png', name: 'B' }),
      ],
    });
    const sources = collectImageSources(tree);
    expect(sources.size).toBe(1);
  });

  it('collects from both IMAGE nodes and IMAGE fills', () => {
    const tree = makeNode({
      fillPaints: [
        { type: 'IMAGE', imageSrc: './bg.png', imageScaleMode: 'FILL', opacity: 1, visible: true },
      ],
      children: [
        makeNode({ type: 'IMAGE', imageSrc: './photo.png', name: 'Photo' }),
      ],
    });
    const sources = collectImageSources(tree);
    expect(sources.size).toBe(2);
    expect(sources.has('./bg.png')).toBe(true);
    expect(sources.has('./photo.png')).toBe(true);
  });

  it('returns empty set for tree with no images', () => {
    const tree = makeNode({
      fillPaints: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 }, opacity: 1, visible: true }],
      children: [makeNode({ type: 'RECTANGLE', name: 'Rect' })],
    });
    const sources = collectImageSources(tree);
    expect(sources.size).toBe(0);
  });
});

describe('resolveImageSource()', () => {
  it('passes through HTTPS URLs', () => {
    expect(resolveImageSource('https://example.com/img.png', '/assets')).toBe('https://example.com/img.png');
  });

  it('passes through HTTP URLs', () => {
    expect(resolveImageSource('http://example.com/img.png', '/assets')).toBe('http://example.com/img.png');
  });

  it('passes through absolute paths', () => {
    expect(resolveImageSource('/home/user/img.png', '/assets')).toBe('/home/user/img.png');
  });

  it('resolves relative paths against assetDir', () => {
    const result = resolveImageSource('./photo.png', '/project/assets');
    expect(result).toBe('/project/assets/photo.png');
  });

  it('resolves nested relative paths', () => {
    const result = resolveImageSource('images/hero.jpg', '/project/src');
    expect(result).toBe('/project/src/images/hero.jpg');
  });
});
