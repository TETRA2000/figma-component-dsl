/**
 * Cleaning Service — Package cards, booking form, and reviews
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function packageCard(name: string, price: string, duration: string, includes: string[], color: string, popular: boolean) {
  return frame(`Package: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
    fills: [solid(popular ? color : '#ffffff')],
    cornerRadius: 12,
    strokes: popular ? [] : [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      popular ? frame('PopBadge', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid('#ffffff33')], cornerRadius: 9999, children: [text('Popular', { fontSize: 10, fontWeight: 700, color: '#ffffff' })] })
        : rectangle('Spacer', { size: { x: 1, y: 0 }, fills: [] }),
      text(name, { fontSize: 18, fontWeight: 700, color: popular ? '#ffffff' : '#0f172a' }),
      text(price, { fontSize: 26, fontWeight: 800, color: popular ? '#ffffff' : color }),
      text(duration, { fontSize: 12, fontWeight: 400, color: popular ? '#ffffffb3' : '#94a3b8' }),
      ...includes.map(i => text(`✓ ${i}`, { fontSize: 12, fontWeight: 400, color: popular ? '#ffffffcc' : '#475569' })),
    ],
  });
}

function reviewItem(name: string, rating: number, comment: string, date: string) {
  return frame(`Review: ${name}`, {
    autoLayout: vertical({ spacing: 4, padX: 14, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('Header', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
        frame('UserInfo', { autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }), children: [
          ellipse('Av', { size: { x: 28, y: 28 }, fills: [solid('#dbeafe')] }),
          text(name, { fontSize: 13, fontWeight: 600, color: '#1e293b' }),
        ] }),
        text(date, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      ] }),
      text('★'.repeat(rating) + '☆'.repeat(5 - rating), { fontSize: 12, fontWeight: 600, color: '#f59e0b' }),
      text(comment, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
    ],
  });
}

export default frame('CleaningServicePage', {
  size: { x: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f0fdf4')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 6, padX: 36, padY: 28 }),
      fills: [gradient([{ hex: '#064e3b', position: 0 }, { hex: '#059669', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('SparkleClean', { fontSize: 26, fontWeight: 800, color: '#ffffff' }),
        text('Professional home cleaning you can trust', { fontSize: 14, fontWeight: 400, color: '#a7f3d0' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 36, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Packages', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Cleaning Packages', { fontSize: 20, fontWeight: 700, color: '#064e3b' }),
            frame('PackageGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              packageCard('Basic Clean', '$99', '2-3 hours', ['Kitchen & bathrooms', 'Vacuuming', 'Dusting'], '#64748b', false),
              packageCard('Deep Clean', '$189', '4-5 hours', ['All basic services', 'Inside appliances', 'Windows', 'Baseboards'], '#059669', true),
              packageCard('Move-Out', '$299', '6-8 hours', ['Full deep clean', 'Walls & ceilings', 'Carpet steam', 'Garage'], '#7c3aed', false),
            ] }),
          ],
        }),
        frame('BookingForm', {
          autoLayout: vertical({ spacing: 12, padX: 18, padY: 18 }),
          fills: [solid('#ffffff')],
          cornerRadius: 12,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Book a Cleaning', { fontSize: 18, fontWeight: 700, color: '#064e3b' }),
            frame('FieldRow', { autoLayout: horizontal({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
              frame('F1', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [text('Date', { fontSize: 12, fontWeight: 600, color: '#334155' }), frame('I1', { autoLayout: horizontal({ padX: 12, padY: 10 }), fills: [solid('#f8fafc')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [text('Select date', { fontSize: 13, fontWeight: 400, color: '#94a3b8' })] })] }),
              frame('F2', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [text('Home Size', { fontSize: 12, fontWeight: 600, color: '#334155' }), frame('I2', { autoLayout: horizontal({ padX: 12, padY: 10 }), fills: [solid('#f8fafc')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', strokes: [{ color: { r: 0.91, g: 0.91, b: 0.91, a: 1 }, weight: 1, align: 'INSIDE' as const }], children: [text('e.g. 3 Bedroom', { fontSize: 13, fontWeight: 400, color: '#94a3b8' })] })] }),
            ] }),
            frame('BookBtn', { autoLayout: horizontal({ padX: 24, padY: 12, align: 'CENTER' }), fills: [solid('#059669')], cornerRadius: 8, layoutSizingHorizontal: 'FILL', children: [text('Book Now', { fontSize: 14, fontWeight: 700, color: '#ffffff' })] }),
          ],
        }),
        frame('Reviews', {
          autoLayout: vertical({ spacing: 8 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Customer Reviews', { fontSize: 18, fontWeight: 700, color: '#064e3b' }),
            reviewItem('Jennifer M.', 5, 'My apartment has never looked so clean! The team was thorough and friendly.', 'Mar 10'),
            reviewItem('Robert K.', 4, 'Great deep clean service. Slightly late but excellent work overall.', 'Mar 8'),
          ],
        }),
      ],
    }),
  ],
});
