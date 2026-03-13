/**
 * Button component — a pill-shaped CTA with gradient fill.
 *
 * Demonstrates:
 *  - component() with componentProperties
 *  - gradient() fill
 *  - horizontal() auto-layout
 *  - text() with typography styling
 */
import {
  component, text,
  gradient,
  horizontal,
} from '@figma-dsl/core';

export default component('Button', {
  autoLayout: horizontal({
    spacing: 8,
    padX: 24,
    padY: 12,
    align: 'CENTER',
    counterAlign: 'CENTER',
  }),
  fills: [
    gradient([
      { hex: '#7c3aed', position: 0 },
      { hex: '#4f46e5', position: 1 },
    ]),
  ],
  cornerRadius: 9999,
  componentProperties: [
    { name: 'Label', type: 'TEXT', defaultValue: 'Get Started' },
    { name: 'Disabled', type: 'BOOLEAN', defaultValue: false },
  ],
  children: [
    text('Get Started', {
      fontSize: 16,
      fontWeight: 600,
      color: '#ffffff',
      letterSpacing: { value: -0.5, unit: 'PERCENT' },
    }),
  ],
});
