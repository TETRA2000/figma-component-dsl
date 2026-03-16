/**
 * Tech Conference — Speaker lineup, schedule tracks, and sponsor logos
 * DSL features: two-column schedule, speaker cards with ellipse avatars, badge pills, gradient hero
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function speakerCard(name: string, role: string, topic: string, color: string) {
  return frame(`Speaker: ${name}`, {
    autoLayout: vertical({ spacing: 10, padX: 16, padY: 16, counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      ellipse('Avatar', { size: { x: 52, y: 52 }, fills: [gradient([{ hex: color, position: 0 }, { hex: '#6366f1', position: 1 }], 135)] }),
      text(name, { fontSize: 14, fontWeight: 600, color: '#0f172a', textAlignHorizontal: 'CENTER' }),
      text(role, { fontSize: 11, fontWeight: 400, color: '#64748b', textAlignHorizontal: 'CENTER' }),
      frame('TopicBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
        fills: [solid(color + '15')],
        cornerRadius: 6,
        children: [text(topic, { fontSize: 10, fontWeight: 600, color, textAlignHorizontal: 'CENTER' })],
      }),
    ],
  });
}

function scheduleItem(time: string, title: string, speaker: string, track: string) {
  const trackColors: Record<string, string> = { Frontend: '#3b82f6', Backend: '#10b981', AI: '#f59e0b', DevOps: '#ef4444' };
  const tc = trackColors[track] || '#6b7280';
  return frame(`Talk: ${title}`, {
    autoLayout: horizontal({ spacing: 0, padX: 14, padY: 12, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff')],
    cornerRadius: 8,
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 0.94, g: 0.94, b: 0.94, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      frame('TalkInfo', { autoLayout: vertical({ spacing: 3 }), layoutSizingHorizontal: 'FILL', children: [
        text(title, { fontSize: 13, fontWeight: 600, color: '#0f172a' }),
        text(`${speaker} · ${time}`, { fontSize: 11, fontWeight: 400, color: '#64748b' }),
      ] }),
      frame('TrackBadge', { autoLayout: horizontal({ spacing: 0, padX: 8, padY: 3 }), fills: [solid(tc + '1a')], cornerRadius: 4, children: [
        text(track, { fontSize: 10, fontWeight: 600, color: tc }),
      ] }),
    ],
  });
}

function sponsorLogo(name: string, color: string) {
  return frame(`Sponsor: ${name}`, {
    autoLayout: horizontal({ spacing: 0, padX: 20, padY: 12, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#f8fafc')],
    cornerRadius: 8,
    strokes: [{ color: { r: 0.92, g: 0.92, b: 0.92, a: 1 }, weight: 1, align: 'INSIDE' as const }],
    children: [text(name, { fontSize: 14, fontWeight: 700, color })],
  });
}

export default frame('TechConferencePage', {
  size: { x: 1100 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#f8fafc')],
  children: [
    frame('Hero', {
      autoLayout: vertical({ spacing: 10, padX: 56, padY: 44, counterAlign: 'CENTER' }),
      fills: [gradient([{ hex: '#0f172a', position: 0 }, { hex: '#1e40af', position: 1 }], 150)],
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('DateBadge', { autoLayout: horizontal({ spacing: 0, padX: 12, padY: 4 }), fills: [solid('#ffffff1a')], cornerRadius: 9999, children: [
          text('April 15-17, 2026', { fontSize: 12, fontWeight: 600, color: '#93c5fd' }),
        ] }),
        text('DevSummit 2026', { fontSize: 34, fontWeight: 800, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
        text('Where builders connect, learn, and ship', { fontSize: 15, fontWeight: 400, color: '#93c5fd', textAlignHorizontal: 'CENTER' }),
      ],
    }),
    frame('Content', {
      autoLayout: vertical({ spacing: 28, padX: 48, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('Speakers', {
          autoLayout: vertical({ spacing: 14 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Featured Speakers', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('SpeakerGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              speakerCard('Sarah Chen', 'CTO, Vercel', 'React Server Components', '#3b82f6'),
              speakerCard('Alex Rivera', 'Lead Engineer, OpenAI', 'LLM-Powered Dev Tools', '#f59e0b'),
              speakerCard('Priya Nair', 'Principal, Stripe', 'API Design Patterns', '#10b981'),
              speakerCard('Marcus Johnson', 'SRE Lead, Google', 'Zero-Downtime Deploys', '#ef4444'),
            ] }),
          ],
        }),
        frame('Schedule', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Day 1 Schedule', { fontSize: 20, fontWeight: 700, color: '#0f172a' }),
            frame('ScheduleGrid', { autoLayout: horizontal({ spacing: 14 }), layoutSizingHorizontal: 'FILL', children: [
              frame('Track1', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
                scheduleItem('9:00 AM', 'Keynote: The Future of Web', 'Sarah Chen', 'Frontend'),
                scheduleItem('10:30 AM', 'Building with AI Agents', 'Alex Rivera', 'AI'),
                scheduleItem('1:00 PM', 'Edge Computing at Scale', 'Marcus Johnson', 'DevOps'),
              ] }),
              frame('Track2', { autoLayout: vertical({ spacing: 8 }), layoutSizingHorizontal: 'FILL', children: [
                scheduleItem('9:00 AM', 'gRPC Best Practices', 'Priya Nair', 'Backend'),
                scheduleItem('10:30 AM', 'CSS Container Queries Deep Dive', 'Lee Wei', 'Frontend'),
                scheduleItem('1:00 PM', 'Fine-Tuning Open Models', 'Nina Patel', 'AI'),
              ] }),
            ] }),
          ],
        }),
        frame('Sponsors', {
          autoLayout: vertical({ spacing: 12, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Sponsors', { fontSize: 18, fontWeight: 700, color: '#0f172a', textAlignHorizontal: 'CENTER' }),
            frame('SponsorRow', { autoLayout: horizontal({ spacing: 12 }), children: [
              sponsorLogo('Vercel', '#0f172a'), sponsorLogo('Stripe', '#6772e5'),
              sponsorLogo('Cloudflare', '#f38020'), sponsorLogo('Supabase', '#3ecf8e'),
              sponsorLogo('Prisma', '#2d3748'),
            ] }),
          ],
        }),
      ],
    }),
  ],
});
