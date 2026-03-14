import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, setAutoLayout } from '@figma-dsl/core';

const LINK_COLUMNS = [
  { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Docs'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
  { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'Security'] },
];

/**
 * Footer — dark background (#030712), multi-column horizontal layout with 64px spacing,
 * 3 link columns (Product/Company/Support), 1px divider line,
 * vertical stacking of top section + copyright.
 */
export async function buildFooter(api: VirtualFigmaApi) {
  const footer = api.createFrame();
  footer.name = 'Footer';
  footer.resize(1200, 0);
  footer.fills = [solidPaint('#030712')];

  setAutoLayout(footer, {
    direction: 'VERTICAL',
    spacing: 32,
    padX: 24,
    padTop: 64,
    padBottom: 32,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  });

  // Top section — horizontal with brand + columns
  const topSection = api.createFrame();
  topSection.name = 'TopSection';
  setAutoLayout(topSection, {
    direction: 'HORIZONTAL',
    spacing: 64,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  // Brand column
  const brand = api.createFrame();
  brand.name = 'Brand';
  setAutoLayout(brand, {
    direction: 'VERTICAL',
    spacing: 16,
    widthSizing: 'FILL',
    heightSizing: 'HUG',
  });

  const logo = await api.createText();
  logo.characters = 'Acme';
  logo.fontSize = 20;
  logo.fontWeight = 700;
  logo.fills = [solidPaint('#a78bfa')];
  brand.appendChild(logo);

  const desc = await api.createText();
  desc.characters = 'Building the future of\ncomponent development.';
  desc.fontSize = 14;
  desc.fills = [solidPaint('#9ca3af')];
  desc.lineHeight = { value: 165, unit: 'PERCENT' };
  brand.appendChild(desc);

  topSection.appendChild(brand);

  // Link columns
  for (const col of LINK_COLUMNS) {
    const column = api.createFrame();
    column.name = col.title;
    setAutoLayout(column, {
      direction: 'VERTICAL',
      spacing: 12,
      sizing: 'HUG',
    });

    const title = await api.createText();
    title.characters = col.title;
    title.fontSize = 14;
    title.fontWeight = 700;
    title.fills = [solidPaint('#f3f4f6')];
    column.appendChild(title);

    for (const link of col.links) {
      const linkText = await api.createText();
      linkText.characters = link;
      linkText.fontSize = 14;
      linkText.fills = [solidPaint('#9ca3af')];
      column.appendChild(linkText);
    }

    topSection.appendChild(column);
  }

  footer.appendChild(topSection);

  // Divider
  const divider = api.createFrame();
  divider.name = 'Divider';
  divider.resize(0, 1);
  divider.fills = [solidPaint('#1f2937')];
  setAutoLayout(divider, {
    direction: 'HORIZONTAL',
    widthSizing: 'FILL',
    heightSizing: 'FIXED',
  });
  footer.appendChild(divider);

  // Copyright
  const copyright = await api.createText();
  copyright.characters = '© 2026 Acme Inc. All rights reserved.';
  copyright.fontSize = 14;
  copyright.fills = [solidPaint('#6b7280')];
  footer.appendChild(copyright);

  return footer;
}
