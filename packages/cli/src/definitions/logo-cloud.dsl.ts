import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, setAutoLayout } from '@figma-dsl/core';

const LOGOS = ['Stripe', 'Vercel', 'GitHub', 'Figma', 'Linear', 'Notion'];

/**
 * LogoCloud (grid + scroll variants) — horizontal logo row with 48px spacing,
 * logo text placeholders, centered header.
 */
export async function buildLogoCloud(api: VirtualFigmaApi) {
  const section = api.createFrame();
  section.name = 'LogoCloud';
  section.resize(1200, 0);

  setAutoLayout(section, {
    direction: 'VERTICAL',
    spacing: 32,
    padY: 64,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
    counterAlign: 'CENTER',
  });

  // Header
  const title = await api.createText();
  title.characters = 'TRUSTED BY LEADING COMPANIES';
  title.fontSize = 14;
  title.fontWeight = 600;
  title.fills = [solidPaint('#9ca3af')];
  title.letterSpacing = { value: 2.5, unit: 'PERCENT' };
  title.textAlignHorizontal = 'CENTER';
  section.appendChild(title);

  // Logo row — horizontal with 48px spacing
  const logoRow = api.createFrame();
  logoRow.name = 'LogoRow';
  setAutoLayout(logoRow, {
    direction: 'HORIZONTAL',
    spacing: 48,
    sizing: 'HUG',
    counterAlign: 'CENTER',
  });

  for (const name of LOGOS) {
    // Logo placeholder — rectangle with text
    const logoWrap = api.createFrame();
    logoWrap.name = name;
    setAutoLayout(logoWrap, {
      direction: 'HORIZONTAL',
      padX: 16,
      padY: 16,
      sizing: 'HUG',
      align: 'CENTER',
      counterAlign: 'CENTER',
    });

    const logoText = await api.createText();
    logoText.characters = name;
    logoText.fontSize = 18;
    logoText.fontWeight = 700;
    logoText.fills = [solidPaint('#9ca3af')];
    logoWrap.appendChild(logoText);

    logoRow.appendChild(logoWrap);
  }

  section.appendChild(logoRow);

  return section;
}
