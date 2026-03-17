import type { PluginNodeDef } from '@figma-dsl/core';
import type { CodegenContext, CodegenResultEntry, CodegenPreferences, CanvasRegionInfo } from './codegen-types.js';
import { lookupColorToken, lookupSpacingToken, lookupRadiusToken, figmaColorToHex } from './token-map.js';
import { pngToDataUri } from './codegen.js';

// --- Naming helpers ---

function toKebabCase(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function toCamelCase(name: string): string {
  const kebab = toKebabCase(name);
  return kebab.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function formatClassName(name: string, naming: 'camelCase' | 'kebab-case'): string {
  return naming === 'camelCase' ? toCamelCase(name) : toKebabCase(name);
}

// --- Size formatting ---

function formatSize(px: number, prefs: CodegenPreferences): string {
  if (prefs.unit === 'rem') {
    return `${(px / prefs.scaleFactor).toFixed(px % prefs.scaleFactor === 0 ? 0 : 4).replace(/\.?0+$/, '')}rem`;
  }
  return `${px}px`;
}

function formatSpacing(px: number, prefs: CodegenPreferences): string {
  const token = lookupSpacingToken(px);
  if (token) return token;
  return formatSize(px, prefs);
}

function formatRadius(px: number, prefs: CodegenPreferences): string {
  const token = lookupRadiusToken(px);
  if (token) return token;
  return formatSize(px, prefs);
}

function mapAlignment(value: string): string {
  switch (value) {
    case 'MIN': return 'flex-start';
    case 'CENTER': return 'center';
    case 'MAX': return 'flex-end';
    case 'SPACE_BETWEEN': return 'space-between';
    default: return value.toLowerCase();
  }
}

// --- CSS generation ---

function generateNodeCSS(node: PluginNodeDef, className: string, prefs: CodegenPreferences): string {
  const props: string[] = [];

  // Dimensions
  if (node.size) {
    if (node.layoutSizingHorizontal !== 'FILL') {
      props.push(`  width: ${formatSize(node.size.x, prefs)};`);
    }
    if (node.layoutSizingVertical !== 'FILL') {
      props.push(`  height: ${formatSize(node.size.y, prefs)};`);
    }
  }

  // Auto-layout → flexbox
  if (node.stackMode) {
    props.push(`  display: flex;`);
    props.push(`  flex-direction: ${node.stackMode === 'HORIZONTAL' ? 'row' : 'column'};`);
    if (node.itemSpacing !== undefined && node.itemSpacing > 0) {
      props.push(`  gap: ${formatSpacing(node.itemSpacing, prefs)};`);
    }
    if (node.primaryAxisAlignItems) {
      props.push(`  justify-content: ${mapAlignment(node.primaryAxisAlignItems)};`);
    }
    if (node.counterAxisAlignItems) {
      props.push(`  align-items: ${mapAlignment(node.counterAxisAlignItems)};`);
    }
  }

  // Padding
  const pt = node.paddingTop ?? 0;
  const pr = node.paddingRight ?? 0;
  const pb = node.paddingBottom ?? 0;
  const pl = node.paddingLeft ?? 0;
  if (pt || pr || pb || pl) {
    if (pt === pr && pr === pb && pb === pl) {
      props.push(`  padding: ${formatSpacing(pt, prefs)};`);
    } else {
      props.push(`  padding: ${formatSpacing(pt, prefs)} ${formatSpacing(pr, prefs)} ${formatSpacing(pb, prefs)} ${formatSpacing(pl, prefs)};`);
    }
  }

  // Fills → background
  if (node.fills?.length) {
    const fill = node.fills[0]!;
    if (fill.type === 'SOLID' && fill.color) {
      const hex = figmaColorToHex(fill.color.r, fill.color.g, fill.color.b);
      const token = lookupColorToken(hex);
      props.push(`  background-color: ${token ?? hex};`);
    }
  }

  // Strokes → border
  if (node.strokes?.length) {
    const stroke = node.strokes[0]!;
    const hex = figmaColorToHex(stroke.color.r, stroke.color.g, stroke.color.b);
    const token = lookupColorToken(hex);
    props.push(`  border: ${stroke.weight}px solid ${token ?? hex};`);
  }

  // Corner radius
  if (node.cornerRadius !== undefined && node.cornerRadius > 0) {
    props.push(`  border-radius: ${formatRadius(node.cornerRadius, prefs)};`);
  }

  // Opacity
  if (node.opacity !== undefined && node.opacity < 1) {
    props.push(`  opacity: ${node.opacity};`);
  }

  // Text properties
  if (node.fontSize) {
    props.push(`  font-size: ${formatSize(node.fontSize, prefs)};`);
  }
  if (node.fontFamily) {
    props.push(`  font-family: '${node.fontFamily}', sans-serif;`);
  }
  if (node.fontWeight) {
    props.push(`  font-weight: ${node.fontWeight};`);
  }
  if (node.textAlignHorizontal) {
    const align = node.textAlignHorizontal.toLowerCase();
    if (align !== 'left') {
      props.push(`  text-align: ${align};`);
    }
  }

  if (props.length === 0) return '';
  return `.${className} {\n${props.join('\n')}\n}`;
}

// --- HTML generation ---

function isCanvasChild(
  childName: string,
  canvasRegions: readonly CanvasRegionInfo[],
): CanvasRegionInfo | undefined {
  return canvasRegions.find(r => r.canvasName === childName);
}

function nodeToHTML(
  node: PluginNodeDef,
  className: string,
  context: CodegenContext,
  indent: number,
): string {
  const pad = '  '.repeat(indent);

  // Text node → span
  if (node.type === 'TEXT') {
    return `${pad}<span class="${className}">${node.characters ?? ''}</span>`;
  }

  // Check if this child is a canvas region
  const canvasInfo = isCanvasChild(node.name, context.canvasRegions);
  if (canvasInfo) {
    const image = context.canvasImages?.get(canvasInfo.canvasName);
    if (image) {
      const dataUri = pngToDataUri(image.pngBytes);
      return `${pad}<img class="${className}" src="${dataUri}" width="${image.width}" height="${image.height}" alt="${canvasInfo.canvasName}" />`;
    }
    // Placeholder for failed capture
    return `${pad}<div class="${className} canvas-placeholder">[Canvas: ${canvasInfo.canvasName}]</div>`;
  }

  // Regular node → div
  if (node.children.length === 0) {
    return `${pad}<div class="${className}"></div>`;
  }

  const rootClass = formatClassName(node.name, context.preferences.naming);
  const childHTML = node.children.map((child) => {
    const childClass = `${rootClass}__${formatClassName(child.name, context.preferences.naming)}`;
    return nodeToHTML(child, childClass, context, indent + 1);
  }).join('\n');

  return `${pad}<div class="${className}">\n${childHTML}\n${pad}</div>`;
}

export function generateHTML(context: CodegenContext): CodegenResultEntry[] {
  const node = context.node;
  const name = context.identity?.componentName ?? node.name;
  const rootClass = formatClassName(name, context.preferences.naming);

  // Generate CSS
  const cssSections: string[] = [];
  const rootCSS = generateNodeCSS(node, rootClass, context.preferences);
  if (rootCSS) cssSections.push(rootCSS);

  for (const child of node.children) {
    const childClass = `${rootClass}__${formatClassName(child.name, context.preferences.naming)}`;
    const childCSS = generateNodeCSS(child, childClass, context.preferences);
    if (childCSS) cssSections.push(childCSS);
  }

  // Generate HTML structure
  const html = nodeToHTML(node, rootClass, context, 0);

  // Assemble
  let code = `<style>\n${cssSections.join('\n\n')}\n</style>\n\n${html}`;

  // Canvas omission comment
  if (context.canvasRegions.length > 3) {
    code += `\n<!-- additional canvas regions omitted (${context.canvasRegions.length - 3} more) -->`;
  }

  // Truncation comment
  if (context.truncated) {
    code += '\n<!-- ... truncated (exceeded depth limit) -->';
  }

  return [{
    title: 'HTML Preview',
    language: 'HTML',
    code,
  }];
}
