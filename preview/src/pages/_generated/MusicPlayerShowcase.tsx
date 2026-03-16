import { AlbumHeader } from '../../components/_generated/AlbumHeader/AlbumHeader';
import { TrackItem } from '../../components/_generated/TrackItem/TrackItem';
import { PlayerControls } from '../../components/_generated/PlayerControls/PlayerControls';

const tracks = [
  { number: 1, title: 'Midnight Echoes', artist: 'Luna Wave', duration: '4:12', artColor: '#7c3aed' },
  { number: 2, title: 'Velvet Horizon', artist: 'Luna Wave', duration: '3:47', artColor: '#6d28d9' },
  { number: 3, title: 'Neon Pulse', artist: 'Luna Wave', duration: '4:12', artColor: '#5b21b6' },
  { number: 4, title: 'Starfall', artist: 'Luna Wave', duration: '3:22', artColor: '#4c1d95' },
  { number: 5, title: 'Ocean Static', artist: 'Luna Wave', duration: '5:01', artColor: '#4338ca' },
  { number: 6, title: 'Crystal Waves', artist: 'Luna Wave', duration: '3:58', artColor: '#3730a3' },
  { number: 7, title: 'Phantom Light', artist: 'Luna Wave', duration: '4:33', artColor: '#312e81' },
  { number: 8, title: 'Aurora Dream', artist: 'Luna Wave', duration: '4:45', artColor: '#2563eb' },
];

export function MusicPlayerShowcase() {
  return (
    <div style={{ background: '#111111', minHeight: '100vh', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <AlbumHeader
        title="Midnight Echoes"
        artist="Luna Wave"
        year={2026}
        trackCount={8}
        gradientFrom="#7c3aed"
        gradientTo="#2563eb"
      />

      {/* Track list */}
      <div style={{ padding: '8px 32px 24px', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tracks.map((t) => (
            <TrackItem
              key={t.number}
              number={t.number}
              title={t.title}
              artist={t.artist}
              duration={t.duration}
              artColor={t.artColor}
              playing={t.number === 3}
            />
          ))}
        </div>
      </div>

      {/* Player controls */}
      <PlayerControls currentTime="2:34" totalTime="4:12" progress={61} />
    </div>
  );
}
