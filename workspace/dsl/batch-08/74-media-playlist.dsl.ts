/**
 * Music Playlist — Playlist Header + Track List with Play Indicators
 * Batch 8, Page 4: Media/Entertainment — Music streaming playlist view
 * DSL Features: gradient header, numbered track list, dark theme
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaPlaylist', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Top Nav
    frame('TopNav', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 14, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('← Back', { fontSize: 14, fontWeight: 500, color: '#a3a3a3' }),
        frame('Spacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        text('WAVELENGTH', { fontSize: 18, fontWeight: 800, color: '#e11d48' }),
      ],
    }),

    // Playlist Header with Gradient
    frame('PlaylistHeader', {
      autoLayout: horizontal({ spacing: 32, padX: 60, padY: 48, counterAlign: 'MAX' }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#e11d48', position: 0 },
          { hex: '#7c1d3e', position: 0.4 },
          { hex: '#2d0a1a', position: 0.7 },
          { hex: '#0a0a0a', position: 1 },
        ], 270),
      ],
      children: [
        // Playlist Cover
        rectangle('PlaylistCover', {
          size: { x: 232, y: 232 },
          fills: [
            gradient([
              { hex: '#e11d48', position: 0 },
              { hex: '#1a0a2e', position: 1 },
            ], 135),
          ],
          cornerRadius: 8,
        }),
        // Playlist Info
        frame('PlaylistInfo', {
          autoLayout: vertical({ spacing: 12 }),
          children: [
            text('PLAYLIST', { fontSize: 12, fontWeight: 700, color: '#ffffff', letterSpacing: { value: 2, unit: 'PIXELS' } }),
            text('Midnight Vibes', { fontSize: 48, fontWeight: 800, color: '#ffffff', lineHeight: { value: 52, unit: 'PIXELS' } }),
            text('The ultimate late-night playlist. Smooth beats, ambient textures,\nand deep grooves to carry you through the night.', {
              fontSize: 15, fontWeight: 400, color: '#d4d4d4',
              lineHeight: { value: 22, unit: 'PIXELS' },
            }),
            frame('PlaylistMeta', {
              autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
              children: [
                rectangle('CreatorAvatar', {
                  size: { x: 24, y: 24 },
                  fills: [solid('#e11d48')],
                  cornerRadius: 12,
                }),
                text('CuratedByAI', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
                text('•  48 songs, 3h 12m', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
                text('•  12,847 saves', { fontSize: 14, fontWeight: 400, color: '#a3a3a3' }),
              ],
            }),
            frame('PlaylistActions', {
              autoLayout: horizontal({ spacing: 16, counterAlign: 'CENTER' }),
              children: [
                frame('PlayAllBtn', {
                  autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#e11d48')],
                  cornerRadius: 999,
                  children: [
                    text('▶  Play', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
                frame('ShuffleBtn', {
                  autoLayout: horizontal({ padX: 24, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#1a1a1a')],
                  cornerRadius: 999,
                  strokes: [{ color: { r: 0.3, g: 0.3, b: 0.3, a: 1 }, weight: 1, align: 'INSIDE' }],
                  children: [
                    text('Shuffle', { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Track List Header
    frame('TrackListHeader', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 12, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.15, g: 0.15, b: 0.15, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        text('#', { fontSize: 13, fontWeight: 600, color: '#525252', size: { x: 40 }, textAutoResize: 'HEIGHT' }),
        text('TITLE', { fontSize: 11, fontWeight: 700, color: '#525252', letterSpacing: { value: 1, unit: 'PIXELS' }, size: { x: 400 }, textAutoResize: 'HEIGHT' }),
        text('ARTIST', { fontSize: 11, fontWeight: 700, color: '#525252', letterSpacing: { value: 1, unit: 'PIXELS' }, size: { x: 300 }, textAutoResize: 'HEIGHT' }),
        text('ALBUM', { fontSize: 11, fontWeight: 700, color: '#525252', letterSpacing: { value: 1, unit: 'PIXELS' }, layoutSizingHorizontal: 'FILL' }),
        text('DURATION', { fontSize: 11, fontWeight: 700, color: '#525252', letterSpacing: { value: 1, unit: 'PIXELS' }, size: { x: 80 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT' }),
      ],
    }),

    // Track List
    frame('TrackList', {
      autoLayout: vertical({ spacing: 0, padX: 0, padY: 0 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        trackRow(1, 'Dreamscape', 'Luna Waves', 'Nocturne', '4:23', true),
        trackRow(2, 'After Hours', 'Neon Saints', 'City Lights', '3:47', false),
        trackRow(3, 'Slow Motion', 'The Drift', 'Gravity EP', '5:12', false),
        trackRow(4, 'Velvet Sky', 'Aurora', 'Horizons', '3:56', false),
        trackRow(5, 'Into the Blue', 'Midnight Echo', 'Oceanic', '4:08', false),
        trackRow(6, 'Fading Light', 'Solaris', 'Dusk', '6:01', false),
        trackRow(7, 'Whispers', 'Glass Animals', 'Heat Waves', '3:34', false),
        trackRow(8, 'Neon Rain', 'Synthwave Collective', 'Retro Future', '4:45', false),
        trackRow(9, 'Golden Hour', 'Sunset Drive', 'Pacific', '3:29', false),
        trackRow(10, 'Endless Night', 'Deep State', 'Subterranean', '5:38', false),
        trackRow(11, 'Cloud Walker', 'Aether', 'Above', '4:17', false),
        trackRow(12, 'Pulse', 'Chromatic', 'Frequencies', '3:52', false),
      ],
    }),
  ],
});

function trackRow(num: number, song: string, artist: string, album: string, duration: string, playing: boolean) {
  return frame(`Track ${num}`, {
    autoLayout: horizontal({ spacing: 0, padX: 60, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: playing ? [solid('#1a1a1a')] : [],
    children: [
      // Number or play indicator
      text(playing ? '♫' : `${num}`, {
        fontSize: 14,
        fontWeight: playing ? 700 : 400,
        color: playing ? '#e11d48' : '#525252',
        size: { x: 40 }, textAutoResize: 'HEIGHT',
      }),
      // Song title
      text(song, {
        fontSize: 15,
        fontWeight: playing ? 600 : 400,
        color: playing ? '#e11d48' : '#ffffff',
        size: { x: 400 }, textAutoResize: 'HEIGHT',
      }),
      // Artist
      text(artist, {
        fontSize: 14, fontWeight: 400, color: '#a3a3a3',
        size: { x: 300 }, textAutoResize: 'HEIGHT',
      }),
      // Album
      text(album, {
        fontSize: 14, fontWeight: 400, color: '#525252',
        layoutSizingHorizontal: 'FILL',
      }),
      // Duration
      text(duration, {
        fontSize: 14, fontWeight: 400, color: '#525252',
        size: { x: 80 }, textAutoResize: 'HEIGHT', textAlignHorizontal: 'RIGHT',
      }),
    ],
  });
}
