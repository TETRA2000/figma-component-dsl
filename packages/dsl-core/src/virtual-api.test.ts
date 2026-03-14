import { describe, it, expect } from 'vitest';
import { VirtualFigmaApi } from './virtual-api.js';
import type { DslFrameNode, DslTextNode, DslComponentNode } from './types.js';

describe('VirtualFigmaApi', () => {
  const api = new VirtualFigmaApi();

  describe('createFrame', () => {
    it('should return a FRAME node with default values', () => {
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
      expect(frame.rotation).toBe(0);
    });

    it('should have auto-layout defaults', () => {
      const frame = api.createFrame();
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
  });

  describe('createText', () => {
    it('should return a Promise that resolves to a TEXT node', async () => {
      const result = api.createText();
      expect(result).toBeInstanceOf(Promise);
      const text = await result;
      expect(text.type).toBe('TEXT');
      expect(text.characters).toBe('');
      expect(text.fontFamily).toBe('Inter');
      expect(text.fontWeight).toBe(400);
      expect(text.fontSize).toBe(12);
      expect(text.textAlignHorizontal).toBe('LEFT');
      expect(text.lineHeight).toEqual({ unit: 'AUTO' });
      expect(text.letterSpacing).toEqual({ value: 0, unit: 'PERCENT' });
    });
  });

  describe('createRectangle', () => {
    it('should return a RECTANGLE node', () => {
      const rect = api.createRectangle();
      expect(rect.type).toBe('RECTANGLE');
      expect(rect.cornerRadius).toBe(0);
      expect(rect.fills).toEqual([]);
    });
  });

  describe('createEllipse', () => {
    it('should return an ELLIPSE node', () => {
      const ellipse = api.createEllipse();
      expect(ellipse.type).toBe('ELLIPSE');
    });
  });

  describe('appendChild', () => {
    it('should add children in insertion order', () => {
      const parent = api.createFrame();
      const child1 = api.createFrame();
      child1.name = 'first';
      const child2 = api.createFrame();
      child2.name = 'second';

      parent.appendChild(child1);
      parent.appendChild(child2);

      expect(parent.children.length).toBe(2);
      expect(parent.children[0].name).toBe('first');
      expect(parent.children[1].name).toBe('second');
    });
  });

  describe('resize', () => {
    it('should set both width and height', () => {
      const frame = api.createFrame();
      frame.resize(300, 200);
      expect(frame.width).toBe(300);
      expect(frame.height).toBe(200);
    });
  });

  describe('visible property', () => {
    it('should allow hiding nodes', () => {
      const frame = api.createFrame();
      expect(frame.visible).toBe(true);
      frame.visible = false;
      expect(frame.visible).toBe(false);
    });
  });

  describe('createComponent', () => {
    it('should return a COMPONENT node', () => {
      const comp = api.createComponent();
      expect(comp.type).toBe('COMPONENT');
      expect(comp.componentProperties).toEqual({});
    });

    it('should support addComponentProperty for TEXT', () => {
      const comp = api.createComponent();
      comp.addComponentProperty('label', 'TEXT', 'Click me');
      expect(comp.componentProperties['label']).toEqual({
        type: 'TEXT',
        defaultValue: 'Click me',
      });
    });

    it('should support addComponentProperty for BOOLEAN', () => {
      const comp = api.createComponent();
      comp.addComponentProperty('disabled', 'BOOLEAN', false);
      expect(comp.componentProperties['disabled']).toEqual({
        type: 'BOOLEAN',
        defaultValue: false,
      });
    });

    it('should support addComponentProperty for INSTANCE_SWAP', () => {
      const comp = api.createComponent();
      comp.addComponentProperty('icon', 'INSTANCE_SWAP', 'IconPlaceholder');
      expect(comp.componentProperties['icon']).toEqual({
        type: 'INSTANCE_SWAP',
        defaultValue: 'IconPlaceholder',
      });
    });
  });

  describe('createInstance', () => {
    it('should create an instance with mainComponent back-pointer', () => {
      const comp = api.createComponent();
      comp.name = 'Button';
      const instance = comp.createInstance();
      expect(instance.type).toBe('INSTANCE');
      expect(instance.mainComponent).toBe(comp);
    });

    it('should copy default property values from component', () => {
      const comp = api.createComponent();
      comp.addComponentProperty('label', 'TEXT', 'Click');
      const instance = comp.createInstance();
      expect(instance.mainComponent.componentProperties['label'].defaultValue).toBe('Click');
    });

    it('should allow property overrides via setProperties', () => {
      const comp = api.createComponent();
      comp.addComponentProperty('label', 'TEXT', 'Click');
      comp.addComponentProperty('disabled', 'BOOLEAN', false);
      const instance = comp.createInstance();
      instance.setProperties({ label: 'Submit', disabled: true });
      // Instance stores overrides; mainComponent defaults unchanged
      expect(comp.componentProperties['label'].defaultValue).toBe('Click');
    });
  });

  describe('combineAsVariants', () => {
    it('should create a COMPONENT_SET and reparent components', () => {
      const parent = api.createFrame();
      const c1 = api.createComponent();
      c1.name = 'Variant=Primary';
      const c2 = api.createComponent();
      c2.name = 'Variant=Secondary';

      parent.appendChild(c1);
      parent.appendChild(c2);
      expect(parent.children.length).toBe(2);

      const set = api.combineAsVariants([c1, c2], parent);
      expect(set.type).toBe('COMPONENT_SET');
      expect(set.children.length).toBe(2);
      expect(set.children[0].name).toBe('Variant=Primary');
      expect(set.children[1].name).toBe('Variant=Secondary');
      // Components removed from old parent
      expect(parent.children.length).toBe(1); // component set is now the child
    });
  });

  describe('createGroup', () => {
    it('should create a GROUP node with given children', () => {
      const parent = api.createFrame();
      const child1 = api.createFrame();
      child1.name = 'a';
      const child2 = api.createFrame();
      child2.name = 'b';

      const group = api.createGroup([child1, child2], parent);
      expect(group.type).toBe('GROUP');
      expect(group.children.length).toBe(2);
    });
  });

  describe('mutable properties', () => {
    it('should allow setting fills', () => {
      const frame = api.createFrame();
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
      expect(frame.fills.length).toBe(1);
      expect(frame.fills[0].type).toBe('SOLID');
    });

    it('should allow setting layout properties', () => {
      const frame = api.createFrame();
      frame.layoutMode = 'HORIZONTAL';
      frame.itemSpacing = 8;
      frame.paddingTop = 16;
      frame.primaryAxisAlignItems = 'CENTER';
      frame.counterAxisAlignItems = 'MAX';
      frame.layoutSizingHorizontal = 'HUG';
      frame.layoutSizingVertical = 'FILL';

      expect(frame.layoutMode).toBe('HORIZONTAL');
      expect(frame.itemSpacing).toBe(8);
      expect(frame.paddingTop).toBe(16);
      expect(frame.primaryAxisAlignItems).toBe('CENTER');
      expect(frame.counterAxisAlignItems).toBe('MAX');
      expect(frame.layoutSizingHorizontal).toBe('HUG');
      expect(frame.layoutSizingVertical).toBe('FILL');
    });

    it('should allow setting text properties', async () => {
      const text = await api.createText();
      text.characters = 'Hello';
      text.fontSize = 24;
      text.fontWeight = 700;
      text.fontFamily = 'Inter';
      text.textAlignHorizontal = 'CENTER';
      text.lineHeight = { value: 150, unit: 'PERCENT' };
      text.letterSpacing = { value: 1, unit: 'PIXELS' };

      expect(text.characters).toBe('Hello');
      expect(text.fontSize).toBe(24);
      expect(text.fontWeight).toBe(700);
      expect(text.textAlignHorizontal).toBe('CENTER');
      expect(text.lineHeight).toEqual({ value: 150, unit: 'PERCENT' });
      expect(text.letterSpacing).toEqual({ value: 1, unit: 'PIXELS' });
    });
  });
});
