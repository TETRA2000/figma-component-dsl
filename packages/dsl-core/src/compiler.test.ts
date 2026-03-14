import { describe, it, expect } from 'vitest';
import { VirtualFigmaApi } from './virtual-api.js';
import { solidPaint, setAutoLayout } from './helpers.js';
import { Compiler } from './compiler.js';
import type { FigmaNodeDict } from './compiler.js';

const api = new VirtualFigmaApi();

function makeCompiler() {
  return new Compiler();
}

describe('Compiler — GUID assignment', () => {
  it('should assign unique counter-based GUIDs to all nodes', () => {
    const compiler = makeCompiler();
    const root = api.createFrame();
    root.name = 'Root';
    const child1 = api.createFrame();
    child1.name = 'Child1';
    const child2 = api.createFrame();
    child2.name = 'Child2';
    root.appendChild(child1);
    root.appendChild(child2);

    const result = compiler.compile(root);
    expect(result.root.guid).toEqual([0, 0]);
    expect(result.root.children[0].guid).toEqual([0, 1]);
    expect(result.root.children[1].guid).toEqual([0, 2]);
    expect(result.nodeCount).toBe(3);
    expect(result.errors).toEqual([]);
  });

  it('should produce deterministic GUIDs across compilations', () => {
    const root = api.createFrame();
    const child = api.createFrame();
    root.appendChild(child);

    const result1 = new Compiler().compile(root);
    const result2 = new Compiler().compile(root);
    expect(result1.root.guid).toEqual(result2.root.guid);
    expect(result1.root.children[0].guid).toEqual(result2.root.children[0].guid);
  });
});

describe('Compiler — parent references', () => {
  it('should set parentIndex on non-root nodes', () => {
    const compiler = makeCompiler();
    const root = api.createFrame();
    root.name = 'Root';
    const child = api.createFrame();
    child.name = 'Child';
    root.appendChild(child);

    const result = compiler.compile(root);
    expect(result.root.parentIndex).toBeUndefined();
    expect(result.root.children[0].parentIndex).toEqual({
      guid: [0, 0],
      position: '0',
    });
  });

  it('should set correct position for multiple children', () => {
    const compiler = makeCompiler();
    const root = api.createFrame();
    const c1 = api.createFrame();
    const c2 = api.createFrame();
    root.appendChild(c1);
    root.appendChild(c2);

    const result = compiler.compile(root);
    expect(result.root.children[0].parentIndex?.position).toBe('0');
    expect(result.root.children[1].parentIndex?.position).toBe('1');
  });
});

describe('Compiler — paint conversion', () => {
  it('should convert solid fills to fillPaints', () => {
    const compiler = makeCompiler();
    const frame = api.createFrame();
    frame.fills = [solidPaint('#FF0000')];

    const result = compiler.compile(frame);
    expect(result.root.fillPaints.length).toBe(1);
    expect(result.root.fillPaints[0]).toEqual({
      type: 'SOLID',
      color: { r: 1, g: 0, b: 0, a: 1 },
    });
  });

  it('should preserve fill array ordering', () => {
    const compiler = makeCompiler();
    const frame = api.createFrame();
    frame.fills = [solidPaint('#FF0000'), solidPaint('#00FF00')];

    const result = compiler.compile(frame);
    expect(result.root.fillPaints.length).toBe(2);
    expect(result.root.fillPaints[0].color.r).toBeCloseTo(1);
    expect(result.root.fillPaints[1].color.g).toBeCloseTo(1);
  });
});

describe('Compiler — basic node properties', () => {
  it('should compile node size, opacity, visibility', () => {
    const compiler = makeCompiler();
    const frame = api.createFrame();
    frame.name = 'Test';
    frame.resize(200, 100);
    frame.opacity = 0.5;
    frame.visible = false;
    frame.cornerRadius = 8;
    frame.clipContent = true;

    const result = compiler.compile(frame);
    expect(result.root.name).toBe('Test');
    expect(result.root.size).toEqual({ x: 200, y: 100 });
    expect(result.root.opacity).toBe(0.5);
    expect(result.root.visible).toBe(false);
    expect(result.root.cornerRadius).toBe(8);
    expect(result.root.clipContent).toBe(true);
    expect(result.root.type).toBe('FRAME');
  });
});

describe('Compiler — compileToJson', () => {
  it('should produce valid JSON', () => {
    const compiler = makeCompiler();
    const frame = api.createFrame();
    frame.name = 'Root';

    const json = compiler.compileToJson(frame);
    const parsed = JSON.parse(json);
    expect(parsed.root.name).toBe('Root');
    expect(parsed.nodeCount).toBe(1);
  });
});

describe('Compiler — two-pass auto-layout', () => {
  it('Example 1: horizontal button with HUG sizing', () => {
    const compiler = makeCompiler();
    const button = api.createFrame();
    button.name = 'Button';
    button.fills = [solidPaint('#7c3aed')];
    setAutoLayout(button, {
      direction: 'HORIZONTAL',
      spacing: 8,
      padX: 16,
      padY: 8,
      sizing: 'HUG',
    });

    // Simulate a text child with known size (no real font needed)
    const label = api.createFrame(); // Using frame as proxy for text with fixed size
    label.name = 'Label';
    label.resize(52, 17); // Simulated text measurement
    button.appendChild(label);

    const result = compiler.compile(button);
    // HUG: width = 52 + 16 + 16 = 84, height = 17 + 8 + 8 = 33
    expect(result.root.size.x).toBe(84);
    expect(result.root.size.y).toBe(33);
    // Child at offset (16, 8) from parent
    expect(result.root.children[0].transform[0][2]).toBe(16);
    expect(result.root.children[0].transform[1][2]).toBe(8);
  });

  it('Example 2: vertical card with FILL-width children', () => {
    const compiler = makeCompiler();
    const card = api.createFrame();
    card.name = 'Card';
    card.resize(300, 200);
    setAutoLayout(card, { direction: 'VERTICAL', spacing: 12, padX: 16, padY: 16 });

    const title = api.createFrame();
    title.name = 'Title';
    title.resize(40, 22);
    title.layoutSizingHorizontal = 'FILL';
    card.appendChild(title);

    const result = compiler.compile(card);
    // Card is FIXED: 300×200
    expect(result.root.size.x).toBe(300);
    expect(result.root.size.y).toBe(200);
    // Title FILL width: 300 - 16 - 16 = 268
    expect(result.root.children[0].size.x).toBe(268);
    // Title at (16, 16)
    expect(result.root.children[0].transform[0][2]).toBe(16);
    expect(result.root.children[0].transform[1][2]).toBe(16);
  });

  it('FILL-inside-HUG: FILL child treated as HUG', () => {
    const compiler = makeCompiler();
    const parent = api.createFrame();
    parent.name = 'HugParent';
    setAutoLayout(parent, { direction: 'HORIZONTAL', sizing: 'HUG' });

    const child = api.createFrame();
    child.name = 'FillChild';
    child.resize(100, 50);
    child.layoutSizingHorizontal = 'FILL';
    parent.appendChild(child);

    const result = compiler.compile(parent);
    // FILL inside HUG → treated as HUG, child keeps intrinsic size
    expect(result.root.children[0].size.x).toBe(100);
    // Parent wraps child
    expect(result.root.size.x).toBe(100);
    expect(result.root.size.y).toBe(50);
  });

  it('primary axis alignment: CENTER', () => {
    const compiler = makeCompiler();
    const container = api.createFrame();
    container.resize(200, 100);
    setAutoLayout(container, {
      direction: 'HORIZONTAL',
      align: 'CENTER',
    });

    const child = api.createFrame();
    child.resize(50, 30);
    container.appendChild(child);

    const result = compiler.compile(container);
    // Centered: (200 - 50) / 2 = 75
    expect(result.root.children[0].transform[0][2]).toBe(75);
  });

  it('primary axis alignment: MAX', () => {
    const compiler = makeCompiler();
    const container = api.createFrame();
    container.resize(200, 100);
    setAutoLayout(container, { direction: 'HORIZONTAL', align: 'MAX' });

    const child = api.createFrame();
    child.resize(50, 30);
    container.appendChild(child);

    const result = compiler.compile(container);
    // MAX: 200 - 50 = 150
    expect(result.root.children[0].transform[0][2]).toBe(150);
  });

  it('primary axis alignment: SPACE_BETWEEN', () => {
    const compiler = makeCompiler();
    const container = api.createFrame();
    container.resize(200, 100);
    setAutoLayout(container, { direction: 'HORIZONTAL', align: 'SPACE_BETWEEN' });

    const c1 = api.createFrame();
    c1.resize(30, 20);
    const c2 = api.createFrame();
    c2.resize(30, 20);
    const c3 = api.createFrame();
    c3.resize(30, 20);
    container.appendChild(c1);
    container.appendChild(c2);
    container.appendChild(c3);

    const result = compiler.compile(container);
    // Total child width = 90, remaining = 110, gaps = 2, each gap = 55
    expect(result.root.children[0].transform[0][2]).toBe(0);
    expect(result.root.children[1].transform[0][2]).toBe(85); // 30 + 55
    expect(result.root.children[2].transform[0][2]).toBe(170); // 85 + 30 + 55
  });

  it('counter axis alignment: CENTER', () => {
    const compiler = makeCompiler();
    const container = api.createFrame();
    container.resize(200, 100);
    setAutoLayout(container, {
      direction: 'HORIZONTAL',
      counterAlign: 'CENTER',
    });

    const child = api.createFrame();
    child.resize(50, 30);
    container.appendChild(child);

    const result = compiler.compile(container);
    // Counter axis (vertical) centered: (100 - 30) / 2 = 35
    expect(result.root.children[0].transform[1][2]).toBe(35);
  });

  it('counter axis alignment: MAX', () => {
    const compiler = makeCompiler();
    const container = api.createFrame();
    container.resize(200, 100);
    setAutoLayout(container, {
      direction: 'HORIZONTAL',
      counterAlign: 'MAX',
    });

    const child = api.createFrame();
    child.resize(50, 30);
    container.appendChild(child);

    const result = compiler.compile(container);
    // Counter axis MAX: 100 - 30 = 70
    expect(result.root.children[0].transform[1][2]).toBe(70);
  });

  it('vertical layout with spacing', () => {
    const compiler = makeCompiler();
    const container = api.createFrame();
    container.resize(200, 300);
    setAutoLayout(container, { direction: 'VERTICAL', spacing: 10 });

    const c1 = api.createFrame();
    c1.resize(100, 40);
    const c2 = api.createFrame();
    c2.resize(100, 60);
    container.appendChild(c1);
    container.appendChild(c2);

    const result = compiler.compile(container);
    expect(result.root.children[0].transform[1][2]).toBe(0);
    expect(result.root.children[1].transform[1][2]).toBe(50); // 40 + 10
  });

  it('FILL children split remaining space equally', () => {
    const compiler = makeCompiler();
    const container = api.createFrame();
    container.resize(300, 100);
    setAutoLayout(container, { direction: 'HORIZONTAL' });

    const fixed = api.createFrame();
    fixed.resize(100, 50);
    const fill1 = api.createFrame();
    fill1.resize(0, 50);
    fill1.layoutSizingHorizontal = 'FILL';
    const fill2 = api.createFrame();
    fill2.resize(0, 50);
    fill2.layoutSizingHorizontal = 'FILL';
    container.appendChild(fixed);
    container.appendChild(fill1);
    container.appendChild(fill2);

    const result = compiler.compile(container);
    expect(result.root.children[0].size.x).toBe(100);
    // Remaining: 300 - 100 = 200, split 2 ways = 100 each
    expect(result.root.children[1].size.x).toBe(100);
    expect(result.root.children[2].size.x).toBe(100);
  });

  it('nodes without auto-layout use explicit position', () => {
    const compiler = makeCompiler();
    const root = api.createFrame();
    root.resize(400, 400);

    const child = api.createFrame();
    child.x = 50;
    child.y = 100;
    child.resize(80, 60);
    root.appendChild(child);

    const result = compiler.compile(root);
    expect(result.root.children[0].transform[0][2]).toBe(50);
    expect(result.root.children[0].transform[1][2]).toBe(100);
  });
});

describe('Compiler — transform matrices', () => {
  it('should produce identity-based root transform', () => {
    const compiler = makeCompiler();
    const root = api.createFrame();
    const result = compiler.compile(root);
    expect(result.root.transform).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it('should compose nested transforms', () => {
    const compiler = makeCompiler();
    const root = api.createFrame();
    root.resize(400, 400);
    setAutoLayout(root, { direction: 'VERTICAL', padTop: 20, padLeft: 10 });

    const child = api.createFrame();
    child.resize(100, 50);
    root.appendChild(child);

    const nestedChild = api.createFrame();
    nestedChild.resize(40, 30);
    nestedChild.x = 5;
    nestedChild.y = 5;
    child.appendChild(nestedChild);

    const result = compiler.compile(root);
    // child at (10, 20)
    expect(result.root.children[0].transform[0][2]).toBe(10);
    expect(result.root.children[0].transform[1][2]).toBe(20);
    // nestedChild at (10 + 5, 20 + 5) = (15, 25) — no auto-layout on child
    expect(result.root.children[0].children[0].transform[0][2]).toBe(15);
    expect(result.root.children[0].children[0].transform[1][2]).toBe(25);
  });
});

describe('Compiler — text data expansion', () => {
  it('should generate textData for TEXT nodes', async () => {
    const compiler = makeCompiler();
    const text = await api.createText();
    text.characters = 'Hello\nWorld';
    text.fontSize = 16;
    text.fontWeight = 700;

    const root = api.createFrame();
    root.resize(200, 100);
    root.appendChild(text);

    const result = compiler.compile(root);
    const textNode = result.root.children[0];
    expect(textNode.textData?.characters).toBe('Hello\nWorld');
    expect(textNode.textData?.lines).toEqual(['Hello', 'World']);
    expect(textNode.fontSize).toBe(16);
    expect(textNode.fontFamily).toBe('Inter');
    expect(textNode.textAlignHorizontal).toBe('LEFT');
  });

  it('should generate derivedTextData with baselines', async () => {
    const compiler = makeCompiler();
    const text = await api.createText();
    text.characters = 'Line1\nLine2';
    text.fontSize = 14;

    const root = api.createFrame();
    root.resize(200, 100);
    root.appendChild(text);

    const result = compiler.compile(root);
    const textNode = result.root.children[0];
    expect(textNode.derivedTextData).toBeDefined();
    expect(textNode.derivedTextData!.baselines.length).toBe(2);
    expect(textNode.derivedTextData!.fontMetaData.length).toBeGreaterThan(0);
    expect(textNode.derivedTextData!.fontMetaData[0].fontFamily).toBe('Inter');
  });
});

describe('Compiler — component compilation', () => {
  it('should compile COMPONENT with componentPropertyDefinitions', () => {
    const compiler = makeCompiler();
    const comp = api.createComponent();
    comp.name = 'Button';
    comp.addComponentProperty('label', 'TEXT', 'Click');
    comp.addComponentProperty('disabled', 'BOOLEAN', false);

    const result = compiler.compile(comp);
    expect(result.root.type).toBe('COMPONENT');
    expect(result.root.componentPropertyDefinitions).toEqual({
      label: { type: 'TEXT', defaultValue: 'Click' },
      disabled: { type: 'BOOLEAN', defaultValue: false },
    });
  });

  it('should compile INSTANCE with componentId and overrides', () => {
    const compiler = makeCompiler();
    const root = api.createFrame();
    root.resize(400, 400);

    const comp = api.createComponent();
    comp.name = 'Button';
    comp.addComponentProperty('label', 'TEXT', 'Click');
    root.appendChild(comp);

    const instance = comp.createInstance();
    instance.name = 'ButtonInstance';
    instance.setProperties({ label: 'Submit' });
    root.appendChild(instance);

    const result = compiler.compile(root);
    const instanceNode = result.root.children[1];
    expect(instanceNode.type).toBe('INSTANCE');
    expect(instanceNode.componentId).toBeDefined();
    expect(instanceNode.overriddenProperties).toEqual({ label: 'Submit' });
  });

  it('should compile per-corner radius properties when set', () => {
    const compiler = makeCompiler();
    const rect = api.createRectangle();
    rect.name = 'RoundedRect';
    rect.resize(100, 60);
    rect.topLeftRadius = 16;
    rect.topRightRadius = 0;
    rect.bottomLeftRadius = 0;
    rect.bottomRightRadius = 8;

    const result = compiler.compile(rect);
    expect(result.root.topLeftRadius).toBe(16);
    expect(result.root.topRightRadius).toBe(0);
    expect(result.root.bottomLeftRadius).toBe(0);
    expect(result.root.bottomRightRadius).toBe(8);
  });

  it('should not emit per-corner radius when not set', () => {
    const compiler = makeCompiler();
    const rect = api.createRectangle();
    rect.name = 'SimpleRect';
    rect.resize(100, 60);
    rect.cornerRadius = 10;

    const result = compiler.compile(rect);
    expect(result.root.cornerRadius).toBe(10);
    expect(result.root.topLeftRadius).toBeUndefined();
    expect(result.root.topRightRadius).toBeUndefined();
    expect(result.root.bottomLeftRadius).toBeUndefined();
    expect(result.root.bottomRightRadius).toBeUndefined();
  });

  it('should compile per-corner radius on frame nodes', () => {
    const compiler = makeCompiler();
    const frame = api.createFrame();
    frame.name = 'RoundedFrame';
    frame.resize(200, 100);
    frame.topLeftRadius = 20;
    frame.topRightRadius = 10;
    frame.bottomLeftRadius = 5;
    frame.bottomRightRadius = 0;

    const result = compiler.compile(frame);
    expect(result.root.topLeftRadius).toBe(20);
    expect(result.root.topRightRadius).toBe(10);
    expect(result.root.bottomLeftRadius).toBe(5);
    expect(result.root.bottomRightRadius).toBe(0);
  });

  it('should compile letterSpacing on TEXT nodes', async () => {
    const compiler = makeCompiler();
    const text = await api.createText();
    text.characters = 'Spaced';
    text.fontSize = 14;
    text.letterSpacing = { value: 5, unit: 'PERCENT' };

    const root = api.createFrame();
    root.resize(200, 100);
    root.appendChild(text);

    const result = compiler.compile(root);
    const textNode = result.root.children[0];
    expect(textNode.letterSpacing).toEqual({ value: 5, unit: 'PERCENT' });
  });

  it('should compile fontStyle Italic in fontMetaData', async () => {
    const compiler = makeCompiler();
    const text = await api.createText();
    text.characters = 'Italic text';
    text.fontSize = 14;
    text.fontStyle = 'Italic';

    const root = api.createFrame();
    root.resize(200, 100);
    root.appendChild(text);

    const result = compiler.compile(root);
    const textNode = result.root.children[0];
    expect(textNode.derivedTextData!.fontMetaData[0].fontStyle).toBe('Italic');
  });

  it('should compile COMPONENT_SET type', () => {
    const compiler = makeCompiler();
    const parent = api.createFrame();
    const c1 = api.createComponent();
    c1.name = 'Variant=Primary';
    const c2 = api.createComponent();
    c2.name = 'Variant=Secondary';
    parent.appendChild(c1);
    parent.appendChild(c2);

    const set = api.combineAsVariants([c1, c2], parent);
    const result = compiler.compile(parent);

    const setNode = result.root.children[0];
    expect(setNode.type).toBe('COMPONENT_SET');
    expect(setNode.children.length).toBe(2);
  });
});
