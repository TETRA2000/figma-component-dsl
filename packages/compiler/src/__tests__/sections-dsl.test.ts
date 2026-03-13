import { describe, it, expect } from 'vitest';
import { compile } from '../compiler.js';
import {
  frame,
  text,
  rectangle,
  instance,
  hex,
  solid,
  gradient,
  stroke,
  horizontal,
  vertical,
} from '../../../dsl-core/src/index.js';

// ---------------------------------------------------------------------------
// Section-level DSL composition tests
// These exercise deeply nested, realistic page-section definitions and verify
// the compiler handles them without errors.
// ---------------------------------------------------------------------------

describe('Section compositions — Navbar', () => {
  // Structure (9 nodes):
  //   Navbar (frame)                        1
  //     Logo (text)                          2
  //     Spacer (frame)                       3
  //     NavLinks (frame)                     4
  //       Link-Home (text)                   5
  //       Link-About (text)                  6
  //       Link-Contact (text)                7
  //     CTAButton (frame)                    8
  //       CTALabel (text)                    9

  const navbar = frame('Navbar', {
    size: { x: 1200, y: 64 },
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 12, counterAlign: 'CENTER' }),
    strokes: [stroke('#E5E7EB', 1, 'INSIDE')],
    fills: [solid('#FFFFFF')],
    children: [
      text('Acme', { fontFamily: 'Inter', fontWeight: 700, fontSize: 20 }, 'Logo'),

      frame('Spacer', { layoutGrow: 1 }),

      frame('NavLinks', {
        autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
        children: [
          text('Home', { fontSize: 14 }, 'Link-Home'),
          text('About', { fontSize: 14 }, 'Link-About'),
          text('Contact', { fontSize: 14 }, 'Link-Contact'),
        ],
      }),

      frame('CTAButton', {
        size: { x: 120, y: 40 },
        cornerRadius: 8,
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [
          gradient(
            [
              { hex: '#6366F1', position: 0 },
              { hex: '#8B5CF6', position: 1 },
            ],
            90,
          ),
        ],
        children: [
          text('Get Started', { fontSize: 14, fontWeight: 600, color: '#FFFFFF' }, 'CTALabel'),
        ],
      }),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(navbar);
    expect(result.errors).toEqual([]);
  });

  it('has correct node count', () => {
    const result = compile(navbar);
    expect(result.nodeCount).toBe(9);
  });

  it('root is a horizontal frame named Navbar at 1200×64', () => {
    const result = compile(navbar);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('Navbar');
    expect(result.root.size).toEqual({ x: 1200, y: 64 });
    expect(result.root.stackMode).toBe('HORIZONTAL');
  });

  it('has 4 direct children', () => {
    const result = compile(navbar);
    expect(result.root.children).toHaveLength(4);
  });

  it('has a bottom border stroke', () => {
    const result = compile(navbar);
    expect(result.root.strokes).toHaveLength(1);
    expect(result.root.strokeWeight).toBe(1);
  });
});

describe('Section compositions — Hero', () => {
  // Structure (9 nodes):
  //   Hero (frame)                          1
  //     Badge (instance)                    2
  //     HeroTitle (text)                    3
  //     HeroSubtitle (text)                 4
  //     ButtonRow (frame)                   5
  //       PrimaryBtn (frame)               6
  //         PrimaryLabel (text)            7
  //       SecondaryBtn (frame)             8
  //         SecondaryLabel (text)          9

  const hero = frame('Hero', {
    size: { x: 1200, y: 600 },
    autoLayout: vertical({ spacing: 24, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#FFFFFF')],
    children: [
      instance('Badge'),

      text(
        'Build faster with our platform',
        { fontFamily: 'Inter', fontWeight: 700, fontSize: 60, textAlignHorizontal: 'CENTER' },
        'HeroTitle',
      ),

      text(
        'Ship production-ready apps in days, not months.',
        { fontSize: 20, textAlignHorizontal: 'CENTER' },
        'HeroSubtitle',
      ),

      frame('ButtonRow', {
        autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
        children: [
          frame('PrimaryBtn', {
            size: { x: 180, y: 48 },
            cornerRadius: 8,
            fills: [solid('#6366F1')],
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            children: [
              text('Start Free Trial', { fontSize: 16, fontWeight: 600, color: '#FFFFFF' }, 'PrimaryLabel'),
            ],
          }),
          frame('SecondaryBtn', {
            size: { x: 160, y: 48 },
            cornerRadius: 8,
            strokes: [stroke('#D1D5DB', 1)],
            autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
            children: [
              text('Learn More', { fontSize: 16, fontWeight: 500 }, 'SecondaryLabel'),
            ],
          }),
        ],
      }),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(hero);
    expect(result.errors).toEqual([]);
  });

  it('has correct node count', () => {
    const result = compile(hero);
    expect(result.nodeCount).toBe(9);
  });

  it('root is a vertical frame named Hero at 1200×600', () => {
    const result = compile(hero);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('Hero');
    expect(result.root.size).toEqual({ x: 1200, y: 600 });
    expect(result.root.stackMode).toBe('VERTICAL');
  });

  it('has 4 direct children (badge, title, subtitle, button row)', () => {
    const result = compile(hero);
    expect(result.root.children).toHaveLength(4);
  });

  it('first child is an instance referencing Badge', () => {
    const result = compile(hero);
    expect(result.root.children[0]!.type).toBe('INSTANCE');
    expect(result.root.children[0]!.componentId).toBe('Badge');
  });
});

describe('Section compositions — Stats', () => {
  // Structure (13 nodes):
  //   Stats (frame)                          1
  //     Stat1 (frame)                        2
  //       Value1 (text)                      3
  //       Label1 (text)                      4
  //     Divider1 (rectangle)                 5
  //     Stat2 (frame)                        6
  //       Value2 (text)                      7
  //       Label2 (text)                      8
  //     Divider2 (rectangle)                 9
  //     Stat3 (frame)                       10
  //       Value3 (text)                     11
  //       Label3 (text)                     12
  //     -- wait, recount --
  // Actually: Stats, Stat1, Value1, Label1, Div1, Stat2, Value2, Label2, Div2, Stat3, Value3, Label3 = 12
  // Hmm let me recount flat:
  //   1:Stats 2:Stat1 3:Value1 4:Label1 5:Divider1 6:Stat2 7:Value2 8:Label2 9:Divider2 10:Stat3 11:Value3 12:Label3
  // That's 12 nodes.

  function statGroup(value: string, label: string, idx: number) {
    return frame(`Stat${idx}`, {
      autoLayout: vertical({ spacing: 4, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutGrow: 1,
      children: [
        text(value, { fontFamily: 'Inter', fontWeight: 700, fontSize: 36, color: '#6366F1' }, `Value${idx}`),
        text(label, { fontSize: 14, color: '#6B7280' }, `Label${idx}`),
      ],
    });
  }

  function divider(idx: number) {
    return rectangle(`Divider${idx}`, {
      size: { x: 1, y: 48 },
      fills: [solid('#E5E7EB')],
    });
  }

  const stats = frame('Stats', {
    size: { x: 1200, y: 120 },
    autoLayout: horizontal({ spacing: 0, padX: 48, counterAlign: 'CENTER' }),
    fills: [solid('#F9FAFB')],
    children: [
      statGroup('10K+', 'Active Users', 1),
      divider(1),
      statGroup('99.9%', 'Uptime', 2),
      divider(2),
      statGroup('50M+', 'Requests / day', 3),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(stats);
    expect(result.errors).toEqual([]);
  });

  it('has correct node count', () => {
    const result = compile(stats);
    expect(result.nodeCount).toBe(12);
  });

  it('root is a horizontal frame named Stats', () => {
    const result = compile(stats);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('Stats');
    expect(result.root.size).toEqual({ x: 1200, y: 120 });
    expect(result.root.stackMode).toBe('HORIZONTAL');
  });

  it('has 5 direct children (3 stat groups + 2 dividers)', () => {
    const result = compile(stats);
    expect(result.root.children).toHaveLength(5);
  });

  it('stat groups each have 2 text children', () => {
    const result = compile(stats);
    // Children at indices 0, 2, 4 are stat groups
    expect(result.root.children[0]!.children).toHaveLength(2);
    expect(result.root.children[2]!.children).toHaveLength(2);
    expect(result.root.children[4]!.children).toHaveLength(2);
  });

  it('dividers are rectangles sized 1×48', () => {
    const result = compile(stats);
    expect(result.root.children[1]!.type).toBe('RECTANGLE');
    expect(result.root.children[1]!.size).toEqual({ x: 1, y: 48 });
    expect(result.root.children[3]!.type).toBe('RECTANGLE');
    expect(result.root.children[3]!.size).toEqual({ x: 1, y: 48 });
  });
});

describe('Section compositions — Footer', () => {
  // Structure:
  //   Footer (frame)                          1
  //     TopSection (frame)                    2
  //       Column1 (frame)                     3
  //         Header1 (text)                    4
  //         Link1a (text)                     5
  //         Link1b (text)                     6
  //       Column2 (frame)                     7
  //         Header2 (text)                    8
  //         Link2a (text)                     9
  //         Link2b (text)                    10
  //       Column3 (frame)                    11
  //         Header3 (text)                   12
  //         Link3a (text)                    13
  //         Link3b (text)                    14
  //     Divider (rectangle)                  15
  //     Copyright (text)                     16
  // Total: 16 nodes

  function linkColumn(title: string, links: string[], idx: number) {
    return frame(`Column${idx}`, {
      autoLayout: vertical({ spacing: 8 }),
      layoutGrow: 1,
      children: [
        text(title, { fontWeight: 600, fontSize: 14, color: '#FFFFFF' }, `Header${idx}`),
        ...links.map((l, i) =>
          text(l, { fontSize: 14, color: '#9CA3AF' }, `Link${idx}${String.fromCharCode(97 + i)}`),
        ),
      ],
    });
  }

  const footer = frame('Footer', {
    size: { x: 1200, y: 280 },
    autoLayout: vertical({ spacing: 24, padX: 48, padY: 40 }),
    fills: [solid('#030712')],
    children: [
      frame('TopSection', {
        autoLayout: horizontal({ spacing: 48 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          linkColumn('Product', ['Features', 'Pricing'], 1),
          linkColumn('Company', ['About', 'Careers'], 2),
          linkColumn('Legal', ['Privacy', 'Terms'], 3),
        ],
      }),
      rectangle('Divider', {
        size: { x: 1104, y: 1 },
        fills: [solid('#1F2937')],
      }),
      text(
        '\u00A9 2026 Acme Inc. All rights reserved.',
        { fontSize: 12, color: '#6B7280' },
        'Copyright',
      ),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(footer);
    expect(result.errors).toEqual([]);
  });

  it('has correct node count', () => {
    const result = compile(footer);
    expect(result.nodeCount).toBe(16);
  });

  it('root is a vertical frame with dark background', () => {
    const result = compile(footer);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('Footer');
    expect(result.root.size).toEqual({ x: 1200, y: 280 });
    expect(result.root.stackMode).toBe('VERTICAL');
    expect(result.root.fillPaints).toHaveLength(1);
    expect(result.root.fillPaints[0]!.type).toBe('SOLID');
  });

  it('has 3 direct children (top section, divider, copyright)', () => {
    const result = compile(footer);
    expect(result.root.children).toHaveLength(3);
  });

  it('top section contains 3 link columns', () => {
    const result = compile(footer);
    const topSection = result.root.children[0]!;
    expect(topSection.children).toHaveLength(3);
    // Each column has header + 2 links = 3 children
    expect(topSection.children[0]!.children).toHaveLength(3);
    expect(topSection.children[1]!.children).toHaveLength(3);
    expect(topSection.children[2]!.children).toHaveLength(3);
  });

  it('divider is a 1px tall rectangle', () => {
    const result = compile(footer);
    const divider = result.root.children[1]!;
    expect(divider.type).toBe('RECTANGLE');
    expect(divider.size).toEqual({ x: 1104, y: 1 });
  });
});

describe('Section compositions — FeatureGrid', () => {
  // Structure:
  //   FeatureGrid (frame)                    1
  //     HeaderSection (frame)                2
  //       GridTitle (text)                   3
  //       GridSubtitle (text)                4
  //     CardRow (frame)                      5
  //       FeatureCard-1 (instance)           6
  //       FeatureCard-2 (instance)           7
  //       FeatureCard-3 (instance)           8
  // Total: 8 nodes

  const featureGrid = frame('FeatureGrid', {
    size: { x: 1200, y: 480 },
    autoLayout: vertical({ spacing: 48, counterAlign: 'CENTER', padX: 48, padY: 64 }),
    fills: [solid('#FFFFFF')],
    children: [
      frame('HeaderSection', {
        autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          text('Everything you need', { fontWeight: 700, fontSize: 36, textAlignHorizontal: 'CENTER' }, 'GridTitle'),
          text(
            'Powerful features to help you build, ship, and scale.',
            { fontSize: 18, color: '#6B7280', textAlignHorizontal: 'CENTER' },
            'GridSubtitle',
          ),
        ],
      }),
      frame('CardRow', {
        autoLayout: horizontal({ spacing: 24 }),
        children: [
          instance('FeatureCard', { Title: 'Lightning Fast', Icon: 'bolt' }),
          instance('FeatureCard', { Title: 'Secure by Default', Icon: 'shield' }),
          instance('FeatureCard', { Title: 'Scales Infinitely', Icon: 'cloud' }),
        ],
      }),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(featureGrid);
    expect(result.errors).toEqual([]);
  });

  it('has correct node count', () => {
    const result = compile(featureGrid);
    expect(result.nodeCount).toBe(8);
  });

  it('root is a vertical frame named FeatureGrid', () => {
    const result = compile(featureGrid);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('FeatureGrid');
    expect(result.root.size).toEqual({ x: 1200, y: 480 });
    expect(result.root.stackMode).toBe('VERTICAL');
  });

  it('has 2 direct children (header section and card row)', () => {
    const result = compile(featureGrid);
    expect(result.root.children).toHaveLength(2);
  });

  it('card row contains 3 FeatureCard instances', () => {
    const result = compile(featureGrid);
    const cardRow = result.root.children[1]!;
    expect(cardRow.children).toHaveLength(3);
    for (const card of cardRow.children) {
      expect(card.type).toBe('INSTANCE');
      expect(card.componentId).toBe('FeatureCard');
    }
  });
});

describe('Section compositions — FAQ', () => {
  // Structure:
  //   FAQ (frame)                            1
  //     FAQTitle (text)                      2
  //     Item1 (frame)                        3
  //       Question1 (text)                   4
  //       Chevron1 (rectangle)               5
  //     Separator1 (rectangle)               6
  //     Item2 (frame)                        7
  //       Question2 (text)                   8
  //       Chevron2 (rectangle)               9
  //     Separator2 (rectangle)              10
  //     Item3 (frame)                       11
  //       Question3 (text)                  12
  //       Chevron3 (rectangle)              13
  // Total: 13 nodes

  const questions = [
    'What is included in the free plan?',
    'How do I upgrade my subscription?',
    'Can I cancel anytime?',
  ];

  function faqItem(q: string, idx: number) {
    return frame(`Item${idx}`, {
      size: { x: 720, y: 56 },
      autoLayout: horizontal({ padX: 16, padY: 16, counterAlign: 'CENTER' }),
      children: [
        text(q, { fontSize: 16, fontWeight: 500 }, `Question${idx}`),
        rectangle(`Chevron${idx}`, { size: { x: 12, y: 12 }, fills: [solid('#9CA3AF')] }),
      ],
    });
  }

  function separator(idx: number) {
    return rectangle(`Separator${idx}`, {
      size: { x: 720, y: 1 },
      fills: [solid('#E5E7EB')],
    });
  }

  const faq = frame('FAQ', {
    size: { x: 720, y: 420 },
    autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER', padY: 48 }),
    fills: [solid('#FFFFFF')],
    children: [
      text('Frequently Asked Questions', { fontWeight: 700, fontSize: 28, textAlignHorizontal: 'CENTER' }, 'FAQTitle'),
      faqItem(questions[0]!, 1),
      separator(1),
      faqItem(questions[1]!, 2),
      separator(2),
      faqItem(questions[2]!, 3),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(faq);
    expect(result.errors).toEqual([]);
  });

  it('has correct node count', () => {
    const result = compile(faq);
    expect(result.nodeCount).toBe(13);
  });

  it('root is a vertical frame named FAQ at 720px wide', () => {
    const result = compile(faq);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('FAQ');
    expect(result.root.size).toEqual({ x: 720, y: 420 });
    expect(result.root.stackMode).toBe('VERTICAL');
  });

  it('has 6 direct children (title + 3 items + 2 separators)', () => {
    const result = compile(faq);
    expect(result.root.children).toHaveLength(6);
  });

  it('each FAQ item is a horizontal frame with question text and chevron', () => {
    const result = compile(faq);
    // Items are at indices 1, 3, 5
    for (const idx of [1, 3, 5]) {
      const item = result.root.children[idx]!;
      expect(item.type).toBe('FRAME');
      expect(item.stackMode).toBe('HORIZONTAL');
      expect(item.children).toHaveLength(2);
      expect(item.children[0]!.type).toBe('TEXT');
      expect(item.children[1]!.type).toBe('RECTANGLE');
    }
  });

  it('separators are 1px tall rectangles', () => {
    const result = compile(faq);
    for (const idx of [2, 4]) {
      const sep = result.root.children[idx]!;
      expect(sep.type).toBe('RECTANGLE');
      expect(sep.size).toEqual({ x: 720, y: 1 });
    }
  });
});

describe('Section compositions — PricingTable', () => {
  // Structure:
  //   PricingTable (frame)                   1
  //     PricingHeader (frame)                2
  //       PricingTitle (text)                3
  //       PricingSubtitle (text)             4
  //     PricingRow (frame)                   5
  //       PricingCard-basic (instance)       6
  //       PricingCard-pro (instance)         7
  //       PricingCard-enterprise (instance)  8
  // Total: 8 nodes

  const pricingTable = frame('PricingTable', {
    size: { x: 1200, y: 640 },
    autoLayout: vertical({ spacing: 48, counterAlign: 'CENTER', padX: 48, padY: 64 }),
    fills: [solid('#F9FAFB')],
    children: [
      frame('PricingHeader', {
        autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
        children: [
          text(
            'Simple, transparent pricing',
            { fontWeight: 700, fontSize: 36, textAlignHorizontal: 'CENTER' },
            'PricingTitle',
          ),
          text(
            'No hidden fees. Cancel anytime.',
            { fontSize: 18, color: '#6B7280', textAlignHorizontal: 'CENTER' },
            'PricingSubtitle',
          ),
        ],
      }),
      frame('PricingRow', {
        autoLayout: horizontal({ spacing: 24, counterAlign: 'MIN' }),
        children: [
          instance('PricingCard', { Plan: 'Basic', Price: '$9', Highlighted: false }),
          instance('PricingCard', { Plan: 'Pro', Price: '$29', Highlighted: true }),
          instance('PricingCard', { Plan: 'Enterprise', Price: '$99', Highlighted: false }),
        ],
      }),
    ],
  });

  it('compiles without errors', () => {
    const result = compile(pricingTable);
    expect(result.errors).toEqual([]);
  });

  it('has correct node count', () => {
    const result = compile(pricingTable);
    expect(result.nodeCount).toBe(8);
  });

  it('root is a vertical frame named PricingTable', () => {
    const result = compile(pricingTable);
    expect(result.root.type).toBe('FRAME');
    expect(result.root.name).toBe('PricingTable');
    expect(result.root.size).toEqual({ x: 1200, y: 640 });
    expect(result.root.stackMode).toBe('VERTICAL');
  });

  it('has 2 direct children (header and pricing row)', () => {
    const result = compile(pricingTable);
    expect(result.root.children).toHaveLength(2);
  });

  it('pricing row contains 3 PricingCard instances', () => {
    const result = compile(pricingTable);
    const row = result.root.children[1]!;
    expect(row.children).toHaveLength(3);
    for (const card of row.children) {
      expect(card.type).toBe('INSTANCE');
      expect(card.componentId).toBe('PricingCard');
    }
  });

  it('middle card (Pro) has Highlighted override set to true', () => {
    const result = compile(pricingTable);
    const proCard = result.root.children[1]!.children[1]!;
    expect(proCard.overriddenProperties).toEqual({
      Plan: 'Pro',
      Price: '$29',
      Highlighted: true,
    });
  });
});
