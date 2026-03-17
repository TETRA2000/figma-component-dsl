/**
 * DSL Code Generator.
 *
 * Takes a DslNode tree and generates valid `.dsl.ts` TypeScript source code
 * using the @figma-dsl/core builder API.
 */

import type { DslNode, Fill, StrokePaint, AutoLayoutConfig, ComponentProperty } from '@figma-dsl/core';
import type { CodegenOptions } from './types.js';

/** Tracked imports — populated during code generation */
interface ImportTracker {
  nodes: Set<string>;     // frame, text, rectangle, etc.
  colors: Set<string>;    // solid, gradient, hex
  layout: Set<string>;    // horizontal, vertical
}

/**
 * Generate DSL source code from a DslNode tree.
 */
export function generateDslCode(node: DslNode, options: CodegenOptions = {}): string {
  const indent = options.indent ?? '  ';
  const asComponent = options.asComponent ?? false;

  // Track which imports are needed
  const imports: ImportTracker = {
    nodes: new Set(),
    colors: new Set(),
    layout: new Set(),
  };

  // Override root type if asComponent
  const rootNode = asComponent
    ? { ...node, type: 'COMPONENT' as const }
    : node;

  // Generate the node tree code
  const body = generateNode(rootNode, 0, indent, imports);

  // Build import statement
  const importLine = buildImports(imports);

  return `${importLine}\n\nexport default ${body};\n`;
}

// --- Node Generation ---

function generateNode(
  node: DslNode,
  depth: number,
  indent: string,
  imports: ImportTracker,
): string {
  switch (node.type) {
    case 'TEXT':
      return generateTextNode(node, depth, indent, imports);
    case 'IMAGE':
      return generateImageNode(node, depth, indent, imports);
    case 'FRAME':
      return generateFrameNode(node, 'frame', depth, indent, imports);
    case 'COMPONENT':
      return generateFrameNode(node, 'component', depth, indent, imports);
    case 'RECTANGLE':
      return generateRectangleNode(node, depth, indent, imports);
    case 'ELLIPSE':
      return generateEllipseNode(node, depth, indent, imports);
    default:
      // Fallback: treat as frame
      return generateFrameNode(node, 'frame', depth, indent, imports);
  }
}

function generateTextNode(
  node: DslNode,
  depth: number,
  indent: string,
  imports: ImportTracker,
): string {
  imports.nodes.add('text');
  const i = indent.repeat(depth);
  const content = escapeString(node.characters ?? node.name);

  // Build style options
  const opts: string[] = [];
  const ts = node.textStyle;
  if (ts) {
    if (ts.fontSize && ts.fontSize !== 16) opts.push(`fontSize: ${ts.fontSize}`);
    if (ts.fontWeight && ts.fontWeight !== 400) opts.push(`fontWeight: ${ts.fontWeight}`);
    if (ts.color) opts.push(`color: '${ts.color}'`);
    if (ts.textAlignHorizontal) opts.push(`textAlignHorizontal: '${ts.textAlignHorizontal}'`);
    if (ts.lineHeight) {
      opts.push(`lineHeight: { value: ${ts.lineHeight.value}, unit: '${ts.lineHeight.unit}' }`);
    }
    if (ts.letterSpacing) {
      opts.push(`letterSpacing: { value: ${ts.letterSpacing.value}, unit: '${ts.letterSpacing.unit}' }`);
    }
    if (ts.textDecoration && ts.textDecoration !== 'NONE') {
      opts.push(`textDecoration: '${ts.textDecoration}'`);
    }
  }

  if (node.textAutoResize) {
    opts.push(`textAutoResize: '${node.textAutoResize}'`);
  }
  if (node.size && node.size.x > 0) {
    opts.push(`size: { x: ${node.size.x} }`);
  }
  if (node.layoutSizingHorizontal) {
    opts.push(`layoutSizingHorizontal: '${node.layoutSizingHorizontal}'`);
  }
  if (node.layoutSizingVertical) {
    opts.push(`layoutSizingVertical: '${node.layoutSizingVertical}'`);
  }

  if (opts.length === 0) {
    return `${i}text('${content}')`;
  }

  if (opts.length <= 3) {
    return `${i}text('${content}', { ${opts.join(', ')} })`;
  }

  const optsStr = opts.map(o => `${i}${indent}${o},`).join('\n');
  return `${i}text('${content}', {\n${optsStr}\n${i}})`;
}

function generateImageNode(
  node: DslNode,
  depth: number,
  indent: string,
  imports: ImportTracker,
): string {
  imports.nodes.add('image');
  const i = indent.repeat(depth);
  const name = escapeString(node.name);
  const src = node.imageSrc ?? '';
  const w = node.size?.x ?? 100;
  const h = node.size?.y ?? 100;

  return `${i}image('${name}', { src: '${src}', size: { x: ${w}, y: ${h} } })`;
}

function generateFrameNode(
  node: DslNode,
  fnName: 'frame' | 'component',
  depth: number,
  indent: string,
  imports: ImportTracker,
): string {
  imports.nodes.add(fnName);
  const i = indent.repeat(depth);
  const i1 = indent.repeat(depth + 1);
  const name = escapeString(node.name);

  const props: string[] = [];

  // Size
  if (node.size) {
    const yStr = node.size.y === 0 ? 'undefined' : String(node.size.y);
    props.push(`${i1}size: { x: ${node.size.x}, y: ${yStr} },`);
  }

  // Auto-layout
  if (node.autoLayout) {
    const alStr = generateAutoLayout(node.autoLayout, imports);
    props.push(`${i1}autoLayout: ${alStr},`);
  }

  // Fills
  if (node.fills && node.fills.length > 0) {
    const fillStr = generateFills(node.fills, imports);
    props.push(`${i1}fills: [${fillStr}],`);
  }

  // Strokes
  if (node.strokes && node.strokes.length > 0) {
    const strokeStr = generateStrokes(node.strokes, imports);
    props.push(`${i1}strokes: [${strokeStr}],`);
  }

  // Corner radius
  if (node.cornerRadius !== undefined) {
    props.push(`${i1}cornerRadius: ${node.cornerRadius},`);
  }
  if (node.cornerRadii) {
    const { topLeft, topRight, bottomLeft, bottomRight } = node.cornerRadii;
    props.push(`${i1}cornerRadii: { topLeft: ${topLeft}, topRight: ${topRight}, bottomLeft: ${bottomLeft}, bottomRight: ${bottomRight} },`);
  }

  // Opacity
  if (node.opacity !== undefined && node.opacity !== 1) {
    props.push(`${i1}opacity: ${node.opacity},`);
  }

  // Clip content
  if (node.clipContent) {
    props.push(`${i1}clipContent: true,`);
  }

  // Layout sizing
  if (node.layoutSizingHorizontal) {
    props.push(`${i1}layoutSizingHorizontal: '${node.layoutSizingHorizontal}',`);
  }
  if (node.layoutSizingVertical) {
    props.push(`${i1}layoutSizingVertical: '${node.layoutSizingVertical}',`);
  }
  if (node.layoutGrow !== undefined && node.layoutGrow > 0) {
    props.push(`${i1}layoutGrow: ${node.layoutGrow},`);
  }

  // Component properties
  if (node.componentProperties && node.componentProperties.length > 0) {
    const cpStr = node.componentProperties.map((cp: ComponentProperty) => {
      const dv = typeof cp.defaultValue === 'string' ? `'${escapeString(cp.defaultValue)}'` : String(cp.defaultValue);
      return `{ name: '${escapeString(cp.name)}', type: '${cp.type}', defaultValue: ${dv} }`;
    }).join(', ');
    props.push(`${i1}componentProperties: [${cpStr}],`);
  }

  // Children
  if (node.children && node.children.length > 0) {
    const childrenStr = node.children
      .map((child: DslNode) => generateNode(child, depth + 2, indent, imports))
      .join(',\n');
    props.push(`${i1}children: [\n${childrenStr},\n${i1}],`);
  }

  if (props.length === 0) {
    return `${i}${fnName}('${name}', {})`;
  }

  return `${i}${fnName}('${name}', {\n${props.join('\n')}\n${i}})`;
}

function generateRectangleNode(
  node: DslNode,
  depth: number,
  indent: string,
  imports: ImportTracker,
): string {
  imports.nodes.add('rectangle');
  const i = indent.repeat(depth);
  const name = escapeString(node.name);
  const opts: string[] = [];

  if (node.size) opts.push(`size: { x: ${node.size.x}, y: ${node.size.y} }`);
  if (node.fills && node.fills.length > 0) {
    const fillStr = generateFills(node.fills, imports);
    opts.push(`fills: [${fillStr}]`);
  }
  if (node.cornerRadius) opts.push(`cornerRadius: ${node.cornerRadius}`);

  return `${i}rectangle('${name}', { ${opts.join(', ')} })`;
}

function generateEllipseNode(
  node: DslNode,
  depth: number,
  indent: string,
  imports: ImportTracker,
): string {
  imports.nodes.add('ellipse');
  const i = indent.repeat(depth);
  const name = escapeString(node.name);
  const opts: string[] = [];

  if (node.size) opts.push(`size: { x: ${node.size.x}, y: ${node.size.y} }`);
  if (node.fills && node.fills.length > 0) {
    const fillStr = generateFills(node.fills, imports);
    opts.push(`fills: [${fillStr}]`);
  }

  return `${i}ellipse('${name}', { ${opts.join(', ')} })`;
}

// --- Auto-Layout ---

function generateAutoLayout(config: AutoLayoutConfig, imports: ImportTracker): string {
  const fnName = config.direction === 'HORIZONTAL' ? 'horizontal' : 'vertical';
  imports.layout.add(fnName);

  const opts: string[] = [];

  if (config.spacing !== undefined && config.spacing > 0) {
    opts.push(`spacing: ${config.spacing}`);
  }
  if (config.padX !== undefined && config.padX > 0) opts.push(`padX: ${config.padX}`);
  if (config.padY !== undefined && config.padY > 0) opts.push(`padY: ${config.padY}`);
  if (config.padTop !== undefined && config.padTop > 0) opts.push(`padTop: ${config.padTop}`);
  if (config.padRight !== undefined && config.padRight > 0) opts.push(`padRight: ${config.padRight}`);
  if (config.padBottom !== undefined && config.padBottom > 0) opts.push(`padBottom: ${config.padBottom}`);
  if (config.padLeft !== undefined && config.padLeft > 0) opts.push(`padLeft: ${config.padLeft}`);
  if (config.align && config.align !== 'MIN') opts.push(`align: '${config.align}'`);
  if (config.counterAlign && config.counterAlign !== 'MIN') opts.push(`counterAlign: '${config.counterAlign}'`);
  if (config.widthSizing) opts.push(`widthSizing: '${config.widthSizing}'`);
  if (config.heightSizing) opts.push(`heightSizing: '${config.heightSizing}'`);

  if (opts.length === 0) return `${fnName}({})`;
  return `${fnName}({ ${opts.join(', ')} })`;
}

// --- Fills ---

function generateFills(fills: Fill[], imports: ImportTracker): string {
  return fills.map(fill => {
    if (fill.type === 'SOLID') {
      imports.colors.add('solid');
      const hex = rgbaToHex(fill.color);
      if (fill.opacity !== 1) {
        return `solid('${hex}', ${fill.opacity})`;
      }
      return `solid('${hex}')`;
    }

    if (fill.type === 'GRADIENT_LINEAR') {
      imports.colors.add('gradient');
      const stops = fill.gradientStops.map(s => {
        const hex = rgbaToHex(s.color);
        return `{ hex: '${hex}', position: ${s.position} }`;
      }).join(', ');

      // Extract angle from transform
      const angle = extractAngleFromTransform(fill.gradientTransform);
      return `gradient([${stops}], ${angle})`;
    }

    // Fallback for other fill types
    return `solid('#000000')`;
  }).join(', ');
}

// --- Strokes ---

function generateStrokes(strokes: StrokePaint[], _imports: ImportTracker): string {
  return strokes.map(stroke => {
    const c = stroke.color;
    const align = stroke.align ? `, align: '${stroke.align}' as const` : '';
    return `{ color: { r: ${round(c.r)}, g: ${round(c.g)}, b: ${round(c.b)}, a: ${round(c.a)} }, weight: ${stroke.weight}${align} }`;
  }).join(', ');
}

// --- Import Builder ---

function buildImports(tracker: ImportTracker): string {
  const parts: string[] = [];

  if (tracker.nodes.size > 0) {
    parts.push(Array.from(tracker.nodes).sort().join(', '));
  }
  if (tracker.colors.size > 0) {
    parts.push(Array.from(tracker.colors).sort().join(', '));
  }
  if (tracker.layout.size > 0) {
    parts.push(Array.from(tracker.layout).sort().join(', '));
  }

  const allImports = parts.join(',\n  ');

  return `import {\n  ${allImports},\n} from '@figma-dsl/core';`;
}

// --- Utility Functions ---

function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

function rgbaToHex(rgba: { r: number; g: number; b: number; a: number }): string {
  const r = Math.round(rgba.r * 255);
  const g = Math.round(rgba.g * 255);
  const b = Math.round(rgba.b * 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function extractAngleFromTransform(
  transform: [[number, number, number], [number, number, number]],
): number {
  const cos = transform[0][0];
  const sin = transform[0][1];
  const angle = Math.round(Math.atan2(sin, cos) * (180 / Math.PI));
  return ((angle % 360) + 360) % 360;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
