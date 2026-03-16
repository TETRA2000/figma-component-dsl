/**
 * Pet Adoption — Pet profiles with animal cards, filters, and adoption form
 * DSL features: ellipse for pet photo placeholders, cornerRadius on cards, gradient header,
 * FILL layout, textAutoResize HEIGHT for descriptions, strokes, cornerRadii, clipContent
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function filterChip(label: string, active: boolean) {
  return frame(`Filter: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 7, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(active ? '#f97316' : '#ffffff')],
    cornerRadius: 9999,
    strokes: active ? [] : [{ color: { r: 0.88, g: 0.88, b: 0.88, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(label, { fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#ffffff' : '#374151' })],
  });
}

function petCard(name: string, breed: string, age: string, gender: string, description: string, color: string, urgent: boolean) {
  return frame(`Pet: ${name}`, {
    size: { x: 280 },
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#ffffff')],
    cornerRadius: 16,
    clipContent: true,
    strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      // Photo area
      frame('PhotoArea', {
        size: { x: 280, y: 200 },
        fills: [gradient([{ hex: color, position: 0 }, { hex: '#fef3c7', position: 1 }], 160)],
        children: [
          ...(urgent ? [frame('UrgentBadge', {
            autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
            fills: [solid('#ef4444')],
            cornerRadii: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 10 },
            children: [text('URGENT', { fontSize: 10, fontWeight: 700, color: '#ffffff' })],
          })] : []),
        ],
      }),
      frame('PetInfo', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          frame('PetNameRow', {
            autoLayout: horizontal({ spacing: 0, counterAlign: 'CENTER' }),
            layoutSizingHorizontal: 'FILL',
            children: [
              text(name, { fontSize: 18, fontWeight: 700, color: '#111827', layoutSizingHorizontal: 'FILL' }),
              text(gender, { fontSize: 14, fontWeight: 400, color: '#6b7280' }),
            ],
          }),
          text(`${breed} | ${age}`, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          text(description, {
            fontSize: 13, fontWeight: 400, color: '#6b7280',
            size: { x: 248 }, textAutoResize: 'HEIGHT',
            lineHeight: { value: 150, unit: 'PERCENT' },
          }),
          frame('AdoptBtn', {
            autoLayout: horizontal({ spacing: 0, padX: 0, padY: 10, align: 'CENTER', counterAlign: 'CENTER' }),
            fills: [solid('#f97316')],
            cornerRadius: 10,
            layoutSizingHorizontal: 'FILL',
            children: [text('Meet Me', { fontSize: 14, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
          }),
        ],
      }),
    ],
  });
}

function formField(label: string, placeholder: string) {
  return frame(`Field: ${label}`, {
    autoLayout: vertical({ spacing: 4 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: '#374151' }),
      frame('Input', {
        autoLayout: horizontal({ spacing: 0, padX: 12, padY: 10 }),
        fills: [solid('#ffffff')],
        cornerRadius: 8,
        layoutSizingHorizontal: 'FILL',
        strokes: [{ color: { r: 0.85, g: 0.85, b: 0.85, a: 1 }, weight: 1, align: 'INSIDE' as const }],
        children: [text(placeholder, { fontSize: 13, fontWeight: 400, color: '#9ca3af' })],
      }),
    ],
  });
}

export default frame('PetAdoptionPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#fef7ed')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 16, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#ffffff')],
      strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('PawIcon', { size: { x: 32, y: 32 }, fills: [solid('#f97316')] }),
            text('PawPals', { fontSize: 20, fontWeight: 800, color: '#f97316' }),
          ],
        }),
        frame('HeaderSpacer', { layoutSizingHorizontal: 'FILL', autoLayout: horizontal({ spacing: 0 }), children: [] }),
        frame('NavLinks', {
          autoLayout: horizontal({ spacing: 20, counterAlign: 'CENTER' }),
          children: [
            text('Browse Pets', { fontSize: 13, fontWeight: 600, color: '#f97316' }),
            text('How It Works', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            text('Success Stories', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
      ],
    }),
    // Banner
    frame('Banner', {
      autoLayout: vertical({ spacing: 8, padX: 32, padY: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#f97316', position: 0 }, { hex: '#fb923c', position: 0.5 }, { hex: '#fbbf24', position: 1 }], 90)],
      children: [
        text('Find Your New Best Friend', { fontSize: 28, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Over 200 animals are waiting for their forever home', { fontSize: 15, fontWeight: 400, color: '#ffffffdd', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    // Filters
    frame('FiltersBar', {
      autoLayout: horizontal({ spacing: 10, padX: 32, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        filterChip('All Pets', true),
        filterChip('Dogs', false),
        filterChip('Cats', false),
        filterChip('Rabbits', false),
        filterChip('Birds', false),
        filterChip('Small Animals', false),
      ],
    }),
    // Main area
    frame('MainArea', {
      autoLayout: horizontal({ spacing: 24, padX: 32, padY: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Pet cards
        frame('PetGrid', {
          autoLayout: vertical({ spacing: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Available Pets (47)', { fontSize: 20, fontWeight: 700, color: '#111827' }),
            frame('CardRow1', {
              autoLayout: horizontal({ spacing: 16 }),
              children: [
                petCard('Buddy', 'Golden Retriever', '2 years', 'Male', 'Friendly and playful. Great with kids and other dogs. Loves fetch and belly rubs.', '#fde68a', false),
                petCard('Luna', 'Tabby Cat', '1 year', 'Female', 'Gentle and curious. Loves window-watching and lap naps. Spayed and vaccinated.', '#c4b5fd', true),
              ],
            }),
            frame('CardRow2', {
              autoLayout: horizontal({ spacing: 16 }),
              children: [
                petCard('Max', 'German Shepherd', '3 years', 'Male', 'Loyal and trained. Knows basic commands. Needs a yard to run in.', '#a7f3d0', false),
                petCard('Cleo', 'Siamese Cat', '4 years', 'Female', 'Elegant and vocal. Prefers to be the only pet. Very affectionate.', '#fbcfe8', false),
              ],
            }),
          ],
        }),
        // Adoption form sidebar
        frame('AdoptionForm', {
          size: { x: 300 },
          autoLayout: vertical({ spacing: 14, padX: 20, padY: 20 }),
          fills: [solid('#ffffff')],
          cornerRadius: 14,
          strokes: [{ color: { r: 0.92, g: 0.93, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
          children: [
            text('Adoption Inquiry', { fontSize: 18, fontWeight: 700, color: '#111827' }),
            text('Fill out the form and we will contact you within 24 hours.', {
              fontSize: 13, fontWeight: 400, color: '#6b7280',
              size: { x: 260 }, textAutoResize: 'HEIGHT',
              lineHeight: { value: 150, unit: 'PERCENT' },
            }),
            formField('Full Name', 'Your name'),
            formField('Email', 'you@example.com'),
            formField('Phone', '(555) 123-4567'),
            formField('Which pet?', 'Pet name or type'),
            frame('SubmitBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 0, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#f97316')],
              cornerRadius: 10,
              layoutSizingHorizontal: 'FILL',
              children: [text('Submit Inquiry', { fontSize: 14, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' })],
            }),
          ],
        }),
      ],
    }),
  ],
});
