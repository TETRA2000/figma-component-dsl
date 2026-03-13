import type { DslNode, Fill, StrokePaint, AutoLayoutConfig } from '../../dsl-core/src/types.js';
import type { FigmaNodeDict, FigmaPaint, CompileResult, CompileError, Transform } from './types.js';
import type { TextMeasurer } from './text-measurer.js';
import { resolveLayout, type ResolvedNode } from './layout-resolver.js';
import { expandTextData } from './text-expander.js';

const IDENTITY_TRANSFORM: Transform = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
] as const;

function convertFill(fill: Fill): FigmaPaint {
  if (fill.type === 'SOLID') {
    return {
      type: 'SOLID',
      color: { r: fill.color.r, g: fill.color.g, b: fill.color.b, a: fill.color.a },
      opacity: fill.opacity,
      visible: fill.visible,
    };
  }
  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: fill.gradientStops.map((s) => ({
      color: { r: s.color.r, g: s.color.g, b: s.color.b, a: s.color.a },
      position: s.position,
    })),
    gradientTransform: fill.gradientTransform,
    opacity: fill.opacity,
    visible: fill.visible,
  };
}

function convertStroke(s: StrokePaint): FigmaPaint {
  return {
    type: 'SOLID',
    color: { r: s.color.r, g: s.color.g, b: s.color.b, a: s.color.a },
    opacity: 1,
    visible: true,
  };
}

function resolvePadding(config: AutoLayoutConfig): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  return {
    top: config.padTop ?? config.padY ?? 0,
    right: config.padRight ?? config.padX ?? 0,
    bottom: config.padBottom ?? config.padY ?? 0,
    left: config.padLeft ?? config.padX ?? 0,
  };
}

function composeTransform(parent: Transform, tx: number, ty: number): Transform {
  // For simple translation (no rotation/scale), compose by adding offsets
  return [
    [parent[0][0], parent[0][1], parent[0][2] + tx],
    [parent[1][0], parent[1][1], parent[1][2] + ty],
    [0, 0, 1],
  ] as const;
}

interface CompileContext {
  guidCounter: number;
  errors: CompileError[];
}

function compileNode(
  node: DslNode | ResolvedNode,
  ctx: CompileContext,
  parentTransform: Transform,
  parentGuid?: [number, number],
  positionInParent?: number,
): FigmaNodeDict {
  const guid: [number, number] = [0, ctx.guidCounter++];

  // Convert fills
  const fillPaints: FigmaPaint[] = node.fills?.map(convertFill) ?? [];

  // Convert strokes
  const strokes: FigmaPaint[] | undefined = node.strokes?.map(convertStroke);
  const strokeWeight = node.strokes?.[0]?.weight;

  // Compute transform from resolved position
  const resolved = node as ResolvedNode;
  const pos = resolved._resolvedPosition ?? { x: 0, y: 0 };
  const nodeTransform: Transform = composeTransform(parentTransform, pos.x, pos.y);

  // Compile children
  const children = (node.children ?? []).map((child, i) =>
    compileNode(child, ctx, nodeTransform, guid, i),
  );

  // Build the compiled node
  const compiled: FigmaNodeDict = {
    guid,
    type: node.type,
    name: node.name,
    size: node.size ? { x: node.size.x, y: node.size.y } : { x: 0, y: 0 },
    transform: nodeTransform,
    fillPaints,
    strokes,
    strokeWeight,
    cornerRadius: node.cornerRadius,
    cornerRadii: node.cornerRadii ? {
      topLeft: node.cornerRadii.topLeft,
      topRight: node.cornerRadii.topRight,
      bottomLeft: node.cornerRadii.bottomLeft,
      bottomRight: node.cornerRadii.bottomRight,
    } : undefined,
    opacity: node.opacity ?? 1,
    visible: node.visible ?? true,
    clipContent: node.clipContent,
    children,
    parentIndex: parentGuid !== undefined
      ? { guid: parentGuid, position: String(positionInParent ?? 0) }
      : undefined,
  };

  // Auto-layout passthrough
  if (node.autoLayout) {
    const pad = resolvePadding(node.autoLayout);
    compiled.stackMode = node.autoLayout.direction;
    compiled.itemSpacing = node.autoLayout.spacing ?? 0;
    compiled.paddingTop = pad.top;
    compiled.paddingRight = pad.right;
    compiled.paddingBottom = pad.bottom;
    compiled.paddingLeft = pad.left;
    compiled.primaryAxisAlignItems = node.autoLayout.align;
    compiled.counterAxisAlignItems = node.autoLayout.counterAlign;
  }

  // Layout sizing passthrough
  if (node.layoutSizingHorizontal) {
    compiled.layoutSizingHorizontal = node.layoutSizingHorizontal;
  }
  if (node.layoutSizingVertical) {
    compiled.layoutSizingVertical = node.layoutSizingVertical;
  }

  // Component property definitions
  if (node.type === 'COMPONENT' && node.componentProperties) {
    const defs: Record<string, { type: string; defaultValue: string | boolean }> = {};
    for (const prop of node.componentProperties) {
      defs[prop.name] = { type: prop.type, defaultValue: prop.defaultValue };
    }
    compiled.componentPropertyDefinitions = defs;
  }

  // Instance compilation
  if (node.type === 'INSTANCE' && node.componentRef) {
    compiled.componentId = node.componentRef;
    if (node.propertyOverrides) {
      compiled.overriddenProperties = { ...node.propertyOverrides };
    }
  }

  // Text data expansion
  if (node.type === 'TEXT' && node.characters) {
    const td = expandTextData(node.characters, node.textStyle, compiled.size.y);
    compiled.textData = td.textData;
    compiled.derivedTextData = td.derivedTextData;
    compiled.fontSize = td.fontSize;
    compiled.fontFamily = td.fontFamily;
    compiled.textAlignHorizontal = td.textAlignHorizontal;
    if (td.letterSpacing) {
      compiled.letterSpacing = td.letterSpacing;
    }
  }

  return compiled;
}

export function compile(node: DslNode, measurer?: TextMeasurer): CompileResult {
  const ctx: CompileContext = {
    guidCounter: 0,
    errors: [],
  };

  // If measurer provided, resolve layout first
  const resolvedNode = measurer ? resolveLayout(node, measurer) : node;
  const root = compileNode(resolvedNode, ctx, IDENTITY_TRANSFORM);

  return {
    root,
    nodeCount: ctx.guidCounter,
    errors: ctx.errors,
  };
}

export function compileToJson(node: DslNode, measurer?: TextMeasurer): string {
  const result = compile(node, measurer);
  return JSON.stringify(result, null, 2);
}
