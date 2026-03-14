import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, setAutoLayout } from '@figma-dsl/core';

const VARIANTS = [
  { name: 'Default', bgColor: '#6b7280', textColor: '#6b7280' },
  { name: 'Primary', bgColor: '#7c3aed', textColor: '#6d28d9' },
  { name: 'Success', bgColor: '#22c55e', textColor: '#16a34a' },
  { name: 'Warning', bgColor: '#f97316', textColor: '#ea580c' },
] as const;

/**
 * Badge — 4 variants: Default, Primary, Success, Warning
 * Solid fills with matching border colors, pill corners, compact padding (16x4),
 * TEXT component property for label.
 */
export async function buildBadge(api: VirtualFigmaApi) {
  const container = api.createFrame();
  container.name = 'Badges';
  setAutoLayout(container, {
    direction: 'HORIZONTAL',
    spacing: 8,
    sizing: 'HUG',
  });

  for (const variant of VARIANTS) {
    const badge = api.createComponent();
    badge.name = `variant=${variant.name}`;
    badge.fills = [solidPaint(variant.bgColor, 0.1)];
    badge.cornerRadius = 9999;

    setAutoLayout(badge, {
      direction: 'HORIZONTAL',
      padX: 16,
      padY: 4,
      sizing: 'HUG',
      align: 'CENTER',
      counterAlign: 'CENTER',
    });

    const text = await api.createText();
    text.characters = variant.name;
    text.fontSize = 14;
    text.fontWeight = 600;
    text.fills = [solidPaint(variant.textColor)];
    text.lineHeight = { value: 150, unit: 'PERCENT' };
    badge.appendChild(text);

    badge.addComponentProperty('label', 'TEXT', variant.name);

    container.appendChild(badge);
  }

  return container;
}
