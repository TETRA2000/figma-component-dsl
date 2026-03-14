/**
 * Real Estate — Property listings, warm tones, elegant card layouts.
 *
 * DSL features stressed: image placeholder rectangles, per-corner radii,
 * SPACE_BETWEEN rows, badge pills, nested vertical/horizontal layout.
 */
import {
  frame, text, rectangle, ellipse,
  solid, gradient, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function propertyCard(name: string, price: string, beds: string, baths: string, sqft: string, imgColor: string) {
  return frame(`Property: ${name}`, {
    size: { x: 400, y: undefined },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    clipContent: true,
    strokes: [{ color: hex('#e8e4df'), weight: 1, align: 'INSIDE' }],
    children: [
      rectangle('Image', { size: { x: 400, y: 220 }, fills: [gradient([
        { hex: imgColor, position: 0 },
        { hex: '#8a8070', position: 1 },
      ], 135)], layoutSizingHorizontal: 'FILL' }),
      frame('Details', { autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }), layoutSizingHorizontal: 'FILL',
        children: [
          frame('PriceRow', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL',
            children: [
              text(price, { fontSize: 24, fontWeight: 700, color: '#1a1a1a' }),
              frame('Badge', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid('#ecfdf5')], cornerRadius: 999,
                children: [text('NEW', { fontSize: 11, fontWeight: 600, color: '#059669' })],
              }),
            ],
          }),
          text(name, { fontSize: 16, fontWeight: 500, color: '#333333' }),
          frame('MetaRow', { autoLayout: horizontal({ spacing: 16 }),
            children: [
              text(`${beds} beds`, { fontSize: 13, fontWeight: 400, color: '#888888' }),
              text(`${baths} baths`, { fontSize: 13, fontWeight: 400, color: '#888888' }),
              text(`${sqft} sqft`, { fontSize: 13, fontWeight: 400, color: '#888888' }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default frame('RealEstatePage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8f6f3')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 80, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('HAVEN', { fontSize: 18, fontWeight: 600, color: '#1a1a1a', letterSpacing: { value: 3, unit: 'PIXELS' } }),
        frame('Links', { autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Buy', { fontSize: 14, fontWeight: 400, color: '#888888' }),
            text('Rent', { fontSize: 14, fontWeight: 400, color: '#888888' }),
            text('Sell', { fontSize: 14, fontWeight: 400, color: '#888888' }),
          ],
        }),
      ],
    }),
    rectangle('Line', { size: { x: 1, y: 1 }, fills: [solid('#e8e4df')], layoutSizingHorizontal: 'FILL' }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Find Your\nDream Home', { fontSize: 56, fontWeight: 700, color: '#1a1a1a', lineHeight: { value: 105, unit: 'PERCENT' } }),
        text('Curated listings in the most desirable neighborhoods.', { fontSize: 18, fontWeight: 400, color: '#888888' }),
      ],
    }),
    frame('Listings', {
      autoLayout: horizontal({ spacing: 24, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        propertyCard('Modern Loft, Brooklyn', '$1,250,000', '3', '2', '1,800', '#c8b8a4'),
        propertyCard('Sunset Villa, Malibu', '$3,450,000', '5', '4', '4,200', '#b8a898'),
        propertyCard('Garden Flat, Chelsea', '$875,000', '2', '1', '1,100', '#a89888'),
      ],
    }),
  ],
});
