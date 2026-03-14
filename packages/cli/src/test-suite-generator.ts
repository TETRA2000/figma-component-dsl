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
  | 'combined';

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
