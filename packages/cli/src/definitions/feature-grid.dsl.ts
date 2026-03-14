import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';

const FEATURES = [
  { title: 'Fast Performance', desc: 'Optimized for speed and efficiency.' },
  { title: 'Easy Integration', desc: 'Works with your existing tools.' },
  { title: 'Secure by Default', desc: 'Enterprise-grade security built in.' },
  { title: 'Analytics', desc: 'Real-time insights and metrics.' },
  { title: 'Collaboration', desc: 'Work together seamlessly.' },
  { title: 'API Access', desc: 'Full REST and GraphQL APIs.' },
];

async function buildFeatureCardInline(api: VirtualFigmaApi, feature: { title: string; desc: string }) {
  const card = api.createFrame();
  card.name = feature.title;
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

  // Icon placeholder
  const icon = api.createFrame();
  icon.name = 'Icon';
  icon.resize(48, 48);
  icon.fills = [
    gradientPaint(
      [
        { color: '#f5f3ff', position: 0 },
        { color: '#fdf2f8', position: 0.5 },
        { color: '#fff7ed', position: 1 },
      ],
      135,
    ),
  ];
  icon.cornerRadius = 16;
  card.appendChild(icon);

  const title = await api.createText();
  title.characters = feature.title;
  title.fontSize = 18;
  title.fontWeight = 700;
  title.fills = [solidPaint('#111827')];
  card.appendChild(title);

  const desc = await api.createText();
  desc.characters = feature.desc;
  desc.fontSize = 16;
  desc.fills = [solidPaint('#4b5563')];
  desc.lineHeight = { value: 165, unit: 'PERCENT' };
  card.appendChild(desc);

  return card;
}

/**
 * FeatureGrid (2/3/4 column variants) — vertical layout with header section
 * + grid of FeatureCard-like items; tests variant-based column count,
 * CSS grid to nested Auto Layout mapping.
 */
export async function buildFeatureGrid(api: VirtualFigmaApi) {
  const container = api.createFrame();
  container.name = 'FeatureGrid';
  container.resize(1200, 0);

  setAutoLayout(container, {
    direction: 'VERTICAL',
    spacing: 48,
    padX: 24,
    padY: 80,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
    counterAlign: 'CENTER',
  });

  // Header
  const header = api.createFrame();
  header.name = 'Header';
  setAutoLayout(header, {
    direction: 'VERTICAL',
    spacing: 16,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
    counterAlign: 'CENTER',
  });

  const badge = api.createFrame();
  badge.name = 'Badge';
  badge.fills = [solidPaint('#ede9fe')];
  badge.cornerRadius = 9999;
  setAutoLayout(badge, {
    direction: 'HORIZONTAL',
    padX: 16,
    padY: 4,
    sizing: 'HUG',
  });

  const badgeText = await api.createText();
  badgeText.characters = 'Features';
  badgeText.fontSize = 14;
  badgeText.fontWeight = 600;
  badgeText.fills = [solidPaint('#6d28d9')];
  badge.appendChild(badgeText);
  header.appendChild(badge);

  const title = await api.createText();
  title.characters = 'Everything you need';
  title.fontSize = 36;
  title.fontWeight = 700;
  title.fills = [solidPaint('#111827')];
  title.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  title.textAlignHorizontal = 'CENTER';
  header.appendChild(title);

  const subtitle = await api.createText();
  subtitle.characters = 'All the tools to build, deploy, and scale.';
  subtitle.fontSize = 18;
  subtitle.fills = [solidPaint('#4b5563')];
  subtitle.lineHeight = { value: 165, unit: 'PERCENT' };
  subtitle.textAlignHorizontal = 'CENTER';
  header.appendChild(subtitle);

  container.appendChild(header);

  // Grid — 3 columns using nested horizontal rows
  const grid = api.createFrame();
  grid.name = 'Grid';
  setAutoLayout(grid, {
    direction: 'VERTICAL',
    spacing: 24,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  // Row 1 (3 cards)
  const row1 = api.createFrame();
  row1.name = 'Row1';
  setAutoLayout(row1, {
    direction: 'HORIZONTAL',
    spacing: 24,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  for (let i = 0; i < 3; i++) {
    const card = await buildFeatureCardInline(api, FEATURES[i]!);
    row1.appendChild(card);
  }
  grid.appendChild(row1);

  // Row 2 (3 cards)
  const row2 = api.createFrame();
  row2.name = 'Row2';
  setAutoLayout(row2, {
    direction: 'HORIZONTAL',
    spacing: 24,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  for (let i = 3; i < 6; i++) {
    const card = await buildFeatureCardInline(api, FEATURES[i]!);
    row2.appendChild(card);
  }
  grid.appendChild(row2);

  container.appendChild(grid);

  return container;
}
