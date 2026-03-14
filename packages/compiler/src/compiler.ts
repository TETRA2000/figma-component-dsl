import type { DslNode, Fill, StrokePaint, AutoLayoutConfig } from '@figma-dsl/core';
import type {
  FigmaNodeDict, FigmaNodeType, FigmaPaint, FigmaStroke,
  CompileResult, CompileError, Baseline, FontMeta, TextMeasurer,
} from './types.js';
import { resolveLayout } from './layout-resolver.js';

let guidCounter = 0;

function nextGuid(): [number, number] {
  return [0, ++guidCounter];
}

function resetGuidCounter(): void {
  guidCounter = 0;
}

function mapNodeType(node: DslNode): FigmaNodeType {
  switch (node.type) {
    case 'RECTANGLE':
      return (node.cornerRadius !== undefined && node.cornerRadius > 0) ||
             node.cornerRadii !== undefined
        ? 'ROUNDED_RECTANGLE'
        : 'RECTANGLE';
    case 'FRAME':
    case 'TEXT':
    case 'ELLIPSE':
    case 'GROUP':
    case 'COMPONENT':
    case 'COMPONENT_SET':
    case 'INSTANCE':
      return node.type;
  }
}

function convertFill(fill: Fill): FigmaPaint {
  if (fill.type === 'SOLID') {
    return {
      type: 'SOLID',
      color: { ...fill.color },
      opacity: fill.opacity,
      visible: fill.visible,
    };
  }
  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: fill.gradientStops.map(s => ({
      color: { ...s.color },
      position: s.position,
    })),
    gradientTransform: fill.gradientTransform,
    opacity: fill.opacity,
    visible: fill.visible,
  };
}

function convertStroke(stroke: StrokePaint): FigmaStroke {
  return {
    color: { ...stroke.color },
    weight: stroke.weight,
    align: stroke.align,
  };
}

function fontWeightToStyle(weight: number): string {
  switch (weight) {
    case 400: return 'Regular';
    case 500: return 'Medium';
    case 600: return 'Semi Bold';
    case 700: return 'Bold';
    default: return 'Regular';
  }
}

function resolveAutoLayoutPadding(al: AutoLayoutConfig): {
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
} {
  const padTop = al.padTop ?? al.padY ?? 0;
  const padBottom = al.padBottom ?? al.padY ?? 0;
  const padLeft = al.padLeft ?? al.padX ?? 0;
  const padRight = al.padRight ?? al.padX ?? 0;
  return { paddingTop: padTop, paddingRight: padRight, paddingBottom: padBottom, paddingLeft: padLeft };
}

function compileNode(
  node: DslNode,
  parentGuid: [number, number] | undefined,
  childIndex: number,
  path: string,
  errors: CompileError[],
): FigmaNodeDict {
  const guid = nextGuid();
  const figmaType = mapNodeType(node);

  const fillPaints: FigmaPaint[] = node.fills
    ? node.fills.map(convertFill)
    : [];

  const strokes: FigmaStroke[] | undefined = node.strokes
    ? node.strokes.map(convertStroke)
    : undefined;

  const strokeWeight = node.strokes?.length
    ? node.strokes[0]!.weight
    : undefined;

  const result: FigmaNodeDict = {
    guid,
    type: figmaType,
    name: node.name,
    size: node.size ?? { x: 0, y: 0 },
    transform: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    fillPaints,
    strokes,
    strokeWeight,
    cornerRadius: node.cornerRadius,
    opacity: node.opacity ?? 1,
    visible: node.visible ?? true,
    clipContent: node.clipContent,
    children: [],
    parentIndex: parentGuid
      ? { guid: parentGuid, position: String(childIndex) }
      : undefined,
  };

  // Auto-layout passthrough
  if (node.autoLayout) {
    const al = node.autoLayout;
    result.stackMode = al.direction;
    result.itemSpacing = al.spacing ?? 0;
    const pad = resolveAutoLayoutPadding(al);
    result.paddingTop = pad.paddingTop;
    result.paddingRight = pad.paddingRight;
    result.paddingBottom = pad.paddingBottom;
    result.paddingLeft = pad.paddingLeft;
    result.primaryAxisAlignItems = al.align ?? 'MIN';
    result.counterAxisAlignItems = al.counterAlign ?? 'MIN';
  }

  // Child layout sizing passthrough
  if (node.layoutSizingHorizontal) {
    result.layoutSizingHorizontal = node.layoutSizingHorizontal;
  }
  if (node.layoutSizingVertical) {
    result.layoutSizingVertical = node.layoutSizingVertical;
  }

  // Text data expansion
  if (node.type === 'TEXT' && node.characters) {
    const chars = node.characters;
    const lines = chars.split('\n');
    const style = node.textStyle ?? {};
    const fontSize = style.fontSize ?? 14;
    const fontWeight = style.fontWeight ?? 400;
    const fontFamily = style.fontFamily ?? 'Inter';
    const lineHeightValue = style.lineHeight
      ? style.lineHeight.unit === 'PERCENT'
        ? (style.lineHeight.value / 100) * fontSize
        : style.lineHeight.value
      : fontSize * 1.2;

    result.textData = { characters: chars, lines };
    result.fontSize = fontSize;
    result.fontFamily = fontFamily;
    result.textAlignHorizontal = style.textAlignHorizontal ?? 'LEFT';

    // textAutoResize passthrough
    const textAutoResize = node.textAutoResize ?? style.textAutoResize;
    if (textAutoResize) {
      result.textAutoResize = textAutoResize;
    }

    const baselines: Baseline[] = [];
    let charIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      baselines.push({
        lineY: i * lineHeightValue,
        lineHeight: lineHeightValue,
        firstCharIndex: charIndex,
        endCharIndex: charIndex + line.length,
      });
      charIndex += line.length + 1; // +1 for the \n
    }

    const fontMeta: FontMeta = {
      fontFamily,
      fontStyle: fontWeightToStyle(fontWeight),
      fontWeight,
      fontSize,
    };

    result.derivedTextData = {
      baselines,
      fontMetaData: [fontMeta],
    };
  }

  // Component property definitions
  if (node.type === 'COMPONENT' && node.componentProperties) {
    const defs: Record<string, { type: string; defaultValue: string | boolean }> = {};
    for (const prop of node.componentProperties) {
      defs[prop.name] = {
        type: prop.type,
        defaultValue: prop.defaultValue,
      };
    }
    result.componentPropertyDefinitions = defs;
  }

  // Instance compilation
  if (node.type === 'INSTANCE' && node.componentRef) {
    result.componentId = node.componentRef;
    if (node.propertyOverrides) {
      result.overriddenProperties = { ...node.propertyOverrides };
    }
  }

  // Compile children
  if (node.children) {
    result.children = node.children.map((child, idx) =>
      compileNode(child, guid, idx, `${path} > ${child.name}`, errors)
    );
  }

  return result;
}

export function compile(node: DslNode): CompileResult {
  resetGuidCounter();
  const errors: CompileError[] = [];
  const root = compileNode(node, undefined, 0, node.name, errors);
  return {
    root,
    nodeCount: guidCounter,
    errors,
  };
}

export function compileWithLayout(node: DslNode, measurer: TextMeasurer): CompileResult {
  const { sizes, offsets } = resolveLayout(node, measurer);
  resetGuidCounter();
  const errors: CompileError[] = [];
  const root = compileNodeWithLayout(node, undefined, 0, node.name, errors, sizes, offsets, [1, 0, 0, 0, 1, 0]);
  return { root, nodeCount: guidCounter, errors };
}

function compileNodeWithLayout(
  node: DslNode,
  parentGuid: [number, number] | undefined,
  childIndex: number,
  path: string,
  errors: CompileError[],
  sizes: Map<DslNode, { width: number; height: number }>,
  offsets: Map<DslNode, { x: number; y: number }>,
  parentTransform: [number, number, number, number, number, number],
): FigmaNodeDict {
  const result = compileNode(node, parentGuid, childIndex, path, errors);

  // Apply resolved size
  const resolvedSize = sizes.get(node);
  if (resolvedSize) {
    result.size = { x: resolvedSize.width, y: resolvedSize.height };
  }

  // Apply resolved transform
  const offset = offsets.get(node);
  if (offset) {
    // Compose parent transform with child offset
    const tx = parentTransform[0]! * offset.x + parentTransform[1]! * offset.y + parentTransform[2]!;
    const ty = parentTransform[3]! * offset.x + parentTransform[4]! * offset.y + parentTransform[5]!;
    result.transform = [
      [parentTransform[0]!, parentTransform[1]!, tx],
      [parentTransform[3]!, parentTransform[4]!, ty],
      [0, 0, 1],
    ];
  }

  // Re-compile children with layout data
  if (node.children) {
    const currentTransform: [number, number, number, number, number, number] = [
      result.transform[0][0], result.transform[0][1], result.transform[0][2],
      result.transform[1][0], result.transform[1][1], result.transform[1][2],
    ];
    result.children = node.children.map((child, idx) =>
      compileNodeWithLayout(
        child, result.guid, idx, `${path} > ${child.name}`,
        errors, sizes, offsets, currentTransform,
      )
    );
  }

  return result;
}

export function compileToJson(node: DslNode): string {
  const result = compile(node);
  return JSON.stringify(result, null, 2);
}
