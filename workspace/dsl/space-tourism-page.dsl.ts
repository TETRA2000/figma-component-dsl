/**
 * Space Tourism — Destination cards, mission timeline, and pricing tiers
 * DSL features: dark theme, gradient space images, large numbers, timeline with ellipse dots
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function destinationCard(name: string, distance: string, duration: string, grad1: string, grad2: string) {
  return frame(`Dest: ${name}`, {
    autoLayout: vertical({ spacing: 0 }),
    fills: [solid('#1e1b4b')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.30, g: 0.27, b: 0.53, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('DestImage', { size: { x: 1, y: 140 }, fills: [gradient([{ hex: grad1, position: 0 }, { hex: grad2, position: 1 }], 135)], cornerRadius: { topLeft: 16, topRight: 16, bottomLeft: 0, bottomRight: 0 }, layoutSizingHorizontal: 'FILL' }),
      frame('DestInfo', {
        autoLayout: vertical({ spacing: 8, padX: 16, padY: 14 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 18, fontWeight: 700, color: '#e0e7ff' }),
          frame('Stats', { autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }), layoutSizingHorizontal: 'FILL', children: [
            frame('Dist', { autoLayout: vertical({ spacing: 2 }), children: [
              text(distance, { fontSize: 20, fontWeight: 800, color: '#818cf8' }),
              text('distance', { fontSize: 10, fontWeight: 400, color: '#6366f1' }),
            ] }),
            frame('Dur', { autoLayout: vertical({ spacing: 2, counterAlign: 'MAX' }), children: [
              text(duration, { fontSize: 20, fontWeight: 800, color: '#818cf8' }),
              text('travel time', { fontSize: 10, fontWeight: 400, color: '#6366f1' }),
            ] }),
          ] }),
        ],
      }),
    ],
  });
}

function timelineStep(step: string, title: string, desc: string, isComplete: boolean) {
  return frame(`Step: ${title}`, {
    autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('DotCol', { autoLayout: vertical({ spacing: 0, counterAlign: 'CENTER' }), children: [
        ellipse('Dot', { size: { x: 18, y: 18 }, fills: [solid(isComplete ? '#818cf8' : '#312e81')] }),
      ] }),
      frame('StepInfo', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        text(`${step}. ${title}`, { fontSize: 14, fontWeight: 600, color: isComplete ? '#e0e7ff' : '#4c4f82' }),
        text(desc, { fontSize: 12, fontWeight: 400, color: isComplete ? '#a5b4fc' : '#3b3d6e' }),
      ] }),
    ],
  });
}

function priceTier(name: string, price: string, features: string[], highlight: boolean) {
  return frame(`Tier: ${name}`, {
    autoLayout: vertical({ spacing: 12, padX: 20, padY: 22, counterAlign: 'CENTER' }),
    fills: [solid(highlight ? '#4338ca' : '#1e1b4b')],
    cornerRadius: 16,
    layoutSizingHorizontal: 'FILL',
    strokes: highlight ? [] : [{ color: { r: 0.30, g: 0.27, b: 0.53, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(name, { fontSize: 16, fontWeight: 700, color: '#e0e7ff', textAlignHorizontal: 'CENTER' }),
      text(price, { fontSize: 36, fontWeight: 800, color: highlight ? '#ffffff' : '#818cf8', textAlignHorizontal: 'CENTER' }),
      ...features.map(f => text(f, { fontSize: 12, fontWeight: 400, color: '#a5b4fc', textAlignHorizontal: 'CENTER' })),
    ],
  });
}

export default frame('SpaceTourismPage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f0d2e')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 10, padX: 56, padY: 48, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0f0d2e', position: 0 }, { hex: '#312e81', position: 1 }], 180)],
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Stellar Voyages', { fontSize: 36, fontWeight: 800, color: '#e0e7ff', textAlignHorizontal: 'CENTER' }),
        text('Your journey beyond Earth starts here', { fontSize: 15, fontWeight: 400, color: '#818cf8', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 32, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Destinations', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Destinations', { fontSize: 22, fontWeight: 700, color: '#e0e7ff' }),
            frame('DestGrid', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              destinationCard('Lunar Gateway', '384,400 km', '3 days', '#1e1b4b', '#4338ca'),
              destinationCard('Mars Colony', '225M km', '7 months', '#4c1d95', '#7c3aed'),
              destinationCard('Europa Station', '628M km', '2.5 years', '#134e4a', '#0d9488'),
            ] }),
          ],
        }),
        frame('Timeline', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Mission Timeline', { fontSize: 20, fontWeight: 700, color: '#e0e7ff' }),
            timelineStep('1', 'Medical Screening', 'Full health assessment and clearance', true),
            timelineStep('2', 'Zero-G Training', '6-week preparation program', true),
            timelineStep('3', 'Launch Day', 'Departure from Spaceport Alpha', false),
            timelineStep('4', 'Arrival', 'Touchdown at your destination', false),
          ],
        }),
        frame('Pricing', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Pricing Tiers', { fontSize: 20, fontWeight: 700, color: '#e0e7ff', textAlignHorizontal: 'CENTER' }),
            frame('TierGrid', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              priceTier('Explorer', '$250K', ['Lunar orbit', 'Shared cabin', '3-day trip'], false),
              priceTier('Pioneer', '$1.2M', ['Mars flyby', 'Private suite', 'EVA included'], true),
              priceTier('Voyager', '$5M', ['Deep space', 'Luxury pod', 'Full mission'], false),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
