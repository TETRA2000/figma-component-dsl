/**
 * Gift Card Page — Card designs, custom amount, personalize message
 * Batch 3, Page 9: Food & Restaurant
 * DSL Features: gradients, cornerRadii, opacity, warm palette
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

function giftCardDesign(
  name: string,
  gradStart: string,
  gradEnd: string,
  angle: number,
  amount: string,
  selected: boolean,
) {
  return frame(`Card: ${name}`, {
    autoLayout: vertical({ spacing: 0, padX: 24, padY: 24, align: 'SPACE_BETWEEN' }),
    size: { x: 320, y: 200 },
    fills: [
      gradient([
        { hex: gradStart, position: 0 },
        { hex: gradEnd, position: 1 },
      ], angle),
    ],
    cornerRadius: 20,
    strokes: selected
      ? [{ color: { r: 0.55, g: 0.27, b: 0.07, a: 1 }, weight: 3, align: 'OUTSIDE' as const }]
      : [],
    children: [
      frame('CardTop', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text('La Trattoria', { fontSize: 16, fontWeight: 600, color: WHITE }),
          text('GIFT CARD', {
            fontSize: 11, fontWeight: 700, color: WHITE,
            opacity: 0.7,
            letterSpacing: { value: 2, unit: 'PIXELS' },
          }),
        ],
      }),
      frame('CardBottom', {
        autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'MAX' }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(amount, { fontSize: 36, fontWeight: 700, color: WHITE }),
          text(name, { fontSize: 13, fontWeight: 500, color: WHITE, opacity: 0.8 }),
        ],
      }),
    ],
  });
}

function amountBtn(amount: string, selected: boolean) {
  return frame(`Amount: ${amount}`, {
    autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [selected ? solid(BROWN) : solid(WHITE)],
    cornerRadius: 10,
    strokes: selected
      ? []
      : [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(amount, { fontSize: 16, fontWeight: 600, color: selected ? WHITE : DARK }),
    ],
  });
}

export default component('FoodGiftCards', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Hero
    frame('GiftHero', {
      autoLayout: vertical({ spacing: 8, padX: 80, padY: 56, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#8B4513', position: 0 },
          { hex: '#5D4037', position: 1 },
        ], 270),
      ],
      children: [
        text('Gift Cards', {
          fontSize: 48, fontWeight: 700, color: WHITE,
          letterSpacing: { value: -1, unit: 'PIXELS' },
        }),
        text('Give the gift of an unforgettable dining experience', {
          fontSize: 18, fontWeight: 400, color: TAN,
        }),
      ],
    }),

    // Card Designs
    frame('DesignSection', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Choose a Design', { fontSize: 24, fontWeight: 700, color: DARK }),
        frame('CardGrid', {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            giftCardDesign('Classic', '#8B4513', '#3E2723', 135, '$50', true),
            giftCardDesign('Sunset', '#D4A574', '#8B4513', 270, '$75', false),
            giftCardDesign('Midnight', '#3E2723', '#1A0E0A', 270, '$100', false),
          ],
        }),
      ],
    }),

    // Amount Selection
    frame('AmountSection', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(BROWN, 0.04)],
      children: [
        text('Select Amount', { fontSize: 24, fontWeight: 700, color: DARK }),
        frame('AmountOptions', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            amountBtn('$25', false),
            amountBtn('$50', true),
            amountBtn('$75', false),
            amountBtn('$100', false),
            amountBtn('$150', false),
            amountBtn('$200', false),
          ],
        }),
        // Custom amount
        frame('CustomAmount', {
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            text('or enter custom amount:', { fontSize: 14, fontWeight: 500, color: MUTED }),
            frame('CustomInput', {
              autoLayout: horizontal({ padX: 16, padY: 10, counterAlign: 'CENTER' }),
              size: { x: 160, y: undefined },
              fills: [solid(WHITE)],
              cornerRadius: 10,
              strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
              children: [
                text('$ Enter amount', { fontSize: 14, fontWeight: 400, color: '#B0998A' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Personalize
    frame('PersonalizeSection', {
      autoLayout: vertical({ spacing: 20, padX: 80, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Personalize Your Gift', { fontSize: 24, fontWeight: 700, color: DARK }),
        frame('PersonalizeForm', {
          autoLayout: vertical({ spacing: 16, padX: 28, padY: 28 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(WHITE)],
          cornerRadius: 16,
          strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            // Recipient fields
            frame('RecipientRow', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                frame('Field: RecipientName', {
                  autoLayout: vertical({ spacing: 6 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Recipient Name', { fontSize: 14, fontWeight: 600, color: DARK }),
                    frame('Input: RecName', {
                      autoLayout: horizontal({ padX: 16, padY: 12, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid(CREAM)],
                      cornerRadius: 10,
                      children: [
                        text('Enter name', { fontSize: 14, fontWeight: 400, color: '#B0998A' }),
                      ],
                    }),
                  ],
                }),
                frame('Field: RecipientEmail', {
                  autoLayout: vertical({ spacing: 6 }),
                  layoutSizingHorizontal: 'FILL',
                  children: [
                    text('Recipient Email', { fontSize: 14, fontWeight: 600, color: DARK }),
                    frame('Input: RecEmail', {
                      autoLayout: horizontal({ padX: 16, padY: 12, counterAlign: 'CENTER' }),
                      layoutSizingHorizontal: 'FILL',
                      fills: [solid(CREAM)],
                      cornerRadius: 10,
                      children: [
                        text('Enter email', { fontSize: 14, fontWeight: 400, color: '#B0998A' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            // Message field
            frame('Field: Message', {
              autoLayout: vertical({ spacing: 6 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Personal Message', { fontSize: 14, fontWeight: 600, color: DARK }),
                frame('Input: Message', {
                  autoLayout: vertical({ padX: 16, padY: 12 }),
                  layoutSizingHorizontal: 'FILL',
                  size: { x: undefined, y: 100 },
                  fills: [solid(CREAM)],
                  cornerRadius: 10,
                  children: [
                    text('Write a personal message for the recipient...', {
                      fontSize: 14, fontWeight: 400, color: '#B0998A',
                    }),
                  ],
                }),
              ],
            }),
            // Delivery date
            frame('DeliveryRow', {
              autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
              children: [
                text('Delivery Date:', { fontSize: 14, fontWeight: 600, color: DARK }),
                frame('DatePicker', {
                  autoLayout: horizontal({ padX: 16, padY: 10, counterAlign: 'CENTER' }),
                  fills: [solid(CREAM)],
                  cornerRadius: 10,
                  children: [
                    text('Send immediately', { fontSize: 14, fontWeight: 400, color: DARK }),
                    text(' ▾', { fontSize: 14, fontWeight: 400, color: MUTED }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Purchase button
    frame('PurchaseSection', {
      autoLayout: horizontal({ spacing: 16, padX: 80, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('PurchaseBtn', {
          autoLayout: horizontal({ padX: 48, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [
            gradient([
              { hex: '#8B4513', position: 0 },
              { hex: '#A0522D', position: 1 },
            ], 0),
          ],
          cornerRadius: 12,
          children: [
            text('Purchase Gift Card — $50', { fontSize: 16, fontWeight: 600, color: WHITE }),
          ],
        }),
        text('Secure payment with SSL encryption', { fontSize: 13, fontWeight: 400, color: MUTED }),
      ],
    }),
  ],
});
