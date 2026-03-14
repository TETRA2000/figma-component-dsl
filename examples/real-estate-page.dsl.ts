import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

const emerald = '#059669';
const emeraldBg = '#ecfdf5';
const dark = '#111827';
const med = '#6b7280';
const white = '#ffffff';
const bg = '#f9fafb';
const border = '#e5e7eb';

function priceTag(price: string) {
  return text(price, { fontSize: 22, fontWeight: 700, color: emerald });
}

function propertyDetail(icon: string, value: string) {
  return frame(`Detail: ${icon}`, {
    autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
    children: [
      ellipse(`${icon}Ico`, { size: { x: 14, y: 14 }, fills: [solid(med, 0.3)] }),
      text(value, { fontSize: 13, fontWeight: 400, color: med }),
    ],
  });
}

function propertyCard(title: string, address: string, price: string, beds: string, baths: string, sqft: string, g1: string, g2: string, tag?: string) {
  return frame(`Property: ${title}`, {
    autoLayout: vertical({ spacing: 0 }),
    size: { x: 340, y: undefined },
    cornerRadius: 12,
    clipContent: true,
    fills: [solid(white)],
    strokes: [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('PropertyImage', {
        size: { x: 340, y: 200 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)],
        autoLayout: horizontal({ padX: 10, padY: 10, align: 'SPACE_BETWEEN' }),
        children: [
          ...(tag ? [frame('Tag', {
            autoLayout: horizontal({ padX: 8, padY: 4 }),
            fills: [solid(emerald)],
            cornerRadius: 6,
            children: [text(tag, { fontSize: 11, fontWeight: 600, color: white })],
          })] : []),
        ],
      }),
      frame('PropertyInfo', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          priceTag(price),
          text(title, { fontSize: 16, fontWeight: 600, color: dark }),
          text(address, { fontSize: 13, fontWeight: 400, color: med }),
          frame('Details', {
            autoLayout: horizontal({ spacing: 16 }),
            children: [
              propertyDetail('Bed', `${beds} beds`),
              propertyDetail('Bath', `${baths} baths`),
              propertyDetail('Sqft', sqft),
            ],
          }),
        ],
      }),
    ],
  });
}

function filterChip(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 8 }),
    fills: active ? [solid(emerald)] : [solid(white)],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.82, g: 0.84, b: 0.86, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? white : med }),
    ],
  });
}

function statItem(value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 2, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(value, { fontSize: 28, fontWeight: 700, color: emerald }),
      text(label, { fontSize: 12, fontWeight: 400, color: med }),
    ],
  });
}

export default frame('RealEstate', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(white)],
      strokes: [{ color: { r: 0.9, g: 0.91, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('HomeFind', { fontSize: 20, fontWeight: 700, color: emerald }),
        frame('Nav', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            text('Buy', { fontSize: 14, fontWeight: 600, color: dark }),
            text('Rent', { fontSize: 14, fontWeight: 400, color: med }),
            text('Sell', { fontSize: 14, fontWeight: 400, color: med }),
            text('Agents', { fontSize: 14, fontWeight: 400, color: med }),
          ],
        }),
      ],
    }),
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 20, padX: 48, padY: 40, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#064e3b', position: 0 }, { hex: '#065f46', position: 1 }], 135)],
      children: [
        text('Find Your Dream Home', { fontSize: 36, fontWeight: 700, color: white, textAlignHorizontal: 'CENTER' as const }),
        text('Browse thousands of properties in your area', { fontSize: 16, fontWeight: 400, color: '#a7f3d0' }),
        frame('SearchBar', {
          autoLayout: horizontal({ spacing: 0, padX: 20, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          fills: [solid(white)],
          cornerRadius: 12,
          size: { x: 700, y: undefined },
          children: [
            text('Enter city, ZIP, or address...', { fontSize: 14, fontWeight: 400, color: med }),
            frame('SearchBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(emerald)],
              cornerRadius: 8,
              children: [text('Search', { fontSize: 14, fontWeight: 600, color: white })],
            }),
          ],
        }),
        frame('QuickStats', {
          autoLayout: horizontal({ spacing: 48 }),
          children: [
            statItem('2,400+', 'Properties'),
            statItem('150+', 'Cities'),
            statItem('98%', 'Satisfaction'),
          ],
        }),
      ],
    }),
    frame('FilterBar', {
      autoLayout: horizontal({ spacing: 8, padX: 48, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        filterChip('All', true),
        filterChip('Houses', false),
        filterChip('Apartments', false),
        filterChip('Condos', false),
        filterChip('Townhouses', false),
      ],
    }),
    frame('Listings', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ListingHeader', {
          autoLayout: horizontal({ align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Featured Properties', { fontSize: 22, fontWeight: 700, color: dark }),
            text('View All →', { fontSize: 14, fontWeight: 500, color: emerald }),
          ],
        }),
        frame('PropertyGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          children: [
            propertyCard('Modern Villa', '1234 Oak Street, Austin TX', '$895,000', '4', '3', '2,800 sqft', '#8b5cf6', '#6d28d9', 'New'),
            propertyCard('Downtown Loft', '567 Main Ave, Portland OR', '$425,000', '2', '2', '1,200 sqft', '#0891b2', '#0e7490'),
            propertyCard('Family Home', '890 Maple Dr, Denver CO', '$650,000', '5', '3', '3,100 sqft', '#d97706', '#b45309', 'Reduced'),
            propertyCard('Beach Cottage', '23 Ocean Blvd, Malibu CA', '$1,250,000', '3', '2', '1,800 sqft', '#0284c7', '#0369a1'),
          ],
        }),
      ],
    }),
  ],
});
