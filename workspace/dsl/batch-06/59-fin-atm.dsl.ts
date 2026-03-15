/**
 * ATM/Branch Finder — Map placeholder, location list, filters
 * Batch 6, Page 59: Finance (loosen variant-union)
 * DSL Features: FIXED width sidebar, FILL map area, strokes, ellipses
 */
import {
  component, frame, rectangle, text, ellipse,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

function filterChip(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? '#0f172a' : '#ffffff')],
    cornerRadius: 20,
    strokes: active ? [] : [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: active ? '#ffffff' : '#475569' }),
    ],
  });
}

function locationCard(name: string, address: string, type: string, distance: string, hours: string) {
  return frame(`Location: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16 }),
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      frame('LocationHeader', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          ellipse('TypeDot', {
            size: { x: 8, y: 8 },
            fills: [solid(type === 'ATM' ? '#f59e0b' : '#0284c7')],
          }),
          text(name, { fontSize: 14, fontWeight: 600, color: '#1e293b', layoutSizingHorizontal: 'FILL' }),
          text(distance, { fontSize: 13, fontWeight: 600, color: '#0284c7' }),
        ],
      }),
      text(address, { fontSize: 13, fontWeight: 400, color: '#64748b' }),
      frame('LocationMeta', {
        autoLayout: horizontal({ spacing: 12 }),
        children: [
          text(type, { fontSize: 12, fontWeight: 500, color: '#6b7280' }),
          text(hours, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
        ],
      }),
    ],
  });
}

export default component('ATMFinder', {
  size: { x: 1440, y: 900 },
  autoLayout: horizontal({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    // Sidebar
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 0 }),
      size: { x: 400, y: undefined },
      layoutSizingVertical: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        // Search
        frame('SearchArea', {
          autoLayout: vertical({ spacing: 12, padX: 16, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Find ATMs & Branches', { fontSize: 18, fontWeight: 700, color: '#0f172a' }),
            frame('SearchInput', {
              autoLayout: horizontal({ padX: 12, padY: 10, counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid('#f1f5f9')],
              cornerRadius: 8,
              children: [
                text('Search by address or ZIP', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
              ],
            }),
            frame('Filters', {
              autoLayout: horizontal({ spacing: 8 }),
              children: [
                filterChip('All', true),
                filterChip('ATM', false),
                filterChip('Branch', false),
                filterChip('Drive-thru', false),
              ],
            }),
          ],
        }),
        // Results
        frame('Results', {
          autoLayout: vertical({ spacing: 0 }),
          layoutSizingHorizontal: 'FILL',
          layoutSizingVertical: 'FILL',
          children: [
            text('12 locations nearby', { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
            locationCard('Main Street Branch', '100 Main St, Suite 101', 'Branch', '0.3 mi', 'Open until 5 PM'),
            locationCard('Corner ATM', '250 Oak Ave', 'ATM', '0.5 mi', '24/7'),
            locationCard('Downtown Branch', '500 Commerce Blvd', 'Branch', '0.8 mi', 'Open until 6 PM'),
            locationCard('Mall ATM', '1200 Shopping Center Dr', 'ATM', '1.2 mi', '24/7'),
            locationCard('University Branch', '300 College Ave', 'Branch', '1.5 mi', 'Open until 4 PM'),
          ],
        }),
      ],
    }),
    // Map area
    frame('MapArea', {
      layoutSizingHorizontal: 'FILL',
      layoutSizingVertical: 'FILL',
      fills: [solid('#e2e8f0')],
      children: [
        text('Map', { fontSize: 24, fontWeight: 300, color: '#94a3b8' }),
      ],
    }),
  ],
});
