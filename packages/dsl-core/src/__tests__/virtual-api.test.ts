import { describe, it, expect } from 'vitest';
import { VirtualFigmaApi } from '../virtual-api.js';

describe('VirtualFigmaApi', () => {
  it('creates a VirtualFigmaApi instance', () => {
    const api = new VirtualFigmaApi();
    expect(api).toBeDefined();
  });

  describe('createFrame', () => {
    it('returns a FRAME node with default properties', () => {
      const api = new VirtualFigmaApi();
      const frame = api.createFrame();
      expect(frame.type).toBe('FRAME');
      expect(frame.name).toBe('');
      expect(frame.x).toBe(0);
      expect(frame.y).toBe(0);
      expect(frame.width).toBe(0);
      expect(frame.height).toBe(0);
      expect(frame.opacity).toBe(1);
      expect(frame.visible).toBe(true);
      expect(frame.fills).toEqual([]);
      expect(frame.strokes).toEqual([]);
      expect(frame.strokeWeight).toBe(0);
      expect(frame.cornerRadius).toBe(0);
      expect(frame.clipContent).toBe(false);
      expect(frame.children).toEqual([]);
      expect(frame.layoutMode).toBe('NONE');
      expect(frame.itemSpacing).toBe(0);
      expect(frame.paddingTop).toBe(0);
      expect(frame.paddingRight).toBe(0);
      expect(frame.paddingBottom).toBe(0);
      expect(frame.paddingLeft).toBe(0);
      expect(frame.primaryAxisAlignItems).toBe('MIN');
      expect(frame.counterAxisAlignItems).toBe('MIN');
      expect(frame.layoutSizingHorizontal).toBe('FIXED');
      expect(frame.layoutSizingVertical).toBe('FIXED');
    });

    it('supports property assignment', () => {
      const api = new VirtualFigmaApi();
      const frame = api.createFrame();
      frame.name = 'TestFrame';
      frame.x = 10;
      frame.y = 20;
      frame.opacity = 0.5;
      frame.visible = false;
      frame.cornerRadius = 8;
      frame.clipContent = true;
      expect(frame.name).toBe('TestFrame');
      expect(frame.x).toBe(10);
      expect(frame.y).toBe(20);
      expect(frame.opacity).toBe(0.5);
      expect(frame.visible).toBe(false);
      expect(frame.cornerRadius).toBe(8);
      expect(frame.clipContent).toBe(true);
    });

    it('supports resize', () => {
      const api = new VirtualFigmaApi();
      const frame = api.createFrame();
      frame.resize(300, 200);
      expect(frame.width).toBe(300);
      expect(frame.height).toBe(200);
    });

    it('supports fills assignment', () => {
      const api = new VirtualFigmaApi();
      const frame = api.createFrame();
      frame.fills = [
        { type: 'SOLID', color: { r: 1, g: 0, b: 0 } },
      ];
      expect(frame.fills).toHaveLength(1);
      expect(frame.fills[0]!.type).toBe('SOLID');
    });
  });

  describe('appendChild', () => {
    it('builds parent-child relationships', () => {
      const api = new VirtualFigmaApi();
      const parent = api.createFrame();
      const child = api.createFrame();
      child.name = 'Child';
      parent.appendChild(child);
      expect(parent.children).toHaveLength(1);
      expect(parent.children[0]!.name).toBe('Child');
    });

    it('preserves child insertion order', () => {
      const api = new VirtualFigmaApi();
      const parent = api.createFrame();
      const a = api.createFrame();
      a.name = 'A';
      const b = api.createFrame();
      b.name = 'B';
      parent.appendChild(a);
      parent.appendChild(b);
      expect(parent.children[0]!.name).toBe('A');
      expect(parent.children[1]!.name).toBe('B');
    });
  });

  describe('createText', () => {
    it('returns a TEXT node with default properties', async () => {
      const api = new VirtualFigmaApi();
      const text = await api.createText();
      expect(text.type).toBe('TEXT');
      expect(text.characters).toBe('');
      expect(text.fontFamily).toBe('Inter');
      expect(text.fontWeight).toBe(400);
      expect(text.fontSize).toBe(16);
      expect(text.textAlignHorizontal).toBe('LEFT');
      expect(text.lineHeight).toEqual({ unit: 'AUTO' });
      expect(text.letterSpacing).toEqual({ value: 0, unit: 'PIXELS' });
    });

    it('supports characters assignment', async () => {
      const api = new VirtualFigmaApi();
      const text = await api.createText();
      text.characters = 'Hello World';
      expect(text.characters).toBe('Hello World');
    });

    it('supports typography property assignment', async () => {
      const api = new VirtualFigmaApi();
      const text = await api.createText();
      text.fontSize = 24;
      text.fontWeight = 700;
      text.fontFamily = 'Inter';
      text.textAlignHorizontal = 'CENTER';
      text.lineHeight = { value: 150, unit: 'PERCENT' };
      text.letterSpacing = { value: -0.5, unit: 'PIXELS' };
      expect(text.fontSize).toBe(24);
      expect(text.fontWeight).toBe(700);
      expect(text.textAlignHorizontal).toBe('CENTER');
      expect(text.lineHeight).toEqual({ value: 150, unit: 'PERCENT' });
      expect(text.letterSpacing).toEqual({ value: -0.5, unit: 'PIXELS' });
    });
  });

  describe('createRectangle', () => {
    it('returns a RECTANGLE node with default properties', () => {
      const api = new VirtualFigmaApi();
      const rect = api.createRectangle();
      expect(rect.type).toBe('RECTANGLE');
      expect(rect.cornerRadius).toBe(0);
    });
  });

  describe('createEllipse', () => {
    it('returns an ELLIPSE node with default properties', () => {
      const api = new VirtualFigmaApi();
      const ellipse = api.createEllipse();
      expect(ellipse.type).toBe('ELLIPSE');
    });
  });

  describe('createComponent', () => {
    it('returns a COMPONENT node', () => {
      const api = new VirtualFigmaApi();
      const comp = api.createComponent();
      expect(comp.type).toBe('COMPONENT');
    });

    it('supports addComponentProperty', () => {
      const api = new VirtualFigmaApi();
      const comp = api.createComponent();
      comp.addComponentProperty('label', 'TEXT', 'Click me');
      comp.addComponentProperty('disabled', 'BOOLEAN', false);
    });

    it('supports createInstance', () => {
      const api = new VirtualFigmaApi();
      const comp = api.createComponent();
      comp.name = 'Button';
      const instance = comp.createInstance();
      expect(instance.type).toBe('INSTANCE');
      expect(instance.mainComponent).toBe(comp);
    });

    it('instance supports setProperties', () => {
      const api = new VirtualFigmaApi();
      const comp = api.createComponent();
      comp.addComponentProperty('label', 'TEXT', 'Click me');
      const instance = comp.createInstance();
      instance.setProperties({ label: 'Submit' });
    });
  });

  describe('createGroup', () => {
    it('creates a GROUP with children reparented', () => {
      const api = new VirtualFigmaApi();
      const parent = api.createFrame();
      const a = api.createFrame();
      const b = api.createFrame();
      const group = api.createGroup([a, b], parent);
      expect(group.type).toBe('GROUP');
      expect(group.children).toHaveLength(2);
    });
  });

  describe('combineAsVariants', () => {
    it('creates a COMPONENT_SET from components', () => {
      const api = new VirtualFigmaApi();
      const parent = api.createFrame();
      const c1 = api.createComponent();
      c1.name = 'variant=primary';
      const c2 = api.createComponent();
      c2.name = 'variant=secondary';
      const set = api.combineAsVariants([c1, c2], parent);
      expect(set.type).toBe('COMPONENT_SET');
      expect(set.children).toHaveLength(2);
    });
  });

  describe('visibility', () => {
    it('supports setting visible to false', () => {
      const api = new VirtualFigmaApi();
      const frame = api.createFrame();
      frame.visible = false;
      expect(frame.visible).toBe(false);
    });
  });
});
