import type { PluginNodeDef } from '@figma-dsl/core';
import type { CodegenContext, CodegenResultEntry } from './codegen-types.js';

function toPascalCase(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function nodeToJsx(node: PluginNodeDef, indent: number): string {
  const pad = '  '.repeat(indent);
  const type = node.type;

  if (type === 'TEXT') {
    const tag = 'span';
    return `${pad}<${tag}>${node.characters ?? ''}</${tag}>`;
  }

  const tag = getJsxTag(node);
  const children = node.children;

  if (children.length === 0) {
    return `${pad}<${tag} />`;
  }

  const childJsx = children.map(c => nodeToJsx(c, indent + 1)).join('\n');
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

  // Imports section
  results.push({
    title: 'Imports',
    language: 'TYPESCRIPT',
    code: `import styles from './${componentName}.module.css';`,
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

  // Component body
  const body = nodeToJsx(node, 1);
  const truncationComment = context.truncated
    ? '\n    {/* ... truncated (exceeded depth limit) */}'
    : '';

  const propsParam = variantProps ? `props: ${componentName}Props` : '';
  const componentCode = `export function ${componentName}(${propsParam}) {\n  return (\n${body}${truncationComment}\n  );\n}`;

  results.push({
    title: componentName,
    language: 'TYPESCRIPT',
    code: componentCode,
  });

  return results;
}
