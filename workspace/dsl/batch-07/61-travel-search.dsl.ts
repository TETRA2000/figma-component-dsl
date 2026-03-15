/**
 * Travel Search — Destination search with hero, search form, popular destinations
 * Batch 7, Page 1: Travel/Hospitality baseline
 * DSL Features: clipContent, image fills (rectangle placeholders), gradient overlay, FILL sizing, nested layouts
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('TravelSearch', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('Wanderly', { fontSize: 22, fontWeight: 700, color: '#ea580c' }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 28, counterAlign: 'CENTER' }),
          children: [
            text('Explore', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Flights', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Hotels', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            text('Deals', { fontSize: 14, fontWeight: 500, color: '#64748b' }),
            frame('SignInBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ea580c')],
              cornerRadius: 8,
              children: [
                text('Sign In', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Hero with image placeholder and overlay
    frame('Hero', {
      size: { x: 1440, y: 480 },
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 80, align: 'CENTER', counterAlign: 'CENTER' }),
      clipContent: true,
      fills: [
        solid('#1e3a5f'),
        gradient([
          { hex: '#00000000', position: 0 },
          { hex: '#000000aa', position: 1 },
        ], 270),
      ],
      children: [
        text('Discover Your Next Adventure', {
          fontSize: 52,
          fontWeight: 700,
          color: '#ffffff',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 60, unit: 'PIXELS' },
        }),
        text('Search flights, hotels, and experiences in one place', {
          fontSize: 20,
          fontWeight: 400,
          color: '#ffffffcc',
          textAlignHorizontal: 'CENTER',
        }),

        // Search Form
        frame('SearchForm', {
          autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          clipContent: true,
          children: [
            searchField('From', 'New York (JFK)'),
            fieldDivider(),
            searchField('To', 'Where to?'),
            fieldDivider(),
            searchField('Dates', 'Select dates'),
            fieldDivider(),
            searchField('Travelers', '2 Adults'),
            frame('SearchBtn', {
              autoLayout: horizontal({ padX: 32, padY: 20, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#ea580c')],
              children: [
                text('Search', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Popular Destinations
    frame('PopularDestinations', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 64 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('SectionHeader', {
          autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('HeaderText', {
              autoLayout: vertical({ spacing: 4 }),
              children: [
                text('Popular Destinations', { fontSize: 28, fontWeight: 700, color: '#1e293b' }),
                text('Explore trending destinations loved by travelers', {
                  fontSize: 15, fontWeight: 400, color: '#64748b',
                }),
              ],
            }),
            frame('HeaderSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
            frame('ViewAllBtn', {
              autoLayout: horizontal({ padX: 20, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
              cornerRadius: 8,
              strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('View All', { fontSize: 14, fontWeight: 500, color: '#ea580c' }),
              ],
            }),
          ],
        }),

        // Destinations Grid
        frame('DestinationsGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            destinationCard('Paris, France', 'From $450', '#d4a574'),
            destinationCard('Bali, Indonesia', 'From $680', '#5a9e8f'),
            destinationCard('Tokyo, Japan', 'From $820', '#8b6fa3'),
            destinationCard('Santorini, Greece', 'From $590', '#5f8bb5'),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#f8fafc')],
      children: [
        text('© 2026 Wanderly. All rights reserved.', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
  ],
});

function searchField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 2, padX: 24, padY: 14 }),
    children: [
      text(label, { fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: { value: 5, unit: 'PERCENT' } }),
      text(placeholder, { fontSize: 15, fontWeight: 500, color: '#1e293b' }),
    ],
  });
}

function fieldDivider() {
  return rectangle('Divider', {
    size: { x: 1, y: 40 },
    fills: [solid('#e2e8f0')],
  });
}

function destinationCard(name: string, price: string, bgColor: string) {
  return frame(`Dest: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 16,
    clipContent: true,
    strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' }],
    children: [
      // Image placeholder
      frame('ImagePlaceholder', {
        size: { x: 300, y: 200 },
        layoutSizingHorizontal: 'FILL',
        fills: [
          solid(bgColor),
          gradient([
            { hex: '#00000000', position: 0 },
            { hex: '#00000066', position: 1 },
          ], 270),
        ],
        autoLayout: vertical({ spacing: 0, padX: 16, padY: 16, align: 'MAX' }),
        children: [
          frame('PriceBadge', {
            autoLayout: horizontal({ padX: 12, padY: 4 }),
            fills: [solid('#ffffff', 0.9)],
            cornerRadius: 999,
            children: [
              text(price, { fontSize: 13, fontWeight: 600, color: '#1e293b' }),
            ],
          }),
        ],
      }),
      // Info
      frame('CardInfo', {
        autoLayout: vertical({ spacing: 4, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 16, fontWeight: 600, color: '#1e293b' }),
          text('✈ Direct flights available', { fontSize: 13, fontWeight: 400, color: '#64748b' }),
        ],
      }),
    ],
  });
}
