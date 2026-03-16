/**
 * Farmers Market Directory — Vendor cards, seasonal produce, market map placeholder
 * DSL features: warm earthy palette, gradient produce images, vendor pills, two-column
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function vendorCard(name: string, type: string, items: string[], color: string) {
  return frame(`Vendor:${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.9, g: 0.85, b: 0.75, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('VendorHeader', {
        autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
        children: [
          rectangle(`VIcon:${name}`, { size: { x: 32, y: 32 }, fills: [solid(color)], cornerRadius: 8 }),
          frame('VendorInfo', {
            autoLayout: vertical({ spacing: 1 }),
            children: [
              text(name, { fontSize: 14, fontWeight: 600, color: '#292524' }),
              text(type, { fontSize: 11, fontWeight: 400, color: '#a8a29e' }),
            ],
          }),
        ],
      }),
      frame('ItemPills', {
        autoLayout: horizontal({ spacing: 6 }),
        children: items.map(item => frame(`Pill:${item}`, {
          autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
          fills: [solid('#fef3c7')],
          cornerRadius: 9999,
          children: [text(item, { fontSize: 10, fontWeight: 500, color: '#92400e' })],
        })),
      }),
    ],
  });
}

function produceCard(name: string, season: string, colors: [string, string]) {
  return frame(`Produce:${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 0, padY: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Img:${name}`, {
        size: { x: 200, y: 120 },
        fills: [gradient([{ hex: colors[0], position: 0 }, { hex: colors[1], position: 1 }], 140)],
        cornerRadius: 10,
        layoutSizingHorizontal: 'FILL',
      }),
      text(name, { fontSize: 13, fontWeight: 600, color: '#292524' }),
      text(season, { fontSize: 11, fontWeight: 400, color: '#a8a29e' }),
    ],
  });
}

export default frame('FarmersMarketPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 28, padX: 44, padY: 36 }),
  fills: [solid('#faf6f0')],
  children: [
    frame('MarketHeader', {
      autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Sunnyvale Farmers Market', { fontSize: 28, fontWeight: 700, color: '#292524', textAlignHorizontal: 'CENTER' }),
        text('Every Saturday, 8 AM - 1 PM  |  Downtown Plaza', { fontSize: 13, fontWeight: 400, color: '#a8a29e', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('LeftCol', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Vendors', { fontSize: 18, fontWeight: 600, color: '#292524' }),
            vendorCard('Green Valley Farm', 'Organic Produce', ['Tomatoes', 'Kale', 'Peppers'], '#22c55e'),
            vendorCard('Sunny Bee Apiary', 'Honey & Beeswax', ['Raw Honey', 'Honeycomb'], '#f59e0b'),
            vendorCard('Heritage Bakery', 'Artisan Breads', ['Sourdough', 'Rye', 'Focaccia'], '#d97706'),
            vendorCard('Mountain Dairy', 'Cheese & Yogurt', ['Goat Cheese', 'Greek Yogurt'], '#3b82f6'),
          ],
        }),
        frame('RightCol', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Seasonal Picks', { fontSize: 18, fontWeight: 600, color: '#292524' }),
            produceCard('Heirloom Tomatoes', 'Peak season: Jun - Sep', ['#fca5a5', '#dc2626']),
            produceCard('Sweet Corn', 'Peak season: Jul - Sep', ['#fde68a', '#ca8a04']),
            produceCard('Fresh Strawberries', 'Peak season: Apr - Jun', ['#fda4af', '#e11d48']),
            frame('MapSection', {
              autoLayout: vertical({ spacing: 8 }),
              children: [
                text('Market Map', { fontSize: 16, fontWeight: 600, color: '#292524' }),
                rectangle('MapPlaceholder', {
                  size: { x: 350, y: 160 },
                  fills: [solid('#f5f0e8')],
                  cornerRadius: 10,
                  strokes: [{ color: { r: 0.85, g: 0.8, b: 0.7, a: 1 }, weight: 1, align: 'INSIDE' as const }],
                  layoutSizingHorizontal: 'FILL',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
