/**
 * Travel Cards Showcase — Airbnb-style property listing page.
 *
 * DSL features stressed:
 *  - Per-corner radii (top-rounded cards)
 *  - Nested vertical/horizontal auto-layout
 *  - Text wrapping (textAutoResize: HEIGHT with FILL width)
 *  - Strokes (thin borders)
 *  - clipContent
 */
import {
  frame, rectangle, text, ellipse,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

// --- Colors ---
const WHITE = '#ffffff';
const WARM_GRAY = '#f7f7f7';
const CORAL = '#ff5a5f';
const DARK = '#222222';
const GRAY = '#6b7280';
const BORDER = '#e5e7eb';
const IMAGE_GRAY = '#d1d5db';

// --- Helper: PriceBadge ---
function priceBadge(label: string, variant: 'highlight' | 'default') {
  return frame(`Badge-${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 12, padY: 4 }),
    cornerRadius: 9999,
    fills: [solid(variant === 'highlight' ? CORAL : WARM_GRAY)],
    strokes: variant === 'default' ? [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1 }] : undefined,
    children: [
      text(label, {
        fontSize: 12,
        fontWeight: 600,
        color: variant === 'highlight' ? WHITE : DARK,
      }),
    ],
  });
}

// --- Helper: FilterChip ---
function filterChip(label: string, active: boolean) {
  return frame(`Chip-${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8 }),
    cornerRadius: 8,
    fills: [solid(active ? DARK : WHITE)],
    strokes: [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, {
        fontSize: 14,
        fontWeight: 500,
        color: active ? WHITE : DARK,
      }),
    ],
  });
}

// --- Helper: PropertyCard ---
function propertyCard(
  title: string,
  location: string,
  price: string,
  rating: string,
) {
  return frame(`Card-${title}`, {
    size: { x: 300, y: 0 },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid(WHITE)],
    cornerRadii: { topLeft: 12, topRight: 12, bottomLeft: 0, bottomRight: 0 },
    clipContent: true,
    strokes: [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1 }],
    children: [
      // Image placeholder
      rectangle('Image', {
        size: { x: 300, y: 200 },
        fills: [solid(IMAGE_GRAY)],
        layoutSizingHorizontal: 'FILL',
      }),
      // Body
      frame('Body', {
        autoLayout: vertical({ spacing: 6, padX: 16, padY: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          // Header row: title + rating
          frame('Header', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(title, {
                fontSize: 16,
                fontWeight: 600,
                color: DARK,
              }),
              text(`★ ${rating}`, {
                fontSize: 14,
                fontWeight: 500,
                color: DARK,
              }),
            ],
          }),
          // Location
          text(location, {
            fontSize: 14,
            fontWeight: 400,
            color: GRAY,
          }),
          // Price row
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 2, counterAlign: 'MAX' }),
            children: [
              text(price, {
                fontSize: 16,
                fontWeight: 700,
                color: DARK,
              }),
              text('/ night', {
                fontSize: 14,
                fontWeight: 400,
                color: GRAY,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// --- Page Layout ---
export default frame('TravelCardsPage', {
  size: { x: 1440, y: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(WHITE)],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({
        spacing: 0,
        padX: 32,
        padY: 16,
        align: 'SPACE_BETWEEN',
        counterAlign: 'CENTER',
      }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1 }],
      children: [
        text('TravelStay', {
          fontSize: 24,
          fontWeight: 700,
          color: CORAL,
        }),
        frame('BadgeGroup', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            priceBadge('Superhost', 'highlight'),
            priceBadge('Guest favorite', 'default'),
          ],
        }),
      ],
    }),

    // Filter bar
    frame('FilterBar', {
      autoLayout: horizontal({ spacing: 8, padX: 32, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(WARM_GRAY)],
      strokes: [{ color: { r: 0.898, g: 0.906, b: 0.922, a: 1 }, weight: 1 }],
      children: [
        filterChip('Beach', true),
        filterChip('Mountain', false),
        filterChip('City', false),
        filterChip('Countryside', false),
      ],
    }),

    // Card grid
    frame('CardGrid', {
      autoLayout: horizontal({ spacing: 24, padX: 32, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        propertyCard('Cozy Mountain Cabin', 'Aspen, Colorado', '$185', '4.8'),
        propertyCard('Beachfront Villa', 'Tulum, Mexico', '$250', '4.9'),
        propertyCard('Downtown Loft', 'New York, NY', '$320', '4.6'),
      ],
    }),
  ],
});
