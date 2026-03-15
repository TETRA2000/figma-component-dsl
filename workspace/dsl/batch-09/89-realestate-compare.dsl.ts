/**
 * Property Comparison — Side-by-side (3 columns), feature rows, winner highlights
 * Batch 9, Page 9: Real Estate
 * DSL Features: component(), line(), strokes, helper functions, mixed sizing
 */
import {
  component, frame, rectangle, text, line,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

const brown = '#78350f';
const green = '#365314';
const cream = '#f5f0e8';
const white = '#ffffff';
const dark = '#1c1917';
const gray = '#78716c';
const border = '#d6d3d1';
const darkGreen = '#166534';
const lightGreen = '#dcfce7';
const lightBrown = '#fef3c7';

export default component('RealEstateCompare', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(cream)],
  children: [
    /* ---- Header ---- */
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 28, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
      children: [
        text('Compare Properties', { fontSize: 26, fontWeight: 700, color: dark }),
        frame('HeaderActions', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            frame('PrintBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 6,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Print', { fontSize: 13, fontWeight: 500, color: dark }),
              ],
            }),
            frame('ShareBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 6,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Share', { fontSize: 13, fontWeight: 500, color: dark }),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ---- Comparison Table ---- */
    frame('ComparisonTable', {
      autoLayout: vertical({ spacing: 0, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        /* Property Headers */
        frame('PropertyHeaders', {
          autoLayout: horizontal({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            /* Label column */
            frame('LabelCol', {
              size: { x: 200, y: undefined },
              autoLayout: vertical({ spacing: 0 }),
            }),
            propertyHeader('742 Evergreen Terrace', '$895,000', 'San Francisco, CA', true),
            propertyHeader('1024 Oak Valley Dr', '$1,250,000', 'Palo Alto, CA', false),
            propertyHeader('88 Marina Blvd', '$1,475,000', 'Sausalito, CA', false),
          ],
        }),

        /* Divider line */
        line('HeaderDivider', {
          size: { x: 1312 },
          strokes: [{ color: hex(border), weight: 2, align: 'CENTER' }],
          layoutSizingHorizontal: 'FILL',
        }),

        /* Feature Rows */
        comparisonSection('Overview', [
          comparisonRow('Price', ['$895,000', '$1,250,000', '$1,475,000'], 0),
          comparisonRow('Price / sqft', ['$484', '$521', '$476'], 2),
          comparisonRow('Year Built', ['2018', '2005', '2020'], 2),
          comparisonRow('Property Type', ['Single Family', 'Single Family', 'Townhouse'], null),
          comparisonRow('Days on Market', ['8', '22', '14'], 0),
        ]),

        comparisonSection('Size & Layout', [
          comparisonRow('Bedrooms', ['3', '4', '5'], 2),
          comparisonRow('Bathrooms', ['2', '3', '3.5'], 2),
          comparisonRow('Square Feet', ['1,850', '2,400', '3,100'], 2),
          comparisonRow('Lot Size', ['5,200 sqft', '8,100 sqft', '4,800 sqft'], 1),
          comparisonRow('Garage', ['2-car', '3-car', '2-car'], 1),
        ]),

        comparisonSection('Features', [
          comparisonRow('Central AC', ['Yes', 'Yes', 'Yes'], null),
          comparisonRow('Pool', ['No', 'Yes', 'No'], 1),
          comparisonRow('Solar Panels', ['Yes', 'No', 'Yes'], null),
          comparisonRow('Smart Home', ['Yes', 'Yes', 'No'], null),
          comparisonRow('Hardwood Floors', ['Yes', 'Yes', 'Yes'], null),
        ]),

        comparisonSection('Costs', [
          comparisonRow('HOA Fees', ['$0', '$150/mo', '$350/mo'], 0),
          comparisonRow('Property Tax', ['$10,740/yr', '$15,000/yr', '$17,700/yr'], 0),
          comparisonRow('Est. Insurance', ['$200/mo', '$280/mo', '$320/mo'], 0),
          comparisonRow('Est. Monthly Payment', ['$4,642', '$6,480', '$7,650'], 0),
        ]),

        comparisonSection('Scores', [
          comparisonRow('Walk Score', ['92', '75', '88'], 0),
          comparisonRow('Transit Score', ['85', '60', '72'], 0),
          comparisonRow('School Rating', ['9/10', '8/10', '7/10'], 0),
        ]),

        /* Winner Summary */
        frame('WinnerSummary', {
          autoLayout: horizontal({ spacing: 0, padY: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('WinnerLabel', {
              size: { x: 200, y: undefined },
              autoLayout: horizontal({ counterAlign: 'CENTER', padY: 12 }),
              children: [
                text('Best Value', { fontSize: 14, fontWeight: 700, color: dark }),
              ],
            }),
            winnerCell('Best Price', true),
            winnerCell('Most Space', false),
            winnerCell('Newest Build', false),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function propertyHeader(address: string, price: string, city: string, best: boolean) {
  return frame(`PH: ${address}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(best ? lightGreen : white)],
    cornerRadius: 12,
    strokes: best
      ? [{ color: hex(darkGreen), weight: 2, align: 'INSIDE' }]
      : [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    children: [
      rectangle(`Thumb: ${address}`, {
        size: { x: 280, y: 140 },
        fills: [solid('#d6d3d1')],
        cornerRadius: 8,
      }),
      text(price, { fontSize: 22, fontWeight: 700, color: brown, textAlignHorizontal: 'CENTER' }),
      text(address, { fontSize: 14, fontWeight: 600, color: dark, textAlignHorizontal: 'CENTER' }),
      text(city, { fontSize: 12, fontWeight: 400, color: gray, textAlignHorizontal: 'CENTER' }),
      ...(best
        ? [
            frame('BestBadge', {
              autoLayout: horizontal({ padX: 10, padY: 4 }),
              fills: [solid(darkGreen)],
              cornerRadius: 999,
              children: [
                text('★ Best Value', { fontSize: 11, fontWeight: 600, color: white }),
              ],
            }),
          ]
        : []),
    ],
  });
}

function comparisonSection(title: string, rows: ReturnType<typeof frame>[]) {
  return frame(`Section: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('SectionLabel', {
        autoLayout: horizontal({ padX: 0, padY: 12 }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid(cream)],
        children: [
          text(title, { fontSize: 14, fontWeight: 700, color: brown }),
        ],
      }),
      ...rows,
    ],
  });
}

function comparisonRow(label: string, values: string[], winnerIdx: number | null) {
  return frame(`Row: ${label}`, {
    autoLayout: horizontal({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: hex('#e7e5e4'), weight: 1, align: 'INSIDE' }],
    children: [
      frame('RowLabel', {
        size: { x: 200, y: undefined },
        autoLayout: horizontal({ padX: 0, padY: 14, counterAlign: 'CENTER' }),
        children: [
          text(label, { fontSize: 14, fontWeight: 500, color: gray }),
        ],
      }),
      ...values.map((val, idx) =>
        frame(`Val: ${label}-${idx}`, {
          autoLayout: horizontal({ padX: 20, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: winnerIdx === idx ? [solid(lightGreen)] : [],
          children: [
            text(val, {
              fontSize: 14,
              fontWeight: winnerIdx === idx ? 700 : 400,
              color: winnerIdx === idx ? darkGreen : dark,
              textAlignHorizontal: 'CENTER',
            }),
          ],
        }),
      ),
    ],
  });
}

function winnerCell(label: string, primary: boolean) {
  return frame(`Winner: ${label}`, {
    autoLayout: horizontal({ padX: 20, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(primary ? lightGreen : lightBrown)],
    cornerRadius: 8,
    children: [
      text(label, { fontSize: 13, fontWeight: 600, color: primary ? darkGreen : brown }),
    ],
  });
}
