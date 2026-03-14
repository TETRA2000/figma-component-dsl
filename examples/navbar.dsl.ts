/**
 * Navbar — top navigation bar with logo, links, and CTA button.
 *
 * Demonstrates:
 *  - defineTokens() / token() for reusable color palettes
 *  - SPACE_BETWEEN alignment (pushes children apart)
 *  - group() for logical grouping without visual styling
 *  - instance() referencing an external component
 *  - Strokes (bottom border)
 */
import {
  frame, text, group, instance,
  solid, defineTokens, token,
  horizontal,
  hex,
} from '@figma-dsl/core';

const colors = defineTokens({
  bg: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  primary: '#7c3aed',
  border: '#e5e7eb',
});

function navLink(label: string) {
  return text(label, {
    fontSize: 14,
    fontWeight: 500,
    color: '#6b7280',
  });
}

export default frame('Navbar', {
  size: { x: 1280, y: 64 },
  autoLayout: horizontal({
    padX: 32,
    padY: 0,
    align: 'SPACE_BETWEEN',
    counterAlign: 'CENTER',
  }),
  fills: [token(colors, 'bg')],
  strokes: [{ color: hex('#e5e7eb'), weight: 1, align: 'INSIDE' }],
  children: [
    // Left: logo + links
    frame('Left', {
      autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
      children: [
        text('Acme', {
          fontSize: 20,
          fontWeight: 700,
          color: '#111827',
        }),
        group('Links', [
          navLink('Products'),
          navLink('Pricing'),
          navLink('Docs'),
          navLink('Blog'),
        ]),
      ],
    }),

    // Right: CTA
    instance('Button', { Label: 'Sign Up' }),
  ],
});
