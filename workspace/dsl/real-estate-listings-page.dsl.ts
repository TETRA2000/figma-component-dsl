/**
 * Real Estate Listings — Property cards, filter chips, agent sidebar
 * DSL features: dark header with gradient, SPACE_BETWEEN, mixed font sizes, cornerRadius, strokes
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function filterChip(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8, align: 'CENTER' }),
    fills: [solid(active ? '#0f172a' : '#ffffff')],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#ffffff' : '#64748b' }),
    ],
  });
}

function propertyCard(price: string, address: string, neighborhood: string, beds: number, baths: number, sqft: string) {
  return frame(`Property: ${address}`, {
    autoLayout: vertical({ spacing: 12, padX: 0, padY: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('PropertyImage', {
        size: { x: 280, y: 160 },
        fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#334155', position: 1 }], 135)],
        cornerRadius: { topLeft: 12, topRight: 12, bottomLeft: 0, bottomRight: 0 },
      }),
      frame('PropertyInfo', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
        children: [
          text(price, { fontSize: 22, fontWeight: 700, color: '#0f172a' }),
          text(address, { fontSize: 14, fontWeight: 500, color: '#374151' }),
          text(neighborhood, { fontSize: 13, fontWeight: 400, color: '#9ca3af' }),
          frame('PropertyStats', {
            autoLayout: horizontal({ spacing: 16 }),
            children: [
              text(`${beds} beds`, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
              text(`${baths} baths`, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
              text(`${sqft} sqft`, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
            ],
          }),
        ],
      }),
    ],
  });
}

function agentCard(name: string, phone: string, rating: string, reviews: string) {
  return frame('AgentCard', {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('AgentAvatar', { size: { x: 56, y: 56 }, fills: [solid('#0f172a')] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#0f172a' }),
      text(phone, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
      frame('RatingRow', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'CENTER' }),
        children: [
          text(rating, { fontSize: 13, fontWeight: 600, color: '#f59e0b' }),
          text(`(${reviews} reviews)`, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
        ],
      }),
    ],
  });
}

export default frame('RealEstatePage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafaf8')],
  children: [
    // Dark header
    frame('Header', {
      autoLayout: vertical({ spacing: 12, padX: 120, padY: 48 }),
      fills: [solid('#0f172a')],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Find Your Dream Home', { fontSize: 40, fontWeight: 700, color: '#ffffff' }),
        text('Browse thousands of listings in your area', { fontSize: 16, fontWeight: 400, color: '#94a3b8' }),
        frame('SearchBar', {
          autoLayout: horizontal({ spacing: 12, padX: 20, padY: 14 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          children: [
            text('Search by city, neighborhood, or ZIP code...', { fontSize: 15, fontWeight: 400, color: '#94a3b8' }),
          ],
        }),
      ],
    }),
    // Filter chips
    frame('Filters', {
      autoLayout: horizontal({ spacing: 10, padX: 120, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        filterChip('All', true),
        filterChip('Houses', false),
        filterChip('Apartments', false),
        filterChip('Condos', false),
        filterChip('Townhouses', false),
      ],
    }),
    // Main content
    frame('MainContent', {
      autoLayout: horizontal({ spacing: 32, padX: 120, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('PropertyGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            propertyCard('$450,000', '1234 Maple Street', 'Downtown, Austin TX', 3, 2, '1,850'),
            propertyCard('$725,000', '567 Lakeview Drive', 'Westlake Hills, Austin TX', 4, 3, '2,640'),
            propertyCard('$325,000', '890 Cedar Park Lane', 'Cedar Park, Austin TX', 2, 2, '1,200'),
          ],
        }),
        frame('Sidebar', {
          autoLayout: vertical({ spacing: 16 }),
          children: [
            text('Featured Agent', { fontSize: 15, fontWeight: 600, color: '#0f172a' }),
            agentCard('Sarah Johnson', '(512) 555-0147', '4.9', '127'),
          ],
        }),
      ],
    }),
  ],
});
