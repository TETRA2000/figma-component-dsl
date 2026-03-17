function Card({ title, children, accentColor }: { title: string; children?: React.ReactNode; accentColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>{title}</h3>
      {children}
      {accentColor && <div style={{ height: 3, backgroundColor: accentColor, marginTop: 12, borderRadius: 2 }} />}
    </div>
  );
}

function Avatar({ color, size }: { color: string; size?: number }) {
  const s = size || 40;
  return <div style={{ width: s, height: s, borderRadius: s / 2, backgroundColor: color }} />;
}

function Divider({ color }: { color?: string }) {
  return <div style={{ height: 1, backgroundColor: color || '#e0e0e0', width: '100%' }} />;
}

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: 24, fontWeight: 700, color: color || '#333' }}>{value}</span>
      <span style={{ fontSize: 12, color: '#999' }}>{label}</span>
    </div>
  );
}

export default function cards_06() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <Card title="User Card 6">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Avatar color="#e74c3c" size={48} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>User Name</span>
              <span style={{ fontSize: 12, color: '#999' }}>user@example.com</span>
            </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', gap: 16, marginTop: 12, justifyContent: 'center' }}>
            <Stat value="72" label="Posts" color="#e74c3c" />
            <Stat value="534" label="Followers" color="#e74c3c" />
          </div>
        </Card>
    </div>
  );
}
