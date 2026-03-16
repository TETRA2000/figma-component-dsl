/**
 * Music Player — Album header, track list, player controls
 * DSL features: dark theme, gradient album art, highlighted row, progress bar, SPACE_BETWEEN
 */
import { frame, text, rectangle, solid, gradient, horizontal, vertical } from '@figma-dsl/core';

function trackItem(num: number, title: string, artist: string, duration: string, playing: boolean) {
  return frame(`Track: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    fills: [solid(playing ? '#ffffff0d' : '#00000000')],
    layoutSizingHorizontal: 'FILL',
    strokes: [{ color: { r: 1, g: 1, b: 1, a: 0.06 }, weight: 1, align: 'INSIDE' as const }],
    children: [
      text(String(num), { fontSize: 13, fontWeight: 400, color: playing ? '#a78bfa' : '#6b7280' }),
      rectangle('Art', { size: { x: 36, y: 36 }, fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#3b82f6', position: 1 }], 135)], cornerRadius: 4 }),
      frame('TrackInfo', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: playing ? 600 : 400, color: playing ? '#a78bfa' : '#ffffff' }),
          text(artist, { fontSize: 12, fontWeight: 400, color: '#6b7280' }),
        ],
      }),
      text(duration, { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
    ],
  });
}

export default frame('MusicPlayerPage', {
  size: { x: 520 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#111111')],
  children: [
    // Album header
    frame('AlbumHeader', {
      autoLayout: horizontal({ spacing: 24, padX: 24, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        rectangle('AlbumArt', {
          size: { x: 200, y: 200 },
          fills: [gradient([{ hex: '#7c3aed', position: 0 }, { hex: '#3b82f6', position: 0.5 }, { hex: '#06b6d4', position: 1 }], 135)],
          cornerRadius: 8,
        }),
        frame('AlbumInfo', {
          autoLayout: vertical({ spacing: 8 }),
          children: [
            text('ALBUM', { fontSize: 11, fontWeight: 600, color: '#6b7280' }),
            text('Midnight Echoes', { fontSize: 24, fontWeight: 700, color: '#ffffff' }),
            text('Luna Wave', { fontSize: 16, fontWeight: 500, color: '#a78bfa' }),
            text('2026 - 8 tracks', { fontSize: 13, fontWeight: 400, color: '#6b7280' }),
            frame('PlayBtn', {
              autoLayout: horizontal({ spacing: 0, padX: 32, padY: 10, align: 'CENTER' }),
              fills: [solid('#a78bfa')],
              cornerRadius: 9999,
              children: [
                text('Play', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
              ],
            }),
          ],
        }),
      ],
    }),
    // Track list
    frame('TrackList', {
      autoLayout: vertical({ spacing: 0, padX: 8 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        trackItem(1, 'Neon Drifter', 'Luna Wave', '3:42', false),
        trackItem(2, 'Crystal Waves', 'Luna Wave', '4:18', false),
        trackItem(3, 'Velvet Horizon', 'Luna Wave', '4:12', true),
        trackItem(4, 'Echoes in Blue', 'Luna Wave', '3:55', false),
        trackItem(5, 'Starfall', 'Luna Wave', '5:01', false),
        trackItem(6, 'Lunar Tide', 'Luna Wave', '3:33', false),
        trackItem(7, 'Phantom Glow', 'Luna Wave', '4:27', false),
        trackItem(8, 'Midnight Run', 'Luna Wave', '3:48', false),
      ],
    }),
    // Player controls
    frame('PlayerBar', {
      autoLayout: vertical({ spacing: 8, padX: 24, padY: 16 }),
      fills: [solid('#1a1a1a')],
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('ProgressBar', {
          size: { x: 1, y: 4 },
          fills: [solid('#333333')],
          cornerRadius: 2,
          layoutSizingHorizontal: 'FILL',
          clipContent: true,
          children: [
            rectangle('ProgressFill', { size: { x: 290, y: 4 }, fills: [solid('#a78bfa')], cornerRadius: 2 }),
          ],
        }),
        frame('TimeRow', {
          autoLayout: horizontal({ spacing: 0, align: 'SPACE_BETWEEN' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('2:34', { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
            text('4:12', { fontSize: 11, fontWeight: 400, color: '#6b7280' }),
          ],
        }),
        frame('Controls', {
          autoLayout: horizontal({ spacing: 32, align: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Prev', { fontSize: 14, fontWeight: 500, color: '#9ca3af' }),
            frame('PlayButton', {
              size: { x: 48, y: 48 },
              autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
              fills: [solid('#a78bfa')],
              cornerRadius: 24,
              children: [
                text('Play', { fontSize: 14, fontWeight: 700, color: '#ffffff', textAlignHorizontal: 'CENTER' }),
              ],
            }),
            text('Next', { fontSize: 14, fontWeight: 500, color: '#9ca3af' }),
          ],
        }),
      ],
    }),
  ],
});
