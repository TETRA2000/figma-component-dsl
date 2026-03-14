import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @figma-dsl/core so we don't need it built
vi.mock('@figma-dsl/core', () => ({
  hexToRGB: vi.fn(),
  solidPaint: vi.fn(),
  gradientPaint: vi.fn(),
  defineTokens: vi.fn(),
  tokenPaint: vi.fn(),
  setAutoLayout: vi.fn(),
}));

import { createPluginApi, hexToRGB, solidPaint, gradientPaint, defineTokens, tokenPaint, setAutoLayout } from './shim.js';

// Mock global figma object
const mockFigma = {
  createFrame: vi.fn(() => ({ type: 'FRAME', name: '', children: [], appendChild: vi.fn() })),
  createText: vi.fn(() => ({ type: 'TEXT', name: '', characters: '', fontFamily: 'Inter', fontWeight: 400 })),
  createRectangle: vi.fn(() => ({ type: 'RECTANGLE', name: '' })),
  createEllipse: vi.fn(() => ({ type: 'ELLIPSE', name: '' })),
  createComponent: vi.fn(() => ({ type: 'COMPONENT', name: '', children: [], appendChild: vi.fn() })),
  group: vi.fn(() => ({ type: 'GROUP', name: '' })),
  combineAsVariants: vi.fn(() => ({ type: 'COMPONENT_SET', name: '' })),
  loadFontAsync: vi.fn(() => Promise.resolve()),
};

beforeEach(() => {
  vi.clearAllMocks();
  (globalThis as Record<string, unknown>).figma = mockFigma;
});

describe('re-exported helpers', () => {
  it('should re-export all DSL helper functions from @figma-dsl/core', () => {
    expect(hexToRGB).toBeInstanceOf(Function);
    expect(solidPaint).toBeInstanceOf(Function);
    expect(gradientPaint).toBeInstanceOf(Function);
    expect(defineTokens).toBeInstanceOf(Function);
    expect(tokenPaint).toBeInstanceOf(Function);
    expect(setAutoLayout).toBeInstanceOf(Function);
  });
});

describe('createPluginApi', () => {
  it('should create a DslFigmaApi implementation', () => {
    const api = createPluginApi();
    expect(api).toBeDefined();
    expect(api.createFrame).toBeInstanceOf(Function);
    expect(api.createText).toBeInstanceOf(Function);
    expect(api.createRectangle).toBeInstanceOf(Function);
    expect(api.createEllipse).toBeInstanceOf(Function);
    expect(api.createComponent).toBeInstanceOf(Function);
    expect(api.createGroup).toBeInstanceOf(Function);
    expect(api.combineAsVariants).toBeInstanceOf(Function);
  });

  it('should delegate createFrame to figma.createFrame', () => {
    const api = createPluginApi();
    const frame = api.createFrame();
    expect(mockFigma.createFrame).toHaveBeenCalled();
    expect(frame).toBeDefined();
  });

  it('should delegate createText with font loading', async () => {
    const api = createPluginApi();
    const text = await api.createText();
    expect(mockFigma.createText).toHaveBeenCalled();
    expect(mockFigma.loadFontAsync).toHaveBeenCalledWith({ family: 'Inter', style: 'Regular' });
    expect(text).toBeDefined();
  });

  it('should delegate createRectangle to figma.createRectangle', () => {
    const api = createPluginApi();
    api.createRectangle();
    expect(mockFigma.createRectangle).toHaveBeenCalled();
  });

  it('should delegate createEllipse to figma.createEllipse', () => {
    const api = createPluginApi();
    api.createEllipse();
    expect(mockFigma.createEllipse).toHaveBeenCalled();
  });

  it('should delegate createComponent to figma.createComponent', () => {
    const api = createPluginApi();
    api.createComponent();
    expect(mockFigma.createComponent).toHaveBeenCalled();
  });

  it('should delegate combineAsVariants to figma.combineAsVariants', () => {
    const api = createPluginApi();
    const components = [{ type: 'COMPONENT' }] as any;
    const parent = { type: 'FRAME' } as any;
    api.combineAsVariants(components, parent);
    expect(mockFigma.combineAsVariants).toHaveBeenCalled();
  });

  it('should delegate createGroup to figma.group', () => {
    const api = createPluginApi();
    const children = [{ type: 'FRAME' }] as any;
    const parent = { type: 'FRAME' } as any;
    api.createGroup(children, parent);
    expect(mockFigma.group).toHaveBeenCalled();
  });
});
