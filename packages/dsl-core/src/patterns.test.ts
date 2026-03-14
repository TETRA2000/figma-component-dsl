import { describe, it, expect } from 'vitest';
import { card, badge, statBlock, navBar, sectionHeader, divider } from './patterns.js';

describe('card()', () => {
  it('creates a frame with clipContent and cornerRadius', () => {
    const node = card('TestCard', { width: 300, children: [] });
    expect(node.type).toBe('FRAME');
    expect(node.clipContent).toBe(true);
    expect(node.cornerRadius).toBe(12);
    expect(node.autoLayout?.direction).toBe('VERTICAL');
  });

  it('uses default fills when none specified', () => {
    const node = card('TestCard');
    expect(node.fills).toHaveLength(1);
    expect(node.fills![0]!.type).toBe('SOLID');
  });
});

describe('badge()', () => {
  it('creates a pill-shaped badge', () => {
    const node = badge('New', '#FF0000', '#FFFFFF');
    expect(node.type).toBe('FRAME');
    expect(node.cornerRadius).toBe(9999);
    expect(node.children).toHaveLength(1);
    expect(node.children![0]!.type).toBe('TEXT');
    expect(node.children![0]!.characters).toBe('New');
  });
});

describe('statBlock()', () => {
  it('creates a vertical stat block', () => {
    const node = statBlock('42', 'Items');
    expect(node.type).toBe('FRAME');
    expect(node.autoLayout?.direction).toBe('VERTICAL');
    expect(node.children).toHaveLength(2);
    expect(node.children![0]!.characters).toBe('42');
    expect(node.children![1]!.characters).toBe('Items');
  });
});

describe('navBar()', () => {
  it('creates a SPACE_BETWEEN navbar', () => {
    const node = navBar('Brand', ['Home', 'About', 'Contact']);
    expect(node.type).toBe('FRAME');
    expect(node.autoLayout?.align).toBe('SPACE_BETWEEN');
    expect(node.children).toHaveLength(2);
    // Brand text
    expect(node.children![0]!.type).toBe('TEXT');
    expect(node.children![0]!.characters).toBe('Brand');
    // Links container
    expect(node.children![1]!.children).toHaveLength(3);
  });
});

describe('sectionHeader()', () => {
  it('creates a section header with title', () => {
    const node = sectionHeader('Features');
    expect(node.type).toBe('FRAME');
    expect(node.children).toHaveLength(1);
    expect(node.children![0]!.characters).toBe('Features');
  });
});

describe('divider()', () => {
  it('creates a thin rectangle divider', () => {
    const node = divider('#CCCCCC', 2);
    expect(node.type).toBe('RECTANGLE');
    expect(node.size).toEqual({ x: 0, y: 2 });
    expect(node.layoutSizingHorizontal).toBe('FILL');
  });
});
