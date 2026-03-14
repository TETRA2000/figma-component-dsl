import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';

const FEATURES_STANDARD = [
  '10 projects',
  '5GB storage',
  'Basic analytics',
  'Email support',
];

const FEATURES_HIGHLIGHTED = [
  'Unlimited projects',
  '100GB storage',
  'Advanced analytics',
  'Priority support',
  'Custom domains',
];

async function buildFeatureItem(
  api: VirtualFigmaApi,
  text: string,
  textColor: string,
  checkColor: string,
) {
  const row = api.createFrame();
  row.name = 'FeatureItem';
  setAutoLayout(row, {
    direction: 'HORIZONTAL',
    spacing: 12,
    sizing: 'HUG',
    counterAlign: 'CENTER',
  });

  // Checkmark circle
  const check = api.createEllipse();
  check.name = 'Check';
  check.resize(18, 18);
  check.fills = [solidPaint(checkColor)];
  row.appendChild(check);

  const label = await api.createText();
  label.characters = text;
  label.fontSize = 14;
  label.fills = [solidPaint(textColor)];
  label.lineHeight = { value: 150, unit: 'PERCENT' };
  row.appendChild(label);

  return row;
}

/**
 * PricingCard — standard + highlighted variants
 * Highlighted variant with dark gradient background and inverted text colors,
 * features list with checkmark circles, 1px divider line, 24px corner radius.
 */
export async function buildPricingCard(api: VirtualFigmaApi) {
  const container = api.createFrame();
  container.name = 'PricingCards';
  setAutoLayout(container, {
    direction: 'HORIZONTAL',
    spacing: 24,
    sizing: 'HUG',
    counterAlign: 'MIN',
  });

  // --- Standard Card ---
  const standard = api.createComponent();
  standard.name = 'highlighted=false';
  standard.fills = [solidPaint('#ffffff')];
  standard.strokes = [solidPaint('#e5e7eb')];
  standard.strokeWeight = 1;
  standard.cornerRadius = 24;
  standard.resize(320, 0);

  setAutoLayout(standard, {
    direction: 'VERTICAL',
    spacing: 32,
    padX: 32,
    padY: 32,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  });

  // Header
  const stdHeader = api.createFrame();
  stdHeader.name = 'Header';
  setAutoLayout(stdHeader, {
    direction: 'VERTICAL',
    spacing: 8,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const stdName = await api.createText();
  stdName.characters = 'Starter';
  stdName.fontSize = 20;
  stdName.fontWeight = 700;
  stdName.fills = [solidPaint('#111827')];
  stdName.textAlignHorizontal = 'CENTER';
  stdHeader.appendChild(stdName);

  const stdDesc = await api.createText();
  stdDesc.characters = 'Perfect for small teams';
  stdDesc.fontSize = 14;
  stdDesc.fills = [solidPaint('#4b5563')];
  stdDesc.textAlignHorizontal = 'CENTER';
  stdHeader.appendChild(stdDesc);

  // Price row
  const stdPriceRow = api.createFrame();
  stdPriceRow.name = 'PriceRow';
  setAutoLayout(stdPriceRow, {
    direction: 'HORIZONTAL',
    spacing: 4,
    sizing: 'HUG',
    counterAlign: 'MAX',
  });

  const stdPrice = await api.createText();
  stdPrice.characters = '$29';
  stdPrice.fontSize = 48;
  stdPrice.fontWeight = 700;
  stdPrice.fills = [solidPaint('#111827')];
  stdPrice.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  stdPriceRow.appendChild(stdPrice);

  const stdPeriod = await api.createText();
  stdPeriod.characters = '/mo';
  stdPeriod.fontSize = 16;
  stdPeriod.fills = [solidPaint('#4b5563')];
  stdPriceRow.appendChild(stdPeriod);

  stdHeader.appendChild(stdPriceRow);
  standard.appendChild(stdHeader);

  // Divider
  const stdDivider = api.createFrame();
  stdDivider.name = 'Divider';
  stdDivider.resize(0, 1);
  stdDivider.fills = [solidPaint('#e5e7eb')];
  setAutoLayout(stdDivider, {
    direction: 'HORIZONTAL',
    widthSizing: 'FILL',
    heightSizing: 'FIXED',
  });
  standard.appendChild(stdDivider);

  // Features list
  const stdFeatures = api.createFrame();
  stdFeatures.name = 'Features';
  setAutoLayout(stdFeatures, {
    direction: 'VERTICAL',
    spacing: 12,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  for (const feature of FEATURES_STANDARD) {
    const item = await buildFeatureItem(api, feature, '#4b5563', '#22c55e');
    stdFeatures.appendChild(item);
  }
  standard.appendChild(stdFeatures);

  // CTA Button (outline style)
  const stdCta = api.createFrame();
  stdCta.name = 'CTA';
  stdCta.strokes = [solidPaint('#c4b5fd')];
  stdCta.strokeWeight = 2;
  stdCta.cornerRadius = 9999;
  setAutoLayout(stdCta, {
    direction: 'HORIZONTAL',
    padX: 24,
    padY: 12,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const stdCtaLabel = await api.createText();
  stdCtaLabel.characters = 'Get Started';
  stdCtaLabel.fontSize = 16;
  stdCtaLabel.fontWeight = 600;
  stdCtaLabel.fills = [solidPaint('#7c3aed')];
  stdCta.appendChild(stdCtaLabel);
  standard.appendChild(stdCta);

  container.appendChild(standard);

  // --- Highlighted Card ---
  const highlighted = api.createComponent();
  highlighted.name = 'highlighted=true';
  highlighted.fills = [
    gradientPaint(
      [
        { color: '#1e1b4b', position: 0 },
        { color: '#312e81', position: 0.5 },
        { color: '#4c1d95', position: 1 },
      ],
      135,
    ),
  ];
  highlighted.cornerRadius = 24;
  highlighted.resize(320, 0);

  setAutoLayout(highlighted, {
    direction: 'VERTICAL',
    spacing: 32,
    padX: 32,
    padY: 32,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  });

  // Popular badge
  const badge = api.createFrame();
  badge.name = 'PopularBadge';
  badge.fills = [
    gradientPaint(
      [
        { color: '#7c3aed', position: 0 },
        { color: '#4f46e5', position: 1 },
      ],
      135,
    ),
  ];
  badge.cornerRadius = 9999;
  setAutoLayout(badge, {
    direction: 'HORIZONTAL',
    padX: 16,
    padY: 4,
    sizing: 'HUG',
    align: 'CENTER',
  });

  const badgeText = await api.createText();
  badgeText.characters = 'Most Popular';
  badgeText.fontSize = 12;
  badgeText.fontWeight = 700;
  badgeText.fills = [solidPaint('#ffffff')];
  badge.appendChild(badgeText);
  highlighted.appendChild(badge);

  // Header
  const hlHeader = api.createFrame();
  hlHeader.name = 'Header';
  setAutoLayout(hlHeader, {
    direction: 'VERTICAL',
    spacing: 8,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const hlName = await api.createText();
  hlName.characters = 'Professional';
  hlName.fontSize = 20;
  hlName.fontWeight = 700;
  hlName.fills = [solidPaint('#ffffff')];
  hlName.textAlignHorizontal = 'CENTER';
  hlHeader.appendChild(hlName);

  const hlDesc = await api.createText();
  hlDesc.characters = 'Best for growing businesses';
  hlDesc.fontSize = 14;
  hlDesc.fills = [solidPaint('#c4b5fd')];
  hlDesc.textAlignHorizontal = 'CENTER';
  hlHeader.appendChild(hlDesc);

  // Price
  const hlPriceRow = api.createFrame();
  hlPriceRow.name = 'PriceRow';
  setAutoLayout(hlPriceRow, {
    direction: 'HORIZONTAL',
    spacing: 4,
    sizing: 'HUG',
    counterAlign: 'MAX',
  });

  const hlPrice = await api.createText();
  hlPrice.characters = '$99';
  hlPrice.fontSize = 48;
  hlPrice.fontWeight = 700;
  hlPrice.fills = [solidPaint('#ffffff')];
  hlPrice.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  hlPriceRow.appendChild(hlPrice);

  const hlPeriod = await api.createText();
  hlPeriod.characters = '/mo';
  hlPeriod.fontSize = 16;
  hlPeriod.fills = [solidPaint('#c4b5fd')];
  hlPriceRow.appendChild(hlPeriod);

  hlHeader.appendChild(hlPriceRow);
  highlighted.appendChild(hlHeader);

  // Divider
  const hlDivider = api.createFrame();
  hlDivider.name = 'Divider';
  hlDivider.resize(0, 1);
  hlDivider.fills = [solidPaint('#4c1d95')];
  setAutoLayout(hlDivider, {
    direction: 'HORIZONTAL',
    widthSizing: 'FILL',
    heightSizing: 'FIXED',
  });
  highlighted.appendChild(hlDivider);

  // Features
  const hlFeatures = api.createFrame();
  hlFeatures.name = 'Features';
  setAutoLayout(hlFeatures, {
    direction: 'VERTICAL',
    spacing: 12,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  for (const feature of FEATURES_HIGHLIGHTED) {
    const item = await buildFeatureItem(api, feature, '#ddd6fe', '#4ade80');
    hlFeatures.appendChild(item);
  }
  highlighted.appendChild(hlFeatures);

  // CTA Button (solid white)
  const hlCta = api.createFrame();
  hlCta.name = 'CTA';
  hlCta.fills = [solidPaint('#ffffff')];
  hlCta.cornerRadius = 9999;
  setAutoLayout(hlCta, {
    direction: 'HORIZONTAL',
    padX: 24,
    padY: 12,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const hlCtaLabel = await api.createText();
  hlCtaLabel.characters = 'Get Started';
  hlCtaLabel.fontSize = 16;
  hlCtaLabel.fontWeight = 600;
  hlCtaLabel.fills = [solidPaint('#4c1d95')];
  hlCta.appendChild(hlCtaLabel);
  highlighted.appendChild(hlCta);

  container.appendChild(highlighted);

  return container;
}
