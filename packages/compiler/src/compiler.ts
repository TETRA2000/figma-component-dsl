import type { DslNode, Fill, StrokePaint, AutoLayoutConfig } from '@figma-dsl/core';
import type {
  FigmaNodeDict, FigmaNodeType, FigmaPaint, FigmaStroke,
  CompileResult, CompileError, Baseline, FontMeta, TextMeasurer,
  CompilerOptions, CompilerValidationLevel,
} from './types.js';
import { resolveLayout } from './layout-resolver.js';

let guidCounter = 0;

function nextGuid(): [number, number] {
  return [0, ++guidCounter];
}

function resetGuidCounter(): void {
  guidCounter = 0;
}

function mapNodeType(node: DslNode): FigmaNodeType | null {
  switch (node.type) {
    case 'RECTANGLE':
      return (node.cornerRadius !== undefined && node.cornerRadius > 0) ||
             node.cornerRadii !== undefined
        ? 'ROUNDED_RECTANGLE'
        : 'RECTANGLE';
    case 'IMAGE':
    case 'FRAME':
    case 'TEXT':
    case 'ELLIPSE':
    case 'GROUP':
    case 'COMPONENT':
    case 'COMPONENT_SET':
    case 'INSTANCE':
    case 'LINE':
    case 'SECTION':
    case 'POLYGON':
    case 'STAR':
    case 'BOOLEAN_OPERATION':
      return node.type;
    default:
      return null;
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
  if (fill.type === 'IMAGE') {
    return {
      type: 'IMAGE',
      imageSrc: fill.src,
      imageScaleMode: fill.scaleMode,
      opacity: fill.opacity,
      visible: fill.visible,
    };
  }
  if (fill.type === 'GRADIENT_RADIAL') {
    return {
      type: 'GRADIENT_RADIAL',
      gradientStops: fill.gradientStops.map(s => ({
        color: { ...s.color },
        position: s.position,
      })),
      center: fill.center,
      radius: fill.radius,
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

function validateNode(
  node: DslNode,
  path: string,
  errors: CompileError[],
  level: CompilerValidationLevel = 'strict',
): void {
  const push = (msg: string, sev?: 'error' | 'warning') => {
    errors.push({ message: msg, nodePath: path, nodeType: node.type, severity: sev });
  };

  // Validate cornerRadius
  if (node.cornerRadius !== undefined && node.cornerRadius < 0) {
    if (level === 'loose') {
      push(`cornerRadius is negative (${node.cornerRadius}), clamping to 0`, 'warning');
    } else {
      push(`cornerRadius must be >= 0, got ${node.cornerRadius}`);
    }
  }

  // Validate fills
  if (node.fills) {
    for (const fill of node.fills) {
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b, a } = fill.color;
        if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1 || a < 0 || a > 1) {
          // RGBA range is always an error — Figma API hard constraint
          push(`RGBA values must be in 0-1 range, got rgba(${r}, ${g}, ${b}, ${a})`);
        }
      }
    }
  }

  // Validate strokes
  if (node.strokes) {
    for (const stroke of node.strokes) {
      if (stroke.weight < 0) {
        push(`strokeWeight must be >= 0, got ${stroke.weight}`);
      } else if (stroke.weight === 0) {
        if (level === 'strict') {
          push(`strokeWeight must be > 0, got ${stroke.weight}`);
        } else {
          push(`strokeWeight is 0, stroke will be invisible`, 'warning');
        }
      }
    }
  }

  // Validate image — always required (no image src = broken node)
  if (node.type === 'IMAGE') {
    if (!node.imageSrc) {
      push('IMAGE node must have an imageSrc');
    }
  }

  // Validate fills for image type — always required
  if (node.fills) {
    for (const fill of node.fills) {
      if (fill.type === 'IMAGE' && !fill.src) {
        push('IMAGE fill must have a non-empty src');
      }
    }
  }

  // Validate text
  if (node.type === 'TEXT') {
    const fontSize = node.textStyle?.fontSize;
    if (fontSize !== undefined && fontSize <= 0) {
      if (level === 'loose') {
        push(`fontSize is ${fontSize}, text will not render`, 'warning');
      } else {
        push(`fontSize must be > 0, got ${fontSize}`);
      }
    }
  }
}

function compileNode(
  node: DslNode,
  parentGuid: [number, number] | undefined,
  childIndex: number,
  path: string,
  errors: CompileError[],
  insideComponent: boolean = false,
  validationLevel?: CompilerValidationLevel,
): FigmaNodeDict {
  validateNode(node, path, errors, validationLevel);
  const guid = nextGuid();
  const figmaType = mapNodeType(node);

  if (figmaType === null) {
    console.warn(`Unknown node type "${node.type}" at "${path}" — skipping.`);
    // Return a minimal invisible node
    return {
      guid,
      type: 'FRAME' as FigmaNodeType,
      name: node.name,
      size: { x: 0, y: 0 },
      transform: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
      fillPaints: [],
      opacity: 0,
      visible: false,
      children: [],
    };
  }

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
    cornerRadii: node.cornerRadii,
    opacity: node.opacity ?? 1,
    visible: node.visible ?? true,
    clipContent: node.clipContent,
    children: [],
    parentIndex: parentGuid
      ? { guid: parentGuid, position: String(childIndex) }
      : undefined,
  };

  // Slot validation and passthrough
  if (node.isSlot) {
    if (!insideComponent) {
      errors.push({
        message: `A slot node "${node.name}" must be a descendant of a COMPONENT or COMPONENT_SET. Found at "${path}".`,
        nodePath: path,
        nodeType: node.type,
      });
    }
    result.isSlot = true;
    result.slotName = node.slotName ?? node.name;
    if (node.preferredInstances?.length) {
      result.preferredInstances = [...node.preferredInstances];
    }
  }

  // Image passthrough
  if (node.type === 'IMAGE') {
    result.imageSrc = node.imageSrc;
    result.imageScaleMode = node.imageScaleMode;
  }

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

    // Map widthSizing/heightSizing to layoutSizingHorizontal/Vertical
    // When an explicit size is given with auto-layout but no sizing mode,
    // infer FIXED so the plugin respects the specified dimensions
    if (al.widthSizing) {
      result.layoutSizingHorizontal = al.widthSizing;
    } else if (node.size && node.size.x > 0) {
      result.layoutSizingHorizontal = 'FIXED';
    }
    if (al.heightSizing) {
      result.layoutSizingVertical = al.heightSizing;
    } else if (node.size && node.size.y && node.size.y > 0) {
      result.layoutSizingVertical = 'FIXED';
    }
  }

  // Child layout sizing passthrough (explicit overrides)
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

    // textDecoration passthrough
    if (style.textDecoration && style.textDecoration !== 'NONE') {
      result.textDecoration = style.textDecoration;
    }

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
    const validTypes = new Set(['TEXT', 'BOOLEAN', 'INSTANCE_SWAP', 'SLOT']);
    const defs: Record<string, { type: string; defaultValue: string | boolean }> = {};
    for (const prop of node.componentProperties) {
      if (!validTypes.has(prop.type)) {
        errors.push({
          message: `Invalid componentProperty type '${prop.type}' on standalone COMPONENT '${node.name}'. Only TEXT, BOOLEAN, and INSTANCE_SWAP are allowed. Use componentSet() with variantAxes for variant properties.`,
          nodePath: path,
          nodeType: node.type,
        });
        continue;
      }
      defs[prop.name] = {
        type: prop.type,
        defaultValue: prop.defaultValue,
      };
    }
    if (Object.keys(defs).length > 0) {
      result.componentPropertyDefinitions = defs;
    }
  }

  // Inject SLOT property definitions from slot children
  if (node.type === 'COMPONENT' && node.children) {
    const slotChildren = node.children.filter(c => c.isSlot);
    if (slotChildren.length > 0) {
      if (!result.componentPropertyDefinitions) {
        result.componentPropertyDefinitions = {};
      }
      for (const sc of slotChildren) {
        const slotName = sc.slotName ?? sc.name;
        result.componentPropertyDefinitions[slotName] = {
          type: 'SLOT',
          defaultValue: '',
        };
      }
    }
  }

  // Instance compilation
  if (node.type === 'INSTANCE' && node.componentRef) {
    result.componentId = node.componentRef;
    if (node.propertyOverrides) {
      result.overriddenProperties = { ...node.propertyOverrides };
    }
    // Compile slot overrides
    if (node.slotOverrides) {
      const compiledOverrides: Record<string, FigmaNodeDict[]> = {};
      for (const slotName of Object.keys(node.slotOverrides)) {
        const overrideNodes = node.slotOverrides[slotName]!;
        compiledOverrides[slotName] = overrideNodes.map((child: DslNode, idx: number) =>
          compileNode(child, guid, idx, `${path} > [slot:${slotName}] > ${child.name}`, errors, false)
        );
      }
      result.slotOverrides = compiledOverrides;
    }
  }

  // LINE-specific properties
  if (node.type === 'LINE') {
    result.rotation = node.rotation;
    if (node.strokes?.length && node.strokes[0]!.strokeCap) {
      result.strokeCap = node.strokes[0]!.strokeCap;
    }
  }

  // SECTION-specific properties (skip auto-layout)
  if (node.type === 'SECTION') {
    result.sectionContentsHidden = node.contentsHidden;
    // Sections don't support auto-layout — clear any that may have been set
    result.stackMode = undefined;
  }

  // POLYGON-specific properties
  if (node.type === 'POLYGON') {
    result.pointCount = node.pointCount;
    result.rotation = node.rotation;
  }

  // STAR-specific properties
  if (node.type === 'STAR') {
    result.pointCount = node.pointCount;
    result.innerRadius = node.innerRadius ?? 0.382;
    result.rotation = node.rotation;
  }

  // BOOLEAN_OPERATION-specific properties
  if (node.type === 'BOOLEAN_OPERATION') {
    result.booleanOperation = node.booleanOperation;
  }

  // Compile children
  if (node.children) {
    const childInsideComponent = insideComponent || node.type === 'COMPONENT' || node.type === 'COMPONENT_SET';
    result.children = node.children.map((child, idx) =>
      compileNode(child, guid, idx, `${path} > ${child.name}`, errors, childInsideComponent, validationLevel)
    );
  }

  return result;
}

export function compile(node: DslNode, options?: CompilerOptions): CompileResult {
  resetGuidCounter();
  const errors: CompileError[] = [];
  const root = compileNode(node, undefined, 0, node.name, errors, false, options?.validationLevel);
  return {
    root,
    nodeCount: guidCounter,
    errors,
  };
}

export function compileWithLayout(node: DslNode, measurer: TextMeasurer, options?: CompilerOptions): CompileResult {
  const { sizes, offsets } = resolveLayout(node, measurer);
  resetGuidCounter();
  const errors: CompileError[] = [];
  const root = compileNodeWithLayout(node, undefined, 0, node.name, errors, sizes, offsets, [1, 0, 0, 0, 1, 0], options?.validationLevel);
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
  validationLevel?: CompilerValidationLevel,
): FigmaNodeDict {
  const result = compileNode(node, parentGuid, childIndex, path, errors, false, validationLevel);

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
        errors, sizes, offsets, currentTransform, validationLevel,
      )
    );
  }

  return result;
}

export function compileToJson(node: DslNode): string {
  const result = compile(node);
  return JSON.stringify(result, null, 2);
}
