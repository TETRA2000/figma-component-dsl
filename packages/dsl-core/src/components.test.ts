import { describe, it, expect } from 'vitest';
import { component, componentSet, instance, frame, text } from './nodes.js';
import { solid } from './colors.js';
import { horizontal } from './layout.js';

describe('component()', () => {
  it('creates a COMPONENT node', () => {
    const node = component('Button', {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      fills: [solid('#7c3aed')],
      children: [text('Click me', { fontSize: 14 })],
    });
    expect(node.type).toBe('COMPONENT');
    expect(node.name).toBe('Button');
    expect(node.autoLayout?.direction).toBe('HORIZONTAL');
    expect(node.children).toHaveLength(1);
  });

  it('supports TEXT component properties', () => {
    const node = component('Button', {
      componentProperties: [
        { name: 'Label', type: 'TEXT', defaultValue: 'Click me' },
      ],
    });
    expect(node.componentProperties).toHaveLength(1);
    expect(node.componentProperties![0]!.type).toBe('TEXT');
    expect(node.componentProperties![0]!.defaultValue).toBe('Click me');
  });

  it('supports BOOLEAN component properties', () => {
    const node = component('Button', {
      componentProperties: [
        { name: 'Full Width', type: 'BOOLEAN', defaultValue: false },
      ],
    });
    expect(node.componentProperties![0]!.defaultValue).toBe(false);
  });

  it('supports INSTANCE_SWAP component properties', () => {
    const node = component('Card', {
      componentProperties: [
        { name: 'Icon', type: 'INSTANCE_SWAP', defaultValue: 'StarIcon', preferredValues: ['StarIcon', 'HeartIcon'] },
      ],
    });
    expect(node.componentProperties![0]!.type).toBe('INSTANCE_SWAP');
    expect(node.componentProperties![0]!.preferredValues).toEqual(['StarIcon', 'HeartIcon']);
  });
});

describe('componentSet()', () => {
  it('creates a COMPONENT_SET with variants', () => {
    const primary = component('Variant=Primary', {
      fills: [solid('#7c3aed')],
      children: [text('Primary')],
    });
    const secondary = component('Variant=Secondary', {
      fills: [solid('#ffffff')],
      children: [text('Secondary')],
    });
    const set = componentSet('Button', {
      variantAxes: { Variant: ['Primary', 'Secondary'] },
      children: [primary, secondary],
    });
    expect(set.type).toBe('COMPONENT_SET');
    expect(set.name).toBe('Button');
    expect(set.variantAxes).toEqual({ Variant: ['Primary', 'Secondary'] });
    expect(set.children).toHaveLength(2);
  });

  it('supports multi-axis variants', () => {
    const node = componentSet('Button', {
      variantAxes: {
        Variant: ['Primary', 'Secondary'],
        Size: ['Small', 'Medium', 'Large'],
      },
      children: [],
    });
    expect(Object.keys(node.variantAxes!)).toEqual(['Variant', 'Size']);
  });
});

describe('instance()', () => {
  it('creates an INSTANCE node referencing a component', () => {
    const node = instance('Button');
    expect(node.type).toBe('INSTANCE');
    expect(node.componentRef).toBe('Button');
    expect(node.name).toBe('Button');
  });

  it('supports property overrides', () => {
    const node = instance('Button', { Label: 'Submit', 'Full Width': true });
    expect(node.propertyOverrides).toEqual({ Label: 'Submit', 'Full Width': true });
  });

  it('throws on empty componentRef', () => {
    expect(() => instance('')).toThrow();
  });
});

describe('Key=Value naming convention', () => {
  it('variant children follow naming convention', () => {
    const variants = [
      component('Variant=Primary, Size=Large', { children: [text('Primary Large')] }),
      component('Variant=Secondary, Size=Small', { children: [text('Secondary Small')] }),
    ];
    const set = componentSet('Button', {
      variantAxes: { Variant: ['Primary', 'Secondary'], Size: ['Small', 'Large'] },
      children: variants,
    });
    expect(set.children![0]!.name).toBe('Variant=Primary, Size=Large');
    expect(set.children![1]!.name).toBe('Variant=Secondary, Size=Small');
  });
});
