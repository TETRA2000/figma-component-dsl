/**
 * Photography Studio — Package cards, gallery, and contact section
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function packageCard(name: string, price: string, features: string[], color: string) {
  return frame(`Package: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('IconCircle', { size: { x: 44, y: 44 }, autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }), fills: [solid(color + '15')], cornerRadius: 22, children: [
        text('📷', { fontSize: 20, fontWeight: 400, color }),
      ] }),
      text(name, { fontSize: 16, fontWeight: 700, color: '#0f172a' }),
      text(price, { fontSize: 24, fontWeight: 800, color }),
      ...features.map(f => text(`✓ ${f}`, { fontSize: 12, fontWeight: 400, color: '#475569' })),
      frame('BookBtn', { autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER' }), fills: [solid(color)], cornerRadius: 8, layoutSizingHorizontal: 'FILL', children: [
        text('Book Now', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
      ] }),
    ],
  });
}

function galleryThumb(label: string, color: string) {
  return frame(`Gallery: ${label}`, {
    autoLayout: vertical({ spacing: 0 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('Img', { size: { x: 200, y: 150 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#0f172a', position: 1 }], 135)], cornerRadius: 8, layoutSizingHorizontal: 'FILL' }),
    ],
  });
}

function contactRow(label: string, value: string) {
  return frame(`Contact: ${label}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', padX: 12, padY: 8 }),
    fills: [solid('#f8fafc')],
    cornerRadius: 6,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 13, fontWeight: 500, color: '#64748b' }),
      text(value, { fontSize: 13, fontWeight: 600, color: '#0f172a' }),
    ],
  });
}

export default frame('PhotographyPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 44, padY: 36, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#1e293b', position: 1 }], 180)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Iris Photography', { fontSize: 28, fontWeight: 800, color: '#ffffff' }),
        text('Capturing moments that last a lifetime', { fontSize: 14, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 44, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Packages', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Our Packages', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
            frame('PackageGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              packageCard('Portrait', '$250', ['1 hour session', '20 edited photos', 'Online gallery', '2 outfit changes'], '#e11d48'),
              packageCard('Wedding', '$2,500', ['8 hour coverage', '500+ edited photos', 'Engagement shoot', 'Second photographer', 'USB delivery'], '#7c3aed'),
              packageCard('Commercial', '$800', ['Half-day shoot', '50 edited photos', 'Commercial license', 'Quick turnaround'], '#2563eb'),
            ] }),
          ],
        }),
        frame('Gallery', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Recent Work', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
            frame('GalleryGrid', { autoLayout: horizontal({ spacing: 10 }), layoutSizingHorizontal: 'FILL', children: [
              galleryThumb('Wedding', '#e11d48'),
              galleryThumb('Portrait', '#f59e0b'),
              galleryThumb('Landscape', '#059669'),
              galleryThumb('Product', '#3b82f6'),
            ] }),
          ],
        }),
        frame('Contact', {
          autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
          fills: [solid('#1e293b')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Get in Touch', { fontSize: 18, fontWeight: 700, color: '#ffffff' }),
            contactRow('Email', 'hello@irisphotography.com'),
            contactRow('Phone', '(555) 234-5678'),
            contactRow('Studio', '123 Art District, Suite 4B'),
            contactRow('Hours', 'Mon – Sat, 9 AM – 6 PM'),
          ],
        }),
      ],
    }),
  ],
});
