function Card({ title, children, accentColor }: { title: string; children?: React.ReactNode; accentColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>{title}</h3>
      {children}
      {accentColor && <div style={{ height: 3, backgroundColor: accentColor, marginTop: 12, borderRadius: 2 }} />}
    </div>
  );
}

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

export default function cards_03() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <Card title="Card 3" accentColor="#2ecc71">
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>This is a card with nested Badge and Button components.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Badge label="New" color="#2ecc71" />
            <Button color="#2ecc71">Action</Button>
          </div>
        </Card>
    </div>
  );
}
