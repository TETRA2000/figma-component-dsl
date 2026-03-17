function Button({ children, color, textColor }: { children: React.ReactNode; color?: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color || '#3498db', padding: '8px 16px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: textColor || '#fff', fontSize: 14, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

export default function colors_gradient_04() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ background: 'linear-gradient(to right, #f093fb, #f5576c)', padding: 32, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ color: '#fff', fontSize: 18, fontWeight: 600, textAlign: 'center' as const }}>Gradient background</p>
          <Button color="rgba(255,255,255,0.2)" textColor="#fff">Learn More</Button>
        </div>
    </div>
  );
}
