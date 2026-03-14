/**
 * Dark Luxury — Premium dark theme with gold accents, thin typography.
 *
 * DSL features stressed: thin strokes, letterSpacing, counterAlign CENTER,
 * text alignment, opacity, elegant spacing.
 */
import {
  frame, text, rectangle,
  solid, hex,
  horizontal, vertical,
} from '@figma-dsl/core';

function luxuryCard(label: string, title: string, desc: string) {
  return frame(`Card: ${title}`, {
    size: { x: 420, y: undefined },
    autoLayout: vertical({ spacing: 16, padX: 40, padY: 40 }),
    fills: [solid('#111111')],
    strokes: [{ color: hex('#222222'), weight: 1, align: 'INSIDE' }],
    children: [
      text(label, {
        fontSize: 11,
        fontWeight: 400,
        color: '#c9a96e',
        letterSpacing: { value: 3, unit: 'PIXELS' },
      }),
      text(title, {
        fontSize: 28,
        fontWeight: 300,
        color: '#ffffff',
      }),
      text(desc, {
        fontSize: 14,
        fontWeight: 300,
        color: '#666666',
        lineHeight: { value: 160, unit: 'PERCENT' },
        layoutSizingHorizontal: 'FILL',
      }),
      rectangle('GoldLine', {
        size: { x: 40, y: 1 },
        fills: [solid('#c9a96e')],
      }),
    ],
  });
}

export default frame('DarkLuxuryPage', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Hero
    frame('Hero', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 96, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('EST. 2024', {
          fontSize: 12,
          fontWeight: 400,
          color: '#c9a96e',
          letterSpacing: { value: 4, unit: 'PIXELS' },
        }),
        text('MAISON NOIR', {
          fontSize: 72,
          fontWeight: 300,
          color: '#ffffff',
          letterSpacing: { value: 8, unit: 'PIXELS' },
        }),
        rectangle('GoldDivider', {
          size: { x: 60, y: 1 },
          fills: [solid('#c9a96e')],
        }),
        text('Where elegance meets innovation. A curated experience for the discerning.', {
          fontSize: 16,
          fontWeight: 300,
          color: '#888888',
          textAlignHorizontal: 'CENTER',
          lineHeight: { value: 160, unit: 'PERCENT' },
          size: { x: 500 },
          textAutoResize: 'HEIGHT',
        }),
        frame('CTA', {
          autoLayout: horizontal({ padX: 48, padY: 14 }),
          strokes: [{ color: hex('#c9a96e'), weight: 1, align: 'INSIDE' }],
          children: [
            text('DISCOVER', {
              fontSize: 13,
              fontWeight: 400,
              color: '#c9a96e',
              letterSpacing: { value: 3, unit: 'PIXELS' },
            }),
          ],
        }),
      ],
    }),

    // Cards
    frame('Cards', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        luxuryCard('COLLECTION', 'Midnight Series', 'Crafted with precision and care for those who appreciate the finer details.'),
        luxuryCard('EXCLUSIVE', 'Golden Hour', 'A limited edition that captures the ephemeral beauty of twilight.'),
        luxuryCard('SIGNATURE', 'Obsidian Edge', 'Bold minimalism meets timeless sophistication in every detail.'),
      ],
    }),

    // Bottom spacer
    rectangle('Spacer', { size: { x: 1, y: 96 }, opacity: 0 }),
  ],
});
