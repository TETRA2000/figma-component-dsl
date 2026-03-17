function Button({ children, color, textColor }: { children: React.ReactNode; color?: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color || '#3498db', padding: '8px 16px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: textColor || '#fff', fontSize: 14, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

export default function corner_radius_03() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ borderRadius: 8, backgroundColor: '#3498db', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ color: '#fff', fontSize: 14, textAlign: 'center' as const }}>Radius: 8px</p>
          <Button color="#fff" textColor="#3498db">Inside</Button>
        </div>
    </div>
  );
}
