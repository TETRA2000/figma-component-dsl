import { GameCard } from '../components/GameCard/GameCard';
import { LiveBadge } from '../components/LiveBadge/LiveBadge';
import { LeaderboardRow } from '../components/LeaderboardRow/LeaderboardRow';

export function NeonGamingShowcase() {
  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', background: '#0a0a0a', minHeight: '100vh', padding: 48 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', margin: 0, fontFamily: 'Inter, sans-serif' }}>
          Game Library
        </h1>
        <LiveBadge />
      </div>

      {/* Game Cards Row */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 24, marginBottom: 48 }}>
        <GameCard title="Neon Drift" genre="Racing" players="12.4K" accentColor="pink" />
        <GameCard title="Cyber Arena" genre="FPS" players="8.7K" accentColor="blue" />
        <GameCard title="Pixel Quest" genre="RPG" players="5.2K" accentColor="green" />
      </div>

      {/* Leaderboard Section */}
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
        Leaderboard
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
        <LeaderboardRow rank={1} username="xNeonKing" score="98,450" />
        <LeaderboardRow rank={2} username="CyberWolf" score="87,200" />
        <LeaderboardRow rank={3} username="PixelStorm" score="76,100" />
      </div>
    </div>
  );
}
