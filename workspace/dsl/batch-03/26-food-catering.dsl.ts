/**
 * Catering Services — Package tiers, event types, booking form
 * Batch 3, Page 6: Food & Restaurant
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

function packageTier(
  name: string,
  price: string,
  unit: string,
  features: string[],
  highlighted: boolean,
) {
  return frame(`Package: ${name}`, {
    autoLayout: vertical({ spacing: 20, padX: 28, padY: 32 }),
    layoutSizingHorizontal: 'FILL',
    fills: highlighted
      ? [gradient([{ hex: '#8B4513', position: 0 }, { hex: '#5D4037', position: 1 }], 270)]
      : [solid(WHITE)],
    cornerRadius: 20,
    strokes: highlighted
      ? []
      : [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ...(highlighted
        ? [frame('PopularBadge', {
            autoLayout: horizontal({ padX: 12, padY: 4, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid(WHITE, 0.2)],
            cornerRadius: 12,
            children: [
              text('MOST POPULAR', {
                fontSize: 11, fontWeight: 700, color: WHITE,
                letterSpacing: { value: 1, unit: 'PIXELS' },
              }),
            ],
          })]
        : []),
      text(name, { fontSize: 22, fontWeight: 700, color: highlighted ? WHITE : DARK }),
      frame('PriceBlock', {
        autoLayout: horizontal({ spacing: 4, counterAlign: 'MAX' }),
        children: [
          text(price, { fontSize: 36, fontWeight: 700, color: highlighted ? WHITE : BROWN }),
          text(unit, { fontSize: 14, fontWeight: 400, color: highlighted ? TAN : MUTED }),
        ],
      }),
      rectangle('PkgDiv', {
        size: { x: 1, y: 1 },
        fills: [solid(highlighted ? '#FFFFFF' : '#E8D5C4', highlighted ? 0.2 : 1)],
        layoutSizingHorizontal: 'FILL',
      }),
      frame('FeatureList', {
        autoLayout: vertical({ spacing: 10 }),
        layoutSizingHorizontal: 'FILL',
        children: features.map((f) =>
          frame(`Feature: ${f}`, {
            autoLayout: horizontal({ spacing: 10, counterAlign: 'CENTER' }),
            children: [
              text('✓', { fontSize: 14, fontWeight: 700, color: highlighted ? TAN : BROWN }),
              text(f, { fontSize: 14, fontWeight: 400, color: highlighted ? WHITE : DARK }),
            ],
          }),
        ),
      }),
      frame('SelectBtn', {
        autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: highlighted ? [solid(WHITE)] : [solid(BROWN)],
        cornerRadius: 10,
        children: [
          text('Select Package', {
            fontSize: 15, fontWeight: 600,
            color: highlighted ? BROWN : WHITE,
          }),
        ],
      }),
    ],
  });
}

function eventTypeCard(name: string, icon: string, desc: string) {
  return frame(`Event: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 20, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(WHITE)],
    cornerRadius: 16,
    strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('EventIcon', {
        autoLayout: horizontal({ padX: 12, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid(BROWN, 0.1)],
        cornerRadius: 12,
        size: { x: 48, y: 48 },
        children: [
          text(icon, { fontSize: 20, fontWeight: 600, color: BROWN }),
        ],
      }),
      text(name, { fontSize: 16, fontWeight: 600, color: DARK, textAlignHorizontal: 'CENTER' }),
      text(desc, {
        fontSize: 13, fontWeight: 400, color: MUTED,
        textAlignHorizontal: 'CENTER',
        lineHeight: { value: 20, unit: 'PIXELS' },
      }),
    ],
  });
}

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 6 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 600, color: DARK }),
      frame(`Input: ${label}`, {
        autoLayout: horizontal({ padX: 16, padY: 12, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid(WHITE)],
        cornerRadius: 10,
        strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text(placeholder, { fontSize: 14, fontWeight: 400, color: '#B0998A' }),
        ],
      }),
    ],
  });
}

export default component('FoodCatering', {
  size: { x: 1280, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(CREAM)],
  children: [
    // Hero
    frame('CateringHero', {
      autoLayout: vertical({ spacing: 12, padX: 80, padY: 56, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#8B4513', position: 0 },
          { hex: '#5D4037', position: 1 },
        ], 270),
      ],
      children: [
        text('Catering Services', {
          fontSize: 48, fontWeight: 700, color: WHITE,
          letterSpacing: { value: -1, unit: 'PIXELS' },
        }),
        text('From intimate dinners to grand celebrations, we bring the restaurant to you', {
          fontSize: 18, fontWeight: 400, color: TAN, textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Event Types
    frame('EventTypes', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Event Types', { fontSize: 28, fontWeight: 700, color: DARK }),
        frame('EventGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            eventTypeCard('Wedding', '♥', 'Elegant multi-course\ndining experiences'),
            eventTypeCard('Corporate', '★', 'Professional events\nand team gatherings'),
            eventTypeCard('Birthday', '◆', 'Celebrate with\ncustom menus'),
            eventTypeCard('Holiday', '●', 'Seasonal feasts\nfor every occasion'),
            eventTypeCard('Private', '■', 'Intimate dinners\nin your home'),
          ],
        }),
      ],
    }),

    // Package Tiers
    frame('Packages', {
      autoLayout: vertical({ spacing: 24, padX: 80, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid(BROWN, 0.04)],
      children: [
        text('Catering Packages', { fontSize: 28, fontWeight: 700, color: DARK }),
        text('All packages include setup, service staff, and cleanup', {
          fontSize: 16, fontWeight: 400, color: MUTED,
        }),
        frame('PackageGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            packageTier('Essential', '$45', '/person', [
              '3-course menu',
              'Appetizer selection',
              'Non-alcoholic beverages',
              'Basic table settings',
              'Up to 50 guests',
            ], false),
            packageTier('Premium', '$75', '/person', [
              '5-course tasting menu',
              'Passed hors d\'oeuvres',
              'Full bar service',
              'Premium table settings',
              'Live cooking station',
              'Up to 150 guests',
            ], true),
            packageTier('Luxe', '$120', '/person', [
              '7-course chef\'s table',
              'Caviar & champagne hour',
              'Sommelier wine pairing',
              'Custom floral arrangements',
              'Personal chef service',
              'Unlimited guests',
            ], false),
          ],
        }),
      ],
    }),

    // Booking Form
    frame('BookingForm', {
      autoLayout: vertical({ spacing: 24, padX: 120, padY: 48, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Request a Quote', { fontSize: 28, fontWeight: 700, color: DARK }),
        frame('FormCard', {
          autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(WHITE)],
          cornerRadius: 16,
          strokes: [{ color: { r: 0.91, g: 0.84, b: 0.77, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            frame('FormRow1', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                formField('Name', 'Your full name'),
                formField('Email', 'your@email.com'),
              ],
            }),
            frame('FormRow2', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                formField('Event Date', 'Select a date'),
                formField('Guest Count', 'Estimated number'),
              ],
            }),
            formField('Event Type', 'Select event type'),
            formField('Additional Details', 'Tell us about your vision...'),
            frame('SubmitBtn', {
              autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [
                gradient([
                  { hex: '#8B4513', position: 0 },
                  { hex: '#A0522D', position: 1 },
                ], 0),
              ],
              cornerRadius: 10,
              children: [
                text('Get Quote', { fontSize: 16, fontWeight: 600, color: WHITE }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
