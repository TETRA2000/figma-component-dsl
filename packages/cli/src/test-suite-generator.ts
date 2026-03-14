import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export type PropertyCategory =
  | 'corner-radius'
  | 'fills-solid'
  | 'fills-gradient'
  | 'strokes'
  | 'auto-layout-horizontal'
  | 'auto-layout-vertical'
  | 'auto-layout-nested'
  | 'typography'
  | 'opacity'
  | 'clip-content'
  | 'combined'
  | 'hamburger-theme';

export const ALL_CATEGORIES: PropertyCategory[] = [
  'corner-radius',
  'fills-solid',
  'fills-gradient',
  'strokes',
  'auto-layout-horizontal',
  'auto-layout-vertical',
  'auto-layout-nested',
  'typography',
  'opacity',
  'clip-content',
  'combined',
  'hamburger-theme',
];

export interface GenerateTestSuiteOptions {
  outputDir: string;
  properties?: PropertyCategory[];
}

export interface GenerateTestSuiteResult {
  filesGenerated: number;
  categories: PropertyCategory[];
  filePaths: string[];
}

interface TestVariant {
  name: string;
  code: string;
}

function imports(): string {
  return `import { frame, rectangle, text } from '@figma-dsl/core';
import { solid, gradient } from '@figma-dsl/core';
import { horizontal, vertical } from '@figma-dsl/core';
`;
}

function cornerRadiusVariants(): TestVariant[] {
  return [
    {
      name: 'corner-radius-zero',
      code: `${imports()}
export default frame('corner-radius-zero', {
  size: { x: 100, y: 100 },
  fills: [solid('#4A90D9')],
  cornerRadius: 0,
});
`,
    },
    {
      name: 'corner-radius-small',
      code: `${imports()}
export default frame('corner-radius-small', {
  size: { x: 100, y: 100 },
  fills: [solid('#4A90D9')],
  cornerRadius: 1,
});
`,
    },
    {
      name: 'corner-radius-half',
      code: `${imports()}
export default frame('corner-radius-half', {
  size: { x: 100, y: 60 },
  fills: [solid('#4A90D9')],
  cornerRadius: 30,
});
`,
    },
    {
      name: 'corner-radius-exceeds',
      code: `${imports()}
export default frame('corner-radius-exceeds', {
  size: { x: 100, y: 60 },
  fills: [solid('#4A90D9')],
  cornerRadius: 200,
});
`,
    },
    {
      name: 'corner-radius-max',
      code: `${imports()}
export default frame('corner-radius-max', {
  size: { x: 100, y: 100 },
  fills: [solid('#4A90D9')],
  cornerRadius: 9999,
});
`,
    },
  ];
}

function fillsSolidVariants(): TestVariant[] {
  return [
    {
      name: 'fills-solid-single',
      code: `${imports()}
export default rectangle('fills-solid-single', {
  size: { x: 100, y: 100 },
  fills: [solid('#FF0000')],
});
`,
    },
    {
      name: 'fills-solid-semi-transparent',
      code: `${imports()}
export default rectangle('fills-solid-semi-transparent', {
  size: { x: 100, y: 100 },
  fills: [solid('#00FF00', 0.5)],
});
`,
    },
    {
      name: 'fills-solid-multi',
      code: `${imports()}
export default rectangle('fills-solid-multi', {
  size: { x: 100, y: 100 },
  fills: [solid('#FF0000', 0.5), solid('#0000FF', 0.5)],
});
`,
    },
  ];
}

function fillsGradientVariants(): TestVariant[] {
  return [
    {
      name: 'fills-gradient-0deg',
      code: `${imports()}
export default rectangle('fills-gradient-0deg', {
  size: { x: 100, y: 100 },
  fills: [gradient([{ hex: '#FF0000', position: 0 }, { hex: '#0000FF', position: 1 }], 0)],
});
`,
    },
    {
      name: 'fills-gradient-45deg',
      code: `${imports()}
export default rectangle('fills-gradient-45deg', {
  size: { x: 100, y: 100 },
  fills: [gradient([{ hex: '#FF0000', position: 0 }, { hex: '#0000FF', position: 1 }], 45)],
});
`,
    },
    {
      name: 'fills-gradient-90deg',
      code: `${imports()}
export default rectangle('fills-gradient-90deg', {
  size: { x: 100, y: 100 },
  fills: [gradient([{ hex: '#FF0000', position: 0 }, { hex: '#0000FF', position: 1 }], 90)],
});
`,
    },
    {
      name: 'fills-gradient-multi-stop',
      code: `${imports()}
export default rectangle('fills-gradient-multi-stop', {
  size: { x: 100, y: 100 },
  fills: [gradient([
    { hex: '#FF0000', position: 0 },
    { hex: '#00FF00', position: 0.5 },
    { hex: '#0000FF', position: 1 },
  ], 90)],
});
`,
    },
  ];
}

function strokesVariants(): TestVariant[] {
  return [
    {
      name: 'strokes-thin',
      code: `${imports()}
export default rectangle('strokes-thin', {
  size: { x: 100, y: 100 },
  fills: [solid('#FFFFFF')],
  strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 1 }],
});
`,
    },
    {
      name: 'strokes-medium',
      code: `${imports()}
export default rectangle('strokes-medium', {
  size: { x: 100, y: 100 },
  fills: [solid('#FFFFFF')],
  strokes: [{ color: { r: 1, g: 0, b: 0, a: 1 }, weight: 2 }],
});
`,
    },
    {
      name: 'strokes-thick',
      code: `${imports()}
export default rectangle('strokes-thick', {
  size: { x: 100, y: 100 },
  fills: [solid('#FFFFFF')],
  strokes: [{ color: { r: 0, g: 0, b: 1, a: 1 }, weight: 4 }],
});
`,
    },
  ];
}

function autoLayoutHorizontalVariants(): TestVariant[] {
  return [
    {
      name: 'auto-layout-horizontal-basic',
      code: `${imports()}
export default frame('auto-layout-horizontal-basic', {
  fills: [solid('#F0F0F0')],
  autoLayout: horizontal({ spacing: 10, padX: 10, padY: 10 }),
  children: [
    rectangle('child-1', { size: { x: 50, y: 50 }, fills: [solid('#FF0000')] }),
    rectangle('child-2', { size: { x: 50, y: 50 }, fills: [solid('#00FF00')] }),
    rectangle('child-3', { size: { x: 50, y: 50 }, fills: [solid('#0000FF')] }),
  ],
});
`,
    },
    {
      name: 'auto-layout-horizontal-center',
      code: `${imports()}
export default frame('auto-layout-horizontal-center', {
  size: { x: 300, y: 100 },
  fills: [solid('#F0F0F0')],
  autoLayout: horizontal({ spacing: 10, padX: 10, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
  children: [
    rectangle('child-1', { size: { x: 40, y: 30 }, fills: [solid('#FF0000')] }),
    rectangle('child-2', { size: { x: 40, y: 60 }, fills: [solid('#00FF00')] }),
  ],
});
`,
    },
    {
      name: 'auto-layout-horizontal-space-between',
      code: `${imports()}
export default frame('auto-layout-horizontal-space-between', {
  size: { x: 300, y: 60 },
  fills: [solid('#F0F0F0')],
  autoLayout: horizontal({ align: 'SPACE_BETWEEN', padX: 10, padY: 10 }),
  children: [
    rectangle('child-1', { size: { x: 40, y: 40 }, fills: [solid('#FF0000')] }),
    rectangle('child-2', { size: { x: 40, y: 40 }, fills: [solid('#00FF00')] }),
    rectangle('child-3', { size: { x: 40, y: 40 }, fills: [solid('#0000FF')] }),
  ],
});
`,
    },
  ];
}

function autoLayoutVerticalVariants(): TestVariant[] {
  return [
    {
      name: 'auto-layout-vertical-basic',
      code: `${imports()}
export default frame('auto-layout-vertical-basic', {
  fills: [solid('#F0F0F0')],
  autoLayout: vertical({ spacing: 10, padX: 10, padY: 10 }),
  children: [
    rectangle('child-1', { size: { x: 80, y: 30 }, fills: [solid('#FF0000')] }),
    rectangle('child-2', { size: { x: 80, y: 30 }, fills: [solid('#00FF00')] }),
    rectangle('child-3', { size: { x: 80, y: 30 }, fills: [solid('#0000FF')] }),
  ],
});
`,
    },
    {
      name: 'auto-layout-vertical-fill',
      code: `${imports()}
export default frame('auto-layout-vertical-fill', {
  size: { x: 200, y: 200 },
  fills: [solid('#F0F0F0')],
  autoLayout: vertical({ spacing: 10, padX: 10, padY: 10 }),
  children: [
    rectangle('child-1', { size: { x: 80, y: 30 }, fills: [solid('#FF0000')], layoutSizingHorizontal: 'FILL' }),
    rectangle('child-2', { size: { x: 80, y: 30 }, fills: [solid('#00FF00')], layoutSizingHorizontal: 'FILL' }),
  ],
});
`,
    },
  ];
}

function autoLayoutNestedVariants(): TestVariant[] {
  return [
    {
      name: 'auto-layout-nested-basic',
      code: `${imports()}
export default frame('auto-layout-nested-basic', {
  fills: [solid('#E0E0E0')],
  autoLayout: vertical({ spacing: 10, padX: 10, padY: 10 }),
  children: [
    frame('row-1', {
      fills: [solid('#F0F0F0')],
      autoLayout: horizontal({ spacing: 8 }),
      children: [
        rectangle('a', { size: { x: 40, y: 40 }, fills: [solid('#FF0000')] }),
        rectangle('b', { size: { x: 40, y: 40 }, fills: [solid('#00FF00')] }),
      ],
    }),
    frame('row-2', {
      fills: [solid('#F0F0F0')],
      autoLayout: horizontal({ spacing: 8 }),
      children: [
        rectangle('c', { size: { x: 40, y: 40 }, fills: [solid('#0000FF')] }),
        rectangle('d', { size: { x: 40, y: 40 }, fills: [solid('#FFFF00')] }),
      ],
    }),
  ],
});
`,
    },
  ];
}

function typographyVariants(): TestVariant[] {
  return [
    {
      name: 'typography-sizes',
      code: `${imports()}
export default frame('typography-sizes', {
  fills: [solid('#FFFFFF')],
  autoLayout: vertical({ spacing: 8, padX: 10, padY: 10 }),
  children: [
    text('Size 12', { fontSize: 12, color: '#000000' }),
    text('Size 16', { fontSize: 16, color: '#000000' }),
    text('Size 24', { fontSize: 24, color: '#000000' }),
    text('Size 48', { fontSize: 48, color: '#000000' }),
  ],
});
`,
    },
    {
      name: 'typography-weights',
      code: `${imports()}
export default frame('typography-weights', {
  fills: [solid('#FFFFFF')],
  autoLayout: vertical({ spacing: 8, padX: 10, padY: 10 }),
  children: [
    text('Weight 400', { fontSize: 16, fontWeight: 400, color: '#000000' }),
    text('Weight 600', { fontSize: 16, fontWeight: 600, color: '#000000' }),
    text('Weight 700', { fontSize: 16, fontWeight: 700, color: '#000000' }),
  ],
});
`,
    },
    {
      name: 'typography-alignments',
      code: `${imports()}
export default frame('typography-alignments', {
  size: { x: 200, y: 120 },
  fills: [solid('#FFFFFF')],
  autoLayout: vertical({ spacing: 8, padX: 10, padY: 10 }),
  children: [
    text('Left aligned', { fontSize: 14, textAlignHorizontal: 'LEFT', color: '#000000', layoutSizingHorizontal: 'FILL' }),
    text('Center aligned', { fontSize: 14, textAlignHorizontal: 'CENTER', color: '#000000', layoutSizingHorizontal: 'FILL' }),
    text('Right aligned', { fontSize: 14, textAlignHorizontal: 'RIGHT', color: '#000000', layoutSizingHorizontal: 'FILL' }),
  ],
});
`,
    },
    {
      name: 'typography-line-height',
      code: `${imports()}
export default frame('typography-line-height', {
  fills: [solid('#FFFFFF')],
  autoLayout: vertical({ spacing: 8, padX: 10, padY: 10 }),
  children: [
    text('Line height 150%', { fontSize: 16, lineHeight: { value: 150, unit: 'PERCENT' }, color: '#000000' }),
    text('Line height 24px', { fontSize: 16, lineHeight: { value: 24, unit: 'PIXELS' }, color: '#000000' }),
  ],
});
`,
    },
    {
      name: 'typography-letter-spacing',
      code: `${imports()}
export default frame('typography-letter-spacing', {
  fills: [solid('#FFFFFF')],
  autoLayout: vertical({ spacing: 8, padX: 10, padY: 10 }),
  children: [
    text('Normal spacing', { fontSize: 16, letterSpacing: { value: 0, unit: 'PIXELS' }, color: '#000000' }),
    text('Tight spacing', { fontSize: 16, letterSpacing: { value: -0.5, unit: 'PIXELS' }, color: '#000000' }),
    text('Wide spacing', { fontSize: 16, letterSpacing: { value: 2, unit: 'PIXELS' }, color: '#000000' }),
    text('Percent spacing', { fontSize: 16, letterSpacing: { value: 10, unit: 'PERCENT' }, color: '#000000' }),
  ],
});
`,
    },
  ];
}

function opacityVariants(): TestVariant[] {
  return [
    {
      name: 'opacity-zero',
      code: `${imports()}
export default rectangle('opacity-zero', {
  size: { x: 100, y: 100 },
  fills: [solid('#FF0000')],
  opacity: 0,
});
`,
    },
    {
      name: 'opacity-half',
      code: `${imports()}
export default rectangle('opacity-half', {
  size: { x: 100, y: 100 },
  fills: [solid('#FF0000')],
  opacity: 0.5,
});
`,
    },
    {
      name: 'opacity-full',
      code: `${imports()}
export default rectangle('opacity-full', {
  size: { x: 100, y: 100 },
  fills: [solid('#FF0000')],
  opacity: 1,
});
`,
    },
  ];
}

function clipContentVariants(): TestVariant[] {
  return [
    {
      name: 'clip-content-true',
      code: `${imports()}
export default frame('clip-content-true', {
  size: { x: 100, y: 100 },
  fills: [solid('#F0F0F0')],
  clipContent: true,
  children: [
    rectangle('overflow', { size: { x: 150, y: 150 }, fills: [solid('#FF0000')] }),
  ],
});
`,
    },
    {
      name: 'clip-content-false',
      code: `${imports()}
export default frame('clip-content-false', {
  size: { x: 100, y: 100 },
  fills: [solid('#F0F0F0')],
  clipContent: false,
  children: [
    rectangle('overflow', { size: { x: 150, y: 150 }, fills: [solid('#FF0000')] }),
  ],
});
`,
    },
  ];
}

function combinedVariants(): TestVariant[] {
  return [
    {
      name: 'combined-gradient-corner-radius',
      code: `${imports()}
export default frame('combined-gradient-corner-radius', {
  size: { x: 120, y: 80 },
  fills: [gradient([{ hex: '#FF0000', position: 0 }, { hex: '#0000FF', position: 1 }], 45)],
  cornerRadius: 16,
});
`,
    },
    {
      name: 'combined-stroke-auto-layout',
      code: `${imports()}
export default frame('combined-stroke-auto-layout', {
  fills: [solid('#FFFFFF')],
  strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2 }],
  autoLayout: horizontal({ spacing: 8, padX: 12, padY: 12 }),
  children: [
    rectangle('item-1', { size: { x: 40, y: 40 }, fills: [solid('#FF0000')], cornerRadius: 4 }),
    rectangle('item-2', { size: { x: 40, y: 40 }, fills: [solid('#00FF00')], cornerRadius: 4 }),
  ],
});
`,
    },
    {
      name: 'combined-typography-opacity',
      code: `${imports()}
export default frame('combined-typography-opacity', {
  fills: [solid('#333333')],
  autoLayout: vertical({ spacing: 4, padX: 16, padY: 16 }),
  children: [
    text('Full opacity', { fontSize: 18, fontWeight: 700, color: '#FFFFFF' }),
    text('Half opacity text', { fontSize: 14, color: '#FFFFFF' }),
  ],
  opacity: 0.8,
});
`,
    },
  ];
}

function hamburgerThemeVariants(): TestVariant[] {
  return [
    {
      name: 'burger-badge',
      code: `import {
  component, text,
  solid,
  horizontal,
} from '@figma-dsl/core';

export default component('BurgerBadge', {
  autoLayout: horizontal({
    padX: 12,
    padY: 4,
    align: 'CENTER',
    counterAlign: 'CENTER',
    widthSizing: 'HUG',
    heightSizing: 'HUG',
  }),
  fills: [solid('#da291c')],
  cornerRadius: 4,
  componentProperties: [
    { name: 'Label', type: 'TEXT', defaultValue: 'HOT DEAL' },
  ],
  children: [
    text('HOT DEAL', {
      fontSize: 11,
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: { value: 6, unit: 'PERCENT' },
    }),
  ],
});
`,
    },
    {
      name: 'burger-button',
      code: `import {
  component, text,
  solid,
  horizontal,
} from '@figma-dsl/core';

export default component('BurgerButton', {
  autoLayout: horizontal({
    padX: 28,
    padY: 12,
    align: 'CENTER',
    counterAlign: 'CENTER',
    widthSizing: 'HUG',
    heightSizing: 'HUG',
  }),
  fills: [solid('#da291c')],
  cornerRadius: 9999,
  componentProperties: [
    { name: 'Label', type: 'TEXT', defaultValue: 'ORDER NOW' },
  ],
  children: [
    text('ORDER NOW', {
      fontSize: 14,
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: { value: 2, unit: 'PERCENT' },
    }),
  ],
});
`,
    },
    {
      name: 'burger-footer',
      code: `import {
  frame, text,
  solid,
  horizontal,
} from '@figma-dsl/core';

export default frame('BurgerFooter', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({
    padX: 32,
    padY: 0,
    align: 'CENTER',
    counterAlign: 'CENTER',
  }),
  fills: [solid('#292929')],
  children: [
    text('\\u00a9 2026 Burger Shop. All rights reserved.', {
      fontSize: 13,
      fontWeight: 400,
      color: '#999999',
      textAlignHorizontal: 'CENTER',
    }),
  ],
});
`,
    },
    {
      name: 'burger-header',
      code: `import {
  frame, text,
  solid,
  horizontal,
} from '@figma-dsl/core';

export default frame('BurgerHeader', {
  size: { x: 1440, y: 64 },
  autoLayout: horizontal({
    padX: 32,
    padY: 0,
    align: 'SPACE_BETWEEN',
    counterAlign: 'CENTER',
  }),
  fills: [solid('#292929')],
  children: [
    frame('Logo', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('\\ud83c\\udf54', { fontSize: 28, fontWeight: 400, color: '#ffffff' }),
        text('Burger Shop', {
          fontSize: 24,
          fontWeight: 700,
          color: '#ffbc0d',
        }),
      ],
    }),
    frame('Actions', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        frame('OrderBtn', {
          autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffbc0d')],
          cornerRadius: 9999,
          children: [
            text('ORDER NOW', { fontSize: 12, fontWeight: 700, color: '#292929', letterSpacing: { value: 2, unit: 'PERCENT' } }),
          ],
        }),
        text('SIGN IN', {
          fontSize: 12,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: { value: 2, unit: 'PERCENT' },
        }),
      ],
    }),
  ],
});
`,
    },
    {
      name: 'burger-hero',
      code: `import {
  frame, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default frame('BurgerHero', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({
    spacing: 32,
    padX: 64,
    padY: 80,
    align: 'CENTER',
    counterAlign: 'CENTER',
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [
    gradient([
      { hex: '#da291c', position: 0 },
      { hex: '#ff5722', position: 0.5 },
      { hex: '#ffbc0d', position: 1 },
    ], 135),
  ],
  children: [
    frame('Badge', {
      autoLayout: horizontal({ padX: 12, padY: 4 }),
      fills: [solid('#ffbc0d')],
      cornerRadius: 4,
      children: [
        text('LIMITED TIME', { fontSize: 11, fontWeight: 700, color: '#292929', letterSpacing: { value: 6, unit: 'PERCENT' } }),
      ],
    }),
    text('Crafted to Perfection', {
      fontSize: 64,
      fontWeight: 700,
      color: '#ffffff',
      textAlignHorizontal: 'CENTER',
    }),
    text('Discover our new menu items, deals, and rewards', {
      fontSize: 20,
      fontWeight: 400,
      color: '#ffffff',
      textAlignHorizontal: 'CENTER',
    }),
    frame('CTAs', {
      autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
      children: [
        frame('ViewMenu', {
          autoLayout: horizontal({ padX: 36, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#ffbc0d')],
          cornerRadius: 9999,
          children: [
            text('VIEW MENU', { fontSize: 16, fontWeight: 700, color: '#292929', letterSpacing: { value: 2, unit: 'PERCENT' } }),
          ],
        }),
        frame('FindRestaurant', {
          autoLayout: horizontal({ padX: 36, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 9999,
          strokes: [{ color: { r: 1, g: 1, b: 1, a: 1 }, weight: 2, align: 'INSIDE' as const }],
          children: [
            text('FIND A RESTAURANT', { fontSize: 16, fontWeight: 700, color: '#ffffff', letterSpacing: { value: 2, unit: 'PERCENT' } }),
          ],
        }),
      ],
    }),
  ],
});
`,
    },
    {
      name: 'burger-menu-card',
      code: `import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('BurgerMenuCard', {
  size: { x: 260, y: undefined },
  autoLayout: vertical({
    spacing: 0,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [solid('#ffffff')],
  cornerRadius: 12,
  strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' }],
  componentProperties: [
    { name: 'Name', type: 'TEXT', defaultValue: 'Classic Burger' },
    { name: 'Description', type: 'TEXT', defaultValue: 'Two all-beef patties, special sauce, lettuce, cheese.' },
    { name: 'Price', type: 'TEXT', defaultValue: '$5.99' },
    { name: 'Calories', type: 'TEXT', defaultValue: '550 Cal' },
  ],
  children: [
    rectangle('ImageArea', {
      size: { x: 260, y: 195 },
      fills: [
        gradient([
          { hex: '#fff8e1', position: 0 },
          { hex: '#ffecb3', position: 1 },
        ], 135),
      ],
    }),
    frame('Content', {
      size: { x: 260, y: undefined },
      autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, widthSizing: 'FIXED', heightSizing: 'HUG' }),
      children: [
        text('Classic Burger', {
          fontSize: 18,
          fontWeight: 700,
          color: '#292929',
        }),
        text('Two all-beef patties, special sauce, lettuce, cheese.', {
          fontSize: 13,
          fontWeight: 400,
          color: '#6f6f6f',
          lineHeight: { value: 150, unit: 'PERCENT' },
          size: { x: 228, y: undefined },
          textAutoResize: 'HEIGHT',
        }),
        frame('PriceRow', {
          size: { x: 228, y: undefined },
          autoLayout: horizontal({
            spacing: 0,
            align: 'SPACE_BETWEEN',
            counterAlign: 'CENTER',
            widthSizing: 'FIXED',
            heightSizing: 'HUG',
          }),
          children: [
            text('$5.99', {
              fontSize: 20,
              fontWeight: 700,
              color: '#da291c',
            }),
            text('550 Cal', {
              fontSize: 12,
              fontWeight: 400,
              color: '#999999',
            }),
          ],
        }),
      ],
    }),
  ],
});
`,
    },
    {
      name: 'burger-menu-section',
      code: `import {
  frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function menuCard(name: string, description: string, price: string, calories: string, badge?: string) {
  const badgeNode = badge
    ? frame('Badge', {
        autoLayout: horizontal({ padX: 10, padY: 4 }),
        fills: [solid('#da291c')],
        cornerRadius: 4,
        children: [
          text(badge, { fontSize: 10, fontWeight: 700, color: '#ffffff', letterSpacing: { value: 6, unit: 'PERCENT' } }),
        ],
      })
    : null;

  return frame(\`Card: \${name}\`, {
    size: { x: 280, y: undefined },
    autoLayout: vertical({
      spacing: 0,
      widthSizing: 'FIXED',
      heightSizing: 'HUG',
    }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('Image', {
        size: { x: 280, y: 210 },
        fills: [gradient([{ hex: '#fff8e1', position: 0 }, { hex: '#ffecb3', position: 1 }], 135)],
      }),
      frame('Content', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        children: [
          ...(badgeNode ? [badgeNode] : []),
          text(name, { fontSize: 18, fontWeight: 700, color: '#292929' }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#6f6f6f',
            lineHeight: { value: 150, unit: 'PERCENT' },
          }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            children: [
              text(price, { fontSize: 20, fontWeight: 700, color: '#da291c' }),
              text(calories, { fontSize: 12, fontWeight: 400, color: '#999999' }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('BurgerMenuSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({
    spacing: 24,
    padX: 120,
    padY: 64,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [solid('#fafafa')],
  children: [
    frame('SectionHeader', {
      autoLayout: vertical({ spacing: 8 }),
      children: [
        text('Popular Items', { fontSize: 32, fontWeight: 700, color: '#292929' }),
        text('Our most-loved menu items', { fontSize: 16, fontWeight: 400, color: '#6f6f6f' }),
      ],
    }),
    frame('MenuGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      children: [
        menuCard('Classic Burger', 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions.', '$5.99', '550 Cal', 'CLASSIC'),
        menuCard('Quarter Pounder', 'A quarter pound of 100% fresh beef with melty American cheese.', '$6.49', '520 Cal'),
        menuCard('10pc Nuggets', 'Tender, juicy chicken nuggets with your choice of dipping sauce.', '$4.99', '410 Cal', 'FAN FAVORITE'),
        menuCard('Ice Cream Sundae', 'Creamy vanilla soft serve with cookie pieces mixed in.', '$3.99', '510 Cal', 'SWEET TREAT'),
      ],
    }),
  ],
});
`,
    },
    {
      name: 'burger-order-banner',
      code: `import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('BurgerOrderBanner', {
  autoLayout: horizontal({
    spacing: 16,
    padX: 20,
    padY: 16,
    counterAlign: 'CENTER',
    widthSizing: 'HUG',
    heightSizing: 'HUG',
  }),
  fills: [
    gradient([
      { hex: '#ffbc0d', position: 0 },
      { hex: '#ffd54f', position: 1 },
    ], 135),
  ],
  cornerRadius: 12,
  componentProperties: [
    { name: 'Title', type: 'TEXT', defaultValue: 'Free Delivery' },
    { name: 'Subtitle', type: 'TEXT', defaultValue: 'On orders over $20.' },
  ],
  children: [
    rectangle('Icon', {
      size: { x: 36, y: 36 },
      fills: [solid('#ffffff', 0.3)],
      cornerRadius: 18,
    }),
    frame('TextContent', {
      autoLayout: vertical({ spacing: 2 }),
      children: [
        text('Free Delivery', {
          fontSize: 16,
          fontWeight: 700,
          color: '#292929',
        }),
        text('On orders over $20.', {
          fontSize: 13,
          fontWeight: 400,
          color: '#292929',
        }),
      ],
    }),
  ],
});
`,
    },
    {
      name: 'burger-value-section',
      code: `import {
  frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

function valueCard(name: string, price: string, calories: string) {
  return frame(\`Value: \${name}\`, {
    size: { x: 200, y: undefined },
    autoLayout: vertical({
      spacing: 0,
      widthSizing: 'FIXED',
      heightSizing: 'HUG',
    }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0, g: 0, b: 0, a: 0.08 }, weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('Image', {
        size: { x: 200, y: 150 },
        fills: [gradient([{ hex: '#fff8e1', position: 0 }, { hex: '#ffecb3', position: 1 }], 135)],
      }),
      frame('Info', {
        autoLayout: vertical({ spacing: 4, padX: 12, padY: 12 }),
        children: [
          text(name, { fontSize: 15, fontWeight: 700, color: '#292929' }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            children: [
              text(price, { fontSize: 16, fontWeight: 700, color: '#da291c' }),
              text(calories, { fontSize: 11, fontWeight: 400, color: '#999999' }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('BurgerValueSection', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({
    spacing: 24,
    padX: 120,
    padY: 48,
    widthSizing: 'FIXED',
    heightSizing: 'HUG',
  }),
  fills: [solid('#ffbc0d')],
  children: [
    frame('ValueHeader', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        text('$1 $2 $3 Value Menu', { fontSize: 32, fontWeight: 700, color: '#292929' }),
        frame('ValueBadge', {
          autoLayout: horizontal({ padX: 12, padY: 4 }),
          fills: [solid('#292929')],
          cornerRadius: 4,
          children: [
            text('BEST VALUE', { fontSize: 11, fontWeight: 700, color: '#ffbc0d', letterSpacing: { value: 6, unit: 'PERCENT' } }),
          ],
        }),
      ],
    }),
    frame('ValueGrid', {
      autoLayout: horizontal({ spacing: 24 }),
      children: [
        valueCard('Chicken Burger', '$1.69', '400 Cal'),
        valueCard('Small Fries', '$1.89', '220 Cal'),
        valueCard('Hash Brown', '$1.49', '140 Cal'),
        valueCard('Vanilla Cone', '$1.69', '200 Cal'),
        valueCard('Hot Fudge Sundae', '$2.49', '330 Cal'),
      ],
    }),
  ],
});
`,
    },
  ];
}

const CATEGORY_GENERATORS: Record<PropertyCategory, () => TestVariant[]> = {
  'corner-radius': cornerRadiusVariants,
  'fills-solid': fillsSolidVariants,
  'fills-gradient': fillsGradientVariants,
  'strokes': strokesVariants,
  'auto-layout-horizontal': autoLayoutHorizontalVariants,
  'auto-layout-vertical': autoLayoutVerticalVariants,
  'auto-layout-nested': autoLayoutNestedVariants,
  'typography': typographyVariants,
  'opacity': opacityVariants,
  'clip-content': clipContentVariants,
  'combined': combinedVariants,
  'hamburger-theme': hamburgerThemeVariants,
};

export function generateTestSuite(options: GenerateTestSuiteOptions): GenerateTestSuiteResult {
  const categories = options.properties ?? ALL_CATEGORIES;
  const filePaths: string[] = [];

  for (const category of categories) {
    const generator = CATEGORY_GENERATORS[category];
    const variants = generator();
    const categoryDir = join(options.outputDir, category);
    mkdirSync(categoryDir, { recursive: true });

    for (const variant of variants) {
      const filePath = join(categoryDir, `${variant.name}.dsl.ts`);
      writeFileSync(filePath, variant.code);
      filePaths.push(filePath);
    }
  }

  return {
    filesGenerated: filePaths.length,
    categories,
    filePaths,
  };
}
