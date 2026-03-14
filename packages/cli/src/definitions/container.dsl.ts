import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, setAutoLayout } from '@figma-dsl/core';

const WIDTHS = [
  { name: 'sm', width: 640 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 1024 },
  { name: 'xl', width: 1200 },
] as const;

/**
 * Container (4 width variants: 640/768/1024/1200px)
 * Pure layout component with no fills, centered content with 24px horizontal padding.
 */
export async function buildContainer(api: VirtualFigmaApi) {
  const root = api.createFrame();
  root.name = 'Container';
  setAutoLayout(root, {
    direction: 'VERTICAL',
    spacing: 24,
    sizing: 'HUG',
  });

  for (const variant of WIDTHS) {
    const container = api.createComponent();
    container.name = `maxWidth=${variant.name}`;
    container.resize(variant.width, 0);

    // No fills — pure layout
    setAutoLayout(container, {
      direction: 'VERTICAL',
      padX: 24,
      widthSizing: 'FIXED',
      heightSizing: 'HUG',
    });

    // Placeholder content
    const placeholder = await api.createText();
    placeholder.characters = `Content (${variant.name}: ${variant.width}px)`;
    placeholder.fontSize = 16;
    placeholder.fills = [solidPaint('#4b5563')];
    container.appendChild(placeholder);

    root.appendChild(container);
  }

  return root;
}
