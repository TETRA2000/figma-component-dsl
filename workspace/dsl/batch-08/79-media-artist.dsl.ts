/**
 * Artist Profile — Cover Image + Name + Genre Tags + Discography + Shows
 * Batch 8, Page 9: Media/Entertainment — Artist/musician profile page
 * DSL Features: gradient cover, tag pills, list layout, dark theme
 */
import {
  component, frame, rectangle, text,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

export default component('MediaArtist', {
  size: { x: 1440, y: undefined },
  autoLayout: vertical({ spacing: 0 }),
  fills: [solid('#0a0a0a')],
  children: [
    // Cover Image Area
    frame('CoverArea', {
      size: { x: 1440, y: 400 },
      autoLayout: vertical({ spacing: 0, align: 'MAX', padX: 60, padY: 40 }),
      layoutSizingHorizontal: 'FILL',
      fills: [
        gradient([
          { hex: '#3d0a2d', position: 0 },
          { hex: '#1a0a3d', position: 0.3 },
          { hex: '#0a1a2d', position: 0.6 },
          { hex: '#0a0a0a', position: 1 },
        ], 270),
      ],
      clipContent: true,
      children: [
        frame('ArtistHeaderRow', {
          autoLayout: horizontal({ spacing: 24, counterAlign: 'MAX' }),
          children: [
            // Artist Photo
            rectangle('ArtistPhoto', {
              size: { x: 180, y: 180 },
              fills: [
                gradient([
                  { hex: '#e11d48', position: 0 },
                  { hex: '#7c1d3e', position: 0.5 },
                  { hex: '#2d0a3d', position: 1 },
                ], 135),
              ],
              cornerRadius: 90,
            }),
            // Artist Info
            frame('ArtistInfo', {
              autoLayout: vertical({ spacing: 12 }),
              children: [
                text('VERIFIED ARTIST', { fontSize: 12, fontWeight: 700, color: '#22c55e', letterSpacing: { value: 2, unit: 'PIXELS' } }),
                text('Aurora Synth', { fontSize: 48, fontWeight: 900, color: '#ffffff', lineHeight: { value: 52, unit: 'PIXELS' } }),
                text('24.7M monthly listeners', { fontSize: 16, fontWeight: 400, color: '#a3a3a3' }),
                // Genre Tags
                frame('GenreTags', {
                  autoLayout: horizontal({ spacing: 8 }),
                  children: [
                    genreTag('Electronic'),
                    genreTag('Synthwave'),
                    genreTag('Ambient'),
                    genreTag('Dream Pop'),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Action Bar
    frame('ActionBar', {
      autoLayout: horizontal({ spacing: 16, padX: 60, padY: 20, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      children: [
        frame('PlayBtn', {
          autoLayout: horizontal({ padX: 32, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          fills: [solid('#e11d48')],
          cornerRadius: 999,
          children: [
            text('▶  Play', { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
        frame('FollowBtn', {
          autoLayout: horizontal({ padX: 28, padY: 14, align: 'CENTER', counterAlign: 'CENTER' }),
          cornerRadius: 999,
          strokes: [{ color: { r: 0.5, g: 0.5, b: 0.5, a: 1 }, weight: 1, align: 'INSIDE' }],
          children: [
            text('Follow', { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
          ],
        }),
        frame('ActionSpacer', { layoutSizingHorizontal: 'FILL', size: { x: 1, y: 1 } }),
        // Social Links
        frame('SocialLinks', {
          autoLayout: horizontal({ spacing: 12 }),
          children: [
            socialLink('Instagram'),
            socialLink('Twitter'),
            socialLink('Spotify'),
            socialLink('YouTube'),
          ],
        }),
      ],
    }),

    // Popular Tracks
    frame('PopularTracks', {
      autoLayout: vertical({ spacing: 12, padX: 60, padY: 24 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Popular', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        popularTrack(1, 'Neon Cascade', '3:47', '142M'),
        popularTrack(2, 'Digital Sunrise', '4:12', '98M'),
        popularTrack(3, 'Chrome Hearts', '3:23', '87M'),
        popularTrack(4, 'Midnight Protocol', '5:01', '76M'),
        popularTrack(5, 'Electric Dreams', '4:38', '65M'),
      ],
    }),

    // Discography
    frame('Discography', {
      autoLayout: vertical({ spacing: 20, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      children: [
        text('Discography', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        frame('AlbumGrid', {
          autoLayout: horizontal({ spacing: 20 }),
          layoutSizingHorizontal: 'FILL',
          children: [
            albumCard('Neon Cascade', '2026', 'Album', '#e11d48', '#2d0a1a'),
            albumCard('Digital Horizons', '2024', 'Album', '#0a3d2d', '#0a1a0a'),
            albumCard('Chrome EP', '2023', 'EP', '#2d2d0a', '#0a0a0a'),
            albumCard('Midnight Sessions', '2022', 'Album', '#0a1a3d', '#0a0a1a'),
            albumCard('First Light', '2020', 'Album', '#3d0a3d', '#0a0a1a'),
          ],
        }),
      ],
    }),

    // Upcoming Shows
    frame('UpcomingShows', {
      autoLayout: vertical({ spacing: 16, padX: 60, padY: 32 }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#111111')],
      children: [
        text('Upcoming Shows', { fontSize: 22, fontWeight: 700, color: '#ffffff' }),
        showItem('Apr 12', 'Neon Dreams Festival', 'Austin, TX', 'Headliner'),
        showItem('Apr 28', 'Electric Garden', 'London, UK', 'Main Stage'),
        showItem('May 10', 'Synthwave Summit', 'Berlin, DE', 'Co-Headliner'),
        showItem('May 24', 'Coachella Afterparty', 'Los Angeles, CA', 'Special Guest'),
        showItem('Jun 7', 'Digital Horizons Tour', 'Tokyo, JP', 'Solo Show'),
      ],
    }),

    // Footer
    frame('Footer', {
      autoLayout: horizontal({ spacing: 0, padX: 60, padY: 24, counterAlign: 'CENTER' }),
      layoutSizingHorizontal: 'FILL',
      fills: [solid('#0a0a0a')],
      children: [
        text('© 2026 Aurora Synth. All rights reserved.', { fontSize: 13, fontWeight: 400, color: '#525252' }),
      ],
    }),
  ],
});

function genreTag(label: string) {
  return frame(`Genre: ${label}`, {
    autoLayout: horizontal({ padX: 14, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#ffffff', 0.1)],
    cornerRadius: 999,
    children: [
      text(label, { fontSize: 12, fontWeight: 500, color: '#d4d4d4' }),
    ],
  });
}

function socialLink(name: string) {
  return frame(`Social: ${name}`, {
    autoLayout: horizontal({ padX: 14, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
    fills: [solid('#1a1a1a')],
    cornerRadius: 8,
    children: [
      text(name, { fontSize: 12, fontWeight: 500, color: '#a3a3a3' }),
    ],
  });
}

function popularTrack(num: number, title: string, duration: string, plays: string) {
  return frame(`Track ${num}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 12, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#111111')],
    cornerRadius: 8,
    children: [
      text(`${num}`, { fontSize: 16, fontWeight: 700, color: '#525252', size: { x: 32 }, textAutoResize: 'HEIGHT' }),
      rectangle('TrackArt', {
        size: { x: 44, y: 44 },
        fills: [gradient([{ hex: '#e11d48', position: 0 }, { hex: '#2d0a1a', position: 1 }], 135)],
        cornerRadius: 6,
      }),
      frame('TrackDetails', {
        autoLayout: vertical({ spacing: 2, padX: 12 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 15, fontWeight: 500, color: '#ffffff' }),
          text(`${plays} plays`, { fontSize: 12, fontWeight: 400, color: '#737373' }),
        ],
      }),
      text(duration, { fontSize: 14, fontWeight: 400, color: '#525252' }),
    ],
  });
}

function albumCard(title: string, year: string, type: string, gradStart: string, gradEnd: string) {
  return frame(`Album: ${title}`, {
    autoLayout: vertical({ spacing: 10 }),
    layoutSizingHorizontal: 'FILL',
    children: [
      rectangle('AlbumArt', {
        size: { x: 240, y: 240 },
        fills: [gradient([{ hex: gradStart, position: 0 }, { hex: gradEnd, position: 1 }], 135)],
        cornerRadius: 8,
      }),
      text(title, { fontSize: 15, fontWeight: 600, color: '#ffffff' }),
      text(`${year} • ${type}`, { fontSize: 13, fontWeight: 400, color: '#737373' }),
    ],
  });
}

function showItem(date: string, title: string, location: string, role: string) {
  return frame(`Show: ${title}`, {
    autoLayout: horizontal({ spacing: 0, padX: 16, padY: 14, counterAlign: 'CENTER' }),
    layoutSizingHorizontal: 'FILL',
    fills: [solid('#1a1a1a')],
    cornerRadius: 8,
    children: [
      frame('ShowDate', {
        autoLayout: vertical({ spacing: 0, padX: 12, padY: 8, counterAlign: 'CENTER' }),
        fills: [solid('#e11d48')],
        cornerRadius: 8,
        size: { x: 64, y: 48 },
        children: [
          text(date.split(' ')[0], { fontSize: 11, fontWeight: 600, color: '#fecdd3' }),
          text(date.split(' ')[1], { fontSize: 16, fontWeight: 800, color: '#ffffff' }),
        ],
      }),
      frame('ShowInfo', {
        autoLayout: vertical({ spacing: 2, padX: 16 }),
        layoutSizingHorizontal: 'FILL',
        children: [
          text(title, { fontSize: 16, fontWeight: 600, color: '#ffffff' }),
          text(location, { fontSize: 13, fontWeight: 400, color: '#a3a3a3' }),
        ],
      }),
      frame('RoleBadge', {
        autoLayout: horizontal({ padX: 12, padY: 6, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#e11d48', 0.15)],
        cornerRadius: 999,
        children: [
          text(role, { fontSize: 12, fontWeight: 600, color: '#e11d48' }),
        ],
      }),
      frame('ShowSpacer', { size: { x: 16, y: 1 } }),
      frame('TicketBtn', {
        autoLayout: horizontal({ padX: 16, padY: 8, align: 'CENTER', counterAlign: 'CENTER' }),
        fills: [solid('#1a1a1a')],
        cornerRadius: 6,
        strokes: [{ color: { r: 0.3, g: 0.3, b: 0.3, a: 1 }, weight: 1, align: 'INSIDE' }],
        children: [
          text('Tickets', { fontSize: 13, fontWeight: 500, color: '#ffffff' }),
        ],
      }),
    ],
  });
}
