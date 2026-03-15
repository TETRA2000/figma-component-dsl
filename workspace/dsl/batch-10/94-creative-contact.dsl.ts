/**
 * Creative Contact Page — Form, office address, map placeholder, social links
 * Batch 10, Page 94: Contact page for creative portfolio
 * DSL Features: gradients, form fields, cornerRadius, split layout
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

const purple = '#7c3aed';
const pink = '#ec4899';
const cyan = '#06b6d4';
const dark = '#0f0f0f';
const white = '#ffffff';
const muted = '#a1a1aa';
const card = '#1a1a1a';
const border = '#2a2a2a';

export default component('CreativeContact', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(dark)],
  children: [
    // Navbar
    frame('Navbar', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('STUDIO', { fontSize: 22, fontWeight: 800, color: white, letterSpacing: { value: 4, unit: 'PIXELS' } }),
        frame('NavSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 32, counterAlign: 'CENTER' }),
          children: [
            text('Work', { fontSize: 14, fontWeight: 500, color: muted }),
            text('About', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Services', { fontSize: 14, fontWeight: 500, color: muted }),
            text('Contact', { fontSize: 14, fontWeight: 500, color: white }),
          ],
        }),
      ],
    }),

    // Headline
    frame('Headline', {
      autoLayout: vertical({ spacing: 16, padX: 80, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Get in Touch', {
          fontSize: 64,
          fontWeight: 800,
          color: white,
          textAlignHorizontal: 'CENTER',
          letterSpacing: { value: -2, unit: 'PIXELS' },
        }),
        text('Have a project in mind? We would love to hear about it.', {
          fontSize: 20,
          fontWeight: 400,
          color: muted,
          textAlignHorizontal: 'CENTER',
        }),
      ],
    }),

    // Main Content: Form + Info
    frame('ContactContent', {
      autoLayout: horizontal({ spacing: 64, padX: 80, padY: 60 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Contact Form
        frame('ContactForm', {
          autoLayout: vertical({ spacing: 24, padX: 40, padY: 40 }),
          layoutSizingHorizontal: 'FILL',
          fills: [solid(card)],
          cornerRadius: 20,
          children: [
            text('Send us a message', { fontSize: 24, fontWeight: 600, color: white }),
            formField('Your Name', 'John Doe'),
            formField('Email Address', 'john@example.com'),
            // Message field (taller)
            frame('Field: Message', {
              autoLayout: vertical({ spacing: 8 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Message', { fontSize: 14, fontWeight: 500, color: muted }),
                frame('MessageInput', {
                  autoLayout: vertical({ padX: 16, padY: 16 }),
                  layoutSizingHorizontal: 'FILL',
                  size: { x: 100, y: 160 },
                  fills: [solid('#111111')],
                  cornerRadius: 10,
                  strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Tell us about your project...', { fontSize: 15, fontWeight: 400, color: '#52525b' }),
                  ],
                }),
              ],
            }),
            // Submit button
            frame('SubmitBtn', {
              autoLayout: horizontal({ padX: 32, padY: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              fills: [gradient([{ hex: purple, position: 0 }, { hex: pink, position: 1 }], 135)],
              cornerRadius: 12,
              children: [
                text('Send Message', { fontSize: 16, fontWeight: 600, color: white }),
              ],
            }),
          ],
        }),

        // Contact Info
        frame('ContactInfo', {
          autoLayout: vertical({ spacing: 40 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            // Office Address
            frame('OfficeAddress', {
              autoLayout: vertical({ spacing: 12, padX: 32, padY: 32 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(card)],
              cornerRadius: 16,
              children: [
                text('Office', { fontSize: 14, fontWeight: 600, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                text('123 Creative Ave, Suite 400\nSan Francisco, CA 94107\nUnited States', {
                  fontSize: 16,
                  fontWeight: 400,
                  color: '#d4d4d8',
                  lineHeight: { value: 28, unit: 'PIXELS' },
                }),
              ],
            }),

            // Contact Details
            frame('ContactDetails', {
              autoLayout: vertical({ spacing: 16, padX: 32, padY: 32 }),
              layoutSizingHorizontal: 'FILL',
              fills: [solid(card)],
              cornerRadius: 16,
              children: [
                text('Contact', { fontSize: 14, fontWeight: 600, color: purple, letterSpacing: { value: 2, unit: 'PIXELS' } }),
                contactLine('Email', 'hello@studio.design'),
                contactLine('Phone', '+1 (415) 555-0123'),
                contactLine('Hours', 'Mon — Fri, 9am — 6pm PST'),
              ],
            }),

            // Map Placeholder
            frame('MapPlaceholder', {
              size: { x: 100, y: 200 },
              layoutSizingHorizontal: 'FILL',
              fills: [
                gradient([
                  { hex: '#1a1a2e', position: 0 },
                  { hex: '#2a1a3e', position: 0.5 },
                  { hex: '#1a2a3e', position: 1 },
                ], 135),
              ],
              cornerRadius: 16,
              autoLayout: vertical({ spacing: 8, padX: 24, padY: 24, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('MAP', { fontSize: 24, fontWeight: 700, color: '#3f3f46', letterSpacing: { value: 8, unit: 'PIXELS' } }),
                text('San Francisco, CA', { fontSize: 14, fontWeight: 400, color: muted }),
              ],
            }),

            // Social Media Links
            frame('SocialLinks', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                socialLink('Twitter'),
                socialLink('Dribbble'),
                socialLink('Behance'),
                socialLink('LinkedIn'),
              ],
            }),
          ],
        }),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 80, padY: 40, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('© 2026 Studio. All rights reserved.', { fontSize: 14, fontWeight: 400, color: muted }),
      ],
    }),
  ],
});

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 8 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: muted }),
      frame('Input', {
        autoLayout: horizontal({ padX: 16, padY: 14, counterAlign: 'CENTER' }),
        layoutSizingHorizontal: 'FILL',
        fills: [solid('#111111')],
        cornerRadius: 10,
        strokes: [{ color: { r: 0.2, g: 0.2, b: 0.2, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text(placeholder, { fontSize: 15, fontWeight: 400, color: '#52525b' }),
        ],
      }),
    ],
  });
}

function contactLine(label: string, value: string) {
  return frame(`Contact: ${label}`, {
    autoLayout: horizontal({ spacing: 12 }),
    children: [
      text(label, { fontSize: 14, fontWeight: 500, color: muted }),
      text(value, { fontSize: 14, fontWeight: 400, color: '#d4d4d8' }),
    ],
  });
}

function socialLink(name: string) {
  return frame(`Social: ${name}`, {
    autoLayout: horizontal({ padX: 20, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid(card)],
    cornerRadius: 10,
    children: [
      text(name, { fontSize: 14, fontWeight: 500, color: muted }),
    ],
  });
}
