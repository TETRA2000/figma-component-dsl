import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';

const PLANS = [
  {
    name: 'Starter',
    price: '$29',
    desc: 'For individuals',
    features: ['5 projects', '1GB storage', 'Basic analytics', 'Email support'],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$99',
    desc: 'For growing teams',
    features: [
      'Unlimited projects',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom domains',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$299',
    desc: 'For large organizations',
    features: [
      'Unlimited everything',
      '1TB storage',
      'Custom analytics',
      'Dedicated support',
      'SLA guarantee',
    ],
    highlighted: false,
  },
];

async function buildFeatureItem(
  api: VirtualFigmaApi,
  text: string,
  textColor: string,
  checkColor: string,
) {
  const row = api.createFrame();
  row.name = 'Feature';
  setAutoLayout(row, {
    direction: 'HORIZONTAL',
    spacing: 12,
    sizing: 'HUG',
    counterAlign: 'CENTER',
  });

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

async function buildPlanCard(api: VirtualFigmaApi, plan: (typeof PLANS)[number]) {
  const card = api.createFrame();
  card.name = plan.name;

  if (plan.highlighted) {
    card.fills = [
      gradientPaint(
        [
          { color: '#1e1b4b', position: 0 },
          { color: '#312e81', position: 0.5 },
          { color: '#4c1d95', position: 1 },
        ],
        135,
      ),
    ];
  } else {
    card.fills = [solidPaint('#ffffff')];
    card.strokes = [solidPaint('#e5e7eb')];
    card.strokeWeight = 1;
  }
  card.cornerRadius = 24;

  setAutoLayout(card, {
    direction: 'VERTICAL',
    spacing: 32,
    padX: 32,
    padY: 32,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  const textColor = plan.highlighted ? '#ffffff' : '#111827';
  const subtextColor = plan.highlighted ? '#c4b5fd' : '#4b5563';
  const checkColor = plan.highlighted ? '#4ade80' : '#22c55e';

  // Popular badge
  if (plan.highlighted) {
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
    });

    const badgeText = await api.createText();
    badgeText.characters = 'Most Popular';
    badgeText.fontSize = 12;
    badgeText.fontWeight = 700;
    badgeText.fills = [solidPaint('#ffffff')];
    badge.appendChild(badgeText);
    card.appendChild(badge);
  }

  // Name
  const name = await api.createText();
  name.characters = plan.name;
  name.fontSize = 20;
  name.fontWeight = 700;
  name.fills = [solidPaint(textColor)];
  name.textAlignHorizontal = 'CENTER';
  card.appendChild(name);

  // Description
  const desc = await api.createText();
  desc.characters = plan.desc;
  desc.fontSize = 14;
  desc.fills = [solidPaint(subtextColor)];
  desc.textAlignHorizontal = 'CENTER';
  card.appendChild(desc);

  // Price row
  const priceRow = api.createFrame();
  priceRow.name = 'PriceRow';
  setAutoLayout(priceRow, {
    direction: 'HORIZONTAL',
    spacing: 4,
    sizing: 'HUG',
    counterAlign: 'MAX',
  });

  const price = await api.createText();
  price.characters = plan.price;
  price.fontSize = 48;
  price.fontWeight = 700;
  price.fills = [solidPaint(textColor)];
  price.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  priceRow.appendChild(price);

  const period = await api.createText();
  period.characters = '/mo';
  period.fontSize = 16;
  period.fills = [solidPaint(subtextColor)];
  priceRow.appendChild(period);

  card.appendChild(priceRow);

  // Divider
  const divider = api.createFrame();
  divider.name = 'Divider';
  divider.resize(0, 1);
  divider.fills = [solidPaint(plan.highlighted ? '#4c1d95' : '#e5e7eb')];
  setAutoLayout(divider, {
    direction: 'HORIZONTAL',
    widthSizing: 'FILL',
    heightSizing: 'FIXED',
  });
  card.appendChild(divider);

  // Features
  const features = api.createFrame();
  features.name = 'Features';
  setAutoLayout(features, {
    direction: 'VERTICAL',
    spacing: 12,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  for (const feature of plan.features) {
    const item = await buildFeatureItem(api, feature, subtextColor, checkColor);
    features.appendChild(item);
  }
  card.appendChild(features);

  // CTA Button
  const cta = api.createFrame();
  cta.name = 'CTA';
  cta.cornerRadius = 9999;

  if (plan.highlighted) {
    cta.fills = [solidPaint('#ffffff')];
  } else {
    cta.strokes = [solidPaint('#c4b5fd')];
    cta.strokeWeight = 2;
  }

  setAutoLayout(cta, {
    direction: 'HORIZONTAL',
    padX: 24,
    padY: 12,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const ctaLabel = await api.createText();
  ctaLabel.characters = 'Get Started';
  ctaLabel.fontSize = 16;
  ctaLabel.fontWeight = 600;
  ctaLabel.fills = [solidPaint(plan.highlighted ? '#4c1d95' : '#7c3aed')];
  cta.appendChild(ctaLabel);
  card.appendChild(cta);

  return card;
}

/**
 * PricingTable — section header with 3 PricingCard-like instances in horizontal row,
 * middle card highlighted; tests mixed variant instances in a single row.
 */
export async function buildPricingTable(api: VirtualFigmaApi) {
  const section = api.createFrame();
  section.name = 'PricingTable';
  section.resize(1200, 0);

  setAutoLayout(section, {
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
  badgeText.characters = 'Pricing';
  badgeText.fontSize = 14;
  badgeText.fontWeight = 600;
  badgeText.fills = [solidPaint('#6d28d9')];
  badge.appendChild(badgeText);
  header.appendChild(badge);

  const title = await api.createText();
  title.characters = 'Simple, transparent pricing';
  title.fontSize = 36;
  title.fontWeight = 700;
  title.fills = [solidPaint('#111827')];
  title.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  title.textAlignHorizontal = 'CENTER';
  header.appendChild(title);

  const subtitle = await api.createText();
  subtitle.characters = 'Choose the plan that fits your needs.';
  subtitle.fontSize = 18;
  subtitle.fills = [solidPaint('#4b5563')];
  subtitle.lineHeight = { value: 165, unit: 'PERCENT' };
  subtitle.textAlignHorizontal = 'CENTER';
  header.appendChild(subtitle);

  section.appendChild(header);

  // Cards row
  const cardsRow = api.createFrame();
  cardsRow.name = 'Plans';
  setAutoLayout(cardsRow, {
    direction: 'HORIZONTAL',
    spacing: 24,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
    counterAlign: 'MIN',
  });

  for (const plan of PLANS) {
    const card = await buildPlanCard(api, plan);
    cardsRow.appendChild(card);
  }

  section.appendChild(cardsRow);

  return section;
}
