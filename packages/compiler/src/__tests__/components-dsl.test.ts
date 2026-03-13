import { describe, it, expect } from 'vitest';
import {
  frame,
  text,
  rectangle,
  ellipse,
  component,
  componentSet,
  instance,
  solid,
  gradient,
  stroke,
  horizontal,
  vertical,
} from '../../../dsl-core/src/index.js';
import { compile } from '../compiler.js';

// ---------------------------------------------------------------------------
// 1. Button — horizontal auto-layout frame with gradient fill, text, pill corners
// ---------------------------------------------------------------------------
describe('Button — gradient pill button', () => {
  const buttonNode = frame('Button', {
    size: { x: 160, y: 44 },
    fills: [
      gradient(
        [
          { hex: '#7C3AED', position: 0 },
          { hex: '#4F46E5', position: 1 },
        ],
        90,
      ),
    ],
    cornerRadius: 9999,
    autoLayout: horizontal({
      spacing: 8,
      padX: 24,
      padY: 12,
      align: 'CENTER',
      counterAlign: 'CENTER',
    }),
    children: [
      text('Get Started', {
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 16,
        color: '#FFFFFF',
      }),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(buttonNode);
    expect(result.errors).toEqual([]);
  });

  it('produces the correct node count (frame + text = 2)', () => {
    const result = compile(buttonNode);
    expect(result.nodeCount).toBe(2);
  });

  it('root is a FRAME named "Button"', () => {
    const result = compile(buttonNode);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('Button');
  });

  it('has pill corner radius', () => {
    const result = compile(buttonNode);
    expect(result.root.cornerRadius).toBe(9999);
  });

  it('has a gradient fill', () => {
    const result = compile(buttonNode);
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('GRADIENT_LINEAR');
    expect(result.root.fillPaints[0]!.gradientStops).toHaveLength(2);
  });

  it('has horizontal auto-layout with correct spacing and padding', () => {
    const result = compile(buttonNode);
    expect(result.root.stackMode).toBe('HORIZONTAL');
    expect(result.root.itemSpacing).toBe(8);
    expect(result.root.paddingLeft).toBe(24);
    expect(result.root.paddingRight).toBe(24);
    expect(result.root.paddingTop).toBe(12);
    expect(result.root.paddingBottom).toBe(12);
    expect(result.root.primaryAxisAlignItems).toBe('CENTER');
    expect(result.root.counterAxisAlignItems).toBe('CENTER');
  });

  it('has one TEXT child with correct characters', () => {
    const result = compile(buttonNode);
    expect(result.root.children).toHaveLength(1);
    expect(result.root.children[0]!.type).toBe('TEXT');
    expect(result.root.children[0]!.name).toBe('Get Started');
  });
});

// ---------------------------------------------------------------------------
// 2. Badge — componentSet with 4 variants
// ---------------------------------------------------------------------------
describe('Badge — component set with 4 variants', () => {
  const badgeVariantColors: Record<string, string> = {
    Default: '#6B7280',
    Primary: '#3B82F6',
    Success: '#10B981',
    Warning: '#F59E0B',
  };

  const variants = Object.entries(badgeVariantColors).map(([variant, color]) =>
    component(`Style=${variant}`, {
      size: { x: 80, y: 28 },
      fills: [solid(color)],
      cornerRadius: 9999,
      autoLayout: horizontal({
        spacing: 0,
        padX: 12,
        padY: 4,
        align: 'CENTER',
        counterAlign: 'CENTER',
      }),
      children: [
        text(variant, {
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: 12,
          color: '#FFFFFF',
        }),
      ],
    }),
  );

  const badgeSet = componentSet('Badge', {
    size: { x: 400, y: 100 },
    variantAxes: { Style: ['Default', 'Primary', 'Success', 'Warning'] },
    children: variants,
  });

  it('compiles without errors', () => {
    const result = compile(badgeSet);
    expect(result.errors).toEqual([]);
  });

  it('produces the correct node count (set + 4*(component + text) = 9)', () => {
    const result = compile(badgeSet);
    expect(result.nodeCount).toBe(9);
  });

  it('root is a COMPONENT_SET named "Badge"', () => {
    const result = compile(badgeSet);
    expect(result.root.type).toBe('COMPONENT_SET');
    expect(result.root.name).toBe('Badge');
  });

  it('has 4 COMPONENT children', () => {
    const result = compile(badgeSet);
    expect(result.root.children).toHaveLength(4);
    result.root.children.forEach((child) => {
      expect(child.type).toBe('COMPONENT');
    });
  });

  it('each variant has a solid fill', () => {
    const result = compile(badgeSet);
    result.root.children.forEach((child) => {
      expect(child.fillPaints).toHaveLength(1);
      expect(child.fillPaints[0]!.type).toBe('SOLID');
    });
  });

  it('each variant has pill corners', () => {
    const result = compile(badgeSet);
    result.root.children.forEach((child) => {
      expect(child.cornerRadius).toBe(9999);
    });
  });

  it('each variant has one TEXT child', () => {
    const result = compile(badgeSet);
    result.root.children.forEach((child) => {
      expect(child.children).toHaveLength(1);
      expect(child.children[0]!.type).toBe('TEXT');
    });
  });

  it('variant names match axis values', () => {
    const result = compile(badgeSet);
    const names = result.root.children.map((c) => c.name);
    expect(names).toEqual([
      'Style=Default',
      'Style=Primary',
      'Style=Success',
      'Style=Warning',
    ]);
  });
});

// ---------------------------------------------------------------------------
// 3. FeatureCard — icon placeholder, title, description, border stroke
// ---------------------------------------------------------------------------
describe('FeatureCard — vertical card with icon, title, description', () => {
  const featureCard = frame('FeatureCard', {
    size: { x: 320, y: 240 },
    fills: [solid('#FFFFFF')],
    strokes: [stroke('#E5E7EB', 1)],
    cornerRadius: 16,
    autoLayout: vertical({
      spacing: 16,
      padX: 24,
      padY: 24,
    }),
    children: [
      rectangle('Icon', {
        size: { x: 48, y: 48 },
        fills: [solid('#EEF2FF')],
        cornerRadius: 12,
      }),
      text('Lightning Fast', {
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: 20,
      }),
      text('Deploy in seconds with our optimized build pipeline.', {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: 14,
        color: '#6B7280',
      }),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(featureCard);
    expect(result.errors).toEqual([]);
  });

  it('produces the correct node count (frame + rect + 2 text = 4)', () => {
    const result = compile(featureCard);
    expect(result.nodeCount).toBe(4);
  });

  it('root is a FRAME named "FeatureCard" with 16px corner radius', () => {
    const result = compile(featureCard);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('FeatureCard');
    expect(result.root.cornerRadius).toBe(16);
  });

  it('has a white solid fill', () => {
    const result = compile(featureCard);
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('SOLID');
    const c = result.root.fillPaints[0]!.color!;
    expect(c.r).toBe(1);
    expect(c.g).toBe(1);
    expect(c.b).toBe(1);
  });

  it('has a border stroke', () => {
    const result = compile(featureCard);
    expect(result.root.strokes).toHaveLength(1);
    expect(result.root.strokeWeight).toBe(1);
  });

  it('has vertical auto-layout', () => {
    const result = compile(featureCard);
    expect(result.root.stackMode).toBe('VERTICAL');
    expect(result.root.itemSpacing).toBe(16);
    expect(result.root.paddingLeft).toBe(24);
    expect(result.root.paddingTop).toBe(24);
  });

  it('children are: RECTANGLE icon, TEXT title, TEXT description', () => {
    const result = compile(featureCard);
    expect(result.root.children).toHaveLength(3);
    expect(result.root.children[0]!.type).toBe('RECTANGLE');
    expect(result.root.children[0]!.name).toBe('Icon');
    expect(result.root.children[1]!.type).toBe('TEXT');
    expect(result.root.children[1]!.name).toBe('Lightning Fast');
    expect(result.root.children[2]!.type).toBe('TEXT');
  });
});

// ---------------------------------------------------------------------------
// 4. TestimonialCard — quote, author row, star rating row
// ---------------------------------------------------------------------------
describe('TestimonialCard — quote, author, star rating', () => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    ellipse(`Star${i + 1}`, {
      size: { x: 16, y: 16 },
      fills: [solid('#FBBF24')],
    }),
  );

  const testimonialCard = frame('TestimonialCard', {
    size: { x: 360, y: 280 },
    fills: [solid('#FFFFFF')],
    cornerRadius: 16,
    autoLayout: vertical({
      spacing: 20,
      padX: 24,
      padY: 24,
    }),
    children: [
      text(
        '"This product changed everything for our team. Absolutely incredible."',
        {
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: 16,
          color: '#374151',
        },
      ),
      frame('AuthorRow', {
        size: { x: 312, y: 48 },
        autoLayout: horizontal({
          spacing: 12,
          align: 'MIN',
          counterAlign: 'CENTER',
        }),
        children: [
          ellipse('Avatar', {
            size: { x: 48, y: 48 },
            fills: [solid('#C084FC')],
          }),
          text('Sarah Chen', {
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 14,
          }),
        ],
      }),
      frame('StarRating', {
        size: { x: 120, y: 16 },
        autoLayout: horizontal({
          spacing: 4,
        }),
        children: stars,
      }),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(testimonialCard);
    expect(result.errors).toEqual([]);
  });

  it('produces the correct node count (root + quote + authorRow + avatar + name + starRow + 5 stars = 11)', () => {
    const result = compile(testimonialCard);
    // root(1) + quote(1) + authorRow(1) + avatar(1) + name(1) + starRow(1) + 5 stars = 11
    expect(result.nodeCount).toBe(11);
  });

  it('root is a FRAME named "TestimonialCard"', () => {
    const result = compile(testimonialCard);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('TestimonialCard');
  });

  it('has 3 direct children: quote text, author row, star rating row', () => {
    const result = compile(testimonialCard);
    expect(result.root.children).toHaveLength(3);
    expect(result.root.children[0]!.type).toBe('TEXT');
    expect(result.root.children[1]!.type).toBe('FRAME');
    expect(result.root.children[1]!.name).toBe('AuthorRow');
    expect(result.root.children[2]!.type).toBe('FRAME');
    expect(result.root.children[2]!.name).toBe('StarRating');
  });

  it('author row contains ellipse avatar and text name', () => {
    const result = compile(testimonialCard);
    const authorRow = result.root.children[1]!;
    expect(authorRow.children).toHaveLength(2);
    expect(authorRow.children[0]!.type).toBe('ELLIPSE');
    expect(authorRow.children[0]!.name).toBe('Avatar');
    expect(authorRow.children[1]!.type).toBe('TEXT');
    expect(authorRow.children[1]!.name).toBe('Sarah Chen');
  });

  it('star rating row contains 5 ellipse children', () => {
    const result = compile(testimonialCard);
    const starRow = result.root.children[2]!;
    expect(starRow.children).toHaveLength(5);
    starRow.children.forEach((star) => {
      expect(star.type).toBe('ELLIPSE');
      expect(star.fillPaints).toHaveLength(1);
      expect(star.fillPaints[0]!.type).toBe('SOLID');
    });
  });

  it('star rating row has horizontal layout with 4px spacing', () => {
    const result = compile(testimonialCard);
    const starRow = result.root.children[2]!;
    expect(starRow.stackMode).toBe('HORIZONTAL');
    expect(starRow.itemSpacing).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// 5. PricingCard — title, price, features list, CTA button, 24px corners
// ---------------------------------------------------------------------------
describe('PricingCard — vertical pricing card with nested structures', () => {
  const featureItems = ['Unlimited projects', '10GB storage', 'Priority support'].map(
    (label) =>
      text(label, {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: 14,
        color: '#6B7280',
      }),
  );

  const ctaButton = frame('CTAButton', {
    size: { x: 272, y: 48 },
    fills: [
      gradient(
        [
          { hex: '#7C3AED', position: 0 },
          { hex: '#4F46E5', position: 1 },
        ],
        90,
      ),
    ],
    cornerRadius: 9999,
    autoLayout: horizontal({
      spacing: 0,
      padX: 24,
      padY: 12,
      align: 'CENTER',
      counterAlign: 'CENTER',
    }),
    children: [
      text('Start Free Trial', {
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 16,
        color: '#FFFFFF',
      }),
    ],
  });

  const pricingCard = frame('PricingCard', {
    size: { x: 320, y: 420 },
    fills: [solid('#FFFFFF')],
    strokes: [stroke('#E5E7EB', 1)],
    cornerRadius: 24,
    autoLayout: vertical({
      spacing: 24,
      padX: 24,
      padY: 32,
    }),
    children: [
      text('Pro Plan', {
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: 24,
      }),
      text('$29/mo', {
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: 48,
      }),
      frame('FeaturesList', {
        size: { x: 272, y: 120 },
        autoLayout: vertical({
          spacing: 12,
        }),
        children: featureItems,
      }),
      ctaButton,
    ],
  });

  it('compiles without errors', () => {
    const result = compile(pricingCard);
    expect(result.errors).toEqual([]);
  });

  it('produces the correct node count', () => {
    const result = compile(pricingCard);
    // root(1) + title(1) + price(1) + featuresList(1) + 3 features(3) + ctaButton(1) + ctaText(1) = 9
    expect(result.nodeCount).toBe(9);
  });

  it('root is a FRAME named "PricingCard" with 24px corner radius', () => {
    const result = compile(pricingCard);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('PricingCard');
    expect(result.root.cornerRadius).toBe(24);
  });

  it('has white fill and border stroke', () => {
    const result = compile(pricingCard);
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('SOLID');
    expect(result.root.strokes).toHaveLength(1);
    expect(result.root.strokeWeight).toBe(1);
  });

  it('has vertical layout with 24px spacing', () => {
    const result = compile(pricingCard);
    expect(result.root.stackMode).toBe('VERTICAL');
    expect(result.root.itemSpacing).toBe(24);
    expect(result.root.paddingTop).toBe(32);
    expect(result.root.paddingLeft).toBe(24);
  });

  it('has 4 direct children: title, price, features list, CTA button', () => {
    const result = compile(pricingCard);
    expect(result.root.children).toHaveLength(4);
    expect(result.root.children[0]!.type).toBe('TEXT');
    expect(result.root.children[0]!.name).toBe('Pro Plan');
    expect(result.root.children[1]!.type).toBe('TEXT');
    expect(result.root.children[1]!.name).toBe('$29/mo');
    expect(result.root.children[2]!.type).toBe('FRAME');
    expect(result.root.children[2]!.name).toBe('FeaturesList');
    expect(result.root.children[3]!.type).toBe('FRAME');
    expect(result.root.children[3]!.name).toBe('CTAButton');
  });

  it('features list contains 3 text children with vertical layout', () => {
    const result = compile(pricingCard);
    const featuresList = result.root.children[2]!;
    expect(featuresList.stackMode).toBe('VERTICAL');
    expect(featuresList.itemSpacing).toBe(12);
    expect(featuresList.children).toHaveLength(3);
    featuresList.children.forEach((child) => {
      expect(child.type).toBe('TEXT');
    });
  });

  it('CTA button has gradient fill and pill corners', () => {
    const result = compile(pricingCard);
    const cta = result.root.children[3]!;
    expect(cta.cornerRadius).toBe(9999);
    expect(cta.fillPaints).toHaveLength(1);
    expect(cta.fillPaints[0]!.type).toBe('GRADIENT_LINEAR');
    expect(cta.children).toHaveLength(1);
    expect(cta.children[0]!.type).toBe('TEXT');
    expect(cta.children[0]!.name).toBe('Start Free Trial');
  });
});

// ---------------------------------------------------------------------------
// 6. CTABanner — 3-stop gradient, centered vertical layout, button row
// ---------------------------------------------------------------------------
describe('CTABanner — gradient banner with centered content and button row', () => {
  const ctaBanner = frame('CTABanner', {
    size: { x: 800, y: 320 },
    fills: [
      gradient(
        [
          { hex: '#7C3AED', position: 0 },
          { hex: '#4F46E5', position: 0.5 },
          { hex: '#2563EB', position: 1 },
        ],
        135,
      ),
    ],
    cornerRadius: 24,
    autoLayout: vertical({
      spacing: 24,
      padX: 48,
      padY: 48,
      align: 'CENTER',
      counterAlign: 'CENTER',
    }),
    children: [
      text('Ready to Get Started?', {
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: 36,
        color: '#FFFFFF',
        textAlignHorizontal: 'CENTER',
      }),
      text('Join thousands of teams already using our platform.', {
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: 18,
        color: '#E0E7FF',
        textAlignHorizontal: 'CENTER',
      }),
      frame('ButtonRow', {
        size: { x: 340, y: 48 },
        autoLayout: horizontal({
          spacing: 16,
          align: 'CENTER',
          counterAlign: 'CENTER',
        }),
        children: [
          frame('PrimaryBtn', {
            size: { x: 160, y: 48 },
            fills: [solid('#FFFFFF')],
            cornerRadius: 9999,
            autoLayout: horizontal({
              spacing: 0,
              padX: 24,
              padY: 12,
              align: 'CENTER',
              counterAlign: 'CENTER',
            }),
            children: [
              text('Get Started', {
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: 16,
                color: '#4F46E5',
              }),
            ],
          }),
          frame('SecondaryBtn', {
            size: { x: 160, y: 48 },
            fills: [solid('#FFFFFF', 0.15)],
            strokes: [stroke('#FFFFFF', 1)],
            cornerRadius: 9999,
            autoLayout: horizontal({
              spacing: 0,
              padX: 24,
              padY: 12,
              align: 'CENTER',
              counterAlign: 'CENTER',
            }),
            children: [
              text('Learn More', {
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: 16,
                color: '#FFFFFF',
              }),
            ],
          }),
        ],
      }),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(ctaBanner);
    expect(result.errors).toEqual([]);
  });

  it('produces the correct node count', () => {
    const result = compile(ctaBanner);
    // root(1) + title(1) + subtitle(1) + buttonRow(1) + primaryBtn(1) + primaryText(1) + secondaryBtn(1) + secondaryText(1) = 8
    expect(result.nodeCount).toBe(8);
  });

  it('root is a FRAME named "CTABanner"', () => {
    const result = compile(ctaBanner);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('CTABanner');
  });

  it('has a 3-stop gradient fill', () => {
    const result = compile(ctaBanner);
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('GRADIENT_LINEAR');
    expect(result.root.fillPaints[0]!.gradientStops).toHaveLength(3);
    expect(result.root.fillPaints[0]!.gradientStops![0]!.position).toBe(0);
    expect(result.root.fillPaints[0]!.gradientStops![1]!.position).toBe(0.5);
    expect(result.root.fillPaints[0]!.gradientStops![2]!.position).toBe(1);
  });

  it('has centered vertical auto-layout', () => {
    const result = compile(ctaBanner);
    expect(result.root.stackMode).toBe('VERTICAL');
    expect(result.root.itemSpacing).toBe(24);
    expect(result.root.primaryAxisAlignItems).toBe('CENTER');
    expect(result.root.counterAxisAlignItems).toBe('CENTER');
    expect(result.root.paddingLeft).toBe(48);
    expect(result.root.paddingTop).toBe(48);
  });

  it('has 3 direct children: title, subtitle, button row', () => {
    const result = compile(ctaBanner);
    expect(result.root.children).toHaveLength(3);
    expect(result.root.children[0]!.type).toBe('TEXT');
    expect(result.root.children[0]!.name).toBe('Ready to Get Started?');
    expect(result.root.children[1]!.type).toBe('TEXT');
    expect(result.root.children[2]!.type).toBe('FRAME');
    expect(result.root.children[2]!.name).toBe('ButtonRow');
  });

  it('button row has horizontal layout with 2 button children', () => {
    const result = compile(ctaBanner);
    const buttonRow = result.root.children[2]!;
    expect(buttonRow.stackMode).toBe('HORIZONTAL');
    expect(buttonRow.itemSpacing).toBe(16);
    expect(buttonRow.children).toHaveLength(2);
    expect(buttonRow.children[0]!.name).toBe('PrimaryBtn');
    expect(buttonRow.children[1]!.name).toBe('SecondaryBtn');
  });

  it('primary button has solid white fill and pill corners', () => {
    const result = compile(ctaBanner);
    const primaryBtn = result.root.children[2]!.children[0]!;
    expect(primaryBtn.cornerRadius).toBe(9999);
    expect(primaryBtn.fillPaints).toHaveLength(1);
    expect(primaryBtn.fillPaints[0]!.type).toBe('SOLID');
    const c = primaryBtn.fillPaints[0]!.color!;
    expect(c.r).toBe(1);
    expect(c.g).toBe(1);
    expect(c.b).toBe(1);
  });

  it('secondary button has translucent fill and white stroke', () => {
    const result = compile(ctaBanner);
    const secondaryBtn = result.root.children[2]!.children[1]!;
    expect(secondaryBtn.cornerRadius).toBe(9999);
    expect(secondaryBtn.fillPaints).toHaveLength(1);
    expect(secondaryBtn.fillPaints[0]!.opacity).toBe(0.15);
    expect(secondaryBtn.strokes).toHaveLength(1);
    expect(secondaryBtn.strokeWeight).toBe(1);
  });
});
