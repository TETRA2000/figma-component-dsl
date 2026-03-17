function Card({ title, children, accentColor }: { title: string; children?: React.ReactNode; accentColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>{title}</h3>
      {children}
      {accentColor && <div style={{ height: 3, backgroundColor: accentColor, marginTop: 12, borderRadius: 2 }} />}
    </div>
  );
}

export default function opacity_05() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ opacity: 0.5 }}>
          <Card title="Opacity 0.5">
            <p style={{ fontSize: 14, color: '#666' }}>This card has opacity 0.5</p>
          </Card>
        </div>
        <Card title="Full Opacity" accentColor="#e74c3c">
          <p style={{ fontSize: 14, color: '#666' }}>Reference card at full opacity</p>
        </Card>
    </div>
  );
}
