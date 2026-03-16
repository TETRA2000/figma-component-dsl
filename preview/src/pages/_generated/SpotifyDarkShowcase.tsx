import { AlbumCard } from '../../components/_generated/AlbumCard/AlbumCard';
import { PlaylistRow } from '../../components/_generated/PlaylistRow/PlaylistRow';
import { NowPlayingBar } from '../../components/_generated/NowPlayingBar/NowPlayingBar';
import { CategoryPill } from '../../components/_generated/CategoryPill/CategoryPill';

export function SpotifyDarkShowcase() {
  return (
    <div style={{ background: '#121212', minHeight: '100vh', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '24px 32px 16px' }}>
        <h1 style={{ color: '#ffffff', fontSize: 28, fontWeight: 700, margin: 0 }}>Good evening</h1>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 8, padding: '0 32px 24px', flexWrap: 'wrap' }}>
        <CategoryPill label="Chill" />
        <CategoryPill label="Focus" />
        <CategoryPill label="Energy" />
        <CategoryPill label="Workout" />
      </div>

      {/* Album grid */}
      <div style={{ padding: '0 32px 24px' }}>
        <h2 style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Recently Played</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <AlbumCard title="Midnight Vibes" artist="Lunar Echo" />
          <AlbumCard title="Neon Streets" artist="Synth Wave" />
          <AlbumCard title="Ocean Drift" artist="Deep Blue" />
          <AlbumCard title="Solar Flare" artist="Cosmic Beats" />
        </div>
      </div>

      {/* Playlist */}
      <div style={{ padding: '0 32px 24px', flex: 1 }}>
        <h2 style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Top Tracks</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <PlaylistRow index={1} title="Electric Dreams" artist="Neon Pulse" duration="3:42" />
          <PlaylistRow index={2} title="Starlight Serenade" artist="Cosmic Waves" duration="4:15" />
          <PlaylistRow index={3} title="Urban Jungle" artist="Bass Theory" duration="3:28" />
          <PlaylistRow index={4} title="Crystal Night" artist="Luna Maya" duration="5:01" />
        </div>
      </div>

      {/* Now playing bar */}
      <NowPlayingBar track="Starlight Serenade" artist="Cosmic Waves" />
    </div>
  );
}
