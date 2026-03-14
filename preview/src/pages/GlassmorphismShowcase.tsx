import { GlassHero } from '../components/GlassHero/GlassHero';
import { GlassFeatureCard } from '../components/GlassFeatureCard/GlassFeatureCard';

export function GlassmorphismShowcase() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <GlassHero />
      <div style={{
        display: 'flex',
        gap: '24px',
        padding: '0 80px 80px',
        width: '1440px',
        boxSizing: 'border-box' as const,
      }}>
        <GlassFeatureCard icon="◆" title="Transparency" description="Layers that breathe. See through to what matters." />
        <GlassFeatureCard icon="●" title="Depth" description="Cards that float above the surface with grace." />
        <GlassFeatureCard icon="■" title="Light" description="Borders that catch light like frosted glass." />
        <GlassFeatureCard icon="▲" title="Motion" description="Subtle shifts that respond to your gaze." />
      </div>
    </div>
  );
}
