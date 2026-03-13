import { describe, it, expect } from 'vitest';
import { component, componentSet, instance } from '../components.js';
import { solid } from '../colors.js';
import { horizontal } from '../layout.js';
import { text, rectangle } from '../nodes.js';

describe('Component factory functions', () => {
  describe('component()', () => {
    it('creates a COMPONENT node', () => {
      const node = component('Button', {
        autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
        fills: [solid('#7c3aed')],
        children: [text('Click me')],
      });
      expect(node.type).toBe('COMPONENT');
      expect(node.name).toBe('Button');
      expect(node.children).toHaveLength(1);
    });

    it('supports component properties', () => {
      const node = component('Button', {
        componentProperties: [
          { name: 'Label', type: 'TEXT', defaultValue: 'Button' },
          { name: 'Full Width', type: 'BOOLEAN', defaultValue: false },
          { name: 'Icon', type: 'INSTANCE_SWAP', defaultValue: '' },
        ],
        children: [text('Button')],
      });
      expect(node.componentProperties).toHaveLength(3);
      expect(node.componentProperties![0]!.name).toBe('Label');
      expect(node.componentProperties![0]!.type).toBe('TEXT');
    });

    it('throws on empty name', () => {
      expect(() => component('', {})).toThrow('name');
    });
  });

  describe('componentSet()', () => {
    it('creates a COMPONENT_SET node', () => {
      const variant1 = component('Variant=Primary', {
        children: [text('Primary')],
      });
      const variant2 = component('Variant=Secondary', {
        children: [text('Secondary')],
      });
      const set = componentSet('Button', {
        variantAxes: { Variant: ['Primary', 'Secondary'] },
        children: [variant1, variant2],
      });
      expect(set.type).toBe('COMPONENT_SET');
      expect(set.name).toBe('Button');
      expect(set.variantAxes).toEqual({ Variant: ['Primary', 'Secondary'] });
      expect(set.children).toHaveLength(2);
    });

    it('throws on empty name', () => {
      expect(() => componentSet('', {})).toThrow('name');
    });
  });

  describe('instance()', () => {
    it('creates an INSTANCE node referencing a component', () => {
      const node = instance('Button');
      expect(node.type).toBe('INSTANCE');
      expect(node.name).toBe('Button');
      expect(node.componentRef).toBe('Button');
    });

    it('accepts property overrides', () => {
      const node = instance('Button', { Label: 'Submit', 'Full Width': true });
      expect(node.propertyOverrides).toEqual({
        Label: 'Submit',
        'Full Width': true,
      });
    });

    it('throws on empty componentRef', () => {
      expect(() => instance('')).toThrow();
    });
  });
});
