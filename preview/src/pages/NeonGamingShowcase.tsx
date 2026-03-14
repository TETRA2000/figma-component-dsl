import { GameCard } from '@/components/GameCard/GameCard';
import { StatBar } from '@/components/StatBar/StatBar';
import { LeaderboardRow } from '@/components/LeaderboardRow/LeaderboardRow';

export function NeonGamingShowcase() {
  return (
    <div style={{
      background: '#0f0f23',
      minHeight: '100vh',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      alignItems: 'center',
    }}>
      {/* Title */}
      <h1 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '36px',
        fontWeight: 700,
        color: '#39ff14',
        textAlign: 'center',
        margin: 0,
      }}>
        NEON ARCADE
      </h1>

      {/* Game Cards Row */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <GameCard
          title="Cyber Drift"
          genre="Racing"
          price="$29"
          rating="9.2"
          imageColor="#7c3aed"
        />
        <GameCard
          title="Shadow Ops"
          genre="FPS"
          price="$49"
          rating="8.7"
          imageColor="#ec4899"
        />
        <GameCard
          title="Neon Blitz"
          genre="Arcade"
          price="$19"
          rating="9.5"
          imageColor="#06b6d4"
        />
      </div>

      {/* Player Stats Panel */}
      <div style={{
        background: '#1a1a2e',
        borderRadius: '16px',
        padding: '24px',
        width: '340px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: '2px solid #2d2d44',
      }}>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: 700,
          color: '#ffffff',
          margin: 0,
        }}>
          Player Stats
        </h2>
        <StatBar label="Attack" value={85} color="#ef4444" />
        <StatBar label="Defense" value={60} color="#3b82f6" />
        <StatBar label="Speed" value={92} color="#39ff14" />
        <StatBar label="Magic" value={45} color="#a855f7" />
      </div>

      {/* Leaderboard */}
      <div style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <h2 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 8px 0',
        }}>
          Leaderboard
        </h2>
        <LeaderboardRow rank={1} username="xNeonSlayer" score="12,450" level="99" highlighted />
        <LeaderboardRow rank={2} username="CyberWolf" score="11,280" level="87" />
        <LeaderboardRow rank={3} username="PixelStorm" score="10,750" level="82" />
      </div>
    </div>
  );
}
