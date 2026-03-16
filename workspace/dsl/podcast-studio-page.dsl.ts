/**
 * Podcast Studio Dashboard — Recording studio with episode list, waveform placeholder, and stats
 * DSL features stressed: dark theme fills, rectangle waveform bars, gradient accents,
 * progress bars, SPACE_BETWEEN layouts, opacity text colors
 */
import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function episodeRow(number: number, title: string, date: string, duration: string, plays: string, status: 'published' | 'draft' | 'recording') {
  const statusColors = { published: '#22c55e', draft: '#f59e0b', recording: '#ef4444' };
  const statusBg = { published: '#22c55e1a', draft: '#f59e0b1a', recording: '#ef44441a' };
  return frame(`Episode: ${title}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    fills: [solid('#1e1e2e')],
    cornerRadius: 10,
    layoutSizingHorizontal: 'FILL',
    children: [
      frame('EpNumber', {
        size: { x: 36, y: 36 },
        autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#ffffff0d')],
        cornerRadius: 8,
        children: [
          text(`#${number}`, { fontSize: 12, fontWeight: 700, color: '#a78bfa' }),
        ],
      }),
      frame('EpInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#f1f5f9' }),
          text(`${date} · ${duration}`, { fontSize: 12, fontWeight: 400, color: '#64748b' }),
        ],
      }),
      text(plays, { fontSize: 13, fontWeight: 500, color: '#94a3b8' }),
      frame('StatusBadge', {
        autoLayout: horizontal({ spacing: 0, padX: 10, padY: 4 }),
        fills: [solid(statusBg[status])],
        cornerRadius: 9999,
        children: [
          text(status.charAt(0).toUpperCase() + status.slice(1), { fontSize: 11, fontWeight: 600, color: statusColors[status] }),
        ],
      }),
    ],
  });
}

function statCard(label: string, value: string, change: string, isPositive: boolean) {
  return frame(`Stat: ${label}`, {
    autoLayout: vertical({ spacing: 8, padX: 20, padY: 18 }),
    fills: [solid('#1e1e2e')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#64748b' }),
      text(value, { fontSize: 28, fontWeight: 800, color: '#f1f5f9' }),
      text(change, { fontSize: 12, fontWeight: 600, color: isPositive ? '#22c55e' : '#ef4444' }),
    ],
  });
}

function waveformBar(height: number) {
  return rectangle('Bar', {
    size: { x: 4, y: height },
    fills: [gradient([{ hex: '#a78bfa', position: 0 }, { hex: '#6d28d9', position: 1 }], 180)],
    cornerRadius: 2,
  });
}

function waveformVisualizer() {
  const heights = [12, 28, 18, 36, 24, 42, 30, 20, 38, 14, 32, 26, 44, 18, 34, 22, 40, 16, 30, 28, 36, 12, 24, 38, 20, 32, 42, 14, 26, 34];
  return frame('Waveform', {
    autoLayout: horizontal({ spacing: 3, padX: 20, padY: 16, counterAlign: 'MAX' }),
    fills: [solid('#1e1e2e')],
    cornerRadius: 12,
    layoutSizingHorizontal: 'FILL',
    size: { x: 1, y: 80 },
    children: heights.map(h => waveformBar(h)),
  });
}

export default frame('PodcastStudioPage', {
  size: { x: 1000 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#13131f')],
  children: [
    // Header
    frame('Header', {
      autoLayout: horizontal({ spacing: 0, padX: 32, padY: 20, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#1e1e2e')],
      strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        frame('Logo', {
          autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
          children: [
            ellipse('LogoDot', { size: { x: 10, y: 10 }, fills: [solid('#a78bfa')] }),
            text('PodStudio', { fontSize: 20, fontWeight: 800, color: '#f1f5f9' }),
          ],
        }),
        frame('HeaderRight', {
          autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
          children: [
            frame('NewEpBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 16, padY: 8 }),
              fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#a78bfa', position: 1 }], 90)],
              cornerRadius: 8,
              children: [
                text('+ New Episode', { fontSize: 13, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
            ellipse('Avatar', { size: { x: 32, y: 32 }, fills: [solid('#a78bfa33')] }),
          ],
        }),
      ],
    }),

    // Content
    frame('Content', {
      autoLayout: vertical({ spacing: 24, padX: 32, padY: 28 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Stats row
        frame('StatsRow', {
          autoLayout: horizontal({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            statCard('Total Plays', '148.2K', '+12.4% this month', true),
            statCard('Subscribers', '3,842', '+8.2% this month', true),
            statCard('Avg. Duration', '42 min', '-2.1% this month', false),
            statCard('Episodes', '47', '+3 this month', true),
          ],
        }),

        // Now Recording section
        frame('RecordingSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('RecordingHeader', {
              autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                ellipse('RecDot', { size: { x: 8, y: 8 }, fills: [solid('#ef4444')] }),
                text('Now Recording — Episode 48', { fontSize: 16, fontWeight: 600, color: '#f1f5f9' }),
                text('01:23:45', { fontSize: 14, fontWeight: 500, color: '#ef4444' }),
              ],
            }),
            waveformVisualizer(),
            // Playback controls
            frame('Controls', {
              autoLayout: horizontal({ spacing: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('00:00', { fontSize: 12, fontWeight: 500, color: '#64748b' }),
                frame('ProgressTrack', {
                  size: { x: 600, y: 4 },
                  fills: [solid('#ffffff0d')],
                  cornerRadius: 2,
                  children: [
                    rectangle('ProgressFill', {
                      size: { x: 380, y: 4 },
                      fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#a78bfa', position: 1 }], 90)],
                      cornerRadius: 2,
                    }),
                  ],
                }),
                text('01:23:45', { fontSize: 12, fontWeight: 500, color: '#64748b' }),
              ],
            }),
          ],
        }),

        // Episode list
        frame('EpisodeSection', {
          autoLayout: vertical({ spacing: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('EpisodeHeader', {
              autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
              layoutSizingHorizontal: 'FILL',
              children: [
                text('Recent Episodes', { fontSize: 18, fontWeight: 700, color: '#f1f5f9' }),
                text('View all', { fontSize: 13, fontWeight: 600, color: '#a78bfa' }),
              ],
            }),
            episodeRow(47, 'The Future of AI in Creative Work', 'Mar 14, 2026', '58 min', '2.4K plays', 'published'),
            episodeRow(46, 'Building Habits That Stick', 'Mar 7, 2026', '45 min', '3.1K plays', 'published'),
            episodeRow(45, 'Interview: Tech Startup Founders', 'Feb 28, 2026', '1h 12min', '5.8K plays', 'published'),
            episodeRow(44, 'Mindfulness for Busy People', 'Feb 21, 2026', '38 min', '1.9K plays', 'published'),
            episodeRow(48, 'Live Recording Session', 'Mar 16, 2026', 'In progress', '—', 'recording'),
          ],
        }),
      ],
    }),
  ],
});
