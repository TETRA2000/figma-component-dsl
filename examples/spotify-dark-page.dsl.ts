import {
  frame, text, rectangle, ellipse,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

// Spotify Dark theme colors
const bg = '#121212';
const surfaceDark = '#181818';
const surfaceLight = '#282828';
const green = '#1db954';
const white = '#ffffff';
const lightGray = '#b3b3b3';
const darkGray = '#535353';

// Helper: Album card
function albumCard(title: string, artist: string) {
  return frame(`Album: ${title}`, {
    size: { x: 180, y: 240 },
    autoLayout: vertical({ spacing: 8, padX: 12, padY: 12 }),
    fills: [solid(surfaceDark)],
    cornerRadius: 8,
    children: [
      rectangle('Cover', {
        size: { x: 156, y: 156 },
        fills: [gradient([
          { hex: '#333333', position: 0 },
          { hex: '#555555', position: 1 },
        ], 135)],
        cornerRadius: 4,
      }),
      text(title, { fontSize: 14, fontWeight: 700, color: white }),
      text(artist, { fontSize: 12, fontWeight: 400, color: lightGray }),
    ],
  });
}

// Helper: Playlist row
function playlistRow(index: number, title: string, artist: string, duration: string) {
  return frame(`Row: ${title}`, {
    autoLayout: horizontal({ spacing: 16, padX: 16, padY: 8, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    children: [
      text(`${index}`, { fontSize: 14, fontWeight: 400, color: lightGray }),
      rectangle('Thumb', {
        size: { x: 40, y: 40 },
        fills: [solid(surfaceLight)],
        cornerRadius: 4,
      }),
      frame('Info', {
        autoLayout: vertical({ spacing: 2 }),
        children: [
          text(title, { fontSize: 14, fontWeight: 400, color: white }),
          text(artist, { fontSize: 12, fontWeight: 400, color: lightGray }),
        ],
      }),
      text(duration, { fontSize: 14, fontWeight: 400, color: lightGray }),
    ],
  });
}

// Helper: Category pill
function categoryPill(label: string) {
  return frame(`Pill: ${label}`, {
    autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid(surfaceLight)],
    cornerRadius: 9999,
    children: [
      text(label, { fontSize: 12, fontWeight: 600, color: white }),
    ],
  });
}

// Now playing bar
const nowPlayingBar = frame('NowPlaying', {
  autoLayout: horizontal({ spacing: 12, padX: 16, padY: 8, counterAlign: 'CENTER', align: 'SPACE_BETWEEN' }),
  layoutSizingHorizontal: 'FILL',
  fills: [solid('#181818')],
  strokes: [{ color: { r: 0.3, g: 0.3, b: 0.3, a: 1 }, weight: 1, align: 'INSIDE' as const }],
  children: [
    frame('TrackInfo', {
      autoLayout: horizontal({ spacing: 12, counterAlign: 'CENTER' }),
      children: [
        rectangle('AlbumArt', {
          size: { x: 56, y: 56 },
          fills: [solid(surfaceLight)],
          cornerRadius: 4,
        }),
        frame('Details', {
          autoLayout: vertical({ spacing: 2 }),
          children: [
            text('Bohemian Rhapsody', { fontSize: 14, fontWeight: 400, color: white }),
            text('Queen', { fontSize: 12, fontWeight: 400, color: lightGray }),
          ],
        }),
      ],
    }),
    frame('Controls', {
      autoLayout: horizontal({ spacing: 24, counterAlign: 'CENTER', align: 'CENTER' }),
      children: [
        ellipse('Prev', { size: { x: 16, y: 16 }, fills: [solid(lightGray)] }),
        ellipse('Play', { size: { x: 32, y: 32 }, fills: [solid(white)] }),
        ellipse('Next', { size: { x: 16, y: 16 }, fills: [solid(lightGray)] }),
      ],
    }),
    frame('Progress', {
      autoLayout: horizontal({ spacing: 8, counterAlign: 'CENTER' }),
      children: [
        text('2:14', { fontSize: 11, fontWeight: 400, color: lightGray }),
        frame('ProgressTrack', {
          size: { x: 200, y: 4 },
          fills: [solid(darkGray)],
          cornerRadius: 2,
          clipContent: true,
          autoLayout: horizontal({ spacing: 0 }),
          children: [
            rectangle('ProgressFill', {
              size: { x: 120, y: 4 },
              fills: [solid(green)],
            }),
          ],
        }),
        text('5:55', { fontSize: 11, fontWeight: 400, color: lightGray }),
      ],
    }),
  ],
});

// Main page
export default frame('SpotifyDark', {
  size: { x: 1440, y: 900 },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid(bg)],
  children: [
    // Top category pills
    frame('Categories', {
      autoLayout: horizontal({ spacing: 8, padX: 24, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        categoryPill('All'),
        categoryPill('Music'),
        categoryPill('Podcasts'),
        categoryPill('Audiobooks'),
      ],
    }),

    // Album grid section
    frame('AlbumSection', {
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Good afternoon', { fontSize: 24, fontWeight: 700, color: white }),
        frame('AlbumGrid', {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            albumCard('Abbey Road', 'The Beatles'),
            albumCard('Dark Side of the Moon', 'Pink Floyd'),
            albumCard('Thriller', 'Michael Jackson'),
            albumCard('Back in Black', 'AC/DC'),
            albumCard('Rumours', 'Fleetwood Mac'),
          ],
        }),
      ],
    }),

    // Playlist section
    frame('PlaylistSection', {
      autoLayout: vertical({ spacing: 0, padX: 24, padY: 16 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Recently played', { fontSize: 20, fontWeight: 700, color: white }),
        rectangle('Divider', {
          size: { x: 1, y: 1 },
          fills: [solid(surfaceLight)],
          layoutSizingHorizontal: 'FILL',
        }),
        playlistRow(1, 'Stairway to Heaven', 'Led Zeppelin', '8:02'),
        playlistRow(2, 'Hotel California', 'Eagles', '6:30'),
        playlistRow(3, 'Comfortably Numb', 'Pink Floyd', '6:23'),
      ],
    }),

    // Now playing bar at bottom
    nowPlayingBar,
  ],
});
