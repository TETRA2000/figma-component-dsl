import { describe, it, expect } from 'vitest';
import { mapToDsl } from '../mapper.js';
import type { DomSnapshot, ExtractedStyles } from '../types.js';

function makeStyles(overrides: Partial<ExtractedStyles> = {}): ExtractedStyles {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: '0px',
    rowGap: '0px',
    columnGap: '0px',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexGrow: '0',
    flexShrink: '1',
    flexBasis: 'auto',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    width: '100px',
    height: '50px',
    minWidth: '0px',
    minHeight: '0px',
    maxWidth: 'none',
    maxHeight: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundImage: 'none',
    opacity: '1',
    overflow: 'visible',
    borderTopWidth: '0px',
    borderRightWidth: '0px',
    borderBottomWidth: '0px',
    borderLeftWidth: '0px',
    borderTopColor: 'rgb(0, 0, 0)',
    borderRightColor: 'rgb(0, 0, 0)',
    borderBottomColor: 'rgb(0, 0, 0)',
    borderLeftColor: 'rgb(0, 0, 0)',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    borderLeftStyle: 'none',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgb(0, 0, 0)',
    textAlign: 'start',
    lineHeight: '24px',
    letterSpacing: 'normal',
    textDecoration: 'none',
    whiteSpace: 'normal',
    ...overrides,
  };
}

function makeSnapshot(overrides: Partial<DomSnapshot> = {}): DomSnapshot {
  return {
    tag: 'div',
    id: '',
    className: '',
    textContent: '',
    isTextOnly: false,
    styles: makeStyles(),
    rect: { x: 0, y: 0, width: 100, height: 50 },
    children: [],
    ...overrides,
  };
}

describe('mapToDsl', () => {
  it('maps a simple flex container', () => {
    const snap = makeSnapshot({
      id: 'container',
      styles: makeStyles({
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        paddingTop: '24px',
        paddingRight: '24px',
        paddingBottom: '24px',
        paddingLeft: '24px',
      }),
    });

    const { node } = mapToDsl(snap);
    expect(node.type).toBe('FRAME');
    expect(node.autoLayout).toBeDefined();
    expect(node.autoLayout!.direction).toBe('HORIZONTAL');
    expect(node.autoLayout!.spacing).toBe(16);
    expect(node.autoLayout!.padX).toBe(24);
    expect(node.autoLayout!.padY).toBe(24);
  });

  it('maps vertical flex layout', () => {
    const snap = makeSnapshot({
      styles: makeStyles({ flexDirection: 'column', gap: '8px' }),
    });

    const { node } = mapToDsl(snap);
    expect(node.autoLayout!.direction).toBe('VERTICAL');
    expect(node.autoLayout!.spacing).toBe(8);
  });

  it('maps justify-content and align-items', () => {
    const snap = makeSnapshot({
      styles: makeStyles({
        justifyContent: 'center',
        alignItems: 'center',
      }),
    });

    const { node } = mapToDsl(snap);
    expect(node.autoLayout!.align).toBe('CENTER');
    expect(node.autoLayout!.counterAlign).toBe('CENTER');
  });

  it('maps space-between', () => {
    const snap = makeSnapshot({
      styles: makeStyles({ justifyContent: 'space-between' }),
    });

    const { node } = mapToDsl(snap);
    expect(node.autoLayout!.align).toBe('SPACE_BETWEEN');
  });

  it('maps background color to fill', () => {
    const snap = makeSnapshot({
      styles: makeStyles({ backgroundColor: 'rgb(255, 0, 0)' }),
    });

    const { node } = mapToDsl(snap);
    expect(node.fills).toHaveLength(1);
    expect(node.fills![0]!.type).toBe('SOLID');
  });

  it('maps gradient background', () => {
    const snap = makeSnapshot({
      styles: makeStyles({
        backgroundImage: 'linear-gradient(135deg, rgb(124, 58, 237) 0%, rgb(79, 70, 229) 100%)',
      }),
    });

    const { node } = mapToDsl(snap);
    expect(node.fills).toHaveLength(1);
    expect(node.fills![0]!.type).toBe('GRADIENT_LINEAR');
  });

  it('maps border to stroke', () => {
    const snap = makeSnapshot({
      styles: makeStyles({
        borderTopWidth: '2px',
        borderRightWidth: '2px',
        borderBottomWidth: '2px',
        borderLeftWidth: '2px',
        borderTopColor: 'rgb(229, 231, 235)',
        borderRightColor: 'rgb(229, 231, 235)',
        borderBottomColor: 'rgb(229, 231, 235)',
        borderLeftColor: 'rgb(229, 231, 235)',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
      }),
    });

    const { node } = mapToDsl(snap);
    expect(node.strokes).toHaveLength(1);
    expect(node.strokes![0]!.weight).toBe(2);
  });

  it('maps uniform corner radius', () => {
    const snap = makeSnapshot({
      styles: makeStyles({
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
      }),
    });

    const { node } = mapToDsl(snap);
    expect(node.cornerRadius).toBe(16);
    expect(node.cornerRadii).toBeUndefined();
  });

  it('maps per-corner radius', () => {
    const snap = makeSnapshot({
      styles: makeStyles({
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '8px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
      }),
    });

    const { node } = mapToDsl(snap);
    expect(node.cornerRadius).toBeUndefined();
    expect(node.cornerRadii).toEqual({
      topLeft: 16,
      topRight: 8,
      bottomLeft: 0,
      bottomRight: 0,
    });
  });

  it('maps opacity', () => {
    const snap = makeSnapshot({
      styles: makeStyles({ opacity: '0.5' }),
    });

    const { node } = mapToDsl(snap);
    expect(node.opacity).toBe(0.5);
  });

  it('maps overflow hidden to clipContent', () => {
    const snap = makeSnapshot({
      styles: makeStyles({ overflow: 'hidden' }),
    });

    const { node } = mapToDsl(snap);
    expect(node.clipContent).toBe(true);
  });

  it('maps text-only element', () => {
    const snap = makeSnapshot({
      tag: 'span',
      isTextOnly: true,
      textContent: 'Hello World',
      styles: makeStyles({
        fontSize: '24px',
        fontWeight: '700',
        color: 'rgb(17, 24, 39)',
      }),
    });

    const { node } = mapToDsl(snap);
    expect(node.type).toBe('TEXT');
    expect(node.characters).toBe('Hello World');
    expect(node.textStyle?.fontSize).toBe(24);
    expect(node.textStyle?.fontWeight).toBe(700);
    expect(node.textStyle?.color).toBe('#111827');
  });

  it('maps children recursively', () => {
    const snap = makeSnapshot({
      children: [
        makeSnapshot({
          tag: 'span',
          isTextOnly: true,
          textContent: 'Child 1',
          rect: { x: 0, y: 0, width: 50, height: 20 },
        }),
        makeSnapshot({
          tag: 'span',
          isTextOnly: true,
          textContent: 'Child 2',
          rect: { x: 50, y: 0, width: 50, height: 20 },
        }),
      ],
    });

    const { node } = mapToDsl(snap);
    expect(node.children).toHaveLength(2);
    expect(node.children![0]!.type).toBe('TEXT');
    expect(node.children![1]!.type).toBe('TEXT');
  });

  it('maps asymmetric padding individually', () => {
    const snap = makeSnapshot({
      styles: makeStyles({
        paddingTop: '8px',
        paddingRight: '16px',
        paddingBottom: '24px',
        paddingLeft: '32px',
      }),
    });

    const { node } = mapToDsl(snap);
    expect(node.autoLayout!.padTop).toBe(8);
    expect(node.autoLayout!.padRight).toBe(16);
    expect(node.autoLayout!.padBottom).toBe(24);
    expect(node.autoLayout!.padLeft).toBe(32);
  });
});
