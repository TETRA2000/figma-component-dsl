import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, setAutoLayout } from '@figma-dsl/core';

const STATS = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
  { value: '24/7', label: 'Support' },
];

/**
 * Stats (inline + cards variants) — inline variant: horizontal layout with stat groups;
 * cards variant: stat values in individual white card frames with borders;
 * purple stat values (36px, 700 weight) with gray labels.
 */
export async function buildStats(api: VirtualFigmaApi) {
  const container = api.createFrame();
  container.name = 'Stats';
  setAutoLayout(container, {
    direction: 'VERTICAL',
    spacing: 48,
    sizing: 'HUG',
  });

  // Inline variant
  const inline = api.createComponent();
  inline.name = 'variant=inline';
  inline.resize(1200, 0);
  setAutoLayout(inline, {
    direction: 'HORIZONTAL',
    spacing: 64,
    padY: 64,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  for (const stat of STATS) {
    const item = api.createFrame();
    item.name = stat.label;
    setAutoLayout(item, {
      direction: 'VERTICAL',
      spacing: 8,
      sizing: 'HUG',
      counterAlign: 'CENTER',
    });

    const value = await api.createText();
    value.characters = stat.value;
    value.fontSize = 48;
    value.fontWeight = 700;
    value.fills = [solidPaint('#7c3aed')];
    value.letterSpacing = { value: -2.5, unit: 'PERCENT' };
    value.textAlignHorizontal = 'CENTER';
    item.appendChild(value);

    const label = await api.createText();
    label.characters = stat.label;
    label.fontSize = 16;
    label.fills = [solidPaint('#4b5563')];
    label.textAlignHorizontal = 'CENTER';
    item.appendChild(label);

    inline.appendChild(item);
  }
  container.appendChild(inline);

  // Cards variant
  const cards = api.createComponent();
  cards.name = 'variant=cards';
  cards.resize(1200, 0);
  setAutoLayout(cards, {
    direction: 'HORIZONTAL',
    spacing: 24,
    padY: 64,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
    align: 'CENTER',
  });

  for (const stat of STATS) {
    const card = api.createFrame();
    card.name = stat.label;
    card.fills = [solidPaint('#ffffff')];
    card.strokes = [solidPaint('#e5e7eb')];
    card.strokeWeight = 1;
    card.cornerRadius = 24;
    setAutoLayout(card, {
      direction: 'VERTICAL',
      spacing: 8,
      padX: 40,
      padY: 32,
      widthSizing: 'FILL',
      heightSizing: 'HUG',
      counterAlign: 'CENTER',
    });

    const value = await api.createText();
    value.characters = stat.value;
    value.fontSize = 48;
    value.fontWeight = 700;
    value.fills = [solidPaint('#7c3aed')];
    value.letterSpacing = { value: -2.5, unit: 'PERCENT' };
    value.textAlignHorizontal = 'CENTER';
    card.appendChild(value);

    const label = await api.createText();
    label.characters = stat.label;
    label.fontSize = 16;
    label.fills = [solidPaint('#4b5563')];
    label.textAlignHorizontal = 'CENTER';
    card.appendChild(label);

    cards.appendChild(card);
  }
  container.appendChild(cards);

  return container;
}
