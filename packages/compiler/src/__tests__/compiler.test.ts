import { describe, it, expect } from 'vitest';
import { VirtualFigmaApi, solidPaint, setAutoLayout } from '@figma-dsl/core';
import { Compiler } from '../compiler.js';
import type { FigmaNodeDict } from '../types.js';

function createApi(): VirtualFigmaApi {
  return new VirtualFigmaApi();
}

describe('Compiler', () => {
  describe('GUID assignment', () => {
    it('assigns unique GUIDs to all nodes', () => {
      const api = createApi();
      const root = api.createFrame();
      root.name = 'Root';
      const child = api.createFrame();
      child.name = 'Child';
      root.appendChild(child);

      const compiler = new Compiler();
      const result = compiler.compile(root);

      expect(result.root.guid).toEqual([0, 0]);
      expect(result.root.children[0]!.guid).toEqual([0, 1]);
      expect(result.nodeCount).toBe(2);
    });

    it('assigns GUIDs deterministically', () => {
      const api = createApi();
      const root = api.createFrame();
      const a = api.createFrame();
      const b = api.createFrame();
      root.appendChild(a);
      root.appendChild(b);

      const compiler = new Compiler();
      const r1 = compiler.compile(root);
      const r2 = compiler.compile(root);

      expect(r1.root.guid).toEqual(r2.root.guid);
      expect(r1.root.children[0]!.guid).toEqual(r2.root.children[0]!.guid);
    });
  });

  describe('parentIndex', () => {
    it('sets parentIndex on child nodes', () => {
      const api = createApi();
      const root = api.createFrame();
      const child = api.createFrame();
      root.appendChild(child);

      const compiler = new Compiler();
      const result = compiler.compile(root);

      expect(result.root.parentIndex).toBeUndefined();
      expect(result.root.children[0]!.parentIndex).toEqual({
        guid: [0, 0],
        position: '0',
      });
    });
  });

  describe('node type mapping', () => {
    it('maps FRAME nodes', () => {
      const api = createApi();
      const frame = api.createFrame();
      frame.name = 'TestFrame';
      frame.resize(200, 100);

      const compiler = new Compiler();
      const result = compiler.compile(frame);

      expect(result.root.type).toBe('FRAME');
      expect(result.root.name).toBe('TestFrame');
      expect(result.root.size).toEqual({ x: 200, y: 100 });
    });

    it('maps TEXT nodes', async () => {
      const api = createApi();
      const root = api.createFrame();
      const text = await api.createText();
      text.characters = 'Hello';
      text.fontSize = 24;
      text.fontWeight = 700;
      text.fontFamily = 'Inter';
      text.textAlignHorizontal = 'CENTER';
      root.appendChild(text);

      const compiler = new Compiler();
      const result = compiler.compile(root);

      const textNode = result.root.children[0]!;
      expect(textNode.type).toBe('TEXT');
      expect(textNode.fontSize).toBe(24);
      expect(textNode.fontWeight).toBe(700);
      expect(textNode.fontFamily).toBe('Inter');
      expect(textNode.textAlignHorizontal).toBe('CENTER');
      expect(textNode.textData).toBeDefined();
      expect(textNode.textData!.characters).toBe('Hello');
    });
  });

  describe('fill conversion', () => {
    it('converts solid fills to fillPaints', () => {
      const api = createApi();
      const frame = api.createFrame();
      frame.fills = [solidPaint('#FF0000')];

      const compiler = new Compiler();
      const result = compiler.compile(frame);

      expect(result.root.fillPaints).toHaveLength(1);
      expect(result.root.fillPaints[0]!.type).toBe('SOLID');
    });

    it('preserves fill ordering', () => {
      const api = createApi();
      const frame = api.createFrame();
      frame.fills = [solidPaint('#FF0000'), solidPaint('#00FF00')];

      const compiler = new Compiler();
      const result = compiler.compile(frame);

      expect(result.root.fillPaints).toHaveLength(2);
    });
  });

  describe('transform computation', () => {
    it('uses identity transform for root', () => {
      const api = createApi();
      const frame = api.createFrame();

      const compiler = new Compiler();
      const result = compiler.compile(frame);

      expect(result.root.transform).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);
    });

    it('applies position offset for child nodes', () => {
      const api = createApi();
      const root = api.createFrame();
      root.resize(300, 200);
      const child = api.createFrame();
      child.x = 10;
      child.y = 20;
      root.appendChild(child);

      const compiler = new Compiler();
      const result = compiler.compile(root);

      expect(result.root.children[0]!.transform[0]![2]).toBe(10);
      expect(result.root.children[0]!.transform[1]![2]).toBe(20);
    });
  });

  describe('auto-layout passthrough', () => {
    it('passes auto-layout properties to compiled node', () => {
      const api = createApi();
      const frame = api.createFrame();
      setAutoLayout(frame, {
        direction: 'HORIZONTAL',
        spacing: 8,
        padX: 16,
        padY: 8,
        align: 'CENTER',
      });

      const compiler = new Compiler();
      const result = compiler.compile(frame);

      expect(result.root.stackMode).toBe('HORIZONTAL');
      expect(result.root.itemSpacing).toBe(8);
      expect(result.root.paddingLeft).toBe(16);
      expect(result.root.paddingRight).toBe(16);
      expect(result.root.paddingTop).toBe(8);
      expect(result.root.paddingBottom).toBe(8);
      expect(result.root.primaryAxisAlignItems).toBe('CENTER');
    });
  });

  describe('component compilation', () => {
    it('compiles COMPONENT nodes with property definitions', () => {
      const api = createApi();
      const comp = api.createComponent();
      comp.name = 'Button';
      comp.addComponentProperty('label', 'TEXT', 'Click me');
      comp.addComponentProperty('disabled', 'BOOLEAN', false);

      const compiler = new Compiler();
      const result = compiler.compile(comp);

      expect(result.root.type).toBe('COMPONENT');
      expect(result.root.componentPropertyDefinitions).toBeDefined();
      expect(result.root.componentPropertyDefinitions!['label']).toEqual({
        type: 'TEXT',
        defaultValue: 'Click me',
      });
    });

    it('compiles COMPONENT_SET with variant children', () => {
      const api = createApi();
      const parent = api.createFrame();
      const c1 = api.createComponent();
      c1.name = 'variant=primary';
      const c2 = api.createComponent();
      c2.name = 'variant=secondary';
      const set = api.combineAsVariants([c1, c2], parent);

      const compiler = new Compiler();
      const result = compiler.compile(set);

      expect(result.root.type).toBe('COMPONENT_SET');
      expect(result.root.children).toHaveLength(2);
    });

    it('compiles INSTANCE nodes with componentId', () => {
      const api = createApi();
      const comp = api.createComponent();
      comp.name = 'Button';
      const instance = comp.createInstance();

      const root = api.createFrame();
      root.appendChild(comp);
      root.appendChild(instance);

      const compiler = new Compiler();
      const result = compiler.compile(root);

      const instanceNode = result.root.children[1]!;
      expect(instanceNode.type).toBe('INSTANCE');
      expect(instanceNode.componentId).toBeDefined();
    });
  });

  describe('visibility', () => {
    it('preserves visible flag', () => {
      const api = createApi();
      const frame = api.createFrame();
      frame.visible = false;

      const compiler = new Compiler();
      const result = compiler.compile(frame);

      expect(result.root.visible).toBe(false);
    });
  });

  describe('compileToJson', () => {
    it('returns valid JSON string', () => {
      const api = createApi();
      const frame = api.createFrame();
      frame.name = 'Test';

      const compiler = new Compiler();
      const json = compiler.compileToJson(frame);
      const parsed = JSON.parse(json) as FigmaNodeDict;

      expect(parsed.name).toBe('Test');
      expect(parsed.type).toBe('FRAME');
    });
  });

  describe('errors', () => {
    it('returns empty errors for valid trees', () => {
      const api = createApi();
      const frame = api.createFrame();

      const compiler = new Compiler();
      const result = compiler.compile(frame);

      expect(result.errors).toEqual([]);
    });
  });
});
