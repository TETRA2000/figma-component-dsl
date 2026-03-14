import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

const SIZE_CONFIG = {
  sm: { fontSize: 14, padX: 16, padY: 8 },
  md: { fontSize: 16, padX: 24, padY: 12 },
  lg: { fontSize: 18, padX: 32, padY: 16 },
} as const;

function getVariantFills(variant: (typeof VARIANTS)[number]) {
  switch (variant) {
    case 'primary':
      return [
        gradientPaint(
          [
            { color: '#7c3aed', position: 0 },
            { color: '#4f46e5', position: 1 },
          ],
          135,
        ),
      ];
    case 'secondary':
      return [solidPaint('#f3f4f6')];
    case 'outline':
      return [];
    case 'ghost':
      return [];
  }
}

function getTextColor(variant: (typeof VARIANTS)[number]) {
  switch (variant) {
    case 'primary':
      return '#ffffff';
    case 'secondary':
      return '#111827';
    case 'outline':
      return '#7c3aed';
    case 'ghost':
      return '#4b5563';
  }
}

function getStrokes(variant: (typeof VARIANTS)[number]) {
  if (variant === 'outline') {
    return { strokes: [solidPaint('#c4b5fd')], strokeWeight: 2 };
  }
  return {};
}

/**
 * Button — 12 variants: 4 styles x 3 sizes
 * Gradient fills, pill corners (9999), horizontal auto-layout, center alignment.
 */
export async function buildButton(api: VirtualFigmaApi) {
  const container = api.createFrame();
  container.name = 'Buttons';
  setAutoLayout(container, {
    direction: 'HORIZONTAL',
    spacing: 8,
    sizing: 'HUG',
  });

  for (const variant of VARIANTS) {
    for (const size of SIZES) {
      const config = SIZE_CONFIG[size];
      const btn = api.createComponent();
      btn.name = `variant=${variant}, size=${size}`;
      btn.fills = getVariantFills(variant);
      btn.cornerRadius = 9999;

      const strokeConfig = getStrokes(variant);
      if (strokeConfig.strokes) {
        btn.strokes = strokeConfig.strokes;
        btn.strokeWeight = strokeConfig.strokeWeight!;
      }

      setAutoLayout(btn, {
        direction: 'HORIZONTAL',
        spacing: 8,
        padX: config.padX,
        padY: config.padY,
        sizing: 'HUG',
        align: 'CENTER',
        counterAlign: 'CENTER',
      });

      const label = await api.createText();
      label.characters = `${variant} ${size}`;
      label.fontSize = config.fontSize;
      label.fontWeight = 600;
      label.fills = [solidPaint(getTextColor(variant))];
      btn.appendChild(label);

      btn.addComponentProperty('fullWidth', 'BOOLEAN', false);

      container.appendChild(btn);
    }
  }

  return container;
}
