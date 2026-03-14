import type { VirtualFigmaApi } from '@figma-dsl/core';
import { solidPaint, gradientPaint, setAutoLayout } from '@figma-dsl/core';

/**
 * Navbar — fixed-width (1200px) horizontal layout with logo, nav links,
 * and CTA button; 1px bottom border stroke; gradient CTA button nested inside.
 */
export async function buildNavbar(api: VirtualFigmaApi) {
  const navbar = api.createFrame();
  navbar.name = 'Navbar';
  navbar.resize(1200, 0);
  navbar.fills = [solidPaint('#ffffff')];
  navbar.strokes = [solidPaint('#e5e7eb')];
  navbar.strokeWeight = 1;

  setAutoLayout(navbar, {
    direction: 'HORIZONTAL',
    spacing: 32,
    padX: 24,
    padY: 16,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
    align: 'SPACE_BETWEEN',
    counterAlign: 'CENTER',
  });

  // Logo
  const logo = await api.createText();
  logo.characters = 'Acme';
  logo.fontSize = 20;
  logo.fontWeight = 700;
  logo.fills = [solidPaint('#7c3aed')];
  navbar.appendChild(logo);

  // Nav links
  const navLinks = api.createFrame();
  navLinks.name = 'NavLinks';
  setAutoLayout(navLinks, {
    direction: 'HORIZONTAL',
    spacing: 32,
    sizing: 'HUG',
    counterAlign: 'CENTER',
  });

  for (const link of ['Features', 'Pricing', 'About', 'Blog']) {
    const linkText = await api.createText();
    linkText.characters = link;
    linkText.fontSize = 14;
    linkText.fontWeight = 500;
    linkText.fills = [solidPaint('#4b5563')];
    navLinks.appendChild(linkText);
  }
  navbar.appendChild(navLinks);

  // CTA Button — gradient
  const cta = api.createFrame();
  cta.name = 'CTA';
  cta.fills = [
    gradientPaint(
      [
        { color: '#7c3aed', position: 0 },
        { color: '#4f46e5', position: 1 },
      ],
      135,
    ),
  ];
  cta.cornerRadius = 9999;
  setAutoLayout(cta, {
    direction: 'HORIZONTAL',
    padX: 16,
    padY: 8,
    sizing: 'HUG',
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const ctaLabel = await api.createText();
  ctaLabel.characters = 'Get Started';
  ctaLabel.fontSize = 14;
  ctaLabel.fontWeight = 600;
  ctaLabel.fills = [solidPaint('#ffffff')];
  cta.appendChild(ctaLabel);
  navbar.appendChild(cta);

  return navbar;
}
