import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const rose = '#f43f5e'; const white = '#ffffff'; const bg = '#fff1f2'; const dark = '#1c1917';
const med = '#78716c'; const green = '#16a34a'; const blue = '#2563eb'; const amber = '#d97706';

function petCard(name: string, breed: string, age: string, gender: string, g1: string, g2: string, tags: string[]) {
  return frame(`Pet: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 280, y: undefined },
    cornerRadius: 14, clipContent: true, fills: [solid(white)],
    children: [
      rectangle('PetImg', { size: { x: 280, y: 220 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)] }),
      frame('PetInfo', { autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }), layoutSizingHorizontal: 'FILL', children: [
        frame('NameAge', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text(name, { fontSize: 18, fontWeight: 700, color: dark }),
          text(age, { fontSize: 13, fontWeight: 400, color: med }),
        ]}),
        text(`${breed} · ${gender}`, { fontSize: 13, fontWeight: 400, color: med }),
        frame('Tags', { autoLayout: horizontal({ spacing: 6 }), children: tags.map(t =>
          frame(`Tag: ${t}`, { autoLayout: horizontal({ padX: 8, padY: 3 }), fills: [solid(rose, 0.08)], cornerRadius: 9999,
            children: [text(t, { fontSize: 11, fontWeight: 500, color: rose })] })
        )}),
        frame('AdoptBtn', {
          autoLayout: horizontal({ padX: 0, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid(rose)], cornerRadius: 8, layoutSizingHorizontal: 'FILL',
          children: [text('Meet Me', { fontSize: 13, fontWeight: 600, color: white })],
        }),
      ]}),
    ],
  });
}

export default frame('PetAdoption', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(bg)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 48, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(white)],
      children: [
        text('PawPals', { fontSize: 22, fontWeight: 700, color: rose }),
        frame('Nav', { autoLayout: horizontal({ spacing: 24 }), children: [
          text('Adopt', { fontSize: 14, fontWeight: 600, color: rose }),
          text('Foster', { fontSize: 14, fontWeight: 400, color: med }),
          text('Donate', { fontSize: 14, fontWeight: 400, color: med }),
          text('Success Stories', { fontSize: 14, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('Hero', {
      autoLayout: vertical({ spacing: 12, padX: 48, padY: 36, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#9f1239', position: 0 }, { hex: '#f43f5e', position: 0.5 }, { hex: '#fb7185', position: 1 }], 135)],
      children: [
        text('Find Your New Best Friend', { fontSize: 36, fontWeight: 700, color: white }),
        text('Hundreds of loving pets are waiting for their forever home', { fontSize: 15, fontWeight: 400, color: '#fecdd3' }),
      ],
    }),
    frame('Pets', {
      autoLayout: vertical({ spacing: 16, padX: 48, padY: 24 }), layoutSizingHorizontal: 'FILL',
      children: [
        frame('FilterRow', { autoLayout: horizontal({ align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
          text('Available Pets', { fontSize: 22, fontWeight: 700, color: dark }),
          frame('Filters', { autoLayout: horizontal({ spacing: 8 }), children: [
            frame('FilterAll', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(rose)], cornerRadius: 9999,
              children: [text('All', { fontSize: 12, fontWeight: 600, color: white })] }),
            frame('FilterDogs', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(white)], cornerRadius: 9999,
              children: [text('Dogs', { fontSize: 12, fontWeight: 400, color: med })] }),
            frame('FilterCats', { autoLayout: horizontal({ padX: 12, padY: 6 }), fills: [solid(white)], cornerRadius: 9999,
              children: [text('Cats', { fontSize: 12, fontWeight: 400, color: med })] }),
          ]}),
        ]}),
        frame('PetGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
          petCard('Luna', 'Golden Retriever', '2 years', 'Female', '#f59e0b', '#d97706', ['Friendly', 'Trained']),
          petCard('Mochi', 'Ragdoll Cat', '1 year', 'Male', '#8b5cf6', '#6d28d9', ['Indoor', 'Playful']),
          petCard('Rocky', 'German Shepherd', '3 years', 'Male', '#78716c', '#57534e', ['Active', 'Loyal']),
          petCard('Bella', 'Calico Cat', '4 months', 'Female', '#ec4899', '#db2777', ['Kitten', 'Cuddly']),
        ]}),
      ],
    }),
  ],
});
