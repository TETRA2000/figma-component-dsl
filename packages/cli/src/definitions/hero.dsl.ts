import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';

async function buildHeroVariant(
  api: VirtualFigmaApi,
  alignment: 'center' | 'left',
) {
  const hero = api.createComponent();
  hero.name = `alignment=${alignment}`;
  hero.resize(1200, 0);

  setAutoLayout(hero, {
    direction: 'VERTICAL',
    spacing: 24,
    padX: 24,
    padY: 80,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
    counterAlign: alignment === 'center' ? 'CENTER' : 'MIN',
  });

  // Badge
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
  badgeText.characters = 'New Release';
  badgeText.fontSize = 14;
  badgeText.fontWeight = 600;
  badgeText.fills = [solidPaint('#6d28d9')];
  badge.appendChild(badgeText);
  hero.appendChild(badge);

  // Title — 60px
  const title = await api.createText();
  title.characters = 'Build something\namazing today';
  title.fontSize = 60;
  title.fontWeight = 700;
  title.fills = [solidPaint('#111827')];
  title.lineHeight = { value: 115, unit: 'PERCENT' };
  title.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  title.textAlignHorizontal = alignment === 'center' ? 'CENTER' : 'LEFT';
  hero.appendChild(title);

  // Subtitle — 20px
  const subtitle = await api.createText();
  subtitle.characters =
    'The modern platform for building applications\nthat scale with your business.';
  subtitle.fontSize = 20;
  subtitle.fills = [solidPaint('#4b5563')];
  subtitle.lineHeight = { value: 165, unit: 'PERCENT' };
  subtitle.textAlignHorizontal = alignment === 'center' ? 'CENTER' : 'LEFT';
  hero.appendChild(subtitle);

  // Button row
  const buttonRow = api.createFrame();
  buttonRow.name = 'Actions';
  setAutoLayout(buttonRow, {
    direction: 'HORIZONTAL',
    spacing: 16,
    sizing: 'HUG',
  });

  // Primary CTA
  const primaryBtn = api.createFrame();
  primaryBtn.name = 'PrimaryButton';
  primaryBtn.fills = [
    gradientPaint(
      [
        { color: '#7c3aed', position: 0 },
        { color: '#4f46e5', position: 1 },
      ],
      135,
    ),
  ];
  primaryBtn.cornerRadius = 9999;
  setAutoLayout(primaryBtn, {
    direction: 'HORIZONTAL',
    padX: 32,
    padY: 16,
    sizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const primaryLabel = await api.createText();
  primaryLabel.characters = 'Get Started';
  primaryLabel.fontSize = 18;
  primaryLabel.fontWeight = 600;
  primaryLabel.fills = [solidPaint('#ffffff')];
  primaryBtn.appendChild(primaryLabel);
  buttonRow.appendChild(primaryBtn);

  // Secondary CTA
  const secondaryBtn = api.createFrame();
  secondaryBtn.name = 'SecondaryButton';
  secondaryBtn.fills = [solidPaint('#f3f4f6')];
  secondaryBtn.cornerRadius = 9999;
  setAutoLayout(secondaryBtn, {
    direction: 'HORIZONTAL',
    padX: 32,
    padY: 16,
    sizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const secondaryLabel = await api.createText();
  secondaryLabel.characters = 'Learn More';
  secondaryLabel.fontSize = 18;
  secondaryLabel.fontWeight = 600;
  secondaryLabel.fills = [solidPaint('#111827')];
  secondaryBtn.appendChild(secondaryLabel);
  buttonRow.appendChild(secondaryBtn);

  hero.appendChild(buttonRow);

  return hero;
}

/**
 * Hero (center + left alignment variants) — vertical layout with 24px spacing,
 * multi-size text (60px title with -2.5px letter-spacing, 20px subtitle),
 * nested badge component, horizontal button row with two CTA styles.
 */
export async function buildHero(api: VirtualFigmaApi) {
  const container = api.createFrame();
  container.name = 'Hero';
  setAutoLayout(container, {
    direction: 'VERTICAL',
    spacing: 48,
    sizing: 'HUG',
  });

  const center = await buildHeroVariant(api, 'center');
  container.appendChild(center);

  const left = await buildHeroVariant(api, 'left');
  container.appendChild(left);

  return container;
}
