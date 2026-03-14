import { BrutalistHero } from '../components/BrutalistHero/BrutalistHero';
import { BrutalistCard } from '../components/BrutalistCard/BrutalistCard';

export function BrutalistShowcase() {
  return (
    <div style={{ background: '#f5f5f0', minHeight: '100vh' }}>
      <BrutalistHero />
      <div style={{
        display: 'flex',
        gap: '0px',
        padding: '64px 80px',
        width: '1440px',
        boxSizing: 'border-box' as const,
      }}>
        <BrutalistCard number="01" title="TYPOGRAPHY" description="Type is the voice of design. Make it loud." />
        <BrutalistCard number="02" title="GRID SYSTEMS" description="Structure brings clarity. Break it with purpose." />
        <BrutalistCard number="03" title="RAW EDGES" description="Perfection is overrated. Embrace the rough." />
      </div>
    </div>
  );
}
