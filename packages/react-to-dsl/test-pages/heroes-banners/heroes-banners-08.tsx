export default function heroes_banners_08() {
  return (
    <div data-testid="root" style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: '#0984e3', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', textAlign: 'center' as const }}>Hero Title 8</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center' as const, maxWidth: 600, lineHeight: 1.6 }}>A compelling subtitle that describes the value proposition of this hero section.</p>
          <div style={{ backgroundColor: '#fff', padding: '12px 32px', borderRadius: 8 }}>
            <span style={{ color: '#0984e3', fontSize: 16, fontWeight: 600 }}>Get Started</span>
          </div>
        </div>
    </div>
  );
}
