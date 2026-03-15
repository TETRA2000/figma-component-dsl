// --- Code Connect Generator ---
// Produces .figma.tsx Code Connect binding files from component metadata.
// Maps slots to figma.slot(), text to figma.string(), boolean to figma.boolean().

export interface CodeConnectOptions {
  fileKey: string;
  componentName: string;
  nodeId: string;
  slots: Array<{ name: string; preferredInstances?: readonly string[] }>;
  properties: Array<{ name: string; type: 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP' | 'SLOT' }>;
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

function generateSlotMapping(slots: CodeConnectOptions['slots']): string {
  if (slots.length === 0) return '';

  if (slots.length === 1) {
    // Single slot → children prop
    return `    children: figma.slot('${slots[0]!.name}'),`;
  }

  // Multiple slots → named props in camelCase
  return slots
    .map(s => `    ${toCamelCase(s.name)}: figma.slot('${s.name}'),`)
    .join('\n');
}

function generatePropertyMapping(
  properties: CodeConnectOptions['properties'],
): string {
  return properties
    .filter(p => p.type !== 'SLOT') // Slots are handled separately
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
  const slotLines = generateSlotMapping(options.slots);
  const propLines = generatePropertyMapping(options.properties);

  const allProps = [slotLines, propLines].filter(Boolean).join('\n');

  const propsBlock = allProps
    ? `  props: {\n${allProps}\n  },`
    : '';

  return `import figma from '@figma/code-connect';
import { ${options.componentName} } from './${options.componentName}';

figma.connect(${options.componentName}, '${url}', {
${propsBlock}
  example: (props) => <${options.componentName} {...props} />,
});
`;
}
