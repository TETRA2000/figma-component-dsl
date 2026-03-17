import type { PluginNodeDef } from '@figma-dsl/core';
import type { CodegenContext, CodegenResultEntry, CanvasRegionInfo } from './codegen-types.js';

function toPascalCase(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function findCanvasRegion(
  node: PluginNodeDef,
  canvasRegions: readonly CanvasRegionInfo[],
): CanvasRegionInfo | undefined {
  return canvasRegions.find(r => r.canvasName === node.name);
}

function nodeToJsx(
  node: PluginNodeDef,
  indent: number,
  canvasRegions: readonly CanvasRegionInfo[],
  hasDslCanvas: { value: boolean },
): string {
  const pad = '  '.repeat(indent);
  const type = node.type;

  if (type === 'TEXT') {
    const tag = 'span';
    return `${pad}<${tag}>${node.characters ?? ''}</${tag}>`;
  }

  // Check if this child matches a canvas region
  const canvasInfo = findCanvasRegion(node, canvasRegions);
  if (canvasInfo) {
    hasDslCanvas.value = true;
    return `${pad}<DslCanvas dsl={/* ${canvasInfo.canvasName} */} width={${canvasInfo.width}} alt="${canvasInfo.canvasName}" />`;
  }

  const tag = getJsxTag(node);
  const children = node.children;

  if (children.length === 0) {
    return `${pad}<${tag} />`;
  }

  const childJsx = children.map(c => nodeToJsx(c, indent + 1, canvasRegions, hasDslCanvas)).join('\n');
  return `${pad}<${tag}>\n${childJsx}\n${pad}</${tag}>`;
}

function getJsxTag(node: PluginNodeDef): string {
  switch (node.type) {
    case 'COMPONENT':
    case 'COMPONENT_SET':
      return toPascalCase(node.name);
    case 'INSTANCE':
      return toPascalCase(node.name);
    case 'TEXT':
      return 'span';
    case 'FRAME':
    case 'RECTANGLE':
    case 'ELLIPSE':
    case 'GROUP':
    case 'SECTION':
    default:
      return 'div';
  }
}

function generateVariantProps(node: PluginNodeDef): string | null {
  if (node.type !== 'COMPONENT_SET' || !node.componentPropertyDefinitions) return null;

  const variants = Object.entries(node.componentPropertyDefinitions)
    .filter(([, def]) => def.type === 'VARIANT');

  if (variants.length === 0) return null;

  const lines = variants.map(([name, def]) => {
    const defaultVal = typeof def.defaultValue === 'string' ? def.defaultValue : String(def.defaultValue);
    return `  ${name}?: '${defaultVal}';`;
  });

  const componentName = toPascalCase(node.name);
  return `interface ${componentName}Props {\n${lines.join('\n')}\n}`;
}

export function generateReact(context: CodegenContext): CodegenResultEntry[] {
  const node = context.node;
  const componentName = context.identity?.componentName
    ? toPascalCase(context.identity.componentName)
    : toPascalCase(node.name);

  const results: CodegenResultEntry[] = [];
  const hasDslCanvas = { value: false };

  // Component body (generate first to detect DslCanvas usage)
  const body = nodeToJsx(node, 1, context.canvasRegions, hasDslCanvas);
  const truncationComment = context.truncated
    ? '\n    {/* ... truncated (exceeded depth limit) */}'
    : '';

  // Imports section
  const importLines = [`import styles from './${componentName}.module.css';`];
  if (hasDslCanvas.value) {
    importLines.push(`import { DslCanvas } from './DslCanvas/DslCanvas';`);
  }
  results.push({
    title: 'Imports',
    language: 'TYPESCRIPT',
    code: importLines.join('\n'),
  });

  // Props interface (for component sets with variants)
  const variantProps = generateVariantProps(node);
  if (variantProps) {
    results.push({
      title: 'Props',
      language: 'TYPESCRIPT',
      code: variantProps,
    });
  }

  const propsParam = variantProps ? `props: ${componentName}Props` : '';
  const componentCode = `export function ${componentName}(${propsParam}) {\n  return (\n${body}${truncationComment}\n  );\n}`;

  results.push({
    title: componentName,
    language: 'TYPESCRIPT',
    code: componentCode,
  });

  return results;
}
