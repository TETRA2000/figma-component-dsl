/**
 * Pet Adoption — Animal profile cards with filters, breeds, and adoption info
 * DSL features: card grid, pill filter tags, gradient card images, status badges, ellipse avatars
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function filterTag(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 7 }),
    fills: [solid(active ? '#7c3aed' : '#f3f4f6')],
    cornerRadius: 9999,
    children: [text(label, { fontSize: 13, fontWeight: 600, color: active ? '#ffffff' : '#6b7280' })],
  });
}

function petCard(name: string, breed: string, age: string, gender: string, color: string, urgent: boolean) {
  return frame(`Pet: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')], cornerRadius: 14, layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('PetImage', {
        size: { x: 1, y: 140 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [gradient([{ hex: color, position: 0 }, { hex: color + 'aa', position: 1 }], 135)],
        layoutSizingHorizontal: 'FILL',
        children: [ellipse(`Av:${name}`, { size: { x: 64, y: 64 }, fills: [solid('#ffffff33')] })],
      }),
      frame('PetInfo', {
        autoLayout: vertical({ spacing: 6, padX: 14, padY: 12 }), layoutSizingHorizontal: 'FILL',
        children: [
          frame('PetNameRow', {
            autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(name, { fontSize: 16, fontWeight: 700, color: '#111827' }),
              ...(urgent ? [frame('UrgentBadge', {
                autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }),
                fills: [solid('#fef2f2')], cornerRadius: 9999,
                children: [text('Urgent', { fontSize: 10, fontWeight: 600, color: '#dc2626' })],
              })] : []),
            ],
          }),
          text(breed, { fontSize: 13, fontWeight: 500, color: '#6b7280' }),
          text(`${age} • ${gender}`, { fontSize: 12, fontWeight: 400, color: '#9ca3af' }),
          frame('AdoptBtn', {
            autoLayout: horizontal({ spacing: 0, padY: 8, align: 'CENTER' }),
            fills: [solid('#7c3aed')], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
            children: [text('Meet Me', { fontSize: 13, fontWeight: 600, color: '#ffffff' })],
          }),
        ],
      }),
    ],
  });
}

function statCard(icon: string, value: string, label: string) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 4, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#faf5ff')], cornerRadius: 12, layoutSizingHorizontal: 'FILL',
    children: [
      text(icon, { fontSize: 20, fontWeight: 400, color: '#7c3aed' }),
      text(value, { fontSize: 20, fontWeight: 800, color: '#111827' }),
      text(label, { fontSize: 11, fontWeight: 500, color: '#6b7280' }),
    ],
  });
}

export default frame('PetAdoptionPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fafafa')],
  children: [
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 18, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('PawFinder', { fontSize: 22, fontWeight: 800, color: '#7c3aed' }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 20, counterAlign: 'CENTER' }),
          children: [
            text('Adopt', { fontSize: 14, fontWeight: 600, color: '#7c3aed' }),
            text('Foster', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
            text('Donate', { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
      ],
    }),
    frame('Stats', {
      autoLayout: horizontal({ spacing: 12, padX: 32, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        statCard('🐾', '342', 'Pets Available'),
        statCard('🏠', '1,204', 'Adopted This Year'),
        statCard('💜', '89', 'Foster Homes'),
      ],
    }),
    frame('Filters', {
      autoLayout: horizontal({ spacing: 8, padX: 32, padY: 8 }), layoutSizingHorizontal: 'FILL',
      children: [
        filterTag('All', true), filterTag('Dogs', false), filterTag('Cats', false),
        filterTag('Small', false), filterTag('Young', false), filterTag('Urgent', false),
      ],
    }),
    frame('PetGrid', {
      autoLayout: horizontal({ spacing: 16, padX: 32, padY: 16 }), layoutSizingHorizontal: 'FILL',
      children: [
        petCard('Buddy', 'Golden Retriever', '2 years', 'Male', '#f59e0b', false),
        petCard('Luna', 'Tabby Cat', '1 year', 'Female', '#8b5cf6', true),
        petCard('Max', 'Beagle Mix', '4 years', 'Male', '#3b82f6', false),
        petCard('Daisy', 'Siamese', '3 years', 'Female', '#ec4899', false),
      ],
    }),
  ],
});
