/**
 * Card component — image placeholder, title, description, and action link.
 *
 * Demonstrates:
 *  - Nested vertical + horizontal auto-layout
 *  - rectangle() as an image placeholder
 *  - solid() fills with opacity
 *  - cornerRadii (per-corner rounding)
 *  - clipContent
 *  - layoutSizingHorizontal: 'FILL' for fluid children
 */
import {
  component, frame, rectangle, text,
  solid,
  horizontal, vertical,
} from '@figma-dsl/core';

const IMAGE_HEIGHT = 180;

export default component('Card', {
  size: { x: 320, y: 400 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#ffffff')],
  cornerRadius: 12,
  clipContent: true,
  componentProperties: [
    { name: 'Title', type: 'TEXT', defaultValue: 'Card Title' },
    { name: 'Description', type: 'TEXT', defaultValue: 'A short description of this card content goes here.' },
  ],
  children: [
    // Image placeholder
    rectangle('Image', {
      size: { x: 320, y: IMAGE_HEIGHT },
      fills: [solid('#e5e7eb')],
      layoutSizingHorizontal: 'FILL',
    }),

    // Body
    frame('Body', {
      autoLayout: vertical({ spacing: 8, padX: 20, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Card Title', {
          fontSize: 20,
          fontWeight: 700,
          color: '#111827',
          layoutSizingHorizontal: 'FILL',
        }),
        text('A short description of this card content goes here.', {
          fontSize: 14,
          fontWeight: 400,
          color: '#6b7280',
          lineHeight: { value: 150, unit: 'PERCENT' },
          layoutSizingHorizontal: 'FILL',
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({
        spacing: 0,
        padX: 20,
        padY: 12,
        align: 'MAX',
      }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Read more →', {
          fontSize: 14,
          fontWeight: 600,
          color: '#7c3aed',
        }),
      ],
    }),
  ],
});
