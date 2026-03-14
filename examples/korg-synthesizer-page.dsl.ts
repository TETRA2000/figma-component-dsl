import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: korg.com — Dense product specs, dark theme, technical data, equipment cards
const dark = '#121212'; const surface = '#1e1e1e'; const white = '#e0e0e0'; const accent = '#00bcd4';
const med = '#808080'; const dimWhite = '#a0a0a0'; const orange = '#ff6d00';

function specRow(label: string, value: string) {
  return frame(`Spec: ${label}`, {
    autoLayout: horizontal({ align: 'SPACE_BETWEEN', padX: 0, padY: 6 }), layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(label, { fontSize: 11, fontWeight: 400, color: med }),
      text(value, { fontSize: 11, fontWeight: 500, color: white }),
    ],
  });
}

function synthCard(name: string, type: string, price: string, desc: string, g1: string, g2: string) {
  return frame(`Synth: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16 }), size: { x: 300, y: undefined },
    fills: [solid(surface)], cornerRadius: 4,
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.08 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      rectangle('SynthImg', { size: { x: 268, y: 160 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)], cornerRadius: 2 }),
      text(type, { fontSize: 9, fontWeight: 500, color: accent, letterSpacing: { value: 2, unit: 'PIXELS' as const } }),
      text(name, { fontSize: 16, fontWeight: 600, color: white }),
      text(desc, { fontSize: 11, fontWeight: 400, color: med }),
      text(price, { fontSize: 14, fontWeight: 600, color: orange }),
    ],
  });
}

export default frame('KORGSynthesizer', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(dark)],
  children: [
    frame('Header', {
      autoLayout: horizontal({ padX: 40, padY: 14, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(surface)],
      children: [
        text('KORG', { fontSize: 20, fontWeight: 800, color: white, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
        frame('Nav', { autoLayout: horizontal({ spacing: 20 }), children: [
          text('Synthesizers', { fontSize: 12, fontWeight: 500, color: accent }),
          text('Workstations', { fontSize: 12, fontWeight: 400, color: med }),
          text('DJ', { fontSize: 12, fontWeight: 400, color: med }),
          text('Tuners', { fontSize: 12, fontWeight: 400, color: med }),
          text('Support', { fontSize: 12, fontWeight: 400, color: med }),
        ]}),
      ],
    }),
    frame('FeaturedProduct', {
      autoLayout: horizontal({ padX: 40, padY: 32, spacing: 32, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#121212', position: 0 }, { hex: '#1a2a2e', position: 0.5 }, { hex: '#121212', position: 1 }], 90)],
      children: [
        rectangle('FeaturedImg', { size: { x: 560, y: 300 },
          fills: [gradient([{ hex: '#1a1a2a', position: 0 }, { hex: '#2a3a4a', position: 0.5 }, { hex: '#1a2a3a', position: 1 }], 135)], cornerRadius: 4 }),
        frame('FeaturedInfo', { autoLayout: vertical({ spacing: 12 }), layoutSizingHorizontal: 'FILL', children: [
          text('NEW RELEASE', { fontSize: 10, fontWeight: 600, color: orange, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
          text('minilogue xd', { fontSize: 28, fontWeight: 300, color: white }),
          text('Polyphonic Analogue Synthesizer', { fontSize: 13, fontWeight: 400, color: accent }),
          text('A next-generation polyphonic analog synthesizer with a multi-engine, digital effects, and a 16-step polyphonic sequencer.', { fontSize: 12, fontWeight: 400, color: med, size: { x: 380 }, textAutoResize: 'HEIGHT' as const }),
          frame('SpecsTable', { autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL', children: [
            specRow('Voices', '4-voice polyphonic'),
            specRow('Oscillators', '2 VCO + Multi Engine'),
            specRow('Filter', '2-pole low pass'),
            specRow('Effects', 'Modulation, Reverb, Delay'),
            specRow('Keys', '37 slim keys'),
          ]}),
          text('¥72,600', { fontSize: 18, fontWeight: 600, color: orange }),
        ]}),
      ],
    }),
    frame('ProductGrid', {
      autoLayout: vertical({ spacing: 16, padX: 40, padY: 28 }), layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular Synthesizers', { fontSize: 16, fontWeight: 600, color: white }),
        frame('Grid', { autoLayout: horizontal({ spacing: 14 }), children: [
          synthCard('Prologue 16', 'ANALOG', '¥209,000', '16-voice flagship analog poly synth', '#1a2a3a', '#2a3a4a'),
          synthCard('Wavestate', 'DIGITAL', '¥88,000', 'Wave sequencing synthesizer', '#2a1a3a', '#3a2a4a'),
          synthCard('Modwave', 'DIGITAL', '¥88,000', 'Wavetable synthesizer with motion 2.0', '#1a3a2a', '#2a4a3a'),
          synthCard('ARP 2600', 'SEMI-MODULAR', '¥429,000', 'Full-size reissue of the legendary synth', '#2a2a1a', '#3a3a2a'),
        ]}),
      ],
    }),
  ],
});
