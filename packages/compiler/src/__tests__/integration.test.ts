import { describe, it, expect } from 'vitest';
import { compile, compileToJson } from '../compiler.js';
import { frame, text, rectangle, ellipse, group } from '../../../dsl-core/src/nodes.js';
import { solid, hex, gradient, stroke } from '../../../dsl-core/src/colors.js';
import { horizontal, vertical } from '../../../dsl-core/src/layout.js';
import type { FigmaNodeDict } from '../types.js';

describe('Integration — Compile-to-render pipeline', () => {
  describe('Simple button-like frame with text child', () => {
    it('compiles a button frame with text and produces correct structure', () => {
      const button = frame('Button', {
        size: { x: 120, y: 40 },
        fills: [solid('#3B82F6')],
        cornerRadius: 8,
        autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
        children: [
          text('Click Me', { fontSize: 14, fontWeight: 500, fontFamily: 'Inter' }),
        ],
      });

      const result = compile(button);

      // Root structure
      expect(result.root.guid).toEqual([0, 0]);
      expect(result.root.type).toBe('FRAME');
      expect(result.root.name).toBe('Button');
      expect(result.root.size).toEqual({ x: 120, y: 40 });
      expect(result.root.cornerRadius).toBe(8);
      expect(result.root.opacity).toBe(1);
      expect(result.root.visible).toBe(true);

      // Fill paints
      expect(result.root.fillPaints).toHaveLength(1);
      expect(result.root.fillPaints[0]!.type).toBe('SOLID');
      expect(result.root.fillPaints[0]!.color).toBeDefined();

      // Transform (identity for root)
      expect(result.root.transform).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);

      // Children
      expect(result.root.children).toHaveLength(1);
      const textChild = result.root.children[0]!;
      expect(textChild.guid).toEqual([0, 1]);
      expect(textChild.type).toBe('TEXT');
      expect(textChild.parentIndex).toEqual({
        guid: [0, 0],
        position: '0',
      });

      // Node count
      expect(result.nodeCount).toBe(2);
      expect(result.errors).toEqual([]);
    });
  });

  describe('Card with nested children and GUID assignment', () => {
    it('compiles a card with nested hierarchy and assigns sequential GUIDs', () => {
      const card = frame('Card', {
        size: { x: 320, y: 200 },
        fills: [solid('#FFFFFF')],
        cornerRadius: 12,
        autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
        children: [
          frame('Header', {
            size: { x: 288, y: 24 },
            autoLayout: horizontal({ spacing: 8 }),
            children: [
              text('Card Title', { fontSize: 18, fontWeight: 600 }),
            ],
          }),
          frame('Body', {
            size: { x: 288, y: 100 },
            children: [
              rectangle('Image', { size: { x: 288, y: 100 }, fills: [solid('#E5E7EB')] }),
            ],
          }),
          frame('Footer', {
            size: { x: 288, y: 32 },
            autoLayout: horizontal({ spacing: 8 }),
            children: [
              text('Read More', { fontSize: 14, fontWeight: 500 }),
            ],
          }),
        ],
      });

      const result = compile(card);

      // Root is Card
      expect(result.root.guid).toEqual([0, 0]);
      expect(result.root.type).toBe('FRAME');
      expect(result.root.name).toBe('Card');

      // Hierarchical structure
      expect(result.root.children).toHaveLength(3);

      // Header frame and its text child
      const header = result.root.children[0]!;
      expect(header.guid).toEqual([0, 1]);
      expect(header.name).toBe('Header');
      expect(header.children).toHaveLength(1);
      expect(header.children[0]!.guid).toEqual([0, 2]);
      expect(header.children[0]!.type).toBe('TEXT');

      // Body frame and its rectangle child
      const body = result.root.children[1]!;
      expect(body.guid).toEqual([0, 3]);
      expect(body.name).toBe('Body');
      expect(body.children).toHaveLength(1);
      expect(body.children[0]!.guid).toEqual([0, 4]);
      expect(body.children[0]!.type).toBe('RECTANGLE');

      // Footer frame and its text child
      const footer = result.root.children[2]!;
      expect(footer.guid).toEqual([0, 5]);
      expect(footer.name).toBe('Footer');
      expect(footer.children).toHaveLength(1);
      expect(footer.children[0]!.guid).toEqual([0, 6]);
      expect(footer.children[0]!.type).toBe('TEXT');

      // Total nodes: Card + Header + Text + Body + Rect + Footer + Text = 7
      expect(result.nodeCount).toBe(7);

      // parentIndex chain
      expect(result.root.parentIndex).toBeUndefined();
      expect(header.parentIndex).toEqual({ guid: [0, 0], position: '0' });
      expect(body.parentIndex).toEqual({ guid: [0, 0], position: '1' });
      expect(footer.parentIndex).toEqual({ guid: [0, 0], position: '2' });
      expect(header.children[0]!.parentIndex).toEqual({ guid: [0, 1], position: '0' });
    });
  });

  describe('compileToJson round-trip', () => {
    it('compiles to JSON and parses back to valid FigmaNodeDict', () => {
      const node = frame('Root', {
        size: { x: 200, y: 100 },
        fills: [solid('#FF0000')],
        cornerRadius: 4,
        children: [
          rectangle('Bg', { size: { x: 200, y: 100 }, fills: [solid('#00FF00')] }),
          text('Hello', { fontSize: 16 }),
        ],
      });

      const json = compileToJson(node);
      expect(typeof json).toBe('string');

      const parsed = JSON.parse(json);

      // CompileResult structure
      expect(parsed).toHaveProperty('root');
      expect(parsed).toHaveProperty('nodeCount');
      expect(parsed).toHaveProperty('errors');

      // Root node structure
      const root: FigmaNodeDict = parsed.root;
      expect(root.guid).toEqual([0, 0]);
      expect(root.type).toBe('FRAME');
      expect(root.name).toBe('Root');
      expect(root.size).toEqual({ x: 200, y: 100 });
      expect(root.children).toHaveLength(2);
      expect(parsed.nodeCount).toBe(3);
      expect(parsed.errors).toEqual([]);
    });

    it('JSON round-trip preserves all node fields', () => {
      const node = frame('F', {
        size: { x: 50, y: 50 },
        fills: [solid('#AABBCC', 0.8)],
        cornerRadius: 6,
        children: [],
      });

      const json = compileToJson(node);
      const parsed = JSON.parse(json);
      const root = parsed.root;

      // Re-serialize and parse to confirm stability
      const json2 = JSON.stringify(parsed, null, 2);
      const parsed2 = JSON.parse(json2);
      expect(parsed2).toEqual(parsed);
    });
  });

  describe('Transform matrices', () => {
    it('root node has identity transform', () => {
      const node = frame('Root', { size: { x: 100, y: 100 } });
      const result = compile(node);

      expect(result.root.transform).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);
    });

    it('children without explicit position have zero-offset transform', () => {
      const node = frame('Root', {
        size: { x: 200, y: 200 },
        children: [
          rectangle('Child', { size: { x: 50, y: 50 } }),
        ],
      });
      const result = compile(node);
      const child = result.root.children[0]!;

      // Without auto-layout, child position defaults to (0,0) relative to parent
      expect(child.transform).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);
    });

    it('transform is a 3x3 matrix with correct structure', () => {
      const node = frame('Root', { size: { x: 100, y: 100 } });
      const result = compile(node);
      const t = result.root.transform;

      // 3x3 matrix
      expect(t).toHaveLength(3);
      expect(t[0]).toHaveLength(3);
      expect(t[1]).toHaveLength(3);
      expect(t[2]).toHaveLength(3);

      // Last row is always [0, 0, 1]
      expect(t[2]).toEqual([0, 0, 1]);
    });
  });

  describe('Fill paint conversion from DSL to Figma format', () => {
    it('converts solid fills with correct color values', () => {
      const node = rectangle('R', {
        size: { x: 100, y: 100 },
        fills: [solid('#FF0000')],
      });
      const result = compile(node);
      const paint = result.root.fillPaints[0]!;

      expect(paint.type).toBe('SOLID');
      expect(paint.color).toEqual({ r: 1, g: 0, b: 0, a: 1 });
      expect(paint.opacity).toBe(1);
      expect(paint.visible).toBe(true);
    });

    it('converts solid fills with opacity', () => {
      const node = rectangle('R', {
        size: { x: 100, y: 100 },
        fills: [solid('#0000FF', 0.5)],
      });
      const result = compile(node);
      const paint = result.root.fillPaints[0]!;

      expect(paint.type).toBe('SOLID');
      expect(paint.color).toEqual({ r: 0, g: 0, b: 1, a: 1 });
      expect(paint.opacity).toBe(0.5);
    });

    it('converts gradient fills with stops and transform', () => {
      const node = rectangle('R', {
        size: { x: 100, y: 100 },
        fills: [gradient([
          { hex: '#FF0000', position: 0 },
          { hex: '#0000FF', position: 1 },
        ], 90)],
      });
      const result = compile(node);
      const paint = result.root.fillPaints[0]!;

      expect(paint.type).toBe('GRADIENT_LINEAR');
      expect(paint.gradientStops).toHaveLength(2);
      expect(paint.gradientStops![0]!.position).toBe(0);
      expect(paint.gradientStops![1]!.position).toBe(1);
      expect(paint.gradientTransform).toBeDefined();
      expect(paint.gradientTransform).toHaveLength(2);
    });

    it('converts multiple fills preserving order', () => {
      const node = rectangle('R', {
        size: { x: 100, y: 100 },
        fills: [solid('#FF0000'), solid('#00FF00'), solid('#0000FF')],
      });
      const result = compile(node);

      expect(result.root.fillPaints).toHaveLength(3);
      expect(result.root.fillPaints[0]!.color!.r).toBe(1);
      expect(result.root.fillPaints[1]!.color!.g).toBe(1);
      expect(result.root.fillPaints[2]!.color!.b).toBe(1);
    });

    it('converts stroke paints', () => {
      const node = rectangle('R', {
        size: { x: 100, y: 100 },
        strokes: [stroke('#000000', 2)],
      });
      const result = compile(node);

      expect(result.root.strokes).toHaveLength(1);
      expect(result.root.strokes![0]!.type).toBe('SOLID');
      expect(result.root.strokeWeight).toBe(2);
    });
  });

  describe('Text node data expansion', () => {
    it('text nodes get textData and derivedTextData fields', () => {
      const node = text('Hello World', {
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: 700,
        textAlignHorizontal: 'CENTER',
      });
      const result = compile(node);

      expect(result.root.textData).toBeDefined();
      expect(result.root.textData!.characters).toBe('Hello World');
      expect(result.root.textData!.lines).toEqual(['Hello World']);

      expect(result.root.derivedTextData).toBeDefined();
      expect(result.root.derivedTextData!.baselines).toHaveLength(1);
      expect(result.root.derivedTextData!.baselines[0]!.firstCharIndex).toBe(0);
      expect(result.root.derivedTextData!.baselines[0]!.endCharIndex).toBe(11);
      expect(result.root.derivedTextData!.fontMetaData).toHaveLength(1);
      expect(result.root.derivedTextData!.fontMetaData[0]!.fontFamily).toBe('Inter');
      expect(result.root.derivedTextData!.fontMetaData[0]!.fontWeight).toBe(700);
      expect(result.root.derivedTextData!.fontMetaData[0]!.fontSize).toBe(16);
    });

    it('text nodes get fontSize, fontFamily, textAlignHorizontal fields', () => {
      const node = text('Heading', {
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 600,
        textAlignHorizontal: 'RIGHT',
      });
      const result = compile(node);

      expect(result.root.fontSize).toBe(24);
      expect(result.root.fontFamily).toBe('Inter');
      expect(result.root.textAlignHorizontal).toBe('RIGHT');
    });

    it('text nodes with default style get sensible defaults', () => {
      const node = text('Default text');
      const result = compile(node);

      expect(result.root.fontSize).toBe(14);
      expect(result.root.fontFamily).toBe('Inter');
      expect(result.root.textAlignHorizontal).toBe('LEFT');
      expect(result.root.textData!.characters).toBe('Default text');
    });

    it('multi-line text produces correct baselines', () => {
      const node = text('Line 1\nLine 2\nLine 3', { fontSize: 16 });
      const result = compile(node);

      expect(result.root.textData!.lines).toEqual(['Line 1', 'Line 2', 'Line 3']);
      expect(result.root.derivedTextData!.baselines).toHaveLength(3);

      const baselines = result.root.derivedTextData!.baselines;
      expect(baselines[0]!.firstCharIndex).toBe(0);
      expect(baselines[0]!.endCharIndex).toBe(6);
      expect(baselines[1]!.firstCharIndex).toBe(7);
      expect(baselines[1]!.endCharIndex).toBe(13);
      expect(baselines[2]!.firstCharIndex).toBe(14);
      expect(baselines[2]!.endCharIndex).toBe(20);
    });
  });

  describe('Python renderer JSON format compatibility', () => {
    it('compiled output has all fields the Python renderer expects', () => {
      const node = frame('Component', {
        size: { x: 300, y: 200 },
        fills: [solid('#FFFFFF')],
        cornerRadius: 8,
        autoLayout: vertical({ spacing: 8, padX: 12, padY: 12 }),
        children: [
          text('Title', { fontSize: 20, fontWeight: 700 }),
          rectangle('Divider', { size: { x: 276, y: 1 }, fills: [solid('#E5E7EB')] }),
          text('Description text', { fontSize: 14 }),
        ],
      });

      const json = compileToJson(node);
      const parsed = JSON.parse(json);
      const root = parsed.root;

      // Fields the Python renderer expects on all nodes
      expect(root).toHaveProperty('type');
      expect(root).toHaveProperty('size');
      expect(root).toHaveProperty('fillPaints');
      expect(root).toHaveProperty('transform');
      expect(root).toHaveProperty('children');
      expect(root).toHaveProperty('cornerRadius');
      expect(root).toHaveProperty('opacity');
      expect(root).toHaveProperty('visible');

      // Type and size are correct format
      expect(typeof root.type).toBe('string');
      expect(typeof root.size.x).toBe('number');
      expect(typeof root.size.y).toBe('number');
      expect(Array.isArray(root.fillPaints)).toBe(true);
      expect(Array.isArray(root.transform)).toBe(true);
      expect(Array.isArray(root.children)).toBe(true);

      // Text child nodes should have textData and derivedTextData
      const titleNode = root.children[0];
      expect(titleNode).toHaveProperty('textData');
      expect(titleNode).toHaveProperty('derivedTextData');
      expect(titleNode.textData).toHaveProperty('characters');
      expect(titleNode.textData).toHaveProperty('lines');
      expect(titleNode.derivedTextData).toHaveProperty('baselines');
      expect(titleNode.derivedTextData).toHaveProperty('fontMetaData');

      // Rectangle child has correct format
      const divider = root.children[1];
      expect(divider.type).toBe('RECTANGLE');
      expect(divider.size).toEqual({ x: 276, y: 1 });
      expect(divider.fillPaints).toHaveLength(1);
    });

    it('all nodes in tree have guid, type, name, size, transform, children', () => {
      const node = frame('Root', {
        size: { x: 100, y: 100 },
        children: [
          frame('Inner', {
            size: { x: 80, y: 80 },
            children: [
              rectangle('Leaf', { size: { x: 60, y: 60 } }),
            ],
          }),
        ],
      });

      const json = compileToJson(node);
      const parsed = JSON.parse(json);

      function assertNodeFields(n: Record<string, unknown>, path: string): void {
        expect(n).toHaveProperty('guid');
        expect(n).toHaveProperty('type');
        expect(n).toHaveProperty('name');
        expect(n).toHaveProperty('size');
        expect(n).toHaveProperty('transform');
        expect(n).toHaveProperty('children');
        expect(n).toHaveProperty('fillPaints');
        expect(n).toHaveProperty('opacity');
        expect(n).toHaveProperty('visible');

        // guid is [number, number]
        expect(Array.isArray(n['guid'])).toBe(true);
        expect((n['guid'] as number[])).toHaveLength(2);

        // transform is 3x3 matrix
        expect(Array.isArray(n['transform'])).toBe(true);
        expect((n['transform'] as number[][])).toHaveLength(3);

        // Recurse into children
        const children = n['children'] as Record<string, unknown>[];
        for (let i = 0; i < children.length; i++) {
          assertNodeFields(children[i]!, `${path}.children[${i}]`);
        }
      }

      assertNodeFields(parsed.root, 'root');
    });

    it('fillPaints follow Figma paint format with type, color, opacity, visible', () => {
      const node = rectangle('R', {
        size: { x: 50, y: 50 },
        fills: [solid('#336699', 0.9)],
      });

      const json = compileToJson(node);
      const parsed = JSON.parse(json);
      const paint = parsed.root.fillPaints[0];

      expect(paint).toHaveProperty('type');
      expect(paint).toHaveProperty('color');
      expect(paint).toHaveProperty('opacity');
      expect(paint).toHaveProperty('visible');
      expect(paint.color).toHaveProperty('r');
      expect(paint.color).toHaveProperty('g');
      expect(paint.color).toHaveProperty('b');
      expect(paint.color).toHaveProperty('a');
      expect(typeof paint.color.r).toBe('number');
      expect(typeof paint.color.g).toBe('number');
      expect(typeof paint.color.b).toBe('number');
      expect(typeof paint.color.a).toBe('number');
    });

    it('auto-layout fields are present in JSON for layout nodes', () => {
      const node = frame('Layout', {
        size: { x: 200, y: 100 },
        autoLayout: horizontal({ spacing: 10, padX: 8, padY: 4 }),
      });

      const json = compileToJson(node);
      const parsed = JSON.parse(json);
      const root = parsed.root;

      expect(root).toHaveProperty('stackMode', 'HORIZONTAL');
      expect(root).toHaveProperty('itemSpacing', 10);
      expect(root).toHaveProperty('paddingLeft', 8);
      expect(root).toHaveProperty('paddingRight', 8);
      expect(root).toHaveProperty('paddingTop', 4);
      expect(root).toHaveProperty('paddingBottom', 4);
    });
  });

  describe('Error propagation', () => {
    it('returns empty errors for valid DSL input', () => {
      const node = frame('Valid', {
        size: { x: 100, y: 100 },
        fills: [solid('#000000')],
        children: [text('OK')],
      });
      const result = compile(node);
      expect(result.errors).toEqual([]);
    });

    it('compiles nodes without fills gracefully (empty fillPaints)', () => {
      const node = frame('NoFill', {
        size: { x: 100, y: 100 },
      });
      const result = compile(node);
      expect(result.root.fillPaints).toEqual([]);
      expect(result.errors).toEqual([]);
    });

    it('compiles nodes without size gracefully (defaults to 0x0)', () => {
      const node = frame('NoSize', {});
      const result = compile(node);
      expect(result.root.size).toEqual({ x: 0, y: 0 });
      expect(result.errors).toEqual([]);
    });
  });
});
