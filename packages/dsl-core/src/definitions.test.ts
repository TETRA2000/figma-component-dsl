import { describe, it, expect } from 'vitest';
import { VirtualFigmaApi } from './virtual-api.js';
import { solidPaint, gradientPaint, hexToRGB, setAutoLayout, defineTokens, tokenPaint } from './helpers.js';
import { Compiler } from './compiler.js';
import type { DslFigmaApi, DslComponentNode, DslFrameNode } from './types.js';

// Shared color tokens
const tokens = defineTokens({
  primary: '#7c3aed',
  primaryLight: '#a78bfa',
  secondary: '#6366f1',
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  green500: '#22c55e',
  red500: '#ef4444',
  yellow500: '#eab308',
  blue500: '#3b82f6',
});

// --- Button DSL Definition (12 variants: 4 styles × 3 sizes) ---
async function buildButton(api: DslFigmaApi) {
  const styles = [
    { name: 'Primary', fill: gradientPaint([{ color: '#7c3aed', position: 0 }, { color: '#6366f1', position: 1 }], 90), textColor: '#ffffff' },
    { name: 'Secondary', fill: solidPaint('#f3f4f6'), textColor: '#374151' },
    { name: 'Outline', fill: solidPaint('#ffffff', 0), textColor: '#7c3aed' },
    { name: 'Ghost', fill: solidPaint('#ffffff', 0), textColor: '#6b7280' },
  ];
  const sizes = [
    { name: 'Small', padX: 12, padY: 6, fontSize: 12 },
    { name: 'Medium', padX: 16, padY: 8, fontSize: 14 },
    { name: 'Large', padX: 24, padY: 12, fontSize: 16 },
  ];

  const components: DslComponentNode[] = [];
  for (const style of styles) {
    for (const size of sizes) {
      const comp = api.createComponent();
      comp.name = `Style=${style.name}, Size=${size.name}`;
      comp.fills = [style.fill];
      comp.cornerRadius = 999;
      setAutoLayout(comp, {
        direction: 'HORIZONTAL',
        spacing: 8,
        padX: size.padX,
        padY: size.padY,
        align: 'CENTER',
        counterAlign: 'CENTER',
      });

      const label = await api.createText();
      label.characters = 'Button';
      label.fontSize = size.fontSize;
      label.fontWeight = 600;
      label.fills = [solidPaint(style.textColor)];
      comp.appendChild(label);

      comp.addComponentProperty('Label', 'TEXT', 'Button');
      comp.addComponentProperty('Full Width', 'BOOLEAN', false);
      components.push(comp);
    }
  }

  const parent = api.createFrame();
  parent.name = 'Buttons';
  const variantSet = api.combineAsVariants(components, parent);
  return variantSet;
}

// --- Badge DSL Definition (4 variants) ---
async function buildBadge(api: DslFigmaApi) {
  const variants = [
    { name: 'Default', bg: '#f3f4f6', text: '#374151', border: '#d1d5db' },
    { name: 'Success', bg: '#dcfce7', text: '#166534', border: '#86efac' },
    { name: 'Warning', bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
    { name: 'Error', bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  ];

  const components: DslComponentNode[] = [];
  for (const v of variants) {
    const comp = api.createComponent();
    comp.name = `Variant=${v.name}`;
    comp.fills = [solidPaint(v.bg)];
    comp.strokes = [solidPaint(v.border)];
    comp.strokeWeight = 1;
    comp.cornerRadius = 999;
    setAutoLayout(comp, {
      direction: 'HORIZONTAL',
      spacing: 4,
      padX: 8,
      padY: 2,
    });

    const label = await api.createText();
    label.characters = 'Badge';
    label.fontSize = 12;
    label.fontWeight = 500;
    label.fills = [solidPaint(v.text)];
    comp.appendChild(label);

    comp.addComponentProperty('Label', 'TEXT', 'Badge');
    components.push(comp);
  }

  const parent = api.createFrame();
  parent.name = 'Badges';
  return api.combineAsVariants(components, parent);
}

// --- FeatureCard DSL Definition ---
async function buildFeatureCard(api: DslFigmaApi) {
  const comp = api.createComponent();
  comp.name = 'FeatureCard';
  comp.fills = [solidPaint('#ffffff')];
  comp.strokes = [solidPaint('#e5e7eb')];
  comp.strokeWeight = 1;
  comp.cornerRadius = 16;
  comp.clipContent = true;
  setAutoLayout(comp, {
    direction: 'VERTICAL',
    spacing: 12,
    padX: 24,
    padY: 24,
    sizing: 'HUG',
  });

  // Icon placeholder
  const iconFrame = api.createFrame();
  iconFrame.name = 'Icon';
  iconFrame.resize(48, 48);
  iconFrame.fills = [solidPaint('#ede9fe')];
  iconFrame.cornerRadius = 12;
  comp.appendChild(iconFrame);

  comp.addComponentProperty('Icon', 'INSTANCE_SWAP', '');

  // Title
  const title = await api.createText();
  title.characters = 'Feature Title';
  title.fontSize = 18;
  title.fontWeight = 600;
  title.fills = [solidPaint('#111827')];
  comp.appendChild(title);

  // Description
  const desc = await api.createText();
  desc.characters = 'A brief description of this amazing feature and what it does.';
  desc.fontSize = 14;
  desc.fills = [solidPaint('#6b7280')];
  comp.appendChild(desc);

  return comp;
}

// --- TestimonialCard DSL Definition (3 rating variants) ---
async function buildTestimonialCard(api: DslFigmaApi) {
  const ratings = [3, 4, 5];
  const components: DslComponentNode[] = [];

  for (const rating of ratings) {
    const comp = api.createComponent();
    comp.name = `Rating=${rating}`;
    comp.fills = [solidPaint('#ffffff')];
    comp.strokes = [solidPaint('#e5e7eb')];
    comp.strokeWeight = 1;
    comp.cornerRadius = 16;
    setAutoLayout(comp, {
      direction: 'VERTICAL',
      spacing: 16,
      padX: 24,
      padY: 24,
    });

    // Star row
    const starRow = api.createFrame();
    starRow.name = 'Stars';
    setAutoLayout(starRow, { direction: 'HORIZONTAL', spacing: 4 });
    for (let i = 0; i < 5; i++) {
      const star = api.createEllipse();
      star.name = 'Star';
      star.resize(16, 16);
      star.fills = [solidPaint(i < rating ? '#eab308' : '#d1d5db')];
      starRow.appendChild(star);
    }
    comp.appendChild(starRow);

    // Quote text
    const quote = await api.createText();
    quote.characters = '"This product has completely transformed how we work. Highly recommended!"';
    quote.fontSize = 14;
    quote.lineHeight = { value: 165, unit: 'PERCENT' };
    quote.fills = [solidPaint('#374151')];
    comp.appendChild(quote);

    // Author section
    const authorRow = api.createFrame();
    authorRow.name = 'Author';
    setAutoLayout(authorRow, { direction: 'HORIZONTAL', spacing: 12, counterAlign: 'CENTER' });

    const avatar = api.createEllipse();
    avatar.name = 'Avatar';
    avatar.resize(40, 40);
    avatar.fills = [solidPaint('#e5e7eb')];
    authorRow.appendChild(avatar);

    const authorInfo = api.createFrame();
    authorInfo.name = 'AuthorInfo';
    setAutoLayout(authorInfo, { direction: 'VERTICAL', spacing: 2 });

    const authorName = await api.createText();
    authorName.characters = 'Jane Doe';
    authorName.fontSize = 14;
    authorName.fontWeight = 600;
    authorName.fills = [solidPaint('#111827')];
    authorInfo.appendChild(authorName);

    const authorRole = await api.createText();
    authorRole.characters = 'CEO, Acme Inc.';
    authorRole.fontSize = 12;
    authorRole.fills = [solidPaint('#6b7280')];
    authorInfo.appendChild(authorRole);

    authorRow.appendChild(authorInfo);
    comp.appendChild(authorRow);

    components.push(comp);
  }

  const parent = api.createFrame();
  parent.name = 'TestimonialCards';
  return api.combineAsVariants(components, parent);
}

// --- PricingCard DSL Definition (standard + highlighted) ---
async function buildPricingCard(api: DslFigmaApi) {
  const variants = [
    { name: 'Standard', bg: '#ffffff', textColor: '#111827', price: '$9', plan: 'Basic' },
    { name: 'Highlighted', bg: '#1f2937', textColor: '#ffffff', price: '$29', plan: 'Pro' },
  ];

  const components: DslComponentNode[] = [];
  for (const v of variants) {
    const comp = api.createComponent();
    comp.name = `Variant=${v.name}`;
    if (v.name === 'Highlighted') {
      comp.fills = [gradientPaint([{ color: '#1f2937', position: 0 }, { color: '#111827', position: 1 }], 180)];
    } else {
      comp.fills = [solidPaint(v.bg)];
    }
    comp.strokes = [solidPaint('#e5e7eb')];
    comp.strokeWeight = 1;
    comp.cornerRadius = 16;
    setAutoLayout(comp, {
      direction: 'VERTICAL',
      spacing: 24,
      padX: 24,
      padY: 32,
    });

    // Plan name
    const planName = await api.createText();
    planName.characters = v.plan;
    planName.fontSize = 16;
    planName.fontWeight = 600;
    planName.fills = [solidPaint(v.textColor)];
    comp.appendChild(planName);

    // Price
    const price = await api.createText();
    price.characters = v.price;
    price.fontSize = 48;
    price.fontWeight = 700;
    price.fills = [solidPaint(v.textColor)];
    comp.appendChild(price);

    // Period
    const period = await api.createText();
    period.characters = '/month';
    period.fontSize = 14;
    period.fills = [solidPaint(v.name === 'Highlighted' ? '#9ca3af' : '#6b7280')];
    comp.appendChild(period);

    // Divider
    const divider = api.createRectangle();
    divider.name = 'Divider';
    divider.resize(260, 1);
    divider.fills = [solidPaint(v.name === 'Highlighted' ? '#374151' : '#e5e7eb')];
    comp.appendChild(divider);

    // Features list
    const features = ['5 Projects', '10GB Storage', 'Email Support'];
    for (const feature of features) {
      const featureRow = api.createFrame();
      featureRow.name = 'Feature';
      setAutoLayout(featureRow, { direction: 'HORIZONTAL', spacing: 8, counterAlign: 'CENTER' });

      const check = api.createEllipse();
      check.name = 'Check';
      check.resize(20, 20);
      check.fills = [solidPaint('#22c55e')];
      featureRow.appendChild(check);

      const featureText = await api.createText();
      featureText.characters = feature;
      featureText.fontSize = 14;
      featureText.fills = [solidPaint(v.textColor)];
      featureRow.appendChild(featureText);

      comp.appendChild(featureRow);
    }

    // CTA Button
    const cta = api.createFrame();
    cta.name = 'CTA';
    if (v.name === 'Highlighted') {
      cta.fills = [solidPaint('#ffffff')];
    } else {
      cta.fills = [solidPaint('#7c3aed')];
    }
    cta.cornerRadius = 999;
    setAutoLayout(cta, {
      direction: 'HORIZONTAL',
      padX: 24,
      padY: 12,
      align: 'CENTER',
      counterAlign: 'CENTER',
    });

    const ctaLabel = await api.createText();
    ctaLabel.characters = 'Get Started';
    ctaLabel.fontSize = 14;
    ctaLabel.fontWeight = 600;
    ctaLabel.fills = [solidPaint(v.name === 'Highlighted' ? '#111827' : '#ffffff')];
    cta.appendChild(ctaLabel);
    comp.appendChild(cta);

    components.push(comp);
  }

  const parent = api.createFrame();
  parent.name = 'PricingCards';
  return api.combineAsVariants(components, parent);
}

// --- CTABanner DSL Definition ---
async function buildCTABanner(api: DslFigmaApi) {
  const banner = api.createFrame();
  banner.name = 'CTABanner';
  banner.fills = [gradientPaint([
    { color: '#7c3aed', position: 0 },
    { color: '#6366f1', position: 0.5 },
    { color: '#3b82f6', position: 1 },
  ], 135)];
  banner.cornerRadius = 24;
  setAutoLayout(banner, {
    direction: 'VERTICAL',
    spacing: 24,
    padX: 48,
    padY: 48,
    align: 'CENTER',
    counterAlign: 'CENTER',
  });

  const title = await api.createText();
  title.characters = 'Ready to get started?';
  title.fontSize = 36;
  title.fontWeight = 700;
  title.fills = [solidPaint('#ffffff')];
  title.textAlignHorizontal = 'CENTER';
  banner.appendChild(title);

  const subtitle = await api.createText();
  subtitle.characters = 'Join thousands of teams already using our platform.';
  subtitle.fontSize = 18;
  subtitle.fills = [solidPaint('#e0e7ff')];
  subtitle.textAlignHorizontal = 'CENTER';
  banner.appendChild(subtitle);

  // Button row
  const buttonRow = api.createFrame();
  buttonRow.name = 'ButtonRow';
  setAutoLayout(buttonRow, { direction: 'HORIZONTAL', spacing: 16, counterAlign: 'CENTER' });

  // Primary button
  const primaryBtn = api.createFrame();
  primaryBtn.name = 'PrimaryButton';
  primaryBtn.fills = [solidPaint('#ffffff')];
  primaryBtn.cornerRadius = 999;
  setAutoLayout(primaryBtn, { direction: 'HORIZONTAL', padX: 24, padY: 12, align: 'CENTER' });
  const primaryLabel = await api.createText();
  primaryLabel.characters = 'Get Started Free';
  primaryLabel.fontSize = 16;
  primaryLabel.fontWeight = 600;
  primaryLabel.fills = [solidPaint('#7c3aed')];
  primaryBtn.appendChild(primaryLabel);
  buttonRow.appendChild(primaryBtn);

  // Secondary button
  const secondaryBtn = api.createFrame();
  secondaryBtn.name = 'SecondaryButton';
  secondaryBtn.fills = [solidPaint('#ffffff', 0.15)];
  secondaryBtn.strokes = [solidPaint('#ffffff')];
  secondaryBtn.strokeWeight = 1;
  secondaryBtn.cornerRadius = 999;
  setAutoLayout(secondaryBtn, { direction: 'HORIZONTAL', padX: 24, padY: 12, align: 'CENTER' });
  const secondaryLabel = await api.createText();
  secondaryLabel.characters = 'Learn More';
  secondaryLabel.fontSize = 16;
  secondaryLabel.fontWeight = 600;
  secondaryLabel.fills = [solidPaint('#ffffff')];
  secondaryBtn.appendChild(secondaryLabel);
  buttonRow.appendChild(secondaryBtn);

  banner.appendChild(buttonRow);
  return banner;
}

// ========================
// TESTS
// ========================

describe('DSL Test Definitions - Primitives', () => {
  it('should compile Button variants (4 styles × 3 sizes)', async () => {
    const api = new VirtualFigmaApi();
    const variantSet = await buildButton(api);
    expect(variantSet.type).toBe('COMPONENT_SET');
    expect(variantSet.children.length).toBe(12);

    const compiler = new Compiler();
    const result = compiler.compile(variantSet);
    expect(result.errors).toHaveLength(0);
    expect(result.root.type).toBe('COMPONENT_SET');
    expect(result.root.children.length).toBe(12);

    // Verify each variant has correct naming
    for (const child of result.root.children) {
      expect(child.name).toMatch(/Style=\w+, Size=\w+/);
      expect(child.type).toBe('COMPONENT');
    }
  });

  it('should compile Badge variants (4 types)', async () => {
    const api = new VirtualFigmaApi();
    const variantSet = await buildBadge(api);
    expect(variantSet.children.length).toBe(4);

    const compiler = new Compiler();
    const result = compiler.compile(variantSet);
    expect(result.errors).toHaveLength(0);
    expect(result.root.children.length).toBe(4);
  });

  it('should compile FeatureCard with icon placeholder', async () => {
    const api = new VirtualFigmaApi();
    const card = await buildFeatureCard(api);
    expect(card.type).toBe('COMPONENT');

    const compiler = new Compiler();
    const result = compiler.compile(card);
    expect(result.errors).toHaveLength(0);
    expect(result.root.cornerRadius).toBe(16);
    // Should have icon frame, title text, description text
    expect(result.root.children.length).toBe(3);
  });

  it('should compile TestimonialCard variants with star ratings', async () => {
    const api = new VirtualFigmaApi();
    const variantSet = await buildTestimonialCard(api);
    expect(variantSet.children.length).toBe(3);

    const compiler = new Compiler();
    const result = compiler.compile(variantSet);
    expect(result.errors).toHaveLength(0);

    // Each card has: stars row, quote text, author row = 3 children
    for (const card of result.root.children) {
      expect(card.children.length).toBe(3);
    }
  });

  it('should compile PricingCard with standard and highlighted variants', async () => {
    const api = new VirtualFigmaApi();
    const variantSet = await buildPricingCard(api);
    expect(variantSet.children.length).toBe(2);

    const compiler = new Compiler();
    const result = compiler.compile(variantSet);
    expect(result.errors).toHaveLength(0);

    // Highlighted variant should have gradient fill
    const highlighted = result.root.children.find(c => c.name === 'Variant=Highlighted');
    expect(highlighted).toBeDefined();
    expect(highlighted!.fillPaints[0].type).toBe('GRADIENT_LINEAR');
  });

  it('should compile CTABanner with 3-stop gradient', async () => {
    const api = new VirtualFigmaApi();
    const banner = await buildCTABanner(api);

    const compiler = new Compiler();
    const result = compiler.compile(banner);
    expect(result.errors).toHaveLength(0);
    expect(result.root.fillPaints[0].type).toBe('GRADIENT_LINEAR');
    // Should have title, subtitle, button row
    expect(result.root.children.length).toBe(3);
  });

  it('should produce valid JSON for all definitions', async () => {
    const api = new VirtualFigmaApi();
    const banner = await buildCTABanner(api);

    const compiler = new Compiler();
    const json = compiler.compileToJson(banner);
    const parsed = JSON.parse(json);
    expect(parsed.root).toBeDefined();
    expect(parsed.root.guid).toBeDefined();
    expect(parsed.root.type).toBe('FRAME');
    expect(parsed.root.size).toBeDefined();
    expect(parsed.root.transform).toBeDefined();
  });
});

// --- Section-level compositions (Task 11.4) ---

async function buildNavbar(api: DslFigmaApi) {
  const navbar = api.createFrame();
  navbar.name = 'Navbar';
  navbar.resize(1200, 64);
  navbar.fills = [solidPaint('#ffffff')];
  navbar.strokes = [solidPaint('#e5e7eb')];
  navbar.strokeWeight = 1;
  setAutoLayout(navbar, {
    direction: 'HORIZONTAL',
    spacing: 0,
    padX: 24,
    counterAlign: 'CENTER',
    widthSizing: 'FIXED',
    heightSizing: 'FIXED',
  });

  // Logo
  const logo = await api.createText();
  logo.characters = 'Acme';
  logo.fontSize = 20;
  logo.fontWeight = 700;
  logo.fills = [solidPaint('#111827')];
  navbar.appendChild(logo);

  // Spacer (layoutGrow)
  const spacer = api.createFrame();
  spacer.name = 'Spacer';
  spacer.layoutSizingHorizontal = 'FILL';
  navbar.appendChild(spacer);

  // Nav links
  const links = ['Features', 'Pricing', 'About'];
  for (const link of links) {
    const navLink = await api.createText();
    navLink.characters = link;
    navLink.fontSize = 14;
    navLink.fills = [solidPaint('#6b7280')];
    navbar.appendChild(navLink);

    // Add spacing frame between links
    if (link !== links[links.length - 1]) {
      const gap = api.createFrame();
      gap.name = 'Gap';
      gap.resize(24, 1);
      navbar.appendChild(gap);
    }
  }

  // CTA Button
  const cta = api.createFrame();
  cta.name = 'CTA';
  cta.fills = [gradientPaint([{ color: '#7c3aed', position: 0 }, { color: '#6366f1', position: 1 }], 90)];
  cta.cornerRadius = 999;
  setAutoLayout(cta, { direction: 'HORIZONTAL', padX: 16, padY: 8, align: 'CENTER' });
  const ctaLabel = await api.createText();
  ctaLabel.characters = 'Sign Up';
  ctaLabel.fontSize = 14;
  ctaLabel.fontWeight = 600;
  ctaLabel.fills = [solidPaint('#ffffff')];
  cta.appendChild(ctaLabel);
  navbar.appendChild(cta);

  return navbar;
}

async function buildHero(api: DslFigmaApi, variant: 'center' | 'left' = 'center') {
  const hero = api.createFrame();
  hero.name = 'Hero';
  hero.resize(1200, 600);
  hero.fills = [solidPaint('#ffffff')];
  setAutoLayout(hero, {
    direction: 'VERTICAL',
    spacing: 24,
    padX: 80,
    padY: 80,
    align: variant === 'center' ? 'CENTER' : 'MIN',
    counterAlign: variant === 'center' ? 'CENTER' : 'MIN',
    widthSizing: 'FIXED',
  });

  // Badge
  const badge = api.createFrame();
  badge.name = 'Badge';
  badge.fills = [solidPaint('#ede9fe')];
  badge.cornerRadius = 999;
  setAutoLayout(badge, { direction: 'HORIZONTAL', padX: 12, padY: 4 });
  const badgeLabel = await api.createText();
  badgeLabel.characters = 'New Release';
  badgeLabel.fontSize = 12;
  badgeLabel.fontWeight = 500;
  badgeLabel.fills = [solidPaint('#7c3aed')];
  badge.appendChild(badgeLabel);
  hero.appendChild(badge);

  // Title
  const title = await api.createText();
  title.characters = 'Build better products\nwith design systems';
  title.fontSize = 60;
  title.fontWeight = 700;
  title.fills = [solidPaint('#111827')];
  title.textAlignHorizontal = variant === 'center' ? 'CENTER' : 'LEFT';
  hero.appendChild(title);

  // Subtitle
  const subtitle = await api.createText();
  subtitle.characters = 'Create, manage, and deploy your design system components with ease.';
  subtitle.fontSize = 20;
  subtitle.fills = [solidPaint('#6b7280')];
  subtitle.textAlignHorizontal = variant === 'center' ? 'CENTER' : 'LEFT';
  hero.appendChild(subtitle);

  // Button row
  const buttonRow = api.createFrame();
  buttonRow.name = 'ButtonRow';
  setAutoLayout(buttonRow, { direction: 'HORIZONTAL', spacing: 16, counterAlign: 'CENTER' });

  const primaryBtn = api.createFrame();
  primaryBtn.name = 'Primary';
  primaryBtn.fills = [solidPaint('#7c3aed')];
  primaryBtn.cornerRadius = 999;
  setAutoLayout(primaryBtn, { direction: 'HORIZONTAL', padX: 24, padY: 12, align: 'CENTER' });
  const pLabel = await api.createText();
  pLabel.characters = 'Get Started';
  pLabel.fontSize = 16;
  pLabel.fontWeight = 600;
  pLabel.fills = [solidPaint('#ffffff')];
  primaryBtn.appendChild(pLabel);
  buttonRow.appendChild(primaryBtn);

  const secondaryBtn = api.createFrame();
  secondaryBtn.name = 'Secondary';
  secondaryBtn.fills = [solidPaint('#f3f4f6')];
  secondaryBtn.cornerRadius = 999;
  setAutoLayout(secondaryBtn, { direction: 'HORIZONTAL', padX: 24, padY: 12, align: 'CENTER' });
  const sLabel = await api.createText();
  sLabel.characters = 'Learn More';
  sLabel.fontSize = 16;
  sLabel.fontWeight = 600;
  sLabel.fills = [solidPaint('#374151')];
  secondaryBtn.appendChild(sLabel);
  buttonRow.appendChild(secondaryBtn);

  hero.appendChild(buttonRow);
  return hero;
}

async function buildFooter(api: DslFigmaApi) {
  const footer = api.createFrame();
  footer.name = 'Footer';
  footer.resize(1200, 300);
  footer.fills = [solidPaint('#111827')];
  setAutoLayout(footer, {
    direction: 'VERTICAL',
    spacing: 32,
    padX: 48,
    padY: 48,
    widthSizing: 'FIXED',
  });

  // Columns row
  const columnsRow = api.createFrame();
  columnsRow.name = 'Columns';
  setAutoLayout(columnsRow, { direction: 'HORIZONTAL', spacing: 64 });

  const columnData = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers'] },
    { title: 'Support', links: ['Help Center', 'Docs', 'Contact'] },
  ];

  for (const col of columnData) {
    const column = api.createFrame();
    column.name = col.title;
    setAutoLayout(column, { direction: 'VERTICAL', spacing: 12 });

    const colTitle = await api.createText();
    colTitle.characters = col.title;
    colTitle.fontSize = 14;
    colTitle.fontWeight = 600;
    colTitle.fills = [solidPaint('#ffffff')];
    column.appendChild(colTitle);

    for (const link of col.links) {
      const linkText = await api.createText();
      linkText.characters = link;
      linkText.fontSize = 14;
      linkText.fills = [solidPaint('#9ca3af')];
      column.appendChild(linkText);
    }
    columnsRow.appendChild(column);
  }
  footer.appendChild(columnsRow);

  // Divider
  const divider = api.createRectangle();
  divider.name = 'Divider';
  divider.resize(1104, 1);
  divider.fills = [solidPaint('#374151')];
  footer.appendChild(divider);

  // Copyright
  const copyright = await api.createText();
  copyright.characters = '© 2024 Acme Inc. All rights reserved.';
  copyright.fontSize = 14;
  copyright.fills = [solidPaint('#6b7280')];
  footer.appendChild(copyright);

  return footer;
}

describe('DSL Test Definitions - Sections', () => {
  it('should compile Navbar with flex-grow spacer', async () => {
    const api = new VirtualFigmaApi();
    const navbar = await buildNavbar(api);

    const compiler = new Compiler();
    const result = compiler.compile(navbar);
    expect(result.errors).toHaveLength(0);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.size.x).toBe(1200);
    expect(result.root.size.y).toBe(64);
  });

  it('should compile Hero center variant with large text', async () => {
    const api = new VirtualFigmaApi();
    const hero = await buildHero(api, 'center');

    const compiler = new Compiler();
    const result = compiler.compile(hero);
    expect(result.errors).toHaveLength(0);
    // badge, title, subtitle, button row
    expect(result.root.children.length).toBe(4);
  });

  it('should compile Hero left variant', async () => {
    const api = new VirtualFigmaApi();
    const hero = await buildHero(api, 'left');

    const compiler = new Compiler();
    const result = compiler.compile(hero);
    expect(result.errors).toHaveLength(0);
  });

  it('should compile Footer with dark theme and columns', async () => {
    const api = new VirtualFigmaApi();
    const footer = await buildFooter(api);

    const compiler = new Compiler();
    const result = compiler.compile(footer);
    expect(result.errors).toHaveLength(0);
    // columns row, divider, copyright
    expect(result.root.children.length).toBe(3);
    // Columns row should have 3 columns
    const columnsRow = result.root.children[0];
    expect(columnsRow.children.length).toBe(3);
  });

  it('should compile FeatureGrid with card instances', async () => {
    const api = new VirtualFigmaApi();

    // Build a feature card component first
    const cardComp = api.createComponent();
    cardComp.name = 'FeatureCard';
    cardComp.fills = [solidPaint('#ffffff')];
    cardComp.cornerRadius = 16;
    setAutoLayout(cardComp, { direction: 'VERTICAL', spacing: 12, padX: 24, padY: 24 });
    const cardTitle = await api.createText();
    cardTitle.characters = 'Feature';
    cardTitle.fontSize = 18;
    cardTitle.fontWeight = 600;
    cardComp.appendChild(cardTitle);

    // Grid section
    const section = api.createFrame();
    section.name = 'FeatureGrid';
    section.resize(1200, 500);
    setAutoLayout(section, {
      direction: 'VERTICAL',
      spacing: 32,
      padX: 48,
      padY: 48,
      widthSizing: 'FIXED',
    });

    const heading = await api.createText();
    heading.characters = 'Features';
    heading.fontSize = 36;
    heading.fontWeight = 700;
    heading.fills = [solidPaint('#111827')];
    heading.textAlignHorizontal = 'CENTER';
    section.appendChild(heading);

    // Card grid row
    const gridRow = api.createFrame();
    gridRow.name = 'Grid';
    setAutoLayout(gridRow, { direction: 'HORIZONTAL', spacing: 24 });

    for (let i = 0; i < 3; i++) {
      const instance = cardComp.createInstance();
      instance.name = `Card ${i + 1}`;
      gridRow.appendChild(instance);
    }
    section.appendChild(gridRow);

    const compiler = new Compiler();
    const result = compiler.compile(section);
    expect(result.errors).toHaveLength(0);
    // heading + grid row
    expect(result.root.children.length).toBe(2);
    // Grid should have 3 instances
    const grid = result.root.children[1];
    expect(grid.children.length).toBe(3);
    for (const instance of grid.children) {
      expect(instance.type).toBe('INSTANCE');
    }
  });

  it('should compile PricingTable with mixed variant instances', async () => {
    const api = new VirtualFigmaApi();

    // Build pricing card component
    const standardComp = api.createComponent();
    standardComp.name = 'Variant=Standard';
    standardComp.fills = [solidPaint('#ffffff')];
    setAutoLayout(standardComp, { direction: 'VERTICAL', spacing: 16, padX: 24, padY: 24 });
    const sPrice = await api.createText();
    sPrice.characters = '$9/mo';
    sPrice.fontSize = 32;
    standardComp.appendChild(sPrice);

    const proComp = api.createComponent();
    proComp.name = 'Variant=Highlighted';
    proComp.fills = [solidPaint('#1f2937')];
    setAutoLayout(proComp, { direction: 'VERTICAL', spacing: 16, padX: 24, padY: 24 });
    const pPrice = await api.createText();
    pPrice.characters = '$29/mo';
    pPrice.fontSize = 32;
    pPrice.fills = [solidPaint('#ffffff')];
    proComp.appendChild(pPrice);

    const pricingParent = api.createFrame();
    pricingParent.name = 'PricingCards';
    api.combineAsVariants([standardComp, proComp], pricingParent);

    // Pricing table section
    const section = api.createFrame();
    section.name = 'PricingTable';
    section.resize(1200, 500);
    setAutoLayout(section, {
      direction: 'HORIZONTAL',
      spacing: 24,
      padX: 48,
      padY: 48,
      align: 'CENTER',
      counterAlign: 'CENTER',
    });

    const inst1 = standardComp.createInstance();
    inst1.name = 'Basic';
    section.appendChild(inst1);

    const inst2 = proComp.createInstance();
    inst2.name = 'Pro (Highlighted)';
    section.appendChild(inst2);

    const inst3 = standardComp.createInstance();
    inst3.name = 'Enterprise';
    section.appendChild(inst3);

    const compiler = new Compiler();
    const result = compiler.compile(section);
    expect(result.errors).toHaveLength(0);
    expect(result.root.children.length).toBe(3);
    expect(result.root.children[1].type).toBe('INSTANCE');
  });
});
