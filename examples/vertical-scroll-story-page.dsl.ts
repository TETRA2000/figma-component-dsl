import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
// Reference: Japanese storytelling — Tall sections, scroll-pacing layout, sequential reveal
const dark = '#1a1410'; const white = '#faf8f2'; const gold = '#c8a44e'; const cream = '#f0ece0';
const med = '#7a7068'; const ink = '#2a2420'; const warmGray = '#b0a898';

function chapterSection(num: string, title: string, body: string, g1: string, g2: string) {
  return frame(`Chapter${num}`, {
    autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
    children: [
      rectangle(`ChapterImg${num}`, { size: { x: 1440, y: 300 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 180)] }),
      frame(`ChapterText${num}`, {
        autoLayout: vertical({ spacing: 12, padX: 200, padY: 48 }), layoutSizingHorizontal: 'FILL', fills: [solid(white)],
        children: [
          text(`Chapter ${num}`, { fontSize: 11, fontWeight: 400, color: gold, letterSpacing: { value: 4, unit: 'PIXELS' as const } }),
          text(title, { fontSize: 28, fontWeight: 200, color: ink }),
          rectangle(`Divider${num}`, { size: { x: 40, y: 1 }, fills: [solid(gold, 0.3)] }),
          text(body, { fontSize: 14, fontWeight: 300, color: med, size: { x: 600 }, textAutoResize: 'HEIGHT' as const, lineHeight: { value: 24, unit: 'PIXELS' as const } }),
        ],
      }),
    ],
  });
}

export default frame('VerticalScrollStory', {
  size: { x: 1440, y: undefined }, autoLayout: vertical({ spacing: 0 }), fills: [solid(cream)],
  children: [
    frame('TitlePage', {
      autoLayout: vertical({ spacing: 20, padX: 200, padY: 120, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [gradient([{ hex: '#1a1410', position: 0 }, { hex: '#2a2420', position: 0.5 }, { hex: '#4a3a30', position: 1 }], 180)],
      children: [
        text('THE TOKAIDO ROAD', { fontSize: 12, fontWeight: 400, color: gold, letterSpacing: { value: 8, unit: 'PIXELS' as const } }),
        text('53 Stations of\nthe Eastern Sea', { fontSize: 48, fontWeight: 200, color: white, lineHeight: { value: 58, unit: 'PIXELS' as const } }),
        rectangle('TitleLine', { size: { x: 50, y: 1 }, fills: [solid(gold, 0.5)] }),
        text('A journey through Edo-period Japan, following the ancient highway\nfrom Tokyo to Kyoto — 492 kilometers of changing landscapes', { fontSize: 14, fontWeight: 300, color: warmGray, lineHeight: { value: 22, unit: 'PIXELS' as const } }),
      ],
    }),
    chapterSection('I', 'The Departure', 'The journey begins at Nihonbashi bridge in Edo, where merchants, samurai, and pilgrims set out along the coastal road. The morning mist lifts from the Sumida River as travelers adjust their straw sandals and check their provisions. Each step takes them further from the capital and deeper into the landscapes that Hiroshige would immortalize in woodblock prints.', '#3a4a50', '#6a7a80'),
    chapterSection('II', 'The Mountain Pass', 'At Hakone, the road climbs into the clouds. The checkpoint here was the most feared along the Tokaido — guards inspecting travel permits, searching for smuggled weapons and women fleeing Edo. Beyond the barrier, Lake Ashi reflects the inverted cone of Mount Fuji, a sight that moved poets and artists to tears.', '#4a5a3a', '#8a9a70'),
    chapterSection('III', 'The Arrival', 'Kyoto emerges slowly through the morning haze. The ancient capital, seat of the Emperor and center of culture for a thousand years. The journey has taken fourteen days. The traveler, dusty and footsore, pauses at Sanjo Bridge to look back along the road that connects two worlds — the political capital of Edo and the cultural heart of Kyoto.', '#5a4a3a', '#a08868'),
    frame('Epilogue', {
      autoLayout: vertical({ spacing: 14, padX: 200, padY: 80, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL', fills: [solid(ink)],
      children: [
        rectangle('EndLine', { size: { x: 30, y: 1 }, fills: [solid(gold, 0.3)] }),
        text('The road is the destination', { fontSize: 22, fontWeight: 200, color: white }),
        text('— Basho', { fontSize: 12, fontWeight: 300, color: warmGray }),
      ],
    }),
  ],
});
