/**
 * Chef Profile — Photo, bio, specialties, awards
 * Batch 3, Page 3: Food & Restaurant
 * DSL Features: rich typography, gradients, cornerRadii, opacity
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

function specialtyTag(label: string) {
  return frame(`Specialty: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(BROWN, 0.1)],
    cornerRadius: 20,
    strokes: [{ color: { r: 0.55, g: 0.27, b: 0.07, a: 0.3 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: BROWN }),
    ],
  });
}

function awardItem(year: string, title: string, org: string) {
  return frame(`Award: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('AwardYear', {
        autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(BROWN)],
        cornerRadius: 6,
        children: [
          text(year, { fontSize: 13, fontWeight: 700, color: '#FFFFFF' }),
        ],
      }),
      frame('AwardInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 600, color: DARK }),
          text(org, { fontSize: 13, fontWeight: 400, color: MUTED }),
        ],
      }),
    ],
  });
}

export default component('FoodChef', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Hero with gradient
    frame('HeroBanner', {
      autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      size: { x: undefined, y: 200 },
      fills: [
        gradient([
          { hex: '#8B4513', position: 0 },
          { hex: '#3E2723', position: 1 },
        ], 270),
      ],
      children: [],
    }),

    // Profile Content
    frame('ProfileContent', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Left: Photo
        frame('PhotoColumn', {
          autoLayout: vertical({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            // Photo placeholder (overlaps banner visually)
            rectangle('ChefPhoto', {
              size: { x: 320, y: 400 },
              fills: [
                gradient([
                  { hex: '#D4A574', position: 0 },
                  { hex: '#8B4513', position: 1 },
                ], 270),
              ],
              cornerRadius: 20,
            }),
            text('Chef Marco Rossi', {
              fontSize: 28, fontWeight: 700, color: DARK,
              textAlignHorizontal: 'CENTER',
            }),
            text('Executive Chef', {
              fontSize: 16, fontWeight: 500, color: BROWN,
              textAlignHorizontal: 'CENTER',
            }),
          ],
        }),

        // Right: Bio, Specialties, Awards
        frame('InfoColumn', {
          autoLayout: vertical({ spacing: 32, padY: 32 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Bio
            frame('BioSection', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('About', { fontSize: 22, fontWeight: 700, color: DARK }),
                text(
                  'Chef Marco Rossi brings over 20 years of culinary excellence to our kitchen. ' +
                  'Trained at Le Cordon Bleu in Paris and having worked in Michelin-starred restaurants ' +
                  'across Italy and France, Chef Marco combines traditional techniques with modern innovation ' +
                  'to create dishes that tell a story on every plate.',
                  {
                    fontSize: 15, fontWeight: 400, color: MUTED,
                    lineHeight: { value: 26, unit: 'PIXELS' },
                    size: { x: 680 },
                    textAutoResize: 'HEIGHT',
                  },
                ),
              ],
            }),

            // Specialties
            frame('SpecialtiesSection', {
              autoLayout: vertical({ spacing: 12 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Specialties', { fontSize: 22, fontWeight: 700, color: DARK }),
                frame('SpecialtyTags', {
                  autoLayout: horizontal({ spacing: 10 }),
                  children: [
                    specialtyTag('Italian Cuisine'),
                    specialtyTag('Seafood'),
                    specialtyTag('Pastry Arts'),
                    specialtyTag('Farm-to-Table'),
                    specialtyTag('Wine Pairing'),
                  ],
                }),
              ],
            }),

            // Awards
            frame('AwardsSection', {
              autoLayout: vertical({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Awards & Recognition', { fontSize: 22, fontWeight: 700, color: DARK }),
                frame('AwardsList', {
                  autoLayout: vertical({ spacing: 0 }),
                  layoutSizingHorizontal: 'FILL',
                  fills: [solid('#FFFFFF')],
                  cornerRadius: 12,
                  strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    awardItem('2025', 'Michelin Star', 'Guide Michelin'),
                    rectangle('Div1', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
                    awardItem('2024', 'Best Chef — Northeast', 'James Beard Foundation'),
                    rectangle('Div2', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
                    awardItem('2023', 'Rising Star Award', 'World Culinary Awards'),
                    rectangle('Div3', { size: { x: 1, y: 1 }, fills: [solid('#E8D5C4')], layoutSizingHorizontal: 'FILL' }),
                    awardItem('2021', 'Iron Chef Champion', 'Food Network'),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Quote
    frame('QuoteSection', {
      autoLayout: vertical({ spacing: 12, padX: 120, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(BROWN, 0.06)],
      children: [
        text('"Cooking is an art, but great cooking is a conversation\nbetween the chef, the ingredients, and the guest."', {
          fontSize: 22, fontWeight: 500, color: BROWN,
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 34, unit: 'PIXELS' },
        }),
        text('— Chef Marco Rossi', {
          fontSize: 15, fontWeight: 600, color: MUTED,
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),
  ],
});
