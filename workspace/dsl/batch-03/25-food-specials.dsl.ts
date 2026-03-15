/**
 * Daily Specials — Countdown timer, special dishes with gradient overlays
 * Batch 3, Page 5: Food & Restaurant
 * DSL Features: gradients, opacity, cornerRadii, rich typography
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const BROWN = '#8B4513';
const TAN = '#D4A574';
const CREAM = '#FFF8F0';
const DARK = '#3E2723';
const MUTED = '#8D6E63';
const WHITE = '#FFFFFF';

function timerBlock(value: string, label: string) {
  return frame(`Timer: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(WHITE, 0.15)],
    cornerRadius: 12,
    children: [
      text(value, { fontSize: 32, fontWeight: 700, color: WHITE }),
      text(label, { fontSize: 11, fontWeight: 500, color: TAN, letterSpacing: { value: 1, unit: 'PIXELS' } }),
    ],
  });
}

function specialDish(
  name: string,
  description: string,
  price: string,
  originalPrice: string,
  gradStart: string,
  gradEnd: string,
) {
  return frame(`Special: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    cornerRadius: 20,
    clipContent: true,
    strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      // Image area with gradient overlay
      frame('DishImage', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20, align: 'MAX' }),
        layoutSizingHorizontal: 'FILL',
        size: { x: undefined, y: 220 },
        fills: [
          gradient([
            { hex: gradStart, position: 0 },
            { hex: gradEnd, position: 1 },
          ], 270),
        ],
        children: [
          frame('DiscountBadge', {
            autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#E53935')],
            cornerRadius: 8,
            children: [
              text('TODAY ONLY', {
                fontSize: 11, fontWeight: 700, color: WHITE,
                letterSpacing: { value: 1, unit: 'PIXELS' },
              }),
            ],
          }),
        ],
      }),
      // Info
      frame('DishInfo', {
        autoLayout: vertical({ spacing: 8, padX: 20, padY: 20 }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid(WHITE)],
        children: [
          text(name, { fontSize: 20, fontWeight: 700, color: DARK }),
          text(description, {
            fontSize: 14, fontWeight: 400, color: MUTED,
            lineHeight: { value: 22, unit: 'PIXELS' },
          }),
          frame('PriceRow', {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              text(price, { fontSize: 22, fontWeight: 700, color: BROWN }),
              text(originalPrice, {
                fontSize: 16, fontWeight: 400, color: '#B0998A',
                textDecoration: 'STRIKETHROUGH',
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export default component('FoodSpecials', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Hero with countdown
    frame('SpecialsHero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 56, align: 'CENTER', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#3E2723', position: 0 },
          { hex: '#8B4513', position: 0.5 },
          { hex: '#5D4037', position: 1 },
        ], 135),
      ],
      children: [
        frame('SpecialsBadge', {
          autoLayout: horizontal({ padX: 16, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(WHITE, 0.15)],
          cornerRadius: 20,
          children: [
            text('Limited Time Offers', { fontSize: 13, fontWeight: 600, color: TAN }),
          ],
        }),
        text("Today's Specials", {
          fontSize: 48, fontWeight: 700, color: WHITE,
          letterSpacing: { value: -1, unit: 'PIXELS' },
        }),
        text('Handpicked dishes by Chef Marco — available until midnight', {
          fontSize: 18, fontWeight: 400, color: TAN,
        }),

        // Countdown Timer
        frame('CountdownTimer', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            timerBlock('06', 'HOURS'),
            text(':', { fontSize: 28, fontWeight: 700, color: WHITE }),
            timerBlock('42', 'MINUTES'),
            text(':', { fontSize: 28, fontWeight: 700, color: WHITE }),
            timerBlock('18', 'SECONDS'),
          ],
        }),
      ],
    }),

    // Specials Grid
    frame('SpecialsGrid', {
      autoLayout: vertical({ spacing: 32, padX: 80, padY: 48 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('GridRow1', {
          autoLayout: horizontal({ spacing: 24 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            specialDish(
              'Truffle Risotto',
              'Creamy Arborio rice with black truffle shavings, aged Parmigiano, and a drizzle of truffle oil',
              '$28',
              '$42',
              '#A67B5B',
              '#6D4C41',
            ),
            specialDish(
              'Lobster Thermidor',
              'Whole Maine lobster baked with a rich cream sauce, Gruyère cheese, and fresh herbs',
              '$38',
              '$56',
              '#8B6914',
              '#5D4037',
            ),
            specialDish(
              'Wagyu Steak',
              'A5 Japanese Wagyu ribeye, seared to perfection, served with roasted vegetables',
              '$52',
              '$78',
              '#8B4513',
              '#3E2723',
            ),
          ],
        }),

        // Chef's note
        frame('ChefNote', {
          autoLayout: horizontal({ spacing: 16, padX: 24, padY: 20, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(BROWN, 0.08)],
          cornerRadius: 12,
          children: [
            rectangle('ChefAvatar', {
              size: { x: 48, y: 48 },
              fills: [
                gradient([
                  { hex: '#D4A574', position: 0 },
                  { hex: '#8B4513', position: 1 },
                ], 135),
              ],
              cornerRadius: 24,
            }),
            frame('NoteText', {
              autoLayout: vertical({ spacing: 2 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text("Chef's Note", { fontSize: 14, fontWeight: 600, color: BROWN }),
                text('"Each special is crafted from the freshest seasonal ingredients delivered this morning."', {
                  fontSize: 14, fontWeight: 400, color: MUTED,
                  lineHeight: { value: 22, unit: 'PIXELS' },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
