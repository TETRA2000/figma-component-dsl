import { describe, it, expect, vi } from 'vitest';
import {
  detectSlots,
  parsePropertyKey,
  type SlotDetectableComponent,
  type SlotDetectableNode,
} from './slot-detector.js';

// --- Helpers ---

function makeNode(overrides: Partial<SlotDetectableNode> & { type: string; name: string }): SlotDetectableNode {
  return {
    id: `node-${Math.random().toString(36).slice(2, 8)}`,
    width: 100,
    height: 100,
    ...overrides,
  };
}

function makeComponent(
  children: SlotDetectableNode[],
  propDefs?: Record<string, { type: string; defaultValue?: unknown }>,
): SlotDetectableComponent {
  return {
    type: 'COMPONENT',
    name: 'TestComponent',
    id: 'comp-1',
    children,
    componentPropertyDefinitions: propDefs,
  };
}

// --- parsePropertyKey ---

describe('parsePropertyKey', () => {
  it('extracts layer name before last hash', () => {
    expect(parsePropertyKey('Footer#1:3')).toBe('Footer');
  });

  it('handles layer names containing hash characters', () => {
    expect(parsePropertyKey('My#Header#2:5')).toBe('My#Header');
  });

  it('returns undefined for keys without hash', () => {
    expect(parsePropertyKey('NoHash')).toBeUndefined();
  });

  it('returns undefined for keys starting with hash', () => {
    expect(parsePropertyKey('#1:3')).toBeUndefined();
  });
});

// --- detectSlots: componentPropertyDefinitions ---

describe('detectSlots - componentPropertyDefinitions', () => {
  it('detects wrapped slot (type SLOT) via property definitions', () => {
    const slotChild = makeNode({ type: 'SLOT', name: 'HeroContent' });
    const comp = makeComponent([slotChild], {
      'HeroContent#1:0': { type: 'SLOT' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.slotName).toBe('HeroContent');
    expect(results[0]!.sourceType).toBe('nativeSlot');
    expect(results[0]!.slotNodeKind).toBe('wrapped');
    expect(results[0]!.propertyKey).toBe('HeroContent#1:0');
    expect(results[0]!.detectedVia).toBe('componentPropertyDefinitions');
  });

  it('detects converted slot (type FRAME) via property definitions', () => {
    const frameChild = makeNode({ type: 'FRAME', name: 'Footer' });
    const comp = makeComponent([frameChild], {
      'Footer#1:3': { type: 'SLOT' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.slotName).toBe('Footer');
    expect(results[0]!.sourceType).toBe('nativeSlot');
    expect(results[0]!.slotNodeKind).toBe('converted');
    expect(results[0]!.detectedVia).toBe('componentPropertyDefinitions');
  });

  it('detects multiple slots from property definitions', () => {
    const slot1 = makeNode({ type: 'SLOT', name: 'Header' });
    const slot2 = makeNode({ type: 'FRAME', name: 'Content' });
    const comp = makeComponent([slot1, slot2], {
      'Header#1:0': { type: 'SLOT' },
      'Content#1:1': { type: 'SLOT' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(2);
    expect(results[0]!.slotName).toBe('Header');
    expect(results[1]!.slotName).toBe('Content');
  });

  it('ignores non-SLOT property definitions', () => {
    const child = makeNode({ type: 'FRAME', name: 'SomeFrame' });
    const comp = makeComponent([child], {
      'SomeFrame#1:0': { type: 'VARIANT' },
      'Text#1:1': { type: 'TEXT', defaultValue: 'Hello' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(0);
  });

  it('falls back to positional correlation when name does not match', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // Property says "OriginalName" but child was renamed to "RenamedChild"
    const child = makeNode({ type: 'SLOT', name: 'RenamedChild' });
    const comp = makeComponent([child], {
      'OriginalName#1:0': { type: 'SLOT' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.slotName).toBe('OriginalName'); // Uses property key name
    expect(results[0]!.detectedVia).toBe('componentPropertyDefinitions');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('positional fallback'));
    warnSpy.mockRestore();
  });

  it('handles layer names with hash characters in property keys', () => {
    const child = makeNode({ type: 'FRAME', name: 'My#Header' });
    const comp = makeComponent([child], {
      'My#Header#2:5': { type: 'SLOT' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.slotName).toBe('My#Header');
  });
});

// --- detectSlots: supplementary node type detection ---

describe('detectSlots - node type SLOT', () => {
  it('detects SLOT nodes when no property definitions exist', () => {
    const slotChild = makeNode({ type: 'SLOT', name: 'OrphanSlot' });
    const comp = makeComponent([slotChild]); // No propDefs

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.slotName).toBe('OrphanSlot');
    expect(results[0]!.sourceType).toBe('nativeSlot');
    expect(results[0]!.slotNodeKind).toBe('wrapped');
    expect(results[0]!.detectedVia).toBe('nodeType');
  });

  it('does not duplicate nodes already detected via property definitions', () => {
    const slotChild = makeNode({ type: 'SLOT', name: 'Header' });
    const comp = makeComponent([slotChild], {
      'Header#1:0': { type: 'SLOT' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.detectedVia).toBe('componentPropertyDefinitions');
  });
});

// --- detectSlots: DslCanvas plugin data ---

describe('detectSlots - DslCanvas plugin data', () => {
  it('classifies DslCanvas nodes via plugin data when not detected by other methods', () => {
    const canvasChild = makeNode({
      type: 'FRAME',
      name: 'hero-canvas',
      getPluginData: (key: string) =>
        key === 'dsl-canvas' ? JSON.stringify({ isCanvas: true, canvasName: 'hero-canvas' }) : '',
    });
    const comp = makeComponent([canvasChild]); // No propDefs, not type SLOT

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.slotName).toBe('hero-canvas');
    expect(results[0]!.sourceType).toBe('dslCanvas');
    expect(results[0]!.detectedVia).toBe('pluginData');
  });

  it('DslCanvas classification overrides nativeSlot when detected via property definitions', () => {
    const canvasSlot = makeNode({
      type: 'FRAME',
      name: 'card-canvas',
      getPluginData: (key: string) =>
        key === 'dsl-canvas' ? JSON.stringify({ isCanvas: true, canvasName: 'card-canvas' }) : '',
    });
    const comp = makeComponent([canvasSlot], {
      'card-canvas#1:0': { type: 'SLOT' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.sourceType).toBe('dslCanvas');
    expect(results[0]!.detectedVia).toBe('componentPropertyDefinitions');
  });

  it('handles malformed plugin data gracefully', () => {
    const badDataChild = makeNode({
      type: 'FRAME',
      name: 'broken',
      getPluginData: () => 'not-json',
    });
    const comp = makeComponent([badDataChild]);

    const results = detectSlots(comp);
    expect(results).toHaveLength(0);
  });
});

// --- detectSlots: designer-authored components ---

describe('detectSlots - designer-authored components', () => {
  it('works on components without DSL origin', () => {
    // A designer-created component with a SLOT child
    const designerSlot = makeNode({ type: 'SLOT', name: 'DesignerSlot' });
    const comp: SlotDetectableComponent = {
      type: 'COMPONENT',
      name: 'DesignerComponent',
      id: 'designer-comp-1',
      children: [designerSlot],
      // No componentPropertyDefinitions — designer may not have used that flow
    };

    const results = detectSlots(comp);
    expect(results).toHaveLength(1);
    expect(results[0]!.sourceType).toBe('nativeSlot');
    expect(results[0]!.slotNodeKind).toBe('wrapped');
  });

  it('detects mixed native slots and DslCanvas in same component', () => {
    const nativeSlot = makeNode({ type: 'SLOT', name: 'NativeSlot' });
    const canvasNode = makeNode({
      type: 'FRAME',
      name: 'MyCanvas',
      getPluginData: (key: string) =>
        key === 'dsl-canvas' ? JSON.stringify({ isCanvas: true, canvasName: 'MyCanvas' }) : '',
    });
    const comp = makeComponent([nativeSlot, canvasNode], {
      'NativeSlot#1:0': { type: 'SLOT' },
    });

    const results = detectSlots(comp);
    expect(results).toHaveLength(2);
    expect(results[0]!.sourceType).toBe('nativeSlot');
    expect(results[0]!.slotName).toBe('NativeSlot');
    expect(results[1]!.sourceType).toBe('dslCanvas');
    expect(results[1]!.slotName).toBe('MyCanvas');
  });
});

// --- detectSlots: empty / no slots ---

describe('detectSlots - edge cases', () => {
  it('returns empty array when no slots detected', () => {
    const frame = makeNode({ type: 'FRAME', name: 'RegularFrame' });
    const comp = makeComponent([frame]);

    const results = detectSlots(comp);
    expect(results).toHaveLength(0);
  });

  it('returns empty array for component with no children', () => {
    const comp: SlotDetectableComponent = {
      type: 'COMPONENT',
      name: 'Empty',
      id: 'empty-1',
      children: [],
    };

    const results = detectSlots(comp);
    expect(results).toHaveLength(0);
  });
});
