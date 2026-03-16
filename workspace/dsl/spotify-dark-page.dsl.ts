/**
 * Spotify Dark — Music streaming dashboard
 *
 * DSL features stressed: Dark fills, rounded pill corners (9999),
 * horizontal auto-layout, opacity overlays, small text sizes, gradients
 */
import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

// --- Helper functions ---

function categoryPill(label: string) {
  return frame(`Pill: ${label}`, {
    autoLayout: horizontal({ spacing: 0, padX: 24, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#282828')],
    cornerRadius: 9999,
    children: [
      text(label, { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
    ],
  });
}

function albumCard(title: string, artist: string) {
  return frame(`Album: ${title}`, {
    size: { x: 180 },
    autoLayout: vertical({ spacing: 12, padX: 12, padY: 12 }),
    fills: [solid('#181818')],
    cornerRadius: 8,
    children: [
      // Cover art placeholder with gradient
      rectangle('Cover', {
        size: { x: 156, y: 156 },
        fills: [gradient([
          { hex: '#1db954', position: 0 },
          { hex: '#191414', position: 1 },
        ], 135)],
        cornerRadius: 4,
      }),
      frame('Info', {
        autoLayout: vertical({ spacing: 4 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: '#ffffff' }),
          text(artist, { fontSize: 12, fontWeight: 400, color: '#a7a7a7' }),
        ],
      }),
    ],
  });
}

function playlistRow(index: number, title: string, artist: string, duration: string) {
  return frame(`Track ${index}`, {
    autoLayout: horizontal({ spacing: 12, padX: 16, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(String(index), {
        fontSize: 14, fontWeight: 400, color: '#a7a7a7',
        size: { x: 20 },
        textAlignHorizontal: 'RIGHT',
      }),
      rectangle('Thumb', {
        size: { x: 40, y: 40 },
        fills: [solid('#282828')],
        cornerRadius: 4,
      }),
      frame('Meta', {
        autoLayout: vertical({ spacing: 2 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 14, fontWeight: 500, color: '#ffffff' }),
          text(artist, { fontSize: 12, fontWeight: 400, color: '#a7a7a7' }),
        ],
      }),
      text(duration, { fontSize: 14, fontWeight: 400, color: '#a7a7a7' }),
    ],
  });
}

// --- Page layout ---

export default frame('SpotifyDarkPage', {
  size: { x: 1440 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#121212')],
  children: [
    // Main content area
    frame('Content', {
      autoLayout: vertical({ spacing: 0, padX: 32, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        // Header
        text('Good evening', { fontSize: 28, fontWeight: 700, color: '#ffffff' }),

        // Category pills
        frame('Categories', {
          autoLayout: horizontal({ spacing: 8, padY: 16 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            categoryPill('Chill'),
            categoryPill('Focus'),
            categoryPill('Energy'),
            categoryPill('Workout'),
          ],
        }),

        // Recently played section
        frame('RecentlyPlayed', {
          autoLayout: vertical({ spacing: 16, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Recently Played', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
            frame('AlbumGrid', {
              autoLayout: horizontal({ spacing: 16 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                albumCard('Midnight Vibes', 'Lunar Echo'),
                albumCard('Neon Streets', 'Synth Wave'),
                albumCard('Ocean Drift', 'Deep Blue'),
                albumCard('Solar Flare', 'Cosmic Beats'),
              ],
            }),
          ],
        }),

        // Top Tracks section
        frame('TopTracks', {
          autoLayout: vertical({ spacing: 16, padY: 12 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            text('Top Tracks', { fontSize: 20, fontWeight: 700, color: '#ffffff' }),
            frame('TrackList', {
              autoLayout: vertical({ spacing: 0 }),
              layoutSizingHorizontal: 'FILL',
              children: [
                playlistRow(1, 'Electric Dreams', 'Neon Pulse', '3:42'),
                playlistRow(2, 'Starlight Serenade', 'Cosmic Waves', '4:15'),
                playlistRow(3, 'Urban Jungle', 'Bass Theory', '3:28'),
                playlistRow(4, 'Crystal Night', 'Luna Maya', '5:01'),
              ],
            }),
          ],
        }),
      ],
    }),

    // Now Playing Bar
    frame('NowPlayingBar', {
      autoLayout: horizontal({ spacing: 24, padX: 16, padY: 8, counterAlign: 'CENTER' }),
      fills: [solid('#181818')],
      layoutSizingHorizontal: 'FILL',
      strokes: [{ color: { r: 0.16, g: 0.16, b: 0.16, a: 1 }, weight: 1, align: 'INSIDE' }],
      children: [
        // Left: track info
        frame('NowPlayingLeft', {
          size: { x: 220 },
          autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
          children: [
            rectangle('NowPlayingThumb', {
              size: { x: 56, y: 56 },
              fills: [gradient([
                { hex: '#1db954', position: 0 },
                { hex: '#191414', position: 1 },
              ], 135)],
              cornerRadius: 4,
            }),
            frame('NowPlayingMeta', {
              autoLayout: vertical({ spacing: 2 }),
              children: [
                text('Starlight Serenade', { fontSize: 13, fontWeight: 500, color: '#ffffff' }),
                text('Cosmic Waves', { fontSize: 11, fontWeight: 400, color: '#a7a7a7' }),
              ],
            }),
          ],
        }),

        // Center: controls + progress
        frame('NowPlayingCenter', {
          autoLayout: vertical({ spacing: 8, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          children: [
            frame('Controls', {
              autoLayout: horizontal({ spacing: 16, align: 'CENTER', counterAlign: 'CENTER' }),
              children: [
                text('\u25C0\u25C0', { fontSize: 12, color: '#a7a7a7' }),
                // Play button (circle)
                frame('PlayBtn', {
                  size: { x: 32, y: 32 },
                  autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                  fills: [solid('#ffffff')],
                  cornerRadius: 9999,
                  children: [
                    text('\u25B6', { fontSize: 14, color: '#000000' }),
                  ],
                }),
                text('\u25B6\u25B6', { fontSize: 12, color: '#a7a7a7' }),
              ],
            }),
            // Progress bar
            frame('ProgressTrack', {
              size: { x: 400, y: 4 },
              fills: [solid('#404040')],
              cornerRadius: 2,
              children: [
                rectangle('ProgressFill', {
                  size: { x: 140, y: 4 },
                  fills: [solid('#1db954')],
                  cornerRadius: 2,
                }),
              ],
            }),
          ],
        }),

        // Right: volume
        frame('NowPlayingRight', {
          size: { x: 140 },
          autoLayout: horizontal({ align: 'MAX', counterAlign: 'CENTER' }),
          children: [
            frame('VolumeTrack', {
              size: { x: 100, y: 4 },
              fills: [solid('#404040')],
              cornerRadius: 2,
              children: [
                rectangle('VolumeFill', {
                  size: { x: 60, y: 4 },
                  fills: [solid('#ffffff')],
                  cornerRadius: 2,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
