/**
 * Space Tourism — Destination cards, mission timeline, and pricing (dark theme)
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function destinationCard(name: string, distance: string, duration: string, desc: string, color: string) {
  return frame(`Dest: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 18, padY: 18 }),
    fills: [solid('#1e293b')],
    cornerRadius: 14,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('DestImg', { size: { x: 240, y: 140 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#000000', position: 1 }], 160)], cornerRadius: 10, layoutSizingHorizontal: 'FILL' }),
      text(name, { fontSize: 18, fontWeight: 700, color: '#f1f5f9' }),
      text(desc, { fontSize: 12, fontWeight: 400, color: '#94a3b8' }),
      frame('Stats', { autoLayout: horizontal({ spacing: 16 }), children: [
        frame('Dist', { autoLayout: vertical({ spacing: 2 }), children: [
          text('Distance', { fontSize: 10, fontWeight: 500, color: '#64748b' }),
          text(distance, { fontSize: 13, fontWeight: 700, color }),
        ] }),
        frame('Dur', { autoLayout: vertical({ spacing: 2 }), children: [
          text('Duration', { fontSize: 10, fontWeight: 500, color: '#64748b' }),
          text(duration, { fontSize: 13, fontWeight: 700, color }),
        ] }),
      ] }),
    ],
  });
}

function timelineStep(phase: string, desc: string, done: boolean) {
  return frame(`Phase: ${phase}`, {
    autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Dot', { size: { x: 14, y: 14 }, fills: [solid(done ? '#6366f1' : '#334155')] }),
      frame('PhaseInfo', { autoLayout: vertical({ spacing: 2 }), layoutSizingHorizontal: 'FILL', children: [
        text(phase, { fontSize: 13, fontWeight: 600, color: done ? '#e0e7ff' : '#64748b' }),
        text(desc, { fontSize: 11, fontWeight: 400, color: '#94a3b8' }),
      ] }),
    ],
  });
}

function pricingOption(name: string, price: string, features: string[], color: string) {
  return frame(`Price: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
    fills: [solid('#1e293b')],
    cornerRadius: 14,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 16, fontWeight: 700, color: '#f1f5f9' }),
      text(price, { fontSize: 28, fontWeight: 800, color }),
      ...features.map(f => text(`✓ ${f}`, { fontSize: 12, fontWeight: 400, color: '#94a3b8' })),
      frame('BookBtn', { autoLayout: horizontal({ padX: 20, padY: 8, align: 'CENTER' }), fills: [solid(color)], cornerRadius: 8, layoutSizingHorizontal: 'FILL', children: [
        text('Reserve Seat', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
      ] }),
    ],
  });
}

export default frame('SpaceTourismPage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0f172a')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 10, padX: 56, padY: 48, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#000000', position: 0 }, { hex: '#1e1b4b', position: 1 }], 180)],
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Badge', { autoLayout: horizontal({ padX: 14, padY: 4 }), fills: [solid('#6366f133')], cornerRadius: 9999, children: [text('Now Accepting Reservations', { fontSize: 11, fontWeight: 600, color: '#a5b4fc' })] }),
        text('Odyssey Space Tours', { fontSize: 34, fontWeight: 900, color: '#ffffff' }),
        text('Experience the cosmos — commercial space travel for civilians', { fontSize: 15, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 32, padX: 56, padY: 36 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Destinations', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Destinations', { fontSize: 22, fontWeight: 700, color: '#f1f5f9' }),
            frame('DestGrid', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              destinationCard('Lunar Orbit', '384,400 km', '7 days', 'Circle the Moon and witness Earthrise from 400,000 km away', '#6366f1'),
              destinationCard('Space Station', '408 km', '3 days', 'Dock at the ISS and experience life in microgravity', '#06b6d4'),
              destinationCard('Mars Flyby', '225M km', '14 months', 'The ultimate adventure — a slingshot past the Red Planet', '#ef4444'),
            ] }),
          ],
        }),
        frame('Timeline', {
          autoLayout: vertical({ spacing: 12, padX: 20, padY: 20 }),
          fills: [solid('#1e293b')],
          cornerRadius: 14,
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Mission Timeline', { fontSize: 18, fontWeight: 700, color: '#f1f5f9' }),
            timelineStep('Phase 1 — Training', '6 months of astronaut preparation and fitness', true),
            timelineStep('Phase 2 — Medical Clearance', 'Full physical evaluation and zero-G simulation', true),
            timelineStep('Phase 3 — Launch Prep', '2-week pre-launch quarantine and final briefing', false),
            timelineStep('Phase 4 — Mission', 'Liftoff, orbital insertion, and destination arrival', false),
            timelineStep('Phase 5 — Return', 'Re-entry, splashdown, and debriefing', false),
          ],
        }),
        frame('Pricing', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Pricing', { fontSize: 22, fontWeight: 700, color: '#f1f5f9' }),
            frame('PriceGrid', { autoLayout: horizontal({ spacing: 16 }), layoutSizingHorizontal: 'FILL', children: [
              pricingOption('Explorer', '$250,000', ['Suborbital flight', '15 min weightlessness', 'Space suit photo', 'Certificate'], '#06b6d4'),
              pricingOption('Voyager', '$2.5M', ['Orbital stay (3 days)', 'ISS visit', 'Spacewalk experience', 'Full media package'], '#6366f1'),
              pricingOption('Pioneer', '$25M', ['Mars flyby mission', '14-month journey', 'Private suite', 'Lifetime membership', 'Name a crater'], '#ef4444'),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
