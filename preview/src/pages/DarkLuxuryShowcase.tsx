import { LuxuryHero } from '../components/LuxuryHero/LuxuryHero';
import { LuxuryCard } from '../components/LuxuryCard/LuxuryCard';

export function DarkLuxuryShowcase() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <LuxuryHero />
      <div style={{
        display: 'flex',
        gap: '0px',
        padding: '0 80px 96px',
        width: '1440px',
        boxSizing: 'border-box' as const,
      }}>
        <LuxuryCard label="COLLECTION" title="Midnight Series" description="Crafted with precision and care for those who appreciate the finer details." />
        <LuxuryCard label="EXCLUSIVE" title="Golden Hour" description="A limited edition that captures the ephemeral beauty of twilight." />
        <LuxuryCard label="SIGNATURE" title="Obsidian Edge" description="Bold minimalism meets timeless sophistication in every detail." />
      </div>
    </div>
  );
}
