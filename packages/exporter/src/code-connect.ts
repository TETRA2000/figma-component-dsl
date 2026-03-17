// --- Code Connect Generator ---
// Produces .figma.tsx Code Connect binding files from component metadata.
// Maps text to figma.string(), boolean to figma.boolean().

export interface CodeConnectOptions {
  fileKey: string;
  componentName: string;
  nodeId: string;
  properties: Array<{ name: string; type: 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP' }>;
}

function toFigmaUrl(fileKey: string, nodeId: string): string {
  const encodedNodeId = nodeId.replace(':', '-');
  return `https://www.figma.com/design/${fileKey}?node-id=${encodedNodeId}`;
}

function toCamelCase(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/^[A-Z]/, c => c.toLowerCase());
}

function generatePropertyMapping(
  properties: CodeConnectOptions['properties'],
): string {
  return properties
    .map(p => {
      switch (p.type) {
        case 'TEXT':
          return `    ${toCamelCase(p.name)}: figma.string('${p.name}'),`;
        case 'BOOLEAN':
          return `    ${toCamelCase(p.name)}: figma.boolean('${p.name}'),`;
        case 'INSTANCE_SWAP':
          return `    ${toCamelCase(p.name)}: figma.instance('${p.name}'),`;
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join('\n');
}

export function generateCodeConnect(options: CodeConnectOptions): string {
  const url = toFigmaUrl(options.fileKey, options.nodeId);
  const propLines = generatePropertyMapping(options.properties);

  const propsBlock = propLines
    ? `  props: {\n${propLines}\n  },`
    : '';

  return `import figma from '@figma/code-connect';
import { ${options.componentName} } from './${options.componentName}';

figma.connect(${options.componentName}, '${url}', {
${propsBlock}
  example: (props) => <${options.componentName} {...props} />,
});
`;
}
