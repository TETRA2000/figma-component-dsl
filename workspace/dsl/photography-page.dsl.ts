/**
 * Photography Portfolio — Masonry gallery, camera settings metadata, contact form
 * DSL features: gradient photos, metadata pills, two-column masonry, centered CTA
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function photoCard(title: string, colors: [string, string], height: number, camera: string, settings: string) {
  return frame(`Photo:${title}`, {
    autoLayout: vertical({ spacing: 10, padX: 0, padY: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`Img:${title}`, {
        size: { x: 400, y: height },
        fills: [gradient([{ hex: colors[0], position: 0 }, { hex: colors[1], position: 1 }], 160)],
        cornerRadius: 10,
        layoutSizingHorizontal: 'FILL',
      }),
      text(title, { fontSize: 14, fontWeight: 600, color: '#1f2937' }),
      frame('MetaPills', {
        autoLayout: horizontal({ spacing: 6 }),
        children: [
          metaPill(camera),
          metaPill(settings),
        ],
      }),
    ],
  });
}

function metaPill(label: string) {
  return frame(`Meta:${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
    fills: [solid('#f3f4f6')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 10, fontWeight: 500, color: '#6b7280' })],
  });
}

function formField(label: string, width: number) {
  return frame(`Field:${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#374151' }),
      rectangle(`Input:${label}`, {
        size: { x: width, y: 36 },
        fills: [solid('#ffffff')],
        cornerRadius: 6,
        strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        layoutSizingHorizontal: 'FILL',
      }),
    ],
  });
}

export default frame('PhotographyPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 36, padX: 48, padY: 40 }),
  fills: [solid('#fafafa')],
  children: [
    frame('Header', {
      autoLayout: vertical({ spacing: 4, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('ELENA VOSS', { fontSize: 32, fontWeight: 700, color: '#111827', textAlignHorizontal: 'CENTER' }),
        text('Landscape & Travel Photography', { fontSize: 14, fontWeight: 400, color: '#9ca3af', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Gallery', {
      autoLayout: horizontal({ spacing: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ColLeft', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            photoCard('Mountain Sunrise', ['#fde68a', '#f97316'], 260, 'Sony A7IV', 'f/8 1/250s'),
            photoCard('Forest Mist', ['#a7f3d0', '#065f46'], 200, 'Canon R5', 'f/5.6 1/125s'),
            photoCard('Desert Dunes', ['#fef3c7', '#d97706'], 220, 'Nikon Z9', 'f/11 1/500s'),
          ],
        }),
        frame('ColRight', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            photoCard('Ocean Waves', ['#bfdbfe', '#1e40af'], 200, 'Sony A7IV', 'f/4 1/1000s'),
            photoCard('Northern Lights', ['#c4b5fd', '#4c1d95'], 280, 'Canon R5', 'f/2.8 15s'),
            photoCard('Autumn Path', ['#fed7aa', '#9a3412'], 180, 'Nikon Z9', 'f/5.6 1/200s'),
          ],
        }),
      ],
    }),
    frame('ContactSection', {
      autoLayout: vertical({ spacing: 16, padX: 32, padY: 28, counterAlign: 'CENTER' }),
      fills: [solid('#ffffff')],
      cornerRadius: 14,
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Get in Touch', { fontSize: 20, fontWeight: 600, color: '#111827', textAlignHorizontal: 'CENTER' }),
        frame('FormFields', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            formField('Name', 400),
            formField('Email', 400),
            formField('Message', 400),
          ],
        }),
        frame('SubmitBtn', {
          autoLayout: horizontal({ spacing: 0, padX: 40, padY: 12, align: 'CENTER' }),
          fills: [solid('#111827')],
          cornerRadius: 8,
          children: [text('Send Message', { fontSize: 14, fontWeight: 600, color: '#ffffff' })],
        }),
      ],
    }),
  ],
});
