import type { PluginNodeDef } from '@figma-dsl/core';
import type { CodegenContext, CodegenResultEntry, CodegenPreferences } from './codegen-types.js';
import { lookupColorToken, lookupSpacingToken, lookupRadiusToken, figmaColorToHex } from './token-map.js';

function toKebabCase(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function toCamelCase(name: string): string {
  const kebab = toKebabCase(name);
  return kebab.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function formatClassName(name: string, naming: 'camelCase' | 'kebab-case'): string {
  return naming === 'camelCase' ? toCamelCase(name) : toKebabCase(name);
}

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

export function generateCSS(context: CodegenContext): CodegenResultEntry[] {
  const node = context.node;
  const name = context.identity?.componentName ?? node.name;
  const className = formatClassName(name, context.preferences.naming);

  const sections: string[] = [];

  const rootCSS = generateNodeCSS(node, className, context.preferences);
  if (rootCSS) sections.push(rootCSS);

  // Generate CSS for direct children with named classes
  for (const child of node.children) {
    const childName = formatClassName(child.name, context.preferences.naming);
    const childCSS = generateNodeCSS(child, `${className}__${childName}`, context.preferences);
    if (childCSS) sections.push(childCSS);
  }

  const truncationComment = context.truncated
    ? '\n/* ... truncated (exceeded depth limit) */'
    : '';

  return [{
    title: `${name}.module.css`,
    language: 'CSS',
    code: sections.join('\n\n') + truncationComment,
  }];
}
