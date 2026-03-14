import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';

/**
 * CTABanner — 3-stop dark gradient background (indigo to purple),
 * centered vertical layout with 32px spacing, nested horizontal button row
 * with contrasting styles (solid white + transparent outline), 24px corner radius.
 */
export async function buildCTABanner(api: VirtualFigmaApi) {
  const banner = api.createFrame();
  banner.name = 'CTABanner';
  banner.resize(800, 0);
  banner.fills = [
    gradientPaint(
      [
        { color: '#1e1b4b', position: 0 },
        { color: '#312e81', position: 0.5 },
        { color: '#4c1d95', position: 1 },
      ],
      135,
    ),
  ];
  banner.cornerRadius = 24;
  banner.clipContent = true;

  setAutoLayout(banner, {
    direction: 'VERTICAL',
    spacing: 32,
    padX: 64,
    padY: 64,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  // Title
  const title = await api.createText();
  title.characters = 'Ready to get started?';
  title.fontSize = 36;
  title.fontWeight = 700;
  title.fills = [solidPaint('#ffffff')];
  title.textAlignHorizontal = 'CENTER';
  title.letterSpacing = { value: -2.5, unit: 'PERCENT' };
  banner.appendChild(title);

  // Subtitle
  const subtitle = await api.createText();
  subtitle.characters = 'Join thousands of developers building\namazing products with our platform.';
  subtitle.fontSize = 18;
  subtitle.fills = [solidPaint('#ffffff', 0.7)];
  subtitle.textAlignHorizontal = 'CENTER';
  subtitle.lineHeight = { value: 165, unit: 'PERCENT' };
  banner.appendChild(subtitle);

  // Button row
  const buttonRow = api.createFrame();
  buttonRow.name = 'Actions';
  setAutoLayout(buttonRow, {
    direction: 'HORIZONTAL',
    spacing: 16,
    sizing: 'HUG',
    align: 'CENTER',
  });

  // Primary button — solid white
  const primaryBtn = api.createFrame();
  primaryBtn.name = 'PrimaryButton';
  primaryBtn.fills = [solidPaint('#ffffff')];
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
  primaryLabel.characters = 'Start Free Trial';
  primaryLabel.fontSize = 18;
  primaryLabel.fontWeight = 600;
  primaryLabel.fills = [solidPaint('#4c1d95')];
  primaryBtn.appendChild(primaryLabel);
  buttonRow.appendChild(primaryBtn);

  // Secondary button — transparent outline
  const secondaryBtn = api.createFrame();
  secondaryBtn.name = 'SecondaryButton';
  secondaryBtn.strokes = [solidPaint('#ffffff', 0.3)];
  secondaryBtn.strokeWeight = 2;
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
  secondaryLabel.fills = [solidPaint('#ffffff', 0.8)];
  secondaryBtn.appendChild(secondaryLabel);
  buttonRow.appendChild(secondaryBtn);

  banner.appendChild(buttonRow);

  return banner;
}
