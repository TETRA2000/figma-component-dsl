import type { PluginNodeDef } from '@figma-dsl/core';
import type { CodegenContext, CodegenResultEntry } from './codegen-types.js';
import { figmaColorToHex } from './token-map.js';

const TYPE_TO_FUNCTION: Record<string, string> = {
  FRAME: 'frame',
  TEXT: 'text',
  RECTANGLE: 'rectangle',
  ELLIPSE: 'ellipse',
  COMPONENT: 'component',
  COMPONENT_SET: 'componentSet',
  INSTANCE: 'instance',
  LINE: 'line',
  POLYGON: 'polygon',
  STAR: 'star',
  SECTION: 'section',
  GROUP: 'frame', // Groups map to frame as closest equivalent
};

function formatFill(fill: NonNullable<PluginNodeDef['fills']>[0]): string | null {
  if (fill.type === 'SOLID' && fill.color) {
    const hex = figmaColorToHex(fill.color.r, fill.color.g, fill.color.b);
    return `solid('${hex}')`;
  }
  if (fill.type === 'GRADIENT_LINEAR' && fill.gradientStops?.length) {
    const stops = fill.gradientStops.map(s => {
      const hex = figmaColorToHex(s.color.r, s.color.g, s.color.b);
      return `{ color: '${hex}', position: ${s.position} }`;
    });
    return `gradient([${stops.join(', ')}])`;
  }
  return null;
}

function formatLayout(node: PluginNodeDef): string | null {
  if (!node.stackMode) return null;
  const fn = node.stackMode === 'HORIZONTAL' ? 'horizontal' : 'vertical';
  const params: string[] = [];

  if (node.itemSpacing !== undefined && node.itemSpacing > 0) {
    params.push(`spacing: ${node.itemSpacing}`);
  }

  const pt = node.paddingTop ?? 0;
  const pr = node.paddingRight ?? 0;
  const pb = node.paddingBottom ?? 0;
  const pl = node.paddingLeft ?? 0;
  if (pt || pr || pb || pl) {
    if (pt === pr && pr === pb && pb === pl) {
      params.push(`padding: ${pt}`);
    } else {
      params.push(`padding: [${pt}, ${pr}, ${pb}, ${pl}]`);
    }
  }

  if (node.primaryAxisAlignItems && node.primaryAxisAlignItems !== 'MIN') {
    params.push(`align: '${node.primaryAxisAlignItems}'`);
  }

  return params.length > 0
    ? `${fn}({ ${params.join(', ')} })`
    : `${fn}()`;
}

function nodeToDsl(node: PluginNodeDef, indent: number, usedFunctions: Set<string>): string {
  const pad = '  '.repeat(indent);
  const fn = TYPE_TO_FUNCTION[node.type] ?? 'frame';
  usedFunctions.add(fn);

  const args: string[] = [`'${node.name}'`];
  const options: string[] = [];

  // Size
  if (node.size) {
    options.push(`size: { x: ${node.size.x}, y: ${node.size.y} }`);
  }

  // Fills
  if (node.fills?.length) {
    const fillStrs = node.fills.map(formatFill).filter(Boolean);
    if (fillStrs.length === 1) {
      options.push(`fills: [${fillStrs[0]}]`);
      usedFunctions.add('solid');
    } else if (fillStrs.length > 1) {
      options.push(`fills: [${fillStrs.join(', ')}]`);
      usedFunctions.add('solid');
    }
  }

  // Corner radius
  if (node.cornerRadius !== undefined && node.cornerRadius > 0) {
    options.push(`cornerRadius: ${node.cornerRadius}`);
  }

  // Layout
  const layout = formatLayout(node);
  if (layout) {
    options.push(`layout: ${layout}`);
    usedFunctions.add(node.stackMode === 'HORIZONTAL' ? 'horizontal' : 'vertical');
  }

  // Text
  if (node.type === 'TEXT' && node.characters) {
    // text() uses the characters as the second argument
    args.length = 0;
    args.push(`'${node.characters}'`);

    if (node.fontSize) options.push(`fontSize: ${node.fontSize}`);
    if (node.fontWeight) options.push(`fontWeight: ${node.fontWeight}`);
  }

  // Children
  if (node.children.length > 0) {
    const childrenDsl = node.children.map(c => nodeToDsl(c, indent + 1, usedFunctions));
    options.push(`children: [\n${childrenDsl.join(',\n')}\n${pad}  ]`);
  }

  if (options.length > 0) {
    args.push(`{\n${pad}  ${options.join(`,\n${pad}  `)}\n${pad}}`);
  }

  return `${pad}${fn}(${args.join(', ')})`;
}

export function generateDSL(context: CodegenContext): CodegenResultEntry[] {
  // Prefer baseline data if available
  const node = context.baseline ?? context.node;
  const usedFunctions = new Set<string>();

  const body = nodeToDsl(node, 0, usedFunctions);

  // Build import statement
  const imports = Array.from(usedFunctions).sort();
  const importLine = `import { ${imports.join(', ')} } from '@figma-dsl/core';`;

  const truncationComment = context.truncated
    ? '\n// ... truncated (exceeded depth limit)'
    : '';

  const code = `${importLine}\n\nexport default ${body};${truncationComment}`;

  return [{
    title: `${context.identity?.componentName ?? node.name}.dsl.ts`,
    language: 'TYPESCRIPT',
    code,
  }];
}
