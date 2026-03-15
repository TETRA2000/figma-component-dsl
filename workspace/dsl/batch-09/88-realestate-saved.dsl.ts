/**
 * Saved Homes — Grid with price alerts, compare button, notes area
 * Batch 9, Page 8: Real Estate
 * DSL Features: component(), strokes, ellipse(), helper functions, mixed sizing
 */
import {
  component, frame, rectangle, text, ellipse,
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
const red = '#dc2626';
const lightRed = '#fef2f2';
const darkGreen = '#166534';
const lightGreen = '#dcfce7';

export default component('RealEstateSavedHomes', {
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
        frame('TitleArea', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('Saved Homes', { fontSize: 26, fontWeight: 700, color: dark }),
            frame('CountBadge', {
              autoLayout: horizontal({ padX: 10, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(brown)],
              cornerRadius: 999,
              children: [
                text('6', { fontSize: 13, fontWeight: 600, color: white }),
              ],
            }),
          ],
        }),
        frame('Actions', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            frame('CompareBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(brown)],
              cornerRadius: 8,
              children: [
                text('Compare Selected', { fontSize: 14, fontWeight: 600, color: white }),
              ],
            }),
            frame('AlertsBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 8,
              strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
              children: [
                text('Manage Alerts', { fontSize: 14, fontWeight: 500, color: dark }),
              ],
            }),
          ],
        }),
      ],
    }),

    /* ---- Price Alerts Banner ---- */
    frame('AlertsBanner', {
      autoLayout: horizontal({ spacing: 0, padX: 64, padY: 16, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(lightGreen)],
      children: [
        frame('AlertInfo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('AlertDot', { size: { x: 8, y: 8 }, fills: [solid(darkGreen)] }),
            text('2 price drops detected on your saved homes', { fontSize: 14, fontWeight: 500, color: darkGreen }),
          ],
        }),
        text('View Details', { fontSize: 14, fontWeight: 600, color: darkGreen, textDecoration: 'UNDERLINE' }),
      ],
    }),

    /* ---- Saved Grid ---- */
    frame('SavedGrid', {
      autoLayout: vertical({ spacing: 24, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Row1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            savedCard('742 Evergreen Terrace', '$895,000', '3', '2', '1,850', 'San Francisco, CA', null, true),
            savedCard('1024 Oak Valley Dr', '$1,250,000', '4', '3', '2,400', 'Palo Alto, CA', { from: '$1,295,000', drop: '−$45K' }, false),
            savedCard('88 Marina Blvd', '$1,475,000', '5', '3.5', '3,100', 'Sausalito, CA', null, false),
          ],
        }),
        frame('Row2', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            savedCard('315 Sunset Ave', '$2,100,000', '6', '4', '4,500', 'Mill Valley, CA', { from: '$2,200,000', drop: '−$100K' }, true),
            savedCard('456 Mission Creek', '$980,000', '3', '2.5', '1,950', 'SoMa, CA', null, false),
            savedCard('2200 Pacific Heights', '$3,250,000', '7', '5', '5,200', 'San Francisco, CA', null, false),
          ],
        }),
      ],
    }),

    /* ---- Notes Section ---- */
    frame('NotesSection', {
      autoLayout: vertical({ spacing: 16, padX: 64, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      children: [
        text('Your Notes', { fontSize: 20, fontWeight: 700, color: dark }),
        frame('NotesArea', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          layoutSizingHorizontal: 'FILL',
          cornerRadius: 10,
          strokes: [{ color: hex(border), weight: 1, align: 'INSIDE' }],
          fills: [solid(cream)],
          children: [
            text(
              'Favorites so far: 742 Evergreen and 315 Sunset Ave. Need to schedule tours for both this weekend. Ask agent about HOA fees for Mission Creek condo.',
              {
                fontSize: 14, fontWeight: 400, color: dark,
                lineHeight: { value: 22, unit: 'PIXELS' },
                size: { x: 800 },
                textAutoResize: 'HEIGHT',
              },
            ),
            text('Last edited: March 14, 2026', { fontSize: 12, fontWeight: 400, color: gray }),
          ],
        }),
      ],
    }),
  ],
});

/* ---- helpers ---- */

function savedCard(
  address: string, price: string, beds: string, baths: string, sqft: string,
  city: string, priceAlert: { from: string; drop: string } | null, selected: boolean,
) {
  return frame(`Saved: ${address}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(white)],
    cornerRadius: 12,
    strokes: selected
      ? [{ color: hex(brown), weight: 2, align: 'INSIDE' }]
      : [{ color: hex(border), weight: 1, align: 'INSIDE' }],
    clipContent: true,
    children: [
      /* Image area */
      frame('ImageArea', {
        size: { x: 400, y: 180 },
        fills: [solid('#d6d3d1')],
        autoLayout: horizontal({ spacing: 0, padX: 12, padY: 12, align: 'SPACE_BETWEEN' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          /* Selection checkbox */
          frame('Checkbox', {
            autoLayout: horizontal({ padX: 0, padY: 0, align: 'CENTER', counterAlign: 'CENTER' }),
            size: { x: 24, y: 24 },
            fills: [solid(selected ? brown : white)],
            cornerRadius: 4,
            strokes: selected ? [] : [{ color: hex(border), weight: 1, align: 'INSIDE' }],
            children: selected
              ? [text('✓', { fontSize: 14, fontWeight: 700, color: white })]
              : [],
          }),
          /* Heart icon */
          frame('Heart', {
            autoLayout: horizontal({ padX: 6, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(white, 0.9)],
            cornerRadius: 999,
            children: [
              text('♥', { fontSize: 16, fontWeight: 400, color: red }),
            ],
          }),
        ],
      }),

      /* Card body */
      frame('CardBody', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          /* Price row with alert */
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
            children: [
              text(price, { fontSize: 20, fontWeight: 700, color: brown }),
              ...(priceAlert
                ? [
                    text(priceAlert.from, {
                      fontSize: 13, fontWeight: 400, color: gray,
                      textDecoration: 'STRIKETHROUGH',
                    }),
                    frame('DropBadge', {
                      autoLayout: horizontal({ padX: 6, padY: 2 }),
                      fills: [solid(lightGreen)],
                      cornerRadius: 4,
                      children: [
                        text(priceAlert.drop, { fontSize: 11, fontWeight: 600, color: darkGreen }),
                      ],
                    }),
                  ]
                : []),
            ],
          }),
          frame('Stats', {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              text(`${beds} beds`, { fontSize: 13, fontWeight: 500, color: gray }),
              text(`${baths} baths`, { fontSize: 13, fontWeight: 500, color: gray }),
              text(`${sqft} sqft`, { fontSize: 13, fontWeight: 500, color: gray }),
            ],
          }),
          text(address, { fontSize: 14, fontWeight: 600, color: dark }),
          text(city, { fontSize: 13, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}
