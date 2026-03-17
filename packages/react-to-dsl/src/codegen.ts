/**
 * DSL Code Generator.
 *
 * Takes a DslNode tree and generates valid `.dsl.ts` TypeScript source code
 * using the @figma-dsl/core builder API.
 *
 * Supports extracting repeated subtree patterns as within-file helper functions,
 * matching the idiomatic DSL pattern (e.g., featureRow(), divider() helpers).
 */

import type { DslNode, Fill, StrokePaint, AutoLayoutConfig, ComponentProperty } from '@figma-dsl/core';
import type { CodegenOptions } from './types.js';

/** Tracked imports — populated during code generation */
interface ImportTracker {
  nodes: Set<string>;     // frame, text, rectangle, etc.
  colors: Set<string>;    // solid, gradient, hex
  layout: Set<string>;    // horizontal, vertical
}

/** An extracted helper function with parameterized values */
interface ExtractedHelper {
  name: string;
  params: HelperParam[];
  templateNode: DslNode;
  /** Bindings for the template tree — which nodes have parameterized values */
  bindings: Map<DslNode, ParamBindings>;
  /** Map from call-site node → argument values */
  callSites: Map<DslNode, string[]>;
}

interface HelperParam {
  name: string;
  type: 'string' | 'number' | 'boolean';
}

type HelperCallMap = Map<DslNode, { helperName: string; args: string[]; params: HelperParam[] }>;

/** Per-node parameter bindings within a helper template */
interface ParamBindings {
  textContent?: string;  // param name to use for text content
  textColor?: string;    // param name to use for text color
  nodeName?: string;     // param name to use for node name
  fillColor?: string;    // param name to use for fill color
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

  // Extract repeated patterns as helper functions
  const helpers = extractHelpers(rootNode);
  // Build a lookup: node → { helperName, args }
  const helperCallMap = new Map<DslNode, { helperName: string; args: string[]; params: HelperParam[] }>();
  for (const helper of helpers) {
    for (const [callNode, args] of helper.callSites) {
      helperCallMap.set(callNode, { helperName: helper.name, args, params: helper.params });
    }
  }

  // Generate the node tree code
  const body = generateNode(rootNode, 0, indent, imports, helperCallMap);

  // Generate helper function code
  const helperCode = helpers.map(h => generateHelperFunction(h, indent, imports)).join('\n\n');

  // Build import statement
  const importLine = buildImports(imports);

  if (helperCode) {
    return `${importLine}\n\n${helperCode}\n\nexport default ${body};\n`;
  }

  return `${importLine}\n\nexport default ${body};\n`;
}

// --- Node Generation ---

function generateNode(
  node: DslNode,
  depth: number,
  indent: string,
  imports: ImportTracker,
  helperCallMap?: HelperCallMap,
): string {
  // Check if this node should be replaced with a helper call
  const helperCall = helperCallMap?.get(node);
  if (helperCall) {
    const i = indent.repeat(depth);
    const argsStr = helperCall.args.map((a, idx) => {
      const paramType = helperCall.params[idx]?.type;
      if (paramType === 'boolean') return a;
      if (paramType === 'number') return a;
      // String type — always quote
      return `'${escapeString(a)}'`;
    }).join(', ');
    return `${i}${helperCall.helperName}(${argsStr})`;
  }

  switch (node.type) {
    case 'TEXT':
      return generateTextNode(node, depth, indent, imports);
    case 'IMAGE':
      return generateImageNode(node, depth, indent, imports);
    case 'FRAME':
      return generateFrameNode(node, 'frame', depth, indent, imports, helperCallMap);
    case 'COMPONENT':
      return generateFrameNode(node, 'component', depth, indent, imports, helperCallMap);
    case 'RECTANGLE':
      return generateRectangleNode(node, depth, indent, imports);
    case 'ELLIPSE':
      return generateEllipseNode(node, depth, indent, imports);
    default:
      return generateFrameNode(node, 'frame', depth, indent, imports, helperCallMap);
  }
}

function generateTextNode(
  node: DslNode,
  depth: number,
  indent: string,
  imports: ImportTracker,
  bindings?: ParamBindings,
): string {
  imports.nodes.add('text');
  const i = indent.repeat(depth);

  const contentExpr = bindings?.textContent
    ? bindings.textContent
    : `'${escapeString(node.characters ?? node.name)}'`;

  const opts: string[] = [];
  const ts = node.textStyle;
  if (ts) {
    if (ts.fontSize && ts.fontSize !== 16) opts.push(`fontSize: ${ts.fontSize}`);
    if (ts.fontWeight && ts.fontWeight !== 400) opts.push(`fontWeight: ${ts.fontWeight}`);
    if (ts.color) {
      if (bindings?.textColor) {
        opts.push(`color: ${bindings.textColor}`);
      } else {
        opts.push(`color: '${ts.color}'`);
      }
    }
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
    return `${i}text(${contentExpr})`;
  }

  if (opts.length <= 3) {
    return `${i}text(${contentExpr}, { ${opts.join(', ')} })`;
  }

  const optsStr = opts.map(o => `${i}${indent}${o},`).join('\n');
  return `${i}text(${contentExpr}, {\n${optsStr}\n${i}})`;
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
  helperCallMap?: HelperCallMap,
  bindings?: ParamBindings,
  helperBindings?: Map<DslNode, ParamBindings>,
): string {
  imports.nodes.add(fnName);
  const i = indent.repeat(depth);
  const i1 = indent.repeat(depth + 1);

  const nameExpr = bindings?.nodeName
    ? bindings.nodeName
    : `'${escapeString(node.name)}'`;

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
    if (bindings?.fillColor) {
      imports.colors.add('solid');
      props.push(`${i1}fills: [solid(${bindings.fillColor})],`);
    } else {
      const fillStr = generateFills(node.fills, imports);
      props.push(`${i1}fills: [${fillStr}],`);
    }
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
      .map((child: DslNode) => {
        // If we're inside a helper body, use bindings-aware generation
        if (helperBindings) {
          return generateBoundNode(child, depth + 2, indent, imports, helperBindings);
        }
        return generateNode(child, depth + 2, indent, imports, helperCallMap);
      })
      .join(',\n');
    props.push(`${i1}children: [\n${childrenStr},\n${i1}],`);
  }

  if (props.length === 0) {
    return `${i}${fnName}(${nameExpr}, {})`;
  }

  return `${i}${fnName}(${nameExpr}, {\n${props.join('\n')}\n${i}})`;
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

/**
 * Generate a node within a helper function body, using bindings for parameterized values.
 */
function generateBoundNode(
  node: DslNode,
  depth: number,
  indent: string,
  imports: ImportTracker,
  allBindings: Map<DslNode, ParamBindings>,
): string {
  const bindings = allBindings.get(node);

  if (node.type === 'TEXT') {
    return generateTextNode(node, depth, indent, imports, bindings);
  }

  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    const fnName = node.type === 'COMPONENT' ? 'component' : 'frame';
    return generateFrameNode(node, fnName, depth, indent, imports, undefined, bindings, allBindings);
  }

  // Other node types: standard generation
  return generateNode(node, depth, indent, imports);
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

// --- Helper Extraction ---

/**
 * Compute a structural fingerprint of a DslNode subtree.
 * Captures type, structure, and property keys — ignores specific values
 * (text content, colors) so structurally identical nodes match.
 */
function fingerprint(node: DslNode): string {
  const parts: string[] = [node.type];

  if (node.autoLayout) parts.push(`al:${node.autoLayout.direction}`);
  if (node.fills?.length) parts.push(`f:${node.fills.length}`);
  if (node.strokes?.length) parts.push(`s:${node.strokes.length}`);
  if (node.cornerRadius !== undefined) parts.push('cr');
  if (node.cornerRadii) parts.push('cri');
  if (node.clipContent) parts.push('clip');
  if (node.layoutSizingHorizontal) parts.push(`lsh:${node.layoutSizingHorizontal}`);
  if (node.layoutSizingVertical) parts.push(`lsv:${node.layoutSizingVertical}`);
  if (node.layoutGrow !== undefined && node.layoutGrow > 0) parts.push('lg');
  if (node.opacity !== undefined && node.opacity !== 1) parts.push('op');

  if (node.type === 'TEXT') {
    const ts = node.textStyle;
    if (ts) {
      if (ts.fontSize) parts.push(`fs:${ts.fontSize}`);
      if (ts.fontWeight) parts.push(`fw:${ts.fontWeight}`);
      if (ts.textAlignHorizontal) parts.push(`ta:${ts.textAlignHorizontal}`);
      if (ts.textDecoration && ts.textDecoration !== 'NONE') parts.push(`td:${ts.textDecoration}`);
    }
  }

  if (node.children?.length) {
    const childFps = node.children.map(c => fingerprint(c));
    parts.push(`ch:[${childFps.join(',')}]`);
  }

  return parts.join('|');
}

/**
 * Collect varying leaf values between structurally identical nodes.
 * Builds both parameter definitions and per-node bindings.
 */
function collectVaryingValues(
  nodes: DslNode[],
): {
  params: HelperParam[];
  argsByNode: Map<DslNode, string[]>;
  bindingsByTemplate: Map<DslNode, ParamBindings>;
} | null {
  if (nodes.length < 2) return null;

  const params: HelperParam[] = [];
  const argsByNode = new Map<DslNode, string[]>();
  const bindingsByTemplate = new Map<DslNode, ParamBindings>();

  for (const n of nodes) argsByNode.set(n, []);

  function addParam(
    name: string,
    type: 'string' | 'number' | 'boolean',
    templateNode: DslNode,
    bindingKey: keyof ParamBindings,
    values: string[],
  ) {
    // Deduplicate param name
    let pName = name;
    let suffix = 2;
    while (params.some(p => p.name === pName)) {
      pName = `${name}${suffix++}`;
    }
    params.push({ name: pName, type });

    // Set binding on template
    const existing = bindingsByTemplate.get(templateNode) ?? {};
    (existing as Record<string, string>)[bindingKey] = pName;
    bindingsByTemplate.set(templateNode, existing);

    // Add arg values
    for (let i = 0; i < nodes.length; i++) {
      argsByNode.get(nodes[i]!)!.push(values[i]!);
    }
  }

  function compareNodes(templateNodes: DslNode[], allNodes: DslNode[][]) {
    for (let ti = 0; ti < templateNodes.length; ti++) {
      const template = templateNodes[ti]!;
      const siblings = allNodes.map(group => group[ti]!);

      if (template.type === 'TEXT') {
        // Compare text content
        const texts = siblings.map(n => n.characters ?? n.name);
        if (new Set(texts).size > 1) {
          addParam('label', 'string', template, 'textContent', texts);
        }

        // Compare text colors
        const colors = siblings.map(n => n.textStyle?.color ?? '');
        if (colors.length > 0 && colors[0] && new Set(colors).size > 1) {
          addParam('color', 'string', template, 'textColor', colors);
        }
      }

      if (template.type === 'FRAME' || template.type === 'COMPONENT') {
        // Compare node names
        const names = siblings.map(n => n.name);
        if (new Set(names).size > 1) {
          addParam('name', 'string', template, 'nodeName', names);
        }

        // Compare solid fill colors
        if (template.fills?.length === 1 && template.fills[0]!.type === 'SOLID') {
          const fillHexes = siblings.map(n => {
            const fill = n.fills?.[0];
            if (fill?.type === 'SOLID') return rgbaToHex(fill.color);
            return '';
          });
          if (new Set(fillHexes).size > 1) {
            addParam('bgColor', 'string', template, 'fillColor', fillHexes);
          }
        }
      }

      // Recurse into children
      if (template.children?.length) {
        const childGroups = siblings.map(n => n.children ?? []);
        const allSameLength = childGroups.every(cg => cg.length === template.children!.length);
        if (allSameLength) {
          compareNodes(template.children, childGroups);
        }
      }
    }
  }

  // Start comparison: treat each top-level node as a group of 1
  const nodeGroups = nodes.map(n => [n]);
  compareNodes([nodes[0]!], nodeGroups);

  if (params.length === 0 || params.length > 5) return null;
  return { params, argsByNode, bindingsByTemplate };
}

/**
 * Derive a helper function name from a group of nodes.
 */
function deriveHelperName(nodes: DslNode[], existingNames: Set<string>): string {
  const firstName = nodes[0]!.name;
  let base = firstName
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');

  const reserved = new Set([
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
    'delete', 'do', 'else', 'export', 'extends', 'false', 'finally', 'for',
    'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'null',
    'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof',
    'var', 'void', 'while', 'with', 'yield', 'enum', 'await', 'static',
  ]);
  if (!base || /^\d/.test(base) || reserved.has(base)) base = 'helper';

  let name = base;
  let suffix = 2;
  while (existingNames.has(name)) {
    name = `${base}${suffix++}`;
  }
  existingNames.add(name);
  return name;
}

/**
 * Walk the DslNode tree and extract repeated sibling patterns as helpers.
 */
function extractHelpers(root: DslNode): ExtractedHelper[] {
  const helpers: ExtractedHelper[] = [];
  const usedNames = new Set<string>();
  const extractedNodes = new Set<DslNode>();

  function walkForPatterns(node: DslNode) {
    if (!node.children || node.children.length < 2) return;

    // Group children by fingerprint — only consider container nodes (not leaf text/rect/ellipse)
    const groups = new Map<string, DslNode[]>();
    for (const child of node.children) {
      if (extractedNodes.has(child)) continue;
      // Skip leaf nodes — they're too simple for helper extraction
      if (!child.children || child.children.length === 0) continue;
      const fp = fingerprint(child);
      if (!groups.has(fp)) groups.set(fp, []);
      groups.get(fp)!.push(child);
    }

    for (const [, group] of groups) {
      if (group.length < 2) continue;

      const result = collectVaryingValues(group);
      if (!result) continue;

      const name = deriveHelperName(group, usedNames);
      const callSites = new Map<DslNode, string[]>();
      for (const n of group) {
        callSites.set(n, result.argsByNode.get(n) ?? []);
        extractedNodes.add(n);
      }

      helpers.push({
        name,
        params: result.params,
        templateNode: group[0]!,
        bindings: result.bindingsByTemplate,
        callSites,
      });
    }

    // Continue walking into non-extracted children
    for (const child of node.children) {
      if (!extractedNodes.has(child)) {
        walkForPatterns(child);
      }
    }
  }

  walkForPatterns(root);
  return helpers;
}

/**
 * Generate the source code for a helper function.
 */
function generateHelperFunction(
  helper: ExtractedHelper,
  indent: string,
  imports: ImportTracker,
): string {
  const { name, params, templateNode, bindings } = helper;

  const paramStr = params.map(p => `${p.name}: ${p.type}`).join(', ');
  const body = generateBoundNode(templateNode, 1, indent, imports, bindings);

  return `function ${name}(${paramStr}) {\n${indent}return ${body.trimStart()};\n}`;
}
