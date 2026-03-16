import { GameCard } from '../../components/_generated/GameCard/GameCard';
import { LeaderboardRow } from '../../components/_generated/LeaderboardRow/LeaderboardRow';
import { UsernameTag } from '../../components/_generated/UsernameTag/UsernameTag';

export function NeonGamingShowcase() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Hero banner */}
      <div style={{
        padding: '48px 48px 32px',
        background: 'linear-gradient(135deg, rgba(255,45,85,0.15) 0%, #0a0a0a 50%, rgba(0,212,255,0.15) 100%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: '#ff2d55', fontSize: 36, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              NEXUS GAMING
            </h1>
            <p style={{ color: '#666666', fontSize: 14, margin: '8px 0 0' }}>Your gateway to the metaverse</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <UsernameTag name="xNova_" level="Lv. 42" />
            <UsernameTag name="GhostRider" level="Lv. 38" />
          </div>
        </div>
      </div>

      {/* Featured Games */}
      <div style={{ padding: '24px 48px' }}>
        <h2 style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>
          <span style={{ color: '#39ff14' }}>&#9632;</span> Featured Games
        </h2>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <GameCard title="Cyber Nexus" genre="Action RPG" players="24.5K playing" />
          <GameCard title="Void Runners" genre="Battle Royale" players="18.2K playing" />
          <GameCard title="Neon Drift" genre="Racing" players="12.8K playing" />
          <GameCard title="Shadow Protocol" genre="Tactical FPS" players="31.4K playing" />
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ padding: '24px 48px' }}>
        <h2 style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>
          <span style={{ color: '#ff2d55' }}>&#9650;</span> Global Leaderboard
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 600 }}>
          <LeaderboardRow rank={1} name="xNova_" score="48,250 pts" isTop />
          <LeaderboardRow rank={2} name="GhostRider" score="45,100 pts" />
          <LeaderboardRow rank={3} name="ByteStorm" score="42,800 pts" />
          <LeaderboardRow rank={4} name="PixelPhantom" score="39,650 pts" />
          <LeaderboardRow rank={5} name="NeonShadow" score="37,200 pts" />
        </div>
      </div>
    </div>
  );
}
