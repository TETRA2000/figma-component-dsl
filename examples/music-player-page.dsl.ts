import { frame, text, rectangle, ellipse, solid, gradient, horizontal, vertical } from '@figma-dsl/core';
const rosePink = '#e11d48'; const roseDark = '#be123c'; const dark = '#0f0f0f'; const surface = '#1a1a1a';
const white = '#ffffff'; const gray = '#9ca3af'; const dimGray = '#4b5563';

function albumListItem(title: string, artist: string, duration: string, isPlaying: boolean) {
  return frame(`Track: ${title}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 10, align: 'SPACE_BETWEEN', counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL', fills: isPlaying ? [solid(rosePink, 0.1)] : [],
    cornerRadius: 8,
    children: [
      frame('TrackLeft', { autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }), children: [
        ...(isPlaying
          ? [ellipse('PlayingDot', { size: { x: 8, y: 8 }, fills: [solid(rosePink)] })]
          : []),
        frame('TrackInfo', { autoLayout: vertical({ spacing: 1 }), children: [
          text(title, { fontSize: 14, fontWeight: isPlaying ? 600 : 400, color: isPlaying ? rosePink : white }),
          text(artist, { fontSize: 12, fontWeight: 400, color: gray }),
        ]}),
      ]}),
      text(duration, { fontSize: 13, fontWeight: 400, color: gray }),
    ],
  });
}

function playlistCard(name: string, count: string, g1: string, g2: string) {
  return frame(`Playlist: ${name}`, {
    autoLayout: vertical({ spacing: 0 }), size: { x: 200, y: undefined },
    cornerRadius: 12, clipContent: true, fills: [solid(surface)],
    children: [
      rectangle('PlaylistCover', {
        size: { x: 200, y: 200 },
        fills: [gradient([{ hex: g1, position: 0 }, { hex: g2, position: 1 }], 135)],
      }),
      frame('PlaylistInfo', {
        autoLayout: vertical({ spacing: 2, padX: 12, padY: 10 }), layoutSizingHorizontal: 'FILL',
        children: [
          text(name, { fontSize: 14, fontWeight: 600, color: white }),
          text(count, { fontSize: 12, fontWeight: 400, color: gray }),
        ],
      }),
    ],
  });
}

export default frame('MusicPlayer', {
  size: { x: 1440, y: undefined }, autoLayout: horizontal({ spacing: 0 }), fills: [solid(dark)],
  children: [
    // Sidebar
    frame('Sidebar', {
      autoLayout: vertical({ spacing: 20, padX: 20, padY: 20 }), size: { x: 240, y: undefined },
      fills: [solid(surface)],
      strokes: [{ color: { r: 0.18, g: 0.18, b: 0.18, a: 1 }, weight: 1, align: 'INSIDE' as const }],
      children: [
        text('Melody', { fontSize: 22, fontWeight: 700, color: rosePink }),
        frame('SidebarNav', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
          text('Home', { fontSize: 15, fontWeight: 600, color: white }),
          text('Browse', { fontSize: 15, fontWeight: 400, color: gray }),
          text('Library', { fontSize: 15, fontWeight: 400, color: gray }),
          text('Liked Songs', { fontSize: 15, fontWeight: 400, color: gray }),
        ]}),
        rectangle('SidebarDiv', { size: { x: 1, y: 1 }, fills: [solid(dimGray)], layoutSizingHorizontal: 'FILL' }),
        text('Your Playlists', { fontSize: 13, fontWeight: 600, color: gray }),
        frame('PlaylistList', { autoLayout: vertical({ spacing: 4 }), layoutSizingHorizontal: 'FILL', children: [
          text('Chill Vibes', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Workout Mix', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Focus Flow', { fontSize: 14, fontWeight: 400, color: gray }),
          text('Road Trip', { fontSize: 14, fontWeight: 400, color: gray }),
        ]}),
      ],
    }),
    // Main
    frame('MainContent', {
      autoLayout: vertical({ spacing: 0 }), layoutSizingHorizontal: 'FILL',
      children: [
        // Now playing hero
        frame('NowPlayingHero', {
          autoLayout: horizontal({ spacing: 32, padX: 40, padY: 32, counterAlign: 'CENTER' }),
          layoutSizingHorizontal: 'FILL',
          fills: [gradient([{ hex: '#1a0a0e', position: 0 }, { hex: '#2a0a1e', position: 0.5 }, { hex: '#0a0a1a', position: 1 }], 135)],
          children: [
            rectangle('AlbumArt', {
              size: { x: 240, y: 240 },
              fills: [gradient([{ hex: rosePink, position: 0 }, { hex: '#9f1239', position: 1 }], 135)],
              cornerRadius: 16,
            }),
            frame('NowPlayingInfo', {
              autoLayout: vertical({ spacing: 16 }), children: [
                text('Now Playing', { fontSize: 12, fontWeight: 600, color: rosePink, letterSpacing: { value: 3, unit: 'PIXELS' as const } }),
                text('Midnight Dreams', { fontSize: 36, fontWeight: 700, color: white, letterSpacing: { value: -1, unit: 'PIXELS' as const } }),
                text('Luna Eclipse · Starlight Album · 2026', { fontSize: 14, fontWeight: 400, color: gray }),
                frame('Controls', {
                  autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER' }),
                  children: [
                    ellipse('Shuffle', { size: { x: 20, y: 20 }, fills: [solid(gray, 0.4)] }),
                    ellipse('Prev', { size: { x: 24, y: 24 }, fills: [solid(white)] }),
                    frame('PlayBtn', {
                      size: { x: 52, y: 52 }, fills: [solid(rosePink)], cornerRadius: 26,
                      autoLayout: horizontal({ align: 'CENTER', counterAlign: 'CENTER' }),
                      children: [ellipse('PlayIcon', { size: { x: 20, y: 20 }, fills: [solid(white)] })],
                    }),
                    ellipse('Next', { size: { x: 24, y: 24 }, fills: [solid(white)] }),
                    ellipse('Repeat', { size: { x: 20, y: 20 }, fills: [solid(gray, 0.4)] }),
                  ],
                }),
                frame('ProgressBar', {
                  autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
                  children: [
                    text('1:42', { fontSize: 11, fontWeight: 400, color: gray }),
                    frame('Track', {
                      size: { x: 300, y: 4 }, fills: [solid(dimGray)], cornerRadius: 2,
                      clipContent: true, autoLayout: horizontal({ spacing: 0 }),
                      children: [rectangle('Fill', { size: { x: 120, y: 4 }, fills: [solid(rosePink)] })],
                    }),
                    text('4:23', { fontSize: 11, fontWeight: 400, color: gray }),
                  ],
                }),
              ],
            }),
          ],
        }),
        // Album tracks
        frame('TrackList', {
          autoLayout: vertical({ spacing: 2, padX: 40, padY: 20 }), layoutSizingHorizontal: 'FILL',
          children: [
            text('Album Tracks', { fontSize: 18, fontWeight: 600, color: white }),
            albumListItem('Midnight Dreams', 'Luna Eclipse', '4:23', true),
            albumListItem('Starlight Serenade', 'Luna Eclipse', '3:45', false),
            albumListItem('Neon Nights', 'Luna Eclipse', '5:12', false),
            albumListItem('Echoes', 'Luna Eclipse', '3:58', false),
            albumListItem('Dawn Chorus', 'Luna Eclipse', '4:41', false),
          ],
        }),
        // Playlists
        frame('PlaylistsSection', {
          autoLayout: vertical({ spacing: 16, padX: 40, padY: 20 }), layoutSizingHorizontal: 'FILL',
          children: [
            text('Made For You', { fontSize: 18, fontWeight: 600, color: white }),
            frame('PlaylistGrid', { autoLayout: horizontal({ spacing: 16 }), children: [
              playlistCard('Daily Mix 1', '25 songs', '#7c3aed', '#4f46e5'),
              playlistCard('Discover Weekly', '30 songs', '#059669', '#047857'),
              playlistCard('Release Radar', '20 songs', '#d97706', '#b45309'),
              playlistCard('Chill Hits', '50 songs', '#0891b2', '#0e7490'),
              playlistCard('Indie Picks', '35 songs', '#e11d48', '#be123c'),
            ]}),
          ],
        }),
      ],
    }),
  ],
});
