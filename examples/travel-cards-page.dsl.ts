/**
 * Travel Cards — Airbnb-style search results page
 *
 * DSL features stressed:
 *  - Per-corner radii (top-rounded cards)
 *  - Nested vertical/horizontal auto-layout
 *  - Text wrapping (textAutoResize: HEIGHT)
 *  - Strokes (thin borders)
 *  - clipContent
 */
import {
  frame, rectangle, text,
  solid, hex,
  horizontal, vertical,
  defineTokens, token,
} from '@figma-dsl/core';

// ── Color Tokens ──────────────────────────────────────────────────
const colors = defineTokens({
  pageBg: '#f7f7f7',
  white: '#ffffff',
  coral: '#ff5a5f',
  dark: '#222222',
  muted: '#717171',
  border: '#e0e0e0',
  chipBorder: '#dddddd',
});

const PAGE_W = 1440;
const PAD_X = 40;
const CARD_W = 300;
const IMAGE_H = 200;

// ── Helper: Filter Chip ──────────────────────────────────────────
function filterChip(label: string, active: boolean) {
  return frame(`Chip: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    cornerRadius: 20,
    fills: active ? [solid('#222222')] : [solid('#ffffff')],
    strokes: active
      ? [{ color: hex('#222222'), weight: 1, align: 'INSIDE' as const }]
      : [{ color: hex('#dddddd'), weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, {
        fontSize: 13,
        fontWeight: 500,
        color: active ? '#ffffff' : '#222222',
      }),
    ],
  });
}

// ── Helper: Price Badge ──────────────────────────────────────────
function priceBadge(price: string, period: string, highlight: boolean) {
  return frame(`PriceBadge: ${price}`, {
    autoLayout: horizontal({ spacing: 4, padX: 12, padY: 6, counterAlign: 'MAX' }),
    cornerRadius: 8,
    fills: highlight ? [solid('#ff5a5f')] : [solid('#f7f7f7')],
    children: [
      text(price, {
        fontSize: 16,
        fontWeight: 700,
        color: highlight ? '#ffffff' : '#222222',
      }),
      text(`/ ${period}`, {
        fontSize: 13,
        fontWeight: 400,
        color: highlight ? '#ffffff' : '#717171',
        opacity: highlight ? 0.85 : 1,
      }),
    ],
  });
}

// ── Helper: Star ─────────────────────────────────────────────────
function ratingDisplay(rating: string, reviews: number) {
  return frame('Rating', {
    autoLayout: horizontal({ spacing: 2, counterAlign: 'CENTER' }),
    children: [
      text('\u2605', { fontSize: 14, fontWeight: 400, color: '#ff5a5f' }),
      text(rating, { fontSize: 13, fontWeight: 500, color: '#222222' }),
      text(`(${reviews})`, { fontSize: 13, fontWeight: 400, color: '#717171' }),
    ],
  });
}

// ── Helper: Property Card ────────────────────────────────────────
function propertyCard(opts: {
  title: string;
  location: string;
  price: string;
  rating: string;
  reviews: number;
  imageColor: string;
  superhost: boolean;
}) {
  const imageChildren: any[] = [];
  if (opts.superhost) {
    imageChildren.push(
      frame('Superhost Badge', {
        autoLayout: horizontal({ padX: 8, padY: 4 }),
        fills: [solid('#ffffff')],
        cornerRadius: 4,
        children: [
          text('SUPERHOST', { fontSize: 11, fontWeight: 700, color: '#222222' }),
        ],
      }),
    );
  }

  return frame(`Card: ${opts.location}`, {
    size: { x: CARD_W },
    autoLayout: vertical({ spacing: 0 }),
    cornerRadius: 12,
    fills: [solid('#ffffff')],
    strokes: [{ color: hex('#e0e0e0'), weight: 1, align: 'INSIDE' as const }],
    clipContent: true,
    children: [
      // Image area (top-rounded via clipContent on parent)
      frame('Image', {
        size: { x: CARD_W, y: IMAGE_H },
        autoLayout: vertical({ spacing: 0, padX: 12, padY: 12 }),
        fills: [solid(opts.imageColor)],
        children: imageChildren,
      }),
      // Details
      frame('Details', {
        size: { x: CARD_W },
        autoLayout: vertical({ spacing: 4, padX: 16, padY: 12 }),
        children: [
          // Location + Rating row
          frame('TopRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(opts.location, { fontSize: 13, fontWeight: 600, color: '#222222' }),
              ratingDisplay(opts.rating, opts.reviews),
            ],
          }),
          // Title (wrapping text)
          text(opts.title, {
            fontSize: 15,
            fontWeight: 400,
            color: '#717171',
            textAutoResize: 'HEIGHT',
            size: { x: CARD_W - 32 },
          }),
          // Price
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
            children: [
              text(opts.price, { fontSize: 15, fontWeight: 700, color: '#222222' }),
              text('/ night', { fontSize: 15, fontWeight: 400, color: '#222222' }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ── Page Layout ──────────────────────────────────────────────────
export default frame('TravelCards Page', {
  size: { x: PAGE_W },
  autoLayout: vertical({ spacing: 0, widthSizing: 'FIXED', heightSizing: 'HUG' }),
  fills: [token(colors, 'pageBg')],
  children: [
    // ── Header ──
    frame('Header', {
      autoLayout: horizontal({
        spacing: 0,
        padX: PAD_X,
        padY: 20,
        align: 'SPACE_BETWEEN',
        counterAlign: 'CENTER',
      }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: hex('#e0e0e0'), weight: 1, align: 'INSIDE' as const }],
      children: [
        text('StayFinder', { fontSize: 24, fontWeight: 700, color: '#ff5a5f' }),
        frame('PriceRange', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            priceBadge('$100', 'avg', false),
            text('to', { fontSize: 13, fontWeight: 400, color: '#717171' }),
            priceBadge('$500', 'avg', true),
          ],
        }),
      ],
    }),

    // ── Filter Bar ──
    frame('FilterBar', {
      autoLayout: horizontal({ spacing: 8, padX: PAD_X, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: hex('#e0e0e0'), weight: 1, align: 'INSIDE' as const }],
      children: [
        filterChip('All', true),
        filterChip('Beachfront', false),
        filterChip('Mountain', false),
        filterChip('City', false),
        filterChip('Countryside', false),
        filterChip('Superhost', false),
      ],
    }),

    // ── Results Heading ──
    frame('ResultsHeading', {
      autoLayout: vertical({ spacing: 4, padX: PAD_X, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('300+ stays in your area', { fontSize: 20, fontWeight: 600, color: '#222222' }),
        text('Prices include fees and taxes', { fontSize: 14, fontWeight: 400, color: '#717171' }),
      ],
    }),

    // ── Property Grid ──
    frame('PropertyGrid', {
      autoLayout: horizontal({ spacing: 24, padX: PAD_X, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        propertyCard({
          title: 'Cozy mountain cabin with lake view',
          location: 'Lake Tahoe, California',
          price: '$185',
          rating: '4.92',
          reviews: 128,
          imageColor: '#8ba89e',
          superhost: true,
        }),
        propertyCard({
          title: 'Modern downtown loft near restaurants',
          location: 'Portland, Oregon',
          price: '$120',
          rating: '4.85',
          reviews: 74,
          imageColor: '#b8a990',
          superhost: false,
        }),
        propertyCard({
          title: 'Beachfront bungalow with private deck',
          location: 'Malibu, California',
          price: '$310',
          rating: '4.97',
          reviews: 203,
          imageColor: '#7aafc4',
          superhost: true,
        }),
        propertyCard({
          title: 'Historic brownstone apartment in city center',
          location: 'Boston, Massachusetts',
          price: '$145',
          rating: '4.78',
          reviews: 56,
          imageColor: '#c4a27a',
          superhost: false,
        }),
      ],
    }),
  ],
});
