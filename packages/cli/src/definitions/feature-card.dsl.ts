import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';

/**
 * FeatureCard — vertical card layout with 16px spacing, white background
 * with 1px gray border, nested icon placeholder using INSTANCE_SWAP property,
 * 24px uniform padding, 16px corner radius.
 */
export async function buildFeatureCard(api: VirtualFigmaApi) {
  const card = api.createComponent();
  card.name = 'FeatureCard';
  card.fills = [solidPaint('#ffffff')];
  card.strokes = [solidPaint('#e5e7eb')];
  card.strokeWeight = 1;
  card.cornerRadius = 24;

  setAutoLayout(card, {
    direction: 'VERTICAL',
    spacing: 12,
    padX: 32,
    padY: 32,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  // Icon placeholder (48x48 frame with gradient subtle background)
  const iconWrap = api.createFrame();
  iconWrap.name = 'Icon';
  iconWrap.resize(48, 48);
  iconWrap.fills = [
    gradientPaint(
      [
        { color: '#f5f3ff', position: 0 },
        { color: '#fdf2f8', position: 0.5 },
        { color: '#fff7ed', position: 1 },
      ],
      135,
    ),
  ];
  iconWrap.cornerRadius = 16;
  card.appendChild(iconWrap);

  card.addComponentProperty('icon', 'INSTANCE_SWAP', '');

  // Title
  const title = await api.createText();
  title.characters = 'Feature Title';
  title.fontSize = 18;
  title.fontWeight = 700;
  title.fills = [solidPaint('#111827')];
  card.appendChild(title);

  // Description
  const desc = await api.createText();
  desc.characters = 'A brief description of the feature and its benefits.';
  desc.fontSize = 16;
  desc.fills = [solidPaint('#4b5563')];
  desc.lineHeight = { value: 165, unit: 'PERCENT' };
  card.appendChild(desc);

  return card;
}
