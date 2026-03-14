import { GameCard } from '../components/GameCard/GameCard';
import { LiveBadge } from '../components/LiveBadge/LiveBadge';
import { LeaderboardRow } from '../components/LeaderboardRow/LeaderboardRow';

const games = [
  { title: 'Cyber Arena', genre: 'FPS / Battle Royale', players: '12.4k playing', rating: '4.8', isLive: true },
  { title: 'Neon Drift', genre: 'Racing', players: '5.1k playing', rating: '4.6', isLive: false },
  { title: 'Void Hunters', genre: 'RPG / Co-op', players: '8.9k playing', rating: '4.9', isLive: true },
];

const leaderboard = [
  { rank: 1, username: 'NeonSlayer', score: '14,280' },
  { rank: 2, username: 'CyberPhantom', score: '12,750' },
  { rank: 3, username: 'GlitchWolf', score: '11,430' },
  { rank: 4, username: 'PixelStorm', score: '9,815' },
  { rank: 5, username: 'VoidRunner', score: '8,290' },
];

export function NeonGamingShowcase() {
  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', background: '#0a0a0a', minHeight: '100vh', padding: '0' }}>
      {/* Header */}
      <div style={{ padding: '48px 80px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            NEXUS
          </span>
          <span style={{ fontSize: 28, fontWeight: 800, color: '#ff2d55', letterSpacing: '-0.02em' }}>
            GAMES
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <LiveBadge variant="live" />
          <LiveBadge variant="trending" />
          <LiveBadge variant="new" />
        </div>
      </div>

      {/* Featured Banner */}
      <div style={{
        margin: '0 80px 48px',
        height: 200,
        borderRadius: 20,
        background: 'linear-gradient(135deg, #ff2d55 0%, #0a0a0a 40%, #00d4ff 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        border: '2px solid #ff2d55',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: '#ffffff' }}>Season 7 is Here</span>
          <span style={{ fontSize: 16, color: '#cccccc' }}>New maps, weapons, and ranked mode available now</span>
        </div>
      </div>

      {/* Game Cards Grid */}
      <div style={{ padding: '0 80px 48px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', marginBottom: 24 }}>Popular Games</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ padding: '0 80px 80px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', marginBottom: 24 }}>Top Players</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 520 }}>
          {leaderboard.map((entry) => (
            <LeaderboardRow key={entry.rank} {...entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
