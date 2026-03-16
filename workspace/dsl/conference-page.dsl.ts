/**
 * Tech Conference — Speaker cards, schedule, and ticket tiers
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function speakerCard(name: string, title: string, company: string, topic: string, color: string) {
  return frame(`Speaker: ${name}`, {
    autoLayout: vertical({ spacing: 8, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 14,
    strokes: [{ color: { r: 0.93, g: 0.93, b: 0.93, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      ellipse('Avatar', { size: { x: 60, y: 60 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#6366f1', position: 1 }], 135)] }),
      text(name, { fontSize: 15, fontWeight: 600, color: '#0f172a', textAlignHorizontal: 'CENTER' }),
      text(title, { fontSize: 11, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'CENTER' }),
      text(company, { fontSize: 11, fontWeight: 600, color, textAlignHorizontal: 'CENTER' }),
      frame('TopicBadge', { autoLayout: horizontal({ padX: 10, padY: 3 }), fills: [solid(color + '15')], cornerRadius: 9999, children: [
        text(topic, { fontSize: 10, fontWeight: 600, color }),
      ] }),
    ],
  });
}

function scheduleRow(time: string, title: string, speaker: string, room: string) {
  return frame(`Talk: ${title}`, {
    autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER', padX: 16, padY: 12 }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.95, g: 0.95, b: 0.95, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TalkInfo', { autoLayout: horizontal({ spacing: 14, counterAlign: 'CENTER' }), children: [
        text(time, { fontSize: 13, fontWeight: 700, color: '#6366f1' }),
        frame('TalkDetails', { autoLayout: vertical({ spacing: 2 }), children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#1e293b' }),
          text(speaker, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
        ] }),
      ] }),
      frame('RoomBadge', { autoLayout: horizontal({ padX: 10, padY: 4 }), fills: [solid('#f1f5f9')], cornerRadius: 6, children: [
        text(room, { fontSize: 11, fontWeight: 600, color: '#475569' }),
      ] }),
    ],
  });
}

function ticketTier(name: string, price: string, perks: string[], color: string, featured: boolean) {
  return frame(`Ticket: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 20, padY: 20 }),
    fills: [solid(featured ? color : '#ffffff')],
    cornerRadius: 14,
    strokes: featured ? [] : [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    layoutSizingHorizontal: 'FILL',
    children: [
      text(name, { fontSize: 18, fontWeight: 700, color: featured ? '#ffffff' : '#0f172a' }),
      text(price, { fontSize: 28, fontWeight: 800, color: featured ? '#ffffff' : color }),
      ...perks.map(p => text(`✓ ${p}`, { fontSize: 12, fontWeight: 400, color: featured ? '#ffffffcc' : '#475569' })),
    ],
  });
}

export default frame('ConferencePage', {
  size: { x: 1200 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 8, padX: 56, padY: 40, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#312e81', position: 1 }], 135)],
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('DateBadge', { autoLayout: horizontal({ padX: 14, padY: 4 }), fills: [solid('#6366f133')], cornerRadius: 9999, children: [text('June 15-17, 2026 · San Francisco', { fontSize: 12, fontWeight: 600, color: '#a5b4fc' })] }),
        text('DevSummit 2026', { fontSize: 32, fontWeight: 900, color: '#ffffff' }),
        text('Three days of talks, workshops, and networking', { fontSize: 15, fontWeight: 400, color: '#94a3b8' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 56, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Speakers', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Featured Speakers', { fontSize: 22, fontWeight: 700, color: '#0f172a' }),
            frame('SpeakerGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              speakerCard('Sarah Chen', 'VP of Engineering', 'Stripe', 'AI in FinTech', '#6366f1'),
              speakerCard('Marcus Wright', 'CTO', 'Vercel', 'Edge Computing', '#059669'),
              speakerCard('Aisha Patel', 'Staff Engineer', 'Google', 'WebAssembly', '#e11d48'),
              speakerCard('Tom Nakamura', 'Founder', 'Deno', 'Runtime Future', '#f59e0b'),
            ] }),
          ],
        }),
        frame('Schedule', {
          autoLayout: vertical({ spacing: 10 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Day 1 Schedule', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            scheduleRow('9:00 AM', 'Opening Keynote: The Future of Dev', 'Sarah Chen', 'Main Hall'),
            scheduleRow('10:30 AM', 'Building at the Edge', 'Marcus Wright', 'Room A'),
            scheduleRow('1:00 PM', 'WebAssembly Deep Dive', 'Aisha Patel', 'Room B'),
            scheduleRow('3:00 PM', 'Panel: Open Source Sustainability', 'Multiple', 'Main Hall'),
            scheduleRow('5:00 PM', 'Networking Happy Hour', 'All', 'Terrace'),
          ],
        }),
        frame('Tickets', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Get Your Ticket', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('TicketGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              ticketTier('General', '$399', ['All talks', 'Lunch included', 'Swag bag'], '#64748b', false),
              ticketTier('Pro', '$699', ['All talks + workshops', 'Priority seating', 'Dinner event', 'Recording access'], '#6366f1', true),
              ticketTier('VIP', '$1,299', ['Everything in Pro', 'Speaker meet & greet', 'Private lounge', 'Airport shuttle'], '#7c3aed', false),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
