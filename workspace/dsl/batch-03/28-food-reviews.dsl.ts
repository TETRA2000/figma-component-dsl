/**
 * Restaurant Reviews — Overall rating, sub-ratings, review cards
 * Batch 3, Page 8: Food & Restaurant
 * DSL Features: rich typography, gradients, cornerRadii, warm colors
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
const STAR = '#F9A825';

function starRating(filled: number) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    text(i < filled ? '★' : '☆', {
      fontSize: 16, fontWeight: 600,
      color: i < filled ? STAR : '#D7CCC8',
    }),
  );
  return frame('Stars', {
    autoLayout: horizontal({ spacing: 2 }),
    children: stars,
  });
}

function ratingBar(label: string, score: number, maxWidth: number) {
  return frame(`Rating: ${label}`, {
    autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: DARK, size: { x: 80 }, textAutoResize: 'HEIGHT' }),
      frame('BarTrack', {
        size: { x: maxWidth, y: 8 },
        fills: [solid('#E8D5C4')],
        cornerRadius: 4,
        clipContent: true,
        autoLayout: horizontal({ spacing: 0 }),
        children: [
          rectangle('BarFill', {
            size: { x: Math.round(maxWidth * score / 5), y: 8 },
            fills: [solid(BROWN)],
          }),
        ],
      }),
      text(score.toFixed(1), { fontSize: 14, fontWeight: 600, color: BROWN }),
    ],
  });
}

function reviewCard(
  name: string,
  date: string,
  rating: number,
  title: string,
  body: string,
  helpfulCount: string,
) {
  return frame(`Review: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 24, padY: 20 }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(WHITE)],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      // Header
      frame('ReviewHeader', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('ReviewerInfo', {
            autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
            children: [
              rectangle('Avatar', {
                size: { x: 40, y: 40 },
                fills: [
                  gradient([
                    { hex: '#D4A574', position: 0 },
                    { hex: '#8B4513', position: 1 },
                  ], 135),
                ],
                cornerRadius: 20,
              }),
              frame('NameDate', {
                autoLayout: vertical({ spacing: 2 }),
                children: [
                  text(name, { fontSize: 15, fontWeight: 600, color: DARK }),
                  text(date, { fontSize: 12, fontWeight: 400, color: MUTED }),
                ],
              }),
            ],
          }),
          starRating(rating),
        ],
      }),
      // Content
      text(title, { fontSize: 16, fontWeight: 600, color: DARK }),
      text(body, {
        fontSize: 14, fontWeight: 400, color: MUTED,
        lineHeight: { value: 22, unit: 'PIXELS' },
        layoutSizingHorizontal: 'FILL',
      }),
      // Helpful
      frame('HelpfulRow', {
        autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
        children: [
          text('Helpful', { fontSize: 13, fontWeight: 500, color: BROWN }),
          text(`(${helpfulCount})`, { fontSize: 13, fontWeight: 400, color: MUTED }),
        ],
      }),
    ],
  });
}

export default component('FoodReviews', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Hero
    frame('ReviewsHero', {
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#8B4513', position: 0 },
          { hex: '#5D4037', position: 1 },
        ], 270),
      ],
      children: [
        text('Guest Reviews', {
          fontSize: 44, fontWeight: 700, color: WHITE,
          letterSpacing: { value: -1, unit: 'PIXELS' },
        }),
        text('What our guests are saying about their experience', {
          fontSize: 18, fontWeight: 400, color: TAN,
        }),
      ],
    }),

    // Ratings Overview
    frame('RatingsOverview', {
      autoLayout: horizontal({ spacing: 48, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Overall Score
        frame('OverallScore', {
          autoLayout: vertical({ spacing: 8, padX: 32, padY: 32, counterAlign: 'CENTER' }),
          fills: [solid(WHITE)],
          cornerRadius: 20,
          strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('4.7', { fontSize: 64, fontWeight: 700, color: BROWN }),
            frame('OverallStars', {
              autoLayout: horizontal({ spacing: 4 }),
              children: [
                text('★', { fontSize: 24, fontWeight: 600, color: STAR }),
                text('★', { fontSize: 24, fontWeight: 600, color: STAR }),
                text('★', { fontSize: 24, fontWeight: 600, color: STAR }),
                text('★', { fontSize: 24, fontWeight: 600, color: STAR }),
                text('★', { fontSize: 24, fontWeight: 600, color: '#E8D5C4' }),
              ],
            }),
            text('Based on 428 reviews', { fontSize: 14, fontWeight: 400, color: MUTED }),
          ],
        }),

        // Sub-Ratings
        frame('SubRatings', {
          autoLayout: vertical({ spacing: 16, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Rating Breakdown', { fontSize: 20, fontWeight: 700, color: DARK }),
            ratingBar('Food', 4.9, 300),
            ratingBar('Service', 4.6, 300),
            ratingBar('Ambiance', 4.7, 300),
            ratingBar('Value', 4.4, 300),
            ratingBar('Cleanliness', 4.8, 300),
          ],
        }),
      ],
    }),

    // Review Cards
    frame('ReviewsList', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ReviewsHeader', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Recent Reviews', { fontSize: 22, fontWeight: 700, color: DARK }),
            frame('SortBtn', {
              autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid(WHITE)],
              cornerRadius: 8,
              strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('Most Recent ▾', { fontSize: 13, fontWeight: 500, color: DARK }),
              ],
            }),
          ],
        }),
        reviewCard(
          'Sarah M.',
          'March 12, 2026',
          5,
          'Absolutely phenomenal dining experience',
          'The osso buco was cooked to perfection — the meat was falling off the bone. The truffle risotto was creamy and aromatic. Service was impeccable, and the ambiance was warm and inviting. Will definitely be coming back!',
          '24',
        ),
        reviewCard(
          'James P.',
          'March 8, 2026',
          4,
          'Great food, slightly slow service',
          'The food quality is outstanding. Every dish we ordered was beautifully presented and full of flavor. The only reason for 4 stars is the wait between courses was a bit long on a busy Saturday evening.',
          '12',
        ),
        reviewCard(
          'Elena R.',
          'March 3, 2026',
          5,
          'Perfect for a special occasion',
          'We celebrated our anniversary here and it could not have been better. Chef Marco personally came out to greet us. The tasting menu with wine pairings was exceptional. The tiramisu was the best I have ever had.',
          '31',
        ),
      ],
    }),
  ],
});
