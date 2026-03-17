function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

function Button({ children, color, textColor }: { children: React.ReactNode; color?: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color || '#3498db', padding: '8px 16px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: textColor || '#fff', fontSize: 14, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

export default function heroes_banners_01() {
  return (
    <div data-testid="root" style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: '#2c3e50', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Badge label="New Release" color="rgba(255,255,255,0.2)" textColor="#fff" />
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', textAlign: 'center' as const }}>Hero Title 1</h1>
          <p style={{ fontSize: 16, color: '#cccccc', textAlign: 'center' as const, maxWidth: 600, lineHeight: 1.6 }}>A compelling subtitle that describes the value proposition.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button color="#fff" textColor="#2c3e50">Get Started</Button>
            <Button color="rgba(255,255,255,0.2)" textColor="#fff">Learn More</Button>
          </div>
        </div>
    </div>
  );
}
